// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import QRModal from './QRModal';
// import { Loader2 } from 'lucide-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faStore,
//     faInfoCircle,
//     faGlobe,
//     faCity,
//     faPhoneAlt,
//     faQrcode,
//     faFilter,
//     faArrowLeft,
//     faArrowRight,
//     faSearch,
//     faTimes,
//     faChevronDown
// } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { fetchWithAuth } from "../../auth/fetchWithAuth";
// import { API_BASE_URL } from '../../apiConfig';

// const API_BASE = `${API_BASE_URL}/api/qrcode`;
// const ITEMS_PER_PAGE = 10;

// export default function ExploreShops() {
//     const { t } = useTranslation();
//     const navigate = useNavigate();

//     const [shops, setShops] = useState([]);
//     const [filteredShops, setFilteredShops] = useState([]); 
//     const [selectedShop, setSelectedShop] = useState(null);
//     const [qrData, setQrData] = useState(null);
//     const [error, setError] = useState(null);

//     const [pendingSearchTerm, setPendingSearchTerm] = useState('');
//     const [appliedSearchTerm, setAppliedSearchTerm] = useState('');

//     // const [pendingCountry, setPendingCountry] = useState('');
//     const [pendingCity, setPendingCity] = useState('');
//     // const [appliedCountry, setAppliedCountry] = useState('');
//     const [appliedCity, setAppliedCity] = useState('');

//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const [loadingShopId, setLoadingShopId] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isFilterOpen, setIsFilterOpen] = useState(false);
//     // const [countries, setCountries] = useState([]);
//     const [cities, setCities] = useState([]);

//     const checkAuth = () => {
//         const userId = localStorage.getItem('id');
//         if (!userId) {
//             navigate('/signin');
//             return false;
//         }
//         return userId;
//     };

//     useEffect(() => {
//         const userId = checkAuth();
//         if (!userId) return;

//         fetchShops(
//             userId,
//             currentPage,
//             appliedSearchTerm,
//             // appliedCountry,
//             appliedCity
//         );
//     // }, [currentPage, appliedSearchTerm, appliedCountry, appliedCity, navigate]);
//     }, [currentPage, appliedSearchTerm, appliedCity, navigate]);

//     // const fetchShops = async (userId, page, search = '', country = '', city = '') => {
//     const fetchShops = async (userId, page, search = '', city = '') => {
//         setIsLoading(true);
//         try {
//             let url = `${API_BASE}/allShopsAvailable?userId=${userId}&page=${page - 1}&size=${ITEMS_PER_PAGE}`;
//             if (search) url += `&searchTerm=${encodeURIComponent(search)}`;
//             // if (country) url += `&country=${encodeURIComponent(country)}`;
//             if (city) url += `&city=${encodeURIComponent(city)}`;

//             const response = await fetchWithAuth(url, { credentials: "include" });

//             if (!response.ok) {
//                 if (response.status === 401) {
//                     localStorage.clear();
//                     navigate('/signin');
//                     return;
//                 }
//                 throw new Error('Failed to load shops');
//             }

//             const data = await response.json();
//             const normalizedData = data.content.map(shop => ({
//                 ...shop,
//                 country: shop.country ? shop.country.toLowerCase() : '',
//                 city: shop.city ? shop.city.toLowerCase() : ''
//             }));
//             setShops(normalizedData);
//             setFilteredShops(normalizedData); // kept for compatibility but not really used
//             setTotalPages(data.totalPages);

//             // const uniqueCountries = [...new Set(normalizedData.map(shop => shop.country))].filter(Boolean).sort();
//             const uniqueCities = [...new Set(normalizedData.map(shop => shop.city))].filter(Boolean).sort();
//             // setCountries(uniqueCountries);
//             setCities(uniqueCities);
//         } catch (err) {
//             setError(err.message || 'Something went wrong');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleGenerateQR = async (shop) => {
//         const userId = checkAuth();
//         if (!userId) return;

//         try {
//             setLoadingShopId(shop.shopId);
//             setError(null);

