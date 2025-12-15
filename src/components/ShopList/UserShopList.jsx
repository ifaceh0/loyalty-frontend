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
//   faArrowLeft,
//   faArrowRight,
//   faCheckCircle
// } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';

// const API_BASE_URL = 'https://loyalty-backend-java.onrender.com/api/qrcode';
// const ITEMS_PER_PAGE = 8;

// export default function UserShopList() {
//   const navigate = useNavigate();

//   const [shops, setShops] = useState([]);
//   const [filteredShops, setFilteredShops] = useState([]);
//   const [selectedShop, setSelectedShop] = useState(null);
//   const [qrData, setQrData] = useState(null);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loadingShopId, setLoadingShopId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const checkAuth = () => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     const userId = localStorage.getItem('id');
//     if (!isLoggedIn || !userId) {
//       navigate('/signin');
//       return null;
//     }
//     return userId;
//   };

//   useEffect(() => {
//     const userId = checkAuth();
//     if (!userId) return;

//     const fetchShops = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/userSpecificShop?userId=${userId}`, {
//           credentials: "include",
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             localStorage.clear();
//             navigate('/signin');
//             return;
//           }
//           throw new Error('Failed to load shops');
//         }

//         const data = await response.json();
//         setShops(data);
//         setFilteredShops(data);
//       } catch (err) {
//         setError(err.message || 'Something went wrong');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchShops();
//   }, [navigate]);

//   useEffect(() => {
//     const lower = searchTerm.toLowerCase();
//     const filtered = shops.filter(shop =>
//       typeof shop.shopName === 'string' &&
//       shop.shopName.toLowerCase().includes(lower)
//     );
//     setFilteredShops(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, shops]);

//   const handleGenerateQR = async (shop) => {
//     const userId = checkAuth();
//     if (!userId) return;

//     try {
//       setLoadingShopId(shop.shopId);
//       setError(null);

//       const response = await fetch(
//         `${API_BASE_URL}/generate?shopId=${shop.shopId}&userId=${userId}`,
//         {
//           credentials: "include",
//         }
//       );

//       if (!response.ok) {
//         if (response.status === 401) {
//           localStorage.clear();
//           navigate('/signin');
//           return;
//         }
//         throw new Error('Failed to generate QR code');
//       }

//       const data = await response.json();
//       setQrData({
//         qrCode: data.qrCodeImage,
//         availablePoints: data.availableBalance,
//         customerId: `CUST-${data.userId}`,
//         userInfo: data.qrRawData,
//       });
//       setSelectedShop(shop);
//     } catch (err) {
//       setError(err.message || 'QR generation failed');
//     } finally {
//       setLoadingShopId(null);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <Loader2 className="w-8 h-8 text-blue-700 animate-spin" />
//             <span className="text-xl font-semibold text-gray-800">Loading Shops...</span>
//           </div>
//           <p className="text-gray-600">Please wait while we fetch your visited shop details.</p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-4 md:p-1">
//       <motion.h1
//         className="text-4xl font-extrabold text-center text-blue-800 mb-10"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         Your Visited Loyalty Hubs
//       </motion.h1>

//       <div className="flex justify-center mb-10">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search your visited shops..."
//           className="w-full md:w-1/2 px-5 py-2 rounded-sm border-2 border-blue-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-400 shadow-md transition"
//         />
//       </div>

//       {error && (
//         <p className="text-red-500 text-center font-semibold bg-red-100 p-3 rounded-sm mx-auto max-w-lg mb-6">
//           {error}
//         </p>
//       )}

