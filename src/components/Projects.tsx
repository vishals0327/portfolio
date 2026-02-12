import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { X, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Enterprise WordPress CMS",
    tags: ["Custom Theme", "REST API", "GA4/GTM", "PageSpeed 95+"],
    description:
      "Built a custom WordPress theme from scratch for an enterprise client. Integrated REST APIs, GA4/GTM analytics, and achieved 85-95+ PageSpeed scores with minimal plugins.",
    metric: "95+",
    metricLabel: "PageSpeed",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    details: [
      "Custom theme architecture with zero page builders",
      "REST API integration for headless content delivery",
      "GA4 & GTM event tracking implementation",
      "Achieved 85-95+ PageSpeed scores consistently",
      "Plugin-minimal architecture for maximum performance",
    ],
  },
  {
    title: "Multi-Site Maintenance Platform",
    tags: ["30+ Sites", "Security", "Uptime", "Audits"],
    description:
      "Managed and maintained 30+ live WordPress sites. Implemented security hardening, reduced downtime, and conducted regular performance audits across all properties.",
    metric: "30+",
    metricLabel: "Live Sites",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    details: [
      "Centralized management of 30+ WordPress instances",
      "Automated security scanning and hardening",
      "99.9% uptime achievement across all sites",
      "Monthly performance audit reports for stakeholders",
      "Disaster recovery procedures and daily backups",
    ],
  },
  {
    title: "SEO Performance Overhaul",
    tags: ["Core Web Vitals", "Schema", "CDN", "Speed"],
    description:
      "Reduced page load time from 5.2s to under 2s. Achieved 40%+ organic traffic growth through technical SEO, schema markup, Core Web Vitals optimization, and CDN integration.",
    metric: "40%+",
    metricLabel: "Traffic Growth",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
    details: [
      "Load time reduction from 5.2s to under 2s",
      "40%+ organic traffic growth in 6 months",
      "Comprehensive schema markup implementation",
      "CDN integration and asset optimization",
      "Core Web Vitals scoring in green across all metrics",
    ],
  },
];

const ProjectCard = ({
  project,
  i,
  onExpand,
}: {
  project: (typeof projects)[0];
  i: number;
  onExpand: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/20 transition-all duration-500 cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onExpand}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <div className="relative h-56 md:h-64 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url('${project.image}')` }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

        <div className="absolute top-4 right-4 glass-card rounded-xl px-4 py-2 text-center">
          <span className="text-2xl font-bold text-gradient">{project.metric}</span>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            {project.metricLabel}
          </p>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="glass-card px-4 py-2 rounded-lg text-sm font-semibold text-foreground flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            View Details
          </div>
        </motion.div>
      </div>

      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, j) => (
            <span
              key={j}
              className="text-xs font-mono px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Expanded detail view
const ProjectDetail = ({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl glass-card border border-border"
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full glass-card hover:bg-primary/10 transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Image */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${project.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="text-5xl font-bold text-gradient">{project.metric}</span>
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider mt-1">
              {project.metricLabel}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">{project.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, j) => (
              <span
                key={j}
                className="text-xs font-mono px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-bold text-foreground mb-4">Key Highlights</h3>
          <ul className="space-y-3">
            {project.details.map((detail, j) => (
              <motion.li
                key={j}
                className="flex items-start gap-3 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + j * 0.08 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                {detail}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="section-spacing relative">
      <div className="container max-w-6xl mx-auto px-6">
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
            Case Studies
          </motion.p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Results that <span className="text-gradient">compound</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} i={i} onExpand={() => setExpanded(i)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expanded !== null && (
          <ProjectDetail
            project={projects[expanded]}
            onClose={() => setExpanded(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
