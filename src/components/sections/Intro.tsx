'use client';

import { motion } from 'framer-motion';

const Intro = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center space-y-8 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <p className="text-stone-500 uppercase tracking-[0.2em] text-sm md:text-base mb-4">
                    Walimatul Urus
                </p>
                <h1 className="font-serif text-6xl md:text-8xl text-stone-800 leading-tight">
                    Hanis
                </h1>
                <div className="text-4xl md:text-6xl text-rose-400 my-4 font-serif italic">
                    &
                </div>
                <h1 className="font-serif text-6xl md:text-8xl text-stone-800 leading-tight">
                    Fatin
                </h1>
                <div className="mt-12 flex flex-col items-center gap-2">
                    <div className="h-16 w-[1px] bg-stone-300 mb-4" />
                    <p className="text-stone-600 font-medium text-lg tracking-wide">
                        Ahad
                    </p>
                    <p className="text-stone-800 font-[Open_Sans] text-3xl">
                        1 Februari 2026
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Intro;
