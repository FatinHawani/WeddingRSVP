'use client';

import { motion } from 'framer-motion';

const Program = () => {
    const schedule = [
        { time: "07:45 PM", event: "Kehadiran tetamu" },
        { time: "08:00 PM", event: "Jamuan makan" },
        { time: "09:30 PM", event: "Ketibaan Pengantin" },
        { time: "09:45 PM", event: "Bacaan doa" },
        { time: "10:00 PM", event: "Akad Nikah" },
        { time: "10:45 PM", event: "Bergambar & Majlis bersurai" },
    ];

    return (
        <section className="py-20 px-4 max-w-md mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center mb-8"
            >
                <h2 className="font-serif text-3xl text-stone-800 mb-2">Tentatif Majlis</h2>
                {/*<p className="text-stone-500 text-sm uppercase tracking-widest">Tentative Schedule</p>*/}
            </motion.div>

            <div className="space-y-4">
                {schedule.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/50"
                    >
                        <div className="w-24 font-medium text-amber-400 text-right shrink-0">
                            {item.time}
                        </div>
                        <div className="w-[1px] h-8 bg-stone-300" />
                        <div className="text-stone-700 font-medium">
                            {item.event}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Program;
