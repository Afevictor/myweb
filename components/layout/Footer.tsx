import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="py-20 bg-white border-t border-slate-100 text-slate-500 text-center relative z-10">
            <div className="mb-6 flex justify-center items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center font-bold text-white shadow-md">V</div>
                <span className="text-slate-900 font-black tracking-tighter uppercase">Verturn</span>
            </div>

            <p className="text-sm">© {new Date().getFullYear()} Victor Afe. Verturn Technologies. All rights reserved.</p>
        </footer>
    );
};
