import React, { useState, useCallback, useEffect } from 'react';
import { marked } from 'marked';
import SiteHeader from './components/Header';
import HomePage from './components/HomePage';
import LawyerFinder from './components/LawyerFinder';
import LegalDrafter from './components/LegalDrafter';
import NewsSummarizer from './components/NewsSummarizer';
import CaseStrategist from './components/CaseStrategist';
import NotaryFinder from './components/NotaryFinder';
import WebAnalyzer from './components/WebAnalyzer';
import DocumentAnalyzer from './components/DocumentAnalyzer';
import LegalTraining from './components/LegalTraining'; // Import the new component
import SiteFooter from './components/Footer';
import QuotaErrorModal from './components/QuotaErrorModal';
import AIGuideModal from './components/AIGuideModal';
import FloatingChatButton from './components/FloatingChatButton';
import { generateChatResponseStream, summarizeNews, generateStrategy, routeUserIntent, prepareDraftFromTask, analyzeWebPage, analyzeDocument, generateTrainingContent } from './services/geminiService';
import { Checkpoint, AppState, useLanguage, Source, StrategyTask, IntentRoute, PageKey, SaveStatus, AutoSaveData, ChatSession, ChatMessage } from './types';
import { REPORT_TYPES } from './constants';
import { saveChatSession, getAllChatSessions, deleteChatSession, saveCheckpoint, getAllCheckpoints, deleteCheckpoint } from './services/dbService';

