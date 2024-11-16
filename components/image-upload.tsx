import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const uploadToCloudinary = async (files: File[]) => {
    try {
      setLoading(true);
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'spyne_ai_preset');

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newUrls = [...value, ...uploadedUrls].slice(0, 10);
      onChange(newUrls);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = 10 - value.length;
    const validFiles = files
      .slice(0, remainingSlots)
      .filter(file => file.type.startsWith('image/'));

    if (validFiles.length > 0) {
      uploadToCloudinary(validFiles);
    }

    // Reset the input
    event.target.value = '';
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-2 right-2 z-10">
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="bg-red-500 p-1 rounded-full hover:bg-red-600 transition"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
            <Image
              fill
              className="object-cover rounded-lg"
              alt="Car image"
              src={url}
            />
          </div>
        ))}
      </div>
      {value.length < 10 && (
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={loading}
            className="absolute inset-0 opacity-0 cursor-pointer"
            aria-label="Upload images"
          />
          <button
            type="button"
            disabled={loading}
            className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg hover:border-blue-500 transition w-full"
          >
            <ImagePlus className="h-4 w-4" />
            {loading ? (
              "Uploading..."
            ) : (
              `Upload Images (${10 - value.length} remaining)`
            )}
          </button>
        </div>
      )}
    </div>
  );
}
