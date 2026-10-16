import React from 'react';
import { personalInfo, education, certifications, languages, coursework } from '../data/portfolioData';
import { GraduationCap, Award, BookOpen, Languages as LanguagesIcon, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
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
          Profile & Journey
        </span>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
          About Harshith
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '580px', margin: '14px auto 0', fontSize: '16px' }}>
          Passionate about building scalable web platforms, computer vision applications, and intelligent agentic workflows.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Bio & Stats */}
        <div className="reveal-left delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Bio Card */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Sparkles size={22} color="#ff7b7b" />
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>
                Engineering Rigor & Innovation
              </h3>
            </div>
            {personalInfo.about.map((para, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.78)',
                  marginBottom: idx === personalInfo.about.length - 1 ? 0 : '16px'
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}
          >
            {personalInfo.stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card"
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(28px, 4vw, 36px)',
                    fontWeight: 700,
                    color: '#ff7b7b',
                    marginBottom: '4px'
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Languages & Coursework */}
          <div
            className="glass-card"
            style={{
              padding: '30px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <LanguagesIcon size={20} color="#ff7b7b" />
              <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff' }}>
                Languages & Coursework
              </h4>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {languages.map((lang) => (
                <span
                  key={lang.name}
                  style={{
                    fontSize: '12.5px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  <strong style={{ color: '#ff7b7b' }}>{lang.name}</strong> • {lang.proficiency}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {coursework.map((course) => (
                <span
                  key={course}
                  style={{
                    fontSize: '12px',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    color: 'rgba(255, 255, 255, 0.72)',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Education & Certifications */}
        <div className="reveal-right delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Education Timeline */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <GraduationCap size={22} color="#ff7b7b" />
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>
                Education Background
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              {education.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'relative',
                    paddingLeft: '24px',
                    borderLeft: '2px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-6px',
                      top: '4px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#ff7b7b',
                      boxShadow: '0 0 10px #ff7b7b'
                    }}
                  />
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#ff7b7b',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.period}
                  </span>
                  <h4 style={{ fontSize: '17px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>
                    {item.degree}
                  </h4>
                  <div style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '6px' }}>
                    {item.institution}
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5 }}>
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Card */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <Award size={22} color="#ff7b7b" />
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>
                Certifications & Accreditations
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ fontSize: '14.5px', fontWeight: 600, color: '#ffffff' }}>
                      {cert.title}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 107, 107, 0.15)',
                        color: '#ff7b7b',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {cert.issuer}
                    </span>
                  </div>
                  <span style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {cert.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
