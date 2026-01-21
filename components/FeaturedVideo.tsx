import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface Video {
    id: string;
    title: string;
    description?: string;
    thumbnail_url?: string;
    video_url: string;
    duration?: string;
}

export const FeaturedVideo: React.FC = () => {
    const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedVideo = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('videos')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (!error && data) {
                setFeaturedVideo(data);
            }
            setLoading(false);
        };
        fetchFeaturedVideo();
    }, []);

    if (loading || !featuredVideo) return null;

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900">Featured Demo</h2>
                    <Link to="/videos" className="text-orange-600 font-bold hover:underline">View All Videos →</Link>
                </div>

                <div className="group cursor-pointer">
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">
                        <img
                            src={featuredVideo.thumbnail_url || featuredVideo.thumbnail || 'https://via.placeholder.com/1280x720'}
                            alt={featuredVideo.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                            <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
                            </div>
                        </div>
                        <div className="absolute bottom-8 left-8 right-8">
                            <span className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-3 inline-block shadow-lg">Featured Demo</span>
                            <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg mb-2">{featuredVideo.title}</h3>
                            <p className="text-white text-sm md:text-base line-clamp-2 opacity-90">{featuredVideo.description}</p>
                        </div>
                        {featuredVideo.duration && (
                            <div className="absolute top-4 right-4 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded">
                                {featuredVideo.duration}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
