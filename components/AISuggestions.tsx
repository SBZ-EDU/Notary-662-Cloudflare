import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getSuggestions } from '../services/geminiService';
import { useLanguage } from '../types';

// The hook
export const useAISuggestions = (inputValue: string, contextPrompt: string, isEnabled: boolean, minLength = 5, debounceTime = 750) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const debounceTimeout = useRef<number | null>(null);

    const fetchSuggestions = useCallback(async () => {
        if (!isEnabled) return;
        setIsLoading(true);
        try {
            const result = await getSuggestions(inputValue, contextPrompt);
            setSuggestions(result);
        } catch (error) {
            console.error("Failed to get suggestions:", error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, [inputValue, contextPrompt, isEnabled]);

    useEffect(() => {
        if (!isEnabled || inputValue.trim().length < minLength) {
            setSuggestions([]);
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            return;
        }

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = window.setTimeout(fetchSuggestions, debounceTime);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [inputValue, minLength, debounceTime, fetchSuggestions, isEnabled]);

    return { suggestions, isLoading, setSuggestions };
};

// The display component
interface AISuggestionsDisplayProps {
    suggestions: string[];
    isLoading: boolean;
    onSelect: (suggestion: string) => void;
    showNoResults?: boolean;
}

export const AISuggestionsDisplay: React.FC<AISuggestionsDisplayProps> = ({ suggestions, isLoading, onSelect, showNoResults = false }) => {
    const { t } = useLanguage();

    if (isLoading) {
        return (
            <div className="absolute z-10 mt-1 w-full bg-brand-blue-dark border border-gray-600 rounded-md shadow-lg p-3 text-sm text-gray-400 text-center animate-pulse">
                {t('aiSuggestions.thinking')}
            </div>
        );
    }

    if (suggestions.length === 0) {
        if (showNoResults && !isLoading) {
             return (
                <div className="absolute z-10 mt-1 w-full bg-brand-blue-dark border border-gray-600 rounded-md shadow-lg p-3 text-sm text-gray-500 text-center">
                    {t('aiSuggestions.noResults')}
                </div>
            );
        }
        return null;
    }

    return (
        <div className="absolute z-10 mt-1 w-full bg-brand-blue-dark border border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto animate-fade-in">
            <ul>
                {suggestions.map((s, i) => (
                    <li key={i}>
                        <button
                            type="button"
                            onMouseDown={(e) => { // use onMouseDown to fire before onBlur on input
                                e.preventDefault();
                                onSelect(s);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-brand-blue-light transition-colors"
                        >
                            {s}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
