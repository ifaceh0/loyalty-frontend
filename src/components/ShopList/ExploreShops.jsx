// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import QRModal from './QRModal';
// import { Loader2 } from 'lucide-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faStore,
//   faIdBadge,
//   faGlobe,
//   faCity,
//   faPhoneAlt,
//   faQrcode,
//   faFilter,
//   faArrowLeft,
//   faArrowRight
// } from '@fortawesome/free-solid-svg-icons';

// const API_BASE_URL = 'https://loyalty-backend-java.onrender.com/api/qrcode';
// const ITEMS_PER_PAGE = 8;

// export default function ExploreShops() {
//   const [shops, setShops] = useState([]);
//   const [filteredShops, setFilteredShops] = useState([]);
//   const [selectedShop, setSelectedShop] = useState(null);
//   const [qrData, setQrData] = useState(null);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loadingShopId, setLoadingShopId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [countries, setCountries] = useState([]);
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const userId = localStorage.getItem('id');

//         if (!token || !userId) throw new Error("User not authenticated");

//         const response = await fetch(`${API_BASE_URL}/allShopsAvailable?userId=${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) throw new Error('Failed to load shops');

//         const data = await response.json();
//         const normalizedData = data.map(shop => ({
//           ...shop,
//           country: shop.country ? shop.country.toLowerCase() : '',
//           city: shop.city ? shop.city.toLowerCase() : ''
//         }));
//         setShops(normalizedData);
//         setFilteredShops(normalizedData);

//         const uniqueCountries = [...new Set(normalizedData.map(shop => shop.country))].filter(Boolean);
//         const uniqueCities = [...new Set(normalizedData.map(shop => shop.city))].filter(Boolean);
//         setCountries(uniqueCountries);
//         setCities(uniqueCities);
//       } catch (err) {
//         setError(err.message || 'Something went wrong');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchShops();
//   }, []);

//   useEffect(() => {
//     let filtered = shops;

//     if (searchTerm) {
//       const lower = searchTerm.toLowerCase();
//       filtered = filtered.filter(shop =>
//         typeof shop.shopName === 'string' &&
//         shop.shopName.toLowerCase().includes(lower)
//       );
//     }

//     if (selectedCountry) {
//       filtered = filtered.filter(shop => shop.country === selectedCountry.toLowerCase());
//     }

//     if (selectedCity) {
//       filtered = filtered.filter(shop => shop.city === selectedCity.toLowerCase());
//     }

//     setFilteredShops(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, selectedCountry, selectedCity, shops]);

//   const handleGenerateQR = async (shop) => {
//     try {
//       setLoadingShopId(shop.shopId);
//       setError(null);
//       const token = localStorage.getItem('token');
//       const userId = localStorage.getItem('id');

//       const response = await fetch(
//         `${API_BASE_URL}/generate?shopId=${shop.shopId}&userId=${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (!response.ok) throw new Error('Failed to generate QR code');

//       const data = await response.json();
//       setQrData({
//         qrCode: data.qrCodeImage,
//         availablePoints: data.availableBalance,
//         customerId: `CUST-${data.customerId}`,
//         userInfo: data.qrRawData,
//       });
//       setSelectedShop(shop);
//     } catch (err) {
//       setError(err.message || 'QR generation failed');
//     } finally {
//       setLoadingShopId(null);
//     }
//   };

//   const handleFilterReset = () => {
//     setSelectedCountry('');
//     setSelectedCity('');
//     setIsFilterOpen(false);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
//   const currentShops = filteredShops.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-[60vh]">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.3 }}
//           className="p-8 max-w-md w-full text-center"
//         >
//         <div className="flex items-center justify-center gap-3 mb-4">
//           <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//           <span className="text-xl font-semibold text-gray-800">Loading Shops...</span>
//         </div>
//         <p className="text-gray-600">Please wait while we fetch the shop details.</p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <motion.h1
//         className="text-4xl font-extrabold text-center text-blue-700 mb-8"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         🛍️ Explore Other Loyalty Shops
//       </motion.h1>

//       <div className="flex justify-center mb-10 space-x-4 relative">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search shops by name..."
//           className="w-full md:w-1/2 px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
//         />
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="px-4 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition flex items-center gap-2"
//           onClick={() => setIsFilterOpen(!isFilterOpen)}
//         >
//           <FontAwesomeIcon icon={faFilter} />
//           Filter
//         </motion.button>

