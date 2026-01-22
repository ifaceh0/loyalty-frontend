// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faTimes,
//   faStore,
//   faIdCard,
//   faWallet,
//   faQrcode,
//   faDownload,
//   faGift,
//   faInfoCircle,
// } from '@fortawesome/free-solid-svg-icons';

// export default function QRModal({ shop, qrData, isOpen, onClose }) {
//   if (!isOpen || !shop || !qrData) return null;

//   const [showEncouragement, setShowEncouragement] = useState(false);

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = qrData.qrCode;
//     link.download = `${shop.shopName}_QRCode.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-60 backdrop-blur-sm px-3 py-6 sm:p-8 overflow-y-auto">
//       <div className="bg-white w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 my-auto max-h-full">
//         <nav className="bg-blue-600 text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center sticky top-0 z-10">
//           <h2 className="text-lg sm:text-xl font-extrabold flex items-center gap-2 sm:gap-3">
//             <FontAwesomeIcon icon={faQrcode} className="text-white text-xl sm:text-2xl" />
//             QR Code for <span className="truncate">{shop.shopName}</span>
//           </h2>
//           <button
//             className="p-1.5 sm:p-2 rounded-full hover:bg-blue-700 text-white transition duration-200"
//             onClick={onClose}
//             aria-label="Close Modal"
//           >
//             <FontAwesomeIcon icon={faTimes} className="text-lg sm:text-xl" />
//           </button>
//         </nav>
        
//         <div className="max-h-[75vh] sm:max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
            
//             <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                
//                 {/* QR Code Section */}
//                 {qrData.qrCode && (
//                     <div className="flex flex-col items-center">
//                     <img
//                         src={qrData.qrCode}
//                         alt="QR Code"
//                         className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 border-4 sm:border-6 md:border-8 border-gray-100 rounded-md shadow-xl"
//                     />
//                     <button
//                         onClick={handleDownload}
//                         className="mt-4 sm:mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 rounded-sm font-bold flex items-center justify-center gap-2 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm sm:text-base"
//                     >
//                         <FontAwesomeIcon icon={faDownload} className="text-base sm:text-lg" />
//                         Download Loyalty QR Code
//                     </button>
//                     </div>
//                 )}

//                 {/* Information Block */}
//                 <div className="bg-gray-50 p-4 sm:p-5 rounded-md text-gray-700 text-sm sm:text-base border border-gray-200 space-y-3">
                    
//                     {/* Header with Info Toggle Button */}
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2 mb-3">
//                         <h3 className="text-base sm:text-lg font-bold text-indigo-600">
//                             Account Details
//                         </h3>
//                         <button
//                             onClick={() => setShowEncouragement(!showEncouragement)}
//                             className="text-indigo-600 hover:text-indigo-800 transition duration-200 font-semibold flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm focus:outline-none"
//                             aria-expanded={showEncouragement}
//                             aria-controls="encouragement-message"
//                         >
//                             <FontAwesomeIcon icon={faInfoCircle} className="text-lg sm:text-xl" />
//                             {showEncouragement ? 'Hide Tip' : 'Show Tip'}
//                         </button>
//                     </div>
                    
//                     {/* Account Details Content */}
//                     <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
//                       <FontAwesomeIcon icon={faIdCard} className="text-indigo-500 w-4 sm:w-5" />
//                       <span><span className="font-semibold text-gray-800">Shop ID:</span> {shop.shopId}</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
//                       <FontAwesomeIcon icon={faStore} className="text-indigo-500 w-4 sm:w-5" />
//                       <span><span className="font-semibold text-gray-800">Shop Name:</span> {shop.shopName}</span>
//                     </div> 
                    
//                     <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
//                       <FontAwesomeIcon icon={faIdCard} className="text-indigo-500 w-4 sm:w-5" />
//                       <span><span className="font-semibold text-gray-800">Customer ID:</span> {qrData.customerId}</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2 sm:gap-3 pt-3 border-t border-gray-200">
//                       <FontAwesomeIcon icon={faWallet} className="text-indigo-500 text-lg sm:text-xl w-4 sm:w-5" />
//                       <span className="text-base sm:text-lg font-bold text-indigo-600">
//                         <span className="font-semibold">Available Points:</span> {qrData.availablePoints} Points
//                       </span>
//                     </div>
//                 </div>
                
//                 <div 
//                     id="encouragement-message"
//                     className={`
//                         ${showEncouragement ? 'max-h-96 opacity-100 p-4' : 'max-h-0 opacity-0 p-0'}
//                         overflow-hidden transition-all duration-500 ease-in-out
//                         bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow-md
//                     `}
//                 >
//                     <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-md shadow-md p-3 sm:p-4">
//                       <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
//                         <FontAwesomeIcon icon={faGift} className="text-yellow-600 text-2xl sm:text-3xl mt-0.5 animate-bounce flex-shrink-0" />
//                         <div className="text-xs sm:text-sm">
//                           <p className="font-bold text-gray-800">
//                             Unlock Exciting Rewards at {shop.shopName}!
//                           </p>
//                           <p className="text-gray-600 mt-1">
//                             You're already at <strong>{qrData.availablePoints} points</strong>! Shop at <strong>{shop.shopName}</strong> today, make a purchase, and scan this QR code to earn even more points. Don't miss out on exclusive rewards waiting just for you!
//                           </p>
//                           <p className="text-blue-700 font-semibold mt-2">
//                             Visit now and turn your purchases into amazing perks!
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                 </div>
                
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }









//translated version
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faStore,
  faIdCard,
  faWallet,
  faQrcode,
  faDownload,
  faGift,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export default function QRModal({ shop, qrData, isOpen, onClose }) {
  
  const { t } = useTranslation();
  const [showEncouragement, setShowEncouragement] = useState(false);

  if (!isOpen || !shop || !qrData) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrData.qrCode;
    link.download = `${shop.shopName}_QRCode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-60 backdrop-blur-sm px-3 py-6 sm:p-8 overflow-y-auto">
      <div className="bg-white w-full max-w-xs sm:max-w-sm md:max-w-md rounded shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 my-auto max-h-full">

        {/* Header */}
        <nav className="bg-blue-600 text-white px-4 rounded-t-sm sm:px-6 py-3 sm:py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-lg sm:text-xl font-extrabold flex items-center gap-2 sm:gap-3">
            <FontAwesomeIcon icon={faQrcode} className="text-white text-xl sm:text-2xl" />
            {t('qrModal.title')} <span className="truncate">{shop.shopName}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 sm:p-2 rounded hover:bg-blue-500 text-white transition duration-200"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg sm:text-xl" />
          </button>
        </nav>

        <div className="max-h-[75vh] sm:max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">

            {/* QR Image + Download */}
            {qrData.qrCode && (
              <div className="flex flex-col items-center">
                <img
                  src={qrData.qrCode}
                  alt="QR Code"
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 border-4 sm:border-6 md:border-8 border-gray-300 rounded shadow-xl"
                />
                <button
                  onClick={handleDownload}
                  className="mt-4 sm:mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded font-bold flex items-center justify-center gap-2 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm sm:text-base"
                >
                  <FontAwesomeIcon icon={faDownload} className="text-base sm:text-lg" />
                  {t('qrModal.downloadButton')}
                </button>
              </div>
            )}

            {/* Account Info */}
            <div className="bg-gray-50 p-4 sm:p-5 rounded text-gray-700 text-sm sm:text-base border border-gray-200 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-2 mb-3">
                <h3 className="text-base sm:text-lg font-bold text-blue-600">
                  {t('qrModal.accountDetails')}
                </h3>
                {/* <button
                  onClick={() => setShowEncouragement(!showEncouragement)}
                  className="text-blue-600 hover:text-blue-800 transition font-semibold flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="text-lg sm:text-xl" />
                  {showEncouragement ? t('qrModal.hideTip') : t('qrModal.showTip')}
                </button> */}
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <FontAwesomeIcon icon={faIdCard} className="text-blue-500 w-4 sm:w-5" />
                <span><span className="font-semibold text-gray-800">{t('qrModal.shopId')}:</span> {shop.shopId}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <FontAwesomeIcon icon={faStore} className="text-blue-500 w-4 sm:w-5" />
                <span><span className="font-semibold text-gray-800">{t('qrModal.shopName')}:</span> {shop.shopName}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <FontAwesomeIcon icon={faIdCard} className="text-blue-500 w-4 sm:w-5" />
                <span><span className="font-semibold text-gray-800">{t('qrModal.customerId')}:</span> {qrData.customerId}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 pt-3 border-t border-gray-200">
                <FontAwesomeIcon icon={faWallet} className="text-blue-500 text-lg sm:text-xl w-4 sm:w-5" />
                <span className="text-base sm:text-lg font-bold text-gray-800">
                  <span className="font-semibold">{t('qrModal.availablePoints')}:</span> {qrData.availablePoints} {t('qrModal.points')}
                </span>
              </div>
            </div>

            {/* Encouragement Message */}
            {/* <div className={`overflow-hidden transition-all duration-500 ${showEncouragement ? 'max-h-96 opacity-100 p-4' : 'max-h-0 opacity-0 p-0'} bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow-md`}>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded shadow-md p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                  <FontAwesomeIcon icon={faGift} className="text-yellow-600 text-2xl sm:text-3xl mt-0.5 animate-bounce flex-shrink-0" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-bold text-gray-800">
                      {t('qrModal.encouragement.title', { shopName: shop.shopName })}
                    </p>
                    <p
                      className="text-gray-600 mt-1"
                      dangerouslySetInnerHTML={{
                        __html: t('qrModal.encouragement.message', {
                          points: qrData.availablePoints,
                          shopName: shop.shopName,
                        }),
                      }}
                    />
                    <p className="text-blue-700 font-semibold mt-2">
                      {t('qrModal.encouragement.callToAction')}
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
}