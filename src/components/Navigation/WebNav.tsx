"use client";
import { useState } from "react";
import Logo from "../Logo/Logo";

interface NavItem {
  id: string;
  title: string;
  href: string;
}

export default function WebNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: "1", title: "Начало", href: "#home" },
    { id: "2", title: "График", href: "#calendar" },
    { id: "3", title: "Цени", href: "#pricing" },
    { id: "4", title: "Правила", href: "#rules" },
    { id: "5", title: "Галерия", href: "#gallery" },
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="flex justify-between items-center p-10 tablet:px-12 tablet:py-0">
      <Logo />

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center justify-center gap-16 border-b-4 border-[#a17d60] m-0 relative max-h-[40px] text-[#a17d60] text-2xl">
        {navItems.map((item) => (
          <li key={item.id} className="hover-effect">
            <a href={item.href} onClick={(e) => scrollToSection(e, item.href)}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-[#a17d60] text-4xl"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white p-5 lg:hidden z-50 flex flex-col">
          <div className="flex justify-end mb-6">
            <button 
              className="text-[#a17d60] text-4xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✕
            </button>
          </div>
          <ul className="flex flex-col items-center gap-8 text-[#a17d60] text-2xl flex-grow justify-center">
            {navItems.map((item) => (
              <li key={item.id} className="hover-effect">
                <a
                  href={item.href}
                  onClick={(e) => {
                    scrollToSection(e, item.href);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
