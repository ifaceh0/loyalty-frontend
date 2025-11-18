// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   CreditCard,
//   User,
//   Shield,
//   Mail,
//   Lock,
//   Puzzle,
//   Key,
//   CheckCircle,
//   ArrowRight,
//   ChevronDown,
//   Zap,
//   AlertCircle,
// } from "lucide-react";

// export default function ShopkeeperFullFlowDemo() {
//   const [showFAQ, setShowFAQ] = useState([]);

//   const SUBSCRIPTION_URL = "https://subscription-frontend-psi.vercel.app/subscription";

//   const steps = [
//     {
//       num: 1,
//       title: "Subscribe to a Plan",
//       desc: "Choose your plan to unlock shopkeeper access. Required first.",
//       highlight: "No subscription = No access",
//       details: ["Instant activation", "Monthly/Yearly", "Cancel anytime", "No card to start"],
//       icon: CreditCard,
//       color: "from-orange-500 to-red-600",
//       bg: "bg-orange-50",
//       border: "border-orange-300",
//       cta: { text: "Subscribe Now", link: SUBSCRIPTION_URL, urgent: true },
//     },
//     {
//       num: 2,
//       title: "Create Your Account",
//       desc: "Enter shop name, email, phone, city & country.",
//       details: ["Shop Name & Logo", "Personal Email", "10-digit Phone", "Location"],
//       icon: User,
//       color: "from-purple-500 to-purple-700",
//       bg: "bg-purple-50",
//       border: "border-purple-300",
//     },
//     {
//       num: 3,
//       title: "Verify Company Email & Enter Company Detailes",
//       desc: "Use your subscribed email. Instant verification.",
//       details: ["Must match subscription", "One-click verify", "Secure & fast"],
//       icon: Shield,
//       color: "from-green-500 to-green-700",
//       bg: "bg-green-50",
//       border: "border-green-300",
//     },
//     {
//         num: 4,
//         title: "Create Password & Verify CAPTCHA",
//         desc: "Secure your account by setting a strong password and proving you're human.",
//         details: [
//             "At least 8 characters long",
//             "Include a number and special symbol",
//             "Complete the visual CAPTCHA",
//             "Prevents automated signups"
//         ],
//         icon: Key,
//         color: "from-blue-500 to-indigo-600",
//         bg: "bg-blue-50",
//         border: "border-blue-300",
//         formPreview: true,
//     },
//     {
//       num: 5,
//       title: "Sign In with Email, Password & CAPTCHA",
//       desc: "Log in securely using your new credentials.",
//       details: ["Email + Password", "CAPTCHA on first login", "2FA optional"],
//       icon: Lock,
//       color: "from-indigo-500 to-indigo-700",
//       bg: "bg-indigo-50",
//       border: "border-indigo-300",
//     //   formPreview: true,
//     },
//     {
//       num: 6,
//       title: "Access Dashboard",
//       desc: "You’re in! Start managing customers, rewards & analytics.",
//       details: ["Real-time dashboard", "Add customers", "Launch campaigns", "View reports"],
//       icon: CheckCircle,
//       color: "from-teal-500 to-teal-700",
//       bg: "bg-teal-50",
//       border: "border-teal-300",
//     },
//   ];

