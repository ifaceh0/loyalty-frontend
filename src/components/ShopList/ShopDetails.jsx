// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faGift, faUsers, faTicketAlt, faExternalLinkAlt, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
// import { API_BASE_URL } from '../../apiConfig';
// import { fetchWithAuth } from "../../auth/fetchWithAuth";

// const ShopDetails = () => {
//   const { state } = useLocation();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const shop = state?.shop;

//   // Scroll to top on mount
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     if (shop?.shopId) {
//       fetchWithAuth(`${API_BASE_URL}/api/user/apps/${shop.shopId}`)
//         .then(res => res.json())
//         .then(data => {
//           setApplications(data);
//           setLoading(false);
//         })
//         .catch(err => {
//           console.error(err);
//           setLoading(false);
//         });
//     }
//   }, [shop]);

//   const appConfig  = {
//     Loyalty: {
//       icon: faGift,
//       color: 'bg-orange-500',
//       description: 'Reward your loyal customers with points, tiers, and exclusive benefits to increase repeat visits.',
//       url: 'https://loyalty-frontend-mu.vercel.app'
//     },
//     Referral: {
//       icon: faUsers,
//       color: 'bg-blue-600',
//       description: 'Turn happy customers into brand advocates through a powerful refer-a-friend program.',
//       url: 'https://referal-couponcode-frontend.vercel.app'
//     },
//     Coupons: {
//       icon: faTicketAlt,
//       color: 'bg-emerald-500',
//       description: 'Boost sales with smart discount codes, flash sales, and targeted coupon campaigns.',
//       url: 'https://referal-couponcode-frontend.vercel.app'
//     }
//   };

//   if (!shop) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
//         <h2 className="text-xl font-bold text-slate-800">Shop not found</h2>
//         <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 font-bold underline">Return to Home</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] pb-12">
//       {/* Header Section: Scaled for Mobile/Laptop */}
//       <header className="bg-white border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
//           <button 
//             onClick={() => navigate(-1)}
//             className="group mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all font-semibold text-sm"
//           >
//             <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" /> 
//             Back to Explore
//           </button>
          
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
//             {/* Logo: Responsive sizing */}
//             <motion.div 
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="w-24 h-24 rounded-xl bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-3xl md:text-5xl font-bold shadow-2xl shadow-indigo-100 overflow-hidden border-4 border-white"
//             >
//               {shop.logoUrl ? (
//                 <img src={`${API_BASE_URL}${shop.logoUrl}`} alt={shop.shopName} className="w-full h-full object-cover" />
//               ) : (
//                 shop.shopName.charAt(0)
//               )}
//             </motion.div>
            
//             <div className="flex-1">
//               <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
//                 {shop.shopName}
//               </h1>
              
//               {/* Meta Info: Wrapped for smaller screens */}
//               <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-4 text-slate-500 text-sm md:text-base font-medium">
//                 <div className="flex items-center gap-2">
//                   <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-400" />
//                   <span>{shop.city}, {shop.country}</span>
//                 </div>
//                 <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 self-center" />
//                 <div className="flex items-center gap-2">
//                   <FontAwesomeIcon icon={faPhone} className="text-indigo-400" />
//                   <span>{shop.shopPhone}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
//         <div className="bg-white rounded-xl md:rounded-[1rem] p-5 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
          
//           <div className="mb-8 border-b border-slate-50 pb-6">
//             <h2 className="text-xl md:text-2xl font-bold text-slate-900">Installed Applications</h2>
//             <p className="text-slate-500 mt-1 text-sm md:text-base italic">This shop is actively using the following applications to enhance customer experience, 
//               increase engagement, and grow their business.</p>
//           </div>

//           {/* Grid: 1 column on mobile, 3 on laptop */}
//           {loading ? (
//             <p className="text-center text-slate-500">Loading applications...</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//               {applications.map((app, index) => {
//                 const config = appConfig[app.name];

//                 if (!config) return null;

//                 return (
//                   <motion.div
//                     key={app.id}
//                     initial={{ opacity: 0, y: 15 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: index * 0.1 }}
//                     className="group flex flex-col bg-slate-50 hover:bg-white border border-transparent hover:border-indigo-100 rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100/50"
//                   >
//                     <div className="flex items-center gap-4 mb-4 md:flex-col md:items-start">
//                       <div className={`${config.color} w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg`}>
//                         <FontAwesomeIcon icon={config.icon} className="text-lg md:text-xl" />
//                       </div>
//                       <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
//                         {app.name}
//                       </h3>
//                       <p className="text-emerald-600 text-sm font-medium">Active • Installed</p>
//                     </div>

//                     <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 flex-grow">
//                       {config.description}
//                     </p>

//                     <button
//                       onClick={() => window.open(config.url, '_blank')}
//                       className="w-full py-2 px-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-full flex items-center justify-center gap-2 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300 active:scale-[0.98]"
//                     >
//                       <span>Launch App</span>
//                       <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px] opacity-60 group-hover:opacity-100" />
//                     </button>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           )}
//           {applications.length > 0 && (
//             <div className="mt-12 pt-8 border-t border-slate-100">
//               <h3 className="text-lg font-semibold text-slate-900 mb-3">Why these applications?</h3>
//               <p className="text-slate-600 leading-relaxed">
//                 By installing these apps, <strong>{shop.shopName}</strong> is committed to providing 
//                 a better shopping experience through loyalty rewards, customer referrals, and smart promotions. 
//                 These tools help them build stronger relationships with customers and grow sustainably.
//               </p>
//             </div>
//           )}  
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ShopDetails;






import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faGift,
  faUsers,
  faTicketAlt,
  faExternalLinkAlt,
  faMapMarkerAlt,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../../apiConfig';
import { fetchWithAuth } from "../../auth/fetchWithAuth";
import { useTranslation } from 'react-i18next';

const ShopDetails = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const shop = state?.shop;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (shop?.shopId) {
      fetchWithAuth(`${API_BASE_URL}/api/user/apps/${shop.shopId}`)
        .then(res => res.json())
        .then(data => {
          setApplications(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [shop]);

  // ✅ Translated App Config
  const appConfig = {
    Loyalty: {
      icon: faGift,
      color: 'bg-orange-500',
      description: t('shopDetails.appDescriptions.loyalty'),
      url: 'https://loyalty-frontend-mu.vercel.app'
    },
    Referral: {
      icon: faUsers,
      color: 'bg-blue-600',
      description: t('shopDetails.appDescriptions.referral'),
      url: 'https://referal-couponcode-frontend.vercel.app'
    },
    Coupons: {
      icon: faTicketAlt,
      color: 'bg-emerald-500',
      description: t('shopDetails.appDescriptions.coupons'),
      url: 'https://referal-couponcode-frontend.vercel.app'
    }
  };

  if (!shop) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">
          {t('shopDetails.notFound.title')}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-indigo-600 font-bold underline"
        >
          {t('shopDetails.notFound.back')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          
          <button
            onClick={() => navigate(-1)}
            className="group mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all font-semibold text-sm"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" />
            {t('shopDetails.header.back')}
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
            
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-3xl md:text-5xl font-bold shadow-2xl shadow-indigo-100 overflow-hidden border-4 border-white"
            >
              {shop.logoUrl ? (
                <img
                  src={`${API_BASE_URL}${shop.logoUrl}`}
                  alt={shop.shopName}
                  className="w-full h-full object-cover"
                />
              ) : (
                shop.shopName.charAt(0)
              )}
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-3">
                {shop.shopName}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-4 text-slate-500 text-sm md:text-base font-medium">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-400" />
                  <span>{shop.city}, {shop.country}</span>
                </div>

                <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 self-center" />

                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} className="text-indigo-400" />
                  <span>{shop.shopPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-xl md:rounded-[1rem] p-5 md:p-10 shadow-xl border border-slate-100">

          {/* Title */}
          <div className="mb-8 border-b border-slate-50 pb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {t('shopDetails.applications.title')}
            </h2>
            <p className="text-slate-500 mt-1 text-sm md:text-base italic">
              {t('shopDetails.applications.subtitle')}
            </p>
          </div>

          {/* Apps */}
          {loading ? (
            <p className="text-center text-slate-500">
              {t('shopDetails.applications.loading')}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {applications.map((app, index) => {
                const config = appConfig[app.name];
                if (!config) return null;

                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex flex-col bg-slate-50 hover:bg-white rounded-xl p-6 transition-all hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4 mb-4 md:flex-col md:items-start">
                      <div className={`${config.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
                        <FontAwesomeIcon icon={config.icon} />
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">
                        {app.name}
                      </h3>

                      <p className="text-emerald-600 text-sm font-medium">
                        {t('shopDetails.applications.active')}
                      </p>
                    </div>

                    <p className="text-slate-600 text-sm mb-6 flex-grow">
                      {config.description}
                    </p>

                    <button
                      onClick={() => window.open(config.url, '_blank')}
                      className="w-full py-2 px-4 bg-white border text-slate-700 font-bold rounded-full flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white"
                    >
                      {t('shopDetails.applications.launch')}
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px]" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          {applications.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {t('shopDetails.footer.title')}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t('shopDetails.footer.description', {
                  shopName: shop.shopName
                })}
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default ShopDetails;