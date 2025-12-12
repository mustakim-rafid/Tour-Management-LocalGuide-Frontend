"use client";

import { ITour } from "@/types/tour.interface";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Timer,
  Info,
  ImageIcon,
} from "lucide-react";
import InfoRow from "@/components/shared/InfoRow";
import { formatDate } from "@/lib/formatters";

interface TourViewDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: ITour;
}

const TourViewDetailsDialog = ({
  open,
  onOpenChange,
  tour,
}: TourViewDetailsDialogProps) => {
  if (!tour) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-full 
          max-w-4xl 
          max-h-[90vh] 
          flex 
          flex-col 
          p-0 
          sm:rounded-lg
          px-1
        "
      >
        <DialogHeader className="px-4 sm:px-6 pt-6 pb-4">
          <DialogTitle>Tour Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6 space-y-6">
          {/* Tour Header */}
          <div
            className="
                flex
                flex-col
                gap-4
                py-4
                from-green-50 to-blue-50
                dark:from-green-950 dark:to-blue-950
                rounded-lg
            "
          >
            <div className="relative w-full h-56 sm:h-72 rounded-lg overflow-hidden shadow-lg border-4 border-white bg-muted">
              {tour.image ? (
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <ImageIcon className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {tour.title}
              </h2>

              <Badge variant="secondary" className="text-xs sm:text-sm">
                Tour Event
              </Badge>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-lg">Description</h3>
            </div>

            <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg leading-relaxed">
              {tour.description}
            </p>
          </div>

          <Separator />

          {/* Tour Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-lg">Tour Information</h3>
            </div>

            <div
              className="
                grid 
                grid-cols-1 
                md:grid-cols-2 
                gap-4 
                bg-muted/50 
                p-4 
                rounded-lg
              "
            >
              <div className="flex items-start gap-3">
                <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Tour Fee" value={`BDT ${tour.tourFee}`} />
              </div>

              <div className="flex items-start gap-3">
                <Timer className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Duration" value={tour.duration} />
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow
                  label="Max Group Size"
                  value={`${tour.maxGroupSize} People`}
                />
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Tour Date" value={formatDate(tour.tourDate)} />
              </div>

              <div className="flex items-start gap-3 md:col-span-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow
                  label="Meeting Point"
                  value={tour.meetingPoint || "Not provided"}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* System Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-lg">System Information</h3>
            </div>

            <div
              className="
                grid 
                grid-cols-1 
                md:grid-cols-2 
                gap-4 
                bg-muted/50 
                p-4 
                rounded-lg
              "
            >
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow
                  label="Created On"
                  value={formatDate(tour.createdAt || "")}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourViewDetailsDialog;
