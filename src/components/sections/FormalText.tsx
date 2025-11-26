'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const FormalText = () => {
    const handleSaveDate = () => {
        // Generate .ics file content
        const event = {
            title: "Wedding of Groom & Bride",
            description: "Join us for our wedding celebration!",
            location: "Glass House Glenmarie",
            startTime: "2025-12-26T11:00:00",
            endTime: "2025-12-26T17:00:00",
        };

        // Simple .ics generation logic (mock for now, or simple string construction)
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${event.startTime.replace(/[-:]/g, '')}
DTEND:${event.endTime.replace(/[-:]/g, '')}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'wedding.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="py-20 px-4 text-center space-y-12 max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <p className="text-stone-500 font-medium">
                    Together with their families
                </p>
                <div className="space-y-2">
                    <p className="text-xl font-serif text-stone-800">Mr. & Mrs. Groom Parents</p>
                    <p className="text-stone-400 text-sm">&</p>
                    <p className="text-xl font-serif text-stone-800">Mr. & Mrs. Bride Parents</p>
                </div>
                <p className="text-stone-500 font-medium mt-8">
                    Cordially invite you to celebrate the wedding of their children
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 space-y-6"
            >
                <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-stone-800">Glass House Glenmarie</h3>
                    <p className="text-stone-600">
                        Jalan Glenmarie, Hicom-glenmarie Industrial Park,<br />
                        40150 Shah Alam, Selangor
                    </p>
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSaveDate}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors shadow-md"
                    >
                        <Calendar size={18} />
                        <span>Save The Date</span>
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default FormalText;
