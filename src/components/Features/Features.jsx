'use client';

import React, { useState } from 'react';
import {
  Target,
  Smartphone,
  Users,
  BarChart3,
  Gift,
  Bell,
  X,
} from 'lucide-react';

const features = [
  {
    Icon: Target,
    title: 'Targeted Rewards',
    description:
      'Reward customers based on their purchase behavior to increase loyalty and repeat visits.',
    gradient: 'from-emerald-400 to-teal-600',
    details:
      'Our AI‑driven engine analyses every transaction and automatically suggests the best reward for each shopper. You can set rules like “spend $50 → 10 pts” or “buy 3 coffees → free drink”.',
    image:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    Icon: Smartphone,
    title: 'Mobile‑First Experience',
    description:
      'Seamless access on any device for users and shopkeepers to track points and redeem rewards.',
    gradient: 'from-cyan-400 to-blue-600',
    details:
      'Both the customer app and the shopkeeper dashboard are PWA‑ready. Customers scan a QR code to instantly see their points, redeem offers, and receive push notifications.',
    image:
      'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    Icon: Users,
    title: 'Referral Boost',
    description:
      'Grow your customer base with rewards for referrals. Top referrers shine on the leaderboard!',
    gradient: 'from-indigo-400 to-purple-600',
    details:
      'Every successful referral earns the referrer 50 pts + a bonus for the new user. The live leaderboard updates in real‑time, motivating friendly competition.',
    image:
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    Icon: BarChart3,
    title: 'Smart Analytics',
    description:
      'Real‑time insights into sales, engagement, and loyalty performance to drive growth.',
    gradient: 'from-amber-400 to-orange-600',
    details:
      'Interactive charts show redemption rates, average basket size per tier, and ROI of each campaign. Export CSV with one click.',
    image:
      'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    Icon: Gift,
    title: 'Tiered Rewards',
    description:
      'Create VIP milestones and exclusive bonuses for your most loyal customers.',
    gradient: 'from-pink-400 to-rose-600',
    details:
      'Define Bronze → Silver → Gold tiers. Unlock exclusive coupons, early‑access sales, and birthday gifts automatically when a user hits the threshold.',
    image:
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    Icon: Bell,
    title: 'Smart Alerts',
    description:
      'Keep users engaged with instant updates on points, rewards, and promotions.',
    gradient: 'from-lime-400 to-green-600',
    details:
      'Push, SMS, or in‑app notifications are triggered by events: “You earned 20 pts!”, “Your free coffee is ready”, “Flash sale – 2× points today”.',
    image:
      'https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
];

export default function Features() {
  const [modalOpen, setModalOpen] = useState(null); // holds the whole feature object

  const openModal = (feature) => setModalOpen(feature);
  const closeModal = () => setModalOpen(null);

  return (
    <>
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
              Powerful Features That Drive Loyalty
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to build stronger customer relationships and
              grow your business.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.Icon;
              return (
                <button
                  key={idx}
                  onClick={() => openModal(feature)}
                  className="group relative bg-white rounded-md p-1 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden text-left"
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  />

                  <div className="relative bg-white rounded-md p-6 h-full border border-gray-100">
                    {/* Icon */}
                    <div className="mb-5 w-14 h-14 rounded-md bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-emerald-600" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
                      {feature.title}
                    </h3>

                    {/* Short description */}
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover “Learn more” */}
                    <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-emerald-600 text-sm font-medium">
                        Learn more
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- MODAL ---------- */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Image (if any) */}
            {modalOpen.image && (
              <div className="h-56 overflow-hidden">
                <img
                  src={modalOpen.image}
                  alt={modalOpen.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <modalOpen.Icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {modalOpen.title}
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {modalOpen.details}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-sm hover:bg-emerald-700 transition"
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