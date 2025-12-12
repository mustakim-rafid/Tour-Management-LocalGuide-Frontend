import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 bg-linear-to-b from-primary/90 to-primary bg-cover bg-center relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of travelers discovering authentic experiences around
            the world. Start planning your journey today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/tours">
            <Button
              size="lg"
              className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-semibold"
            >
              Explore Tours
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