//             const response = await fetchWithAuth(
//                 `${API_BASE}/generate?shopId=${shop.shopId}&userId=${userId}`,
//                 { credentials: "include" }
//             );

//             if (!response.ok) {
//                 if (response.status === 401) {
//                     localStorage.clear();
//                     navigate('/signin');
//                     return;
//                 }
//                 throw new Error('Failed to generate QR code');
//             }

//             const data = await response.json();
//             setQrData({
//                 qrCode: data.qrCodeImage,
//                 availablePoints: data.availableBalance,
//                 customerId: `CUST-${data.userId}`,
//                 userInfo: data.qrRawData,
//             });
//             setSelectedShop(shop);
//         } catch (err) {
//             setError(err.message || 'QR generation failed');
//         } finally {
//             setLoadingShopId(null);
//         }
//     };

//     const handleMoreDetails = (shop) => {
//         navigate(`/user/dashboard/${shop.shopId}`, { state: { shop } });
//     };

//     const handleApplySearch = () => {
//         setAppliedSearchTerm(pendingSearchTerm.trim());
//         setCurrentPage(1);
//     };

//     const handleApplyFilters = () => {
//         // setAppliedCountry(pendingCountry);
//         setAppliedCity(pendingCity);
//         setCurrentPage(1);
//         setIsFilterOpen(false);
//     };

//     const handleFilterReset = () => {
//         // setPendingCountry('');
//         setPendingCity('');
//         // setAppliedCountry('');
//         setAppliedCity('');
//         setCurrentPage(1);
//         setIsFilterOpen(false);
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     const currentShops = shops;  

//     if (isLoading) {
//         return (
//             <div className="flex flex-col items-center justify-center h-[60vh]">
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <div className="flex items-center justify-center gap-3 mb-4">
//                         <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//                         {/* <span className="text-xl font-bold text-gray-800">{t('explore.loading.title')}</span> */}
//                     </div>
//                     {/* <p className="text-gray-500">{t('explore.loading.subtitle')}</p> */}
//                 </motion.div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen p-8 md:p-12">
//             {/* <motion.h1
//                 className="text-4xl font-extrabold text-center text-blue-800 mb-10"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//             >
//                 {t('explore.title')}
//             </motion.h1>

//             <div className="flex flex-row md:flex-row justify-center items-start md:items-start mb-10 space-y-0 md:space-y-0 space-x-2 md:space-x-4 relative">
//                 <div className="relative flex-1 max-w-xl">
//                     <input
//                         type="text"
//                         value={pendingSearchTerm}
//                         onChange={(e) => setPendingSearchTerm(e.target.value)}
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                                 handleApplySearch();
//                             }
//                         }}
//                         placeholder={t('explore.searchPlaceholder')}
//                         className="w-full px-5 py-2 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 shadow-inner transition pr-12"
//                     />
//                     <button
//                         onClick={handleApplySearch}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 text-xl"
//                         title="Search"
//                     >
//                         <FontAwesomeIcon icon={faSearch} />
//                     </button>
//                 </div>

//                 <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="px-6 py-2 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg"
//                     onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 >
//                     <FontAwesomeIcon icon={faFilter} />
//                     {isFilterOpen ? t('explore.filter.close') : t('explore.filter.open')}
//                 </motion.button>

//                 {isFilterOpen && (
//                     <motion.div
//                         className="absolute top-full right-0 mt-3 bg-white p-6 rounded-xl shadow-2xl w-full md:w-96 z-50 border-t-4 border-blue-600"
//                         initial={{ opacity: 0, y: -10, scale: 0.9 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">{t('explore.filter.title')}</h2>
//                         <div className="mb-6">
//                             <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
//                                 <FontAwesomeIcon icon={faCity} className="text-blue-600" />
//                                 {t('explore.filter.city')}
//                             </label>

