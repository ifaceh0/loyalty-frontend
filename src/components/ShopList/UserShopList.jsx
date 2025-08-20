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

const API_BASE_URL = 'https://loyalty-backend-java.onrender.com/api/qrcode';
const ITEMS_PER_PAGE = 8;

export default function UserShopList() {
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

        const response = await fetch(`${API_BASE_URL}/userSpecificShop?userId=${userId}`, {
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
            <Loader2 className="w-8 h-8 text-blue-700 animate-spin" />
            <span className="text-xl font-semibold text-gray-800">Loading Shops...</span>
          </div>
          <p className="text-gray-600">Please wait while we fetch your visited shop details.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f5fc]"
    style={{
        /* subtle gradient + grid background */
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
          linear-gradient(135deg, #d0f4de, #a9def9)
        `,
        backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        backgroundAttachment: "fixed",
      }}>
      <motion.h1
        className="text-4xl font-extrabold text-center text-blue-700 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🛍️ Your Favorite Visited Shops
      </motion.h1>

      <div className="flex justify-center mb-10 space-x-4 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search your visited shops..."
          className="w-full md:w-1/2 px-5 py-3 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md text-lg"
        />
      </div>

      {error && <p className="text-red-500 text-center font-semibold text-lg mb-6">{error}</p>}

      {currentShops.length === 0 ? (
        <p className="text-center text-gray-600 font-medium text-lg mt-10">
          No visited shops found matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {currentShops.map((shop, index) => (
            <motion.div
              key={shop.shopId}
              className="card-glow bg-gradient-to-br from-white via-[#ade4c9] to-[#e0faff] shadow-xl border border-purple-100 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 text-white px-5 py-4 flex items-center gap-2 relative">
                <FontAwesomeIcon icon={faStore} className="text-2xl text-yellow-400" />
                <h3 className="text-xl font-bold truncate capitalize">{shop.shopName}</h3>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="absolute right-4 text-green-300 text-lg"
                  title="Visited Shop"
                />
              </div>
              <div className="flex justify-center py-5">
                <img
                  src={shop.imageUrl || 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150'}
                  alt={shop.shopName}
                  className="w-4/4 h-46 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-gray-700 text-sm mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faIdBadge} className="text-red-400" />
                    <span><strong>Shop ID:</strong> {shop.shopId}</span>
                  </p>
                  <p className="text-gray-700 text-sm mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faGlobe} className="text-blue-500" />
                    <span><strong>Country:</strong> {shop.country || 'N/A'}</span>
                  </p>
                  <p className="text-gray-700 text-sm mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faCity} className="text-brown-200" />
                    <span><strong>City:</strong> {shop.city || 'N/A'}</span>
                  </p>
                  <p className="text-gray-700 text-sm mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faPhoneAlt} className="text-green-400" />
                    <span><strong>Phone:</strong> {shop.shopPhone || 'N/A'}</span>
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg 
                            text-white font-semibold text-sm 
                              bg-gradient-to-r from-green-500 to-blue-600 
                            hover:from-green-600 hover:to-blue-700 transition shadow-md"
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
                      <FontAwesomeIcon icon={faQrcode} className="text-yellow-400" />
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
        <div className="flex justify-center items-center mt-12 space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-5 py-2 rounded-xl font-medium flex items-center gap-2 ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-700 text-white hover:bg-purple-800'
            } transition shadow-md`}
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
                    ? 'bg-purple-700 text-white shadow-lg border-2 border-purple-700'
                    : 'bg-white text-purple-700 border-2 border-blue-200 hover:bg-blue-100 hover:shadow'
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
            className={`px-5 py-2 rounded-xl font-medium flex items-center gap-2 ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-700 text-white hover:bg-purple-800'
            } transition shadow-md`}
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