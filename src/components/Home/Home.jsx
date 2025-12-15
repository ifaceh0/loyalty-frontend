// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CountUp from 'react-countup';
// import {
//   ChevronLeft,
//   ChevronRight,
//   Users,
//   Store,
//   DollarSign,
//   Gift,
//   Star,
//   ArrowRight,
//   CheckCircle,
//   Crown,
//   Zap,
//   Heart,
//   Coffee,
//   ShoppingBag,
//   Utensils,
//   Car,
//   Gamepad2,
//   Smartphone,
//   Bell,
//   TrendingUp,
//   Award,
//   UserPlus,
//   Calendar,
//   MapPin,
// } from 'lucide-react';

// // Import your local images
// import carousel1 from '../../assets/carousel1.jpg';
// import carousel2 from '../../assets/carousel2.jpg';
// import carousel3 from '../../assets/carousel3.jpg';
// import carousel4 from '../../assets/carousel4.jpg';
// import carousel5 from '../../assets/carousel5.jpg';

// const heroImages = [carousel1, carousel2, carousel3, carousel4, carousel5];

// export default function Home() {
//   const navigate = useNavigate();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalShops: 0,
//     totalTransactionAmount: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const response = await fetch(
//           'https://loyalty-backend-java.onrender.com/api/loyalty_homePage/summary'
//         );
//         const data = await response.json();
//         setStats({
//           totalUsers: data.totalUsers || 0,
//           totalShops: data.totalShops || 0,
//           totalTransactionAmount: data.totalTransactionAmount || 0,
//         });
//       } catch (error) {
//         console.error('Failed to fetch summary:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSummary();
//   }, []);

//   // Auto-slide
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % heroImages.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
//   const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroImages.length);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
//       {/* HERO CAROUSEL */}
//       <section className="relative h-[600px] overflow-hidden">
//         <div className="relative w-full h-full">
//           {heroImages.map((img, idx) => (
//             <div
//               key={idx}
//               className={`absolute inset-0 transition-opacity duration-1000 ${
//                 idx === currentIndex ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               <img
//                 src={img}
//                 alt={`Slide ${idx + 1}`}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
//             </div>
//           ))}

//           {/* Content */}
//           <div className="absolute inset-0 flex items-center justify-center text-center px-6">
//             <div className="max-w-4xl">
//               <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl">
//                 Earn Rewards on Every Purchase
//               </h1>
//               <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md max-w-2xl mx-auto">
//                 Join thousands of shoppers earning points at local stores. Redeem for gifts, discounts, and more.
//               </p>
//               <button
//                 onClick={() => navigate('/signup-user')}
//                 className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 hover:scale-105 transition-all duration-300"
//               >
//                 Start Earning Free
//                 <ArrowRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Navigation */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               prevSlide();
//             }}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               nextSlide();
//             }}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>

