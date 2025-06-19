// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import QRModal from './QRModal';

// const shopData = [
//   {
//     id: 'Shop-1',
//     name: 'Shop NY',
//     phone: '54678832828',
//     qr: '/shop8-qr.png',
//     customerId: 'CUST-50',
//     balance: '10.00',
//   },
//   {
//     id: 'Shop-2',
//     name: 'Shop LA',
//     phone: '54678832828',
//     qr: '/shop8-qr.png',
//     customerId: 'CUST-50',
//     balance: '20.00',
//   }
//   // Add more shops...
// ];

// export default function ExploreShops() {
//   const [selectedShop, setSelectedShop] = useState(null);

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

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {shopData.map((shop, index) => (
//           <motion.div
//             key={shop.id}
//             className="bg-white rounded-xl shadow-md"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: index * 0.2 }}
//           >
//             <div className="bg-blue-700 text-white px-4 py-2 flex items-center gap-2">
//               <span className="text-xl">🏪</span>
//               <h3 className="font-semibold">{shop.name}</h3>
//             </div>
//             <div className="p-4">
//               <img
//                 src="/refer-earn.png"
//                 alt="Refer & Earn"
//                 className="w-full h-32 object-cover rounded mb-4"
//               />
//               <p className="text-gray-700 text-sm mb-2"><strong>ID:</strong> {shop.id}</p>
//               <p className="text-gray-700 text-sm mb-4"><strong>📞</strong> {shop.phone}</p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                 onClick={() => setSelectedShop(shop)}
//               >
//                 QR Code
//               </motion.button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* QR Modal */}
//       <QRModal
//         shop={selectedShop}
//         isOpen={!!selectedShop}
//         onClose={() => setSelectedShop(null)}
//       />
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRModal from './QRModal';

const API_BASE_URL = 'https://loyalty-backend-java.onrender.com/api/qrcode'; 

export default function ExploreShops() {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [qrData, setQrData] = useState(null); // Store QR code and profile data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch shops on component mount
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/shops`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(response.status === 401 ? 'Unauthorized' : 'Failed to load shops');
        }

        const data = await response.json();
        setShops(data);
      } catch (err) {
        setError(err.message || 'Failed to load shops');
        console.error(err);
      }
    };
    fetchShops();
  }, []);

  // Fetch QR code and profile data
  const handleGenerateQR = async (shop) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/generate/${shop.shopId}`, {
        method: 'POST', // Match backend @PostMapping
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(response.status === 401 ? 'Unauthorized' : 'Failed to generate QR code');
      }

      const data = await response.json();
      setQrData({
        qrCode: data.qrCode,
        availablePoints: data.availablePoints,
        customerId: `CUST-${data.userId}`, // Format userId as customerId
      });
      setSelectedShop(shop);
    } catch (err) {
      setError(err.message || 'Failed to generate QR code');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-100 p-6 rounded-xl">
      <motion.h1
        className="text-2xl font-bold text-center text-blue-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore Shops
      </motion.h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-blue-600 text-center">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shops.map((shop, index) => (
          <motion.div
            key={shop.shopId}
            className="bg-white rounded-xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            <div className="bg-blue-700 text-white px-4 py-2 flex items-center gap-2">
              <span className="text-xl">🏪</span>
              <h3 className="font-semibold">{shop.shopName}</h3>
            </div>
            <div className="p-4">
              <img
                src="/refer-earn.png"
                alt="Refer & Earn"
                className="w-full h-32 object-cover rounded mb-4"
              />
              <p className="text-gray-700 text-sm mb-2"><strong>ID:</strong> {shop.id}</p>
              <p className="text-gray-700 text-sm mb-4"><strong>📞</strong> {shop.phone}</p>

              {/* QR Code Button - works only if qrToken exists */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!shop.qrToken}
                className={`w-full px-4 py-2 rounded transition font-medium text-sm ${
                  shop.qrToken
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
                onClick={() => shop.qrToken && setSelectedShop(shop)}
              >
                {loading ? 'Generating...' : 'QR Code'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

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