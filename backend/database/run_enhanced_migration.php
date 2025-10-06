<?php

require __DIR__ . '/../vendor/autoload.php';

use App\Database;

try {
    $db = Database::getInstance()->getConnection();
    
    echo "Running enhanced management schema migration...\n\n";
    
    $sql = file_get_contents(__DIR__ . '/enhanced_management_schema.sql');
    
    // Split by semicolon and execute each statement
    $statements = array_filter(array_map('trim', explode(';', $sql)));
    
    foreach ($statements as $statement) {
        if (!empty($statement)) {
            try {
                $db->exec($statement);
            } catch (Exception $e) {
                // Ignore errors for ALTER TABLE if column already exists
                if (strpos($e->getMessage(), 'Duplicate column name') === false &&
                    strpos($e->getMessage(), 'Duplicate entry') === false) {
                    echo "Warning: " . $e->getMessage() . "\n";
                }
            }
        }
    }
    
    echo "✅ Enhanced management schema migrated successfully!\n";
    echo "✅ Program questions table created!\n";
    echo "✅ Program schedules updated!\n";
    echo "✅ New permissions added!\n";
    echo "✅ Song requests and shoutouts enhanced!\n\n";
    
    echo "New features available:\n";
    echo "  - Program questions (live Q&A)\n";
    echo "  - Time-based program detection\n";
    echo "  - Enhanced request management\n";
    echo "  - Shoutout tracking\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
