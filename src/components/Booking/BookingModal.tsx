"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { X } from "lucide-react";

interface ScheduleItem {
  id: string;
  day_of_week: string;
  time_slot: string;
  class_name: string;
  capacity: number;
  available_slots?: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Booking {
  name: string;
  email: string;
  phone: string;
  schedule_id: string;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [availableSlots, setAvailableSlots] = useState<ScheduleItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [booking, setBooking] = useState<Booking>({
    name: "",
    email: "",
    phone: "",
    schedule_id: "",
  });

  // Reset success state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchSchedule = async () => {
      // Get classes from schedule table
      const { data: scheduleData, error: scheduleError } = await supabase
        .from("schedule")
        .select("*")
        .order("day_of_week")
        .order("time_slot");

      if (scheduleError) {
        console.error("Error fetching schedule:", scheduleError);
        return;
      }

      // Get bookings count for each class
      if (scheduleData && scheduleData.length > 0) {
        // Calculate available slots for each schedule item
        const scheduleWithSlots = await Promise.all(
          scheduleData.map(async (item) => {
            // Count confirmed bookings for this schedule item
            const { count, error: countError } = await supabase
              .from("bookings")
              .select("*", { count: "exact", head: true })
              .eq("schedule_id", item.id)
              .not("status", "eq", "cancelled");

            if (countError) {
              console.error("Error counting bookings:", countError);
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

        // Filter out classes with no available slots
        const availableClasses = scheduleWithSlots.filter(
          (item) => item.available_slots > 0
        );

        setAvailableSlots(availableClasses);
      }
    };

    if (isOpen) {
      fetchSchedule();
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const checkExistingBooking = async () => {
    // Check if user already has a booking for this schedule
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("schedule_id", booking.schedule_id)
      .or(
        `email.eq.${booking.email}${
          booking.phone ? `,phone.eq.${booking.phone}` : ""
        }`
      )
      .not("status", "eq", "cancelled");

    if (error) throw error;

    if (data && data.length > 0) {
      throw new Error(
        "Вече имате резервация за този час. Моля, изберете друг час."
      );
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    try {
      // First check if user already has a booking
      await checkExistingBooking();

      // If no existing booking, create new one
      const { error } = await supabase.from("bookings").insert([booking]);

      if (error) throw error;

      setSuccess(true);
      setBooking({
        name: "",
        email: "",
        phone: "",
        schedule_id: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error submitting booking");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setError(null);
    setBooking({
      name: "",
      email: "",
      phone: "",
      schedule_id: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-[#a17d60]">
            Резервирай своя час
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="space-y-4">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 animate-bounceIn">
                <p>
                  Вашата резервация беше успешно изпратена! Ще се свържем с вас
                  скоро.
                </p>
              </div>
              <button
                onClick={resetForm}
                className="w-full px-4 py-2 bg-[#a17d60] text-white rounded-md hover:bg-[#8a6b52] transition-colors"
              >
                Направи нова резервация
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded animate-shake">
                  <p>{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Изберете ден и час *
                </label>
                <select
                  name="schedule_id"
                  value={booking.schedule_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
                >
                  <option value="">Изберете ден и час</option>
                  {availableSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.day_of_week} - {slot.time_slot} - {slot.class_name}{" "}
                      (Свободни места: {slot.available_slots})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Име *
                </label>
                <input
                  type="text"
                  name="name"
                  value={booking.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Имейл *
                </label>
                <input
                  type="email"
                  name="email"
                  value={booking.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={booking.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-4 py-2 bg-[#a17d60] text-white rounded-md hover:bg-[#8a6b52] transition-colors disabled:opacity-50"
              >
                {submitting ? "Изпращане..." : "Резервирай"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
