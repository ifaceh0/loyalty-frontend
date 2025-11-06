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

//     const primaryColor = "indigo-600";
//     const primaryBgHover = "hover:bg-indigo-700";
//     const secondaryText = `text-violet-500`;
//     const cardBorder = "border-indigo-100";
//     const focusRing = "focus:ring-indigo-400";

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
//                 customerId: `CUST-${data.customerId}`,
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
//               <div className="flex flex-col items-center justify-center h-[60vh]">
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="flex items-center justify-center gap-3 mb-4">
//                     <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
//                     <span className="text-xl font-bold text-gray-800">Discovering Shops...</span>
//                   </div>
//                   <p className="text-gray-500">Connecting you to the loyalty network.</p>
//                 </motion.div>
//               </div>
//             );
//     }

//     return (
//         <div className="min-h-screen p-4">
//             <motion.h1
//                 className={`text-4xl font-extrabold text-center text-${primaryColor} mb-10`}
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
//                     className={`w-full md:w-1/2 px-5 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 ${focusRing} shadow-md transition`}
//                 />
//                 <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className={`px-6 py-3 rounded-xl text-white font-semibold bg-${primaryColor} ${primaryBgHover} transition flex items-center justify-center gap-2 shadow-lg`}
//                     onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 >
//                     <FontAwesomeIcon icon={faFilter} />
//                     {isFilterOpen ? 'Close Filter' : 'Filter Location'}
//                 </motion.button>

//                 {isFilterOpen && (
//                     <motion.div
//                         className="absolute top-full right-0 mt-3 bg-white p-6 rounded-xl shadow-2xl w-full md:w-96 z-50 border-t-4 border-violet-500"
//                         initial={{ opacity: 0, y: -10, scale: 0.9 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <h2 className={`text-xl font-bold text-${primaryColor} mb-4 border-b pb-2`}>Filter Shops</h2>
//                         <div className="mb-4">
//                             <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
//                                 <FontAwesomeIcon icon={faGlobe} className={`text-${primaryColor}`} />
//                                 Country
//                             </label>
//                             <select
//                                 value={selectedCountry}
//                                 onChange={(e) => {
//                                     setSelectedCountry(e.target.value);
//                                     setSelectedCity('');
//                                 }}
//                                 className={`w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 ${focusRing} appearance-none bg-white`}
//                             >
//                                 <option value="">All Countries</option>
//                                 {countries.map((country) => (
//                                     <option key={country} value={country}>{country.toUpperCase()}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="mb-6">
//                             <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
//                                 <FontAwesomeIcon icon={faCity} className={`text-${primaryColor}`} />
//                                 City
//                             </label>
//                             <select
//                                 value={selectedCity}
//                                 onChange={(e) => setSelectedCity(e.target.value)}
//                                 disabled={!selectedCountry}
//                                 className={`w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 ${focusRing} appearance-none ${!selectedCountry ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}
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
//                                 className="px-4 py-2 rounded-lg text-gray-700 font-medium bg-gray-200 hover:bg-gray-300 transition"
//                                 onClick={handleFilterReset}
//                             >
//                                 Reset Filters
//                             </button>
//                             <button
//                                 className={`px-4 py-2 rounded-lg text-white font-medium bg-${primaryColor} ${primaryBgHover} transition`}
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
//                     <span className="text-2xl font-bold text-violet-500 block mb-2">Oops!</span>
//                     No shops found matching your current search or location filters. Try broadening your search!
//                 </p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
//                     {currentShops.map((shop, index) => (
//                         <motion.div
//                             key={shop.shopId}
//                             className={`bg-white shadow-xl rounded-lg ${cardBorder} overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 w-full min-h-[480px] flex flex-col`}
//                             initial={{ opacity: 0, y: 30 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: index * 0.08 }}
//                         >
//                             <div className={`bg-gradient-to-r from-indigo-700 to-indigo-500 text-white px-5 py-3 flex items-center gap-3 shadow-md`}>
//                                 <FontAwesomeIcon icon={faStore} className="text-2xl" />
//                                 <h3 className="text-xl font-bold truncate">{shop.shopName}</h3>
//                             </div>

//                             <div className="flex justify-center py-4 px-4">
//                                 {shop.logoImage ? (
//                                     <img
//                                         src={`data:image/jpeg;base64,${shop.logoImage}`}
//                                         alt={shop.shopName}
//                                         className="w-full h-40 object-cover rounded-lg shadow-inner border border-gray-100"
//                                     />
//                                 ) : (
//                                     <div className="w-full h-40 bg-gray-200 rounded-lg shadow-inner border border-gray-100 flex items-center justify-center text-5xl font-bold text-gray-600">
//                                         {shop.shopName.charAt(0).toUpperCase()}
//                                     </div>
//                                 )}
//                             </div>

