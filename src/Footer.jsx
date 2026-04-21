import React, { useState } from 'react';
import { Mail, Send, Facebook, Instagram, Twitter, Linkedin, Check, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setTimeout(() => {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }, 500);
  };

  const currentYear = new Date().getFullYear();
  const quickLinks = t('footer.quickLinks', { returnObjects: true }) || [];
  const quickLink = t('footer.quickLink', { returnObjects: true }) || [];

  const socialLinks = [
    { Icon: Facebook, url: "https://facebook.com", color: "hover:bg-blue-600" },
    { Icon: Instagram, url: "https://instagram.com", color: "hover:bg-pink-600" },
    { Icon: Twitter, url: "https://x.com", color: "hover:bg-sky-500" },
    { Icon: Linkedin, url: "https://linkedin.com", color: "hover:bg-blue-700" },
  ];

  return (
    <footer className="relative border-t border-slate-200 bg-white pt-10 pb-10 overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-10">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-2.5 group cursor-pointer">
                {/* Abstract Icon */}
                <div className="w-9 h-9 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-slate-900 transition-all duration-300">
                  <span className="text-lg font-black text-slate-900 group-hover:text-white transition-colors duration-300">
                    LH
                  </span>
                </div>

                {/* Typography: All caps for a "brand" feel */}
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-extrabold text-slate-900 tracking-widest uppercase">
                    Loyalty
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">
                    Hub Platform
                  </span>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed text-slate-500 w-full max-auto sm:max-w-sm">
                {t('footer.brandDesc')}
              </p>
            </div>

            {/* Newsletter Input - Modern SaaS Style */}
            <div className="w-full max-auto sm:max-w-sm">
              <form onSubmit={handleSubscribe} className="relative group">
                <div className={`relative flex items-center p-1.5 rounded-lg border transition-all duration-300 ${subscribed ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 bg-slate-50/50 group-focus-within:border-indigo-500 group-focus-within:bg-white group-focus-within:shadow-xl group-focus-within:shadow-indigo-100'}`}>
                  <div className="pl-3 text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.newsletterPlaceholder') || "Enter your email"}
                    className="flex-1 bg-transparent border-none outline-none px-3 text-sm text-slate-900 placeholder:text-slate-400"
                    disabled={subscribed}
                  />
                  <button 
                    type="submit"
                    disabled={subscribed}
                    className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 
                      ${subscribed 
                        ? 'text-emerald-500'
                        : 'text-indigo-600 hover:text-indigo-700 hover:bg-slate-50 active:scale-95'
                      }`}
                  >
                    {subscribed ? <Check size={20} /> : <Send size={20} />}
                  </button>
                </div>
                <AnimatePresence>
                  {subscribed && (
                    <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-6 left-2 text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                      Thanks for joining!
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 md:pl-8">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 mb-8">
              {t('footer.quickLinksTitle')}
            </h4>
            <ul className="space-y-4">
              {Array.isArray(quickLinks) && quickLinks.slice(0, 5).map((link) => (
                <li key={link.to}>
                  <a href={link.to} className="group flex items-center text-[14px] font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 mb-8">
              {t('footer.support')}
            </h4>
            <ul className="space-y-4">
              {Array.isArray(quickLink) && quickLink.slice(0, 5).map((link) => (
                <li key={link.to}>
                  <a href={link.to} className="group flex items-center text-[14px] font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons Column */}
          <div className="lg:col-span-3 lg:text-right flex flex-col items-start lg:items-end">
             <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 mb-8">
              {t('footer.connect')}
            </h4>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, url, color }, i) => (
                <motion.a 
                  whileHover={{ y: -4 }}
                  key={i} 
                  href={url}
                  className={`w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-300 ${color} hover:text-white hover:border-transparent hover:shadow-xl`}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
            <p className="text-[13px] font-medium text-slate-400">
              {t('footer.copyright', { year: currentYear })}
            </p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-200" />
            <div className="flex gap-6 text-[13px] font-bold">
              <a href="/privacy" className="text-slate-400 hover:text-indigo-600 transition-colors">{t('footer.privacy')}</a>
              <a href="/terms" className="text-slate-400 hover:text-indigo-600 transition-colors">{t('footer.terms')}</a>
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}