//       {currentShops.length === 0 ? (
//         <p className="text-center text-gray-500 font-medium mt-10 p-5">
//           <span className="text-2xl font-bold text-blue-600 block mb-2">Oops!</span>
//           No visited shops found matching your search. Try broadening your search!
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl mx-auto">
//           {currentShops.map((shop) => (
//             <div
//               key={shop.shopId}
//               className="bg-white rounded-md shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-100"
//             >
//               {/* Gradient Header with Check */}
//               <div className="bg-blue-700 p-3 text-white flex items-center justify-between">
//                 <div className="flex items-center">
//                   <FontAwesomeIcon icon={faStore} className="mr-2 text-lg" />
//                   <h2 className="font-bold text-lg truncate">{shop.shopName}</h2>
//                 </div>
//                 <FontAwesomeIcon
//                   icon={faCheckCircle}
//                   className="text-white text-lg"
//                   title="Visited Shop"
//                 />
//               </div>

//               {/* Image with Awning */}
//               <div className="relative">
//                 <div className="absolute top-0 left-0 right-0 h-4 bg-blue-600 clip-awning"></div>
//                 {shop.logoImage ? (
//                   <img
//                     src={`data:image/jpeg;base64,${shop.logoImage}`}
//                     alt={shop.shopName}
//                     className="w-full h-40 object-cover border-blue-800"
//                   />
//                 ) : (
//                   <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-200 border-blue-800 flex items-center justify-center">
//                     <span className="text-5xl font-bold text-blue-700">
//                       {shop.shopName.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Card Body */}
//               <div className="p-4 bg-blue-50">
//                 {/* Shop ID Badge */}
//                 <div className="flex justify-end mb-2">
//                   <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                     ID: shop{shop.shopId}
//                   </span>
//                 </div>

//                 {/* Country & City */}
//                 <div className="grid grid-cols-2 gap-2 text-sm mb-3">
//                   <div className="flex items-center bg-white p-1 rounded border border-blue-200">
//                     <FontAwesomeIcon icon={faGlobe} className="mr-2 text-blue-700 text-xs" />
//                     <span className="font-medium text-blue-800 truncate">
//                       {shop.country ? shop.country.toUpperCase() : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex items-center bg-white p-1 rounded border border-blue-200">
//                     <FontAwesomeIcon icon={faCity} className="mr-2 text-blue-700 text-xs" />
//                     <span className="font-medium text-blue-800 truncate">
//                       {shop.city ? shop.city.toUpperCase() : 'N/A'}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Phone */}
//                 <div className="flex items-center mt-2 bg-white p-1.5 rounded border border-blue-200">
//                   <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-blue-700" />
//                   <span className="text-sm font-medium text-blue-800">
//                     {shop.shopPhone || 'N/A'}
//                   </span>
//                 </div>

//                 {/* QR Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => handleGenerateQR(shop)}
//                   disabled={loadingShopId === shop.shopId}
//                   className={`w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-sm text-sm font-medium transition flex items-center justify-center gap-2
//                     ${loadingShopId === shop.shopId ? 'opacity-70 cursor-not-allowed' : ''}`}
//                 >
//                   {loadingShopId === shop.shopId ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <FontAwesomeIcon icon={faQrcode} />
//                       QR Code
//                     </>
//                   )}
//                 </motion.button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center mt-12 space-x-3">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//             className={`px-5 py-2 rounded-full font-medium flex items-center gap-2 shadow-md transition-all duration-200 ${
//               currentPage === 1
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700'
//             }`}
//           >
//             <FontAwesomeIcon icon={faArrowLeft} />
//             Previous
//           </motion.button>

//           <div className="flex space-x-2">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <motion.button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center transition-all duration-200 ${
//                   currentPage === i + 1
//                     ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-600'
//                     : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
//                 }`}
//               >
//                 {i + 1}
//               </motion.button>
//             ))}
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className={`px-5 py-2 rounded-full font-medium flex items-center gap-2 shadow-md transition-all duration-200 ${
//               currentPage === totalPages
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700'
//             }`}
//           >
//             Next
//             <FontAwesomeIcon icon={faArrowRight} />
//           </motion.button>
//         </div>
//       )}

//       <QRModal
//         shop={selectedShop}
//         qrData={qrData}
//         isOpen={!!selectedShop}
//         onClose={() => {
//           setSelectedShop(null);
//           setQrData(null);
//         }}
//       />

