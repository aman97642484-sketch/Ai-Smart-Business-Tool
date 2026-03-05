import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Category, Tool } from "@/data/tools";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: Category | null;
  onSelectTool: (tool: Tool) => void;
}

export default function CategoryModal({ open, onClose, category, onSelectTool }: CategoryModalProps) {
  if (!category) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-50 glass-strong border border-border rounded-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-glow-soft/[0.08] to-glow-purple/[0.08] flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">{category.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Tools Grid */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tools.map((tool, i) => (
                  <ToolListCard
                    key={tool.id}
                    tool={tool}
                    index={i}
                    onClick={() => {
                      onClose();
                      setTimeout(() => onSelectTool(tool), 150);
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ToolListCard({
  tool,
  index,
  onClick,
}: {
  tool: Tool;
  index: number;
  onClick: () => void;
}) {
  const Icon = tool.icon;

  return (
    <motion.div
      className="group relative glass glow-border rounded-xl p-5 cursor-pointer transition-all duration-400"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-glow-soft/[0.03] to-glow-purple/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-glow-soft/[0.08] to-glow-purple/[0.08] flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary" />
      </div>

      <h4 className="font-display text-base font-semibold text-foreground mb-2">{tool.title}</h4>
      <p className="text-muted-foreground text-xs leading-relaxed mb-4">{tool.description}</p>

      <span className="text-xs font-medium text-primary flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
        Open Tool
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </motion.div>
  );
}
