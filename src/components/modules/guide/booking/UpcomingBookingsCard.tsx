"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ITour } from "@/types/tour.interface";
import { Calendar, DollarSign, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { format, isBefore } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { completeBooking } from "@/services/booking/booking.service";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UpcomingBookingsCardProps {
  tour: ITour;
}

export default function UpcomingBookingsCard({
  tour,
}: UpcomingBookingsCardProps) {
  const confirmedBookings = tour.bookings!;
  const today = new Date();
  const isCompleted = isBefore(new Date(tour.tourDate), today);
  const [isTourCompleted, setIsTourCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const handleMarkCompleted = async () => {
    setIsLoading(true);
    const confirmedBookingIds = confirmedBookings.map((b) => b.id);

    if (!confirmedBookingIds || confirmedBookingIds.length === 0) {
      toast.error("No confirmed bookings to complete.");
      return;
    }

    try {
      const result = await completeBooking(confirmedBookingIds);
      if (!result.success) {
        toast.error(result.message || "Completing bookings failed");
        return;
      }
      toast.success(result.message);
      setIsTourCompleted(true);
      startTransition(() => {
        router.refresh();
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Completing bookings failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Tour Image */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">{tour.title}</CardTitle>
        <CardDescription>Upcoming Guided Tour</CardDescription>
        <Badge className="text-xs mt-2 bg-green-600">
          Confirmed ({confirmedBookings.length})
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(tour.tourDate), "PPP")}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{tour.meetingPoint}</span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{tour.maxGroupSize} people</span>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          <span className="font-semibold">BDT {tour.tourFee}</span>
        </div>

        {/* SHOW BOOKINGS BUTTON & DIALOG */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">
              Show Bookings
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Bookings list</DialogTitle>
            </DialogHeader>

            {confirmedBookings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No bookings yet.</p>
            ) : (
              <div className="max-h-64 overflow-y-auto space-y-1 pt-2">
                {confirmedBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between border-b border-muted py-2"
                  >
                    <span className="text-sm font-medium">
                      {booking.tourist.name}
                    </span>

                    <div className="space-x-2">
                      <Badge className="text-xs bg-green-500">
                        {booking.status}
                      </Badge>
                      <Badge
                        className={cn(
                          "text-xs",
                          booking.paymentStatus === "PAID"
                            ? "bg-green-600 text-white"
                            : "bg-yellow-500 text-black"
                        )}
                      >
                        {booking.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Mark as completed button */}
        {isCompleted && !isTourCompleted && (
          <div className="pt-4">
            <Button
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleMarkCompleted}
            >
              Mark as Completed
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
