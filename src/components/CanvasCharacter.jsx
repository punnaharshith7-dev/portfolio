import React, { useEffect, useRef } from 'react';

// Shortest-path circular angular lerp
function lerpAngle(start, end, factor) {
  let diff = (end - start) % (2 * Math.PI);
  if (diff < -Math.PI) diff += 2 * Math.PI;
  if (diff > Math.PI) diff -= 2 * Math.PI;
  return start + diff * factor;
}

export default function CanvasCharacter() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });

    const TOTAL_FRAMES = 64;
    const frames = new Array(TOTAL_FRAMES).fill(null);
    let lastDrawnImage = null;
    let needsRedraw = true;

    // 1. Immediately load & decode center frame
    const centerFrame = new Image();
    centerFrame.src = '/center.webp';
    if (centerFrame.decode) {
      centerFrame.decode().then(() => {
        lastDrawnImage = centerFrame;
        needsRedraw = true;
      }).catch(() => {
        lastDrawnImage = centerFrame;
        needsRedraw = true;
      });
    } else {
      centerFrame.onload = () => {
        lastDrawnImage = centerFrame;
        needsRedraw = true;
      };
    }

    // 2. Preload & GPU pre-decode all 64 directional frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const idxStr = String(i).padStart(2, '0');
      img.src = `/frames/frame_${idxStr}.webp`;
      if (img.decode) {
        img.decode().then(() => {
          frames[i] = img;
        }).catch(() => {
          frames[i] = img;
        });
      } else {
        img.onload = () => {
          frames[i] = img;
        };
      }
    }

    // DPR handling capped at 1.25 for crisp rendering with maximum 60-120 FPS performance
    let dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    let viewW = window.innerWidth;
    let viewH = window.innerHeight;

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      viewW = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      viewH = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
      canvas.width = Math.round(viewW * dpr);
      canvas.height = Math.round(viewH * dpr);
      needsRedraw = true;
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Target coordinates & smoothed coordinates
    let targetX = viewW / 2;
    let targetY = viewH / 2;
    let smoothX = targetX;
    let smoothY = targetY;

    let currentAngle = 0;
    let targetAngle = 0;
    let isInsideDeadzone = true;
    let animId;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      const isMobile = viewW < 640;
      targetX = viewW / 2;
      targetY = viewH * (isMobile ? 0.35 : 0.46);
    };

    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const isMobile = viewW < 640;
        const tiltX = (e.gamma / 30) * (viewW * 0.4);
        const tiltY = ((e.beta - 45) / 30) * (viewH * 0.3);
        targetX = viewW / 2 + tiltX;
        targetY = (viewH * (isMobile ? 0.35 : 0.46)) + tiltY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    // High refresh rate native render loop (60-144 FPS)
    let lastTime = performance.now();

    const render = (time) => {
      animId = requestAnimationFrame(render);

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const isMobile = viewW < 640;

      // Smooth coordinate interpolation
      const coordLerpFactor = 1 - Math.exp(-18 * dt);
      smoothX += (targetX - smoothX) * coordLerpFactor;
      smoothY += (targetY - smoothY) * coordLerpFactor;

      // Face center position (adjusted on mobile so head is in the upper 35% of screen)
      const faceCenterX = viewW / 2;
      const faceCenterY = viewH * (isMobile ? 0.35 : 0.46);

      const dx = smoothX - faceCenterX;
      const dy = smoothY - faceCenterY;
      const distance = Math.hypot(dx, dy);

      // Deadzone with hysteresis to prevent edge jitter
      const baseDeadzone = Math.min(viewW, viewH) * 0.11;
      const enterDeadzone = baseDeadzone * 0.75;
      const exitDeadzone = baseDeadzone * 1.15;

      if (isInsideDeadzone) {
        if (distance > exitDeadzone) {
          isInsideDeadzone = false;
        }
      } else {
        if (distance < enterDeadzone) {
          isInsideDeadzone = true;
        }
      }

      if (!isInsideDeadzone) {
        let angle = Math.atan2(dy, dx) + Math.PI / 2;
        if (angle < 0) angle += 2 * Math.PI;
        targetAngle = angle;
      }

      // Smooth circular angle lerp
      const angleLerpFactor = 1 - Math.exp(-14 * dt);
      currentAngle = lerpAngle(currentAngle, targetAngle, angleLerpFactor);

      // Select active frame
      let activeImage = null;
      if (isInsideDeadzone) {
        if (centerFrame.complete && centerFrame.naturalWidth > 0) {
          activeImage = centerFrame;
        }
      } else {
        const norm = ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const frameIndex = Math.round((norm / (2 * Math.PI)) * TOTAL_FRAMES) % TOTAL_FRAMES;
        const candidate = frames[frameIndex];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          activeImage = candidate;
        } else if (centerFrame.complete && centerFrame.naturalWidth > 0) {
          activeImage = centerFrame;
        }
      }

      if (!activeImage) {
        activeImage = lastDrawnImage;
      }

      // Redraw only when frame actually changes or on resize
      if (activeImage && (activeImage !== lastDrawnImage || needsRedraw)) {
        lastDrawnImage = activeImage;
        needsRedraw = false;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Fill background
        ctx.fillStyle = '#a41916';
        ctx.fillRect(0, 0, viewW, viewH);

        const imgW = activeImage.naturalWidth;
        const imgH = activeImage.naturalHeight;

        // Mobile vs desktop scaling: on mobile portrait, keep the head nicely sized in upper viewport
        let scale;
        let renderW;
        let renderH;
        let renderX;
        let renderY;

        if (isMobile) {
          scale = Math.max(viewW / imgW, (viewH * 0.78) / imgH);
          renderW = imgW * scale;
          renderH = imgH * scale;
          renderX = (viewW - renderW) / 2;
          renderY = Math.min(viewH * 0.04, 30);
        } else {
          scale = Math.max(viewW / imgW, viewH / imgH);
          renderW = imgW * scale;
          renderH = imgH * scale;
          renderX = (viewW - renderW) / 2;
          renderY = (viewH - renderH) / 2;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(activeImage, renderX, renderY, renderW, renderH);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('deviceorientation', handleOrientation);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        display: 'block',
        pointerEvents: 'none'
      }}
    />
  );
}
