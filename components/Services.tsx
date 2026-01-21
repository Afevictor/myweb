import React from 'react';
import { SERVICES } from '../constants';
import { useNavigate } from 'react-router-dom';

export const Services: React.FC = () => {
    // In a real app we might route to /services/:id, but for now we can maybe just show them or link to contact
    // or if we want to keep the "Detail" view, we can use a modal or a route.
    // Let's assume we want to route to a detail page.
    const navigate = useNavigate();

    return (
        <section id="services" className="py-32 max-w-7xl mx-auto px-6 relative bg-white rounded-[4rem] shadow-sm z-10 -mt-10 border border-slate-100">
            <div className="mb-12">
                <span className="text-orange-600 font-bold text-[10px] uppercase tracking-[0.4em]">What we do</span>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {SERVICES.map(s => (
                    <div
                        key={s.id}
                        className="group p-6 bg-white border border-slate-100 rounded-2xl transition-all hover:bg-slate-50"
                    >
                        <div className="text-3xl mb-4">{s.icon}</div>
                        <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-orange-600 transition-colors">{s.title}</h3>
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{s.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
