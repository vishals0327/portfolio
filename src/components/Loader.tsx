import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

interface Particle {
  id: number;
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

const PARTICLE_COUNT = 80;

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  const createParticle = useCallback((w: number, h: number, id: number): Particle => ({
    id,
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.6 + 0.2,
    hue: 217 + Math.random() * 30 - 15,
    life: Math.random() * 200,
    maxLife: 200 + Math.random() * 100,
  }), []);

  // Progress counter
  useEffect(() => {
    const duration = 2500;
    const interval = 20;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.min(Math.round(eased * 100), 100));

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 600);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlesRef.current.push(createParticle(canvas.width, canvas.height, i));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction — attract gently
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.02;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Respawn
        if (p.life > p.maxLife || p.x < -20 || p.x > canvas.width + 20 || p.y < -20 || p.y > canvas.height + 20) {
          Object.assign(p, createParticle(canvas.width, canvas.height, p.id));
        }

        // Fade in/out
        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.1 ? lifeRatio * 10 : lifeRatio > 0.8 ? (1 - lifeRatio) * 5 : 1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 91%, 60%, ${p.opacity * alpha})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(217, 91%, 60%, ${(1 - d / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [createParticle]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "hsl(var(--background))" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.7 }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.p
          className="font-mono text-sm tracking-widest text-muted-foreground uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Optimizing Performance…
        </motion.p>

        <div className="relative w-64 h-[2px] bg-border rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${progress}%`,
              background: "var(--gradient-accent)",
              boxShadow: "0 0 20px hsl(var(--primary) / 0.4)",
            }}
          />
        </div>

        <motion.span
          className="font-mono text-5xl font-bold text-gradient tabular-nums"
          key={progress}
        >
          {progress}%
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Loader;
