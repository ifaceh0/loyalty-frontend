import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const QrScanner = ({ onClose }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const hasScannedRef = useRef(false);

  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [guidance, setGuidance] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [associated, setAssociated] = useState(true);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const playBeep = () => {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, context.currentTime);
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
  };

  const playErrorSound = () => {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(400, context.currentTime);
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.4);
  };

  const validateShopMatch = (parsed) => {
    const scannedShopId = parsed.shopId;
    const loggedInShopId = localStorage.getItem("id");
    return String(scannedShopId) === String(loggedInShopId);
  };

  const handleQrScan = async (parsed) => {
    if (!validateShopMatch(parsed)) {
      hasScannedRef.current = true;
      setError("Invalid QR Code: This code does not belong to your shop.");
      setScannedData(parsed);
      setShowErrorPopup(true);
      playErrorSound();
      return;
    }

    setScannedData(parsed);
    hasScannedRef.current = true;
    playBeep();
    navigator.vibrate?.(200);
    setError(null);

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/decode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed),
      });

      const verified = await res.json();
      if (!res.ok) throw new Error(verified.message || "Verification failed");

      setScannedData((prev) => ({
        ...prev,
        verifiedBalance: verified.verifiedBalance ?? 0,
      }));
      setAssociated(verified.associated ?? true);
    } catch (e) {
      setError("Scanned QR is not valid or verification failed.");
    }
  };

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();
    codeReader.current
      .listVideoInputDevices()
      .then((devices) => {
        if (!devices.length) {
          setError("No camera devices found.");
          setGuidance("Ensure your device has camera permissions enabled.");
          return;
        }

        const preferredDevice =
          devices.find((device) => /back|rear/i.test(device.label)) || devices[0];

        setGuidance("Allow camera access. Prefer rear camera for better scan.");

        codeReader.current
          .decodeFromVideoDevice(
            preferredDevice.deviceId,
            videoRef.current,
            async (result, err) => {
              if (result && !hasScannedRef.current) {
                try {
                  const parsed = JSON.parse(result.getText());
                  await handleQrScan(parsed);
                } catch (e) {
                  setError("Invalid QR Code.");
                }
              }
            }
          )
          .catch((error) => {
            setError("Camera failed to start. Please refresh or allow permissions.");
          });
      })
      .catch(() => {
        setError("Unable to access camera. Please enable permissions.");
      });

    return () => {
      codeReader.current?.reset();
    };
  }, []);

  const handleScanAgain = async () => {
    setScannedData(null);
    setError(null);
    setSuccessAnimation(false);
    hasScannedRef.current = false;
    setAssociated(true);
    setShowErrorPopup(false);

    try {
      const devices = await codeReader.current.listVideoInputDevices();
      const preferredDevice =
        devices.find((device) => /back|rear/i.test(device.label)) || devices[0];

      codeReader.current.reset();

      codeReader.current
        .decodeFromVideoDevice(
          preferredDevice.deviceId,
          videoRef.current,
          async (result, err) => {
            if (result && !hasScannedRef.current) {
              try {
                const parsed = JSON.parse(result.getText());
                await handleQrScan(parsed);
              } catch (e) {
                setError("Invalid QR Code.");
              }
            }
          }
        )
        .catch(() => {
          setError("Unable to restart camera. Please refresh the page.");
        });
    } catch {
      setError("Camera error. Please refresh.");
    }
  };

  const handleSubmitBoth = async (e) => {
    e.preventDefault();
    setError(null);

    // const pointsAmount = parseInt(e.target.amount.value);
    const dollarAmount = parseFloat(e.target.dollar.value);

    // if (!pointsAmount || pointsAmount <= 0 || isNaN(dollarAmount) || dollarAmount <= 0) {
    //   setError("Please enter valid points and dollar amount.");
    //   return;
    // }
    if (isNaN(dollarAmount) || dollarAmount <= 0) {
      setError("Please enter valid dollar amount.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/add-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: scannedData.customerId,
          shopId: scannedData.shopId,
          // pointsToAdd: pointsAmount,
          dollarAmount: dollarAmount,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setScannedData((prev) => ({
          ...prev,
          verifiedBalance: result.newBalance,
        }));
        setSuccessAnimation(true);
        setShowSuccessPopup(true);
        setTimeout(() => setSuccessAnimation(false), 1000);
        e.target.reset();
      } else {
        setError(result.message || "Submission failed.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="inset-0 flex items-center justify-center bg-gray-100/70 z-50">
      <div className="relative w-full max-w-md px-4">
        {/* {!showErrorPopup && (
          <div className="bg-white shadow-xl rounded-xl p-6 w-full min-h-[580px] flex flex-col items-center justify-between z-10 transition-all duration-200">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">Scan QR Code</h2>

            {!scannedData ? (
              <div className="relative w-full aspect-square max-w-[340px] border-2 border-dashed border-purple-500 rounded-xl overflow-hidden mb-6 shadow-md">
                <video ref={videoRef} className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-blue-200/50 rounded-xl pointer-events-none" />
              </div>
            ) : (
              <div className="w-full bg-gray-50 border border-blue-500 rounded-xl p-4 text-sm text-gray-700 shadow-sm mb-6">
                <p className="mb-4"><strong className="text-blue-600">Customer ID :</strong> CUST-{scannedData.customerId}</p>
                <p className="mb-4"><strong className="text-blue-600">Customer Name :</strong> {scannedData.userName}</p>
                <p className="mb-4"><strong className="text-blue-600">Customer Email :</strong> {scannedData.email}</p>
                <p className="mb-4"><strong className="text-blue-600">Customer Phone :</strong> {scannedData.phone}</p>
                <p className="mb-4"><strong className="text-blue-600">Shop Name :</strong> {scannedData.shopName}</p>
                <p className={`transition-all duration-200 ${successAnimation ? "text-orange-500 scale-105" : ""}`}>
                  <strong className="text-blue-600">Available Points :</strong> {scannedData.verifiedBalance ?? scannedData.availableBalance ?? 0}
                </p>

                {associated && (
                  <form onSubmit={handleSubmitBoth} className="mt-4 flex flex-col gap-3">
                    <input
                      type="number"
                      name="amount"
                      min="1"
                      placeholder="Enter points"
                      required
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-150"
                    />
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                      <input
                        type="number"
                        name="dollar"
                        min="1"
                        placeholder="Enter purchase amount"
                        required
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-150"
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white font-semibold py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-60"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                )}
              </div>
            )}

            {guidance && !scannedData && (
              <p className="text-sm text-gray-500 text-center">{guidance}</p>
            )}

            <div className="mt-4 flex gap-3">
              {scannedData && (
                <button
                  onClick={handleScanAgain}
                  className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm transition duration-200"
                >
                  Scan Again
                </button>
              )}
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 shadow-sm transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )} */}
        {!showErrorPopup && (
          <div className="bg-white shadow-xl rounded-xl w-full min-h-[580px] flex flex-col z-10 transition-all duration-200">
            <nav className="bg-purple-700 text-white px-4 py-2 rounded-t-xl flex justify-between items-center mb-10">
              <h2 className="text-2xl font-semibold">Scan QR Code</h2>
              <button
                onClick={onClose}
                className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                {/* <span>Close</span> */}
              </button>
            </nav>

            <div className="p-6 flex flex-col items-center justify-between flex-1">
              {!scannedData ? (
                <div className="relative w-full aspect-square max-w-[340px] border-2 border-dashed border-purple-500 rounded-xl overflow-hidden mb-6 shadow-md">
                  <video ref={videoRef} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 border-purple-200/50 rounded-xl pointer-events-none" />
                </div>
              ) : (
                <div className="w-full bg-gray-50 border border-purple-500 rounded-xl p-4 text-sm text-gray-700 shadow-sm mb-6">
                  <p className="mb-4"><strong className="text-purple-600">Customer ID :</strong> CUST-{scannedData.customerId}</p>
                  <p className="mb-4"><strong className="text-purple-600">Customer Name :</strong> {scannedData.userName}</p>
                  <p className="mb-4"><strong className="text-purple-600">Customer Email :</strong> {scannedData.email}</p>
                  <p className="mb-4"><strong className="text-purple-600">Customer Phone :</strong> {scannedData.phone}</p>
                  <p className="mb-4"><strong className="text-purple-600">Shop Name :</strong> {scannedData.shopName}</p>
                  <p className={`transition-all duration-200 ${successAnimation ? "text-orange-500 scale-105" : ""}`}>
                    <strong className="text-purple-600">Available Points :</strong> {scannedData.verifiedBalance ?? scannedData.availableBalance ?? 0}
                  </p>

                  {associated && (
                    <form onSubmit={handleSubmitBoth} className="mt-4 flex flex-col gap-3">
                      {/* <input
                        type="number"
                        name="amount"
                        min="1"
                        placeholder="Enter points"
                        required
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-150"
                      /> */}
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                        <input
                          type="number"
                          name="dollar"
                          min="1"
                          placeholder="Enter purchase amount"
                          required
                          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-150"
                        />
                      </div>
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-60"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {guidance && !scannedData && (
                <p className="text-sm text-gray-500 text-center">{guidance}</p>
              )}

              {scannedData && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleScanAgain}
                    className="px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow-sm transition duration-200"
                  >
                    Scan Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {showSuccessPopup && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
              <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 text-3xl mb-3" />
              <h3 className="text-lg font-semibold text-blue-600">Purchased Successfully</h3>
              <button
                // onClick={() => setShowSuccessPopup(false)}
                onClick={onClose}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showErrorPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 text-3xl mb-3" />
              <h3 className="text-lg font-semibold text-red-600">Invalid QR</h3>
              <p className="text-sm text-gray-600 mt-1">This QR doesn't belong to your shop !</p>
              <button
                onClick={onClose}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrScanner;