"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface ScheduleItem {
  id: string;
  day_of_week: string;
  time_slot: string;
  class_name: string;
}

export default function ScheduleManagement() {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    day_of_week: "",
    time_slot: "",
    class_name: "",
  });

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("schedule")
        .select("*")
        .order("day_of_week", { ascending: true });

      if (error) throw error;
      setScheduleItems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("schedule").insert([newItem]);
      if (error) throw error;

      fetchSchedule();
      setNewItem({ day_of_week: "", time_slot: "", class_name: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase.from("schedule").delete().eq("id", id);
      if (error) throw error;

      setScheduleItems(scheduleItems.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#a17d60]">Schedule Management</h1>

      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">{error}</div>
      )}

      <form onSubmit={handleAddItem} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Day of Week
            </label>
            <select
              value={newItem.day_of_week}
              onChange={(e) =>
                setNewItem({ ...newItem, day_of_week: e.target.value })
              }
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
            >
              <option value="">Select day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Slot
            </label>
            <input
              type="text"
              value={newItem.time_slot}
              onChange={(e) =>
                setNewItem({ ...newItem, time_slot: e.target.value })
              }
              required
              placeholder="e.g., 09:00 - 10:00"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class Name
            </label>
            <input
              type="text"
              value={newItem.class_name}
              onChange={(e) =>
                setNewItem({ ...newItem, class_name: e.target.value })
              }
              required
              placeholder="e.g., Pilates Beginner"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-[#a17d60] rounded-md hover:bg-[#8a6b52]"
        >
          Add Schedule Item
        </button>
      </form>

      {loading ? (
        <p>Loading schedule...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scheduleItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.day_of_week}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.time_slot}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.class_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
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
