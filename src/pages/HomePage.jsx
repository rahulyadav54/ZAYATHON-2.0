import React from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Memories from '../components/Memories';
import Tracks from '../components/Tracks';
import TeamsPreviewSection from '../components/teams/TeamsPreviewSection';
import Timeline from '../components/Timeline';
import Prizes from '../components/Prizes';
import Sponsors from '../components/Sponsors';
import WhyParticipate from '../components/WhyParticipate';
import Team from '../components/Team';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import RegistrationModal from '../components/RegistrationModal';
import { useRegistrationAction } from '../hooks/useRegistrationAction';

export default function HomePage() {
  const { isModalOpen, openRegistration, closeRegistration } = useRegistrationAction();

  return (
    <div className="min-h-screen bg-[#080811] text-white selection:bg-[#743BFF] selection:text-white flex flex-col">
      {/* 1. Announcement Bar */}
      <AnnouncementBar onRegisterClick={openRegistration} />

      {/* 2. Sticky Navbar */}
      <Navbar onRegisterClick={openRegistration} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 3. Hero Section with 3D Centerpiece & Countdown */}
        <Hero onRegisterClick={openRegistration} />

        {/* 4. About ZAYATHON & ZAYA CODE HUB */}
        <About />

        {/* 5. ZAYATHON 1.0 Memories Archive (Photo & Video Galleries, Lightbox, Video Modal) */}
        <Memories />

        {/* 6. Hackathon Tracks */}
        <Tracks onRegisterClick={openRegistration} />

        {/* 7. NEW MAJOR FEATURE: Teams & Winners Spotlight Preview */}
        <TeamsPreviewSection />

        {/* 8. Milestone Timeline */}
        <Timeline />

        {/* 9. Prizes and Rewards (with 3D Trophy Visual) */}
        <Prizes onRegisterClick={openRegistration} />

        {/* 10. Sponsors & Ecosystem Partners */}
        <Sponsors />

        {/* 11. Why Participate */}
        <WhyParticipate onRegisterClick={openRegistration} />

        {/* 12. Organizing Team & Leadership */}
        <Team />

        {/* 13. Frequently Asked Questions */}
        <FAQ />

        {/* 14. Direct Contact & Communication Portal */}
        <Contact />
      </main>

      {/* 15. Footer */}
      <Footer onRegisterClick={openRegistration} />

      {/* Global Registration Modal / Pre-Register Notification */}
      <RegistrationModal isOpen={isModalOpen} onClose={closeRegistration} />
    </div>
  );
}

