"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ITour } from "@/types/tour.interface";
import Image from "next/image";
import { format } from "date-fns";

interface TourBookingDialogProps {
  tour: ITour;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (tourId: string) => void;
}

export default function BookTourDialog({
  tour,
  isOpen,
  onClose,
  onConfirm,
}: TourBookingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Tour: {tour.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tour Image */}
          <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-md">
            {tour.image ? (
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-muted text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          {/* Tour Details */}
          <div className="space-y-2">
            <p>
              <span className="font-medium">Date:</span>{" "}
              {format(new Date(tour.tourDate), "EEEE, MMMM d, yyyy")}
            </p>
            <p>
              <span className="font-medium">Fee:</span> BDT {tour.tourFee}
            </p>
            <p>
              <span className="font-medium">Duration:</span> {tour.duration}
            </p>
            <p>
              <span className="font-medium">Meeting Point:</span>{" "}
              {tour.meetingPoint}
            </p>
            <p>
              <span className="font-medium">Max Group Size:</span>{" "}
              {tour.maxGroupSize}
            </p>
            {tour.guide && (
              <p>
                <span className="font-medium">Guide:</span> {tour.guide.name}{" "}
                ({tour.guide.experienceYears} yrs exp)
              </p>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            Are you sure you want to book this tour? You can cancel it anytime
            before payment.
          </p>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onConfirm(tour.id)}>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
