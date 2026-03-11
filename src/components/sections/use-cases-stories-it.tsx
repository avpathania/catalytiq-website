import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, BarChart3, MessageSquare, UserCheck, Search } from "lucide-react";

const stories = [
  {
    icon: Clock,
    title: "L'Ordine Elaborato Velocemente",
    description: "Un distributore invia un grande ordine venerdì sera. Entro lunedì mattina, la conferma è inviata, la produzione programmata e la logistica coinvolta—automaticamente.",
    highlight: "Nessuno del team ha dovuto muovere un dito."
  },
  {
    icon: FileText,
    title: "La Fattura che si Archivia da Sola",
    description: "Una fattura del fornitore arriva nella casella di posta. Istantaneamente, viene scansionata, i dati estratti, i record aggiornati e il pagamento aggiunto al programma.",
    highlight: "La finanza non ha nemmeno aperto l'email."
  },
  {
    icon: BarChart3,
    title: "Il Report che si Scrive da Solo",
    description: "Invece di rincorrere fogli di calcolo, un responsabile di produzione ora riceve un report KPI pulito ogni venerdì—",
    highlight: "auto-compilato dalle macchine e inviato via email entro mezzogiorno."
  },
  {
    icon: MessageSquare,
    title: "Il Lead che Non ha Aspettato",
    description: "Una nuova richiesta arriva durante la notte. Entro 3 minuti, un'email personalizzata viene inviata, il CRM aggiornato e una bozza di proposta condivisa.",
    highlight: "Il cliente si sente valorizzato—e risponde la stessa mattina."
  },
  {
    icon: UserCheck,
    title: "L'Onboarding Senza Soluzione di Continuità",
    description: "Nel momento in cui un contratto viene firmato, il sistema invia email di benvenuto, prenota chiamate di avvio e crea task di progetto negli strumenti dell'azienda.",
    highlight: "Il nuovo cliente rimane impressionato prima ancora che qualcuno dica ciao."
  },
  {
    icon: Search,
    title: "L'Audit che si è Trovato da Solo",
    description: "Durante la preparazione della revisione trimestrale, il sistema raccoglie automaticamente i dati finanziari, riconcilia i record ed evidenzia le discrepanze.",
    highlight: "Il CFO riceve report completi pronti per l'audit automaticamente."
  }
];

export function UseCasesStoriesIT() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Storie Reali
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Sei Modi in cui l'Automazione Cambia le Regole del Gioco
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