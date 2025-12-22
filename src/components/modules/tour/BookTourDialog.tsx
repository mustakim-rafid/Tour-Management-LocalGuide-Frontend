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
          <DialogTitle className="text-xl font-semibold">Book Tour</DialogTitle>
          <p className="text-sm text-muted-foreground">{tour.title}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tour Image */}
          <div className="relative w-full h-56 rounded-xl overflow-hidden border shadow-sm">
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
          <div className="rounded-lg border bg-muted/30 p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">
                {format(new Date(tour.tourDate), "EEEE, MMMM d, yyyy")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Fee</span>
              <span className="font-medium">BDT {tour.tourFee}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{tour.duration}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Meeting Point</span>
              <span className="font-medium text-right">
                {tour.meetingPoint}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Max Group Size</span>
              <span className="font-medium">{tour.maxGroupSize}</span>
            </div>

            {tour.guide && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guide</span>
                <span className="font-medium">
                  {tour.guide.name} ({tour.guide.experienceYears} yrs exp)
                </span>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to book this tour? You can cancel it anytime
            before payment.
          </p>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onConfirm(tour.id)}>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
