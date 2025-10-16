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
//     <div className="inset-0 flex items-center justify-center bg-gray-100/70 z-50">
//       <div className="relative w-full max-w-md px-4">
//         {!showErrorPopup && (
//           <div className="bg-white shadow-xl rounded-xl w-full min-h-[580px] flex flex-col z-10 transition-all duration-200">
//             <nav className="bg-purple-700 text-white px-4 py-2 rounded-t-xl flex justify-between items-center mb-10">
//               <h2 className="text-2xl font-semibold">Scan QR Code</h2>
//               <button
//                 onClick={onClose}
//                 className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                 </svg>
//                 {/* <span>Close</span> */}
//               </button>
//             </nav>

//             <div className="p-6 flex flex-col items-center justify-between flex-1">
//               {!scannedData ? (
//                 <div className="relative w-full aspect-square max-w-[340px] border-2 border-dashed border-purple-500 rounded-xl overflow-hidden mb-6 shadow-md">
//                   <video ref={videoRef} className="w-full h-full object-cover" />
//                   <div className="absolute inset-0 border-purple-200/50 rounded-xl pointer-events-none" />
//                 </div>
//               ) : (
//                 <div className="w-full bg-gray-50 border border-purple-500 rounded-xl p-4 text-sm text-gray-700 shadow-sm mb-6">
//                   <p className="mb-4"><strong className="text-purple-600">Customer ID :</strong> CUST-{scannedData.customerId}</p>
//                   <p className="mb-4"><strong className="text-purple-600">Customer Name :</strong> {scannedData.userName}</p>
//                   <p className="mb-4"><strong className="text-purple-600">Customer Email :</strong> {scannedData.email}</p>
//                   <p className="mb-4"><strong className="text-purple-600">Customer Phone :</strong> {scannedData.phone}</p>
//                   <p className="mb-4"><strong className="text-purple-600">Shop Name :</strong> {scannedData.shopName}</p>
//                   <p className={`transition-all duration-200 ${successAnimation ? "text-orange-500 scale-105" : ""}`}>
//                     <strong className="text-purple-600">Available Points :</strong> {scannedData.verifiedBalance ?? scannedData.availableBalance ?? 0}
//                   </p>

//                   {associated && (
//                     <form onSubmit={handleSubmitBoth} className="mt-4 flex flex-col gap-3">
//                       {/* <input
//                         type="number"
//                         name="amount"
//                         min="1"
//                         placeholder="Enter points"
//                         required
//                         className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-150"
//                       /> */}
//                       <div className="relative">
//                         <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
//                         <input
//                           type="number"
//                           name="dollar"
//                           min="1"
//                           placeholder="Enter purchase amount"
//                           required
//                           className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-150"
//                         />
//                       </div>
//                       {error && <p className="text-red-500 text-sm">{error}</p>}
//                       <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white font-semibold py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-60"
//                       >
//                         {isSubmitting ? "Submitting..." : "Submit"}
//                       </button>
//                     </form>
//                   )}
//                 </div>
//               )}

//               {guidance && !scannedData && (
//                 <p className="text-sm text-gray-500 text-center">{guidance}</p>
//               )}

//               {scannedData && (
//                 <div className="mt-4 flex gap-3">
//                   <button
//                     onClick={handleScanAgain}
//                     className="px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow-sm transition duration-200"
//                   >
//                     Scan Again
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {showSuccessPopup && (
//           <div className="absolute inset-0 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-xl text-center border border-blue-300 w-[340px]">
//               <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 text-3xl mb-3" />
//               <h3 className="text-lg font-semibold text-blue-600">Purchased Successfully</h3>
//               <button
//                 onClick={() => setShowSuccessPopup(false)}
//                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition duration-200"
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         )}

//         {showErrorPopup && (
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-xl text-center border border-red-300 w-[340px]">
//               <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 text-3xl mb-3" />
//               <h3 className="text-lg font-semibold text-red-600">Invalid QR</h3>
//               <p className="text-sm text-gray-600 mt-1">This QR doesn't belong to your shop !</p>
//               <button
//                 onClick={onClose}
//                 className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition duration-200"
//               >
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

















// import React, { useEffect, useRef, useState } from "react";
// import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
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
//   const [successTitle, setSuccessTitle] = useState("Purchased Successfully");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [successIconColor, setSuccessIconColor] = useState("blue-500");
//   const [showClaimPopup, setShowClaimPopup] = useState(false);
//   const [showConfirmClaim, setShowConfirmClaim] = useState(false);
//   const [isClaiming, setIsClaiming] = useState(false);
//   const [eligibleReward, setEligibleReward] = useState(0);
//   const [purchaseAmount, setPurchaseAmount] = useState("");
//   const [transactionId, setTransactionId] = useState(null);
//   const [claimedUsers, setClaimedUsers] = useState(() => {
//     const saved = localStorage.getItem("claimedUsers");
//     const parsedSaved = saved ? JSON.parse(saved) : [];
//     const now = Date.now();
//     const oneHour = 60 * 60 * 1000;
//     return parsedSaved.filter((entry) => now - entry.timestamp < oneHour);
//   });

