import React from 'react';
import { InteractiveServices } from '../components/InteractiveServices';
import { Hero } from '../components/Hero';

export const ServicesPage: React.FC = () => {
    return (
        <div className="pt-20">
            <section className="bg-slate-900 py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-5"></div>
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Our Services</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        High-performance AI systems custom-engineered for vertical growth and absolute security.
                    </p>
                </div>
            </section>
            <InteractiveServices />
        </div>
    );
};
