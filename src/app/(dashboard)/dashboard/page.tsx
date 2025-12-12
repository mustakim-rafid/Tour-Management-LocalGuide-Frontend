import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar, DollarSign, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { touristDashboardInfo } from "@/services/dashboard/touristDashboardInfo";
import { ITouristDashboardInfo } from "@/types/dashboard.interface";

const TouristDashboardPage = async () => {
  const result = await touristDashboardInfo();

  const { upcomingBookings, completedTours, pendingPayments, recentBookings } =
    result.data as ITouristDashboardInfo;

  return (
    <div className="p-6 space-y-6">
      {/* TOP STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Upcoming Bookings */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              Upcoming Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{upcomingBookings.length}</p>
          </CardContent>
        </Card>

        {/* Completed Tours */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-green-500" />
              Completed Tours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completedTours.length}</p>
          </CardContent>
        </Card>

        {/* Pending Payments */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-red-500" />
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pendingPayments.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* UPCOMING BOOKINGS */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Bookings</CardTitle>
        </CardHeader>
        <Separator />
        <ScrollArea className="max-h-80">
          <CardContent className="space-y-4 pt-4">
            {upcomingBookings.length === 0 && (
              <p className="text-gray-500 text-sm">No upcoming bookings.</p>
            )}

            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="border p-3 rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{booking.tour.title}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Guide:{" "}
                    <span className="font-medium">
                      {booking.tour.guide.name}
                    </span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Date: {format(new Date(booking.tour.tourDate), "PPP")}
                  </p>
                </div>
                <Badge
                  className={
                    booking.status === "CONFIRMED"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-black"
                  }
                >
                  {booking.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>

      {/* COMPLETED TOURS */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Completed Tours</CardTitle>
        </CardHeader>
        <Separator />
        <ScrollArea className="max-h-80">
          <CardContent className="space-y-4 pt-4">
            {completedTours.length === 0 && (
              <p className="text-gray-500 text-sm">No completed tours yet.</p>
            )}

            {completedTours.map((tour) => (
              <div
                key={tour.id}
                className="border p-3 rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{tour.tour.title}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Guide:{" "}
                    <span className="font-medium">{tour.tour.guide.name}</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Date: {format(new Date(tour.tour.tourDate), "PPP")}
                  </p>
                </div>
                <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                  Write Review
                </button>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>

      {/* RECENT BOOKINGS */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Booking History</CardTitle>
        </CardHeader>
        <Separator />
        <ScrollArea className="max-h-80">
          <CardContent className="space-y-4 pt-4">
            {recentBookings.length === 0 && (
              <p className="text-gray-500 text-sm">No recent bookings.</p>
            )}

            {recentBookings.map((booking) => (
              <div key={booking.id} className="border p-3 rounded-md">
                <p className="font-semibold">{booking.tour.title}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Date: {format(new Date(booking.tour.tourDate), "PPP")}
                </p>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default TouristDashboardPage;
