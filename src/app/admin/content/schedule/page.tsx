"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

interface ScheduleItem {
  id: string;
  day_of_week: string;
  time_slot: string;
  class_name: string;
  capacity: number;
}

const days = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък"];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

export default function ScheduleManagement() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newClass, setNewClass] = useState({
    day_of_week: "",
    time_slot: "",
    class_name: "",
    capacity: 20,
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
        .order("time_slot", { ascending: true });

      if (error) throw error;
      setSchedule(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("schedule").insert([newClass]);

      if (error) throw error;

      fetchSchedule();
      setNewClass({
        day_of_week: "",
        time_slot: "",
        class_name: "",
        capacity: 20,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleDeleteClass = async (id: string) => {
    try {
      const { error } = await supabase.from("schedule").delete().eq("id", id);
      if (error) throw error;

      setSchedule(schedule.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold text-[#a17d60]">Schedule Management</h1>

      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">{error}</div>
      )}

      <form onSubmit={handleAddClass} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Day
            </label>
            <select
              value={newClass.day_of_week}
              onChange={(e) =>
                setNewClass({ ...newClass, day_of_week: e.target.value })
              }
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
            >
              <option value="">Select day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <select
              value={newClass.time_slot}
              onChange={(e) =>
                setNewClass({ ...newClass, time_slot: e.target.value })
              }
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
            >
              <option value="">Select time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class Name
            </label>
            <input
              type="text"
              value={newClass.class_name}
              onChange={(e) =>
                setNewClass({ ...newClass, class_name: e.target.value })
              }
              required
              placeholder="e.g., Pilates Beginner"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={newClass.capacity}
              onChange={(e) =>
                setNewClass({
                  ...newClass,
                  capacity: parseInt(e.target.value) || 20,
                })
              }
              required
              placeholder="e.g., 20"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-[#a17d60] rounded-md hover:bg-[#8a6b52]"
        >
          Add Class
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
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedule.map((item) => (
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
                    {item.capacity || 20}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteClass(item.id)}
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
