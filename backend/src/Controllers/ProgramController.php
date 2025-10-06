<?php

namespace App\Controllers;

use App\Database;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ProgramController
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAll(Request $request, Response $response): Response
    {
        $params = $request->getQueryParams();
        $stationId = $params['station_id'] ?? null;

        $sql = "SELECT p.*, s.name as station_name, s.slug as station_slug
                FROM programs p
                JOIN stations s ON p.station_id = s.id
                WHERE p.is_active = 1";
        $bindings = [];

        if ($stationId) {
            $sql .= " AND p.station_id = :station_id";
            $bindings[':station_id'] = $stationId;
        }

        $sql .= " ORDER BY p.name ASC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($bindings);
        $programs = $stmt->fetchAll();

        // Decode JSON fields
        foreach ($programs as &$program) {
            $program['schedule'] = json_decode($program['schedule'] ?? '{}');
        }

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $programs
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getOne(Request $request, Response $response, array $args): Response
    {
        $slug = $args['slug'];

        $stmt = $this->db->prepare("
            SELECT p.*, s.name as station_name, s.slug as station_slug, s.logo_url as station_logo
            FROM programs p
            JOIN stations s ON p.station_id = s.id
            WHERE p.slug = :slug AND p.is_active = 1
        ");
        $stmt->execute([':slug' => $slug]);
        $program = $stmt->fetch();

        if (!$program) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Program not found'
            ]));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        // Decode JSON fields
        $program['schedule'] = json_decode($program['schedule'] ?? '{}');

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $program
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
