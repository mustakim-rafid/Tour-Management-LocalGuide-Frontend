export const dynamic = "force-dynamic";

import TourGrid from "@/components/modules/tour/TourGrid";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { formatQueryParams } from "@/lib/formatters";
import { getAllTours } from "@/services/tour/tour.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Guide – Tours",
}

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

  const tourFeeRanges = [
    { label: "Below 500 BDT", value: "lt500" },
    { label: "500 - 1000 BDT", value: "500-1000" },
    { label: "1000 - 2000 BDT", value: "1000-2000" },
    { label: "2000 - 5000 BDT", value: "2000-5000" },
    { label: "Above 5000 BDT", value: "gt5000" },
  ];

  return (
    <section className="py-10 bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Explore Tours
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover exciting travel experiences and book your next adventure
            with expert local guides.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <SearchFilter />

          <SelectFilter
            paramName="tourFeeRange"
            placeholder="Tour fee range"
            options={tourFeeRanges}
          />

          <RefreshButton />
        </div>

        {/* Tour Grid */}
        <div>
          <TourGrid tours={tours} />
        </div>

        {/* Pagination */}
        <div className="pt-6">
          <TablePagination
            currentPage={toursResponse?.meta?.page || 1}
            totalPages={totalPages || 1}
          />
        </div>
      </div>
    </section>
  );
};

export default ToursPage;
