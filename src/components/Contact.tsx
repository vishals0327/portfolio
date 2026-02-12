import { motion } from "framer-motion";
import { Mail, Linkedin, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-background/92" />

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            className="font-mono text-sm text-primary tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contact
          </motion.p>

          <h2 className="text-3xl md:text-5xl font-bold">
            Let's build something <span className="text-gradient">great</span> together
          </h2>

          <motion.p
            className="text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Got a project, opportunity, or just want to say hello? I'm always open to good conversations.
          </motion.p>
        </motion.div>

        {/* Full Width Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-10 max-w-2xl mx-auto space-y-6"
        >
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Contact Details
          </h3>

          {[
            { icon: Mail, text: "mail2vishu34@gmail.com" },
            { icon: Phone, text: "+91-8729058220" },
            {
              icon: Linkedin,
              text: "linkedin.com/in/vishals0327",
              href: "https://linkedin.com/in/vishals0327",
            },
            { icon: MapPin, text: "Punjab, India" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <item.icon className="w-5 h-5 text-primary" />
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  {item.text}
                </a>
              ) : (
                <span className="text-muted-foreground">{item.text}</span>
              )}
            </motion.div>
          ))}

          <p className="text-sm text-muted-foreground pt-6 border-t border-border/50 text-center">
            Available for full-time roles, freelance projects, and collaborations.
          </p>
        </motion.div>
      </div>

      <div className="border-t border-border/50 mt-20 py-6 text-center text-xs text-muted-foreground font-mono">
        © {new Date().getFullYear()} Vishal Singla — Built to perform.
      </div>
    </section>
  );
};

export default Contact;
