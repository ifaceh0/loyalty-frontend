// import React, { useEffect, useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";

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
//       console.error("Scan/Decode error:", e.message);
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
//           setGuidance("Make sure your device has a working camera and permissions are granted.");
//           return;
//         }

//         const preferredDevice =
//           devices.find((device) => /back|rear/i.test(device.label)) || devices[0];

//         setGuidance("Allow camera access. Prefer rear camera on mobile for better scanning.");

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
//                   console.error("Invalid QR data:", e.message);
//                 }
//               }

//               const ignoredErrors = ["NotFoundException", "ChecksumException", "FormatException"];
//               if (err && !hasScannedRef.current && !ignoredErrors.includes(err?.name)) {
//                 console.warn("Scan error (non-critical):", err.name);
//                 setError(null);
//               }
//             }
//           )
//           .catch((error) => {
//             console.error("Camera startup failed:", error);
//             setError("Camera failed to start. Please refresh the page or try another device.");
//             setGuidance("Ensure camera permissions are enabled and no other app is using the camera.");
//           });
//       })
//       .catch((err) => {
//         console.error("Camera access error:", err);
//         setError("Unable to access camera.");
//         setGuidance("Please enable camera permissions.");
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
//                 console.error("Invalid QR data:", e.message);
//               }
//             }
//           }
//         )
//         .catch((e) => {
//           console.error("Error restarting scanner:", e);
//           setError("Unable to restart camera. Please refresh the page.");
//         });
//     } catch (e) {
//       console.error("Error listing devices:", e);
//       setError("Camera error. Please refresh or check permissions.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       {/* Main Scanner UI */}
//       {!showErrorPopup && (
//         <div className="bg-white rounded-lg p-4 w-[450px] min-h-[560px] shadow-lg flex flex-col items-center justify-center">
//           <h2 className="text-lg font-semibold mb-2">Scan QR Code</h2>

//           {!scannedData ? (
//             <div className="relative w-[380px] h-[400px] border-4 border-blue-500 rounded overflow-hidden mb-2">
//               <video ref={videoRef} className="w-full h-full object-cover" />
//               <div className="absolute border-2 border-green-500 rounded w-60 h-56 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
//             </div>
//           ) : (
//             <div className="w-full border border-green-300 min-h-[380px] rounded p-4 text-sm mb-4">
//               <p><strong>Name:</strong> {scannedData.userName}</p><br />
//               <p><strong>Email:</strong> {scannedData.email}</p><br />
//               <p><strong>Phone:</strong> {scannedData.phone}</p><br />
//               <p><strong>Customer ID:</strong> {scannedData.customerId}</p><br />
//               <p><strong>Shop:</strong> {scannedData.shopName}</p><br />
//               <p className={`transition-all font-bold ${successAnimation ? "text-green-600 scale-110" : ""}`}>
//                 Balance: ₹{scannedData.verifiedBalance ?? scannedData.availableBalance ?? 0}
//               </p><br />

//               {associated && (
//                 <form
//                   onSubmit={async (e) => {
//                     e.preventDefault();
//                     setError(null);
//                     const amount = parseInt(e.target.amount.value);
//                     if (!amount || amount <= 0) {
//                       setError("Please enter a valid amount greater than 0.");
//                       return;
//                     }

//                     setIsSubmitting(true);
//                     try {
//                       const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/add-points", {
//                         method: "POST",
//                         headers: {
//                           "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify({
//                           userId: scannedData.customerId,
//                           shopId: scannedData.shopId,
//                           pointsToAdd: amount,
//                         }),
//                       });

//                       const result = await res.json();

