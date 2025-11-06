// import React, { useState, useEffect } from "react";
// import { Phone, Mail, QrCode } from "lucide-react";
// import QrScanner from "./QrScanner";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

// const CustomerLookup = () => {
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [inviteEmail, setInviteEmail] = useState("");
//   const [sendingInvite, setSendingInvite] = useState(false);
//   const [showScanner, setShowScanner] = useState(false);
//   const [scannedResult, setScannedResult] = useState(null);
//   const [showNotFound, setShowNotFound] = useState(false);
//   const [shopId, setShopId] = useState(null);
//   const [shopName, setShopName] = useState("");
//   const [loading, setLoading] = useState({
//     phone: false,
//     email: false,
//     code: false,
//   });

//   useEffect(() => {
//     const id = localStorage.getItem("id");
//     const name = localStorage.getItem("name");
//     if (id) setShopId(Number(id));
//     if (name) setShopName(name);
//   }, []);

//   const handleSearch = async (type) => {
//     if (type === "phone") {
//       const isValidPhone = /^\d{10,13}$/.test(phone.trim());
//       if (!isValidPhone) {
//         alert("Please enter a valid phone number");
//         return;
//       }
//     }

//     if (type === "email") {
//       const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
//       if (!isValidEmail) {
//         alert("Please enter a valid email address");
//         return;
//       }
//     }

//     if (!shopId) {
//       alert("Shop ID not found. Please log in again.");
//       return;
//     }

//     setLoading((prev) => ({ ...prev, [type]: true }));

//     try {
//       const queryParam =
//         type === "phone"
//           ? `phone=${encodeURIComponent(phone)}`
//           : `email=${encodeURIComponent(email)}`;
//       const endpoint =
//         type === "phone" ? "search_by_phone" : "search_by_email";

//       const response = await fetch(
//         `https://loyalty-backend-java.onrender.com/api/shop/${endpoint}?shopId=${shopId}&${queryParam}`
//       );

//       if (!response.ok) throw new Error("Customer not found");

//       const user = await response.json();

//       const customerData = {
//         name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
//         phone: user.phone,
//         email: user.email,
//         referralCode: "N/A",
//         customerId: user.userId,
//         shopName: shopName || "Shop",
//         shopID: shopId,
//         availableBalance: user.profile?.availablePoints ?? 0,
//       };

//       setScannedResult(customerData);
//       setPhone("");
//       setEmail("");
//       setCode("");
//     } catch (err) {
//       console.error(err);
//       setShowNotFound(true);
//       // alert("User not found or an error occurred.");
//     } finally {
//       setLoading((prev) => ({ ...prev, [type]: false }));
//     }
//   };

//   const handleScan = (scannedValue) => {
//     const dummyData = {
//       name: "Arjun (Scanned)",
//       phone: "63534363464",
//       email: "arjun@ifaceh.com",
//       referralCode: scannedValue,
//       customerId: 29,
//       shopName: shopName || "testShopkeeper",
//       shopID: shopId || 8,
//       availableBalance: 10.0,
//     };

//     setCode(scannedValue);
//     setScannedResult(dummyData);
//     setShowScanner(false);
//   };

//   const handleSendInvite = async () => {
//     const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail.trim());
//     if (!isValidEmail) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     if (!shopId || !shopName) {
//       alert("Shop details not found. Please login again.");
//       return;
//     }

//     setSendingInvite(true);
//     try {
//       const response = await fetch(
//         "https://loyalty-backend-java.onrender.com/api/dashboard/invite",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: inviteEmail,
//             shopId: shopId,
//             shopName: shopName,
//           }),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to send invite");

//       alert("Invite sent successfully!");
//       setInviteEmail("");
//     } catch (err) {
//       console.error(err);
//       alert("Error sending invite.");
//     } finally {
//       setSendingInvite(false);
//     }
//   };

//   return (
//     <>
//       {showScanner ? (
//         <QrScanner onScan={handleScan} onClose={() => setShowScanner(false)} />
//       ) : (
//         <div className="p-6 md:p-10">
//           <div className="flex justify-center">
//             <div className="bg-indigo-600 text-white rounded-xl p-4 md:p-6 mb-10 shadow-2xl">
//               <h1 className="text-3xl md:text-5xl text-center font-black mb-2 tracking-tight">
//                 Shop Name : <span className="text-yellow-300">{shopName || "Shop Name"}</span>
//               </h1>
//               {/* <p className="text-lg text-center font-medium opacity-90">
//                 Shop ID : <span className="font-mono bg-white/20 px-2 py-0.5 rounded-md">{shopId || 0}</span>
//               </p> */}
//             </div>
//           </div>

