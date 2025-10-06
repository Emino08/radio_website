# Radio New Song 97.7 FM - Full Stack Integration Guide

## ✅ Complete Integration Status

Your Radio New Song website now has **FULL FRONTEND-BACKEND INTEGRATION** with a complete admin panel!

---

## 🎯 What's Integrated

### Frontend ↔ Backend Communication
✅ API endpoints connected via Vite proxy  
✅ Axios configured for all API calls  
✅ CORS enabled on backend  
✅ Error handling implemented  

### Admin Management System
✅ **Admin Dashboard** - Overview of all content  
✅ **Article Management** - Create, edit, delete articles  
✅ **Article Editor** - Full-featured content editor  
✅ **Navigation Integration** - Admin link in header  

### API Routes Working
✅ `/api/stations` - Get all stations  
✅ `/api/stations/{slug}` - Get single station  
✅ `/api/programs` - Get all programs  
✅ `/api/articles` - Get all articles  
✅ `/api/articles/featured` - Get featured articles  
✅ `/api/admin/articles` - Admin article management  
✅ `/api/admin/articles` POST - Create article  
✅ `/api/admin/articles/{id}` PUT - Update article  
✅ `/api/admin/articles/{id}` DELETE - Delete article  
✅ `/api/song-requests` POST - Submit song request  
✅ `/api/contact` POST - Submit contact form  

---

## 🚀 How to Start Everything

### Option 1: Use the Startup Script (Easiest)
```bash
START_FULL_APP.bat
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
php -S localhost:8080 -t public
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access Points
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8080/api
- **Admin Panel:** http://localhost:5173/admin

---

## 📋 Admin Panel Features

### Dashboard (`/admin`)
- Overview statistics
- Quick action buttons
- Recent activity feed

### Article Management (`/admin/articles`)
- View all articles
- Filter by status (draft/published)
- Edit existing articles
- Delete articles
- Preview articles

### Article Editor (`/admin/articles/new` or `/admin/articles/{id}/edit`)
- Rich text content editor
- Title and excerpt fields
- Featured image URL
- Category selection
- Status management (draft/published)
- Auto-generated slugs

---

## 🔗 Integration Points

### 1. API Configuration
**File:** `frontend/src/lib/api.ts`
```typescript
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 2. Vite Proxy Setup
**File:** `frontend/vite.config.ts`
```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

### 3. Backend CORS
**File:** `backend/public/index.php`
- CORS headers enabled for all origins
- Supports GET, POST, PUT, DELETE methods
- OPTIONS requests handled

---

## 🎨 Admin Routes Added

```typescript
// In App.tsx
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/admin/articles" element={<ArticleManagement />} />
<Route path="/admin/articles/new" element={<ArticleEditor />} />
<Route path="/admin/articles/:id/edit" element={<ArticleEditor />} />
```

---

## 📝 How to Use Admin Panel

### Create a New Article
1. Go to http://localhost:5173/admin
2. Click "Create New Article" or go to `/admin/articles/new`
3. Fill in:
   - Title (required)
   - Excerpt (optional summary)
   - Content (required, full article text)
   - Featured Image URL (optional)
   - Category (optional)
   - Status (draft or published)
4. Click "Create Article"

### Edit an Existing Article
1. Go to `/admin/articles`
2. Click the pencil icon on any article
3. Update the fields
4. Click "Update Article"

### Delete an Article
1. Go to `/admin/articles`
2. Click the trash icon on any article
3. Confirm deletion

---

## 🧪 Testing the Integration

### Test Backend Directly
```bash
# Get all stations
curl http://localhost:8080/api/stations

# Get all articles
curl http://localhost:8080/api/articles

# Get admin articles
curl http://localhost:8080/api/admin/articles
```

### Test Frontend → Backend
1. Open http://localhost:5173
2. Check browser console - should see no errors
3. Articles should load on homepage
4. Programs should load on /programs page

### Test Admin Panel
1. Go to http://localhost:5173/admin
2. Should see dashboard with statistics
3. Click "Articles" to manage content
4. Create a test article

---

## 🔧 Database Connection

The backend connects to MySQL:
```php
Host: localhost
Port: 4306
Database: radio_platform
Username: root
Password: 1212
```

### Seed the Database
```bash
cd backend/database
mysql -u root -p1212 -P 4306 radio_platform < seed_radionewsong.sql
```

---

## 🎯 Key Files Created/Modified

### New Admin Files
- `frontend/src/pages/admin/AdminDashboard.tsx`
- `frontend/src/pages/admin/ArticleManagement.tsx`
- `frontend/src/pages/admin/ArticleEditor.tsx`

### Updated Files
- `frontend/src/App.tsx` - Added admin routes
- `frontend/src/components/Header.tsx` - Added admin link

### Existing Integration Files
- `frontend/src/lib/api.ts` - API client
- `backend/src/routes.php` - API routes
- `backend/public/index.php` - Backend entry point
- `backend/src/Controllers/AdminController.php` - Admin logic

---

## ✅ Integration Checklist

- [x] Frontend builds successfully
- [x] Backend API endpoints configured
- [x] CORS enabled
- [x] Vite proxy configured
- [x] Admin dashboard created
- [x] Article management working
- [x] Create/Edit/Delete articles
- [x] Navigation updated with admin link
- [x] All routes integrated in App.tsx
- [x] API client configured
- [x] Error handling implemented
- [x] Startup script created

---

## 🚨 Troubleshooting

### Frontend can't connect to backend
1. Make sure backend is running on port 8080
2. Check Vite proxy configuration
3. Verify CORS headers in backend

### Admin panel shows errors
1. Check browser console for API errors
2. Verify backend endpoints are working
3. Test API directly with curl

### Database connection fails
1. Make sure MySQL is running on port 4306
2. Verify credentials in `backend/src/Database.php`
3. Check if database exists

---

## 🎉 Success Indicators

When everything is working:
1. ✅ Homepage loads with stations and articles
2. ✅ Admin dashboard shows statistics
3. ✅ Can create new articles via admin
4. ✅ Articles appear on News page
5. ✅ No console errors
6. ✅ All navigation works

---

## 📱 Access URLs

**Public Frontend:**
- Home: http://localhost:5173/
- About: http://localhost:5173/about
- Programs: http://localhost:5173/programs
- News: http://localhost:5173/news
- Contact: http://localhost:5173/contact

**Admin Panel:**
- Dashboard: http://localhost:5173/admin
- Articles: http://localhost:5173/admin/articles
- New Article: http://localhost:5173/admin/articles/new

**Backend API:**
- API Root: http://localhost:8080/api
- Stations: http://localhost:8080/api/stations
- Articles: http://localhost:8080/api/articles

---

## 🎊 Ready to Use!

Your Radio New Song 97.7 FM website is now **fully integrated** with:
- ✅ Complete frontend-backend communication
- ✅ Working admin panel for content management
- ✅ All API endpoints functional
- ✅ CRUD operations for articles
- ✅ Professional admin interface
- ✅ Proper error handling

**Start the app with:** `START_FULL_APP.bat`

**Then access admin at:** http://localhost:5173/admin

🎙️ **Broadcasting the Good News with Full Stack Power!** 🇸🇱
