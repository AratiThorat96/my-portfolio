@echo off
REM MyPortfolio Setup Script for Windows
REM This script sets up both frontend and backend

echo 🚀 MyPortfolio Setup Starting...

REM Check Node.js installation
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo ✅ Node.js is installed:
node -v

REM Setup Backend
echo.
echo 📦 Setting up Backend...
cd server
call npm install

if not exist .env (
    copy .env.example .env
    echo ⚠️  Created .env file. Please edit it with your credentials.
)

cd ..

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
cd client
call npm install

if not exist .env.local (
    copy .env.example .env.local
    echo ⚠️  Created .env.local file.
)

cd ..

echo.
echo ✅ Setup Complete!
echo.
echo Next steps:
echo 1. Edit server/.env with your MongoDB, JWT, Email, and Cloudinary credentials
echo 2. Run: npm run dev (in server directory)
echo 3. Run: npm run dev (in client directory)
echo 4. Visit: http://localhost:5173
pause
