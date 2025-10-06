# 🔐 AUTHENTICATION QUICK REFERENCE

## ⚡ Quick Start

```bash
# 1. Start everything
START_FULL_APP.bat

# 2. Open login
http://localhost:5174/login

# 3. Login
Email: admin@radionewsong.sl
Password: admin123
```

## 🔑 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@radionewsong.sl | admin123 |

⚠️ **CHANGE PASSWORD IMMEDIATELY!**

## 📍 URLs

| Page | URL |
|------|-----|
| **Login** | http://localhost:5174/login |
| **Admin Dashboard** | http://localhost:5174/admin |
| **User Management** | http://localhost:5174/admin/users |
| **Create User** | http://localhost:5174/admin/users/new |

## 👥 Roles

| Role | Description | Access |
|------|-------------|--------|
| **Admin** | Full control | Everything |
| **Editor** | Content manager | Articles, Programs |
| **Moderator** | Content moderator | Edit content, Requests |
| **User** | Basic access | View only |

## 🔐 Permissions (16 total)

### Content
- articles.create, articles.edit, articles.delete, articles.publish
- programs.create, programs.edit, programs.delete
- stations.create, stations.edit, stations.delete

### Users
- users.create, users.edit, users.delete

### Other
- requests.view, requests.manage
- settings.manage

## 🛠️ Common Tasks

### Create New User
1. Login → `/admin/users` → "New User"
2. Fill: Name, Email, Password, Role
3. Click "Create User"

### Change Password
1. `/admin/users` → Edit user
2. Enter new password
3. Click "Update User"

### Test Permissions
1. Create Editor user
2. Logout, login as Editor
3. Try `/admin/users` → Should be denied

## 🔌 API Endpoints

### Auth
```
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
POST /api/auth/refresh
```

### Users (Protected)
```
GET    /api/admin/users
POST   /api/admin/users
PUT    /api/admin/users/{id}
DELETE /api/admin/users/{id}
```

## 🧪 Quick Tests

### Test 1: Login
```
1. Go to /login
2. Use admin credentials
3. Should redirect to /admin
```

### Test 2: Protected Routes
```
1. Logout
2. Try /admin → redirects to /login
3. Login → goes to /admin
```

### Test 3: Permissions
```
1. Create Editor user
2. Login as Editor
3. Can access /admin/articles ✅
4. Cannot access /admin/users ❌
```

## 📊 Role Capabilities

```
                Admin  Editor  Moderator  User
Manage Users     ✅     ❌       ❌        ❌
Create Articles  ✅     ✅       ❌        ❌
Edit Articles    ✅     ✅       ✅        ❌
Delete Articles  ✅     ✅       ❌        ❌
Manage Stations  ✅     ❌       ❌        ❌
Manage Programs  ✅     ✅       ❌        ❌
View Requests    ✅     ✅       ✅        ✅
Manage Requests  ✅     ✅       ✅        ❌
```

## 🚨 Troubleshooting

### Can't Login
```bash
# Re-run migration
php backend/database/run_auth_migration.php

# Check user exists
SELECT * FROM users WHERE email = 'admin@radionewsong.sl';
```

### Token Expired
- Tokens last 24 hours
- Just login again

### Permission Denied
- Check user role
- Admin has all permissions
- Verify role_permissions table

## 📁 Key Files

### Backend
- `AuthController.php` - Login/logout/session
- `UserController.php` - User CRUD
- `auth_schema.sql` - Database schema

### Frontend
- `AuthContext.tsx` - Global auth state
- `ProtectedRoute.tsx` - Route protection
- `Login.tsx` - Login page
- `UserManagement.tsx` - User list
- `UserEditor.tsx` - Create/edit users

## 🔄 How It Works

```
1. User enters credentials
2. Backend validates & creates token
3. Frontend saves token in localStorage
4. Token added to all API requests
5. Backend validates token on each request
6. If valid → allow access
7. If expired → redirect to login
```

## ✅ Complete Features

- [x] Login page with validation
- [x] Token-based authentication
- [x] User CRUD operations
- [x] Role-based access control
- [x] Permission system (16 permissions)
- [x] Protected routes
- [x] Session management (24hr)
- [x] Password encryption
- [x] Logout functionality
- [x] User profile display

## 🎯 Next Steps

1. ✅ Start app: `START_FULL_APP.bat`
2. ✅ Login: `admin@radionewsong.sl` / `admin123`
3. ✅ Change admin password
4. ✅ Create additional users
5. ✅ Test different roles
6. ✅ Explore permissions

---

**🔐 Your platform is now fully secured!**

**Login:** http://localhost:5174/login  
**Default:** admin@radionewsong.sl / admin123

🎙️ **Secure Broadcasting from Bo, Sierra Leone! 🇸🇱**
