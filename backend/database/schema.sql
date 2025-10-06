-- Create database
CREATE DATABASE IF NOT EXISTS radio_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE radio_platform;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    avatar VARCHAR(500) DEFAULT NULL,
    role ENUM('admin', 'editor', 'moderator', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stations table
CREATE TABLE IF NOT EXISTS stations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    logo_url VARCHAR(500) DEFAULT NULL,
    description TEXT,
    tagline VARCHAR(255) DEFAULT NULL,
    stream_url VARCHAR(500) NOT NULL,
    stream_url_high VARCHAR(500) DEFAULT NULL,
    stream_url_low VARCHAR(500) DEFAULT NULL,
    genre VARCHAR(100) NOT NULL,
    sub_genres JSON DEFAULT NULL,
    language VARCHAR(50) DEFAULT 'English',
    country VARCHAR(100) DEFAULT NULL,
    listener_count INT UNSIGNED DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    social_media JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_genre (genre),
    INDEX idx_active (is_active),
    INDEX idx_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Programs/Shows table
CREATE TABLE IF NOT EXISTS programs (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    station_id INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    host_name VARCHAR(255) NOT NULL,
    host_bio TEXT DEFAULT NULL,
    host_avatar VARCHAR(500) DEFAULT NULL,
    artwork_url VARCHAR(500) DEFAULT NULL,
    genre VARCHAR(100) DEFAULT NULL,
    schedule JSON DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE CASCADE,
    INDEX idx_station_id (station_id),
    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Article categories table
CREATE TABLE IF NOT EXISTS article_categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Articles/News table
CREATE TABLE IF NOT EXISTS articles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    content LONGTEXT NOT NULL,
    excerpt TEXT DEFAULT NULL,
    featured_image VARCHAR(500) DEFAULT NULL,
    author_id INT UNSIGNED DEFAULT NULL,
    category_id INT UNSIGNED DEFAULT NULL,
    tags JSON DEFAULT NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    views INT UNSIGNED DEFAULT 0,
    published_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES article_categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_author_id (author_id),
    INDEX idx_category_id (category_id),
    INDEX idx_published_at (published_at),
    FULLTEXT idx_search (title, content, excerpt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    station_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, station_id),
    INDEX idx_user_id (user_id),
    INDEX idx_station_id (station_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Song requests table
CREATE TABLE IF NOT EXISTS song_requests (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    station_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED DEFAULT NULL,
    song_name VARCHAR(255) NOT NULL,
    artist_name VARCHAR(255) DEFAULT NULL,
    message TEXT DEFAULT NULL,
    requester_name VARCHAR(100) DEFAULT NULL,
    requester_email VARCHAR(255) DEFAULT NULL,
    status ENUM('pending', 'approved', 'played', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_station_id (station_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Shoutouts table
CREATE TABLE IF NOT EXISTS shoutouts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    station_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED DEFAULT NULL,
    name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('pending', 'approved', 'read', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_station_id (station_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Polls table
CREATE TABLE IF NOT EXISTS polls (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    options JSON NOT NULL,
    station_id INT UNSIGNED DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE SET NULL,
    INDEX idx_active (is_active),
    INDEX idx_station_id (station_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Poll votes table
CREATE TABLE IF NOT EXISTS poll_votes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    poll_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED DEFAULT NULL,
    option_index INT UNSIGNED NOT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_poll_id (poll_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) DEFAULT NULL,
    message TEXT NOT NULL,
    type ENUM('general', 'advertising', 'partnership', 'technical', 'other') DEFAULT 'general',
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listening history table
CREATE TABLE IF NOT EXISTS listening_history (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    station_id INT UNSIGNED NOT NULL,
    duration_seconds INT UNSIGNED DEFAULT 0,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_station_id (station_id),
    INDEX idx_started_at (started_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default article categories
INSERT INTO article_categories (name, slug, description) VALUES
('Music News', 'music-news', 'Latest updates and news from the music industry'),
('Station News', 'station-news', 'Updates and announcements from our stations'),
('Industry Updates', 'industry-updates', 'Radio and broadcasting industry news'),
('Entertainment', 'entertainment', 'Entertainment and lifestyle content'),
('Interviews', 'interviews', 'Exclusive interviews with artists and personalities');

-- Insert default admin user (password: admin123 - should be changed!)
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@radio.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin');
