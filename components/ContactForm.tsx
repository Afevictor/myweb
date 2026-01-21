import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export const ContactForm: React.FC = () => {
    const [formState, setFormState] = useState({ fullName: '', email: '', goals: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.fullName || !formState.email || !formState.goals) return;

        setIsSubmitting(true);
        const { error } = await supabase.from('leads').insert([
            {
                full_name: formState.fullName,
                email: formState.email,
                goals: formState.goals
            }
        ]);

        setIsSubmitting(false);

        if (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } else {
            setSubmitStatus('success');
            setFormState({ fullName: '', email: '', goals: '' });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="py-32 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-orange-600 opacity-[0.03]"></div>
            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">LET'S BUILD THE <br />FUTURE TOGETHER</h2>
                <p className="text-xl md:text-3xl mb-16 opacity-70 font-light max-w-3xl mx-auto leading-relaxed text-slate-300">Schedule a high-level consultation with Victor Afe.</p>

                <div className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-xl max-w-4xl mx-auto shadow-2xl">
                    <form className="grid md:grid-cols-2 gap-6" onSubmit={handleLeadSubmit}>
                        <div className="flex flex-col text-left gap-2">
                            <label className="text-[10px] uppercase tracking-widest font-black opacity-50 ml-2">Full Name</label>
                            <input
                                required
                                value={formState.fullName}
                                onChange={e => setFormState(s => ({ ...s, fullName: e.target.value }))}
                                className="bg-white/5 border border-white/10 p-5 rounded-2xl placeholder:text-white/20 text-white outline-none focus:ring-2 focus:ring-orange-600 transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="flex flex-col text-left gap-2">
                            <label className="text-[10px] uppercase tracking-widest font-black opacity-50 ml-2">Work Email</label>
                            <input
                                required
                                type="email"
                                value={formState.email}
                                onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                                className="bg-white/5 border border-white/10 p-5 rounded-2xl placeholder:text-white/20 text-white outline-none focus:ring-2 focus:ring-orange-600 transition-all"
                                placeholder="john@company.com"
                            />
                        </div>
                        <div className="md:col-span-2 flex flex-col text-left gap-2">
                            <label className="text-[10px] uppercase tracking-widest font-black opacity-50 ml-2">Your Business Goals</label>
                            <textarea
                                required
                                value={formState.goals}
                                onChange={e => setFormState(s => ({ ...s, goals: e.target.value }))}
                                className="bg-white/5 border border-white/10 p-5 rounded-2xl h-40 placeholder:text-white/20 text-white outline-none focus:ring-2 focus:ring-orange-600 transition-all resize-none"
                                placeholder="How can Victor help your business reach the next level?"
                            ></textarea>
                        </div>
                        <button
                            disabled={isSubmitting || submitStatus === 'success'}
                            className={`md:col-span-2 ${submitStatus === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'} text-white font-black py-5 rounded-2xl text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                            {isSubmitting ? (
                                <span>SENDING...</span>
                            ) : submitStatus === 'success' ? (
                                <span>MESSAGE SENT SUCCESSFULLY!</span>
                            ) : (
                                <>
                                    <span>REQUEST AI AUDIT</span>
                                    <span className="text-2xl">→</span>
                                </>
                            )}
                        </button>
                        {submitStatus === 'error' && (
                            <p className="md:col-span-2 text-red-400 text-center font-bold">
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};
