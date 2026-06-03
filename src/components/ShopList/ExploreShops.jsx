// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import QRModal from './QRModal';
// import { 
//     Loader2, Search, X, Filter, ChevronDown, 
//     MapPin, Phone, QrCode, ArrowLeft, 
//     ArrowRight, Store, ExternalLink, Info
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { fetchWithAuth } from "../../auth/fetchWithAuth";
// import { API_BASE_URL } from '../../apiConfig';

// const API_BASE = `${API_BASE_URL}/api/qrcode`;
// const ITEMS_PER_PAGE = 10;

// const ShopSkeleton = () => (
//     <div className="bg-white rounded-xl border border-slate-200 p-4 h-[380px] animate-pulse">
//         <div className="w-full h-40 bg-slate-100 rounded-lg mb-4" />
//         <div className="h-5 bg-slate-100 rounded w-2/3 mb-3" />
//         <div className="space-y-2">
//             <div className="h-3 bg-slate-50 rounded w-1/2" />
//             <div className="h-3 bg-slate-50 rounded w-1/3" />
//         </div>
//         <div className="mt-auto pt-4">
//             <div className="h-10 bg-slate-100 rounded-lg w-full" />
//         </div>
//     </div>
// );

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

//     const [pendingCity, setPendingCity] = useState('');
//     const [appliedCity, setAppliedCity] = useState('');

//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const [loadingShopId, setLoadingShopId] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isFilterOpen, setIsFilterOpen] = useState(false);
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
//         fetchShops(userId, currentPage, appliedSearchTerm, appliedCity);
//     }, [currentPage, appliedSearchTerm, appliedCity, navigate]);

//     const fetchShops = async (userId, page, search = '', city = '') => {
//         setIsLoading(true);
//         try {
//             let url = `${API_BASE}/allShopsAvailable?userId=${userId}&page=${page - 1}&size=${ITEMS_PER_PAGE}`;
//             if (search) url += `&searchTerm=${encodeURIComponent(search)}`;
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
//             setFilteredShops(normalizedData); 
//             setTotalPages(data.totalPages);
//             const uniqueCities = [...new Set(normalizedData.map(shop => shop.city))].filter(Boolean).sort();
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
//         setAppliedCity(pendingCity);
//         setCurrentPage(1);
//         setIsFilterOpen(false);
//     };

//     const handleFilterReset = () => {
//         setPendingCity('');
//         setAppliedCity('');
//         setCurrentPage(1);
//         setIsFilterOpen(false);
//     };

//     const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
//     const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

//     const currentShops = shops;  

//     return (
//         <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans antialiased">
            
//             {/* SaaS Layout Header */}
//             <header className="bg-white border-b border-slate-200">
//                 <div className="max-w-[1400px] mx-auto px-6 py-8">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                         <div>
//                             <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
//                                 {t('explore.title')}
//                             </h1>
//                             <p className="text-sm text-slate-500 mt-1">
//                                 {t('explore.subtitle')}
                                
//                             </p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-bold text-slate-500 uppercase tracking-wider">
//                                 {shops.length}+ {t('explore.partners')}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             <main className="max-w-[1400px] mx-auto px-6 py-8">
                
//                 {/* Clean Control Bar */}
//                 <div className="flex flex-col md:flex-row items-center gap-3 mb-8">
//                     <div className="relative flex-1 w-full max-w-md">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                         <input
//                             type="text"
//                             value={pendingSearchTerm}
//                             onChange={(e) => setPendingSearchTerm(e.target.value)}
//                             onKeyDown={(e) => e.key === 'Enter' && handleApplySearch()}
//                             placeholder="Search by shop name..."
//                             className="w-full pl-10 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all outline-none"
//                         />
//                         {pendingSearchTerm && (
//                             <button onClick={() => {setPendingSearchTerm(''); setAppliedSearchTerm('');}} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
//                                 <X className="w-4 h-4" />
//                             </button>
//                         )}
//                     </div>

//                     <div className="relative w-full md:w-auto">
//                         <button
//                             onClick={() => setIsFilterOpen(!isFilterOpen)}
//                             className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all w-full md:w-auto
//                                 ${isFilterOpen ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
//                         >
//                             <Filter className="w-4 h-4" />
//                             {t('explore.filter.open')}
//                             <ChevronDown className={`w-3 h-3 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
//                         </button>

