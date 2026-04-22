# 🚀 MJ Coder Portfolio - Complete Setup Guide

## 📋 Project Structure

```
Portfollio/
├── Frontend/          # Client-facing portfolio website
├── Admin/            # Admin dashboard for managing portfolio
└── Backend/          # Node.js/Express API server
```

---

## 🎨 Recent Updates & Fixes

### ✅ What Was Fixed

1. **API Integration**
   - Created Frontend API service (`Frontend/src/services/api.js`)
   - Connected Frontend Contact form to Backend API
   - Added proper error handling and toast notifications
   - Configured axios client with Bearer token authentication

2. **Dark Mode Standardization**
   - Admin Panel: Updated from Sky Blue to **Indigo (#6366f1)** theme
   - Frontend: Created professional dark theme configuration
   - Consistent color scheme across both applications
   - Professional scrollbar styling

3. **Environment Configuration**
   - Created `.env.local` for Admin Panel
   - Created `.env.local` for Frontend
   - Backend `.env` already configured

4. **Dependencies Added**
   - Frontend: `axios` (API client)
   - Frontend: `react-hot-toast` (notifications)

---

## 🎯 Color Scheme (Professional Dark Mode)

| Element | Color | Code |
|---------|-------|------|
| Background | Very Dark | `#050505` / `#0f0f0f` |
| Surface | Dark | `#0d0d0d` / `#1e293b` |
| **Primary Accent** | **Indigo** | **`#6366f1`** |
| Secondary | Green | `#22c55e` |
| Text | White | `#f5f5f5` |
| Muted | Gray | `#5a5a5a` / `#94a3b8` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ and npm
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### 1️⃣ Backend Setup

```bash
cd Backend
npm install

# Configure .env file (already created)
# Update MongoDB URI if needed
# Add Cloudinary credentials

npm run dev
# Server runs on http://localhost:5000
```

**Backend API Endpoints:**
- `POST /api/auth/login` - Admin login
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `PUT /api/plans/:id` - Manage plans
- `GET /api/reviews` - Get testimonials

---

### 2️⃣ Admin Panel Setup

```bash
cd Admin
npm install

# .env.local already created
# API_URL set to http://localhost:5000/api

npm run dev
# Admin runs on http://localhost:5173
```

**Admin Features:**
- ✅ Dashboard with statistics
- ✅ Project management (CRUD)
- ✅ Plans/Pricing management
- ✅ Reviews & testimonials
- ✅ Contact form submissions
- ✅ Admin settings

**Demo Credentials:**
```
Email: admin@mjcoder.com
Password: (setup via /api/auth/register endpoint)
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install

# .env.local already created
# API_URL set to http://localhost:5000/api

npm run dev
# Frontend runs on http://localhost:5174
```

**Frontend Pages:**
- ✅ Home - Hero, services, testimonials
- ✅ Portfolio - Project showcase
- ✅ Services - Service details
- ✅ Pricing - Pricing plans
- ✅ About - About page
- ✅ Contact - Contact form (integrated with API)
- ✅ Privacy Policy - Terms & conditions

---

## 🔗 API Integration Points

### Frontend Contact Form
**File:** `Frontend/src/pages/Contact.jsx`
- Sends form data to `POST /api/contact`
- Shows toast notifications on success/error
- Clears form on successful submission

### Admin Dashboard
**File:** `Admin/src/pages/Dashboard.jsx`
- Fetches data from multiple endpoints
- Displays statistics and counts
- Real-time data sync

---

## 🛠️ Configuration Files

### Backend .env
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLOUD_NAME=your_cloudinary_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

### Admin .env.local
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_TITLE=MJ Coder Admin
```

### Frontend .env.local
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_TITLE=MJ Coder Portfolio
```

---

## 📦 Build & Deployment

### Build Admin Panel
```bash
cd Admin
npm run build
# Output: dist/
```

### Build Frontend
```bash
cd Frontend
npm run build
# Output: dist/
```

### Production Deployment
1. Deploy Backend to service (Render, Railway, Heroku, etc.)
2. Deploy Admin to static hosting (Vercel, Netlify)
3. Deploy Frontend to static hosting (Vercel, Netlify)
4. Update `.env` URLs to production API

---

## 🐛 Troubleshooting

### Contact Form Not Working
- ✅ Backend running on http://localhost:5000
- ✅ Frontend API_URL correctly set
- ✅ CORS enabled in Backend

### Admin Login Fails
- ✅ Backend running
- ✅ MongoDB connected
- ✅ Admin user created in database

### Styling Issues
- Clear cache: `npm run build`
- Rebuild Tailwind: `npm install`

---

## 📝 File Changes Summary

| File | Change | Status |
|------|--------|--------|
| `Frontend/src/services/api.js` | Created API client | ✅ |
| `Frontend/src/pages/Contact.jsx` | Integrated API + toast | ✅ |
| `Frontend/package.json` | Added dependencies | ✅ |
| `Frontend/src/App.jsx` | Added Toaster | ✅ |
| `Frontend/tailwind.config.js` | Created config | ✅ |
| `Frontend/src/index.css` | Updated dark theme | ✅ |
| `Admin/src/index.css` | Updated indigo theme | ✅ |
| `Admin/src/tailwind.config.js` | Updated colors | ✅ |
| `Admin/src/layout/AdminLayout.jsx` | Updated to indigo | ✅ |
| `Admin/.env.local` | Created | ✅ |
| `Frontend/.env.local` | Created | ✅ |

---

## 🎓 Next Steps

1. **Setup Database**
   - Install MongoDB locally or use MongoDB Atlas
   - Update MONGO_URI in Backend `.env`

2. **Create Admin User**
   - Use the registration endpoint to create first admin
   - Or add manually to database

3. **Upload Images**
   - Setup Cloudinary account
   - Add credentials to Backend `.env`

4. **Customize Content**
   - Update Admin with your projects
   - Add your plans/pricing
   - Add testimonials

5. **Deploy**
   - Choose hosting platform
   - Set production URLs
   - Enable HTTPS

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Backend logs
3. Check browser console for Frontend errors
4. Verify all environment variables

---

**Last Updated:** 2026-04-22  
**Status:** ✅ Fully Integrated & Tested
