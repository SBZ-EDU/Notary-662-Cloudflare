import React, { useEffect, useMemo, useRef, useState } from 'react';
import { marked } from 'marked';
import { ChatSession, PageKey, useLanguage } from '../types';
import { REPORT_TYPES } from '../constants';
import DocumentViewerModal from './DocumentViewerModal';

interface LegalDrafterProps {
  chatSessions: ChatSession[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onSendMessage: (message: string) => void;
  isSendingMessage: boolean;
  chatError: string | null;
  chatInput: string;
  setChatInput: (value: string) => void;
  onDocTypeChange: (docType: string) => void;
  isQuotaExhausted: boolean;
  setPage: (page: PageKey) => void;
}

const ChatHistorySidebar: React.FC<Pick<LegalDrafterProps, 'chatSessions' | 'activeChatId' | 'onNewChat' | 'onSelectChat' | 'onDeleteChat'>> = ({
  chatSessions, activeChatId, onNewChat, onSelectChat, onDeleteChat
}) => {
  const { t } = useLanguage();
  return (
    <div className="bg-brand-blue-dark/50 h-full flex flex-col border-l border-white/10 rtl:border-l-0 rtl:border-r">
      <div className="p-4 border-b border-white/10">
        <button onClick={onNewChat} className="w-full bg-brand-gold text-brand-blue-dark font-bold py-2 px-4 rounded-lg hover:bg-brand-yellow transition-colors flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 rtl:ml-0 rtl:mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          چت جدید
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {chatSessions.length === 0 ? (
          <p className="p-4 text-center text-sm text-gray-500">تاریخچه چت خالی است.</p>
        ) : (
          <ul className="p-2 space-y-1">
            {chatSessions.map(session => (
              <li key={session.id}>
                <div 
                  className={`w-full text-right p-2 rounded-md transition-all duration-200 group flex justify-between items-center cursor-pointer ${
                    activeChatId === session.id 
                    ? 'bg-brand-blue-light border-r-2 border-brand-gold rtl:border-r-0 rtl:border-l-2' 
                    : 'hover:bg-brand-blue/60'
                  }`} 
                  onClick={() => onSelectChat(session.id)}
                >
                  <span className={`text-sm truncate ${activeChatId === session.id ? 'text-white font-semibold' : 'text-gray-200'}`}>{session.title}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteChat(session.id); }} 
                    title="Delete Chat" 
                    className={`p-1 rounded-full hover:bg-red-500/20 transition-opacity ${
                      activeChatId === session.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hover:text-red-400 transition-colors flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ChatPanel: React.FC<Pick<LegalDrafterProps, 'activeChatId' | 'chatSessions' | 'onSendMessage' | 'isSendingMessage' | 'chatError' | 'chatInput' | 'setChatInput' | 'onDocTypeChange' | 'isQuotaExhausted'>> = ({
  activeChatId, chatSessions, onSendMessage, isSendingMessage, chatError, chatInput, setChatInput, onDocTypeChange, isQuotaExhausted
}) => {
  const { t } = useLanguage();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const activeChat = chatSessions.find(s => s.id === activeChatId);
  const modelMessages = useMemo(() => activeChat?.messages.filter(m => m.role === 'model') || [], [activeChat]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isSendingMessage]);

  useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${scrollHeight}px`;
        }
    }, [chatInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim() && !isSendingMessage) {
      onSendMessage(chatInput);
    }
  };

  if (!activeChat) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <h3 className="text-xl font-semibold text-gray-300">دستیار هوشمند حقوقی</h3>
            <p className="mt-2 max-w-sm">برای شروع، یک چت جدید ایجاد کنید یا یک مکالمه قبلی را از منوی کنار انتخاب نمایید.</p>
        </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-brand-blue">
      <div className="p-3 border-b border-white/10 flex items-center justify-between bg-brand-blue-light/80 backdrop-blur-sm sticky top-[72px] md:top-auto z-10 gap-2">
        <h3 className="text-lg font-semibold text-white truncate pr-4 hidden sm:block">{activeChat.title}</h3>
        <div className="flex-grow flex items-center justify-end gap-2">
           <button 
                onClick={() => setIsViewerOpen(true)}
                disabled={modelMessages.length === 0}
                className="px-3 py-1.5 text-xs font-medium text-gray-200 bg-brand-blue-light border border-gray-600 rounded-md hover:bg-brand-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {t('reportDisplay.docTitle')} ({modelMessages.length})
            </button>
          <select
            id="docType"
            value={activeChat.docType}
            onChange={(e) => onDocTypeChange(e.target.value)}
            className="block w-full max-w-xs bg-brand-blue border-gray-600 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm text-white"
          >
            {REPORT_TYPES.map(option => (
              <option key={option.value} value={option.value}>
                {t(`reportTypes.${option.value}`)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-6">
          {activeChat.messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === 'model' && <div className="w-8 h-8 rounded-full bg-brand-gold flex-shrink-0 flex items-center justify-center font-bold text-brand-blue-dark text-sm">AI</div>}
              <div className={`p-4 rounded-lg max-w-2xl ${message.role === 'user' ? 'bg-blue-900/70 text-gray-200' : 'bg-brand-blue-dark/50 text-gray-300'}`}>
                {message.role === 'model' ? (
                  <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-p:text-gray-300 prose-li:text-gray-300" dangerouslySetInnerHTML={{ __html: marked.parse(message.text || '') }}></div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.text}</p>
                )}
              </div>
            </div>
          ))}
          {isSendingMessage && (
             <div className="flex items-start gap-3">
               <div className="w-8 h-8 rounded-full bg-brand-gold flex-shrink-0 flex items-center justify-center font-bold text-brand-blue-dark text-sm">AI</div>
               <div className="p-4 rounded-lg max-w-xl bg-brand-blue-dark/50 text-gray-300">
                    <div className="flex items-center justify-center pt-1">
                        <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse delay-0"></div>
                        <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse delay-200 mx-1"></div>
                        <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse delay-400"></div>
                    </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-white/10 bg-brand-blue-light/80 backdrop-blur-sm">
        {chatError && <p className="text-red-400 text-sm mb-2 text-center">{chatError}</p>}
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <textarea
            ref={textareaRef}
            rows={1}
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => {
                if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                }
            }}
            placeholder="پیام خود را اینجا بنویسید..."
            className="flex-grow bg-brand-blue border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-gold sm:text-sm text-white resize-none max-h-40"
            disabled={isSendingMessage || isQuotaExhausted}
          />
          <button type="submit" disabled={isSendingMessage || isQuotaExhausted || !chatInput.trim()} className="bg-brand-gold text-brand-blue-dark font-bold p-2.5 rounded-lg hover:bg-brand-yellow transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </form>
      </div>
      <DocumentViewerModal 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        versions={modelMessages.map(m => m.text)}
        title={activeChat.title}
      />
    </div>
  );
};

const LegalDrafter: React.FC<LegalDrafterProps> = (props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-72px)]">
      <div className="hidden md:block md:col-span-1 lg:col-span-1 h-full">
        <ChatHistorySidebar {...props} />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3 h-full">
        <ChatPanel {...props} />
      </div>
    </div>
  );
};

export default LegalDrafter;