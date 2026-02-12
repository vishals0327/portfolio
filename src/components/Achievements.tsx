import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 30, suffix: "+", label: "Live Websites" },
  { value: 95, suffix: "+", label: "PageSpeed Scores" },
  { value: 50, suffix: "%+", label: "Performance Gains" },
  { value: 6, suffix: "", label: "Developers Mentored" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="relative overflow-hidden">
      <div className="relative py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-background/90" />

        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <motion.p
              className="font-mono text-sm text-primary tracking-widest uppercase mb-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Impact
            </motion.p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Numbers that <span className="text-gradient">matter</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="glass-card rounded-xl p-6 text-center hover:glow-border transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient glow-text mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
