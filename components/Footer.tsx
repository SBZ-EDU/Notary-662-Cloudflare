import React from 'react';
import { useLanguage } from '../types';

const SiteFooter: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer id="footer" className="bg-brand-blue-dark text-gray-300 border-t border-white/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Column 1: About */}
                    <div className="md:col-span-2 space-y-4 text-center md:text-right">
                        <h2 className="text-lg font-semibold text-white border-b-2 border-gray-700 pb-2 inline-block">{t('footer.aboutTitle')}</h2>
                        <p className="text-sm leading-relaxed text-gray-400">{t('footer.description')}</p>
                         <div className="flex justify-center md:justify-start space-x-4 rtl:space-x-reverse pt-4">
                            <a href="https://api.whatsapp.com/send?phone=+989196625662" target="_blank" rel="nofollow noopener" className="text-gray-400 hover:text-brand-gold transition-colors" title="WhatsApp">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.8L2 22l5.3-1.38c1.37.74 2.93 1.18 4.56 1.18h.12c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm.01 1.62c4.56 0 8.28 3.72 8.28 8.28 0 4.56-3.72 8.28-8.28 8.28-1.5 0-2.9-.4-4.15-1.11l-.3-.18-3.07.8.82-3- .2-.31c-.78-1.25-1.21-2.71-1.21-4.24.01-4.55 3.73-8.27 8.29-8.27zm4.55 9.71c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.28.18-.53.06s-1.05-.38-2-1.23c-.74-.66-1.23-1.47-1.38-1.72s-.02-.38.11-.51c.11-.11.25-.28.37-.42.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86 1-.86 2.41s.88 2.79 1 2.99c.12.2.64.93 2.25 2.13.33.25.59.4.79.53.45.29.85.23 1.17.14.37-.1.72-.48.81-.93.1-.45.1-.84.07-.93z" /></svg>
                            </a>
                            <a href="https://www.instagram.com/notary662th/" target="_blank" rel="nofollow noopener" className="text-gray-400 hover:text-brand-gold transition-colors" title="Instagram">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 4.22c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.06-1.03.048-1.634.211-2.126.41-1.054.425-1.838 1.21-2.262 2.262-.2.492-.362 1.096-.41 2.126-.048 1.024-.06 1.351-.06 3.807s.012 2.784.06 3.808c.048 1.03.211 1.634.41 2.126.425 1.054 1.208 1.838 2.262 2.262.492.2.92.362 2.126.41 1.024.048 1.351.06 3.807.06h.468c2.456 0 2.784-.011 3.807-.06 1.03-.048 1.634-.211 2.126-.41 1.054-.425 1.838-1.21 2.262-2.262.2-.492.362-1.096.41-2.126.048-1.024.06-1.351.06-3.807s-.012-2.784-.06-3.808c-.048-1.03-.211-1.634-.41-2.126-.425-1.054-1.208-1.838-2.262-2.262-.492-.2-.92-.362-2.126-.41-1.024-.048-1.351-.06-3.807-.06z M12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 1.802a3.333 3.333 0 110 6.666 3.333 3.333 0 010-6.666zm5.338-3.205a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="https://t.me/notarytehran662" target="_blank" rel="nofollow noopener" className="text-gray-400 hover:text-brand-gold transition-colors" title="Telegram">
                               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9- .902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.04-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Contact Info */}
                    <div className="space-y-4 text-center md:text-right">
                        <h2 className="text-lg font-semibold text-white border-b-2 border-gray-700 pb-2 inline-block">{t('footer.contactTitle')}</h2>
                        <ul className="space-y-3 text-sm">
                             <li className="flex items-start justify-center md:justify-start">
                                <span className="mt-1 ml-3 rtl:mr-3 rtl:ml-0 flex-shrink-0 text-brand-gold">📍</span>
                                <span>تهران، چهارراه جهان کودک، بلوار حقانی، نرسیده به گاندی شمالی، پلاک 67، طبقه همکف</span>
                            </li>
                             <li className="flex items-start justify-center md:justify-start">
                                <span className="mt-1 ml-3 rtl:mr-3 rtl:ml-0 flex-shrink-0 text-brand-gold">📞</span>
                                <div className="flex flex-col items-center md:items-start">
                                    <a href={`tel:02188195217`} className="hover:text-white transition-colors">021-88195217</a>
                                    <a href={`tel:09196625662`} className="hover:text-white transition-colors">09196625662</a>
                                </div>
                            </li>
                            <li className="flex items-start justify-center md:justify-start">
                                <span className="mt-1 ml-3 rtl:mr-3 rtl:ml-0 flex-shrink-0 text-brand-gold">⏰</span>
                                <span>شنبه تا چهارشنبه: ۸ تا ۱۵:۳۰ | پنجشنبه: ۸ تا ۱۳</span>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Column 3: Symbols */}
                    <div className="space-y-4 text-center md:text-right">
                        <h2 className="text-lg font-semibold text-white border-b-2 border-gray-700 pb-2 inline-block">نمادها</h2>
                         <div className="flex justify-center md:justify-start">
                            <a referrerPolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=210132&amp;Code=6NbFbmgVVrjxbSWcVYlfbhehXVQp7vHW">
                                <img referrerPolicy="origin" src="https://www.notary662th.ir/wp-content/uploads/2024/01/logo-enamad.png?id=210132&amp;Code=6NbFbmgVVrjxbSWcVYlfbhehXVQp7vHW" alt="enamad" style={{cursor:'pointer'}} className="w-24 h-auto" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black py-4 mt-8 border-t border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
                    <p>تمامی حقوق مطالب و اطلاعات برای دفتر اسناد رسمی 662 تهران محفوظ می‌باشد.</p>
                    <div className="mt-2 text-gray-500">
                        <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">{t('footer.poweredBy')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
