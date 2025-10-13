// // import React, { useEffect, useRef, useState } from "react";
// // import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {
// //   faCheckCircle,
// //   faExclamationCircle,
// // } from "@fortawesome/free-solid-svg-icons";

// // const QrScanner = ({ onClose }) => {
// //   const videoRef = useRef(null);
// //   const codeReader = useRef(null);
// //   const hasScannedRef = useRef(false);

// //   const [scannedData, setScannedData] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [guidance, setGuidance] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [successAnimation, setSuccessAnimation] = useState(false);
// //   const [associated, setAssociated] = useState(true);
// //   const [showErrorPopup, setShowErrorPopup] = useState(false);
// //   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
// //   const [successTitle, setSuccessTitle] = useState("Purchased Successfully");
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [successIconColor, setSuccessIconColor] = useState("blue-500");
// //   const [showClaimPopup, setShowClaimPopup] = useState(false);
// //   const [showConfirmClaim, setShowConfirmClaim] = useState(false);
// //   const [isClaiming, setIsClaiming] = useState(false);
// //   const [eligibleReward, setEligibleReward] = useState(0);
// //   const [purchaseAmount, setPurchaseAmount] = useState("");
// //   const [transactionId, setTransactionId] = useState(null);
// //   const [claimedUsers, setClaimedUsers] = useState(() => {
// //     const saved = localStorage.getItem("claimedUsers");
// //     const parsedSaved = saved ? JSON.parse(saved) : [];
// //     const now = Date.now();
// //     const oneHour = 60 * 60 * 1000;
// //     return parsedSaved.filter((entry) => now - entry.timestamp < oneHour);
// //   });

// //   useEffect(() => {
// //     localStorage.setItem("claimedUsers", JSON.stringify(claimedUsers));
// //   }, [claimedUsers]);

// //   const playBeep = () => {
// //     const context = new AudioContext();
// //     const oscillator = context.createOscillator();
// //     oscillator.type = "sine";
// //     oscillator.frequency.setValueAtTime(1000, context.currentTime);
// //     oscillator.connect(context.destination);
// //     oscillator.start();
// //     oscillator.stop(context.currentTime + 0.2);
// //   };

// //   const playErrorSound = () => {
// //     const context = new AudioContext();
// //     const oscillator = context.createOscillator();
// //     oscillator.type = "sawtooth";
// //     oscillator.frequency.setValueAtTime(400, context.currentTime);
// //     oscillator.connect(context.destination);
// //     oscillator.start();
// //     oscillator.stop(context.currentTime + 0.4);
// //   };

// //   const validateShopMatch = (parsed) => {
// //     const scannedShopId = parsed.shopId;
// //     const loggedInShopId = localStorage.getItem("id");
// //     return String(scannedShopId) === String(loggedInShopId);
// //   };

// //   const handleQrScan = async (parsed) => {
// //     if (!validateShopMatch(parsed)) {
// //       hasScannedRef.current = true;
// //       setError("Invalid QR Code: This code does not belong to your shop.");
// //       setShowErrorPopup(true);
// //       playErrorSound();
// //       return;
// //     }

// //     hasScannedRef.current = true;
// //     playBeep();
// //     navigator.vibrate?.(200);
// //     setError(null);

// //     try {
// //       const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/decode", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(parsed),
// //       });

// //       if (!res.ok) {
// //         const errData = await res.json();
// //         throw new Error(errData.message || "Verification failed");
// //       }

// //       const verified = await res.json();
// //       setScannedData({
// //         ...parsed,
// //         ...verified,
// //       });
// //       setAssociated(verified.associated ?? true);
// //     } catch (e) {
// //       setError("Scanned QR is not valid or verification failed.");
// //       setShowErrorPopup(true);
// //     }
// //   };

// //   const handleClaim = async () => {
// //     if (!transactionId) {
// //       setError("No valid transaction ID. Please try submitting the purchase again.");
// //       setShowErrorPopup(true);
// //       return;
// //     }
// //     setIsClaiming(true);
// //     try {
// //       const url = `https://loyalty-backend-java.onrender.com/api/qrcode/claimReward?shopId=${scannedData.shopId}&userId=${scannedData.userId}&transactionId=${transactionId}`;
// //       const res = await fetch(url, { method: "POST" });

// //       if (!res.ok) {
// //         const errText = await res.text();
// //         throw new Error(errText || "Failed to claim reward.");
// //       }

// //       const result = await res.json();
// //       const claimedAmount = result.claimedAmount || 0;
// //       const adjustedPurchaseAmount = result.adjustedPurchaseAmount || 0;
// //       const newBalance = result.newBalance || 0;

