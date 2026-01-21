import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface NewsItem {
    id: string;
    title: string;
    content: string;
    image_url?: string;
    source_url?: string;
    published_at: string;
}

export const NewsPage: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('news').select('*').order('published_at', { ascending: false });
            if (!error && data) {
                setNews(data);
            }
            setLoading(false);
        };
        fetchNews();
    }, []);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 tracking-tight">AI News</h1>
                <p className="text-xl text-slate-500 mb-20">The latest updates from the world of Artificial Intelligence and our lab.</p>

                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading news...</div>
                ) : news.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">No news articles found.</div>
                ) : (
                    <div className="space-y-12">
                        {news.map(item => (
                            <article key={item.id} className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                                {item.image_url && (
                                    <div className="overflow-hidden rounded-2xl mb-8">
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-64 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="text-orange-600 font-bold text-xs uppercase tracking-widest mb-4">
                                    {new Date(item.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 tracking-tight">{item.title}</h2>
                                <div className="prose prose-slate max-w-none text-slate-500 leading-relaxed mb-8">
                                    {item.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                                </div>
                                {item.source_url && (
                                    <a
                                        href={item.source_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all"
                                    >
                                        Read Full Article on Source <span>→</span>
                                    </a>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
