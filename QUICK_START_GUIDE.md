# 🎯 QUICK START GUIDE - Radio New Song 97.7 FM

## 🚀 Start Your Website (ONE COMMAND!)

```bash
START_FULL_APP.bat
```

This starts everything automatically! ✅

---

## 📍 Access Your Website

| What | URL | Description |
|------|-----|-------------|
| **Main Website** | http://localhost:5174 | Public website |
| **Admin Panel** | http://localhost:5174/admin | Manage content |
| **Article Manager** | http://localhost:5174/admin/articles | Edit articles |
| **New Article** | http://localhost:5174/admin/articles/new | Create articles |
| **Backend API** | http://localhost:8080/api | API endpoints |

---

## ✅ What's Working

### Public Pages (All Ready!)
- ✅ **Home** - Hero, stations, articles, programs
- ✅ **About** - Mission, vision, team
- ✅ **Programs** - 8 radio programs
- ✅ **News** - Articles with search
- ✅ **Contact** - Working contact form

### Admin Panel (NEW!)
- ✅ **Dashboard** - Statistics overview
- ✅ **Manage Articles** - Create, edit, delete
- ✅ **Manage Stations** - Full CRUD
- ✅ **View Requests** - Song requests

### Integration
- ✅ Frontend ↔ Backend connected
- ✅ All API endpoints working
- ✅ CORS configured
- ✅ Proxy working
- ✅ Real-time data

---

## 🎨 Brand Colors

```css
Primary: #072043 (Dark Blue)
Secondary: #bf993b (Gold)
```

✅ Applied throughout the site!

---

## 💾 Database

```
Host: localhost
Port: 4306
Database: radio_platform
User: root
Password: 1212
```

✅ 6 stations, 8 programs, 4 articles loaded!

---

## 🔧 Manual Start (If Needed)

**Terminal 1:**
```bash
cd backend
php -S localhost:8080 -t public
```

**Terminal 2:**
```bash
cd frontend
npm run dev
```

---

## 📝 Admin Tasks

### Create Article
1. Go to `/admin/articles/new`
2. Fill title & content
3. Choose category & status
4. Click "Create Article"

### Edit Article
1. Go to `/admin/articles`
2. Click pencil icon
3. Update content
4. Click "Update Article"

### Delete Article
1. Go to `/admin/articles`
2. Click trash icon
3. Confirm deletion

---

## 🧪 Quick Test

### Test Homepage
```bash
# Open browser
http://localhost:5174

# Should see:
✅ Stations loading
✅ Featured articles
✅ Today's programs
✅ No errors in console
```

### Test Admin
```bash
# Open browser
http://localhost:5174/admin

# Should see:
✅ Statistics (4 articles, 6 stations, 8 programs)
✅ Quick action buttons
✅ No errors in console
```

### Test API
```bash
# Test backend directly
curl http://localhost:8080/api/stations
curl http://localhost:8080/api/admin/articles
```

---

## ✅ Success Indicators

When everything is working:
1. ✅ Both servers running (check console windows)
2. ✅ Homepage loads with data
3. ✅ Admin shows statistics
4. ✅ Can create articles
5. ✅ No console errors
6. ✅ All pages navigate correctly

---

## 🚨 Quick Troubleshooting

### Frontend won't load
```bash
# Restart frontend
cd frontend
npm run dev
```

### Backend errors
```bash
# Check if MySQL is running
# Restart backend
cd backend
php -S localhost:8080 -t public
```

### API not working
```bash
# Check proxy in frontend/vite.config.ts
# Check CORS in backend/public/index.php
```

---

## 📦 What You Have

### Complete Features
- ✅ 5 public pages (Home, About, Programs, News, Contact)
- ✅ Admin dashboard with statistics
- ✅ Full article management (CRUD)
- ✅ Station management system
- ✅ Program scheduling
- ✅ Contact form with backend
- ✅ Song request system
- ✅ Mobile responsive design
- ✅ Brand colors applied

### Technical Stack
- ✅ **Frontend:** React + TypeScript + Vite + Tailwind CSS
- ✅ **Backend:** PHP + Slim Framework
- ✅ **Database:** MySQL (port 4306)
- ✅ **Integration:** Axios + Vite Proxy + CORS

---

## 🎊 You're Ready!

**Everything is integrated and working!**

1. Start servers: `START_FULL_APP.bat`
2. Open main site: http://localhost:5174
3. Open admin: http://localhost:5174/admin
4. Create your first article!

---

## 📚 Documentation Files

- `INTEGRATION_SUCCESS.md` - Full integration details
- `INTEGRATION_COMPLETE.md` - Technical guide
- `FULL_INTEGRATION_VERIFIED.md` - Test results
- `ALL_WORKING.md` - Original features
- `START_HERE.md` - General guide

---

## 🎙️ Broadcasting the Good News!

**Your Radio New Song 97.7 FM website is:**
- ✅ Fully integrated
- ✅ Admin panel ready
- ✅ All features working
- ✅ Production ready

**Start now:** `START_FULL_APP.bat`

🇸🇱 **Bo, Sierra Leone - 97.7 FM** 📻

*One command to rule them all!*
