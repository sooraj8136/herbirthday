import { useState, useEffect, useRef } from 'react';
import { Music, Music2 } from 'lucide-react';

interface MusicToggleProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicToggle({ audioRef, isPlaying, onToggle }: MusicToggleProps) {
  const [volume, setVolume] = useState(0.3);
  const [showSlider, setShowSlider] = useState(false);
  const timeoutRef = useRef<number>(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowSlider(true);
  };

  const handleLeave = () => {
    timeoutRef.current = window.setTimeout(() => setShowSlider(false), 2000);
  };

  return (
    <div
      className="fixed top-5 right-5 z-50 flex items-center gap-3 no-select"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {showSlider && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 appearance-none rounded-full bg-rose-700/30 accent-wine-500 cursor-pointer"
          aria-label="Music volume"
        />
      )}
      <button
        onClick={onToggle}
        className="w-10 h-10 rounded-full glass flex items-center justify-center text-rose-300/70 hover:text-rose-300 transition-colors duration-500"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <Music2 className="w-4 h-4 animate-breathe" />
        ) : (
          <Music className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
