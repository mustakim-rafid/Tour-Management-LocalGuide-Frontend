"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { MapPin, Eye, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ITour } from "@/types/tour.interface";
import { getCookie } from "@/services/auth/tokenHandlers";
import { createBooking } from "@/services/booking/booking.service";
import BookTourDialog from "../tour/BookTourDialog";

interface ToursSectionProps {
  toursData: ITour[];
}

export default function ToursSection({ toursData }: ToursSectionProps) {
  const tours = toursData.slice(0, 3);

  const [openBooking, setOpenBooking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTour, setSelectedTour] = useState<ITour | null>(null);

  const router = useRouter();
  const pathName = usePathname();

  const handleBookTourClicked = async (tour: ITour) => {
    setLoading(true);
    try {
      const accessToken = await getCookie("accessToken");

      if (!accessToken) {
        router.push(`/login?redirect=${pathName}`);
        return;
      }

      setSelectedTour(tour);
      setOpenBooking(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong after trying to book tour");
    } finally {
      setLoading(false);
    }
  };

  const handleBookTourConfirm = async (tourId: string) => {
    try {
      const result = await createBooking({ tourId });
      if (!result.success) {
        toast.error(result.message || "Tour booking failed");
        return;
      }
      toast.success(result.message);
      setOpenBooking(false);
      router.push("/dashboard/my-trips");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while confirming booking");
    }
  };

  return (
    <>
      <section className="py-20 bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              Featured Tours
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Popular Destinations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked tours for unforgettable experiences
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Card
                key={tour.id}
                className="flex flex-col overflow-hidden hover:shadow-xl transition-all border border-border hover:border-primary/50"
              >
                {/* Image */}
                <div className="relative h-64 bg-muted">
                  <Image
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-background/95 px-3 py-1 rounded-full text-sm font-semibold text-primary">
                    {tour.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1">
                  <h3 className="text-xl font-bold">{tour.title}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin size={16} />
                    <span className="text-sm">{tour.meetingPoint}</span>
                  </div>

                  <span className="text-2xl font-bold text-primary block">
                    BDT {tour.tourFee}
                  </span>
                </div>

                {/* Buttons – always at bottom */}
                <div className="p-5 pb-0 border-t border-border flex gap-2">
                  <Link href={`/tours/${tour.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </Link>

                  <Button
                    className="flex-1"
                    onClick={() => handleBookTourClicked(tour)}
                    disabled={loading}
                  >
                    Book Tour
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* View All */}
          <div className="text-center mt-12">
            <Link href="/tours">
              <Button>View All Tours</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Dialog */}
      {selectedTour && (
        <BookTourDialog
          tour={selectedTour}
          isOpen={openBooking}
          onClose={() => setOpenBooking(false)}
          onConfirm={handleBookTourConfirm}
        />
      )}
    </>
  );
}