//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-7xl mx-auto">
//             {/* Referral Code (not connected) */}
//             {/* <div className="rounded-2xl border border-fuchsia-100 bg-white p-6 shadow-lg">
//               <h2 className="text-lg font-semibold text-black-500 mb-3">🔖 Search by Code</h2>
//               <input
//                 type="text"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 placeholder="Referral or Coupon Code"
//                 className="w-full px-4 py-2 border border-fuchsia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400 mb-4"
//               />
//               <button
//                 onClick={() => alert("Code search not implemented")}
//                 disabled={!code.trim()}
//                 className="w-full py-2 rounded-lg text-white font-medium bg-fuchsia-300 cursor-not-allowed"
//               >
//                 Coming Soon
//               </button>
//             </div> */}

//             {/* QR Scanner */}
//             <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-lg text-center">
//               <QrCode className="text-blue-600 mx-auto mb-3" size={36} />
//               <h2 className="text-lg font-semibold mb-2 text-black-500">⚡ Quick Scan</h2>
//               <p className="text-sm text-gray-600 mb-4">Use your camera to instantly identify a customer.</p>
//               <button
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
//                 onClick={() => setShowScanner(true)}
//               >
//                 Open Scanner
//               </button>
//             </div>

//             {/* Phone */}
//             <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-lg">
//               <h2 className="text-lg font-semibold text-black-500 mb-3">📞 Phone Number</h2>
//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="Enter phone number"
//                 className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-3"
//               />
//               <button
//                 onClick={() => handleSearch("phone")}
//                 disabled={!phone.trim() || loading.phone}
//                 className={`w-full py-2 rounded-lg text-white font-medium ${
//                   loading.phone ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
//                 }`}
//               >
//                 {loading.phone ? "Searching..." : "Search"}
//               </button>
//               <p className="text-xs text-gray-500 mt-2">Must be a valid 10-13 digit number.</p>
//             </div>

//             {/* Email */}
//             <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6 shadow-lg">
//               <h2 className="text-lg font-semibold text-black-500 mb-3">📧 Email Address</h2>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter email address"
//                 className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 mb-3"
//               />
//               <button
//                 onClick={() => handleSearch("email")}
//                 disabled={!email.trim() || loading.email}
//                 className={`w-full py-2 rounded-lg text-white font-medium ${
//                   loading.email ? "bg-sky-300" : "bg-sky-600 hover:bg-sky-700"
//                 }`}
//               >
//                 {loading.email ? "Searching..." : "Search"}
//               </button>
//               <p className="text-xs text-gray-500 mt-2">Search by their registered email address.</p>
//             </div>

//             {/* Refer by Email */}
//             <div className="rounded-2xl border border-violet-100 bg-violet-50 p-6 shadow-lg">
//               <h2 className="text-lg font-semibold text-black-500 mb-3">📨 Refer a New Customer</h2>
//               <input
//                 type="email"
//                 value={inviteEmail}
//                 onChange={(e) => setInviteEmail(e.target.value)}
//                 placeholder="Customer's email address"
//                 className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 mb-4"
//               />
//               <button
//                 onClick={handleSendInvite}
//                 disabled={!inviteEmail.trim() || sendingInvite}
//                 className={`w-full py-2 rounded-lg text-white font-medium ${
//                   sendingInvite ? "bg-violet-300" : "bg-violet-600 hover:bg-violet-700"
//                 }`}
//               >
//                 {sendingInvite ? "Sending..." : "Send Invite"}
//               </button>
//               <p className="text-xs text-gray-500 mt-2">
//                 A welcome email will be sent with signup instructions.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Customer Modal */}
//       {scannedResult && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-xl w-full shadow-2xl max-w-sm transition-all duration-300 border-t-8 border-blue-600">
//             <nav className="p-6 pb-2">
//               <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-3">
//                 <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600" />
//                 Customer Verified
//               </h2>
//             </nav>
//             <div className="p-6">
//               <p className="text-3xl font-extrabold text-gray-900 mb-4 border-b border-gray-100 pb-2">
//                 {scannedResult.name || "Customer Name"}
//               </p>

