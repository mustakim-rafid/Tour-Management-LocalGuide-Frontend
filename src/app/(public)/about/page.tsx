export const dynamic = "force-dynamic";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Guide – About",
}

export default function AboutPage() {
  return (
    <section className="py-20 bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-block bg-highlight/30 text-accent px-4 py-1.5 rounded-full text-sm font-medium">
            About Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            About LocalGuide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            LocalGuide connects curious travelers with passionate local guides
            to discover authentic, community-driven experiences around the
            world.
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border border-border hover:border-primary/50 transition shadow-sm">
            <CardHeader>
              <CardTitle>For Travelers</CardTitle>
              <CardDescription>
                Discover unique tours created by real locals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Browse curated experiences, explore guide profiles, and book
                confidently with secure checkout and transparent pricing.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:border-primary/50 transition shadow-sm">
            <CardHeader>
              <CardTitle>For Guides</CardTitle>
              <CardDescription>
                Share your city and grow your local business.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Create tours, manage bookings, and connect with travelers using
                an easy-to-use dashboard built for locals.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:border-primary/50 transition shadow-sm">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>
                Make travel more human and meaningful.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We empower local communities while helping travelers experience
                destinations through authentic stories and connections.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/tours">
            <Button size="lg" className="px-10">
              Explore Tours
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
