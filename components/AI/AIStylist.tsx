import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, MessageSquare } from 'lucide-react';
import { useLanguage } from '../Contexts';
import { TRANSLATIONS } from '../../constants';
import { getStylingAdvice } from '../../services/geminiService';
import { Button } from '../UI/Button';

export const AIStylist: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([]);
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
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    const response = await getStylingAdvice(userText, language);
    
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Trigger */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center gap-2 rtl:left-6 rtl:right-auto"
        >
          <Sparkles size={24} className="text-gold-400" />
          <span className="font-bold hidden sm:inline">{t.suggest}</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden rtl:left-6 rtl:right-auto flex flex-col max-h-[600px]">
          
          {/* Header */}
          <div className="p-4 bg-gray-900 dark:bg-gray-800 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-gold-400" />
              <h3 className="font-bold font-serif">{t.title}</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-950 h-80 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <Sparkles size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm">{language === 'en' ? 'Ask me about matching bags with your outfit!' : 'اسأليني عن الحقيبة المناسبة لفستانك!'}</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-gray-900 text-white rounded-br-none dark:bg-white dark:text-gray-900' 
                    : 'bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-xs text-gray-500 animate-pulse">
                  {t.thinking}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex gap-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button 
              type="submit" 
              disabled={loading || !query.trim()}
              className="p-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};