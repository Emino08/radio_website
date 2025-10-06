<?php

namespace App\Controllers;

use App\Database;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class RequestManagementController
{
    private $db;
    private $authController;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
        $this->authController = new AuthController();
    }

    // Get all song requests (Admin)
    public function getAllSongRequests(Request $request, Response $response): Response
    {
        if (!$this->authController->checkPermission($request, 'requests.view')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $params = $request->getQueryParams();
        $status = $params['status'] ?? null;
        $stationId = $params['station_id'] ?? null;

        $sql = "SELECT sr.*, s.name as station_name
                FROM song_requests sr
                JOIN stations s ON sr.station_id = s.id
                WHERE 1=1";
        
        $bindings = [];

        if ($status) {
            $sql .= " AND sr.status = :status";
            $bindings[':status'] = $status;
        }

        if ($stationId) {
            $sql .= " AND sr.station_id = :station_id";
            $bindings[':station_id'] = $stationId;
        }

        $sql .= " ORDER BY sr.created_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($bindings);
        $requests = $stmt->fetchAll();

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $requests
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Update song request status
    public function updateSongRequestStatus(Request $request, Response $response, array $args): Response
    {
        if (!$this->authController->checkPermission($request, 'requests.manage')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $id = $args['id'];
        $data = $request->getParsedBody();

        $updates = [];
        $bindings = [':id' => $id];

        if (isset($data['status'])) {
            $updates[] = "status = :status";
            $bindings[':status'] = $data['status'];
            
            // If approved, mark as played
            if ($data['status'] === 'approved') {
                $updates[] = "played_at = CURRENT_TIMESTAMP";
            }
            
            // If rejected, store reason
            if ($data['status'] === 'rejected' && isset($data['rejected_reason'])) {
                $updates[] = "rejected_reason = :rejected_reason";
                $bindings[':rejected_reason'] = $data['rejected_reason'];
            }
        }

        if (empty($updates)) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'No fields to update'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $sql = "UPDATE song_requests SET " . implode(', ', $updates) . " WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($bindings);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Song request updated successfully'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Delete song request
    public function deleteSongRequest(Request $request, Response $response, array $args): Response
    {
        if (!$this->authController->checkPermission($request, 'requests.manage')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $id = $args['id'];

        $stmt = $this->db->prepare("DELETE FROM song_requests WHERE id = :id");
        $stmt->execute([':id' => $id]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Song request deleted successfully'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Get all shoutouts (Admin)
    public function getAllShoutouts(Request $request, Response $response): Response
    {
        if (!$this->authController->checkPermission($request, 'requests.view')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $params = $request->getQueryParams();
        $status = $params['status'] ?? null;
        $stationId = $params['station_id'] ?? null;

        $sql = "SELECT sh.*, s.name as station_name
                FROM shoutouts sh
                JOIN stations s ON sh.station_id = s.id
                WHERE 1=1";
        
        $bindings = [];

        if ($status) {
            $sql .= " AND sh.status = :status";
            $bindings[':status'] = $status;
        }

        if ($stationId) {
            $sql .= " AND sh.station_id = :station_id";
            $bindings[':station_id'] = $stationId;
        }

        $sql .= " ORDER BY sh.created_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($bindings);
        $shoutouts = $stmt->fetchAll();

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $shoutouts
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Update shoutout status
    public function updateShoutoutStatus(Request $request, Response $response, array $args): Response
    {
        if (!$this->authController->checkPermission($request, 'requests.manage')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $id = $args['id'];
        $data = $request->getParsedBody();

        $updates = [];
        $bindings = [':id' => $id];

        if (isset($data['status'])) {
            $updates[] = "status = :status";
            $bindings[':status'] = $data['status'];
        }

        if (isset($data['read_on_air'])) {
            $updates[] = "read_on_air = :read_on_air";
            $bindings[':read_on_air'] = $data['read_on_air'] ? 1 : 0;
            
            if ($data['read_on_air']) {
                $updates[] = "read_at = CURRENT_TIMESTAMP";
            }
        }

        if (empty($updates)) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'No fields to update'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $sql = "UPDATE shoutouts SET " . implode(', ', $updates) . " WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($bindings);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Shoutout updated successfully'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Delete shoutout
    public function deleteShoutout(Request $request, Response $response, array $args): Response
    {
        if (!$this->authController->checkPermission($request, 'requests.manage')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $id = $args['id'];

        $stmt = $this->db->prepare("DELETE FROM shoutouts WHERE id = :id");
        $stmt->execute([':id' => $id]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Shoutout deleted successfully'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Get statistics
    public function getStatistics(Request $request, Response $response): Response
    {
        if (!$this->authController->checkPermission($request, 'requests.view')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        // Get counts
        $songRequestsTotal = $this->db->query("SELECT COUNT(*) FROM song_requests")->fetchColumn();
        $songRequestsPending = $this->db->query("SELECT COUNT(*) FROM song_requests WHERE status = 'pending'")->fetchColumn();
        $songRequestsApproved = $this->db->query("SELECT COUNT(*) FROM song_requests WHERE status = 'approved'")->fetchColumn();
        
        $shoutoutsTotal = $this->db->query("SELECT COUNT(*) FROM shoutouts")->fetchColumn();
        $shoutoutsPending = $this->db->query("SELECT COUNT(*) FROM shoutouts WHERE status = 'pending'")->fetchColumn();
        $shoutoutsApproved = $this->db->query("SELECT COUNT(*) FROM shoutouts WHERE status = 'approved'")->fetchColumn();

        $questionsTotal = $this->db->query("SELECT COUNT(*) FROM program_questions")->fetchColumn();
        $questionsPending = $this->db->query("SELECT COUNT(*) FROM program_questions WHERE status = 'pending'")->fetchColumn();
        $questionsAnswered = $this->db->query("SELECT COUNT(*) FROM program_questions WHERE status = 'answered'")->fetchColumn();

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => [
                'song_requests' => [
                    'total' => (int)$songRequestsTotal,
                    'pending' => (int)$songRequestsPending,
                    'approved' => (int)$songRequestsApproved
                ],
                'shoutouts' => [
                    'total' => (int)$shoutoutsTotal,
                    'pending' => (int)$shoutoutsPending,
                    'approved' => (int)$shoutoutsApproved
                ],
                'questions' => [
                    'total' => (int)$questionsTotal,
                    'pending' => (int)$questionsPending,
                    'answered' => (int)$questionsAnswered
                ]
            ]
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
