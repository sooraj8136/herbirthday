import { useState, useEffect, useCallback } from 'react';
import { Gift, Heart } from 'lucide-react';
import Reveal from '@/components/Reveal';

interface FinalSurpriseScreenProps {
  onReplay: () => void;
  onOpen: () => void;
}

const FINAL_PHOTO_URL = encodeURI(
  '/images/photo_2026-09-15_15-05-20_(3).jpg'
);
const FALLBACK_PHOTO_URL =
  'https://images.pexels.com/photos/33931414/pexels-photo-33931414.jpeg?auto=compress&cs=tinysrgb&w=900';

export default function FinalSurpriseScreen({ onReplay, onOpen }: FinalSurpriseScreenProps) {
  const [phase, setPhase] = useState<'intro' | 'gift' | 'opening' | 'revealed'>('intro');
  const [revealStep, setRevealStep] = useState(0);

  const startIntro = useCallback(() => {
    const t1 = setTimeout(() => setPhase('gift'), 2500);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    const cleanup = startIntro();
    return cleanup;
  }, [startIntro]);

  const openGift = () => {
    setPhase('opening');
    onOpen();
    setTimeout(() => setPhase('revealed'), 2000);
  };

  useEffect(() => {
    if (phase !== 'revealed') return;
    const timers = [
      setTimeout(() => setRevealStep(1), 500),
      setTimeout(() => setRevealStep(2), 2500),
      setTimeout(() => setRevealStep(3), 4500),
      setTimeout(() => setRevealStep(4), 6500),
      setTimeout(() => setRevealStep(5), 8500),
      setTimeout(() => setRevealStep(6), 10500),
      setTimeout(() => setRevealStep(7), 12500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 no-select overflow-hidden">
      {/* Expanding glow when revealed */}
      {phase === 'revealed' && (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-[3000ms] ease-out"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(139,45,59,0.18) 0%, rgba(61,21,28,0.08) 40%, transparent 70%)',
          }}
        />
      )}

      {phase === 'intro' && (
        <>
          <Reveal delay={300} duration="slow">
            <p className="font-serif italic text-xl sm:text-2xl text-rose-200/50 text-center">
              You made it to the end...
            </p>
          </Reveal>
        </>
      )}

      {phase === 'gift' && (
        <>
          <Reveal delay={200} duration="slow" className="mb-10 text-center">
            <p className="font-serif italic text-xl sm:text-2xl text-rose-200/70">
              But I saved one thing for last.
            </p>
          </Reveal>

          {/* Animated gift box */}
          <Reveal delay={1500} duration="slow">
            <div className="relative mb-12">
              <div className="absolute inset-0 rounded-full bg-rose-500/10 blur-3xl animate-breathe" />
              <div className="relative w-28 h-28 rounded-2xl glass flex items-center justify-center animate-breathe glow-burgundy">
                <Gift className="w-12 h-12 text-rose-300/80" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={2500}>
            <button
              onClick={openGift}
              className="btn-primary animate-pulse-glow group"
            >
              <Heart className="w-4 h-4 mr-3 text-rose-300 fill-rose-500/60 group-hover:fill-rose-400/80 transition-all duration-500" />
              <span className="text-base tracking-[0.15em]">Open it</span>
              <Heart className="w-4 h-4 ml-3 text-rose-300 fill-rose-500/60 group-hover:fill-rose-400/80 transition-all duration-500" />
            </button>
          </Reveal>
        </>
      )}

      {phase === 'opening' && (
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-3xl animate-shimmer" />
            <div className="relative w-28 h-28 rounded-2xl glass flex items-center justify-center transition-transform duration-1000 ease-out scale-150 rotate-12 opacity-0">
              <Gift className="w-12 h-12 text-rose-300/80" />
            </div>
          </div>
        </div>
      )}

      {phase === 'revealed' && (
        <div className="text-center max-w-lg flex flex-col items-center">
          {revealStep >= 1 && (
            <p className="font-serif italic text-xl sm:text-2xl text-rose-200/70 animate-fade-in-up mb-6">
              If I could choose one place to be right now...
            </p>
          )}
          {revealStep >= 2 && (
            <p className="font-serif italic text-xl sm:text-2xl text-rose-200/80 animate-fade-in-up mb-6">
              It wouldn't matter where.
            </p>
          )}
          {revealStep >= 3 && (
            <p className="font-serif italic text-xl sm:text-2xl text-rose-200/90 animate-fade-in-up mb-10">
              As long as you're there.
            </p>
          )}
          {revealStep >= 4 && (
            <div className="relative w-full max-w-xs mb-10 animate-fade-in-up-slow">
              <div className="absolute -inset-3 rounded-sm border border-rose-300/10 rotate-2" />
              <div className="relative overflow-hidden rounded-sm glow-burgundy">
                <img
                  src={FINAL_PHOTO_URL}
                  alt="A cherished memory of us"
                  onError={(event) => {
                    event.currentTarget.src = FALLBACK_PHOTO_URL;
                  }}
                  className="w-full aspect-[3/4] object-cover animate-slow-zoom"
                  style={{ animationDuration: '20s' }}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink-900/50 via-transparent to-ink-900/10" />
              </div>
            </div>
          )}
          {revealStep >= 5 && (
            <p className="font-serif italic text-2xl sm:text-3xl text-rose-200 text-glow animate-fade-in-up mb-8">
              Happy Birthday, my wifey.
            </p>
          )}
          {revealStep >= 6 && (
            <>
              <p className="font-serif italic text-lg sm:text-xl text-rose-200/70 animate-fade-in-up mb-3">
                My favorite person. My forever home.
              </p>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-cream-500 text-glow animate-fade-in-up-slow mb-6 tracking-wide">
                I LOVE YOU
                <span className="inline-block ml-3">
                  <Heart className="w-10 h-10 inline text-rose-400 fill-rose-500/50 animate-breathe" />
                </span>
              </h1>
            </>
          )}
          {revealStep >= 7 && (
            <p className="font-serif italic text-lg sm:text-xl text-rose-200/60 animate-fade-in-up">
              Today, tomorrow, and all the days after.
            </p>
          )}
          {revealStep >= 7 && (
            <button
              onClick={onReplay}
              className="btn-ghost mt-16 group"
            >
              <span className="text-xs tracking-[0.25em]">Replay our story</span>
              <span className="ml-2 transition-transform duration-500 group-hover:rotate-180 inline-block">
                ↻
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
