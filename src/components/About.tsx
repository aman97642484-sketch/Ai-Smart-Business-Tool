import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 12, suffix: "", label: "Team Members" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: textRef.current, start: "top 80%" } }
      );
    }

    counterRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { innerText: "0" }, {
        innerText: stats[i].value,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: function () {
          el.textContent = Math.floor(Number(el.textContent || 0)) + stats[i].suffix;
        }
      });
    });
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div ref={textRef} className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-3">About Us</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Crafting Digital Art <span className="gradient-text">Since 2017</span>
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed text-base md:text-lg">
            We're a team of animators, filmmakers, and designers obsessed with pushing creative boundaries. 
            Every project is a canvas — and we don't settle for ordinary.
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-card/50 border border-border/30">
              <span
                ref={(el) => { if (el) counterRefs.current[i] = el; }}
                className="block font-display text-3xl md:text-4xl font-bold text-primary glow-text"
              >
                0{stat.suffix}
              </span>
              <span className="block mt-2 text-xs md:text-sm text-muted-foreground font-body">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