//                         <AnimatePresence>
//                             {isFilterOpen && (
//                                 <motion.div
//                                     initial={{ opacity: 0, y: 8 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: 8 }}
//                                     className="absolute top-full mt-2 right-0 w-full md:w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-5"
//                                 >
//                                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">{t('explore.filter.title')}</span>
//                                     <select
//                                         value={pendingCity}
//                                         onChange={(e) => setPendingCity(e.target.value)}
//                                         className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-lg text-sm outline-none mb-4 focus:border-indigo-600"
//                                     >
//                                         <option value="">{t('explore.filter.allCities')}</option>
//                                         {cities.map((city) => <option key={city} value={city}>{city.toUpperCase()}</option>)}
//                                     </select>
//                                     <div className="flex gap-2">
//                                         <button onClick={handleFilterReset} className="flex-1 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700">{t('explore.filter.reset')}</button>
//                                         <button onClick={handleApplyFilters} className="flex-1 py-2 text-xs font-semibold bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors">{t('explore.filter.done')}</button>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </div>
//                 </div>

//                 {error && <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 flex items-center gap-2 font-medium">{error}</div>}

//                 {isLoading ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
//                         {[...Array(10)].map((_, i) => <ShopSkeleton key={i} />)}
//                     </div>
//                 ) : currentShops.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200">
//                         <Store className="w-12 h-12 text-slate-200 mb-4" />
//                         <h3 className="text-lg font-semibold text-slate-900">{t('explore.noResults.oops')}</h3>
//                         <p className="text-slate-500 text-sm">{t('explore.noResults.message')}</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
//                         {currentShops.map((shop) => (
//                             <motion.div
//                                 key={shop.shopId}
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 className="group bg-white rounded-xl border border-slate-200 flex flex-col hover:border-slate-300 hover:shadow-md transition-all duration-200"
//                             >
//                                 {/* Professional Image Section */}
//                                 <div className="relative h-44 w-full bg-slate-50 rounded-t-xl overflow-hidden border-b border-slate-100">
//                                     {shop.logoUrl ? (
//                                         <img
//                                             src={`${API_BASE_URL}${shop.logoUrl}`}
//                                             alt={shop.shopName}
//                                             className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
//                                         />
//                                     ) : (
//                                         <div className="w-full h-full flex items-center justify-center text-slate-200 font-bold text-4xl">
//                                             {shop.shopName.charAt(0)}
//                                         </div>
//                                     )}
//                                     <div className="absolute top-3 left-3">
//                                         <span className="px-2 py-0.5 bg-white/90 backdrop-blur border border-slate-200 text-[10px] font-bold text-slate-600 rounded uppercase tracking-wider">
//                                             {t('explore.partners')}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {/* Content Section */}
//                                 <div className="p-5 flex flex-col flex-1">
//                                     <div className="mb-4">
//                                         <h2 className="text-base font-semibold text-slate-900 leading-tight truncate">
//                                             {shop.shopName}
//                                         </h2>
//                                         <div className="flex items-center gap-1.5 mt-2 text-slate-500">
//                                             <MapPin className="w-3.5 h-3.5" />
//                                             <span className="text-xs font-medium truncate capitalize">{shop.city || 'Global'}</span>
//                                         </div>
//                                     </div>

//                                     <div className="space-y-2 mb-6">
//                                         <div className="flex items-center justify-between text-xs text-slate-400">
//                                             <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{t('explore.contact')}</span>
//                                             <span className="font-medium text-slate-600">{shop.shopPhone || '—'}</span>
//                                         </div>
//                                     </div>

//                                     {/* Action Footer */}
//                                     <div className="mt-auto pt-4 border-t border-slate-50 flex items-center gap-2">
//                                         <motion.button
//                                             whileTap={{ scale: 0.98 }}
//                                             onClick={() => handleGenerateQR(shop)}
//                                             disabled={loadingShopId === shop.shopId}
//                                             className="flex-[2] py-2 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-sm hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 transition-all flex items-center justify-center gap-2"
//                                         >
//                                             {loadingShopId === shop.shopId ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><QrCode className="w-3.5 h-3.5" /> {t('explore.qr.button')}</>}
//                                         </motion.button>
                                        
//                                         <button
//                                             onClick={() => handleMoreDetails(shop)}
//                                             className="flex-1 py-2.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
//                                         >
//                                             <Info className="w-3.5 h-3.5" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 )}

