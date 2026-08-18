'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react';

export default function Navbar() {
  const [theme, setTheme] = useState('light');

  // Theme Toggling Logic
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setTheme(currentTheme);
      document.documentElement.setAttribute('data-theme', currentTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const targetTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(targetTheme);
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="logo">
          <Activity className="text-accent-primary" size={24} color="var(--accent-primary)" />
          AI Site Auditor
        </Link>
        <div className="nav-links">
          <button id="theme-toggle" className="theme-toggle" aria-label="Toggle dark mode" onClick={toggleTheme}>
            {theme === 'light' ? (
              <svg id="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg id="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
          </button>
          <Link href="/login" className="nav-link">Login / Agency Access</Link>
        </div>
      </div>
    </nav>
  );
}
