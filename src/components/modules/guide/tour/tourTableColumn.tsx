import { Column } from "@/components/shared/ManagementTable";
import { formatDate } from "@/lib/formatters";
import { ITour } from "@/types/tour.interface";

export const tourTableColumn: Column<ITour>[] = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Tour Fee",
    accessor: (tour) => `BDT ${tour.tourFee}`,
  },
  {
    header: "Duration",
    accessor: (tour) => tour.duration,
  },
  {
    header: "Meeting Point",
    accessor: "meetingPoint",
  },
  {
    header: "Max Group Size",
    accessor: (tour) => `${tour.maxGroupSize} people`,
  },
  {
    header: "Tour Date",
    accessor: (tour) => formatDate(tour.tourDate),
  },
  {
    header: "Image",
    accessor: (tour) => (
      <img
        src={tour.image}
        alt={tour.title}
        className="h-12 w-12 object-cover rounded"
      />
    ),
  },
  {
    header: "Created",
    accessor: (tour) => formatDate(tour.createdAt),
  },
];
