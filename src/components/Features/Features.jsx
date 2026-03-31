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
import { motion, AnimatePresence } from 'framer-motion';

// Refined Animation Variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const features = [
  {
    key: 'targetedRewards',
    Icon: Target,
    gradient: 'from-emerald-500 to-teal-600',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    key: 'mobileFirst',
    Icon: Smartphone,
    gradient: 'from-blue-500 to-cyan-600',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    key: 'referralBoost',
    Icon: Users,
    gradient: 'from-indigo-500 to-purple-600',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    key: 'smartAnalytics',
    Icon: BarChart3,
    gradient: 'from-orange-500 to-amber-600',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    key: 'tieredRewards',
    Icon: Gift,
    gradient: 'from-rose-500 to-pink-600',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    key: 'smartAlerts',
    Icon: Bell,
    gradient: 'from-lime-500 to-emerald-600',
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
      <section className="py-16 md:py-24 px-4 md:px-6">
        {/* max-w-5xl makes the grid look much more premium on laptop screens */}
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              {t('features.title')}
            </h2>
            <p className="text-sm md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed font-light">
              {t('features.subtitle')}
            </p>
          </motion.div>

          {/* Features Grid: Stacked on mobile, 3 columns on desktop */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, idx) => {
              const Icon = feature.Icon;
              const key = `features.${feature.key}`;

              return (
                <motion.button
                  key={idx}
                  variants={item}
                  whileHover={{ y: -5 }}
                  onClick={() => openModal(feature)}
                  className="group relative flex flex-col text-left p-5 md:p-7 bg-white/70 backdrop-blur-sm rounded-xl md:rounded-[1rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
                >
                  {/* Soft Background Accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-[0.03] rounded-bl-[3rem] group-hover:opacity-[0.07] transition-opacity`} />

                  <div className="mb-6 p-3 w-fit rounded-lg bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
                    {t(`${key}.title`)}
                  </h3>

                  <p className="text-slate-500 text-[13px] md:text-sm leading-relaxed mb-6 flex-grow font-medium">
                    {t(`${key}.desc`)}
                  </p>

                  <div className="flex items-center gap-2 text-blue-600 text-[12px] md:text-sm font-bold">
                    <span className="relative overflow-hidden">
                      {t('features.learnMore')}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* MODAL with improved mobile sizing */}
      <AnimatePresence>
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-lg w-full bg-white rounded-t-[1rem] sm:rounded-[1rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button: Optimized for thumb reach on mobile */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {modalOpen.image && (
                <div className="h-48 sm:h-64 overflow-hidden relative">
                  <img
                    src={modalOpen.image}
                    alt="Feature detail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
                </div>
              )}

              <div className="p-6 sm:p-8 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <modalOpen.Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {t(`features.${modalOpen.key}.title`)}
                  </h2>
                </div>

                <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-8">
                  {t(`features.${modalOpen.key}.details`)}
                </p>

                <button
                  onClick={closeModal}
                  className="w-full sm:w-auto px-8 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  {t('features.gotIt')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}