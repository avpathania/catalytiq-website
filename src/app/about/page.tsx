import { Metadata } from 'next'
import {
  MainLayout,
  PageHeader,
  AboutMissionVision,
  AboutWhy,
  AboutTeam,
  AboutAdvantage,
  AboutCTA
} from '@/components'

export const metadata: Metadata = {
  title: 'About Us | CatalytIQ Systems',
  description: 'We\'re not just another AI agency. We\'re seasoned consultants using automation to deliver real business outcomes.',
}

export default function AboutPage() {
  return (
    <MainLayout>
      <PageHeader
        title="About Us"
        subtitle="We're not just another AI agency. We're seasoned consultants using automation to deliver real business outcomes."
        breadcrumb="Home / About"
      />
      <AboutMissionVision />
      <AboutWhy />
      <AboutTeam />
      <AboutAdvantage />
      <AboutCTA />
    </MainLayout>
  )
}