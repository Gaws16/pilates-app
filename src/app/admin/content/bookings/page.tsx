"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Loader2, Search, Filter, RefreshCw, X } from "lucide-react";

interface Booking {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  schedule_id: string;
  status: string;
  class_name?: string;
  day_of_week?: string;
  time_slot?: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Fetch bookings with schedule information
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          *,
          schedule:schedule_id (
            class_name,
            day_of_week,
            time_slot
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        // Transform the data to flatten the schedule info
        const transformedData = data.map((booking) => ({
          ...booking,
          class_name: booking.schedule?.class_name,
          day_of_week: booking.schedule?.day_of_week,
          time_slot: booking.schedule?.time_slot,
        }));
        setBookings(transformedData);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      searchTerm === "" ||
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.phone && booking.phone.includes(searchTerm)) ||
      (booking.class_name &&
        booking.class_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("bg-BG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bookings Management</h1>
        <button
          onClick={fetchBookings}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#a17d60] text-white rounded-md hover:bg-[#8a6b52] transition-colors disabled:opacity-50"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, phone or class..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="w-full md:w-48">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60] appearance-none"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#a17d60]" />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No bookings found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-3 px-4 font-semibold text-sm">Created</th>
                  <th className="py-3 px-4 font-semibold text-sm">Name</th>
                  <th className="py-3 px-4 font-semibold text-sm">Email</th>
                  <th className="py-3 px-4 font-semibold text-sm">Phone</th>
                  <th className="py-3 px-4 font-semibold text-sm">Class</th>
                  <th className="py-3 px-4 font-semibold text-sm">Day</th>
                  <th className="py-3 px-4 font-semibold text-sm">Time</th>
                  <th className="py-3 px-4 font-semibold text-sm">Status</th>
                  <th className="py-3 px-4 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-200">
                    <td className="py-3 px-4">
                      {formatDate(booking.created_at)}
                    </td>
                    <td className="py-3 px-4">{booking.name}</td>
                    <td className="py-3 px-4">{booking.email}</td>
                    <td className="py-3 px-4">{booking.phone || "-"}</td>
                    <td className="py-3 px-4">{booking.class_name || "-"}</td>
                    <td className="py-3 px-4">{booking.day_of_week || "-"}</td>
                    <td className="py-3 px-4">{booking.time_slot || "-"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : booking.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {booking.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateBookingStatus(booking.id, "confirmed")
                              }
                              disabled={isUpdating}
                              className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() =>
                                updateBookingStatus(booking.id, "cancelled")
                              }
                              disabled={isUpdating}
                              className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {booking.status === "confirmed" && (
                          <>
                            <button
                              onClick={() =>
                                updateBookingStatus(booking.id, "completed")
                              }
                              disabled={isUpdating}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() =>
                                updateBookingStatus(booking.id, "cancelled")
                              }
                              disabled={isUpdating}
                              className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {(booking.status === "cancelled" ||
                          booking.status === "completed") && (
                          <button
                            onClick={() =>
                              updateBookingStatus(booking.id, "pending")
                            }
                            disabled={isUpdating}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                          >
                            Reopen
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
