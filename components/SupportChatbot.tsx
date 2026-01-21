import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { supabase } from '../lib/supabase';

type ChatState = 'NAME' | 'EMAIL' | 'DETAILS' | 'CLOSED';

const SupportChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentState, setCurrentState] = useState<ChatState>('NAME');
    const [userData, setUserData] = useState({ name: '', email: '', details: '' });
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: "Hello! Welcome to our support chatbot. May I have your name please?", timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [emailAttempts, setEmailAttempts] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const resetChat = () => {
        setCurrentState('NAME');
        setUserData({ name: '', email: '', details: '' });
        setEmailAttempts(0);
        setMessages([
            { role: 'model', text: "Hello! Welcome to our support chatbot. May I have your name please?", timestamp: new Date() }
        ]);
    };

    const handleSend = () => {
        if (!input.trim() || currentState === 'CLOSED') return;

        const userText = input.trim();
        const userMsg: ChatMessage = { role: 'user', text: userText, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Logic transitions
        setTimeout(() => {
            processResponse(userText);
        }, 600);
    };

    const processResponse = (text: string) => {
        switch (currentState) {
            case 'NAME':
                handleNameInput(text);
                break;
            case 'EMAIL':
                handleEmailInput(text);
                break;
            case 'DETAILS':
                handleDetailsInput(text);
                break;
            default:
                break;
        }
    };

    const handleNameInput = (name: string) => {
        setUserData(prev => ({ ...prev, name }));
        setMessages(prev => [...prev, {
            role: 'model',
            text: `Thank you, ${name}. Now, could you provide your email address?`,
            timestamp: new Date()
        }]);
        setCurrentState('EMAIL');
    };

    const handleEmailInput = (email: string) => {
        if (isValidEmail(email)) {
            setUserData(prev => ({ ...prev, email }));
            setMessages(prev => [...prev, {
                role: 'model',
                text: `Great, ${userData.name}. What service do you need, or do you have a complaint or any other details?`,
                timestamp: new Date()
            }]);
            setCurrentState('DETAILS');
        } else {
            const newAttempts = emailAttempts + 1;
            setEmailAttempts(newAttempts);
            if (newAttempts >= 3) {
                setMessages(prev => [...prev, {
                    role: 'model',
                    text: "I'm sorry, I couldn't validate your email. Please try starting a new chat. (Chat session closed.)",
                    timestamp: new Date()
                }]);
                setCurrentState('CLOSED');
            } else {
                setMessages(prev => [...prev, {
                    role: 'model',
                    text: "That doesn't seem like a valid email. Please try again (e.g., example@email.com).",
                    timestamp: new Date()
                }]);
            }
        }
    };

    const handleDetailsInput = async (details: string) => {
        setUserData(prev => ({ ...prev, details }));

        const complaintKeywords = ["complain", "issue", "problem", "feedback"];
        const isComplaint = complaintKeywords.some(word => details.toLowerCase().includes(word));

        const response = isComplaint
            ? `Thank you for sharing your complaint, ${userData.name}. I'll redirect this to our team, and they'll respond to you via ${userData.email} shortly. Have a great day! (Chat session closed.)`
            : `Thank you for sharing, ${userData.name}. Our team will review your request and reach out to you via ${userData.email} soon. Have a great day! (Chat session closed.)`;

        setMessages(prev => [...prev, {
            role: 'model',
            text: response,
            timestamp: new Date()
        }]);
        setCurrentState('CLOSED');

        // Push to Supabase Leads table
        try {
            const { error } = await supabase.from('leads').insert([
                {
                    full_name: userData.name,
                    email: userData.email,
                    goals: details, // Mapping conversation details to 'goals' field
                }
            ]);

            if (error) throw error;
            console.log('Lead pushed to Supabase successfully');
        } catch (err) {
            console.error('Error pushing lead to Supabase:', err);
        }
    };

    const toggleOpen = () => {
        if (!isOpen && currentState === 'CLOSED') {
            resetChat();
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="w-80 md:w-96 h-[500px] bg-white border border-slate-200 rounded-2xl flex flex-col shadow-2xl overflow-hidden ring-1 ring-slate-200">
                    <div className="bg-slate-900 p-4 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${currentState === 'CLOSED' ? 'bg-slate-500' : 'bg-green-400 animate-pulse'}`}></div>
                            <span className="font-bold text-white">Support Bot</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {currentState === 'CLOSED' && (
                                <button onClick={resetChat} className="text-xs text-slate-400 hover:text-white transition-colors">Restart</button>
                            )}
                            <button onClick={() => setIsOpen(false)} className="text-white hover:rotate-90 transition-transform">✕</button>
                        </div>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-xl text-sm shadow-sm ${m.role === 'user' ? 'bg-slate-900 text-white' : 'bg-white text-slate-800 border border-slate-100'
                                    }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-slate-100 bg-white flex gap-2">
                        <input
                            type="text"
                            value={input}
                            disabled={currentState === 'CLOSED'}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={currentState === 'CLOSED' ? "Chat session closed" : "Type your response..."}
                            className="flex-1 bg-slate-50 text-slate-900 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600 outline-none border border-slate-200 disabled:opacity-50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={currentState === 'CLOSED'}
                            className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors shadow-md disabled:opacity-50 disabled:grayscale"
                        >
                            ➔
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={toggleOpen}
                    className="bg-slate-900 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform shadow-slate-900/30 group"
                >
                    <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
                    {currentState !== 'CLOSED' && (
                        <div className="absolute top-0 right-0 w-4 h-4 bg-orange-600 rounded-full border-2 border-white"></div>
                    )}
                </button>
            )}
        </div>
    );
};

export default SupportChatbot;
