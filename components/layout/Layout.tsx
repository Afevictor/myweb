import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';
import SupportChatbot from '../SupportChatbot';

export const Layout: React.FC = () => {
    return (
        <div className="relative bg-slate-50 text-slate-900 selection:bg-orange-600 selection:text-white min-h-screen font-sans">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
            <SupportChatbot />
        </div>
    );
};
