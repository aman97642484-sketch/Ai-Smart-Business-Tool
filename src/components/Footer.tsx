const Footer = () => (
  <footer className="py-10 border-t border-border/30">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-display text-lg font-bold gradient-text">VFXION</span>
      <p className="text-xs text-muted-foreground font-body">
        © {new Date().getFullYear()} VFXION Studio. All rights reserved.
      </p>
      <div className="flex gap-6">
        {["Twitter", "Instagram", "Behance"].map((s) => (
          <a key={s} href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300 font-body">
            {s}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
