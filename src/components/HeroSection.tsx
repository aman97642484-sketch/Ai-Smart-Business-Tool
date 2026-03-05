import { motion } from "framer-motion";

const words = ["Smart", "AI", "Business", "Tools"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base gradient wave */}
      <div className="gradient-wave" />

      {/* Gradient mesh on top */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* LUXURY SHINING EFFECTS */}

      {/* Diagonal shimmer sweep */}
      <div className="hero-shimmer" />

      {/* Glossy glass streaks */}
      <div className="glossy-streaks">
        <div className="glossy-streak" />
        <div className="glossy-streak" />
        <div className="glossy-streak" />
        <div className="glossy-streak" />
        <div className="glossy-streak" />
      </div>

      {/* Moving luxury gradient highlight layer */}
      <div className="luxury-gradient-layer" />

      {/* Soft corner edge glows */}
      <div className="corner-glow-tl" />
      <div className="corner-glow-tr" />

      {/* Animated spotlight corners */}
      <div className="spotlight-tl" />
      <div className="spotlight-br" />

      {/* Ambient edge glows */}
      <div className="ambient-glow-top" />
      <div className="ambient-glow-left" />
      <div className="ambient-glow-right" />

      {/* Horizontal light sweep */}
      <div className="light-sweep" />

      {/* Subtle light streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="light-beam absolute left-[20%] opacity-40" style={{ transform: "rotate(12deg)" }} />
        <div className="light-beam absolute left-[50%] opacity-20" style={{ transform: "rotate(-6deg)" }} />
        <div className="light-beam absolute left-[78%] opacity-30" style={{ transform: "rotate(8deg)" }} />
      </div>

      {/* Parallax blurred depth shapes */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-glow-purple/[0.03] blur-[180px]"
        animate={{ scale: [1, 1.12, 1], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-glow-soft/[0.015] blur-[150px]"
        animate={{ scale: [1, 1.08, 1], y: [0, 12, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute top-[55%] left-[45%] w-[300px] h-[300px] rounded-full bg-glow-purple/[0.02] blur-[120px]"
        animate={{ x: [-15, 15, -15], y: [8, -8, 8] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.h1
          className="heading-display heading-glow-pulse heading-metallic-shine text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-6"
        >
          {words.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-3 lg:mr-5 text-gradient"
              initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.9,
                delay: 0.3 + i * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Automate Tax, GST, NRI & Finance Decisions with AI
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            className="btn-glow px-8 py-4 text-lg rounded-xl font-semibold"
            onClick={() => {
              document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore AI Tools
          </button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