//                             <select
//                                 value={pendingCity}
//                                 onChange={(e) => setPendingCity(e.target.value)}
//                                 className="w-full px-4 py-2 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white"
//                             >
//                                 <option value="">{t('explore.filter.allCities')}</option>
//                                 {cities.map((city) => (
//                                 <option key={city} value={city}>
//                                     {city.toUpperCase()}
//                                 </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="flex justify-end space-x-3">
//                             <button
//                                 className="px-4 py-2 rounded-full text-gray-700 font-medium bg-gray-200 hover:bg-gray-300 transition"
//                                 onClick={handleFilterReset}
//                             >
//                                 {t('explore.filter.reset')}
//                             </button>
//                             <button
//                                 className="px-4 py-2 rounded-full text-white font-medium bg-blue-600 hover:bg-blue-700 transition"
//                                 onClick={handleApplyFilters}
//                             >
//                                 {t('explore.filter.done')}
//                             </button>
//                         </div>
//                     </motion.div>
//                 )}
//             </div> */}

//             {/* Header Section */}
//             <header className="px-4 mb-8 md:mb-12">
//                 <motion.h1
//                     className="text-3xl md:text-5xl font-black text-center text-slate-900 tracking-tight"
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, ease: "easeOut" }}
//                 >
//                     {t('explore.title')}
//                 </motion.h1>
//             </header>

//             {/* Search + Filter Container */}
//             <div className="flex flex-row items-center justify-center mb-10 gap-2 md:gap-4 relative max-w-3xl mx-auto px-4">
                
//                 {/* Modern Search Bar - Grows to fill space */}
//                 <div className="relative flex-grow group">
//                     <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500 text-slate-400">
//                         <FontAwesomeIcon icon={faSearch} className="text-sm" />
//                     </div>
//                     <input
//                         type="text"
//                         value={pendingSearchTerm}
//                         onChange={(e) => setPendingSearchTerm(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleApplySearch()}
//                         placeholder={t('explore.searchPlaceholder')}
//                         className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-700 text-sm md:text-base"
//                     />
//                 </div>

//                 {/* Soft Filter Button - Icon only on mobile to save space */}
//                 <motion.button
//                     whileTap={{ scale: 0.95 }}
//                     className={`h-auto px-4 md:px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-3 shadow-lg 
//                         ${isFilterOpen 
//                             ? 'bg-slate-900 text-white shadow-slate-200' 
//                             : 'bg-white text-slate-700 border border-slate-100 shadow-slate-100 hover:bg-slate-50'
//                         }`}
//                     onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 >
//                     <FontAwesomeIcon icon={faFilter} className={isFilterOpen ? 'text-indigo-400' : 'text-slate-400'} />
//                     <span className="hidden md:inline">
//                         {isFilterOpen ? t('explore.filter.close') : t('explore.filter.open')}
//                     </span>
//                 </motion.button>

//                 {/* Filter Dropdown - Responsive Positioning */}
//                 <AnimatePresence>
//                     {isFilterOpen && (
//                         <>
//                             {/* Backdrop for mobile focus */}
//                             <motion.div 
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 exit={{ opacity: 0 }}
//                                 onClick={() => setIsFilterOpen(false)}
//                                 className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
//                             />

//                             <motion.div
//                                 initial={{ opacity: 0, y: 20, scale: 0.95 }}
//                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                 exit={{ opacity: 0, y: 20, scale: 0.95 }}
//                                 className="absolute top-[calc(100%+12px)] right-0 left-0 md:left-auto bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-[1rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full md:w-96 z-50 border border-slate-100"
//                             >
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
//                                         {t('explore.filter.title')}
//                                     </h2>
//                                     <button 
//                                         onClick={() => setIsFilterOpen(false)}
//                                         className="md:hidden text-slate-400 p-2"
//                                     >
//                                         <FontAwesomeIcon icon={faTimes} />
//                                     </button>
//                                 </div>

