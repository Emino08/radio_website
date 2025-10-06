<?php

namespace App\Controllers;

use App\Database;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AdminController
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    // Articles Management
    public function getAllArticles(Request $request, Response $response): Response
    {
        $params = $request->getQueryParams();
        $status = $params['status'] ?? null;

        $sql = "SELECT a.*, u.name as author_name, c.name as category_name
                FROM articles a
                LEFT JOIN users u ON a.author_id = u.id
                LEFT JOIN article_categories c ON a.category_id = c.id";

        $bindings = [];
        if ($status) {
            $sql .= " WHERE a.status = :status";
            $bindings[':status'] = $status;
        }

        $sql .= " ORDER BY a.created_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($bindings);
        $articles = $stmt->fetchAll();

        foreach ($articles as &$article) {
            $article['tags'] = json_decode($article['tags'] ?? '[]');
        }

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $articles
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function createArticle(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        if (empty($data['title']) || empty($data['content'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Title and content are required'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $slug = $this->generateSlug($data['title']);
        $tags = isset($data['tags']) ? json_encode($data['tags']) : '[]';

        $stmt = $this->db->prepare("
            INSERT INTO articles (title, slug, content, excerpt, featured_image, author_id, category_id, tags, status, published_at)
            VALUES (:title, :slug, :content, :excerpt, :featured_image, :author_id, :category_id, :tags, :status, :published_at)
        ");

        $publishedAt = ($data['status'] ?? 'draft') === 'published' ? date('Y-m-d H:i:s') : null;

        $stmt->execute([
            ':title' => $data['title'],
            ':slug' => $slug,
            ':content' => $data['content'],
            ':excerpt' => $data['excerpt'] ?? null,
            ':featured_image' => $data['featured_image'] ?? null,
            ':author_id' => $data['author_id'] ?? 1,
            ':category_id' => $data['category_id'] ?? null,
            ':tags' => $tags,
            ':status' => $data['status'] ?? 'draft',
            ':published_at' => $publishedAt
        ]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Article created successfully',
            'id' => $this->db->lastInsertId()
        ]));

        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    public function updateArticle(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];
        $data = $request->getParsedBody();

        if (empty($data['title']) || empty($data['content'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Title and content are required'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $tags = isset($data['tags']) ? json_encode($data['tags']) : '[]';

        $stmt = $this->db->prepare("
            UPDATE articles
            SET title = :title, content = :content, excerpt = :excerpt,
                featured_image = :featured_image, category_id = :category_id,
                tags = :tags, status = :status, updated_at = CURRENT_TIMESTAMP
            WHERE id = :id
        ");

        $stmt->execute([
            ':id' => $id,
            ':title' => $data['title'],
            ':content' => $data['content'],
            ':excerpt' => $data['excerpt'] ?? null,
            ':featured_image' => $data['featured_image'] ?? null,
            ':category_id' => $data['category_id'] ?? null,
            ':tags' => $tags,
            ':status' => $data['status'] ?? 'draft'
        ]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Article updated successfully'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function deleteArticle(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];

        $stmt = $this->db->prepare("DELETE FROM articles WHERE id = :id");
        $stmt->execute([':id' => $id]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Article deleted successfully'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Stations Management
    public function createStation(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        if (empty($data['name']) || empty($data['stream_url']) || empty($data['genre'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Name, stream URL, and genre are required'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $slug = $this->generateSlug($data['name']);
        $subGenres = isset($data['sub_genres']) ? json_encode($data['sub_genres']) : '[]';
        $socialMedia = isset($data['social_media']) ? json_encode($data['social_media']) : '{}';

        $stmt = $this->db->prepare("
            INSERT INTO stations (name, slug, logo_url, description, tagline, stream_url, genre, sub_genres, language, country, is_featured, social_media)
            VALUES (:name, :slug, :logo_url, :description, :tagline, :stream_url, :genre, :sub_genres, :language, :country, :is_featured, :social_media)
        ");

        $stmt->execute([
            ':name' => $data['name'],
            ':slug' => $slug,
            ':logo_url' => $data['logo_url'] ?? null,
            ':description' => $data['description'] ?? '',
            ':tagline' => $data['tagline'] ?? null,
            ':stream_url' => $data['stream_url'],
            ':genre' => $data['genre'],
            ':sub_genres' => $subGenres,
            ':language' => $data['language'] ?? 'English',
            ':country' => $data['country'] ?? null,
            ':is_featured' => $data['is_featured'] ?? false,
            ':social_media' => $socialMedia
        ]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Station created successfully',
            'id' => $this->db->lastInsertId()
        ]));

        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    public function updateStation(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];
        $data = $request->getParsedBody();

        $subGenres = isset($data['sub_genres']) ? json_encode($data['sub_genres']) : '[]';
        $socialMedia = isset($data['social_media']) ? json_encode($data['social_media']) : '{}';

        $stmt = $this->db->prepare("
            UPDATE stations
            SET name = :name, description = :description, tagline = :tagline,
                stream_url = :stream_url, genre = :genre, sub_genres = :sub_genres,
                language = :language, country = :country, is_featured = :is_featured,
                social_media = :social_media, is_active = :is_active
            WHERE id = :id
        ");

        $stmt->execute([
            ':id' => $id,
            ':name' => $data['name'],
            ':description' => $data['description'] ?? '',
            ':tagline' => $data['tagline'] ?? null,
            ':stream_url' => $data['stream_url'],
            ':genre' => $data['genre'],
            ':sub_genres' => $subGenres,
            ':language' => $data['language'] ?? 'English',
            ':country' => $data['country'] ?? null,
            ':is_featured' => $data['is_featured'] ?? false,
            ':social_media' => $socialMedia,
            ':is_active' => $data['is_active'] ?? true
        ]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Station updated successfully'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Requests Management
    public function getSongRequests(Request $request, Response $response): Response
    {
        $params = $request->getQueryParams();
        $status = $params['status'] ?? 'pending';

        $stmt = $this->db->prepare("
            SELECT sr.*, s.name as station_name
            FROM song_requests sr
            JOIN stations s ON sr.station_id = s.id
            WHERE sr.status = :status
            ORDER BY sr.created_at DESC
            LIMIT 50
        ");

        $stmt->execute([':status' => $status]);
        $requests = $stmt->fetchAll();

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $requests
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateSongRequestStatus(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'];
        $data = $request->getParsedBody();

        if (empty($data['status'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Status is required'
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $this->db->prepare("UPDATE song_requests SET status = :status WHERE id = :id");
        $stmt->execute([
            ':id' => $id,
            ':status' => $data['status']
        ]);

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Request status updated'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    private function generateSlug(string $text): string
    {
        $text = strtolower(trim($text));
        $text = preg_replace('/[^a-z0-9-]/', '-', $text);
        $text = preg_replace('/-+/', '-', $text);
        return trim($text, '-');
    }
}
