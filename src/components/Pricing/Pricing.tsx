"use client";
import Image from "next/image";
import Title from "../Common/Title";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface PriceItem {
  id: string;
  service_name: string;
  price: number;
  description?: string;
}

export default function Pricing() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const { data, error } = await supabase
        .from("prices")
        .select("*")
        .order("service_name", { ascending: true });

      if (!error && data) {
        setPrices(data);
      }
      setLoading(false);
    };

    fetchPrices();
  }, []);

  return (
    <div className="px-5 md:px-8">
      <Title title="Цени" />
      <div className="flex flex-col md:flex-row justify-center items-center md:gap-12 lg:gap-24 mx-auto max-w-7xl">
        <div
          style={{ backgroundImage: "url('/price-back.svg')" }}
          className="w-full md:w-[600px] lg:w-[735px] bg-no-repeat bg-contain bg-center 
                    flex flex-col justify-center gap-3 md:gap-4 items-center 
                    text-xl md:text-2xl lg:text-3xl font-semibold
                    p-8 md:p-10 min-h-[250px] md:min-h-[350px] lg:min-h-[424px]"
        >
          {loading ? (
            <p>Зареждане...</p>
          ) : prices.length === 0 ? (
            <p>Няма налични цени</p>
          ) : (
            prices.map((item) => (
              <p key={item.id} className="text-center">
                {item.service_name} {item.price} лв
              </p>
            ))
          )}
        </div>
        <div className="mt-6 md:mt-0">
          <Image
            src="/price-pic.svg"
            alt="woman"
            width={256}
            height={256}
            className="md:block hidden"
          />
        </div>
      </div>
    </div>
  );
}
