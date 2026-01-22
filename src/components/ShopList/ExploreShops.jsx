// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import QRModal from './QRModal';
// import { Loader2 } from 'lucide-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faStore,
//     faIdBadge,
//     faGlobe,
//     faCity,
//     faPhoneAlt,
//     faQrcode,
//     faFilter,
//     faArrowLeft,
//     faArrowRight
// } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';

// const API_BASE_URL = 'https://loyalty-backend-java.onrender.com/api/qrcode';
// const ITEMS_PER_PAGE = 10;

// export default function ExploreShops() {
//     const navigate = useNavigate();

//     const [shops, setShops] = useState([]);
//     const [filteredShops, setFilteredShops] = useState([]);
//     const [selectedShop, setSelectedShop] = useState(null);
//     const [qrData, setQrData] = useState(null);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [loadingShopId, setLoadingShopId] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isFilterOpen, setIsFilterOpen] = useState(false);
//     const [selectedCountry, setSelectedCountry] = useState('');
//     const [selectedCity, setSelectedCity] = useState('');
//     const [countries, setCountries] = useState([]);
//     const [cities, setCities] = useState([]);

//     const checkAuth = () => {
//         const isLoggedIn = localStorage.getItem('isLoggedIn');
//         const userId = localStorage.getItem('id');
//         if (!isLoggedIn || !userId) {
//             navigate('/signin');
//             return false;
//         }
//         return userId;
//     };

//     useEffect(() => {
//         const userId = checkAuth();
//         if (!userId) return;

//         const fetchShops = async () => {
//             try {
//                 const response = await fetch(`${API_BASE_URL}/allShopsAvailable?userId=${userId}`, {
//                     credentials: "include", 
//                 });

//                 if (!response.ok) {
//                     if (response.status === 401) {
//                         localStorage.clear();
//                         navigate('/signin');
//                         return;
//                     }
//                     throw new Error('Failed to load shops');
//                 }

//                 const data = await response.json();
//                 const normalizedData = data.map(shop => ({
//                     ...shop,
//                     country: shop.country ? shop.country.toLowerCase() : '',
//                     city: shop.city ? shop.city.toLowerCase() : ''
//                 }));
//                 setShops(normalizedData);
//                 setFilteredShops(normalizedData);

//                 const uniqueCountries = [...new Set(normalizedData.map(shop => shop.country))].filter(Boolean).sort();
//                 const uniqueCities = [...new Set(normalizedData.map(shop => shop.city))].filter(Boolean).sort();
//                 setCountries(uniqueCountries);
//                 setCities(uniqueCities);
//             } catch (err) {
//                 setError(err.message || 'Something went wrong');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchShops();
//     }, [navigate]);

//     useEffect(() => {
//         let filtered = shops;

//         if (searchTerm) {
//             const lower = searchTerm.toLowerCase();
//             filtered = filtered.filter(shop =>
//                 typeof shop.shopName === 'string' &&
//                 shop.shopName.toLowerCase().includes(lower)
//             );
//         }

//         if (selectedCountry) {
//             filtered = filtered.filter(shop => shop.country === selectedCountry.toLowerCase());
//         }

//         if (selectedCity) {
//             filtered = filtered.filter(shop => shop.city === selectedCity.toLowerCase());
//         }

//         setFilteredShops(filtered);
//         setCurrentPage(1);
//     }, [searchTerm, selectedCountry, selectedCity, shops]);

//     const handleGenerateQR = async (shop) => {
//         const userId = checkAuth();
//         if (!userId) return;

//         try {
//             setLoadingShopId(shop.shopId);
//             setError(null);

//             const response = await fetch(
//                 `${API_BASE_URL}/generate?shopId=${shop.shopId}&userId=${userId}`,
//                 {
//                     credentials: "include", 
//                 }
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

//     const handleFilterReset = () => {
//         setSelectedCountry('');
//         setSelectedCity('');
//         setIsFilterOpen(false);
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
//     const currentShops = filteredShops.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