//         {/* Filter Dropdown */}
//         {isFilterOpen && (
//           <motion.div
//             className="absolute top-full mt-2 bg-white p-6 rounded-lg shadow-xl w-full md:w-1/2 z-50"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h2 className="text-xl font-bold text-blue-700 mb-4">Filter Shops</h2>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Country</label>
//               <select
//                 value={selectedCountry}
//                 onChange={(e) => setSelectedCountry(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               >
//                 <option value="">All Countries</option>
//                 {countries.map((country) => (
//                   <option key={country} value={country}>{country}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">City</label>
//               <select
//                 value={selectedCity}
//                 onChange={(e) => setSelectedCity(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               >
//                 <option value="">All Cities</option>
//                 {cities.map((city) => (
//                   <option key={city} value={city}>{city}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="px-4 py-2 rounded-lg text-gray-600 font-medium bg-gray-200 hover:bg-gray-300 transition"
//                 onClick={handleFilterReset}
//               >
//                 Reset
//               </button>
//               <button
//                 className="px-4 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition"
//                 onClick={() => setIsFilterOpen(false)}
//               >
//                 Apply
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </div>

//       {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

//       {currentShops.length === 0 ? (
//         <p className="text-center text-gray-600 font-medium mt-10">
//           No shops found matching your search or filters.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
//           {currentShops.map((shop, index) => (
//             <motion.div
//               key={shop.shopId}
//               className="bg-white shadow-lg rounded-lg border border-blue-100 overflow-hidden hover:shadow-xl transition w-full max-w-sm min-h-[450px] flex flex-col"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 flex items-center gap-2">
//                 <FontAwesomeIcon icon={faStore} className="text-xl" />
//                 <h3 className="text-lg font-semibold truncate">{shop.shopName}</h3>
//               </div>
//               <div className="flex justify-center py-4">
//                 <img
//                   src={shop.imageUrl || 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150'}
//                   alt={shop.shopName}
//                   className="w-4/4 h-46 object-cover rounded-lg shadow-md"
//                 />
//               </div>
//               <div className="p-5 flex flex-col flex-1 justify-between">
//                 <div>
//                   <p className="text-gray-800 text-sm mb-2 flex items-center gap-2">
//                     <FontAwesomeIcon icon={faIdBadge} className="text-blue-600" />
//                     <strong>Shop ID:</strong> {shop.shopId}
//                   </p>
//                   <p className="text-gray-800 text-sm mb-2 flex items-center gap-2">
//                     <FontAwesomeIcon icon={faGlobe} className="text-blue-600" />
//                     <span><strong>Country:</strong> {shop.country || 'N/A'}</span>
//                   </p>
//                   <p className="text-gray-800 text-sm mb-2 flex items-center gap-2">
//                     <FontAwesomeIcon icon={faCity} className="text-blue-600" />
//                     <span><strong>City:</strong> {shop.city || 'N/A'}</span>
//                   </p>
//                   <p className="text-gray-800 text-sm mb-2 flex items-center gap-2">
//                     <FontAwesomeIcon icon={faPhoneAlt} className="text-blue-600" />
//                     <strong>Phone:</strong> {shop.shopPhone}
//                   </p>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium text-sm bg-blue-600 hover:bg-blue-700 transition"
//                   onClick={() => handleGenerateQR(shop)}
//                   disabled={loadingShopId === shop.shopId}
//                 >
//                   {loadingShopId === shop.shopId ? (
//                     <svg
//                       className="animate-spin h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8v8H4z"
//                       ></path>
//                     </svg>
//                   ) : (
//                     <>
//                       <FontAwesomeIcon icon={faQrcode} className="text-white" />
//                       Get QR Code
//                     </>
//                   )}
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center mt-10 space-x-4">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
//               currentPage === 1
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700'
//             } transition`}
//           >
//             <FontAwesomeIcon icon={faArrowLeft} />
//             Previous
//           </motion.button>
//           <div className="flex space-x-2">
//             {Array.from({ length: totalPages }, (_, index) => (
//               <motion.button
//                 key={index}
//                 onClick={() => setCurrentPage(index + 1)}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`w-10 h-10 rounded-full text-sm font-semibold flex items-center justify-center transition-all ${
//                   currentPage === index + 1
//                     ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-600'
//                     : 'bg-white text-blue-600 border-2 border-blue-300 hover:bg-blue-100 hover:shadow'
//                 }`}
//               >
//                 {index + 1}
//               </motion.button>
//             ))}
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
//               currentPage === totalPages
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700'
//             } transition`}
//           >
//             Next
//             <FontAwesomeIcon icon={faArrowRight} />
//           </motion.button>
//         </div>
//       )}

