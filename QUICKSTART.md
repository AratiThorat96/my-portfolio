# MyPortfolio - A Complete MERN Stack Portfolio

## Quick Start Commands

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
cp .env.example .env.local
npm run dev
```

Visit http://localhost:5173

## Key Features

✅ Modern responsive design
✅ Dark mode toggle
✅ Admin panel with JWT auth
✅ MongoDB integration
✅ Email notifications
✅ Image uploads (Cloudinary)
✅ Project & certificate management
✅ Contact form with database storage
✅ Deployment ready (Vercel + Render)

## Project Structure

```
├── client/           # React frontend with Vite
├── server/          # Express.js backend
├── README.md        # Project overview
├── SETUP.md         # Detailed setup guide
├── API_DOCUMENTATION.md
├── DEPLOYMENT.md    # Deployment instructions
└── .gitignore
```

## Environment Setup

1. **MongoDB Atlas**: Set up cluster and get connection string
2. **Cloudinary**: Get Cloud Name, API Key, API Secret
3. **Gmail**: Generate App Password for email
4. **Create .env files**: Copy from .env.example

## API Testing

- Use Postman or cURL
- All endpoints documented in API_DOCUMENTATION.md
- Admin endpoints require JWT token

## Deployment

- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Render
- **Database**: MongoDB Atlas
- See DEPLOYMENT.md for detailed steps

## Support

For issues or questions:
1. Check SETUP.md
2. Review API_DOCUMENTATION.md
3. See DEPLOYMENT.md
4. Check server/client logs

---

**Ready to deploy? Follow DEPLOYMENT.md**
