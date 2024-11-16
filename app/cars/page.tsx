import { Suspense } from "react";
import { CarsList } from "./cars-list";
import SearchInput from "@/components/search-input";

export default function CarsPage({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SearchInput />
      </div>

      <Suspense fallback={<CarsListSkeleton />}>
        <CarsList search={searchParams.search} />
      </Suspense>
    </div>
  );
}

function CarsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="h-6 w-16 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 