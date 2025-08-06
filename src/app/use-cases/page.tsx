import { 
  MainLayout, 
  PageHeader, 
  UseCasesStories, 
  UseCasesComparison, 
  UseCasesROI, 
  UseCasesCTA 
} from "@/components";

export default function UseCasesPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Use Cases"
        subtitle="See how CatalytIQ Systems helps businesses streamline operations, respond faster, and grow smarter through real-world use cases."
        breadcrumb="Home / Use Cases"
      />
      <UseCasesStories />
      <UseCasesComparison />
      <UseCasesROI />
      <UseCasesCTA />
    </MainLayout>
  );
}