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




import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import QRModal from './QRModal';

const API_BASE_URL = 'https://loyalty-backend-java.onrender.com/api/qrcode';

export default function ExploreShops() {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all shops
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');

        if (!token || !userId) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`${API_BASE_URL}/allShops?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load shops');
        }

        const data = await response.json();
        setShops(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      }
    };

    fetchShops();
  }, []);

  // Handle QR button click
  const handleGenerateQR = async (shop) => {
    try {
      setLoading(true);
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

      if (!response.ok) {
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
                alt="shop image"
                className="w-full h-32 object-cover rounded mb-4"
              />
              <p className="text-gray-700 text-sm mb-2"><strong>Shop Id:</strong> {shop.shopId}</p>
              <p className="text-gray-700 text-sm mb-4"><strong>📞</strong> {shop.shopPhone}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 rounded transition font-medium text-sm bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => handleGenerateQR(shop)}
              >
                {loading && selectedShop?.shopId === shop.shopId ? 'Generating...' : 'QR Code'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

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
