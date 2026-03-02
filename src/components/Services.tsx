import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Film, Box, Video, Palette, Camera } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Film, title: "2D Animation", desc: "Hand-crafted motion graphics and character animation that bring ideas to life." },
  { icon: Box, title: "3D Animation", desc: "Immersive 3D visuals and product renders with cinematic quality." },
  { icon: Video, title: "Video Editing", desc: "Professional post-production with color grading, VFX, and seamless storytelling." },
  { icon: Palette, title: "Graphic Design", desc: "Bold brand identities, UI/UX design, and visual systems that stand out." },
  { icon: Camera, title: "Corporate Shoots", desc: "Cinematic corporate films, interviews, and event coverage." },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" }
        }
      );
    });
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-3">What We Do</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:glow-box cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">{service.desc}</p>

              {/* Hover glow line */}
              <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
