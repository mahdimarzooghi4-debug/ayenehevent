import { lazy, Suspense, useEffect, useState } from 'react';
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

const AdminRoute = lazy(() => import('./pages/AdminRoute'));

const isTrackingHash = () => window.location.hash.startsWith('#tracking');
const isContactHash = () => window.location.hash.startsWith('#contact');
const isAdminHash = () => window.location.hash.startsWith('#admin');

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const initialHash = window.location.hash;
const initialHashIsPageRoute =
  initialHash.startsWith('#tracking') ||
  initialHash.startsWith('#contact') ||
  initialHash.startsWith('#admin');

if (initialHash && !initialHashIsPageRoute) {
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

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
      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

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
      <Suspense fallback={null}>
        <AdminRoute />
      </Suspense>
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
