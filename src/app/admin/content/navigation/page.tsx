"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

interface NavItem {
  id: string;
  title: string;
  href: string;
  order: number;
}

export default function NavigationManagement() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNavItems();
  }, []);

  const fetchNavItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("navigation")
        .select("*")
        .order("order", { ascending: true });

      if (error) throw error;
      setNavItems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async (id: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from("navigation")
        .update({ order: newOrder })
        .eq("id", id);

      if (error) throw error;
      fetchNavItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold text-[#a17d60]">
        Navigation Management
      </h1>

      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">{error}</div>
      )}

      {loading ? (
        <p>Loading navigation...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {navItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.href}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={item.order}
                      min={1}
                      onChange={(e) =>
                        handleUpdateOrder(item.id, parseInt(e.target.value))
                      }
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleUpdateOrder(item.id, item.order - 1)}
                      disabled={item.order === 1}
                      className="text-blue-600 hover:text-blue-900 disabled:text-gray-400 mr-2"
                    >
                      Move Up
                    </button>
                    <button
                      onClick={() => handleUpdateOrder(item.id, item.order + 1)}
                      disabled={item.order === navItems.length}
                      className="text-blue-600 hover:text-blue-900 disabled:text-gray-400"
                    >
                      Move Down
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
