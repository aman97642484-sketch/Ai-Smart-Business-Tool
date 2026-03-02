import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (!formRef.current) return;
    gsap.fromTo(formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: formRef.current, start: "top 80%" } }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-3">Get in Touch</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Let's Create Together</h2>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
          <div className="glass rounded-2xl p-8 md:p-10 space-y-5">
            {[
              { name: "name" as const, label: "Your Name", type: "text", placeholder: "John Doe" },
              { name: "email" as const, label: "Email Address", type: "email", placeholder: "john@example.com" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
                  className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 font-body focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 font-body focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full font-display font-semibold text-sm px-6 py-4 rounded-xl bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(195_100%_50%/0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
