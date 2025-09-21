#!/bin/bash

echo "🕵️ AI Detective: Hallucination Hunt - API Keys Setup"
echo "=================================================="

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Copy template
echo "📋 Creating .env.local from template..."
cp env.example .env.local

echo ""
echo "🔑 Now you need to get your API keys:"
echo ""
echo "1. FIREBASE SETUP:"
echo "   • Go to: https://console.firebase.google.com/"
echo "   • Create new project"
echo "   • Enable Authentication (Anonymous)"
echo "   • Create Firestore Database"
echo "   • Create Realtime Database"
echo "   • Get config from Project Settings → Your apps"
echo ""
echo "2. OPENROUTER SETUP:"
echo "   • Go to: https://openrouter.ai/"
echo "   • Sign up for free account"
echo "   • Go to Keys section"
echo "   • Create new API key"
echo ""
echo "3. EDIT .env.local:"
echo "   • Replace all 'your_..._here' values with your actual keys"
echo "   • Save the file"
echo ""
echo "4. TEST YOUR SETUP:"
echo "   • Run: npm run dev"
echo "   • Open: http://localhost:3000"
echo "   • Try registering a player"
echo ""
echo "✅ Ready to deploy when keys are configured!"