//   const faqs = [
//     {
//         q: "Which email should I use to log in?",
//         a: "Use the **personal email you signed up with** (e.g., john.doe@gmail.com). This is the email you entered during registration – **not** your company email."
//     },
//     {
//         q: "How do I log in to the shopkeeper dashboard?",
//         a: "1. Go to the login page → 2. Enter your **personal email** → 3. Enter your **password** → 4. Solve the **CAPTCHA** (first login or new device) → 5. Click **Sign In**."
//     },
//     {
//         q: "I forgot my password – what should I do?",
//         a: "Click **Forgot Password?** on the login screen. A reset link will be sent to your **personal email**. Check spam/junk if you don’t see it."
//     },
//     {
//         q: "Why can’t I log in with my company email?",
//         a: "Login uses your **personal email only** (the one you registered with). Company email is used for subscription & verification, but **not** for logging in."
//     },
//     {
//         q: "Do I need CAPTCHA every time I log in?",
//         a: "No — only on **first login**, **new device**, or **unusual activity**. After that, you can enable 2FA for faster, secure access."
//     },
//     {
//         q: "Can I log in from multiple devices?",
//         a: "Yes! Use your **personal email + password** on any device. Enable 2FA in settings for extra security on shared computers."
//     },
//     {
//         q: "Why do I need a subscription before creating an account?",
//         a: "Subscription verifies your business and unlocks premium tools. It prevents spam and ensures you get full support from day one."
//     },
//     {
//         q: "Is the dashboard mobile-friendly?",
//         a: "Yes! Fully responsive — manage customers, launch campaigns, and view reports on phone, tablet, or desktop."
//     },
//     {
//         q: "How secure is my data?",
//         a: "We use bank-level AES-256 encryption, GDPR-compliant storage, and regular security audits. Your data is never shared."
//     },
//     {
//         q: "Can I cancel my subscription?",
//         a: "Yes — cancel anytime in **Account → Billing**. Access continues until the end of your current billing cycle."
//     }
//   ];

//   // Points on the curved road (x, y)
//   const roadPoints = [
//     { x: 300, y: 180 },
//     { x: 390, y: 420 },
//     { x: 265, y: 680 },
//     { x: 250, y: 1000 },
//     { x: 240, y: 1570 },
//     { x: 330, y: 1880 },
//   ].slice(0, steps.length);

//   const handleExternalRedirect = (link) => {
//     window.open(link, "_blank"); // opens in new tab
//   };

//   return (
//     <>
//       {/* Background */}
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-purple-50 to-teal-50" />
//         <div className="absolute inset-0 bg-grid opacity-5" />
//       </div>

//       <div className="min-h-screen flex flex-col items-center pt-6 px-4 pb-32">

//         {/* Hero */}
//         <motion.div
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center max-w-5xl mx-auto mb-16"
//         >
//           <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 bg-clip-text text-transparent">
//             Shop Registration Process
//           </h1>
//           <p className="mt-6 text-xl md:text-2xl text-gray-700">
//             Follow the road from <span className="font-bold text-orange-600">subscription</span> to{" "}
//             <span className="font-bold text-teal-600">success</span>
//           </p>
//           <div className="mt-5 flex justify-center gap-3 flex-wrap">
//             <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold flex items-center gap-1">
//               <AlertCircle className="w-4 h-4" /> Step 1 Required
//             </span>
//             <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
//               7–10 mins total
//             </span>
//           </div>
//         </motion.div>

//         {/* SVG Container */}
//         <div className="relative w-full max-w-5xl mx-auto">
//           <svg
//             viewBox="-100 100 820 1980"
//             className="w-full h-auto"
//             preserveAspectRatio="xMidYMid meet"
//           >
//             {/* Curved Road */}
//             <path
//               d="M 300,180 Q 480,400 300,620 Q 120,840 300,1060 Q 480,1280 300,1480 Q 120,1680 300,1850"
//               stroke="#e5e7eb"
//               strokeWidth="26"
//               fill="none"
//               strokeLinecap="round"
//             />
//             <path
//               d="M 300,180 Q 480,400 300,620 Q 120,840 300,1060 Q 480,1280 300,1480 Q 120,1680 300,1850"
//               stroke="url(#roadGradient)"
//               strokeWidth="20"
//               fill="none"
//               strokeLinecap="round"
//               className="animate-draw"
//               style={{ strokeDasharray: 2200, strokeDashoffset: 2200 }}
//             />
//             <defs>
//               <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                 <stop offset="0%" stopColor="#f97316" />
//                 <stop offset="20%" stopColor="#a855f7" />
//                 <stop offset="40%" stopColor="#10b981" />
//                 <stop offset="60%" stopColor="#3b82f6" />
//                 <stop offset="80%" stopColor="#6366f1" />
//                 <stop offset="100%" stopColor="#0d9488" />
//               </linearGradient>
//             </defs>

