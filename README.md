# MyPortfolio - MERN Stack Personal Portfolio Website

A complete full-stack personal portfolio website built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features a modern dark theme, admin dashboard for content management, and deployment-ready setup for Vercel (frontend) and Render (backend).

## 🎯 Features

### Frontend
- ✨ Modern, responsive design with Tailwind CSS
- 🎬 Smooth animations with Framer Motion
- 🌓 Dark/Light theme toggle
- 📱 Mobile-first responsive layout
- ⚡ Fast performance with Vite
- 🎯 Smooth scroll navigation
- 🔔 Toast notifications
- 🎨 Beautiful component library
- 🌐 SEO-optimized pages

### Backend
- 🔐 JWT-based authentication
- 🛡️ Password encryption with bcrypt
- 📧 Email notifications with Nodemailer
- 🖼️ Image upload with Cloudinary
- 🗄️ MongoDB Atlas integration
- ✔️ Comprehensive error handling
- 📝 CRUD operations for all resources
- 🔄 CORS enabled

### Admin Dashboard
- 🔒 Secure admin login
- 📊 Manage projects dynamically
- 🎓 Manage certifications
- 💬 View contact messages
- 👤 Update profile information
- 🖼️ Image upload and management

### Sections
1. **Hero Section** - Eye-catching landing page with CTA
2. **About Section** - Personal introduction and skills overview
3. **Skills Section** - Animated skill bars and categories
4. **Projects Section** - Dynamic project cards from MongoDB
5. **Certifications Section** - Certificate showcase
6. **Contact Section** - Functional contact form
7. **Footer** - Social links and quick navigation

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Cloudinary account (for image uploads)
- Gmail account (for email notifications)
- Vercel account (for frontend deployment)
- Render account (for backend deployment)

## 🚀 Installation & Setup

### 1. Clone the Project

```bash
git clone <repository-url>
cd MyPortfolio
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASS=your_app_password
# CLOUDINARY_NAME=your_cloudinary_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Start server
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create .env.local file
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📝 Configuration

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
5. Add to `.env` file

### Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Get your Cloud Name, API Key, and API Secret
4. Add to `.env` file

### Gmail Setup for Nodemailer

1. Enable 2-Factor Authentication on your Gmail account
2. Generate App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use the 16-character password in `EMAIL_PASS` in `.env`

## 📁 Project Structure

```
MyPortfolio/
├── client/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── store/              # Zustand store
│   │   ├── hooks/              # Custom hooks
│   │   ├── api/                # API calls
│   │   ├── assets/             # Images, icons
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/
│   ├── config/                 # Database & service config
│   ├── controllers/            # Business logic
│   ├── middleware/             # Auth, error handling
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API endpoints
│   ├── utils/                  # Helper functions
│   ├── server.js              # Main server file
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin (protected)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Certificates
- `GET /api/certificates` - Get all certificates
- `GET /api/certificates/:id` - Get certificate by ID
- `POST /api/certificates` - Create certificate (protected)
- `PUT /api/certificates/:id` - Update certificate (protected)
- `DELETE /api/certificates/:id` - Delete certificate (protected)

### Messages
- `POST /api/messages` - Submit contact form
- `GET /api/messages` - Get all messages (protected)
- `GET /api/messages/:id` - Get message by ID (protected)
- `PUT /api/messages/:id` - Update message status (protected)
- `DELETE /api/messages/:id` - Delete message (protected)

### Profile
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile (protected)

## 🔑 Admin Credentials

After first setup, register an admin account:

```bash
# Use admin login page at /admin/login
# Or make API request:
POST /api/auth/register
{
  "email": "admin@example.com",
  "password": "SecurePassword123!",
  "fullName": "Admin Name"
}
```

## 🚢 Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Go to [Render.com](https://render.com)
3. Create New → Web Service
4. Connect GitHub repository
5. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `CLOUDINARY_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `FRONTEND_URL=your_vercel_url`
   - `NODE_ENV=production`
6. Start service

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import project from GitHub
4. Set environment variable:
   - `VITE_API_URL=your_render_backend_url`
5. Deploy

## 🎨 Customization

### Update Personal Information

1. Edit `client/src/components/HeroSection.jsx` for profile image and name
2. Edit `client/src/components/Footer.jsx` for social links
3. Use Admin Dashboard to manage projects, certificates, and profile details

### Change Theme Colors

Edit `client/tailwind.config.js`:

```js
colors: {
  primary: "#6366f1",      // Main color
  secondary: "#1e1e2e",    // Background
  accent: "#ff6b6b",       // Highlight
}
```

### Add More Sections

1. Create new component in `client/src/components/`
2. Add to `client/src/pages/Home.jsx`
3. Update navbar links if needed

## 📦 Dependencies

### Frontend
- react, react-dom
- react-router-dom
- axios
- framer-motion
- tailwindcss
- react-icons
- react-toastify
- zostand
- react-intersection-observer

### Backend
- express
- mongoose
- dotenv
- bcryptjs
- jsonwebtoken
- nodemailer
- cloudinary
- multer
- cors
- helmet
- express-validator

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check connection string format
- Whitelist your IP in MongoDB Atlas
- Ensure credentials are correct

### Cloudinary Upload Error
- Verify API credentials
- Check file size limit (10MB)
- Ensure file is image format

### Email Not Sending
- Use App Password, not regular Gmail password
- Enable 2FA on Gmail account
- Check EMAIL_USER and EMAIL_PASS

### CORS Error
- Update `FRONTEND_URL` in backend `.env`
- Clear browser cache
- Ensure middleware is properly configured

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Support

For issues or questions, please create an issue in the repository.

## 📞 Contact

- Portfolio: [Your Portfolio URL]
- Email: your@email.com
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

---

**Built with ❤️ using MERN Stack**
