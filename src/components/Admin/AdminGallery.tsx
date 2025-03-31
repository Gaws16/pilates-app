"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";
import Title from "../Common/Title";

export default function AdminGallery() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch images from Supabase Storage
  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("site-images")
      .list("gallery");
    console.log("data", data);
    if (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
      return;
    }

    // Convert file paths to public URLs
    const urls = data.map(
      (file) =>
        supabase.storage
          .from("site-images")
          .getPublicUrl(`gallery/${file.name}`).data.publicUrl
    );
    setImages(urls);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Image Load Handlers
  const handleImageLoad = (index: number) =>
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  const handleModalImageLoad = () => setModalImageLoaded(true);

  // Navigation
  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : images.length - 1
    );
  const nextImage = () =>
    setCurrentIndex((prev) =>
      prev !== null && prev < images.length - 1 ? prev + 1 : 0
    );

  // Delete Image
  const deleteImage = async (imageUrl: string, index: number) => {
    const fileName = imageUrl.split("/").pop(); // Extract filename from URL
    const { error } = await supabase.storage
      .from("site-images")
      .remove([`gallery/${fileName}`]);

    if (error) {
      console.error("Error deleting image:", error);
      return;
    }

    // Remove the deleted image from state
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Title title="Галерия" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 wide:grid-cols-4 gap-4 m-12">
        {loading && <p>Loading images...</p>}
        {images.map((src, index) => (
          <Dialog
            key={index}
            open={currentIndex === index}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setCurrentIndex(null);
                setModalImageLoaded(false);
              }
            }}
          >
            <DialogTrigger asChild>
              <div className="w-full h-60 relative overflow-hidden rounded-md bg-gray-200">
                {!loadedImages[index] && (
                  <div className="absolute inset-0 animate-pulse bg-gray-300 rounded-md" />
                )}
                <Image
                  src={src}
                  fill
                  alt={`Thumbnail ${index + 1}`}
                  className={`object-cover transition-opacity duration-300 ${
                    loadedImages[index] ? "opacity-100" : "opacity-0"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="bg-black/90 flex flex-col items-center justify-center p-6 max-w-[90vw] h-[90vh]">
              <DialogTitle className="text-white text-2xl mb-2">
                Image {currentIndex !== null ? currentIndex + 1 : ""}
              </DialogTitle>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-[80vw] max-h-[80vh] flex justify-center items-center"
              >
                <Image
                  src={images[currentIndex ?? 0]}
                  alt="Large view"
                  width={900}
                  height={600}
                  priority
                  quality={100}
                  className={`rounded-md object-contain max-w-full max-h-[80vh] transition-opacity duration-300 ${
                    modalImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={handleModalImageLoad}
                />
              </motion.div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Button variant="ghost" size="icon" onClick={prevImage}>
                  <ChevronLeft className="w-6 h-6 text-white" />
                </Button>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Button variant="ghost" size="icon" onClick={nextImage}>
                  <ChevronRight className="w-6 h-6 text-white" />
                </Button>
              </div>
              {/* Delete Button */}
              <div className="absolute bottom-4 right-4">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() =>
                    deleteImage(images[currentIndex ?? 0], currentIndex ?? 0)
                  }
                >
                  <Trash2 className="w-6 h-6 text-white" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  );
}
