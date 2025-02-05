import HeroSection from "@/components/HeroSection/HeroSection";
import WebNav from "@/components/Navigation/WebNav";

export default function Home() {
  return (
    <div className="flex flex-col gap-32">
      <WebNav />
      <HeroSection />
    </div>
  );
}
