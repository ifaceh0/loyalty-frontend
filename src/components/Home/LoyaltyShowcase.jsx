import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Coffee, UserPlus, Cake, Crown, ShoppingBag,
  ArrowRight, ChevronRight, X, CheckCircle2 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LoyaltyShowcase() {
  const { t } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const scrollRef = useRef(null);

  const LOYALTY_DEMOS = [
    {
      id: 1,
      key: "welcome",
      icon: <Zap className="text-amber-500" />,
      bgColor: "bg-amber-50",
    },
    {
      id: 2,
      key: "daily",
      icon: <Coffee className="text-orange-600" />,
      bgColor: "bg-orange-50",
    },
    {
      id: 3,
      key: "refer",
      icon: <UserPlus className="text-blue-600" />,
      bgColor: "bg-blue-50",
    },
    {
      id: 4,
      key: "birthday",
      icon: <Cake className="text-pink-500" />,
      bgColor: "bg-pink-50",
    },
    {
      id: 5,
      key: "vip",
      icon: <Crown className="text-yellow-600" />,
      bgColor: "bg-yellow-50",
    },
    {
      id: 6,
      key: "flash",
      icon: <ShoppingBag className="text-emerald-600" />,
      bgColor: "bg-emerald-50",
    }
  ];

  return (
    <section className="py-10 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              {t("home.rewardLibrary.title")}
            </h2>
            <p className="text-slate-500 mt-4 text-sm max-w-lg">
              {t("home.rewardLibrary.subtitle")}
            </p>
          </div>

          <div className="hidden md:flex gap-2 text-slate-400 text-xs font-bold items-center">
            <span>{t("home.rewardLibrary.scrollHint")}</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Horizontal Scroll Cards */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory"
        >
          {LOYALTY_DEMOS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="min-w-[300px] md:min-w-[350px] snap-start bg-white border border-slate-100 p-4 rounded-[1rem] shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>

                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    {t(`home.loyalty.${item.key}.title`)}
                  </h3>
                  <span className="text-[10px] font-black px-2 py-1 bg-slate-900 text-white rounded-full">
                    {t(`home.loyalty.${item.key}.points`)}
                  </span>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {t(`home.loyalty.${item.key}.desc`)}
                </p>
              </div>

              <button 
                onClick={() => setSelectedTemplate(item)}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 group"
              >
                {t("home.rewardLibrary.preview")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Drawer */}
      <AnimatePresence>
        {selectedTemplate && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTemplate(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl p-6 overflow-y-auto"
            >
              {/* Close */}
              <button 
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mt-10">
                {/* Icon */}
                <div className={`w-12 h-12 ${selectedTemplate.bgColor} rounded-full flex items-center justify-center mb-6`}>
                  {selectedTemplate.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {t(`home.loyalty.${selectedTemplate.key}.title`)}
                </h3>

                <p className="text-slate-500 mb-8">
                  {t("home.modal.howItWorks")}
                </p>

                {/* Customer View */}
                <div className="bg-slate-50 rounded-[1rem] border-4 border-white shadow-inner p-4 mb-6">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-4">
                    {t("home.modal.customerView")}
                  </p>

                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs italic">
                        LH
                      </div>
                      <div>
                        <p className="text-xs font-bold">LoyaltyHub Demo Shop</p>
                        <p className="text-[10px] text-slate-400">
                          {t("modal.scanSuccess")}
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-black text-blue-600">
                        {t(`home.loyalty.${selectedTemplate.key}.points`)}
                      </p>
                      <p className="text-[10px] font-bold text-blue-400 uppercase">
                        {t("home.modal.pointsAdded")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-10">
                  <li className="flex gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span>{t("home.modal.features.sms")}</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span>{t("home.modal.features.analytics")}</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span>{t("home.modal.features.fraud")}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hide Scrollbar */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
}