//                                 <div className="space-y-6">
//                                     <div className="space-y-2">
//                                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
//                                             {t('explore.filter.city')}
//                                         </label>
//                                         <div className="relative">
//                                             <select
//                                                 value={pendingCity}
//                                                 onChange={(e) => setPendingCity(e.target.value)}
//                                                 className="w-full px-5 py-2 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none text-slate-700 font-medium text-sm"
//                                             >
//                                                 <option value="">{t('explore.filter.allCities')}</option>
//                                                 {cities.map((city) => (
//                                                     <option key={city} value={city}>
//                                                         {city.toUpperCase()}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
//                                                 <FontAwesomeIcon icon={faChevronDown} size="xs" />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="flex gap-3 pt-2">
//                                         <button
//                                             className="flex-1 py-2 rounded-full text-slate-500 font-bold bg-slate-100 hover:bg-slate-200 transition-colors text-sm"
//                                             onClick={handleFilterReset}
//                                         >
//                                             {t('explore.filter.reset')}
//                                         </button>
//                                         <button
//                                             className="flex-1 py-2 rounded-full text-white font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all text-sm"
//                                             onClick={handleApplyFilters}
//                                         >
//                                             {t('explore.filter.done')}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         </>
//                     )}
//                 </AnimatePresence>
//             </div>

//             {error && <p className="text-red-500 text-center font-semibold bg-red-100 p-3 rounded-xl mx-auto max-w-lg mb-6">{error}</p>}

//             {currentShops.length === 0 ? (
//                 <p className="text-center text-gray-500 font-medium mt-10 p-5">
//                     <span className="text-2xl font-bold text-blue-600 block mb-2">{t('explore.noResults.oops')}</span>
//                     {t('explore.noResults.message')}
//                 </p>
//             ) : (
//                 // <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-6 w-full max-w-full mx-auto">
//                 //     {currentShops.map((shop) => (
//                 //         <div
//                 //             key={shop.shopId}
//                 //             className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-100"
//                 //         >
//                 //             {/* Gradient Header */}
//                 //             <div className="bg-blue-700 p-3 text-white flex items-center">
//                 //                 <FontAwesomeIcon icon={faStore} className="mr-2 text-lg" />
//                 //                 <h2 className="font-bold text-lg truncate">{shop.shopName}</h2>
//                 //             </div>

//                 //             {/* Image with Awning */}
//                 //             <div className="relative">
//                 //                 <div className="absolute top-0 left-0 right-0 h-4 bg-blue-600 clip-awning"></div>
//                 //                 {shop.logoUrl ? (
//                 //                     <img
//                 //                         src={`${API_BASE_URL}${shop.logoUrl}`}
//                 //                         alt={shop.shopName}
//                 //                         className="w-full h-40 object-cover border-blue-800"
//                 //                     />
//                 //                 ) : (
//                 //                     <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-200 border-blue-800 flex items-center justify-center">
//                 //                         <span className="text-5xl font-bold text-blue-700">
//                 //                             {shop.shopName.charAt(0).toUpperCase()}
//                 //                         </span>
//                 //                     </div>
//                 //                 )}
//                 //             </div>

//                 //             {/* Card Body */}
//                 //             <div className="p-4 bg-blue-50">
//                 //                 {/* Country & City */}
//                 //                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-sm mb-3">
//                 //                     <div className="flex items-center bg-white p-1 rounded border border-blue-200">
//                 //                         <FontAwesomeIcon icon={faGlobe} className="mr-2 text-blue-700 text-xs" />
//                 //                         <span className="font-medium text-blue-800 truncate">{shop.country ? shop.country.toUpperCase() : 'N/A'}</span>
//                 //                     </div>
//                 //                     <div className="flex items-center bg-white p-1 rounded border border-blue-200">
//                 //                         <FontAwesomeIcon icon={faCity} className="mr-2 text-blue-700 text-xs" />
//                 //                         <span className="font-medium text-blue-800 truncate">{shop.city ? shop.city.toUpperCase() : 'N/A'}</span>
//                 //                     </div>
//                 //                 </div>

