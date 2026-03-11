import { Calculator, Megaphone, BarChart3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SOLUTIONS_AUTOMATION_AREAS_IT } from "@/lib/constants";

const iconMap = {
  Calculator,
  Megaphone,
  BarChart3,
};

export function SolutionsAutomationIT() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Cosa Automatizziamo
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Cosa Automatizziamo
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Con decenni di esperienza nelle funzioni aziendali chiave, progettiamo flussi di lavoro che creano valore misurabile. Ecco solo alcuni esempi:
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {SOLUTIONS_AUTOMATION_AREAS_IT.map((area) => {
              const IconComponent = iconMap[area.icon as keyof typeof iconMap];
              
              return (
                <Card key={area.id} className="border-0 bg-background/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                    </div>
                    <CardTitle className="text-xl">{area.title}</CardTitle>
                    <p className="text-sm font-medium text-muted-foreground">
                      {area.subtitle}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {area.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}