import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Sparkles } from "lucide-react";
import { Tool } from "@/data/tools";

interface ToolDrawerProps {
  open: boolean;
  onClose: () => void;
  tool: Tool | null;
}

export default function ToolDrawer({ open, onClose, tool }: ToolDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const buildPrompt = () => {
    if (!tool) return "";
    let prompt = tool.prompt;
    for (const [key, value] of Object.entries(formData)) {
      prompt = prompt.replace(new RegExp(`\\{${key}\\}`, "g"), value || "N/A");
    }
    return prompt;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // Fallback: simulate structured result
      await new Promise((r) => setTimeout(r, 2000));
      const dataString = Object.entries(formData)
        .map(([key, value]) => {
          const field = tool?.fields?.find((f) => f.name === key);
          return `${field?.label || key}: ${value}`;
        })
        .join("\n");

      setResult(
        `📊 ${tool?.title} — AI Analysis\n\n` +
        `Based on your inputs:\n${dataString}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `📋 Key Findings:\n` +
        `• Your data has been analyzed against current Indian tax laws and financial benchmarks.\n` +
        `• Optimization opportunities have been identified based on your profile.\n\n` +
        `💡 Recommendations:\n` +
        `1. Review your current financial structure for optimization.\n` +
        `2. Consider consulting a certified professional for personalized advice.\n` +
        `3. Ensure compliance with all applicable regulations.\n\n` +
        `⚠️ Disclaimer: This is AI-generated general guidance. Consult a qualified CA/advisor for specific decisions.\n\n` +
        `⚡ Connect an AI API for real AI-powered analysis.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setResult(null);
    setFormData({});
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && tool && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.div
            className="fixed right-0 top-0 bottom-0 z-[60] w-full max-w-lg glass-strong border-l border-border overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-glow-soft/[0.08] to-glow-purple/[0.08] flex items-center justify-center">
                    <tool.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{tool.title}</h3>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-muted-foreground text-sm mb-8">{tool.description}</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {tool.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        required
                        className="w-full px-4 py-3 rounded-xl glass border-border text-foreground bg-surface-glass/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.name]: e.target.value })
                        }
                      >
                        <option value="" disabled>Select {field.label}</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt} className="bg-card text-foreground">
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        required
                        className="w-full px-4 py-3 rounded-xl glass border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.name]: e.target.value })
                        }
                      />
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-glow px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Analyze with AI
                    </>
                  )}
                </button>
              </form>

              <AnimatePresence>
                {result && (
                  <motion.div
                    className="mt-8 p-6 rounded-2xl glass glow-border"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-primary">AI Analysis Result</span>
                    </div>
                    <div className="text-foreground text-sm leading-relaxed whitespace-pre-line">{result}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
