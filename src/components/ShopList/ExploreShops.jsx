// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import QRModal from './QRModal';

// const API_BASE_URL = 'https://loyalty-backend-java.onrender.com/api/qrcode';

// export default function ExploreShops() {
//   const [shops, setShops] = useState([]);
//   const [selectedShop, setSelectedShop] = useState(null);
//   const [qrData, setQrData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch all shops
//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem('token');
//         const userId = localStorage.getItem('id');

//         if (!token || !userId) {
//           throw new Error("User not authenticated");
//         }

//         const response = await fetch(`${API_BASE_URL}/allShops?userId=${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to load shops');
//         }

//         const data = await response.json();
//         setShops(data);
//       } catch (err) {
//         setError(err.message || 'Something went wrong');
//       }finally {
//       setLoading(false); 
//       }
//     };

//     fetchShops();
//   }, []);

//   // Handle QR button click
//   const handleGenerateQR = async (shop) => {
//     try {
//       // setLoading(true);
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

//       if (!response.ok) {
//         throw new Error('Failed to generate QR code');
//       }

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
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-blue-100 p-6 rounded-xl">
//       <motion.h1
//         className="text-2xl font-bold text-center text-blue-800 mb-6"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         Explore Shops
//       </motion.h1>

//       {error && <p className="text-red-500 text-center">{error}</p>}
//       {/* {loading && <p className="text-blue-600 text-center">Loading...</p>} */}
//       {loading && (
//         <div className="flex justify-center mt-4 mb-6">
//           <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
//         </div>
//       )}


//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {shops.map((shop, index) => (
//           <motion.div
//             key={shop.shopId}
//             className="bg-white rounded-xl shadow-md"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: index * 0.2 }}
//           >
//             <div className="bg-blue-700 text-white px-4 py-2 flex items-center gap-2">
//               <span className="text-xl">🏪</span>
//               <h3 className="font-semibold">{shop.shopName}</h3>
//             </div>
//             <div className="p-4">
//               <img
//                 src="/refer-earn.png"
//                 alt="shop image"
//                 className="w-full h-32 object-cover rounded mb-4"
//               />
//               <p className="text-gray-700 text-sm mb-2"><strong>Shop Id:</strong> {shop.shopId}</p>
//               <p className="text-gray-700 text-sm mb-4"><strong>📞</strong> {shop.shopPhone}</p>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full px-4 py-2 rounded transition font-medium text-sm bg-blue-600 text-white hover:bg-blue-700"
//                 onClick={() => handleGenerateQR(shop)}
//               >
//                 {loading && selectedShop?.shopId === shop.shopId ? 'Generating...' : 'QR Code'}
//               </motion.button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStore,
  faIdBadge,
  faPhoneAlt,
  faQrcode
} from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = 'https://loyalty-backend-java.onrender.com/api/qrcode';
const ITEMS_PER_PAGE = 6;

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

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');

        if (!token || !userId) throw new Error("User not authenticated");

        const response = await fetch(`${API_BASE_URL}/allShops?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to load shops');

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
  }, []);

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

  const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
  const currentShops = filteredShops.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p className="text-blue-700 font-semibold text-lg animate-pulse">Loading Shops...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-inner min-h-screen">
      <motion.h1
        className="text-3xl font-extrabold text-center text-blue-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🛍️ Explore Loyalty Shops
      </motion.h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search shops by name..."
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
        />
      </div>

      {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

      {currentShops.length === 0 ? (
        <p className="text-center text-gray-600 font-medium mt-10">
          No shops found matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentShops.map((shop, index) => (
            <motion.div
              key={shop.shopId}
              className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition w-80 min-h-[340px] flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faStore} className="text-xl" />
                <h3 className="text-lg font-semibold truncate">{shop.shopName}</h3>
              </div>
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-gray-800 text-sm mb-2">
                    <FontAwesomeIcon icon={faIdBadge} className="mr-2 text-blue-600" />
                    <strong>Shop ID:</strong> {shop.shopId}
                  </p>
                  <br /><br /><br />
                  <br /><br /><br /><br />
                  <p className="text-gray-800 text-sm mb-4">
                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-blue-600" />
                    <strong>Phone:</strong> {shop.shopPhone}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white font-medium text-sm bg-blue-600 hover:bg-blue-700 transition"
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
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-blue-600 border-blue-300'
              } hover:bg-blue-100`}
            >
              {index + 1}
            </button>
          ))}
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
