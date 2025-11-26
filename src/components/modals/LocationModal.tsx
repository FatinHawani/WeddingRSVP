'use client';

import { MapPin, Navigation } from 'lucide-react';
import Modal from '../ui/Modal';

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LocationModal = ({ isOpen, onClose }: LocationModalProps) => {
    const address = "La Pelangi Club House Tmn. Pelangi Semenyih, Taman Pelangi Semenyih, 43500 Semenyih, Selangor";
    const wazeUrl = "https://waze.com/ul?q=La%20Pelangi%20Club%20House%20Tmn.%20Pelangi%20Semenyih";
    const googleMapsUrl = "https://maps.app.goo.gl/gQCgFJS1WadRNYtJ8";

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Location">
            <div className="space-y-6">
                <div className="bg-stone-50 p-4 rounded-xl space-y-2">
                    <div className="flex items-start gap-3">
                        <MapPin className="text-rose-500 shrink-0 mt-1" size={20} />
                        <div>
                            <h3 className="font-serif text-lg text-stone-800">La Pelangi Club House</h3>
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
