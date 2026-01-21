import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden px-6 bg-grid">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-slate-50 to-slate-50 -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-200/20 blur-[100px] rounded-full -z-10"></div>

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <div className="inline-block px-4 py-2 rounded-full bg-white border border-slate-200 text-orange-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-8 shadow-sm animate-blink">
                    Victor Afe | AI Automation Expert
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tighter text-slate-900">
                    SCALE WITH <br /> <span className="text-orange-600">AI PRECISION.</span>
                </h1>
                <p className="text-lg md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                    Engineering bespoke automation, high-performance voice agents, and deep CRM logic. We don't just innovate; we build your unfair advantage.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                    <button
                        onClick={() => navigate('/contact')}
                        className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl active:scale-95"
                    >
                        Get Started
                    </button>
                    <button
                        onClick={() => navigate('/portfolio')}
                        className="border border-slate-200 bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-lg hover:border-orange-600 hover:text-orange-600 transition-all shadow-sm active:scale-95"
                    >
                        View Case Studies
                    </button>
                </div>
            </div>
        </section>
    );
};
