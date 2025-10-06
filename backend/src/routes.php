<?php

use App\Controllers\StationController;
use App\Controllers\ProgramController;
use App\Controllers\ArticleController;
use App\Controllers\RequestController;
use App\Controllers\AdminController;
use App\Controllers\AuthController;
use App\Controllers\UserController;
use App\Controllers\ProgramQuestionController;
use App\Controllers\RequestManagementController;
use Slim\Routing\RouteCollectorProxy;

// API routes
$app->group('/api', function (RouteCollectorProxy $group) {

    // Authentication routes (public)
    $group->post('/auth/login', [AuthController::class, 'login']);
    $group->post('/auth/logout', [AuthController::class, 'logout']);
    $group->get('/auth/me', [AuthController::class, 'me']);
    $group->post('/auth/refresh', [AuthController::class, 'refreshToken']);

    // Stations
    $group->get('/stations', [StationController::class, 'getAll']);
    $group->get('/stations/genres', [StationController::class, 'getGenres']);
    $group->get('/stations/{slug}', [StationController::class, 'getOne']);
    $group->post('/stations/{id}/listen', [StationController::class, 'incrementListener']);
    $group->post('/stations/{id}/stop', [StationController::class, 'decrementListener']);

    // Programs
    $group->get('/programs', [ProgramController::class, 'getAll']);
    $group->get('/programs/{slug}', [ProgramController::class, 'getOne']);
    
    // Program Questions (Public)
    $group->post('/program-questions', [ProgramQuestionController::class, 'submitQuestion']);
    $group->get('/programs/active/{station_id}', [ProgramQuestionController::class, 'getActiveProgram']);

    // Articles
    $group->get('/articles', [ArticleController::class, 'getAll']);
    $group->get('/articles/featured', [ArticleController::class, 'getFeatured']);
    $group->get('/articles/categories', [ArticleController::class, 'getCategories']);
    $group->get('/articles/{slug}', [ArticleController::class, 'getOne']);

    // Requests & Contact (Public)
    $group->post('/song-requests', [RequestController::class, 'createSongRequest']);
    $group->post('/shoutouts', [RequestController::class, 'createShoutout']);
    $group->post('/contact', [RequestController::class, 'submitContact']);

    // Admin routes (protected with authentication)
    $group->group('/admin', function (RouteCollectorProxy $admin) {
        // Articles Management
        $admin->get('/articles', [AdminController::class, 'getAllArticles']);
        $admin->post('/articles', [AdminController::class, 'createArticle']);
        $admin->put('/articles/{id}', [AdminController::class, 'updateArticle']);
        $admin->delete('/articles/{id}', [AdminController::class, 'deleteArticle']);

        // Stations Management
        $admin->post('/stations', [AdminController::class, 'createStation']);
        $admin->put('/stations/{id}', [AdminController::class, 'updateStation']);

        // Program Questions Management
        $admin->get('/program-questions', [ProgramQuestionController::class, 'getAllQuestions']);
        $admin->put('/program-questions/{id}', [ProgramQuestionController::class, 'updateQuestionStatus']);
        $admin->delete('/program-questions/{id}', [ProgramQuestionController::class, 'deleteQuestion']);

        // Song Requests Management
        $admin->get('/song-requests', [RequestManagementController::class, 'getAllSongRequests']);
        $admin->put('/song-requests/{id}', [RequestManagementController::class, 'updateSongRequestStatus']);
        $admin->delete('/song-requests/{id}', [RequestManagementController::class, 'deleteSongRequest']);

        // Shoutouts Management
        $admin->get('/shoutouts', [RequestManagementController::class, 'getAllShoutouts']);
        $admin->put('/shoutouts/{id}', [RequestManagementController::class, 'updateShoutoutStatus']);
        $admin->delete('/shoutouts/{id}', [RequestManagementController::class, 'deleteShoutout']);

        // Statistics
        $admin->get('/statistics', [RequestManagementController::class, 'getStatistics']);

        // User Management
        $admin->get('/users', [UserController::class, 'getAll']);
        $admin->get('/users/{id}', [UserController::class, 'getOne']);
        $admin->post('/users', [UserController::class, 'create']);
        $admin->put('/users/{id}', [UserController::class, 'update']);
        $admin->delete('/users/{id}', [UserController::class, 'delete']);
        $admin->get('/roles', [UserController::class, 'getRoles']);
        $admin->get('/permissions', [UserController::class, 'getPermissions']);
    });
});

// Root endpoint
$app->get('/', function ($request, $response) {
    $response->getBody()->write(json_encode([
        'success' => true,
        'message' => 'Radio Platform API',
        'version' => '1.0.0'
    ]));
    return $response->withHeader('Content-Type', 'application/json');
});
