import { useEffect, useState } from 'react';
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
import { TrackingPage } from './pages/TrackingPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const isTrackingHash = () => window.location.hash.startsWith('#tracking');
const isContactHash = () => window.location.hash.startsWith('#contact');
const isAdminHash = () => window.location.hash.startsWith('#admin');

export default function App() {
  const [trackingRoute, setTrackingRoute] = useState(isTrackingHash);
  const [contactRoute, setContactRoute] = useState(isContactHash);
  const [adminRoute, setAdminRoute] = useState(isAdminHash);

  useEffect(() => {
    const handleHashChange = () => {
      setTrackingRoute(isTrackingHash());
      setContactRoute(isContactHash());
      setAdminRoute(isAdminHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (adminRoute) return <AdminPage />;
  if (trackingRoute) return <TrackingPage />;
  if (contactRoute) return <ContactPage />;

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
