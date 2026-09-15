import { useState, useRef, useCallback, useEffect } from 'react';
import Particles from '@/components/Particles';
import HeartBurst from '@/components/HeartBurst';
import MusicToggle from '@/components/MusicToggle';
import BeginScreen from '@/screens/BeginScreen';
import FirstMemoryScreen from '@/screens/FirstMemoryScreen';
import WhatILoveScreen from '@/screens/WhatILoveScreen';
import WhatIMissScreen from '@/screens/WhatIMissScreen';
import OurFutureScreen from '@/screens/OurFutureScreen';
import FinalSurpriseScreen from '@/screens/FinalSurpriseScreen';

type Chapter = 'begin' | 'memory' | 'love' | 'miss' | 'future' | 'surprise';

const CHAPTER_ORDER: Chapter[] = [
  'begin',
  'memory',
  'love',
  'miss',
  'future',
  'surprise',
];

// Soft ambient piano tone generated via Web Audio API (no external file needed)
// Placeholder — replace src with a real audio file if desired
const AUDIO_SRC =
  'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';

export default function App() {
  const [chapter, setChapter] = useState<Chapter>('begin');
  const [transitioning, setTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [heartTrigger, setHeartTrigger] = useState(0);
  const [musicStarted, setMusicStarted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playMusic = useCallback(() => {
    if (audioRef.current && !musicStarted) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setMusicStarted(true);
      }).catch(() => {
        // Autoplay might be blocked — will retry on next interaction
      });
    }
  }, [musicStarted]);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  const transitionTo = useCallback(
    (next: Chapter) => {
      setTransitioning(true);
      setHeartTrigger((t) => t + 1);
      setTimeout(() => {
        setChapter(next);
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTransitioning(false);
      }, 800);
    },
    []
  );

  const handleBegin = useCallback(() => {
    playMusic();
    setHeartTrigger((t) => t + 1);
    transitionTo('memory');
  }, [playMusic, transitionTo]);

  const handleContinue = useCallback(
    (next: Chapter) => {
      transitionTo(next);
    },
    [transitionTo]
  );

  const handleReplay = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setChapter('begin');
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTransitioning(false);
    }, 800);
  }, []);

  const handleFinalOpen = useCallback(() => {
    setHeartTrigger((t) => t + 1);
    // Fade out music at the final surprise
    if (audioRef.current && isPlaying) {
      const audio = audioRef.current;
      const fade = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.02);
        } else {
          audio.pause();
          setIsPlaying(false);
          clearInterval(fade);
        }
      }, 100);
    }
  }, [isPlaying]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-ink-900 overflow-x-hidden">
      {/* Hidden audio element for background music */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" />

      {/* Grain texture overlay */}
      <div className="grain" aria-hidden />

      {/* Vignette */}
      <div className="vignette" aria-hidden />

      {/* Floating particles */}
      <Particles density={35} speed={0.25} />

      {/* Heart burst on transitions */}
      <HeartBurst trigger={heartTrigger} count={15} />

      {/* Music toggle (visible after music starts) */}
      {musicStarted && (
        <MusicToggle
          audioRef={audioRef}
          isPlaying={isPlaying}
          onToggle={toggleMusic}
        />
      )}

      {/* Chapter content with transition overlay */}
      <div
        className={`relative z-10 transition-opacity duration-700 ease-out ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {chapter === 'begin' && <BeginScreen onBegin={handleBegin} />}
        {chapter === 'memory' && (
          <FirstMemoryScreen onContinue={() => handleContinue('love')} />
        )}
        {chapter === 'love' && (
          <WhatILoveScreen onContinue={() => handleContinue('miss')} />
        )}
        {chapter === 'miss' && (
          <WhatIMissScreen onContinue={() => handleContinue('future')} />
        )}
        {chapter === 'future' && (
          <OurFutureScreen onContinue={() => handleContinue('surprise')} />
        )}
        {chapter === 'surprise' && (
          <FinalSurpriseScreen
            onReplay={handleReplay}
            onOpen={handleFinalOpen}
          />
        )}
      </div>

      {/* Transition flash overlay */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none bg-ink-900 transition-opacity duration-700 ease-out ${
          transitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
