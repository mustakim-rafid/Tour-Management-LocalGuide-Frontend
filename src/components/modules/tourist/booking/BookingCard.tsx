"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBooking } from "@/types/booking.interface";
import {
  Calendar,
  DollarSign,
  MapPin,
  Users,
  ShieldCheck,
  XCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { toast } from "sonner";
import { tourPayment } from "@/services/payment/payment.service";
import { useState, useTransition } from "react";
import ReviewFormDialog from "../review/ReviewFormDialog";
import DeleteAlertDialog from "@/components/shared/DeleteAlertDialog";
import { cancelBooking } from "@/services/booking/booking.service";
import { useRouter } from "next/navigation";

interface BookingCardProps {
  booking: IBooking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const [loading, setLoading] = useState(false);
  const { tour } = booking;
  const [bookingId, setBookingId] = useState("");
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [showReviewButton, setShowReviewButton] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const statusMessage = (() => {
    if (booking.status === "CONFIRMED" && booking.paymentStatus === "PAID") {
      return {
        text: "Payment successful • Your booking is fully confirmed",
        icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        badge: "Paid",
        badgeVariant: "default" as const,
      };
    }

    return {
      PENDING: {
        text: "Waiting for guide approval",
        icon: <Clock className="h-4 w-4 text-yellow-500" />,
        badge: "Pending",
        badgeVariant: "secondary" as const,
      },
      CONFIRMED: {
        text: "Approved by guide • Please pay to complete your booking",
        icon: <ShieldCheck className="h-4 w-4 text-green-600" />,
        badge: "Confirmed",
        badgeVariant: "default" as const,
      },
      COMPLETED: {
        text: "Tour completed. Hope you had a great experience!",
        icon: <ShieldCheck className="h-4 w-4 text-blue-600" />,
        badge: "Completed",
        badgeVariant: "default" as const,
      },
      CANCELLED: {
        text: "Booking cancelled",
        icon: <XCircle className="h-4 w-4 text-red-600" />,
        badge: "Cancelled",
        badgeVariant: "destructive" as const,
      },
    }[booking.status];
  })();

  const handlePayment = async (bookingId: string) => {
    setLoading(true);
    try {
      const result = await tourPayment(bookingId);
      if (!result.success) {
        toast.error(result.message || "Payment process failed");
        return;
      }
      toast.success("Redirecting you to secure payment…");
      setTimeout(() => {
        window.location.replace(result.data.paymentUrl);
      }, 500);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.message || "Something went wrong in the payment process"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReviewButtonClick = (bookingId: string) => {
    setBookingId(bookingId);
    setOpenReviewDialog(true);
  };

  const handleTourCancel = async (bookingId: string) => {
    try {
      const result = await cancelBooking(bookingId);
      if (!result.success) {
        toast.error(result.message || "Booking cancellation failed");
        return;
      }
      toast.success(result.message);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.log(error);
      toast.error("Error while cancelling the booking");
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={tour.image || "/placeholder.png"}
          alt={tour.title}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg line-clamp-1">{tour.title}</CardTitle>
          <Badge variant={statusMessage.badgeVariant}>
            {statusMessage.badge}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {tour.description}
        </CardDescription>

        {tour.guide && (
          <div className="text-sm mt-2">
            Guide: <span className="font-medium">{tour.guide.name}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3 pb-3 text-sm">
        {/* Tour Date */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(tour.tourDate), "PPP")}</span>
        </div>

        {/* Meeting Point */}
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 mt-0.5" />
          <span className="line-clamp-1">{tour.meetingPoint}</span>
        </div>

        {/* Duration + Group Size */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{tour.maxGroupSize} people</span>
          </div>

          <span className="text-muted-foreground">{tour.duration}</span>
        </div>

        {/* Fee */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <DollarSign className="h-4 w-4" />
          <span className="font-semibold text-foreground">
            BDT {tour.tourFee}
          </span>
        </div>

        {/* Status Message */}
        <div className="flex items-center gap-2 mt-4 font-medium">
          {statusMessage.icon}
          <span>{statusMessage.text}</span>
        </div>
      </CardContent>

      <CardFooter className="border-t flex justify-between gap-2">
        <Link className="flex-1" href={`/tours/${tour.id}`}>
          <Button variant="outline" className="w-full">
            View Tour
          </Button>
        </Link>

        {(booking.status === "PENDING" ||
          (booking.status === "CONFIRMED" &&
            booking.paymentStatus === "UNPAID")) && (
          <DeleteAlertDialog
            item={booking.id}
            onDelete={handleTourCancel}
            description="This will cancel the tour!"
          >
            <Button disabled={isPending} variant="destructive">Cancel tour</Button>
          </DeleteAlertDialog>
        )}

        {/* Show Pay Button ONLY if unpaid */}
        {booking.status === "CONFIRMED" &&
          booking.paymentStatus === "UNPAID" && (
            <Button
              disabled={loading}
              onClick={() => handlePayment(booking.id)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              Pay Now
            </Button>
          )}

        {booking.status === "COMPLETED" && showReviewButton && (
          <Button
            className="flex-1"
            onClick={() => handleReviewButtonClick(booking.id)}
          >
            Rate & Review
          </Button>
        )}

        <ReviewFormDialog
          open={openReviewDialog}
          onOpenChange={setOpenReviewDialog}
          bookingId={bookingId}
          onSuccess={() => setShowReviewButton(false)}
        />
      </CardFooter>
    </Card>
  );
}
