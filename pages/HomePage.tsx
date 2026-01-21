import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Testimonials } from '../components/Testimonials';
import { LatestNews } from '../components/LatestNews';
import { MeetTheFounder } from '../components/MeetTheFounder';
import { ContactForm } from '../components/ContactForm';

const SectionDivider = () => (
    <div className="max-w-7xl mx-auto px-6 opacity-30">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
    </div>
);

export const HomePage: React.FC = () => {
    return (
        <div className="space-y-10">
            <Hero />
            <SectionDivider />
            <Services />
            <SectionDivider />
            <LatestNews />
            <SectionDivider />
            <Testimonials />
            <SectionDivider />
            <MeetTheFounder />
            <SectionDivider />
            <ContactForm />
        </div>
    );
};
