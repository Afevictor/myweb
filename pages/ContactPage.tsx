import React from 'react';
import { ContactForm } from '../components/ContactForm';

export const ContactPage: React.FC = () => {
    return (
        <div className="pt-20 bg-slate-900 min-h-screen">
            <ContactForm />
        </div>
    );
};
