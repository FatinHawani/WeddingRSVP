'use client';

import { MapPin, MessageSquareHeart, Phone } from 'lucide-react';

interface StickyNavProps {
    onOpenContact: () => void;
    onOpenLocation: () => void;
    onOpenRSVP: () => void;
}

const StickyNav = ({ onOpenContact, onOpenLocation, onOpenRSVP }: StickyNavProps) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-stone-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe">
            <div className="flex justify-around items-center p-4 pb-6">
                <button
                    onClick={onOpenContact}
                    className="flex flex-col items-center gap-1 text-stone-600 hover:text-stone-900 transition-colors"
                >
                    <Phone size={20} />
                    <span className="text-xs font-medium">Contact</span>
                </button>

                <button
                    onClick={onOpenLocation}
                    className="flex flex-col items-center gap-1 text-stone-600 hover:text-stone-900 transition-colors"
                >
                    <MapPin size={20} />
                    <span className="text-xs font-medium">Location</span>
                </button>

                <button
                    onClick={onOpenRSVP}
                    className="flex flex-col items-center gap-1 text-stone-600 hover:text-stone-900 transition-colors"
                >
                    <MessageSquareHeart size={20} />
                    <span className="text-xs font-medium">RSVP</span>
                </button>
            </div>
        </div>
    );
};

export default StickyNav;
