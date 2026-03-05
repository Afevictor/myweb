import React from 'react';
import { Link } from 'react-router-dom';
import newsData from '../src/data/news.json';

interface NewsItem {
    id: string;
    title: string;
    summary: string;
    category: string;
    date: string;
    image_url: string;
    source_url: string;
}

export const NewsPage: React.FC = () => {
    const featured = newsData[0] as NewsItem;
    const secondary = newsData.slice(1) as NewsItem[];

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[#fcfcfc]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-slate-200 pb-12">
                    <div className="max-w-2xl">
                        <span className="text-orange-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">The Intelligence Brief</span>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">AI NEWS.</h1>
                    </div>
                    <p className="text-slate-500 font-medium text-lg max-w-sm text-right">
                        Daily curation of high-impact AI developments from the world's leading labs.
                    </p>
                </div>

                {/* Magazine Layout */}
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-20">
                        {/* Hero Item */}
                        {featured && (
                            <article className="group cursor-pointer" onClick={() => window.open(featured.source_url, '_blank')}>
                                <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden mb-10 shadow-2xl">
                                    <img
                                        src={featured.image_url}
                                        alt={featured.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                    <div className="absolute bottom-10 left-10">
                                        <span className="bg-orange-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                                            {featured.category}
                                        </span>
                                    </div>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight group-hover:text-orange-600 transition-colors">
                                    {featured.title}
                                </h2>
                                <p className="text-slate-500 text-xl leading-relaxed mb-8 line-clamp-3">
                                    {featured.summary}
                                </p>
                                <div className="flex items-center gap-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
                                    <span>{new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                                    <span className="text-orange-600">Read Analysis →</span>
                                </div>
                            </article>
                        )}

                        {/* Secondary Grid */}
                        <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
                            {secondary.map(item => (
                                <article key={item.id} className="group cursor-pointer" onClick={() => window.open(item.source_url, '_blank')}>
                                    <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 border border-slate-100 shadow-sm">
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <span className="text-orange-600 font-bold text-[9px] uppercase tracking-widest mb-3 block">
                                        {item.category}
                                    </span>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-orange-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                        {item.summary}
                                    </p>
                                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                            <h3 className="text-2xl font-black mb-8 tracking-tight">Consultant's Picks</h3>
                            <div className="space-y-8">
                                {newsData.slice(0, 4).map((item, i) => (
                                    <div key={item.id} className="group cursor-pointer border-b border-white/10 pb-8 last:border-0 last:pb-0" onClick={() => window.open(item.source_url, '_blank')}>
                                        <div className="text-orange-500 font-mono text-xs mb-3">0{i + 1} / {item.category}</div>
                                        <h4 className="text-lg font-bold leading-tight group-hover:text-orange-400 transition-colors">
                                            {item.title}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 pt-10 border-t border-white/10">
                                <p className="text-slate-400 text-sm italic leading-relaxed">
                                    "We analyze thousands of signal pulses daily to bring you only the vectors that matter for automation and business growth."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
