USE radio_platform;

-- Sample radio stations
INSERT INTO stations (name, slug, logo_url, description, tagline, stream_url, genre, sub_genres, language, country, is_active, is_featured, social_media) VALUES
('Beat FM', 'beat-fm', '/uploads/stations/beat-fm.png', 'The hottest hits and the coolest beats, 24/7', 'Your Beat, Your Music', 'https://stream.example.com/beatfm', 'Pop', '["Top 40", "Dance", "Electronic"]', 'English', 'USA', TRUE, TRUE, '{"facebook": "beatfm", "twitter": "beatfm", "instagram": "beatfm"}'),
('Classic Rock Radio', 'classic-rock', '/uploads/stations/classic-rock.png', 'The best rock classics from the 60s, 70s, and 80s', 'Rock On!', 'https://stream.example.com/classicrock', 'Rock', '["Classic Rock", "Hard Rock", "Metal"]', 'English', 'UK', TRUE, TRUE, '{"facebook": "classicrockradio", "twitter": "classicrock"}'),
('Jazz Lounge', 'jazz-lounge', '/uploads/stations/jazz-lounge.png', 'Smooth jazz and relaxing melodies for your soul', 'Smooth Vibes Only', 'https://stream.example.com/jazzlounge', 'Jazz', '["Smooth Jazz", "Contemporary Jazz", "Blues"]', 'English', 'USA', TRUE, FALSE, '{"instagram": "jazzlounge", "youtube": "jazzlounge"}'),
('Hip Hop Nation', 'hip-hop-nation', '/uploads/stations/hiphop.png', 'The freshest hip hop and R&B tracks', 'Real Hip Hop Lives Here', 'https://stream.example.com/hiphopnation', 'Hip Hop', '["Rap", "R&B", "Trap"]', 'English', 'USA', TRUE, TRUE, '{"twitter": "hiphopnation", "instagram": "hiphopnation"}'),
('News 24/7', 'news-247', '/uploads/stations/news.png', 'Breaking news and current affairs around the clock', 'Stay Informed', 'https://stream.example.com/news247', 'News', '["Politics", "Business", "World News"]', 'English', 'USA', TRUE, FALSE, '{"facebook": "news247", "twitter": "news247"}'),
('Country Roads', 'country-roads', '/uploads/stations/country.png', 'The best country music from Nashville and beyond', 'Take Me Home', 'https://stream.example.com/countryroads', 'Country', '["Modern Country", "Classic Country", "Bluegrass"]', 'English', 'USA', TRUE, FALSE, '{"facebook": "countryroads", "instagram": "countryroads"}');

-- Sample programs
INSERT INTO programs (station_id, name, slug, description, host_name, host_bio, genre, schedule, is_active) VALUES
(1, 'Morning Rush', 'morning-rush', 'Start your day with energy! The hottest tracks and morning talk', 'Sarah Johnson', 'Award-winning radio host with 10 years of experience', 'Morning Show', '{"monday": ["06:00-10:00"], "tuesday": ["06:00-10:00"], "wednesday": ["06:00-10:00"], "thursday": ["06:00-10:00"], "friday": ["06:00-10:00"]}', TRUE),
(1, 'Beat After Dark', 'beat-after-dark', 'Late night vibes with the best electronic and dance music', 'DJ Mike Stevens', 'Electronic music producer and DJ', 'Electronic', '{"friday": ["22:00-02:00"], "saturday": ["22:00-02:00"]}', TRUE),
(2, 'Rock Legends Hour', 'rock-legends-hour', 'Deep dive into rock history with classic albums and artist stories', 'Tom Richards', 'Music historian and rock enthusiast', 'Rock', '{"sunday": ["20:00-21:00"]}', TRUE),
(3, 'Sunday Jazz Brunch', 'sunday-jazz-brunch', 'Relaxing jazz music perfect for your Sunday morning', 'Lisa Anderson', 'Jazz pianist and radio personality', 'Jazz', '{"sunday": ["10:00-14:00"]}', TRUE),
(4, 'Fresh Beats Friday', 'fresh-beats-friday', 'New hip hop releases and exclusive mixes every Friday', 'DJ Ace', 'Hip hop producer and turntablist', 'Hip Hop', '{"friday": ["18:00-20:00"]}', TRUE);

-- Sample articles
INSERT INTO articles (title, slug, content, excerpt, featured_image, author_id, category_id, status, views, published_at) VALUES
('Top 10 Songs Taking Over The Airwaves This Week', 'top-10-songs-this-week', '<h2>The Hottest Tracks Right Now</h2><p>This week brings an exciting mix of new releases and climbing favorites. From pop anthems to hip-hop bangers, here are the songs dominating the charts...</p><ol><li><strong>Artist Name - Song Title</strong>: This track has been breaking records...</li></ol>', 'Discover the top songs currently dominating radio stations nationwide', '/uploads/articles/top-songs.jpg', 1, 1, 'published', 1250, NOW()),
('Beat FM Launches New Morning Show', 'beat-fm-new-morning-show', '<h2>Exciting Changes Coming to Your Morning Routine</h2><p>We are thrilled to announce the launch of our brand new morning show, "Morning Rush" with Sarah Johnson! Starting next Monday...</p>', 'Beat FM introduces exciting new morning programming with award-winning host', '/uploads/articles/morning-show.jpg', 1, 2, 'published', 890, NOW()),
('The Evolution of Radio in the Digital Age', 'evolution-radio-digital-age', '<h2>How Radio Continues to Thrive</h2><p>Despite predictions to the contrary, radio has not only survived but thrived in the digital age. The medium has evolved, embracing streaming technology...</p>', 'Exploring how traditional radio has adapted and flourished in the streaming era', '/uploads/articles/radio-evolution.jpg', 1, 3, 'published', 2100, NOW()),
('Exclusive Interview: Chart-Topping Artist Talks New Album', 'exclusive-artist-interview', '<h2>Behind the Music</h2><p>We sat down with one of this year''s breakout artists to discuss their creative process, inspirations, and what fans can expect from the upcoming album...</p>', 'An in-depth conversation with the artist making waves this year', '/uploads/articles/interview.jpg', 1, 5, 'published', 3450, NOW());

-- Sample song requests
INSERT INTO song_requests (station_id, song_name, artist_name, message, requester_name, requester_email, status) VALUES
(1, 'Blinding Lights', 'The Weeknd', 'Love this song! Can you play it?', 'John Doe', 'john@example.com', 'approved'),
(2, 'Bohemian Rhapsody', 'Queen', 'Classic! Please play this masterpiece', 'Jane Smith', 'jane@example.com', 'played'),
(4, 'God''s Plan', 'Drake', 'My favorite track', 'Mike Wilson', 'mike@example.com', 'pending');

-- Sample shoutouts
INSERT INTO shoutouts (station_id, name, message, status) VALUES
(1, 'Sarah', 'Happy birthday to my best friend Emma! Love you!', 'approved'),
(1, 'Marcus', 'Shoutout to all the healthcare workers! You''re amazing!', 'approved'),
(2, 'Tom', 'Celebrating 20 years of marriage today! Rock on!', 'read');

-- Sample poll
INSERT INTO polls (title, description, options, is_active, end_date) VALUES
('What''s Your Favorite Music Genre?', 'Help us understand our listeners better!', '[{"option": "Pop", "votes": 0}, {"option": "Rock", "votes": 0}, {"option": "Hip Hop", "votes": 0}, {"option": "Jazz", "votes": 0}, {"option": "Country", "votes": 0}, {"option": "Electronic", "votes": 0}]', TRUE, DATE_ADD(NOW(), INTERVAL 30 DAY));
