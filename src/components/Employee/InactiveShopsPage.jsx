// import { useState, useEffect } from 'react';
// import { 
//   Store, 
//   Calendar, 
//   Clock, 
//   AlertCircle, 
//   Loader2,
//   Mail,
//   Phone
// } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import { API_BASE_URL } from '../../apiConfig';

// const API_BASE = `${API_BASE_URL}/api`;

// export default function InactiveShopsPage() {
//   const { t } = useTranslation();

//   const [userId, setUserId] = useState(null);
//   const [inactiveShops, setInactiveShops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const role = localStorage.getItem("role");

//     if (role !== "EMPLOYEE") {
//       setError(t('inactiveShops.error.notEmployee'));
//       setLoading(false);
//       return;
//     }

//     const employeeUserId = localStorage.getItem("employeeUserId");

//     if (!employeeUserId) {
//       setError(t('inactiveShops.error.noUserId'));
//       setLoading(false);
//       return;
//     }

//     setUserId(employeeUserId);
//   }, [t]);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchInactiveShops = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const res = await fetch(
//           `${API_BASE}/employee/my-inactive-shops?userId=${userId}`,
//           { 
//             method: 'GET',
//             credentials: 'include' 
//           }
//         );

//         if (!res.ok) {
//           const errData = await res.json().catch(() => ({}));
//           throw new Error(errData.error || t('inactiveShops.error.loadFailed'));
//         }

//         const data = await res.json();
//         setInactiveShops(data);
//       } catch (err) {
//         setError(err.message || t('inactiveShops.error.generic'));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInactiveShops();
//   }, [userId, t]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "—";
//     return new Date(dateString).toLocaleDateString(undefined, {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-6xl mx-auto p-6 sm:p-6 lg:p-8">
//         {/* Header */}
//         <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-red-100 rounded-full">
//               <AlertCircle className="w-8 h-8 text-red-600" />
//             </div>
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                 {t('inactiveShops.title')}
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 {t('inactiveShops.subtitle')}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Loading */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-20">
//             <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
//             <p className="text-gray-600">{t('inactiveShops.loading')}</p>
//           </div>
//         )}

//         {/* Error */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//             <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
//             <p className="text-red-700 font-medium">{error}</p>
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && inactiveShops.length === 0 && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Store className="w-10 h-10 text-green-600" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               {t('inactiveShops.empty.title')}
//             </h3>
//             <p className="text-gray-600">
//               {t('inactiveShops.empty.message')}
//             </p>
//           </div>
//         )}

//         {/* Inactive Shops Grid */}
//         {!loading && !error && inactiveShops.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {inactiveShops.map((shop) => (
//               <div
//                 key={shop.shopId}
//                 className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 {/* Header with Logo */}
//                 <div className="relative bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center">
//                   {shop.shopLogoBase64 ? (
//                     <img
//                       src={`data:image/png;base64,${shop.shopLogoBase64}`}
//                       alt={`${shop.shopName} logo`}
//                       className="object-contain rounded-xl shadow-lg bg-white"
//                       onError={(e) => {
//                         e.target.src = ''; 
//                         e.target.style.display = 'none';
//                       }}
//                     />
//                   ) : (
//                     <Store className="w-20 h-20 text-white/70" />
//                   )}

//                   {/* Inactive Badge */}
//                   <span className="absolute top-4 right-4 bg-white/25 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white border border-white/30">
//                     {t('inactiveShops.status.inactive')}
//                   </span>
//                 </div>

//                 {/* Content */}
//                 <div className="p-4 space-y-3">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 truncate">
//                       {shop.shopName}
//                     </h3>
//                     <p className="text-sm text-gray-600 mt-1">
//                       {shop.companyName}
//                     </p>
//                   </div>

//                   <div className="text-sm text-gray-600 space-y-2">
//                     <div className="flex items-center gap-2">
//                       <Calendar className="w-4 h-4 text-gray-500" />
//                       <span>
//                         <strong>{t('inactiveShops.labels.joined')}:</strong>{' '}
//                         {formatDate(shop.joinDate)}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-4 h-4 text-gray-500" />
//                       <span>
//                         <strong>{t('inactiveShops.labels.deactivated')}:</strong>{' '}
//                         {formatDate(shop.resignDate) || "—"}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="pt-4 border-t border-gray-200 text-xs text-gray-600 space-y-2">
//                     <p className="flex items-center gap-2">
//                       <Mail className="w-4 h-4" />
//                       {shop.companyEmail || "—"}
//                     </p>
//                     <p className="flex items-center gap-2">
//                       <Phone className="w-4 h-4" />
//                       {shop.companyPhone || "—"}
//                     </p>
//                   </div>

