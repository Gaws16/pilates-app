"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";
import Title from "../Common/Title";

const images = [
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
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : images.length - 1
    );

  const nextImage = () =>
    setCurrentIndex((prev) =>
      prev !== null && prev < images.length - 1 ? prev + 1 : 0
    );

  return (
    <>
      <Title title="Галерия" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 wide:grid-cols-4 gap-4 m-12">
        {images.map((src, index) => (
          <Dialog
            key={index}
            open={currentIndex === index}
            onOpenChange={(isOpen) => !isOpen && setCurrentIndex(null)}
          >
            <DialogTrigger asChild>
              <div className="w-full  h-60 relative overflow-hidden rounded-md">
                <Image
                  src={src}
                  fill
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover"
                  onClick={() => setCurrentIndex(index)}
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
                  src={images[currentIndex ?? 0]}
                  alt="Large view"
                  width={900}
                  height={600}
                  priority
                  quality={100}
                  className="rounded-md object-contain max-w-full max-h-[80vh]"
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
