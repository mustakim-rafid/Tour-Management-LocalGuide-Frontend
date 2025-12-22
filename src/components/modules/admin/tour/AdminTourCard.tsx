"use client";

import { ITour } from "@/types/tour.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, DollarSign, MapPin, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { cancelBooking } from "@/services/booking/booking.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AdminTourCardProps {
  tour: ITour;
}

export default function AdminTourCard({ tour }: AdminTourCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const handleCancelBooking = async (bookingId: string) => {
    setIsLoading(true);
    try {
      const result = await cancelBooking(bookingId);
      if (!result.success) {
        toast.error(result.message || "Failed to cancel booking.");
        return;
      }
      toast.success(result.message);
      startTransition(() => {
        router.refresh();
      });
    } catch (error: any) {
      toast.error(error?.message || "Failed to cancel booking.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-56 w-full">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">{tour.title}</CardTitle>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <Badge className="bg-blue-600 text-white">
            {tour.bookings?.length || 0} Bookings
          </Badge>
          <Badge className="bg-purple-600 text-white">
            Guide: {tour.guide?.name || "Unknown"}
          </Badge>
        </div>
      </CardHeader>

      {/* Main content grows */}
      <CardContent className="flex-1 space-y-4">
        {/* Tour Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
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
            <span>Max {tour.maxGroupSize} people</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="font-semibold">BDT {tour.tourFee}</span>
          </div>
        </div>

        {/* Guide Info */}
        <div className="border rounded-lg p-3 bg-muted/30">
          <h3 className="font-medium mb-1 flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />
            Guide Details
          </h3>
          <p className="text-sm">
            <span className="font-medium">{tour.guide?.name}</span> —{" "}
            {tour.guide?.email}
          </p>
        </div>
      </CardContent>

      <div className="mt-auto border-t p-4 pb-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              View Bookings
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Bookings for {tour.title}</DialogTitle>
            </DialogHeader>

            {tour.bookings && tour.bookings.length > 0 ? (
              <div className="space-y-3 mt-2">
                {tour.bookings.map((booking) => {
                  const canCancel =
                    booking.status === "PENDING" ||
                    (booking.status === "CONFIRMED" &&
                      booking.paymentStatus === "UNPAID");

                  return (
                    <div
                      key={booking.id}
                      className="border rounded-lg p-4 bg-muted/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {booking.tourist.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.tourist.email}
                        </p>

                        <div className="flex gap-2 pt-1">
                          <Badge
                            className={cn(
                              "text-xs",
                              booking.status === "PENDING" && "bg-yellow-500",
                              booking.status === "CONFIRMED" && "bg-blue-600",
                              booking.status === "COMPLETED" && "bg-green-600",
                              booking.status === "CANCELLED" && "bg-red-600"
                            )}
                          >
                            {booking.status}
                          </Badge>

                          <Badge
                            className={cn(
                              "text-xs",
                              booking.paymentStatus === "PAID"
                                ? "bg-green-600"
                                : "bg-red-500"
                            )}
                          >
                            {booking.paymentStatus}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex sm:items-center sm:justify-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={!canCancel || isLoading}
                          onClick={() => handleCancelBooking(booking.id)}
                          className={cn(
                            "w-full sm:w-auto",
                            !canCancel &&
                              "opacity-50 cursor-not-allowed bg-destructive/60"
                          )}
                        >
                          {canCancel ? "Cancel Booking" : "Cannot Cancel"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-2">
                No bookings yet.
              </p>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
