import React from 'react';
import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "March 20, 2026";

  const sections = [
    { id: "collection", title: "Information We Collect", icon: <Eye size={18} /> },
    { id: "usage", title: "How We Use Data", icon: <FileText size={18} /> },
    { id: "sharing", title: "Data Sharing", icon: <Shield size={18} /> },
    { id: "security", title: "Security Measures", icon: <Lock size={18} /> },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-600 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Decorative Background Header */}
      <div className="h-64 bg-white border-b border-slate-200/60 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
           <div className="absolute top-10 left-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl" />
           <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl" />
        </div>
        
        <div className="relative text-center space-y-3 px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
            <Shield size={14} />
            Trust & Safety
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Last Updated on {lastUpdated}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar Navigation - Fixed on Desktop */}
          <aside className="lg:w-64 flex-shrink-0 lg:sticky lg:top-10 h-fit">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm hover:text-blue-600 transition-all group border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
                      {section.icon}
                    </span>
                    <span className="text-sm font-semibold">{section.title}</span>
                  </div>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </button>
              ))}
            </nav>
            
            <div className="mt-10 p-6 bg-blue-600 rounded-[1rem] text-white shadow-xl shadow-blue-200">
              <h4 className="font-bold mb-2">Have questions?</h4>
              <p className="text-xs text-blue-100 leading-relaxed mb-4">
                Our team is here to help with any privacy concerns.
              </p>
              <a href="mailto:support@ifaceh.com" className="text-xs font-bold underline underline-offset-4">
                Contact Support
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-3xl space-y-16">
            
            <section id="collection" className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-sm font-mono">01</span>
                Information We Collect
              </h2>
              <div className="space-y-4 text-slate-500 leading-relaxed">
                <p>
                  To provide the <strong>LoyaltyPlatform</strong> experience, we collect information that identifies you or relates to your activity on our platform.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <li className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <span className="block font-bold text-slate-900 text-sm mb-1">Identity Data</span>
                    <span className="text-xs">Name, email, and phone number used for account verification.</span>
                  </li>
                  <li className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <span className="block font-bold text-slate-900 text-sm mb-1">Transaction Data</span>
                    <span className="text-xs">Details about rewards earned, visit frequency, and total spending.</span>
                  </li>
                </ul>
              </div>
            </section>

            <section id="usage" className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-sm font-mono">02</span>
                How We Use Data
              </h2>
              <p className="text-slate-500 leading-relaxed">
                We use your data strictly to facilitate the loyalty ecosystem between you and your favorite merchants. This includes:
              </p>
              <ul className="space-y-3 list-disc pl-5 text-sm text-slate-500">
                <li>Automating reward point calculations.</li>
                <li>Improving dashboard performance based on usage patterns.</li>
                <li>Securely processing subscription payments via Stripe.</li>
                <li>Detecting and preventing fraudulent activity or duplicate accounts.</li>
              </ul>
            </section>

            <section id="sharing" className="space-y-6 text-slate-500 leading-relaxed">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-sm font-mono">03</span>
                Data Sharing
              </h2>
              <p>
                We do not sell, rent, or trade your personal information. Your data is only shared with:
              </p>
              <div className="p-6 bg-slate-900 rounded-[1rem] text-slate-300 border border-slate-800">
                <p className="text-sm">
                  <strong className="text-white">Participating Merchants:</strong> Only the stores you explicitly join as a member will have access to your loyalty stats for that specific business. They cannot see your activity at other unrelated shops.
                </p>
              </div>
            </section>

            <section id="security" className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-sm font-mono">04</span>
                Security Measures
              </h2>
              <p className="text-slate-500 leading-relaxed">
                We prioritize data integrity through modern engineering practices. All data is transmitted over <strong>HTTPS/TLS</strong> and sensitive credentials like API keys are managed using secure environment variables.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;