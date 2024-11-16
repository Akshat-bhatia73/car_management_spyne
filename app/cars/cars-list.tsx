import { getCars } from "@/lib/actions";
import CarCard from "@/components/car-card";
import { Car } from "@/lib/types";

export async function CarsList({ search }: { search?: string }) {
  const rawCars = await getCars(search);
  const cars = rawCars as unknown as Car[];
  
  if (cars.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No cars found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car._id} car={car} />
      ))}
    </div>
  );
} 