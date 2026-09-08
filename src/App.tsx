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
import { AdminSecureDownloads } from './pages/AdminSecureDownloads';
import { AdminPasswordSettings } from './pages/AdminPasswordSettings';
import { AdminSitePresentationSettings } from './pages/AdminSitePresentationSettings';
import { AdminAuditTrail } from './pages/AdminAuditTrail';
import { AdminDataExports } from './pages/AdminDataExports';

const isTrackingHash = () => window.location.hash.startsWith('#tracking');
const isContactHash = () => window.location.hash.startsWith('#contact');
const isAdminHash = () => window.location.hash.startsWith('#admin');

export default function App() {
  const [trackingRoute, setTrackingRoute] = useState(isTrackingHash);
  const [contactRoute, setContactRoute] = useState(isContactHash);
  const [adminRoute, setAdminRoute] = useState(isAdminHash);

  useEffect(() => {
    const handleHashChange = () => {
      const tracking = isTrackingHash();
      const contact = isContactHash();
      const admin = isAdminHash();

      setTrackingRoute(tracking);
      setContactRoute(contact);
      setAdminRoute(admin);

      if (tracking || contact || admin) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      const sectionId = decodeURIComponent(window.location.hash.replace(/^#/, ''));
      if (!sectionId) return;

      window.requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (adminRoute) {
    return (
      <>
        <AdminPage />
        <AdminSecureDownloads />
        <AdminSitePresentationSettings />
        <AdminPasswordSettings />
        <AdminAuditTrail />
        <AdminDataExports />
      </>
    );
  }
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
