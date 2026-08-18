'use client';

import { useState, useEffect } from 'react';
import './globals.css';

export default function Home() {
  const [theme, setTheme] = useState('light');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    desktop: any;
    mobile: any;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Split into two requests
      const [desktopRes, mobileRes] = await Promise.allSettled([
        fetch('/api/pagespeed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, strategy: 'desktop' }),
        }).then(res => res.json()),
        fetch('/api/pagespeed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, strategy: 'mobile' }),
        }).then(res => res.json())
      ]);

      const desktopData = desktopRes.status === 'fulfilled' ? desktopRes.value : { error: 'Failed to fetch desktop' };
      const mobileData = mobileRes.status === 'fulfilled' ? mobileRes.value : { error: 'Failed to fetch mobile' };

      const desktopFailed = !!desktopData.error || !!desktopData.errorMessage || !desktopData.metrics;
      const mobileFailed = !!mobileData.error || !!mobileData.errorMessage || !mobileData.metrics;

      if (desktopFailed && mobileFailed) {
        throw new Error(desktopData.error || desktopData.errorMessage || mobileData.error || mobileData.errorMessage || 'Both mobile and desktop audits timed out. Please try again.');
      }

      setResults({
        desktop: !desktopFailed ? desktopData.metrics : null,
        mobile: !mobileFailed ? mobileData.metrics : null,
      });

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <a href="#" className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            AI Site Auditor
          </a>
          <div className="nav-links">
            <button id="theme-toggle" className="theme-toggle" aria-label="Toggle dark mode" onClick={toggleTheme}>
              {theme === 'light' ? (
                <svg id="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg id="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>
            <a href="#" className="nav-link">Login / Agency Access</a>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="container hero-container">
            <div className="badge">✨ New: Advanced UX/UI Analysis Engine</div>
            <h1 className="headline">Instantly Uncover Your Website's Hidden Flaws</h1>
            <p className="sub-headline">Get a complete AI-driven analysis of your SEO, Performance, and UX in seconds.</p>
            
            <form className="audit-form" id="audit-form" onSubmit={handleAudit}>
              <div className="input-group">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input 
                  type="url" 
                  id="url-input" 
                  placeholder="https://yourwebsite.com..." 
                  required 
                  aria-label="Website URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button type="submit" className={`btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>
                  {loading ? (
                    <><span className="loader"></span> Analyzing...</>
                  ) : (
                    <>
                      Get Your Free AI Audit
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {error && (
              <div style={{ color: '#ef4444', marginTop: '1rem', fontWeight: 500 }}>
                {error}
              </div>
            )}

            <div className="social-proof">
              <p>Trusted by 500+ agencies and freelancers</p>
              <div className="avatars">
                <div className="avatar" style={{backgroundImage: "url('https://i.pravatar.cc/100?img=1')"}}></div>
                <div className="avatar" style={{backgroundImage: "url('https://i.pravatar.cc/100?img=2')"}}></div>
                <div className="avatar" style={{backgroundImage: "url('https://i.pravatar.cc/100?img=3')"}}></div>
                <div className="avatar" style={{backgroundImage: "url('https://i.pravatar.cc/100?img=4')"}}></div>
                <div className="avatar" style={{backgroundImage: "url('https://i.pravatar.cc/100?img=5')"}}></div>
              </div>
            </div>
          </div>
        </section>

        {results ? (
          <section id="results-section" className="teaser-section">
            <div className="container teaser-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', width: '100%' }}>
               <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>Audit Results for {new URL(url).hostname}</h2>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                 {/* Desktop Results */}
                 <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                   <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                      Desktop Score
                   </h3>
                   {results.desktop ? (
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <MetricCircle label="Performance" score={results.desktop.performance} />
                        <MetricCircle label="Accessibility" score={results.desktop.accessibility} />
                        <MetricCircle label="Best Practices" score={results.desktop.bestPractices} />
                        <MetricCircle label="SEO" score={results.desktop.seo} />
                     </div>
                   ) : (
                     <p>Failed to load desktop metrics.</p>
                   )}
                 </div>

                 {/* Mobile Results */}
                 <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                   <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                      Mobile Score
                   </h3>
                   {results.mobile ? (
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <MetricCircle label="Performance" score={results.mobile.performance} />
                        <MetricCircle label="Accessibility" score={results.mobile.accessibility} />
                        <MetricCircle label="Best Practices" score={results.mobile.bestPractices} />
                        <MetricCircle label="SEO" score={results.mobile.seo} />
                     </div>
                   ) : (
                     <p>Failed to load mobile metrics.</p>
                   )}
                 </div>
               </div>
            </div>
          </section>
        ) : (
          <section className="teaser-section">
            <div className="container teaser-container">
              <div className="teaser-graphic">
                <img src="/mockup.jpg" alt="AI Website Auditor Dashboard Mockup" className="dashboard-img" />
                <div className="glow-effect"></div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

// Helper component for the score circles
function MetricCircle({ label, score }: { label: string, score: number | null }) {
  const getScoreColor = (s: number | null) => {
    if (s === null) return '#94a3b8';
    if (s >= 90) return '#10b981'; // Green
    if (s >= 50) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const color = getScoreColor(score);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ 
        width: '80px', height: '80px', borderRadius: '50%', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `4px solid ${color}`, fontSize: '1.5rem', fontWeight: 'bold',
        color: 'var(--text-primary)'
      }}>
        {score !== null ? score : '-'}
      </div>
      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  );
}
