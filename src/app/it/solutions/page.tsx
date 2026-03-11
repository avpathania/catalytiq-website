import { MainLayout, PageHeader } from "@/components";
import { SolutionsApproachIT } from "@/components/sections/solutions-approach-it";
import { SolutionsAutomationIT } from "@/components/sections/solutions-automation-it";
import { SolutionsResultsIT } from "@/components/sections/solutions-results-it";
import { SolutionsCTAIT } from "@/components/sections/solutions-cta-it";

export default function SolutionsPageIT() {
  return (
    <MainLayout>
      <PageHeader
        title="Soluzioni"
        subtitle="Combiniamo esperienza del mondo reale con l'IA per fornire soluzioni su misura che generano risultati per la tua azienda."
        breadcrumb="Home / Soluzioni"
      />
      <SolutionsApproachIT />
      <SolutionsAutomationIT />
      <SolutionsResultsIT />
      <SolutionsCTAIT />
    </MainLayout>
  );
}