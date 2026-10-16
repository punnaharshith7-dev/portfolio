import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('HERO');
  const tabs = [
    { label: 'HERO', id: 'hero' },
    { label: 'WORK', id: 'work' },
    { label: 'STACK', id: 'stack' },
    { label: 'ABOUT', id: 'about' },
    { label: 'CONTACT', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const tab of [...tabs].reverse()) {
        const el = document.getElementById(tab.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveTab(tab.label);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      {/* Availability Status Badge */}
      <div
        className="glass-pill"
        style={{
          display: 'none', // Shown on md+ screens via media query
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '9999px',
          fontSize: '12px',
          color: '#ffffff',
          fontWeight: 500
        }}
        id="status-badge"
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#4ade80',
            boxShadow: '0 0 10px #4ade80'
          }}
        />
        <span>Open to Work</span>
      </div>

      {/* Main Nav Pill */}
      <nav
        className="glass-pill"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '6px 8px',
          borderRadius: '9999px',
          gap: '2px'
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => scrollTo(tab.id)}
              className="interactive"
              style={{
                background: isActive ? 'rgba(255, 255, 255, 0.22)' : 'transparent',
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.72)',
                border: 'none',
                outline: 'none',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '12px',
                letterSpacing: '0.1em',
                fontWeight: 600,
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)';
              }}
            >
              [{tab.label}]
            </button>
          );
        })}
      </nav>
    </header>
  );
}