//     if (isLoading) {
//         return (
//             <div className="flex flex-col items-center justify-center h-[60vh]">
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <div className="flex items-center justify-center gap-3 mb-4">
//                         <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
//                         <span className="text-xl font-bold text-gray-800">Discovering Shops...</span>
//                     </div>
//                     <p className="text-gray-500">Connecting you to the loyalty network.</p>
//                 </motion.div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-blue-50 p-4 md:p-1">
//             <motion.h1
//                 className="text-4xl font-extrabold text-center text-blue-800 mb-10"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//             >
//                 Explore New Loyalty Partners
//             </motion.h1>

//             {/* Search + Filter */}
//             <div className="flex flex-col md:flex-row justify-center items-stretch md:items-start mb-10 space-y-4 md:space-y-0 md:space-x-4 relative">
//                 <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search shops by name..."
//                     className="w-full md:w-1/2 px-5 py-2 rounded-sm border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-400 shadow-md transition"
//                 />
//                 <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="px-6 py-2 rounded-sm text-white font-semibold bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg"
//                     onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 >
//                     <FontAwesomeIcon icon={faFilter} />
//                     {isFilterOpen ? 'Close' : 'Filter'}
//                 </motion.button>

//                 {isFilterOpen && (
//                     <motion.div
//                         className="absolute top-full right-0 mt-3 bg-white p-6 rounded-md shadow-2xl w-full md:w-96 z-50 border-t-4 border-blue-600"
//                         initial={{ opacity: 0, y: -10, scale: 0.9 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">Filter Shops</h2>
//                         <div className="mb-4">
//                             <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
//                                 <FontAwesomeIcon icon={faGlobe} className="text-blue-600" />
//                                 Country
//                             </label>
//                             <select
//                                 value={selectedCountry}
//                                 onChange={(e) => {
//                                     setSelectedCountry(e.target.value);
//                                     setSelectedCity('');
//                                 }}
//                                 className="w-full px-4 py-2 rounded-sm border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white"
//                             >
//                                 <option value="">All Countries</option>
//                                 {countries.map((country) => (
//                                     <option key={country} value={country}>{country.toUpperCase()}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="mb-6">
//                             <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
//                                 <FontAwesomeIcon icon={faCity} className="text-blue-600" />
//                                 City
//                             </label>
//                             <select
//                                 value={selectedCity}
//                                 onChange={(e) => setSelectedCity(e.target.value)}
//                                 disabled={!selectedCountry}
//                                 className={`w-full px-4 py-2 rounded-sm border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none ${!selectedCountry ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}
//                             >
//                                 <option value="">All Cities</option>
//                                 {cities
//                                     .filter(city => {
//                                         const shop = shops.find(s => s.city === city);
//                                         return !selectedCountry || (shop && shop.country === selectedCountry);
//                                     })
//                                     .map((city) => (
//                                         <option key={city} value={city}>{city.toUpperCase()}</option>
//                                     ))}
//                             </select>
//                         </div>
//                         <div className="flex justify-end space-x-3">
//                             <button
//                                 className="px-4 py-2 rounded-sm text-gray-700 font-medium bg-gray-200 hover:bg-gray-300 transition"
//                                 onClick={handleFilterReset}
//                             >
//                                 Reset Filters
//                             </button>
//                             <button
//                                 className="px-4 py-2 rounded-sm text-white font-medium bg-blue-600 hover:bg-blue-700 transition"
//                                 onClick={() => setIsFilterOpen(false)}
//                             >
//                                 Done
//                             </button>
//                         </div>
//                     </motion.div>
//                 )}
//             </div>

//             {error && <p className="text-red-500 text-center font-semibold bg-red-100 p-3 rounded-lg mx-auto max-w-lg mb-6">{error}</p>}

