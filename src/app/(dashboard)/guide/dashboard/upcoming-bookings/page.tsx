import UpcomingBookingsGrid from "@/components/modules/guide/booking/UpcomingBookingsGrid";
import { getGuideTours } from "@/services/tour/tour.service";

const UpcomingBookingsPage = async () => {
  const upcomingBookings = await getGuideTours("status=CONFIRMED");

  return (
    <div className="p-4 space-y-5">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Upcoming Bookings
      </h1>
      <UpcomingBookingsGrid tours={upcomingBookings.data} />
    </div>
  );
};

export default UpcomingBookingsPage;
