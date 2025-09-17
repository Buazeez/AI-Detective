# 🕵️ AI Detective: Hallucination Hunt - Setup Guide

## Required API Keys & Services

### 1. Firebase Setup (Required)

**Why**: For user authentication, real-time leaderboard, and data storage.

**Steps**:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or use existing
3. Enable the following services:
   - **Authentication** → Sign-in method → Anonymous
   - **Firestore Database** → Create database in production mode
   - **Realtime Database** → Create database
4. Go to Project Settings → General → Your apps
5. Click "Add app" → Web app
6. Copy the configuration object

**Required Environment Variables**:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com/
```

### 2. OpenRouter API Setup (Required)

**Why**: For AI content generation using Meta Llama 3.1 8B Instruct model.

**Steps**:

1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-or-`)

**Required Environment Variable**:

```env
VITE_OPENROUTER_API_KEY=sk-or-your_key_here
```

## Quick Start (5 minutes)

### Step 1: Clone and Install

```bash
git clone <your-repo-url>
cd ai-detective-hallucination-hunt
npm install
```

### Step 2: Configure Environment

```bash
cp env.example .env.local
# Edit .env.local with your API keys
```

### Step 3: Run Development Server

```bash
npm run dev
```

### Step 4: Open Browser

Navigate to `http://localhost:3000`

## Firebase Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Realtime Database Rules

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

## Deployment to Vercel

### Option 1: Using the Deploy Script

```bash
./scripts/deploy.sh
```

### Option 2: Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 3: GitHub Integration

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

## Environment Variables for Vercel

Add these in your Vercel project settings:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_firebase_app_id_here
VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com/
VITE_OPENROUTER_API_KEY=sk-or-your_openrouter_key_here
```

## Testing the Game

### 1. Registration Test

- Open the game
- Register with any name
- Verify you can see the leaderboard

### 2. Gameplay Test

- Start Level 1 (Moon Madness Mystery)
- Write a prompt about the moon
- Click on suspicious text in AI response
- Verify scoring works

### 3. Leaderboard Test

- Complete a level
- Check if your score appears on leaderboard
- Verify real-time updates

## Troubleshooting

### Common Issues

**"Firebase connection failed"**

- Check Firebase config in .env.local
- Verify Firebase project is active
- Check browser console for specific errors

**"AI API error"**

- Verify OpenRouter API key is correct
- Check if you have credits remaining
- Try the fallback content (pre-generated responses)

**"Build failed"**

- Run `npm install` again
- Check for TypeScript errors
- Verify all environment variables are set

**"Deployment failed"**

- Check Vercel environment variables
- Verify build works locally first
- Check Vercel logs for specific errors

### Getting Help

1. Check browser console for errors
2. Verify all API keys are correct
3. Test locally before deploying
4. Check Firebase and Vercel logs

## Competition Demo Checklist

### Before Demo

- [ ] All API keys configured
- [ ] Game loads without errors
- [ ] Registration works
- [ ] Level 1 gameplay works
- [ ] Leaderboard updates in real-time
- [ ] Mobile responsive design works

### Demo Flow (3 minutes)

- [ ] **Minute 1**: Judge registers, sees leaderboard, gets Level 1 brief
- [ ] **Minute 2**: Judge writes prompt, AI responds, finds errors for points
- [ ] **Minute 3**: Multiple judges compete, see real-time rankings

### Backup Plan

- Pre-generated content works if AI API fails
- Local storage maintains game state
- Offline mode for basic functionality

## Cost Estimation

### Firebase (Free Tier)

- Authentication: Free
- Firestore: 50,000 reads/writes per day free
- Realtime Database: 1GB storage free
- **Total**: $0/month for demo

### OpenRouter (Free Tier)

- Meta Llama 3.1 8B: $0.0002 per 1K tokens
- Average response: ~200 tokens
- **Estimated cost**: $0.01 per 25 games
- **Total**: $0-5/month for demo

### Vercel (Free Tier)

- 100GB bandwidth per month
- Unlimited static deployments
- **Total**: $0/month for demo

## Success Metrics

### Technical

- ✅ Loads in under 3 seconds
- ✅ Works on mobile and desktop
- ✅ Real-time leaderboard updates
- ✅ Handles 10+ concurrent users

### Educational

- ✅ Clear learning objectives
- ✅ Immediate feedback
- ✅ Progressive difficulty
- ✅ Engaging gameplay

### Competition

- ✅ 3-minute demo ready
- ✅ Judge participation works
- ✅ Global leaderboard visible
- ✅ Mobile responsive

---

**Ready to deploy!** 🚀

Your AI Detective game is now ready for the UNSW AI Hackathon competition!
