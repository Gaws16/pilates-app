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
      className="  text-center py-4 bg-center bg-cover bg-no-repeat flex justify-between p-20"
      style={{ backgroundImage: "url('/mini-background.svg')" }}
    >
      <Logo />

      <IconList icons={footerIconsLeft} title="Контакти и инфо" />
      <IconList icons={footerIconsRight} title="Социални мрежи и платформи" />
    </footer>
  );
}
