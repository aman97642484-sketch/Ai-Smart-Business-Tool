import { useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" });
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-display text-xl font-bold tracking-tight gradient-text cursor-pointer" onClick={() => scrollTo("hero")}>
          VFXION
        </span>
        <div className="hidden md:flex items-center gap-8">
          {["Services", "Portfolio", "About", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-sm font-body text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:block text-sm font-display font-semibold px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:shadow-[0_0_25px_hsl(195_100%_50%/0.4)] transition-all duration-300"
        >
          Get in Touch
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
