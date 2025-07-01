import React from 'react';

const features = [
  {
    emoji: "🎯",
    title: "Targeted Rewards",
    description: "Reward customers based on their purchase behavior to increase loyalty and repeat visits.",
  },
  {
    emoji: "📱",
    title: "Mobile-Friendly",
    description: "Easily accessible on mobile for both users and shopkeepers to manage profiles, track points, and redeem rewards.",
  },
  {
    emoji: "🔁",
    title: "Referral System",
    description: "Grow your customer base by rewarding users who refer friends. Top referrers appear on a leaderboard!",
  },
  {
    emoji: "📊",
    title: "Analytics Dashboard",
    description: "Real-time stats on sales, customer engagement, and loyalty activity to help shops make data-driven decisions.",
  },
  {
    emoji: "🎁",
    title: "Custom Reward Tiers",
    description: "Create special bonuses and milestones that reward your most loyal customers over time.",
  },
  {
    emoji: "💬",
    title: "Automated Notifications",
    description: "Keep users informed with point updates, reward availability, and promotional messages.",
  },
];

function Features() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-20">
      <h1 className="text-4xl font-bold text-center text-fuchsia-700 mb-12">
        🚀 Key Features of Our Loyalty Program
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-fuchsia-100 hover:shadow-xl transition">
            <div className="text-4xl mb-4">{feature.emoji}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
