import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QrScanner = ({ onClose }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [guidance, setGuidance] = useState("");

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    codeReader.current
      .listVideoInputDevices()
      .then((devices) => {
        if (!devices.length) {
          setError("No camera devices found.");
          setGuidance("Make sure your device has a working camera and permissions are granted.");
          return;
        }

        // Prefer back camera on mobile or default on desktop
        const preferredDevice = devices.find(device =>
          /back|rear/i.test(device.label)
        ) || devices[0];

        setGuidance("If prompted, please allow camera access. On mobile, use back camera for better scanning.");

        codeReader.current.decodeFromVideoDevice(
          preferredDevice.deviceId,
          videoRef.current,
          (result, err) => {
            if (result) {
              try {
                const parsed = JSON.parse(result.getText());
                setScannedData(parsed);
                codeReader.current.reset();
              } catch (e) {
                setError("Scanned QR is not valid JSON.");
              }
            }
            if (err && !(err.name === "NotFoundException")) {
              setError("Error during scanning.");
            }
          }
        );
      })
      .catch((err) => {
        console.error("Camera access error:", err);
        setError("Unable to access camera.");
        setGuidance(
          "Please ensure you’ve allowed camera access in your browser settings.\n\n" +
          "- On Desktop: Click the padlock icon in the address bar and enable camera.\n" +
          "- On Mobile: Enable camera for browser from settings or app permissions."
        );
      });

    return () => {
      if (codeReader.current) codeReader.current.reset();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-4 w-[350px] min-h-[360px] shadow-lg flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-2">Scan QR Code</h2>

        {!scannedData ? (
          <div className="w-[280px] h-[200px] border-4 border-blue-500 rounded overflow-hidden mb-2">
            <video ref={videoRef} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-full bg-green-50 border border-green-300 rounded p-4 text-sm mb-2">
            <p><strong>Name:</strong> {scannedData.name}</p>
            <p><strong>Email:</strong> {scannedData.email}</p>
            <p><strong>Phone:</strong> {scannedData.phone}</p>
            <p><strong>Referral:</strong> {scannedData.referralCode}</p>
            <p><strong>Customer ID:</strong> {scannedData.customerId}</p>
            <p><strong>Shop:</strong> {scannedData.shopName}</p>
            <p><strong>Balance:</strong> ₹{scannedData.availableBalance}</p>
          </div>
        )}

        {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
        {guidance && !scannedData && (
          <p className="text-xs text-gray-600 mt-2 text-center whitespace-pre-line">{guidance}</p>
        )}

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
