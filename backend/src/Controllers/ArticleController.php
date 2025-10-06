<?php

namespace App\Controllers;

use App\Database;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ArticleController
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAll(Request $request, Response $response): Response
    {
        $params = $request->getQueryParams();
        $category = $params['category'] ?? null;
        $limit = $params['limit'] ?? 10;
        $offset = $params['offset'] ?? 0;

        $sql = "SELECT a.*, u.name as author_name, c.name as category_name, c.slug as category_slug
                FROM articles a
                LEFT JOIN users u ON a.author_id = u.id
                LEFT JOIN article_categories c ON a.category_id = c.id
                WHERE a.status = 'published'";
        $bindings = [];

        if ($category) {
            $sql .= " AND c.slug = :category";
            $bindings[':category'] = $category;
        }

        $sql .= " ORDER BY a.published_at DESC LIMIT :limit OFFSET :offset";

        $stmt = $this->db->prepare($sql);

        foreach ($bindings as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->bindValue(':limit', (int)$limit, \PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int)$offset, \PDO::PARAM_INT);

        $stmt->execute();
        $articles = $stmt->fetchAll();

        // Decode JSON fields
        foreach ($articles as &$article) {
            $article['tags'] = json_decode($article['tags'] ?? '[]');
        }

        // Get total count
        $countSql = "SELECT COUNT(*) FROM articles a
                     LEFT JOIN article_categories c ON a.category_id = c.id
                     WHERE a.status = 'published'";
        if ($category) {
            $countSql .= " AND c.slug = :category";
        }

        $countStmt = $this->db->prepare($countSql);
        if ($category) {
            $countStmt->execute([':category' => $category]);
        } else {
            $countStmt->execute();
        }
        $total = $countStmt->fetchColumn();

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $articles,
            'pagination' => [
                'total' => (int)$total,
                'limit' => (int)$limit,
                'offset' => (int)$offset
            ]
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getOne(Request $request, Response $response, array $args): Response
    {
        $slug = $args['slug'];

        $stmt = $this->db->prepare("
            SELECT a.*, u.name as author_name, u.avatar as author_avatar,
                   c.name as category_name, c.slug as category_slug
            FROM articles a
            LEFT JOIN users u ON a.author_id = u.id
            LEFT JOIN article_categories c ON a.category_id = c.id
            WHERE a.slug = :slug AND a.status = 'published'
        ");
        $stmt->execute([':slug' => $slug]);
        $article = $stmt->fetch();

        if (!$article) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Article not found'
            ]));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        // Decode JSON fields
        $article['tags'] = json_decode($article['tags'] ?? '[]');

        // Increment view count
        $updateStmt = $this->db->prepare("UPDATE articles SET views = views + 1 WHERE id = :id");
        $updateStmt->execute([':id' => $article['id']]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $article
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getFeatured(Request $request, Response $response): Response
    {
        $limit = $request->getQueryParams()['limit'] ?? 3;

        $stmt = $this->db->prepare("
            SELECT a.*, u.name as author_name, c.name as category_name, c.slug as category_slug
            FROM articles a
            LEFT JOIN users u ON a.author_id = u.id
            LEFT JOIN article_categories c ON a.category_id = c.id
            WHERE a.status = 'published'
            ORDER BY a.views DESC, a.published_at DESC
            LIMIT :limit
        ");
        $stmt->bindValue(':limit', (int)$limit, \PDO::PARAM_INT);
        $stmt->execute();
        $articles = $stmt->fetchAll();

        // Decode JSON fields
        foreach ($articles as &$article) {
            $article['tags'] = json_decode($article['tags'] ?? '[]');
        }

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $articles
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getCategories(Request $request, Response $response): Response
    {
        $stmt = $this->db->query("SELECT * FROM article_categories ORDER BY name ASC");
        $categories = $stmt->fetchAll();

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $categories
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
