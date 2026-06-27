import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import LoyaltyShowcase from './LoyaltyShowcase';


import {
  Globe,
  ChevronRight,
  Users,
  Store,
  DollarSign,
  Gift,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  Heart,
  Coffee,
  ShoppingBag,
  Utensils,
  Car,
  Gamepad2,
  Smartphone,
  Bell,
  TrendingUp,
  Award,
  UserPlus,
  Calendar,
  MapPin,
  Banknote,
} from 'lucide-react';
import { API_BASE_URL } from '../../apiConfig';

import carousel1 from '../../assets/carousel1.jpg';
import carousel2 from '../../assets/carousel2.jpg';
import carousel3 from '../../assets/carousel3.jpg';
import carousel4 from '../../assets/carousel4.jpg';
import carousel5 from '../../assets/carousel5.jpg';

const heroImages = [carousel1, carousel2, carousel3, carousel4, carousel5];

// Animation variants (unchanged)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
};

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalShops: 0,
    totalUsaTransactionAmount: 0,
    totalIndiaTransactionAmount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/loyalty_homePage/summary`);
        const data = await res.json();
        setStats({
          totalUsers: data.totalUsers || 0,
          totalShops: data.totalShops || 0,
          totalUsa: data.totalUsaTransactionAmount || 0,
          totalInd: data.totalIndiaTransactionAmount || 0,
        });
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchSummary();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex(prev => (prev + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroImages.length);

  return (
    <div className="bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-700">

      <section className="pt-10 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Copy Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 p-8 md:p-16 rounded-[1.5rem] bg-slate-100 border border-slate-100 flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-100/50 blur-[100px] rounded-full" />
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest mb-6">
                {t("home.hero.badge")}
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1] mb-8 text-slate-900">
                {t("home.hero.titleLine1")} <br/> 
                <span className="text-blue-600">{t("home.hero.titleHighlight")}</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl max-w-md mb-10 leading-relaxed font-medium">
                {t("home.hero.description")}
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => navigate('/signup-user')} className="px-10 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 group">
                  {t("home.hero.cta")} <ArrowRight size={18} className="group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Carousel Block */}
          <div className="lg:col-span-5 h-[400px] lg:h-auto rounded-[1.5rem] overflow-hidden border border-slate-100 relative shadow-2xl shadow-slate-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={heroImages[currentIndex]}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-8 left-8 flex gap-2">
              {heroImages.map((_, i) => (
                <button 
                  key={i} onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${currentIndex === i ? 'w-10 bg-white' : 'w-2 bg-white/40'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOFT STATS GRID */}
      <section className="pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="p-10 rounded-[1rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <Users className="text-blue-600 mb-6" size={24} />
            <h2 className="text-4xl font-bold tracking-tighter text-slate-900">
              {loading ? "..." : <CountUp end={stats.totalUsers} separator="," />}
            </h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">{t('home.stats.items.0.label')}</p>
          </div>

          <div className="p-10 rounded-[1rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <Store className="text-indigo-600 mb-6" size={24} />
            <h2 className="text-4xl font-bold tracking-tighter text-slate-900">
              {loading ? "..." : <CountUp end={stats.totalShops} separator="," />}
            </h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">{t('home.stats.items.1.label')}</p>
          </div>

          {/* Market Volume (USA/IND) */}
          <div className="col-span-2 p-10 rounded-[1rem] bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl" />
            <div className="relative z-10 w-full md:w-auto mb-6 md:mb-0">
              <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">{t('home.stats.items.2.label')}</p>
              <div className="flex gap-12">
                <div>
                  <span className="text-xs text-slate-400">USA</span>
                  <h4 className="text-2xl font-bold">{loading ? "..." : `$${new Intl.NumberFormat().format(stats.totalUsa)}`}</h4>
                </div>
                <div>
                  <span className="text-xs text-slate-400">IND</span>
                  <h4 className="text-2xl font-bold">{loading ? "..." : `₹${new Intl.NumberFormat().format(stats.totalInd)}`}</h4>
                </div>
              </div>
            </div>
            <Globe className="text-slate-700 group-hover:text-blue-500 transition-colors" size={64} strokeWidth={1} />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-10 md:py-16 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {t('home.howItWorks.title')}
            </h2>
            <div className="mt-2 h-1 w-10 bg-emerald-500 rounded-full" />
          </div>

          {/* Grid: 2 columns on mobile (with 3rd spanning full), 3 columns on laptop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { 
                icon: <CheckCircle strokeWidth={1.5} />, 
                title: t('home.howItWorks.steps.0.title'), 
                desc: t('home.howItWorks.steps.0.desc'),
                color: "text-emerald-600",
                bg: "bg-emerald-50"
              },
              { 
                icon: <Store strokeWidth={1.5} />, 
                title: t('home.howItWorks.steps.1.title'), 
                desc: t('home.howItWorks.steps.1.desc'),
                color: "text-teal-600",
                bg: "bg-teal-50"
              },
              { 
                icon: <Gift strokeWidth={1.5} />, 
                title: t('home.howItWorks.steps.2.title'), 
                desc: t('home.howItWorks.steps.2.desc'),
                color: "text-indigo-600",
                bg: "bg-indigo-50"
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                /* Logic: First two take 1 col each, third takes 2 cols on mobile. All take 1 on md+ */
                className={`group relative bg-white rounded-xl md:rounded-[1rem] p-5 md:p-7 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col items-start text-start ${
                  i === 2 ? "col-span-2 md:col-span-1" : "col-span-1"
                }`}
              >
                {/* Step Number: Removed 'hidden' so it shows on mobile too */}
                <span className="absolute top-4 right-4 md:top-6 md:right-6 text-[10px] md:text-xs font-black text-slate-200 group-hover:text-slate-300 transition-colors">
                  0{i + 1}
                </span>

                {/* Icon: Slightly larger on mobile for better visibility */}
                <div className={`mb-4 md:mb-6 w-10 h-10 md:w-12 md:h-12 ${step.bg} ${step.color} rounded-lg md:rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500`}>
                  {React.cloneElement(step.icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                </div>
                
                {/* Title: Increased size from text-[10px] to text-sm/base for readability */}
                <h3 className="text-sm md:text-lg font-bold text-slate-900 mb-2 md:mb-3 tracking-tight leading-tight">
                  {step.title}
                </h3>
                
                {/* Description: Removed 'hidden md:block' so it's visible on mobile */}
                <p className="text-slate-500 leading-relaxed text-xs md:text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* MOBILE APP FEATURES */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="py-10 md:py-16 px-6"
      >
        {/* max-w-5xl makes the section slightly more compact on laptops */}
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              {t('home.mobile.title')}
            </h2>
            <p className="text-slate-500 max-w-xl text-sm md:text-base">
              {t('home.mobile.subtitle')}
            </p>
          </div>

          {/* grid-cols-2 for mobile (2 columns), lg:grid-cols-4 for laptop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: <Smartphone />, title: t('home.mobile.features.0.title'), desc: t('home.mobile.features.0.desc'), color: 'bg-blue-50 text-blue-600' },
              { icon: <Bell />, title: t('home.mobile.features.1.title'), desc: t('home.mobile.features.1.desc'), color: 'bg-indigo-50 text-indigo-600' },
              { icon: <MapPin />, title: t('home.mobile.features.2.title'), desc: t('home.mobile.features.2.desc'), color: 'bg-violet-50 text-violet-600' },
              { icon: <TrendingUp />, title: t('home.mobile.features.3.title'), desc: t('home.mobile.features.3.desc'), color: 'bg-sky-50 text-sky-600' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                // p-5 for mobile, p-7 for laptop to keep it smaller than before
                className="group p-5 md:p-7 rounded-2xl md:rounded-[1rem] bg-white border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-500"
              >
                {/* Smaller icon wrapper for a "tighter" feel */}
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 md:mb-6 transform group-hover:scale-110 transition-all duration-500 shadow-sm`}>
                  {React.cloneElement(feature.icon, { strokeWidth: 2, className: "w-5 h-5 md:w-6 md:h-6" })}
                </div>
                
                <h4 className="font-bold text-slate-900 mb-2 text-sm md:text-lg leading-tight">
                  {feature.title}
                </h4>
                
                <p className="text-slate-500 text-[11px] md:text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PARTNER STORE CATEGORIES */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="py-10 md:py-16 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
              {t('home.categories.title')}
            </h2>
            <p className="text-slate-500 max-w-xl text-xs md:text-sm">
              {t('home.categories.subtitle')}
            </p>
          </div>

          {/* Grid: 2 columns on mobile, lg:6 on laptop. Increased gap for better spacing */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
            {[
              { icon: <Coffee />, name: t('home.categories.items.0.name'), count: t('home.categories.items.0.count'), color: 'bg-orange-50 text-orange-600' },
              { icon: <Utensils />, name: t('home.categories.items.1.name'), count: t('home.categories.items.1.count'), color: 'bg-rose-50 text-rose-600' },
              { icon: <ShoppingBag />, name: t('home.categories.items.2.name'), count: t('home.categories.items.2.count'), color: 'bg-emerald-50 text-emerald-600' },
              { icon: <Car />, name: t('home.categories.items.3.name'), count: t('home.categories.items.3.count'), color: 'bg-blue-50 text-blue-600' },
              { icon: <Heart />, name: t('home.categories.items.4.name'), count: t('home.categories.items.4.count'), color: 'bg-pink-50 text-pink-600' },
              { icon: <Gamepad2 />, name: t('home.categories.items.5.name'), count: t('home.categories.items.5.count'), color: 'bg-indigo-50 text-indigo-600' },
            ].map((category, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                /* Increased mobile padding to p-5 for a more premium feel */
                className="group flex flex-col items-center p-5 md:p-5 rounded-xl md:rounded-[1rem] bg-white border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-500 cursor-pointer"
              >
                {/* Icon Wrapper: Increased mobile size to w-11 */}
                <div className={`w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl ${category.color} mb-3 transform group-hover:scale-110 transition-all duration-500`}>
                  {React.cloneElement(category.icon, { strokeWidth: 2, className: "w-5 h-5 md:w-5 md:h-5" })}
                </div>
                
                {/* Title: Increased mobile font from 10px to text-sm */}
                <h4 className="text-sm md:text-sm font-bold text-slate-900 text-center leading-tight">
                  {category.name}
                </h4>
                
                {/* Count Badge: Increased font from 8px to 10px */}
                <div className="mt-2 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400">
                    {category.count}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <LoyaltyShowcase/>

      {/* FINAL CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-10 md:py-16 px-6"
      >
        {/* Modern "White Island" Container: Pure white with soft slate border */}
        <div className="max-w-7xl mx-auto bg-white border border-slate-100 rounded-[1rem] p-8 md:p-10 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          
          {/* Decorative Elements: Ultra-soft grey/indigo glows instead of blue */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-slate-50 rounded-full blur-3xl pointer-events-none opacity-50" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-50/30 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em] mb-6">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              {t('home.finalCTA.topTitle')}
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 md:mb-6">
              {t('home.finalCTA.title')}
            </h2>
            
            <p className="text-slate-500 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed px-4 font-medium">
              {t('home.finalCTA.subtitle')}
            </p>

            {/* Buttons: High-contrast Minimalist Style */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 px-4">
              
              {/* Primary CTA: Solid Slate/Black for impact */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/signup-user')}
                className="group flex items-center justify-center gap-2 px-8 py-2 bg-slate-900 text-white font-bold text-sm md:text-base rounded-full transition-all duration-300 w-full sm:w-auto shadow-xl shadow-slate-200"
              >
                {t('home.finalCTA.userCTA')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white/70" />
              </motion.button>

              {/* Secondary CTA: Soft Ghost/Border Style */}
              <motion.a
                href="https://subscription-frontend-psi.vercel.app/subscription"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2, backgroundColor: '#f8fafc' }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center gap-2 px-8 py-2 bg-white text-slate-600 font-bold text-sm md:text-base rounded-full transition-all duration-300 w-full sm:w-auto border border-slate-200"
              >
                {t('home.finalCTA.businessCTA')}
                <Store className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}