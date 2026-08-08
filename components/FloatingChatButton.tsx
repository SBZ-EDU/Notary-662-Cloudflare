import React from 'react';

interface FloatingChatButtonProps {
    onOpen: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onOpen }) => {
    return (
        <button
            onClick={onOpen}
            className="fixed bottom-5 left-5 rtl:left-auto rtl:right-5 z-50 w-16 h-16 bg-brand-gold rounded-full text-brand-blue-dark shadow-2xl flex items-center justify-center transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-blue focus:ring-brand-yellow animate-slide-up-fade-in"
            aria-label="Open AI Assistant"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        </button>
    );
};

export default FloatingChatButton;