import { MainLayout } from "@/components";
import { HeroIT } from "@/components/sections/hero-it";
import { FeaturesIT } from "@/components/sections/features-it";
import { ProcessIT } from "@/components/sections/process-it";
import { UseCasesIT } from "@/components/sections/use-cases-it";
import { IndustriesIT } from "@/components/sections/industries-it";
import { CTAIT } from "@/components/sections/cta-it";

export default function HomeIT() {
  return (
    <MainLayout>
      <HeroIT />
      <FeaturesIT />
      <ProcessIT />
      <UseCasesIT />
      <IndustriesIT />
      <CTAIT />
    </MainLayout>
  );
}