import React from 'react';

function Resources() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-fuchsia-700 mb-12">📚 Loyalty Program Resources</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Resource Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">🔄 How Loyalty Points Work</h3>
          <p className="text-gray-700 mb-4">
            Learn how you earn, track, and redeem points in our system.
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fuchsia-600 hover:underline font-medium"
          >
            Read More →
          </a>
        </div>

        {/* Resource Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">📈 Benefits for Businesses</h3>
          <p className="text-gray-700 mb-4">
            Discover how loyalty programs boost customer retention and revenue.
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fuchsia-600 hover:underline font-medium"
          >
            Explore Benefits →
          </a>
        </div>

        {/* Resource Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">🎯 Referral Program Guide</h3>
          <p className="text-gray-700 mb-4">
            Maximize your earnings by referring others and topping the leaderboard.
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fuchsia-600 hover:underline font-medium"
          >
            Learn How →
          </a>
        </div>

        {/* Resource Card 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">🧾 Reward Redemption Rules</h3>
          <p className="text-gray-700 mb-4">
            Understand the terms and conditions for redeeming your earned rewards.
          </p>
          <a
            href="#"
            className="text-fuchsia-600 hover:underline font-medium"
          >
            View Policy →
          </a>
        </div>

        {/* Resource Card 5 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">📊 Loyalty Dashboard Features</h3>
          <p className="text-gray-700 mb-4">
            Track your purchase history, referral stats, and bonus rewards all in one place.
          </p>
          <a
            href="#"
            className="text-fuchsia-600 hover:underline font-medium"
          >
            Learn More →
          </a>
        </div>

        {/* Resource Card 6 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">🎉 Promotions & Bonuses</h3>
          <p className="text-gray-700 mb-4">
            Stay updated on seasonal offers and limited-time bonus point opportunities.
          </p>
          <a
            href="#"
            className="text-fuchsia-600 hover:underline font-medium"
          >
            Check Promotions →
          </a>
        </div>
      </div>
    </div>
  );
}

export default Resources;
