import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QrScanner = ({ onClose }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const hasScannedRef = useRef(false);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [guidance, setGuidance] = useState("");

  // ✅ One-time beep on successful scan
  const playBeep = () => {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, context.currentTime);
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
  };

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

        const preferredDevice =
          devices.find((device) => /back|rear/i.test(device.label)) || devices[0];

        setGuidance("Allow camera access. Prefer rear camera on mobile for better scanning.");

        codeReader.current.decodeFromVideoDevice(
          preferredDevice.deviceId,
          videoRef.current,
          (result, err) => {
            if (result && !hasScannedRef.current) {
              try {
                const parsed = JSON.parse(result.getText());
                setScannedData(parsed);
                hasScannedRef.current = true;
                playBeep();
                navigator.vibrate?.(200);
                setError(null);
              } catch (e) {
                setError("Scanned QR is not valid JSON.");
              }
            }

            // ✅ Ignore common scan-time errors that aren't critical
            const ignoredErrors = ["NotFoundException", "ChecksumException", "FormatException"];
            if (
              err &&
              !hasScannedRef.current &&
              !ignoredErrors.includes(err?.name)
            ) {
              console.warn("Scan error (non-critical):", err.name);
              setError(null); // suppress visible error
            }
          }
        );
      })
      .catch((err) => {
        console.error("Camera access error:", err);
        setError("Unable to access camera.");
        setGuidance(
          "Please enable camera permissions:\n- Desktop: Click padlock in address bar.\n- Mobile: Check app permissions."
        );
      });

    return () => {
      codeReader.current?.reset();
    };
  }, []);

  // ✅ Manual scan reset
  const handleScanAgain = async () => {
  setScannedData(null);
  setError(null);
  hasScannedRef.current = false;

  try {
    const devices = await codeReader.current.listVideoInputDevices();
    const preferredDevice =
      devices.find((device) => /back|rear/i.test(device.label)) || devices[0];

    codeReader.current.reset(); // Stop the current scan session

    // Restart scanning
    codeReader.current.decodeFromVideoDevice(
      preferredDevice.deviceId,
      videoRef.current,
      (result, err) => {
        if (result && !hasScannedRef.current) {
          try {
            const parsed = JSON.parse(result.getText());
            setScannedData(parsed);
            hasScannedRef.current = true;
            playBeep();
            navigator.vibrate?.(200);
            setError(null);
          } catch (e) {
            setError("Scanned QR is not valid JSON.");
          }
        }

        const ignoredErrors = ["NotFoundException", "ChecksumException", "FormatException"];
        if (
          err &&
          !hasScannedRef.current &&
          !ignoredErrors.includes(err?.name)
        ) {
          console.warn("Scan error (non-critical):", err.name);
          setError(null);
        }
      }
    );
  } catch (e) {
    console.error("Error restarting scanner:", e);
    setError("Unable to restart camera. Please refresh the page.");
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-4 w-[350px] min-h-[360px] shadow-lg flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-2">Scan QR Code</h2>

        {!scannedData ? (
          <div className="relative w-[280px] h-[200px] border-4 border-blue-500 rounded overflow-hidden mb-2">
            <video ref={videoRef} className="w-full h-full object-cover" />
            {/* ✅ Visual scan guide box */}
            <div className="absolute border-2 border-green-500 rounded w-40 h-32 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
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

        {guidance && !scannedData && (
          <p className="text-xs text-gray-600 mt-2 text-center whitespace-pre-line">{guidance}</p>
        )}

        <div className="mt-4 flex gap-3">
          {scannedData && (
            <button
              onClick={handleScanAgain}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Scan Again
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrScanner;
