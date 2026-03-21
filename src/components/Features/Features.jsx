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
      <section className="py-24 px-6 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 tracking-tight">
              {t('features.title')}
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
              {t('features.subtitle')}
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-3"
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
                  className="group relative flex flex-col text-left p-6 bg-white rounded-[0.5rem] ring-1 ring-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500"
                >
                  {/* Soft Background Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-[0.03] rounded-bl-[5rem] group-hover:opacity-[0.07] transition-opacity`} />

                  <div className="mb-8 p-4 w-fit rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                    <Icon className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">
                    {t(`${key}.title`)}
                  </h3>

                  <p className="text-slate-500 text-[0.95rem] leading-relaxed mb-6 flex-grow font-light">
                    {t(`${key}.desc`)}
                  </p>

                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold">
                    <span className="border-b-2 border-transparent group-hover:border-emerald-200 transition-all">
                      {t('features.learnMore')}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* MODAL with AnimatePresence for smooth exit */}
      <AnimatePresence>
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative max-w-xl lg:max-w-2xl w-full bg-white rounded-[0.5rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-900 transition-all shadow-lg backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {modalOpen.image && (
                <div className="h-56 sm:h-72 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
                  <img
                    src={modalOpen.image}
                    alt={t(`features.${modalOpen.key}.title`)}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4 sm:p-8 -mt-10 relative z-20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-emerald-50">
                    <modalOpen.Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                    {t(`features.${modalOpen.key}.title`)}
                  </h2>
                </div>

                <p className="text-slate-600 leading-relaxed text-lg font-light mb-10">
                  {t(`features.${modalOpen.key}.details`)}
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-8 py-2 bg-slate-900 text-white font-semibold rounded-full hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 hover:shadow-emerald-200"
                  >
                    {t('features.gotIt')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}