// //       setClaimedUsers((prev) => [
// //         ...prev,
// //         { userId: scannedData.userId, timestamp: Date.now() },
// //       ]);

// //       setScannedData((prev) => ({
// //         ...prev,
// //         verifiedBalance: newBalance,
// //       }));

// //       setSuccessTitle("Purchased Successfully");
// //       setSuccessMessage(`Reward deducted: $${claimedAmount.toFixed(2)}. Effective purchase amount: $${adjustedPurchaseAmount.toFixed(2)}`);
// //       setSuccessIconColor("green-500");
// //       setShowSuccessPopup(true);
// //       setShowConfirmClaim(false);
// //       setShowClaimPopup(false);
// //       setTransactionId(null);
// //     } catch (e) {
// //       setError(e.message || "Failed to claim reward.");
// //       setShowErrorPopup(true);
// //     } finally {
// //       setIsClaiming(false);
// //     }
// //   };

// //   const handleFinalizePoints = async () => {
// //     if (!transactionId) {
// //       setError("No valid transaction ID. Please try submitting the purchase again.");
// //       setShowErrorPopup(true);
// //       return;
// //     }
// //     try {
// //       const url = `https://loyalty-backend-java.onrender.com/api/qrcode/finalize-points?transactionId=${transactionId}&userId=${scannedData.userId}&shopId=${scannedData.shopId}`;
// //       const res = await fetch(url, { method: "POST" });

// //       if (!res.ok) {
// //         const errText = await res.text();
// //         throw new Error(errText || "Failed to finalize points.");
// //       }

// //       const result = await res.json();
// //       setScannedData((prev) => ({
// //         ...prev,
// //         verifiedBalance: result.newBalance,
// //       }));

// //       setSuccessTitle("Purchased Successfully");
// //       setSuccessMessage(`Purchase amount: $${parseFloat(purchaseAmount).toFixed(2)}`);
// //       setSuccessIconColor("blue-500");
// //       setShowSuccessPopup(true);
// //       setShowClaimPopup(false);
// //       setTransactionId(null);
// //     } catch (e) {
// //       setError(e.message || "Failed to finalize points.");
// //       setShowErrorPopup(true);
// //     }
// //   };

// //   const stopCamera = () => {
// //     if (codeReader.current) {
// //       codeReader.current.reset();
// //     }
// //     if (videoRef.current && videoRef.current.srcObject) {
// //       const stream = videoRef.current.srcObject;
// //       const videoTrack = stream.getVideoTracks()[0];
// //       if (videoTrack) {
// //         videoTrack.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {
// //           // Ignore errors if torch is not supported
// //         });
// //         videoTrack.stop();
// //       }
// //       videoRef.current.srcObject = null;
// //     }
// //   };

// //   const startCamera = async () => {
// //     stopCamera(); // Ensure clean start
// //     codeReader.current = new BrowserMultiFormatReader();
// //     try {
// //       const devices = await codeReader.current.listVideoInputDevices();
// //       if (!devices.length) {
// //         setError("No camera devices found.");
// //         setGuidance("Ensure your device has camera permissions enabled.");
// //         setShowErrorPopup(true);
// //         return;
// //       }

// //       const preferredDevice =
// //         devices.find((device) => /back|rear/i.test(device.label)) || devices[0];

// //       setGuidance("Allow camera access. Prefer rear camera for better scan.");

// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: { deviceId: { exact: preferredDevice.deviceId } },
// //       });
// //       videoRef.current.srcObject = stream;

// //       // Wait for video to load data
// //       await new Promise((resolve) => {
// //         videoRef.current.onloadeddata = resolve;
// //       });

// //       const videoTrack = stream.getVideoTracks()[0];
// //       if (videoTrack) {
// //         // Attempt to enable torch if supported
// //         videoTrack.applyConstraints({ advanced: [{ torch: true }] }).catch(() => {
// //           // Ignore if torch is not supported
// //         });
// //       }

// //       // Ensure video element has dimensions
// //       videoRef.current.width = videoRef.current.videoWidth || 640;
// //       videoRef.current.height = videoRef.current.videoHeight || 480;

// //       await codeReader.current.decodeFromVideoDevice(
// //         preferredDevice.deviceId,
// //         videoRef.current,
// //         async (result, err) => {
// //           if (result && !hasScannedRef.current) {
// //             try {
// //               const parsed = JSON.parse(result.getText());
// //               await handleQrScan(parsed);
// //             } catch (e) {
// //               hasScannedRef.current = true;
// //               setError("Invalid QR Code format.");
// //               setShowErrorPopup(true);
// //             }
// //           }
// //           if (err && !(err instanceof NotFoundException)) {
// //             console.error("Error during scanning:", err);
// //             setError("An error occurred while scanning. Please try again.");
// //             setShowErrorPopup(true);
// //           }
// //         }
// //       );
// //     } catch (error) {
// //       console.error("Camera initialization error:", error);
// //       setError("Unable to access camera. Please enable permissions.");
// //       setShowErrorPopup(true);
// //     }
// //   };

