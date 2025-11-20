// import React from "react";
// import { Star, Package, RefreshCw, Zap, Compass, Shield, ArrowRight } from "lucide-react";

// const FeatureCard = ({ icon, title, description, gradient }) => (
//   <div className="group relative overflow-hidden rounded-md bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100">
//     <div
//       className={`absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-15 blur-3xl ${gradient}`}
//     />
//     <div className="relative z-10">
//       <div
//         className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${gradient} p-2.5 text-white`}
//       >
//         {React.cloneElement(icon, { className: "h-6 w-6" })}
//       </div>
//       <h3 className="mb-2 text-lg font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
//         {title}
//       </h3>
//       <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
//     </div>
//   </div>
// );

// const SubscriptionDashboard = () => {
//   // Always get the latest email from localStorage
//   const companyEmail =
//     typeof window !== "undefined" ? localStorage.getItem("companyEmail") || "" : "";

//   const subscriptionUrl = `https://subscription-frontend-psi.vercel.app/subscription-dashboard?email=${encodeURIComponent(
//     companyEmail
//   )}`;

//   const features = [
//     {
//       icon: <Star />,
//       title: "Premium Tools",
//       description: "Get powerful tools to grow your sales and manage your shop easily.",
//       gradient: "from-yellow-400 to-amber-500",
//     },
//     {
//       icon: <Package />,
//       title: "Manage All Apps",
//       description: "Control all your apps (POS, inventory, etc.) from one place.",
//       gradient: "from-green-400 to-emerald-500",
//     },
//     {
//       icon: <RefreshCw />,
//       title: "Always On & Updated",
//       description: "Your system works 24/7. We update it automatically – no hassle.",
//       gradient: "from-indigo-400 to-blue-500",
//     },
//     {
//       icon: <Zap />,
//       title: "Super Fast",
//       description: "Fast billing, instant sync – no waiting, even during rush hours.",
//       gradient: "from-red-400 to-rose-500",
//     },
//     {
//       icon: <Compass />,
//       title: "Smart Reports",
//       description: "See daily sales, top items, and profit – in simple charts.",
//       gradient: "from-orange-400 to-amber-500",
//     },
//     {
//       icon: <Shield />,
//       title: "100% Safe & Secure",
//       description: "Your data is protected with bank-level security.",
//       gradient: "from-teal-400 to-cyan-500",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* ==================== HERO SECTION ==================== */}
//       <header className="bg-gradient-to-r from-teal-600 to-indigo-600 py-16 rounded-t-md text-center text-white">
//         <div className="mx-auto max-w-5xl px-4">
//           <h1 className="mb-3 text-3xl md:text-4xl font-bold">
//             Welcome to Your Shop Dashboard
//           </h1>
//           <p className="mb-6 text-lg md:text-xl text-teal-100">
//             Manage your subscription, see what you get, and grow your business – all in one place.
//           </p>

//           {/* Main CTA Button */}
//           <a
//             href={subscriptionUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-teal-700 shadow-lg transition-all hover:scale-105 hover:bg-teal-50"
//           >
//             Open My Dashboard
//             <ArrowRight className="h-5 w-5" />
//           </a>
//         </div>
//       </header>

