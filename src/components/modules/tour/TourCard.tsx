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
import { ITour } from "@/types/tour.interface";
import { Calendar, DollarSign, Eye, Loader2, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { getCookie } from "@/services/auth/tokenHandlers";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import BookTourDialog from "./BookTourDialog";
import { createBooking } from "@/services/booking/booking.service";

interface TourCardProps {
  tour: ITour;
}

export default function TourCard({ tour }: TourCardProps) {
  const [openBooking, setOpenBooking] = useState(false);
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathName = usePathname()

  const handleBookTourClicked = async () => {
    setLoading(true)
    try {
        const accessToken = await getCookie("accessToken")

    if(!accessToken) {
        router.push(`/login?redirect=${pathName}`);
        return
    }

    setOpenBooking(true)
    } catch (error) {
        console.error(error)
        toast.error("Something went wrong after trying to book tour")
    } finally {
        setLoading(false)
    }
  }

  const handleBookTourConfirm = async (tourId: string) => {
    try {
        const result = await createBooking({tourId})
        if (!result.success) {
            toast.error(result.message || "Tour booking failed")
            return
        }
        toast.success(result.message)
        router.push("/dashboard/my-trips")
    } catch (error) {
        console.error(error)
        toast.error("Something went wrong while confirming booking")
    }
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={tour.image || "/placeholder.png"}
            alt={tour.title}
            fill
            className="object-cover"
          />
        </div>

        <CardHeader>
          <CardTitle className="text-lg line-clamp-1">{tour.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {tour.description}
          </CardDescription>

          {tour.guide && (
            <div className="flex items-center gap-2 mt-2 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">
                {tour.guide.avrgRating?.toFixed(1) || "N/A"}
              </span>

              <Badge variant="secondary" className="text-xs">
                Guide: {tour.guide.name}
              </Badge>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-3 pb-3 text-sm">
          {/* Tour date */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(tour.tourDate), "PPP")}</span>
          </div>

          {/* Meeting Point */}
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5" />
            <span className="line-clamp-1">{tour.meetingPoint}</span>
          </div>

          {/* Duration + Group size */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{tour.maxGroupSize} people</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <span>{tour.duration}</span>
            </div>
          </div>

          {/* Fee */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span className="font-semibold text-foreground">
              BDT {tour.tourFee}
            </span>
          </div>
        </CardContent>

        <CardFooter className="border-t flex gap-2">
          <Link className="flex-1" href={`/tours/${tour.id}`}>
            <Button variant="outline" className="w-full dark:hover:text-gray-300">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>

          <Button className="flex-1" onClick={handleBookTourClicked}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Book Tour"}
          </Button>
        </CardFooter>
      </Card>

      {/* Booking Dialog */}
      <BookTourDialog
        tour={tour}
        isOpen={openBooking}
        onClose={() => setOpenBooking(false)}
        onConfirm={handleBookTourConfirm}
      />
    </>
  );
}
