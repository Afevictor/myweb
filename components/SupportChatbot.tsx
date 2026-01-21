import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { supabase } from '../lib/supabase';
import { getIntelligentResponse } from '../services/intelligentChatService';

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
    const [isTyping, setIsTyping] = useState(false);
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
        setIsTyping(true);

        // Logic transitions
        setTimeout(() => {
            processResponse(userText);
        }, 1000);
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

    const handleNameInput = async (name: string) => {
        // Intelligence check: Is this a question instead of a name?
        if (name.length > 20 || name.includes('?') || name.toLowerCase().includes('how') || name.toLowerCase().includes('what')) {
            const aiAck = await getIntelligentResponse(name, messages);
            setMessages(prev => [...prev, {
                role: 'model',
                text: `${aiAck || "That's a great question!"} However, I need your name first to properly record your inquiry. What's your name?`,
                timestamp: new Date()
            }]);
            setIsTyping(false);
            return;
        }

        setUserData(prev => ({ ...prev, name }));
        setMessages(prev => [...prev, {
            role: 'model',
            text: `Thank you, ${name}. Now, could you provide your email address?`,
            timestamp: new Date()
        }]);
        setCurrentState('EMAIL');
        setIsTyping(false);
    };

    const handleEmailInput = async (email: string) => {
        if (isValidEmail(email)) {
            setUserData(prev => ({ ...prev, email }));
            setMessages(prev => [...prev, {
                role: 'model',
                text: `Great, ${userData.name}. What service do you need, or do you have a complaint or any other details?`,
                timestamp: new Date()
            }]);
            setCurrentState('DETAILS');
            setIsTyping(false);
        } else {
            // Check if it's a question instead of an email
            if (email.includes('?') || email.toLowerCase().includes('tell me')) {
                const aiAck = await getIntelligentResponse(email, messages);
                setMessages(prev => [...prev, {
                    role: 'model',
                    text: `${aiAck || "I'd love to explain that!"} But first, could you provide a valid email so we can follow up?`,
                    timestamp: new Date()
                }]);
                setIsTyping(false);
                return;
            }

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
            setIsTyping(false);
        }
    };

    const handleDetailsInput = async (details: string) => {
        setUserData(prev => ({ ...prev, details }));

        // Intelligent response generation
        const aiResponse = await getIntelligentResponse(details, messages);

        const complaintKeywords = ["complain", "issue", "problem", "feedback"];
        const isComplaint = complaintKeywords.some(word => details.toLowerCase().includes(word));

        const response = aiResponse
            ? `${aiResponse}\n\nOur team will review your request and reach out to you via ${userData.email} soon. Have a great day!`
            : (isComplaint
                ? `Thank you for sharing your complaint, ${userData.name}. I'll redirect this to our team, and they'll respond to you via ${userData.email} shortly. Have a great day!`
                : `Thank you for sharing, ${userData.name}. Our team will review your request and reach out to you via ${userData.email} soon. Have a great day!`);

        setMessages(prev => [...prev, {
            role: 'model',
            text: `${response} (Chat session closed.)`,
            timestamp: new Date()
        }]);
        setCurrentState('CLOSED');
        setIsTyping(false);

        // Push to Supabase Leads table
        try {
            await supabase.from('leads').insert([
                {
                    full_name: userData.name,
                    email: userData.email,
                    goals: details,
                }
            ]);
        } catch (err) {
            console.error('Error pushing lead:', err);
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
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-slate-100 p-3 rounded-xl text-xs text-slate-400 flex gap-1 shadow-sm">
                                    <span className="animate-bounce">.</span>
                                    <span className="animate-bounce delay-100">.</span>
                                    <span className="animate-bounce delay-200">.</span>
                                </div>
                            </div>
                        )}
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