//       {/* QR Modal */}
//       <QRModal
//         shop={selectedShop}
//         qrData={qrData}
//         isOpen={!!selectedShop}
//         onClose={() => {
//           setSelectedShop(null);
//           setQrData(null);
//         }}
//       />
//     </div>
//   );
// }















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

const API_BASE_URL = 'https://loyalty-backend-java.onrender.com/api/qrcode';
const ITEMS_PER_PAGE = 8;

export default function ExploreShops() {
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

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');

        if (!token || !userId) throw new Error("User not authenticated");

        const response = await fetch(`${API_BASE_URL}/allShopsAvailable?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to load shops');

        const data = await response.json();
        const normalizedData = data.map(shop => ({
          ...shop,
          country: shop.country ? shop.country.toLowerCase() : '',
          city: shop.city ? shop.city.toLowerCase() : ''
        }));
        setShops(normalizedData);
        setFilteredShops(normalizedData);

        const uniqueCountries = [...new Set(normalizedData.map(shop => shop.country))].filter(Boolean);
        const uniqueCities = [...new Set(normalizedData.map(shop => shop.city))].filter(Boolean);
        setCountries(uniqueCountries);
        setCities(uniqueCities);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, []);

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
    try {
      setLoadingShopId(shop.shopId);
      setError(null);
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id');

      const response = await fetch(
        `${API_BASE_URL}/generate?shopId=${shop.shopId}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('Failed to generate QR code');

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
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
  const currentShops = filteredShops.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-8 max-w-md w-full text-center"
        >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="text-xl font-semibold text-gray-800">Loading Shops...</span>
        </div>
        <p className="text-gray-600">Please wait while we fetch the shop details.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <motion.h1
        className="text-4xl font-extrabold text-center text-blue-700 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🛍️ Explore Other Loyalty Shops
      </motion.h1>

      <div className="flex justify-center mb-10 space-x-4 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search shops by name..."
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition flex items-center gap-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <FontAwesomeIcon icon={faFilter} />
          Filter
        </motion.button>

        {/* Filter Dropdown */}
        {isFilterOpen && (
          <motion.div
            className="absolute top-full mt-2 bg-white p-6 rounded-lg shadow-xl w-full md:w-1/2 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-blue-700 mb-4">Filter Shops</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded-lg text-gray-600 font-medium bg-gray-200 hover:bg-gray-300 transition"
                onClick={handleFilterReset}
              >
                Reset
              </button>
              <button
                className="px-4 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition"
                onClick={() => setIsFilterOpen(false)}
              >
                Apply
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

      {currentShops.length === 0 ? (
        <p className="text-center text-gray-600 font-medium mt-10">
          No shops found matching your search or filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {currentShops.map((shop, index) => (
            <motion.div
              key={shop.shopId}
              className="bg-white shadow-lg rounded-lg border border-blue-100 overflow-hidden hover:shadow-xl transition w-full max-w-sm min-h-[450px] flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faStore} className="text-xl" />
                <h3 className="text-lg font-semibold truncate">{shop.shopName}</h3>
              </div>
              <div className="flex justify-center py-4">
                <img
                  src={shop.logoImage ? `data:image/jpeg;base64,${shop.logoImage}` : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150'}
                  alt={shop.shopName}
                  className="w-4/4 h-40 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-gray-800 text-sm mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faIdBadge} className="text-blue-600" />
                    <strong>Shop ID:</strong> {shop.shopId}
                  </p>
                  <p className="text-gray-800 text-sm mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faGlobe} className="text-blue-600" />
                    <span><strong>Country:</strong> {shop.country || 'N/A'}</span>
                  </p>
                  <p className="text-gray-800 text-sm mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faCity} className="text-blue-600" />
                    <span><strong>City:</strong> {shop.city || 'N/A'}</span>
                  </p>
                  <p className="text-gray-800 text-sm mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faPhoneAlt} className="text-blue-600" />
                    <strong>Phone:</strong> {shop.shopPhone}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium text-sm bg-blue-600 hover:bg-blue-700 transition"
                  onClick={() => handleGenerateQR(shop)}
                  disabled={loadingShopId === shop.shopId}
                >
                  {loadingShopId === shop.shopId ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faQrcode} className="text-white" />
                      Get QR Code
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition`}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Previous
          </motion.button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 rounded-full text-sm font-semibold flex items-center justify-center transition-all ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-600'
                    : 'bg-white text-blue-600 border-2 border-blue-300 hover:bg-blue-100 hover:shadow'
                }`}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition`}
          >
            Next
            <FontAwesomeIcon icon={faArrowRight} />
          </motion.button>
        </div>
      )}

      {/* QR Modal */}
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