import { Zap, Globe, Award, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Zap,
      title: "Authentic Experiences",
      description:
        "Skip the tourist traps and explore like a local with genuine expertise",
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description:
        "Every guide is verified and reviewed by thousands of travelers",
    },
    {
      icon: Heart,
      title: "Support Local",
      description:
        "Your booking directly supports local communities and small businesses",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block bg-highlight/30 text-accent px-4 py-1.5 rounded-full text-sm font-medium">
            Our Commitment
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Why Choose Local Guide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're not just another travel platform. We're a community of
            authentic experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all border border-border hover:border-primary/50"
              >
                <div className="w-16 h-16 rounded-full bg-linear-to-r from-highlight to-highlight/60 flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-accent" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
