import React, { useState } from 'react';
import { projects } from '../data/portfolioData';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectsSection({ onSelectProject }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="work" style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Section Header */}
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
          Selected Portfolio Work
        </span>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
          Crafted with Engineering Rigor
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '580px', margin: '16px auto 0', fontSize: '16px' }}>
          A curated selection of 3D interactive experiences, high-throughput cloud architectures, and AI applications.
        </p>

        {/* Filter Pills */}
        <div className="reveal delay-100" style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '32px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="glass-pill"
              style={{
                border: 'none',
                padding: '8px 20px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: filter === cat ? 600 : 400,
                color: '#ffffff',
                background: filter === cat ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.06)',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px'
        }}
      >
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className={`glass-card interactive reveal-scale delay-${((idx % 4) + 1) * 100}`}
            onClick={() => onSelectProject(project)}
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Project Image Banner */}
            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <ArrowUpRight size={18} />
              </div>
            </div>

            {/* Project Content */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span
                style={{
                  fontSize: '11.5px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ff6b6b',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}
              >
                {project.category}
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                {project.title}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.68)', marginBottom: '16px', flex: 1 }}>
                {project.subtitle}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '11.5px',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {project.demo && project.demo !== project.github ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontWeight: 500
                    }}
                  >
                    <span>Live Preview</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontWeight: 500
                    }}
                  >
                    Deploy Coming Soon
                  </span>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    textDecoration: 'none'
                  }}
                >
                  <GithubIcon size={15} />
                  <span>Source</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
