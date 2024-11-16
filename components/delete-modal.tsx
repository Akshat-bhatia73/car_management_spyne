"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteModalProps {
  carId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteModal({ carId, isOpen, onClose }: DeleteModalProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/cars/${carId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      router.push("/cars");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Delete Car</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this car? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
} 