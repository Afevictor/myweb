import React, { useState, useRef, useEffect } from 'react';
import { getAssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Victor's AI assistant. How can I help you automate your business today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const botResponse = await getAssistantResponse(input, history);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: botResponse || 'Sorry, I missed that.', timestamp: new Date() }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] bg-white border border-slate-200 rounded-2xl flex flex-col shadow-2xl overflow-hidden ring-1 ring-slate-200">
          <div className="bg-slate-900 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-bold text-white">Verturn AI Agent</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:rotate-90 transition-transform">✕</button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm shadow-sm ${
                  m.role === 'user' ? 'bg-orange-600 text-white' : 'bg-white text-slate-800 border border-slate-100'
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
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-50 text-slate-900 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600 outline-none border border-slate-200"
            />
            <button 
              onClick={handleSend}
              className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors shadow-md"
            >
              🚀
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform shadow-orange-600/30"
        >
          <span className="text-2xl">💬</span>
        </button>
      )}
    </div>
  );
};

export default AIChatAssistant;