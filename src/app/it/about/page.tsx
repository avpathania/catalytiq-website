import { Metadata } from 'next'
import {
  MainLayout,
  PageHeader
} from '@/components'
import { AboutMissionVisionIT } from '@/components/sections/about-mission-vision-it'
import { AboutWhyIT } from '@/components/sections/about-why-it'
import { AboutTeamIT } from '@/components/sections/about-team-it'
import { AboutAdvantageIT } from '@/components/sections/about-advantage-it'
import { AboutCTAIT } from '@/components/sections/about-cta-it'

export const metadata: Metadata = {
  title: 'Chi Siamo | CatalytIQ Systems',
  description: 'Non siamo solo un\'altra agenzia AI. Siamo consulenti esperti che utilizzano l\'automazione per fornire risultati aziendali reali.',
}

export default function AboutPageIT() {
  return (
    <MainLayout>
      <PageHeader
        title="Chi Siamo"
        subtitle="Non siamo solo un'altra agenzia AI. Siamo consulenti esperti che utilizzano l'automazione per fornire risultati aziendali reali."
        breadcrumb="Home / Chi Siamo"
      />
      <AboutMissionVisionIT />
      <AboutWhyIT />
      <AboutTeamIT />
      <AboutAdvantageIT />
      <AboutCTAIT />
    </MainLayout>
  )
}