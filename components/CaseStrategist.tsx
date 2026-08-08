import React, { useState } from 'react';
import { StrategyTask, useLanguage } from '../types';
import { useAISuggestions, AISuggestionsDisplay } from './AISuggestions';

interface CaseStrategistProps {
    onGenerate: (goal: string) => void;
    goal: string;
    setGoal: (value: string) => void;
    result: StrategyTask[];
    isLoading: boolean;
    error: string | null;
    isQuotaExhausted: boolean;
    onExecuteTask: (task: StrategyTask) => Promise<void>;
    isExecutingTask: boolean;
}

const CaseStrategist: React.FC<CaseStrategistProps> = ({ 
    onGenerate, goal, setGoal, result, isLoading, error, isQuotaExhausted, onExecuteTask, isExecutingTask 
}) => {
    const { t } = useLanguage();
    const [visiblePromptId, setVisiblePromptId] = useState<number | null>(null);
    const [executingTaskId, setExecutingTaskId] = useState<number | null>(null);
    const [isGoalFocused, setIsGoalFocused] = useState(false);
    
    const { suggestions, isLoading: areSuggestionsLoading, setSuggestions } = useAISuggestions(
        goal,
        "Suggest high-level project goals a user might want to plan",
        !isQuotaExhausted && isGoalFocused
    );

    const handleSuggestionSelect = (suggestion: string) => {
        setGoal(suggestion);
        setSuggestions([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!goal.trim()) {
            alert(t('caseStrategist.validationError'));
            return;
        }
        onGenerate(goal);
        setVisiblePromptId(null);
    };

    const handleExecute = async (task: StrategyTask, index: number) => {
        setExecutingTaskId(index);
        await onExecuteTask(task);
        setExecutingTaskId(null);
    };
    
    const handleUseExample = () => {
        setGoal(t('caseStrategist.example.goal'));
    };

    return (
        <section id="case-strategist">
            <div className="max-w-6xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">{t('caseStrategist.title')}</h2>
                    <p className="mt-2 text-gray-400 max-w-2xl mx-auto">{t('caseStrategist.subtitle')}</p>
                </div>

                <div className="mt-10 bg-brand-blue-light rounded-lg p-8 shadow-lg backdrop-blur-sm border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="goal-input" className="block text-sm font-medium text-gray-300">{t('caseStrategist.goalLabel')}</label>
                                <button type="button" onClick={handleUseExample} className="text-xs text-blue-400 hover:underline focus:outline-none">
                                    {t('generatorForm.useExample')}
                                </button>
                            </div>
                            <div className="relative">
                                <textarea
                                    id="goal-input"
                                    rows={4}
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                    onFocus={() => setIsGoalFocused(true)}
                                    onBlur={() => setIsGoalFocused(false)}
                                    autoComplete="off"
                                    className="mt-1 block w-full bg-brand-blue border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm text-white"
                                    placeholder={t('caseStrategist.goalPlaceholder')}
                                />
                                {isGoalFocused && (
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
                                {isLoading ? t('caseStrategist.generating') : isQuotaExhausted ? t('quotaErrorModal.title') : t('caseStrategist.buttonText')}
                            </button>
                        </div>
                    </form>
                </div>

                {(isLoading || error || result.length > 0) && (
                    <div className="mt-10 animate-fade-in">
                        <div className="mb-4">
                            <h3 className="text-2xl font-semibold text-white">{t('caseStrategist.resultsTitle')}</h3>
                        </div>
                        <div className="space-y-6">
                            {isLoading && (
                                <div className="flex items-center justify-center py-8">
                                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-brand-gold"></div>
                                    <span className="ml-3 text-gray-400">{t('caseStrategist.generating')}</span>
                                </div>
                            )}
                            {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md">{error}</div>}
                            {result.map((task, index) => (
                                <div key={index} className="bg-brand-blue-light rounded-lg shadow-lg backdrop-blur-sm border border-white/10 p-6">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-xl font-bold text-brand-gold">{task.taskName}</h4>
                                        <div className="text-right flex-shrink-0 ml-4">
                                            <div className="text-sm text-gray-400">{t('caseStrategist.effort')}</div>
                                            <div className="text-lg font-bold text-white">{task.effortPercentage}%</div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2.5 my-2">
                                        <div className="bg-brand-gold h-2.5 rounded-full" style={{ width: `${task.effortPercentage}%` }}></div>
                                    </div>
                                    <p className="text-gray-300 mt-3">{task.description}</p>
                                    <div className="mt-4 pt-4 border-t border-gray-600 flex flex-wrap items-center gap-4">
                                        <p className="text-sm flex-shrink-0"><span className="font-semibold text-gray-400">{t('caseStrategist.deliverable')}:</span> <span className="font-medium text-gray-200 bg-gray-700 px-2 py-1 rounded-md">{task.deliverableType}</span></p>
                                        <div className="flex-grow flex items-center space-x-4">
                                            <button 
                                                onClick={() => setVisiblePromptId(visiblePromptId === index ? null : index)}
                                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                {visiblePromptId === index ? '▲ ' : '▼ '} {t('caseStrategist.suggestedPrompt')}
                                            </button>
                                            <button 
                                                onClick={() => handleExecute(task, index)}
                                                disabled={isExecutingTask}
                                                className="flex items-center text-sm px-3 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-600 transition-colors"
                                            >
                                                {executingTaskId === index ? (
                                                    <><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    {t('caseStrategist.executingTask')}</>
                                                ) : (
                                                    '⚡️ ' + t('caseStrategist.executeTask')
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                     {visiblePromptId === index && (
                                        <div className="mt-4 bg-brand-blue/70 p-4 rounded-md border border-gray-700 w-full">
                                            <pre className="whitespace-pre-wrap text-sm text-gray-300">
                                                <code>{task.suggestedPrompt}</code>
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CaseStrategist;