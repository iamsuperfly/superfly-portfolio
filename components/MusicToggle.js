'use client';

import { useRef, useState } from 'react';

export default function MusicToggle() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className="music-toggle-wrap">
      <button className="music-toggle" onClick={toggleAudio} aria-label="Toggle background music">
        <img src="/images/icons/1000740530-removebg-preview.png" alt="Music icon" className="music-icon" />
        <span>{isPlaying ? 'Music On' : 'Music Off'}</span>
      </button>
      <audio ref={audioRef} src="/audio/ambient.mp3" loop preload="none" />
    </div>
  );
}
