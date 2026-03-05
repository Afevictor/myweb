import React from 'react';
import { Link } from 'react-router-dom';
import newsData from '../src/data/news.json';

export const LatestNews: React.FC = () => {
    const latestNews = newsData[0];

    if (!latestNews) return null;

    return (
        <section className="bg-orange-600 py-2.5 mb-16 overflow-hidden relative border-y border-orange-500/50 shadow-lg shadow-orange-600/10">
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-container {
                    display: flex;
                    width: max-content;
                    animation: marquee 40s linear infinite;
                }
                .marquee-container:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="marquee-container">
                {/* Duplicate items for seamless loop */}
                {[1, 2, 3, 4].map((group) => (
                    <div key={group} className="flex items-center gap-12 px-6">
                        <div className="flex items-center gap-4 text-white">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-200 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80 whitespace-nowrap">
                                Breaking AI Pulse:
                            </span>
                            <span className="text-sm font-bold tracking-tight whitespace-nowrap">
                                {latestNews.title}
                            </span>
                            <Link
                                to="/news"
                                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ml-4"
                            >
                                Intelligence Hub →
                            </Link>
                        </div>
                        {/* Add second item if available */}
                        {newsData[1] && (
                            <div className="flex items-center gap-4 text-white opacity-70">
                                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                                <span className="text-sm font-medium tracking-tight whitespace-nowrap italic">
                                    Next: {newsData[1].title}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};
