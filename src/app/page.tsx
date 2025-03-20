import Calendar from "@/components/Callendar/Callendar";
import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
import MainSection from "@/components/Main/MainSection";
import WebNav from "@/components/Navigation/WebNav";

export default function Home() {
  return (
    <div className="flex flex-col gap-32">
      <WebNav />
      <HeroSection />
      <MainSection />
      <Calendar />
      <Gallery />
    </div>
  );
}
