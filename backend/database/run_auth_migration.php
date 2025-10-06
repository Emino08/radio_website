<?php

require __DIR__ . '/../vendor/autoload.php';

use App\Database;

try {
    $db = Database::getInstance()->getConnection();
    
    $sql = file_get_contents(__DIR__ . '/auth_schema.sql');
    
    $db->exec($sql);
    
    echo "✅ Authentication schema created successfully!\n";
    echo "✅ Permissions and roles configured!\n";
    echo "✅ Default admin user updated (email: admin@radionewsong.sl, password: admin123)\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
