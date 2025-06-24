
// import { useEffect, useState } from 'react';

// export default function QRModal({ shop, isOpen, onClose }) {
//   const [qrData, setQrData] = useState(null);

//   useEffect(() => {
//     const fetchQRCodeData = async () => {
//       if (!shop?.qrToken) return;

//       try {
//         const response = await fetch(`https://loyalty-backend-java.onrender.com/api/qrcode/scan/${shop.qrToken}`, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${localStorage.getItem("token")}`
//           }
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch QR data");
//         }

//         const data = await response.json();
//         setQrData(data);
//       } catch (err) {
//         console.error("QR Fetch Error:", err.message);
//       }
//     };

//     fetchQRCodeData();
//   }, [shop]);

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

//         {qrData && (
//           <div className="mt-4 bg-green-100 p-3 rounded text-center text-green-700 font-medium">
//             QR Verified: {qrData.message || "Success"}
//           </div>
//         )}

//         <p className="text-center text-sm text-gray-800 mt-4">
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


export default function QRModal({ shop, qrData, isOpen, onClose }) {
  if (!isOpen || !shop || !qrData) return null;

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

        {qrData.qrCode && (
          <div className="flex justify-center my-4">
            <img src={qrData.qrCode} alt="QR Code" className="w-40 h-40" />
          </div>
        )}

        <div className="mt-4 bg-blue-50 p-4 rounded text-sm">
          <p><strong>Shop ID:</strong> {shop.shopId}</p>
          <p><strong>Customer ID:</strong> {qrData.customerId}</p>
          <p><strong>Available Balance:</strong> {qrData.availablePoints}</p>
          {/* {qrData.userInfo && (
            <>
              <p><strong>Name:</strong> {qrData.userInfo.userName}</p>
              <p><strong>Email:</strong> {qrData.userInfo.email}</p>
              <p><strong>Phone:</strong> {qrData.userInfo.phone}</p>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
}
