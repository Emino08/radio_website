USE radio_platform;

-- Clear existing data
TRUNCATE TABLE poll_votes;
TRUNCATE TABLE polls;
TRUNCATE TABLE shoutouts;
TRUNCATE TABLE song_requests;
TRUNCATE TABLE favorites;
TRUNCATE TABLE articles;
TRUNCATE TABLE article_categories;
TRUNCATE TABLE programs;
TRUNCATE TABLE stations;
TRUNCATE TABLE users;

-- Admin user
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@radionewsong.sl', '$2y$10$YourHashedPasswordHere', 'Administrator', 'admin'),
('editor@radionewsong.sl', '$2y$10$YourHashedPasswordHere', 'Content Editor', 'editor');

-- Radio New Song 97.7 FM
INSERT INTO stations (name, slug, logo_url, description, tagline, stream_url, genre, sub_genres, language, country, is_active, is_featured, listener_count, social_media) VALUES
('Radio New Song 97.7 FM', 'radio-new-song', 'https://ui-avatars.com/api/?name=Radio+New+Song&size=400&background=072043&color=bf993b&bold=true', 
'Broadcasting the Good News and uplifting Christian music to Bo, Sierra Leone and beyond. Your source for inspiration, biblical teachings, gospel music, and community news.', 
'Broadcasting the Good News • Bo, Sierra Leone', 
'https://stream.radionewsong.sl/live',
'Christian',
'["Gospel", "Praise & Worship", "Contemporary Christian", "Inspirational Talk"]',
'English',
'Sierra Leone',
TRUE,
TRUE,
0,
'{"facebook": "radionewsongsl", "instagram": "radionewsong977", "twitter": "radionewsong", "youtube": "radionewsong977"}');

