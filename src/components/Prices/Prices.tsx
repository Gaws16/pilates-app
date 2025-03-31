"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface PriceItem {
  id: string;
  service_name: string;
  price: number;
  description: string;
}

export default function Prices() {
  const [prices, setPrices] = useState<PriceItem[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const { data, error } = await supabase
        .from("prices")
        .select("*")
        .order("service_name", { ascending: true });

      if (!error && data) {
        setPrices(data);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-[#a17d60] mb-8">Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prices.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-[#a17d60] mb-2">
              {item.service_name}
            </h3>
            <p className="text-2xl font-bold mb-4">${item.price}</p>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
