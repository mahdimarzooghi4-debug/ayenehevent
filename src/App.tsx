import { Header } from './sections/hero/Header';
import { Hero } from './sections/hero/Hero';
import { StatsBar } from './sections/hero/StatsBar';
import { AboutSection } from './sections/AboutSection';
import AxesSection from './sections/axes/AxesSection';
import { EntryPathsSection } from './sections/entry/EntryPathsSection';
import { JourneySection } from './sections/journey/JourneySection';
import { SupportSection } from './sections/support/SupportSection';
import { RegistrationSection } from './sections/registration/RegistrationSection';
import { FAQSection } from './sections/FAQSection';
import { FooterSection } from './sections/FooterSection';

export default function App() {
  return (
    <div
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#FAF9F7]"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
    >
      <section id="home" className="bg-[#FAF9F7]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[100px]">
          <Header />
          <Hero />
          <div className="pb-16">
            <StatsBar />
          </div>
        </div>
      </section>

      <AboutSection />
      <AxesSection />
      <EntryPathsSection />
      <JourneySection />
      <SupportSection />
      <RegistrationSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}
