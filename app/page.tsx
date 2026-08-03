import { Navbar } from "@/components/Navbar";
import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { UpcomingEvent } from "@/components/UpcomingEvent";
import { Sponsors } from "@/components/Sponsors";
import { About } from "@/components/About";
import { TunnelGallery } from "@/components/TunnelGallery";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <ScrollyCanvas />
      <UpcomingEvent />
      <Sponsors />
      <About />
      <TunnelGallery />
      <Footer />
    </main>
  );
}
