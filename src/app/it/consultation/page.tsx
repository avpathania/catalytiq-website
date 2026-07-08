import { MainLayout } from "@/components"
import { ConsultationHeroIT } from "@/components/sections/consultation-hero-it"
import { ConsultationBenefitsIT } from "@/components/sections/consultation-benefits-it"
import { CTAIT } from "@/components/sections/cta-it"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Consulenza Strategica Gratuita - CatalytIQ Systems",
  description: "Prenota una consulenza strategica gratuita di 30 minuti con i nostri esperti di automazione. Ottieni una roadmap personalizzata per trasformare la tua azienda.",
  openGraph: {
    title: "Consulenza Strategica Gratuita - CatalytIQ Systems",
    description: "Prenota una consulenza strategica gratuita di 30 minuti con i nostri esperti di automazione.",
  },
}

export default function ConsultationPageIT() {
  return (
    <MainLayout>
      <ConsultationHeroIT />
      <ConsultationBenefitsIT />
      <CTAIT />
    </MainLayout>
  )
}
