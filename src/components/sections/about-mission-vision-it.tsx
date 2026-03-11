import { Target, Eye } from 'lucide-react'

export function AboutMissionVisionIT() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Costruito per la Prossima Generazione di Business
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
              La Nostra Missione
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Aiutare le piccole e medie imprese a sbloccare nuovi livelli di performance combinando consulenza strategica con automazione intelligente.
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
              La Nostra Visione
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Un mondo dove ogni azienda—indipendentemente dalle sue dimensioni—può operare con l'intelligenza, l'efficienza e l'agilità dei più grandi player.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}