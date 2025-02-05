import Carousell from "./Carousell/Carousell";
import Title from "./Title/Title";

export default function HeroSection() {
  return (
    <div className="flex flex-col gap-3 items-center">
      <Carousell />
      <Title />
    </div>
  );
}