//               {/* Customer Details Section */}
//               <div className="space-y-3 text-gray-700 text-base leading-relaxed border-b border-gray-100 pb-4">
//                 <h3 className="text-sm font-semibold text-blue-500 uppercase">Customer Details:</h3>
//                 <p className="text-sm"><span className="font-semibold text-blue-700">ID:</span> CUST-{scannedResult.customerId}</p>
//                 <p className="text-sm"><span className="font-semibold text-blue-700">Phone:</span> {scannedResult.phone || 'N/A'}</p>
//                 <p className="text-sm"><span className="font-semibold text-blue-700">Email:</span> {scannedResult.email || 'N/A'}</p>
//                 <p className="text-sm"><span className="font-semibold text-blue-700">Shop:</span> {scannedResult.shopName || 'N/A'}</p>
//               </div>

//               {/* Highlighted Balance (Focus Area) */}
//               <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
//                 <p className="text-sm font-medium text-gray-600">Available Reward Balance</p>
//                 <p className="text-4xl font-extrabold text-blue-800 mt-1">
//                   ₹ {scannedResult.availableBalance.toFixed(2)}
//                 </p>
//               </div>

//               <button
//                 className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-lg shadow-blue-200/50 transition-all duration-200 text-lg"
//                 onClick={() => setScannedResult(null)}
//               >
//                 Continue Transaction
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Customer Not Found Modal */}
//       {showNotFound && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-2xl w-full shadow-2xl max-w-sm border-t-8 border-red-600 p-6 transition-all duration-300">
//             <h2 className="text-2xl font-bold mb-4 text-center text-red-700 flex items-center justify-center gap-3">
//               <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600" />
//               Customer Not Found!
//             </h2>
//             <div className="space-y-3 text-gray-700 text-base leading-relaxed text-center">
//               <p className="font-semibold">The customer was not found in the system.</p>
//               <p>Please check the number/email, or use the **Invite** option to sign them up now.</p>
//             </div>
//             <button
//               className="mt-8 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-md transition-all duration-200 text-lg"
//               onClick={() => setShowNotFound(false)}
//             >
//               Close & Try Again
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CustomerLookup;













import React, { useState, useEffect } from "react";
import { Phone, Mail, QrCode } from "lucide-react";
import QrScanner from "./QrScanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faTimesCircle,
  faArrowRotateLeft,
  faDollarSign,
  faUser,
  faCoins,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";

const PRIMARY_COLOR = "blue-700";
const ACCENT_COLOR = "cyan-500";
const SUCCESS_COLOR = "green-600";
const ERROR_COLOR = "red-600";
const INFO_COLOR = "blue-500";

