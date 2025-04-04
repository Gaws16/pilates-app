"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface ScheduleItem {
  id: string;
  day_of_week: string;
  time_slot: string;
  class_name: string;
  capacity: number;
  available_slots?: number;
}

// Update days to only include Monday to Friday
const days = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък"];

// Define time slots for the schedule
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

const Schedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      // Get classes from schedule table
      const { data, error } = await supabase
        .from("schedule")
        .select("*")
        .order("time_slot", { ascending: true });

      if (error || !data) {
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
    };

    fetchSchedule();
  }, []);

  const getClassForTimeSlot = (day: string, time: string) => {
    return schedule.find(
      (item) => item.day_of_week === day && item.time_slot === time
    );
  };

  return (
    <div className="p-3 max-w-full">
      <div className="min-w-[650px] max-w-[1600px] mx-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#a17d60] text-white">
            <tr>
              <th className="border border-black p-2 md:p-3 w-20">Time</th>
              {days.map((day, index) => (
                <th
                  key={index}
                  className="border border-black p-2 md:p-3 relative text-sm md:text-base"
                >
                  {day}
                  {index === days.length - 1 && (
                    <div className="absolute bottom-7 -right-5 hidden md:block">
                      <Image
                        src="/bear.svg"
                        alt="Bear"
                        width={65}
                        height={65}
                        quality={100}
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-black p-2 md:p-3 text-center font-semibold text-sm">
                  {time}
                </td>
                {days.map((day, colIndex) => {
                  const classItem = getClassForTimeSlot(day, time);
                  return (
                    <td
                      key={colIndex}
                      className={`border border-black p-2 md:p-3 text-center ${
                        classItem ? "bg-[#a17d60]/10" : ""
                      }`}
                    >
                      {classItem && (
                        <div className="flex flex-col">
                          <span className="font-semibold text-xs md:text-sm">
                            {classItem.class_name}
                          </span>
                          <span className="text-xs text-gray-600">
                            {classItem.available_slots} свободни места
                          </span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
