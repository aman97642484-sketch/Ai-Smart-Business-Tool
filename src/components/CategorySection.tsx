import { useState } from "react";
import { motion } from "framer-motion";
import { categories, Category, Tool } from "@/data/tools";
import CategoryModal from "./CategoryModal";
import ToolDrawer from "./ToolDrawer";

export default function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  return (
    <section id="tools" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-glow-purple/[0.03] blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-glow-soft/[0.02] blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-4">
            AI Tax & Finance Tools
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful AI-driven financial tools organized by category for quick access
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {categories.map((category, i) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={i}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
      </div>

      <CategoryModal
        open={selectedCategory !== null && selectedTool === null}
        onClose={() => setSelectedCategory(null)}
        category={selectedCategory}
        onSelectTool={(tool) => setSelectedTool(tool)}
      />

      <ToolDrawer
        open={selectedTool !== null}
        onClose={() => setSelectedTool(null)}
        tool={selectedTool}
      />
    </section>
  );
}

function CategoryCard({
  category,
  index,
  onClick,
}: {
  category: Category;
  index: number;
  onClick: () => void;
}) {
  const Icon = category.icon;

  return (
    <motion.div
      className="group relative glass glow-border rounded-2xl p-8 sm:p-10 cursor-pointer transition-all duration-500"
      onClick={onClick}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-glow-soft/[0.04] to-glow-purple/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-glow-soft/[0.08] to-glow-purple/[0.08] flex items-center justify-center mb-6 glow-shadow">
        <Icon className="w-8 h-8 text-primary" />
      </div>

      <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
        {category.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
        {category.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {category.tools.length} tools available
        </span>
        <span className="text-sm font-medium text-primary flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
          Explore
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.div>
  );
}
