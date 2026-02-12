const MARQUEE_TEXT = "CUSTOM WORDPRESS THEMES — PERFORMANCE OPTIMIZATION — CORE WEB VITALS — SEO-FIRST ARCHITECTURE — GA4 / GTM — REST APIs — SECURITY — SCALABILITY — ";

const Marquee = () => {
  const repeated = MARQUEE_TEXT.repeat(3);

  return (
    <section className="py-8 md:py-12 overflow-hidden border-y border-border/30 relative bg-secondary/30">
      <div className="fade-edges-x">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-muted-foreground/50 uppercase pr-4">
            {repeated}
          </span>
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-muted-foreground/50 uppercase pr-4">
            {repeated}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
