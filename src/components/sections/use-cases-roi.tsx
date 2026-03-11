import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, Euro, Calculator } from "lucide-react";

export function UseCasesROI() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            ROI Calculator
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Small Workflows, Big Savings
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                Use Case: Lead follow-up automation for a 10-person consulting firm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {/* Time Saved */}
                <div className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Time Calculation</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>60 leads/month</p>
                    <p>× 15 minutes each</p>
                    <p className="text-lg font-bold text-primary">= 15 hours saved</p>
                  </div>
                </div>

                {/* Hourly Cost */}
                <div className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 mx-auto mb-4">
                    <Euro className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Hourly Cost</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Consultant rate</p>
                    <p className="text-2xl font-bold text-secondary">€60</p>
                    <p>per hour</p>
                  </div>
                </div>

                {/* Monthly Savings */}
                <div className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Monthly Savings</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>15 hours × €60</p>
                    <p className="text-3xl font-bold text-green-600">€900</p>
                    <p>per month</p>
                  </div>
                </div>
              </div>

              {/* Bottom calculation summary */}
              <div className="mt-8 p-6 rounded-lg bg-background/50 border">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h4 className="text-lg font-semibold">Calculation Summary</h4>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">60 leads/month</span> × <span className="font-medium">15 minutes each</span> = <span className="font-bold text-primary">15 hours saved</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">15 hours</span> × <span className="font-medium">€60/hour</span> = <span className="font-bold text-green-600 text-lg">€900/month savings</span>
                  </p>
                </div>
              </div>

              {/* Additional context */}
              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground italic text-center">
                  That's just the beginning. Multiply this across marketing, finance, and strategy workflows for exponential results.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Annual projection */}
          <div className="mt-8 text-center">
            <Card className="inline-block p-6 bg-gradient-to-r from-green-500/10 to-primary/10">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Annual Savings Projection</p>
                  <p className="text-2xl font-bold text-green-600">€10,800</p>
                </div>
                <div className="h-8 w-px bg-border"></div>
                <div>
                  <p className="text-sm text-muted-foreground">From just one automation</p>
                  <p className="text-sm font-medium">Lead follow-up workflow</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}