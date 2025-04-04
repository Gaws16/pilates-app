"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";
import Title from "../Common/Title";
import { supabase } from "@/lib/supabase";

/*const images = [
  "/Images/Picture1.jpg",
  "/Images/Picture2.jpg",
  "/Images/Picture3.jpg",
  "/Images/Picture4.jpg",
  "/Images/Picture5.jpg",
  "/Images/Picture6.jpg",
  "/Images/Picture7.jpg",
  "/Images/Picture8.jpg",
  "/Images/Picture9.jpg",
  "/Images/Picture10.jpg",
];*/
interface GalleryImage {
  id: string;
  url: string;
  title: string | null;
}
export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setImages(data);
      }
    };

    fetchImages();
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const handleModalImageLoad = () => {
    setModalImageLoaded(true);
  };

  const prevImage = () => {
    setModalImageLoaded(false);
    setCurrentIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : images.length - 1
    );
  };

  const nextImage = () => {
    setModalImageLoaded(false);
    setCurrentIndex((prev) =>
      prev !== null && prev < images.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <>
      <Title title="Галерия" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 wide:grid-cols-4 gap-4 m-12">
        {images.map((image, index) => (
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
                  src={image.url}
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
            <DialogContent className="bg-black/90 flex flex-col items-center justify-center p-6 max-w-[90vw] h-[90vh] md:">
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
                  src={images[currentIndex ?? 0].url}
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
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  );
}
