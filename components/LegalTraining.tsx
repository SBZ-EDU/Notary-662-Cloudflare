import React from 'react';
import { useLanguage } from '../types';

interface LegalTrainingProps {
    onGenerate: (query: string) => void;
    query: string;
    setQuery: (value: string) => void;
    result: string;
    isLoading: boolean;
    error: string | null;
    isQuotaExhausted: boolean;
}

const LegalTraining: React.FC<LegalTrainingProps> = ({
    onGenerate,
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
        if (!query.trim()) {
            alert(t('legalTraining.validationError'));
            return;
        }
        onGenerate(query);
    };

    const handleUseExample = () => {
        setQuery(t('legalTraining.example.query'));
    };

    return (
        <section id="legal-training">
            <div className="max-w-6xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">{t('legalTraining.title')}</h2>
                    <p className="mt-2 text-gray-400 max-w-2xl mx-auto">{t('legalTraining.subtitle')}</p>
                </div>

                <div className="mt-10 bg-brand-blue-light rounded-lg p-8 shadow-lg backdrop-blur-sm border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="training-query" className="block text-sm font-medium text-gray-300">{t('legalTraining.queryLabel')}</label>
                                <button type="button" onClick={handleUseExample} className="text-xs text-blue-400 hover:underline focus:outline-none">
                                    {t('generatorForm.useExample')}
                                </button>
                            </div>
                            <input
                                type="text"
                                id="training-query"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="mt-1 block w-full bg-brand-blue border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm text-white"
                                placeholder={t('legalTraining.queryPlaceholder')}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || isQuotaExhausted}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-brand-blue-dark bg-brand-gold hover:bg-brand-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-yellow disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? t('legalTraining.generating') : isQuotaExhausted ? t('quotaErrorModal.title') : t('legalTraining.buttonText')}
                            </button>
                        </div>
                    </form>
                </div>

                {(isLoading || error || result) && (
                    <div className="mt-10 bg-brand-blue-light rounded-lg shadow-lg backdrop-blur-sm border border-white/10 animate-fade-in">
                        <div className="p-4 bg-brand-blue border-b border-white/10">
                            <h3 className="text-lg font-semibold text-white">{t('legalTraining.resultsTitle')}</h3>
                        </div>
                        <div className="p-6">
                            {isLoading && (
                                <div className="flex items-center justify-center py-8">
                                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-brand-gold"></div>
                                    <span className="ml-3 rtl:mr-3 text-gray-400">{t('legalTraining.generating')}</span>
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

export default LegalTraining;