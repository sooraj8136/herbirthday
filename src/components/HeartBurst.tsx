import { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vr: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

interface HeartBurstProps {
  trigger: number;
  count?: number;
  originX?: number;
  originY?: number;
}

const COLORS = [
  'rgba(199, 123, 133, 1)',
  'rgba(164, 56, 74, 1)',
  'rgba(224, 168, 175, 1)',
  'rgba(238, 201, 205, 1)',
];

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, alpha: number, color: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(size, size);
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(0, 0.3);
  ctx.bezierCurveTo(-0.5, -0.1, -1, 0.1, 0, 0.5);
  ctx.bezierCurveTo(1, 0.1, 0.5, -0.1, 0, 0.3);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.shadowBlur = 15;
  ctx.shadowColor = color;
  ctx.fill();
  ctx.restore();
}

export default function HeartBurst({ trigger, count = 20, originX, originY }: HeartBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const rafRef = useRef<number>(0);
  const triggerRef = useRef(trigger);

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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      heartsRef.current = heartsRef.current.filter((h) => h.life < h.maxLife);

      heartsRef.current.forEach((h) => {
        h.x += h.vx;
        h.y += h.vy;
        h.vy += 0.005;
        h.rotation += h.vr;
        h.life++;
        const lifeRatio = h.life / h.maxLife;
        const alpha = lifeRatio < 0.15 ? lifeRatio / 0.15 : 1 - lifeRatio;
        drawHeart(ctx, h.x, h.y, h.size, h.rotation, alpha * h.opacity, h.color);
      });

      if (heartsRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (trigger === triggerRef.current && trigger === 0) return;
    triggerRef.current = trigger;
    if (trigger === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ox = originX ?? canvas.width / 2;
    const oy = originY ?? canvas.height / 2;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const velocity = 1 + Math.random() * 3;
      heartsRef.current.push({
        x: ox,
        y: oy,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 1.5,
        size: 8 + Math.random() * 16,
        rotation: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.05,
        opacity: 0.6 + Math.random() * 0.4,
        life: 0,
        maxLife: 80 + Math.random() * 60,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    cancelAnimationFrame(rafRef.current);
    const ctx = canvas.getContext('2d');
    if (ctx) rafRef.current = requestAnimationFrame(() => {
      const animate = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        heartsRef.current = heartsRef.current.filter((h) => h.life < h.maxLife);

        heartsRef.current.forEach((h) => {
          h.x += h.vx;
          h.y += h.vy;
          h.vy += 0.005;
          h.rotation += h.vr;
          h.life++;
          const lifeRatio = h.life / h.maxLife;
          const alpha = lifeRatio < 0.15 ? lifeRatio / 0.15 : 1 - lifeRatio;
          drawHeart(ctx, h.x, h.y, h.size, h.rotation, alpha * h.opacity, h.color);
        });

        if (heartsRef.current.length > 0) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };
      animate();
    });
  }, [trigger, count, originX, originY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-35"
      aria-hidden
    />
  );
}
