export function AboutWhyIT() {
  return (
    <section className="py-20 bg-gradient-to-r from-muted/30 to-muted/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
            Perché Abbiamo Creato CatalytIQ Systems
          </h2>

          <div className="space-y-8">
            <p className="text-center text-lg text-muted-foreground">
              Abbiamo visto un problema. Molte aziende vogliono esplorare l'AI—ma non sanno da dove iniziare. Allo stesso tempo, i modelli di consulenza tradizionali non erano all'altezza—lenti, costosi e scollegati dall'esecuzione.
            </p>

            {/* Emphasized Quote */}
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-8 border-l-4 border-primary my-12">
              <blockquote className="text-2xl font-medium text-center italic">
                "CatalytIQ Systems è nato per colmare questo divario."
              </blockquote>
            </div>

            <p className="text-center text-lg text-muted-foreground">
              Combiniamo decenni di esperienza nel mondo reale con AI e automazione all'avanguardia, aiutando i clienti a passare dall'intuizione all'implementazione rapidamente—e a prezzi accessibili.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}