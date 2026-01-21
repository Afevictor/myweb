import React from 'react';

export const MeetTheFounder: React.FC = () => {
    return (
        <section className="py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-grid"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">Meet the Founder</h2>
                    <div className="w-20 h-1 bg-orange-600 mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Photo Section */}
                    <div className="flex justify-center md:justify-end">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-orange-400 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative w-80 h-80 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                                <img
                                    src="/images/chat_edit_image_20251115_013028-removebg-preview.png"
                                    alt="Victor Afe - Founder of Verturn Technologies"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="space-y-6">
                        <h3 className="text-3xl md:text-4xl font-bold">Victor Afe</h3>
                        <p className="text-orange-400 font-bold text-lg uppercase tracking-widest">AI Automation Expert & Founder</p>

                        <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
                            <p>
                                With over a decade of experience in AI and automation, I've helped businesses across industries transform their operations through intelligent systems and cutting-edge technology.
                            </p>
                            <p>
                                My passion lies in building bespoke solutions that don't just automate—they revolutionize. From voice agents that sound human to CRM integrations that eliminate bottlenecks, I engineer your unfair advantage.
                            </p>
                            <p>
                                At Verturn Technologies, we don't believe in one-size-fits-all. Every solution is crafted specifically for your business, your challenges, and your growth trajectory.
                            </p>
                        </div>

                        {/* LinkedIn Button */}
                        <div className="pt-6">
                            <a
                                href="https://www.linkedin.com/in/victor-afe-690423123/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 group"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span>Connect on LinkedIn</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                            <div>
                                <div className="text-3xl font-black text-orange-400">10+</div>
                                <div className="text-sm text-slate-400 uppercase tracking-wider">Years Experience</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-orange-400">50+</div>
                                <div className="text-sm text-slate-400 uppercase tracking-wider">Projects Delivered</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-orange-400">100%</div>
                                <div className="text-sm text-slate-400 uppercase tracking-wider">Client Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
