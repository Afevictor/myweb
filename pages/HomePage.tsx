import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Testimonials } from '../components/Testimonials';
import { LatestNews } from '../components/LatestNews';
import { MeetTheFounder } from '../components/MeetTheFounder';
import { ContactForm } from '../components/ContactForm';

export const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <Services />
            <LatestNews />
            <Testimonials />
            <MeetTheFounder />
            <ContactForm />
        </>
    );
};
