'use client';

import { Activity, LayoutDashboard, Settings, LogOut, Users, FileText } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', borderRight: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
            <Activity className="text-accent-primary" size={24} color="var(--accent-primary)" />
            AI Site Auditor
          </Link>
        </div>
        
        <nav style={{ padding: '1.5rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', backgroundColor: 'var(--accent-primary)', color: 'white', textDecoration: 'none', fontWeight: 500 }}>
            <LayoutDashboard size={20} />
            Overview
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>
            <FileText size={20} />
            Recent Audits
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>
            <Users size={20} />
            Clients
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>
            <Settings size={20} />
            Settings
          </a>
        </nav>
        
        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--border-color)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', color: '#ef4444', textDecoration: 'none', fontWeight: 500 }}>
            <LogOut size={20} />
            Sign Out
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Agency Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome back! Here is an overview of your client audits.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>JD</span>
            </div>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Total Audits Run</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>1,248</div>
            <div style={{ color: '#10b981', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: 500 }}>+12% from last month</div>
          </div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Active Clients</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>34</div>
            <div style={{ color: '#10b981', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: 500 }}>+4 new this week</div>
          </div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Average Score</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>88/100</div>
            <div style={{ color: '#f59e0b', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: 500 }}>Needs improvement</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Recent Audits</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: 'var(--glass-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Activity size={24} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Client {i} - E-Commerce</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>client{i}-shop.com</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>92</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Performance</div>
                  </div>
                  <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>View Report</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
