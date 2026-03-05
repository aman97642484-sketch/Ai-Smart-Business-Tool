import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import WhyDifferentSection from "@/components/WhyDifferentSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <CategorySection />
      <WhyDifferentSection />

      {/* Footer */}
      <footer className="relative py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Smart AI Business Tools. Built with AI-powered precision.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
