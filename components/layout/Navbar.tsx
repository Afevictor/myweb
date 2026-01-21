import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Videos', path: '/videos' },
        { name: 'News', path: '/news' },
    ];

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-light border-b border-slate-200 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center font-bold text-xl text-white shadow-md group-hover:scale-110 transition-transform">V</div>
                    <span className="font-black text-lg md:text-xl tracking-tighter uppercase whitespace-nowrap text-slate-900">Verturn Technologies</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500 items-center">
                    {navLinks.map(link => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`hover:text-orange-600 transition-colors ${location.pathname === link.path ? 'text-orange-600' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        className="bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-orange-700 hover:scale-105 transition-all shadow-lg shadow-orange-600/20"
                    >
                        Free Consultation
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button className="lg:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-6 shadow-xl">
                    {navLinks.map(link => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm font-bold uppercase tracking-widest text-slate-600 hover:text-orange-600"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="bg-orange-600 text-center text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg"
                    >
                        Free Consultation
                    </Link>
                </div>
            )}
        </header>
    );
};
