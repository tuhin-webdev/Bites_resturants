import { HeroSection } from "@/components/home/HeroSection";
import { PopularDishes } from "@/components/home/PopularDishes";
import { ServicesSection } from "@/components/home/ServicesSection";
import { RegularMenuPack } from "@/components/home/RegularMenuPack";
import { ReserveBanner } from "@/components/home/ReserveBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { MeetChefs } from "@/components/home/MeetChefs";
import { AppDownload } from "@/components/home/AppDownload";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <PopularDishes />
      <ServicesSection />
      <RegularMenuPack />
      <ReserveBanner />
      <Testimonials />
      <MeetChefs />
      <AppDownload />
    </div>
  );
}
