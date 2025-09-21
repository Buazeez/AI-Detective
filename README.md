# AI Detective: Hallucination Hunt 🕵️

An educational web game that teaches AI literacy by having students detect hallucinations and biases in AI-generated responses. Built for the UNSW AI Hackathon competition.

## 🎯 Project Overview

**AI Detective: Hallucination Hunt** is a revolutionary web-based educational game designed to teach critical AI literacy skills to students aged 11-16 (Years 7-10). Players act as AI detectives, crafting prompts and identifying hallucinations, biases, and errors in AI-generated responses.

### Key Features

- **18 Progressive Levels** across 3 difficulty tiers (Beginner, Intermediate, Advanced)
- **Local Leaderboard** with competitive rankings stored in browser
- **Preloaded Educational Content** with intentional errors for learning
- **Interactive Hallucination Detection** with clickable error identification
- **Educational Feedback** with explanations for each detected error
- **Achievement System** with badges and progress tracking

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Storage**: Local Storage (no backend required)
- **Content**: Preloaded educational responses with intentional errors
- **Deployment**: Vercel
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd ai-detective-hallucination-hunt
   npm install
   ```

2. **No setup required!**

   The game uses preloaded educational content with intentional errors. No API keys or external services needed.

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🎮 How It Works

### Preloaded Content System

The game uses carefully crafted educational responses with intentional errors:

1. **Level 1 - Moon Facts**: Responses about lunar science with obvious errors
2. **Level 2 - Dinosaur History**: Timeline and extinction claims with historical mistakes
3. **Level 3 - Human Anatomy**: Body system explanations with biological errors

Each level includes 4-5 specific hallucinations that players must identify and click on.

**Benefits**:

- ✅ **100% Reliable** - No API failures or network issues
- ✅ **Consistent Experience** - Same educational content every time
- ✅ **Fast Loading** - No network delays
- ✅ **Offline Ready** - Works without internet

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
│   └── localLeaderboard.ts # Local leaderboard management
├── types/             # TypeScript type definitions
│   └── index.ts       # Game types
└── App.tsx            # Main app component
```

## 🎮 Game Mechanics

### Core Gameplay Loop

1. **Player Registration** → Quick sign-up for local leaderboard
2. **Task Assignment** → Specific briefing for each level
3. **Prompt Creation** → Player writes targeted prompt
4. **AI Response Generation** → System generates response with embedded hallucinations
5. **Error Detection** → Player clicks suspicious information for points
6. **Educational Feedback** → Immediate explanation of errors
7. **Leaderboard Update** → Local rank changes

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

- **Minute 1**: Judge registers, sees local leaderboard, receives Level 1 task brief
- **Minute 2**: Judge writes prompt, AI responds with obvious errors, finds mistakes for points
- **Minute 3**: Multiple judges compete simultaneously, see local rankings and score updates

### Key Competition Advantages

- **Instant Engagement**: No complex onboarding, immediate gameplay
- **Local Competition**: Live leaderboard updates during demo
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
- **Secure API Keys**: Environment variables only (optional)
- **Local Data Storage**: Player data stored locally in browser
- **Age-Appropriate Content**: All AI responses pre-screened for educational content

## 📊 Performance Optimization

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Optimized assets and lazy loading
- **Caching**: Local storage for leaderboard data
- **Bundle Size**: Minimal dependencies, tree-shaking enabled
- **CDN**: Vercel's global CDN for fast loading

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Check that all dependencies are installed
2. **Deployment Issues**: Ensure Vercel is properly configured
3. **Local Storage Issues**: Clear browser data if needed
4. **Game Not Loading**: Check browser console for errors

### Development Tips

- Use `npm run dev` for hot reloading
- Check browser console for errors
- Use React DevTools for component debugging
- Local storage inspection in browser dev tools

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
