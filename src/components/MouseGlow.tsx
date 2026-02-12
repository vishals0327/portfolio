import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Disable for touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    // Detect hover on interactive elements
    const addHoverEvents = () => {
      const elements = document.querySelectorAll("a, button, input, textarea, .cursor-hover");

      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    addHoverEvents();
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed pointer-events-none z-[999] hidden md:block"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: hovering ? 1.8 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(217 91% 50% / 0.25) 0%, hsl(217 91% 50% / 0.1) 40%, transparent 70%)",
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed pointer-events-none z-[1000] hidden md:block bg-primary"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: hovering ? 0.6 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
        }}
      />
    </>
  );
};

export default CustomCursor;
