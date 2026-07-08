import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Target, TrendingUp, Zap } from "lucide-react"

const benefits = [
  {
    icon: Target,
    title: "Identifica le Opportunità",
    description: "Scopri le automazioni che possono essere implementate in settimane, non mesi."
  },
  {
    icon: TrendingUp,
    title: "Calcola il Tuo ROI",
    description: "Vedi esattamente quanto tempo e denaro la tua azienda può risparmiare con l'automazione strategica."
  },
  {
    icon: Zap,
    title: "Accelera la Crescita",
    description: "Concentra il tuo team su attività ad alto valore mentre l'automazione gestisce i compiti ripetitivi."
  },
  {
    icon: Lightbulb,
    title: "Roadmap Strategica",
    description: "Ottieni un piano di implementazione per fasi prioritizzato per impatto e fattibilità."
  }
]

export function ConsultationBenefitsIT() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Cosa Otterrai Dalla Tua Consulenza
          </h2>
          <p className="text-muted-foreground text-lg">
            Una sessione di 30 minuti progettata per offrirti insights e un percorso chiaro da seguire.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <Card key={idx} className="border-0 bg-background/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
