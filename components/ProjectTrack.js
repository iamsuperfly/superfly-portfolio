'use client';

import { useEffect, useRef } from 'react';

export default function ProjectTrack({ children }) {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!track || reduceMotion.matches) {
      return undefined;
    }

    let animationFrame;
    let lastTime;

    const tick = (time) => {
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;
      lastTime = time;

      if (!pausedRef.current && track.scrollWidth > track.clientWidth + 1) {
        track.scrollLeft += elapsed * 0.012;
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1) {
          track.scrollLeft = 0;
        }
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      ref={trackRef}
      className="projects-grid project-track"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocus={() => {
        pausedRef.current = true;
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          pausedRef.current = false;
        }
      }}
      onTouchStart={() => {
        pausedRef.current = true;
      }}
      onTouchEnd={() => {
        pausedRef.current = false;
      }}
    >
      {children}
    </div>
  );
}