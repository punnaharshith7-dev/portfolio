import React from 'react';
import { skillsCategories } from '../data/portfolioData';
import { Code2, Server, Cpu, Sparkles } from 'lucide-react';

export default function TechStackSection() {
  const getCategoryIcon = (category) => {
    if (category.includes('Frontend')) return <Code2 size={22} color="#ff7b7b" />;
    if (category.includes('Backend')) return <Server size={22} color="#60a5fa" />;
    return <Cpu size={22} color="#a78bfa" />;
  };

  return (
    <section id="stack" style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span
          style={{
            fontSize: '13px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#ff6b6b',
            fontWeight: 600,
            display: 'inline-block',
            marginBottom: '12px'
          }}
        >
          Technical Arsenal
        </span>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
          Technologies & Tools
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '580px', margin: '16px auto 0', fontSize: '16px' }}>
          Battle-tested frameworks, graphics libraries, and infrastructure I leverage to ship resilient systems.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}
      >
        {skillsCategories.map((catGroup, idx) => (
          <div
            key={catGroup.category}
            className={`glass-card reveal delay-${(idx + 1) * 150}`}
            style={{
              padding: '32px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div
                style={{
                  padding: '10px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)'
                }}
              >
                {getCategoryIcon(catGroup.category)}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff' }}>
                {catGroup.category}
              </h3>
            </div>

            {/* Skills List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {catGroup.skills.map((skill) => (
                <div
                  key={skill.name}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>
                      {skill.name}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: skill.level === 'Expert' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(96, 165, 250, 0.15)',
                        color: skill.level === 'Expert' ? '#4ade80' : '#60a5fa'
                      }}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.4 }}>
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
