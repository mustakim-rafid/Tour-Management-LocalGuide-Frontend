import { CheckCircle2, Calendar, MapPin, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function HowItWorks() {
  const steps = [
    {
      icon: MapPin,
      title: "Choose a Destination",
      description: "Browse from our curated collection of 150+ destinations worldwide",
    },
    {
      icon: Users,
      title: "Select Your Guide",
      description: "Meet experienced local guides with authentic local knowledge",
    },
    {
      icon: Calendar,
      title: "Book Your Tour",
      description: "Flexible dates and secure booking with travel insurance",
    },
    {
      icon: CheckCircle2,
      title: "Experience Culture",
      description: "Explore hidden gems and create unforgettable memories",
    },
  ]

  return (
    <section className="py-20 bg-linear-to-b from-background to-highlight/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
            Our Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Simple steps to plan your perfect getaway</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <Card className="p-6 h-full bg-card hover:shadow-lg transition-all border border-border hover:border-primary/50">
                  <div className="w-14 h-14 rounded-xl bg-linear-to-b from-primary to-primary/60 flex items-center justify-center mb-4">
                    <Icon className="text-primary-foreground" size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/3 -right-3 w-6 h-0.5 bg-linear-to-b from-primary/50 to-transparent"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
