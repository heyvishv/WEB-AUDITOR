'use client';

import { useState, useEffect } from 'react';
import { Monitor, Smartphone, Activity, BarChart2, ShieldCheck, Zap, Rocket, Search, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Helper component for the SVG animated score circles
function AnimatedMetricCircle({ label, score, delay = 0 }: { label: string, score: number | null, delay?: number }) {
  const [offset, setOffset] = useState(251.2);
  
  const getScoreColor = (s: number | null) => {
    if (s === null) return 'var(--text-secondary)';
    if (s >= 90) return '#10b981'; // Green
    if (s >= 50) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const color = getScoreColor(score);
  
  useEffect(() => {
    if (score !== null) {
      // 251.2 is the full circumference. Calculate the offset based on the score (0-100)
      const targetOffset = 251.2 - (251.2 * score) / 100;
      setTimeout(() => {
        setOffset(targetOffset);
      }, 300 + delay);
    }
  }, [score, delay]);
  
  return (
    <div className="metric-item">
      <div className="svg-ring-container">
        <svg className="svg-ring" width="100" height="100" viewBox="0 0 100 100">
          <circle className="ring-bg" cx="50" cy="50" r="40" />
          <circle 
            className="ring-progress" 
            cx="50" cy="50" r="40" 
            style={{ stroke: color, strokeDashoffset: offset }} 
          />
        </svg>
        <div className="score-text" style={{ color: color }}>
          {score !== null ? score : '-'}
        </div>
      </div>
      <span className="metric-label">{label}</span>
    </div>
  );
}

const DEMO_RESULTS = {
  desktop: { performance: 98, accessibility: 100, bestPractices: 92, seo: 100 },
  mobile: { performance: 85, accessibility: 98, bestPractices: 92, seo: 100 }
};

const DEMO_CHART_DATA = [
  { name: 'Performance', Desktop: 98, Mobile: 85 },
  { name: 'Accessibility', Desktop: 100, Mobile: 98 },
  { name: 'Best Practices', Desktop: 92, Mobile: 92 },
  { name: 'SEO', Desktop: 100, Mobile: 100 },
];

function DashboardView({ results, chartData, targetUrl, isDemo }: { results: any, chartData: any, targetUrl: string, isDemo?: boolean }) {
  let hostname = "example.com";
  try {
    hostname = new URL(targetUrl).hostname;
  } catch (e) {}

  return (
    <section id="results-section" className="teaser-section" style={{ opacity: isDemo ? 0.9 : 1, position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1200px', position: 'relative' }}>
         {isDemo && (
           <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-primary)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 600, zIndex: 20, boxShadow: '0 4px 14px 0 var(--accent-glow)' }}>
             Interactive Live Demo
           </div>
         )}
         <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', filter: isDemo ? 'blur(0.5px)' : 'none' }}>
            Diagnostics for <span style={{ color: 'var(--accent-primary)' }}>{hostname}</span>
         </h2>
         
         <div className="results-grid" style={{ pointerEvents: isDemo ? 'auto' : 'auto' }}>
           {/* Desktop Results Card */}
           <div className="glass-card animate-fade-up">
             <div className="glow-effect"></div>
             <h3 className="card-title">
                <Monitor size={28} color="var(--accent-primary)" />
                Desktop Diagnostics
             </h3>
             {results.desktop ? (
               <div className="metrics-grid">
                  <AnimatedMetricCircle label="Performance" score={results.desktop.performance} delay={100} />
                  <AnimatedMetricCircle label="Accessibility" score={results.desktop.accessibility} delay={200} />
                  <AnimatedMetricCircle label="Best Practices" score={results.desktop.bestPractices} delay={300} />
                  <AnimatedMetricCircle label="SEO" score={results.desktop.seo} delay={400} />
               </div>
             ) : (
               <p style={{ color: 'var(--text-secondary)' }}>Failed to load desktop metrics.</p>
             )}
           </div>

           {/* Mobile Results Card */}
           <div className="glass-card animate-fade-up delay-100">
             <div className="glow-effect"></div>
             <h3 className="card-title">
                <Smartphone size={28} color="var(--accent-primary)" />
                Mobile Diagnostics
             </h3>
             {results.mobile ? (
               <div className="metrics-grid">
                  <AnimatedMetricCircle label="Performance" score={results.mobile.performance} delay={200} />
                  <AnimatedMetricCircle label="Accessibility" score={results.mobile.accessibility} delay={300} />
                  <AnimatedMetricCircle label="Best Practices" score={results.mobile.bestPractices} delay={400} />
                  <AnimatedMetricCircle label="SEO" score={results.mobile.seo} delay={500} />
               </div>
             ) : (
               <p style={{ color: 'var(--text-secondary)' }}>Failed to load mobile metrics.</p>
             )}
           </div>
         </div>

         {/* Interactive Chart Card */}
         <div className="glass-card animate-fade-up delay-200" style={{ marginTop: '2rem' }}>
            <h3 className="card-title">
              <BarChart2 size={28} color="var(--accent-primary)" />
              Cross-Platform Comparison
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Hover over the bars to see exact score differences between Desktop and Mobile environments.
            </p>
            
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                  <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{ fill: 'var(--badge-bg)' }}
                    contentStyle={{ 
                      backgroundColor: 'var(--surface-color)', 
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      color: 'var(--text-primary)'
                    }} 
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="Desktop" fill="var(--accent-primary)" radius={[6, 6, 0, 0]} maxBarSize={60} />
                  <Bar dataKey="Mobile" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
         </div>
      </div>
    </section>
  );
}

