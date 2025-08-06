export function AboutHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Us
          </h1>
          
          <h3 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            We're not just another AI agency. We're seasoned consultants using automation to deliver real business outcomes.
          </h3>
        </div>
      </div>
    </section>
  )
}