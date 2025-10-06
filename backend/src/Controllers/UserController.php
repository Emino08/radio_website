<?php

namespace App\Controllers;

use App\Database;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserController
{
    private $db;
    private $authController;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
        $this->authController = new AuthController();
    }

    public function getAll(Request $request, Response $response): Response
    {
        // Check permission
        if (!$this->authController->checkPermission($request, 'users.edit')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to view users'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $params = $request->getQueryParams();
        $role = $params['role'] ?? null;

        $sql = "SELECT id, email, name, avatar, role, created_at, updated_at FROM users";
        $bindings = [];

        if ($role) {
            $sql .= " WHERE role = :role";
            $bindings[':role'] = $role;
        }

        $sql .= " ORDER BY created_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($bindings);
        $users = $stmt->fetchAll();

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $users
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getOne(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];
        $currentUser = $this->authController->getAuthenticatedUser($request);

        // Users can view their own profile, others need permission
        if ($currentUser['id'] != $id && !$this->authController->checkPermission($request, 'users.edit')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $this->db->prepare("
            SELECT id, email, name, avatar, role, created_at, updated_at 
            FROM users WHERE id = :id
        ");
        $stmt->execute([':id' => $id]);
        $user = $stmt->fetch();

        if (!$user) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'User not found'
            ]));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $user
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function create(Request $request, Response $response): Response
    {
        // Check permission
        if (!$this->authController->checkPermission($request, 'users.create')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to create users'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $data = $request->getParsedBody();

        // Validate required fields
        if (empty($data['email']) || empty($data['password']) || empty($data['name'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Email, password, and name are required'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        // Check if email already exists
        $stmt = $this->db->prepare("SELECT id FROM users WHERE email = :email");
        $stmt->execute([':email' => $data['email']]);
        if ($stmt->fetch()) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Email already exists'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        // Hash password
        $passwordHash = password_hash($data['password'], PASSWORD_BCRYPT);

        // Insert user
        $stmt = $this->db->prepare("
            INSERT INTO users (email, password_hash, name, avatar, role)
            VALUES (:email, :password_hash, :name, :avatar, :role)
        ");

        $stmt->execute([
            ':email' => $data['email'],
            ':password_hash' => $passwordHash,
            ':name' => $data['name'],
            ':avatar' => $data['avatar'] ?? null,
            ':role' => $data['role'] ?? 'user'
        ]);

        $userId = $this->db->lastInsertId();

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'User created successfully',
            'data' => ['id' => $userId]
        ]));

        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];
        $currentUser = $this->authController->getAuthenticatedUser($request);

        // Users can update their own profile, others need permission
        if ($currentUser['id'] != $id && !$this->authController->checkPermission($request, 'users.edit')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $data = $request->getParsedBody();

        // Build update query dynamically
        $updates = [];
        $bindings = [':id' => $id];

        if (isset($data['name'])) {
            $updates[] = "name = :name";
            $bindings[':name'] = $data['name'];
        }

        if (isset($data['email'])) {
            // Check if email is taken by another user
            $stmt = $this->db->prepare("SELECT id FROM users WHERE email = :email AND id != :id");
            $stmt->execute([':email' => $data['email'], ':id' => $id]);
            if ($stmt->fetch()) {
                $response->getBody()->write(json_encode([
                    'success' => false,
                    'message' => 'Email already exists'
                ]));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }
            $updates[] = "email = :email";
            $bindings[':email'] = $data['email'];
        }

        if (isset($data['avatar'])) {
            $updates[] = "avatar = :avatar";
            $bindings[':avatar'] = $data['avatar'];
        }

        // Only admins can change roles
        if (isset($data['role']) && $this->authController->checkPermission($request, 'users.edit')) {
            $updates[] = "role = :role";
            $bindings[':role'] = $data['role'];
        }

        if (isset($data['password']) && !empty($data['password'])) {
            $updates[] = "password_hash = :password_hash";
            $bindings[':password_hash'] = password_hash($data['password'], PASSWORD_BCRYPT);
        }

        if (empty($updates)) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'No fields to update'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $sql = "UPDATE users SET " . implode(', ', $updates) . ", updated_at = CURRENT_TIMESTAMP WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($bindings);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'User updated successfully'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];

        // Check permission
        if (!$this->authController->checkPermission($request, 'users.delete')) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Unauthorized: You do not have permission to delete users'
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        // Prevent deleting yourself
        $currentUser = $this->authController->getAuthenticatedUser($request);
        if ($currentUser['id'] == $id) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'You cannot delete your own account'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $this->db->prepare("DELETE FROM users WHERE id = :id");
        $stmt->execute([':id' => $id]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'User deleted successfully'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getRoles(Request $request, Response $response): Response
    {
        $roles = [
            ['value' => 'admin', 'label' => 'Administrator', 'description' => 'Full system access'],
            ['value' => 'editor', 'label' => 'Editor', 'description' => 'Can manage content'],
            ['value' => 'moderator', 'label' => 'Moderator', 'description' => 'Can moderate content'],
            ['value' => 'user', 'label' => 'User', 'description' => 'Basic access']
        ];

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $roles
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getPermissions(Request $request, Response $response): Response
    {
        $stmt = $this->db->query("SELECT * FROM permissions ORDER BY name");
        $permissions = $stmt->fetchAll();

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $permissions
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
