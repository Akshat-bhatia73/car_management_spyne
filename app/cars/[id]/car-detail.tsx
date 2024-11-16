"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Car } from "@/lib/types";
import DeleteModal from "@/components/delete-modal";

export default function CarDetail({ car }: { car: Car }) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tag_name_map = {
    'car_type': 'Car Type',
    'dealer': 'Dealer',
    'company': 'Company',
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{car.title}</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/cars/${car._id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="relative h-[400px] mb-4">
          <Image
            src={car.images[currentImageIndex]}
            alt={car.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        {car.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {car.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-20 h-20 flex-shrink-0 ${
                  index === currentImageIndex ? "ring-2 ring-blue-600" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`${car.title} - Image ${index + 1}`}
                  fill
                  className="object-cover rounded"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{car.description}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Tags</h2>
          <div className="flex gap-2">
            {Object.entries(car.tags).map(([key, value]) => (
              <span
                key={key}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                <span className="font-semibold">{tag_name_map[key as keyof typeof tag_name_map]}</span>: {value}
              </span>
            ))}
          </div>
        </div>
      </div>

      <DeleteModal
        carId={car._id}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
} 