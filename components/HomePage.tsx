import React from 'react';
import { useLanguage, PageKey } from '../types';

interface HomePageProps {
    setPage: (page: 'home' | PageKey) => void;
    onOpenAIGuide: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage, onOpenAIGuide }) => {
  const { t } = useLanguage();
  
  const services = [
      { key: 'legal_drafter', icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>, title: "دستیار هوشمند حقوقی", description: 'تنظیم انواع اسناد با هوش مصنوعی' },
      { key: 'lawyer_finder', icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>, title: "جستجوی وکیل", description: 'یافتن وکیل متخصص در سراسر کشور' },
      { key: 'case_strategist', icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.5-10.5h-7a.5.5 0 00-.5.5v12a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-12a.5.5 0 00-.5-.5z" /></svg>, title: "برنامه‌ریز پروژه", description: 'ایجاد نقشه راه برای اهداف شما' },
      { key: 'notary_finder', icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5c0 7.142-7.5 11.25-7.5 11.25S6 17.642 6 10.5a7.5 7.5 0 1115 0z" /></svg>, title: "جستجوی محضر", description: 'یافتن دفاتر اسناد رسمی نزدیک شما' },
      { key: 'news_summarizer', icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>, title: "خلاصه اخبار", description: 'آخرین تحولات و اخبار حقوقی' },
      { key: 'web_analyzer', icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 13.5c-2.998 0-5.74-1.1-7.843-2.918" /></svg>, title: "تحلیلگر وب", description: 'خلاصه‌سازی و تحلیل محتوای صفحات وب' },
      { key: 'document_analyzer', icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "تحلیلگر سند", description: 'بازبینی و رفع ایرادات اسناد حقوقی' },
      { key: 'legal_training', icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, title: "آموزش حقوقی", description: 'یادگیری مباحث حقوقی با هوش مصنوعی' },
  ];

  const whyAIFeatures = t('home.whyAIFeatures');
  const guides = t('home.guides');

  return (
    <div className="animate-fade-in bg-brand-blue">
      {/* Hero Section */}
       <section className="relative text-white text-center py-20 sm:py-32 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue-dark opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue to-transparent"></div>
        <div className="relative z-10 p-4 space-y-6 flex flex-col items-center max-w-4xl mx-auto">
            <img src="https://www.notary662th.ir/wp-content/uploads/2020/09/LFZ-logo-wh-e1697648108285.png" alt="دفتر اسناد رسمی ۶۶۲ تهران" className="h-24 sm:h-32 w-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-shadow-lg">
                دستیار هوشمند حقوقی دفتر ۶۶۲ تهران
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
                ابزار نسل جدید شما برای تنظیم پیش‌نویس اسناد، تحقیقات حقوقی و برنامه‌ریزی استراتژیک، با قدرت هوش مصنوعی.
            </p>
            <div className="pt-4">
                <button 
                  onClick={onOpenAIGuide}
                  className="inline-block px-8 py-4 bg-brand-gold text-brand-blue-dark font-bold rounded-lg hover:bg-brand-yellow transition-all text-lg shadow-xl transform hover:scale-105 cta-pulse"
                >
                  {t('aiGuide.button')}
                </button>
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 bg-brand-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold">{t('home.servicesTitle')}</h2>
                <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">از قدرت هوش مصنوعی برای تسریع و تسهیل امور حقوقی خود بهره ببرید.</p>
                <div className="mt-4 w-24 h-1 bg-brand-gold mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service) => (
                    <div 
                        key={service.key} 
                        className="flex flex-col text-center p-8 space-y-4 bg-brand-blue-light rounded-2xl border border-white/10 hover:border-brand-gold/50 hover:shadow-2xl hover:shadow-black/50 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                        onClick={() => setPage(service.key as PageKey)}
                    >
                       <div className="w-16 h-16 bg-brand-blue rounded-full mx-auto flex items-center justify-center border-2 border-white/10 group-hover:border-brand-gold transition-colors duration-300">
                           <service.icon className="h-8 w-8 text-brand-gold transition-colors duration-300" />
                       </div>
                        <div className="flex-grow">
                           <h4 className="text-xl font-bold text-white">{service.title}</h4>
                           <p className="mt-2 text-gray-400">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Why Use AI Section */}
      <section className="py-16 sm:py-24 bg-brand-blue-dark text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold">{t('home.whyAITitle')}</h2>
                  <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">{t('home.whyAISubtitle')}</p>
                  <div className="mt-4 w-24 h-1 bg-brand-gold mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {whyAIFeatures.map((feature: { title: string, description: string }, index: number) => (
                      <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
                          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-brand-blue-light rounded-lg border border-brand-gold/50">
                              <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <div>
                              <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                              <p className="mt-1 text-gray-400">{feature.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 sm:py-24 bg-brand-blue text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold">{t('home.guidesTitle')}</h2>
                  <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">{t('home.guidesSubtitle')}</p>
                  <div className="mt-4 w-24 h-1 bg-brand-gold mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {guides.map((guide: { title: string, description: string, link: PageKey }, index: number) => (
                      <div key={index} onClick={() => setPage(guide.link)} className="bg-brand-blue-light p-6 rounded-lg border border-white/10 hover:border-brand-gold cursor-pointer group transition-all duration-300">
                          <h4 className="text-xl font-bold text-brand-gold group-hover:text-brand-yellow">{guide.title}</h4>
                          <p className="mt-2 text-gray-400">{guide.description}</p>
                          <span className="mt-4 inline-block text-sm font-semibold text-brand-gold group-hover:text-white">
                              شروع کنید &rarr;
                          </span>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      
       {/* About Us Section */}
      <section id="about" className="py-16 sm:py-24 bg-brand-blue-light text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="text-center md:text-right">
                      <h2 className="text-3xl sm:text-4xl font-bold">{t('home.aboutTitle')}</h2>
                      <div className="mt-4 w-24 h-1 bg-brand-gold md:mr-0 mx-auto rounded-full"></div>
                      <p className="mt-6 text-lg text-gray-300 leading-relaxed">{t('home.aboutText')}</p>
                      <a 
                        href="#footer"
                        className="mt-8 inline-block px-6 py-3 border border-brand-gold text-brand-gold font-semibold rounded-lg hover:bg-brand-gold hover:text-brand-blue-dark transition-colors"
                      >
                        {t('hero.button2')}
                      </a>
                  </div>
                  <div className="flex justify-center items-center p-8">
                       <img src="https://www.notary662th.ir/wp-content/uploads/2020/09/LFZ-lOGO-e1697647803710.png" alt="Logo" className="max-w-xs w-full h-auto rounded-full shadow-2xl shadow-black/50" />
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default HomePage;