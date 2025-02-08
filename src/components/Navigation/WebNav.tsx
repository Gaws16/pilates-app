import Image from "next/image";
export default function WebNav() {
  return (
    <nav className="flex justify-center items-center p-10 gap-96 tablet:px-12 tablet:py-0">
      <div className="relative w-[180px] h-[180px]">
        <Image
          src="/image.png"
          alt="logo"
          layout="contain"
          objectFit="intrinsic"
          width={180}
          height={180}
          priority
          quality={100}
        />
      </div>
      <ul className="text-2xl flex items-center justify-center gap-16 border-b-4 border-[#a17d60] m-0 relative max-h-[40px] text-[#a17d60] ">
        <li className="hover-effect">Начало</li>
        <li className="hover-effect">График</li>
        <li className="hover-effect">Цени</li>
        <li className="hover-effect">Правила</li>
        <li className="hover-effect">Галерия</li>
      </ul>
    </nav>
  );
}
