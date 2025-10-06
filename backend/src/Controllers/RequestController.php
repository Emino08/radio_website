<?php

namespace App\Controllers;

use App\Database;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class RequestController
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function createSongRequest(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        // Validation
        if (empty($data['station_id']) || empty($data['song_name'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Station ID and song name are required'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $this->db->prepare("
            INSERT INTO song_requests (station_id, song_name, artist_name, message, requester_name, requester_email)
            VALUES (:station_id, :song_name, :artist_name, :message, :requester_name, :requester_email)
        ");

        $stmt->execute([
            ':station_id' => $data['station_id'],
            ':song_name' => $data['song_name'],
            ':artist_name' => $data['artist_name'] ?? null,
            ':message' => $data['message'] ?? null,
            ':requester_name' => $data['requester_name'] ?? null,
            ':requester_email' => $data['requester_email'] ?? null
        ]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Song request submitted successfully',
            'id' => $this->db->lastInsertId()
        ]));

        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    public function createShoutout(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        // Validation
        if (empty($data['station_id']) || empty($data['name']) || empty($data['message'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Station ID, name, and message are required'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $this->db->prepare("
            INSERT INTO shoutouts (station_id, name, message)
            VALUES (:station_id, :name, :message)
        ");

        $stmt->execute([
            ':station_id' => $data['station_id'],
            ':name' => $data['name'],
            ':message' => $data['message']
        ]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Shoutout submitted successfully',
            'id' => $this->db->lastInsertId()
        ]));

        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    public function submitContact(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        // Validation
        if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Name, email, and message are required'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        // Email validation
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Invalid email address'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $this->db->prepare("
            INSERT INTO contact_messages (name, email, subject, message, type)
            VALUES (:name, :email, :subject, :message, :type)
        ");

        $stmt->execute([
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':subject' => $data['subject'] ?? null,
            ':message' => $data['message'],
            ':type' => $data['type'] ?? 'general'
        ]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Message sent successfully',
            'id' => $this->db->lastInsertId()
        ]));

        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}