//   useEffect(() => {
//     localStorage.setItem("claimedUsers", JSON.stringify(claimedUsers));
//   }, [claimedUsers]);

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
//       setShowErrorPopup(true);
//       playErrorSound();
//       return;
//     }

//     hasScannedRef.current = true;
//     playBeep();
//     navigator.vibrate?.(200);
//     setError(null);

//     try {
//       const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/decode", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(parsed),
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.message || "Verification failed");
//       }

//       const verified = await res.json();
//       setScannedData({
//         ...parsed,
//         ...verified,
//       });
//       setAssociated(verified.associated ?? true);
//     } catch (e) {
//       setError("Scanned QR is not valid or verification failed.");
//       setShowErrorPopup(true);
//     }
//   };

//   const handleClaim = async () => {
//     if (!transactionId) {
//       setError("No valid transaction ID. Please try submitting the purchase again.");
//       setShowErrorPopup(true);
//       return;
//     }
//     setIsClaiming(true);
//     try {
//       const url = `https://loyalty-backend-java.onrender.com/api/qrcode/claimReward?shopId=${scannedData.shopId}&userId=${scannedData.userId}&transactionId=${transactionId}`;
//       const res = await fetch(url, { method: "POST" });

//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(errText || "Failed to claim reward.");
//       }

//       const result = await res.json();
//       const claimedAmount = result.claimedAmount || 0;
//       const adjustedPurchaseAmount = result.adjustedPurchaseAmount || 0;
//       const newBalance = result.newBalance || 0;

//       setClaimedUsers((prev) => [
//         ...prev,
//         { userId: scannedData.userId, timestamp: Date.now() },
//       ]);

//       setScannedData((prev) => ({
//         ...prev,
//         verifiedBalance: newBalance,
//       }));

//       setSuccessTitle("Purchased Successfully");
//       setSuccessMessage(`Reward deducted: $${claimedAmount.toFixed(2)}. Effective purchase amount: $${adjustedPurchaseAmount.toFixed(2)}`);
//       setSuccessIconColor("green-500");
//       setShowSuccessPopup(true);
//       setShowConfirmClaim(false);
//       setShowClaimPopup(false);
//       setTransactionId(null);
//     } catch (e) {
//       setError(e.message || "Failed to claim reward.");
//       setShowErrorPopup(true);
//     } finally {
//       setIsClaiming(false);
//     }
//   };

//   const handleFinalizePoints = async () => {
//     if (!transactionId) {
//       setError("No valid transaction ID. Please try submitting the purchase again.");
//       setShowErrorPopup(true);
//       return;
//     }

//     try {
//       const res = await fetch(`https://loyalty-backend-java.onrender.com/api/qrcode/finalize-points?transactionId=${transactionId}&userId=${scannedData.userId}&shopId=${scannedData.shopId}`, {
//         method: "POST",
//       });

//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(errText || "Failed to finalize points.");
//       }

//       const result = await res.json();
//       setScannedData((prev) => ({
//         ...prev,
//         verifiedBalance: result.newBalance,
//       }));

//       setSuccessTitle("Purchased Successfully");
//       setSuccessMessage(`Purchase amount: $${purchaseAmount.toFixed(2)}`);
//       setSuccessIconColor("blue-500");
//       setShowSuccessPopup(true);
//       setShowClaimPopup(false);
//       setShowConfirmClaim(false);
//     } catch (e) {
//       setError(e.message || "Failed to finalize points.");
//       setShowErrorPopup(true);
//     }
//   };

//   const stopCamera = () => {
//     if (codeReader.current) {
//       codeReader.current.reset();
//     }
//     if (videoRef.current && videoRef.current.srcObject) {
//       const stream = videoRef.current.srcObject;
//       const videoTrack = stream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {
//           // Ignore errors if torch is not supported
//         });
//         videoTrack.stop();
//       }
//       videoRef.current.srcObject = null;
//     }
//   };

//   const startCamera = async () => {
//     stopCamera(); // Ensure clean start
//     codeReader.current = new BrowserMultiFormatReader();
//     try {
//       const devices = await codeReader.current.listVideoInputDevices();
//       if (!devices.length) {
//         setError("No camera devices found.");
//         setGuidance("Ensure your device has camera permissions enabled.");
//         setShowErrorPopup(true);
//         return;
//       }

