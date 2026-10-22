/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TeamSection } from './components/TeamSection';
import { PracticeAreas } from './components/PracticeAreas';
import { BookingSystem } from './components/BookingSystem';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppointmentLookupModal } from './components/AppointmentLookupModal';
import { CaseEvaluatorModal } from './components/CaseEvaluatorModal';
import { PhotoUploaderModal } from './components/PhotoUploaderModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { Appointment, PracticeAreaId } from './types';

export default function App() {
  const [lookupModalOpen, setLookupModalOpen] = useState(false);
  const [caseEvaluatorOpen, setCaseEvaluatorOpen] = useState(false);
  const [photoUploaderOpen, setPhotoUploaderOpen] = useState(false);
  const [bookingArea, setBookingArea] = useState<PracticeAreaId>('penal');
  const [bookingAttorney, setBookingAttorney] = useState<string>('Licda. Mitzy I. García');
  const [activeSection, setActiveSection] = useState('inicio');

  // Track scroll position to update active navbar item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobre-nosotros', 'equipo', 'servicios', 'reservas', 'blog', 'contacto'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToBooking = (areaId?: PracticeAreaId) => {
    if (areaId) {
      setBookingArea(areaId);
    }
    const el = document.getElementById('reservas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectAreaFromCard = (areaId: PracticeAreaId) => {
    setBookingArea(areaId);
    const el = document.getElementById('reservas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultArticleTopic = (category: PracticeAreaId) => {
    setBookingArea(category);
    const el = document.getElementById('reservas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookWithAttorney = (attorneyName: string, defaultArea?: PracticeAreaId) => {
    setBookingAttorney(attorneyName);
    if (defaultArea) {
      setBookingArea(defaultArea);
    }
    const el = document.getElementById('reservas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAppointmentCreated = (appointment: Appointment) => {
    console.log('Nueva cita registrada:', appointment.code);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-800">
      {/* Navbar with brand, emergency line & actions */}
      <Navbar
        onOpenBooking={() => handleScrollToBooking()}
        onOpenLookup={() => setLookupModalOpen(true)}
        onOpenCaseEvaluator={() => setCaseEvaluatorOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleScrollToBooking()}
          onOpenCaseEvaluator={() => setCaseEvaluatorOpen(true)}
          onOpenPhotoUploader={() => setPhotoUploaderOpen(true)}
        />

        {/* About Section - Licda. Mitzy I. García biography & firm principles */}
        <AboutSection
          onOpenBooking={() => handleScrollToBooking()}
          onOpenPhotoUploader={() => setPhotoUploaderOpen(true)}
        />

        {/* Team Section - Exfiscales and Forensic Experts with Photos */}
        <TeamSection
          onBookWithAttorney={handleBookWithAttorney}
        />

        {/* Practice Areas - Detailed legal phases & competencies */}
        <PracticeAreas
          onSelectAreaForBooking={handleSelectAreaFromCard}
        />

        {/* Booking System - Core appointment scheduling workflow */}
        <BookingSystem
          key={`${bookingArea}-${bookingAttorney}`}
          initialArea={bookingArea}
          initialAttorney={bookingAttorney}
          onAppointmentCreated={handleAppointmentCreated}
          onOpenLookupModal={() => setLookupModalOpen(true)}
        />

        {/* Legal News Blog - Editorial jurisprudence, criminal & real estate articles */}
        <BlogSection
          onConsultArticleTopic={handleConsultArticleTopic}
        />

        {/* Contact & Panama Office */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleScrollToBooking()}
        onOpenLookup={() => setLookupModalOpen(true)}
      />

      {/* Live Chat Widget (Floating) */}
      <LiveChatWidget
        onOpenBooking={() => handleScrollToBooking()}
      />

      {/* Appointment Lookup & Management Modal */}
      <AppointmentLookupModal
        isOpen={lookupModalOpen}
        onClose={() => setLookupModalOpen(false)}
      />

      {/* Case Evaluator Modal */}
      <CaseEvaluatorModal
        isOpen={caseEvaluatorOpen}
        onClose={() => setCaseEvaluatorOpen(false)}
        onSelectAndBook={(area) => {
          handleScrollToBooking(area);
        }}
      />

      {/* Photo Uploader Modal */}
      <PhotoUploaderModal
        isOpen={photoUploaderOpen}
        onClose={() => setPhotoUploaderOpen(false)}
      />
    </div>
  );
}