//                 //                 {/* Phone */}
//                 //                 <div className="flex items-center mt-2 bg-white p-1 rounded border border-blue-200">
//                 //                     <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-blue-700" />
//                 //                     <span className="text-sm font-medium text-blue-800">{shop.shopPhone || 'N/A'}</span>
//                 //                 </div>

//                 //                 {/* QR Button */}
//                 //                 <motion.button
//                 //                     whileHover={{ scale: 1.02 }}
//                 //                     whileTap={{ scale: 0.98 }}
//                 //                     onClick={() => handleGenerateQR(shop)}
//                 //                     disabled={loadingShopId === shop.shopId}
//                 //                     className={`w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-sm font-medium transition flex items-center justify-center gap-2
//                 //                         ${loadingShopId === shop.shopId ? 'opacity-70 cursor-not-allowed' : ''}`}
//                 //                 >
//                 //                     {loadingShopId === shop.shopId ? (
//                 //                         <>
//                 //                             <Loader2 className="w-4 h-4 animate-spin" />
//                 //                             {t('explore.qr.generating')}
//                 //                         </>
//                 //                     ) : (
//                 //                         <>
//                 //                             <FontAwesomeIcon icon={faQrcode} />
//                 //                             {t('explore.qr.button')}
//                 //                         </>
//                 //                     )}
//                 //                 </motion.button>
//                 //             </div>
//                 //         </div>
//                 //     ))}
//                 // </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 xl:gap-6 w-full max-w-full mx-auto">
//                     {currentShops.map((shop) => (
//                         <motion.div
//                         key={shop.shopId}
//                         whileHover={{ y: -8 }}
//                         className="group bg-white rounded-[1rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col"
//                         >
//                         {/* Visual Header Section */}
//                         <div className="relative h-48 overflow-hidden">
//                             {/* Soft Overlay for Name Visibility */}
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-80" />
                            
//                             {/* Shop Name Overlay */}
//                             <div className="absolute bottom-4 left-5 z-20 right-5">
//                             <div className="flex items-center gap-2">
//                                 <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
//                                 <FontAwesomeIcon icon={faStore} className="text-white text-xs" />
//                                 </div>
//                                 <h2 className="font-bold text-white text-lg truncate tracking-tight">
//                                 {shop.shopName}
//                                 </h2>
//                             </div>
//                             </div>

//                             {/* Hero Image */}
//                             {shop.logoUrl ? (
//                             <img
//                                 src={`${API_BASE_URL}${shop.logoUrl}`}
//                                 alt={shop.shopName}
//                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                             />
//                             ) : (
//                             <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
//                                 <span className="text-6xl font-black text-indigo-200/60 select-none">
//                                 {shop.shopName.charAt(0).toUpperCase()}
//                                 </span>
//                             </div>
//                             )}
//                         </div>

//                         {/* Content Body */}
//                         <div className="p-5 flex flex-col flex-1 bg-white">
//                             {/* Location Info - Soft Row */}
//                             <div className="flex items-center gap-3 mb-4">
//                             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-100">
//                                 <FontAwesomeIcon icon={faGlobe} className="text-indigo-500 text-[10px]" />
//                                 <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
//                                 {shop.country || 'N/A'}
//                                 </span>
//                             </div>
//                             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-100">
//                                 <FontAwesomeIcon icon={faCity} className="text-indigo-500 text-[10px]" />
//                                 <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
//                                 {shop.city || 'N/A'}
//                                 </span>
//                             </div>
//                             </div>

//                             {/* Contact Snippet */}
//                             <div className="flex items-center gap-3 text-slate-400 mb-6 px-1">
//                             <FontAwesomeIcon icon={faPhoneAlt} className="text-xs text-slate-400" />
//                             <span className="text-sm font-medium tracking-tight">
//                                 {shop.shopPhone || 'No contact provided'}
//                             </span>
//                             </div>

