-- Add permissions and sessions tables for authentication

USE radio_platform;

-- Sessions table for JWT/session management
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent VARCHAR(500) DEFAULT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Permissions table
CREATE TABLE IF NOT EXISTS permissions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Role permissions mapping
CREATE TABLE IF NOT EXISTS role_permissions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role ENUM('admin', 'editor', 'moderator', 'user') NOT NULL,
    permission_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_role_permission (role, permission_id),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default permissions
INSERT INTO permissions (name, description) VALUES
('articles.create', 'Create new articles'),
('articles.edit', 'Edit articles'),
('articles.delete', 'Delete articles'),
('articles.publish', 'Publish articles'),
('stations.create', 'Create new stations'),
('stations.edit', 'Edit stations'),
('stations.delete', 'Delete stations'),
('programs.create', 'Create new programs'),
('programs.edit', 'Edit programs'),
('programs.delete', 'Delete programs'),
('users.create', 'Create new users'),
('users.edit', 'Edit users'),
('users.delete', 'Delete users'),
('requests.view', 'View song requests'),
('requests.manage', 'Manage song requests'),
('settings.manage', 'Manage system settings')
ON DUPLICATE KEY UPDATE description=VALUES(description);

-- Assign permissions to roles
-- Admin: All permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions
ON DUPLICATE KEY UPDATE role=VALUES(role);

-- Editor: Content management
INSERT INTO role_permissions (role, permission_id)
SELECT 'editor', id FROM permissions 
WHERE name IN (
    'articles.create', 'articles.edit', 'articles.delete', 'articles.publish',
    'programs.create', 'programs.edit', 'programs.delete',
    'requests.view', 'requests.manage'
)
ON DUPLICATE KEY UPDATE role=VALUES(role);

-- Moderator: View and moderate content
INSERT INTO role_permissions (role, permission_id)
SELECT 'moderator', id FROM permissions 
WHERE name IN (
    'articles.edit', 'requests.view', 'requests.manage'
)
ON DUPLICATE KEY UPDATE role=VALUES(role);

-- User: Basic permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'user', id FROM permissions 
WHERE name IN ('requests.view')
ON DUPLICATE KEY UPDATE role=VALUES(role);

-- Update existing admin user with password (default: admin123)
UPDATE users 
SET password_hash = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    email = 'admin@radionewsong.sl'
WHERE id = 1;
