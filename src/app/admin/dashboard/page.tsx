"use client";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#a17d60]">Admin Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Rules"
          description="Manage studio rules"
          href="/admin/content/rules"
        />
        <DashboardCard
          title="Schedule"
          description="Manage class schedule"
          href="/admin/content/schedule"
        />
        <DashboardCard
          title="Prices"
          description="Manage pricing"
          href="/admin/content/prices"
        />
        <DashboardCard
          title="Gallery"
          description="Manage image gallery"
          href="/admin/content/gallery"
        />
        <DashboardCard
          title="Bookings"
          description="Manage client bookings"
          href="/admin/content/bookings"
        />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <h2 className="text-xl font-semibold text-[#a17d60] mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
