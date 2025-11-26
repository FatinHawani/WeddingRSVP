'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

const RSVPForm = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        attending: true,
        adults: 1,
        kids: 0,
    });
    const [status, setStatus] = useState<'idle' | 'checking' | 'confirm-update' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const checkPhoneNumber = async () => {
        setStatus('checking');
        try {
            const { data, error } = await supabase
                .from('rsvps')
                .select('id')
                .eq('phone_number', formData.phone)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found"
                throw error;
            }

            if (data) {
                setStatus('confirm-update');
            } else {
                submitRSVP();
            }
        } catch (error) {
            console.error('Error checking phone:', error);
            setErrorMessage('Failed to verify phone number. Please try again.');
            setStatus('error');
        }
    };

    const submitRSVP = async () => {
        setStatus('submitting');
        try {
            const { error } = await supabase
                .from('rsvps')
                .upsert({
                    name: formData.name,
                    phone_number: formData.phone,
                    attending: formData.attending,
                    adults_count: Number(formData.adults),
                    kids_count: Number(formData.kids),
                }, { onConflict: 'phone_number' });

            if (error) throw error;

            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ name: '', phone: '', attending: true, adults: 1, kids: 0 });
            }, 2000);
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            setErrorMessage('Failed to submit RSVP. Please try again.');
            setStatus('error');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) {
            setErrorMessage('Please fill in all required fields.');
            setStatus('error');
            return;
        }
        checkPhoneNumber();
    };

    if (status === 'success') {
        return (
            <div className="text-center py-8">
                <div className="text-green-500 text-xl font-serif mb-2">Thank you!</div>
                <p className="text-stone-600">Your RSVP has been received.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'confirm-update' ? (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center space-y-4">
                    <p className="text-yellow-800 text-sm">
                        Nombor ini telah didaftarkan. Adakah anda ingin mengemaskini RSVP anda?
                    </p>
                    <div className="flex gap-2 justify-center">
                        <button
                            type="button"
                            onClick={() => setStatus('idle')}
                            className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={submitRSVP}
                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm"
                        >
                            Update
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">Nama Penuh</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">Nombor Telefon</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
                            placeholder="e.g. 0123456789"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2 py-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="attending"
                                checked={formData.attending}
                                onChange={(e) => setFormData(prev => ({ ...prev, attending: e.target.checked }))}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-400"></div>
                            <span className="ml-3 text-sm font-medium text-stone-700">
                                {formData.attending ? 'Hadir' : 'Tidak Hadir'}
                            </span>
                        </label>
                    </div>

                    {formData.attending && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">Dewasa</label>
                                <select
                                    name="adults"
                                    value={formData.adults}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
                                >
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">Kanak-kanak (6-17)</label>
                                <select
                                    name="kids"
                                    value={formData.kids}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
                                >
                                    {[0, 1, 2, 3, 4, 5, 6, 7].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'checking' || status === 'submitting'}
                        className="w-full py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {(status === 'checking' || status === 'submitting') && <Loader2 className="animate-spin" size={18} />}
                        {status === 'checking' ? 'Checking...' : status === 'submitting' ? 'Submitting...' : 'Submit RSVP'}
                    </button>
                </>
            )}
        </form>
    );
};

export default RSVPForm;
