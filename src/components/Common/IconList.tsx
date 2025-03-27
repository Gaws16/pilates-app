import { LucideIcon } from "lucide-react";

interface IconType {
  text: string;
  icon: LucideIcon;
}
interface IconListProps {
  icons: IconType[];
  title: string;
}
export default function IconList({ icons, title }: IconListProps) {
  return (
    <div className="flex flex-col ">
      <h2 className="text-2xl font-bold   text-[#483124]">{title}</h2>
      <div className="flex flex-col gap-4">
        {icons.map((icon, index) => {
          const Icon = icon.icon;
          return (
            <div key={index} className="flex   gap-2">
              <Icon />
              <p>{icon.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
