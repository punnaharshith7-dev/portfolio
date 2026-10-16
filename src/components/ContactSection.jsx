import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './SocialIcons';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    // Open default mail client or send
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${personalInfo.socials.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" style={{ padding: '120px 24px', maxWidth: '1000px', margin: '0 auto' }}>
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
          Get In Touch
        </span>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
          Let's Build Something Exceptional
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '540px', margin: '16px auto 0', fontSize: '16px' }}>
          Have an internship, project, or full-stack opportunity in mind? My inbox and phone are always open.
        </p>
      </div>

      <div
        className="responsive-contact-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '40px'
        }}
      >
        {/* Contact Info & Channels */}
        <div
          className="glass-card reveal-left delay-100"
          style={{
            padding: '36px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
              Direct Channels
            </h3>
            <p style={{ fontSize: '14.5px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '28px' }}>
              Feel free to reach out directly via email, phone, or connect on professional networks.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {/* Email */}
              <a
                href={`mailto:${personalInfo.socials.email}`}
                className="glass-pill interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                <Mail size={18} color="#ff7b7b" />
                <span>{personalInfo.socials.email}</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${personalInfo.socials.phone.replace(/\s+/g, '')}`}
                className="glass-pill interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                <Phone size={18} color="#ff7b7b" />
                <span>{personalInfo.socials.phone}</span>
              </a>

              {/* Location */}
              <div
                className="glass-pill"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                <MapPin size={18} color="#ff7b7b" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Social Links Bar */}
          <div>
            <div style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '14px' }}>
              Professional Profiles
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="glass-pill interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '999px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                <GithubIcon size={18} />
                <span>GitHub</span>
              </a>

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="glass-pill interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '999px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
              </a>

              <a
                href={personalInfo.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                title="LeetCode"
                className="glass-pill interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '999px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                <LeetcodeIcon size={18} color="#ffa116" />
                <span>LeetCode</span>
              </a>
            </div>
          </div>
        </div>

        {/* Message Form Container */}
        <div
          className="glass-card reveal-right delay-200"
          style={{
            padding: '36px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {submitted ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '40px 20px'
              }}
            >
              <CheckCircle2 size={56} color="#4ade80" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                Message Dispatched!
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '15px', maxWidth: '320px', marginBottom: '24px' }}>
                Thank you for reaching out, Harshith has received your note and will get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="glass-pill"
                style={{
                  padding: '10px 24px',
                  borderRadius: '999px',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '13.5px'
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '6px' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Recruiters / Team Lead"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '14.5px',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.35)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '14.5px',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.35)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '6px' }}>
                  Project / Opportunity Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your role or project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '14.5px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.35)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="interactive"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  color: '#0d0707',
                  padding: '14px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '14.5px',
                  border: 'none',
                  transition: 'all 0.2s ease',
                  opacity: loading ? 0.7 : 1
                }}
              >
                <span>{loading ? 'Sending...' : 'Transmit Message'}</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
