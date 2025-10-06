-- Enhanced Management Schema for Radio Platform

USE radio_platform;

-- Program questions/messages table
CREATE TABLE IF NOT EXISTS program_questions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    program_id INT UNSIGNED NOT NULL,
    station_id INT UNSIGNED NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_phone VARCHAR(50) DEFAULT NULL,
    sender_email VARCHAR(255) DEFAULT NULL,
    question TEXT NOT NULL,
    status ENUM('pending', 'approved', 'answered', 'rejected') DEFAULT 'pending',
    answered_by INT UNSIGNED DEFAULT NULL,
    answer TEXT DEFAULT NULL,
    is_live BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
    FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE CASCADE,
    FOREIGN KEY (answered_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_program_id (program_id),
    INDEX idx_station_id (station_id),
    INDEX idx_status (status),
    INDEX idx_is_live (is_live),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add program schedule fields for time-based checks
ALTER TABLE programs 
ADD COLUMN start_time TIME DEFAULT NULL,
ADD COLUMN end_time TIME DEFAULT NULL,
ADD COLUMN days_of_week JSON DEFAULT NULL,
ADD COLUMN allows_questions BOOLEAN DEFAULT TRUE;

-- Update song requests table with better status tracking
ALTER TABLE song_requests
ADD COLUMN played_at TIMESTAMP NULL DEFAULT NULL,
ADD COLUMN rejected_reason TEXT DEFAULT NULL;

-- Update shoutouts table with better tracking
ALTER TABLE shoutouts
ADD COLUMN read_on_air BOOLEAN DEFAULT FALSE,
ADD COLUMN read_at TIMESTAMP NULL DEFAULT NULL;

-- Add permissions for new features
INSERT INTO permissions (name, description) VALUES
('questions.view', 'View program questions'),
('questions.manage', 'Manage program questions'),
('questions.answer', 'Answer program questions'),
('requests.approve', 'Approve song requests'),
('requests.reject', 'Reject song requests')
ON DUPLICATE KEY UPDATE description=VALUES(description);

-- Update role permissions for new features
-- Admin gets all new permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions 
WHERE name IN ('questions.view', 'questions.manage', 'questions.answer', 'requests.approve', 'requests.reject')
ON DUPLICATE KEY UPDATE role=VALUES(role);

-- Editor gets question and request management
INSERT INTO role_permissions (role, permission_id)
SELECT 'editor', id FROM permissions 
WHERE name IN ('questions.view', 'questions.manage', 'questions.answer', 'requests.approve', 'requests.reject')
ON DUPLICATE KEY UPDATE role=VALUES(role);

-- Moderator gets view and answer permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'moderator', id FROM permissions 
WHERE name IN ('questions.view', 'questions.answer')
ON DUPLICATE KEY UPDATE role=VALUES(role);

-- Sample data for program schedules
UPDATE programs 
SET 
    start_time = '06:00:00',
    end_time = '09:00:00',
    days_of_week = '["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]',
    allows_questions = TRUE
WHERE name = 'Morning Glory';

UPDATE programs 
SET 
    start_time = '09:00:00',
    end_time = '10:00:00',
    days_of_week = '["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]',
    allows_questions = TRUE
WHERE name = 'The Word Today';

UPDATE programs 
SET 
    start_time = '12:00:00',
    end_time = '14:00:00',
    days_of_week = '["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]',
    allows_questions = TRUE
WHERE name = 'Midday Praise';

UPDATE programs 
SET 
    start_time = '16:00:00',
    end_time = '18:00:00',
    days_of_week = '["Monday", "Wednesday", "Friday"]',
    allows_questions = TRUE
WHERE name = 'Youth Alive';

UPDATE programs 
SET 
    start_time = '19:00:00',
    end_time = '21:00:00',
    days_of_week = '["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]',
    allows_questions = TRUE
WHERE name = 'Evening Reflections';
