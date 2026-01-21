import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const PortfolioPage: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
            if (!error && data) {
                setProjects(data);
            }
            setLoading(false);
        };
        fetchProjects();
    }, []);

    const openImageModal = (imageUrl: string, title: string) => {
        setSelectedImage({ url: imageUrl, title });
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900">Portfolio</h1>
                <p className="text-xl text-slate-500 mb-20 max-w-2xl">A collection of our most impactful automations and AI deployments.</p>

                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading projects...</div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg mb-4">No portfolio projects yet.</p>
                        <p className="text-slate-400 text-sm">Add projects to your Supabase database to see them here.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-10">
                        {projects.map(item => (
                            <div
                                key={item.id}
                                className="bg-white border border-slate-200 rounded-3xl overflow-hidden group transition-all hover:border-orange-600/30 shadow-sm hover:shadow-xl"
                            >
                                {/* Image Section */}
                                {item.image_url && (
                                    <div
                                        onClick={() => openImageModal(item.image_url, item.title)}
                                        className="relative h-64 overflow-hidden bg-slate-100 cursor-pointer"
                                    >
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-slate-900">
                                                Click to view full image
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Content Section */}
                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-1/3 bg-orange-600/5 flex items-center justify-center p-10 border-b md:border-b-0 md:border-r border-slate-200">
                                        <div className="text-center">
                                            <div className="text-orange-600 font-black text-4xl md:text-5xl mb-3">{item.result ? item.result.split(' ')[0] : 'N/A'}</div>
                                            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black leading-tight">{item.result ? item.result.split(' ').slice(1).join(' ') : ''}</div>
                                        </div>
                                    </div>
                                    <div className="p-10 flex-1 flex flex-col justify-center">
                                        <div className="text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-3">{item.category}</div>
                                        <h3 className="text-2xl font-bold mb-4 text-slate-900">{item.title}</h3>
                                        <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6">{item.description}</p>
                                        <div className="flex gap-2 flex-wrap mt-auto">
                                            {item.tags && item.tags.map((tag: string) => (
                                                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Image Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={closeImageModal}
                >
                    <button
                        onClick={closeImageModal}
                        className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all hover:scale-110"
                    >
                        ✕
                    </button>
                    <div className="max-w-7xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.title}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                            <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
