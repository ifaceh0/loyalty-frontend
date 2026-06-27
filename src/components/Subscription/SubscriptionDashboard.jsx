import React from "react";
import { 
  Star, Package, Zap, Shield, ExternalLink, Layout, Mail, Layers 
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const SubscriptionDashboard = () => {
  const { t } = useTranslation();
  
  const companyEmail = typeof window !== "undefined" ? localStorage.getItem("companyEmail") || "" : "";
  const baseUrl = import.meta.env.MODE === "development"
      ? "https://subscription-frontend-git-develop-pradyumna-dikhits-projects.vercel.app"
      : "https://subscription-frontend-psi.vercel.app";

  const subscriptionUrl = `${baseUrl}/subscription-dashboard?email=${encodeURIComponent(companyEmail)}`;

  const features = [
    { 
      icon: <Star />, 
      title: t("subscriptionDashboard.features.premiumTools.title"), 
      description: t("subscriptionDashboard.features.premiumTools.desc"), 
      color: "text-indigo-600 bg-indigo-50 border-indigo-100/70" 
    },
    { 
      icon: <Package />, 
      title: t("subscriptionDashboard.features.manageApps.title"), 
      description: t("subscriptionDashboard.features.manageApps.desc"), 
      color: "text-emerald-600 bg-emerald-50 border-emerald-100/70" 
    },
    { 
      icon: <Zap />, 
      title: t("subscriptionDashboard.features.superFast.title"), 
      description: t("subscriptionDashboard.features.superFast.desc"), 
      color: "text-amber-600 bg-amber-50 border-amber-100/70" 
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased relative overflow-hidden flex flex-col justify-center py-12">
      {/* Structural Minimal Mesh Lighting Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-zinc-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Module Header Segment */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-7xl mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-[11px] font-bold uppercase tracking-wider mb-4">
            <Shield size={13} />
            <span>{t("subscriptionDashboard.features.secure.title")}</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4 leading-none">
            {t("subscriptionDashboard.hero.title")}
          </h1>
          
          <p className="text-zinc-500 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
            {t("subscriptionDashboard.hero.subtitle")}
          </p>
        </motion.div>

        {/* Core Administrative Portal Interface Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-full bg-white border border-zinc-200 rounded-md p-6 sm:p-10 shadow-sm relative overflow-hidden"
        >
          {/* Subtle Decorative Geometric Branding Grid */}
          <div className="absolute -top-10 -right-10 p-8 opacity-[0.02] text-zinc-950 pointer-events-none hidden sm:block">
            <Layout size={240} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Account Status Segment (Left) */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-zinc-100 pb-8 lg:pb-0 lg:pr-8">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  <Mail size={12} /> {t("subscriptionDashboard.bottom.emailLabel")}
                </span>
                <p className="text-lg font-bold text-zinc-900 tracking-tight truncate px-2 lg:px-0">
                  {companyEmail || t("subscriptionDashboard.bottom.notLoggedIn")}
                </p>
              </div>
              
              <div className="pt-2">
                <a
                  href={subscriptionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm rounded-full transition-all shadow-sm active:scale-98"
                >
                  <span>{t("subscriptionDashboard.hero.ctaMain")}</span>
                  <ExternalLink size={14} className="text-zinc-400 shrink-0" />
                </a>
              </div>
            </div>

            {/* Premium Feature Ecosystem Grid (Right) */}
            <div className="lg:col-span-7 space-y-3.5 w-full">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1 text-center lg:text-left">
                Included Module Capabilities
              </span>
              
              {features.map((f, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-4 p-4 bg-zinc-50/50 border border-zinc-200/60 rounded-md transition-all hover:bg-white hover:shadow-sm"
                >
                  <div className={`w-9 h-9 rounded-md flex items-center justify-center border shrink-0 ${f.color}`}>
                    {React.cloneElement(f.icon, { size: 16, strokeWidth: 2.5 })}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-zinc-800 tracking-tight">{f.title}</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

        {/* Global Footer Subtext Identification */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400"
        >
          <Layers size={12} className="text-zinc-300" />
          <span>LoyaltyHub Secure Gateway</span>
        </motion.div>

      </div>
    </div>
  );
};

export default SubscriptionDashboard;