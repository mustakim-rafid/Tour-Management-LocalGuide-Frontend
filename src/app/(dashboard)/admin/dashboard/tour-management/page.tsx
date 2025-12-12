import AdminTourCard from "@/components/modules/admin/tour/AdminTourCard";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { formatQueryParams } from "@/lib/formatters";
import { getAllTours } from "@/services/tour/tour.service";
import { ITour } from "@/types/tour.interface";

const AdminTourManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObj = await searchParams;
  const queryString = formatQueryParams(queryParamsObj);

  const toursResponse = await getAllTours(queryString);

  const tours = toursResponse?.data || [];

  const totalPages = Math.ceil(
    toursResponse.meta.total / toursResponse.meta.limit
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tour Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage all tours, monitor bookings, and ensure a smooth experience
            for guides and travelers.
          </p>
        </div>

        <div className="flex gap-3">
          <SearchFilter />
          <RefreshButton />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour: ITour) => (
            <AdminTourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <TablePagination
          currentPage={toursResponse?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </div>
    </div>
  );
};

export default AdminTourManagementPage;