const LegalAssistantPage: React.FC<any> = ({
    page,
    setPage,
    // Chat Props
    chatSessions, activeChatId, handleNewChat, handleSelectChat, handleDeleteChat, handleSendMessage, isSendingMessage, chatError, chatInput, setChatInput, handleDocTypeChange,
    // Lawyer Finder Props
    lawyerFinderKeywords, setLawyerFinderKeywords,
    // Notary Finder Props
    notaryFinderKeywords, setNotaryFinderKeywords,
    // News Summarizer Props
    handleSummarizeNews, newsQuery, setNewsQuery, newsSummary, newsSources, isSummarizingNews, newsError,
    // Web Analyzer Props
    handleAnalyzeWebPage, webAnalyzerUrl, setWebAnalyzerUrl, webAnalyzerQuery, setWebAnalyzerQuery, webAnalyzerResult, webAnalyzerSources, isAnalyzingWeb, webAnalyzerError,
    // Document Analyzer Props
    handleAnalyzeDocument, documentAnalyzerText, setDocumentAnalyzerText, documentAnalyzerQuery, setDocumentAnalyzerQuery, documentAnalyzerResult, isAnalyzingDocument, documentAnalyzerError,
    // Legal Training Props
    handleGenerateTraining, trainingQuery, setTrainingQuery, trainingResult, isGeneratingTraining, trainingError,
    // Case Strategist Props
    handleGenerateStrategy, strategyGoal, setStrategyGoal, strategyResult, isGeneratingStrategy, strategyError,
    handleExecuteStrategyTask, isExecutingStrategyTask,
    // Global Error Props
    handleApiError,
    isQuotaExhausted,
    onOpenAIGuide,
}) => {
    const { t } = useLanguage();

    const tabs = [
        { id: 'legal_drafter', label: t('header.aiAssistant') },
        { id: 'lawyer_finder', label: t('header.lawyerFinder') },
        { id: 'notary_finder', label: t('header.notaryFinder') },
        { id: 'news_summarizer', label: t('header.newsSummarizer') },
        { id: 'web_analyzer', label: t('header.webAnalyzer') },
        { id: 'document_analyzer', label: t('header.documentAnalyzer') },
        { id: 'legal_training', label: t('header.legalTraining') },
        { id: 'case_strategist', label: t('header.caseStrategist') },
    ];
    
    // The drafter page takes up the full height, so we give it a different container
    if (page === 'legal_drafter') {
        return (
             <LegalDrafter
              chatSessions={chatSessions}
              activeChatId={activeChatId}
              onNewChat={handleNewChat}
              onSelectChat={handleSelectChat}
              onDeleteChat={handleDeleteChat}
              onSendMessage={handleSendMessage}
              isSendingMessage={isSendingMessage}
              chatError={chatError}
              chatInput={chatInput}
              setChatInput={setChatInput}
              onDocTypeChange={handleDocTypeChange}
              isQuotaExhausted={isQuotaExhausted}
              setPage={setPage}
            />
        )
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-0">
             {/* Tab Navigation */}
            <div className="border-b border-white/20 mb-8 sticky top-[72px] bg-brand-blue/80 backdrop-blur-sm z-40">
                <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setPage(tab.id)}
                            className={`whitespace-nowrap py-4 px-2 sm:px-4 border-b-2 font-medium text-sm transition-colors ${
                                page === tab.id
                                    ? 'border-brand-gold text-brand-gold'
                                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
                {page === 'lawyer_finder' && (
                    <LawyerFinder 
                        keywords={lawyerFinderKeywords}
                        setKeywords={setLawyerFinderKeywords}
                        handleApiError={handleApiError}
                        isQuotaExhausted={isQuotaExhausted}
                        chatSessions={chatSessions}
                        activeChatId={activeChatId}
                    />
                )}
                {page === 'notary_finder' && (
                     <NotaryFinder
                        keywords={notaryFinderKeywords}
                        setKeywords={setNotaryFinderKeywords}
                        handleApiError={handleApiError}
                        isQuotaExhausted={isQuotaExhausted}
                        chatSessions={chatSessions}
                        activeChatId={activeChatId}
                     />
                )}
                {page === 'news_summarizer' && (
                    <NewsSummarizer
                      onSummarize={handleSummarizeNews}
                      query={newsQuery}
                      setQuery={setNewsQuery}
                      summary={newsSummary}
                      sources={newsSources}
                      isLoading={isSummarizingNews}
                      error={newsError}
                      isQuotaExhausted={isQuotaExhausted}
                    />
                )}
                {page === 'web_analyzer' && (
                    <WebAnalyzer
                      onAnalyze={handleAnalyzeWebPage}
                      url={webAnalyzerUrl}
                      setUrl={setWebAnalyzerUrl}
                      query={webAnalyzerQuery}
                      setQuery={setWebAnalyzerQuery}
                      result={webAnalyzerResult}
                      sources={webAnalyzerSources}
                      isLoading={isAnalyzingWeb}
                      error={webAnalyzerError}
                      isQuotaExhausted={isQuotaExhausted}
                    />
                )}
                {page === 'document_analyzer' && (
                    <DocumentAnalyzer
                      onAnalyze={handleAnalyzeDocument}
                      docText={documentAnalyzerText}
                      setDocText={setDocumentAnalyzerText}
                      query={documentAnalyzerQuery}
                      setQuery={setDocumentAnalyzerQuery}
                      result={documentAnalyzerResult}
                      isLoading={isAnalyzingDocument}
                      error={documentAnalyzerError}
                      isQuotaExhausted={isQuotaExhausted}
                    />
                )}
                {page === 'legal_training' && (
                    <LegalTraining
                      onGenerate={handleGenerateTraining}
                      query={trainingQuery}
                      setQuery={setTrainingQuery}
                      result={trainingResult}
                      isLoading={isGeneratingTraining}
                      error={trainingError}
                      isQuotaExhausted={isQuotaExhausted}
                    />
                )}
                 {page === 'case_strategist' && (
                    <CaseStrategist
                      onGenerate={handleGenerateStrategy}
                      goal={strategyGoal}
                      setGoal={setStrategyGoal}
                      result={strategyResult}
                      isLoading={isGeneratingStrategy}
                      error={strategyError}
                      isQuotaExhausted={isQuotaExhausted}
                      onExecuteTask={handleExecuteStrategyTask}
                      isExecutingTask={isExecutingStrategyTask}
                    />
                )}
            </div>
        </div>
    );
}

const BottomNav: React.FC<{
  setPage: (page: 'home' | PageKey) => void;
  currentPage: string;
  onOpenAIGuide: () => void;
}> = ({ setPage, currentPage, onOpenAIGuide }) => {
    const { t } = useLanguage();

    const navItems = [
        { key: 'home', label: 'خانه', icon: (active: boolean) => <svg className={`h-6 w-6 ${active ? 'text-brand-gold' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, action: () => setPage('home') },
        { key: 'legal_drafter', label: 'دستیار هوشمند', icon: (active: boolean) => <svg className={`h-6 w-6 ${active ? 'text-brand-gold' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, action: () => setPage('legal_drafter') },
        { key: 'legal_training', label: 'آموزش', icon: (active: boolean) => <svg className={`h-6 w-6 ${active ? 'text-brand-gold' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, action: () => setPage('legal_training') },
        { key: 'case_strategist', label: 'برنامه‌ریز', icon: (active: boolean) => <svg className={`h-6 w-6 ${active ? 'text-brand-gold' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6.75V15m6-6v8.25m.5-10.5h-7a.5.5 0 00-.5.5v12a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-12a.5.5 0 00-.5-.5z" /></svg>, action: () => setPage('case_strategist') },
        { key: 'ai_guide', label: 'راهنمای AI', icon: (active: boolean) => <svg className={`h-6 w-6 ${active ? 'text-brand-gold' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, action: onOpenAIGuide },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-blue-dark border-t border-white/10 shadow-lg z-50">
            <div className="flex justify-around h-16">
                {navItems.map(item => {
                    const isActive = currentPage === item.key;
                    return (
                        <button key={item.key} onClick={item.action} className="flex flex-col items-center justify-center text-center px-1 w-full hover:bg-white/5 transition-colors">
                            {item.icon(isActive)}
                            <span className={`text-xs mt-1 ${isActive ? 'text-brand-gold' : 'text-white'}`}>{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}

// --- MAIN APP COMPONENT ---
const AUTOSAVE_KEY = 'notary662-autosave';
const CHAT_HISTORY_KEY = 'notary662-chatHistory';
const AUTOSAVE_DELAY = 1500; // ms

const App: React.FC = () => {
  const { language, t } = useLanguage();
  const [page, setPage] = useState<PageKey | 'home'>('home');

  // --- CHAT STATE ---
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatDocType, setChatDocType] = useState(REPORT_TYPES[0].value);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const [lawyerFinderKeywords, setLawyerFinderKeywords] = useState<string>('');
  const [notaryFinderKeywords, setNotaryFinderKeywords] = useState('');
  
  const [newsQuery, setNewsQuery] = useState('');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsSources, setNewsSources] = useState<Source[]>([]);
  const [isSummarizingNews, setIsSummarizingNews] = useState(false);
  const [newsError, setNewsError] = useState<string|null>(null);
  
  const [webAnalyzerUrl, setWebAnalyzerUrl] = useState('');
  const [webAnalyzerQuery, setWebAnalyzerQuery] = useState('');
  const [webAnalyzerResult, setWebAnalyzerResult] = useState('');
  const [webAnalyzerSources, setWebAnalyzerSources] = useState<Source[]>([]);
  const [isAnalyzingWeb, setIsAnalyzingWeb] = useState(false);
  const [webAnalyzerError, setWebAnalyzerError] = useState<string|null>(null);

  const [documentAnalyzerText, setDocumentAnalyzerText] = useState('');
  const [documentAnalyzerQuery, setDocumentAnalyzerQuery] = useState('');
  const [documentAnalyzerResult, setDocumentAnalyzerResult] = useState('');
  const [isAnalyzingDocument, setIsAnalyzingDocument] = useState(false);
  const [documentAnalyzerError, setDocumentAnalyzerError] = useState<string|null>(null);

  const [trainingQuery, setTrainingQuery] = useState('');
  const [trainingResult, setTrainingResult] = useState('');
  const [isGeneratingTraining, setIsGeneratingTraining] = useState(false);
  const [trainingError, setTrainingError] = useState<string|null>(null);

  const [strategyGoal, setStrategyGoal] = useState('');
  const [strategyResult, setStrategyResult] = useState<StrategyTask[]>([]);
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [strategyError, setStrategyError] = useState<string|null>(null);
  const [isExecutingStrategyTask, setIsExecutingStrategyTask] = useState(false);

  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  
  const [isAIGuideOpen, setIsAIGuideOpen] = useState(false);
  const [aiGuidePrompt, setAIGuidePrompt] = useState('');
  const [aiGuideResults, setAIGuideResults] = useState<IntentRoute[]>([]);
  const [isRouting, setIsRouting] = useState(false);
  const [routingError, setRoutingError] = useState<string | null>(null);

  const [showQuotaErrorModal, setShowQuotaErrorModal] = useState<boolean>(false);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState<boolean>(false);

  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const handleApiError = useCallback((err: unknown): string => {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("API Error caught in handler:", errorMessage);
    const lowerCaseMessage = errorMessage.toLowerCase();

    if (lowerCaseMessage.includes('quota') ||
        lowerCaseMessage.includes('api key not valid') ||
        lowerCaseMessage.includes('resource has been exhausted')) {
      setShowQuotaErrorModal(true);
      setIsQuotaExhausted(true);
    }
    return errorMessage;
  }, []);


  useEffect(() => {
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const loadData = async () => {
        try {
            // Load chats from D1
            const loadedChats = await getAllChatSessions();
            if (loadedChats && loadedChats.length > 0) {
                setChatSessions(loadedChats);
                if (!activeChatId) {
                    setActiveChatId(loadedChats[0].id);
                }
            }
            
            // Load checkpoints from D1
            const loadedCheckpoints = await getAllCheckpoints();
            if (loadedCheckpoints) {
                setCheckpoints(loadedCheckpoints);
            }

            const autoSavedItem = window.localStorage.getItem(AUTOSAVE_KEY);
            if (autoSavedItem) {
                const savedData: AutoSaveData = JSON.parse(autoSavedItem);
                setChatInput(savedData.chatInput || '');
                setChatDocType(savedData.chatDocType || REPORT_TYPES[0].value);
                setLawyerFinderKeywords(savedData.lawyerFinderKeywords || '');
                setNotaryFinderKeywords(savedData.notaryFinderKeywords || '');
                setNewsQuery(savedData.newsQuery || '');
                setWebAnalyzerUrl(savedData.webAnalyzerUrl || '');
                setWebAnalyzerQuery(savedData.webAnalyzerQuery || '');
                setStrategyGoal(savedData.strategyGoal || '');
                setDocumentAnalyzerText(savedData.documentAnalyzerText || '');
                setDocumentAnalyzerQuery(savedData.documentAnalyzerQuery || '');
                setTrainingQuery(savedData.trainingQuery || '');
                setAIGuidePrompt(savedData.aiGuidePrompt || '');
            }
        } catch (error) {
            console.error("Error loading data", error);
        }
    };
    loadData();
  }, []);

  // Save active chat to D1 when it changes
  useEffect(() => {
    if (activeChatId) {
        const activeChat = chatSessions.find(s => s.id === activeChatId);
        if (activeChat) {
            saveChatSession(activeChat).catch(console.error);
        }
    }
  }, [chatSessions, activeChatId]);
  
  useEffect(() => {
    setSaveStatus('saving');
    const handler = setTimeout(() => {
        try {
            const dataToSave: AutoSaveData = {
                chatInput, chatDocType, lawyerFinderKeywords, notaryFinderKeywords,
                newsQuery, webAnalyzerUrl, webAnalyzerQuery, strategyGoal,
                documentAnalyzerText, documentAnalyzerQuery, trainingQuery, aiGuidePrompt,
            };
            window.localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(dataToSave));
            setSaveStatus('saved');
        } catch (error) {
            console.error("Error during auto-save:", error);
            setSaveStatus('idle');
        }
    }, AUTOSAVE_DELAY);
    return () => clearTimeout(handler);
  }, [
    chatInput, chatDocType, lawyerFinderKeywords, notaryFinderKeywords,
    newsQuery, webAnalyzerUrl, webAnalyzerQuery, strategyGoal, 
    documentAnalyzerText, documentAnalyzerQuery, trainingQuery, aiGuidePrompt
  ]);

  useEffect(() => {
    if (saveStatus === 'saved') {
        const handler = setTimeout(() => setSaveStatus('idle'), 2000);
        return () => clearTimeout(handler);
    }
  }, [saveStatus]);

    const handleNewChat = useCallback(() => {
        const newChat: ChatSession = {
            id: `chat-${Date.now()}`,
            title: 'چت جدید',
            messages: [],
            docType: REPORT_TYPES[0].value,
            timestamp: Date.now()
        };
        setChatSessions(prev => [newChat, ...prev]);
        setActiveChatId(newChat.id);
        setChatInput('');
        setChatDocType(REPORT_TYPES[0].value);
    }, []);

    useEffect(() => {
        // If the user lands on the drafter page and has no active chat, create one automatically.
        // This ensures the chat input is always visible, especially on mobile.
        if (page === 'legal_drafter' && !activeChatId) {
            handleNewChat();
        }
    }, [page, activeChatId, handleNewChat]);

    const handleSelectChat = useCallback((id: string) => {
        const selectedChat = chatSessions.find(c => c.id === id);
        if (selectedChat) {
            setActiveChatId(id);
            setChatDocType(selectedChat.docType);
        }
    }, [chatSessions]);

    const handleDeleteChat = useCallback(async (id: string) => {
        try {
            await deleteChatSession(id);
            setChatSessions(prev => {
                const newSessions = prev.filter(s => s.id !== id);
                if (activeChatId === id) {
                    setActiveChatId(newSessions.length > 0 ? newSessions[0].id : null);
                }
                return newSessions;
            });
        } catch (error) {
            console.error("Error deleting chat", error);
        }
    }, [activeChatId]);

    const handleDocTypeChange = useCallback((docType: string) => {
        setChatDocType(docType);
        if (activeChatId) {
            setChatSessions(prev => prev.map(s => s.id === activeChatId ? { ...s, docType } : s));
        }
    }, [activeChatId]);

    const handleSendMessage = useCallback(async (message: string) => {
        if (!message.trim() || isSendingMessage) return;
    
        let currentChatId = activeChatId;
        let isNewChat = false;
    
        // If no chat is active, or the active chat has messages, create a new one
        if (!currentChatId) {
            isNewChat = true;
            const newChat: ChatSession = {
                id: `chat-${Date.now()}`,
                title: message.substring(0, 40),
                messages: [],
                docType: chatDocType,
                timestamp: Date.now()
            };
            setChatSessions(prev => [newChat, ...prev]);
            setActiveChatId(newChat.id);
            currentChatId = newChat.id;
        }
    
        const userMessage: ChatMessage = { role: 'user', text: message };
        setChatInput('');
        setIsSendingMessage(true);
        setChatError(null);
    
        // Optimistically update UI
        setChatSessions(prev => prev.map(s => {
            if (s.id === currentChatId) {
                const newTitle = s.messages.length === 0 ? message.substring(0, 40) : s.title;
                return { ...s, title: newTitle, messages: [...s.messages, userMessage] };
            }
            return s;
        }));
    
        try {
            // Refetch the session from state to ensure we have the latest messages
            const activeSession = (isNewChat 
                ? { messages: [], docType: chatDocType } 
                : chatSessions.find(s => s.id === currentChatId)
            ) || { messages: [], docType: chatDocType };
    
            const history = activeSession.messages;
            const promptMap = t('promptMap');
            const systemInstruction = promptMap[activeSession.docType] || promptMap['petition'];
            
            const stream = generateChatResponseStream(history, message, systemInstruction);
    
            // Add a placeholder for the model's response
            setChatSessions(prev => prev.map(s => {
                if (s.id === currentChatId) {
                    return { ...s, messages: [...s.messages, { role: 'model', text: '' }] };
                }
                return s;
            }));
    
            for await (const chunk of stream) {
                setChatSessions(prev => prev.map(s => {
                    if (s.id === currentChatId) {
                        const newMessages = [...s.messages];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage && lastMessage.role === 'model') {
                            lastMessage.text += chunk;
                        }
                        return { ...s, messages: newMessages };
                    }
                    return s;
                }));
            }
        } catch (err) {
            const msg = handleApiError(err);
            setChatError(msg);
            setChatSessions(prev => prev.map(s => {
                if (s.id === currentChatId) {
                    return { ...s, messages: s.messages.filter(m => m.role !== 'model' || m.text !== '') };
                }
                return s;
            }));
        } finally {
            setIsSendingMessage(false);
        }
    }, [activeChatId, chatDocType, chatSessions, handleApiError, t, isSendingMessage]);


  const handleCreateCheckpoint = useCallback(async () => {
    const name = prompt(t('header.checkpointNamePrompt')) || `نسخه ${new Date().toLocaleString('fa-IR')}`;
    const newState: AppState = {
        page,
        chatSessions,
        activeChatId,
        lawyerFinderKeywords,
        notaryFinderKeywords,
        newsQuery,
        newsSummary,
        newsSources,
        strategyGoal,
        strategyResult,
        webAnalyzerUrl,
        webAnalyzerQuery,
        webAnalyzerResult,
        webAnalyzerSources,
        documentAnalyzerText,
        documentAnalyzerQuery,
        documentAnalyzerResult,
        trainingQuery,
        trainingResult,
        aiGuidePrompt,
        aiGuideResults,
    };
    
    const newCheckpoint: Checkpoint = {
        id: `ckpt-${Date.now()}`,
        timestamp: Date.now(),
        name,
        state: newState
    };

    try {
        await saveCheckpoint(newCheckpoint);
        setCheckpoints(prev => [newCheckpoint, ...prev]);
        alert(t('header.checkpointCreated'));
    } catch (error) {
        console.error("Error creating checkpoint", error);
        alert("خطا در ایجاد نسخه پشتیبان");
    }
  }, [t, page, chatSessions, activeChatId, lawyerFinderKeywords, notaryFinderKeywords, newsQuery, newsSummary, newsSources, strategyGoal, strategyResult, webAnalyzerUrl, webAnalyzerQuery, webAnalyzerResult, webAnalyzerSources, documentAnalyzerText, documentAnalyzerQuery, documentAnalyzerResult, trainingQuery, trainingResult, aiGuidePrompt, aiGuideResults]);

  const handleRestoreCheckpoint = useCallback((id: string) => {
    const ckpt = checkpoints.find(c => c.id === id);
    if (!ckpt) return;
    
    if (!confirm(t('header.restoreConfirm'))) return;

    const s = ckpt.state;
    setPage(s.page);
    setChatSessions(s.chatSessions);
    setActiveChatId(s.activeChatId);
    setLawyerFinderKeywords(s.lawyerFinderKeywords);
    setNotaryFinderKeywords(s.notaryFinderKeywords);
    setNewsQuery(s.newsQuery);
    setNewsSummary(s.newsSummary);
    setNewsSources(s.newsSources);
    setStrategyGoal(s.strategyGoal);
    setStrategyResult(s.strategyResult);
    setWebAnalyzerUrl(s.webAnalyzerUrl);
    setWebAnalyzerQuery(s.webAnalyzerQuery);
    setWebAnalyzerResult(s.webAnalyzerResult);
    setWebAnalyzerSources(s.webAnalyzerSources);
    setDocumentAnalyzerText(s.documentAnalyzerText);
    setDocumentAnalyzerQuery(s.documentAnalyzerQuery);
    setDocumentAnalyzerResult(s.documentAnalyzerResult);
    setTrainingQuery(s.trainingQuery);
    setTrainingResult(s.trainingResult);
    setAIGuidePrompt(s.aiGuidePrompt);
    setAIGuideResults(s.aiGuideResults);
    
    alert(t('header.checkpointRestored'));
  }, [checkpoints, t]);

  const handleDeleteCheckpoint = useCallback(async (id: string) => {
    if (!confirm(t('header.deleteConfirm'))) return;
    try {
        await deleteCheckpoint(id);
        setCheckpoints(prev => prev.filter(c => c.id !== id));
    } catch (error) {
        console.error("Error deleting checkpoint", error);
    }
  }, [t]);

    const handleSummarizeNews = useCallback(async (query: string) => {
        setIsSummarizingNews(true);
        setNewsSummary('');
        setNewsSources([]);
        setNewsError(null);
        setNewsQuery(query);
        const promptTemplate = t('newsSummarizer.prompt');
        const prompt = promptTemplate.replace('{query}', query);
        try {
            const result = await summarizeNews(prompt);
            const htmlSummary = await marked.parse(result.text);
            setNewsSummary(htmlSummary);
            setNewsSources(result.sources);
        } catch (err) {
            setNewsError(handleApiError(err));
        } finally {
            setIsSummarizingNews(false);
        }
    }, [handleApiError, t]);
    
    const handleAnalyzeWebPage = useCallback(async (url: string, query: string) => {
        setIsAnalyzingWeb(true);
        setWebAnalyzerResult('');
        setWebAnalyzerSources([]);
        setWebAnalyzerError(null);
        setWebAnalyzerUrl(url);
        setWebAnalyzerQuery(query);
        const promptTemplate = t('webAnalyzer.prompt');
        const prompt = promptTemplate.replace('{url}', url).replace('{query}', query);
        try {
            const result = await analyzeWebPage(prompt);
            const htmlResult = await marked.parse(result.text);
            setWebAnalyzerResult(htmlResult);
            setWebAnalyzerSources(result.sources);
        } catch (err) {
            setWebAnalyzerError(handleApiError(err));
        } finally {
            setIsAnalyzingWeb(false);
        }
    }, [handleApiError, t]);

    const handleAnalyzeDocument = useCallback(async (docText: string, query: string) => {
        setIsAnalyzingDocument(true);
        setDocumentAnalyzerResult('');
        setDocumentAnalyzerError(null);
        setDocumentAnalyzerText(docText);
        setDocumentAnalyzerQuery(query);
        const promptTemplate = t('documentAnalyzer.prompt');
        const prompt = promptTemplate.replace('{documentText}', docText).replace('{query}', query);
        try {
            const result = await analyzeDocument(prompt);
            const htmlResult = await marked.parse(result.text);
            setDocumentAnalyzerResult(htmlResult);
        } catch (err) {
            setDocumentAnalyzerError(handleApiError(err));
        } finally {
            setIsAnalyzingDocument(false);
        }
    }, [handleApiError, t]);

    const handleGenerateTraining = useCallback(async (query: string) => {
        setIsGeneratingTraining(true);
        setTrainingResult('');
        setTrainingError(null);
        setTrainingQuery(query);
        const promptTemplate = t('legalTraining.prompt');
        const prompt = promptTemplate.replace('{topic}', query);
        try {
            const result = await generateTrainingContent(prompt);
            const htmlResult = await marked.parse(result.text);
            setTrainingResult(htmlResult);
        } catch (err) {
            setTrainingError(handleApiError(err));
        } finally {
            setIsGeneratingTraining(false);
        }
    }, [handleApiError, t]);


    const handleGenerateStrategy = useCallback(async (goal: string) => {
        setIsGeneratingStrategy(true);
        setStrategyResult([]);
        setStrategyError(null);
        setStrategyGoal(goal);
        const promptTemplate = t('caseStrategist.prompt');
        try {
            const result = await generateStrategy(goal, promptTemplate);
            setStrategyResult(result);
        } catch (err) {
            setStrategyError(handleApiError(err));
        } finally {
            setIsGeneratingStrategy(false);
        }
    }, [handleApiError, t]);

  const handleExecuteStrategyTask = useCallback(async (task: StrategyTask) => {
    setIsExecutingStrategyTask(true);
    const promptTemplate = t('prepareDraftFromTask.prompt');
    const docTypeOptions = REPORT_TYPES.map(t => t.value).join(', ');
    try {
        const result = await prepareDraftFromTask(task, promptTemplate, docTypeOptions);
        const newDocType = REPORT_TYPES.some(rt => rt.value === result.docType) ? result.docType : REPORT_TYPES[0].value;
        const newChat: ChatSession = {
            id: `chat-${Date.now()}`,
            title: result.topic,
            messages: [{ role: 'user', text: result.description }],
            docType: newDocType,
            timestamp: Date.now()
        };
        setChatSessions(prev => [newChat, ...prev]);
        setActiveChatId(newChat.id);
        setChatDocType(newDocType);
        setPage('legal_drafter');
        window.scrollTo(0, 0);
        await handleSendMessage(result.description);
    } catch (err) {
        alert(`Error preparing draft: ${handleApiError(err)}`);
    } finally {
        setIsExecutingStrategyTask(false);
    }
  }, [handleApiError, t, handleSendMessage]);

  const handleRouteIntent = useCallback(async (goal: string) => {
      setIsRouting(true);
      setAIGuideResults([]);
      setRoutingError(null);
      setAIGuidePrompt(goal);
      const promptTemplate = t('aiGuide.prompt');
      try {
          const results = await routeUserIntent(goal, promptTemplate);
          setAIGuideResults(results);
      } catch (err) {
          setRoutingError(handleApiError(err));
      } finally {
          setIsRouting(false);
      }
  }, [handleApiError, t]);

  const handleSelectRoute = useCallback((pageKey: PageKey) => {
      setPage(pageKey);
      setIsAIGuideOpen(false);
  }, []);

  const renderPage = () => {
    const isAssistantPage = ['legal_drafter', 'lawyer_finder', 'news_summarizer', 'case_strategist', 'notary_finder', 'web_analyzer', 'document_analyzer', 'legal_training'].includes(page);
    if (isAssistantPage) {
        return <LegalAssistantPage 
            page={page} setPage={setPage}
            chatSessions={chatSessions} activeChatId={activeChatId} handleNewChat={handleNewChat}
            handleSelectChat={handleSelectChat} handleDeleteChat={handleDeleteChat} handleSendMessage={handleSendMessage}
            isSendingMessage={isSendingMessage} chatError={chatError} chatInput={chatInput}
            setChatInput={setChatInput} handleDocTypeChange={handleDocTypeChange}
            lawyerFinderKeywords={lawyerFinderKeywords} setLawyerFinderKeywords={setLawyerFinderKeywords}
            notaryFinderKeywords={notaryFinderKeywords} setNotaryFinderKeywords={setNotaryFinderKeywords}
            handleSummarizeNews={handleSummarizeNews} newsQuery={newsQuery} setNewsQuery={setNewsQuery}
            newsSummary={newsSummary} newsSources={newsSources} isSummarizingNews={isSummarizingNews} newsError={newsError}
            handleAnalyzeWebPage={handleAnalyzeWebPage} webAnalyzerUrl={webAnalyzerUrl} setWebAnalyzerUrl={setWebAnalyzerUrl}
            webAnalyzerQuery={webAnalyzerQuery} setWebAnalyzerQuery={setWebAnalyzerQuery}
            webAnalyzerResult={webAnalyzerResult} webAnalyzerSources={webAnalyzerSources} isAnalyzingWeb={isAnalyzingWeb} webAnalyzerError={webAnalyzerError}
            handleAnalyzeDocument={handleAnalyzeDocument} documentAnalyzerText={documentAnalyzerText} setDocumentAnalyzerText={setDocumentAnalyzerText}
            documentAnalyzerQuery={documentAnalyzerQuery} setDocumentAnalyzerQuery={setDocumentAnalyzerQuery}
            documentAnalyzerResult={documentAnalyzerResult} isAnalyzingDocument={isAnalyzingDocument} documentAnalyzerError={documentAnalyzerError}
            handleGenerateTraining={handleGenerateTraining} trainingQuery={trainingQuery} setTrainingQuery={setTrainingQuery}
            trainingResult={trainingResult} isGeneratingTraining={isGeneratingTraining} trainingError={trainingError}
            handleGenerateStrategy={handleGenerateStrategy} strategyGoal={strategyGoal} setStrategyGoal={setStrategyGoal}
            strategyResult={strategyResult} isGeneratingStrategy={isGeneratingStrategy} strategyError={strategyError}
            handleExecuteStrategyTask={handleExecuteStrategyTask} isExecutingStrategyTask={isExecutingStrategyTask}
            handleApiError={handleApiError} isQuotaExhausted={isQuotaExhausted} onOpenAIGuide={() => setIsAIGuideOpen(true)}
        />;
    }
    return <HomePage setPage={setPage} onOpenAIGuide={() => setIsAIGuideOpen(true)} />;
  };

  return (
    <div className="bg-brand-blue text-white min-h-screen pb-16 md:pb-0">
      <SiteHeader 
        currentPage={page} setPage={setPage} checkpoints={checkpoints}
        onCreateCheckpoint={handleCreateCheckpoint} onRestoreCheckpoint={handleRestoreCheckpoint}
        onDeleteCheckpoint={handleDeleteCheckpoint} saveStatus={saveStatus} onOpenAIGuide={() => setIsAIGuideOpen(true)}
      />
      <main className={page === 'legal_drafter' ? '' : 'py-8 md:py-16'}>
        {renderPage()}
      </main>
      {page !== 'legal_drafter' && <SiteFooter />}
      <BottomNav 
        currentPage={page} setPage={setPage} onOpenAIGuide={() => setIsAIGuideOpen(true)} 
      />
      {page === 'home' && <FloatingChatButton onOpen={() => setIsAIGuideOpen(true)} />}
      <QuotaErrorModal 
        isOpen={showQuotaErrorModal} onClose={() => setShowQuotaErrorModal(false)}
      />
      <AIGuideModal 
        isOpen={isAIGuideOpen} onClose={() => setIsAIGuideOpen(false)}
        onRoute={handleRouteIntent} onSelectRoute={handleSelectRoute}
        prompt={aiGuidePrompt} setPrompt={setAIGuidePrompt} results={aiGuideResults}
        isLoading={isRouting} error={routingError}
        chatSessions={chatSessions}
      />
    </div>
  );
};

export default App;