//       {/* ==================== FEATURES GRID ==================== */}
//       <section className="mx-auto max-w-5xl px-4 py-14">
//         <h2 className="mb-10 text-center text-2xl md:text-3xl font-bold text-gray-800">
//           What You Get with Your Plan
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {features.map((f, i) => (
//             <FeatureCard
//               key={i}
//               icon={f.icon}
//               title={f.title}
//               description={f.description}
//               gradient={f.gradient}
//             />
//           ))}
//         </div>
//       </section>

//       <section className="mx-auto max-w-5xl px-4 pb-16">
//         <div className="rounded-md bg-gradient-to-r from-teal-50 to-indigo-50 p-8 shadow-lg border border-teal-100 text-center">
//           <h2 className="mb-3 text-2xl font-bold text-gray-800">
//             Ready to Manage Your Plan?
//           </h2>
//           <p className="mb-6 text-base text-gray-700">
//             Click below to view your subscription, change plan, or add users.
//           </p>

//           {/* Secondary CTA */}
//           <div className="flex flex-col items-center gap-3">
//             <a
//               href={subscriptionUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-10 py-3.5 font-bold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg"
//             >
//               <RefreshCw className="h-5 w-5" />
//               Go to My Dashboard
//             </a>

//             {/* Email Display – Always Visible */}
//             <p className="text-sm text-gray-600">
//               Access dashboard as:{" "}
//               <span className="font-semibold text-teal-700">
//                 {localStorage.getItem("companyEmail") || "Not logged in"}
//               </span>
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SubscriptionDashboard;










//translated version
import React from "react";
import { Star, Package, RefreshCw, Zap, Compass, Shield, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next"; // ← AÑADIDO

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="group relative overflow-hidden rounded-md bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100">
    <div
      className={`absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-15 blur-3xl ${gradient}`}
    />
    <div className="relative z-10">
      <div
        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${gradient} p-2.5 text-white`}
      >
        {React.cloneElement(icon, { className: "h-6 w-6" })}
      </div>
      <h3 className="mb-2 text-lg font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const SubscriptionDashboard = () => {
  const { t } = useTranslation(); // ← AÑADIDO

  // Always get the latest email from localStorage
  const companyEmail =
    typeof window !== "undefined" ? localStorage.getItem("companyEmail") || "" : "";

  const subscriptionUrl = `https://subscription-frontend-psi.vercel.app/subscription-dashboard?email=${encodeURIComponent(
    companyEmail
  )}`;

  const features = [
    {
      icon: <Star />,
      title: t("subscriptionDashboard.features.premiumTools.title"),
      description: t("subscriptionDashboard.features.premiumTools.desc"),
      gradient: "from-yellow-400 to-amber-500",
    },
    {
      icon: <Package />,
      title: t("subscriptionDashboard.features.manageApps.title"),
      description: t("subscriptionDashboard.features.manageApps.desc"),
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: <RefreshCw />,
      title: t("subscriptionDashboard.features.alwaysOn.title"),
      description: t("subscriptionDashboard.features.alwaysOn.desc"),
      gradient: "from-indigo-400 to-blue-500",
    },
    {
      icon: <Zap />,
      title: t("subscriptionDashboard.features.superFast.title"),
      description: t("subscriptionDashboard.features.superFast.desc"),
      gradient: "from-red-400 to-rose-500",
    },
    {
      icon: <Compass />,
      title: t("subscriptionDashboard.features.smartReports.title"),
      description: t("subscriptionDashboard.features.smartReports.desc"),
      gradient: "from-orange-400 to-amber-500",
    },
    {
      icon: <Shield />,
      title: t("subscriptionDashboard.features.secure.title"),
      description: t("subscriptionDashboard.features.secure.desc"),
      gradient: "from-teal-400 to-cyan-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ==================== HERO SECTION ==================== */}
      <header className="bg-gradient-to-r from-teal-600 to-indigo-600 py-16 rounded-t-md text-center text-white">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="mb-3 text-3xl md:text-4xl font-bold">
            {t("subscriptionDashboard.hero.title")}
          </h1>
          <p className="mb-6 text-lg md:text-xl text-teal-100">
            {t("subscriptionDashboard.hero.subtitle")}
          </p>

          {/* Main CTA Button */}
          <a
            href={subscriptionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-teal-700 shadow-lg transition-all hover:scale-105 hover:bg-teal-50"
          >
            {t("subscriptionDashboard.hero.ctaMain")}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </header>

      {/* ==================== FEATURES GRID ==================== */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="mb-10 text-center text-2xl md:text-3xl font-bold text-gray-800">
          {t("subscriptionDashboard.features.sectionTitle")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard
              key={i}
              icon={f.icon}
              title={f.title}
              description={f.description}
              gradient={f.gradient}
            />
          ))}
        </div>
      </section>
      
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-md bg-gradient-to-r from-teal-50 to-indigo-50 p-8 shadow-lg border border-teal-100 text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-800">
            {t("subscriptionDashboard.bottom.title")}
          </h2>
          <p className="mb-6 text-base text-gray-700">
            {t("subscriptionDashboard.bottom.subtitle")}
          </p>

          {/* Secondary CTA */}
          <div className="flex flex-col items-center gap-3">
            <a
              href={subscriptionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-10 py-3.5 font-bold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg"
            >
              <RefreshCw className="h-5 w-5" />
              {t("subscriptionDashboard.bottom.ctaSecondary")}
            </a>

            {/* Email Display – Always Visible */}
            <p className="text-sm text-gray-600">
              {t("subscriptionDashboard.bottom.emailLabel")}{" "}
              <span className="font-semibold text-teal-700">
                {localStorage.getItem("companyEmail") || t("subscriptionDashboard.bottom.notLoggedIn")}
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionDashboard;