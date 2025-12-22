import BookingGrid from "@/components/modules/tourist/booking/BookingGrid";
import SelectFilter from "@/components/shared/SelectFilter";
import { formatQueryParams } from "@/lib/formatters";
import { getTouristBookings } from "@/services/booking/booking.service";
import { BookingStatus } from "@/types/booking.interface";

const BookedTours = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObj = await searchParams;
  const queryString = formatQueryParams(queryParamsObj);

  const result = await getTouristBookings(queryString);

  const bookingStatusFilterData: { label: string; value: BookingStatus }[] = [
    { label: "Pending", value: "PENDING" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          My Trips
        </h1>
        <SelectFilter
          paramName="status"
          placeholder="Select booking status"
          options={bookingStatusFilterData.map((status) => ({
            label: status.label,
            value: status.value,
          }))}
        />
        <BookingGrid bookings={result.data} />
      </div>
    </div>
  );
};

export default BookedTours;
