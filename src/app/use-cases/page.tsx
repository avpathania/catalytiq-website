import {
  MainLayout,
  PageHeader,
  UseCasesComparison,
  UseCasesROI,
  UseCasesCTA
} from "@/components";
import { UseCasesCaseStudies } from "@/components/sections/use-cases-case-studies";
import { getCaseStudies } from "@/lib/case-studies";

export default async function UseCasesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <MainLayout>
      <PageHeader
        title="Use Cases"
        subtitle="See how CatalytIQ Systems helps businesses streamline operations, respond faster, and grow smarter through real-world use cases."
        breadcrumb="Home / Use Cases"
      />
      <UseCasesCaseStudies caseStudies={caseStudies} />
      <UseCasesComparison />
      <UseCasesROI />
      <UseCasesCTA />
    </MainLayout>
  );
}