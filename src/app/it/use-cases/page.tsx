import {
  MainLayout,
  PageHeader,
  UseCasesStoriesIT,
  UseCasesComparisonIT,
  UseCasesROIIT,
  UseCasesCTAIT
} from "@/components";

export default function UseCasesPageIT() {
  return (
    <MainLayout>
      <PageHeader
        title="Casi d'Uso"
        subtitle="Scopri come CatalytIQ Systems aiuta le aziende a semplificare le operazioni, rispondere più velocemente e crescere in modo più intelligente attraverso casi d'uso reali."
        breadcrumb="Home / Casi d'Uso"
      />
      <UseCasesStoriesIT />
      <UseCasesComparisonIT />
      <UseCasesROIIT />
      <UseCasesCTAIT />
    </MainLayout>
  );
}