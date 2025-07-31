// import React, { useEffect, useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCheckCircle,
//   faExclamationCircle,
// } from "@fortawesome/free-solid-svg-icons";

// const QrScanner = ({ onClose }) => {
//   const videoRef = useRef(null);
//   const codeReader = useRef(null);
//   const hasScannedRef = useRef(false);

//   const [scannedData, setScannedData] = useState(null);
//   const [error, setError] = useState(null);
//   const [guidance, setGuidance] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successAnimation, setSuccessAnimation] = useState(false);
//   const [associated, setAssociated] = useState(true);
//   const [showErrorPopup, setShowErrorPopup] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   const playBeep = () => {
//     const context = new AudioContext();
//     const oscillator = context.createOscillator();
//     oscillator.type = "sine";
//     oscillator.frequency.setValueAtTime(1000, context.currentTime);
//     oscillator.connect(context.destination);
//     oscillator.start();
//     oscillator.stop(context.currentTime + 0.2);
//   };

//   const playErrorSound = () => {
//     const context = new AudioContext();
//     const oscillator = context.createOscillator();
//     oscillator.type = "sawtooth";
//     oscillator.frequency.setValueAtTime(400, context.currentTime);
//     oscillator.connect(context.destination);
//     oscillator.start();
//     oscillator.stop(context.currentTime + 0.4);
//   };

//   const validateShopMatch = (parsed) => {
//     const scannedShopId = parsed.shopId;
//     const loggedInShopId = localStorage.getItem("id");
//     return String(scannedShopId) === String(loggedInShopId);
//   };

//   const handleQrScan = async (parsed) => {
//     if (!validateShopMatch(parsed)) {
//       hasScannedRef.current = true;
//       setError("Invalid QR Code: This code does not belong to your shop.");
//       setScannedData(parsed);
//       setShowErrorPopup(true);
//       playErrorSound();
//       return;
//     }

//     setScannedData(parsed);
//     hasScannedRef.current = true;
//     playBeep();
//     navigator.vibrate?.(200);
//     setError(null);

//     try {
//       const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/decode", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(parsed),
//       });

//       const verified = await res.json();
//       if (!res.ok) throw new Error(verified.message || "Verification failed");

//       setScannedData((prev) => ({
//         ...prev,
//         verifiedBalance: verified.verifiedBalance ?? 0,
//       }));
//       setAssociated(verified.associated ?? true);
//     } catch (e) {
//       setError("Scanned QR is not valid or verification failed.");
//     }
//   };

//   useEffect(() => {
//     codeReader.current = new BrowserMultiFormatReader();
//     codeReader.current
//       .listVideoInputDevices()
//       .then((devices) => {
//         if (!devices.length) {
//           setError("No camera devices found.");
//           setGuidance("Ensure your device has camera permissions enabled.");
//           return;
//         }

//         const preferredDevice =
//           devices.find((device) => /back|rear/i.test(device.label)) || devices[0];

//         setGuidance("Allow camera access. Prefer rear camera for better scan.");

//         codeReader.current
//           .decodeFromVideoDevice(
//             preferredDevice.deviceId,
//             videoRef.current,
//             async (result, err) => {
//               if (result && !hasScannedRef.current) {
//                 try {
//                   const parsed = JSON.parse(result.getText());
//                   await handleQrScan(parsed);
//                 } catch (e) {
//                   setError("Invalid QR Code.");
//                 }
//               }
//             }
//           )
//           .catch((error) => {
//             setError("Camera failed to start. Please refresh or allow permissions.");
//           });
//       })
//       .catch(() => {
//         setError("Unable to access camera. Please enable permissions.");
//       });

//     return () => {
//       codeReader.current?.reset();
//     };
//   }, []);

//   const handleScanAgain = async () => {
//     setScannedData(null);
//     setError(null);
//     setSuccessAnimation(false);
//     hasScannedRef.current = false;
//     setAssociated(true);
//     setShowErrorPopup(false);

//     try {
//       const devices = await codeReader.current.listVideoInputDevices();
//       const preferredDevice =
//         devices.find((device) => /back|rear/i.test(device.label)) || devices[0];

//       codeReader.current.reset();

//       codeReader.current
//         .decodeFromVideoDevice(
//           preferredDevice.deviceId,
//           videoRef.current,
//           async (result, err) => {
//             if (result && !hasScannedRef.current) {
//               try {
//                 const parsed = JSON.parse(result.getText());
//                 await handleQrScan(parsed);
//               } catch (e) {
//                 setError("Invalid QR Code.");
//               }
//             }
//           }
//         )
//         .catch(() => {
//           setError("Unable to restart camera. Please refresh the page.");
//         });
//     } catch {
//       setError("Camera error. Please refresh.");
//     }
//   };

//   const handleSubmitBoth = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const pointsAmount = parseInt(e.target.amount.value);
//     const dollarAmount = parseFloat(e.target.dollar.value);

