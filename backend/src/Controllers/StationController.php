<?php

namespace App\Controllers;

use App\Database;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use PDO;

class StationController
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAll(Request $request, Response $response): Response
    {
        $params = $request->getQueryParams();
        $genre = $params['genre'] ?? null;
        $search = $params['search'] ?? null;
        $featured = $params['featured'] ?? null;

        $sql = "SELECT * FROM stations WHERE is_active = 1";
        $bindings = [];

        if ($genre) {
            $sql .= " AND genre = :genre";
            $bindings[':genre'] = $genre;
        }

        if ($search) {
            $sql .= " AND (name LIKE :search OR description LIKE :search)";
            $bindings[':search'] = "%$search%";
        }

        if ($featured !== null) {
            $sql .= " AND is_featured = :featured";
            $bindings[':featured'] = $featured ? 1 : 0;
        }

        $sql .= " ORDER BY is_featured DESC, listener_count DESC, name ASC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($bindings);
        $stations = $stmt->fetchAll();

        // Decode JSON fields
        foreach ($stations as &$station) {
            $station['sub_genres'] = json_decode($station['sub_genres'] ?? '[]');
            $station['social_media'] = json_decode($station['social_media'] ?? '{}');
        }

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $stations
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getOne(Request $request, Response $response, array $args): Response
    {
        $slug = $args['slug'];

        $stmt = $this->db->prepare("SELECT * FROM stations WHERE slug = :slug AND is_active = 1");
        $stmt->execute([':slug' => $slug]);
        $station = $stmt->fetch();

        if (!$station) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Station not found'
            ]));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        // Decode JSON fields
        $station['sub_genres'] = json_decode($station['sub_genres'] ?? '[]');
        $station['social_media'] = json_decode($station['social_media'] ?? '{}');

        // Get station programs
        $stmt = $this->db->prepare("SELECT * FROM programs WHERE station_id = :id AND is_active = 1");
        $stmt->execute([':id' => $station['id']]);
        $programs = $stmt->fetchAll();

        foreach ($programs as &$program) {
            $program['schedule'] = json_decode($program['schedule'] ?? '{}');
        }

        $station['programs'] = $programs;

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $station
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function incrementListener(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];

        $stmt = $this->db->prepare("UPDATE stations SET listener_count = listener_count + 1 WHERE id = :id");
        $stmt->execute([':id' => $id]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Listener count updated'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function decrementListener(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];

        $stmt = $this->db->prepare("UPDATE stations SET listener_count = GREATEST(listener_count - 1, 0) WHERE id = :id");
        $stmt->execute([':id' => $id]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Listener count updated'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getGenres(Request $request, Response $response): Response
    {
        $stmt = $this->db->query("SELECT DISTINCT genre FROM stations WHERE is_active = 1 ORDER BY genre");
        $genres = $stmt->fetchAll(PDO::FETCH_COLUMN);

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $genres
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
