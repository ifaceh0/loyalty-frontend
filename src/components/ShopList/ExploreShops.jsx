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
import { motion, AnimatePresence } from 'framer-motion';
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
    faSearch,
    faTimes,
    faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchWithAuth } from "../../auth/fetchWithAuth";
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

    // const [pendingCountry, setPendingCountry] = useState('');
    const [pendingCity, setPendingCity] = useState('');
    // const [appliedCountry, setAppliedCountry] = useState('');
    const [appliedCity, setAppliedCity] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingShopId, setLoadingShopId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    // const [countries, setCountries] = useState([]);
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

        fetchShops(
            userId,
            currentPage,
            appliedSearchTerm,
            // appliedCountry,
            appliedCity
        );
    // }, [currentPage, appliedSearchTerm, appliedCountry, appliedCity, navigate]);
    }, [currentPage, appliedSearchTerm, appliedCity, navigate]);

    // const fetchShops = async (userId, page, search = '', country = '', city = '') => {
    const fetchShops = async (userId, page, search = '', city = '') => {
        setIsLoading(true);
        try {
            let url = `${API_BASE}/allShopsAvailable?userId=${userId}&page=${page - 1}&size=${ITEMS_PER_PAGE}`;
            if (search) url += `&searchTerm=${encodeURIComponent(search)}`;
            // if (country) url += `&country=${encodeURIComponent(country)}`;
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
            setFilteredShops(normalizedData); // kept for compatibility but not really used
            setTotalPages(data.totalPages);

            // const uniqueCountries = [...new Set(normalizedData.map(shop => shop.country))].filter(Boolean).sort();
            const uniqueCities = [...new Set(normalizedData.map(shop => shop.city))].filter(Boolean).sort();
            // setCountries(uniqueCountries);
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

    const handleApplySearch = () => {
        setAppliedSearchTerm(pendingSearchTerm.trim());
        setCurrentPage(1);
    };

    const handleApplyFilters = () => {
        // setAppliedCountry(pendingCountry);
        setAppliedCity(pendingCity);
        setCurrentPage(1);
        setIsFilterOpen(false);
    };

    const handleFilterReset = () => {
        // setPendingCountry('');
        setPendingCity('');
        // setAppliedCountry('');
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
        <div className="min-h-screen p-8 md:p-12">
            {/* <motion.h1
                className="text-4xl font-extrabold text-center text-blue-800 mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {t('explore.title')}
            </motion.h1>

            <div className="flex flex-row md:flex-row justify-center items-start md:items-start mb-10 space-y-0 md:space-y-0 space-x-2 md:space-x-4 relative">
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
                        className="w-full px-5 py-2 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 shadow-inner transition pr-12"
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
                    className="px-6 py-2 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <FontAwesomeIcon icon={faFilter} />
                    {isFilterOpen ? t('explore.filter.close') : t('explore.filter.open')}
                </motion.button>

                {isFilterOpen && (
                    <motion.div
                        className="absolute top-full right-0 mt-3 bg-white p-6 rounded-xl shadow-2xl w-full md:w-96 z-50 border-t-4 border-blue-600"
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">{t('explore.filter.title')}</h2>
                        <div className="mb-6">
                            <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
                                <FontAwesomeIcon icon={faCity} className="text-blue-600" />
                                {t('explore.filter.city')}
                            </label>

                            <select
                                value={pendingCity}
                                onChange={(e) => setPendingCity(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white"
                            >
                                <option value="">{t('explore.filter.allCities')}</option>
                                {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city.toUpperCase()}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 rounded-full text-gray-700 font-medium bg-gray-200 hover:bg-gray-300 transition"
                                onClick={handleFilterReset}
                            >
                                {t('explore.filter.reset')}
                            </button>
                            <button
                                className="px-4 py-2 rounded-full text-white font-medium bg-blue-600 hover:bg-blue-700 transition"
                                onClick={handleApplyFilters}
                            >
                                {t('explore.filter.done')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div> */}

            {/* Header Section */}
            <header className="px-4 mb-8 md:mb-12">
                <motion.h1
                    className="text-3xl md:text-5xl font-black text-center text-slate-900 tracking-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {t('explore.title')}
                </motion.h1>
            </header>

            {/* Search + Filter Container */}
            <div className="flex flex-row items-center justify-center mb-10 gap-2 md:gap-4 relative max-w-3xl mx-auto px-4">
                
                {/* Modern Search Bar - Grows to fill space */}
                <div className="relative flex-grow group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500 text-slate-400">
                        <FontAwesomeIcon icon={faSearch} className="text-sm" />
                    </div>
                    <input
                        type="text"
                        value={pendingSearchTerm}
                        onChange={(e) => setPendingSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplySearch()}
                        placeholder={t('explore.searchPlaceholder')}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-700 text-sm md:text-base"
                    />
                </div>

                {/* Soft Filter Button - Icon only on mobile to save space */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`h-auto px-4 md:px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-3 shadow-lg 
                        ${isFilterOpen 
                            ? 'bg-slate-900 text-white shadow-slate-200' 
                            : 'bg-white text-slate-700 border border-slate-100 shadow-slate-100 hover:bg-slate-50'
                        }`}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <FontAwesomeIcon icon={faFilter} className={isFilterOpen ? 'text-indigo-400' : 'text-slate-400'} />
                    <span className="hidden md:inline">
                        {isFilterOpen ? t('explore.filter.close') : t('explore.filter.open')}
                    </span>
                </motion.button>

                {/* Filter Dropdown - Responsive Positioning */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <>
                            {/* Backdrop for mobile focus */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsFilterOpen(false)}
                                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                className="absolute top-[calc(100%+12px)] right-0 left-0 md:left-auto bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-[1rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full md:w-96 z-50 border border-slate-100"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
                                        {t('explore.filter.title')}
                                    </h2>
                                    <button 
                                        onClick={() => setIsFilterOpen(false)}
                                        className="md:hidden text-slate-400 p-2"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                                            {t('explore.filter.city')}
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={pendingCity}
                                                onChange={(e) => setPendingCity(e.target.value)}
                                                className="w-full px-5 py-2 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none text-slate-700 font-medium text-sm"
                                            >
                                                <option value="">{t('explore.filter.allCities')}</option>
                                                {cities.map((city) => (
                                                    <option key={city} value={city}>
                                                        {city.toUpperCase()}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <FontAwesomeIcon icon={faChevronDown} size="xs" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            className="flex-1 py-2 rounded-full text-slate-500 font-bold bg-slate-100 hover:bg-slate-200 transition-colors text-sm"
                                            onClick={handleFilterReset}
                                        >
                                            {t('explore.filter.reset')}
                                        </button>
                                        <button
                                            className="flex-1 py-2 rounded-full text-white font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all text-sm"
                                            onClick={handleApplyFilters}
                                        >
                                            {t('explore.filter.done')}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {error && <p className="text-red-500 text-center font-semibold bg-red-100 p-3 rounded-xl mx-auto max-w-lg mb-6">{error}</p>}

            {currentShops.length === 0 ? (
                <p className="text-center text-gray-500 font-medium mt-10 p-5">
                    <span className="text-2xl font-bold text-blue-600 block mb-2">{t('explore.noResults.oops')}</span>
                    {t('explore.noResults.message')}
                </p>
            ) : (
                // <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-6 w-full max-w-full mx-auto">
                //     {currentShops.map((shop) => (
                //         <div
                //             key={shop.shopId}
                //             className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-100"
                //         >
                //             {/* Gradient Header */}
                //             <div className="bg-blue-700 p-3 text-white flex items-center">
                //                 <FontAwesomeIcon icon={faStore} className="mr-2 text-lg" />
                //                 <h2 className="font-bold text-lg truncate">{shop.shopName}</h2>
                //             </div>

                //             {/* Image with Awning */}
                //             <div className="relative">
                //                 <div className="absolute top-0 left-0 right-0 h-4 bg-blue-600 clip-awning"></div>
                //                 {shop.logoUrl ? (
                //                     <img
                //                         src={`${API_BASE_URL}${shop.logoUrl}`}
                //                         alt={shop.shopName}
                //                         className="w-full h-40 object-cover border-blue-800"
                //                     />
                //                 ) : (
                //                     <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-200 border-blue-800 flex items-center justify-center">
                //                         <span className="text-5xl font-bold text-blue-700">
                //                             {shop.shopName.charAt(0).toUpperCase()}
                //                         </span>
                //                     </div>
                //                 )}
                //             </div>

                //             {/* Card Body */}
                //             <div className="p-4 bg-blue-50">
                //                 {/* Country & City */}
                //                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-sm mb-3">
                //                     <div className="flex items-center bg-white p-1 rounded border border-blue-200">
                //                         <FontAwesomeIcon icon={faGlobe} className="mr-2 text-blue-700 text-xs" />
                //                         <span className="font-medium text-blue-800 truncate">{shop.country ? shop.country.toUpperCase() : 'N/A'}</span>
                //                     </div>
                //                     <div className="flex items-center bg-white p-1 rounded border border-blue-200">
                //                         <FontAwesomeIcon icon={faCity} className="mr-2 text-blue-700 text-xs" />
                //                         <span className="font-medium text-blue-800 truncate">{shop.city ? shop.city.toUpperCase() : 'N/A'}</span>
                //                     </div>
                //                 </div>

                //                 {/* Phone */}
                //                 <div className="flex items-center mt-2 bg-white p-1 rounded border border-blue-200">
                //                     <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-blue-700" />
                //                     <span className="text-sm font-medium text-blue-800">{shop.shopPhone || 'N/A'}</span>
                //                 </div>

                //                 {/* QR Button */}
                //                 <motion.button
                //                     whileHover={{ scale: 1.02 }}
                //                     whileTap={{ scale: 0.98 }}
                //                     onClick={() => handleGenerateQR(shop)}
                //                     disabled={loadingShopId === shop.shopId}
                //                     className={`w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-sm font-medium transition flex items-center justify-center gap-2
                //                         ${loadingShopId === shop.shopId ? 'opacity-70 cursor-not-allowed' : ''}`}
                //                 >
                //                     {loadingShopId === shop.shopId ? (
                //                         <>
                //                             <Loader2 className="w-4 h-4 animate-spin" />
                //                             {t('explore.qr.generating')}
                //                         </>
                //                     ) : (
                //                         <>
                //                             <FontAwesomeIcon icon={faQrcode} />
                //                             {t('explore.qr.button')}
                //                         </>
                //                     )}
                //                 </motion.button>
                //             </div>
                //         </div>
                //     ))}
                // </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full max-w-full mx-auto">
                    {currentShops.map((shop) => (
                        <motion.div
                        key={shop.shopId}
                        whileHover={{ y: -8 }}
                        className="group bg-white rounded-[1rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col"
                        >
                        {/* Visual Header Section */}
                        <div className="relative h-48 overflow-hidden">
                            {/* Soft Overlay for Name Visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-80" />
                            
                            {/* Shop Name Overlay */}
                            <div className="absolute bottom-4 left-5 z-20 right-5">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                <FontAwesomeIcon icon={faStore} className="text-white text-xs" />
                                </div>
                                <h2 className="font-bold text-white text-lg truncate tracking-tight">
                                {shop.shopName}
                                </h2>
                            </div>
                            </div>

                            {/* Hero Image */}
                            {shop.logoUrl ? (
                            <img
                                src={`${API_BASE_URL}${shop.logoUrl}`}
                                alt={shop.shopName}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
                                <span className="text-6xl font-black text-indigo-200/60 select-none">
                                {shop.shopName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            )}
                        </div>

                        {/* Content Body */}
                        <div className="p-5 flex flex-col flex-1 bg-white">
                            {/* Location Info - Soft Row */}
                            <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-100">
                                <FontAwesomeIcon icon={faGlobe} className="text-indigo-500 text-[10px]" />
                                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                                {shop.country || 'N/A'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-100">
                                <FontAwesomeIcon icon={faCity} className="text-indigo-500 text-[10px]" />
                                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                                {shop.city || 'N/A'}
                                </span>
                            </div>
                            </div>

                            {/* Contact Snippet */}
                            <div className="flex items-center gap-3 text-slate-400 mb-6 px-1">
                            <FontAwesomeIcon icon={faPhoneAlt} className="text-xs text-slate-400" />
                            <span className="text-sm font-medium tracking-tight">
                                {shop.shopPhone || 'No contact provided'}
                            </span>
                            </div>

                            {/* Action Section */}
                            <div className="mt-auto">
                            <motion.button
                                whileTap={{ scale: 0.96 }}
                                onClick={() => handleGenerateQR(shop)}
                                disabled={loadingShopId === shop.shopId}
                                className={`w-full py-1.5 px-6 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center gap-3
                                ${loadingShopId === shop.shopId 
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                    : 'bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200'
                                }`}
                            >
                                {loadingShopId === shop.shopId ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>{t('explore.qr.generating')}</span>
                                </>
                                ) : (
                                <>
                                    <FontAwesomeIcon icon={faQrcode} className="text-xs" />
                                    <span>{t('explore.qr.button')}</span>
                                </>
                                )}
                            </motion.button>
                            </div>
                        </div>
                        </motion.div>
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