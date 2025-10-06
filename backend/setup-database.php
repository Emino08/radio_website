<?php

echo "🚀 Setting up Radio Platform Database...\n\n";

$host = '127.0.0.1';
$port = 4306;
$username = 'root';
$password = '1212';
$database = 'radio_platform';

try {
    // Connect without database first
    echo "📡 Connecting to MySQL on port {$port}...\n";
    $pdo = new PDO(
        "mysql:host={$host};port={$port}",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::MYSQL_ATTR_MULTI_STATEMENTS => true
        ]
    );
    echo "✅ Connected successfully!\n\n";

    // Create database first
    echo "🗄️  Creating database '{$database}'...\n";
    try {
        $pdo->exec("CREATE DATABASE IF NOT EXISTS {$database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        echo "✅ Database created/verified\n\n";
    } catch (PDOException $e) {
        echo "⚠️  Database may already exist: " . $e->getMessage() . "\n\n";
    }

    // Switch to the database
    $pdo->exec("USE {$database}");

    // Read schema file
    echo "📄 Reading schema.sql...\n";
    $schema = file_get_contents(__DIR__ . '/database/schema.sql');

    if ($schema === false) {
        throw new Exception("Could not read schema.sql file");
    }

    echo "🔨 Creating tables...\n";

    // Remove CREATE DATABASE and USE statements from schema
    $schema = preg_replace('/CREATE DATABASE.*?;/is', '', $schema);
    $schema = preg_replace('/USE\s+\w+\s*;/i', '', $schema);

    // Execute the modified schema
    try {
        $pdo->exec($schema);
        echo "✅ All tables created successfully\n\n";
    } catch (PDOException $e) {
        // Tables might already exist, which is okay
        if (strpos($e->getMessage(), '1050') === false) {
            echo "⚠️  " . $e->getMessage() . "\n\n";
        } else {
            echo "✅ Tables already exist or created\n\n";
        }
    }

    // Read and execute seed data
    echo "📄 Reading seed.sql...\n";
    $seed = file_get_contents(__DIR__ . '/database/seed.sql');

    if ($seed !== false) {
        echo "🌱 Inserting sample data...\n";

        // Remove USE statement from seed
        $seed = preg_replace('/USE\s+\w+\s*;/i', '', $seed);

        try {
            $pdo->exec($seed);
            echo "✅ Sample data inserted successfully\n\n";
        } catch (PDOException $e) {
            // Data might already exist
            if (strpos($e->getMessage(), '1062') === false) {
                echo "⚠️  " . $e->getMessage() . "\n\n";
            } else {
                echo "✅ Sample data already exists or inserted\n\n";
            }
        }
    }

    // Verify setup
    echo "🔍 Verifying database setup...\n\n";

    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "📊 Found " . count($tables) . " tables:\n";
    foreach ($tables as $table) {
        $count = $pdo->query("SELECT COUNT(*) FROM `{$table}`")->fetchColumn();
        echo "   ✓ {$table} ({$count} records)\n";
    }

    echo "\n";

    // Summary
    $stationCount = $pdo->query("SELECT COUNT(*) FROM stations")->fetchColumn();
    $articleCount = $pdo->query("SELECT COUNT(*) FROM articles")->fetchColumn();
    $programCount = $pdo->query("SELECT COUNT(*) FROM programs")->fetchColumn();
    $userCount = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();

    echo "✅ ✅ ✅ DATABASE SETUP COMPLETE! ✅ ✅ ✅\n\n";
    echo "📈 Summary:\n";
    echo "   🎙️  Radio Stations: {$stationCount}\n";
    echo "   📰 Articles: {$articleCount}\n";
    echo "   📻 Programs: {$programCount}\n";
    echo "   👤 Users: {$userCount}\n";
    echo "\n";
    echo "🔐 Admin Login:\n";
    echo "   Email: admin@radio.com\n";
    echo "   Password: admin123\n";
    echo "\n";
    echo "🚀 Next steps:\n";
    echo "   1. Start backend:  php -S localhost:8080 -t public\n";
    echo "   2. Start frontend: cd ../frontend && npm run dev\n";
    echo "   3. Open browser:   http://localhost:5173\n";
    echo "\n";

} catch (PDOException $e) {
    echo "❌ Database Error: " . $e->getMessage() . "\n\n";
    echo "Please check:\n";
    echo "1. MySQL is running on port {$port}\n";
    echo "2. Username '{$username}' with password '{$password}' is correct\n";
    echo "3. You have permissions to create databases\n";
    exit(1);
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