//             {currentShops.length === 0 ? (
//                 <p className="text-center text-gray-500 font-medium mt-10 p-5">
//                     <span className="text-2xl font-bold text-blue-600 block mb-2">Oops!</span>
//                     No shops found matching your current search or location filters. Try broadening your search!
//                 </p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl mx-auto">
//                     {currentShops.map((shop) => (
//                         <div
//                             key={shop.shopId}
//                             className="bg-white rounded-md shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-100"
//                         >
//                             {/* Gradient Header */}
//                             <div className="bg-blue-700 p-3 text-white flex items-center">
//                                 <FontAwesomeIcon icon={faStore} className="mr-2 text-lg" />
//                                 <h2 className="font-bold text-lg truncate">{shop.shopName}</h2>
//                             </div>

//                             {/* Image with Awning */}
//                             <div className="relative">
//                                 <div className="absolute top-0 left-0 right-0 h-4 bg-blue-600 clip-awning"></div>
//                                 {shop.logoImage ? (
//                                     <img
//                                         src={`data:image/jpeg;base64,${shop.logoImage}`}
//                                         alt={shop.shopName}
//                                         className="w-full h-40 object-cover border-blue-800"
//                                     />
//                                 ) : (
//                                     <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-200 border-blue-800 flex items-center justify-center">
//                                         <span className="text-5xl font-bold text-blue-700">
//                                             {shop.shopName.charAt(0).toUpperCase()}
//                                         </span>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Card Body */}
//                             <div className="p-4 bg-blue-50">
//                                 {/* Shop ID Badge */}
//                                 <div className="flex justify-end mb-2">
//                                     <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                                         ID: shop{shop.shopId}
//                                     </span>
//                                 </div>

//                                 {/* Country & City */}
//                                 <div className="grid grid-cols-2 gap-2 text-sm mb-3">
//                                     <div className="flex items-center bg-white p-1 rounded border border-blue-200">
//                                         <FontAwesomeIcon icon={faGlobe} className="mr-2 text-blue-700 text-xs" />
//                                         <span className="font-medium text-blue-800 truncate">{shop.country ? shop.country.toUpperCase() : 'N/A'}</span>
//                                     </div>
//                                     <div className="flex items-center bg-white p-1 rounded border border-blue-200">
//                                         <FontAwesomeIcon icon={faCity} className="mr-2 text-blue-700 text-xs" />
//                                         <span className="font-medium text-blue-800 truncate">{shop.city ? shop.city.toUpperCase() : 'N/A'}</span>
//                                     </div>
//                                 </div>

//                                 {/* Phone */}
//                                 <div className="flex items-center mt-2 bg-white p-1.5 rounded border border-blue-200">
//                                     <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-blue-700" />
//                                     <span className="text-sm font-medium text-blue-800">{shop.shopPhone || 'N/A'}</span>
//                                 </div>

//                                 {/* QR Button */}
//                                 <motion.button
//                                     whileHover={{ scale: 1.02 }}
//                                     whileTap={{ scale: 0.98 }}
//                                     onClick={() => handleGenerateQR(shop)}
//                                     disabled={loadingShopId === shop.shopId}
//                                     className={`w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-sm text-sm font-medium transition flex items-center justify-center gap-2
//                                         ${loadingShopId === shop.shopId ? 'opacity-70 cursor-not-allowed' : ''}`}
//                                 >
//                                     {loadingShopId === shop.shopId ? (
//                                         <>
//                                             <Loader2 className="w-4 h-4 animate-spin" />
//                                             Generating...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <FontAwesomeIcon icon={faQrcode} />
//                                             QR Code
//                                         </>
//                                     )}
//                                 </motion.button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {totalPages > 1 && (
//                 <div className="flex justify-center items-center mt-12 space-x-3">
//                     <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1} label="Previous" icon={faArrowLeft} />
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
//                     <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages} label="Next" icon={faArrowRight} />
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












// //translated
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import QRModal from './QRModal';
// import { Loader2 } from 'lucide-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faStore,
//     faIdBadge,
//     faGlobe,
//     faCity,
//     faPhoneAlt,
//     faQrcode,
//     faFilter,
//     faArrowLeft,
//     faArrowRight
// } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

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
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [loadingShopId, setLoadingShopId] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isFilterOpen, setIsFilterOpen] = useState(false);
//     const [selectedCountry, setSelectedCountry] = useState('');
//     const [selectedCity, setSelectedCity] = useState('');
//     const [countries, setCountries] = useState([]);
//     const [cities, setCities] = useState([]);