//                   <div className="pt-2 text-center text-sm text-gray-500 italic">
//                     {t('inactiveShops.contactMessage')}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }













import { useState, useEffect } from 'react';
import { Store, Calendar, Clock, AlertCircle, Loader2, Mail, Phone, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../apiConfig';
import { fetchWithAuth } from "../../auth/fetchWithAuth";

const API_BASE = `${API_BASE_URL}/api`;

export default function InactiveShopsPage() {
  const { t } = useTranslation();
  const [userId, setUserId] = useState(null);
  const [inactiveShops, setInactiveShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const role = localStorage.getItem("role");
    const employeeUserId = localStorage.getItem("employeeUserId");

    if (role !== "EMPLOYEE") {
      setError(t('inactiveShops.error.notEmployee'));
      setLoading(false);
      return;
    }
    if (!employeeUserId) {
      setError(t('inactiveShops.error.noUserId'));
      setLoading(false);
      return;
    }
    setUserId(employeeUserId);
  }, [t]);

  useEffect(() => {
    if (!userId) return;
    const fetchInactiveShops = async () => {
      setLoading(true);
      try {
        const res = await fetchWithAuth(`${API_BASE}/employee/my-inactive-shops?userId=${userId}`, {
          method: 'GET',
          credentials: 'include'
        });
        if (!res.ok) throw new Error(t('inactiveShops.error.loadFailed'));
        const data = await res.json();
        setInactiveShops(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInactiveShops();
  }, [userId, t]);

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-800 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Modern Soft Header */}
        <header className="mb-10 text-center max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-6 border border-stone-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            {t('inactiveShops.status.inactive')}
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-4">
            {t('inactiveShops.title')}
          </h1>
          <p className="text-stone-500 font-medium">
            {t('inactiveShops.subtitle')}
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-stone-300" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto bg-white border border-red-100 p-8 rounded-[2rem] text-center shadow-sm">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <p className="text-stone-800 font-semibold">{error}</p>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && inactiveShops.length === 0 && (
          <div className="bg-white rounded-[3rem] border border-stone-100 p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">{t('inactiveShops.empty.title')}</h3>
            <p className="text-stone-400">{t('inactiveShops.empty.message')}</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {inactiveShops.map((shop, idx) => (
                <motion.div
                  key={shop.shopId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative bg-white rounded-xl p-2 border border-slate-200 hover:border-slate-300 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1"
                >
                  {/* Logo Well */}
                  <div className="h-44 rounded-xl bg-stone-50 mb-1 flex items-center justify-center overflow-hidden border border-stone-100/50">
                    {shop.shopLogoBase64 ? (
                      <img
                        src={`data:image/png;base64,${shop.shopLogoBase64}`}
                        alt={shop.shopName}
                        className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <Store className="w-12 h-12 text-stone-200" />
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="px-1">
                    <h3 className="text-lg font-bold text-stone-900 truncate mb-1 leading-tight">
                      {shop.shopName}
                    </h3>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">
                      {shop.companyName}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-400 font-bold uppercase tracking-tighter">{t('inactiveShops.labels.joined')}</span>
                        <span className="text-stone-900 font-semibold">{formatDate(shop.joinDate)}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-400 font-bold uppercase tracking-tighter">{t('inactiveShops.labels.deactivated')}</span>
                        <span className="text-red-400 font-semibold">{formatDate(shop.resignDate)}</span>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-stone-50 space-y-2">
                      <div className="flex items-center gap-3 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                        <div className="p-2 rounded-full bg-stone-50 group-hover:bg-white transition-colors">
                          <Mail size={14} />
                        </div>
                        <span className="text-[13px] truncate font-medium">{shop.companyEmail}</span>
                      </div>
                      <div className="flex items-center gap-3 text-stone-500">
                        <div className="p-2 rounded-full bg-stone-50">
                          <Phone size={14} />
                        </div>
                        <span className="text-[13px] font-medium">{shop.companyPhone || "No contact"}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}