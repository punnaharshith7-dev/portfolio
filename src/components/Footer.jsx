import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '40px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.65)' }}>
          © {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
        </span>
      </div>

      <button
        onClick={scrollToTop}
        className="glass-pill interactive"
        style={{
          border: 'none',
          padding: '10px 18px',
          borderRadius: '999px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          fontWeight: 500
        }}
      >
        <span>Back to Top</span>
        <ArrowUp size={15} />
      </button>
    </footer>
  );
}
