import { Badge } from "@/components/ui/badge";
import { SOLUTIONS_RESULTS } from "@/lib/constants";

export function SolutionsResults() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Results You Can Expect
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Results You Can Expect
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {SOLUTIONS_RESULTS.map((result, index) => (
              <div key={index} className="text-center">
                <div className="rounded-lg bg-card/50 p-8 backdrop-blur-sm">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-primary sm:text-4xl">
                      {result.stat}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}