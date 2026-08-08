import React, { useState, useEffect } from 'react';
import { IntentRoute, PageKey, useLanguage, ChatSession } from '../types';
import { useAISuggestions, AISuggestionsDisplay } from './AISuggestions';
import { generateContextualSuggestions } from '../services/geminiService';

interface AIGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoute: (goal: string) => void;
  onSelectRoute: (page: PageKey) => void;
  prompt: string;
  setPrompt: (value: string) => void;
  results: IntentRoute[];
  isLoading: boolean;
  error: string | null;
  chatSessions: ChatSession[];
}

const AIGuideModal: React.FC<AIGuideModalProps> = ({ 
    isOpen, onClose, onRoute, onSelectRoute, prompt, setPrompt, results, isLoading, error, chatSessions
}) => {
  const { t } = useLanguage();
  const [isPromptFocused, setIsPromptFocused] = useState(false);
  const [contextualSuggestions, setContextualSuggestions] = useState<string[]>([]);
  const [isContextualLoading, setIsContextualLoading] = useState(false);
  
  const { suggestions, isLoading: areSuggestionsLoading, setSuggestions } = useAISuggestions(
      prompt,
      "Suggest common legal goals or questions a user might have when using a legal AI assistant",
      isOpen && isPromptFocused
  );

  useEffect(() => {
    if (isOpen) {
        const fetchContextualSuggestions = async () => {
            setIsContextualLoading(true);
            try {
                if (chatSessions.length === 0) {
                    setContextualSuggestions(t('aiGuide.predefinedSuggestions'));
                } else {
                    const promptTemplate = t('aiGuide.contextualSuggestionsPrompt');
                    const generated = await generateContextualSuggestions(chatSessions.slice(0, 5), promptTemplate); // Use recent 5 chats
                    setContextualSuggestions(generated.length > 0 ? generated : t('aiGuide.predefinedSuggestions'));
                }
            } catch (err) {
                console.error("Error fetching contextual suggestions", err);
                setContextualSuggestions(t('aiGuide.predefinedSuggestions')); // Fallback
            } finally {
                setIsContextualLoading(false);
            }
        };
        fetchContextualSuggestions();
    } else {
      // Reset when closed
      setContextualSuggestions([]);
    }
  }, [isOpen, chatSessions, t]);

  const handleSuggestionSelect = (suggestion: string) => {
      setPrompt(suggestion);
      setSuggestions([]);
  };

  const handleContextualClick = (suggestion: string) => {
      setPrompt(suggestion);
      onRoute(suggestion);
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
        alert(t('aiGuide.validationError'));
        return;
    }
    onRoute(prompt);
  };

  const moduleTranslations: Record<PageKey, string> = {
    legal_drafter: t('header.aiAssistant'),
    lawyer_finder: t('header.lawyerFinder'),
    news_summarizer: t('header.newsSummarizer'),
    case_strategist: t('header.caseStrategist'),
    notary_finder: t('header.notaryFinder'),
    web_analyzer: t('header.webAnalyzer'),
    document_analyzer: t('header.documentAnalyzer'),
    legal_training: t('header.legalTraining'),
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in p-4" aria-modal="true" role="dialog">
      <div className="bg-brand-blue-light rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 border border-brand-gold/50 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold leading-6 text-white">{t('aiGuide.title')}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mb-4">{t('aiGuide.subtitle')}</p>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <div className="relative">
                        <textarea
                            rows={4}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onFocus={() => setIsPromptFocused(true)}
                            onBlur={() => setIsPromptFocused(false)}
                            autoComplete="off"
                            className="w-full bg-brand-blue border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm text-white"
                            placeholder={t('aiGuide.placeholder')}
                        />
                        {isPromptFocused && (
                            <AISuggestionsDisplay
                                suggestions={suggestions}
                                isLoading={areSuggestionsLoading}
                                onSelect={handleSuggestionSelect}
                            />
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-brand-blue-dark bg-brand-gold hover:bg-brand-yellow focus:outline-none disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
                >
                    {isLoading ? t('aiGuide.gettingSuggestions') : t('aiGuide.submitButton')}
                </button>
            </form>
            
            {/* Contextual Suggestions */}
             <div className="mt-6">
                {isContextualLoading && (
                     <div className="flex items-center justify-center py-4">
                        <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-gray-400"></div>
                        <span className="ml-2 text-sm text-gray-400">در حال یافتن پیشنهادات...</span>
                    </div>
                )}
                {!isContextualLoading && contextualSuggestions.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">{t('aiGuide.contextualSuggestionsTitle')}</h4>
                        {contextualSuggestions.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => handleContextualClick(s)}
                                className="w-full text-right bg-brand-blue/60 p-3 rounded-lg text-sm text-gray-200 hover:bg-brand-blue transition-colors"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}
            </div>


            {/* Results */}
            <div className="mt-6">
                {isLoading && !error && (
                    <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-brand-gold"></div>
                        <span className="ml-3 text-gray-400">{t('aiGuide.gettingSuggestions')}</span>
                    </div>
                )}
                {error && <div className="text-red-400 text-center p-4 bg-red-900/50 rounded-md">{error}</div>}
                
                {results.length > 0 && !isLoading && (
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">{t('aiGuide.resultsTitle')}</h4>
                        {results.map((result) => (
                            <div key={result.module} className="bg-brand-blue/50 p-4 rounded-lg border border-gray-600 space-y-3">
                            <div className="flex justify-between items-start gap-4">
                                    <h5 className="text-lg font-bold text-brand-gold">{moduleTranslations[result.module]}</h5>
                                <button 
                                    onClick={() => onSelectRoute(result.module)}
                                    className="flex-shrink-0 text-sm px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                                >
                                    {t('aiGuide.goTo')}
                                </button>
                            </div>
                            <p className="text-sm text-gray-300">{result.reasoning}</p>
                            <div className="w-full pt-2">
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-400">{t('aiGuide.confidence')}</span>
                                    <span className="text-sm font-medium text-white">{result.confidencePercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-600 rounded-full h-2.5">
                                    <div
                                        className="bg-gradient-to-r from-brand-gold to-brand-yellow h-2.5 rounded-full"
                                        style={{ width: `${result.confidencePercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AIGuideModal;