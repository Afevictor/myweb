import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const VideosPage: React.FC = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
            if (!error && data) {
                setVideos(data);
            }
            setLoading(false);
        };
        fetchVideos();
    }, []);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900">Videos & Tutorials</h1>
                <p className="text-xl text-slate-500 mb-20 max-w-2xl">Visual proof of our automated systems in action.</p>

                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading videos...</div>
                ) : videos.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg mb-4">No videos yet.</p>
                        <p className="text-slate-400 text-sm">Add videos to your Supabase database to see them here.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {videos.map(video => (
                            <div key={video.id} className="group cursor-pointer flex flex-col gap-5">
                                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                                    <img src={video.thumbnail || 'https://via.placeholder.com/640x360'} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                                        <div className="w-14 h-14 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 transition-transform group-hover:scale-110">
                                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-slate-900 border-b-[8px] border-b-transparent ml-1"></div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                                        {video.duration || '00:00'}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl mb-2 group-hover:text-orange-600 transition-colors line-clamp-1 text-slate-900">{video.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
