import React, { useState, useEffect } from 'react';
import CanvasCharacter from './components/CanvasCharacter';
import Navbar from './components/Navbar';
import HeroContent from './components/HeroContent';
import ProjectsSection from './components/ProjectsSection';
import TechStackSection from './components/TechStackSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Dynamic Top Scroll Progress Indicator
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max((window.scrollY / totalHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. High-performance IntersectionObserver for Scroll-Reveal Transitions
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once animated, unobserve for optimal memory and scroll performance
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    const elementsToAnimate = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#a41916' }}>
      {/* Ambient Top Scroll Progress Glow Bar */}
      <div className="scroll-progress-line" style={{ width: `${scrollProgress}%` }} />

      {/* Floating Frosted Glass Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section
        id="hero"
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#a41916'
        }}
      >
        {/* 60-144 FPS Canvas Cursor-Tracking Background */}
        <CanvasCharacter />

        {/* Hero Typography & Controls */}
        <HeroContent />
      </section>

      {/* MAIN CONTENT AREA - Seamless luxury glassmorphism */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          background: 'linear-gradient(180deg, rgba(164, 25, 22, 0.25) 0%, rgba(13, 7, 7, 0.95) 15%, #0d0707 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 -40px 100px rgba(13, 7, 7, 0.85)'
        }}
      >
        {/* Selected Work */}
        <ProjectsSection onSelectProject={setSelectedProject} />

        {/* Tech Stack & Arsenal */}
        <TechStackSection />

        {/* About & Timeline */}
        <AboutSection />

        {/* Contact Form & Channels */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Custom Glowing Magnetic Cursor */}
      <CustomCursor />
    </div>
  );
}