//                             {/* Action Section */}
//                             <div className="mt-auto">
//                             <motion.button
//                                 whileTap={{ scale: 0.96 }}
//                                 onClick={() => handleGenerateQR(shop)}
//                                 disabled={loadingShopId === shop.shopId}
//                                 className={`w-full py-1.5 px-6 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center gap-3
//                                 ${loadingShopId === shop.shopId 
//                                     ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
//                                     : 'bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200'
//                                 }`}
//                             >
//                                 {loadingShopId === shop.shopId ? (
//                                 <>
//                                     <Loader2 className="w-4 h-4 animate-spin" />
//                                     <span>{t('explore.qr.generating')}</span>
//                                 </>
//                                 ) : (
//                                 <>
//                                     <FontAwesomeIcon icon={faQrcode} className="text-xs" />
//                                     <span>{t('explore.qr.button')}</span>
//                                 </>
//                                 )}
//                             </motion.button>
//                             <motion.button
//                                 whileTap={{ scale: 0.96 }}
//                                 onClick={() => handleMoreDetails(shop)}
//                                 className="w-full py-1 px-6 rounded-full mt-2 text-xs text-slate-600 hover:underline hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-0.5"
//                             >
//                                 <FontAwesomeIcon icon={faInfoCircle} className="text-xs" />
//                                 <span>More Details</span>
//                             </motion.button>
//                             </div>
//                         </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             )}

//             {totalPages > 1 && (
//                 <div className="flex justify-center items-center mt-12 space-x-3">
//                     <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1} label={t('explore.pagination.previous')} icon={faArrowLeft} />
//                     <div className="flex space-x-2">
//                         {Array.from({ length: totalPages }, (_, i) => (
//                             <motion.button
//                                 key={i}
//                                 onClick={() => setCurrentPage(i + 1)}
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className={`w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center transition-all duration-200 ${
//                                     currentPage === i + 1
//                                         ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-600'
//                                         : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
//                                 }`}
//                             >
//                                 {i + 1}
//                             </motion.button>
//                         ))}
//                     </div>
//                     <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages} label={t('explore.pagination.next')} icon={faArrowRight} />
//                 </div>
//             )}

//             <QRModal
//                 shop={selectedShop}
//                 qrData={qrData}
//                 isOpen={!!selectedShop}
//                 onClose={() => {
//                     setSelectedShop(null);
//                     setQrData(null);
//                 }}
//             />

//             <style jsx>{`
//                 .clip-awning {
//                     clip-path: polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%);
//                 }
//             `}</style>
//         </div>
//     );
// }

// const PaginationButton = ({ onClick, disabled, label, icon }) => (
//     <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={onClick}
//         disabled={disabled}
//         className={`px-5 py-2 rounded-full font-medium flex items-center gap-2 shadow-md transition-all duration-200 ${
//             disabled
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700'
//         }`}
//     >
//         {icon && <FontAwesomeIcon icon={icon} />}
//         {label}
//     </motion.button>
// );











import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRModal from './QRModal';
import { 
    Loader2, Search, X, Filter, ChevronDown, 
    MapPin, Phone, QrCode, ArrowLeft, 
    ArrowRight, Store, ExternalLink, Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchWithAuth } from "../../auth/fetchWithAuth";
import { API_BASE_URL } from '../../apiConfig';

const API_BASE = `${API_BASE_URL}/api/qrcode`;
const ITEMS_PER_PAGE = 10;

const ShopSkeleton = () => (
    <div className="bg-white rounded-xl border border-slate-200 p-4 h-[380px] animate-pulse">
        <div className="w-full h-40 bg-slate-100 rounded-lg mb-4" />
        <div className="h-5 bg-slate-100 rounded w-2/3 mb-3" />
        <div className="space-y-2">
            <div className="h-3 bg-slate-50 rounded w-1/2" />
            <div className="h-3 bg-slate-50 rounded w-1/3" />
        </div>
        <div className="mt-auto pt-4">
            <div className="h-10 bg-slate-100 rounded-lg w-full" />
        </div>
    </div>
);

