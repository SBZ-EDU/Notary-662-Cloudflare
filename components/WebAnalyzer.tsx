import React from 'react';
import { Source, useLanguage } from '../types';

interface WebAnalyzerProps {
    onAnalyze: (url: string, query: string) => void;
    url: string;
    setUrl: (value: string) => void;
    query: string;
    setQuery: (value: string) => void;
    result: string;
    sources: Source[];
    isLoading: boolean;
    error: string | null;
    isQuotaExhausted: boolean;
}

const WebAnalyzer: React.FC<WebAnalyzerProps> = ({
    onAnalyze,
    url,
    setUrl,
    query,
    setQuery,
    result,
    sources,
    isLoading,
    error,
    isQuotaExhausted
}) => {
    const { t } = useLanguage();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim() || !query.trim()) {
            alert(t('webAnalyzer.validationError'));
            return;
        }
        onAnalyze(url, query);
    };

    const handleUseExample = () => {
        setUrl(t('webAnalyzer.example.url'));
        setQuery(t('webAnalyzer.example.query'));
    };

    return (
        <section id="web-analyzer">
            <div className="max-w-6xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">{t('webAnalyzer.title')}</h2>
                    <p className="mt-2 text-gray-400 max-w-2xl mx-auto">{t('webAnalyzer.subtitle')}</p>
                </div>

                <div className="mt-10 bg-brand-blue-light rounded-lg p-8 shadow-lg backdrop-blur-sm border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                             <div className="flex justify-between items-center mb-1">
                                <label htmlFor="web-analyzer-url" className="block text-sm font-medium text-gray-300">{t('webAnalyzer.urlLabel')}</label>
                                <button type="button" onClick={handleUseExample} className="text-xs text-blue-400 hover:underline focus:outline-none">
                                    {t('generatorForm.useExample')}
                                </button>
                            </div>
                            <input
                                type="url"
                                id="web-analyzer-url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="mt-1 block w-full bg-brand-blue border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm text-white"
                                placeholder={t('webAnalyzer.urlPlaceholder')}
                            />
                        </div>
                        <div>
                            <label htmlFor="web-analyzer-query" className="block text-sm font-medium text-gray-300">{t('webAnalyzer.queryLabel')}</label>
                            <textarea
                                id="web-analyzer-query"
                                rows={3}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="mt-1 block w-full bg-brand-blue border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm text-white"
                                placeholder={t('webAnalyzer.queryPlaceholder')}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || isQuotaExhausted}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-brand-blue-dark bg-brand-gold hover:bg-brand-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-yellow disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? t('webAnalyzer.analyzing') : isQuotaExhausted ? t('quotaErrorModal.title') : t('webAnalyzer.buttonText')}
                            </button>
                        </div>
                    </form>
                </div>

                {(isLoading || error || result) && (
                    <div className="mt-10 bg-brand-blue-light rounded-lg shadow-lg backdrop-blur-sm border border-white/10 animate-fade-in">
                        <div className="p-4 bg-brand-blue border-b border-white/10">
                            <h3 className="text-lg font-semibold text-white">{t('webAnalyzer.resultsTitle')}</h3>
                        </div>
                        <div className="p-6">
                            {isLoading && (
                                <div className="flex items-center justify-center py-8">
                                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-brand-gold"></div>
                                    <span className="ml-3 text-gray-400">{t('webAnalyzer.analyzing')}</span>
                                </div>
                            )}
                            {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md">{error}</div>}
                            {result && (
                                <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300">
                                    <div dangerouslySetInnerHTML={{ __html: result }} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WebAnalyzer;