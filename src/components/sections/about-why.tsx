export function AboutWhy() {
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
            Why We Built CatalytIQ Systems
          </h2>

          <div className="space-y-8">
            <p className="text-center text-lg text-muted-foreground">
              We saw a problem. Many businesses want to explore AI—but don't know where to begin. At the same time, traditional consulting models were falling short—slow, expensive, and detached from execution.
            </p>

            {/* Emphasized Quote */}
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-8 border-l-4 border-primary my-12">
              <blockquote className="text-2xl font-medium text-center italic">
                "CatalytIQ Systems was born to bridge this gap."
              </blockquote>
            </div>

            <p className="text-center text-lg text-muted-foreground">
              We combine decades of real-world experience with cutting-edge AI and automation, helping clients move from insight to implementation quickly—and affordably.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}