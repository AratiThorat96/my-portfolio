#!/bin/bash

# MyPortfolio Setup Script
# This script sets up both frontend and backend

echo "🚀 MyPortfolio Setup Starting..."

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed: $(node -v)"

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd server
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Created .env file. Please edit it with your credentials."
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd client
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "⚠️  Created .env.local file."
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Edit server/.env with your MongoDB, JWT, Email, and Cloudinary credentials"
echo "2. Run: npm run dev (in server directory)"
echo "3. Run: npm run dev (in client directory)"
echo "4. Visit: http://localhost:5173"
