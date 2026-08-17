'use client';

import { useEffect, useRef } from 'react';

const MOBILE_QUERY = '(max-width: 679px)';
const AUTOPLAY_DELAY = 4200;
const RESUME_DELAY = 2400;
const SETTLE_DELAY = 180;

export default function ProjectTrack({ children }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return undefined;
    }

    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const slides = Array.from(track.children);

    if (slides.length === 0) {
      return undefined;
    }

    const firstSlideClone = slides[0].cloneNode(true);
    firstSlideClone.classList.add('project-track-clone');
    firstSlideClone.setAttribute('aria-hidden', 'true');
    firstSlideClone.setAttribute('inert', '');
    firstSlideClone.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach((element) => {
      element.setAttribute('tabindex', '-1');
    });
    track.appendChild(firstSlideClone);

    const slideCount = slides.length;
    let currentIndex = 0;
    let autoplayTimer;
    let resumeTimer;
    let settleTimer;
    let isPaused = false;
    let isInteracting = false;

    const stopAutoplay = () => {
      window.clearInterval(autoplayTimer);
      autoplayTimer = undefined;
    };

    const getSlideOffset = (index) => {
      const slide = track.children[index];
      return slide ? slide.offsetLeft : 0;
    };

    const getNearestSlideIndex = () => {
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (let index = 0; index <= slideCount; index += 1) {
        const distance = Math.abs(track.scrollLeft - getSlideOffset(index));
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      }

      return nearestIndex;
    };

    const syncToNearestSlide = () => {
      settleTimer = undefined;

      if (isInteracting) {
        return;
      }

      const nearestIndex = getNearestSlideIndex();
      if (nearestIndex === slideCount) {
        track.scrollTo({ left: getSlideOffset(0), behavior: 'auto' });
        currentIndex = 0;
      } else {
        currentIndex = nearestIndex;
      }
    };

    const scheduleSettle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(syncToNearestSlide, SETTLE_DELAY);
    };

    const advance = () => {
      if (isPaused || isInteracting || !mobileQuery.matches || reduceMotionQuery.matches) {
        return;
      }

      const nextIndex = currentIndex + 1;
      track.scrollTo({
        left: getSlideOffset(nextIndex),
        behavior: 'smooth',
      });
      currentIndex = nextIndex === slideCount ? 0 : nextIndex;
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (!isPaused && mobileQuery.matches && !reduceMotionQuery.matches) {
        autoplayTimer = window.setInterval(advance, AUTOPLAY_DELAY);
      }
    };

    const pause = () => {
      isPaused = true;
      stopAutoplay();
      window.clearTimeout(resumeTimer);
    };

    const resumeAfterInteraction = () => {
      isPaused = false;
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(startAutoplay, RESUME_DELAY);
    };

    const handlePointerDown = () => {
      isInteracting = true;
      pause();
    };

    const handlePointerUp = () => {
      isInteracting = false;
      scheduleSettle();
      resumeAfterInteraction();
    };

    const handleFocusIn = () => {
      pause();
    };

    const handleFocusOut = (event) => {
      if (!track.contains(event.relatedTarget)) {
        resumeAfterInteraction();
      }
    };

    const handleModeChange = () => {
      if (!mobileQuery.matches || reduceMotionQuery.matches) {
        stopAutoplay();
        return;
      }

      startAutoplay();
    };

    track.addEventListener('scroll', scheduleSettle, { passive: true });
    track.addEventListener('scrollend', syncToNearestSlide);
    track.addEventListener('pointerdown', handlePointerDown, { passive: true });
    track.addEventListener('pointerup', handlePointerUp, { passive: true });
    track.addEventListener('pointercancel', handlePointerUp, { passive: true });
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resumeAfterInteraction);
    track.addEventListener('focusin', handleFocusIn);
    track.addEventListener('focusout', handleFocusOut);

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', handleModeChange);
      reduceMotionQuery.addEventListener('change', handleModeChange);
    } else {
      mobileQuery.addListener(handleModeChange);
      reduceMotionQuery.addListener(handleModeChange);
    }

    handleModeChange();

    return () => {
      stopAutoplay();
      window.clearTimeout(resumeTimer);
      window.clearTimeout(settleTimer);
      track.removeEventListener('scroll', scheduleSettle);
      track.removeEventListener('scrollend', syncToNearestSlide);
      track.removeEventListener('pointerdown', handlePointerDown);
      track.removeEventListener('pointerup', handlePointerUp);
      track.removeEventListener('pointercancel', handlePointerUp);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resumeAfterInteraction);
      track.removeEventListener('focusin', handleFocusIn);
      track.removeEventListener('focusout', handleFocusOut);
      if (mobileQuery.removeEventListener) {
        mobileQuery.removeEventListener('change', handleModeChange);
        reduceMotionQuery.removeEventListener('change', handleModeChange);
      } else {
        mobileQuery.removeListener(handleModeChange);
        reduceMotionQuery.removeListener(handleModeChange);
      }
      firstSlideClone.remove();
    };
  }, []);

  return <div ref={trackRef} className="projects-grid project-track">{children}</div>;
}
