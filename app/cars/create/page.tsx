"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CarFormData, carSchema } from "@/lib/validations";
import ImageUpload from "@/components/image-upload";
import { toast } from "sonner";

export default function CreateCar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      images: [],
      tags: {
        car_type: "",
        company: "",
        dealer: "",
      },
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
      console.log("Submitting data:", data);

      const response = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create car");
      }

      toast.success("Car created successfully!");
      router.push("/cars");
      router.refresh();
    } catch (error) {
      console.error("Error creating car:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create car");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (urls: string[]) => {
    console.log()
    console.log("New images:", urls);
    setValue("images", urls);
    trigger("images");
  };

  const handleImageRemove = (url: string) => {
    const newImages = images.filter((current) => current !== url);
    console.log("After removal:", newImages);
    setValue("images", newImages);
    trigger("images");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Add New Car</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label className="block mb-2 font-medium">
            Images <span className="text-red-500">*</span>
          </label>
          <ImageUpload
            value={images}
            onChange={handleImageChange}
            onRemove={handleImageRemove}
          />
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Upload up to 10 images. First image will be the cover.
          </p>
        </div>

        <div>
          <label className="block mb-2">Title</label>
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
          <label className="block mb-2">Description</label>
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

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">Car Type</label>
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
            <label className="block mb-2">Company</label>
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
            <label className="block mb-2">Dealer</label>
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

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Creating...
              </span>
            ) : (
              "Create Car"
            )}
          </button>
          
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border rounded hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 