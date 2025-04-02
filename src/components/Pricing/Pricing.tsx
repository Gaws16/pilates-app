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
    <>
      <Title title="Цени" />
      <div className="flex justify-center gap-24">
        <div
          style={{ backgroundImage: "url('/price-back.svg')" }}
          className="w-[735px] h-[424px] bg-no-repeat bg-center flex flex-col justify-center gap-4 items-center text-3xl font-semibold"
        >
          {loading ? (
            <p>Зареждане...</p>
          ) : prices.length === 0 ? (
            <p>Няма налични цени</p>
          ) : (
            prices.map((item) => (
              <p key={item.id}>
                {item.service_name} {item.price} лв
              </p>
            ))
          )}
        </div>
        <Image
          src="/price-pic.svg"
          alt="woman"
          width={256}
          height={256}
          className=" md:block hidden"
        />
      </div>
    </>
  );
}
