'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date('2026-02-01T00:00:00');

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="font-serif text-3xl text-stone-800 mb-8">Menghitung Hari</h2>
                <h2 className="font-[Open_Sans] text-2xl text-amber-400">Ahad</h2>
                <h2 className="font-[Open_Sans] text-2xl text-amber-400 mb-2 ">1 Februari 2026</h2>
                <h2 className="font-[Open_Sans] text-2xl text-amber-400 mb-8 ">١٤٤٧ شعبان ١٣ </h2>



                <div className="flex justify-center gap-4 md:gap-8">
                    {[
                        { label: 'Hari', value: timeLeft.days },
                        { label: 'Jam', value: timeLeft.hours },
                        { label: 'Minit', value: timeLeft.minutes },
                        { label: 'Saat', value: timeLeft.seconds },
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="bg-white/60 backdrop-blur-sm w-16 h-16 md:w-20 md:h-20 rounded-xl shadow-md flex items-center justify-center border border-white/50 mb-2">
                                <span className="text-2xl md:text-3xl font-serif text-amber-400 font-medium animate-pulse delay-300">
                                    {item.value}
                                </span>
                            </div>
                            <span className="text-xs text-stone-500 uppercase tracking-wider">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Countdown;
