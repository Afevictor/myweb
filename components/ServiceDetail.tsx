import React from 'react';
import { SERVICES, SERVICE_DETAILS } from '../constants';

interface Props {
  serviceId: string;
  onBack: () => void;
}

const ServiceDetail: React.FC<Props> = ({ serviceId, onBack }) => {
  const service = SERVICES.find(s => s.id === serviceId);
  const currentDetail = SERVICE_DETAILS[serviceId] || SERVICE_DETAILS['ai-automation-architecture'];

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen relative overflow-hidden bg-grid">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-200/20 blur-[100px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <button
          onClick={onBack}
          className="text-orange-600 font-bold mb-10 flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
        >
          ← Back to Home
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">{service?.category}</span>
              <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-900">{currentDetail.fullTitle}</h1>
            </div>

            <p className="text-slate-500 text-xl leading-relaxed">
              {currentDetail.content}
            </p>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Why This Matters:</h3>
              <ul className="grid md:grid-cols-2 gap-4">
                {currentDetail.keyBenefits.map((benefit, i) => (
                  <li key={i} className="flex gap-3 items-start p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-orange-600 font-bold">✓</span>
                    <span className="text-slate-600 text-sm leading-tight font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 bg-slate-900 rounded-[2.5rem] space-y-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-orange-600/5 group-hover:opacity-0 transition-opacity"></div>
              <h3 className="text-3xl font-black text-white relative z-10">The Verturn Edge</h3>
              <p className="text-slate-300 text-lg relative z-10 leading-relaxed">
                We don't just "set up" AI; we build custom-engineered systems that talk to your CRM, book your meetings, and secure your future.
              </p>
              <button
                onClick={() => {
                  onBack();
                  setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
                }}
                className="w-full bg-orange-600 text-white font-black py-5 rounded-2xl text-xl hover:bg-orange-700 hover:scale-[1.02] active:scale-95 transition-all shadow-xl relative z-10"
              >
                {currentDetail.cta}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-orange-200/30 blur-3xl rounded-full"></div>
            <div className="relative rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl group bg-white">
              <img
                src={currentDetail.image}
                alt={currentDetail.imageDesc}
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-10">
                <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-8 rounded-3xl shadow-2xl">
                  <p className="text-slate-900 font-bold italic text-lg leading-relaxed">"Victor's approach to AI isn't just about software; it's about business transformation. This is the ROI we've been waiting for."</p>
                  <p className="text-orange-600 text-xs font-black uppercase tracking-widest mt-4">— Tech Industry Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;