//                             <div className="p-5 flex flex-col flex-1 justify-between">
//                                 <div>
//                                     <DetailItem icon={faIdBadge} label="Shop ID" value={shop.shopId} secondaryColor={secondaryText} />
//                                     <DetailItem icon={faGlobe} label="Country" value={shop.country ? shop.country.toUpperCase() : 'N/A'} secondaryColor={secondaryText} />
//                                     <DetailItem icon={faCity} label="City" value={shop.city ? shop.city.toUpperCase() : 'N/A'} secondaryColor={secondaryText} />
//                                     <DetailItem icon={faPhoneAlt} label="Phone" value={shop.shopPhone} secondaryColor={secondaryText} />
//                                 </div>

//                                 <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.98 }}
//                                     className={`mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-white font-bold text-base bg-${primaryColor} ${primaryBgHover} transition shadow-lg disabled:bg-gray-400 disabled:shadow-none`}
//                                     onClick={() => handleGenerateQR(shop)}
//                                     disabled={loadingShopId === shop.shopId}
//                                 >
//                                     {loadingShopId === shop.shopId ? (
//                                         <Loader2 className="h-5 w-5 text-white animate-spin" />
//                                     ) : (
//                                         <>
//                                             <FontAwesomeIcon icon={faQrcode} />
//                                             Get QR Code
//                                         </>
//                                     )}
//                                 </motion.button>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             )}

//             {totalPages > 1 && (
//                 <div className="flex justify-center items-center mt-12 space-x-3">
//                     <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1} label="Previous" icon={faArrowLeft} primaryColor={primaryColor} primaryBgHover={primaryBgHover} />
//                     <div className="flex space-x-2">
//                         {Array.from({ length: totalPages }, (_, i) => (
//                             <motion.button
//                                 key={i}
//                                 onClick={() => setCurrentPage(i + 1)}
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className={`w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center transition-all duration-200 ${
//                                     currentPage === i + 1
//                                         ? `bg-${primaryColor} text-white shadow-lg border-2 border-${primaryColor}`
//                                         : `bg-white text-gray-700 border-2 border-gray-300 hover:bg-violet-50 hover:text-${primaryColor} hover:shadow-md`
//                                 }`}
//                             >
//                                 {i + 1}
//                             </motion.button>
//                         ))}
//                     </div>
//                     <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages} label="Next" icon={faArrowRight} primaryColor={primaryColor} primaryBgHover={primaryBgHover} />
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
//         </div>
//     );
// }

// const DetailItem = ({ icon, label, value, secondaryColor }) => (
//     <p className="text-gray-700 text-base mb-3 flex items-center gap-3 border-b border-gray-100 pb-2">
//         <FontAwesomeIcon icon={icon} className={`text-xl ${secondaryColor}`} />
//         <span className="font-semibold">{label}:</span> <span className="text-gray-600">{value}</span>
//     </p>
// );

// const PaginationButton = ({ onClick, disabled, label, icon, primaryColor, primaryBgHover }) => (
//     <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={onClick}
//         disabled={disabled}
//         className={`px-5 py-2 rounded-xl font-medium flex items-center gap-2 shadow-md transition-all duration-200 ${
//             disabled
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : `bg-${primaryColor} text-white ${primaryBgHover}`
//         }`}
//     >
//         {icon && <FontAwesomeIcon icon={icon} />}
//         {label}
//     </motion.button>
// );
















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
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://loyalty-backend-java.onrender.com/api/qrcode';
const ITEMS_PER_PAGE = 10;

