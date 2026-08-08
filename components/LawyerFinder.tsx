import React, { useState, useCallback } from 'react';
import { marked } from 'marked';
import { useLanguage, SearchResult, SearchLevel, ChatSession, LegalProfessional } from '../types';
import { findLawyers } from '../services/geminiService';
import { useAISuggestions, AISuggestionsDisplay } from './AISuggestions';

// --- PHONE PARSING UTILS ---
const faDigits = '۰۱۲۳۴۵۶۷۸۹';
const enDigits = '0123456789';

const toEnglishDigits = (str: string): string => {
    if (!str) return '';
    let result = '';
    for (const char of str) {
        const index = faDigits.indexOf(char);
        result += (index > -1) ? enDigits[index] : char;
    }
    return result;
};

export const parsePhoneNumberForWhatsApp = (contactInfo: string): string | null => {
    if (!contactInfo) return null;
    const cleaned = toEnglishDigits(contactInfo).replace(/[\s-()]/g, '');
    const phoneRegex = /(?:\+98|0)?(9\d{9}|21\d{8})/;
    const match = cleaned.match(phoneRegex);
    if (!match) return null;
    let phoneNumber = match[0];
    if (phoneNumber.startsWith('0')) return `98${phoneNumber.substring(1)}`;
    if (phoneNumber.startsWith('+98')) return phoneNumber.substring(1);
    if (phoneNumber.startsWith('98')) return phoneNumber;
    if (phoneNumber.length === 10 && phoneNumber.startsWith('9')) return `98${phoneNumber}`;
    if (phoneNumber.length === 10 && phoneNumber.startsWith('21')) return `98${phoneNumber}`;
    return null; 
};
// --- END UTILS ---

interface LawyerFinderProps {
    keywords: string;
    setKeywords: (value: string) => void;
    handleApiError: (err: unknown) => string;
    isQuotaExhausted: boolean;
    chatSessions: ChatSession[];
    activeChatId: string | null;
}

