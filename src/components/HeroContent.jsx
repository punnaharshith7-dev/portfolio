import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function HeroContent() {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      if (window.scrollY <= window.innerHeight * 1.2) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.65));
  const heroTranslateY = scrollY * 0.22;

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          left: '48px',
          zIndex: 40,
          maxWidth: '460px',
          pointerEvents: 'auto',
          opacity: heroOpacity,
          transform: `translateY(${heroTranslateY}px)`,
          transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
        }}
      >
        {/* Intro Greeting */}
        <p
          style={{
            fontSize: '13.5px',
            fontWeight: 600,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '4px'
          }}
        >
          Hi, I'm
        </p>

        {/* Large Cursive Name */}
        <h1
          className="font-cursive"
          style={{
            fontSize: 'clamp(50px, 7vw, 76px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.05,
            marginBottom: '10px',
            textShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
          }}
        >
          {personalInfo.fullName}
        </h1>

        {/* Role title */}
        <p
          style={{
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#ff8a8a',
            marginBottom: '14px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}
        >
          {personalInfo.role}
        </p>

        {/* Compact bio */}
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.65,
            color: 'rgba(255, 255, 255, 0.88)',
            maxWidth: '400px',
            marginBottom: '28px',
            fontWeight: 400
          }}
        >
          {personalInfo.bio}
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap'
          }}
        >
          {/* Resume button with direct download/view */}
          <a
            href={personalInfo.socials.resume}
            target="_blank"
            rel="noopener noreferrer"
            download="Harshith_Punna_Resume.pdf"
            className="interactive"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              color: '#0d0707',
              textDecoration: 'none',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '13.5px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
            }}
          >
            <span>Resume</span>
            <ArrowUpRight size={17} strokeWidth={2.5} />
          </a>

          {/* Let's Talk pill button */}
          <a
            href="#contact"
            className="glass-pill interactive"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '13.5px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Let's Talk
          </a>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div
        onClick={scrollToWork}
        className="glass-pill interactive"
        style={{
          position: 'absolute',
          bottom: '48px',
          right: '48px',
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 18px',
          borderRadius: '9999px',
          color: 'rgba(255, 255, 255, 0.85)',
          fontSize: '12.5px',
          letterSpacing: '0.06em',
          opacity: heroOpacity,
          pointerEvents: heroOpacity <= 0.05 ? 'none' : 'auto',
          transition: 'opacity 0.15s ease-out, transform 0.25s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <span>Explore Work</span>
        <ArrowDown size={14} className="bounce-arrow" />
      </div>
    </>
  );
}