//             {/* Cards – Left → Right → Left → Right */}
//             {steps.map((step, idx) => {
//               const p = roadPoints[idx];
//               const y = p.y - 80;
//               const isLeft = idx % 2 === 0;
//               const cardX = isLeft ? p.x - 325 : p.x + 45;
//               const align = isLeft ? "text-left" : "text-right";

//               return (
//                 <foreignObject
//                   key={idx}
//                   x={cardX}
//                   y={y}
//                   width="280"
//                   className="overflow-visible"
//                 >
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.85 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: idx * 0.25 }}
//                     className={`w-full p-5 rounded-md shadow-xl border-2 ${step.border} ${step.bg} flex flex-col`}
//                   >
//                     <div className={`flex ${align === "text-right" ? "justify-end" : "justify-start"} mb-3`}>
//                       <div className="p-2.5 bg-white rounded-md shadow-sm">
//                         <step.icon className="w-6 h-6 text-orange-600" />
//                       </div>
//                     </div>

//                     <h3 className={`text-lg font-bold ${align} text-gray-800 mb-2`}>
//                       {step.title}
//                     </h3>

//                     {step.highlight && (
//                       <p className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full inline-block mb-3">
//                         {step.highlight}
//                       </p>
//                     )}

//                     <p className={`text-sm text-gray-600 ${align} mb-3`}>
//                       {step.desc}
//                     </p>

//                     <ul className={`space-y-1 text-xs text-gray-600 ${align} mb-3`}>
//                       {step.details.map((d, i) => (
//                         <li key={i} className="flex items-center gap-1">
//                           <span className="text-orange-500">✔</span>
//                           <span>{d}</span>
//                         </li>
//                       ))}
//                     </ul>

//                     {step.formPreview && (
//                       <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200 shadow-inner space-y-2 text-xs">
//                         {step.title.includes("Password") ? (
//                           <>
//                             <div className="h-9 bg-gray-100 rounded flex items-center px-2">
//                               <Lock className="w-3 h-3 mr-1" /> New password
//                             </div>
//                             <div className="h-9 bg-gray-100 rounded flex items-center px-2">
//                               <Lock className="w-3 h-3 mr-1" /> Confirm password
//                             </div>
//                           </>
//                         ) : (
//                           <>
//                             <div className="h-9 bg-gray-100 rounded flex items-center px-2">
//                               <Mail className="w-3 h-3 mr-1" /> your@email.com
//                             </div>
//                             <div className="h-9 bg-gray-100 rounded flex items-center px-2">
//                               <Lock className="w-3 h-3 mr-1" /> ••••••••
//                             </div>
//                           </>
//                         )}
//                         <div className="h-12 bg-gray-100 rounded flex items-center justify-center">
//                           <Puzzle className="w-5 h-5 text-gray-500" />
//                         </div>
//                         <button className="w-full h-9 bg-teal-600 text-white rounded text-xs font-medium">
//                           {step.title.includes("Password") ? "Set Password" : "Sign In"}
//                         </button>
//                       </div>
//                     )}

//                     {step.cta && (
//                       <a
//                         href={step.cta.link}
//                         className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-bold text-white text-sm transition-all hover:scale-105 shadow-md ${
//                           step.cta.urgent
//                             ? "bg-gradient-to-r from-red-500 to-orange-600 animate-pulse"
//                             : "bg-teal-600"
//                         }`}
//                       >
//                         {step.cta.urgent && <Zap className="w-4 h-4" />}
//                         {step.cta.text}
//                         <ArrowRight className="w-4 h-4" />
//                       </a>
//                     )}
//                   </motion.div>
//                 </foreignObject>
//               );
//             })}