//       const preferredDevice =
//         devices.find((device) => /back|rear/i.test(device.label)) || devices[0];

//       setGuidance("Allow camera access. Prefer rear camera for better scan.");

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { deviceId: { exact: preferredDevice.deviceId } },
//       });
//       videoRef.current.srcObject = stream;

//       // Wait for video to load data
//       await new Promise((resolve) => {
//         videoRef.current.onloadeddata = resolve;
//       });

//       const videoTrack = stream.getVideoTracks()[0];
//       if (videoTrack) {
//         // Attempt to enable torch if supported
//         videoTrack.applyConstraints({ advanced: [{ torch: true }] }).catch(() => {
//           // Ignore if torch is not supported
//         });
//       }

//       // Ensure video element has dimensions
//       videoRef.current.width = videoRef.current.videoWidth || 640;
//       videoRef.current.height = videoRef.current.videoHeight || 480;

//       await codeReader.current.decodeFromVideoDevice(
//         preferredDevice.deviceId,
//         videoRef.current,
//         async (result, err) => {
//           if (result && !hasScannedRef.current) {
//             try {
//               const parsed = JSON.parse(result.getText());
//               await handleQrScan(parsed);
//             } catch (e) {
//               hasScannedRef.current = true;
//               setError("Invalid QR Code format.");
//               setShowErrorPopup(true);
//             }
//           }
//           if (err && !(err instanceof NotFoundException)) {
//             console.error("Error during scanning:", err);
//             setError("An error occurred while scanning. Please try again.");
//             setShowErrorPopup(true);
//           }
//         }
//       );
//     } catch (error) {
//       console.error("Camera initialization error:", error);
//       setError("Unable to access camera. Please enable permissions.");
//       setShowErrorPopup(true);
//     }
//   };

//   useEffect(() => {
//     if (!showErrorPopup && !scannedData) {
//       startCamera();
//     } else {
//       stopCamera();
//     }

//     return () => {
//       stopCamera();
//     };
//   }, [showErrorPopup, scannedData]);

//   const handleScanAgain = () => {
//     setScannedData(null);
//     setError(null);
//     setSuccessAnimation(false);
//     hasScannedRef.current = false;
//     setAssociated(true);
//     setShowErrorPopup(false);
//     setEligibleReward(0);
//     setShowClaimPopup(false);
//     setShowConfirmClaim(false);
//     setPurchaseAmount("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const original = parseFloat(purchaseAmount);
//     if (isNaN(original) || original <= 0) {
//       setError("Please enter a valid dollar amount.");
//       setShowErrorPopup(true);
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/add-points", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: scannedData.userId,
//           shopId: scannedData.shopId,
//           dollarAmount: Math.round(original),
//         }),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         if (!result.transactionId) {
//           throw new Error("No transaction ID returned from server.");
//         }
//         setTransactionId(result.transactionId);
//         setEligibleReward(result.eligibleReward || 0);
//         setSuccessAnimation(true);
//         setTimeout(() => setSuccessAnimation(false), 1000);

//         if (result.eligibleReward > 0) {
//           setShowClaimPopup(true);
//         } else {
//           await handleFinalizePoints();
//         }
//       } else {
//         throw new Error(result.message || "Failed to process purchase.");
//       }
//     } catch (e) {
//       setError(e.message || "Failed to process purchase.");
//       setShowErrorPopup(true);
//     } finally {
//       setPurchaseAmount("");
//       setIsSubmitting(false);
//     }
//   };

//   const handleClose = () => {
//     stopCamera();
//     setScannedData(null);
//     setError(null);
//     setSuccessAnimation(false);
//     hasScannedRef.current = false;
//     setAssociated(true);
//     setShowErrorPopup(false);
//     setEligibleReward(0);
//     setShowClaimPopup(false);
//     setShowConfirmClaim(false);
//     setPurchaseAmount("");
//     setTransactionId(null);
//     onClose();
//   };

//   return (
//     <div className="inset-0 flex items-center justify-center bg-gray-100/70 z-50">
//       <div className="relative w-full max-w-md px-4">
//         {!showErrorPopup && (
//           <div className="bg-white shadow-xl rounded-xl w-full min-h-[580px] flex flex-col z-10 transition-all duration-200">
//             <nav className="bg-purple-700 text-white px-4 py-2 rounded-t-xl flex justify-between items-center mb-10">
//               <h2 className="text-2xl font-semibold">Scan QR Code</h2>
//               <button
//                 onClick={handleClose}
//                 className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                 </svg>
//               </button>
//             </nav>

