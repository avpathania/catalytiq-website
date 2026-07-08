import { MainLayout } from "@/components"
import { ConsultationHero } from "@/components/sections/consultation-hero"
import { ConsultationBenefits } from "@/components/sections/consultation-benefits"
import { CTA } from "@/components/sections/cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Business Consultation - CatalytIQ Systems",
  description: "Book a free 30-minute strategic consultation with our automation experts. Get a personalized roadmap to transform your business.",
  openGraph: {
    title: "Free Business Consultation - CatalytIQ Systems",
    description: "Book a free 30-minute strategic consultation with our automation experts.",
  },
}

export default function ConsultationPage() {
  return (
    <MainLayout>
      <ConsultationHero />
      <ConsultationBenefits />
      <CTA />
    </MainLayout>
  )
}
