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
             <a href="https://texmith.com/" target="_blank">Powered by - Texmith Infotech</a> | © 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