//     const checkAuth = () => {
//         const isLoggedIn = localStorage.getItem('isLoggedIn');
//         const userId = localStorage.getItem('id');
//         if (!isLoggedIn || !userId) {
//             navigate('/signin');
//             return false;
//         }
//         return userId;
//     };

//     useEffect(() => {
//         const userId = checkAuth();
//         if (!userId) return;

//         const fetchShops = async () => {
//             try {
//                 const response = await fetch(`${API_BASE}/allShopsAvailable?userId=${userId}`, {
//                     credentials: "include", 
//                 });

//                 if (!response.ok) {
//                     if (response.status === 401) {
//                         localStorage.clear();
//                         navigate('/signin');
//                         return;
//                     }
//                     throw new Error('Failed to load shops');
//                 }

//                 const data = await response.json();
//                 const normalizedData = data.map(shop => ({
//                     ...shop,
//                     country: shop.country ? shop.country.toLowerCase() : '',
//                     city: shop.city ? shop.city.toLowerCase() : ''
//                 }));
//                 setShops(normalizedData);
//                 setFilteredShops(normalizedData);

//                 const uniqueCountries = [...new Set(normalizedData.map(shop => shop.country))].filter(Boolean).sort();
//                 const uniqueCities = [...new Set(normalizedData.map(shop => shop.city))].filter(Boolean).sort();
//                 setCountries(uniqueCountries);
//                 setCities(uniqueCities);
//             } catch (err) {
//                 setError(err.message || 'Something went wrong');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchShops();
//     }, [navigate]);

//     useEffect(() => {
//         let filtered = shops;

//         if (searchTerm) {
//             const lower = searchTerm.toLowerCase();
//             filtered = filtered.filter(shop =>
//                 typeof shop.shopName === 'string' &&
//                 shop.shopName.toLowerCase().includes(lower)
//             );
//         }

//         if (selectedCountry) {
//             filtered = filtered.filter(shop => shop.country === selectedCountry.toLowerCase());
//         }

//         if (selectedCity) {
//             filtered = filtered.filter(shop => shop.city === selectedCity.toLowerCase());
//         }

//         setFilteredShops(filtered);
//         setCurrentPage(1);
//     }, [searchTerm, selectedCountry, selectedCity, shops]);

//     const handleGenerateQR = async (shop) => {
//         const userId = checkAuth();
//         if (!userId) return;

//         try {
//             setLoadingShopId(shop.shopId);
//             setError(null);

//             const response = await fetch(
//                 `${API_BASE}/generate?shopId=${shop.shopId}&userId=${userId}`,
//                 {
//                     credentials: "include", 
//                 }
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

//     const handleFilterReset = () => {
//         setSelectedCountry('');
//         setSelectedCity('');
//         setIsFilterOpen(false);
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
//     const currentShops = filteredShops.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

//     if (isLoading) {
//         return (
//             <div className="flex flex-col items-center justify-center h-[60vh]">
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <div className="flex items-center justify-center gap-3 mb-4">
//                         <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
//                         <span className="text-xl font-bold text-gray-800">{t('explore.loading.title')}</span>
//                     </div>
//                     <p className="text-gray-500">{t('explore.loading.subtitle')}</p>
//                 </motion.div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-blue-50 p-4 md:p-1">
//             <motion.h1
//                 className="text-4xl font-extrabold text-center text-blue-800 mb-10"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//             >
//                 {t('explore.title')}
//             </motion.h1>

//             {/* Search + Filter */}
//             <div className="flex flex-col md:flex-row justify-center items-stretch md:items-start mb-10 space-y-4 md:space-y-0 md:space-x-4 relative">
//                 <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder={t('explore.searchPlaceholder')}
//                     className="w-full md:w-1/2 px-5 py-2 rounded border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-400 shadow-md transition"
//                 />
//                 <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="px-6 py-2 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg"
//                     onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 >
//                     <FontAwesomeIcon icon={faFilter} />
//                     {isFilterOpen ? t('explore.filter.close') : t('explore.filter.open')}
//                 </motion.button>

