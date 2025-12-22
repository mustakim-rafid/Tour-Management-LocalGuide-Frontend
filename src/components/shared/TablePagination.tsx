"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LimitSelect } from "./LimitSelect";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
}

const TablePagination = ({ currentPage, totalPages }: TablePaginationProps) => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  if (totalPages <= 1 && currentPage === 1) {
    return (
      <div className="flex justify-center items-center">
        <LimitSelect />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-2">
      <div className="flex items-center gap-1 overflow-x-auto">
        {/* Previous */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage <= 1 || isPending}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        {/* Page Numbers */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
          let pageNumber;

          if (totalPages <= 5) {
            pageNumber = index + 1;
          } else if (currentPage <= 3) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + index;
          } else {
            pageNumber = currentPage - 2 + index;
          }

          return (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? "default" : "outline"}
              size="sm"
              onClick={() => navigateToPage(pageNumber)}
              disabled={isPending}
              className="w-9"
            >
              {pageNumber}
            </Button>
          );
        })}

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage >= totalPages || isPending}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Page info + LimitSelect */}
      <div className="flex items-center gap-2 justify-center">
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <LimitSelect />
      </div>
    </div>
  );
};

export default TablePagination;
