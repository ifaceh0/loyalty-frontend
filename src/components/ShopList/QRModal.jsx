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

export default function QRModal({ shop, qrData, isOpen, onClose }) {
  if (!isOpen || !shop || !qrData) return null;

  const [showEncouragement, setShowEncouragement] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrData.qrCode;
    link.download = `${shop.shopName}_QRCode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-60 backdrop-blur-md px-4 py-12 overflow-y-auto">
      <div className="bg-white w-full max-w-md shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 my-auto max-h-full">
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-extrabold flex items-center gap-3">
            <FontAwesomeIcon icon={faQrcode} className="text-white text-2xl" />
            QR Code for <span className="truncate">{shop.shopName}</span>
          </h2>
          <button
            className="p-1 rounded-full hover:bg-blue-700 text-white transition duration-200"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </nav>
        
        <div className="max-h-[75vh] overflow-y-auto">
            
            <div className="p-6 space-y-6">
                
                {/* QR Code Section */}
                {qrData.qrCode && (
                    <div className="flex flex-col items-center">
                    <img
                        src={qrData.qrCode}
                        alt="QR Code"
                        className="w-56 h-56 border-8 border-gray-100 rounded-lg shadow-xl"
                    />
                    <button
                        onClick={handleDownload}
                        className="mt-6 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                        <FontAwesomeIcon icon={faDownload} className="text-lg" />
                        Download Loyalty QR Code
                    </button>
                    </div>
                )}

                {/* Information Block */}
                <div className="bg-gray-50 p-5 rounded-xl text-gray-700 text-base border border-gray-200 space-y-3">
                    
                    {/* Header with Info Toggle Button */}
                    <div className="flex justify-between items-center border-b pb-2 mb-3">
                        <h3 className="text-lg font-bold text-indigo-600">
                            Account Details
                        </h3>
                        <button
                            onClick={() => setShowEncouragement(!showEncouragement)}
                            className="text-indigo-600 hover:text-indigo-800 transition duration-200 font-semibold flex items-center gap-2 text-sm focus:outline-none"
                            aria-expanded={showEncouragement}
                            aria-controls="encouragement-message"
                        >
                            <FontAwesomeIcon icon={faInfoCircle} className="text-xl" />
                            {showEncouragement ? 'Hide Tip' : 'Show Tip'}
                        </button>
                    </div>
                    
                    {/* Account Details Content */}
                    <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faIdCard} className="text-indigo-500 w-5" />
                    <span><span className="font-semibold text-gray-800">Shop ID:</span> {shop.shopId}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faStore} className="text-indigo-500 w-5" />
                    <span><span className="font-semibold text-gray-800">Shop Name:</span> {shop.shopName}</span>
                    </div> 
                    
                    <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faIdCard} className="text-indigo-500 w-5" />
                    <span><span className="font-semibold text-gray-800">Customer ID:</span> {qrData.customerId}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                    <FontAwesomeIcon icon={faWallet} className="text-green-600 text-xl w-5" />
                    <span className="text-lg font-bold text-green-600">
                        <span className="font-semibold">Available Points:</span> {qrData.availablePoints} Points 💰
                    </span>
                    </div>
                </div>
                
                <div 
                    id="encouragement-message"
                    className={`
                        ${showEncouragement ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                        overflow-hidden transition-all duration-500 ease-in-out
                        bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow-md
                    `}
                >
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow-md">
                      <div className="flex items-start gap-3">
                        <FontAwesomeIcon icon={faGift} className="text-yellow-600 text-3xl mt-1 animate-bounce" />
                        <div>
                          <p className="text-xl font-bold text-gray-800">
                            Unlock Exciting Rewards at {shop.shopName}!
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            You're already at **{qrData.availablePoints} points**! 🎉 Shop at **{shop.shopName}** today, make a purchase, and scan this QR code to earn even more points. Don't miss out on exclusive rewards waiting just for you!
                          </p>
                          <p className="text-sm text-blue-700 font-semibold mt-2">
                            Visit now and turn your purchases into amazing perks!
                          </p>
                        </div>
                      </div>
                    </div>
                </div>
                
            </div>
        </div>
      </div>
    </div>
  );
}