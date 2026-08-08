import React, { useState } from 'react';
import { Source, useLanguage } from '../types';
import { useAISuggestions, AISuggestionsDisplay } from './AISuggestions';

interface NewsSummarizerProps {
    onSummarize: (query: string) => void;
    query: string;
    setQuery: (value: string) => void;
    summary: string;
    sources: Source[];
    isLoading: boolean;
    error: string | null;
    isQuotaExhausted: boolean;
}

const NewsSummarizer: React.FC<NewsSummarizerProps> = ({
    onSummarize,
    query,
    setQuery,
    summary,
    sources,
    isLoading,
    error,
    isQuotaExhausted
}) => {
    const { t } = useLanguage();
    const [isQueryFocused, setIsQueryFocused] = useState(false);
    const { suggestions, isLoading: areSuggestionsLoading, setSuggestions } = useAISuggestions(
        query,
        "Suggest current news topics or areas of interest in Iran",
        !isQuotaExhausted && isQueryFocused
    );

    const handleSuggestionSelect = (suggestion: string) => {
        setQuery(suggestion);
        setSuggestions([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) {
            alert(t('newsSummarizer.validationError'));
            return;
        }
        onSummarize(query);
    };
    
    const handleUseExample = () => {
        setQuery(t('newsSummarizer.example.query'));
    };

    return (
        <section id="news-summarizer">
            <div className="max-w-6xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">{t('newsSummarizer.title')}</h2>
                    <p className="mt-2 text-gray-400 max-w-2xl mx-auto">{t('newsSummarizer.subtitle')}</p>
                </div>

                <div className="mt-10 bg-brand-blue-light rounded-lg p-8 shadow-lg backdrop-blur-sm border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="news-query" className="block text-sm font-medium text-gray-300">{t('newsSummarizer.queryLabel')}</label>
                                <button type="button" onClick={handleUseExample} className="text-xs text-blue-400 hover:underline focus:outline-none">
                                    {t('generatorForm.useExample')}
                                </button>
                            </div>
                            <div className="relative">
                                <textarea
                                    id="news-query"
                                    rows={3}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onFocus={() => setIsQueryFocused(true)}
                                    onBlur={() => setIsQueryFocused(false)}
                                    autoComplete="off"
                                    className="mt-1 block w-full bg-brand-blue border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm text-white"
                                    placeholder={t('newsSummarizer.queryPlaceholder')}
                                />
                                {isQueryFocused && (
                                    <AISuggestionsDisplay
                                        suggestions={suggestions}
                                        isLoading={areSuggestionsLoading}
                                        onSelect={handleSuggestionSelect}
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || isQuotaExhausted}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-brand-blue-dark bg-brand-gold hover:bg-brand-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-yellow disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? t('newsSummarizer.summarizing') : isQuotaExhausted ? t('quotaErrorModal.title') : t('newsSummarizer.buttonText')}
                            </button>
                        </div>
                    </form>
                </div>

                {(isLoading || error || summary) && (
                    <div className="mt-10 bg-brand-blue-light rounded-lg shadow-lg backdrop-blur-sm border border-white/10 animate-fade-in">
                        <div className="p-4 bg-brand-blue border-b border-white/10">
                            <h3 className="text-lg font-semibold text-white">{t('newsSummarizer.resultsTitle')}</h3>
                        </div>
                        <div className="p-6">
                            {isLoading && (
                                <div className="flex items-center justify-center py-8">
                                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-brand-gold"></div>
                                    <span className="ml-3 text-gray-400">{t('newsSummarizer.summarizing')}</span>
                                </div>
                            )}
                            {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md">{error}</div>}
                            {summary && (
                                <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300">
                                    <div dangerouslySetInnerHTML={{ __html: summary }} />
                                    <hr className="my-6 border-gray-600"/>
                                    <h4 className="text-md font-semibold text-gray-200">{t('newsSummarizer.sourcesTitle')}</h4>
                                    {sources.length > 0 ? (
                                        <ul className="list-disc pl-5 space-y-2">
                                            {sources.map((source, index) => (
                                                <li key={index}>
                                                    <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-words">
                                                        {source.web.title || source.web.uri}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : <p className="text-gray-500 text-sm">{t('newsSummarizer.noSources')}</p>}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewsSummarizer;