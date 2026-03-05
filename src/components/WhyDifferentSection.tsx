import { motion } from "framer-motion";
import { Brain, Zap, Briefcase, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Driven Financial Intelligence",
    description:
      "Our models analyze complex tax codes and financial data to deliver precise, actionable insights tailored to your situation.",
  },
  {
    icon: Zap,
    title: "Real-Time Smart Recommendations",
    description:
      "Get instant AI-powered suggestions that adapt to changing regulations and market conditions as they happen.",
  },
  {
    icon: Briefcase,
    title: "Designed for Professionals",
    description:
      "Purpose-built tools for entrepreneurs, CAs, and business leaders who demand accuracy and efficiency.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Data-Driven Insights",
    description:
      "Enterprise-grade security with encrypted processing. Your financial data never leaves our protected infrastructure.",
  },
];

export default function WhyDifferentSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[hsl(0_0%_4%)]" />
      <div className="noise-overlay" />
      <div className="absolute top-1/2 left-[20%] w-[500px] h-[500px] rounded-full bg-glow-purple/[0.025] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-[15%] w-[350px] h-[350px] rounded-full bg-glow-soft/[0.015] blur-[150px] pointer-events-none" />

      {/* Glowing divider */}
      <div className="absolute top-0 left-0 right-0 px-6">
        <div className="glow-divider max-w-4xl mx-auto" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Heading */}
          <motion.div
            className="lg:sticky lg:top-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Why choose us
            </p>
            <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              <span className="text-gradient animated-underline is-visible">
                Built for Smart
              </span>
              <br />
              <span className="text-foreground">Decision Makers</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              Every tool is engineered with precision AI to transform how you handle finances, taxes, and compliance.
            </p>
          </motion.div>

          {/* Right: Feature blocks */}
          <div className="space-y-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="group relative p-6 sm:p-8 rounded-2xl glass glow-border transition-all duration-500 hover:bg-surface-glass/60"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Soft hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-glow-soft/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-glow-soft/[0.08] to-glow-purple/[0.06] flex items-center justify-center flex-shrink-0 glow-shadow">
                    <feature.icon className="w-6 h-6 text-foreground/80" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 animated-underline">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
