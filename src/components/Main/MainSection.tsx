"use client";

import Image from "next/image";
import { useState } from "react";
import BookingModal from "../Booking/BookingModal";

type MainSectionProps = {
  title?: string;
  description?: string;
  buttonText?: string;
};
export default function MainSection({
  title = "Aime Pilates Studio",
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic molestiae, a dolorum unde, natus vel provident itaque ullam animi iste maiores accusantium placeat recusandae accusamus, nobis obcaecati inventore magni sunt.",
  buttonText = "Резервирай своя час сега",
}: MainSectionProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <section className="text-xl web:text-2xl flex flex-col items-center gap-3">
      <h1 className="text-xl web:text-4xl">{title}</h1>
      <div
        className="text-2xl w-3/6 font-bold text-center text-[#483124] rounded-lg bg-cover bg-center p-10"
        style={{ backgroundImage: "url('/mini-background.svg')" }}
      >
        <p className="w-full h-full font-semibold">{description}</p>
      </div>
      <div className="flex items-center gap-3 w-full content-center justify-center">
        <button
          style={{ backgroundImage: "url('/mini-background.svg')" }}
          className={`relative h-full bg-cover bg-center w-2/6 web:w-2/5 p-3 font-semibold transition-all duration-300 transform ${
            isButtonHovered ? "scale-105 shadow-lg" : ""
          } overflow-hidden group`}
          onClick={openBookingModal}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          <span className="relative z-10">{buttonText}</span>
          <span className="absolute inset-0 bg-[#a17d60] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          <span className="absolute -inset-full top-0 block w-1/2 h-full z-5 transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine"></span>
        </button>
        <Image
          src={"/small-girl.svg"}
          width={100}
          height={100}
          alt="small-girl"
          className={`transition-transform duration-300 ${
            isButtonHovered ? "scale-110" : ""
          }`}
        />
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </section>
  );
}
