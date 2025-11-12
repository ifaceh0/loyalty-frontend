// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import CountUp from "react-countup";
// import { Collapse } from "antd";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import "antd/dist/reset.css";

// import carousel1 from "../../assets/carousel1.jpg";
// import carousel2 from "../../assets/carousel2.jpg";
// import carousel3 from "../../assets/carousel3.jpg";
// import carousel4 from "../../assets/carousel4.jpg";
// import carousel5 from "../../assets/carousel5.jpg";

// const { Panel } = Collapse;

// function Home() {
//   const navigate = useNavigate();
//   const heroImages = [carousel1, carousel2, carousel3, carousel4, carousel5];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalShops: 0,
//     totalTransactionAmount: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const response = await fetch("https://loyalty-backend-java.onrender.com/api/loyalty_homePage/summary"); // Adjust base URL if needed
//         const data = await response.json();
//         setStats({
//           totalUsers: data.totalUsers || 0,
//           totalShops: data.totalShops || 0,
//           totalTransactionAmount: data.totalTransactionAmount || 0,
//         });
//       } catch (error) {
//         console.error("Failed to fetch dashboard summary:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSummary();
//   }, []);

//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? heroImages.length - 1 : prev - 1
//     );
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === heroImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   useEffect(() => {
//     const timer = setInterval(nextSlide, 5000);
//     return () => clearInterval(timer);
//   }, [currentIndex]);

//   return (
//     <div className="w-full bg-white">
//       {/* Hero Section */}
//       <section
//         className="relative w-full h-[600px] flex justify-center items-center text-white cursor-pointer group overflow-hidden pt-2"
//         onClick={() => navigate("/signup-user")}
//       >
//         <div className="relative w-full h-full">
//           {heroImages.map((img, idx) => (
//             <div
//               key={idx}
//               className={`absolute inset-0 transition-opacity duration-1000 ${
//                 idx === currentIndex ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <img
//                 src={img}
//                 alt={`Hero slide ${idx + 1}`}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

//               {idx === currentIndex && (
//                 <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center px-6">
//                   <h2 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
//                     Automated Referral Workflows
//                   </h2>
//                   <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
//                     Simplify your referral processes with automated workflows that save you time and effort.
//                   </p>
//                   <div className="flex justify-center mt-6 space-x-2">
//                     {heroImages.map((_, dotIdx) => (
//                       <span
//                         key={dotIdx}
//                         className={`w-3 h-3 rounded-full cursor-pointer transition ${
//                           dotIdx === currentIndex
//                             ? "bg-emerald-500"
//                             : "bg-white/50 hover:bg-emerald-500"
//                         }`}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setCurrentIndex(dotIdx);
//                         }}
//                       ></span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               prevSlide();
//             }}
//             className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               nextSlide();
//             }}
//             className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-20 bg-gray-100 px-4 text-center">
//         <h2 className="text-3xl font-bold text-emerald-700 mb-12">How It Works</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
//           {[
//             { icon: "📝", title: "Sign Up", desc: "Create a free account in seconds." },
//             { icon: "🛍️", title: "Shop & Earn", desc: "Earn points at thousands of US retailers." },
//             { icon: "🎁", title: "Redeem Rewards", desc: "Redeem points for vouchers, deals, or gifts." },
//           ].map((item, idx) => (
//             <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
//               <div className="text-4xl mb-4">{item.icon}</div>
//               <h3 className="text-xl font-bold text-emerald-700">{item.title}</h3>
//               <p className="mt-2 text-gray-700">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Stats Section - Dynamic from Backend */}
//       <section className="py-20 bg-white text-center">
//         <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
//           {[
//             { icon: "👥", label: "Members", value: stats.totalUsers },
//             { icon: "🏬", label: "Partner Stores", value: stats.totalShops },
//             { icon: "💵", label: "Rewards Claimed", value: stats.totalTransactionAmount, isMoney: true },
//           ].map((stat, idx) => (
//             <div key={idx}>
//               <div className="text-5xl mb-2">{stat.icon}</div>
//               <h3 className="text-3xl font-bold text-emerald-600">
//                 {loading ? (
//                   "Loading..."
//                 ) : (
//                   <>
//                     <CountUp
//                       end={stat.value}
//                       duration={3}
//                       separator=","
//                       prefix={stat.isMoney ? "$" : ""}
//                     />
//                     {stat.isMoney ? "" : "+"}
//                   </>
//                 )}
//               </h3>
//               <p className="text-gray-600 mt-2">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="py-20 px-4 bg-gray-50">
//         <h2 className="text-3xl font-bold mb-6 text-center text-emerald-700">
//           Why Our Members Love Us
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
//           {[
//             "No membership fees",
//             "Nationwide partners",
//             "Exclusive local deals",
//             "Fast & easy rewards",
//           ].map((benefit, idx) => (
//             <div
//               key={idx}
//               className="bg-emerald-50 p-6 rounded-xl text-center shadow hover:shadow-lg transition"
//             >
//               <p className="text-lg font-medium text-emerald-900">{benefit}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Leaderboard */}
//       <section className="py-20 bg-white text-center px-4">
//         <h2 className="text-3xl font-bold text-emerald-700 mb-6">
//           🏆 Referral Leaderboard (Top 3)
//         </h2>
//         <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {[
//             { name: "Emma", points: 890 },
//             { name: "Jacob", points: 765 },
//             { name: "Sophia", points: 702 },
//           ].map((user, idx) => (
//             <div
//               key={idx}
//               className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition"
//             >
//               <h4 className="text-xl font-semibold text-emerald-700">
//                 {user.name}
//               </h4>
//               <p className="text-gray-600">Referral Points</p>
//               <div className="text-2xl font-bold mt-2 text-blue-500">
//                 {user.points}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-gray-100 px-4 text-center">
//         <h2 className="text-3xl font-bold text-emerald-700 mb-6">
//           What Our Members Say
//         </h2>
//         <Collapse accordion>
//           <Panel header="📥 How do I earn points?" key="1">
//             <p>Simply shop at any of our partner stores and present your member code.</p>
//           </Panel>
//           <Panel header="🎁 Where can I redeem rewards?" key="2">
//             <p>You can redeem rewards in your dashboard or use them at checkout in participating stores.</p>
//           </Panel>
//           <Panel header="💸 Is this program free?" key="3">
//             <p>Yes! Joining and earning is 100% free for all users.</p>
//           </Panel>
//         </Collapse>
//       </section>

//       {/* Final CTA */}
//       <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-center px-4">
//         <h2 className="text-4xl font-bold mb-4">Ready to Earn with Every Purchase?</h2>
//         <p className="mb-6 text-lg">
//           Join thousands already redeeming rewards across the U.S.
//         </p>
//         <button
//           onClick={() => navigate("/signup-user")}
//           className="bg-white text-emerald-700 font-bold px-10 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition duration-300"
//         >
//           Join Loyalty Rewards Free
//         </button>
//       </section>
//     </div>
//   );
// }

// export default Home;













'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Store,
  DollarSign,
  Gift,
  Star,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

// Import your local images
import carousel1 from '../../assets/carousel1.jpg';
import carousel2 from '../../assets/carousel2.jpg';
import carousel3 from '../../assets/carousel3.jpg';
import carousel4 from '../../assets/carousel4.jpg';
import carousel5 from '../../assets/carousel5.jpg';

const heroImages = [carousel1, carousel2, carousel3, carousel4, carousel5];

export default function Home() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalShops: 0,
    totalTransactionAmount: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(
          'https://loyalty-backend-java.onrender.com/api/loyalty_homePage/summary'
        );
        const data = await response.json();
        setStats({
          totalUsers: data.totalUsers || 0,
          totalShops: data.totalShops || 0,
          totalTransactionAmount: data.totalTransactionAmount || 0,
        });
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroImages.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* HERO CAROUSEL */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="relative w-full h-full">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
            </div>
          ))}

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl">
                Earn Rewards on Every Purchase
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md max-w-2xl mx-auto">
                Join thousands of shoppers earning points at local stores. Redeem for gifts, discounts, and more.
              </p>
              {/* <button
                onClick={() => navigate('/signup-user')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 hover:scale-105 transition-all duration-300"
              >
                Start Earning Free
                <ArrowRight className="w-5 h-5" />
              </button> */}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition ${
                  idx === currentIndex ? 'bg-emerald-500 w-8' : 'bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="w-12 h-12 text-emerald-600" />,
                title: 'Sign Up',
                desc: 'Create your free account in under 60 seconds.',
              },
              {
                icon: <Store className="w-12 h-12 text-teal-600" />,
                title: 'Shop & Earn',
                desc: 'Scan your QR code at any partner store to earn points.',
              },
              {
                icon: <Gift className="w-12 h-12 text-indigo-600" />,
                title: 'Redeem Rewards',
                desc: 'Turn points into vouchers, gifts, or cashback instantly.',
              },
            ].map((step, i) => (
              <div
                key={i}
                className="group bg-white rounded-md p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-6 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE STATS */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-emerald-800 mb-12">
            Trusted by Thousands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { Icon: Users, label: 'Active Members', value: stats.totalUsers, prefix: '' },
              { Icon: Store, label: 'Partner Stores', value: stats.totalShops, prefix: '' },
              {
                Icon: DollarSign,
                label: 'Rewards Redeemed',
                value: stats.totalTransactionAmount,
                prefix: '$',
                suffix: '',
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-md p-8 shadow-xl border border-emerald-100"
              >
                <stat.Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <div className="text-3xl font-extrabold text-emerald-700">
                  {loading ? (
                    'Loading...'
                  ) : (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-12">
            Why Members Love Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'No Fees Ever',
              'Nationwide Stores',
              'Instant Rewards',
              'Easy Referral Bonus',
            ].map((benefit, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-md text-center border border-emerald-200 hover:shadow-lg transition"
              >
                <Star className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <p className="font-semibold text-emerald-900">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-emerald-800 mb-12">
            Top Referrers This Month
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { rank: 1, name: 'Emma', points: 890 },
              { rank: 2, name: 'Jacob', points: 765 },
              { rank: 3, name: 'Sophia', points: 702 },
            ].map((user) => (
              <div
                key={user.rank}
                className={`relative bg-white rounded-md p-6 shadow-lg border-2 ${
                  user.rank === 1 ? 'border-yellow-400' : 'border-emerald-200'
                }`}
              >
                {user.rank === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                    #1
                  </div>
                )}
                <h3 className="text-xl font-bold text-emerald-700">{user.name}</h3>
                <p className="text-3xl font-extrabold text-emerald-600 mt-2">
                  {user.points}
                </p>
                <p className="text-sm text-gray-600">Referral Points</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-emerald-800 mb-12">
            Common Questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: 'How do I earn points?',
                a: 'Shop at any partner store and scan your QR code at checkout. Points are added instantly.',
              },
              {
                q: 'Where can I redeem rewards?',
                a: 'Redeem in your dashboard, at checkout in stores, or via the mobile app.',
              },
              {
                q: 'Is it free to join?',
                a: 'Yes! 100% free for all users – no membership fees or hidden charges.',
              },
              {
                q: 'Do my points expire?',
                a: 'No, points do not expire after 12 months of inactivity. Keep shopping to stay active!',
              },
              {
                q: 'How do I check my points balance?',
                a: 'Log in to your dashboard or open the mobile app – your balance is shown on the home screen.',
              },
              {
                q: 'What if I lose my QR code?',
                a: 'No problem! Regenerate your QR code anytime from your profile settings.',
              },
              {
                q: 'Can I use points at any store?',
                a: 'Points work at all participating partner stores. Look for the Loyalty Rewards sign!',
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-gray-50 rounded-md overflow-hidden border border-gray-200 shadow-sm"
              >
                <summary className="flex justify-between items-center p-5 font-semibold text-emerald-800 cursor-pointer hover:bg-emerald-50 transition">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-emerald-600 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-14 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Start Earning Rewards Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 10,000+ members already saving with every purchase.
          </p>
          <button
            onClick={() => navigate('/signup-user')}
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-emerald-700 font-bold text-lg rounded-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Join Free Now
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
}