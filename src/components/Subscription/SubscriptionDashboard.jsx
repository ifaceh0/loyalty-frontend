import React from "react";
import { Star, Package, RefreshCw, Zap, Compass, Shield, ArrowRight } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               Feature Card                                 */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/*                               Main Dashboard                                 */
/* -------------------------------------------------------------------------- */
const SubscriptionDashboard = () => {
  // Always get the latest email from localStorage
  const companyEmail =
    typeof window !== "undefined" ? localStorage.getItem("companyEmail") || "" : "";

  const subscriptionUrl = `https://subscription-frontend-psi.vercel.app/subscription-dashboard?email=${encodeURIComponent(
    companyEmail
  )}`;

  const features = [
    {
      icon: <Star />,
      title: "Premium Tools",
      description: "Get powerful tools to grow your sales and manage your shop easily.",
      gradient: "from-yellow-400 to-amber-500",
    },
    {
      icon: <Package />,
      title: "Manage All Apps",
      description: "Control all your apps (POS, inventory, etc.) from one place.",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: <RefreshCw />,
      title: "Always On & Updated",
      description: "Your system works 24/7. We update it automatically – no hassle.",
      gradient: "from-indigo-400 to-blue-500",
    },
    {
      icon: <Zap />,
      title: "Super Fast",
      description: "Fast billing, instant sync – no waiting, even during rush hours.",
      gradient: "from-red-400 to-rose-500",
    },
    {
      icon: <Compass />,
      title: "Smart Reports",
      description: "See daily sales, top items, and profit – in simple charts.",
      gradient: "from-orange-400 to-amber-500",
    },
    {
      icon: <Shield />,
      title: "100% Safe & Secure",
      description: "Your data is protected with bank-level security.",
      gradient: "from-teal-400 to-cyan-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ==================== HERO SECTION ==================== */}
      <header className="bg-gradient-to-r from-teal-600 to-indigo-600 py-16 rounded-t-md text-center text-white">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="mb-3 text-3xl md:text-4xl font-bold">
            Welcome to Your Shop Dashboard
          </h1>
          <p className="mb-6 text-lg md:text-xl text-teal-100">
            Manage your subscription, see what you get, and grow your business – all in one place.
          </p>

          {/* Main CTA Button */}
          <a
            href={subscriptionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-teal-700 shadow-lg transition-all hover:scale-105 hover:bg-teal-50"
          >
            Open My Dashboard
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </header>

      {/* ==================== FEATURES GRID ==================== */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="mb-10 text-center text-2xl md:text-3xl font-bold text-gray-800">
          What You Get with Your Plan
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

      {/* ==================== BOTTOM CTA BOX ==================== */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-md bg-gradient-to-r from-teal-50 to-indigo-50 p-8 shadow-lg border border-teal-100 text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-800">
            Ready to Manage Your Plan?
          </h2>
          <p className="mb-6 text-base text-gray-700">
            Click below to view your subscription, change plan, or add users.
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
              Go to My Dashboard
            </a>

            {/* Email Display – Always Visible */}
            <p className="text-sm text-gray-600">
              Access dashboard as:{" "}
              <span className="font-semibold text-teal-700">
                {localStorage.getItem("companyEmail") || "Not logged in"}
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionDashboard;



// import React, { useState, useEffect } from "react";
// import { Star, Package, RefreshCw, Zap, Compass, Shield, Loader2 } from "lucide-react";
// import { toast, Toaster } from "react-hot-toast";

// const FeatureCard = ({ icon, title, description, colorClass }) => (
//   <div className="bg-white border border-gray-100 p-6 rounded-md shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
//     <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-xl ${colorClass}`} style={{ zIndex: 0 }}></div>

//     <div className="flex justify-start items-center mb-4 relative z-10">
//       <div className={`p-3 rounded-full ${colorClass.replace("text-", "bg-")} bg-opacity-10`}>
//         {React.cloneElement(icon, { className: `h-8 w-8 ${colorClass}` })}
//       </div>
//     </div>
//     <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-700 transition duration-300">{title}</h3>
//     <p className="text-gray-600 text-base">{description}</p>
//   </div>
// );

// const SubscriptionDashboard = () => {
//   const [dashboardUrl, setDashboardUrl] = useState("#");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const features = [
//     {
//       icon: <Star />,
//       title: "Premium Tools",
//       description: "Unlock exclusive, high-performance tools and analytics for your business.",
//       colorClass: "text-yellow-500",
//     },
//     {
//       icon: <Package />,
//       title: "Multi-App Management",
//       description: "Seamlessly manage and integrate data across all your linked applications.",
//       colorClass: "text-green-500",
//     },
//     {
//       icon: <RefreshCw />,
//       title: "Guaranteed Uptime",
//       description: "Benefit from automatic updates, dedicated support, and 99.9% service availability.",
//       colorClass: "text-indigo-500",
//     },
//     {
//       icon: <Zap />,
//       title: "Enhanced Speed",
//       description: "Experience faster processing and real-time data synchronization.",
//       colorClass: "text-red-500",
//     },
//     {
//       icon: <Compass />,
//       title: "Advanced Reporting",
//       description: "Gain deeper insights with customizable and in-depth performance reports.",
//       colorClass: "text-orange-500",
//     },
//     {
//       icon: <Shield />,
//       title: "Secure Operations",
//       description: "Industry-leading security protocols to protect all your company data.",
//       colorClass: "text-teal-500",
//     },
//   ];

//   useEffect(() => {
//     const generateSecureLink = async () => {
//       setLoading(true);
//       setError(false);

//       try {
//         console.log("🚀 Calling generate-dashboard-link...");  // DEBUG
//         const response = await fetch("https://loyalty-backend-java.onrender.com/api/auth/generate-dashboard-link", {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         console.log("📡 Response status:", response.status);  // DEBUG
//       console.log("🍪 Request cookies sent?", document.cookie.includes("jwt"));  // DEBUG (note: HttpOnly cookies not visible here)

//         if (!response.ok) {
//           const err = await response.json();
//           console.error("❌ Error response:", err);  // DEBUG
//           throw new Error(err.error || "Failed to generate link");
//         }

//         const data = await response.json();
//         console.log("✅ Success URL:", data.url);  // DEBUG
//         setDashboardUrl(data.url); // This is the URL from Postman
//       } catch (err) {
//         console.error("Link generation failed:", err);
//         setError(true);
//         toast.error(err.message || "Please log in again to access the dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     generateSecureLink();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Toaster position="top-right" />

//       {/* Hero Header Section */}
//       <header className="bg-sky-700 py-16 shadow-lg rounded-t-md">
//         <div className="w-full max-w-6xl mx-auto px-4 text-center">
//           <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
//             Elevate Your Experience
//           </h1>
//           <p className="text-xl text-sky-200 mb-8 max-w-3xl mx-auto">
//             Welcome to your <strong>Subscription Hub</strong>. Access exclusive features designed to maximize your efficiency and reach.
//           </p>

//           {/* Secure CTA Button */}
//           <a
//             href={dashboardUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             onClick={(e) => (loading || error || dashboardUrl === "#") && e.preventDefault()}
//             className={`inline-flex items-center justify-center gap-3 bg-white text-sky-700 font-bold text-lg py-3 px-10 rounded-full hover:bg-sky-50 transition-all transform hover:scale-105 shadow-2xl ${
//               loading || error || dashboardUrl === "#" ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-6 h-6 animate-spin" />
//                 Generating Secure Link...
//               </>
//             ) : error ? (
//               <>
//                 <RefreshCw className="w-6 h-6" />
//                 Retry Link
//               </>
//             ) : (
//               <>
//                 <Package className="w-6 h-6" />
//                 Open Subscription Dashboard
//               </>
//             )}
//           </a>
//         </div>
//       </header>

//       {/* Content Section */}
//       <div className="w-full max-w-6xl mx-auto px-4 py-10">
//         {/* Features Grid */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">What Your Subscription Unlocks</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <FeatureCard
//                 key={index}
//                 icon={feature.icon}
//                 title={feature.title}
//                 description={feature.description}
//                 colorClass={feature.colorClass}
//               />
//             ))}
//           </div>
//         </section>

//         {/* Access Panel */}
//         <div className="bg-gradient-to-br from-sky-50 to-indigo-50 p-10 rounded-md shadow-2xl border border-sky-200 text-center">
//           <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Ready to Take Control?</h2>
//           <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
//             Your secure dashboard is being prepared. Click below to manage billing, upgrade plans, view usage, and control app access.
//           </p>

//           <div className="flex flex-col items-center gap-6">
//             <a
//               href={dashboardUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={(e) => (loading || error || dashboardUrl === "#") && e.preventDefault()}
//               className={`inline-flex items-center justify-center gap-4 bg-sky-600 text-white font-bold text-xl py-3 px-16 rounded-md hover:bg-sky-700 transition-all transform hover:scale-105 shadow-2xl shadow-sky-600/40 ${
//                 loading || error || dashboardUrl === "#" ? "opacity-60 cursor-not-allowed" : ""
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-7 h-7 animate-spin" />
//                   Securing Your Session...
//                 </>
//               ) : error ? (
//                 <>
//                   <RefreshCw className="w-7 h-7" />
//                   Regenerate Secure Link
//                 </>
//               ) : (
//                 <>
//                   <Shield className="w-7 h-7" />
//                   Go to Secure Dashboard
//                 </>
//               )}
//             </a>

//             {error && (
//               <p className="text-red-600 font-medium">
//                 Link failed. Make sure you're logged in and try again.
//               </p>
//             )}

//             {/* Optional: visual hint */}
//             {!loading && !error && dashboardUrl !== "#" && (
//               <p className="text-sm text-gray-500">Opens in a new tab</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionDashboard;













// import React, { useState, useEffect } from "react";
// import { Star, Package, RefreshCw, Zap, Compass, Shield, Loader2 } from "lucide-react";
// import { toast, Toaster } from "react-hot-toast";
// import { getCookie } from '../../utils/cookie';

// const FeatureCard = ({ icon, title, description, colorClass }) => (
//   <div className="bg-white border border-gray-100 p-6 rounded-md shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
//     <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-xl ${colorClass}`} style={{ zIndex: 0 }}></div>

//     <div className="flex justify-start items-center mb-4 relative z-10">
//       <div className={`p-3 rounded-full ${colorClass.replace("text-", "bg-")} bg-opacity-10`}>
//         {React.cloneElement(icon, { className: `h-8 w-8 ${colorClass}` })}
//       </div>
//     </div>
//     <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-700 transition duration-300">{title}</h3>
//     <p className="text-gray-600 text-base">{description}</p>
//   </div>
// );

// const SubscriptionDashboard = () => {
//   const [dashboardUrl, setDashboardUrl] = useState("#");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const features = [
//     {
//       icon: <Star />,
//       title: "Premium Tools",
//       description: "Unlock exclusive, high-performance tools and analytics for your business.",
//       colorClass: "text-yellow-500",
//     },
//     {
//       icon: <Package />,
//       title: "Multi-App Management",
//       description: "Seamlessly manage and integrate data across all your linked applications.",
//       colorClass: "text-green-500",
//     },
//     {
//       icon: <RefreshCw />,
//       title: "Guaranteed Uptime",
//       description: "Benefit from automatic updates, dedicated support, and 99.9% service availability.",
//       colorClass: "text-indigo-500",
//     },
//     {
//       icon: <Zap />,
//       title: "Enhanced Speed",
//       description: "Experience faster processing and real-time data synchronization.",
//       colorClass: "text-red-500",
//     },
//     {
//       icon: <Compass />,
//       title: "Advanced Reporting",
//       description: "Gain deeper insights with customizable and in-depth performance reports.",
//       colorClass: "text-orange-500",
//     },
//     {
//       icon: <Shield />,
//       title: "Secure Operations",
//       description: "Industry-leading security protocols to protect all your company data.",
//       colorClass: "text-teal-500",
//     },
//   ];

//   useEffect(() => {
//     const generateSecureLink = async () => {
//       setLoading(true);
//       setError(false);

//       try {
//         console.log("Generating secure link...");

//         // CHANGED: Read JWT from cookie (HttpOnly)
//         const jwt = getCookie("jwt");
//         if (!jwt) {
//           throw new Error("No session found. Please log in again.");
//         }

//         // CHANGED: Send Bearer token, NO credentials
//         const response = await fetch("https://loyalty-backend-java.onrender.com/api/auth/generate-dashboard-link", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${jwt}` // CHANGED: Bearer token
//           },
//           // REMOVED: credentials: "include"
//         });

//         console.log("Response status:", response.status);

//         if (!response.ok) {
//           const err = await response.json();
//           console.error("Error response:", err);
//           throw new Error(err.error || "Failed to generate link");
//         }

//         const data = await response.json();
//         console.log("Secure URL:", data.url);
//         setDashboardUrl(data.url);

//         // CHANGED: Optional toast
//         toast.success("Secure dashboard link ready!");

//       } catch (err) {
//         console.error("Link generation failed:", err);
//         setError(true);
//         toast.error(err.message || "Please log in again to access the dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     generateSecureLink();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Toaster position="top-right" />

//       {/* Hero Header Section */}
//       <header className="bg-sky-700 py-16 shadow-lg rounded-t-md">
//         <div className="w-full max-w-6xl mx-auto px-4 text-center">
//           <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
//             Elevate Your Experience
//           </h1>
//           <p className="text-xl text-sky-200 mb-8 max-w-3xl mx-auto">
//             Welcome to your <strong>Subscription Hub</strong>. Access exclusive features designed to maximize your efficiency and reach.
//           </p>

//           {/* Secure CTA Button */}
//           <a
//             href={dashboardUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             onClick={(e) => (loading || error || dashboardUrl === "#") && e.preventDefault()}
//             className={`inline-flex items-center justify-center gap-3 bg-white text-sky-700 font-bold text-lg py-3 px-10 rounded-full hover:bg-sky-50 transition-all transform hover:scale-105 shadow-2xl ${
//               loading || error || dashboardUrl === "#" ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-6 h-6 animate-spin" />
//                 Generating Secure Link...
//               </>
//             ) : error ? (
//               <>
//                 <RefreshCw className="w-6 h-6" />
//                 Retry Link
//               </>
//             ) : (
//               <>
//                 <Package className="w-6 h-6" />
//                 Open Subscription Dashboard
//               </>
//             )}
//           </a>
//         </div>
//       </header>

//       {/* Content Section */}
//       <div className="w-full max-w-6xl mx-auto px-4 py-10">
//         {/* Features Grid */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">What Your Subscription Unlocks</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <FeatureCard
//                 key={index}
//                 icon={feature.icon}
//                 title={feature.title}
//                 description={feature.description}
//                 colorClass={feature.colorClass}
//               />
//             ))}
//           </div>
//         </section>

//         {/* Access Panel */}
//         <div className="bg-gradient-to-br from-sky-50 to-indigo-50 p-10 rounded-md shadow-2xl border border-sky-200 text-center">
//           <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Ready to Take Control?</h2>
//           <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
//             Your secure dashboard is being prepared. Click below to manage billing, upgrade plans, view usage, and control app access.
//           </p>

//           <div className="flex flex-col items-center gap-6">
//             <a
//               href={dashboardUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={(e) => (loading || error || dashboardUrl === "#") && e.preventDefault()}
//               className={`inline-flex items-center justify-center gap-4 bg-sky-600 text-white font-bold text-xl py-3 px-16 rounded-md hover:bg-sky-700 transition-all transform hover:scale-105 shadow-2xl shadow-sky-600/40 ${
//                 loading || error || dashboardUrl === "#" ? "opacity-60 cursor-not-allowed" : ""
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-7 h-7 animate-spin" />
//                   Securing Your Session...
//                 </>
//               ) : error ? (
//                 <>
//                   <RefreshCw className="w-7 h-7" />
//                   Regenerate Secure Link
//                 </>
//               ) : (
//                 <>
//                   <Shield className="w-7 h-7" />
//                   Go to Secure Dashboard
//                 </>
//               )}
//             </a>

//             {error && (
//               <p className="text-red-600 font-medium">
//                 Link failed. Make sure you're logged in and try again.
//               </p>
//             )}

//             {!loading && !error && dashboardUrl !== "#" && (
//               <p className="text-sm text-gray-500">Opens in a new tab</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionDashboard;