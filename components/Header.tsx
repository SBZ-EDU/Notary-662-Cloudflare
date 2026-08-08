import React, { useState, useRef, useEffect } from 'react';
import { Checkpoint, PageKey, SaveStatus, useLanguage } from '../types';

interface SiteHeaderProps {
    currentPage: string;
    setPage: (page: 'home' | PageKey) => void;
    checkpoints: Checkpoint[];
    onCreateCheckpoint: () => void;
    onRestoreCheckpoint: (id: string) => void;
    onDeleteCheckpoint: (id: string) => void;
    saveStatus: SaveStatus;
    onOpenAIGuide: () => void;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ currentPage, setPage, checkpoints, onCreateCheckpoint, onRestoreCheckpoint, onDeleteCheckpoint, saveStatus, onOpenAIGuide }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isCheckpointMenuOpen, setIsCheckpointMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const checkpointMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
      if (checkpointMenuRef.current && !checkpointMenuRef.current.contains(event.target as Node)) {
        setIsCheckpointMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handlePageChange = (page: 'home' | PageKey) => {
      setPage(page);
      window.scrollTo(0, 0);
      setIsMobileMenuOpen(false);
  }

  const navLinks = [
    { key: 'home', text: t('header.home'), action: () => handlePageChange('home') },
    { key: 'legal_drafter', text: t('header.aiAssistant'), action: () => handlePageChange('legal_drafter') },
    { key: 'lawyer_finder', text: t('header.lawyerFinder'), action: () => handlePageChange('lawyer_finder') },
    { key: 'notary_finder', text: t('header.notaryFinder'), action: () => handlePageChange('notary_finder') },
    { key: 'news_summarizer', text: t('header.newsSummarizer'), action: () => handlePageChange('news_summarizer') },
    { key: 'web_analyzer', text: t('header.webAnalyzer'), action: () => handlePageChange('web_analyzer') },
    { key: 'document_analyzer', text: t('header.documentAnalyzer'), action: () => handlePageChange('document_analyzer') },
    { key: 'legal_training', text: t('header.legalTraining'), action: () => handlePageChange('legal_training') },
    { key: 'case_strategist', text: t('header.caseStrategist'), action: () => handlePageChange('case_strategist') },
  ];
  
  const SaveStatusIndicator: React.FC = () => {
    let text: string | null = null;
    let icon: React.ReactNode = null;
    let key: string = saveStatus;

    switch (saveStatus) {
        case 'saving':
            text = 'در حال ذخیره...';
            icon = <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
            break;
        case 'saved':
            text = 'ذخیره شد';
            icon = <svg className="h-4 w-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
            key = `${saveStatus}-${Date.now()}`; // Force re-render for animation
            break;
        default:
            return null;
    }

    return (
        <div key={key} className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-gray-400 animate-fade-in">
            {icon}
            <span>{text}</span>
        </div>
    );
  };


  return (
    <header className="bg-brand-blue-dark/80 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10 h-[72px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Left side: Logo and Desktop Nav */}
          <div className="flex items-center">
            <a href="#" onClick={() => setPage('home')} className="flex-shrink-0 flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://www.notary662th.ir/wp-content/uploads/2020/09/LFZ-lOGO-e1697647803710.png" alt="دفتر اسناد رسمی ۶۶۲ تهران" className="h-12 w-auto" />
              <span className="font-bold text-lg text-white hidden lg:inline">دفتر اسناد رسمی ۶۶۲ تهران</span>
            </a>
            <nav className="hidden lg:flex lg:ml-10 lg:space-x-2">
              {navLinks.filter(link => link.key !== 'home').map(link => (
                  <button key={link.key} onClick={link.action} className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === link.key ? 'text-brand-gold' : ''}`}>
                    {link.text}
                  </button>
              ))}
            </nav>
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center space-x-2">
            <div className="hidden lg:flex items-center mr-4 h-5">
               <SaveStatusIndicator />
            </div>
            
            {/* Checkpoint Controls - Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              <button 
                  onClick={onCreateCheckpoint}
                  className="p-2 bg-brand-blue/50 border border-gray-600 rounded-md text-gray-300 hover:bg-brand-blue hover:text-white transition-colors"
                  title={t('header.createCheckpointTitle')}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm2 0v12h6V4H7z" /><path d="M7 2h6a2 2 0 012 2v2H5V4a2 2 0 012-2z" /></svg>
              </button>
              <div className="relative" ref={checkpointMenuRef}>
                  <button
                      onClick={() => setIsCheckpointMenuOpen(prev => !prev)}
                      className="flex items-center px-3 py-2 bg-brand-blue/50 border border-gray-600 rounded-md text-sm text-gray-300 hover:bg-brand-blue hover:text-white transition-colors"
                  >
                      {t('header.checkpoints')}
                      <span className={`${language === 'fa' ? 'mr-2' : 'ml-2'} bg-brand-gold text-brand-blue-dark text-xs font-semibold px-2 py-0.5 rounded-full`}>{checkpoints.length}</span>
                  </button>
                  {isCheckpointMenuOpen && (
                      <div className={`absolute mt-2 w-72 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-20 ${language === 'fa' ? 'left-0' : 'right-0'}`}>
                          <div className="p-2 text-sm text-center text-gray-300 border-b border-gray-700">{t('header.projectHistory')}</div>
                          {checkpoints.length > 0 ? (
                              <ul className="py-1 max-h-80 overflow-y-auto">
                                  {checkpoints.map(ckpt => (
                                      <li key={ckpt.id} className="px-3 py-2 hover:bg-gray-700/50 transition-colors">
                                         <div className="flex justify-between items-center">
                                              <div className="text-sm text-gray-300 truncate pr-2">{ckpt.name}</div>
                                              <div className="flex-shrink-0 flex items-center space-x-1">
                                                  <button onClick={() => onRestoreCheckpoint(ckpt.id)} title={t('header.restore')} className="p-1 text-gray-400 hover:text-blue-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg></button>
                                                  <button onClick={() => onDeleteCheckpoint(ckpt.id)} title={t('header.delete')} className="p-1 text-gray-400 hover:text-red-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg></button>
                                              </div>
                                         </div>
                                      </li>
                                  ))}
                              </ul>
                          ) : (
                              <div className="text-center text-gray-500 py-4 px-3 text-sm">{t('header.noCheckpoints')}</div>
                          )}
                      </div>
                  )}
              </div>
            </div>

            {/* AI Guide / Search Icon */}
            <button onClick={onOpenAIGuide} className="p-2 text-gray-300 hover:text-white transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

            {/* Mobile Hamburger Menu */}
            <div className="flex lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(prev => !prev)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden animate-fade-in bg-brand-blue-dark border-b border-white/10" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
                <button key={link.key} onClick={link.action} className={`text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-right px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === link.key ? 'bg-gray-900 text-brand-gold' : ''}`}>
                  {link.text}
                </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;