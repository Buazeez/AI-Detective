import React from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      />
      
      <div className="max-w-2xl w-full text-center">
        <div className="detective-card">
          <h1 className="text-4xl font-bold text-white mb-4">🕵️ AI Detective</h1>
          <h2 className="text-2xl font-semibold text-detective-300 mb-6">Hallucination Hunt</h2>
          
          <div className="space-y-4">
            <p className="text-white/80 text-lg">
              Welcome to the AI Detective game! This is a test to see if the page loads correctly.
            </p>
            
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-300 font-semibold">
                ✅ Page is loading correctly!
              </p>
              <p className="text-green-200 text-sm mt-2">
                The React app is working. Now you need to:
              </p>
              <ul className="text-green-200 text-sm mt-2 text-left">
                <li>1. Get OpenRouter API key from https://openrouter.ai/</li>
                <li>2. Enable Firebase Authentication</li>
                <li>3. Replace the placeholder API key in .env.local</li>
              </ul>
            </div>
            
            <button 
              onClick={() => window.location.reload()}
              className="detective-button"
            >
              Test Button (Click Me!)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
