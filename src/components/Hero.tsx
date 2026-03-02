import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(orbRef.current, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5 })
      .fromTo(headlineRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
      .fromTo(subtextRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* 3D Orb placeholder */}
        <div ref={orbRef} className="mb-8 relative">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full animate-float relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-sm" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 border border-primary/20" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-accent/5 via-primary/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/60 blur-sm" />
          </div>
        </div>

        <h1 ref={headlineRef} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight max-w-5xl text-balance">
          We Create Visual Experiences
          <br />
          <span className="gradient-text">That Move the Future.</span>
        </h1>

        <p ref={subtextRef} className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground max-w-2xl font-body leading-relaxed">
          From 2D animation to cinematic corporate films — we build stories that convert.
        </p>

        <button
          ref={ctaRef}
          onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-8 md:mt-10 font-display font-semibold text-sm md:text-base px-8 py-4 rounded-xl bg-primary text-primary-foreground hover:shadow-[0_0_40px_hsl(195_100%_50%/0.4)] hover:scale-105 transition-all duration-300 group"
        >
          View Our Work
          <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
