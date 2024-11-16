import Image from "next/image";
import Link from "next/link";
import { Car } from "@/lib/types";

export default function CarCard({ car }: { car: Car }) {
    console.log(car.images);
  return (
    <Link 
      href={`/cars/${car._id}`}
      className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      <div className="relative h-48">
        <Image
          src={car.images[0]}
          alt={car.title}
          fill
          className="object-cover"
        />
        {car.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
            +{car.images.length - 1}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg">{car.title}</h3>
        <p className="text-gray-600 line-clamp-2 text-sm mt-1">
          {car.description}
        </p>
        
        <div className="flex gap-2 mt-3">
          {Object.entries(car.tags).map(([key, value]) => (
            <span 
              key={key}
              className="px-2 py-1 bg-gray-100 text-sm rounded font-semibold"
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
} 