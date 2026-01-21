import React from 'react';
import { SERVICES, SERVICE_DETAILS } from '../constants';
import { useNavigate } from 'react-router-dom';

export const InteractiveServices: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section id="detailed-services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Our Core Services</h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Deep-engineered solutions for enterprise growth and operational excellence.
                        Each system is custom-built for your specific business logic.
                    </p>
                </div>

                <div className="space-y-32">
                    {SERVICES.map((s, index) => {
                        const detail = SERVICE_DETAILS[s.id];
                        if (!detail) return null;

                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={s.id}
                                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
                            >
                                {/* Image Box */}
                                <div className="w-full md:w-1/2 relative group">
                                    <div className="absolute -inset-4 bg-orange-600/5 rounded-[3rem] blur-2xl group-hover:bg-orange-600/10 transition-colors"></div>
                                    <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl">
                                        <img
                                            src={detail.image}
                                            alt={detail.imageDesc}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                                    </div>
                                </div>

                                {/* Content Box */}
                                <div className="w-full md:w-1/2 space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{s.icon}</span>
                                            <span className="text-orange-600 font-bold text-xs uppercase tracking-[0.3em] font-mono">
                                                {s.category}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                                            {detail.fullTitle}
                                        </h3>
                                    </div>

                                    <p className="text-slate-500 text-lg leading-relaxed">
                                        {detail.content}
                                    </p>

                                    <ul className="space-y-3">
                                        {detail.keyBenefits.map((b, i) => (
                                            <li key={i} className="flex items-center gap-4 text-slate-700 font-medium">
                                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full flex-shrink-0"></div>
                                                <span className="text-base">{b}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-6">
                                        <button
                                            onClick={() => {
                                                const contactSection = document.getElementById('contact');
                                                if (contactSection) {
                                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                                } else {
                                                    navigate('/contact');
                                                }
                                            }}
                                            className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-orange-600 transition-all shadow-xl active:scale-95 group"
                                        >
                                            {detail.cta}
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
