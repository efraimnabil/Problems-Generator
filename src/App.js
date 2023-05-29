import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './comp/Home';
function App() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);
  useEffect(() => {
    document.body.className = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='dark-btn'>
        <img src={theme === 'dark' ? 'https://img.icons8.com/ios-filled/50/000000/sun.png' : 'https://img.icons8.com/ios-filled/50/000000/moon-symbol.png'} alt="theme" />
      </button>
      <Home></Home>
    </div>
  );
}

export default App;
