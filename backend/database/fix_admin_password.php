<?php

require __DIR__ . '/../vendor/autoload.php';

use App\Database;

try {
    $db = Database::getInstance()->getConnection();
    
    echo "Checking admin user in database...\n\n";
    
    $stmt = $db->query("SELECT id, email, password_hash FROM users WHERE email = 'admin@radionewsong.sl'");
    $user = $stmt->fetch();
    
    if ($user) {
        echo "✅ User found:\n";
        echo "   ID: " . $user['id'] . "\n";
        echo "   Email: " . $user['email'] . "\n";
        echo "   Password Hash: " . substr($user['password_hash'], 0, 20) . "...\n\n";
        
        // Test the password
        echo "Testing password 'admin123':\n";
        $verify = password_verify('admin123', $user['password_hash']);
        
        if ($verify) {
            echo "   ✅ Password verification: SUCCESS\n";
            echo "   The password 'admin123' is correct!\n";
        } else {
            echo "   ❌ Password verification: FAILED\n";
            echo "   The stored hash doesn't match 'admin123'\n\n";
            
            // Generate correct hash
            echo "Fixing password hash...\n";
            $correctHash = password_hash('admin123', PASSWORD_BCRYPT);
            
            $updateStmt = $db->prepare("UPDATE users SET password_hash = :hash WHERE id = :id");
            $updateStmt->execute([
                ':hash' => $correctHash,
                ':id' => $user['id']
            ]);
            
            echo "   ✅ Password hash updated!\n";
            echo "   New hash: " . substr($correctHash, 0, 20) . "...\n";
            echo "   Login should now work with 'admin123'\n";
        }
    } else {
        echo "❌ User not found!\n";
        echo "Creating admin user...\n\n";
        
        $hash = password_hash('admin123', PASSWORD_BCRYPT);
        
        $stmt = $db->prepare("
            INSERT INTO users (email, password_hash, name, role)
            VALUES (:email, :hash, :name, :role)
        ");
        
        $stmt->execute([
            ':email' => 'admin@radionewsong.sl',
            ':hash' => $hash,
            ':name' => 'Admin User',
            ':role' => 'admin'
        ]);
        
        echo "✅ Admin user created!\n";
        echo "   Email: admin@radionewsong.sl\n";
        echo "   Password: admin123\n";
    }
    
    echo "\n✅ Done!\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
