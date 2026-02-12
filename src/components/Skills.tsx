import { motion } from "framer-motion";
import { Zap, Wrench, BarChart3, Shield, Users, Database } from "lucide-react";

const skillCategories = [
  {
    title: "Programming & CMS",
    skills: ["PHP", "JavaScript", "TypeScript", "WordPress", "React"],
    icon: Zap,
    span: "col-span-1 md:col-span-2",
  },
  {
    title: "WordPress Deep Expertise",
    skills: ["Custom Themes", "Hooks & Filters", "REST API", "WooCommerce", "Multisite", "Gutenberg Blocks"],
    icon: Wrench,
    span: "col-span-1",
  },
  {
    title: "SEO & Analytics",
    skills: ["Technical SEO", "GA4", "GTM", "Schema Markup", "Core Web Vitals", "Search Console"],
    icon: BarChart3,
    span: "col-span-1",
  },
  {
    title: "Performance & Security",
    skills: ["PageSpeed Optimization", "CDN Setup", "Security Hardening", "SSL", "Caching Strategies"],
    icon: Shield,
    span: "col-span-1 md:col-span-2",
  },
  {
    title: "Tools & Collaboration",
    skills: ["Git", "Jira", "Figma", "Slack", "VS Code", "Docker"],
    icon: Users,
    span: "col-span-1",
  },
  {
    title: "Server & Database",
    skills: ["MySQL", "cPanel", "Linux", "Nginx", "AWS Basics", "Cloudflare"],
    icon: Database,
    span: "col-span-1",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-spacing relative">
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
            Technical Arsenal
          </motion.p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Built with <span className="text-gradient">depth</span>, not breadth
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                className={`glass-card rounded-xl p-6 group cursor-default hover:glow-border transition-all duration-300 ${cat.span}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-3">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={j}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + j * 0.03 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
