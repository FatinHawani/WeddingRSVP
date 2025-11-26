'use client';

import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Modal from '../ui/Modal';
import { supabase } from '@/lib/supabase';

interface Wish {
    id: number;
    name: string;
    message: string;
}

const Guestbook = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newWish, setNewWish] = useState({ name: '', message: '' });
    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(Math.max(0, carouselRef.current.scrollWidth - carouselRef.current.offsetWidth));
        }
    }, [wishes]);

    useEffect(() => {
        fetchWishes();

        // Subscribe to new wishes
        const channel = supabase
            .channel('wishes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'wishes' }, (payload) => {
                setWishes((current) => [payload.new as Wish, ...current]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchWishes = async () => {
        try {
            const { data, error } = await supabase
                .from('wishes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setWishes(data);
        } catch (error) {
            console.error('Error fetching wishes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newWish.name || !newWish.message) return;

        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('wishes')
                .insert([newWish]);

            if (error) throw error;

            setNewWish({ name: '', message: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error submitting wish:', error);
            alert('Failed to send wish. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 px-4 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="font-serif text-3xl text-stone-800 mb-2">Guestbook</h2>
                {/*<p className="text-stone-500 text-sm uppercase tracking-widest">Wishes</p> */}
            </motion.div>

            {/* Carousel */}
            <div className="relative w-full max-w-4xl mx-auto mb-12 min-h-[200px]">
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="animate-spin text-rose-400" size={32} />
                    </div>
                ) : wishes.length === 0 ? (
                    <div className="text-center text-stone-400 italic">
                        Be the first to leave a wish!
                    </div>
                ) : (
                    <motion.div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
                        <motion.div
                            className="flex gap-6 px-4"
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                        >
                            {wishes.map((wish) => (
                                <div
                                    key={wish.id}
                                    className="min-w-[280px] md:min-w-[320px] bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50 select-none shrink-0"
                                >
                                    <p className="font-serif text-stone-700 italic mb-4 whitespace-pre-wrap">"{wish.message}"</p>
                                    <p className="text-stone-500 text-sm font-medium text-right">- {wish.name}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </div>

            <div className="text-center">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-amber-400 text-white rounded-full hover:bg-amber-300 transition-colors shadow-md "
                >
                    <Send size={18} />
                    <span>Hantarkan Ucapan</span>
                </button>
            </div>

            {/* Wish Input Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ucapan">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">Name</label>
                        <input
                            type="text"
                            value={newWish.name}
                            onChange={(e) => setNewWish(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">Message</label>
                        <textarea
                            rows={4}
                            value={newWish.message}
                            onChange={(e) => setNewWish(prev => ({ ...prev, message: e.target.value }))}
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
                            placeholder="Write your wishes here..."
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Sending...
                            </>
                        ) : (
                            'Send Message'
                        )}
                    </button>
                </form>
            </Modal>
        </section>
    );
};

export default Guestbook;