export default function ExploreShops() {
    const navigate = useNavigate();

    const [shops, setShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [qrData, setQrData] = useState(null);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingShopId, setLoadingShopId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
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

        const fetchShops = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/allShopsAvailable?userId=${userId}`, {
                    credentials: "include", 
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear();
                        navigate('/signin');
                        return;
                    }
                    throw new Error('Failed to load shops');
                }

                const data = await response.json();
                const normalizedData = data.map(shop => ({
                    ...shop,
                    country: shop.country ? shop.country.toLowerCase() : '',
                    city: shop.city ? shop.city.toLowerCase() : ''
                }));
                setShops(normalizedData);
                setFilteredShops(normalizedData);

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

        fetchShops();
    }, [navigate]);

    useEffect(() => {
        let filtered = shops;

        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            filtered = filtered.filter(shop =>
                typeof shop.shopName === 'string' &&
                shop.shopName.toLowerCase().includes(lower)
            );
        }

        if (selectedCountry) {
            filtered = filtered.filter(shop => shop.country === selectedCountry.toLowerCase());
        }

        if (selectedCity) {
            filtered = filtered.filter(shop => shop.city === selectedCity.toLowerCase());
        }

        setFilteredShops(filtered);
        setCurrentPage(1);
    }, [searchTerm, selectedCountry, selectedCity, shops]);

    const handleGenerateQR = async (shop) => {
        const userId = checkAuth();
        if (!userId) return;

        try {
            setLoadingShopId(shop.shopId);
            setError(null);

            const response = await fetch(
                `${API_BASE_URL}/generate?shopId=${shop.shopId}&userId=${userId}`,
                {
                    credentials: "include", 
                }
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
                customerId: `CUST-${data.customerId}`,
                userInfo: data.qrRawData,
            });
            setSelectedShop(shop);
        } catch (err) {
            setError(err.message || 'QR generation failed');
        } finally {
            setLoadingShopId(null);
        }
    };

    const handleFilterReset = () => {
        setSelectedCountry('');
        setSelectedCity('');
        setIsFilterOpen(false);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
    const currentShops = filteredShops.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
                        <span className="text-xl font-bold text-gray-800">Discovering Shops...</span>
                    </div>
                    <p className="text-gray-500">Connecting you to the loyalty network.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-50 p-4 md:p-8">
            <motion.h1
                className="text-4xl font-extrabold text-center text-blue-800 mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Explore New Loyalty Partners
            </motion.h1>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row justify-center items-stretch md:items-start mb-10 space-y-4 md:space-y-0 md:space-x-4 relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search shops by name..."
                    className="w-full md:w-1/2 px-5 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-400 shadow-md transition"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <FontAwesomeIcon icon={faFilter} />
                    {isFilterOpen ? 'Close Filter' : 'Filter Location'}
                </motion.button>

                {isFilterOpen && (
                    <motion.div
                        className="absolute top-full right-0 mt-3 bg-white p-6 rounded-lg shadow-2xl w-full md:w-96 z-50 border-t-4 border-blue-600"
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">Filter Shops</h2>
                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
                                <FontAwesomeIcon icon={faGlobe} className="text-blue-600" />
                                Country
                            </label>
                            <select
                                value={selectedCountry}
                                onChange={(e) => {
                                    setSelectedCountry(e.target.value);
                                    setSelectedCity('');
                                }}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white"
                            >
                                <option value="">All Countries</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>{country.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
                                <FontAwesomeIcon icon={faCity} className="text-blue-600" />
                                City
                            </label>
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                disabled={!selectedCountry}
                                className={`w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none ${!selectedCountry ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}
                            >
                                <option value="">All Cities</option>
                                {cities
                                    .filter(city => {
                                        const shop = shops.find(s => s.city === city);
                                        return !selectedCountry || (shop && shop.country === selectedCountry);
                                    })
                                    .map((city) => (
                                        <option key={city} value={city}>{city.toUpperCase()}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 rounded-lg text-gray-700 font-medium bg-gray-200 hover:bg-gray-300 transition"
                                onClick={handleFilterReset}
                            >
                                Reset Filters
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition"
                                onClick={() => setIsFilterOpen(false)}
                            >
                                Done
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>

            {error && <p className="text-red-500 text-center font-semibold bg-red-100 p-3 rounded-lg mx-auto max-w-lg mb-6">{error}</p>}

            {currentShops.length === 0 ? (
                <p className="text-center text-gray-500 font-medium mt-10 p-5">
                    <span className="text-2xl font-bold text-blue-600 block mb-2">Oops!</span>
                    No shops found matching your current search or location filters. Try broadening your search!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl mx-auto">
                    {currentShops.map((shop) => (
                        <div
                            key={shop.shopId}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-100"
                        >
                            {/* Gradient Header */}
                            <div className="bg-blue-700 p-3 text-white flex items-center">
                                <FontAwesomeIcon icon={faStore} className="mr-2 text-lg" />
                                <h2 className="font-bold text-lg truncate">{shop.shopName}</h2>
                            </div>

                            {/* Image with Awning */}
                            <div className="relative">
                                <div className="absolute top-0 left-0 right-0 h-4 bg-blue-600 clip-awning"></div>
                                {shop.logoImage ? (
                                    <img
                                        src={`data:image/jpeg;base64,${shop.logoImage}`}
                                        alt={shop.shopName}
                                        className="w-full h-40 object-cover border-b-4 border-blue-800"
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
                                    <div className="flex items-center bg-white p-2 rounded border border-blue-200">
                                        <FontAwesomeIcon icon={faGlobe} className="mr-2 text-blue-700 text-xs" />
                                        <span className="font-medium text-blue-800 truncate">{shop.country ? shop.country.toUpperCase() : 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center bg-white p-2 rounded border border-blue-200">
                                        <FontAwesomeIcon icon={faCity} className="mr-2 text-blue-700 text-xs" />
                                        <span className="font-medium text-blue-800 truncate">{shop.city ? shop.city : 'N/A'}</span>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center mt-2 bg-white p-2 rounded border border-blue-200">
                                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-blue-700" />
                                    <span className="text-sm font-medium text-blue-800">{shop.shopPhone || 'N/A'}</span>
                                </div>

                                {/* QR Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleGenerateQR(shop)}
                                    disabled={loadingShopId === shop.shopId}
                                    className={`w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition flex items-center justify-center gap-2
                                        ${loadingShopId === shop.shopId ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loadingShopId === shop.shopId ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faQrcode} />
                                            QR Code
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
                    <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1} label="Previous" icon={faArrowLeft} />
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
                    <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages} label="Next" icon={faArrowRight} />
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
        className={`px-5 py-2 rounded-xl font-medium flex items-center gap-2 shadow-md transition-all duration-200 ${
            disabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
    >
        {icon && <FontAwesomeIcon icon={icon} />}
        {label}
    </motion.button>
);