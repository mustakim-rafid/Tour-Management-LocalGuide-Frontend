import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden from-primary/5 via-background to-background pt-14 pb-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block bg-accent/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                ✨ Discover Authentic Experiences
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-balance leading-tight text-foreground">
                Your Gateway to{" "}
                <span className="text-primary">Unforgettable</span> Adventures
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Discover breathtaking landscapes, vibrant cultures, and
                memorable adventures with expert local guides who know every
                corner of their destinations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  Start Your Adventure <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/tours">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-accent hover:dark:text-white"
                >
                  See Popular Tours
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">
                  Tours Available
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Travelers
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">
                  Destinations
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div className="relative h-96 md:h-full rounded-2xl overflow-hidden">
            <div className="absolute inset-0 from-secondary/20 via-accent/20 to-primary/20 rounded-2xl"></div>
            <Image
              src="https://images.unsplash.com/photo-1616485839474-51771920be96?q=80&w=842&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Breathtaking mountain landscape with scenic nature views"
              fill
              className="object-cover rounded-2xl"
              priority
            />
            <div className="absolute inset-0 from-background/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
