import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Sparkles, Calculator, Lightbulb, BarChart3, Shield, TrendingUp, FileText, CheckCircle2 } from "lucide-react";
import { Tool } from "@/data/tools";
import { supabase } from "@/integrations/supabase/client";

interface ToolDrawerProps {
  open: boolean;
  onClose: () => void;
  tool: Tool | null;
}

interface ParsedSection {
  number: number;
  title: string;
  content: string;
}

function getSectionIcon(title: string, index: number) {
  const lower = title.toLowerCase();
  if (lower.includes("recommend") || lower.includes("suggest") || lower.includes("improvement")) return Lightbulb;
  if (lower.includes("compar") || lower.includes("ratio") || lower.includes("score") || lower.includes("chart")) return BarChart3;
  if (lower.includes("tax") || lower.includes("calcul") || lower.includes("liabil") || lower.includes("income") || lower.includes("deduct")) return Calculator;
  if (lower.includes("compliance") || lower.includes("risk") || lower.includes("penalt") || lower.includes("require")) return Shield;
  if (lower.includes("saving") || lower.includes("benefit") || lower.includes("eligib") || lower.includes("credit") || lower.includes("invest")) return TrendingUp;
  if (lower.includes("status") || lower.includes("classif") || lower.includes("registr")) return CheckCircle2;
  return FileText;
}

function parseAIResult(text: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  // Match patterns like "1.", "1)", "**1.", "**1)", or markdown headings with numbers
  const lines = text.split("\n");
  let current: ParsedSection | null = null;

  for (const line of lines) {
    const match = line.match(/^\*{0,2}\s*(\d+)\s*[.):\-]\s*\*{0,2}\s*(.+)/);
    if (match) {
      if (current) sections.push(current);
      const num = parseInt(match[1]);
      let title = match[2].replace(/\*{1,2}/g, "").replace(/:$/, "").trim();
      current = { number: num, title, content: "" };
    } else if (current) {
      const cleaned = line.replace(/^\s*[-•]\s*/, "").trim();
      if (cleaned) {
        current.content += (current.content ? "\n" : "") + cleaned;
      }
    }
  }
  if (current) sections.push(current);
  return sections;
}

const badgeColors = [
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-cyan-500 to-sky-600",
  "from-fuchsia-500 to-purple-600",
  "from-lime-500 to-green-600",
];

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
      const { data, error } = await supabase.functions.invoke('ai-analyze', {
        body: { prompt },
      });

      if (error) throw new Error(error.message || 'Failed to get AI analysis');
      if (data?.error) throw new Error(data.error);
      setResult(data?.result || 'No result returned from AI.');
    } catch (err: any) {
      console.error('AI analysis error:', err);
      setResult(`❌ Error: ${err.message || 'Something went wrong. Please try again.'}`);
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

  const parsedSections = result ? parseAIResult(result) : [];
  const showCards = parsedSections.length >= 2;

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
            className="fixed right-0 top-0 bottom-0 z-[60] w-full max-w-xl glass-strong border-l border-border overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="p-6 sm:p-8">
              {/* Header */}
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
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      >
                        <option value="" disabled>Select {field.label}</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt} className="bg-card text-foreground">{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        required
                        className="w-full px-4 py-3 rounded-xl glass border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                        value={formData[field.name] || ""}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
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
                      <div key={i} className="rounded-xl glass glow-border p-5 animate-pulse">
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-primary">AI Analysis Result</span>
                    </div>

                    {showCards ? (
                      <div className="space-y-4">
                        {parsedSections.map((section, i) => {
                          const Icon = getSectionIcon(section.title, i);
                          const gradient = badgeColors[i % badgeColors.length];
                          return (
                            <motion.div
                              key={i}
                              className="relative rounded-xl overflow-hidden"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: i * 0.08 }}
                            >
                              {/* Accent border */}
                              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-[0.07]`} />
                              <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${gradient}`} />

                              <div className="relative glass rounded-xl p-5 ml-[3px]">
                                <div className="flex items-start gap-3">
                                  <div className={`flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                                    <span className="text-white text-sm font-bold">{section.number}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                      <h4 className="font-display text-sm font-semibold text-foreground leading-tight">
                                        {section.title}
                                      </h4>
                                    </div>
                                    <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                                      {section.content.split("\n").map((line, li) => {
                                        // Bold markdown **text**
                                        const parts = line.split(/(\*\*[^*]+\*\*)/g);
                                        return (
                                          <p key={li} className={li > 0 ? "mt-1.5" : ""}>
                                            {parts.map((part, pi) =>
                                              part.startsWith("**") && part.endsWith("**") ? (
                                                <span key={pi} className="text-foreground font-medium">
                                                  {part.slice(2, -2)}
                                                </span>
                                              ) : (
                                                <span key={pi}>{part}</span>
                                              )
                                            )}
                                          </p>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Fallback for non-structured responses */
                      <motion.div
                        className="p-6 rounded-xl glass glow-border"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="text-foreground text-sm leading-relaxed whitespace-pre-line">{result}</div>
                      </motion.div>
                    )}
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
