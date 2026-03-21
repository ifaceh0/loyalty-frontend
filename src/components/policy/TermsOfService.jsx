import React from 'react';
import { Gavel, Scale, AlertCircle, RefreshCcw, UserCheck, ShieldCheck } from 'lucide-react';

const TermsOfService = () => {
  const lastUpdated = "March 20, 2026";

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <UserCheck className="w-5 h-5 text-blue-500" />,
      content: "By accessing or using LoyaltyHub, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service."
    },
    {
      title: "User Accounts",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      content: "You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password."
    },
    {
      title: "Loyalty Points & Rewards",
      icon: <Scale className="w-5 h-5 text-indigo-500" />,
      content: "Points earned through LoyaltyHub have no cash value and are non-transferable. Merchants reserve the right to modify their specific reward structures at any time."
    },
    {
      title: "Termination",
      icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
      content: "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including breach of Terms."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-600 pb-20">
      {/* Simple Header */}
      <header className="py-24 px-6 border-b border-slate-50 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <Gavel size={12} />
            Legal Agreement
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Terms of Service</h1>
          <p className="text-slate-400 text-sm">Please read these terms carefully before using LoyaltyHub.</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 mt-16">
        {/* Quick Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {sections.map((section, index) => (
            <div key={index} className="p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                {section.icon}
                <h3 className="font-bold text-slate-900 text-sm">{section.title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-slate-500 group-hover:text-slate-600 transition-colors">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Content */}
        <article className="prose prose-slate prose-sm max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Use License</h2>
            <p className="leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on LoyaltyHub's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-slate-500">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose;</li>
              <li>Attempt to decompile or reverse engineer any software contained on the platform;</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Disclaimer</h2>
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 text-amber-800 text-xs leading-relaxed">
              The materials on LoyaltyHub are provided on an 'as is' basis. LoyaltyHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Limitations</h2>
            <p className="leading-relaxed">
              In no event shall LoyaltyHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on LoyaltyHub's platform.
            </p>
          </section>

          <section className="pt-10 border-t border-slate-100 flex justify-between items-center">
             <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                <RefreshCcw size={12} />
                Updated: {lastUpdated}
             </div>
             <button 
              onClick={() => window.print()}
              className="text-[11px] font-bold text-blue-600 hover:underline"
             >
               Print Version
             </button>
          </section>
        </article>
      </div>
    </div>
  );
};

export default TermsOfService;