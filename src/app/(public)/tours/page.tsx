export const dynamic = "force-dynamic"; 

import TourGrid from "@/components/modules/tour/TourGrid";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { formatQueryParams } from "@/lib/formatters";
import { getAllTours } from "@/services/tour/tour.service";

const ToursPage = async ({
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

  const tourFeeRanges: { label: string; value: string }[] = [
    { label: "Below 500 BDT", value: "lt500" },
    { label: "500 - 1000 BDT", value: "500-1000" },
    { label: "1000 - 2000 BDT", value: "1000-2000" },
    { label: "2000 - 5000 BDT", value: "2000-5000" },
    { label: "Above 5000 BDT", value: "gt5000" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Tours</h1>
          <p className="text-muted-foreground mt-2">
            Discover exciting travel experiences and book your next adventure
            with our expert guides
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <SearchFilter />

          <SelectFilter
            paramName="tourFeeRange"
            placeholder="Select tour fee range"
            options={tourFeeRanges.map((eachRange) => ({
              label: eachRange.label,
              value: eachRange.value,
            }))}
          />

          <RefreshButton />
        </div>

        {/* Tour Grid */}
        <TourGrid tours={tours} />

        {/* Pagination */}
        <TablePagination
          currentPage={toursResponse?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </div>
    </div>
  );
};

export default ToursPage;
