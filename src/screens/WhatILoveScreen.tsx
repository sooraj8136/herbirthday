import { useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import Reveal from '@/components/Reveal';

interface WhatILoveScreenProps {
  onContinue: () => void;
}

interface LoveItem {
  title: string;
  message: string;
}

const ITEMS: LoveItem[] = [
  {
    title: 'Your Smile',
    message: 'Somehow, your smile makes everything feel a little lighter.',
  },
  {
    title: 'Your Little Things',
    message: "It's the tiny things you do that somehow mean the most to me.",
  },
  {
    title: 'Your Heart',
    message:
      "The way you care, love and understand me is something I'll never take for granted.",
  },
  {
    title: 'The Way You Are',
    message: "I don't love you because you're perfect. I love you because you're you.",
  },
];

export default function WhatILoveScreen({ onContinue }: WhatILoveScreenProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [explored, setExplored] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    if (openIndex === i) {
      setOpenIndex(null);
    } else {
      setOpenIndex(i);
      setExplored((prev) => new Set(prev).add(i));
    }
  };

  const allExplored = explored.size >= ITEMS.length;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 no-select">
      <Reveal delay={200}>
        <p className="font-sans font-light text-xs tracking-[0.4em] uppercase text-rose-300/40 mb-8">
          Chapter Two
        </p>
      </Reveal>

      <Reveal delay={500}>
        <h2 className="font-display text-4xl sm:text-5xl text-cream-500 text-glow mb-16 text-center">
          What I Love About You
        </h2>
      </Reveal>

      <div className="w-full max-w-lg space-y-4">
        {ITEMS.map((item, i) => (
          <Reveal key={i} delay={800 + i * 200}>
            <button
              onClick={() => toggle(i)}
              className="w-full text-left group"
            >
              <div
                className={`relative overflow-hidden rounded-sm border transition-all duration-700 ease-out ${
                  openIndex === i
                    ? 'border-rose-500/30 glass px-6 py-6'
                    : 'border-rose-700/15 px-6 py-5 hover:border-rose-500/25 hover:bg-wine-900/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-serif text-xl sm:text-2xl transition-colors duration-500 ${
                      openIndex === i ? 'text-rose-200' : 'text-rose-300/70 group-hover:text-rose-200'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <Plus
                    className={`w-5 h-5 text-rose-300/40 transition-transform duration-500 ${
                      openIndex === i ? 'rotate-45 scale-90' : 'group-hover:scale-110'
                    }`}
                  />
                </div>
                <div
                  className={`grid transition-all duration-700 ease-out ${
                    openIndex === i
                      ? 'grid-template-rows-[1fr] opacity-100 mt-4'
                      : 'grid-template-rows-[0fr] opacity-0 mt-0'
                  }`}
                  style={{
                    display: 'grid',
                    gridTemplateRows: openIndex === i ? '1fr' : '0fr',
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="font-serif italic text-lg text-rose-200/80 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {allExplored && (
        <Reveal delay={300} className="mt-12 text-center">
          <p className="font-serif italic text-xl text-rose-200/70">
            And I could keep going...
          </p>
        </Reveal>
      )}

      {allExplored && (
        <Reveal delay={1500} className="mt-10">
          <button onClick={onContinue} className="btn-ghost group">
            <span>Continue</span>
            <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </Reveal>
      )}
    </div>
  );
}
