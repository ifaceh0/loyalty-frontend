// import React, { useState } from 'react';
// import { Mail, Send, Facebook, Instagram, Twitter, Linkedin, Heart, Sparkles } from 'lucide-react';

// export default function Footer() {
//   const [email, setEmail] = useState('');
//   const [subscribed, setSubscribed] = useState(false);

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (!email || !email.includes('@')) return;

//     // Simulate API call
//     setTimeout(() => {
//       setSubscribed(true);
//       setEmail('');
//       setTimeout(() => setSubscribed(false), 3000);
//     }, 500);
//   };

//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-16 pb-8 px-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
//           {/* Brand */}
//           <div className="space-y-4">
//             <h3 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
//               LoyaltyHub
//             </h3>
//             <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
//               Earn points on every purchase. Redeem rewards, refer friends, and grow with the smartest loyalty program in the U.S.
//             </p>
//             <div className="flex items-center gap-2 text-xs text-emerald-400">
//               <Heart className="w-4 h-4 fill-emerald-400" />
//               <span>Built for shoppers, by shoppers</span>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold mb-4 text-emerald-400">Quick Links</h3>
//             <ul className="space-y-2 text-sm text-gray-400">
//               {[
//                 { label: 'Home', to: '/' },
//                 { label: 'Join Now', to: '/signup-user' },
//                 { label: 'How It Works', to: '#' },
//                 { label: 'FAQ', to: '#' },
//                 { label: 'Contact', to: '/contact' },
//               ].map((link) => (
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
//             <h3 className="text-lg font-bold mb-4 text-emerald-400">Stay Connected</h3>
//             <div className="flex gap-3 mb-4">
//               {[
//                 { Icon: Facebook, label: 'Facebook' },
//                 { Icon: Instagram, label: 'Instagram' },
//                 { Icon: Twitter, label: 'Twitter' },
//                 { Icon: Linkedin, label: 'LinkedIn' },
//               ].map((social) => (
//                 <a
//                   key={social.label}
//                   href="#"
//                   aria-label={social.label}
//                   className="w-10 h-10 rounded-sm bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-emerald-500/20 hover:scale-110 transition-all duration-300 group"
//                 >
//                   <social.Icon className="w-5 h-5 text-gray-300 group-hover:text-emerald-400 transition" />
//                 </a>
//               ))}
//             </div>
//             <p className="text-xs text-gray-500">
//               Follow us for exclusive deals and updates
//             </p>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="text-lg font-bold mb-4 text-emerald-400 flex items-center gap-2">
//               <Mail className="w-5 h-5" />
//               Newsletter
//             </h3>
//             <p className="text-sm text-gray-400 mb-3">
//               Get exclusive rewards, early access, and bonus points in your inbox.
//             </p>

//             <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 className="flex-1 px-4 py-2.5 rounded-sm bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-sm font-medium text-white shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
//               >
//                 {subscribed ? (
//                   <>
//                     <Sparkles className="w-4 h-4" />
//                     Sent!
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-4 h-4" />
//                     Subscribe
//                   </>
//                 )}
//               </button>
//             </form>

//             {subscribed && (
//               <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
//                 <Check className="w-3 h-3" />
//                 You're in! Check your email.
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-3">
//           <p>© {currentYear} LoyaltyHub. All rights reserved.</p>
//           <div className="flex gap-4">
//             <a href="/privacy" className="hover:text-emerald-400 transition">Privacy Policy</a>
//             <a href="/terms" className="hover:text-emerald-400 transition">Terms of Service</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }










//translate
'use client';

import React, { useState } from 'react';
import { Mail, Send, Facebook, Instagram, Twitter, Linkedin, Heart, Sparkles, Check } from 'lucide-react';
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

  const quickLinks = t('footer.quickLinks', { returnObjects: true });
  const socials = [
    { Icon: Facebook, label: 'Facebook' },
    { Icon: Instagram, label: 'Instagram' },
    { Icon: Twitter, label: 'TwitterTwitter' },
    { Icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              {t('footer.brandTitle')}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t('footer.brandDesc')}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Heart className="w-4 h-4 fill-emerald-400" />
              <span>{t('footer.brandTag')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-emerald-400">
              {t('footer.quickLinksTitle')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    className="inline-flex items-center gap-1 hover:text-emerald-400 transition group"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-emerald-400">
              {t('footer.stayConnectedTitle')}
            </h3>
            <div className="flex gap-3 mb-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-emerald-500/20 hover:scale-110 transition-all duration-300 group"
                >
                  <social.Icon className="w-5 h-5 text-gray-300 group-hover:text-emerald-400 transition" />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              {t('footer.stayConnectedDesc')}
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-emerald-400 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              {t('footer.newsletterTitle')}
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              {t('footer.newsletterDesc')}
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.newsletterPlaceholder')}
                className="flex-1 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full font-medium text-white shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {subscribed ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {t('footer.subscribedText')}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t('footer.subscribeButton')}
                  </>
                )}
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                <Check className="w-3 h-3" />
                {t('footer.subscribedSuccess')}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-3">
          <p>
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-emerald-400 transition">
              {t('footer.privacy')}
            </a>
            <a href="/terms" className="hover:text-emerald-400 transition">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}