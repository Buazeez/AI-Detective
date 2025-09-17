#!/bin/bash

# AI Detective: Hallucination Hunt - Deployment Script
# This script helps deploy the application to Vercel

echo "🕵️ AI Detective: Hallucination Hunt - Deployment Script"
echo "======================================================"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local file not found!"
    echo "Please copy env.example to .env.local and fill in your API keys."
    echo "Run: cp env.example .env.local"
    exit 1
fi

# Check if required environment variables are set
echo "🔍 Checking environment variables..."

if ! grep -q "VITE_FIREBASE_API_KEY=" .env.local || grep -q "your_firebase_api_key_here" .env.local; then
    echo "❌ Error: Firebase API key not configured in .env.local"
    exit 1
fi

if ! grep -q "VITE_OPENROUTER_API_KEY=" .env.local || grep -q "your_openrouter_api_key_here" .env.local; then
    echo "❌ Error: OpenRouter API key not configured in .env.local"
    exit 1
fi

echo "✅ Environment variables configured"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check for errors."
    exit 1
fi

echo "✅ Build successful"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo "Your AI Detective game is now live!"