const CustomerLookup = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [sendingInvite, setSendingInvite] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [shopId, setShopId] = useState(null);
  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState({ phone: false, email: false });

  const [foundCustomer, setFoundCustomer] = useState(null);       
  const [scannedData, setScannedData] = useState(null);             
  const [purchaseAmount, setPurchaseAmount] = useState("");
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
  const [showClaimIntentPopup, setShowClaimIntentPopup] = useState(false);
  const [minRewardAmount, setMinRewardAmount] = useState(0);
  const [intentToClaim, setIntentToClaim] = useState(false);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [showConfirmClaimPopup, setShowConfirmClaimPopup] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    if (id) setShopId(Number(id));
    if (name) setShopName(name);
  }, []);

  const playBeep = () => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  };
  const playErrorSound = () => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  };

  const handleSearch = async (type) => {
    let value = type === "phone" ? phone.trim() : email.trim();

    if (type === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length !== 10) {
        alert("Please enter exactly 10 digits (no country code or +)");
        return;
      }
      value = digitsOnly;
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        alert("Please enter a valid email address");
        return;
      }
    }

    if (!shopId) {
      alert("Shop ID not found. Please log in again.");
      return;
    }

    setLoading((prev) => ({ ...prev, [type]: true }));
    setError(null);

    try {
      const query = type === "phone" ? `phone=${value}` : `email=${encodeURIComponent(value)}`;
      const endpoint = type === "phone" ? "search_by_phone" : "search_by_email";

      console.log("Searching with:", { type, query, shopId }); 

      const res = await fetch(
        `https://loyalty-backend-java.onrender.com/api/shop/${endpoint}?shopId=${shopId}&${query}`
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Customer not found");
      }

      const user = await res.json();
      console.log("Backend response:", user);

      const parsed = {
        userId: user.userId,
        userName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        phone: user.phone,
        email: user.email,
        shopId: user.profile?.shopId ?? shopId,
        shopName: shopName,
        availableBalance: user.profile?.availablePoints ?? 0,
        associated: true,
      };

      setFoundCustomer(parsed);
      await handleAfterLookup(parsed);
    } catch (e) {
      console.error("Search failed:", e);
      setShowNotFound(true);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
      if (type === "phone") setPhone("");
      else setEmail("");
    }
  };

  const handleSendInvite = async () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail.trim());
    if (!isValid) return alert("Please enter a valid email address.");
    if (!shopId || !shopName) return alert("Shop details not found. Please login again.");

    setSendingInvite(true);
    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/dashboard/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, shopId, shopName }),
      });
      if (!res.ok) throw new Error("Failed");
      alert("Invite sent successfully!");
      setInviteEmail("");
    } catch {
      alert("Error sending invite.");
    } finally {
      setSendingInvite(false);
    }
  };

  const handleAfterLookup = async (parsed) => {
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
        const err = await res.json();
        throw new Error(err.message || "Verification failed");
      }
      const verified = await res.json();
      const full = { ...parsed, ...verified };
      setScannedData(full);
      setAssociated(verified.associated ?? true);
      setGuidance("Customer found! Enter purchase amount.");

      // eligibility
      setIsCheckingEligibility(true);
      await checkRewardEligibility(full.userId, parsed.shopId);
      setIsCheckingEligibility(false);
    } catch (e) {
      setError("Verification failed.");
      setShowErrorPopup(true);
      playErrorSound();
    }
  };

  const checkRewardEligibility = async (userId, shopId) => {
    try {
      const url = `https://loyalty-backend-java.onrender.com/api/qrcode/check-eligible?userId=${userId}&shopId=${shopId}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Eligibility check failed");
      const data = await res.json();
      setEligibleReward(data.eligibleAmount || 0);
      setMinRewardAmount(data.minRewardAmount || 0);
      if (data.eligibleAmount > 0) setShowClaimIntentPopup(true);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setShowErrorPopup(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const amt = parseFloat(purchaseAmount);
    if (isNaN(amt) || amt <= 0) {
      setError("Enter a valid amount > $0");
      setShowErrorPopup(true);
      return;
    }
    if (intentToClaim && amt < minRewardAmount) {
      setError(`Amount must be ≥ $${minRewardAmount.toFixed(2)} to claim`);
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
          dollarAmount: Math.round(amt),
          intentToClaim,
        }),
      });
      if (!res.ok) throw new Error((await res.text()) || "Failed");
      const preview = await res.json();
      setPreviewData(preview);
      setSuccessAnimation(true);
      setTimeout(() => setSuccessAnimation(false), 1000);
      setShowPreviewPopup(true);
    } catch (e) {
      setError(e.message || "Failed");
      setShowErrorPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmProcess = async () => {
    if (!previewData || !scannedData) return;
    setIsConfirming(true);

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/qrcode/process-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: scannedData.userId,
          shopId: scannedData.shopId,
          dollarAmount: previewData.originalDollarAmount,
          intentToClaim,
        }),
      });
      if (!res.ok) throw new Error((await res.text()) || "Failed");
      const result = await res.json();

      setScannedData((prev) => ({ ...prev, verifiedBalance: result.newBalance }));

      setSuccessTitle("PURCHASE PROCESSED");
      setSuccessMessage(
        result.claimed
          ? `Discount of $${result.claimedAmount.toFixed(2)} applied. Net: $${result.adjustedDollarAmount}. Points: ${result.adjustedPoints}. New balance: ${result.newBalance}.`
          : `$${result.adjustedDollarAmount || previewData.originalDollarAmount} purchased. Points Earned: ${result.adjustedPoints || result.earnedPoints}${
              result.signupBonusAdded > 0 ? ` + Signup: ${result.signupBonusAdded}` : ""
            }. New balance: ${result.newBalance}.`
      );
      setSuccessIconColor(SUCCESS_COLOR);
      setShowSuccessPopup(true);
      setShowPreviewPopup(false);
      setPreviewData(null);
      setPurchaseAmount("");
    } catch (e) {
      setError(e.message || "Failed");
      setShowErrorPopup(true);
    } finally {
      setIsConfirming(false);        
    }
  };

  const resetAll = () => {
    setFoundCustomer(null);
    setScannedData(null);
    setPurchaseAmount("");
    setError(null);
    setGuidance("");
    setSuccessAnimation(false);
    setAssociated(true);
    setShowErrorPopup(false);
    setShowSuccessPopup(false);
    setEligibleReward(0);
    setShowClaimIntentPopup(false);
    setIntentToClaim(false);
    setMinRewardAmount(0);
    setShowPreviewPopup(false);
    setPreviewData(null);
    setIsCheckingEligibility(false);
    setShowConfirmClaimPopup(false);
  };

  const isPopupOpen =
    showErrorPopup ||
    showSuccessPopup ||
    showClaimIntentPopup ||
    showPreviewPopup ||
    showConfirmClaimPopup ||
    isCheckingEligibility;

  if (showScanner) {
    return <QrScanner onClose={() => setShowScanner(false)} />;
  }

  if (scannedData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 z-50">
        <div className="relative w-full max-w-2xl px-6">
          {!isPopupOpen && (
            <div className={`bg-white shadow-2xl w-full max-h-[90vh] flex flex-col z-10 border-t-${PRIMARY_COLOR}`}>
              <nav className={`bg-${PRIMARY_COLOR} text-white px-6 py-4 flex justify-between items-center sticky top-0 z-20`}>
                <h2 className="text-2xl font-bold">Loyalty Purchase</h2>
                <button
                  onClick={resetAll}
                  className={`text-white p-2 rounded-full hover:bg-blue-800 transition duration-200`}
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faTimesCircle} className="w-6 h-6" />
                </button>
              </nav>

              <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-between">
                <div className="w-full bg-white border border-gray-200 rounded-xl p-6 text-gray-800 shadow-lg">
                  <h3 className={`text-xl font-bold text-${PRIMARY_COLOR} border-b-2 border-gray-200 pb-2 mb-4 flex items-center`}>
                    <FontAwesomeIcon icon={faIdCard} className={`text-${ACCENT_COLOR} mr-3`} />
                    Transaction Details
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-r border-gray-200 pr-4">
                      <h4 className="text-md font-semibold text-gray-700 mb-2">Customer Info:</h4>
                      <p className="text-sm mb-2"><strong className="text-gray-600">Name:</strong> {scannedData.userName || "N/A"}</p>
                      <p className="text-sm mb-2"><strong className="text-gray-600">ID:</strong> CUST-{scannedData.userId}</p>
                      <p className="text-sm mb-2"><strong className="text-gray-600">Shop:</strong> <span className={`font-semibold text-${SUCCESS_COLOR}`}>{scannedData.shopName}</span></p>
                      <p className="text-sm mb-2"><strong className="text-gray-600">Email:</strong> {scannedData.email || "N/A"}</p>
                      <p className="text-sm"><strong className="text-gray-600">Phone:</strong> {scannedData.phone || "N/A"}</p>
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
                          const v = e.target.value;
                          if (v === "" || parseFloat(v) <= 0) setPurchaseAmount("");
                          else setPurchaseAmount(v);
                        }}
                        required
                        className={`w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-2xl font-bold text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-${ACCENT_COLOR} focus:border-${ACCENT_COLOR} outline-none transition duration-150 shadow-inner`}
                      />
                    </div>

                    {!associated && (
                      <p className={`text-sm text-${INFO_COLOR} font-medium p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center`}>
                        <FontAwesomeIcon icon={faUser} className={`text-${INFO_COLOR} mr-2`} />
                        New customer! Profile will be created automatically.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || !purchaseAmount || parseFloat(purchaseAmount) <= 0}
                      className={`bg-${PRIMARY_COLOR} hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-md transition duration-200 disabled:opacity-60 text-lg`}
                    >
                      {isSubmitting ? "PROCESSING..." : "Submit Purchase & Preview Points"}
                    </button>
                  </form>
                </div>

                <div className="mt-6">
                  <button
                    onClick={resetAll}
                    className={`flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-300 hover:bg-gray-200 shadow-sm transition duration-200`}
                  >
                    <FontAwesomeIcon icon={faArrowRotateLeft} /> Search Another Customer
                  </button>
                </div>
              </div>
            </div>
          )}

          {showSuccessPopup && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <div className={`bg-white p-8 rounded-lg shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${SUCCESS_COLOR} animate-fade-in`}>
                <FontAwesomeIcon icon={faCheckCircle} className={`text-${successIconColor} text-5xl mb-4`} />
                <h3 className={`text-2xl font-bold text-gray-800 mb-2`}>{successTitle}</h3>
                {successMessage && <p className="text-md text-gray-600 mt-1 mb-4">{successMessage}</p>}
                <button
                  onClick={() => { setShowSuccessPopup(false); resetAll(); }}
                  className={`mt-4 w-full bg-${PRIMARY_COLOR} hover:bg-blue-800 text-white font-semibold px-5 py-3 rounded-xl transition duration-200`}
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {showErrorPopup && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <div className={`bg-white p-8 rounded-lg shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${ERROR_COLOR} animate-fade-in`}>
                <FontAwesomeIcon icon={faExclamationTriangle} className={`text-${ERROR_COLOR} text-5xl mb-4`} />
                <h3 className="text-2xl font-bold text-red-700 mb-2">Operation Failed</h3>
                <p className="text-md text-gray-600 mt-1 mb-4">{error || "An error occurred."}</p>
                <button
                  onClick={() => { setShowErrorPopup(false); setError(null); resetAll(); }}
                  className={`mt-4 w-full bg-${ERROR_COLOR} hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-xl transition duration-200`}
                >
                  Close & Restart
                </button>
              </div>
            </div>
          )}

          {showClaimIntentPopup && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <div className={`bg-white p-8 rounded-lg shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${ACCENT_COLOR} animate-fade-in`}>
                <FontAwesomeIcon icon={faDollarSign} className={`text-${ACCENT_COLOR} text-5xl mb-4`} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Milestone Reward Eligible!</h3>
                <p className="text-md text-gray-700 mb-3">
                  Claim a <span className={`text-3xl font-extrabold text-${SUCCESS_COLOR}`}>${eligibleReward.toFixed(2)}</span> reward.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Purchase at least <span className={`font-bold text-${PRIMARY_COLOR}`}>${minRewardAmount.toFixed(2)}</span> to qualify.
                </p>
                <button
                  onClick={() => { setShowClaimIntentPopup(false); setShowConfirmClaimPopup(true); }}
                  className={`w-full bg-${SUCCESS_COLOR} hover:bg-green-700 text-white font-bold px-5 py-3 rounded-xl shadow-md transition duration-200 mb-3`}
                >
                  Yes, Proceed to Claim
                </button>
                <button
                  onClick={() => { setIntentToClaim(false); setShowClaimIntentPopup(false); }}
                  className={`w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-3 rounded-xl transition duration-200`}
                >
                  No, Just Earn Points
                </button>
              </div>
            </div>
          )}

          {showConfirmClaimPopup && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <div className={`bg-white p-8 rounded-lg shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${ACCENT_COLOR} animate-fade-in`}>
                <FontAwesomeIcon icon={faDollarSign} className={`text-${ACCENT_COLOR} text-5xl mb-4`} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Are you sure?</h3>
                <p className="text-md text-gray-700 mb-4">Claim the ${eligibleReward.toFixed(2)} reward?</p>
                <button
                  onClick={() => { setIntentToClaim(true); setShowConfirmClaimPopup(false); }}
                  className={`w-full bg-${SUCCESS_COLOR} hover:bg-green-700 text-white font-bold px-5 py-3 rounded-xl shadow-md transition duration-200 mb-3`}
                >
                  Yes, Claim
                </button>
                <button
                  onClick={() => { setIntentToClaim(false); setShowConfirmClaimPopup(false); }}
                  className={`w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-3 rounded-xl transition duration-200`}
                >
                  No, Cancel
                </button>
              </div>
            </div>
          )}

          {showPreviewPopup && previewData && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <div className={`bg-white p-8 rounded-lg shadow-2xl text-center w-full max-w-sm border-t-8 border-t-${INFO_COLOR} animate-fade-in`}>
                <FontAwesomeIcon icon={faDollarSign} className={`text-${INFO_COLOR} text-5xl mb-4`} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirm Purchase</h3>
                <p className="text-md text-gray-700 mb-3">
                  Amount: <span className={`font-bold text-${PRIMARY_COLOR}`}>${previewData.originalDollarAmount}</span>
                </p>
                <p className="text-md text-gray-700 mb-3">
                  Points Earned: <span className={`font-bold text-${ACCENT_COLOR}`}>
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
                    Signup Bonus: <span className={`font-bold text-${SUCCESS_COLOR}`}>{previewData.signupBonus}</span>
                  </p>
                )}
                <button
                  onClick={handleConfirmProcess}
                  disabled={isConfirming}                     
                  className={`w-full bg-${SUCCESS_COLOR} hover:bg-green-700 text-white font-bold px-5 py-3 rounded-xl shadow-md transition duration-200 mb-3 disabled:opacity-60`}
                >
                  {isConfirming ? "Processing…" : "Process Purchase"}
                </button>
                <button
                  onClick={() => { setShowPreviewPopup(false); setPreviewData(null); }}
                  className={`w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-3 rounded-xl transition duration-200`}
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
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-center mt-10 px-4">
        <div className="text-black border-2 rounded-lg p-4 md:p-6 mb-20">
          <h1 className="text-3xl md:text-5xl text-center font-black mb-2 tracking-tight">
            Shop Name : <span className="text-blue-600">{shopName || "Shop Name"}</span>
          </h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-6xl mx-auto">
        {/* QR Scanner */}
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-lg text-center">
          <QrCode className="text-blue-600 mx-auto mb-3" size={36} />
          <h2 className="text-lg font-semibold mb-3 text-black-500">⚡ Quick Scan</h2>
          <p className="text-sm text-gray-600 mb-6">Use camera to identify instantly.</p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            onClick={() => setShowScanner(true)}
          >
            Open Scanner
          </button>
        </div>
     
        {/* Phone */}
        <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-black-500 mb-5">📞 Phone Number</h2>
          <input
            type="text"
            inputMode="numeric"
            value={phone}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ""); 
              if (value.length > 10) value = value.slice(0, 10); 
              setPhone(value);
            }}
            placeholder="Enter 10-digit mobile number"
            maxLength={10}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-6 ${
              phone && phone.length !== 10 ? "border-red-400 focus:ring-red-400" : "border-indigo-300 focus:ring-indigo-400"
            }`}
          />
          {phone && phone.length !== 10 && (
            <p className="text-xs text-red-600 mt-1">Must be exactly 10 digits</p>
          )}
          <button
            onClick={() => handleSearch("phone")}
            disabled={!phone.trim() || loading.phone}
            className={`w-full py-2 rounded-lg text-white font-medium ${
              loading.phone ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading.phone ? "Searching..." : "Search"}
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Must be a valid 10 digit number.
          </p>
        </div>

        {/* Email */}
        <div className="rounded-lg border border-sky-100 bg-sky-50 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-black-500 mb-5">📧 Email Address</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 mb-6"
          />
          <button
            onClick={() => handleSearch("email")}
            disabled={!email.trim() || loading.email}
            className={`w-full py-2 rounded-lg text-white font-medium ${
              loading.email ? "bg-sky-300" : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            {loading.email ? "Searching..." : "Search"}
          </button>
          <p className="text-xs text-gray-500 mt-3">Search by registered email.</p>
        </div>

        {/* Invite */}
        <div className="rounded-lg border border-violet-100 bg-violet-50 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-black-500 mb-5">📨 Refer New Customer</h2>
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Customer's email address"
            className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 mb-6"
          />
          <button
            onClick={handleSendInvite}
            disabled={!inviteEmail.trim() || sendingInvite}
            className={`w-full py-2 rounded-lg text-white font-medium ${
              sendingInvite ? "bg-violet-300" : "bg-violet-600 hover:bg-violet-700"
            }`}
          >
            {sendingInvite ? "Sending..." : "Send Invite"}
          </button>
          <p className="text-xs text-gray-500 mt-3">Welcome email with signup link.</p>
        </div>
      </div>

      {/* Not Found Modal */}
      {showNotFound && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg w-full shadow-2xl max-w-sm border-t-8 border-red-600 p-6 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-center text-red-700 flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600" />
              Customer Not Found!
            </h2>
            <div className="space-y-3 text-gray-700 text-base leading-relaxed text-center">
              <p className="font-semibold">The customer was not found.</p>
              <p>Check the details or use **Invite** to sign them up.</p>
            </div>
            <button
              className="mt-8 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-md transition-all duration-200 text-lg"
              onClick={() => setShowNotFound(false)}
            >
              Close & Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerLookup;