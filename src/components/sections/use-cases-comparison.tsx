import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Check } from "lucide-react";

const comparisons = [
  {
    traditional: "Invoice entry took hours weekly",
    withCatalytIQ: "Data extracted and filed in real-time"
  },
  {
    traditional: "Sales follow-ups missed or delayed",
    withCatalytIQ: "Automated sequences sent instantly"
  },
  {
    traditional: "Reports compiled end-of-month manually",
    withCatalytIQ: "Auto-sent every Friday"
  },
  {
    traditional: "Leads responded to within 1–2 days",
    withCatalytIQ: "Replies sent within minutes, 24/7"
  },
  {
    traditional: "New client setup took multiple emails",
    withCatalytIQ: "Onboarding flows triggered automatically"
  }
];

export function UseCasesComparison() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Transformation
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Before and After CatalytIQ Systems
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Traditional Workflow */}
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <X className="h-5 w-5" />
                  Traditional Workflow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comparisons.map((comparison, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                      <X className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        {comparison.traditional}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* With CatalytIQ */}
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="h-5 w-5" />
                  With CatalytIQ Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comparisons.map((comparison, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-foreground">
                        {comparison.withCatalytIQ}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile-friendly stacked comparison */}
          <div className="mt-12 lg:hidden">
            <div className="space-y-6">
              {comparisons.map((comparison, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 divide-y">
                      <div className="p-4 bg-destructive/5">
                        <div className="flex items-start gap-3">
                          <X className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            {comparison.traditional}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-green-500/5">
                        <div className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-medium text-foreground">
                            {comparison.withCatalytIQ}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}