//                 {isFilterOpen && (
//                     <motion.div
//                         className="absolute top-full right-0 mt-3 bg-white p-6 rounded shadow-2xl w-full md:w-96 z-50 border-t-4 border-blue-600"
//                         initial={{ opacity: 0, y: -10, scale: 0.9 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">{t('explore.filter.title')}</h2>
//                         <div className="mb-4">
//                             <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
//                                 <FontAwesomeIcon icon={faGlobe} className="text-blue-600" />
//                                 {t('explore.filter.country')}
//                             </label>
//                             <select
//                                 value={selectedCountry}
//                                 onChange={(e) => {
//                                     setSelectedCountry(e.target.value);
//                                     setSelectedCity('');
//                                 }}
//                                 className="w-full px-4 py-2 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white"
//                             >
//                                 <option value="">{t('explore.filter.allCountries')}</option>
//                                 {countries.map((country) => (
//                                     <option key={country} value={country}>{country.toUpperCase()}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="mb-6">
//                             <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
//                                 <FontAwesomeIcon icon={faCity} className="text-blue-600" />
//                                 {t('explore.filter.city')}
//                             </label>
//                             <select
//                                 value={selectedCity}
//                                 onChange={(e) => setSelectedCity(e.target.value)}
//                                 disabled={!selectedCountry}
//                                 className={`w-full px-4 py-2 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none ${!selectedCountry ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}
//                             >
//                                 <option value="">{t('explore.filter.allCities')}</option>
//                                 {cities
//                                     .filter(city => {
//                                         const shop = shops.find(s => s.city === city);
//                                         return !selectedCountry || (shop && shop.country === selectedCountry);
//                                     })
//                                     .map((city) => (
//                                         <option key={city} value={city}>{city.toUpperCase()}</option>
//                                     ))}
//                             </select>
//                         </div>
//                         <div className="flex justify-end space-x-3">
//                             <button
//                                 className="px-4 py-2 rounded text-gray-700 font-medium bg-gray-200 hover:bg-gray-300 transition"
//                                 onClick={handleFilterReset}
//                             >
//                                 {t('explore.filter.reset')}
//                             </button>
//                             <button
//                                 className="px-4 py-2 rounded text-white font-medium bg-blue-600 hover:bg-blue-700 transition"
//                                 onClick={() => setIsFilterOpen(false)}
//                             >
//                                 {t('explore.filter.done')}
//                             </button>
//                         </div>
//                     </motion.div>
//                 )}
//             </div>

//             {error && <p className="text-red-500 text-center font-semibold bg-red-100 p-3 rounded mx-auto max-w-lg mb-6">{error}</p>}

//             {currentShops.length === 0 ? (
//                 <p className="text-center text-gray-500 font-medium mt-10 p-5">
//                     <span className="text-2xl font-bold text-blue-600 block mb-2">{t('explore.noResults.oops')}</span>
//                     {t('explore.noResults.message')}
//                 </p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl mx-auto">
//                     {currentShops.map((shop) => (
//                         <div
//                             key={shop.shopId}
//                             className="bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-100"
//                         >
//                             {/* Gradient Header */}
//                             <div className="bg-blue-700 p-3 text-white flex items-center">
//                                 <FontAwesomeIcon icon={faStore} className="mr-2 text-lg" />
//                                 <h2 className="font-bold text-lg truncate">{shop.shopName}</h2>
//                             </div>

//                             {/* Image with Awning */}
//                             <div className="relative">
//                                 <div className="absolute top-0 left-0 right-0 h-4 bg-blue-600 clip-awning"></div>
//                                 {shop.logoImage ? (
//                                     <img
//                                         src={`data:image/jpeg;base64,${shop.logoImage}`}
//                                         alt={shop.shopName}
//                                         className="w-full h-40 object-cover border-blue-800"
//                                     />
//                                 ) : (
//                                     <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-200 border-blue-800 flex items-center justify-center">
//                                         <span className="text-5xl font-bold text-blue-700">
//                                             {shop.shopName.charAt(0).toUpperCase()}
//                                         </span>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Card Body */}
//                             <div className="p-4 bg-blue-50">
//                                 {/* Shop ID Badge */}
//                                 <div className="flex justify-end mb-2">
//                                     <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                                         ID: shop{shop.shopId}
//                                     </span>
//                                 </div>

