'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import Modal from '../ui/Modal';

const FormalText = () => {
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

    const eventDetails = {
        title: "Walimatul Urus Hanis & Fatin",
        description: "Jemputan Majlis Walimatul Urus Hanis & Fatin\n\n" +
            "La Pelangi Club House, Taman Pelangi Semenyih, 43500 Semenyih, Selangor\n\n" +
            "7:45 PM - 11:00 PM",
        location: "La Pelangi Club House, Taman Pelangi Semenyih, 43500 Semenyih, Selangor",
        startTime: "20260201T194500", // 7:45 PM - YYYYMMDDTHHMMSS format
        endTime: "20260201T230000",   // 11:00 PM
    };

    const generateGoogleCalendarUrl = () => {
        const baseUrl = "https://www.google.com/calendar/render";
        const params = new URLSearchParams({
            action: "TEMPLATE",
            text: eventDetails.title,
            details: eventDetails.description,
            location: eventDetails.location,
            dates: `${eventDetails.startTime}/${eventDetails.endTime}`,
        });
        return `${baseUrl}?${params.toString()}`;
    };

    const downloadICS = () => {
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
DTSTART:${eventDetails.startTime}
DTEND:${eventDetails.endTime}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'wedding.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsCalendarModalOpen(false);
    };

    return (
        <section className="py-20 px-4 text-center space-y-12 max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <p className="text-stone-500 font-medium">
                    Dengan penuh kesyukuran ke hadrat Ilahi
                </p>
                <div className="space-y-2">
                    <p className="text-xl font-serif text-stone-800">Mohamad Fadzil Jaafar <br></br>Hazalina Suratman</p>
                    <p className="text-stone-400 text-sm">&</p>
                    <p className="text-xl font-serif text-stone-800">Ummi Hani Abd Raof</p>
                </div>
                <p className="text-stone-500 font-medium mt-8">
                    menjemput Dato'/Datin/Tuan/Puan/Encik/Cik<br></br>ke majlis perkahwinan putera-puteri kami
                </p>
                <div className="space-y-2">
                    <p className="text-xl font-serif text-stone-800">Muhammad Hanis Irfan bin Mohd Zaid</p>
                    <p className="text-stone-400 text-sm">&</p>
                    <p className="text-xl font-serif text-stone-800">Fatin Hawani binti Mohamad Fadzil</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 space-y-6"
            >
                <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-stone-800">La Pelangi Club House</h3>
                    <p className="text-stone-600">
                        Taman Pelangi Semenyih, 43500 Semenyih, Selangor
                    </p>
                </div>

                <div className="pt-4">
                    <button
                        onClick={() => setIsCalendarModalOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors shadow-md"
                    >
                        <Calendar size={18} />
                        <span>Save The Date</span>
                    </button>
                </div>
            </motion.div>

            <Modal
                isOpen={isCalendarModalOpen}
                onClose={() => setIsCalendarModalOpen(false)}
                title="Save The Date"
            >
                <div className="flex flex-col gap-3">
                    <a
                        href={generateGoogleCalendarUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full p-4 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors group"
                        onClick={() => setIsCalendarModalOpen(false)}
                    >
                        <img
                            src="https://img.icons8.com/?size=100&id=WKF3bm1munsk&format=png&color=000000"
                            alt="Google Calendar"
                            className="w-6 h-6"
                        />
                        <span className="font-medium text-stone-700 group-hover:text-stone-900">Google Calendar</span>
                    </a>

                    <button
                        onClick={downloadICS}
                        className="flex items-center justify-center gap-3 w-full p-4 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors group"
                    >
                        <Calendar className="w-6 h-6 text-stone-600" />
                        <span className="font-medium text-stone-700 group-hover:text-stone-900">Apple Calendar / Outlook</span>
                    </button>
                </div>
            </Modal>
        </section>
    );
};

export default FormalText;
