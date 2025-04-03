"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Home,
  Image,
  Calendar,
  DollarSign,
  ScrollText,
  FileText,
  BookOpen,
  Menu,
  X,
} from "lucide-react";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      href: "/admin/main-section",
      label: "Main Section",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      href: "/admin/content/schedule",
      label: "Schedule",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      href: "/admin/content/bookings",
      label: "Bookings",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      href: "/admin/content/prices",
      label: "Prices",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      href: "/admin/content/rules",
      label: "Rules",
      icon: <ScrollText className="w-5 h-5" />,
    },
    {
      href: "/admin/content/gallery",
      label: "Gallery",
      icon: <Image className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed z-50 top-4 left-4 bg-[#a17d60] text-white p-2 rounded-md md:hidden"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div
        className={`bg-white h-screen fixed left-0 top-0 shadow-lg transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 -translate-x-full md:translate-x-0 md:w-64"
        } z-40`}
      >
        <div className="p-4 mt-12 md:mt-0">
          <h1 className="hidden md:block text-xl font-bold text-[#a17d60]">
            Admin Panel
          </h1>
        </div>
        <nav className="mt-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
                pathname === item.href ? "bg-[#a17d60] text-white" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>
      <div className="md:pl-64"></div>
    </>
  );
}
