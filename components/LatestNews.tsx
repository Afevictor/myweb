import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface NewsItem {
    id: string;
    title: string;
    content: string;
    image_url?: string;
    source_url?: string;
    published_at: string;
}

export const LatestNews: React.FC = () => {
    const [latestNews, setLatestNews] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestNews = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .eq('is_published', true)
                .order('published_at', { ascending: false })
                .limit(1)
                .single();

            if (!error && data) {
                setLatestNews(data);
            }
            setLoading(false);
        };
        fetchLatestNews();
    }, []);

    if (loading || !latestNews) return null;

    return (
        <section className="py-16 bg-slate-50/50">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">AI Insights</h2>
                    <Link to="/news" className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">
                        All News →
                    </Link>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row items-stretch">
                        {latestNews.image_url && (
                            <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                                <img
                                    src={latestNews.image_url}
                                    alt={latestNews.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        )}
                        <div className={`p-6 md:p-8 flex flex-col justify-center ${latestNews.image_url ? 'md:w-3/5' : 'w-full'}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
                                <span className="text-orange-600 font-bold text-[10px] uppercase tracking-[0.2em]">
                                    {new Date(latestNews.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold mb-4 text-slate-900 leading-snug group-hover:text-orange-600 transition-colors tracking-tight">
                                {latestNews.title}
                            </h3>

                            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                {latestNews.content}
                            </p>

                            <div className="mt-auto">
                                <a
                                    href={latestNews.source_url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-black text-slate-900 hover:text-orange-600 transition-colors group"
                                >
                                    Read Full Insight
                                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
