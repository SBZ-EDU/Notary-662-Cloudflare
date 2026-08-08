import React, { createContext, useContext, useState } from 'react';
import { en, fa } from './constants';

// --- Language Context ---
type Language = 'en' | 'fa';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (keyPath: string) => any; // A simple translation function
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('fa');

    const t = (keyPath: string): any => {
        const keys = keyPath.split('.');
        let result: any = language === 'fa' ? fa : en;
        for (const key of keys) {
            if (result && typeof result === 'object' && key in result) {
                result = result[key];
            } else {
                return keyPath; // Return key path if not found
            }
        }
        return result;
    };

    return React.createElement(LanguageContext.Provider, { value: { language, setLanguage, t } }, children);
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// --- App-specific Types ---
export type PageKey = 'legal_drafter' | 'lawyer_finder' | 'news_summarizer' | 'case_strategist' | 'notary_finder' | 'web_analyzer' | 'document_analyzer' | 'legal_training';
export type SearchLevel = 'shallow' | 'deep' | 'advanced';

export interface Source {
    web: {
        uri: string;
        title: string;
    };
}

export interface LegalProfessional {
    name: string;
    specialty: string;
    address: string;
    contact: string;
    website: string;
    summary: string;
}


export interface SearchResult {
    summary: string;
    professionals: LegalProfessional[];
}


export interface StrategyTask {
  taskName: string;
  description: string;
  effortPercentage: number;
  deliverableType: string;
  suggestedPrompt: string;
}

export interface IntentRoute {
  module: PageKey;
  confidencePercentage: number;
  reasoning: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  docType: string; // To store the context for this chat
  timestamp: number;
}


export interface AppState {
  page: PageKey | 'home';
  // Old drafter state - replaced by chat
  // document: string;
  // form: {
  //   topic: string;
  //   description: string;
  //   docType: string;
  // };

  // New Chat state
  chatSessions: ChatSession[];
  activeChatId: string | null;

  lawyerFinderKeywords: string;
  notaryFinderKeywords: string;
  newsQuery: string;
  newsSummary: string;
  newsSources: Source[];
  strategyGoal: string;
  strategyResult: StrategyTask[];
  webAnalyzerUrl: string,
  webAnalyzerQuery: string,
  webAnalyzerResult: string,
  webAnalyzerSources: Source[],
  documentAnalyzerText: string;
  documentAnalyzerQuery: string;
  documentAnalyzerResult: string;
  trainingQuery: string;
  trainingResult: string;
  aiGuidePrompt: string;
  aiGuideResults: IntentRoute[];
}

export interface Checkpoint {
  id: string;
  timestamp: number;
  name: string;
  state: AppState;
}

export type SaveStatus = 'idle' | 'saving' | 'saved';

export interface AutoSaveData {
    // Old drafter state
    // topic: string;
    // description: string;
    // docType: string;

    // New Chat state
    chatInput: string;
    chatDocType: string;
    
    lawyerFinderKeywords: string;
    notaryFinderKeywords: string;
    newsQuery: string;
    webAnalyzerUrl: string;
    webAnalyzerQuery: string;
    strategyGoal: string;
    documentAnalyzerText: string;
    documentAnalyzerQuery: string;
    trainingQuery: string;
    aiGuidePrompt: string;
}