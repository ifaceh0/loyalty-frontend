import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, User, Shield, Mail, Lock, Puzzle, Key,
  CheckCircle, ArrowRight, ChevronDown, Zap, AlertCircle,
} from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function ShopkeeperFullFlowDemo() {
  const { t } = useTranslation();
  const [showFAQ, setShowFAQ] = useState({});

  const SUBSCRIPTION_URL = "https://subscription-frontend-psi.vercel.app/subscription";

  const steps = [
    {
      num: 1,
      title: t("flow.steps.1.title"),
      desc: t("flow.steps.1.desc"),
      highlight: t("flow.steps.1.highlight"),
      details: t("flow.steps.1.details", { returnObjects: true }),
      icon: CreditCard,
      color: "text-blue-600",
      bg: "bg-blue-50/50",
      border: "border-blue-100",
      cta: { text: t("flow.steps.1.cta"), link: SUBSCRIPTION_URL, urgent: true },
    },
    {
      num: 2,
      title: t("flow.steps.2.title"),
      desc: t("flow.steps.2.desc"),
      details: t("flow.steps.2.details", { returnObjects: true }),
      icon: User,
      color: "text-blue-600",
      bg: "bg-blue-50/50",
      border: "border-blue-100",
    },
    {
      num: 3,
      title: t("flow.steps.3.title"),
      desc: t("flow.steps.3.desc"),
      details: t("flow.steps.3.details", { returnObjects: true }),
      icon: Shield,
      color: "text-blue-600",
      bg: "bg-blue-50/50",
      border: "border-blue-100",
    },
    {
      num: 4,
      title: t("flow.steps.4.title"),
      desc: t("flow.steps.4.desc"),
      details: t("flow.steps.4.details", { returnObjects: true }),
      icon: Key,
      color: "text-indigo-600",
      bg: "bg-indigo-50/50",
      border: "border-indigo-100",
      formPreview: true,
    },
    {
      num: 5,
      title: t("flow.steps.5.title"),
      desc: t("flow.steps.5.desc"),
      details: t("flow.steps.5.details", { returnObjects: true }),
      icon: Lock,
      color: "text-indigo-600",
      bg: "bg-indigo-50/50",
      border: "border-indigo-100",
    },
    {
      num: 6,
      title: t("flow.steps.6.title"),
      desc: t("flow.steps.6.desc"),
      details: t("flow.steps.6.details", { returnObjects: true }),
      icon: CheckCircle,
      color: "text-indigo-600",
      bg: "bg-indigo-50/50",
      border: "border-indigo-100",
    },
  ];

  // const faqs = t("flow.faqs", { returnObjects: true });

  // // Points on the curved road (x, y)
  // const roadPoints = [
  //   { x: 300, y: 180 },
  //   { x: 390, y: 420 },
  //   { x: 265, y: 680 },
  //   { x: 250, y: 1000 },
  //   { x: 240, y: 1570 },
  //   { x: 330, y: 1880 },
  // ].slice(0, steps.length);

  // const handleExternalRedirect = (link) => {
  //   window.open(link, "_blank");
  // };

  const faqs = t("flow.faqs", { returnObjects: true }) || [];

  // Road points for Desktop SVG
  const roadPoints = [
    { x: 300, y: 200 }, { x: 390, y: 440 }, { x: 265, y: 680 },
    { x: 250, y: 1000 }, { x: 240, y: 1570 }, { x: 330, y: 1880 },
  ].slice(0, steps.length);

  const toggleFAQ = (i) => {
    setShowFAQ(prev => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      
      {/* Hero Section */}
      <section className="pt-20 pb-10 px-6 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            {t("flow.hero.title")}
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto"
             dangerouslySetInnerHTML={{ __html: t("flow.hero.subtitle") }} />
          
          <div className="mt-8 flex justify-center gap-3">
             <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-[12px] font-bold border border-red-100">
               <AlertCircle className="w-3.5 h-3.5" /> {t("flow.hero.requiredBadge")}
             </span>
             <span className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[12px] font-bold border border-blue-100">
               {t("flow.hero.timeBadge")}
             </span>
          </div>
        </motion.div>
      </section>

      {/* DESKTOP VIEW: SVG Roadmap (Hidden on Mobile) */}
      <div className="hidden lg:block relative w-full max-w-5xl mx-auto overflow-visible py-20">
        <svg viewBox="-150 100 1000 1980" className="w-full h-auto drop-shadow-sm">
          <path
            d="M 300,180 Q 480,400 300,620 Q 120,840 300,1060 Q 480,1280 300,1480 Q 120,1680 300,1850"
            stroke="#f1f5f9" strokeWidth="30" fill="none" strokeLinecap="round"
          />
          {/* Animated Path */}
          <motion.path
            d="M 300,180 Q 480,400 300,620 Q 120,840 300,1060 Q 480,1280 300,1480 Q 120,1680 300,1850"
            stroke="#3b82f6" strokeWidth="20" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />

          {steps.map((step, idx) => {
            const p = roadPoints[idx];
            const isLeft = idx % 2 === 0;
            return (
              <foreignObject key={idx} x={isLeft ? p.x - 340 : p.x + 60} y={p.y - 100} width="300" className="overflow-visible">
                <StepCard step={step} align={isLeft ? "text-left" : "text-right"} isLeft={isLeft} />
              </foreignObject>
            );
          })}

          {/* Point Markers */}
          {roadPoints.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="28" fill="white" stroke="#3b82f6" strokeWidth="6" className="shadow-xl" />
              <text x={p.x} y={p.y + 7} textAnchor="middle" fill="#1e293b" fontSize="20" fontWeight="800">{i + 1}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* MOBILE VIEW: Clean Vertical Timeline (Hidden on Desktop) */}
      <div className="lg:hidden px-6 space-y-8 max-w-lg mx-auto py-10">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-10 border-l-2 border-slate-100">
            <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-200">
              {step.num}
            </div>
            <StepCard step={step} align="text-left" isLeft={true} />
          </div>
        ))}
      </div>

      {/* FAQ & Final CTA Sections */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-slate-900 mb-10">{t("flow.faqTitle")}</h2>
           <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-100 rounded-xl bg-white overflow-hidden shadow-sm">
                  <button onClick={() => toggleFAQ(i)} className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors">
                    <span className="font-bold text-slate-800">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-blue-500 transition-transform ${showFAQ[i] ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {showFAQ[i] && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4" dangerouslySetInnerHTML={{ __html: faq.a }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
           </div>
        </div>

        {/* Support Section */}
        <div className="text-center bg-slate-50 rounded-xl p-10 border border-slate-100">
          <p className="text-slate-600 mb-6 font-medium">{t("flow.support.text")}</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-2 bg-slate-900 text-white font-bold rounded-full hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
            <Mail className="w-5 h-5" /> {t("flow.support.button")}
          </a>
        </div>
      </section>
    </div>
  );
}

// Sub-component for Step Cards to keep code DRY
function StepCard({ step, align, isLeft }) {
  const { t } = useTranslation();
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      whileInView={{ opacity: 1, scale: 1 }}
      className={`p-6 rounded-xl md:rounded-xl border ${step.border} ${step.bg} backdrop-blur-md shadow-sm flex flex-col`}
    >
      <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'} mb-4`}>
        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
          <step.icon className={`w-5 h-5 ${step.color}`} />
        </div>
      </div>
      <h3 className={`text-lg font-bold ${align} text-slate-800 mb-2 tracking-tight`}>{step.title}</h3>
      {step.highlight && (
        <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-wider rounded-full self-start mb-3">
          {step.highlight}
        </span>
      )}
      <p className={`text-[13px] text-slate-500 leading-relaxed mb-4 ${align} font-medium`}>{step.desc}</p>
      
      {step.cta && (
        <a href={step.cta.link} target="_blank" className={`w-full py-2 rounded-full flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-lg ${step.cta.urgent ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-slate-900 text-white'}`}>
          {step.cta.urgent && <Zap className="w-4 h-4 fill-current" />}
          {step.cta.text} <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </motion.div>
  );
}