//             {/* ✅ Move Number Circles to the END so they appear on top */}
//             {roadPoints.map((p, i) => (
//               <g key={i}>
//                 <circle
//                   cx={p.x}
//                   cy={p.y}
//                   r="42"
//                   fill="white"
//                   stroke="#f97316"
//                   strokeWidth="6"
//                   className="drop-shadow-lg"
//                 />
//                 <text
//                   x={p.x}
//                   y={p.y + 14}
//                   textAnchor="middle"
//                   fill="#1f2937"
//                   fontSize="36"
//                   fontWeight="bold"
//                   className="pointer-events-none"
//                 >
//                   {steps[i].num}
//                 </text>
//               </g>
//             ))}
//           </svg>
//         </div>

//         {/* Final CTA */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.8 }}
//           className="mt-10 text-center"
//         >
//           <p className="text-lg text-gray-700 mb-4">
//             Ready to launch your loyalty program?
//           </p>
//           <button
//             onClick={() => handleExternalRedirect(SUBSCRIPTION_URL)}
//             className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300"
//           >
//             Start with Subscription <ArrowRight className="w-6 h-6" />
//           </button>
//         </motion.div>

//         {/* FAQ */}
//         <div className="w-full max-w-5xl mx-auto mt-12">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//             Frequently Asked Questions (FAQ)
//           </h2>
//           <div className="space-y-4">
//             {faqs.map((faq, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-white rounded-md shadow-md border border-gray-200 overflow-hidden"
//               >
//                 <button
//                   onClick={() =>
//                     setShowFAQ((prev) => {
//                       const next = [...prev];
//                       next[i] = !next[i];
//                       return next;
//                     })
//                   }
//                   className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
//                 >
//                   <span className="font-semibold text-gray-800 pr-4">{faq.q}</span>
//                   <ChevronDown
//                     className={`w-5 h-5 text-emerald-600 transition-transform ${showFAQ[i] ? "rotate-180" : ""}`}
//                   />
//                 </button>
//                 {showFAQ[i] && (
//                   <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
//                     {faq.a}
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//         <div className="mt-12 text-center">
//             <p className="text-gray-600 mb-4">Still have questions?</p>
//             <a
//                 href="/contact"
//                 className="inline-flex items-center gap-2 px-7 py-3 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition"
//             >
//                 <Mail className="w-5 h-5" /> Contact Support
//             </a>
//         </div>
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes draw {
//           to {
//             stroke-dashoffset: 0;
//           }
//         }
//         .animate-draw {
//           animation: draw 5s ease-out forwards;
//         }
//         .bg-grid {
//           background-image: linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
//           background-size: 60px 60px;
//         }
//       `}</style>
//     </>
//   );
// }















//translate
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  User,
  Shield,
  Mail,
  Lock,
  Puzzle,
  Key,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Zap,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from 'react-i18next'; // ← ONLY ADDED

export default function ShopkeeperFullFlowDemo() {
  const { t } = useTranslation(); // ← ONLY THIS LINE ADDED
  const [showFAQ, setShowFAQ] = useState([]);

  const SUBSCRIPTION_URL = "https://subscription-frontend-psi.vercel.app/subscription";

  const steps = [
    {
      num: 1,
      title: t("flow.steps.1.title"),
      desc: t("flow.steps.1.desc"),
      highlight: t("flow.steps.1.highlight"),
      details: t("flow.steps.1.details", { returnObjects: true }),
      icon: CreditCard,
      color: "from-orange-500 to-red-600",
      bg: "bg-orange-50",
      border: "border-orange-300",
      cta: { text: t("flow.steps.1.cta"), link: SUBSCRIPTION_URL, urgent: true },
    },
    {
      num: 2,
      title: t("flow.steps.2.title"),
      desc: t("flow.steps.2.desc"),
      details: t("flow.steps.2.details", { returnObjects: true }),
      icon: User,
      color: "from-purple-500 to-purple-700",
      bg: "bg-purple-50",
      border: "border-purple-300",
    },
    {
      num: 3,
      title: t("flow.steps.3.title"),
      desc: t("flow.steps.3.desc"),
      details: t("flow.steps.3.details", { returnObjects: true }),
      icon: Shield,
      color: "from-green-500 to-green-700",
      bg: "bg-green-50",
      border: "border-green-300",
    },
    {
      num: 4,
      title: t("flow.steps.4.title"),
      desc: t("flow.steps.4.desc"),
      details: t("flow.steps.4.details", { returnObjects: true }),
      icon: Key,
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
      border: "border-blue-300",
      formPreview: true,
    },
    {
      num: 5,
      title: t("flow.steps.5.title"),
      desc: t("flow.steps.5.desc"),
      details: t("flow.steps.5.details", { returnObjects: true }),
      icon: Lock,
      color: "from-indigo-500 to-indigo-700",
      bg: "bg-indigo-50",
      border: "border-indigo-300",
    },
    {
      num: 6,
      title: t("flow.steps.6.title"),
      desc: t("flow.steps.6.desc"),
      details: t("flow.steps.6.details", { returnObjects: true }),
      icon: CheckCircle,
      color: "from-teal-500 to-teal-700",
      bg: "bg-teal-50",
      border: "border-teal-300",
    },
  ];

  const faqs = t("flow.faqs", { returnObjects: true });

  // Points on the curved road (x, y)
  const roadPoints = [
    { x: 300, y: 180 },
    { x: 390, y: 420 },
    { x: 265, y: 680 },
    { x: 250, y: 1000 },
    { x: 240, y: 1570 },
    { x: 330, y: 1880 },
  ].slice(0, steps.length);

  const handleExternalRedirect = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-purple-50 to-teal-50" />
        <div className="absolute inset-0 bg-grid opacity-5" />
      </div>

      <div className="min-h-screen flex flex-col items-center pt-6 px-4 pb-32">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-5xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 bg-clip-text text-transparent">
            {t("flow.hero.title")}
          </h1>

          <p 
            className="mt-6 text-xl md:text-2xl text-gray-700"
            dangerouslySetInnerHTML={{ __html: t("flow.hero.subtitle") }}
          />

          <div className="mt-5 flex justify-center gap-3 flex-wrap">
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {t("flow.hero.requiredBadge")}
            </span>
            <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
              {t("flow.hero.timeBadge")}
            </span>
          </div>
        </motion.div>

        {/* SVG Container */}
        <div className="relative w-full max-w-5xl mx-auto">
          <svg
            viewBox="-100 100 820 1980"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Curved Road */}
            <path
              d="M 300,180 Q 480,400 300,620 Q 120,840 300,1060 Q 480,1280 300,1480 Q 120,1680 300,1850"
              stroke="#e5e7eb"
              strokeWidth="26"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 300,180 Q 480,400 300,620 Q 120,840 300,1060 Q 480,1280 300,1480 Q 120,1680 300,1850"
              stroke="url(#roadGradient)"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
              className="animate-draw"
              style={{ strokeDasharray: 2200, strokeDashoffset: 2200 }}
            />
            <defs>
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="20%" stopColor="#a855f7" />
                <stop offset="40%" stopColor="#10b981" />
                <stop offset="60%" stopColor="#3b82f6" />
                <stop offset="80%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>

            {/* Cards – Left → Right → Left → Right */}
            {steps.map((step, idx) => {
              const p = roadPoints[idx];
              const y = p.y - 80;
              const isLeft = idx % 2 === 0;
              const cardX = isLeft ? p.x - 325 : p.x + 45;
              const align = isLeft ? "text-left" : "text-right";

              return (
                <foreignObject
                  key={idx}
                  x={cardX}
                  y={y}
                  width="280"
                  className="overflow-visible"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.25 }}
                    className={`w-full p-5 rounded-md shadow-xl border-2 ${step.border} ${step.bg} flex flex-col`}
                  >
                    <div className={`flex ${align === "text-right" ? "justify-end" : "justify-start"} mb-3`}>
                      <div className="p-2.5 bg-white rounded-md shadow-sm">
                        <step.icon className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>

                    <h3 className={`text-lg font-bold ${align} text-gray-800 mb-2`}>
                      {step.title}
                    </h3>

                    {step.highlight && (
                      <p className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full inline-block mb-3">
                        {step.highlight}
                      </p>
                    )}

                    <p className={`text-sm text-gray-600 ${align} mb-3`}>
                      {step.desc}
                    </p>

                    <ul className={`space-y-1 text-xs text-gray-600 ${align} mb-3`}>
                      {step.details.map((d, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <span className="text-orange-500">✔</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    {step.formPreview && (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200 shadow-inner space-y-2 text-xs">
                        {step.title.includes("Password") || step.title.includes("Contraseña") ? (
                          <>
                            <div className="h-9 bg-gray-100 rounded flex items-center px-2">
                              <Lock className="w-3 h-3 mr-1" /> {t("flow.form.password")}
                            </div>
                            <div className="h-9 bg-gray-100 rounded flex items-center px-2">
                              <Lock className="w-3 h-3 mr-1" /> {t("flow.form.confirmPassword")}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="h-9 bg-gray-100 rounded flex items-center px-2">
                              <Mail className="w-3 h-3 mr-1" /> your@email.com
                            </div>
                            <div className="h-9 bg-gray-100 rounded flex items-center px-2">
                              <Lock className="w-3 h-3 mr-1" /> ••••••••
                            </div>
                          </>
                        )}
                        <div className="h-12 bg-gray-100 rounded flex items-center justify-center">
                          <Puzzle className="w-5 h-5 text-gray-500" />
                        </div>
                        <button className="w-full h-9 bg-teal-600 text-white rounded text-xs font-medium">
                          {step.title.includes("Password") || step.title.includes("Contraseña") 
                            ? t("flow.form.setPassword") 
                            : t("flow.form.signIn")}
                        </button>
                      </div>
                    )}

                    {step.cta && (
                      <a
                        href={step.cta.link}
                        className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-bold text-white text-sm transition-all hover:scale-105 shadow-md ${
                          step.cta.urgent
                            ? "bg-gradient-to-r from-red-500 to-orange-600 animate-pulse"
                            : "bg-teal-600"
                        }`}
                      >
                        {step.cta.urgent && <Zap className="w-4 h-4" />}
                        {step.cta.text}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </motion.div>
                </foreignObject>
              );
            })}

            {/* Move Number Circles to the END so they appear on top */}
            {roadPoints.map((p, i) => (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="42"
                  fill="white"
                  stroke="#f97316"
                  strokeWidth="6"
                  className="drop-shadow-lg"
                />
                <text
                  x={p.x}
                  y={p.y + 14}
                  textAnchor="middle"
                  fill="#1f2937"
                  fontSize="36"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {steps[i].num}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-10 text-center"
        >
          <p className="text-lg text-gray-700 mb-4">
            {t("flow.finalCTA.text")}
          </p>
          <button
            onClick={() => handleExternalRedirect(SUBSCRIPTION_URL)}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300"
          >
            {t("flow.finalCTA.button")} <ArrowRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* FAQ */}
        <div className="w-full max-w-5xl mx-auto mt-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            {t("flow.faqTitle")}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-md shadow-md border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setShowFAQ((prev) => {
                      const next = [...prev];
                      next[i] = !next[i];
                      return next;
                    })
                  }
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-800 pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-600 transition-transform ${showFAQ[i] ? "rotate-180" : ""}`}
                  />
                </button>
                {showFAQ[i] && (
                  <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
                    <div dangerouslySetInnerHTML={{ __html: faq.a }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">{t("flow.support.text")}</p>
            <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition"
            >
                <Mail className="w-5 h-5" /> {t("flow.support.button")}
            </a>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw {
          animation: draw 5s ease-out forwards;
        }
        .bg-grid {
          background-image: linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>
    </>
  );
}