//       <style jsx>{`
//         .clip-awning {
//           clip-path: polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%);
//         }
//       `}</style>
//     </div>
//   );
// }














//translated
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
  faArrowLeft,
  faArrowRight,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // AÑADIDO

const API_BASE_URL = 'https://loyalty-backend-java.onrender.com/api/qrcode';
const ITEMS_PER_PAGE = 8;

export default function UserShopList() {
  const { t } = useTranslation(); // AÑADIDO
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

  const checkAuth = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userId = localStorage.getItem('id');
    if (!isLoggedIn || !userId) {
      navigate('/signin');
      return null;
    }
    return userId;
  };

  useEffect(() => {
    const userId = checkAuth();
    if (!userId) return;

    const fetchShops = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/userSpecificShop?userId=${userId}`, {
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
        setShops(data);
        setFilteredShops(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, [navigate]);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = shops.filter(shop =>
      typeof shop.shopName === 'string' &&
      shop.shopName.toLowerCase().includes(lower)
    );
    setFilteredShops(filtered);
    setCurrentPage(1);
  }, [searchTerm, shops]);

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
          transition={{ duration: 0.3 }}
          className="p-8 max-w-md w-full text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="w-8 h-8 text-blue-700 animate-spin" />
            <span className="text-xl font-semibold text-gray-800">{t('userShopList.loading.title')}</span>
          </div>
          <p className="text-gray-600">{t('userShopList.loading.subtitle')}</p>
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
        {t('userShopList.title')}
      </motion.h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('userShopList.searchPlaceholder')}
          className="w-full md:w-1/2 px-5 py-2 rounded border-2 border-blue-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-400 shadow-md transition"
        />
      </div>

      {error && (
        <p className="text-red-500 text-center font-semibold bg-red-100 p-3 rounded mx-auto max-w-lg mb-6">
          {error}
        </p>
      )}

      {currentShops.length === 0 ? (
        <p className="text-center text-gray-500 font-medium mt-10 p-5">
          <span className="text-2xl font-bold text-blue-600 block mb-2">{t('userShopList.noResults.oops')}</span>
          {t('userShopList.noResults.message')}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl mx-auto">
          {currentShops.map((shop) => (
            <div
              key={shop.shopId}
              className="bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-100"
            >
              {/* Gradient Header with Check */}
              <div className="bg-blue-700 p-3 text-white flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faStore} className="mr-2 text-lg" />
                  <h2 className="font-bold text-lg truncate">{shop.shopName}</h2>
                </div>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-white text-lg"
                  title={t('userShopList.visitedBadge')}
                />
              </div>

              {/* Image with Awning */}
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-4 bg-blue-600 clip-awning"></div>
                {shop.logoImage ? (
                  <img
                    src={`data:image/jpeg;base64,${shop.logoImage}`}
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
                    <span className="font-medium text-blue-800 truncate">
                      {shop.country ? shop.country.toUpperCase() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center bg-white p-1 rounded border border-blue-200">
                    <FontAwesomeIcon icon={faCity} className="mr-2 text-blue-700 text-xs" />
                    <span className="font-medium text-blue-800 truncate">
                      {shop.city ? shop.city.toUpperCase() : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center mt-2 bg-white p-1.5 rounded border border-blue-200">
                  <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-blue-700" />
                  <span className="text-sm font-medium text-blue-800">
                    {shop.shopPhone || 'N/A'}
                  </span>
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
                      {t('userShopList.qr.generating')}
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faQrcode} />
                      {t('userShopList.qr.button')}
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-5 py-2 rounded-full font-medium flex items-center gap-2 shadow-md transition-all duration-200 ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {t('userShopList.pagination.previous')}
          </motion.button>

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

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-5 py-2 rounded-full font-medium flex items-center gap-2 shadow-md transition-all duration-200 ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {t('userShopList.pagination.next')}
            <FontAwesomeIcon icon={faArrowRight} />
          </motion.button>
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