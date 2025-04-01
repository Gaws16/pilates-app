"use client";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Welcome to the Admin Panel
        </h2>
        <p className="text-gray-700 mb-4">
          You are logged in as:{" "}
          <span className="font-semibold">{user?.email}</span>
        </p>
        <p className="text-gray-700">
          Use the sidebar navigation to manage your site content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Main Section</h3>
          <p className="text-gray-700 mb-4">
            Edit the main section content on your homepage.
          </p>
          <a
            href="/admin/main-section"
            className="text-[#a17d60] hover:text-[#8a6b52] font-medium"
          >
            Edit Main Section →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Schedule</h3>
          <p className="text-gray-700 mb-4">
            Manage your class schedule and availability.
          </p>
          <a
            href="/admin/content/schedule"
            className="text-[#a17d60] hover:text-[#8a6b52] font-medium"
          >
            Edit Schedule →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Bookings</h3>
          <p className="text-gray-700 mb-4">
            Manage class bookings and reservations.
          </p>
          <a
            href="/admin/content/bookings"
            className="text-[#a17d60] hover:text-[#8a6b52] font-medium"
          >
            Manage Bookings →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Gallery</h3>
          <p className="text-gray-700 mb-4">
            Upload and manage images in your gallery.
          </p>
          <a
            href="/admin/content/gallery"
            className="text-[#a17d60] hover:text-[#8a6b52] font-medium"
          >
            Manage Gallery →
          </a>
        </div>
      </div>
    </div>
  );
}
