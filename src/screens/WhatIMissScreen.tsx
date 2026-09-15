import { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

interface WhatIMissScreenProps {
  onContinue: () => void;
}

const LINES = [
  'I miss your voice.',
  'I miss our random conversations.',
  'I miss seeing your smile.',
  'I miss being able to simply sit beside you.',
];

export default function WhatIMissScreen({ onContinue }: WhatIMissScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showClimax, setShowClimax] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const startSequence = useCallback(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleLines(count);
      if (count >= LINES.length) {
        clearInterval(interval);
        setTimeout(() => setShowClimax(true), 1200);
        setTimeout(() => setShowFinal(true), 3000);
        setTimeout(() => setShowButton(true), 4500);
      }
    }, 1400);
    return interval;
  }, []);

  useEffect(() => {
    const interval = startSequence();
    return () => clearInterval(interval);
  }, [startSequence]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 no-select">
      {/* Slightly different ambient mood — deeper, more melancholic */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(61,21,28,0.15) 0%, transparent 50%)',
        }}
      />

      <Reveal delay={200}>
        <p className="font-sans font-light text-xs tracking-[0.4em] uppercase text-rose-300/40 mb-8">
          Chapter Three
        </p>
      </Reveal>

      <Reveal delay={500}>
        <h2 className="font-display text-4xl sm:text-5xl text-cream-500 text-glow mb-10 text-center">
          What I Miss
        </h2>
      </Reveal>

      <Reveal delay={1000} className="mb-10 text-center">
        <p className="font-serif italic text-xl sm:text-2xl text-rose-200/60">
          There are so many little things I miss...
        </p>
      </Reveal>

      <div className="space-y-6 text-center min-h-[200px] flex flex-col items-center justify-center">
        {LINES.map((line, i) => (
          <div
            key={i}
            className={`transition-all duration-1000 ease-out ${
              visibleLines > i
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="font-serif text-2xl sm:text-3xl text-rose-200/80">
              {line}
            </p>
          </div>
        ))}

        {showClimax && (
          <p className="font-serif italic text-xl text-rose-300/50 mt-8 animate-fade-in-up">
            But more than anything...
          </p>
        )}

        {showFinal && (
          <p className="font-display text-3xl sm:text-4xl text-rose-200 text-glow mt-4 animate-fade-in-up-slow">
            I miss having you close.
          </p>
        )}
      </div>

      {showButton && (
        <Reveal delay={200} className="mt-16">
          <button onClick={onContinue} className="btn-ghost group">
            <span>There's more</span>
            <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </Reveal>
      )}
    </div>
  );
}
