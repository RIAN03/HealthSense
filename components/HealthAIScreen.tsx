import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { View, ChatMessage, HealthDataPoint } from '../types';
import { ICONS } from '../constants';

interface HealthAIScreenProps {
  setView: (view: View) => void;
  healthData: Record<string, { value: string, unit: string }>;
  userName: string;
  healthHistory: Record<string, HealthDataPoint[]>;
  healthHistoryMonth: Record<string, HealthDataPoint[]>;
}

const HealthAIScreen: React.FC<HealthAIScreenProps> = ({ setView, healthData, userName, healthHistory, healthHistoryMonth }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: `Hello ${userName}! I'm HealthSense AI. How can I help you with your health questions today? Please remember, I'm an assistant, not a doctor.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const currentVitalsSummary = Object.keys(healthData)
            .filter((key) => healthData[key].value && healthData[key].value.trim() !== '--')
            .map((key) => `${key}: ${healthData[key].value} ${healthData[key].unit}`)
            .join(', ');

        const formatHistory = (history: Record<string, HealthDataPoint[]>, period: string): string => {
            const entries = Object.entries(history)
                .map(([metricName, dataPoints]) => {
                    const validData = dataPoints.filter(dp => dp.value > 0);
                    if (validData.length === 0) return null;
                    const values = validData.map(dp => dp.value.toFixed(1)).join(', ');
                    return `${metricName} [${values}]`;
                })
                .filter(Boolean)
                .join('; ');
            return entries ? `\n${period} data (chronological): ${entries}` : '';
        };

        const weeklyHistorySummary = formatHistory(healthHistory, 'Last 7 days');
        const monthlyHistorySummary = formatHistory(healthHistoryMonth, 'Last 30 days');
        
        let fullContext = `Current vitals: ${currentVitalsSummary || 'No current data'}.`;
        if (weeklyHistorySummary) fullContext += weeklyHistorySummary;
        if (monthlyHistorySummary) fullContext += monthlyHistorySummary;

        const systemInstruction = `You are HealthSense, a friendly and intelligent AI health assistant for ${userName}. Your goal is to provide helpful, informative, and safe health-related guidance based on user questions. You must never provide a medical diagnosis. Always strongly advise the user to consult a healthcare professional for any medical concerns, diagnosis, or treatment. Keep your answers concise and easy to understand.
Here is the user's comprehensive health data, use it for context when answering questions: ${fullContext}`;

        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction,
          },
        });
      } catch (error) {
        console.error("Failed to initialize AI:", error);
        setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
      }
    };
    initChat();
  }, [healthData, userName, healthHistory, healthHistoryMonth]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseStream = await chatRef.current.sendMessageStream({ message: input });
      
      let aiResponseText = '';
      setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

      for await (const chunk of responseStream) {
        aiResponseText += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = aiResponseText;
            return newMessages;
        });
      }

    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages(prev => [...prev, { sender: 'ai', text: "I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-light-bg">
      <header className="flex items-center p-4 border-b bg-white shadow-sm">
        <button onClick={() => setView('dashboard')} className="p-2 rounded-lg hover:bg-gray-100">
          <ICONS.ChevronLeft className="w-6 h-6 text-text-dark-primary" />
        </button>
        <h1 className="text-xl font-bold text-center flex-1 text-text-dark-primary">Health Assistant</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-primary-blue text-white' : 'bg-white text-text-dark-primary shadow-sm'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length-1].sender === 'user' && (
           <div className="flex justify-start">
             <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-white text-text-dark-primary shadow-sm">
               <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
               </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about your health..."
            className="w-full p-3 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-blue"
            disabled={isLoading}
          />
          <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="p-3 bg-primary-blue text-white rounded-full disabled:bg-gray-300">
            <ICONS.Send className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default HealthAIScreen;