//           {/* Dots */}
//           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
//             {heroImages.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setCurrentIndex(idx);
//                 }}
//                 className={`w-3 h-3 rounded-full transition ${
//                   idx === currentIndex ? 'bg-emerald-500 w-8' : 'bg-white/60 hover:bg-white'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* MEMBERSHIP TIERS */}
//       {/* <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-blue-50">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-blue-700 bg-clip-text text-transparent mb-4">
//             Membership Levels
//           </h2>
//           <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
//             The more you shop, the more you earn! Unlock exclusive benefits as you level up.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 tier: 'Bronze',
//                 color: 'from-orange-400 to-orange-600',
//                 bgColor: 'bg-orange-50',
//                 borderColor: 'border-orange-200',
//                 icon: <Star className="w-8 h-8" />,
//                 points: '1x Points',
//                 perks: ['Basic rewards', 'Birthday bonus', 'Welcome gift'],
//                 requirement: 'Join for free',
//               },
//               {
//                 tier: 'Silver',
//                 color: 'from-gray-400 to-gray-600',
//                 bgColor: 'bg-gray-50',
//                 borderColor: 'border-gray-200',
//                 icon: <Award className="w-8 h-8" />,
//                 points: '1.5x Points',
//                 perks: ['Faster point earning', 'Exclusive deals', 'Priority support'],
//                 requirement: '$500 spent',
//                 popular: false,
//               },
//               {
//                 tier: 'Gold',
//                 color: 'from-yellow-400 to-yellow-600',
//                 bgColor: 'bg-yellow-50',
//                 borderColor: 'border-yellow-200',
//                 icon: <Crown className="w-8 h-8" />,
//                 points: '2x Points',
//                 perks: ['Double points', 'VIP events', 'Free delivery', 'Personal shopper'],
//                 requirement: '$1000 spent',
//                 popular: true,
//               },
//             ].map((tier, i) => (
//               <div
//                 key={i}
//                 className={`relative ${tier.bgColor} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${tier.borderColor} ${
//                   tier.popular ? 'scale-105 ring-2 ring-yellow-300' : ''
//                 }`}
//               >
//                 {tier.popular && (
//                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-bold px-4 py-1 rounded-full">
//                     Most Popular
//                   </div>
//                 )}
//                 <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${tier.color} text-white mb-4`}>
//                   {tier.icon}
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">{tier.tier}</h3>
//                 <p className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-1">
//                   {tier.points}
//                 </p>
//                 <p className="text-sm text-gray-600 mb-6">{tier.requirement}</p>
//                 <ul className="space-y-2 mb-6">
//                   {tier.perks.map((perk, j) => (
//                     <li key={j} className="flex items-center text-sm text-gray-700">
//                       <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
//                       {perk}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* HOW IT WORKS */}
//       <section className="py-20 px-4">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-12">
//             How It Works
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <CheckCircle className="w-12 h-12 text-emerald-600" />,
//                 title: 'Sign Up',
//                 desc: 'Create your free account in under 60 seconds.',
//               },
//               {
//                 icon: <Store className="w-12 h-12 text-teal-600" />,
//                 title: 'Shop & Earn',
//                 desc: 'Scan your QR code at any partner store to earn points.',
//               },
//               {
//                 icon: <Gift className="w-12 h-12 text-indigo-600" />,
//                 title: 'Redeem Rewards',
//                 desc: 'Turn points into vouchers, gifts, or cashback instantly.',
//               },
//             ].map((step, i) => (
//               <div
//                 key={i}
//                 className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
//               >
//                 <div className="mb-6 flex justify-center">{step.icon}</div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition">
//                   {step.title}
//                 </h3>
//                 <p className="text-gray-600">{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* PARTNER STORE CATEGORIES */}
//       <section className="py-20 px-4 bg-white">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
//             Shop at Your Favorite Places
//           </h2>
//           <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
//             Earn points at thousands of partner stores across multiple categories
//           </p>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
//             {[
//               { icon: <Coffee className="w-8 h-8" />, name: 'Cafés', count: '120+' },
//               { icon: <Utensils className="w-8 h-8" />, name: 'Restaurants', count: '250+' },
//               { icon: <ShoppingBag className="w-8 h-8" />, name: 'Retail', count: '180+' },
//               { icon: <Car className="w-8 h-8" />, name: 'Gas Stations', count: '90+' },
//               { icon: <Heart className="w-8 h-8" />, name: 'Beauty', count: '75+' },
//               { icon: <Gamepad2 className="w-8 h-8" />, name: 'Entertainment', count: '60+' },
//             ].map((category, i) => (
//               <div
//                 key={i}
//                 className="group bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
//               >
//                 <div className="text-emerald-600 flex justify-center mb-3 group-hover:scale-110 transition-transform">
//                   {category.icon}
//                 </div>
//                 <h4 className="font-bold text-emerald-900 mb-1">{category.name}</h4>
//                 <p className="text-sm text-emerald-700">{category.count} stores</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* LIVE STATS */}
//       <section className="py-20 bg-gradient-to-r from-emerald-50 to-teal-50">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           <h2 className="text-4xl font-extrabold text-emerald-800 mb-12">
//             Trusted by Thousands
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {[
//               { Icon: Users, label: 'Active Members', value: stats.totalUsers, prefix: '' },
//               { Icon: Store, label: 'Partner Stores', value: stats.totalShops, prefix: '' },
//               {
//                 Icon: DollarSign,
//                 label: 'Rewards Redeemed',
//                 value: stats.totalTransactionAmount,
//                 prefix: '$',
//                 suffix: '',
//               },
//             ].map((stat, i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-xl p-8 shadow-xl border border-emerald-100"
//               >
//                 <stat.Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
//                 <div className="text-3xl font-extrabold text-emerald-700">
//                   {loading ? (
//                     'Loading...'
//                   ) : (
//                     <CountUp
//                       end={stat.value}
//                       duration={2.5}
//                       separator=","
//                       prefix={stat.prefix}
//                       suffix={stat.suffix}
//                     />
//                   )}
//                 </div>
//                 <p className="text-gray-600 mt-2">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* MOBILE APP FEATURES */}
//       <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
//               Mobile App Features
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Take your rewards with you everywhere. Our mobile app makes earning and redeeming points easier than ever.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: <Smartphone className="w-8 h-8" />,
//                 title: 'Digital QR Code',
//                 desc: 'Never forget your card again with built-in QR scanning',
//               },
//               {
//                 icon: <Bell className="w-8 h-8" />,
//                 title: 'Smart Notifications',
//                 desc: 'Get alerts for nearby deals and bonus point opportunities',
//               },
//               {
//                 icon: <MapPin className="w-8 h-8" />,
//                 title: 'Store Locator',
//                 desc: 'Find partner stores near you with GPS integration',
//               },
//               {
//                 icon: <TrendingUp className="w-8 h-8" />,
//                 title: 'Progress Tracking',
//                 desc: 'Monitor your points, tier progress, and spending history',
//               },
//             ].map((feature, i) => (
//               <div
//                 key={i}
//                 className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
//               >
//                 <div className="text-blue-600 mb-4">{feature.icon}</div>
//                 <h4 className="font-bold text-blue-900 mb-2">{feature.title}</h4>
//                 <p className="text-sm text-gray-600">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* REFERRAL PROGRAM */}
//       {/* <section className="py-20 px-4 bg-white">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
//             Refer Friends, Earn More
//           </h2>
//           <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
//             Share the love and get rewarded! Both you and your friends earn bonus points when they join.
//           </p>
//           <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
//               <div>
//                 <UserPlus className="w-12 h-12 mx-auto mb-4" />
//                 <h4 className="text-xl font-bold mb-2">Invite Friends</h4>
//                 <p className="text-emerald-100">Share your unique referral code</p>
//               </div>
//               <div>
//                 <Gift className="w-12 h-12 mx-auto mb-4" />
//                 <h4 className="text-xl font-bold mb-2">They Get 500 Points</h4>
//                 <p className="text-emerald-100">Welcome bonus for new members</p>
//               </div>
//               <div>
//                 <Star className="w-12 h-12 mx-auto mb-4" />
//                 <h4 className="text-xl font-bold mb-2">You Get 1000 Points</h4>
//                 <p className="text-emerald-100">Referral bonus for you</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section> */}

//       {/* SEASONAL PROMOTIONS */}
//       <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent mb-12">
//             Limited Time Offers
//           </h2>

//           {/* Only 3 Demo Promotions — Always Visible */}
//           {(() => {
//             const demoBonuses = [
//               {
//                 name: "Black Friday Triple Points",
//                 dollartoPointsMapping: "15",
//                 startDate: "2025-11-28",
//                 endDate: "2025-12-01",
//               },
//               {
//                 name: "Weekend Double Points Blast",
//                 dollartoPointsMapping: "10",
//                 startDate: "2025-11-21",
//                 endDate: "2025-11-23",
//               },
//               {
//                 name: "New Year 5X Points Week",
//                 dollartoPointsMapping: "25",
//                 startDate: "2025-12-30",
//                 endDate: "2026-01-05",
//               },
//               {
//                 name: "Holiday Shopping Spree",
//                 dollartoPointsMapping: "20",
//                 startDate: "2025-12-20",
//                 endDate: "2025-12-25",
//               },
//             ];

//             return (
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-8xl mx-auto">
//                 {demoBonuses.map((bonus, index) => (
//                   <div
//                     key={index}
//                     className="bg-white rounded-xl p-8 shadow-lg border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
//                     style={{
//                       borderColor:
//                         index === 0
//                           ? "#10b981"
//                           : index % 3 === 0
//                           ? "#c084fc"
//                           : index % 3 === 1
//                           ? "#f472b6"
//                           : "#8b5cf6",
//                     }}
//                   >
//                     <div className="flex items-center justify-center mb-4">
//                       {bonus.isChallenge ? (
//                         <Zap className="w-9 h-9 text-emerald-600 mr-2 animate-pulse" />
//                       ) : (
//                         <Calendar className="w-9 h-9 text-purple-600 mr-2" />
//                       )}
//                       <span
//                         className={`text-sm px-4 py-1.5 rounded-full font-bold tracking-wider ${
//                           bonus.isChallenge
//                             ? "bg-emerald-100 text-emerald-800"
//                             : index === 0
//                             ? "bg-purple-100 text-purple-800"
//                             : "bg-pink-100 text-pink-800"
//                         }`}
//                       >
//                         {new Date(bonus.startDate).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric",
//                         })}{" "}
//                         –{" "}
//                         {new Date(bonus.endDate).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </span>
//                     </div>

//                     <h4 className="text-2xl font-bold text-gray-900 mb-3">
//                       {bonus.name}
//                     </h4>

//                     <p className="text-gray-600 mb-6 leading-relaxed">
//                       {bonus.isChallenge
//                         ? "Shop at 5+ stores and unlock a huge bonus!"
//                         : `Earn ${bonus.dollartoPointsMapping} points per $1 spent`}
//                     </p>

//                     <div className="text-4xl font-extrabold">
//                       {bonus.isChallenge ? (
//                         <span className="text-emerald-600">
//                           +{bonus.bonusPoints.toLocaleString()} PTS
//                         </span>
//                       ) : (
//                         <span className={index === 0 ? "text-purple-600" : "text-pink-600"}>
//                           {bonus.dollartoPointsMapping}X POINTS
//                         </span>
//                       )}
//                     </div>

//                     {!bonus.isChallenge && (
//                       <p className="text-sm text-gray-500 mt-3">
//                         Normal rate: 5 points per $1
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             );
//           })()}

//           <div className="mt-16">
//             <p className="text-lg text-gray-700 font-medium">
//               More offers coming soon — stay loyal!
//             </p>
//           </div>
//         </div>
//       </section>
//       {/* BENEFITS */}
//       <section className="py-20 px-4 bg-white">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-12">
//             Why Members Love Us
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               'No Fees Ever',
//               'Nationwide Stores',
//               'Instant Rewards',
//               'Easy Referral Bonus',
//             ].map((benefit, i) => (
//               <div
//                 key={i}
//                 className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl text-center border border-emerald-200 hover:shadow-lg transition"
//               >
//                 <Star className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
//                 <p className="font-semibold text-emerald-900">{benefit}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CUSTOMER TESTIMONIALS */}
//       <section className="py-20 px-4 bg-gray-50">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-extrabold text-emerald-800 mb-12">
//             What Our Members Say
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: 'Sarah Johnson',
//                 location: 'New York',
//                 review: 'I\'ve earned over $200 in rewards just from my regular shopping. The app is so easy to use!',
//                 rating: 5,
//                 points: '15,420 points earned',
//               },
//               {
//                 name: 'Mike Chen',
//                 location: 'California',
//                 review: 'Love discovering new local businesses through the app. The rewards are just a bonus!',
//                 rating: 5,
//                 points: '8,750 points earned',
//               },
//               {
//                 name: 'Emily Davis',
//                 location: 'Texas',
//                 review: 'The referral program is amazing! I\'ve invited 10 friends and we all benefit.',
//                 rating: 5,
//                 points: '22,100 points earned',
//               },
//             ].map((testimonial, i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
//               >
//                 <div className="flex justify-center mb-3">
//                   {[...Array(testimonial.rating)].map((_, j) => (
//                     <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-700 italic mb-4">"{testimonial.review}"</p>
//                 <div className="border-t pt-4">
//                   <h5 className="font-bold text-emerald-900">{testimonial.name}</h5>
//                   <p className="text-sm text-gray-600">{testimonial.location}</p>
//                   <p className="text-sm text-emerald-600 font-semibold mt-1">{testimonial.points}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* LEADERBOARD */}
//       <section className="py-20 bg-gray-50 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-extrabold text-emerald-800 mb-12">
//             Top Referrers This Month
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             {[
//               { rank: 1, name: 'Emma', points: 890 },
//               { rank: 2, name: 'Jacob', points: 765 },
//               { rank: 3, name: 'Sophia', points: 702 },
//             ].map((user) => (
//               <div
//                 key={user.rank}
//                 className={`relative bg-white rounded-xl p-6 shadow-lg border-2 ${
//                   user.rank === 1 ? 'border-yellow-400' : 'border-emerald-200'
//                 }`}
//               >
//                 {user.rank === 1 && (
//                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full">
//                     #1
//                   </div>
//                 )}
//                 <h3 className="text-xl font-bold text-emerald-700">{user.name}</h3>
//                 <p className="text-3xl font-extrabold text-emerald-600 mt-2">
//                   {user.points}
//                 </p>
//                 <p className="text-sm text-gray-600">Referral Points</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ ACCORDION */}
//       <section className="py-20 px-4 bg-white">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-4xl font-extrabold text-center text-emerald-800 mb-12">
//             Common Questions
//           </h2>
//           <div className="space-y-3">
//             {[
//               {
//                 q: 'How do I earn points?',
//                 a: 'Shop at any partner store and scan your QR code at checkout. Points are added instantly.',
//               },
//               {
//                 q: 'Where can I redeem rewards?',
//                 a: 'Redeem in your dashboard, at checkout in stores, or via the mobile app.',
//               },
//               {
//                 q: 'Is it free to join?',
//                 a: 'Yes! 100% free for all users – no membership fees or hidden charges.',
//               },
//               {
//                 q: 'Do my points expire?',
//                 a: 'Points remain active as long as you make at least one purchase every 12 months.',
//               },
//               {
//                 q: 'How do I check my points balance?',
//                 a: 'Log in to your dashboard or open the mobile app – your balance is shown on the home screen.',
//               },
//               {
//                 q: 'What if I lose my QR code?',
//                 a: 'No problem! Regenerate your QR code anytime from your profile settings.',
//               },
//               {
//                 q: 'Can I use points at any store?',
//                 a: 'Points work at all participating partner stores. Look for the Loyalty Rewards sign!',
//               },
//               {
//                 q: 'How does the referral program work?',
//                 a: 'Share your unique referral code with friends. They get 500 points when they join and make their first purchase, and you get 1000 points!',
//               },
//             ].map((faq, i) => (
//               <details
//                 key={i}
//                 className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm"
//               >
//                 <summary className="flex justify-between items-center p-5 font-semibold text-emerald-800 cursor-pointer hover:bg-emerald-50 transition">
//                   {faq.q}
//                   <ChevronRight className="w-5 h-5 text-emerald-600 group-open:rotate-90 transition-transform" />
//                 </summary>
//                 <div className="px-5 pb-5 text-gray-700 leading-relaxed">
//                   {faq.a}
//                 </div>
//               </details>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FINAL CTA */}
//       <section className="py-14 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center px-4">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
//             Start Earning Rewards Today
//           </h2>
//           <p className="text-xl mb-8 opacity-90">
//             Join 10,000+ members already saving with every purchase.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
//             <button
//               onClick={() => navigate('/signup-user')}
//               className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-700 font-bold text-lg rounded-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
//             >
//               Join Free Now
//               <ArrowRight className="w-6 h-6" />
//             </button>
//             <button
//               onClick={() => navigate('/signup-business')}
//               className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-sm shadow-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
//             >
//               Partner Your Business
//               <Store className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }













//translate
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
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
  Crown,
  Zap,
  Heart,
  Coffee,
  ShoppingBag,
  Utensils,
  Car,
  Gamepad2,
  Smartphone,
  Bell,
  TrendingUp,
  Award,
  UserPlus,
  Calendar,
  MapPin,
} from 'lucide-react';

import carousel1 from '../../assets/carousel1.jpg';
import carousel2 from '../../assets/carousel2.jpg';
import carousel3 from '../../assets/carousel3.jpg';
import carousel4 from '../../assets/carousel4.jpg';
import carousel5 from '../../assets/carousel5.jpg';

const heroImages = [carousel1, carousel2, carousel3, carousel4, carousel5];

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalShops: 0,
    totalTransactionAmount: 0,
  });
  const [loading, setLoading] = useState(true);

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
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
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
                alt={t(`home.hero.slides.${idx}`) || `Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
            </div>
          ))}

          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md max-w-2xl mx-auto">
                {t('home.hero.subtitle')}
              </p>
              {/* <button
                onClick={() => navigate('/signup-user')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded shadow-lg hover:bg-emerald-700 hover:scale-105 transition-all duration-300"
              >
                {t('home.hero.cta')}
                <ArrowRight className="w-5 h-5" />
              </button> */}
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`w-3 h-3 rounded-full transition ${
                  idx === currentIndex ? 'bg-emerald-500 w-8' : 'bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-12">
            {t('home.howItWorks.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <CheckCircle className="w-12 h-12 text-emerald-600" />, title: t('home.howItWorks.steps.0.title'), desc: t('home.howItWorks.steps.0.desc') },
              { icon: <Store className="w-12 h-12 text-teal-600" />, title: t('home.howItWorks.steps.1.title'), desc: t('home.howItWorks.steps.1.desc') },
              { icon: <Gift className="w-12 h-12 text-indigo-600" />, title: t('home.howItWorks.steps.2.title'), desc: t('home.howItWorks.steps.2.desc') },
            ].map((step, i) => (
              <div key={i} className="group bg-white rounded p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
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

      {/* PARTNER STORE CATEGORIES */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
            {t('home.categories.title')}
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('home.categories.subtitle')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: <Coffee className="w-8 h-8" />, name: t('home.categories.items.0.name'), count: t('home.categories.items.0.count') },
              { icon: <Utensils className="w-8 h-8" />, name: t('home.categories.items.1.name'), count: t('home.categories.items.1.count') },
              { icon: <ShoppingBag className="w-8 h-8" />, name: t('home.categories.items.2.name'), count: t('home.categories.items.2.count') },
              { icon: <Car className="w-8 h-8" />, name: t('home.categories.items.3.name'), count: t('home.categories.items.3.count') },
              { icon: <Heart className="w-8 h-8" />, name: t('home.categories.items.4.name'), count: t('home.categories.items.4.count') },
              { icon: <Gamepad2 className="w-8 h-8" />, name: t('home.categories.items.5.name'), count: t('home.categories.items.5.count') },
            ].map((category, i) => (
              <div key={i} className="group bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="text-emerald-600 flex justify-center mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h4 className="font-bold text-emerald-900 mb-1">{category.name}</h4>
                <p className="text-sm text-emerald-700">{category.count} {t('home.categories.stores')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE STATS */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-800 mb-12">
            {t('home.stats.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { Icon: Users, label: t('home.stats.items.0.label'), value: stats.totalUsers },
              { Icon: Store, label: t('home.stats.items.1.label'), value: stats.totalShops },
              { Icon: DollarSign, label: t('home.stats.items.2.label'), value: stats.totalTransactionAmount, prefix: '$' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded p-8 shadow-xl border border-emerald-100">
                <stat.Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <div className="text-3xl font-extrabold text-emerald-700">
                  {loading ? '.....' : <CountUp end={stat.value} duration={2.5} separator="," prefix={stat.prefix || ''} />}
                </div>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE APP FEATURES */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
              {t('home.mobile.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.mobile.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Smartphone className="w-8 h-8" />, title: t('home.mobile.features.0.title'), desc: t('home.mobile.features.0.desc') },
              { icon: <Bell className="w-8 h-8" />, title: t('home.mobile.features.1.title'), desc: t('home.mobile.features.1.desc') },
              { icon: <MapPin className="w-8 h-8" />, title: t('home.mobile.features.2.title'), desc: t('home.mobile.features.2.desc') },
              { icon: <TrendingUp className="w-8 h-8" />, title: t('home.mobile.features.3.title'), desc: t('home.mobile.features.3.desc') },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h4 className="font-bold text-blue-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEASONAL PROMOTIONS */}
      {/* <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent mb-12">
            {t('home.promotions.title')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {t('home.promotions.items', { returnObjects: true }).map((bonus, index) => (
              <div
                key={index}
                className="bg-white rounded p-8 shadow-lg border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  borderColor: index === 0 ? "#10b981" : index % 3 === 0 ? "#c084fc" : index % 3 === 1 ? "#f472b6" : "#8b5cf6",
                }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="w-9 h-9 text-purple-600 mr-2" />
                  <span className="text-sm px-4 py-1.5 rounded-full font-bold tracking-wider bg-purple-100 text-purple-800">
                    {new Date(bonus.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} –{" "}
                    {new Date(bonus.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-gray-900 mb-3">{bonus.name}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t('home.promotions.earnPoints', { rate: bonus.dollartoPointsMapping })}
                </p>

                <div className="text-2xl font-extrabold text-purple-600">
                  {bonus.dollartoPointsMapping}X POINTS
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  {t('home.promotions.normalRate')}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="text-lg text-gray-700 font-medium">
              {t('home.promotions.moreComing')}
            </p>
          </div>
        </div>
      </section> */}

      {/* BENEFITS */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-12">
            {t('home.benefits.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t('home.benefits.items', { returnObjects: true }).map((benefit, i) => (
              <div key={i} className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded text-center border border-emerald-200 hover:shadow-lg transition">
                <Star className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <p className="font-semibold text-emerald-900">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-800 mb-12">
            {t('home.testimonials.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t('home.testimonials.items', { returnObjects: true }).map((testimonial, i) => (
              <div key={i} className="bg-white rounded p-6 shadow-lg border border-gray-200">
                <div className="flex justify-center mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.review}"</p>
                <div className="border-t pt-4">
                  <h5 className="font-bold text-emerald-900">{testimonial.name}</h5>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <p className="text-sm text-emerald-600 font-semibold mt-1">{testimonial.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="py-16 md:py-20 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-800 mb-12">
            {t('home.leaderboard.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t('home.leaderboard.items', { returnObjects: true }).map((user) => (
              <div key={user.rank} className={`relative bg-white rounded p-6 shadow-lg border-2 ${user.rank === 1 ? 'border-yellow-400' : 'border-emerald-200'}`}>
                {user.rank === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                    #1
                  </div>
                )}
                <h3 className="text-xl font-bold text-emerald-700">{user.name}</h3>
                <p className="text-3xl font-extrabold text-emerald-600 mt-2">{user.points}</p>
                <p className="text-sm text-gray-600">{t('home.leaderboard.points')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-emerald-800 mb-12">
            {t('home.faq.title')}
          </h2>
          <div className="space-y-3">
            {t('home.faq.items', { returnObjects: true }).map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded overflow-hidden border border-gray-200 shadow-sm">
                <summary className="flex justify-between items-center p-5 font-semibold text-emerald-800 cursor-pointer hover:bg-emerald-50 transition">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-emerald-600 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-700 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-14 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            {t('home.finalCTA.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('home.finalCTA.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => navigate('/signup-user')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-700 font-bold text-lg rounded shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              {t('home.finalCTA.userCTA')}
              <ArrowRight className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate('/signup-shopkeeper')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded shadow-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              {t('home.finalCTA.businessCTA')}
              <Store className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}