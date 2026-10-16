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

    // 2. Preload & asynchronous GPU pre-decode all 64 directional frames
    // This completely eliminates the first-turn decode lag/stutter
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

    // Balanced DPR for crisp rendering with maximum GPU efficiency (60-120 FPS)
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

    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltX = (e.gamma / 40) * (viewW * 0.45);
        const tiltY = ((e.beta - 40) / 40) * (viewH * 0.45);
        targetX = viewW / 2 + tiltX;
        targetY = viewH / 2 + tiltY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    // High refresh rate native render loop (60-144 FPS)
    let lastTime = performance.now();

    const render = (time) => {
      animId = requestAnimationFrame(render);

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth cursor coordinate interpolation (silky smooth trailing)
      const coordLerpFactor = 1 - Math.exp(-18 * dt);
      smoothX += (targetX - smoothX) * coordLerpFactor;
      smoothY += (targetY - smoothY) * coordLerpFactor;

      // Face center position
      const faceCenterX = viewW / 2;
      const faceCenterY = viewH * 0.46;

      const dx = smoothX - faceCenterX;
      const dy = smoothY - faceCenterY;
      const distance = Math.hypot(dx, dy);

      // Deadzone with hysteresis to prevent edge jitter/flashing
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

      // Smooth circular angle lerp with time-corrected dampening
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

      // Only perform costly canvas redraw if active image changed or resize occurred
      if (activeImage && (activeImage !== lastDrawnImage || needsRedraw)) {
        lastDrawnImage = activeImage;
        needsRedraw = false;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Fill background
        ctx.fillStyle = '#a41916';
        ctx.fillRect(0, 0, viewW, viewH);

        // Draw image centered & scaled to cover nicely
        const imgW = activeImage.naturalWidth;
        const imgH = activeImage.naturalHeight;

        const scale = Math.max(viewW / imgW, viewH / imgH);
        const renderW = imgW * scale;
        const renderH = imgH * scale;
        const renderX = (viewW - renderW) / 2;
        const renderY = (viewH - renderH) / 2;

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
