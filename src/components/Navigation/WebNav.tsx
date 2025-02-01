import Image from "next/image";
export default function WebNav() {
  return (
    <nav className="flex justify-center p-10 tablet:justify-between tablet:px-12 tablet:py-0">
      <Image
        className="hidden tablet:flex"
        src="/logo.svg"
        alt="logo"
        width={180}
        height={38}
        priority
        quality={100}
      />
      <ul className="flex items-center justify-center gap-5 border-b-4 border-[#a17d60]  ">
        <li>Начало</li>
        <li>График</li>
        <li>Цени</li>
        <li>Правила</li>
        <li>Галерия</li>
      </ul>
    </nav>
  );
}