//                                 {/* Country & City */}
//                                 <div className="grid grid-cols-2 gap-2 text-sm mb-3">
//                                     <div className="flex items-center bg-white p-1 rounded border border-blue-200">
//                                         <FontAwesomeIcon icon={faGlobe} className="mr-2 text-blue-700 text-xs" />
//                                         <span className="font-medium text-blue-800 truncate">{shop.country ? shop.country.toUpperCase() : 'N/A'}</span>
//                                     </div>
//                                     <div className="flex items-center bg-white p-1 rounded border border-blue-200">
//                                         <FontAwesomeIcon icon={faCity} className="mr-2 text-blue-700 text-xs" />
//                                         <span className="font-medium text-blue-800 truncate">{shop.city ? shop.city.toUpperCase() : 'N/A'}</span>
//                                     </div>
//                                 </div>

//                                 {/* Phone */}
//                                 <div className="flex items-center mt-2 bg-white p-1.5 rounded border border-blue-200">
//                                     <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-blue-700" />
//                                     <span className="text-sm font-medium text-blue-800">{shop.shopPhone || 'N/A'}</span>
//                                 </div>

//                                 {/* QR Button */}
//                                 <motion.button
//                                     whileHover={{ scale: 1.02 }}
//                                     whileTap={{ scale: 0.98 }}
//                                     onClick={() => handleGenerateQR(shop)}
//                                     disabled={loadingShopId === shop.shopId}
//                                     className={`w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium transition flex items-center justify-center gap-2
//                                         ${loadingShopId === shop.shopId ? 'opacity-70 cursor-not-allowed' : ''}`}
//                                 >
//                                     {loadingShopId === shop.shopId ? (
//                                         <>
//                                             <Loader2 className="w-4 h-4 animate-spin" />
//                                             {t('explore.qr.generating')}
//                                         </>
//                                     ) : (
//                                         <>
//                                             <FontAwesomeIcon icon={faQrcode} />
//                                             {t('explore.qr.button')}
//                                         </>
//                                     )}
//                                 </motion.button>
//                             </div>
//                         </div>
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






// Updated ExploreShops.jsx (full component)
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import QRModal from './QRModal';
import { Loader2 } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStore,
    faIdBadge,
    faGlobe,
    faCity,
    faPhoneAlt,
    faQrcode,
    faFilter,
    faArrowLeft,
    faArrowRight,
    faSearch
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { API_BASE_URL } from '../../apiConfig';

