import { Heart } from 'lucide-react';
import Reveal from '@/components/Reveal';

interface BeginScreenProps {
  onBegin: () => void;
}

export default function BeginScreen({ onBegin }: BeginScreenProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center no-select">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(94,31,44,0.12) 0%, transparent 60%)',
        }}
      />

      <Reveal delay={300} duration="slow">
        <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-rose-200/80 tracking-wide">
          I made something for you My Devummaaa...
        </p>
      </Reveal>

      <Reveal delay={2000} duration="slow" className="mt-6">
        <p className="font-serif italic text-xl sm:text-2xl text-rose-300/60 tracking-wide">
          A little story about us.
        </p>
      </Reveal>

      <Reveal delay={3800} duration="slow" className="mt-16">
        <button
          onClick={onBegin}
          className="btn-primary animate-pulse-glow group"
        >
          <Heart
            className="w-4 h-4 mr-3 text-rose-300 fill-rose-500/60 group-hover:fill-rose-400/80 transition-all duration-500"
          />
          <span className="text-base tracking-[0.15em]">Tap to begin</span>
          <Heart
            className="w-4 h-4 ml-3 text-rose-300 fill-rose-500/60 group-hover:fill-rose-400/80 transition-all duration-500"
          />
        </button>
      </Reveal>

      <Reveal delay={5000} className="mt-12">
        <p className="font-sans font-light text-xs tracking-[0.3em] uppercase text-rose-300/30">
          Best experienced with sound on
        </p>
      </Reveal>
    </div>
  );
}
