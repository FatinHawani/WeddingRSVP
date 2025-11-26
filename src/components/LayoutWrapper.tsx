'use client';

import { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import LeafEffect from './LeafEffect';
import StickyNav from './StickyNav';
import ContactModal from './modals/ContactModal';
import LocationModal from './modals/LocationModal';
import Modal from './ui/Modal';
import RSVPForm from './RSVPForm';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isRSVPOpen, setIsRSVPOpen] = useState(false);

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-rose-200">
            {/* Fixed Background */}
            <div className="fixed inset-0 z-0">
                {/* Placeholder for background image - replace with actual image later */}
                <div className="absolute inset-0 bg-[url('/bg-placeholder.png')] bg-cover bg-center opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-stone-100/80" />
            </div>

            {/* Leaf Effect Overlay */}
            <LeafEffect />

            {/* Main Content */}
            <main className="relative z-10 pb-24 min-h-screen flex flex-col">
                {children}
                <Footer />
            </main>

            {/* Audio Player */}
            <AudioPlayer />

            {/* Sticky Navigation */}
            <StickyNav
                onOpenContact={() => setIsContactOpen(true)}
                onOpenLocation={() => setIsLocationOpen(true)}
                onOpenRSVP={() => setIsRSVPOpen(true)}
            />

            {/* Modals */}
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            <LocationModal isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
            <Modal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} title="RSVP">
                <RSVPForm onClose={() => setIsRSVPOpen(false)} />
            </Modal>
        </div>
    );
}
