import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faArrowRotateLeft,
  faDollarSign,
  faQrcode,
  faUser,
  faCoins,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";

const PRIMARY_COLOR = "blue-700";
const ACCENT_COLOR = "cyan-500";
const SUCCESS_COLOR = "green-600";
const ERROR_COLOR = "red-600";
const INFO_COLOR = "blue-500";

const QrScanner = ({ onClose }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const hasScannedRef = useRef(false);

  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [guidance, setGuidance] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [associated, setAssociated] = useState(true);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successTitle, setSuccessTitle] = useState("Purchase Recorded");
  const [successMessage, setSuccessMessage] = useState("");
  const [successIconColor, setSuccessIconColor] = useState(INFO_COLOR);
  const [eligibleReward, setEligibleReward] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [showClaimIntentPopup, setShowClaimIntentPopup] = useState(false);
  const [minRewardAmount, setMinRewardAmount] = useState(0);
  const [intentToClaim, setIntentToClaim] = useState(false);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const [claimedUsers, setClaimedUsers] = useState(() => {
    const saved = localStorage.getItem("claimedUsers");
    const parsedSaved = saved ? JSON.parse(saved) : [];
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    return parsedSaved.filter((entry) => now - entry.timestamp < oneHour);
  });

  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [showConfirmClaimPopup, setShowConfirmClaimPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem("claimedUsers", JSON.stringify(claimedUsers));
  }, [claimedUsers]);

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
      const fullData = { ...parsed, ...verified };
      setScannedData(fullData);
      setAssociated(verified.associated ?? true);
      setGuidance("Customer Scanned! Enter purchase amount.");

      setIsCheckingEligibility(true);
      await checkRewardEligibility(fullData.userId, parsed.shopId);
      setIsCheckingEligibility(false);

    } catch (e) {
      setError("Scanned QR is not valid or verification failed.");
      setShowErrorPopup(true);
    }
  };

  const checkRewardEligibility = async (userId, shopId) => {
    if (!userId || !shopId) {
      console.error("Missing userId or shopId for eligibility check");
      return;
    }

    try {
      const url = `https://loyalty-backend-java.onrender.com/api/qrcode/check-eligible?userId=${userId}&shopId=${shopId}`;
      console.log("Eligibility URL:", url);
      const res = await fetch(url);

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Eligibility check failed");
      }

      const eligibility = await res.json();
      console.log("Eligibility Response:", eligibility);
      setEligibleReward(eligibility.eligibleAmount || 0);
      setMinRewardAmount(eligibility.minRewardAmount || 0);
      if (eligibility.eligibleAmount > 0) {
        setShowClaimIntentPopup(true);
      }
    } catch (e) {
      console.error("Eligibility check error:", e);
      setError(e.message);
      setShowErrorPopup(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const original = parseFloat(purchaseAmount);
    if (isNaN(original) || original <= 0) {
      setError("Please enter a valid amount (must be greater than $0).");
      setShowErrorPopup(true);
      return;
    }

    if (intentToClaim && original < minRewardAmount) {
      setError(`Purchase amount must be at least $${minRewardAmount.toFixed(2)} to claim the reward.`);
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
          intentToClaim: intentToClaim,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to calculate points.");
      }

      const previewResult = await res.json();
      console.log("Preview Result:", previewResult);

      setPreviewData(previewResult);
      setSuccessAnimation(true);
      setTimeout(() => setSuccessAnimation(false), 1000);
      setShowPreviewPopup(true);
    } catch (e) {
      console.error("Submit Error:", e);
      setError(e.message || "Failed to process purchase.");
      setShowErrorPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmProcess = async () => {
    if (!previewData || !scannedData) {
      setError("Invalid preview data. Please resubmit.");
      setShowErrorPopup(true);
      setShowPreviewPopup(false);
      return;
    }

    setIsConfirming(true);

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/process-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: scannedData.userId,
          shopId: scannedData.shopId,
          dollarAmount: previewData.originalDollarAmount,
          intentToClaim: intentToClaim,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to process purchase.");
      }

      const result = await res.json();
      console.log("Process Success:", result);

      setScannedData((prev) => ({
        ...prev,
        verifiedBalance: result.newBalance,
      }));

      setSuccessTitle("PURCHASE PROCESSED");
      setSuccessMessage(
        result.claimed
          ? `Discount of $${result.claimedAmount.toFixed(2)} applied. Net purchase: $${result.adjustedDollarAmount}. Points earned: ${result.adjustedPoints}. New balance: ${result.newBalance}.`
          : `$${result.adjustedDollarAmount || previewData.originalDollarAmount} purchased. Points Earned: ${result.adjustedPoints || result.earnedPoints}${
              result.signupBonusAdded > 0 ? ` + Signup: ${result.signupBonusAdded}` : ""
            }. New points balance: ${result.newBalance}.`
      );
      setSuccessIconColor(SUCCESS_COLOR);
      setShowSuccessPopup(true);
      setShowPreviewPopup(false);
      setPreviewData(null);
      setPurchaseAmount("");
    } catch (e) {
      console.error("Confirm Error:", e);
      setError(e.message || "Failed to confirm purchase.");
      setShowErrorPopup(true);
      setShowPreviewPopup(false);
    } finally {
      setIsConfirming(false);        
    }
  };

  const stopCamera = () => {
    if (codeReader.current) {
      codeReader.current.reset();
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => {
        if (track.kind === "video") {
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

  useEffect(() => {
    if (!showErrorPopup && !scannedData && !showSuccessPopup && !showClaimIntentPopup && !showPreviewPopup) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [showErrorPopup, scannedData, showSuccessPopup, showClaimIntentPopup, showPreviewPopup]);

  const handleScanAgain = () => {
    setScannedData(null);
    setError(null);
    setSuccessAnimation(false);
    hasScannedRef.current = false;
    setAssociated(true);
    setShowErrorPopup(false);
    setEligibleReward(0);
    setShowClaimIntentPopup(false);
    setIntentToClaim(false);
    setMinRewardAmount(0);
    setPurchaseAmount("");
    setShowPreviewPopup(false);
    setPreviewData(null);
    setShowConfirmClaimPopup(false);
    startCamera();
  };

  const handleClose = async () => {
    stopCamera();
    await new Promise((resolve) => setTimeout(resolve, 300));
    setScannedData(null);
    setError(null);
    setSuccessAnimation(false);
    hasScannedRef.current = false;
    setAssociated(true);
    setShowErrorPopup(false);
    setEligibleReward(0);
    setShowClaimIntentPopup(false);
    setIntentToClaim(false);
    setMinRewardAmount(0);
    setPurchaseAmount("");
    setShowPreviewPopup(false);
    setPreviewData(null);
    setShowConfirmClaimPopup(false);
    onClose();
  };

  const isPopupOpen = showErrorPopup || showSuccessPopup || showClaimIntentPopup || showPreviewPopup || showConfirmClaimPopup || isCheckingEligibility;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 z-50">
      <div className={`relative w-full px-6 ${scannedData ? 'max-w-2xl' : 'max-w-lg'}`}>
        {!isPopupOpen && (
          <div className={`bg-white shadow-2xl w-full max-h-[90vh] flex flex-col z-10 border-t-${PRIMARY_COLOR} overflow-hidden transition-all duration-300`}>
            <nav className={`bg-${PRIMARY_COLOR} text-white px-6 py-4 flex justify-between items-center sticky top-0 z-20`}>
              <h2 className="text-2xl font-bold">Loyalty QR Processor</h2>
              <button
                onClick={handleClose}
                className={`text-white p-2 rounded-full hover:bg-blue-800 transition duration-200`}
                aria-label="Close Scanner"
              >
                <FontAwesomeIcon icon={faTimesCircle} className="w-6 h-6" />
              </button>
            </nav>

            <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-between">
              {!scannedData ? (
                <>
                  <div
                    className={`relative w-full aspect-square max-w-[380px] border-4 border-solid border-${PRIMARY_COLOR} rounded-md overflow-hidden mb-6 shadow-xl bg-gray-800`}
                  >
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      playsInline
                      style={{ minWidth: "380px", minHeight: "380px" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className={`w-3/4 h-3/4 border-4 border-${ACCENT_COLOR} opacity-90 rounded-md animate-pulse-slow`}></div>
                    </div>
                  </div>

                  <p className="text-base text-gray-700 text-center font-medium mt-4 animate-pulse">
                    <FontAwesomeIcon icon={faQrcode} className="text-blue-500 mr-2" />
                    Hold the customer’s QR code steadily in front of the camera
                  </p>

                  <p className="text-sm text-gray-500 text-center">{guidance}</p>
                </>
              ) : (
                <div className="w-full bg-white border border-gray-200 rounded-xl p-6 text-gray-800 shadow-lg">
                  <h3 className={`text-xl font-bold text-${PRIMARY_COLOR} border-b-2 border-gray-200 pb-2 mb-4 flex items-center`}>
                    <FontAwesomeIcon icon={faIdCard} className={`text-${ACCENT_COLOR} mr-3`} />
                    Transaction Details
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-r border-gray-200 pr-4">
                      <h4 className="text-md font-semibold text-gray-700 mb-2">Customer Info:</h4>
                      <p className="text-sm mb-2">
                        <strong className="text-gray-600">Name:</strong> {scannedData.userName || "N/A"}
                      </p>
                      <p className="text-sm mb-2">
                        <strong className="text-gray-600">ID:</strong> CUST-{scannedData.userId}
                      </p>
                      <p className="text-sm mb-2">
                        <strong className="text-gray-600">Shop:</strong>{" "}
                        <span className={`font-semibold text-${SUCCESS_COLOR}`}>{scannedData.shopName}</span>
                      </p>
                      <p className="text-sm mb-2">
                        <strong className="text-gray-600">Email:</strong> {scannedData.email || "N/A"}
                      </p>
                      <p className="text-sm">
                        <strong className="text-gray-600">Phone:</strong> {scannedData.phone || "N/A"}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-700 mb-2">Loyalty Points:</h4>
                      <div
                        className={`py-3 px-3 rounded-lg border-2 border-solid border-${ACCENT_COLOR} bg-blue-50 transition-all duration-300 ${
                          successAnimation ? "text-xl font-bold scale-[1.02] bg-cyan-100" : ""
                        }`}
                      >
                        <p className="text-lg font-medium flex justify-between items-center">
                          <span className={`flex items-center text-${PRIMARY_COLOR}`}>
                            <FontAwesomeIcon icon={faCoins} className={`text-${ACCENT_COLOR} mr-3`} />Earned Points:
                          </span>
                        </p>
                        <span className={`font-extrabold text-${PRIMARY_COLOR} text-2xl`}>
                            {scannedData.verifiedBalance ?? scannedData.availableBalance ?? 0}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Points update after confirming the purchase.</p>
                    </div>
                  </div>

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
                        onChange={(e) => {
                          const value = e.target.value;

                          if (value === "" || parseFloat(value) <= 0) {
                            setPurchaseAmount("");
                            return;
                          }

                          setPurchaseAmount(value);
                        }}
                        required
                        className={`w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-2xl font-bold text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-${ACCENT_COLOR} focus:border-${ACCENT_COLOR} outline-none transition duration-150 shadow-inner`}
                      />
                    </div>

                    {!associated && (
                      <p
                        className={`text-sm text-${INFO_COLOR} font-medium p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center`}
                      >
                        <FontAwesomeIcon icon={faUser} className={`text-${INFO_COLOR} mr-2`} />
                        New customer detected! This purchase will automatically create their loyalty profile and connect them to {scannedData.shopName}.
                      </p>
                    )}

                    <button
                      type="submit"
                      // disabled={isSubmitting}
                      disabled={isSubmitting || !purchaseAmount || parseFloat(purchaseAmount) <= 0}
                      className={`bg-${PRIMARY_COLOR} hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-md transition duration-200 disabled:opacity-60 text-lg`}
                    >
                      {isSubmitting ? "PROCESSING..." : "Submit Purchase & Preview Points"}
                    </button>
                  </form>
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

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className={`bg-white p-8 rounded-md shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${SUCCESS_COLOR} animate-fade-in`}>
              <FontAwesomeIcon icon={faCheckCircle} className={`text-${successIconColor} text-5xl mb-4`} />
              <h3 className={`text-2xl font-bold text-gray-800 mb-2`}>{successTitle}</h3>
              {successMessage && <p className="text-md text-gray-600 mt-1 mb-4">{successMessage}</p>}
              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  handleScanAgain();
                }}
                className={`mt-4 w-full bg-${PRIMARY_COLOR} hover:bg-blue-800 text-white font-semibold px-5 py-3 rounded-sm transition duration-200`}
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Error Popup */}
        {showErrorPopup && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className={`bg-white p-8 rounded-md shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${ERROR_COLOR} animate-fade-in`}>
              <FontAwesomeIcon icon={faExclamationTriangle} className={`text-${ERROR_COLOR} text-5xl mb-4`} />
              <h3 className="text-2xl font-bold text-red-700 mb-2">Operation Failed</h3>
              <p className="text-md text-gray-600 mt-1 mb-4">{error || "An error occurred. Please check the QR code and try again."}</p>
              <button
                onClick={() => {
                  setShowErrorPopup(false);
                  setError(null);
                  handleScanAgain();
                }}
                className={`mt-4 w-full bg-${ERROR_COLOR} hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-sm transition duration-200`}
              >
                Close & Restart Scan
              </button>
            </div>
          </div>
        )}

        {/* Intent Popup */}
        {showClaimIntentPopup && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className={`bg-white p-8 rounded-md shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${ACCENT_COLOR} animate-fade-in`}>
              <FontAwesomeIcon icon={faDollarSign} className={`text-${ACCENT_COLOR} text-5xl mb-4`} />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Milestone Reward Eligible!</h3>
              <p className="text-md text-gray-700 mb-3">
                You can claim a <span className={`text-3xl font-extrabold text-${SUCCESS_COLOR}`}>${eligibleReward.toFixed(2)}</span> reward.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Purchase at least <span className={`font-bold text-${PRIMARY_COLOR}`}>${minRewardAmount.toFixed(2)}</span> to qualify.
              </p>
              <button
                onClick={() => {
                  setShowClaimIntentPopup(false);
                  setShowConfirmClaimPopup(true);
                }}
                className={`w-full bg-${SUCCESS_COLOR} hover:bg-green-700 text-white font-bold px-5 py-3 rounded-sm shadow-md transition duration-200 mb-3`}
              >
                Yes, Proceed to Claim
              </button>
              <button
                onClick={() => {
                  setIntentToClaim(false);
                  setShowClaimIntentPopup(false);
                }}
                className={`w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-3 rounded-sm transition duration-200`}
              >
                No, Just Earn Points
              </button>
            </div>
          </div>
        )}

        {/* Confirm Claim Popup */}
        {showConfirmClaimPopup && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className={`bg-white p-8 rounded-md shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${ACCENT_COLOR} animate-fade-in`}>
              <FontAwesomeIcon icon={faDollarSign} className={`text-${ACCENT_COLOR} text-5xl mb-4`} />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Are you sure?</h3>
              <p className="text-md text-gray-700 mb-4">
                Do you want to claim the ${eligibleReward.toFixed(2)} reward?
              </p>
              <button
                onClick={() => {
                  setIntentToClaim(true);
                  setShowConfirmClaimPopup(false);
                }}
                className={`w-full bg-${SUCCESS_COLOR} hover:bg-green-700 text-white font-bold px-5 py-3 rounded-sm shadow-md transition duration-200 mb-3`}
              >
                Yes, Claim
              </button>
              <button
                onClick={() => {
                  setIntentToClaim(false);
                  setShowConfirmClaimPopup(false);
                }}
                className={`w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-3 rounded-sm transition duration-200`}
              >
                No, Cancel
              </button>
            </div>
          </div>
        )}

        {/* Preview Confirm Popup */}
        {showPreviewPopup && previewData && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className={`bg-white p-8 rounded-md shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${INFO_COLOR} animate-fade-in`}>
              <FontAwesomeIcon icon={faDollarSign} className={`text-${INFO_COLOR} text-5xl mb-4`} />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirm Purchase</h3>
              <p className="text-md text-gray-700 mb-3">
                Amount Purchase: <span className={`font-bold text-${PRIMARY_COLOR}`}>${previewData.originalDollarAmount}</span>
              </p>
              <p className="text-md text-gray-700 mb-3">
                Points Earned After purchase: <span className={`font-bold text-${ACCENT_COLOR}`}>
                  {previewData.claimed ? previewData.adjustedPoints : previewData.earnedPoints}
                </span>
              </p>
              {previewData.claimed && (
                <p className="text-md text-gray-700 mb-3">
                  Reward Claimed: <span className={`font-bold text-${SUCCESS_COLOR}`}>${previewData.claimedAmount.toFixed(2)}</span>
                </p>
              )}
              {previewData.signupBonus > 0 && (
                <p className="text-md text-gray-700 mb-4">
                  Signup Bonus Points: <span className={`font-bold text-${SUCCESS_COLOR}`}>{previewData.signupBonus}</span>
                </p>
              )}
              <button
                onClick={handleConfirmProcess}
                disabled={isConfirming}                     
                className={`w-full bg-${SUCCESS_COLOR} hover:bg-green-700 text-white font-bold px-5 py-3 rounded-md shadow-md transition duration-200 mb-3 disabled:opacity-60`}
              >
                {isConfirming ? "Processing…" : "Process Purchase"}
              </button>
              <button
                onClick={() => {
                  setShowPreviewPopup(false);
                  setPreviewData(null);
                }}
                className={`w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-3 rounded-md transition duration-200`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isCheckingEligibility && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-white/90">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-lg font-semibold text-gray-700">Checking for eligible reward...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default QrScanner;