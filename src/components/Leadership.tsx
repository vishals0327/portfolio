import { motion, AnimatePresence } from "framer-motion";
import { Users, Code2, CalendarClock, Globe, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const cards = [
  {
    title: "Team Mentoring",
    description: "Guided 6 developers from junior to mid-level through structured learning paths and pair programming sessions.",
    longDescription: "Created a comprehensive mentorship program including weekly 1-on-1s, code review workshops, and a curated learning curriculum. Tracked progress through skill matrices and quarterly assessments.",
    icon: Users,
    color: "217 91% 60%",
    stats: "6 developers mentored",
  },
  {
    title: "Code Reviews",
    description: "Established code review culture ensuring quality, security, and performance across all deliverables.",
    longDescription: "Implemented a structured PR review process with automated linting, security scanning, and performance budgets. Reduced production bugs by 60% through thorough review practices.",
    icon: Code2,
    color: "190 95% 50%",
    stats: "60% fewer bugs",
  },
  {
    title: "Sprint Planning",
    description: "Led sprint planning and retrospectives for distributed teams across multiple time zones.",
    longDescription: "Managed agile ceremonies for a team spanning 3 time zones. Introduced async standups, capacity-based planning, and data-driven retrospectives that improved velocity by 35%.",
    icon: CalendarClock,
    color: "250 80% 60%",
    stats: "35% velocity increase",
  },
  {
    title: "Client SPOC",
    description: "Single point of contact for international clients—translating business needs into technical execution.",
    longDescription: "Managed direct relationships with 8+ international clients. Handled requirement gathering, technical proposals, timeline negotiations, and stakeholder presentations.",
    icon: Globe,
    color: "160 80% 45%",
    stats: "8+ global clients",
  },
];

const Leadership = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (expandedId !== null && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpandedId(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [expandedId]);

  // Close on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedId(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section id="leadership" className="section-spacing relative">
      <div className="container max-w-5xl mx-auto px-6">
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
            Leadership
          </motion.p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Beyond <span className="text-gradient">code</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="grid md:grid-cols-2 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const isExpanded = expandedId === i;

            return (
              <motion.div
                key={i}
                layout
                className={`relative glass-card rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isExpanded ? "md:col-span-2 z-20" : "hover:glow-border"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => setExpandedId(isExpanded ? null : i)}
                whileHover={!isExpanded ? { y: -4 } : {}}
              >
                {/* Glow accent bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(${card.color}), transparent)`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <motion.div
                        layout="position"
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: `hsla(${card.color}, 0.15)`,
                        }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: `hsl(${card.color})` }}
                        />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {isExpanded && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(null);
                        }}
                        className="p-1.5 rounded-lg hover:bg-secondary transition-colors shrink-0"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 pt-5 border-t border-border/50">
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {card.longDescription}
                          </p>
                          <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                            style={{
                              background: `hsla(${card.color}, 0.1)`,
                              color: `hsl(${card.color})`,
                            }}
                          >
                            {card.stats}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Subtle indicator */}
                {!isExpanded && (
                  <div className="absolute bottom-3 right-4 text-xs text-muted-foreground/40 font-mono">
                    click to expand
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
