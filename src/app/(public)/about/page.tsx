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

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">About LocalGuide</h1>
        <p className="text-muted-foreground text-lg">
          LocalGuide connects curious travelers with passionate local guides.
          Discover authentic experiences, book instantly, and explore the world
          through the eyes of the people who know it best.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>For Travelers</CardTitle>
            <CardDescription>
              Find unique tours crafted by real locals who know every hidden
              gem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Browse curated experiences, read guide profiles, and book with
              secure checkout.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>For Guides</CardTitle>
            <CardDescription>
              Create tours, manage bookings, and grow your local presence.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              A simple dashboard allows you to publish tours, set prices, and
              interact with guests easily.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>
              Make travel more human, authentic, and community-driven.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We empower locals while giving travelers unforgettable
              memories—one tour at a time.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-14">
        <Link href="/tours">
          <Button size="lg" className="px-8">
            Explore Tours
          </Button>
        </Link>
      </div>
    </section>
  );
}
