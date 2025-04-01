import Calendar from "@/components/Callendar/Callendar";
import Footer from "@/components/Footer/Footer";
import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
import MainSection from "@/components/Main/MainSection";
import WebNav from "@/components/Navigation/WebNav";
import Princing from "@/components/Pricing/Pricing";
import Rules from "@/components/Rules/Rules";

export default function Home() {
  return (
    <div className="flex flex-col gap-32">
      <WebNav />
      <section id="home">
        <HeroSection />
      </section>
      <MainSection />
      <section id="calendar">
        <Calendar />
      </section>
      <section id="pricing">
        <Princing />
      </section>
      <section id="rules">
        <Rules />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <Footer />
    </div>
  );
}
