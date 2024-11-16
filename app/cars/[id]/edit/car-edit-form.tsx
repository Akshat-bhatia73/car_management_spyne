"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CarFormData, carSchema } from "@/lib/validations";
import { Car } from "@/lib/types";
import ImageUpload from "@/components/image-upload";
import { toast } from "sonner";

export default function CarEditForm({ car }: { car: Car }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      title: car.title,
      description: car.description,
      images: car.images,
      tags: car.tags,
    },
  });

  const images = watch("images");

  const onSubmit = async (data: CarFormData) => {
    try {
      if (data.images.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }

      setLoading(true);
      const response = await fetch(`/api/cars/${car._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update car");
      }

      toast.success("Car updated successfully!");
      router.push(`/cars/${car._id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Edit Car</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label className="block mb-2 font-medium">
            Images <span className="text-red-500">*</span>
          </label>
          <ImageUpload
            value={images}
            onChange={(urls) => setValue("images", urls)}
            onRemove={(url) =>
              setValue(
                "images",
                images.filter((current) => current !== url)
              )
            }
          />
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Upload up to 10 images. First image will be the cover.
          </p>
        </div>

        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            {...register("title")}
            className="w-full p-2 border rounded"
            placeholder="Enter car title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Enter car description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 font-medium">Car Type</label>
            <input
              {...register("tags.car_type")}
              className="w-full p-2 border rounded"
              placeholder="e.g., SUV, Sedan"
            />
            {errors.tags?.car_type && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tags.car_type.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Company</label>
            <input
              {...register("tags.company")}
              className="w-full p-2 border rounded"
              placeholder="e.g., Toyota, BMW"
            />
            {errors.tags?.company && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tags.company.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Dealer</label>
            <input
              {...register("tags.dealer")}
              className="w-full p-2 border rounded"
              placeholder="Enter dealer name"
            />
            {errors.tags?.dealer && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tags.dealer.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}