const API_BASE = `${API_BASE_URL}/api/qrcode`;
const ITEMS_PER_PAGE = 10;

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

    const [pendingCountry, setPendingCountry] = useState('');
    const [pendingCity, setPendingCity] = useState('');
    const [appliedCountry, setAppliedCountry] = useState('');
    const [appliedCity, setAppliedCity] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingShopId, setLoadingShopId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const checkAuth = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userId = localStorage.getItem('id');
        if (!isLoggedIn || !userId) {
            navigate('/signin');
            return false;
        }
        return userId;
    };

    useEffect(() => {
        const userId = checkAuth();
        if (!userId) return;

        fetchShops(
            userId,
            currentPage,
            appliedSearchTerm,
            appliedCountry,
            appliedCity
        );
    }, [currentPage, appliedSearchTerm, appliedCountry, appliedCity, navigate]);

    const fetchShops = async (userId, page, search = '', country = '', city = '') => {
        setIsLoading(true);
        try {
            let url = `${API_BASE}/allShopsAvailable?userId=${userId}&page=${page - 1}&size=${ITEMS_PER_PAGE}`;
            if (search) url += `&searchTerm=${encodeURIComponent(search)}`;
            if (country) url += `&country=${encodeURIComponent(country)}`;
            if (city) url += `&city=${encodeURIComponent(city)}`;

            const response = await fetch(url, { credentials: "include" });

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
            setFilteredShops(normalizedData); // kept for compatibility but not really used
            setTotalPages(data.totalPages);

            const uniqueCountries = [...new Set(normalizedData.map(shop => shop.country))].filter(Boolean).sort();
            const uniqueCities = [...new Set(normalizedData.map(shop => shop.city))].filter(Boolean).sort();
            setCountries(uniqueCountries);
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

            const response = await fetch(
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

    const handleApplySearch = () => {
        setAppliedSearchTerm(pendingSearchTerm.trim());
        setCurrentPage(1);
    };

    const handleApplyFilters = () => {
        setAppliedCountry(pendingCountry);
        setAppliedCity(pendingCity);
        setCurrentPage(1);
        setIsFilterOpen(false);
    };

    const handleFilterReset = () => {
        setPendingCountry('');
        setPendingCity('');
        setAppliedCountry('');
        setAppliedCity('');
        setCurrentPage(1);
        setIsFilterOpen(false);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const currentShops = shops;  

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                        <span className="text-xl font-bold text-gray-800">{t('explore.loading.title')}</span>
                    </div>
                    <p className="text-gray-500">{t('explore.loading.subtitle')}</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-50 p-4 md:p-1">
            <motion.h1
                className="text-4xl font-extrabold text-center text-blue-800 mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {t('explore.title')}
            </motion.h1>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row justify-center items-stretch md:items-start mb-10 space-y-4 md:space-y-0 md:space-x-4 relative">
                <div className="relative flex-1 max-w-xl">
                    <input
                        type="text"
                        value={pendingSearchTerm}
                        onChange={(e) => setPendingSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleApplySearch();
                            }
                        }}
                        placeholder={t('explore.searchPlaceholder')}
                        className="w-full px-5 py-2 rounded border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-400 shadow-md transition pr-12"
                    />
                    <button
                        onClick={handleApplySearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 text-xl"
                        title="Search"
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <FontAwesomeIcon icon={faFilter} />
                    {isFilterOpen ? t('explore.filter.close') : t('explore.filter.open')}
                </motion.button>

                {isFilterOpen && (
                    <motion.div
                        className="absolute top-full right-0 mt-3 bg-white p-6 rounded shadow-2xl w-full md:w-96 z-50 border-t-4 border-blue-600"
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">{t('explore.filter.title')}</h2>
                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
                                <FontAwesomeIcon icon={faGlobe} className="text-blue-600" />
                                {t('explore.filter.country')}
                            </label>
                            <select
                                value={pendingCountry}
                                onChange={(e) => {
                                    setPendingCountry(e.target.value);
                                    setPendingCity('');
                                }}
                                className="w-full px-4 py-2 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white"
                            >
                                <option value="">{t('explore.filter.allCountries')}</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>{country.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
                                <FontAwesomeIcon icon={faCity} className="text-blue-600" />
                                {t('explore.filter.city')}
                            </label>
                            <select
                                value={pendingCity}
                                onChange={(e) => setPendingCity(e.target.value)}
                                disabled={!pendingCountry}
                                className={`w-full px-4 py-2 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none ${!pendingCountry ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}
                            >
                                <option value="">{t('explore.filter.allCities')}</option>
                                {cities
                                    .filter(city => {
                                        const shop = shops.find(s => s.city === city);
                                        return !pendingCountry || (shop && shop.country === pendingCountry);
                                    })
                                    .map((city) => (
                                        <option key={city} value={city}>{city.toUpperCase()}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 rounded text-gray-700 font-medium bg-gray-200 hover:bg-gray-300 transition"
                                onClick={handleFilterReset}
                            >
                                {t('explore.filter.reset')}
                            </button>
                            <button
                                className="px-4 py-2 rounded text-white font-medium bg-blue-600 hover:bg-blue-700 transition"
                                onClick={handleApplyFilters}
                            >
                                {t('explore.filter.done')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>

            {error && <p className="text-red-500 text-center font-semibold bg-red-100 p-3 rounded mx-auto max-w-lg mb-6">{error}</p>}

            {currentShops.length === 0 ? (
                <p className="text-center text-gray-500 font-medium mt-10 p-5">
                    <span className="text-2xl font-bold text-blue-600 block mb-2">{t('explore.noResults.oops')}</span>
                    {t('explore.noResults.message')}
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl mx-auto">
                    {currentShops.map((shop) => (
                        <div
                            key={shop.shopId}
                            className="bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-100"
                        >
                            {/* Gradient Header */}
                            <div className="bg-blue-700 p-3 text-white flex items-center">
                                <FontAwesomeIcon icon={faStore} className="mr-2 text-lg" />
                                <h2 className="font-bold text-lg truncate">{shop.shopName}</h2>
                            </div>

                            {/* Image with Awning */}
                            <div className="relative">
                                <div className="absolute top-0 left-0 right-0 h-4 bg-blue-600 clip-awning"></div>
                                {shop.logoUrl ? (
                                    <img
                                        src={`${API_BASE_URL}${shop.logoUrl}`}
                                        alt={shop.shopName}
                                        className="w-full h-40 object-cover border-blue-800"
                                    />
                                ) : (
                                    <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-200 border-blue-800 flex items-center justify-center">
                                        <span className="text-5xl font-bold text-blue-700">
                                            {shop.shopName.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Card Body */}
                            <div className="p-4 bg-blue-50">
                                {/* Shop ID Badge */}
                                <div className="flex justify-end mb-2">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        ID: shop{shop.shopId}
                                    </span>
                                </div>

                                {/* Country & City */}
                                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                    <div className="flex items-center bg-white p-1 rounded border border-blue-200">
                                        <FontAwesomeIcon icon={faGlobe} className="mr-2 text-blue-700 text-xs" />
                                        <span className="font-medium text-blue-800 truncate">{shop.country ? shop.country.toUpperCase() : 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center bg-white p-1 rounded border border-blue-200">
                                        <FontAwesomeIcon icon={faCity} className="mr-2 text-blue-700 text-xs" />
                                        <span className="font-medium text-blue-800 truncate">{shop.city ? shop.city.toUpperCase() : 'N/A'}</span>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center mt-2 bg-white p-1.5 rounded border border-blue-200">
                                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-blue-700" />
                                    <span className="text-sm font-medium text-blue-800">{shop.shopPhone || 'N/A'}</span>
                                </div>

                                {/* QR Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleGenerateQR(shop)}
                                    disabled={loadingShopId === shop.shopId}
                                    className={`w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium transition flex items-center justify-center gap-2
                                        ${loadingShopId === shop.shopId ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loadingShopId === shop.shopId ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            {t('explore.qr.generating')}
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faQrcode} />
                                            {t('explore.qr.button')}
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 space-x-3">
                    <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1} label={t('explore.pagination.previous')} icon={faArrowLeft} />
                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center transition-all duration-200 ${
                                    currentPage === i + 1
                                        ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-600'
                                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
                                }`}
                            >
                                {i + 1}
                            </motion.button>
                        ))}
                    </div>
                    <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages} label={t('explore.pagination.next')} icon={faArrowRight} />
                </div>
            )}

            <QRModal
                shop={selectedShop}
                qrData={qrData}
                isOpen={!!selectedShop}
                onClose={() => {
                    setSelectedShop(null);
                    setQrData(null);
                }}
            />

            <style jsx>{`
                .clip-awning {
                    clip-path: polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%);
                }
            `}</style>
        </div>
    );
}

const PaginationButton = ({ onClick, disabled, label, icon }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        disabled={disabled}
        className={`px-5 py-2 rounded-full font-medium flex items-center gap-2 shadow-md transition-all duration-200 ${
            disabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
    >
        {icon && <FontAwesomeIcon icon={icon} />}
        {label}
    </motion.button>
);