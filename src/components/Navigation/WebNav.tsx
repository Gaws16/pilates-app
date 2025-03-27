import Logo from "../Logo/Logo";
export default function WebNav() {
  return (
    <nav className="flex justify-center items-center p-10 gap-96 tablet:px-12 tablet:py-0">
      <Logo />
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
