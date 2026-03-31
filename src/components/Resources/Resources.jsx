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
    const data = t(`resources.${key}`, { returnObjects: true }) || {};
    const result = [];
    ['steps', 'stats', 'tips', 'rules', 'features', 'promos'].forEach((type) => {
      const singularType = type.slice(0, -1);
      (data[type] || []).forEach((text) => result.push({ type: singularType, text }));
    });
    return result;
  };

  return (
    <>
      <section className="py-16 md:py-24 px-4 md:px-6">
        {/* max-w-5xl keeps the resource cards looking elegant and professional on laptops */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              {t('resources.title')}
            </h2>
            <p className="text-sm md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed font-light">
              {t('resources.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {resources.map((resource, idx) => {
              const Icon = resource.Icon;
              const key = `resources.${resource.key}`;

              return (
                <motion.button
                  key={idx}
                  variants={item}
                  whileHover={{ y: -5 }}
                  onClick={() => openModal({ ...resource, details: getDetails(resource.key) })}
                  className="group relative flex flex-col text-left p-6 md:p-8 bg-white/70 backdrop-blur-sm rounded-xl md:rounded-[1rem] border border-blue-50 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
                >
                  <div className="mb-6 p-3 w-fit rounded-lg bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {t(`${key}.title`)}
                  </h3>

                  <p className="text-slate-500 text-[13px] md:text-sm leading-relaxed mb-6 flex-grow font-medium line-clamp-2">
                    {t(`${key}.desc`)}
                  </p>

                  <div className="flex items-center gap-2 text-blue-600 font-bold text-[12px] md:text-sm">
                    <span className="relative overflow-hidden">
                      {t('resources.readMore')}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* REFINED MODAL: Mobile Bottom Sheet / Laptop Center Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={closeModal}>
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
              className="relative max-w-xl w-full bg-white rounded-t-[1rem] sm:rounded-[1rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Refined Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <modalOpen.Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                    {t(`resources.${modalOpen.key}.title`)}
                  </h2>
                </div>

                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  {modalOpen.details.map((item, i) => (
                    <div key={i} className={`p-4 rounded-xl border transition-all ${
                      item.type === 'stat' ? 'bg-blue-50/50 border-blue-100' : 
                      item.type === 'promo' ? 'bg-emerald-50/50 border-emerald-100' :
                      'bg-slate-50/50 border-slate-100'
                    }`}>
                      <div className="flex gap-4">
                        {item.type === 'step' && <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />}
                        <p className={`text-[13px] md:text-sm leading-relaxed ${
                          item.type === 'tip' ? 'italic text-slate-500' : 
                          item.type === 'stat' ? 'font-bold text-blue-700' : 
                          'text-slate-700 font-medium'
                        }`}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button
                    onClick={closeModal}
                    className="w-full sm:w-auto px-10 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
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