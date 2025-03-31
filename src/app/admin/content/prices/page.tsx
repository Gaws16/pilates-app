"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface PriceItem {
  id: string;
  service_name: string;
  price: number;
  description: string;
}

export default function PricesManagement() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState({
    service_name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("prices")
        .select("*")
        .order("service_name", { ascending: true });

      if (error) throw error;
      setPrices(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("prices").insert([
        {
          service_name: newPrice.service_name,
          price: parseFloat(newPrice.price),
          description: newPrice.description,
        },
      ]);

      if (error) throw error;
      fetchPrices();
      setNewPrice({ service_name: "", price: "", description: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleDeletePrice = async (id: string) => {
    try {
      const { error } = await supabase.from("prices").delete().eq("id", id);
      if (error) throw error;
      setPrices(prices.filter((price) => price.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#a17d60]">Prices Management</h1>

      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">{error}</div>
      )}

      <form onSubmit={handleAddPrice} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Name
            </label>
            <input
              type="text"
              value={newPrice.service_name}
              onChange={(e) =>
                setNewPrice({ ...newPrice, service_name: e.target.value })
              }
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={newPrice.price}
              onChange={(e) =>
                setNewPrice({ ...newPrice, price: e.target.value })
              }
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              value={newPrice.description}
              onChange={(e) =>
                setNewPrice({ ...newPrice, description: e.target.value })
              }
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-[#a17d60] rounded-md hover:bg-[#8a6b52]"
        >
          Add Price
        </button>
      </form>

      {loading ? (
        <p>Loading prices...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prices.map((price) => (
                <tr key={price.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {price.service_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${price.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">{price.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeletePrice(price.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
