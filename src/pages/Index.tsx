import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import MouseGlow from "@/components/MouseGlow";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Leadership from "@/components/Leadership";
import Contact from "@/components/Contact";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={handleComplete} />}
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <MouseGlow />
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <About />
            <Skills />
            <Projects />
            <Achievements />
            <Leadership />
            <Contact />
          </main>
        </SmoothScroll>
      )}
    </>
  );
};

export default Index;
