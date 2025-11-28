import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Send, Bot, User, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import PageLayout from './PageLayout';
import { Card } from './ui/card';
import { Message } from '../types';

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: "You are a helpful, concise, and friendly AI assistant.",
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        }))
      });

      const result = await chat.sendMessageStream({ message: userMessage.content });
      
      let fullResponse = '';
      const botMessageId = (Date.now() + 1).toString();
      
      // Initialize bot message
      setMessages(prev => [...prev, {
        id: botMessageId,
        role: 'model',
        content: '',
        timestamp: Date.now()
      }]);

      for await (const chunk of result) {
        const chunkText = (chunk as GenerateContentResponse).text;
        if (chunkText) {
          fullResponse += chunkText;
          setMessages(prev => prev.map(msg => 
            msg.id === botMessageId 
              ? { ...msg, content: fullResponse }
              : msg
          ));
        }
      }

    } catch (err) {
      console.error("Chat error:", err);
      setError("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <PageLayout
      title="AI 智能助手"
      description="基于 Gemini 3 Pro 的智能对话助手，为您解答疑惑"
      backLabel="返回工具列表"
    >
      <Card className="h-[600px] md:h-[700px] flex flex-col overflow-hidden border-slate-200 shadow-lg">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/50">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">开始对话</h3>
              <p className="text-slate-500 max-w-xs">
                我是您的 AI 助手。您可以问我任何问题，我会尽力回答。
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`
                w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0
                ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-green-600 shadow-sm'}
              `}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              
              <div className={`
                relative max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed whitespace-pre-wrap
                ${msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-sm shadow-md shadow-blue-600/10' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm shadow-sm'
                }
              `}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
             <div className="flex items-start gap-3">
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-slate-200 text-green-600 shadow-sm flex items-center justify-center shrink-0">
                 <Loader2 className="w-5 h-5 animate-spin" />
               </div>
               <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                 <div className="flex gap-1">
                   <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                   <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                   <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                 </div>
               </div>
             </div>
          )}
          
          {error && (
            <div className="flex justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-100">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="relative flex items-end gap-2 max-w-4xl mx-auto">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入消息..."
              className="
                w-full bg-slate-50 border-none rounded-2xl py-3 pl-4 pr-12
                focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all
                resize-none min-h-[50px] max-h-[150px]
                text-slate-800 placeholder:text-slate-400
              "
              rows={1}
              style={{ height: 'auto' }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="
                absolute right-2 bottom-2 p-2 rounded-xl
                bg-blue-600 text-white shadow-lg shadow-blue-600/20
                hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 hover:scale-105 active:scale-95
              "
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-2 text-xs text-slate-400">
            AI 生成的内容可能不准确，请核实重要信息。
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};

export default ChatBot;