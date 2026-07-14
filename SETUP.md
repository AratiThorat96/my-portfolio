# MyPortfolio - Complete Installation Guide

## Step-by-Step Setup Instructions

### Phase 1: Initial Setup

#### 1.1 Clone or Create Project
```bash
git clone <repository-url>
cd MyPortfolio
```

#### 1.2 Backend Installation

```bash
cd server
npm install
```

Required packages installed:
- express (Web framework)
- mongoose (MongoDB ODM)
- dotenv (Environment variables)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT authentication)
- nodemailer (Email sending)
- cloudinary (Image storage)
- multer (File uploads)
- cors (Cross-origin requests)
- helmet (Security headers)

#### 1.3 Frontend Installation

```bash
cd ../client
npm install
```

Required packages installed:
- react, react-dom (UI library)
- react-router-dom (Routing)
- axios (HTTP client)
- framer-motion (Animations)
- tailwindcss (Styling)
- react-icons (Icons)
- react-toastify (Notifications)
- zustand (State management)

### Phase 2: Environment Configuration

#### 2.1 Backend Configuration

Create `server/.env`:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myportfolio?retryWrites=true&w=majority

# JWT Secret (generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_long_12345

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SecurePassword123!

# URLs
FRONTEND_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

#### 2.2 Frontend Configuration

Create `client/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Phase 3: Database Setup

#### 3.1 Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create new project "MyPortfolio"
4. Build a Cluster (M0 free tier is fine)
5. Set up authentication:
   - Username: myportfolio_user
   - Password: Generate strong password
6. Add current IP to whitelist
7. Copy connection string

#### 3.2 Initialize Admin User

Option 1: Via API
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePassword123!",
    "fullName": "Admin"
  }'
```

Option 2: Via Admin Login Page
- Navigate to `/admin/login`
- Click on register if enabled
- Fill form and submit

### Phase 4: Service Configuration

#### 4.1 Cloudinary Setup

1. Go to [Cloudinary.com](https://cloudinary.com)
2. Create account
3. Go to Dashboard
4. Copy:
   - Cloud Name
   - API Key
   - Generate and copy API Secret
5. Update `.env` with credentials

#### 4.2 Email Setup

1. Enable 2-Factor Authentication on Gmail:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification
2. Generate App Password:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select Mail and Windows Computer (or custom)
   - Generate
   - Copy the 16-character password
3. Use in EMAIL_PASS

### Phase 5: Running the Application

#### 5.1 Start Backend

```bash
cd server
npm run dev
```

Expected output:
```
✅ Server running on http://localhost:5000
MongoDB connected successfully!
```

#### 5.2 Start Frontend

In a new terminal:
```bash
cd client
npm run dev
```

Expected output:
```
  VITE v5.1.0  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Phase 6: Testing

#### 6.1 Test Portfolio Site
1. Navigate to `http://localhost:5173`
2. Check all sections load properly
3. Try contact form (check email inbox)
4. Verify projects and certificates display

#### 6.2 Test Admin Panel
1. Navigate to `http://localhost:5173/admin/login`
2. Login with credentials
3. Test dashboard tabs
4. Verify API connections

### Phase 7: Adding Content

#### 7.1 Add Projects

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Project Name",
    "description": "Project description",
    "technologies": ["React", "Node.js"],
    "liveLink": "https://example.com",
    "githubLink": "https://github.com/user/repo",
    "category": "web",
    "featured": true
  }'
```

#### 7.2 Add Certificates

```bash
curl -X POST http://localhost:5000/api/certificates \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Certificate Name",
    "provider": "Provider Name",
    "issueDate": "2024-01-15",
    "credentialUrl": "https://credential.url",
    "description": "Certificate description"
  }'
```

### Phase 8: Building for Production

#### 8.1 Build Frontend

```bash
cd client
npm run build
```

Output will be in `client/dist/`

#### 8.2 Build Backend

Backend doesn't need building (Node runs directly)

### Phase 9: Deployment

#### 9.1 Deploy Backend to Render

1. Push to GitHub
2. Create account at [Render.com](https://render.com)
3. New → Web Service
4. Connect GitHub
5. Configure:
   - Name: myportfolio-backend
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. Add Environment Variables (all from `.env`)
7. Deploy

#### 9.2 Deploy Frontend to Vercel

1. Push to GitHub
2. Create account at [Vercel.com](https://vercel.com)
3. Import Project from GitHub
4. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variable:
   - `VITE_API_URL=https://your-render-backend.onrender.com/api`
6. Deploy

### Phase 10: Post-Deployment Setup

1. Update portfolio links in social sections
2. Add portfolio URL to GitHub profile
3. Monitor logs on Render and Vercel
4. Set up email forwarding if needed
5. Test all forms and functionality

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Module Not Found
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection Failed
- Check internet connection
- Verify connection string
- Whitelist IP in MongoDB Atlas
- Check credentials

### Cloudinary Upload Failed
- Verify credentials
- Check file size
- Verify file format
- Check folder permissions

## Production Checklist

- [ ] Update all environment variables
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Set up SSL certificates
- [ ] Configure custom domain
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Set up CI/CD pipeline
- [ ] Review security headers
- [ ] Test all forms and APIs
- [ ] Verify email notifications
- [ ] Test file uploads
- [ ] Check mobile responsiveness
- [ ] Optimize images
- [ ] Set up error tracking (Sentry)
- [ ] Enable analytics

## Next Steps

1. Customize personal information
2. Add your projects and certificates
3. Set up contact form responses
4. Configure social media links
5. Optimize performance
6. Add more features as needed

For detailed API documentation, see API_DOCUMENTATION.md
