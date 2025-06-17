import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QRModal from './QRModal';

const shopData = [
  {
    id: 'Shop-1',
    name: 'Shop NY',
    phone: '54678832828',
    qr: '/shop8-qr.png',
    customerId: 'CUST-50',
    balance: '10.00',
  },
  {
    id: 'Shop-2',
    name: 'Shop LA',
    phone: '54678832828',
    qr: '/shop8-qr.png',
    customerId: 'CUST-50',
    balance: '20.00',
  }
  // Add more shops...
];

export default function ExploreShops() {
  const [selectedShop, setSelectedShop] = useState(null);

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shopData.map((shop, index) => (
          <motion.div
            key={shop.id}
            className="bg-white rounded-xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            <div className="bg-blue-700 text-white px-4 py-2 flex items-center gap-2">
              <span className="text-xl">🏪</span>
              <h3 className="font-semibold">{shop.name}</h3>
            </div>
            <div className="p-4">
              <img
                src="/refer-earn.png"
                alt="Refer & Earn"
                className="w-full h-32 object-cover rounded mb-4"
              />
              <p className="text-gray-700 text-sm mb-2"><strong>ID:</strong> {shop.id}</p>
              <p className="text-gray-700 text-sm mb-4"><strong>📞</strong> {shop.phone}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => setSelectedShop(shop)}
              >
                QR Code
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* QR Modal */}
      <QRModal
        shop={selectedShop}
        isOpen={!!selectedShop}
        onClose={() => setSelectedShop(null)}
      />
    </div>
  );
}
