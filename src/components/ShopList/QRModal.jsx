// import React from 'react';

// export default function QRModal({ shop, isOpen, onClose }) {
//   if (!isOpen || !shop) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
//         <button
//           className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-red-500"
//           onClick={onClose}
//         >
//           ×
//         </button>

//         <h2 className="text-lg font-bold text-center mb-4 text-blue-700">
//           {shop.name}
//         </h2>

//         {/* QR Code Placeholder - Backend will dynamically render QR here */}
//         <div className="flex justify-center items-center w-full h-48 bg-gray-100 rounded mb-4">
//           <p className="text-gray-500 text-sm">[ QR Code will appear here ]</p>
//         </div>

//         <p className="text-center text-sm text-gray-800">
//           <strong>Shop ID:</strong> {shop.id}
//         </p>

//         <div className="mt-4 bg-blue-50 p-4 rounded">
//           <p className="text-sm"><strong>Customer ID:</strong> {shop.customerId || 'CUST-50'}</p>
//           <p className="text-sm"><strong>Balance:</strong> ${shop.balance || '10.00'}</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react';

export default function QRModal({ shop, qrData, isOpen, onClose }) {
  if (!isOpen || !shop) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        <button
          className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-lg font-bold text-center mb-4 text-blue-700">
          {shop.shopName}
        </h2>

        {/* QR Code Display */}
        <div className="flex justify-center items-center w-full h-48 bg-gray-100 rounded mb-4">
          {qrData?.qrCode ? (
            <img
              src={`data:image/png;base64,${qrData.qrCode}`}
              alt="QR Code"
              className="w-40 h-40"
            />
          ) : (
            <p className="text-gray-500 text-sm">Loading QR Code...</p>
          )}
        </div>

        <p className="text-center text-sm text-gray-800">
          <strong>Shop ID:</strong> {shop.shopId}
        </p>

        <div className="mt-4 bg-blue-50 p-4 rounded">
          <p className="text-sm">
            <strong>Customer ID:</strong> {qrData?.customerId || 'N/A'}
          </p>
          <p className="text-sm">
            <strong>Balance:</strong> {qrData?.availablePoints ?? '0'} points
          </p>
        </div>
      </div>
    </div>
  );
}