import React, { useMemo, useState, useEffect } from 'react';
import { marked } from 'marked';
import { useLanguage } from '../types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  versions: string[];
  initialIndex?: number;
  title: string;
}

const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ isOpen, onClose, versions, initialIndex, title }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(initialIndex ?? (versions.length > 0 ? versions.length - 1 : 0));

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex ?? (versions.length > 0 ? versions.length - 1 : 0));
    }
  }, [isOpen, initialIndex, versions.length]);

  const currentContent = versions[currentIndex] || '';

  const parsedContent = useMemo(() => {
    if (!currentContent) return '';
    return marked.parse(currentContent);
  }, [currentContent]);

  const handlePrint = () => {
    const printableContent = document.getElementById('printable-document-content');
    if (printableContent) {
      const printWindow = window.open('', '_blank');
      printWindow?.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              @font-face {
                font-family: 'Iransans';
                src: url('https://sevinsazeh.com/wp-content/uploads/2024/03/IRANSansWebFaNum.woff2') format('woff2');
              }
              body { font-family: 'Iransans', sans-serif; direction: rtl; }
              .document-page { padding: 2.5rem; }
              .document-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e5e7eb; padding-bottom: 1rem; margin-bottom: 2rem; }
              .document-logo { display: flex; align-items: center; gap: 0.75rem; }
              .document-logo img { height: 3rem; }
              .document-logo span { font-size: 1.125rem; font-weight: 700; color: #374151; }
              .document-header-info { text-align: right; font-size: 0.875rem; color: #4b5563; }
              .document-body { color: #111827; }
              .document-body p, .document-body li { color: #374151; line-height: 2; text-align: justify; }
              .document-body h1, .document-body h2, .document-body h3, .document-body h4, .document-body h5, .document-body h6 { color: #111827; }
            </style>
          </head>
          <body>
            ${printableContent.innerHTML}
          </body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.print();
    }
  };

  const handleExportPdf = async () => {
    const element = document.querySelector('.document-page') as HTMLElement;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${title || 'document'}_v${currentIndex + 1}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('خطا در دریافت خروجی PDF. لطفاً دوباره تلاش کنید.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent)
      .then(() => alert('متن با موفقیت کپی شد!'))
      .catch(err => alert('خطا در کپی کردن متن.'));
  };

  const notaryPhone = useMemo(() => {
    const phone = t('footer.phone2');
    const faDigits = '۰۱۲۳۴۵۶۷۸۹';
    const enDigits = '0123456789';
    let enPhone = '';
    for (let char of phone) {
        const index = faDigits.indexOf(char);
        if (index > -1) {
            enPhone += enDigits[index];
        } else if (enDigits.includes(char)) {
            enPhone += char;
        }
    }
    return '98' + enPhone.replace(/^0/, '');
  }, [t]);

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${notaryPhone}&text=${encodeURIComponent(currentContent)}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in p-4" onClick={onClose}>
      <div className="bg-gray-200 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-4 bg-white rounded-t-lg border-b flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{t('documentViewer.title')}</h3>
              <p className="text-xs text-gray-500">{title}</p>
            </div>
            <div className="flex items-center gap-4">
               {versions.length > 1 && (
                 <div className="flex items-center bg-gray-100 rounded-lg p-1 border">
                    <button 
                      onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentIndex === 0}
                      className="px-2 py-1 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30"
                    >
                      {t('documentViewer.previousVersion')}
                    </button>
                    <div className="px-3 text-xs font-bold text-brand-blue border-x border-gray-300">
                      {t('documentViewer.version')} {currentIndex + 1} / {versions.length}
                    </div>
                    <button 
                      onClick={() => setCurrentIndex(prev => Math.min(versions.length - 1, prev + 1))}
                      disabled={currentIndex === versions.length - 1}
                      className="px-2 py-1 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30"
                    >
                      {t('documentViewer.nextVersion')}
                    </button>
                 </div>
               )}
               <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold leading-none">&times;</button>
            </div>
        </div>
        <div id="printable-document-content" className="flex-grow overflow-y-auto p-4 bg-gray-200">
          <div className="document-page">
            <div className="document-header">
              <div className="document-logo">
                <img src="https://www.notary662th.ir/wp-content/uploads/2020/09/LFZ-lOGO-e1697647803710.png" alt="Logo" />
                <span>{t('documentViewer.headerTitle')}</span>
              </div>
              <div className="document-header-info">
                <div><strong>{t('documentViewer.headerDate')}:</strong> {new Date().toLocaleDateString('fa-IR')}</div>
                <div><strong>{t('documentViewer.headerCaseNo')}:</strong> ............................</div>
              </div>
            </div>
            <div className="document-body">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: parsedContent }}></div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-b-lg border-t flex flex-wrap justify-center sm:justify-end items-center gap-3">
            <button onClick={handleCopy} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300">{t('documentViewer.copy')}</button>
            <button onClick={handleExportPdf} className="px-4 py-2 text-sm font-medium text-white bg-brand-blue border border-transparent rounded-md hover:bg-brand-blue/90 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {t('documentViewer.exportPdf')}
            </button>
            <button onClick={handlePrint} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300">{t('documentViewer.print')}</button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.8L2 22l5.3-1.38c1.37.74 2.93 1.18 4.56 1.18h.12c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm.01 1.62c4.56 0 8.28 3.72 8.28 8.28 0 4.56-3.72 8.28-8.28 8.28-1.5 0-2.9-.4-4.15-1.11l-.3-.18-3.07.8.82-3- .2-.31c-.78-1.25-1.21-2.71-1.21-4.24.01-4.55 3.73-8.27 8.29-8.27zm4.55 9.71c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.28.18-.53.06s-1.05-.38-2-1.23c-.74-.66-1.23-1.47-1.38-1.72s-.02-.38.11-.51c.11-.11.25-.28.37-.42.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86 1-.86 2.41s.88 2.79 1 2.99c.12.2.64.93 2.25 2.13.33.25.59.4.79.53.45.29.85.23 1.17.14.37-.1.72-.48.81-.93.1-.45.1-.84.07-.93z" /></svg>
                {t('documentViewer.sendToNotary')}
            </a>
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700">{t('documentViewer.close')}</button>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerModal;
