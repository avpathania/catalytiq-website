import { User, TrendingUp, Brain } from 'lucide-react'
import Image from 'next/image'

export function AboutTeam() {
  const founders = [
    {
      name: "Massimo Menoncin",
      title: "Finance & Risk Expert",
      bio: "Massimo brings deep expertise in corporate finance, risk management, and strategic advisory. With a career spanning industries and geographies, he ensures every CatalytIQ Systems solution is grounded in financial impact and operational clarity.",
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-500",
      photo: "/images/founders/massimo-menoncin.png"
    },
    {
      name: "Luigi Oldrini",
      title: "Sales & Marketing Strategist",
      bio: "Luigi is a seasoned industrial marketing and sales professional with a passion for performance-driven growth. He leads the commercial lens of our projects, aligning automation with customer value and revenue.",
      icon: User,
      gradient: "from-green-500 to-emerald-500"
      // Note: Luigi's photo will be added when available
    },
    {
      name: "Anshul Pathania",
      title: "Business Transformation & AI Systems",
      bio: "Anshul drives the convergence of strategy, technology, and AI. With a background in turnaround consulting and intelligent systems design, he ensures CatalytIQ Systems delivers solutions that are both forward-thinking and executable.",
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
            Meet the Founders
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