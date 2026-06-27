// import { useState, useEffect } from 'react';
// import { Store, Calendar, Clock, AlertCircle, Loader2, Mail, Phone, ArrowRight } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import { motion, AnimatePresence } from 'framer-motion';
// import { API_BASE_URL } from '../../apiConfig';
// import { fetchWithAuth } from "../../auth/fetchWithAuth";

// const API_BASE = `${API_BASE_URL}/api`;

// export default function InactiveShopsPage() {
//   const { t } = useTranslation();
//   const [userId, setUserId] = useState(null);
//   const [inactiveShops, setInactiveShops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     const employeeUserId = localStorage.getItem("employeeUserId");

//     if (role !== "EMPLOYEE") {
//       setError(t('inactiveShops.error.notEmployee'));
//       setLoading(false);
//       return;
//     }
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
//       try {
//         const res = await fetchWithAuth(`${API_BASE}/employee/my-inactive-shops?userId=${userId}`, {
//           method: 'GET',
//           credentials: 'include'
//         });
//         if (!res.ok) throw new Error(t('inactiveShops.error.loadFailed'));
//         const data = await res.json();
//         setInactiveShops(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInactiveShops();
//   }, [userId, t]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "—";
//     return new Date(dateString).toLocaleDateString(undefined, {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#FAFAFA] text-stone-800 font-sans antialiased">
//       <div className="max-w-7xl mx-auto px-6 py-10">
        
//         {/* Modern Soft Header */}
//         <header className="mb-10 text-center max-w-2xl mx-auto">
//           <motion.div 
//             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-6 border border-stone-200"
//           >
//             <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
//             {t('inactiveShops.status.inactive')}
//           </motion.div>
//           <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-4">
//             {t('inactiveShops.title')}
//           </h1>
//           <p className="text-stone-500 font-medium">
//             {t('inactiveShops.subtitle')}
//           </p>
//         </header>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-24">
//             <Loader2 className="w-10 h-10 animate-spin text-stone-300" />
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto bg-white border border-red-100 p-8 rounded-[2rem] text-center shadow-sm">
//             <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
//             <p className="text-stone-800 font-semibold">{error}</p>
//           </motion.div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && inactiveShops.length === 0 && (
//           <div className="bg-white rounded-[3rem] border border-stone-100 p-20 text-center shadow-sm">
//             <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Store className="w-8 h-8 text-stone-300" />
//             </div>
//             <h3 className="text-xl font-bold text-stone-900 mb-2">{t('inactiveShops.empty.title')}</h3>
//             <p className="text-stone-400">{t('inactiveShops.empty.message')}</p>
//           </div>
//         )}

//         {/* Grid */}
//         {!loading && !error && (
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             <AnimatePresence>
//               {inactiveShops.map((shop, idx) => (
//                 <motion.div
//                   key={shop.shopId}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.05 }}
//                   className="group relative bg-white rounded-xl p-2 border border-slate-200 hover:border-slate-300 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1"
//                 >
//                   {/* Logo Well */}
//                   <div className="h-44 rounded-xl bg-stone-50 mb-1 flex items-center justify-center overflow-hidden border border-stone-100/50">
//                     {shop.shopLogoBase64 ? (
//                       <img
//                         src={`data:image/png;base64,${shop.shopLogoBase64}`}
//                         alt={shop.shopName}
//                         className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
//                       />
//                     ) : (
//                       <Store className="w-12 h-12 text-stone-200" />
//                     )}
//                   </div>

//                   {/* Body Content */}
//                   <div className="px-1">
//                     <h3 className="text-lg font-bold text-stone-900 truncate mb-1 leading-tight">
//                       {shop.shopName}
//                     </h3>
//                     <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">
//                       {shop.companyName}
//                     </p>

//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between text-[11px]">
//                         <span className="text-stone-400 font-bold uppercase tracking-tighter">{t('inactiveShops.labels.joined')}</span>
//                         <span className="text-stone-900 font-semibold">{formatDate(shop.joinDate)}</span>
//                       </div>
//                       <div className="flex items-center justify-between text-[11px]">
//                         <span className="text-stone-400 font-bold uppercase tracking-tighter">{t('inactiveShops.labels.deactivated')}</span>
//                         <span className="text-red-400 font-semibold">{formatDate(shop.resignDate)}</span>
//                       </div>
//                     </div>

