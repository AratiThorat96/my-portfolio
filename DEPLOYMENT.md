# Deployment Guide - MyPortfolio

## Backend Deployment to Render

### Prerequisites
- GitHub account with repository pushed
- Render account (free tier available)

### Step-by-Step

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Render Service**
   - Go to https://render.com
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Authorize Render to access your repos

3. **Configure Service**
   - **Name**: myportfolio-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Branch**: main
   - **Region**: Choose closest to you

4. **Add Environment Variables**
   Click "Add Environment Variable" and add:
   ```
   MONGODB_URI = mongodb+srv://...
   JWT_SECRET = (generate 32 char string)
   EMAIL_USER = your@gmail.com
   EMAIL_PASS = (app password)
   CLOUDINARY_NAME = your_cloud_name
   CLOUDINARY_API_KEY = your_api_key
   CLOUDINARY_API_SECRET = your_api_secret
   ADMIN_EMAIL = admin@example.com
   ADMIN_PASSWORD = SecurePassword123!
   FRONTEND_URL = https://your-vercel-url.vercel.app
   NODE_ENV = production
   PORT = 10000 (Render assigns automatically)
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - URL will be: `https://myportfolio-backend.onrender.com`

### Monitor Deployment
- Check "Live Logs" tab
- Watch for any errors
- Test with: `https://myportfolio-backend.onrender.com/api/health`

## Frontend Deployment to Vercel

### Prerequisites
- GitHub repository with frontend code
- Vercel account (free tier available)
- Backend URL from Render

### Step-by-Step

1. **Prepare Frontend**
   - Ensure `client/` is at root or adjust import settings
   - Check `vite.config.js` is correct
   - Verify `package.json` scripts

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Add New"
   - Select "Project"
   - Import GitHub repository
   - Select `client` directory as root

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - In Project Settings → Environment Variables
   - Add: `VITE_API_URL = https://myportfolio-backend.onrender.com/api`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - URL will be: `https://myportfolio-client.vercel.app`

### Custom Domain (Optional)

#### For Render Backend
1. Go to Service Settings
2. Click "Add Custom Domain"
3. Add domain (e.g., api.yourportfolio.com)
4. Follow DNS configuration instructions

#### For Vercel Frontend
1. Go to Project Settings
2. Click "Domains"
3. Add custom domain
4. Update DNS records as instructed
5. Enable SSL/TLS

## Database Backup (MongoDB Atlas)

### Automated Backups
1. Go to MongoDB Atlas Cluster
2. Click "Backup"
3. Enable "Backup Database"
4. Set frequency (daily recommended)
5. Set retention period (30 days free)

### Manual Backup
```bash
# Using MongoDB tools
mongoexport --uri="mongodb+srv://user:pass@cluster.mongodb.net/myportfolio" \
  --collection=projects --out=projects.json

mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/myportfolio"
```

## Monitoring & Logging

### Render
- View logs in dashboard
- Set up error notifications
- Monitor CPU/RAM usage

### Vercel
- Check Deployment logs
- View Function logs
- Monitor analytics

### MongoDB
- Review cluster metrics
- Check connection logs
- Monitor query performance

## Environment-Specific Configs

### Development (.env)
```env
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### Staging (.env.staging)
```env
NODE_ENV=staging
FRONTEND_URL=https://staging.myportfolio.com
PORT=5000
```

### Production (.env.production)
```env
NODE_ENV=production
FRONTEND_URL=https://myportfolio.vercel.app
PORT=10000
```

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          git push https://git.render.com/repo.git main
      
      - name: Deploy Frontend
        run: |
          npm install -g vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## Performance Optimization

### Backend
- Enable compression: `app.use(compression())`
- Implement caching
- Use CDN for static files
- Optimize database queries

### Frontend
- Lazy load components
- Optimize images (WebP format)
- Code splitting with Vite
- Enable gzip compression

### Database
- Create indexes on frequently queried fields
- Archive old messages
- Clean up unused data

## Security Checklist

- [ ] Update NODE_ENV to production
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS/SSL
- [ ] Set secure CORS origins
- [ ] Add rate limiting
- [ ] Implement CSRF protection
- [ ] Validate all inputs
- [ ] Use helmet.js for headers
- [ ] Sanitize user inputs
- [ ] Implement logging
- [ ] Set up error tracking (Sentry)
- [ ] Regular security audits

## Troubleshooting Deployment

### Build Failures
```bash
# Check logs in deployment console
# Common issues:
# 1. Missing dependencies - npm install
# 2. Environment variables not set
# 3. Incorrect build command
# 4. Node version mismatch
```

### Runtime Errors
```bash
# Check application logs
# Common issues:
# 1. Database connection string
# 2. Missing API credentials
# 3. Port conflicts
# 4. Memory limits
```

### Slow Performance
- Check database query performance
- Verify CDN is working
- Profile for bottlenecks
- Optimize large operations

## Rollback Procedure

### Render
1. Go to Service Deployments
2. Select previous working build
3. Click "Deploy"

### Vercel
1. Go to Deployments
2. Find previous working deployment
3. Click "Redeploy"

## Post-Deployment Tasks

1. Test all functionality
2. Verify email notifications
3. Check Cloudinary uploads
4. Test contact form
5. Monitor logs for errors
6. Set up monitoring alerts
7. Document deployment process
8. Create runbook for operations team

## Estimated Costs (Monthly)

- Render Backend: Free tier (limited) → $7/month
- Vercel Frontend: Free tier → $20/month (Pro)
- MongoDB Atlas: Free tier (512MB) → $57/month (M2)
- Cloudinary: Free tier → $99/month (Plus)

**Total: ~$183/month (production level)**

## Support & Resources

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [GitHub Actions](https://github.com/features/actions)
