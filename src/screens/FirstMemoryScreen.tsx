import { ChevronRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

interface FirstMemoryScreenProps {
  onContinue: () => void;
}

const PHOTO_URL = encodeURI(
  '/images/WhatsApp_Image_2026-02-12_at_2.46.13_PM copy.jpeg'
);
const FALLBACK_PHOTO_URL =
  'https://images.pexels.com/photos/33931414/pexels-photo-33931414.jpeg?auto=compress&cs=tinysrgb&w=900';

export default function FirstMemoryScreen({ onContinue }: FirstMemoryScreenProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 no-select">
      <Reveal delay={200}>
        <p className="font-sans font-light text-xs tracking-[0.4em] uppercase text-rose-300/40 mb-8">
          Chapter One
        </p>
      </Reveal>

      <Reveal delay={500}>
        <h2 className="font-display text-4xl sm:text-5xl text-cream-500 text-glow mb-12 text-center">
          Our First Memory
        </h2>
      </Reveal>

      {/* Photo with cinematic reveal */}
      <Reveal delay={900} duration="slow" className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-sm glow-burgundy">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={PHOTO_URL}
              alt="Our first memory"
              onError={(event) => {
                event.currentTarget.src = FALLBACK_PHOTO_URL;
              }}
              className="w-full h-full object-cover animate-slow-zoom"
              style={{ animationDuration: '20s' }}
            />
          </div>
          {/* Subtle vignette overlay on image */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink-900/60 via-transparent to-ink-900/20" />
        </div>
      </Reveal>

      <Reveal delay={2500} className="mt-10 max-w-md text-center">
        <p className="font-serif italic text-xl sm:text-2xl text-rose-200/70 leading-relaxed">
          Some moments look ordinary when they happen...
        </p>
      </Reveal>

      <Reveal delay={4000} className="mt-4 max-w-md text-center">
        <p className="font-serif italic text-xl sm:text-2xl text-rose-200/90 leading-relaxed">
          ...until you realize they became the beginning of something beautiful.
        </p>
      </Reveal>

      <Reveal delay={5500} className="mt-8">
        <p className="font-sans font-light text-sm tracking-[0.2em] uppercase text-rose-300/40">
          [Our Date] · [Our Place]
        </p>
      </Reveal>

      <Reveal delay={6500} className="mt-12">
        <button onClick={onContinue} className="btn-ghost group">
          <span>Continue</span>
          <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </Reveal>
    </div>
  );
}
