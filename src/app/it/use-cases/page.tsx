import {
  MainLayout,
  PageHeader,
  UseCasesComparisonIT,
  UseCasesROIIT,
  UseCasesCTAIT
} from "@/components";
import { UseCasesCaseStudies } from "@/components/sections/use-cases-case-studies";
import { getCaseStudies } from "@/lib/case-studies";

export default async function UseCasesPageIT() {
  const caseStudies = await getCaseStudies('it');

  return (
    <MainLayout>
      <PageHeader
        title="Casi d'Uso"
        subtitle="Scopri come CatalytIQ Systems aiuta le aziende a semplificare le operazioni, rispondere più velocemente e crescere in modo più intelligente attraverso casi d'uso reali."
        breadcrumb="Home / Casi d'Uso"
      />
      <UseCasesCaseStudies caseStudies={caseStudies} locale="it" />
      <UseCasesComparisonIT />
      <UseCasesROIIT />
      <UseCasesCTAIT />
    </MainLayout>
  );
}