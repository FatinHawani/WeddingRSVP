'use client';

import { motion } from 'framer-motion';

const Program = () => {
    const schedule = [
        { time: "11:00 AM", event: "Lunch Starts" },
        { time: "12:30 PM", event: "Arrival of Bride & Groom" },
        { time: "01:00 PM", event: "Toast & Cake Cutting" },
        { time: "02:00 PM", event: "Photography Session" },
        { time: "05:00 PM", event: "End of Event" },
    ];

    return (
        <section className="py-20 px-4 max-w-md mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="font-serif text-3xl text-stone-800 mb-2">Tentatif Majlis</h2>
                {/*<p className="text-stone-500 text-sm uppercase tracking-widest">Tentative Schedule</p>*/}
            </motion.div>

            <div className="space-y-4">
                {schedule.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/50"
                    >
                        <div className="w-24 font-medium text-rose-500 text-right shrink-0">
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
