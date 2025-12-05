'use client';

import { MessageCircle, Phone, User } from 'lucide-react';
import Modal from '../ui/Modal';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactItem = ({ name, role, phone }: { name: string; role: string; phone: string }) => {
    const cleanPhone = phone.replace(/\D/g, '');

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3">
                <div>
                    <p className="font-medium text-stone-800">{name}</p>
                    <p className="text-xs text-stone-400">{role}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <a
                    href={`https://api.whatsapp.com/send?phone=${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-gradient-to-br from-green-400 to-green-500 text-white rounded-full hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-sm hover:shadow-md"
                    aria-label="WhatsApp"
                >
                    <MessageCircle size={18} />
                </a>
            </div>
        </div>
    );
};

interface ContactSectionProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

const ContactSection = ({ title, subtitle, children }: ContactSectionProps) => (
    <div className="space-y-3">
        <div className="text-center pb-2 border-b border-stone-100">
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">{title}</p>
            <p className="text-sm font-serif text-stone-700">{subtitle}</p>
        </div>
        <div className="space-y-2">
            {children}
        </div>
    </div>
);

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Hubungi Kami">
            <div className="space-y-6">
                <ContactSection title="Pengantin Lelaki" subtitle="Muhammad Hanis Irfan Bin Mohd Zaid">
                    <ContactItem name="Nur Ezzaty Farhana" role="Kakak Pengantin" phone="+60137217485" />
                    <ContactItem name="Muhammad Haziq" role="Abang Pengantin" phone="+60193185624" />
                </ContactSection>

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
                    <p className="text-xs text-stone-400">&</p>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-stone-200 to-transparent" />
                </div>

                <ContactSection title="Pengantin Perempuan" subtitle="Fatin Hawani Binti Mohamad Fadzil">
                    <ContactItem name="Mohamad Fadzil Jaafar" role="Bapa Pengantin" phone="+60178767241" />
                    <ContactItem name="Hazalina Suratman" role="Ibu Pengantin" phone="+60192077241" />
                </ContactSection>
            </div>
        </Modal>
    );
};

export default ContactModal;