// //   useEffect(() => {
// //     if (!showErrorPopup && !scannedData) {
// //       startCamera();
// //     } else {
// //       stopCamera();
// //     }

// //     return () => {
// //       stopCamera();
// //     };
// //   }, [showErrorPopup, scannedData]);

// //   const handleScanAgain = () => {
// //     setScannedData(null);
// //     setError(null);
// //     setSuccessAnimation(false);
// //     hasScannedRef.current = false;
// //     setAssociated(true);
// //     setShowErrorPopup(false);
// //     setEligibleReward(0);
// //     setShowClaimPopup(false);
// //     setShowConfirmClaim(false);
// //     setPurchaseAmount("");
// //     setTransactionId(null);
// //     // Camera will start via useEffect
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(null);

// //     const original = parseFloat(purchaseAmount);
// //     if (isNaN(original) || original <= 0) {
// //       setError("Please enter a valid dollar amount.");
// //       setShowErrorPopup(true);
// //       return;
// //     }

// //     setIsSubmitting(true);

// //     try {
// //       const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/add-points", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           userId: scannedData.userId,
// //           shopId: scannedData.shopId,
// //           dollarAmount: Math.round(original),
// //         }),
// //       });

// //       const result = await res.json();

// //       if (res.ok) {
// //         if (!result.transactionId) {
// //           throw new Error("No transaction ID returned from server.");
// //         }
// //         setTransactionId(result.transactionId);
// //         setEligibleReward(result.eligibleReward || 0);
// //         setSuccessAnimation(true);
// //         setTimeout(() => setSuccessAnimation(false), 1000);
// //         setPurchaseAmount("");

// //         if (result.eligibleReward > 0) {
// //           setShowClaimPopup(true);
// //         } else {
// //           await handleFinalizePoints();
// //         }
// //       } else {
// //         throw new Error(result.message || "Failed to process purchase.");
// //       }
// //     } catch (e) {
// //       setError(e.message || "Failed to process purchase.");
// //       setShowErrorPopup(true);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleClose = () => {
// //     stopCamera();
// //     setScannedData(null);
// //     setError(null);
// //     setSuccessAnimation(false);
// //     hasScannedRef.current = false;
// //     setAssociated(true);
// //     setShowErrorPopup(false);
// //     setEligibleReward(0);
// //     setShowClaimPopup(false);
// //     setShowConfirmClaim(false);
// //     setPurchaseAmount("");
// //     setTransactionId(null);
// //     onClose();
// //   };

// //   return (
// //     <div className="inset-0 flex items-center justify-center bg-gray-100/70 z-50">
// //       <div className="relative w-full max-w-md px-4">
// //         {!showErrorPopup && (
// //           <div className="bg-white shadow-xl rounded-xl w-full min-h-[580px] flex flex-col z-10 transition-all duration-200">
// //             <nav className="bg-purple-700 text-white px-4 py-2 rounded-t-xl flex justify-between items-center mb-10">
// //               <h2 className="text-2xl font-semibold">Scan QR Code</h2>
// //               <button
// //                 onClick={handleClose}
// //                 className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
// //               >
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
// //                 </svg>
// //               </button>
// //             </nav>

// //             <div className="p-6 flex flex-col items-center justify-between flex-1">
// //               {!scannedData ? (
// //                 <div className="relative w-full aspect-square max-w-[340px] border-2 border-dashed border-purple-500 rounded-xl overflow-hidden mb-6 shadow-md">
// //                   <video
// //                     ref={videoRef}
// //                     className="w-full h-full object-cover"
// //                     style={{ minWidth: "340px", minHeight: "340px" }} // Ensure minimum dimensions
// //                   />
// //                   <div className="absolute inset-0 border-purple-200/50 rounded-xl pointer-events-none" />
// //                 </div>
// //               ) : (
// //                 <div className="w-full bg-gray-50 border border-purple-500 rounded-xl p-4 text-sm text-gray-700 shadow-sm mb-6">
// //                   <p className="mb-4"><strong className="text-purple-600">Customer ID :</strong> CUST-{scannedData.userId}</p>
// //                   <p className="mb-4"><strong className="text-purple-600">Customer Name :</strong> {scannedData.userName}</p>
// //                   <p className="mb-4"><strong className="text-purple-600">Customer Email :</strong> {scannedData.email}</p>
// //                   <p className="mb-4"><strong className="text-purple-600">Customer Phone :</strong> {scannedData.phone}</p>
// //                   <p className="mb-4"><strong className="text-purple-600">Shop Name :</strong> {scannedData.shopName}</p>
// //                   <p className={`transition-all duration-200 ${successAnimation ? "text-orange-500 scale-105" : ""}`}>
// //                     <strong className="text-purple-600">Available Points :</strong> {scannedData.verifiedBalance ?? scannedData.availableBalance ?? 0}
// //                   </p>

