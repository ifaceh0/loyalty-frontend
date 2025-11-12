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

const resources = [
  {
    Icon: BookOpen,
    title: 'How Loyalty Points Work',
    description: 'Learn how you earn, track, and redeem points in our system.',
    details: [
      { type: 'step', text: 'Earn 1 point for every $1 spent.' },
      { type: 'step', text: 'Points appear instantly in your dashboard.' },
      { type: 'step', text: 'Redeem 100 points = $5 discount.' },
      { type: 'tip', text: 'Points never expire if you shop every 12 months.' },
    ],
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    Icon: TrendingUp,
    title: 'Benefits for Businesses',
    description: 'Discover how loyalty programs boost customer retention and revenue.',
    details: [
      { type: 'stat', text: 'Loyal customers spend 67% more' },
      { type: 'stat', text: '30% average increase in repeat visits' },
      { type: 'tip', text: 'Use analytics to run targeted campaigns' },
      { type: 'tip', text: 'Reward top spenders with VIP tiers' },
    ],
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    Icon: Share2,
    title: 'Referral Program Guide',
    description: 'Maximize your earnings by referring others and topping the leaderboard.',
    details: [
      { type: 'step', text: 'Share your unique referral link' },
      { type: 'step', text: 'Friend joins & makes first purchase' },
      { type: 'step', text: 'Both get 50 bonus points' },
      { type: 'tip', text: 'Top 10 referrers win exclusive rewards monthly' },
    ],
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    Icon: FileText,
    title: 'Reward Redemption Rules',
    description: 'Understand the terms and conditions for redeeming your earned rewards.',
    details: [
      { type: 'rule', text: 'Minimum 50 points to redeem' },
      { type: 'rule', text: 'Rewards valid for 90 days' },
      { type: 'rule', text: 'Cannot combine with other offers' },
      { type: 'rule', text: 'Non-transferable & non-refundable' },
    ],
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    Icon: LayoutDashboard,
    title: 'Loyalty Dashboard Features',
    description: 'Track your purchase history, referral stats, and bonus rewards all in one place.',
    details: [
      { type: 'feature', text: 'Real-time points balance' },
      { type: 'feature', text: 'Full transaction history' },
      { type: 'feature', text: 'Live referral leaderboard' },
      { type: 'tip', text: 'Export reports as PDF or CSV' },
    ],
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    Icon: Gift,
    title: 'Promotions & Bonuses',
    description: 'Stay updated on seasonal offers and limited-time bonus point opportunities.',
    details: [
      { type: 'promo', text: 'Double points every Friday' },
      { type: 'promo', text: 'Birthday month: 100 bonus points' },
      { type: 'promo', text: 'Flash sales: 3× points on select items' },
      { type: 'tip', text: 'Enable notifications to never miss a deal' },
    ],
    gradient: 'from-lime-400 to-green-500',
  },
];

export default function Resources() {
  const [modalOpen, setModalOpen] = useState(null);

  const openModal = (resource) => setModalOpen(resource);
  const closeModal = () => setModalOpen(null);

  return (
    <>
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
              Loyalty Program Resources
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to understand, manage, and maximize your loyalty experience.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, idx) => {
              const Icon = resource.Icon;
              return (
                <button
                  key={idx}
                  onClick={() => openModal(resource)}
                  className="group block text-left"
                >
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-md p-1 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${resource.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                    />
                    <div className="relative bg-white rounded-md p-6 h-full">
                      <div className="mb-4 w-12 h-12 rounded-md bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- MODAL (demo only) ---------- */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-md shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close X */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="p-6 lg:p-8">
              {/* Title + Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <modalOpen.Icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {modalOpen.title}
                </h2>
              </div>

              {/* Dynamic useful content */}
              <div className="space-y-4">
                {modalOpen.details.map((item, i) => {
                  if (item.type === 'step')
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{item.text}</p>
                      </div>
                    );
                  if (item.type === 'stat')
                    return (
                      <div
                        key={i}
                        className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-md font-medium"
                      >
                        {item.text}
                      </div>
                    );
                  if (item.type === 'tip')
                    return (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-amber-600 text-xs font-bold">i</span>
                        </div>
                        <p className="text-gray-600 italic">{item.text}</p>
                      </div>
                    );
                  if (item.type === 'rule')
                    return (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                        <p className="text-gray-700">{item.text}</p>
                      </div>
                    );
                  if (item.type === 'promo')
                    return (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 px-4 py-2 rounded-md font-medium flex items-center gap-2"
                      >
                        <Gift className="w-4 h-4" />
                        {item.text}
                      </div>
                    );
                  if (item.type === 'feature')
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                        <p className="text-gray-700">{item.text}</p>
                      </div>
                    );
                  return null;
                })}
              </div>

              {/* ONLY "Got it" button (no external link) */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-sm hover:bg-emerald-700 transition shadow-md"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}