//             <div className="p-6 flex flex-col items-center justify-between flex-1">
//               {!scannedData ? (
//                 <div className="relative w-full aspect-square max-w-[340px] border-2 border-dashed border-purple-500 rounded-xl overflow-hidden mb-6 shadow-md">
//                   <video
//                     ref={videoRef}
//                     className="w-full h-full object-cover"
//                     style={{ minWidth: "340px", minHeight: "340px" }} // Ensure minimum dimensions
//                   />
//                   <div className="absolute inset-0 border-purple-200/50 rounded-xl pointer-events-none" />
//                 </div>
//               ) : (
//                 <div className="w-full bg-gray-50 border border-purple-500 rounded-xl p-4 text-sm text-gray-700 shadow-sm mb-6">
//                   <p className="mb-4"><strong className="text-purple-600">Customer ID :</strong> CUST-{scannedData.userId}</p>
//                   <p className="mb-4"><strong className="text-purple-600">Customer Name :</strong> {scannedData.userName}</p>
//                   <p className="mb-4"><strong className="text-purple-600">Customer Email :</strong> {scannedData.email}</p>
//                   <p className="mb-4"><strong className="text-purple-600">Customer Phone :</strong> {scannedData.phone}</p>
//                   <p className="mb-4"><strong className="text-purple-600">Shop Name :</strong> {scannedData.shopName}</p>
//                   <p className={`transition-all duration-200 ${successAnimation ? "text-orange-500 scale-105" : ""}`}>
//                     <strong className="text-purple-600">Available Points :</strong> {scannedData.verifiedBalance ?? scannedData.availableBalance ?? 0}
//                   </p>

//                   {associated && (
//                     <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
//                       <div className="relative">
//                         <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
//                         <input
//                           type="number"
//                           min="1"
//                           placeholder="Enter purchase amount"
//                           value={purchaseAmount}
//                           onChange={(e) => setPurchaseAmount(e.target.value)}
//                           required
//                           className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-150"
//                         />
//                       </div>
//                       {error && !showErrorPopup && <p className="text-red-500 text-sm">{error}</p>}
//                       <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-60"
//                       >
//                         {isSubmitting ? "Submitting..." : "Submit"}
//                       </button>
//                     </form>
//                   )}
//                 </div>
//               )}

//               {guidance && !scannedData && (
//                 <p className="text-sm text-gray-500 text-center">{guidance}</p>
//               )}

