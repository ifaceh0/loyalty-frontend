import React from "react";
import { 
  Star, Package, RefreshCw, Zap, Compass, 
  Shield, ArrowRight, ExternalLink, Layout 
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const BentoFeature = ({ icon, title, description, color }) => (
  <div className="group p-6 rounded-[2rem] bg-white/50 backdrop-blur-sm border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-500/5">
    <div className={`mb-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <h3 className="text-sm font-black text-slate-800 mb-1 tracking-tight">{title}</h3>
    <p className="text-xs text-slate-500 leading-relaxed font-medium">{description}</p>
  </div>
);

const SubscriptionDashboard = () => {
  const { t } = useTranslation();
  
  const companyEmail = typeof window !== "undefined" ? localStorage.getItem("companyEmail") || "" : "";
  const baseUrl = import.meta.env.MODE === "development"
      ? "https://subscription-frontend-git-develop-pradyumna-dikhits-projects.vercel.app"
      : "https://subscription-frontend-psi.vercel.app";

  const subscriptionUrl = `${baseUrl}/subscription-dashboard?email=${encodeURIComponent(companyEmail)}`;

  const features = [
    { icon: <Star />, title: t("subscriptionDashboard.features.premiumTools.title"), description: t("subscriptionDashboard.features.premiumTools.desc"), color: "from-amber-400 to-orange-500" },
    { icon: <Package />, title: t("subscriptionDashboard.features.manageApps.title"), description: t("subscriptionDashboard.features.manageApps.desc"), color: "from-emerald-400 to-teal-500" },
    { icon: <Zap />, title: t("subscriptionDashboard.features.superFast.title"), description: t("subscriptionDashboard.features.superFast.desc"), color: "from-blue-400 to-indigo-500" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden font-sans selection:bg-blue-100">
      {/* Animated Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 mb-6">
            <Shield size={12} /> {t("subscriptionDashboard.features.secure.title")}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            {t("subscriptionDashboard.hero.title").split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? "text-blue-600" : ""}>{word} </span>
            ))}
          </h1>
          <p className="max-w-xl mx-auto text-slate-500 font-medium md:text-lg">
            {t("subscriptionDashboard.hero.subtitle")}
          </p>
        </motion.div>

        {/* Main Portal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-5xl bg-white rounded-[1rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
            <Layout size={200} />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            {/* Left: Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t("subscriptionDashboard.bottom.emailLabel")}</p>
                <p className="text-lg font-black text-slate-800">{companyEmail || t("subscriptionDashboard.bottom.notLoggedIn")}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={subscriptionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-2.5 rounded-full font-semibold transition-all hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
                >
                  {t("subscriptionDashboard.hero.ctaMain")}
                  <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                
                {/* <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                  <RefreshCw size={18} />
                  {t("subscriptionDashboard.bottom.ctaSecondary")}
                </button> */}
              </div>
            </div>

            {/* Right: Feature Quick-Grid */}
            <div className="flex-1 grid grid-cols-1 gap-4 w-full">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-100 border border-slate-100/50">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white shadow-sm`}>
                    {React.cloneElement(f.icon, { size: 18 })}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">{f.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-slate-200" />
          LoyaltyHub Secure Gateway
          <span className="h-px w-12 bg-slate-200" />
        </motion.p>
      </div>
    </div>
  );
};

export default SubscriptionDashboard;