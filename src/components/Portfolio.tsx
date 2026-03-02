import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" }
      }
    );
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-3">Our Work</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Showreel</h2>
        </div>

        <div ref={contentRef} className="max-w-5xl mx-auto relative rounded-2xl overflow-hidden group">
          {/* Video embed area */}
          <div className="relative aspect-video bg-card border border-border/50 rounded-2xl overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

            {/* Placeholder with play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-primary/40 flex items-center justify-center group-hover:border-primary/80 group-hover:shadow-[0_0_40px_hsl(195_100%_50%/0.3)] transition-all duration-500 cursor-pointer">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-primary border-b-[12px] border-b-transparent ml-1" />
              </div>
              <p className="mt-6 text-sm text-muted-foreground font-body">Watch our latest showreel</p>
            </div>

            {/* Decorative grid lines */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
          </div>

          {/* Glow effect on hover */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-sm" />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
