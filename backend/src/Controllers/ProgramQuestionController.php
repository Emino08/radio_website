<?php

namespace App\Controllers;

use App\Database;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use PDO;

class ProgramQuestionController
{
    private $db;
    private $authController;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
        $this->authController = new AuthController();
    }

    // Public endpoint - Submit question to active program
    public function submitQuestion(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        if (empty($data['program_id']) || empty($data['sender_name']) || empty($data['question'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Program ID, sender name, and question are required'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        // Check if program is currently active
        $stmt = $this->db->prepare("
            SELECT p.*, s.id as station_id 
            FROM programs p
            JOIN stations s ON p.station_id = s.id
            WHERE p.id = :program_id AND p.is_active = 1 AND p.allows_questions = 1
        ");
        $stmt->execute([':program_id' => $data['program_id']]);
        $program = $stmt->fetch();

        if (!$program) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Program not found or does not accept questions'
            ]));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        // Check if program is currently on air
        $isLive = $this->isProgramLive($program);

        if (!$isLive) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'This program is not currently on air. Questions can only be submitted during live broadcasts.',
                'program_schedule' => [
                    'start_time' => $program['start_time'],
                    'end_time' => $program['end_time'],
                    'days' => json_decode($program['days_of_week'])
                ]
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        // Submit question
        $stmt = $this->db->prepare("
            INSERT INTO program_questions 
            (program_id, station_id, sender_name, sender_phone, sender_email, question, is_live)
            VALUES (:program_id, :station_id, :sender_name, :sender_phone, :sender_email, :question, :is_live)
        ");

        $stmt->execute([
            ':program_id' => $data['program_id'],
            ':station_id' => $program['station_id'],
            ':sender_name' => $data['sender_name'],
            ':sender_phone' => $data['sender_phone'] ?? null,
            ':sender_email' => $data['sender_email'] ?? null,
            ':question' => $data['question'],
            ':is_live' => 1
        ]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Your question has been submitted successfully! The host will review it shortly.',
            'id' => $this->db->lastInsertId()
        ]));

        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    // Get currently active program
    public function getActiveProgram(Request $request, Response $response, array $args): Response
    {
        $stationId = $args['station_id'] ?? null;

        $sql = "SELECT p.*, s.name as station_name 
                FROM programs p
                JOIN stations s ON p.station_id = s.id
                WHERE p.is_active = 1";
        
        $bindings = [];
        if ($stationId) {
            $sql .= " AND p.station_id = :station_id";
            $bindings[':station_id'] = $stationId;
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($bindings);
        $programs = $stmt->fetchAll();

        $activeProgram = null;
        foreach ($programs as $program) {
            if ($this->isProgramLive($program)) {
                $activeProgram = $program;
                $activeProgram['schedule'] = json_decode($program['schedule']);
                $activeProgram['days_of_week'] = json_decode($program['days_of_week']);
                break;
            }
        }

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $activeProgram,
            'message' => $activeProgram ? 'Program is currently live' : 'No program currently on air'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Admin: Get all questions
    public function getAllQuestions(Request $request, Response $response): Response
    {
        if (!$this->authController->checkPermission($request, 'questions.view')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $params = $request->getQueryParams();
        $status = $params['status'] ?? null;
        $programId = $params['program_id'] ?? null;
        $isLive = $params['is_live'] ?? null;

        $sql = "SELECT q.*, p.name as program_name, p.host_name, s.name as station_name,
                       u.name as answered_by_name
                FROM program_questions q
                JOIN programs p ON q.program_id = p.id
                JOIN stations s ON q.station_id = s.id
                LEFT JOIN users u ON q.answered_by = u.id
                WHERE 1=1";
        
        $bindings = [];

        if ($status) {
            $sql .= " AND q.status = :status";
            $bindings[':status'] = $status;
        }

        if ($programId) {
            $sql .= " AND q.program_id = :program_id";
            $bindings[':program_id'] = $programId;
        }

        if ($isLive !== null) {
            $sql .= " AND q.is_live = :is_live";
            $bindings[':is_live'] = $isLive ? 1 : 0;
        }

        $sql .= " ORDER BY q.created_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($bindings);
        $questions = $stmt->fetchAll();

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $questions
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Admin: Update question status
    public function updateQuestionStatus(Request $request, Response $response, array $args): Response
    {
        if (!$this->authController->checkPermission($request, 'questions.manage')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $id = $args['id'];
        $data = $request->getParsedBody();
        $user = $this->authController->getAuthenticatedUser($request);

        $updates = [];
        $bindings = [':id' => $id];

        if (isset($data['status'])) {
            $updates[] = "status = :status";
            $bindings[':status'] = $data['status'];
        }

        if (isset($data['answer']) && $this->authController->checkPermission($request, 'questions.answer')) {
            $updates[] = "answer = :answer, answered_by = :answered_by";
            $bindings[':answer'] = $data['answer'];
            $bindings[':answered_by'] = $user['id'];
        }

        if (empty($updates)) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'No fields to update'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $sql = "UPDATE program_questions SET " . implode(', ', $updates) . " WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($bindings);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Question updated successfully'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Admin: Delete question
    public function deleteQuestion(Request $request, Response $response, array $args): Response
    {
        if (!$this->authController->checkPermission($request, 'questions.manage')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $id = $args['id'];

        $stmt = $this->db->prepare("DELETE FROM program_questions WHERE id = :id");
        $stmt->execute([':id' => $id]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Question deleted successfully'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Helper: Check if program is currently live
    private function isProgramLive($program): bool
    {
        if (!$program['start_time'] || !$program['end_time'] || !$program['days_of_week']) {
            return false;
        }

        $now = new \DateTime();
        $currentTime = $now->format('H:i:s');
        $currentDay = $now->format('l'); // Monday, Tuesday, etc.

        $daysOfWeek = json_decode($program['days_of_week'], true);
        
        // Check if today is a broadcast day
        if (!in_array($currentDay, $daysOfWeek)) {
            return false;
        }

        // Check if current time is within program time
        return $currentTime >= $program['start_time'] && $currentTime <= $program['end_time'];
    }
}
