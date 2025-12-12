import { ITour } from "@/types/tour.interface";
import PendingRequestCard from "./PendingRequestCard";

interface PendingRequestsGridProps {
  tours: ITour[];
}

export default function PendingRequestsGrid({ tours }: PendingRequestsGridProps) {
  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No pending booking requests.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <PendingRequestCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
