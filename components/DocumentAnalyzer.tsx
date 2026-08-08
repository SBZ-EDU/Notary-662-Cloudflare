import React from 'react';
import { useLanguage } from '../types';

interface DocumentAnalyzerProps {
    onAnalyze: (docText: string, query: string) => void;
    docText: string;
    setDocText: (value: string) => void;
    query: string;
    setQuery: (value: string) => void;
    result: string;
    isLoading: boolean;
    error: string | null;
    isQuotaExhausted: boolean;
}

const DocumentAnalyzer: React.FC<DocumentAnalyzerProps> = ({
    onAnalyze,
    docText,
    setDocText,
    query,
    setQuery,
    result,
    isLoading,
    error,
    isQuotaExhausted
}) => {
    const { t } = useLanguage();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!docText.trim() || !query.trim()) {
            alert(t('documentAnalyzer.validationError'));
            return;
        }
        onAnalyze(docText, query);
    };

    const handleUseExample = () => {
        setDocText(t('documentAnalyzer.example.text'));
        setQuery(t('documentAnalyzer.example.query'));
    };

    return (
        <section id="document-analyzer">
            <div className="max-w-6xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">{t('documentAnalyzer.title')}</h2>
                    <p className="mt-2 text-gray-400 max-w-2xl mx-auto">{t('documentAnalyzer.subtitle')}</p>
                </div>

                <div className="mt-10 bg-brand-blue-light rounded-lg p-8 shadow-lg backdrop-blur-sm border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                             <div className="flex justify-between items-center mb-1">
                                <label htmlFor="doc-analyzer-text" className="block text-sm font-medium text-gray-300">{t('documentAnalyzer.textLabel')}</label>
                                <button type="button" onClick={handleUseExample} className="text-xs text-blue-400 hover:underline focus:outline-none">
                                    {t('generatorForm.useExample')}
                                </button>
                            </div>
                            <textarea
                                id="doc-analyzer-text"
                                rows={10}
                                value={docText}
                                onChange={(e) => setDocText(e.target.value)}
                                className="mt-1 block w-full bg-brand-blue border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm text-white"
                                placeholder={t('documentAnalyzer.textPlaceholder')}
                            />
                        </div>
                        <div>
                            <label htmlFor="doc-analyzer-query" className="block text-sm font-medium text-gray-300">{t('documentAnalyzer.queryLabel')}</label>
                            <input
                                type="text"
                                id="doc-analyzer-query"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="mt-1 block w-full bg-brand-blue border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm text-white"
                                placeholder={t('documentAnalyzer.queryPlaceholder')}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || isQuotaExhausted}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-brand-blue-dark bg-brand-gold hover:bg-brand-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-yellow disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? t('documentAnalyzer.analyzing') : isQuotaExhausted ? t('quotaErrorModal.title') : t('documentAnalyzer.buttonText')}
                            </button>
                        </div>
                    </form>
                </div>

                {(isLoading || error || result) && (
                    <div className="mt-10 bg-brand-blue-light rounded-lg shadow-lg backdrop-blur-sm border border-white/10 animate-fade-in">
                        <div className="p-4 bg-brand-blue border-b border-white/10">
                            <h3 className="text-lg font-semibold text-white">{t('documentAnalyzer.resultsTitle')}</h3>
                        </div>
                        <div className="p-6">
                            {isLoading && (
                                <div className="flex items-center justify-center py-8">
                                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-brand-gold"></div>
                                    <span className="ml-3 rtl:mr-3 text-gray-400">{t('documentAnalyzer.analyzing')}</span>
                                </div>
                            )}
                            {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md">{error}</div>}
                            {result && (
                                <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: result }} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DocumentAnalyzer;