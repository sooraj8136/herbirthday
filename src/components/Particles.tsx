import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
}

interface ParticlesProps {
  density?: number;
  color?: string;
  speed?: number;
}

export default function Particles({
  density = 40,
  color = 'rgba(199, 123, 133, 1)',
  speed = 0.3,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const maxParticles = density;
    const spawn = (): Particle => {
      const maxLife = 400 + Math.random() * 600;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        vx: (Math.random() - 0.5) * speed,
        vy: -(0.2 + Math.random() * speed),
        size: 0.5 + Math.random() * 2.5,
        opacity: 0,
        hue: Math.random(),
        life: 0,
        maxLife,
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      const p = spawn();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.1) p.opacity = lifeRatio / 0.1;
        else if (lifeRatio > 0.7) p.opacity = (1 - lifeRatio) / 0.3;
        else p.opacity = 1;

        p.opacity *= 0.5;

        if (p.life >= p.maxLife || p.y < -20) {
          particlesRef.current[i] = spawn();
          return;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color.replace('1)', `${p.opacity.toFixed(3)})`);
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [density, color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden
    />
  );
}
