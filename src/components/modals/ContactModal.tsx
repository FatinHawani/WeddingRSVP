'use client';

import { MessageCircle, Phone } from 'lucide-react';
import Modal from '../ui/Modal';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactItem = ({ name, role, phone }: { name: string; role: string; phone: string }) => {
    const cleanPhone = phone.replace(/\D/g, '');

    return (
        <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
            <div>
                <p className="font-medium text-stone-800">{name}</p>
                <p className="text-xs text-stone-500">{role}</p>
            </div>
            <div className="flex gap-2">
                <a
                    href={`https://api.whatsapp.com/send?phone=${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                    aria-label="WhatsApp"
                >
                    <MessageCircle size={18} />
                </a>
                <a
                    href={`tel:${cleanPhone}`}
                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                    aria-label="Call"
                >
                    <Phone size={18} />
                </a>
            </div>
        </div>
    );
};

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Contact Us">
            <div className="space-y-6">
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-stone-400 uppercase tracking-wider">Groom's Family</h3>
                    <ContactItem name="Father Name" role="Father" phone="+60123456789" />
                    <ContactItem name="Mother Name" role="Mother" phone="+60123456789" />
                </div>

                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-stone-400 uppercase tracking-wider">Bride's Family</h3>
                    <ContactItem name="Father Name" role="Father" phone="+60123456789" />
                    <ContactItem name="Mother Name" role="Mother" phone="+60123456789" />
                </div>
            </div>
        </Modal>
    );
};

export default ContactModal;
