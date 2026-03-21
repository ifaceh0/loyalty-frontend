import React, { useState } from 'react';
import {
  BookOpen,
  TrendingUp,
  Share2,
  FileText,
  LayoutDashboard,
  Gift,
  X,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

// Refined animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 1.02, 0.73, 1] },
  },
};

const resources = [
  { key: 'howPointsWork', Icon: BookOpen, color: 'emerald' },
  { key: 'businessBenefits', Icon: TrendingUp, color: 'blue' },
  { key: 'referralGuide', Icon: Share2, color: 'indigo' },
  { key: 'redemptionRules', Icon: FileText, color: 'orange' },
  { key: 'dashboardFeatures', Icon: LayoutDashboard, color: 'rose' },
  { key: 'promotions', Icon: Gift, color: 'green' },
];

export default function Resources() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(null);

  const openModal = (resource) => setModalOpen(resource);
  const closeModal = () => setModalOpen(null);

  const getDetails = (key) => {
    const data = t(`resources.${key}`, { returnObjects: true });
    const result = [];
    ['steps', 'stats', 'tips', 'rules', 'features', 'promos'].forEach((type) => {
      const singularType = type.slice(0, -1);
      (data[type] || []).forEach((text) => result.push({ type: singularType, text }));
    });
    return result;
  };

  return (
    <>
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 tracking-tight">
              {t('resources.title')}
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {t('resources.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-3"
          >
            {resources.map((resource, idx) => {
              const Icon = resource.Icon;
              const key = `resources.${resource.key}`;

              return (
                <motion.button
                  key={idx}
                  variants={item}
                  onClick={() => openModal({ ...resource, details: getDetails(resource.key) })}
                  className="group relative text-left bg-white p-6 rounded-[0.5rem] ring-1 ring-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500"
                >
                  <div className="mb-8 p-4 w-fit rounded-xl bg-slate-50 group-hover:bg-emerald-50 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-slate-600 group-hover:text-emerald-600 transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">
                    {t(`${key}.title`)}
                  </h3>

                  <p className="text-slate-500 text-[0.95rem] leading-relaxed mb-8 line-clamp-2">
                    {t(`${key}.desc`)}
                  </p>

                  <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                    <span className="relative">
                      {t('resources.readMore')}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-200 transition-all group-hover:w-full" />
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-xl lg:max-w-2xl w-full bg-white rounded-[0.5rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-4 sm:p-8">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <modalOpen.Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                    {t(`resources.${modalOpen.key}.title`)}
                  </h2>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                  {modalOpen.details.map((item, i) => (
                    <div key={i} className={`p-3 rounded-xl transition-all ${
                      item.type === 'stat' ? 'bg-emerald-50/80 border border-emerald-100' : 
                      item.type === 'promo' ? 'bg-blue-50/80 border border-blue-100' :
                      'bg-slate-50 border border-slate-100'
                    }`}>
                      <div className="flex gap-4">
                        {item.type === 'step' && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
                        {item.type === 'rule' && <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0 mt-2" />}
                        <p className={`text-[0.95rem] ${
                          item.type === 'tip' ? 'italic text-slate-500' : 
                          item.type === 'stat' || item.type === 'promo' ? 'font-semibold text-slate-800' : 
                          'text-slate-700'
                        }`}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="w-auto px-10 py-2 bg-slate-900 text-white font-bold rounded-full hover:bg-emerald-600 transition-all duration-300 shadow-lg active:scale-95"
                  >
                    {t('resources.gotIt')}
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