//                     <div className="mt-4 border-t border-stone-50 space-y-2">
//                       <div className="flex items-center gap-3 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
//                         <div className="p-2 rounded-full bg-stone-50 group-hover:bg-white transition-colors">
//                           <Mail size={14} />
//                         </div>
//                         <span className="text-[13px] truncate font-medium">{shop.companyEmail}</span>
//                       </div>
//                       <div className="flex items-center gap-3 text-stone-500">
//                         <div className="p-2 rounded-full bg-stone-50">
//                           <Phone size={14} />
//                         </div>
//                         <span className="text-[13px] font-medium">{shop.companyPhone || "No contact"}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }









import { useState, useEffect } from 'react';
import { Store, Calendar, Clock, AlertCircle, Loader2, Mail, Phone, ShieldAlert } from 'lucide-react';
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
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Module Header Panel */}
        <header className="mb-10 border-b border-zinc-200/80 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Deactivated Registries</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-zinc-900 tracking-tight">
              {t('inactiveShops.title')}
            </h1>
            <p className="text-zinc-500 text-sm max-w-xl font-medium mt-1">
              {t('inactiveShops.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-zinc-200 shadow-sm px-3.5 py-1 rounded-full self-start sm:self-auto">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
              {t('inactiveShops.status.inactive')}
            </span>
          </div>
        </header>

        {/* Dynamic App Shell States */}
        {loading && (
          <div className="bg-white border border-zinc-200 rounded-md flex flex-col items-center justify-center py-28 text-center shadow-sm">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
            <p className="text-zinc-500 text-sm font-medium tracking-wide">Syncing Archived Storefronts...</p>
          </div>
        )}

        {error && (
          <div className="bg-white border border-zinc-200 rounded-md flex flex-col items-center justify-center py-20 text-center shadow-sm max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 mb-1">Retrieval Error</h3>
            <p className="text-zinc-500 text-xs font-medium max-w-sm px-4">{error}</p>
          </div>
        )}

        {!loading && !error && inactiveShops.length === 0 && (
          <div className="bg-white rounded-md border border-zinc-200/80 p-16 text-center shadow-sm max-w-xl mx-auto">
            <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-zinc-400 shadow-sm">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-800 tracking-tight">{t('inactiveShops.empty.title')}</h3>
            <p className="text-zinc-400 text-xs font-medium mt-1">{t('inactiveShops.empty.message')}</p>
          </div>
        )}

        {/* Store Grid Array */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {inactiveShops.map((shop, idx) => (
                <motion.div
                  key={shop.shopId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  className="group bg-white border border-zinc-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Logo Well Frame */}
                    <div className="h-40 rounded-xl bg-zinc-50 mb-4 flex items-center justify-center overflow-hidden border border-zinc-100 shadow-inner relative">
                      {shop.shopLogoBase64 ? (
                        <img
                          src={`data:image/png;base64,${shop.shopLogoBase64}`}
                          alt={shop.shopName}
                          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <Store className="w-10 h-10 text-zinc-200" />
                      )}
                      
                      <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 text-[10px] font-bold uppercase tracking-wide border border-rose-100 text-rose-700">
                        {t('inactiveShops.status.inactive')}
                      </span>
                    </div>

                    {/* Shop Description Meta */}
                    <div className="space-y-1 px-0.5">
                      <h3 className="text-sm font-bold text-zinc-900 truncate tracking-tight group-hover:text-indigo-600 transition-colors">
                        {window.localStorage.getItem('i18nextLng') === 'ar' ? shop.shopName : shop.shopName}
                      </h3>
                      <p className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider truncate">
                        {shop.companyName || "Independent Operator"}
                      </p>
                    </div>

                    {/* Audit Logs Lists */}
                    <div className="mt-4 bg-zinc-50 border border-zinc-100 rounded-xl p-3 space-y-2 text-xs font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400 font-semibold">{t('inactiveShops.labels.joined')}</span>
                        <span className="text-zinc-700 font-bold">{formatDate(shop.joinDate)}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-zinc-200/60 pt-2">
                        <span className="text-zinc-400 font-semibold">{t('inactiveShops.labels.deactivated')}</span>
                        <span className="text-rose-600 font-bold">{formatDate(shop.resignDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Contact Block Footer */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-col gap-2 text-xs text-zinc-500 font-medium">
                    <div className="inline-flex items-center gap-2 min-w-0 hover:text-zinc-800 transition-colors">
                      <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate text-[11px] font-semibold">{shop.companyEmail}</span>
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="text-[11px] font-semibold">{shop.companyPhone || "No primary contact"}</span>
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