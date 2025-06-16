import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QrScanner = ({ onClose }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    codeReader.current
      .listVideoInputDevices()
      .then((devices) => {
        const selectedDeviceId = devices[0]?.deviceId;
        if (selectedDeviceId) {
          codeReader.current.decodeFromVideoDevice(
            selectedDeviceId,
            videoRef.current,
            (result, err) => {
              if (result) {
                try {
                  const parsed = JSON.parse(result.getText());
                  setScannedData(parsed); // display the popup with result
                  codeReader.current.reset(); // stop camera after scan
                } catch (e) {
                  setError("Scanned data is not valid JSON");
                }
              }
              if (err && !(err.name === "NotFoundException")) {
                setError("Error while scanning");
              }
            }
          );
        } else {
          setError("No camera found");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Could not access camera");
      });

    return () => {
      if (codeReader.current) codeReader.current.reset();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-4 w-[350px] min-h-[320px] shadow-lg flex flex-col items-center justify-center">

        <h2 className="text-lg font-semibold mb-3">Scan QR Code</h2>

        {!scannedData ? (
          <div className="w-[280px] h-[200px] border-4 border-blue-500 rounded overflow-hidden mb-4">
            <video ref={videoRef} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-full bg-green-50 border border-green-300 rounded p-4 text-sm">
            <p><strong>Name:</strong> {scannedData.name}</p>
            <p><strong>Email:</strong> {scannedData.email}</p>
            <p><strong>Phone:</strong> {scannedData.phone}</p>
            <p><strong>Referral:</strong> {scannedData.referralCode}</p>
            <p><strong>Customer ID:</strong> {scannedData.customerId}</p>
            <p><strong>Shop:</strong> {scannedData.shopName}</p>
            <p><strong>Balance:</strong> ₹{scannedData.availableBalance}</p>
          </div>
        )}

        {error && <p className="text-red-600 mt-2">{error}</p>}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QrScanner;