export default function ExploreShops() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [shops, setShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]); 
    const [selectedShop, setSelectedShop] = useState(null);
    const [qrData, setQrData] = useState(null);
    const [error, setError] = useState(null);

    const [pendingSearchTerm, setPendingSearchTerm] = useState('');
    const [appliedSearchTerm, setAppliedSearchTerm] = useState('');

    const [pendingCity, setPendingCity] = useState('');
    const [appliedCity, setAppliedCity] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingShopId, setLoadingShopId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [cities, setCities] = useState([]);

    const checkAuth = () => {
        const userId = localStorage.getItem('id');
        if (!userId) {
            navigate('/signin');
            return false;
        }
        return userId;
    };

    useEffect(() => {
        const userId = checkAuth();
        if (!userId) return;
        fetchShops(userId, currentPage, appliedSearchTerm, appliedCity);
    }, [currentPage, appliedSearchTerm, appliedCity, navigate]);

    const fetchShops = async (userId, page, search = '', city = '') => {
        setIsLoading(true);
        try {
            let url = `${API_BASE}/allShopsAvailable?userId=${userId}&page=${page - 1}&size=${ITEMS_PER_PAGE}`;
            if (search) url += `&searchTerm=${encodeURIComponent(search)}`;
            if (city) url += `&city=${encodeURIComponent(city)}`;
            const response = await fetchWithAuth(url, { credentials: "include" });
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.clear();
                    navigate('/signin');
                    return;
                }
                throw new Error('Failed to load shops');
            }
            const data = await response.json();
            const normalizedData = data.content.map(shop => ({
                ...shop,
                country: shop.country ? shop.country.toLowerCase() : '',
                city: shop.city ? shop.city.toLowerCase() : ''
            }));
            setShops(normalizedData);
            setFilteredShops(normalizedData); 
            setTotalPages(data.totalPages);
            const uniqueCities = [...new Set(normalizedData.map(shop => shop.city))].filter(Boolean).sort();
            setCities(uniqueCities);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateQR = async (shop) => {
        const userId = checkAuth();
        if (!userId) return;
        try {
            setLoadingShopId(shop.shopId);
            setError(null);
            const response = await fetchWithAuth(
                `${API_BASE}/generate?shopId=${shop.shopId}&userId=${userId}`,
                { credentials: "include" }
            );
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.clear();
                    navigate('/signin');
                    return;
                }
                throw new Error('Failed to generate QR code');
            }
            const data = await response.json();
            setQrData({
                qrCode: data.qrCodeImage,
                availablePoints: data.availableBalance,
                customerId: `CUST-${data.userId}`,
                userInfo: data.qrRawData,
            });
            setSelectedShop(shop);
        } catch (err) {
            setError(err.message || 'QR generation failed');
        } finally {
            setLoadingShopId(null);
        }
    };

    const handleMoreDetails = (shop) => {
        navigate(`/user/dashboard/${shop.shopId}`, { state: { shop } });
    };

    const handleApplySearch = () => {
        setAppliedSearchTerm(pendingSearchTerm.trim());
        setCurrentPage(1);
    };

    const handleApplyFilters = () => {
        setAppliedCity(pendingCity);
        setCurrentPage(1);
        setIsFilterOpen(false);
    };

    const handleFilterReset = () => {
        setPendingCity('');
        setAppliedCity('');
        setCurrentPage(1);
        setIsFilterOpen(false);
    };

    const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
    const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

    const currentShops = shops;  

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans antialiased">
            
            {/* SaaS Layout Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-[1400px] mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                {t('explore.title')}
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">
                                {t('explore.subtitle')}
                                
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                {shops.length}+ {t('explore.partners')}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-6 py-8">
                
                {/* Clean Control Bar */}
                <div className="flex flex-col md:flex-row items-center gap-3 mb-8">
                    <div className="relative flex-1 w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={pendingSearchTerm}
                            onChange={(e) => setPendingSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleApplySearch()}
                            placeholder="Search by shop name..."
                            className="w-full pl-10 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all outline-none"
                        />
                        {pendingSearchTerm && (
                            <button onClick={() => {setPendingSearchTerm(''); setAppliedSearchTerm('');}} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="relative w-full md:w-auto">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all w-full md:w-auto
                                ${isFilterOpen ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                        >
                            <Filter className="w-4 h-4" />
                            {t('explore.filter.open')}
                            <ChevronDown className={`w-3 h-3 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    className="absolute top-full mt-2 right-0 w-full md:w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-5"
                                >
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">{t('explore.filter.title')}</span>
                                    <select
                                        value={pendingCity}
                                        onChange={(e) => setPendingCity(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-lg text-sm outline-none mb-4 focus:border-indigo-600"
                                    >
                                        <option value="">{t('explore.filter.allCities')}</option>
                                        {cities.map((city) => <option key={city} value={city}>{city.toUpperCase()}</option>)}
                                    </select>
                                    <div className="flex gap-2">
                                        <button onClick={handleFilterReset} className="flex-1 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700">{t('explore.filter.reset')}</button>
                                        <button onClick={handleApplyFilters} className="flex-1 py-2 text-xs font-semibold bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors">{t('explore.filter.done')}</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {error && <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 flex items-center gap-2 font-medium">{error}</div>}

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {[...Array(10)].map((_, i) => <ShopSkeleton key={i} />)}
                    </div>
                ) : currentShops.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200">
                        <Store className="w-12 h-12 text-slate-200 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900">{t('explore.noResults.oops')}</h3>
                        <p className="text-slate-500 text-sm">{t('explore.noResults.message')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {currentShops.map((shop) => (
                            <motion.div
                                key={shop.shopId}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="group bg-white rounded-xl border border-slate-200 flex flex-col hover:border-slate-300 hover:shadow-md transition-all duration-200"
                            >
                                {/* Professional Image Section */}
                                <div className="relative h-44 w-full bg-slate-50 rounded-t-xl overflow-hidden border-b border-slate-100">
                                    {shop.logoUrl ? (
                                        <img
                                            src={`${API_BASE_URL}${shop.logoUrl}`}
                                            alt={shop.shopName}
                                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-200 font-bold text-4xl">
                                            {shop.shopName.charAt(0)}
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-0.5 bg-white/90 backdrop-blur border border-slate-200 text-[10px] font-bold text-slate-600 rounded uppercase tracking-wider">
                                            {t('explore.partners')}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="mb-4">
                                        <h2 className="text-base font-semibold text-slate-900 leading-tight truncate">
                                            {shop.shopName}
                                        </h2>
                                        <div className="flex items-center gap-1.5 mt-2 text-slate-500">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span className="text-xs font-medium truncate capitalize">{shop.city || 'Global'}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center justify-between text-xs text-slate-400">
                                            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{t('explore.contact')}</span>
                                            <span className="font-medium text-slate-600">{shop.shopPhone || '—'}</span>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center gap-2">
                                        <motion.button
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleGenerateQR(shop)}
                                            disabled={loadingShopId === shop.shopId}
                                            className="flex-[2] py-2 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-sm hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 transition-all flex items-center justify-center gap-2"
                                        >
                                            {loadingShopId === shop.shopId ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><QrCode className="w-3.5 h-3.5" /> {t('explore.qr.button')}</>}
                                        </motion.button>
                                        
                                        <button
                                            onClick={() => handleMoreDetails(shop)}
                                            className="flex-1 py-2.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
                                        >
                                            <Info className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* SaaS Minimalist Pagination */}
                {totalPages > 1 && (
                    <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-6">
                        <p className="text-xs font-medium text-slate-500">
                            {t('explore.pagination.showing')} <span className="text-slate-900">{currentPage}</span> {t('explore.pagination.next')} <span className="text-slate-900">{totalPages}</span>
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="p-2 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                            <div className="flex gap-1">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-all
                                            ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-white border border-transparent hover:border-slate-200'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <QRModal
                shop={selectedShop}
                qrData={qrData}
                isOpen={!!selectedShop}
                onClose={() => {
                    setSelectedShop(null);
                    setQrData(null);
                }}
            />
        </div>
    );
}