//                 {/* SaaS Minimalist Pagination */}
//                 {totalPages > 1 && (
//                     <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-6">
//                         <p className="text-xs font-medium text-slate-500">
//                             {t('explore.pagination.showing')} <span className="text-slate-900">{currentPage}</span> {t('explore.pagination.next')} <span className="text-slate-900">{totalPages}</span>
//                         </p>
//                         <div className="flex gap-2">
//                             <button
//                                 onClick={handlePrevPage}
//                                 disabled={currentPage === 1}
//                                 className="p-2 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
//                             >
//                                 <ArrowLeft className="w-4 h-4" />
//                             </button>
//                             <div className="flex gap-1">
//                                 {Array.from({ length: totalPages }, (_, i) => (
//                                     <button
//                                         key={i}
//                                         onClick={() => setCurrentPage(i + 1)}
//                                         className={`w-9 h-9 rounded-lg text-xs font-bold transition-all
//                                             ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-white border border-transparent hover:border-slate-200'}`}
//                                     >
//                                         {i + 1}
//                                     </button>
//                                 ))}
//                             </div>
//                             <button
//                                 onClick={handleNextPage}
//                                 disabled={currentPage === totalPages}
//                                 className="p-2 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
//                             >
//                                 <ArrowRight className="w-4 h-4" />
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </main>

//             <QRModal
//                 shop={selectedShop}
//                 qrData={qrData}
//                 isOpen={!!selectedShop}
//                 onClose={() => {
//                     setSelectedShop(null);
//                     setQrData(null);
//                 }}
//             />
//         </div>
//     );
// }














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

    // const [pendingCity, setPendingCity] = useState('');
    // const [appliedCity, setAppliedCity] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingShopId, setLoadingShopId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    // const [cities, setCities] = useState([]);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [pendingState, setPendingState] = useState('');
    const [appliedState, setAppliedState] = useState('');

    const [pendingCity, setPendingCity] = useState('');
    const [appliedCity, setAppliedCity] = useState('');

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
        fetchShops(userId, currentPage, appliedSearchTerm, appliedState, appliedCity);
    }, [currentPage, appliedSearchTerm, appliedState, appliedCity, navigate]);

    const fetchStates = async (userId) => {
        try {
            const res = await fetchWithAuth(
                `${API_BASE}/states?userId=${userId}`
            );

            const data = await res.json();

            setStates(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCities = async (state) => {

        const userId = localStorage.getItem("id");

        try {
            const res = await fetchWithAuth(
                `${API_BASE}/cities?userId=${userId}&state=${state}`
            );

            const data = await res.json();

            setCities(data);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {

        const userId = checkAuth();

        if (!userId) return;

        fetchStates(userId);

    }, []);

    useEffect(() => {

        if (pendingState) {

            fetchCities(pendingState);

        } else {

            setCities([]);

            setPendingCity('');

        }

    }, [pendingState]);

    const fetchShops = async (userId, page, search = '', state='', city = '') => {
        setIsLoading(true);
        try {
            let url = `${API_BASE}/allShopsAvailable?userId=${userId}&page=${page - 1}&size=${ITEMS_PER_PAGE}`;
            if (search) url += `&searchTerm=${encodeURIComponent(search)}`;
            if(state){
                url += `&state=${encodeURIComponent(state)}`;
            }
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
                state: shop.state ? shop.state.toLowerCase() : '',
                city: shop.city ? shop.city.toLowerCase() : ''
            }));
            setShops(normalizedData);
            setFilteredShops(normalizedData); 
            setTotalPages(data.totalPages);
            // const uniqueCities = [...new Set(normalizedData.map(shop => shop.city))].filter(Boolean).sort();
            // setCities(uniqueCities);
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
        setAppliedState(pendingState);
        setAppliedCity(pendingCity);
        setCurrentPage(1);
        setIsFilterOpen(false);
    };

    const handleFilterReset = () => {
        setPendingState('');
        setPendingCity('');
        setAppliedState('');
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
                                        value={pendingState}
                                        onChange={(e) => {
                                            setPendingState(e.target.value);
                                            setPendingCity('');
                                        }}
                                        className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-lg text-sm outline-none mb-4 focus:border-indigo-600"
                                    >
                                        <option value="">All States</option>

                                        {states.map(state => (
                                            <option
                                                key={state}
                                                value={state}
                                            >
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    {/* <select
                                        value={pendingCity}
                                        onChange={(e) => setPendingCity(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-lg text-sm outline-none mb-4 focus:border-indigo-600"
                                    >
                                        <option value="">{t('explore.filter.allCities')}</option>
                                        {cities.map((city) => <option key={city} value={city}>{city.toUpperCase()}</option>)}
                                    </select> */}
                                    <select
                                        value={pendingCity}
                                        onChange={(e)=>setPendingCity(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-lg text-sm outline-none mb-4 focus:border-indigo-600"
                                    >
                                        <option value="">All Cities</option>

                                        {cities.map(city => (
                                            <option
                                                key={city}
                                                value={city}
                                            >
                                                {city}
                                            </option>
                                        ))}
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
                                            <span className="text-xs font-medium truncate capitalize">{shop.state ? `${shop.city}, ${shop.state}` : shop.city || 'Global'}</span>
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