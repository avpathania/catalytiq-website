import { Lightbulb, Cog, Zap } from 'lucide-react'

export function AboutAdvantageIT() {
  const advantages = [
    {
      icon: Lightbulb,
      title: "Comprensione Strategica",
      description: "Iniziamo comprendendo profondamente la tua azienda, identificando opportunità ad alto impatto."
    },
    {
      icon: Cog,
      title: "Flussi di Lavoro Giusti",
      description: "Progettiamo automazioni che funzionano per il tuo team, i tuoi processi e i tuoi obiettivi."
    },
    {
      icon: Zap,
      title: "Esecuzione Potenziata dall'AI",
      description: "Professionisti esperti che implementano la strategia attraverso l'automazione intelligente."
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              La Consulenza Incontra l'Automazione
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Non costruiamo solo flussi di lavoro—costruiamo quelli giusti. Il nostro team inizia comprendendo profondamente la tua azienda, identificando opportunità ad alto impatto, e poi progettando automazioni che funzionano per il tuo team, i tuoi processi e i tuoi obiettivi.
            </p>
          </div>

          {/* Advantages Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon
              return (
                <div key={index} className="text-center group">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-4">
                    {advantage.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {advantage.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Quote Callout */}
          <div className="bg-background rounded-xl p-8 md:p-12 border-l-4 border-primary shadow-lg">
            <blockquote className="text-2xl font-medium text-center italic mb-4">
              "Questo è il vantaggio di CatalytIQ Systems: professionisti esperti che non si limitano a parlare di strategia—ma la implementano attraverso l'esecuzione potenziata dall'AI."
            </blockquote>
            <div className="text-center">
              <div className="w-12 h-1 bg-primary mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}