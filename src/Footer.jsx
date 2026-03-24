// import React, { useState } from 'react';
// import { Mail, Send, Facebook, Instagram, Twitter, Linkedin, Heart, Sparkles, Check } from 'lucide-react';
// import { useTranslation } from 'react-i18next';

// export default function Footer() {
//   const { t } = useTranslation();
//   const [email, setEmail] = useState('');
//   const [subscribed, setSubscribed] = useState(false);

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (!email || !email.includes('@')) return;

//     setTimeout(() => {
//       setSubscribed(true);
//       setEmail('');
//       setTimeout(() => setSubscribed(false), 3000);
//     }, 500);
//   };

//   const currentYear = new Date().getFullYear();

//   const quickLinks = t('footer.quickLinks', { returnObjects: true });
//   const socials = [
//     { Icon: Facebook, label: 'Facebook' },
//     { Icon: Instagram, label: 'Instagram' },
//     { Icon: Twitter, label: 'TwitterTwitter' },
//     { Icon: Linkedin, label: 'LinkedIn' },
//   ];

//   return (
//     <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-6 pb-6 px-6">
//       <div className="max-w-8xl mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//           {/* Brand */}
//           <div className="space-y-3">
//             <h3 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
//               {t('footer.brandTitle')}
//             </h3>
//             <p className="text-sm text-gray-400 leading-relaxed max-w-md">
//               {t('footer.brandDesc')}
//             </p>
//             <div className="flex items-center gap-2 text-xs text-emerald-400">
//               <Heart className="w-4 h-4 fill-emerald-400" />
//               <span>{t('footer.brandTag')}</span>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold mb-4 text-emerald-400">
//               {t('footer.quickLinksTitle')}
//             </h3>
//             <ul className="space-y-1 text-sm text-gray-400">
//               {quickLinks.map((link) => (
//                 <li key={link.to}>
//                   <a
//                     href={link.to}
//                     className="inline-flex items-center gap-1 hover:text-emerald-400 transition group"
//                   >
//                     <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Stay Connected */}
//           <div>
//             <h3 className="text-lg font-bold mb-4 text-emerald-400">
//               {t('footer.stayConnectedTitle')}
//             </h3>
//             <div className="flex gap-3 mb-4">
//               {socials.map((social) => (
//                 <a
//                   key={social.label}
//                   href="#"
//                   aria-label={social.label}
//                   className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-emerald-500/20 hover:scale-110 transition-all duration-300 group"
//                 >
//                   <social.Icon className="w-5 h-5 text-gray-300 group-hover:text-emerald-400 transition" />
//                 </a>
//               ))}
//             </div>
//             <p className="text-xs text-gray-500">
//               {t('footer.stayConnectedDesc')}
//             </p>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="text-lg font-bold mb-4 text-emerald-400 flex items-center gap-2">
//               <Mail className="w-5 h-5" />
//               {t('footer.newsletterTitle')}
//             </h3>
//             <p className="text-sm text-gray-400 mb-3">
//               {t('footer.newsletterDesc')}
//             </p>

//             <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-col gap-2">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder={t('footer.newsletterPlaceholder')}
//                 className="flex-1 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full font-medium text-white shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
//               >
//                 {subscribed ? (
//                   <>
//                     <Sparkles className="w-4 h-4" />
//                     {t('footer.subscribedText')}
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-4 h-4" />
//                     {t('footer.subscribeButton')}
//                   </>
//                 )}
//               </button>
//             </form>

//             {subscribed && (
//               <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
//                 <Check className="w-3 h-3" />
//                 {t('footer.subscribedSuccess')}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-3">
//           <p>
//             {t('footer.copyright', { year: currentYear })}
//           </p>
//           <div className="flex gap-4">
//             <a href="/privacy" className="hover:text-emerald-400 transition">
//               {t('footer.privacy')}
//             </a>
//             <a href="/terms" className="hover:text-emerald-400 transition">
//               {t('footer.terms')}
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }





import React, { useState } from 'react';
import { Mail, Send, Facebook, Instagram, Twitter, Linkedin, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    { Icon: Facebook, url: "https://facebook.com" },
    { Icon: Instagram, url: "https://instagram.com" },
    { Icon: Twitter, url: "https://x.com" },
    { Icon: Linkedin, url: "https://linkedin.com" },
  ];

  return (
    // Updated Footer Section for Mobile Perfection
    <footer className="border-t border-blue-100/50 bg-white/40 backdrop-blur-md text-slate-500 pt-12 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Middle Section: Brand & Links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column: Full width on mobile, 1 column on desktop */}
          <div className="col-span-2 lg:col-span-1 space-y-5 flex flex-col items-center text-center lg:items-start lg:text-start">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                {t('footer.brandTitle')}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed max-w-[280px] text-slate-500/80">
              {t('footer.brandDesc')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, url }, i) => (
                <a 
                  key={i} 
                  href={url}
                  className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer: Only visible on Large screens to keep layout airy */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Quick Links: Half width on mobile */}
          <div className="col-span-1">
            <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-slate-900 mb-6">
              {t('footer.quickLinksTitle')}
            </h4>
            <ul className="space-y-4 lg:space-y-3">
              {Array.isArray(quickLinks) && quickLinks.slice(0, 4).map((link) => (
                <li key={link.to}>
                  <a href={link.to} className="text-[13px] hover:text-blue-600 transition-colors flex items-center gap-2 group">
                    <span className="hidden md:block w-1 h-1 rounded-full bg-blue-200 group-hover:bg-blue-600 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links: Half width on mobile */}
          <div className="col-span-1">
            <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-slate-900 mb-6">
              {t('footer.support')}
            </h4>
            <ul className="space-y-4 lg:space-y-3">
              {Array.isArray(quickLink) && quickLink.slice(0, 4).map((link) => (
                <li key={link.to}>
                  <a href={link.to} className="text-[13px] hover:text-blue-600 transition-colors flex items-center gap-2 group">
                    <span className="hidden md:block w-1 h-1 rounded-full bg-blue-200 group-hover:bg-blue-600 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Stacked on mobile, row on desktop */}
        <div className="pt-8 border-t border-blue-100/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] md:text-[12px] text-slate-400 text-center">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="flex gap-8 text-[11px] md:text-[12px] font-medium">
            <a href="/privacy" className="text-slate-400 hover:text-blue-600 transition-colors">{t('footer.privacy')}</a>
            <a href="/terms" className="text-slate-400 hover:text-blue-600 transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}