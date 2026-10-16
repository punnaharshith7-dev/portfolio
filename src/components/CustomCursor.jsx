import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;
    let isVisible = false;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const setVisibility = (visible) => {
      isVisible = visible;
      if (dot && ring) {
        dot.style.opacity = visible ? '1' : '0';
        ring.style.opacity = visible ? '1' : '0';
      }
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setVisibility(true);

      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseLeave = () => setVisibility(false);
    const handleMouseEnter = () => setVisibility(true);

    const updateHoverState = (e) => {
      const target = e.target;
      if (!ring) return;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive'))
      ) {
        ring.classList.add('hovered');
      } else {
        ring.classList.remove('hovered');
      }
    };

    // Smooth trailing animation for outer ring with RAF
    const render = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', updateHoverState, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', updateHoverState);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" style={{ opacity: 0, transition: 'opacity 0.2s ease' }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{ opacity: 0, transition: 'opacity 0.2s ease' }} />
    </>
  );
}
