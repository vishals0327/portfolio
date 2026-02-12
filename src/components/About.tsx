import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    year: "2017-2018",
    role: "Junior Web Developer",
    company: "Aarohi Info Systems",
    description: "Started building WordPress sites from scratch. Learned the deep internals of theme development, hooks, and custom post types.",
  },
  {
    year: "2018-Present",
    role: "Senior Web Developer",
    company: "Adat Soft Solutions",
    description: "Led a team of 6 developers. Architected performance-first WordPress solutions. Introduced code review processes and sprint planning.",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-spacing relative">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
      </div>

      <div className="container max-w-4xl mx-auto px-6 relative z-10">
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
            Career Journey
          </motion.p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            From code to <span className="text-gradient">leadership</span>
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div
              className="w-full bg-primary"
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              className={`relative flex items-start mb-12 md:mb-16 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 mt-2 ring-4 ring-background z-10" />

              <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="glass-card rounded-xl p-6 hover:glow-border transition-shadow duration-300">
                  <span className="font-mono text-xs text-primary tracking-wider">{item.year}</span>
                  <h3 className="text-lg font-bold mt-1 text-foreground">{item.role}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 font-medium">{item.company}</p>
                  <p className="text-sm text-muted-foreground/80 mt-3 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
