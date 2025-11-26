'use client';

import { motion } from 'framer-motion';

const Intro = ({ hasEntered }: { hasEntered: boolean }) => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center space-y-8 py-20">
            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.5,
                            delayChildren: 0.3
                        }
                    }
                }}
                initial="hidden"
                animate={hasEntered ? "show" : "hidden"}
            >
                <motion.p
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
                    }}
                    className="text-stone-500 uppercase tracking-[0.2em] text-sm md:text-base mb-8"
                >
                    Walimatul Urus
                </motion.p>
                <motion.h1
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
                    }}
                    className="font-serif text-6xl md:text-8xl text-stone-800 leading-tight"
                >
                    حانيس
                </motion.h1>
                <motion.div
                    variants={{
                        hidden: { opacity: 0, scale: 0.5 },
                        show: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: "easeOut" } }
                    }}
                    className="text-4xl md:text-6xl text-amber-300 my-4 font-serif italic"
                >
                    و
                </motion.div>
                <motion.h1
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
                    }}
                    className="font-serif text-6xl md:text-8xl text-stone-800 leading-tight"
                >
                    فاتين
                </motion.h1>
                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
                    }}
                    className="mt-12 flex flex-col items-center gap-2"
                >
                    <motion.div
                        variants={{
                            hidden: { height: 0, opacity: 0 },
                            show: { height: 64, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }
                        }}
                        className="w-[1px] bg-stone-300 mb-4"
                    />
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
                        }}
                        className="text-amber-300 font-[Open_Sans] text-3xl"
                    >
                        Ahad
                    </motion.p>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
                        }}
                        className="text-amber-300 font-[Open_Sans] text-3xl"
                    >
                        1 Februari 2026
                    </motion.p>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
                        }}
                        className="text-amber-300 font-[Open_Sans] text-3xl"
                    >
                        ١٤٤٧ شعبان ١٣
                    </motion.p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Intro;
