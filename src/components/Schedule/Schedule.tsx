"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface ScheduleItem {
  id: string;
  day_of_week: string;
  time_slot: string;
  class_name: string;
  capacity: number;
  available_slots?: number;
}

export default function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);

      // Get classes from schedule table
      const { data, error } = await supabase
        .from("schedule")
        .select("*")
        .order("day_of_week", { ascending: true })
        .order("time_slot", { ascending: true });

      if (error || !data) {
        setLoading(false);
        return;
      }

      // Calculate available slots for each class
      const scheduleWithSlots = await Promise.all(
        data.map(async (item) => {
          // Count confirmed bookings for this schedule item
          const { count, error: countError } = await supabase
            .from("bookings")
            .select("*", { count: "exact", head: true })
            .eq("schedule_id", item.id)
            .not("status", "eq", "cancelled");

          if (countError) {
            return {
              ...item,
              available_slots: item.capacity || 20,
            };
          }

          // Calculate available slots
          const booked = count || 0;
          const available = (item.capacity || 20) - booked;

          return {
            ...item,
            available_slots: available > 0 ? available : 0,
          };
        })
      );

      setSchedule(scheduleWithSlots);
      setLoading(false);
    };

    fetchSchedule();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-[#a17d60] mb-8">Class Schedule</h2>

      {loading ? (
        <div className="text-center py-8">
          <p>Loading schedule...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="divide-y divide-gray-200 mx-auto min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available Slots
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedule.map((item) => (
                <tr key={item.id}>
                  <td className="px-3 py-2 text-sm text-gray-900">
                    {item.day_of_week}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-900">
                    {item.time_slot}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-900">
                    {item.class_name}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-900">
                    {item.available_slots} / {item.capacity || 20}
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