-- Programs for Radio New Song
INSERT INTO programs (station_id, name, slug, description, host_name, host_bio, artwork_url, genre, schedule, is_active) VALUES
(1, 'Morning Glory', 'morning-glory', 'Start your day with uplifting worship, inspiring devotions, and the latest news. A perfect blend of praise and information to energize your morning.', 'Mary Bangura', 'Morning show host with a passion for uplifting listeners through God''s Word', 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop', 'Morning Show', '{"monday": ["06:00-09:00"], "tuesday": ["06:00-09:00"], "wednesday": ["06:00-09:00"], "thursday": ["06:00-09:00"], "friday": ["06:00-09:00"]}', TRUE),

(1, 'The Word Today', 'the-word-today', 'Deep dive into the Scriptures with powerful biblical teaching and practical application for daily Christian living.', 'Rev. Samuel Kamara', 'Station Manager and Bible teacher with over 15 years of ministry experience', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', 'Teaching', '{"monday": ["09:00-10:00"], "tuesday": ["09:00-10:00"], "wednesday": ["09:00-10:00"], "thursday": ["09:00-10:00"], "friday": ["09:00-10:00"]}', TRUE),

(1, 'Midday Praise', 'midday-praise', 'Non-stop praise and worship music to keep your spirit lifted throughout the day. Includes listener dedications and song requests.', 'Grace Koroma', 'Program Director with a heart for worship music', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop', 'Music', '{"monday": ["12:00-14:00"], "tuesday": ["12:00-14:00"], "wednesday": ["12:00-14:00"], "thursday": ["12:00-14:00"], "friday": ["12:00-14:00"], "saturday": ["12:00-14:00"]}', TRUE),

(1, 'Youth Alive', 'youth-alive', 'A dynamic program designed for young people featuring contemporary Christian music, youth testimonies, and discussions on relevant topics.', 'Joseph Sesay', 'Youth pastor and radio host passionate about reaching the next generation', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop', 'Youth', '{"monday": ["16:00-18:00"], "wednesday": ["16:00-18:00"], "friday": ["16:00-18:00"]}', TRUE),

(1, 'Evening Reflections', 'evening-reflections', 'End your day with peace and reflection. Evening prayers, soothing worship songs, and encouraging words to prepare your heart for rest.', 'Pastor John Koroma', 'Pastor and counselor bringing God''s peace to listeners', 'https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=400&h=300&fit=crop', 'Devotional', '{"monday": ["19:00-21:00"], "tuesday": ["19:00-21:00"], "wednesday": ["19:00-21:00"], "thursday": ["19:00-21:00"], "friday": ["19:00-21:00"], "saturday": ["19:00-21:00"], "sunday": ["19:00-21:00"]}', TRUE),

(1, 'Sunday Celebration', 'sunday-celebration', 'Live church service broadcasts from different churches across Bo. Experience the joy of corporate worship from the comfort of your home.', 'Various Ministers', 'Featuring guest ministers from churches across Bo', 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=300&fit=crop', 'Church Service', '{"sunday": ["09:00-12:00"]}', TRUE),

(1, 'Gospel Hour', 'gospel-hour', 'Powerful gospel music from around the world featuring both traditional and contemporary Christian artists.', 'Ministry Team', 'Curated gospel music selection', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop', 'Music', '{"saturday": ["15:00-17:00"], "sunday": ["15:00-17:00"]}', TRUE),

(1, 'Night Watch', 'night-watch', 'Late night prayer and intercession program. Call in with your prayer requests and join us in seeking God''s face.', 'Prayer Team', 'Dedicated prayer warriors interceding for listeners', 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=400&h=300&fit=crop', 'Prayer', '{"friday": ["22:00-00:00"], "saturday": ["22:00-00:00"]}', TRUE);

-- Article Categories
INSERT INTO article_categories (name, slug, description) VALUES
('Station News', 'station-news', 'Updates and announcements from Radio New Song'),
('Community', 'community', 'News and stories from Bo and surrounding communities'),
('Events', 'events', 'Upcoming events and programs'),
('Faith & Inspiration', 'faith-inspiration', 'Inspirational articles and faith-building content'),
('Interviews', 'interviews', 'Conversations with ministers, artists, and community leaders'),
('Programs', 'programs', 'Information about our radio programs');

-- Sample Articles
INSERT INTO articles (title, slug, content, excerpt, featured_image, author_id, category_id, tags, status, views, published_at) VALUES
('Radio New Song Celebrates 13 Years of Broadcasting Excellence', 
'13-years-broadcasting', 
'<h2>A Journey of Faith and Service</h2><p>As we mark over a decade of faithful service to Bo and surrounding communities, we reflect on God\'s goodness and our journey of impacting lives through Christian radio broadcasting.</p><p>Since our establishment in 2010, Radio New Song 97.7 FM has been committed to proclaiming the Gospel of Jesus Christ through quality Christian broadcasting. What started as a small vision has grown into one of the most trusted and beloved radio stations in the Southern Province.</p><h3>Our Impact</h3><p>Over the years, we have touched thousands of lives through our programming, reaching listeners not just in Bo, but across Kenema, Moyamba, and Pujehun districts. Our listeners have shared countless testimonies of how our programs have strengthened their faith, brought peace in difficult times, and connected them to the body of Christ.</p><p>We are grateful to God, our listeners, partners, and advertisers who have made this journey possible. As we look to the future, we remain committed to excellence in broadcasting and faithful service to our community.</p>',
'As we mark over a decade of faithful service, we reflect on God\'s goodness and our journey of impacting lives through Christian radio.',
'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=500&fit=crop',
1,
1,
'["anniversary", "milestone", "celebration"]',
'published',
1245,
'2024-01-15 10:00:00'),

('New Youth Program "Youth Alive" Launches This Saturday',
'youth-alive-launch',
'<h2>Reaching the Next Generation</h2><p>Radio New Song is excited to announce the launch of "Youth Alive" - a dynamic new program designed specifically for young people in Bo and beyond.</p><p>Hosted by Joseph Sesay, a passionate youth pastor and radio host, "Youth Alive" will feature contemporary Christian music, youth testimonies, relevant discussions on faith and life, and interactive segments where young people can call in and share their thoughts.</p><h3>Program Details</h3><p>Youth Alive will air every Monday, Wednesday, and Friday from 4:00 PM to 6:00 PM. The program is specifically designed to address the unique challenges and opportunities that young people face today, all within a biblical framework.</p><p>"We believe that young people are not just the church of tomorrow, but the church of today," says Joseph. "This program is our commitment to speaking into their lives with relevant, engaging, and biblically-grounded content."</p>',
'We are excited to announce the launch of "Youth Alive" - a dynamic new program designed specifically for young people in Bo and beyond.',
'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop',
1,
6,
'["programs", "youth", "new", "launch"]',
'published',
892,
'2024-01-12 14:30:00'),

('Community Outreach: Radio New Song Supports Local Schools',
'community-outreach-schools',
'<h2>Giving Back to Our Community</h2><p>In partnership with local churches, Radio New Song recently donated educational materials to three schools in Bo district, demonstrating our commitment to community development beyond broadcasting.</p><p>The donation drive, which included textbooks, writing materials, and school supplies, benefited over 500 students across three schools: Bo Government Secondary School, St. Mary\'s Primary School, and Methodist Primary School.</p><h3>Faith in Action</h3><p>"Our mission goes beyond what we do on air," said Rev. Samuel Kamara, Station Manager. "We believe in putting our faith into action by serving our community in practical ways. Education is a key to breaking the cycle of poverty, and we are honored to support these schools."</p><p>The schools expressed deep gratitude for the support, noting that these materials will significantly improve the learning experience for students who often struggle to afford basic school supplies.</p>',
'In partnership with local churches, we recently donated educational materials to three schools in Bo district.',
'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=500&fit=crop',
1,
2,
'["community", "outreach", "education", "schools"]',
'published',
654,
'2024-01-10 09:00:00'),

('Easter Celebration: Special Programming Announced',
'easter-celebration-2024',
'<h2>Celebrate the Resurrection with Us</h2><p>Join Radio New Song 97.7 FM for a week of special Easter programming featuring live church services, Easter music marathons, and inspirational messages about the hope we have in Christ.</p><h3>Special Programs</h3><ul><li><strong>Palm Sunday (March 24):</strong> Live broadcast from Bo Community Church at 9:00 AM</li><li><strong>Good Friday (March 29):</strong> "The Cross" - A special reflection program from 12:00 PM to 3:00 PM</li><li><strong>Easter Sunday (March 31):</strong> Sunrise Service at 6:00 AM, followed by multiple church service broadcasts</li><li><strong>Easter Monday (April 1):</strong> Easter music marathon and family programming</li></ul><p>We invite you to tune in and celebrate the resurrection of our Lord Jesus Christ with us. All programs will be broadcast on 97.7 FM and available online at www.radionewsong.sl/live</p>',
'Join us for a week of special Easter programming featuring live church services, Easter music, and inspirational messages.',
'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=500&fit=crop',
1,
3,
'["easter", "events", "church", "special programming"]',
'published',
1103,
'2024-01-08 11:00:00'),

('Interview: Bishop Moses Speaks on Faith and Leadership',
'bishop-moses-interview',
'<h2>Wisdom for Christian Leaders</h2><p>On Monday morning, our Morning Glory show hosted Bishop Moses Kamara, Bishop of the Bo Diocese, for an insightful conversation about Christian leadership in modern Sierra Leone.</p><p>During the hour-long interview, Bishop Moses shared wisdom on topics including servant leadership, maintaining integrity in positions of influence, balancing ministry and family life, and the role of the church in national development.</p><h3>Key Takeaways</h3><p>"True leadership is not about position or power, but about service," Bishop Moses emphasized. "Jesus showed us the way when He washed His disciples\' feet. Leadership in the Kingdom of God is always about serving others."</p><p>The Bishop also spoke about the importance of young leaders in the church, encouraging them to step up while remaining humble and teachable. "We need fresh vision and energy, but it must be grounded in biblical principles and guided by wisdom," he said.</p>',
'Our morning show hosted Bishop Moses for an insightful conversation about Christian leadership in modern Sierra Leone.',
'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop',
1,
5,
'["interview", "bishop", "leadership", "faith"]',
'published',
756,
'2024-01-05 15:00:00'),

('New Studio Equipment Enhances Broadcast Quality',
'new-studio-equipment',
'<h2>Investing in Excellence</h2><p>Thanks to generous donations from our partners and listeners, Radio New Song has upgraded our studio equipment to deliver even better sound quality to our audience.</p><p>The upgrades include new microphones, mixing console, audio processors, and broadcast transmission equipment. These improvements will result in clearer audio, better music quality, and more professional program production.</p><p>"We are so grateful to everyone who contributed to this project," said Grace Koroma, Program Director. "Quality matters because our message matters. We want every word of Scripture, every song of worship, and every teaching to come through clearly."</p>',
'Thanks to generous donations, we have upgraded our studio equipment to deliver even better sound quality to our listeners.',
'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop',
1,
1,
'["equipment", "upgrade", "technology", "quality"]',
'published',
543,
'2024-01-03 16:00:00');

-- Sample Song Requests
INSERT INTO song_requests (station_id, song_name, artist_name, message, requester_name, requester_email, status) VALUES
(1, 'Waymaker', 'Sinach', 'Please play this powerful song. God is our waymaker!', 'Mohamed Kamara', 'mohamed@example.com', 'approved'),
(1, 'Goodness of God', 'Bethel Music', 'This song always lifts my spirit. Thank you Radio New Song!', 'Fatmata Sesay', 'fatmata@example.com', 'played'),
(1, 'Reckless Love', 'Cory Asbury', 'Can you play this during Midday Praise? Its my favorite!', 'Ibrahim Koroma', 'ibrahim@example.com', 'pending'),
(1, 'Great Are You Lord', 'All Sons & Daughters', 'Requesting this beautiful worship song', 'Mariama Bangura', 'mariama@example.com', 'approved');

-- Sample Shoutouts
INSERT INTO shoutouts (station_id, name, message, status) VALUES
(1, 'Pastor James', 'Shoutout to my church family at Living Word Chapel! God bless you all.', 'approved'),
(1, 'Aminata', 'Happy birthday to my mother! May God continue to bless you. Love from your daughter.', 'approved'),
(1, 'Rev. David', 'Congratulations to all graduates from Bo Teachers College! Go and impact lives!', 'read'),
(1, 'Sarah', 'Thank you Radio New Song for your faithful ministry. You are a blessing to Bo!', 'approved');

-- Sample Poll
INSERT INTO polls (title, description, options, is_active, end_date) VALUES
('Which Program is Your Favorite?', 'Help us know which programs you love most!', '[{"option": "Morning Glory", "votes": 0}, {"option": "The Word Today", "votes": 0}, {"option": "Midday Praise", "votes": 0}, {"option": "Youth Alive", "votes": 0}, {"option": "Evening Reflections", "votes": 0}, {"option": "Sunday Celebration", "votes": 0}]', TRUE, DATE_ADD(NOW(), INTERVAL 30 DAY));

-- Update listener count for Radio New Song
UPDATE stations SET listener_count = FLOOR(RAND() * 50) + 10 WHERE id = 1;
