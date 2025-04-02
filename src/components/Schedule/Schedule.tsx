"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface ScheduleItem {
  id: string;
  day_of_week: string;
  time_slot: string;
  class_name: string;
}

export default function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const { data, error } = await supabase
        .from("schedule")
        .select("*")
        .order("day_of_week", { ascending: true })
        .order("time_slot", { ascending: true });

      if (!error && data) {
        setSchedule(data);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-[#a17d60] mb-8">Class Schedule</h2>
      <div className="overflow-x-auto">
        <table
          className="divide-y divide-gray-200 mx-auto"
          style={{ width: "500px" }}
        >
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: "80px" }}
              >
                Day
              </th>
              <th
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: "80px" }}
              >
                Time
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schedule.map((item) => (
              <tr key={item.id}>
                <td
                  className="px-3 py-2 text-sm text-gray-900"
                  style={{ width: "80px" }}
                >
                  {item.day_of_week}
                </td>
                <td
                  className="px-3 py-2 text-sm text-gray-900"
                  style={{ width: "80px" }}
                >
                  {item.time_slot}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900">
                  {item.class_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