import Navbar from '@/components/Navbar';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    desktop: any;
    mobile: any;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '';
      const getApiUrl = (strategy: string) => 
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO${apiKey ? `&key=${apiKey}` : ''}`;

      const [desktopRes, mobileRes] = await Promise.allSettled([
        fetch(getApiUrl('desktop')).then(res => res.json()),
        fetch(getApiUrl('mobile')).then(res => res.json())
      ]);

      const desktopData = desktopRes.status === 'fulfilled' ? desktopRes.value : { error: { message: 'Failed to fetch desktop' } };
      const mobileData = mobileRes.status === 'fulfilled' ? mobileRes.value : { error: { message: 'Failed to fetch mobile' } };

      const extractMetrics = (data: any) => {
        if (data.error || !data.lighthouseResult?.categories) return null;
        const cats = data.lighthouseResult.categories;
        return {
          performance: cats.performance?.score ? Math.round(cats.performance.score * 100) : null,
          accessibility: cats.accessibility?.score ? Math.round(cats.accessibility.score * 100) : null,
          bestPractices: cats['best-practices']?.score ? Math.round(cats['best-practices'].score * 100) : null,
          seo: cats.seo?.score ? Math.round(cats.seo.score * 100) : null,
        };
      };

      const desktopMetrics = extractMetrics(desktopData);
      const mobileMetrics = extractMetrics(mobileData);

      if (!desktopMetrics && !mobileMetrics) {
        const errorMsg = desktopData.error?.message || mobileData.error?.message || 'Both mobile and desktop audits failed.';
        if (errorMsg.includes('Quota exceeded') || errorMsg.includes('key')) {
          throw new Error('Google API Key is missing or invalid. Please add a valid NEXT_PUBLIC_GOOGLE_API_KEY in Netlify settings.');
        }
        throw new Error(errorMsg);
      }

      setResults({
        desktop: desktopMetrics,
        mobile: mobileMetrics,
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

  // Prepare data for the comparison chart
  const chartData = results ? [
    { name: 'Performance', Desktop: results.desktop?.performance || 0, Mobile: results.mobile?.performance || 0 },
    { name: 'Accessibility', Desktop: results.desktop?.accessibility || 0, Mobile: results.mobile?.accessibility || 0 },
    { name: 'Best Practices', Desktop: results.desktop?.bestPractices || 0, Mobile: results.mobile?.bestPractices || 0 },
    { name: 'SEO', Desktop: results.desktop?.seo || 0, Mobile: results.mobile?.seo || 0 },
  ] : [];

  return (
    <>
      <Navbar />

      <main>
        <section className="hero relative">
          <div className="glow-effect" style={{ top: '30%' }}></div>
          
          {/* Floating Chips */}
          <div className="floating-chip chip-1">
            <Zap size={16} color="var(--accent-primary)" />
            Sub-second Analysis
          </div>
          <div className="floating-chip chip-2">
            <ShieldCheck size={16} color="#10b981" />
            Core Web Vitals
          </div>
          <div className="floating-chip chip-3">
            <Search size={16} color="#f59e0b" />
            SEO Optimization
          </div>

          <div className="container hero-container relative z-10">
            <div className="badge">✨ New: Deep Interactive Diagnostics</div>
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
                      <Zap size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {error && (
              <div style={{ color: '#ef4444', marginTop: '1rem', fontWeight: 500, backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '1rem 2rem', borderRadius: '12px' }}>
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

        <DashboardView 
          results={results || DEMO_RESULTS} 
          chartData={results ? chartData : DEMO_CHART_DATA} 
          targetUrl={results ? url : "https://example.com"} 
          isDemo={!results} 
        />

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Everything you need to optimize your site</h2>
              <p className="section-subtitle">Our AI-driven engine performs a comprehensive deep-dive into the metrics that actually matter for your user experience and search ranking.</p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <Rocket size={32} />
                </div>
                <h3 className="feature-title">Performance Profiling</h3>
                <p className="feature-desc">We analyze First Contentful Paint, Time to Interactive, and Core Web Vitals to ensure your site loads blisteringly fast on any connection.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <Eye size={32} />
                </div>
                <h3 className="feature-title">Accessibility Scoring</h3>
                <p className="feature-desc">Discover contrast issues, missing aria-labels, and structural flaws. We make sure your website is perfectly usable for every single visitor.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <Search size={32} />
                </div>
                <h3 className="feature-title">Technical SEO</h3>
                <p className="feature-desc">Uncover missing meta tags, broken links, and indexing blockers. Our crawler ensures search engines can understand and rank your content highly.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo">
                <Activity className="text-accent-primary" size={24} color="var(--accent-primary)" />
                AI Site Auditor
              </a>
              <p>The most advanced, AI-powered website diagnostic engine. Stop guessing why your conversion rate is low, and start fixing it.</p>
            </div>
            
            <div>
              <h4 className="footer-title">Product</h4>
              <ul className="footer-links">
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Agency API</a></li>
                <li><a href="#">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Contact Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} AI Site Auditor. All rights reserved.</p>
            <div className="social-icons">
              <a href="#" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.8c0-1.2-.4-2.4-1.2-3.2 3-.3 6-1.5 6-6.5 0-1.4-.5-2.7-1.4-3.7.1-.3.6-1.7-.1-3.6 0 0-1.2-.4-3.8 1.4-1.1-.3-2.3-.5-3.5-.5s-2.4.2-3.5.5c-2.6-1.8-3.8-1.4-3.8-1.4-.7 1.9-.2 3.3-.1 3.6-.9 1-1.4 2.3-1.4 3.7 0 5 3 6.2 6 6.5-.8.8-1.2 2-1.2 3.2V23"></path></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