// //                   {associated && (
// //                     <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
// //                       <div className="relative">
// //                         <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
// //                         <input
// //                           type="number"
// //                           min="1"
// //                           placeholder="Enter purchase amount"
// //                           value={purchaseAmount}
// //                           onChange={(e) => setPurchaseAmount(e.target.value)}
// //                           required
// //                           className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-150"
// //                         />
// //                       </div>
// //                       {error && !showErrorPopup && <p className="text-red-500 text-sm">{error}</p>}
// //                       <button
// //                         type="submit"
// //                         disabled={isSubmitting}
// //                         className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-60"
// //                       >
// //                         {isSubmitting ? "Submitting..." : "Submit"}
// //                       </button>
// //                     </form>
// //                   )}
// //                 </div>
// //               )}

// //               {guidance && !scannedData && (
// //                 <p className="text-sm text-gray-500 text-center">{guidance}</p>
// //               )}

// //               {scannedData && (
// //                 <div className="mt-4 flex gap-3">
// //                   <button
// //                     onClick={handleScanAgain}
// //                     className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-sm transition duration-200"
// //                   >
// //                     Scan Again
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {showSuccessPopup && (
// //           <div className="absolute inset-0 flex items-center justify-center z-50">
// //             <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
// //               <FontAwesomeIcon icon={faCheckCircle} className={`text-${successIconColor} text-3xl mb-3`} />
// //               <h3 className={`text-lg font-semibold text-${successIconColor.replace('500', '600')}`}>{successTitle}</h3>
// //               {successMessage && <p className="text-sm text-gray-600 mt-1">{successMessage}</p>}
// //               <button
// //                 onClick={() => setShowSuccessPopup(false)}
// //                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition duration-200"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {showErrorPopup && (
// //           <div className="fixed inset-0 flex items-center justify-center z-50">
// //             <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
// //               <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 text-3xl mb-3" />
// //               <h3 className="text-lg font-semibold text-red-600">Error</h3>
// //               <p className="text-sm text-gray-600 mt-1">{error || "An error occurred. Please try again."}</p>
// //               <button
// //                 onClick={() => {
// //                   setShowErrorPopup(false);
// //                   setError(null);
// //                   hasScannedRef.current = false;
// //                 }}
// //                 className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition duration-200"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {showClaimPopup && (
// //           <div className="absolute inset-0 flex items-center justify-center z-50">
// //             <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
// //               <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-3xl mb-3" />
// //               <h3 className="text-lg font-semibold text-green-600">Eligible for Reward</h3>
// //               <p className="text-sm text-gray-600 mt-1">You are eligible to claim ${eligibleReward.toFixed(2)}</p>
// //               <button
// //                 onClick={() => setShowConfirmClaim(true)}
// //                 className="mt-4 mr-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition duration-200"
// //               >
// //                 Claim
// //               </button>
// //               <button
// //                 onClick={handleFinalizePoints}
// //                 className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition duration-200"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {showConfirmClaim && (
// //           <div className="absolute inset-0 flex items-center justify-center z-50">
// //             <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
// //               <FontAwesomeIcon icon={faExclamationCircle} className="text-blue-500 text-3xl mb-3" />
// //               <h3 className="text-lg font-semibold text-blue-600">Confirm Claim</h3>
// //               <p className="text-sm text-gray-600 mt-1">Are you sure you want to claim the reward?</p>
// //               <button
// //                 disabled={isClaiming}
// //                 onClick={handleClaim}
// //                 className="mt-4 mr-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition duration-200 disabled:opacity-60"
// //               >
// //                 {isClaiming ? "Claiming..." : "Yes"}
// //               </button>
// //               <button
// //                 onClick={() => setShowConfirmClaim(false)}
// //                 className="mt-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition duration-200"
// //               >
// //                 No
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default QrScanner;











// // import React, { useEffect, useRef, useState } from "react"; 
// // import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {
// //   faCheckCircle,
// //   faExclamationCircle,
// // } from "@fortawesome/free-solid-svg-icons";

// // const QrScanner = ({ onClose }) => {
// //   const videoRef = useRef(null);
// //   const codeReader = useRef(null);
// //   const hasScannedRef = useRef(false);

// //   const [scannedData, setScannedData] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [guidance, setGuidance] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [successAnimation, setSuccessAnimation] = useState(false);
// //   const [associated, setAssociated] = useState(true);
// //   const [showErrorPopup, setShowErrorPopup] = useState(false);
// //   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
// //   const [successTitle, setSuccessTitle] = useState("Purchased Successfully");
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [successIconColor, setSuccessIconColor] = useState("blue-500");
// //   const [showClaimPopup, setShowClaimPopup] = useState(false);
// //   const [showConfirmClaim, setShowConfirmClaim] = useState(false);
// //   const [isClaiming, setIsClaiming] = useState(false);
// //   const [eligibleReward, setEligibleReward] = useState(0);
// //   const [purchaseAmount, setPurchaseAmount] = useState("");
// //   const [transactionId, setTransactionId] = useState(null);
// //   const [claimedUsers, setClaimedUsers] = useState(() => {
// //     const saved = localStorage.getItem("claimedUsers");
// //     const parsedSaved = saved ? JSON.parse(saved) : [];
// //     const now = Date.now();
// //     const oneHour = 60 * 60 * 1000;
// //     return parsedSaved.filter((entry) => now - entry.timestamp < oneHour);
// //   });

// //   useEffect(() => {
// //     localStorage.setItem("claimedUsers", JSON.stringify(claimedUsers));
// //   }, [claimedUsers]);

// //   const playBeep = () => {
// //     const context = new AudioContext();
// //     const oscillator = context.createOscillator();
// //     oscillator.type = "sine";
// //     oscillator.frequency.setValueAtTime(1000, context.currentTime);
// //     oscillator.connect(context.destination);
// //     oscillator.start();
// //     oscillator.stop(context.currentTime + 0.2);
// //   };

// //   const playErrorSound = () => {
// //     const context = new AudioContext();
// //     const oscillator = context.createOscillator();
// //     oscillator.type = "sawtooth";
// //     oscillator.frequency.setValueAtTime(400, context.currentTime);
// //     oscillator.connect(context.destination);
// //     oscillator.start();
// //     oscillator.stop(context.currentTime + 0.4);
// //   };

// //   const validateShopMatch = (parsed) => {
// //     const scannedShopId = parsed.shopId;
// //     const loggedInShopId = localStorage.getItem("id");
// //     return String(scannedShopId) === String(loggedInShopId);
// //   };

// //   const handleQrScan = async (parsed) => {
// //     if (!validateShopMatch(parsed)) {
// //       hasScannedRef.current = true;
// //       setError("Invalid QR Code: This code does not belong to your shop.");
// //       setShowErrorPopup(true);
// //       playErrorSound();
// //       return;
// //     }

// //     hasScannedRef.current = true;
// //     playBeep();
// //     navigator.vibrate?.(200);
// //     setError(null);

// //     try {
// //       const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/decode", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(parsed),
// //       });

// //       if (!res.ok) {
// //         const errData = await res.json();
// //         throw new Error(errData.message || "Verification failed");
// //       }

// //       const verified = await res.json();
// //       setScannedData({
// //         ...parsed,
// //         ...verified,
// //       });
// //       setAssociated(verified.associated ?? true);
// //     } catch (e) {
// //       setError("Scanned QR is not valid or verification failed.");
// //       setShowErrorPopup(true);
// //     }
// //   };

// //   const handleClaim = async () => {
// //     if (!transactionId) {
// //       setError("No valid transaction ID. Please try submitting the purchase again.");
// //       setShowErrorPopup(true);
// //       return;
// //     }
// //     setIsClaiming(true);
// //     try {
// //       const url = `https://loyalty-backend-java.onrender.com/api/qrcode/claimReward?shopId=${scannedData.shopId}&userId=${scannedData.userId}&transactionId=${transactionId}`;
// //       const res = await fetch(url, { method: "POST" });

// //       if (!res.ok) {
// //         const errText = await res.text();
// //         throw new Error(errText || "Failed to claim reward.");
// //       }

// //       const result = await res.json();
// //       const claimedAmount = result.claimedAmount || 0;
// //       const adjustedPurchaseAmount = result.adjustedPurchaseAmount || 0;
// //       const newBalance = result.newBalance || 0;

// //       setClaimedUsers((prev) => [
// //         ...prev,
// //         { userId: scannedData.userId, timestamp: Date.now() },
// //       ]);

// //       setScannedData((prev) => ({
// //         ...prev,
// //         verifiedBalance: newBalance,
// //       }));

// //       setSuccessTitle("Purchased Successfully");
// //       setSuccessMessage(`Reward deducted: $${claimedAmount.toFixed(2)}. Effective purchase amount: $${adjustedPurchaseAmount.toFixed(2)}`);
// //       setSuccessIconColor("green-500");
// //       setShowSuccessPopup(true);
// //       setShowConfirmClaim(false);
// //       setShowClaimPopup(false);
// //       setTransactionId(null); // Reset transactionId after successful claim
// //     } catch (e) {
// //       setError(e.message || "Failed to claim reward.");
// //       setShowErrorPopup(true);
// //     } finally {
// //       setIsClaiming(false);
// //     }
// //   };

// //   const handleFinalizePoints = async () => {
// //     if (!transactionId) {
// //       setError("No valid transaction ID. Please try submitting the purchase again.");
// //       setShowErrorPopup(true);
// //       return;
// //     }
// //     try {
// //       const url = `https://loyalty-backend-java.onrender.com/api/qrcode/finalize-points?transactionId=${transactionId}&userId=${scannedData.userId}&shopId=${scannedData.shopId}`;
// //       const res = await fetch(url, { method: "POST" });

// //       if (!res.ok) {
// //         const errText = await res.text();
// //         throw new Error(errText || "Failed to finalize points.");
// //       }

// //       const result = await res.json();
// //       setScannedData((prev) => ({
// //         ...prev,
// //         verifiedBalance: result.newBalance,
// //       }));

// //       setSuccessTitle("Purchased Successfully");
// //       setSuccessMessage(`Purchase amount: $${parseFloat(purchaseAmount).toFixed(2)}`);
// //       setSuccessIconColor("blue-500");
// //       setShowSuccessPopup(true);
// //       setShowClaimPopup(false);
// //       setTransactionId(null); // Reset transactionId after successful finalize
// //     } catch (e) {
// //       setError(e.message || "Failed to finalize points.");
// //       setShowErrorPopup(true);
// //     }
// //   };

// //   const stopCamera = () => {
// //     if (codeReader.current) {
// //       codeReader.current.reset();
// //     }
// //     if (videoRef.current && videoRef.current.srcObject) {
// //       const stream = videoRef.current.srcObject;
// //       const videoTrack = stream.getVideoTracks()[0];
// //       if (videoTrack) {
// //         videoTrack.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {
// //           // Ignore errors if torch is not supported
// //         });
// //         videoTrack.stop();
// //       }
// //       videoRef.current.srcObject = null;
// //     }
// //   };

// //   const startCamera = async () => {
// //     stopCamera(); // Ensure clean start
// //     codeReader.current = new BrowserMultiFormatReader();
// //     try {
// //       const devices = await codeReader.current.listVideoInputDevices();
// //       if (!devices.length) {
// //         setError("No camera devices found.");
// //         setGuidance("Ensure your device has camera permissions enabled.");
// //         setShowErrorPopup(true);
// //         return;
// //       }

// //       const preferredDevice =
// //         devices.find((device) => /back|rear/i.test(device.label)) || devices[0];

// //       setGuidance("Allow camera access. Prefer rear camera for better scan.");

// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: { deviceId: { exact: preferredDevice.deviceId } },
// //       });
// //       videoRef.current.srcObject = stream;

// //       // Wait for video to load data
// //       await new Promise((resolve) => {
// //         videoRef.current.onloadeddata = resolve;
// //       });

// //       const videoTrack = stream.getVideoTracks()[0];
// //       if (videoTrack) {
// //         // Attempt to enable torch if supported
// //         videoTrack.applyConstraints({ advanced: [{ torch: true }] }).catch(() => {
// //           // Ignore if torch is not supported
// //         });
// //       }

// //       // Ensure video element has dimensions
// //       videoRef.current.width = videoRef.current.videoWidth || 640;
// //       videoRef.current.height = videoRef.current.videoHeight || 480;

// //       await codeReader.current.decodeFromVideoDevice(
// //         preferredDevice.deviceId,
// //         videoRef.current,
// //         async (result, err) => {
// //           if (result && !hasScannedRef.current) {
// //             try {
// //               const parsed = JSON.parse(result.getText());
// //               await handleQrScan(parsed);
// //             } catch (e) {
// //               hasScannedRef.current = true;
// //               setError("Invalid QR Code format.");
// //               setShowErrorPopup(true);
// //             }
// //           }
// //           if (err && !(err instanceof NotFoundException)) {
// //             console.error("Error during scanning:", err);
// //             setError("An error occurred while scanning. Please try again.");
// //             setShowErrorPopup(true);
// //           }
// //         }
// //       );
// //     } catch (error) {
// //       console.error("Camera initialization error:", error);
// //       setError("Unable to access camera. Please enable permissions.");
// //       setShowErrorPopup(true);
// //     }
// //   };

// //   useEffect(() => {
// //     if (!showErrorPopup && !scannedData) {
// //       startCamera();
// //     } else {
// //       stopCamera();
// //     }

// //     return () => {
// //       stopCamera();
// //     };
// //   }, [showErrorPopup, scannedData]);

// //   const handleScanAgain = () => {
// //     setScannedData(null);
// //     setError(null);
// //     setSuccessAnimation(false);
// //     hasScannedRef.current = false;
// //     setAssociated(true);
// //     setShowErrorPopup(false);
// //     setEligibleReward(0);
// //     setShowClaimPopup(false);
// //     setShowConfirmClaim(false);
// //     setPurchaseAmount("");
// //     // Do not reset transactionId here to prevent losing it prematurely
// //     // Camera will start via useEffect
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(null);

// //     const original = parseFloat(purchaseAmount);
// //     if (isNaN(original) || original <= 0) {
// //       setError("Please enter a valid dollar amount.");
// //       setShowErrorPopup(true);
// //       return;
// //     }

// //     setIsSubmitting(true);

// //     try {
// //       const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/add-points", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           userId: scannedData.userId,
// //           shopId: scannedData.shopId,
// //           dollarAmount: Math.round(original),
// //         }),
// //       });

// //       const result = await res.json();

// //       if (res.ok) {
// //         if (!result.transactionId) {
// //           throw new Error("No transaction ID returned from server.");
// //         }
// //         setTransactionId(result.transactionId);
// //         setEligibleReward(result.eligibleReward || 0);
// //         setSuccessAnimation(true);
// //         setTimeout(() => setSuccessAnimation(false), 1000);
// //         setPurchaseAmount("");

// //         if (result.eligibleReward > 0) {
// //           setShowClaimPopup(true);
// //         } else {
// //           // Call finalize-points immediately if no reward is eligible
// //           await handleFinalizePoints();
// //         }
// //       } else {
// //         throw new Error(result.message || "Failed to process purchase.");
// //       }
// //     } catch (e) {
// //       setError(e.message || "Failed to process purchase.");
// //       setShowErrorPopup(true);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleClose = () => {
// //     stopCamera();
// //     setScannedData(null);
// //     setError(null);
// //     setSuccessAnimation(false);
// //     hasScannedRef.current = false;
// //     setAssociated(true);
// //     setShowErrorPopup(false);
// //     setEligibleReward(0);
// //     setShowClaimPopup(false);
// //     setShowConfirmClaim(false);
// //     setPurchaseAmount("");
// //     setTransactionId(null);
// //     onClose();
// //   };

// //   return (
// //     <div className="inset-0 flex items-center justify-center bg-gray-100/70 z-50">
// //       <div className="relative w-full max-w-md px-4">
// //         {!showErrorPopup && (
// //           <div className="bg-white shadow-xl rounded-xl w-full min-h-[580px] flex flex-col z-10 transition-all duration-200">
// //             <nav className="bg-purple-700 text-white px-4 py-2 rounded-t-xl flex justify-between items-center mb-10">
// //               <h2 className="text-2xl font-semibold">Scan QR Code</h2>
// //               <button
// //                 onClick={handleClose}
// //                 className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
// //               >
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
// //                 </svg>
// //               </button>
// //             </nav>

// //             <div className="p-6 flex flex-col items-center justify-between flex-1">
// //               {!scannedData ? (
// //                 <div className="relative w-full aspect-square max-w-[340px] border-2 border-dashed border-purple-500 rounded-xl overflow-hidden mb-6 shadow-md">
// //                   <video
// //                     ref={videoRef}
// //                     className="w-full h-full object-cover"
// //                     style={{ minWidth: "340px", minHeight: "340px" }} // Ensure minimum dimensions
// //                   />
// //                   <div className="absolute inset-0 border-purple-200/50 rounded-xl pointer-events-none" />
// //                 </div>
// //               ) : (
// //                 <div className="w-full bg-gray-50 border border-purple-500 rounded-xl p-4 text-sm text-gray-700 shadow-sm mb-6">
// //                   <p className="mb-4"><strong className="text-purple-600">Customer ID :</strong> CUST-{scannedData.userId}</p>
// //                   <p className="mb-4"><strong className="text-purple-600">Customer Name :</strong> {scannedData.userName}</p>
// //                   <p className="mb-4"><strong className="text-purple-600">Customer Email :</strong> {scannedData.email}</p>
// //                   <p className="mb-4"><strong className="text-purple-600">Customer Phone :</strong> {scannedData.phone}</p>
// //                   <p className="mb-4"><strong className="text-purple-600">Shop Name :</strong> {scannedData.shopName}</p>
// //                   <p className={`transition-all duration-200 ${successAnimation ? "text-orange-500 scale-105" : ""}`}>
// //                     <strong className="text-purple-600">Available Points :</strong> {scannedData.verifiedBalance ?? scannedData.availableBalance ?? 0}
// //                   </p>

// //                   {associated && (
// //                     <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
// //                       <div className="relative">
// //                         <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
// //                         <input
// //                           type="number"
// //                           min="1"
// //                           placeholder="Enter purchase amount"
// //                           value={purchaseAmount}
// //                           onChange={(e) => setPurchaseAmount(e.target.value)}
// //                           required
// //                           className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-150"
// //                         />
// //                       </div>
// //                       {error && !showErrorPopup && <p className="text-red-500 text-sm">{error}</p>}
// //                       <button
// //                         type="submit"
// //                         disabled={isSubmitting}
// //                         className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-60"
// //                       >
// //                         {isSubmitting ? "Submitting..." : "Submit"}
// //                       </button>
// //                     </form>
// //                   )}
// //                 </div>
// //               )}

// //               {guidance && !scannedData && (
// //                 <p className="text-sm text-gray-500 text-center">{guidance}</p>
// //               )}

// //               {scannedData && (
// //                 <div className="mt-4 flex gap-3">
// //                   <button
// //                     onClick={handleScanAgain}
// //                     className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-sm transition duration-200"
// //                   >
// //                     Scan Again
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {showSuccessPopup && (
// //           <div className="absolute inset-0 flex items-center justify-center z-50">
// //             <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
// //               <FontAwesomeIcon icon={faCheckCircle} className={`text-${successIconColor} text-3xl mb-3`} />
// //               <h3 className={`text-lg font-semibold text-${successIconColor.replace('500', '600')}`}>{successTitle}</h3>
// //               {successMessage && <p className="text-sm text-gray-600 mt-1">{successMessage}</p>}
// //               <button
// //                 onClick={() => {
// //                   setShowSuccessPopup(false);
// //                   setScannedData(null); // Reset scannedData to allow new scan
// //                   hasScannedRef.current = false; // Allow new scan
// //                 }}
// //                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition duration-200"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {showErrorPopup && (
// //           <div className="fixed inset-0 flex items-center justify-center z-50">
// //             <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
// //               <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 text-3xl mb-3" />
// //               <h3 className="text-lg font-semibold text-red-600">Error</h3>
// //               <p className="text-sm text-gray-600 mt-1">{error || "An error occurred. Please try again."}</p>
// //               <button
// //                 onClick={() => {
// //                   setShowErrorPopup(false);
// //                   setError(null);
// //                   hasScannedRef.current = false;
// //                   if (!scannedData) {
// //                     startCamera(); // Restart camera if no scanned data
// //                   }
// //                 }}
// //                 className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition duration-200"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {showClaimPopup && (
// //           <div className="absolute inset-0 flex items-center justify-center z-50">
// //             <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
// //               <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-3xl mb-3" />
// //               <h3 className="text-lg font-semibold text-green-600">Eligible for Reward</h3>
// //               <p className="text-sm text-gray-600 mt-1">You are eligible to claim ${eligibleReward.toFixed(2)}</p>
// //               <button
// //                 onClick={() => setShowConfirmClaim(true)}
// //                 className="mt-4 mr-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition duration-200"
// //               >
// //                 Claim
// //               </button>
// //               <button
// //                 onClick={handleFinalizePoints}
// //                 className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition duration-200"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {showConfirmClaim && (
// //           <div className="absolute inset-0 flex items-center justify-center z-50">
// //             <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[340px]">
// //               <FontAwesomeIcon icon={faExclamationCircle} className="text-blue-500 text-3xl mb-3" />
// //               <h3 className="text-lg font-semibold text-blue-600">Confirm Claim</h3>
// //               <p className="text-sm text-gray-600 mt-1">Are you sure you want to claim the reward?</p>
// //               <button
// //                 disabled={isClaiming}
// //                 onClick={handleClaim}
// //                 className="mt-4 mr-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition duration-200 disabled:opacity-60"
// //               >
// //                 {isClaiming ? "Claiming..." : "Yes"}
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setShowConfirmClaim(false);
// //                   handleFinalizePoints(); // Finalize points if claim is canceled
// //                 }}
// //                 className="mt-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition duration-200"
// //               >
// //                 No
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default QrScanner;















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
































// old code for test
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
          <div className="bg-white shadow-xl rounded-xl w-full min-h-[580px] flex flex-col z-10 transition-all duration-200">
            <nav className="bg-purple-700 text-white px-4 py-2 rounded-t-xl flex justify-between items-center mb-10">
              <h2 className="text-2xl font-semibold">Scan QR Code</h2>
              <button
                onClick={onClose}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
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
                        className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white font-semibold py-2 rounded-lg shadow-sm transition duration-200 disabled:opacity-60"
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