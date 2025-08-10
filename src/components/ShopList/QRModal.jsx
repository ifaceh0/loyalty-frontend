import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faStore,
  faIdCard,
  faWallet,
  faQrcode,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';

export default function QRModal({ shop, qrData, isOpen, onClose }) {
  if (!isOpen || !shop || !qrData) return null;

  // Download function
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrData.qrCode;
    link.download = `${shop.shopName}_QRCode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md shadow-xl overflow-hidden">
        <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FontAwesomeIcon icon={faQrcode} className="text-white" />
            QR Code for {shop.shopName}
          </h2>
          <button
            className="text-white hover:text-red-300 transition duration-200 flex items-center gap-2"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </nav>

        <div className="p-6 space-y-6">
          {qrData.qrCode && (
            <div className="flex flex-col items-center">
              <img
                src={qrData.qrCode}
                alt="QR Code"
                className="w-58 h-58 border-4 border-blue-100 rounded-lg shadow-md"
              />
              <button
                onClick={handleDownload}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition duration-200 shadow-sm"
              >
                <FontAwesomeIcon icon={faDownload} />
                Download QR
              </button>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg text-gray-800 text-sm shadow-inner space-y-3">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faIdCard} className="text-blue-600" />
              <span><span className="font-semibold">Shop ID:</span> {shop.shopId}</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faStore} className="text-blue-600" />
              <span><span className="font-semibold">Shop Name:</span> {shop.shopName}</span>
            </div> 
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faIdCard} className="text-blue-600" />
              <span><span className="font-semibold">Customer ID:</span> {qrData.customerId}</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faWallet} className="text-blue-600" />
              <span><span className="font-semibold">Available Points:</span> {qrData.availablePoints} Points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}