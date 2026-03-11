import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, BarChart3, MessageSquare, UserCheck, Search } from "lucide-react";

const stories = [
  {
    icon: Clock,
    title: "The Fast-Tracked Order",
    description: "A distributor sends a large order on Friday evening. By Monday morning, the confirmation is sent, production scheduled, and logistics looped in—automatically.",
    highlight: "No one from the team had to lift a finger."
  },
  {
    icon: FileText,
    title: "The Invoice That Filed Itself",
    description: "A supplier invoice hits the inbox. Instantly, it's scanned, the data extracted, records updated, and the payment added to the schedule.",
    highlight: "Finance didn't even open the email."
  },
  {
    icon: BarChart3,
    title: "The Report That Writes Itself",
    description: "Instead of chasing spreadsheets, a production manager now gets a clean KPI report every Friday—",
    highlight: "auto-compiled from machines and emailed by noon."
  },
  {
    icon: MessageSquare,
    title: "The Lead That Didn't Wait",
    description: "A new inquiry comes in overnight. Within 3 minutes, a personalized email is sent, the CRM updated, and a draft proposal shared.",
    highlight: "The client feels valued—and replies the same morning."
  },
  {
    icon: UserCheck,
    title: "The Seamless Onboarding",
    description: "The moment a contract is signed, the system sends welcome emails, books kickoff calls, and creates project tasks in the firm's tools.",
    highlight: "The new client is impressed before anyone even says hello."
  },
  {
    icon: Search,
    title: "The Audit That Found Itself",
    description: "During quarterly review prep, the system automatically gathers financial data, reconciles records, and highlights discrepancies.",
    highlight: "The CFO gets complete audit-ready reports automatically."
  }
];

export function UseCasesStories() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Real Stories
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Six Ways Automation Changes the Game
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, index) => {
              const IconComponent = story.icon;
              return (
                <Card key={index} className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{story.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {story.description}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {story.highlight}
                    </p>
                  </CardContent>
                  
                  {/* Background gradient */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}