<?php

namespace App\Controllers;

use App\Database;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use PDO;

class AuthController
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function login(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();
        
        // Debug: Log the received data
        error_log("Login attempt - Received data: " . json_encode($data));

        if (empty($data['email']) || empty($data['password'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Email and password are required',
                'debug' => [
                    'received_data' => $data,
                    'content_type' => $request->getHeaderLine('Content-Type')
                ]
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        // Get user by email
        $stmt = $this->db->prepare("
            SELECT u.*, 
                   GROUP_CONCAT(p.name) as permissions
            FROM users u
            LEFT JOIN role_permissions rp ON u.role = rp.role
            LEFT JOIN permissions p ON rp.permission_id = p.id
            WHERE u.email = :email
            GROUP BY u.id
        ");
        $stmt->execute([':email' => $data['email']]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($data['password'], $user['password_hash'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Invalid email or password'
            ]));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        // Generate session token
        $token = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));

        // Save session
        $stmt = $this->db->prepare("
            INSERT INTO user_sessions (user_id, token, ip_address, user_agent, expires_at)
            VALUES (:user_id, :token, :ip_address, :user_agent, :expires_at)
        ");
        $stmt->execute([
            ':user_id' => $user['id'],
            ':token' => $token,
            ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
            ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
            ':expires_at' => $expiresAt
        ]);

        // Prepare user data (remove password)
        unset($user['password_hash']);
        $user['permissions'] = $user['permissions'] ? explode(',', $user['permissions']) : [];

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token,
                'expires_at' => $expiresAt
            ]
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function logout(Request $request, Response $response): Response
    {
        $token = $this->getTokenFromRequest($request);

        if ($token) {
            $stmt = $this->db->prepare("DELETE FROM user_sessions WHERE token = :token");
            $stmt->execute([':token' => $token]);
        }

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Logged out successfully'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function me(Request $request, Response $response): Response
    {
        $user = $this->getAuthenticatedUser($request);

        if (!$user) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $user
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function refreshToken(Request $request, Response $response): Response
    {
        $token = $this->getTokenFromRequest($request);

        if (!$token) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'No token provided'
            ]));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        // Check if token is valid
        $stmt = $this->db->prepare("
            SELECT * FROM user_sessions 
            WHERE token = :token AND expires_at > NOW()
        ");
        $stmt->execute([':token' => $token]);
        $session = $stmt->fetch();

        if (!$session) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Invalid or expired token'
            ]));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        // Generate new token
        $newToken = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));

        // Update session
        $stmt = $this->db->prepare("
            UPDATE user_sessions 
            SET token = :new_token, expires_at = :expires_at 
            WHERE id = :id
        ");
        $stmt->execute([
            ':new_token' => $newToken,
            ':expires_at' => $expiresAt,
            ':id' => $session['id']
        ]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => [
                'token' => $newToken,
                'expires_at' => $expiresAt
            ]
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Helper methods
    private function getTokenFromRequest(Request $request): ?string
    {
        $authHeader = $request->getHeaderLine('Authorization');
        if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            return $matches[1];
        }
        return null;
    }

    public function getAuthenticatedUser(Request $request): ?array
    {
        $token = $this->getTokenFromRequest($request);

        if (!$token) {
            return null;
        }

        $stmt = $this->db->prepare("
            SELECT u.*, 
                   GROUP_CONCAT(p.name) as permissions
            FROM user_sessions s
            JOIN users u ON s.user_id = u.id
            LEFT JOIN role_permissions rp ON u.role = rp.role
            LEFT JOIN permissions p ON rp.permission_id = p.id
            WHERE s.token = :token AND s.expires_at > NOW()
            GROUP BY u.id
        ");
        $stmt->execute([':token' => $token]);
        $user = $stmt->fetch();

        if ($user) {
            unset($user['password_hash']);
            $user['permissions'] = $user['permissions'] ? explode(',', $user['permissions']) : [];
        }

        return $user ?: null;
    }

    public function checkPermission(Request $request, string $permission): bool
    {
        $user = $this->getAuthenticatedUser($request);
        
        if (!$user) {
            return false;
        }

        // Admin has all permissions
        if ($user['role'] === 'admin') {
            return true;
        }

        return in_array($permission, $user['permissions']);
    }
}
