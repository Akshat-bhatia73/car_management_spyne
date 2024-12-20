import { Suspense } from "react";
import { CarsList } from "@/components/cars-list";
import SearchInput from "@/components/search-input";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Car Management</h1>
        <p className="text-gray-600 mb-8 text-center">
          Please sign in to manage your car listings
        </p>
        <Link
          href="/sign-in"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <SearchInput />

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