const LawyerFinder: React.FC<LawyerFinderProps> = ({ keywords, setKeywords, handleApiError, isQuotaExhausted, chatSessions, activeChatId }) => {
    const { t } = useLanguage();
    const [results, setResults] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isKeywordsFocused, setIsKeywordsFocused] = useState(false);
    const [searchLevel, setSearchLevel] = useState<SearchLevel>('deep');
    
    const { suggestions, isLoading: areSuggestionsLoading, setSuggestions } = useAISuggestions(
        keywords,
        "Suggest a legal specialty or a location-based query for finding a lawyer",
        !isQuotaExhausted && isKeywordsFocused
    );
    
    const activeChat = chatSessions.find(s => s.id === activeChatId);
    const activeDraftContent = activeChat?.messages.filter(m => m.role === 'model').pop()?.text || '';

    const handleSuggestionSelect = (suggestion: string) => {
        setKeywords(suggestion);
        setSuggestions([]);
    };

    const handleFind = useCallback(async () => {
        if (!keywords.trim()) {
            alert(t('lawyerFinder.validationError'));
            return;
        }
        setIsLoading(true);
        setResults(null);

        try {
            const response = await findLawyers(keywords, searchLevel);
            setResults(response);
        } catch (err) {
            const msg = handleApiError(err);
            setResults({ summary: `An error occurred: ${msg}`, professionals: [] });
        } finally {
            setIsLoading(false);
        }
    }, [keywords, searchLevel, handleApiError, t]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleFind();
    };

    const handleUseExample = () => {
        setKeywords(t('lawyerFinder.example.keywords'));
    };

    const handleSendWhatsApp = (professional: LegalProfessional) => {
        const phone = parsePhoneNumberForWhatsApp(professional.contact);
        if (!phone) {
            alert('شماره تماس معتبری برای ارسال در واتس‌اپ یافت نشد.');
            return;
        }

        const message = `با سلام،\n\nاز طرف دفتر اسناد رسمی ۶۶۲ تهران، پیش‌نویس زیر جهت ملاحظه ارسال می‌گردد:\n\n---\n\n${activeDraftContent}\n\n---\nتنظیم شده توسط دستیار هوشمند حقوقی دفتر ۶۶۲`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <section id="lawyer-finder">
            <div className="max-w-6xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">{t('lawyerFinder.title')}</h2>
                    <p className="mt-2 text-gray-400 max-w-2xl mx-auto">{t('lawyerFinder.subtitle')}</p>
                </div>

                <div className="mt-10 bg-brand-blue-light rounded-lg p-8 shadow-lg backdrop-blur-sm border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="lawyer-keywords" className="block text-sm font-medium text-gray-300">{t('lawyerFinder.keywordsLabel')}</label>
                                 <button type="button" onClick={handleUseExample} className="text-xs text-blue-400 hover:underline focus:outline-none">
                                    {t('generatorForm.useExample')}
                                </button>
                            </div>
                            <div className="relative">
                                <textarea
                                    id="lawyer-keywords"
                                    rows={3}
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    onFocus={() => setIsKeywordsFocused(true)}
                                    onBlur={() => setIsKeywordsFocused(false)}
                                    autoComplete="off"
                                    className="mt-1 block w-full bg-brand-blue border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm text-white"
                                    placeholder={t('lawyerFinder.keywordsPlaceholder')}
                                />
                                 {isKeywordsFocused && (
                                    <AISuggestionsDisplay
                                        suggestions={suggestions}
                                        isLoading={areSuggestionsLoading}
                                        onSelect={handleSuggestionSelect}
                                    />
                                )}
                                <p className="text-xs text-gray-500 mt-2 text-right">{t('lawyerFinder.semanticSearchBadge')}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 text-center">سطح جستجو</label>
                            <div className="flex justify-center rounded-lg bg-brand-blue p-1">
                                <button type="button" onClick={() => setSearchLevel('shallow')} className={`px-5 py-2 text-sm font-medium rounded-md flex-1 transition ${searchLevel === 'shallow' ? 'bg-brand-gold text-brand-blue-dark' : 'text-gray-300 hover:bg-white/10'}`}>سطحی</button>
                                <button type="button" onClick={() => setSearchLevel('deep')} className={`px-5 py-2 text-sm font-medium rounded-md flex-1 transition ${searchLevel === 'deep' ? 'bg-brand-gold text-brand-blue-dark' : 'text-gray-300 hover:bg-white/10'}`}>عمیق</button>
                                <button type="button" onClick={() => setSearchLevel('advanced')} className={`px-5 py-2 text-sm font-medium rounded-md flex-1 transition ${searchLevel === 'advanced' ? 'bg-brand-gold text-brand-blue-dark' : 'text-gray-300 hover:bg-white/10'}`}>پیشرفته</button>
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={isLoading || isQuotaExhausted} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-brand-blue-dark bg-brand-gold hover:bg-brand-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-yellow disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed transition-colors">
                                {isLoading ? t('lawyerFinder.finding') : isQuotaExhausted ? t('quotaErrorModal.title') : t('lawyerFinder.findButton')}
                            </button>
                        </div>
                    </form>
                </div>

                {(isLoading || results) && (
                    <div className="mt-10 animate-fade-in">
                        {isLoading && (
                            <div className="flex items-center justify-center py-8">
                                <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-brand-gold"></div>
                                <span className="ml-3 text-gray-400">{t('lawyerFinder.finding')}</span>
                            </div>
                        )}
                        {results && (
                            <div className="space-y-6">
                               {results.summary && (
                                    <div className="bg-brand-blue-light p-4 rounded-lg border border-brand-gold/30">
                                        <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: marked.parse(results.summary) }}></div>
                                    </div>
                                )}
                                {results.professionals && results.professionals.map((lawyer, index) => (
                                    <div key={index} className="bg-brand-blue-light p-4 rounded-lg border border-white/10 transform transition-transform hover:scale-[1.02] hover:border-brand-gold/50">
                                        <h3 className="font-bold text-lg text-brand-gold">{lawyer.name}</h3>
                                        <p className="text-sm text-gray-400 mt-1">{lawyer.specialty}</p>
                                        <p className="text-sm text-gray-300 mt-3">{lawyer.summary}</p>
                                        <div className="mt-4 pt-4 border-t border-gray-700 space-y-2 text-sm">
                                            <p><span className="font-semibold text-gray-400">آدرس: </span> {lawyer.address}</p>
                                            <p><span className="font-semibold text-gray-400">تماس: </span> {lawyer.contact}</p>
                                            {lawyer.website && lawyer.website !== 'N/A' && (
                                                 <p>
                                                    <span className="font-semibold text-gray-400">وب‌سایت: </span>
                                                    <a href={lawyer.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">
                                                        {lawyer.website}
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-700">
                                            <button
                                                onClick={() => handleSendWhatsApp(lawyer)}
                                                disabled={!activeDraftContent}
                                                title={activeDraftContent ? t('lawyerFinder.sendDraftTooltip') : t('lawyerFinder.noDraftToSend')}
                                                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <svg className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.8L2 22l5.3-1.38c1.37.74 2.93 1.18 4.56 1.18h.12c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm.01 1.62c4.56 0 8.28 3.72 8.28 8.28 0 4.56-3.72 8.28-8.28 8.28-1.5 0-2.9-.4-4.15-1.11l-.3-.18-3.07.8.82-3- .2-.31c-.78-1.25-1.21-2.71-1.21-4.24.01-4.55 3.73-8.27 8.29-8.27zm4.55 9.71c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.28.18-.53.06s-1.05-.38-2-1.23c-.74-.66-1.23-1.47-1.38-1.72s-.02-.38.11-.51c.11-.11.25-.28.37-.42.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86 1-.86 2.41s.88 2.79 1 2.99c.12.2.64.93 2.25 2.13.33.25.59.4.79.53.45.29.85.23 1.17.14.37-.1.72-.48.81-.93.1-.45.1-.84.07-.93z" /></svg>
                                                {t('lawyerFinder.sendDraft')}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LawyerFinder;