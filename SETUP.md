# 🚀 Quick Setup Guide

## Step-by-Step Installation

### 1. Database Setup (5 minutes)

First, make sure your MySQL server is running on port **4306** with password **1212**.

Open your MySQL client and run:

```bash
# Navigate to the backend/database folder
cd "C:\Users\SABITECK\OneDrive\Documenti\Projects\SABITECK\Radio website\backend\database"

# Import schema
mysql -u root -p1212 -P 4306 < schema.sql

# Import sample data
mysql -u root -p1212 -P 4306 < seed.sql
```

Or using MySQL Workbench:
1. Connect to `localhost:4306`
2. Open and execute `backend/database/schema.sql`
3. Open and execute `backend/database/seed.sql`

### 2. Backend Setup (2 minutes)

Open a terminal in the project root:

```bash
# Navigate to backend
cd backend

# Install PHP dependencies (if not already done)
composer install

# Start the backend server
php -S localhost:8080 -t public
```

You should see: `PHP 8.x Development Server (http://localhost:8080) started`

**Test the backend:**
Open your browser and visit: `http://localhost:8080/api/stations`

You should see a JSON response with radio stations.

### 3. Frontend Setup (3 minutes)

Open a **NEW terminal** (keep the backend running):

```bash
# Navigate to frontend
cd frontend

# Install Node.js dependencies (if not already done)
npm install

# Start the frontend development server
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 4. Access the Application

Open your browser and visit: **http://localhost:5173**

You should see the radio platform homepage with featured stations!

---

## 🧪 Verify Everything is Working

### Test Checklist:

- [ ] Homepage loads with hero section
- [ ] Featured stations are displayed
- [ ] You can see all stations in the grid
- [ ] Genre filter buttons work
- [ ] Search bar filters stations
- [ ] Clicking "Play Live" opens the audio player at the bottom
- [ ] Audio player shows station info
- [ ] Latest news articles are displayed at the bottom

### Common Issues:

**Backend not connecting to database?**
- Check MySQL is running on port 4306
- Verify password is "1212"
- Confirm database "radio_platform" exists

**Frontend API errors?**
- Ensure backend is running on `http://localhost:8080`
- Check browser console for error messages
- Verify proxy configuration in `frontend/vite.config.ts`

**Audio not playing?**
- Sample data uses placeholder stream URLs
- You need to add real radio stream URLs via admin panel
- Or update the seed data with working stream URLs

---

## 📊 Sample Data Included

The database comes pre-populated with:

- ✅ 6 radio stations (Beat FM, Classic Rock, Jazz Lounge, Hip Hop Nation, News 24/7, Country Roads)
- ✅ 5 programs/shows
- ✅ 4 sample news articles
- ✅ 5 article categories
- ✅ Sample song requests and shoutouts
- ✅ 1 admin user account

**Admin Login:**
- Email: `admin@radio.com`
- Password: `admin123` ⚠️

---

## 🎯 Next Steps

### 1. Update Stream URLs

Edit real radio stream URLs in the database:

```sql
UPDATE stations
SET stream_url = 'https://your-real-stream-url.com/stream'
WHERE id = 1;
```

### 2. Customize Branding

- Update station logos (add images to `backend/public/uploads/stations/`)
- Update article images
- Modify colors in `frontend/src/index.css` (CSS variables)

### 3. Create Your First Article

Use the admin API endpoint:

```bash
POST http://localhost:8080/api/admin/articles
Content-Type: application/json

{
  "title": "Your Article Title",
  "content": "<p>Your article content here</p>",
  "excerpt": "Short description",
  "category_id": 1,
  "status": "published"
}
```

### 4. Add More Stations

```bash
POST http://localhost:8080/api/admin/stations
Content-Type: application/json

{
  "name": "My New Station",
  "description": "The best music station",
  "stream_url": "https://stream-url.com/live",
  "genre": "Pop",
  "language": "English",
  "is_featured": true
}
```

---

## 🛠️ Development Commands

### Frontend

```bash
cd frontend

npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend

```bash
cd backend

composer install     # Install dependencies
composer dump-autoload  # Regenerate autoloader
php -S localhost:8080 -t public  # Start dev server
```

---

## 📱 Testing the Application

### Test Audio Streaming

1. Click on any "Play Live" button on a station card
2. Audio player appears at the bottom
3. Click play/pause to control playback
4. Adjust volume slider
5. Close player with X button

### Test Search & Filter

1. Type "Beat" in search bar → Only Beat FM should appear
2. Click "Rock" genre filter → Only rock stations appear
3. Click "All Genres" to reset

### Test Article Reading

1. Scroll to "Latest News" section
2. Click "Read More" on any article card
3. (Article detail page to be implemented)

---

## 🔒 Security Notes (For Production)

Before deploying to production:

1. **Change default admin password**
2. **Add authentication middleware** to admin routes
3. **Enable HTTPS** only
4. **Add rate limiting** to prevent abuse
5. **Sanitize all user inputs**
6. **Use environment variables** for sensitive config
7. **Enable CORS** only for your domain
8. **Add CSRF protection**

---

## 📞 Need Help?

If you encounter any issues:

1. Check this guide first
2. Review the main README.md
3. Check browser console for errors
4. Check backend terminal for PHP errors
5. Verify MySQL connection and database exists

**Happy Streaming! 🎙️📻**
