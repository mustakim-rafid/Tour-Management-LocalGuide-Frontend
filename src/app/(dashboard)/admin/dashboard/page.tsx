import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, MapPin, Calendar, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { adminDashboardInfo } from "@/services/dashboard/adminDashboardInfo";
import { IRecentBooking, IUpcomingTour } from "@/types/dashboard.interface";

const AdminDashboardPage = async () => {
  const result = await adminDashboardInfo();

  const { users, counts, upcomingTours, recentBookings } = result.data;

  return (
    <div className="p-6 space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{users.guides}</p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              Tourists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{users.tourists}</p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{users.admins}</p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              Total Tours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{counts.tours}</p>
          </CardContent>
        </Card>
      </div>

      {/* Booking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-red-500" />
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{counts.bookings}</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Tours & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tours */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">
              Upcoming Tours (Next 7 Days)
            </CardTitle>
          </CardHeader>
          <Separator />
          <ScrollArea className="max-h-80">
            <CardContent className="space-y-4 pt-4">
              {upcomingTours.length === 0 && (
                <p className="text-gray-500 text-sm">No upcoming tours.</p>
              )}

              {upcomingTours.map((tour: IUpcomingTour) => (
                <div key={tour.id} className="border p-3 rounded-md">
                  <p className="font-semibold text-sm">{tour.title}</p>

                  <div className="flex items-center gap-2 text-xs mt-1 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(tour.tourDate), "PPP")}
                  </div>

                  <div className="flex items-center gap-2 text-xs mt-1">
                    <Badge variant="secondary">{tour.guide?.name}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Recent Bookings */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Bookings Activity</CardTitle>
          </CardHeader>
          <Separator />

          <ScrollArea className="max-h-80">
            <CardContent className="space-y-4 pt-4">
              {recentBookings.length === 0 && (
                <p className="text-gray-500 text-sm">No recent bookings.</p>
              )}

              {recentBookings.map((booking: IRecentBooking) => (
                <div key={booking.id} className="border p-3 rounded-md">
                  <p className="font-semibold text-sm">{booking.tour.title}</p>

                  <p className="text-xs text-gray-600 mt-1">
                    Tourist:{" "}
                    <span className="font-medium">{booking.tourist.name}</span>
                  </p>

                  <p className="text-xs text-gray-600">
                    Booked on: {format(new Date(booking.createdAt), "PPP")}
                  </p>
                </div>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
