import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Sparkles } from "lucide-react";
import { Tool } from "@/data/tools";
import { supabase } from "@/integrations/supabase/client";
import AIResultDisplay from "./AIResultDisplay";

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
      const prompt = buildPrompt();
      const { data, error } = await supabase.functions.invoke("ai-analyze", {
        body: { prompt },
      });

      if (error) throw new Error(error.message || "Failed to get AI analysis");
      if (data?.error) throw new Error(data.error);

      const aiResult = data?.result || "No result returned from AI.";
      setResult(aiResult);

      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      console.log("VITE_BACKEND_URL:", BACKEND_URL);

      if (BACKEND_URL) {
        try {
          const res = await fetch(`${BACKEND_URL}/store-data.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData["_full_name"],
              email: formData["_email"],
              tool: tool?.title,
              inputs: formData,
              result: aiResult,
            }),
          });
          console.log("Backend response status:", res.status);
        } catch (backendErr) {
          console.warn("Backend save failed (non-blocking):", backendErr);
        }
      } else {
        console.warn("VITE_BACKEND_URL is not set — skipping backend save.");
      }
    } catch (err: any) {
      console.error("AI analysis error:", err);
      setResult(
        `❌ Error: ${err.message || "Something went wrong. Please try again."}`,
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
            className="fixed right-0 top-0 bottom-0 z-[60] w-full max-w-3xl glass-strong border-l border-border overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="p-6 sm:p-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-glow-soft/[0.08] to-glow-purple/[0.08] flex items-center justify-center">
                    <tool.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {tool.title}
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-muted-foreground text-sm mb-8">
                {tool.description}
              </p>

              {/* Form */}
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
                          setFormData({
                            ...formData,
                            [field.name]: e.target.value,
                          })
                        }
                      >
                        <option value="" disabled>
                          Select {field.label}
                        </option>
                        {field.options?.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="bg-card text-foreground"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        required
                        className="w-full px-4 py-3 rounded-xl glass border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder={
                          field.placeholder ||
                          `Enter ${field.label.toLowerCase()}`
                        }
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.name]: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                ))}

                {/* Separator */}
                <div className="pt-2 pb-1">
                  <div className="glow-divider" />
                </div>

                {/* Required: Full Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl glass border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Enter your full name"
                    value={formData["_full_name"] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, _full_name: e.target.value })
                    }
                  />
                </div>

                {/* Required: Email Address */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl glass border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Enter your email address"
                    value={formData["_email"] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, _email: e.target.value })
                    }
                  />
                </div>

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

              {/* Loading skeleton */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    className="mt-8 space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded-xl bg-white/5 p-5 animate-pulse"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-full bg-muted/30" />
                          <div className="h-4 w-40 rounded bg-muted/30" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 w-full rounded bg-muted/20" />
                          <div className="h-3 w-3/4 rounded bg-muted/20" />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results */}
              <AnimatePresence>
                {result && !loading && (
                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <AIResultDisplay result={result} />
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
