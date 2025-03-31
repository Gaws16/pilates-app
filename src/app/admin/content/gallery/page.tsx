"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ImageUploader from "@/components/Admin/ImageUploader";
import Image from "next/image";
import type { Database } from "@/lib/database.types";

interface GalleryImage {
  id: string;
  url: string;
  title: string | null;
  created_at: string;
}

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching images");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = () => {
    fetchImages();
  };

  const handleDeleteImage = async (image: GalleryImage) => {
    try {
      // Extract file path from URL
      const url = new URL(image.url);
      const filePath = url.pathname.split("/").slice(-2).join("/");

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("images")
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("gallery")
        .delete()
        .eq("id", image.id);

      if (dbError) throw dbError;

      // Update state
      setImages(images.filter((img) => img.id !== image.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error deleting image");
    }
  };

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold text-[#a17d60]">Gallery Management</h1>

      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">{error}</div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ImageUploader onUploadComplete={handleImageUpload} />

        <div>
          <h2 className="mb-4 text-xl font-semibold">Gallery Images</h2>
          {loading ? (
            <p>Loading images...</p>
          ) : images.length === 0 ? (
            <p>No images in the gallery</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="relative h-40 w-full overflow-hidden rounded-md">
                    <Image
                      src={image.url}
                      alt={image.title || "Gallery image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={() => handleDeleteImage(image)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity text-white"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
