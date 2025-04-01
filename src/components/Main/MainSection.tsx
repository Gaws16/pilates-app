"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import BookingModal from "../Booking/BookingModal";
import { supabase } from "@/lib/supabase/client";

interface MainSectionContent {
  title: string;
  description: string;
  button_text: string;
}

export default function MainSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [content, setContent] = useState<MainSectionContent>({
    title: "Aime Pilates Studio",
    description: "Loading...",
    button_text: "Резервирай своя час сега",
  });

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("main_section")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching main section content:", error);
        return;
      }

      if (data) {
        setContent(data);
      }
    };

    fetchContent();
  }, []);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <section className="text-xl web:text-2xl flex flex-col items-center gap-3">
      <h1 className="text-xl web:text-4xl">{content.title}</h1>
      <div
        className="text-2xl w-3/6 font-bold text-center text-[#483124] rounded-lg bg-cover bg-center p-10"
        style={{ backgroundImage: "url('/mini-background.svg')" }}
      >
        <p className="w-full h-full font-semibold">{content.description}</p>
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
          <span className="relative z-10">{content.button_text}</span>
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
