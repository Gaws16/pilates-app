"use client";
import Logo from "../Logo/Logo";

interface NavItem {
  id: string;
  title: string;
  href: string;
}

export default function WebNav() {
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
    <nav className="flex justify-center items-center p-10 gap-96 tablet:px-12 tablet:py-0">
      <Logo />
      <ul className="text-2xl flex items-center justify-center gap-16 border-b-4 border-[#a17d60] m-0 relative max-h-[40px] text-[#a17d60]">
        {navItems.map((item) => (
          <li key={item.id} className="hover-effect">
            <a href={item.href} onClick={(e) => scrollToSection(e, item.href)}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
