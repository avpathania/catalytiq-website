import { Target, Eye } from 'lucide-react'

export function AboutMissionVision() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Built for the Next Generation of Business
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Mission */}
          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <Target className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-4">
              Our Mission
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To help small and medium-sized businesses unlock new levels of performance by combining strategic advisory with intelligent automation.
            </p>
          </div>

          {/* Vision */}
          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300">
                <Eye className="w-8 h-8 text-secondary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-4">
              Our Vision
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A world where every company—no matter its size—can operate with the intelligence, efficiency, and agility of the biggest players.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}