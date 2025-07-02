import React from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { Carousel, Collapse } from 'antd';
import 'antd/dist/reset.css';

const { Panel } = Collapse;

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 drop-shadow-lg">🎁 Join Loyalty Rewards Program</h1>
        <p className="text-lg sm:text-xl max-w-2xl mb-6 drop-shadow-md">
          Earn points every time you shop. Get exclusive rewards. Refer friends and climb the leaderboard.
        </p>
        <button
          onClick={() => navigate('/signup-user')}
          className="bg-white text-fuchsia-700 font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Start Earning Today
        </button>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-100 px-4 text-center">
        <h2 className="text-3xl font-bold text-fuchsia-700 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { icon: "📝", title: "Sign Up", desc: "Create a free account in seconds." },
            { icon: "🛍️", title: "Shop & Earn", desc: "Earn points at thousands of US retailers." },
            { icon: "🎁", title: "Redeem Rewards", desc: "Redeem points for vouchers, deals, or gifts." },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-fuchsia-700">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            { icon: "👥", label: "Members", value: 5000 },
            { icon: "🏬", label: "Partner Stores", value: 150 },
            { icon: "💵", label: "Rewards Claimed", value: 100000 },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-5xl mb-2">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-fuchsia-600">
                <CountUp end={stat.value} duration={3} separator="," />
                {stat.label === "Rewards Claimed" ? " $" : "+"}
              </h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-center text-fuchsia-700">Why Our Members Love Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            'No membership fees',
            'Nationwide partners',
            'Exclusive local deals',
            'Fast & easy rewards',
          ].map((benefit, idx) => (
            <div key={idx} className="bg-fuchsia-50 p-6 rounded-xl text-center shadow">
              <p className="text-lg font-medium text-fuchsia-900">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-20 bg-white text-center px-4">
        <h2 className="text-3xl font-bold text-fuchsia-700 mb-6">🏆 Referral Leaderboard (Top 3)</h2>
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Emma", points: 890 },
            { name: "Jacob", points: 765 },
            { name: "Sophia", points: 702 },
          ].map((user, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow text-center">
              <h4 className="text-xl font-semibold text-fuchsia-700">{user.name}</h4>
              <p className="text-gray-600">Referral Points</p>
              <div className="text-2xl font-bold mt-2">{user.points}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100 px-4 text-center">
        <h2 className="text-3xl font-bold text-fuchsia-700 mb-6">What Our Members Say</h2>
        <Carousel autoplay>
          {[
            {
              name: "Sarah - Texas",
              quote: "“I saved over $200 using points! Best decision ever.”",
            },
            {
              name: "Liam - Florida",
              quote: "“My whole family uses this now. Referrals are gold!”",
            },
          ].map((t, i) => (
            <div key={i} className="max-w-xl mx-auto">
              <p className="text-lg italic text-gray-800">"{t.quote}"</p>
              <p className="mt-2 text-fuchsia-700 font-bold">{t.name}</p>
            </div>
          ))}
        </Carousel>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center text-fuchsia-700 mb-6">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto">
          <Collapse accordion>
            <Panel header="📥 How do I earn points?" key="1">
              <p>Simply shop at any of our partner stores and present your member code.</p>
            </Panel>
            <Panel header="🎁 Where can I redeem rewards?" key="2">
              <p>You can redeem rewards in your dashboard or use them at checkout in participating stores.</p>
            </Panel>
            <Panel header="💸 Is this program free?" key="3">
              <p>Yes! Joining and earning is 100% free for all users.</p>
            </Panel>
          </Collapse>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 text-white text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Ready to Earn with Every Purchase?</h2>
        <p className="mb-6 text-lg">Join thousands already redeeming rewards across the U.S.</p>
        <button
          onClick={() => navigate('/signup-user')}
          className="bg-white text-fuchsia-700 font-bold px-10 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Join Loyalty Rewards Free
        </button>
      </section>
    </div>
  );
}

export default Home;
