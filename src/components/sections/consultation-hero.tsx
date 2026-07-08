import { BookDemoButton } from "@/components/forms/book-demo-button"
import { CheckCircle2 } from "lucide-react"

export function ConsultationHero() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Free Strategic Consultation
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Transform Your Business with a <span className="text-primary">Strategic Plan</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Get a personalized automation roadmap tailored to your business challenges. Our experts will analyze your workflows, identify automation opportunities, and show you how to save time, reduce costs, and scale faster.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              "30-minute strategic session",
              "Personalized automation roadmap",
              "No obligation or sales pitch"
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          <BookDemoButton size="lg" className="h-12 px-8 text-base">
            Book Your Free Consultation
          </BookDemoButton>
        </div>

        {/* Social proof */}
        <div className="mt-16 pt-12 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground mb-4">
            Trusted by 50+ SMEs across Europe
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Manufacturing", "Professional Services", "Distribution", "Retail"].map((industry) => (
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
