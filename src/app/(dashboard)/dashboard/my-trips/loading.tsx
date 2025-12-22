import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const MyTripsPageSkeleton = () => {
  const sk = "bg-slate-300 dark:bg-gray-700";

  return (
    <section className="py-10 bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <Skeleton className={`h-10 w-60 ${sk}`} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <Skeleton className={`h-10 w-64 ${sk}`} />
        </div>

        {/* Tour Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="flex flex-col overflow-hidden">
              {/* Image */}
              <Skeleton className={`h-80 w-full rounded-none ${sk}`} />

              {/* Header */}
              <CardHeader className="space-y-3">
                <Skeleton className={`h-5 w-3/4 ${sk}`} />
                <Skeleton className={`h-4 w-full ${sk}`} />
                <Skeleton className={`h-4 w-5/6 ${sk}`} />

                <div className="flex items-center gap-2 pt-2">
                  <Skeleton className={`h-4 w-4 rounded-full ${sk}`} />
                  <Skeleton className={`h-4 w-10 ${sk}`} />
                  <Skeleton className={`h-5 w-24 rounded-full ${sk}`} />
                </div>
              </CardHeader>

              {/* Content */}
              <CardContent className="space-y-4 flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton className={`h-4 w-4 ${sk}`} />
                  <Skeleton className={`h-4 w-32 ${sk}`} />
                </div>

                <div className="flex items-start gap-2">
                  <Skeleton className={`h-4 w-4 mt-1 ${sk}`} />
                  <Skeleton className={`h-4 w-full ${sk}`} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className={`h-4 w-4 ${sk}`} />
                    <Skeleton className={`h-4 w-20 ${sk}`} />
                  </div>
                  <Skeleton className={`h-4 w-20 ${sk}`} />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className={`h-4 w-4 ${sk}`} />
                  <Skeleton className={`h-5 w-24 ${sk}`} />
                </div>
              </CardContent>

              {/* Footer */}
              <CardFooter className="border-t flex gap-2">
                <Skeleton className={`h-10 flex-1 ${sk}`} />
                <Skeleton className={`h-10 flex-1 ${sk}`} />
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="pt-6 flex justify-center gap-2">
          <Skeleton className={`h-9 w-24 ${sk}`} />
          <Skeleton className={`h-9 w-24 ${sk}`} />
        </div>
      </div>
    </section>
  );
}

export default MyTripsPageSkeleton
