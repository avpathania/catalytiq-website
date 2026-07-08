import { BookDemoButtonIT } from "@/components/forms/book-demo-button-it"
import { CheckCircle2 } from "lucide-react"

export function ConsultationHeroIT() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Consulenza Strategica Gratuita
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Trasforma la Tua Azienda con un <span className="text-primary">Piano Strategico</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Ricevi una roadmap di automazione personalizzata in base alle sfide della tua azienda. I nostri esperti analizzeranno i tuoi processi, identificheranno le opportunità di automazione e ti mostreranno come risparmiare tempo, ridurre i costi e crescere più velocemente.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              "Sessione strategica di 30 minuti",
              "Roadmap personalizzata di automazione",
              "Nessun impegno o pressione commerciale"
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          <BookDemoButtonIT size="lg" className="h-12 px-8 text-base">
            Prenota la Tua Consulenza Gratuita
          </BookDemoButtonIT>
        </div>

        {/* Social proof */}
        <div className="mt-16 pt-12 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground mb-4">
            Fiducia di 50+ PMI in tutta Europa
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Manifattura", "Servizi Professionali", "Distribuzione", "Retail"].map((industry) => (
              <span key={industry} className="text-sm text-muted-foreground/70">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
