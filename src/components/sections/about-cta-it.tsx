import { Button } from '@/components/ui/button'
import { BookDemoButtonIT } from '@/components/forms/book-demo-button-it'
import { ArrowRight } from 'lucide-react'

export function AboutCTAIT() {
  return (
    <section className="py-20 bg-stone-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white mb-6">
            Trasformiamo la Tua Azienda
          </h2>
          
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Inizia con un flusso di lavoro. Vedi i risultati. Scala ciò che funziona.
          </p>

          <BookDemoButtonIT
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto font-semibold group"
          >
            <span className="flex items-center">
              Prenota una Consulenza Gratuita
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </BookDemoButtonIT>

          {/* Additional Info */}
          <div className="mt-8 text-white/80">
            <p className="text-sm">
              Nessun impegno richiesto • Chiamata di scoperta di 30 minuti • Raccomandazioni personalizzate
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}