"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#a17d60]">Admin Panel</h1>
      </div>

      <nav className="space-y-2">
        <SidebarLink
          href="/admin/dashboard"
          active={isActive("/admin/dashboard")}
        >
          Dashboard
        </SidebarLink>
        <SidebarLink
          href="/admin/content/home"
          active={isActive("/admin/content/home")}
        >
          Home Page
        </SidebarLink>
        <SidebarLink
          href="/admin/content/schedule"
          active={isActive("/admin/content/schedule")}
        >
          Schedule
        </SidebarLink>
        <SidebarLink
          href="/admin/content/prices"
          active={isActive("/admin/content/prices")}
        >
          Prices
        </SidebarLink>
        <SidebarLink
          href="/admin/content/rules"
          active={isActive("/admin/content/rules")}
        >
          Rules
        </SidebarLink>
        <SidebarLink
          href="/admin/content/gallery"
          active={isActive("/admin/content/gallery")}
        >
          Gallery
        </SidebarLink>
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={handleSignOut}
          className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`block px-4 py-2 rounded-md transition-colors ${
        active ? "bg-[#a17d60] text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}