//                       if (res.ok) {
//                         setScannedData((prev) => ({
//                           ...prev,
//                           verifiedBalance: result.newBalance,
//                         }));
//                         setSuccessAnimation(true);
//                         setTimeout(() => setSuccessAnimation(false), 1000);
//                         e.target.reset();
//                       } else {
//                         setError(result.message || "Failed to add points");
//                       }
//                     } catch (err) {
//                       setError("Something went wrong.");
//                     } finally {
//                       setIsSubmitting(false);
//                     }
//                   }}
//                   className="mt-4 flex flex-col gap-2"
//                 >
//                   <input
//                     type="number"
//                     name="amount"
//                     min="1"
//                     placeholder="Enter points"
//                     required
//                     className="w-full px-3 py-2 border rounded"
//                   />
//                   {error && <p className="text-red-500 text-sm">{error}</p>}
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className={`bg-green-600 text-white py-2 rounded hover:bg-green-700 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
//                   >
//                     {isSubmitting ? "Adding..." : "Add Points"}
//                   </button>
//                 </form>
//               )}
//             </div>
//           )}

//           {guidance && !scannedData && (
//             <p className="text-xs text-gray-600 mt-2 text-center whitespace-pre-line">{guidance}</p>
//           )}

//           <div className="mt-4 flex gap-3">
//             {scannedData && (
//               <button onClick={handleScanAgain} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                 Scan Again
//               </button>
//             )}
//             <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Error Popup Modal */}
//       {showErrorPopup && (
//         <div className="bg-white rounded-lg shadow-2xl p-6 w-[380px] flex flex-col items-center justify-center border border-red-300 animate-fade-in">
//           <h3 className="text-xl font-semibold text-red-600 mb-4">Invalid QR Code</h3>
//           <p className="text-center text-gray-700 mb-6">
//             This code does not belong to your shop.
//           </p>
//           <button
//             onClick={onClose}
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
//           >
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QrScanner;








import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

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
      console.error("Scan/Decode error:", e.message);
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
          setGuidance("Make sure your device has a working camera and permissions are granted.");
          return;
        }

        const preferredDevice =
          devices.find((device) => /back|rear/i.test(device.label)) || devices[0];

        setGuidance("Allow camera access. Prefer rear camera on mobile for better scanning.");

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
                  console.error("Invalid QR data:", e.message);
                }
              }

              const ignoredErrors = ["NotFoundException", "ChecksumException", "FormatException"];
              if (err && !hasScannedRef.current && !ignoredErrors.includes(err?.name)) {
                console.warn("Scan error (non-critical):", err.name);
                setError(null);
              }
            }
          )
          .catch((error) => {
            console.error("Camera startup failed:", error);
            setError("Camera failed to start. Please refresh the page or try another device.");
            setGuidance("Ensure camera permissions are enabled and no other app is using the camera.");
          });
      })
      .catch((err) => {
        console.error("Camera access error:", err);
        setError("Unable to access camera.");
        setGuidance("Please enable camera permissions.");
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
                console.error("Invalid QR data:", e.message);
              }
            }
          }
        )
        .catch((e) => {
          console.error("Error restarting scanner:", e);
          setError("Unable to restart camera. Please refresh the page.");
        });
    } catch (e) {
      console.error("Error listing devices:", e);
      setError("Camera error. Please refresh or check permissions.");
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
      // 1. Send points to /add-points
      const pointsRes = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/add-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: scannedData.customerId,
          shopId: scannedData.shopId,
          pointsToAdd: pointsAmount,
        }),
      });

      const pointsResult = await pointsRes.json();

      // 2. Send dollars to /api/qrcode/add-dollars
      const dollarRes = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/add-dollars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: scannedData.customerId,
          shopId: scannedData.shopId,
          transactionAmount: dollarAmount,
        }),
      });

      const dollarResult = await dollarRes.json();

      if (pointsRes.ok && dollarRes.ok) {
        setScannedData((prev) => ({
          ...prev,
          verifiedBalance: pointsResult.newBalance,
        }));
        setSuccessAnimation(true);
        setShowSuccessPopup(true); // ✅ Show success popup
        setTimeout(() => setSuccessAnimation(false), 1000);
        e.target.reset();
      } else {
        setError(pointsResult.message || dollarResult.message || "Submission failed.");
      }
    } catch (err) {
      setError("Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      {/* Relative container for overlap */}
      <div className="relative">
        {/* Main Scanner UI */}
        {!showErrorPopup && (
          <div className="bg-white rounded-lg p-4 w-[450px] min-h-[580px] shadow-lg flex flex-col items-center justify-center relative z-10">
            <h2 className="text-lg font-semibold mb-2">Scan QR Code</h2>

            {!scannedData ? (
              <div className="relative w-[380px] h-[400px] border-4 border-blue-500 rounded overflow-hidden mb-2">
                <video ref={videoRef} className="w-full h-full object-cover" />
                <div className="absolute border-2 border-green-500 rounded w-60 h-56 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            ) : (
              <div className="w-full border border-gray-500 min-h-[380px] rounded p-4 text-sm mb-2">
                <p><strong>Customer ID :</strong> CUST-{scannedData.customerId}</p><br />
                <p><strong>Name :</strong> {scannedData.userName}</p><br />
                <p><strong>Email :</strong> {scannedData.email}</p><br />
                <p><strong>Phone Number :</strong> {scannedData.phone}</p><br />
                <p><strong>Shop Name :</strong> {scannedData.shopName}</p><br />
                <p className={`transition-all ${successAnimation ? "text-green-600 scale-110" : ""}`}>
                  <strong>Available Points : </strong> {scannedData.verifiedBalance ?? scannedData.availableBalance ?? 0}
                </p><br />

                {associated && (
                  <form onSubmit={handleSubmitBoth} className="mt-4 flex flex-col gap-2">
                    <input
                      type="number"
                      name="amount"
                      min="1"
                      placeholder="Enter points"
                      required
                      className="w-full px-3 py-2 border border-gray-500 rounded"
                    />
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-500 font-bold">$</span>
                      <input
                        type="number"
                        name="dollar"
                        min="1"
                        placeholder="Enter the purchase amount"
                        required
                        className="w-full pl-8 pr-3 py-2 border border-gray-500 rounded"
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-purple-500 text-white py-2 rounded hover:bg-purple-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                )}
              </div>
            )}

            {guidance && !scannedData && (
              <p className="text-xs text-gray-600 mt-2 text-center whitespace-pre-line">{guidance}</p>
            )}

            <div className="mt-4 flex gap-3">
              {scannedData && (
                <button onClick={handleScanAgain} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Scan Again
                </button>
              )}
              <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Close
              </button>
            </div>
          </div>
        )}

        {/* Success Popup (overlapping) */}
        {showSuccessPopup && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-[380px] flex flex-col items-center justify-center border border-green-300 animate-fade-in">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Success</h3>
              <p className="text-center text-gray-700 mb-6">
                Points and purchase amount added successfully!
              </p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="bg-white rounded-lg shadow-2xl p-6 w-[380px] flex flex-col items-center justify-center border border-red-300 animate-fade-in z-50">
          <h3 className="text-xl font-semibold text-red-600 mb-4">Invalid QR Code</h3>
          <p className="text-center text-gray-700 mb-6">
            This code does not belong to your shop.
          </p>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default QrScanner;