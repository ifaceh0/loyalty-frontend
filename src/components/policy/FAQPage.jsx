import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="mb-4">
      <button
        onClick={onClick}
        className={`w-full text-left p-3 rounded-[1rem] transition-all duration-500 flex items-start justify-between gap-4 ${
          isOpen 
            ? "bg-white shadow-[0_30px_60px_-15px_rgba(99,102,241,0.15)] border-indigo-50" 
            : "bg-indigo-50/40 hover:bg-indigo-50 border-transparent"
        } border`}
      >
        <div className="flex gap-4">
          <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isOpen ? "bg-indigo-600 text-white" : "bg-indigo-200 text-indigo-600"}`}>
            <HelpCircle size={14} />
          </div>
          <span className={`text-lg md:text-xl font-semibold tracking-tight ${isOpen ? "text-indigo-950" : "text-indigo-800/80"}`}>
            {question}
          </span>
        </div>
        <div className={`mt-1 transition-transform duration-500 ${isOpen ? "rotate-180 text-indigo-600" : "text-indigo-300"}`}>
          <ChevronDown size={24} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-14 md:px-20 pb-8 pt-4">
              <p className="text-indigo-900/60 leading-relaxed text-base md:text-lg font-medium">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const navigate = useNavigate();

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div 
            variants={itemVars}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white shadow-sm border border-indigo-50 text-[11px] font-bold uppercase tracking-widest text-indigo-500 mb-6"
          >
            <Sparkles size={12} />
            {t('home.faq.title')}
          </motion.div>
          <motion.h2 
            variants={itemVars}
            className="text-4xl md:text-6xl font-bold text-indigo-950 tracking-tighter"
          >
            {t('home.faq.common')} <span className="text-indigo-400 font-light italic">{t('home.faq.question')}</span>
          </motion.h2>
        </div>

        {/* FAQ List */}
        <motion.div variants={itemVars} className="space-y-4">
          {t('home.faq.items', { returnObjects: true }).map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* Minimal Footer Footer */}
        <motion.div 
            variants={itemVars}
            className="mt-20 text-center p-10 rounded-[1rem] bg-indigo-900 text-white shadow-2xl shadow-indigo-200/50 relative overflow-hidden group"
        >
            {/* Subtle decorative glow for "Soft Modern" feel */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-3 tracking-tight">
                {t('home.faq.curious')}
            </h3>
            <p className="text-indigo-200 mb-8 max-w-md mx-auto font-medium leading-relaxed">
                {t('home.faq.help')}
            </p>
            
            <button 
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-10 py-2.5 bg-white text-indigo-900 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-indigo-50 hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
                <MessageCircle size={18} />
                {t('home.faq.support')}
            </button>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FAQPage;