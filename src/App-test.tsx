import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e293b, #7c3aed, #1e293b)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🕵️ AI Detective</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#f59e0b' }}>Hallucination Hunt</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          If you can see this, the React app is working!
        </p>
        <button 
          onClick={() => alert('Button works!')}
          style={{
            background: '#f59e0b',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;
