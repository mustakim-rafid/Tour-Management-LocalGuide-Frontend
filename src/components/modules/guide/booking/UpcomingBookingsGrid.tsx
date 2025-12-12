import { ITour } from "@/types/tour.interface";
import UpcomingBookingsCard from "./UpcomingBookingsCard";

interface UpcomingBookingsGridProps {
  tours: ITour[];
}

export default function UpcomingBookingsGrid({ tours }: UpcomingBookingsGridProps) {
  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No upcoming bookings.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <UpcomingBookingsCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
