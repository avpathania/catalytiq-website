import { User, TrendingUp, Brain } from 'lucide-react'
import Image from 'next/image'

export function AboutTeamIT() {
  const founders = [
    {
      name: "Massimo Menoncin",
      title: "Esperto di Finanza e Rischio",
      bio: "Massimo porta una profonda esperienza nella finanza aziendale, gestione del rischio e consulenza strategica. Con una carriera che abbraccia settori e geografie, garantisce che ogni soluzione CatalytIQ Systems sia fondata sull'impatto finanziario e sulla chiarezza operativa.",
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-500",
      photo: "/images/founders/massimo-menoncin.png"
    },
    {
      name: "Luigi Oldrini",
      title: "Stratega di Vendite e Marketing",
      bio: "Luigi è un professionista esperto nel marketing industriale e nelle vendite con una passione per la crescita orientata alle performance. Guida la prospettiva commerciale dei nostri progetti, allineando l'automazione con il valore per il cliente e i ricavi.",
      icon: User,
      gradient: "from-green-500 to-emerald-500"
      // Note: Luigi's photo will be added when available
    },
    {
      name: "Anshul Pathania",
      title: "Trasformazione Aziendale e Sistemi AI",
      bio: "Anshul guida la convergenza di strategia, tecnologia e AI. Con un background nella consulenza di turnaround e nella progettazione di sistemi intelligenti, garantisce che CatalytIQ Systems fornisca soluzioni sia innovative che eseguibili.",
      icon: Brain,
      gradient: "from-purple-500 to-pink-500",
      photo: "/images/founders/anshul-pathania.png"
    }
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Incontra i Fondatori
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {founders.map((founder, index) => {
            const IconComponent = founder.icon
            return (
              <div 
                key={index}
                className="group bg-card rounded-xl p-8 border hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                {/* Profile Photo/Icon */}
                <div className="mb-6 flex justify-center">
                  {founder.photo ? (
                    <div className="w-20 h-20 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300 border-2 border-primary/20">
                      <Image
                        src={founder.photo}
                        alt={founder.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-20 h-20 bg-gradient-to-r ${founder.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                  )}
                </div>

                {/* Name and Title */}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm">
                    {founder.title}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  {founder.bio}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}