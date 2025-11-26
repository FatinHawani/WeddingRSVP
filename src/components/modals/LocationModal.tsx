'use client';

import { MapPin, Navigation } from 'lucide-react';
import Modal from '../ui/Modal';

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LocationModal = ({ isOpen, onClose }: LocationModalProps) => {
    const address = "Glass House Glenmarie, Jalan Glenmarie, Hicom-glenmarie Industrial Park, 40150 Shah Alam, Selangor";
    const wazeUrl = "https://waze.com/ul?q=Glass%20House%20Glenmarie";
    const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Glass+House+Glenmarie";

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Location">
            <div className="space-y-6">
                <div className="bg-stone-50 p-4 rounded-xl space-y-2">
                    <div className="flex items-start gap-3">
                        <MapPin className="text-rose-500 shrink-0 mt-1" size={20} />
                        <div>
                            <h3 className="font-serif text-lg text-stone-800">Glass House Glenmarie</h3>
                            <p className="text-stone-600 text-sm leading-relaxed mt-1">
                                {address}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <a
                        href={wazeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors font-medium"
                    >
                        <Navigation size={18} />
                        Waze
                    </a>
                    <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
                    >
                        <MapPin size={18} />
                        Google Maps
                    </a>
                </div>
            </div>
        </Modal>
    );
};

export default LocationModal;
