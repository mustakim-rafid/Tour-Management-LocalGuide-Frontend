import { IBooking } from "@/types/booking.interface";
import BookingCard from "./BookingCard";

interface BookingGridProps {
  bookings: IBooking[];
}

export default function BookingGrid({ bookings }: BookingGridProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No bookings found.</p>
        <p className="text-sm text-muted-foreground mt-2">
          You haven't booked any tours yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
