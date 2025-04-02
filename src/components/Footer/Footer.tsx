import IconList from "../Common/IconList";
import Logo from "../Logo/Logo";
import {
  MapPinCheck,
  Mail,
  Phone,
  Facebook,
  Instagram,
  CirclePlay,
} from "lucide-react";

const footerIconsLeft = [
  { text: "Адрес", icon: MapPinCheck },
  { text: "Имейл", icon: Mail },
  { text: "Телефон", icon: Phone },
];

const footerIconsRight = [
  { text: "Facebook", icon: Facebook },
  { text: "Instagram", icon: Instagram },
  { text: "Tic Toc", icon: CirclePlay },
];

export default function Footer() {
  return (
    <footer
      className="w-full bg-center bg-cover bg-no-repeat px-4 py-10 md:p-10 lg:p-20"
      style={{ backgroundImage: "url('/mini-background.svg')" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="mb-8 md:mb-0">
          <Logo />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center md:items-start">
          <div className="w-full lg:w-auto">
            <IconList icons={footerIconsLeft} title="Контакти и инфо" />
          </div>

          <div className="w-full lg:w-auto">
            <IconList
              icons={footerIconsRight}
              title="Социални мрежи и платформи"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-[#a17d60] text-sm">
        <p>
          © {new Date().getFullYear()} Pilates Studio. Всички права запазени.
        </p>
      </div>
    </footer>
  );
}
