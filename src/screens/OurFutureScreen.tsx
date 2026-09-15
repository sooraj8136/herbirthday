import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Heart } from 'lucide-react';
import Reveal from '@/components/Reveal';

interface OurFutureScreenProps {
  onContinue: () => void;
}

const INTRO_LINES = [
  'This distance is only a chapter.',
  "One day, there won't be a screen between us.",
  'No more counting the days.',
  'No more wishing you were here.',
  'Just us.',
];

const TIMELINE = [
  { label: 'Today', icon: Heart },
  { label: 'More memories' },
  { label: 'More adventures' },
  { label: "Places we've dreamed about" },
  { label: "The life we'll build" },
  { label: 'Us' },
];

export default function OurFutureScreen({ onContinue }: OurFutureScreenProps) {
  const [visibleIntro, setVisibleIntro] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [visibleTimeline, setVisibleTimeline] = useState(0);
  const [showClosing, setShowClosing] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const startIntro = useCallback(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleIntro(count);
      if (count >= INTRO_LINES.length) {
        clearInterval(interval);
        setTimeout(() => setShowTimeline(true), 1200);
      }
    }, 1600);
    return interval;
  }, []);

  useEffect(() => {
    const interval = startIntro();
    return () => clearInterval(interval);
  }, [startIntro]);

  useEffect(() => {
    if (!showTimeline) return;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleTimeline(count);
      if (count >= TIMELINE.length) {
        clearInterval(interval);
        setTimeout(() => setShowClosing(true), 1500);
        setTimeout(() => setShowButton(true), 3000);
      }
    }, 700);
    return () => clearInterval(interval);
  }, [showTimeline]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 no-select">
      {/* Warm hopeful glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(114,38,47,0.12) 0%, transparent 55%)',
        }}
      />

      <Reveal delay={200}>
        <p className="font-sans font-light text-xs tracking-[0.4em] uppercase text-rose-300/40 mb-8">
          Chapter Four
        </p>
      </Reveal>

      <Reveal delay={500}>
        <h2 className="font-display text-4xl sm:text-5xl text-cream-500 text-glow mb-14 text-center">
          Our Future
        </h2>
      </Reveal>

      {/* Intro lines */}
      <div className="space-y-5 text-center max-w-lg mb-12 min-h-[200px] flex flex-col items-center justify-center">
        {INTRO_LINES.map((line, i) => (
          <p
            key={i}
            className={`font-serif text-xl sm:text-2xl transition-all duration-1000 ease-out ${
              visibleIntro > i
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            } ${i === INTRO_LINES.length - 1 ? 'font-display text-2xl sm:text-3xl text-rose-200 text-glow' : 'text-rose-200/70'}`}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Timeline */}
      {showTimeline && (
        <div className="relative max-w-xs w-full">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500/40 via-rose-700/20 to-rose-500/40" />

          <div className="space-y-8">
            {TIMELINE.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`relative flex items-center pl-12 transition-all duration-700 ease-out ${
                    visibleTimeline > i
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-4'
                  }`}
                >
                  {/* Dot */}
                  <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    visibleTimeline > i
                      ? 'border-rose-500/40 bg-wine-900/40'
                      : 'border-rose-700/20 bg-transparent'
                  }`}>
                    {Icon ? (
                      <Icon className="w-3.5 h-3.5 text-rose-300/70 fill-rose-500/40" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-300/50" />
                    )}
                  </div>
                  <span className={`font-serif text-lg sm:text-xl ${
                    i === 0 || i === TIMELINE.length - 1
                      ? 'text-rose-200 font-medium'
                      : 'text-rose-200/60'
                  }`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showClosing && (
        <Reveal delay={200} className="mt-14 text-center max-w-lg">
          <p className="font-serif italic text-xl sm:text-2xl text-rose-200/80">
            And I can't wait to see where our story takes us.
          </p>
        </Reveal>
      )}

      {showButton && (
        <Reveal delay={300} className="mt-12">
          <button onClick={onContinue} className="btn-ghost group">
            <span>One last thing...</span>
            <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </Reveal>
      )}
    </div>
  );
}
