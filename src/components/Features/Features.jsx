// 'use client';

// import React, { useState } from 'react';
// import {
//   Target,
//   Smartphone,
//   Users,
//   BarChart3,
//   Gift,
//   Bell,
//   X,
// } from 'lucide-react';

// const features = [
//   {
//     Icon: Target,
//     title: 'Targeted Rewards',
//     description:
//       'Reward customers based on their purchase behavior to increase loyalty and repeat visits.',
//     gradient: 'from-emerald-400 to-teal-600',
//     details:
//       'Our AI‑driven engine analyses every transaction and automatically suggests the best reward for each shopper. You can set rules like “spend $50 → 10 pts” or “buy 3 coffees → free drink”.',
//     image:
//       'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
//   },
//   {
//     Icon: Smartphone,
//     title: 'Mobile‑First Experience',
//     description:
//       'Seamless access on any device for users and shopkeepers to track points and redeem rewards.',
//     gradient: 'from-cyan-400 to-blue-600',
//     details:
//       'Both the customer app and the shopkeeper dashboard are PWA‑ready. Customers scan a QR code to instantly see their points, redeem offers, and receive push notifications.',
//     image:
//       'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
//   },
//   {
//     Icon: Users,
//     title: 'Referral Boost',
//     description:
//       'Grow your customer base with rewards for referrals. Top referrers shine on the leaderboard!',
//     gradient: 'from-indigo-400 to-purple-600',
//     details:
//       'Every successful referral earns the referrer 50 pts + a bonus for the new user. The live leaderboard updates in real‑time, motivating friendly competition.',
//     image:
//       'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
//   },
//   {
//     Icon: BarChart3,
//     title: 'Smart Analytics',
//     description:
//       'Real‑time insights into sales, engagement, and loyalty performance to drive growth.',
//     gradient: 'from-amber-400 to-orange-600',
//     details:
//       'Interactive charts show redemption rates, average basket size per tier, and ROI of each campaign. Export CSV with one click.',
//     image:
//       'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
//   },
//   {
//     Icon: Gift,
//     title: 'Tiered Rewards',
//     description:
//       'Create VIP milestones and exclusive bonuses for your most loyal customers.',
//     gradient: 'from-pink-400 to-rose-600',
//     details:
//       'Define Bronze → Silver → Gold tiers. Unlock exclusive coupons, early‑access sales, and birthday gifts automatically when a user hits the threshold.',
//     image:
//       'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
//   },
//   {
//     Icon: Bell,
//     title: 'Smart Alerts',
//     description:
//       'Keep users engaged with instant updates on points, rewards, and promotions.',
//     gradient: 'from-lime-400 to-green-600',
//     details:
//       'Push, SMS, or in‑app notifications are triggered by events: “You earned 20 pts!”, “Your free coffee is ready”, “Flash sale – 2× points today”.',
//     image:
//       'https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
//   },
// ];

// export default function Features() {
//   const [modalOpen, setModalOpen] = useState(null); // holds the whole feature object

//   const openModal = (feature) => setModalOpen(feature);
//   const closeModal = () => setModalOpen(null);

//   return (
//     <>
//       <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
//               Powerful Features That Drive Loyalty
//             </h1>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               Everything you need to build stronger customer relationships and
//               grow your business.
//             </p>
//           </div>

//           {/* Feature Grid */}
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {features.map((feature, idx) => {
//               const Icon = feature.Icon;
//               return (
//                 <button
//                   key={idx}
//                   onClick={() => openModal(feature)}
//                   className="group relative bg-white rounded-md p-1 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden text-left"
//                 >
//                   {/* Gradient overlay on hover */}
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
//                   />

//                   <div className="relative bg-white rounded-md p-6 h-full border border-gray-100">
//                     {/* Icon */}
//                     <div className="mb-5 w-14 h-14 rounded-md bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
//                       <Icon className="w-7 h-7 text-emerald-600" />
//                     </div>

//                     {/* Title */}
//                     <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
//                       {feature.title}
//                     </h3>

//                     {/* Short description */}
//                     <p className="text-gray-600 leading-relaxed">
//                       {feature.description}
//                     </p>

//                     {/* Hover “Learn more” */}
//                     <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <span className="text-emerald-600 text-sm font-medium">
//                         Learn more
//                       </span>
//                     </div>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ---------- MODAL ---------- */}
//       {modalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
//           onClick={closeModal}
//         >
//           <div
//             className="relative max-w-2xl w-full bg-white rounded-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close button */}
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
//             >
//               <X className="w-5 h-5 text-gray-600" />
//             </button>

//             {/* Image (if any) */}
//             {modalOpen.image && (
//               <div className="h-56 overflow-hidden">
//                 <img
//                   src={modalOpen.image}
//                   alt={modalOpen.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             )}

//             <div className="p-6 lg:p-8">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 rounded-md bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//                   <modalOpen.Icon className="w-7 h-7 text-emerald-600" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {modalOpen.title}
//                 </h2>
//               </div>

//               <p className="text-gray-600 leading-relaxed">
//                 {modalOpen.details}
//               </p>

//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={closeModal}
//                   className="px-5 py-2 bg-emerald-600 text-white rounded-sm hover:bg-emerald-700 transition"
//                 >
//                   Got it
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }













// //translate
'use client';
import React, { useState } from 'react';
import {
  Target,
  Smartphone,
  Users,
  BarChart3,
  Gift,
  Bell,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const features = [
  {
    key: 'targetedRewards',
    Icon: Target,
    gradient: 'from-emerald-400 to-teal-600',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    key: 'mobileFirst',
    Icon: Smartphone,
    gradient: 'from-cyan-400 to-blue-600',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    key: 'referralBoost',
    Icon: Users,
    gradient: 'from-indigo-400 to-purple-600',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    key: 'smartAnalytics',
    Icon: BarChart3,
    gradient: 'from-amber-400 to-orange-600',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    key: 'tieredRewards',
    Icon: Gift,
    gradient: 'from-pink-400 to-rose-600',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    key: 'smartAlerts',
    Icon: Bell,
    gradient: 'from-lime-400 to-green-600',
    image: 'https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
];

export default function Features() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(null);

  const openModal = (feature) => setModalOpen(feature);
  const closeModal = () => setModalOpen(null);

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-600 mb-4 md:mb-5">
              {t('features.title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, idx) => {
              const Icon = feature.Icon;
              const key = `features.${feature.key}`;

              return (
                <motion.button
                  key={idx}
                  variants={item}
                  whileHover={{ scale: 1.03, y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openModal(feature)}
                  className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden text-left border border-gray-100/80"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="relative p-5 sm:p-6 md:p-7 h-full">
                    <div className="mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-emerald-700 transition-colors">
                      {t(`${key}.title`)}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {t(`${key}.desc`)}
                    </p>

                    <div className="mt-4 sm:mt-5 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-emerald-600 text-sm sm:text-base font-medium">
                        {t('features.learnMore')}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-lg sm:max-w-2xl md:max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-gray-100 text-gray-700 transition shadow-sm"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {modalOpen.image && (
              <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={modalOpen.image}
                  alt={t(`features.${modalOpen.key}.title`)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 sm:p-8 md:p-10">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-sm">
                  <modalOpen.Icon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                  {t(`features.${modalOpen.key}.title`)}
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                {t(`features.${modalOpen.key}.details`)}
              </p>

              <div className="mt-6 sm:mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  {t('features.gotIt')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}