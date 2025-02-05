import Image from "next/image";
export default function WebNav() {
  return (
    <nav className="flex justify-center p-10 tablet:justify-between tablet:px-12 tablet:py-0">
      <div className="relative w-[180px] h-[100px] hidden tablet:block">
        <Image
          src="/logo.svg"
          alt="logo"
          layout="fill"
          objectFit="contain"
          priority
          quality={100}
        />
      </div>
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
