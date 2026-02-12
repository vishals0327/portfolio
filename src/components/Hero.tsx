import { motion } from "framer-motion";
import { Download, ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

const headlineWords = "Senior WordPress Engineer crafting fast, secure & scalable web experiences.".split(" ");

// Crowd Canvas — sprite-based walking figures
const CrowdCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    interface Person {
      x: number;
      y: number;
      speed: number;
      direction: number;
      height: number;
      headSize: number;
      legPhase: number;
      legSpeed: number;
      armPhase: number;
      opacity: number;
      color: string;
    }

    const colors = [
      "hsla(217, 91%, 60%, 0.3)",
      "hsla(217, 91%, 60%, 0.2)",
      "hsla(190, 95%, 50%, 0.25)",
      "hsla(210, 40%, 96%, 0.15)",
      "hsla(217, 60%, 40%, 0.2)",
    ];

    const people: Person[] = [];
    const COUNT = 35;

    for (let i = 0; i < COUNT; i++) {
      const dir = Math.random() > 0.5 ? 1 : -1;
      people.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.65 + Math.random() * canvas.height * 0.3,
        speed: 0.3 + Math.random() * 0.8,
        direction: dir,
        height: 20 + Math.random() * 25,
        headSize: 3 + Math.random() * 2,
        legPhase: Math.random() * Math.PI * 2,
        legSpeed: 0.04 + Math.random() * 0.04,
        armPhase: Math.random() * Math.PI * 2,
        opacity: 0.15 + Math.random() * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Sort by y for depth
    people.sort((a, b) => a.y - b.y);

    const drawPerson = (p: Person, time: number) => {
      const legSwing = Math.sin(time * p.legSpeed + p.legPhase) * 6;
      const armSwing = Math.sin(time * p.legSpeed + p.armPhase) * 5;
      const bobY = Math.abs(Math.sin(time * p.legSpeed + p.legPhase)) * 1.5;

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.strokeStyle = p.color;
      ctx.fillStyle = p.color;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      const baseY = p.y - bobY;

      // Head
      ctx.beginPath();
      ctx.arc(p.x, baseY - p.height, p.headSize, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.moveTo(p.x, baseY - p.height + p.headSize);
      ctx.lineTo(p.x, baseY - p.height * 0.35);
      ctx.stroke();

      // Legs
      ctx.beginPath();
      ctx.moveTo(p.x, baseY - p.height * 0.35);
      ctx.lineTo(p.x + legSwing * p.direction, baseY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(p.x, baseY - p.height * 0.35);
      ctx.lineTo(p.x - legSwing * p.direction, baseY);
      ctx.stroke();

      // Arms
      ctx.beginPath();
      ctx.moveTo(p.x, baseY - p.height * 0.7);
      ctx.lineTo(p.x + armSwing * p.direction, baseY - p.height * 0.45);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(p.x, baseY - p.height * 0.7);
      ctx.lineTo(p.x - armSwing * p.direction, baseY - p.height * 0.45);
      ctx.stroke();

      ctx.restore();
    };

    let frame = 0;
    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      for (const p of people) {
        p.x += p.speed * p.direction;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.x < -50) p.x = canvas.width + 50;
        drawPerson(p, time);
      }

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />;
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />

      {/* Crowd Canvas */}
      <CrowdCanvas />

      {/* Floating symbols */}
      {[
        { text: "{}", x: "10%", y: "20%", delay: 0 },
        { text: "</>", x: "80%", y: "15%", delay: 0.5 },
        { text: "add_action", x: "70%", y: "70%", delay: 1 },
        { text: "REST API", x: "15%", y: "75%", delay: 1.5 },
        { text: "<?php", x: "85%", y: "45%", delay: 0.8 },
        { text: "apply_filters", x: "25%", y: "50%", delay: 1.2 },
      ].map((sym, i) => (
        <motion.span
          key={i}
          className="absolute font-mono text-sm text-muted-foreground/30 select-none hidden md:block z-[2]"
          style={{ left: sym.x, top: sym.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0], y: [0, -30, 0] }}
          transition={{ duration: 6, delay: sym.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {sym.text}
        </motion.span>
      ))}

      <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center pt-20">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full glass-card text-xs font-mono text-muted-foreground tracking-wider uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          Available for Projects
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[0.3em] ${
                ["fast,", "secure", "scalable"].some((w) => word.includes(w))
                  ? "text-gradient"
                  : "text-foreground"
              }`}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-mono mb-10 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          8+ years • 30+ global websites • PageSpeed 95+ • Zero page builders
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all glow-border shadow-lg shadow-primary/20"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl font-semibold text-sm glass-card text-foreground hover:border-primary/30 transition-colors"
          >
            Let's Build Something Serious
          </a>
          <a
            href="/Vishal_Singla_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-5 h-5 text-muted-foreground/50" />
      </motion.div>
    </section>
  );
};

export default Hero;