//     if (!pointsAmount || pointsAmount <= 0 || isNaN(dollarAmount) || dollarAmount <= 0) {
//       setError("Please enter valid points and dollar amount.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/add-points", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: scannedData.customerId,
//           shopId: scannedData.shopId,
//           pointsToAdd: pointsAmount,
//           dollarAmount: dollarAmount,
//         }),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         setScannedData((prev) => ({
//           ...prev,
//           verifiedBalance: result.newBalance,
//         }));
//         setSuccessAnimation(true);
//         setShowSuccessPopup(true);
//         setTimeout(() => setSuccessAnimation(false), 1000);
//         e.target.reset();
//       } else {
//         setError(result.message || "Submission failed.");
//       }
//     } catch {
//       setError("Something went wrong.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className=" inset-0 flex items-center justify-center  z-50">
//       <div className="relative w-full max-w-lg px-4">
//         {!showErrorPopup && (
//           <div className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl px-6 py-6 w-full min-h-[580px] flex flex-col items-center justify-center z-10">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Scan QR Code</h2>

//             {!scannedData ? (
//               <div className="relative w-[360px] h-[380px] border-4 border-dashed border-blue-500 rounded-2xl overflow-hidden mb-4 shadow-lg">
//                 <video ref={videoRef} className="w-full h-full object-cover" />
//               </div>
//             ) : (
//               <div className="w-full border border-gray-400 rounded-xl p-4 text-sm bg-white/80 shadow-sm mb-4">
//                 <p><strong>Customer ID:</strong> CUST-{scannedData.customerId}</p>
//                 <p><strong>Name:</strong> {scannedData.userName}</p>
//                 <p><strong>Email:</strong> {scannedData.email}</p>
//                 <p><strong>Phone:</strong> {scannedData.phone}</p>
//                 <p><strong>Shop Name:</strong> {scannedData.shopName}</p>
//                 <p className={`transition-all ${successAnimation ? "text-green-600 scale-110" : ""}`}>
//                   <strong>Available Points:</strong> {scannedData.verifiedBalance ?? scannedData.availableBalance ?? 0}
//                 </p>

//                 {associated && (
//                   <form onSubmit={handleSubmitBoth} className="mt-4 flex flex-col gap-3">
//                     <input
//                       type="number"
//                       name="amount"
//                       min="1"
//                       placeholder="Enter points"
//                       required
//                       className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
//                     />
//                     <div className="relative">
//                     <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-500 font-bold">$</span>
//                     <input
//                       type="number"
//                       name="dollar"
//                       min="1"
//                       placeholder="Enter purchase amount"
//                       required
//                       className="w-full px-8 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
//                     />
//                     </div>
//                     {error && <p className="text-red-500 text-sm">{error}</p>}
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 rounded-xl shadow-md transition duration-300"
//                     >
//                       {isSubmitting ? "Submitting..." : "Submit"}
//                     </button>
//                   </form>
//                 )}
//               </div>
//             )}

//             {guidance && !scannedData && (
//               <p className="text-xs text-gray-600 text-center">{guidance}</p>
//             )}

//             <div className="mt-4 flex gap-3">
//               {scannedData && (
//                 <button onClick={handleScanAgain} className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow">
//                   Scan Again
//                 </button>
//               )}
//               <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 shadow">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {showSuccessPopup && (
//           <div className="absolute inset-0 flex items-center justify-center z-50">
//             <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl text-center border border-green-400 w-[360px]">
//               <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-3xl mb-2" />
//               <h3 className="text-lg font-semibold text-green-600">Points & Dollars Added</h3>
//               <button onClick={() => setShowSuccessPopup(false)} className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl">
//                 OK
//               </button>
//             </div>
//           </div>
//         )}

//         {showErrorPopup && (
//           // <div className="absolute inset-0 flex items-center justify-center z-50">
//           <div className="px-6 py-6 w-full min-h-[580px] flex flex-col items-center justify-center z-10">
//             <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl text-center border border-red-400 w-[360px]">
//               <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600 text-3xl mb-2" />
//               <h3 className="text-lg font-semibold text-red-600">Invalid QR</h3>
//               <p className="text-sm mt-1">This QR doesn't belong to your shop.</p>
//               <button onClick={onClose} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QrScanner;













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

    const pointsAmount = parseInt(e.target.amount.value);
    const dollarAmount = parseFloat(e.target.dollar.value);

    if (!pointsAmount || pointsAmount <= 0 || isNaN(dollarAmount) || dollarAmount <= 0) {
      setError("Please enter valid points and dollar amount.");
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
          pointsToAdd: pointsAmount,
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
        {!showErrorPopup && (
          <div className="bg-white shadow-xl rounded-xl p-6 w-full min-h-[580px] flex flex-col items-center justify-between z-10 transition-all duration-200">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">Scan QR Code</h2>

            {!scannedData ? (
              <div className="relative w-full aspect-square max-w-[340px] border-2 border-dashed border-blue-500 rounded-xl overflow-hidden mb-6 shadow-md">
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
        )}

        {showSuccessPopup && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl text-center border border-blue-300 w-[340px]">
              <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 text-3xl mb-3" />
              <h3 className="text-lg font-semibold text-blue-600">Purchased Successfully</h3>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition duration-200"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {showErrorPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl text-center border border-red-300 w-[340px]">
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