//               {scannedData && (
//                 <div className="mt-4 flex gap-3">
//                   <button
//                     onClick={handleScanAgain}
//                     className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-sm transition duration-200"
//                   >
//                     Scan Again
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {showSuccessPopup && (
//           <div className="absolute inset-0 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
//               <FontAwesomeIcon icon={faCheckCircle} className={`text-${successIconColor} text-3xl mb-3`} />
//               <h3 className={`text-lg font-semibold text-${successIconColor.replace('500', '600')}`}>{successTitle}</h3>
//               {successMessage && <p className="text-sm text-gray-600 mt-1">{successMessage}</p>}
//               <button
//                 onClick={() => {
//                   setShowSuccessPopup(false);
//                 }}
//                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition duration-200"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {showErrorPopup && (
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
//               <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 text-3xl mb-3" />
//               <h3 className="text-lg font-semibold text-red-600">Error</h3>
//               <p className="text-sm text-gray-600 mt-1">{error || "An error occurred. Please try again."}</p>
//               <button
//                 onClick={() => {
//                   setShowErrorPopup(false);
//                   setError(null);
//                   hasScannedRef.current = false;
//                   if (!scannedData) {
//                     startCamera();
//                   }
//                 }}
//                 className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition duration-200"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {showClaimPopup && (
//           <div className="absolute inset-0 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
//               <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-3xl mb-3" />
//               <h3 className="text-lg font-semibold text-green-600">Eligible for Reward</h3>
//               <p className="text-sm text-gray-600 mt-1">You are eligible to claim ${eligibleReward.toFixed(2)}</p>
//               <button
//                 onClick={() => setShowConfirmClaim(true)}
//                 className="mt-4 mr-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition duration-200"
//               >
//                 Claim
//               </button>
//               <button
//                 onClick={handleFinalizePoints}
//                 className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition duration-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {showConfirmClaim && (
//           <div className="absolute inset-0 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
//               <FontAwesomeIcon icon={faExclamationCircle} className="text-blue-500 text-3xl mb-3" />
//               <h3 className="text-lg font-semibold text-blue-600">Confirm Claim</h3>
//               <p className="text-sm text-gray-600 mt-1">Are you sure you want to claim the reward?</p>
//               <button
//                 disabled={isClaiming}
//                 onClick={handleClaim}
//                 className="mt-4 mr-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition duration-200 disabled:opacity-60"
//               >
//                 {isClaiming ? "Claiming..." : "Yes"}
//               </button>
//               <button
//                 onClick={() => {
//                   setShowConfirmClaim(false);
//                   handleFinalizePoints();
//                 }}
//                 className="mt-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition duration-200"
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QrScanner;


// old code for claim reward

















import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faArrowRotateLeft,
  faDollarSign,
  faStore,
  faUser,
  faCoins,
  faIdCard, // New icon for customer details
} from "@fortawesome/free-solid-svg-icons";

// --- New Design Constants (Professional Blue/White Theme) ---
const PRIMARY_COLOR = "blue-700"; // Deep Blue for primary elements
const ACCENT_COLOR = "cyan-500"; // Cyan/Aqua for highlights and points
const SUCCESS_COLOR = "green-600";
const ERROR_COLOR = "red-600";
const INFO_COLOR = "blue-500";

const QrScanner = ({ onClose }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const hasScannedRef = useRef(false);

  // --- State Hooks ---
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [guidance, setGuidance] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [associated, setAssociated] = useState(true);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successTitle, setSuccessTitle] = useState("Purchase Recorded");
  const [successMessage, setSuccessMessage] = useState("");
  const [successIconColor, setSuccessIconColor] = useState(INFO_COLOR);
  const [showClaimPopup, setShowClaimPopup] = useState(false);
  const [showConfirmClaim, setShowConfirmClaim] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [eligibleReward, setEligibleReward] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [transactionId, setTransactionId] = useState(null);

  const [claimedUsers, setClaimedUsers] = useState(() => {
    const saved = localStorage.getItem("claimedUsers");
    const parsedSaved = saved ? JSON.parse(saved) : [];
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    return parsedSaved.filter((entry) => now - entry.timestamp < oneHour);
  });

  useEffect(() => {
    localStorage.setItem("claimedUsers", JSON.stringify(claimedUsers));
  }, [claimedUsers]);

  // --- Audio & Utility (Unchanged) ---
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

  // --- Handlers (Logic for APIs Unchanged) ---
  const handleQrScan = async (parsed) => {
    if (hasScannedRef.current) return;

    if (!validateShopMatch(parsed)) {
      hasScannedRef.current = true;
      setError("QR Code Error: This code doesn't belong to your shop.");
      setShowErrorPopup(true);
      playErrorSound();
      return;
    }

    hasScannedRef.current = true;
    playBeep();
    navigator.vibrate?.(200);
    setError(null);

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Verification failed");
      }

      const verified = await res.json();
      setScannedData({
        ...parsed,
        ...verified,
      });
      setAssociated(verified.associated ?? true);
      setGuidance("Customer Scanned! Enter purchase amount.");
    } catch (e) {
      setError("Scanned QR is not valid or verification failed.");
      setShowErrorPopup(true);
    }
  };

  const handleClaim = async () => {
    if (!transactionId) {
      setError("No valid transaction ID for claiming. Please re-submit.");
      setShowErrorPopup(true);
      return;
    }
    setIsClaiming(true);
    try {
      const url = `https://loyalty-backend-java.onrender.com/api/qrcode/claimReward?shopId=${scannedData.shopId}&userId=${scannedData.userId}&transactionId=${transactionId}`;
      const res = await fetch(url, { method: "POST" });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to claim reward.");
      }

      const result = await res.json();
      const claimedAmount = result.claimedAmount || 0;
      const adjustedPurchaseAmount = result.adjustedPurchaseAmount || 0;
      const newBalance = result.newBalance || 0;

      setClaimedUsers((prev) => [
        ...prev,
        { userId: scannedData.userId, timestamp: Date.now() },
      ]);

      setScannedData((prev) => ({
        ...prev,
        verifiedBalance: newBalance,
      }));

      setSuccessTitle("REWARD APPLIED!");
      setSuccessMessage(`Reward Used: $${claimedAmount.toFixed(2)}. Net Purchase: $${adjustedPurchaseAmount.toFixed(2)}. Points updated.`);
      setSuccessIconColor(SUCCESS_COLOR);
      setShowSuccessPopup(true);

      setShowConfirmClaim(false);
      setShowClaimPopup(false);
      setTransactionId(null);
    } catch (e) {
      setError(e.message || "Failed to claim reward.");
      setShowErrorPopup(true);
    } finally {
      setIsClaiming(false);
    }
  };

  const handleFinalizePoints = async () => {
    if (!transactionId) {
      setError("No valid transaction ID to finalize. Please re-submit.");
      setShowErrorPopup(true);
      return;
    }

    try {
      const res = await fetch(`https://loyalty-backend-java.onrender.com/api/qrcode/finalize-points?transactionId=${transactionId}&userId=${scannedData.userId}&shopId=${scannedData.shopId}`, {
        method: "POST",
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to finalize points.");
      }

      const result = await res.json();
      setScannedData((prev) => ({
        ...prev,
        verifiedBalance: result.newBalance,
      }));

      setSuccessTitle("POINTS ADDED");
      setSuccessMessage(`Purchase of $${parseFloat(purchaseAmount).toFixed(2)} recorded. New points granted.`);
      setSuccessIconColor(ACCENT_COLOR);
      setShowSuccessPopup(true);

      setShowClaimPopup(false);
      setShowConfirmClaim(false);
      setTransactionId(null);
    } catch (e) {
      setError(e.message || "Failed to finalize points.");
      setShowErrorPopup(true);
    }
  };

  const stopCamera = () => {
    if (codeReader.current) {
      codeReader.current.reset();
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => {
        if (track.kind === 'video') {
          track.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {});
          track.stop();
        }
      });
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    stopCamera();
    codeReader.current = new BrowserMultiFormatReader();
    try {
      const devices = await codeReader.current.listVideoInputDevices();
      if (!devices.length) {
        setError("No Camera Found.");
        setGuidance("Ensure your device has camera permissions enabled.");
        setShowErrorPopup(true);
        return;
      }

      const preferredDevice =
        devices.find((device) => /back|rear/i.test(device.label)) || devices[0];

      setGuidance("Focus the QR code within the frame to scan.");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: preferredDevice.deviceId } },
      });
      videoRef.current.srcObject = stream;

      await new Promise((resolve) => {
        videoRef.current.onloadeddata = resolve;
      });

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.applyConstraints({ advanced: [{ torch: true }] }).catch(() => {});
      }

      codeReader.current.decodeFromVideoDevice(
        preferredDevice.deviceId,
        videoRef.current,
        async (result, err) => {
          if (result && !hasScannedRef.current) {
            try {
              const parsed = JSON.parse(result.getText());
              await handleQrScan(parsed);
              stopCamera();
            } catch (e) {
              hasScannedRef.current = true;
              setError("Invalid QR Code: Format not recognized.");
              setShowErrorPopup(true);
              stopCamera();
            }
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error("Error during scanning:", err);
            setError("Scanning error. Try again.");
            setShowErrorPopup(true);
            stopCamera();
          }
        }
      );
    } catch (error) {
      console.error("Camera initialization error:", error);
      setError("Camera Permission Denied or Not Available.");
      setShowErrorPopup(true);
    }
  };

  // --- FIX: Restored handleSubmit function ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const original = parseFloat(purchaseAmount);
    if (isNaN(original) || original <= 0) {
      setError("Please enter a valid amount (must be greater than $0).");
      setShowErrorPopup(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/add-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: scannedData.userId,
          shopId: scannedData.shopId,
          dollarAmount: Math.round(original),
        }),
      });

      const result = await res.json();

      if (res.ok) {
        if (!result.transactionId) {
          throw new Error("Missing transaction ID from server.");
        }
        setTransactionId(result.transactionId);
        const reward = result.eligibleReward || 0;
        setEligibleReward(reward);
        setSuccessAnimation(true);
        setTimeout(() => setSuccessAnimation(false), 1000);

        if (reward > 0) {
          setShowClaimPopup(true);
        } else {
          await handleFinalizePoints();
        }
      } else {
        throw new Error(result.message || "Failed to process purchase.");
      }
    } catch (e) {
      setError(e.message || "Failed to process purchase.");
      setShowErrorPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Effects and Resets (Unchanged) ---
  useEffect(() => {
    if (!showErrorPopup && !scannedData && !showSuccessPopup && !showClaimPopup) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [showErrorPopup, scannedData, showSuccessPopup, showClaimPopup]);

  const handleScanAgain = () => {
    setScannedData(null);
    setError(null);
    setSuccessAnimation(false);
    hasScannedRef.current = false;
    setAssociated(true);
    setShowErrorPopup(false);
    setEligibleReward(0);
    setShowClaimPopup(false);
    setShowConfirmClaim(false);
    setPurchaseAmount("");
    setTransactionId(null);
    startCamera();
  };

  const handleClose = async () => {
    stopCamera();

    await new Promise(resolve => setTimeout(resolve, 300));

    setScannedData(null);
    setError(null);
    setSuccessAnimation(false);
    hasScannedRef.current = false;
    setAssociated(true);
    setShowErrorPopup(false);
    setEligibleReward(0);
    setShowClaimPopup(false);
    setShowConfirmClaim(false);
    setPurchaseAmount("");
    setTransactionId(null);
    onClose();
  };

  const isPopupOpen = showErrorPopup || showSuccessPopup || showClaimPopup || showConfirmClaim;

  // --- Render Logic (New Blue/White Design Applied with Two-Column Data) ---
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 z-50">
      <div className="relative w-full max-w-lg px-4"> {/* Increased max-w for two columns */}
        {/* Main Scanner/Data View */}
        {!isPopupOpen && (
          <div className={`bg-white shadow-2xl rounded-xl w-full min-h-[580px] flex flex-col z-10 transition-all duration-200 border-t-8 border-t-${PRIMARY_COLOR}`}>
            <nav className={`bg-${PRIMARY_COLOR} text-white px-6 py-4 rounded-t-xl flex justify-between items-center`}>
              <h2 className="text-2xl font-bold">Loyalty QR Processor</h2>
              <button
                onClick={handleClose}
                className={`text-white p-2 rounded-full hover:bg-blue-800 transition duration-200`}
                aria-label="Close Scanner"
              >
                <FontAwesomeIcon icon={faTimesCircle} className="w-6 h-6" />
              </button>
            </nav>

            <div className="p-6 flex flex-col items-center justify-between flex-1">
              {!scannedData ? (
                /* Camera View */
                <>
                  <div className={`relative w-full aspect-square max-w-[340px] border-4 border-solid border-${PRIMARY_COLOR} rounded-xl overflow-hidden mb-6 shadow-xl bg-gray-800`}>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      playsInline
                      style={{ minWidth: "340px", minHeight: "340px" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className={`w-3/4 h-3/4 border-4 border-${ACCENT_COLOR} opacity-90 rounded-lg animate-pulse-slow`}></div>
                    </div>
                  </div>
                  <p className="text-base text-gray-700 text-center font-medium mb-4">
                    <FontAwesomeIcon icon={faStore} className={`text-${PRIMARY_COLOR} mr-2`} />
                    **Awaiting Customer QR Scan**
                  </p>
                  <p className="text-sm text-gray-500 text-center">{guidance}</p>
                </>
              ) : (
                /* Scanned Data View - Two Column Layout */
                <div className="w-full bg-white border border-gray-200 rounded-xl p-6 text-gray-800 shadow-lg">
                  <h3 className={`text-xl font-bold text-${PRIMARY_COLOR} border-b-2 border-gray-200 pb-2 mb-4 flex items-center`}>
                    <FontAwesomeIcon icon={faIdCard} className={`text-${ACCENT_COLOR} mr-3`} />
                    Transaction Details
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Left Column: Customer Details */}
                    <div className="border-r border-gray-200 pr-4">
                        <h4 className="text-md font-semibold text-gray-700 mb-2">Customer Info:</h4>
                        <p className="text-sm mb-2"><strong className="text-gray-600">Name:</strong> {scannedData.userName || 'N/A'}</p>
                        <p className="text-sm mb-2"><strong className="text-gray-600">ID:</strong> CUST-{scannedData.userId}</p>
                        <p className="text-sm mb-2"><strong className="text-gray-600">Shop:</strong> <span className={`font-semibold text-${SUCCESS_COLOR}`}>{scannedData.shopName}</span></p>
                        <p className="text-sm mb-2"><strong className="text-gray-600">Email:</strong> {scannedData.email || 'N/A'}</p>
                        <p className="text-sm"><strong className="text-gray-600">Phone:</strong> {scannedData.phone || 'N/A'}</p>
                    </div>

                    {/* Right Column: Loyalty/Points */}
                    <div>
                        <h4 className="text-md font-semibold text-gray-700 mb-2">Loyalty Points:</h4>
                        {/* Points Balance - Highlighted */}
                        <div className={`py-3 px-3 rounded-lg border-2 border-solid border-${ACCENT_COLOR} bg-blue-50 transition-all duration-300 ${successAnimation ? "text-xl font-bold scale-[1.02] bg-cyan-100" : ""}`}>
                            <p className="text-lg font-medium flex justify-between items-center">
                              <span className={`flex items-center text-${PRIMARY_COLOR}`}><FontAwesomeIcon icon={faCoins} className={`text-${ACCENT_COLOR} mr-2`} /> Available Points:</span>
                              <span className={`font-extrabold text-${PRIMARY_COLOR} text-2xl`}>{scannedData.verifiedBalance ?? scannedData.availableBalance ?? 0}</span>
                            </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Points update after submitting the purchase.</p>
                    </div>
                  </div>

                  {/* Purchase Form (Full Width Below Columns) */}
                  {associated ? (
                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 pt-4 border-t border-gray-100">
                      <label className="text-base font-semibold text-gray-700">Enter Total Purchase Amount ($)</label>
                      <div className="relative">
                        <span className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-${PRIMARY_COLOR} font-bold text-lg`}>$</span>
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          placeholder="0.00"
                          value={purchaseAmount}
                          onChange={(e) => setPurchaseAmount(e.target.value)}
                          required
                          className={`w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-2xl font-bold text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-${ACCENT_COLOR} focus:border-${ACCENT_COLOR} outline-none transition duration-150 shadow-inner`}
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-${PRIMARY_COLOR} hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-md transition duration-200 disabled:opacity-60 text-lg`}
                      >
                        {isSubmitting ? "PROCESSING..." : "Submit Purchase & Process Loyalty"}
                      </button>
                    </form>
                  ) : (
                    <p className={`mt-4 text-${ERROR_COLOR} font-semibold text-center p-3 bg-red-50 rounded-lg border border-red-300`}>
                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                        Customer is not fully associated. Cannot process loyalty.
                    </p>
                  )}
                </div>
              )}
              
              {scannedData && (
                <div className="mt-6">
                  <button
                    onClick={handleScanAgain}
                    className={`flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-300 hover:bg-gray-200 shadow-sm transition duration-200`}
                  >
                    <FontAwesomeIcon icon={faArrowRotateLeft} /> Scan Next Customer
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- Popup Screens (Design Updated to Blue/White) --- */}

        {/* Success/Points Added Popup */}
        {showSuccessPopup && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className={`bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${SUCCESS_COLOR} animate-fade-in`}>
              <FontAwesomeIcon icon={faCheckCircle} className={`text-${successIconColor} text-5xl mb-4`} />
              <h3 className={`text-2xl font-bold text-gray-800 mb-2`}>{successTitle}</h3>
              {successMessage && <p className="text-md text-gray-600 mt-1 mb-4">{successMessage}</p>}
              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  handleScanAgain();
                }}
                className={`mt-4 w-full bg-${PRIMARY_COLOR} hover:bg-blue-800 text-white font-semibold px-5 py-3 rounded-xl transition duration-200`}
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Error Popup */}
        {showErrorPopup && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className={`bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${ERROR_COLOR} animate-fade-in`}>
              <FontAwesomeIcon icon={faExclamationTriangle} className={`text-${ERROR_COLOR} text-5xl mb-4`} />
              <h3 className="text-2xl font-bold text-red-700 mb-2">Operation Failed</h3>
              <p className="text-md text-gray-600 mt-1 mb-4">{error || "An error occurred. Please check the QR code and try again."}</p>
              <button
                onClick={() => {
                  setShowErrorPopup(false);
                  setError(null);
                  handleScanAgain();
                }}
                className={`mt-4 w-full bg-${ERROR_COLOR} hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-xl transition duration-200`}
              >
                Close & Restart Scan
              </button>
            </div>
          </div>
        )}

        {/* Claim Reward Prompt Popup */}
        {showClaimPopup && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className={`bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${ACCENT_COLOR} animate-fade-in`}>
              <FontAwesomeIcon icon={faDollarSign} className={`text-${ACCENT_COLOR} text-5xl mb-4`} />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">REWARD AVAILABLE!</h3>
              <p className="text-md text-gray-700 mb-4 font-semibold">
                This customer can claim a **$**<span className={`text-3xl font-extrabold text-${SUCCESS_COLOR}`}>{eligibleReward.toFixed(2)}</span>** discount** on this purchase.
              </p>
              
              <button
                onClick={() => setShowConfirmClaim(true)}
                className={`w-full bg-${SUCCESS_COLOR} hover:bg-green-700 text-white font-bold px-5 py-3 rounded-xl shadow-md transition duration-200 mb-3`}
              >
                1. **Apply Discount** (Claim Reward)
              </button>
              
              <button
                onClick={handleFinalizePoints}
                className={`w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-3 rounded-xl transition duration-200`}
              >
                2. Just Add Points (No Claim)
              </button>
            </div>
          </div>
        )}

        {/* Confirm Claim Popup */}
        {showConfirmClaim && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className={`bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${PRIMARY_COLOR} animate-fade-in`}>
              <FontAwesomeIcon icon={faExclamationTriangle} className={`text-${INFO_COLOR} text-5xl mb-4`} />
              <h3 className="text-2xl font-bold text-blue-700 mb-2">Final Confirmation</h3>
              <p className="text-md text-gray-700 mb-4">
                Confirm applying the **$**<span className="text-xl font-extrabold text-blue-700">{eligibleReward.toFixed(2)}</span>** reward** now?
              </p>
              
              <button
                disabled={isClaiming}
                onClick={handleClaim}
                className={`w-full bg-${SUCCESS_COLOR} hover:bg-green-700 text-white font-bold px-5 py-3 rounded-xl shadow-md transition duration-200 disabled:opacity-60 mb-3`}
              >
                {isClaiming ? "Applying..." : "CONFIRM & Apply Discount"}
              </button>
              
              <button
                onClick={() => {
                  setShowConfirmClaim(false);
                  handleFinalizePoints();
                }}
                className={`w-full bg-${ERROR_COLOR} hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-xl transition duration-200`}
              >
                Cancel & Just Add Points
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrScanner;