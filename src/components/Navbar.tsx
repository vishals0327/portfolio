import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const navItems = [
  { label: "About us", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Impact", href: "#achievements" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => ({
        id: item.href.replace("#", ""),
        el: document.getElementById(item.href.replace("#", "")),
      }));

      let current = "";
      for (const section of sections) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            current = section.id;
          }
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-bold text-lg tracking-tight text-foreground">
          V<span className="text-gradient">S</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                active === item.href.replace("#", "")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {active === item.href.replace("#", "") && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-lg bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}

          <a
            href="/Vishal_Singla_Resume.pdf"
            download
            className="ml-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active === item.href.replace("#", "")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/Vishal_Singla_Resume.pdf"
                download
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground"
              >
                <Download className="w-3.5 h-3.5" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
