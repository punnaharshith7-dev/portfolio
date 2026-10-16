import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(10, 5, 5, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card project-modal-card"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '32px',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          background: 'linear-gradient(135deg, rgba(35, 12, 12, 0.95), rgba(15, 8, 8, 0.98))',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
        >
          <X size={20} />
        </button>

        {/* Project Header */}
        <span
          style={{
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#ff6b6b',
            marginBottom: '8px'
          }}
        >
          {project.category}
        </span>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
          {project.title}
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px' }}>
          {project.subtitle}
        </p>

        {/* Project Image */}
        <div
          style={{
            width: '100%',
            height: '240px',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Description */}
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '24px' }}>
          {project.description}
        </p>

        {/* Metrics Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 18px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <CheckCircle2 size={18} color="#4ade80" />
          <span style={{ fontSize: '13.5px', color: '#ffffff', fontWeight: 500 }}>
            {project.metrics}
          </span>
        </div>

        {/* Tech Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '12px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div style={{ display: 'flex', gap: '14px' }}>
          {project.demo && project.demo !== project.github ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#ffffff',
                color: '#0d0707',
                padding: '14px',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Live Experience</span>
              <ExternalLink size={16} />
            </a>
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.06)',
                color: 'rgba(255, 255, 255, 0.65)',
                padding: '14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 500
              }}
            >
              Live Deploy Coming Soon
            </div>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#ffffff',
              padding: '14px 24px',
              borderRadius: '999px',
              fontWeight: 500,
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            <GithubIcon size={16} />
            <span>Code</span>
          </a>
        </div>
      </div>
    </div>
  );
}
