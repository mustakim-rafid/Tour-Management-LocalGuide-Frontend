import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Calendar, Star, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { guideDashboardInfo } from "@/services/dashboard/guideDashboardInfo"
import { IGuideDashboardInfo } from "@/types/dashboard.interface";

const Guidedashboard = async () => {
  const result = await guideDashboardInfo()

  const { upcomingTours, rating, latestReviews, completedTours } = result.data as IGuideDashboardInfo;

  return (
    <div className="p-6 space-y-6">

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Average Rating */}
        <Card className="p-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{rating.toFixed(1)}</p>
          </CardContent>
        </Card>

        {/* Upcoming Tours Count */}
        <Card className="p-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              Upcoming Tours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{upcomingTours.length}</p>
          </CardContent>
        </Card>

        {/* Completed Tours */}
        <Card className="p-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Tours Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{completedTours}</p>
          </CardContent>
        </Card>

      </div>

      {/* Upcoming Tours + Latest Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Upcoming Tours */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Your Upcoming Tours</CardTitle>
          </CardHeader>
          <Separator />

          <ScrollArea className="max-h-80">
            <CardContent className="space-y-4 pt-4">
              {upcomingTours.length === 0 && (
                <p className="text-gray-500 text-sm">No upcoming tours.</p>
              )}

              {upcomingTours.map((tour) => (
                <div key={tour.id} className="border p-3 rounded-md bg-muted/10">
                  <p className="font-semibold text-sm">{tour.title}</p>

                  <div className="flex items-center gap-2 text-xs mt-1 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(tour.tourDate), "PPP")}
                  </div>

                  <Badge variant="outline" className="mt-2">
                    {tour.meetingPoint}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Latest Reviews */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Reviews</CardTitle>
          </CardHeader>
          <Separator />

          <ScrollArea className="max-h-80">
            <CardContent className="space-y-4 pt-4">

              {latestReviews.length === 0 && (
                <p className="text-gray-500 text-sm">No reviews yet.</p>
              )}

              {latestReviews.map((review) => (
                <div key={review.id} className="border p-3 rounded-md">

                  <p className="text-xs text-gray-600 mb-1">
                    From: <span className="font-medium">{review.tourist.name}</span>
                  </p>

                  <p className="font-semibold text-sm">
                    ⭐ {review.rating}/5
                  </p>

                  <p className="text-sm mt-1 text-gray-700">
                    {review.comment}
                  </p>

                </div>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>

      </div>
    </div>
  )
}

export default Guidedashboard