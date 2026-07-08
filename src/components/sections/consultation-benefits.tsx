import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Target, TrendingUp, Zap } from "lucide-react"

const benefits = [
  {
    icon: Target,
    title: "Identify Quick Wins",
    description: "Discover automation opportunities that can be implemented within weeks, not months."
  },
  {
    icon: TrendingUp,
    title: "Calculate Your ROI",
    description: "See exactly how much time and money your business can save through strategic automation."
  },
  {
    icon: Zap,
    title: "Accelerate Growth",
    description: "Focus your team on high-value work while automation handles repetitive tasks."
  },
  {
    icon: Lightbulb,
    title: "Strategic Roadmap",
    description: "Get a phased implementation plan prioritized by impact and feasibility."
  }
]

export function ConsultationBenefits() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            What You'll Get in Your Consultation
          </h2>
          <p className="text-muted-foreground text-lg">
            A 30-minute session designed to give you actionable insights and a clear path forward.
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
