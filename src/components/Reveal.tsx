import { useEffect, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: 'normal' | 'slow';
  className?: string;
  onVisible?: () => void;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 'normal',
  className = '',
  onVisible,
}: RevealProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
      onVisible?.();
    }, delay);
    return () => clearTimeout(t);
  }, [delay, onVisible]);

  const animClass = duration === 'slow' ? 'animate-fade-in-up-slow' : 'animate-fade-in-up';

  return (
    <div
      className={`${visible ? animClass : 'opacity-0-init'} ${className}`}
    >
      {children}
    </div>
  );
}
