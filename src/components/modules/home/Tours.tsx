"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ITour } from "@/types/tour.interface";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface ToursSectionProps {
  toursData: ITour[];
}

export default function ToursSection({ toursData }: ToursSectionProps) {
  const tours = toursData.slice(0, 3);
  return (
    <section className="py-20 bg-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
            Featured Tours
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Popular Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked tours for unforgettable experiences
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <Card
              key={tour.id}
              className="overflow-hidden hover:shadow-xl transition-all border border-border hover:border-primary/50"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-background/95 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-primary">
                  {tour.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {tour.title}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin size={16} />
                    <span className="text-sm">{tour.meetingPoint}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      BDT {tour.tourFee}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/tours">
            <Button>
              View All Tours
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
