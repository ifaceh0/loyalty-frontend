import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Package, RefreshCw, Zap, Compass, Shield } from "lucide-react";

const FeatureCard = ({ icon, title, description, colorClass }) => (
  <div
    className={`bg-white border border-gray-100 p-8 rounded-md shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden`}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-xl ${colorClass}`} style={{ zIndex: 0 }}></div>

    <div className="flex justify-start items-center mb-4 relative z-10">
      <div className={`p-3 rounded-full ${colorClass} bg-opacity-10 text-white`}>
        {React.cloneElement(icon, { className: `h-8 w-8 ${colorClass}` })}
      </div>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-700 transition duration-300">{title}</h3>
    <p className="text-gray-600 text-base">{description}</p>
  </div>
);

const SubscriptionDashboard = () => {
  const features = [
    {
      icon: <Star />,
      title: "Premium Tools",
      description: "Unlock exclusive, high-performance tools and analytics for your business.",
      colorClass: "text-yellow-500",
    },
    {
      icon: <Package />,
      title: "Multi-App Management",
      description: "Seamlessly manage and integrate data across all your linked applications.",
      colorClass: "text-green-500",
    },
    {
      icon: <RefreshCw />,
      title: "Guaranteed Uptime",
      description: "Benefit from automatic updates, dedicated support, and 99.9% service availability.",
      colorClass: "text-indigo-500",
    },
    {
      icon: <Zap />,
      title: "Enhanced Speed",
      description: "Experience faster processing and real-time data synchronization.",
      colorClass: "text-red-500",
    },
    {
      icon: <Compass />,
      title: "Advanced Reporting",
      description: "Gain deeper insights with customizable and in-depth performance reports.",
      colorClass: "text-orange-500",
    },
    {
      icon: <Shield />,
      title: "Secure Operations",
      description: "Industry-leading security protocols to protect all your company data.",
      colorClass: "text-teal-500",
    },
  ];

  const companyEmail = localStorage.getItem("CompanyEmail") || "";

  const subscriptionUrl = `https://subscription-frontend-psi.vercel.app/subscription-dashboard?email=${encodeURIComponent(companyEmail)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header Section */}
      <header className="bg-sky-700 py-20 shadow-lg rounded-md-t">
        <div className="w-full max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Elevate Your Experience
          </h1>
          <p className="text-xl text-sky-200 mb-8 max-w-3xl mx-auto">
            Welcome to your **Subscription Hub**. Access exclusive features designed to maximize your efficiency and reach.
          </p>
          <a
            href={subscriptionUrl}
            className="inline-flex items-center justify-center bg-sky-500 text-white font-bold text-lg py-3 px-8 rounded-full hover:bg-sky-400 transition transform hover:scale-[1.03] shadow-xl shadow-sky-500/50"
          >
            Manage My Subscription
          </a>
        </div>
      </header>

      {/* Content Section */}
      <div className="w-full max-w-6xl mx-auto px-4 py-16">
        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">What Your Subscription Unlocks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                colorClass={feature.colorClass}
              />
            ))}
          </div>
        </section>

        {/* Access Panel (CTA Reminder) */}
        <div className="bg-white p-10 rounded-md shadow-2xl border-l-8 border-sky-600 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Ready to Dive In?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Click below to instantly access your **Subscription Dashboard** and manage billing, upgrades, and user settings.
            </p>
             <a
                href={subscriptionUrl}
                className="inline-flex items-center justify-center bg-sky-600 text-white font-bold text-xl py-4 px-12 rounded-sm hover:bg-sky-700 transition transform hover:scale-[1.02] shadow-xl shadow-sky-600/50"
            >
                <RefreshCw className="w-5 h-5 mr-3"/>
                Go to Dashboard
            </a>
            {companyEmail && (
                <p className="mt-4 text-sm text-gray-500">
                    Accessing as: **{companyEmail}**
                </p>
            )}
        </div>
      </div>
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