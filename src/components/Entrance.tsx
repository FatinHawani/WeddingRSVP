'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MailOpen } from 'lucide-react';

const Entrance = ({ onEnter }: { onEnter: () => void }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleEnter = () => {
        setIsVisible(false);
        onEnter();
        // Dispatch event for AudioPlayer
        window.dispatchEvent(new Event('trigger-audio'));
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-stone-100/90 backdrop-blur-md cursor-pointer"
                    onClick={handleEnter}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 text-center border border-stone-200"
                    >
                        <div className="mb-6 flex justify-center text-rose-400">
                            <MailOpen size={48} strokeWidth={1} />
                        </div>
                        <h1 className="font-serif text-3xl text-stone-800 mb-2">
                            Hanis & Fatin
                        </h1>
                        <p className="text-stone-500 text-sm uppercase tracking-widest mb-8">
                            Jemputan Walimatul Urus
                        </p>
                        <div className="animate-pulse text-stone-400 text-xs tracking-wider">
                            Tap to Open
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Entrance;
