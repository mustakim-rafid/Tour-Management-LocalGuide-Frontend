"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { format } from "date-fns";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  cancelBooking,
  confirmBooking,
} from "@/services/booking/booking.service";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PendingRequestCardProps {
  tour: ITour;
}

export default function PendingRequestCard({ tour }: PendingRequestCardProps) {
  const pendingBookings = tour.bookings!;
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = async (
    bookingId: string,
    action: "CONFIRMED" | "CANCELED"
  ) => {
    setLoadingId(bookingId);
    try {
      let result;
      if (action === "CONFIRMED") {
        result = await confirmBooking(bookingId);
      } else {
        result = await cancelBooking(bookingId);
      }

      if (!result.success) {
        toast.error(result.message || "Action failed");
        return;
      }

      toast.success(`Booking ${action.toLowerCase()} successfully`);
      startTransition(() => router.refresh());
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
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
        <CardDescription>{tour.description}</CardDescription>
        <Badge variant="secondary" className="text-xs mt-2">
          Pending Requests ({pendingBookings.length})
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

        {/* Pending Bookings Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              View Pending Requests
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Pending Booking Requests</DialogTitle>
            </DialogHeader>

            <div className="max-h-64 overflow-y-auto space-y-2 pt-2">
              {pendingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <span className="text-sm font-medium">
                    {booking.tourist.name}
                  </span>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={loadingId === booking.id}
                      onClick={() => handleAction(booking.id, "CANCELED")}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      disabled={loadingId === booking.id}
                      onClick={() => handleAction(booking.id, "CONFIRMED")}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
