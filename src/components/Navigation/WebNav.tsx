"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Logo from "../Logo/Logo";
import Link from "next/link";

interface NavItem {
  id: string;
  title: string;
  href: string;
  order: number;
}

export default function WebNav() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    const fetchNavItems = async () => {
      const { data, error } = await supabase
        .from("navigation")
        .select("*")
        .order("order", { ascending: true });

      if (!error && data) {
        setNavItems(data);
      }
    };

    fetchNavItems();
  }, []);

  return (
    <nav className="flex justify-center items-center p-10 gap-96 tablet:px-12 tablet:py-0">
      <Logo />
      <ul className="text-2xl flex items-center justify-center gap-16 border-b-4 border-[#a17d60] m-0 relative max-h-[40px] text-[#a17d60]">
        {navItems.map((item) => (
          <li key={item.id} className="hover-effect">
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
