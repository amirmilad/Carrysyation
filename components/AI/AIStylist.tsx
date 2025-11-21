
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, MessageSquare, Bot, User } from 'lucide-react';
import { useLanguage } from '../Contexts';
import { TRANSLATIONS } from '../../constants';
import { getStylingAdvice } from '../../services/geminiService';
import { Button } from '../UI/Button';

export const AIStylist: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string, time: string}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const t = TRANSLATIONS[language].ai;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText, time: now }]);
    setLoading(true);

    const response = await getStylingAdvice(userText, language);
    
    setMessages(prev => [...prev, { role: 'ai', text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Trigger */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 rtl:left-6 rtl:right-auto group border-2 border-white/10 dark:border-gray-200/10"
        >
          <div className="relative">
             <Sparkles size={24} className="text-gold-400 animate-pulse" />
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900 dark:border-white"></div>
          </div>
          <span className="font-bold hidden sm:inline tracking-wide">{t.suggest}</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden rtl:left-6 rtl:right-auto flex flex-col max-h-[600px] animate-fade-in-up">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-black text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot size={20} className="text-gold-400" />
              </div>
              <div>
                 <h3 className="font-bold font-serif leading-none mb-1">{t.title}</h3>
                 <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider">Online</span>
                 </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-950 h-96 space-y-6">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-12 animate-fade-in">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Sparkles size={32} className="text-gold-400 opacity-50" />
                </div>
                <p className="text-sm font-medium mb-1">{language === 'en' ? 'Hello! I am your personal stylist.' : 'أهلاً! أنا مستشارة أزيائك الشخصية.'}</p>
                <p className="text-xs opacity-70">{language === 'en' ? 'Ask me about matching bags with your outfit!' : 'اسأليني عن الحقيبة المناسبة لفستانك!'}</p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-slide-in`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-900 dark:bg-white'}`}>
                   {msg.role === 'user' ? <User size={14} className="text-gray-600 dark:text-gray-300" /> : <Bot size={14} className="text-white dark:text-gray-900" />}
                </div>
                
                <div className={`flex flex-col max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                   <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                     msg.role === 'user' 
                       ? 'bg-primary-500 text-white rounded-tr-none' 
                       : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-700'
                   }`}>
                     {msg.text}
                   </div>
                   <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-full flex-shrink-0 flex items-center justify-center">
                    <Bot size={14} className="text-white dark:text-gray-900" />
                 </div>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700">
                    <div className="flex gap-1">
                       <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
                       <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                       <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex gap-2 items-end">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 transition-all"
            />
            <button 
              type="submit" 
              disabled={loading || !query.trim()}
              className="p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-md"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};