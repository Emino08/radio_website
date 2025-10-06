<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use DI\Container;

require __DIR__ . '/../vendor/autoload.php';

// Create Container
$container = new Container();
AppFactory::setContainer($container);

// Create App
$app = AppFactory::create();

// Add body parsing middleware for JSON
$app->addBodyParsingMiddleware();

// Add error middleware
$app->addErrorMiddleware(true, true, true);

// Add CORS middleware
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// Handle OPTIONS requests
$app->options('/{routes:.+}', function ($request, $response) {
    return $response;
});

// Routes
require __DIR__ . '/../src/routes.php';

$app->run();
