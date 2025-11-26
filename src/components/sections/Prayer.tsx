'use client';

import { motion } from 'framer-motion';

const Prayer = () => {
    return (
        <section className="py-20 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto"
            >
                <h2 className="font-serif text-3xl text-stone-800 mb-8">Doa Untuk Pengantin</h2>

                <div className="bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/50">
                    <p className="font-serif text-2xl md:text-3xl text-stone-700 leading-relaxed mb-6" dir="rtl">
                        بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                    </p>

                    <p className="text-stone-600 italic font-serif mb-4">
                        "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fi khair"
                    </p>

                    <p className="text-stone-500 text-sm md:text-base">
                        "Mudah-mudahan Allah memberkatimu, baik ketika senang maupun susah dan selalu mengumpulkan kamu berdua pada kebaikan."
                    </p>

                    <p className="text-stone-400 text-xs mt-4 uppercase tracking-widest">
                        (HR. Abu Daud)
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Prayer;
