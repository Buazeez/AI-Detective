# AI Detective: Hallucination Hunt 🕵️

An educational web game that teaches AI literacy by having students detect hallucinations and biases in AI-generated responses. Built for the UNSW AI Hackathon competition.

## 🎯 Project Overview

**AI Detective: Hallucination Hunt** is a revolutionary web-based educational game designed to teach critical AI literacy skills to students aged 11-16 (Years 7-10). Players act as AI detectives, crafting prompts and identifying hallucinations, biases, and errors in AI-generated responses.

### Key Features

- **18 Progressive Levels** across 3 difficulty tiers (Beginner, Intermediate, Advanced)
- **Real-time Global Leaderboard** with competitive rankings
- **Dynamic AI Content Generation** using OpenRouter API
- **Interactive Hallucination Detection** with clickable error identification
- **Educational Feedback** with explanations for each detected error
- **Achievement System** with badges and progress tracking

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Firebase (Firestore + Realtime Database + Auth)
- **AI Integration**: OpenRouter API (Meta Llama 3.1 8B Instruct)
- **Deployment**: Vercel
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project
- OpenRouter API account

### Installation

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd ai-detective-hallucination-hunt
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp env.example .env.local
   ```

   Fill in your API keys in `.env.local`:

   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_firebase_app_id_here
   VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com/

   # OpenRouter API Configuration
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔧 Required API Keys

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing
3. Enable Authentication (Anonymous sign-in)
4. Create Firestore database
5. Create Realtime Database
6. Get your config from Project Settings > General > Your apps

### OpenRouter Setup

1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up for an account
3. Get your API key from the dashboard
4. The app uses the free Meta Llama 3.1 8B Instruct model

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Gameplay.tsx    # Main game interface
│   ├── Leaderboard.tsx # Global rankings
│   ├── LevelSelect.tsx # Level selection screen
│   ├── MainGame.tsx    # Main app wrapper
│   └── RegistrationScreen.tsx # User registration
├── contexts/           # React contexts
│   └── GameContext.tsx # Game state management
├── data/              # Static data
│   └── levels.ts      # Level definitions
├── lib/               # Utilities and services
│   ├── firebase.ts    # Firebase configuration
│   └── aiService.ts   # AI integration
├── types/             # TypeScript type definitions
│   └── index.ts       # Game types
└── App.tsx            # Main app component
```

## 🎮 Game Mechanics

### Core Gameplay Loop

1. **Player Registration** → Quick sign-up for global leaderboard
2. **Task Assignment** → Specific briefing for each level
3. **Prompt Creation** → Player writes targeted prompt
4. **AI Response Generation** → System generates response with embedded hallucinations
5. **Error Detection** → Player clicks suspicious information for points
6. **Educational Feedback** → Immediate explanation of errors
7. **Leaderboard Update** → Real-time rank changes

### Level Progression

- **Levels 1-8**: Beginner (obvious factual errors)
- **Levels 9-16**: Intermediate (subtle inaccuracies and statistical errors)
- **Levels 17-18**: Advanced (bias detection and logical fallacies)

### Scoring System

- Points awarded for correctly identifying hallucinations
- Penalties for incorrect selections
- Time bonuses for quick completion
- Progressive difficulty scaling

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel:**

   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set environment variables in Vercel dashboard:**

   - Go to your project settings
   - Add all environment variables from `.env.local`

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Manual Build

```bash
npm run build
npm run preview
```

## 🎯 Competition Features

### 3-Minute Demo Flow

- **Minute 1**: Judge registers, sees global leaderboard, receives Level 1 task brief
- **Minute 2**: Judge writes prompt, AI responds with obvious errors, finds mistakes for points
- **Minute 3**: Multiple judges compete simultaneously, see real-time rankings and score updates

### Key Competition Advantages

- **Instant Engagement**: No complex onboarding, immediate gameplay
- **Real-time Competition**: Live leaderboard updates during demo
- **Educational Value**: Clear learning objectives and immediate feedback
- **Scalable**: Handles multiple concurrent players
- **Mobile Responsive**: Works on all devices

## 🧠 Educational Framework

### Learning Objectives

- **AI Literacy**: Understanding AI capabilities, limitations, and hallucination patterns
- **Critical Thinking**: Analyzing information sources skeptically and systematically
- **Bias Recognition**: Identifying unfair generalizations, stereotypes, and logical fallacies
- **Fact-Checking Skills**: Verifying claims against reliable sources and detecting misinformation
- **Prompt Engineering**: Learning to communicate effectively with AI systems

### Psychological Engagement

- **Variable Rewards**: Sometimes big celebrations, sometimes small - keeps it exciting
- **Social Pressure**: Seeing friends' ranks creates natural competition
- **Achievement Gaps**: Clear progression milestones
- **Position Anxiety**: Real-time ranking changes drive motivation

## 🔒 Security & Privacy

- **Anonymous Authentication**: No personal data collection
- **Client-side Processing**: All game logic runs in browser
- **Secure API Keys**: Environment variables only
- **No Data Persistence**: Player data stored locally and in Firebase
- **Age-Appropriate Content**: All AI responses pre-screened for educational content

## 📊 Performance Optimization

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Optimized assets and lazy loading
- **Caching**: Firebase caching for leaderboard data
- **Bundle Size**: Minimal dependencies, tree-shaking enabled
- **CDN**: Vercel's global CDN for fast loading

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Error**: Check your Firebase config and rules
2. **AI API Error**: Verify OpenRouter API key and credits
3. **Build Errors**: Ensure all environment variables are set
4. **Deployment Issues**: Check Vercel environment variables

### Development Tips

- Use `npm run dev` for hot reloading
- Check browser console for errors
- Use React DevTools for component debugging
- Firebase Emulator for local testing

## 📈 Future Enhancements

- **Multiplayer Modes**: Real-time collaborative detection
- **Custom Levels**: User-generated content
- **Advanced Analytics**: Detailed learning progress tracking
- **Mobile App**: Native iOS/Android versions
- **Teacher Dashboard**: Classroom management tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for the UNSW AI Hackathon competition. All rights reserved.

## 🏆 Competition Entry

**Target Prize**: $5,000 Educational Technology Innovation Award  
**Project Category**: AI Literacy Educational Game  
**Target Audience**: Students aged 11-16 (Years 7-10)  
**Demo Duration**: 3-minute live presentation with judge participation

---

Built with ❤️ for AI education and critical thinking development.
