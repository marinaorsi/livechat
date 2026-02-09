import React, { useState, useEffect } from 'react';
import { ChatWidget } from './components/ChatWidget';
import { DEFAULT_WEBHOOK_URL, INITIAL_GREETING } from './constants';
import { Message } from './types';

const App: React.FC = () => {
  // Il widget parte SEMPRE chiuso per un embed pulito
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState<string>(DEFAULT_WEBHOOK_URL);
  
  // Stato persistente dei messaggi
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init-1', text: INITIAL_GREETING, sender: 'agent', timestamp: Date.now() }
  ]);
  
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));

  // Funzione di toggle che comunica anche con l'esterno (iframe padre)
  const toggleWidget = (open: boolean) => {
    setIsWidgetOpen(open);
    window.parent.postMessage(open ? 'open-chat' : 'close-chat', '*');
  };

  return (
    // Sfondo forzatamente trasparente per l'embed
    <div className="w-full h-screen relative overflow-hidden bg-transparent">
      
      {/* 
          PAGINA DI ANTEPRIMA RIMOSSA DEFINITIVAMENTE.
          Ora l'app renderizza solo il widget o la bolla.
      */}

      {!isWidgetOpen && (
        <button
          onClick={() => toggleWidget(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-[#facc15] rounded-full shadow-[0_10px_30px_rgba(250,204,21,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform duration-300 group-hover:rotate-6">
            <rect x="2" y="2" width="20" height="20" rx="7" fill="#111111" />
            <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13V13.5" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17H12.01" stroke="#facc15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <ChatWidget 
        isOpen={isWidgetOpen} 
        onClose={() => toggleWidget(false)} 
        webhookUrl={webhookUrl}
        setWebhookUrl={setWebhookUrl}
        messages={messages}
        setMessages={setMessages}
        sessionId={sessionId}
      />
    </div>
  );
};

export default App;
