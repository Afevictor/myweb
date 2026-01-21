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
        <section className="bg-orange-600 py-2 mb-16 overflow-hidden relative">
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .marquee-content {
                    animation: marquee 25s linear infinite;
                    white-space: nowrap;
                }
            `}</style>

            <div className="marquee-content inline-flex items-center gap-3 text-white">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">
                    {new Date(latestNews.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span className="text-xs font-semibold">
                    {latestNews.title}
                </span>
                <Link
                    to="/news"
                    className="text-[10px] font-bold uppercase tracking-wider hover:underline ml-2"
                >
                    Read More →
                </Link>
            </div>
        </section>
    );
};
