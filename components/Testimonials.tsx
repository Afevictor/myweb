import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const Testimonials: React.FC = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('testimonials').select('*');
            if (!error && data) {
                setTestimonials(data);
            }
            setLoading(false);
        };
        fetchTestimonials();
    }, []);


    if (loading) {
        return (
            <section id="testimonials" className="py-32 max-w-7xl mx-auto px-6 bg-slate-50">
                <div className="text-center">
                    <p className="text-slate-400">Loading testimonials...</p>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return null; // Hide section if no testimonials
    }

    return (
        <section id="testimonials" className="py-32 max-w-7xl mx-auto px-6 bg-slate-50">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tighter">Client Success</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map(t => (
                    <div key={t.id} className="p-10 bg-white border border-slate-200 rounded-3xl relative flex flex-col shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-orange-600 text-8xl absolute top-4 right-8 opacity-5 font-serif leading-none">"</div>
                        <p className="text-slate-600 italic mb-10 text-lg leading-relaxed relative z-10 flex-1">"{t.content}"</p>
                        <div className="flex items-center gap-5 mt-auto relative z-10">
                            <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-xl text-orange-600 shadow-inner overflow-hidden">
                                {t.avatar_url ? <img src={t.avatar_url} alt={t.name} className="w-full h-full object-cover" /> : t.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-lg text-slate-900">{t.name}</div>
                                <div className="text-xs text-orange-600 uppercase tracking-widest font-black">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
