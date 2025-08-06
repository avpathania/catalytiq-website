import { 
  MainLayout, 
  PageHeader, 
  SolutionsApproach, 
  SolutionsAutomation, 
  SolutionsResults, 
  SolutionsCTA 
} from "@/components";

export default function SolutionsPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Solutions"
        subtitle="We combine real-world expertise with AI to deliver tailored solutions that drive results for your business."
        breadcrumb="Home / Solutions"
      />
      <SolutionsApproach />
      <SolutionsAutomation />
      <SolutionsResults />
      <SolutionsCTA />
    </MainLayout>
  );
}