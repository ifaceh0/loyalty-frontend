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
//             <div className="max-w-[800px] w-full rounded-xl p-4 mb-8">
//               <h1 className="text-3xl md:text-4xl text-center font-bold text-gray-900 mb-4">
//                 Shop Name : {shopName || "Shop Name"}
//               </h1>
//               <p className="text-lg text-center text-gray-600 mb-8">
//                 Shop ID : {shopId || 0}
//               </p>
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
//               <h2 className="text-lg font-semibold mb-2 text-black-500">📷 Scan Qr Code</h2>
//               <p className="text-sm text-gray-600 mb-4">Scan QR or barcode to lookup</p>
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
//               <p className="text-xs text-gray-500 mt-2">Used for identity verification</p>
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
//               <p className="text-xs text-gray-500 mt-2">Used for identity verification</p>
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
//                 An email will be sent to your email address.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Customer Modal */}
//       {scannedResult && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl w-full shadow-xl max-w-[400px] transition-all duration-300 transform hover:scale-[1.01]">
//             <nav className="bg-purple-700 text-white px-6 py-2 rounded-t-xl flex justify-between items-center">
//               <h2 className="text-xl font-semibold text-center flex items-center gap-2">
//                 <FontAwesomeIcon icon={faCheckCircle} className="text-white text-lg" />
//                 Customer Matched
//               </h2>
//             </nav>
//             <div className="p-6">
//               <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
//                 <p><span className="font-semibold text-purple-600">Customer ID :</span> CUST-{scannedResult.customerId}</p>
//                 <p><span className="font-semibold text-purple-600">Customer Name :</span> {scannedResult.name}</p>
//                 <p><span className="font-semibold text-purple-600">Customer Email :</span> {scannedResult.email}</p>
//                 <p><span className="font-semibold text-purple-600">Customer Phone :</span> {scannedResult.phone}</p>
//                 <p><span className="font-semibold text-purple-600">Shop Name :</span> {scannedResult.shopName}</p>
//                 <p><span className="font-semibold text-purple-600">Available Balance :</span> ₹ {scannedResult.availableBalance}</p>
//               </div>
//               <button
//                 className="mt-8 w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow-md transition-all duration-200"
//                 onClick={() => setScannedResult(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Customer Not Found Modal */}
//       {showNotFound && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl w-full shadow-xl max-w-[400px] border border-red-300 p-6 transition-all duration-300 transform hover:scale-[1.01]">
//             <h2 className="text-xl font-semibold mb-8 text-center text-red-800 flex items-center justify-center gap-2">
//               <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600 text-lg" />
//               Customer Not Found
//             </h2>
//             <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
//               <p className="text-center">No customer was found !</p>
//               <p className="text-center">Please try again or invite the customer to join.</p>
//             </div>
//             <button
//               className="mt-8 w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md transition-all duration-200"
//               onClick={() => setShowNotFound(false)}
//             >
//               Close
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
import { faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const CustomerLookup = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [sendingInvite, setSendingInvite] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false);
  const [shopId, setShopId] = useState(null);
  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState({
    phone: false,
    email: false,
    code: false,
  });

  useEffect(() => {
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    if (id) setShopId(Number(id));
    if (name) setShopName(name);
  }, []);

  const handleSearch = async (type) => {
    if (type === "phone") {
      const isValidPhone = /^\d{10,13}$/.test(phone.trim());
      if (!isValidPhone) {
        alert("Please enter a valid phone number");
        return;
      }
    }

    if (type === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!isValidEmail) {
        alert("Please enter a valid email address");
        return;
      }
    }

    if (!shopId) {
      alert("Shop ID not found. Please log in again.");
      return;
    }

    setLoading((prev) => ({ ...prev, [type]: true }));

    try {
      const queryParam =
        type === "phone"
          ? `phone=${encodeURIComponent(phone)}`
          : `email=${encodeURIComponent(email)}`;
      const endpoint =
        type === "phone" ? "search_by_phone" : "search_by_email";

      const response = await fetch(
        `https://loyalty-backend-java.onrender.com/api/shop/${endpoint}?shopId=${shopId}&${queryParam}`
      );

      if (!response.ok) throw new Error("Customer not found");

      const user = await response.json();

      const customerData = {
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        phone: user.phone,
        email: user.email,
        referralCode: "N/A",
        customerId: user.userId,
        shopName: shopName || "Shop",
        shopID: shopId,
        availableBalance: user.profile?.availablePoints ?? 0,
      };

      setScannedResult(customerData);
      setPhone("");
      setEmail("");
      setCode("");
    } catch (err) {
      console.error(err);
      setShowNotFound(true);
      // alert("User not found or an error occurred.");
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleScan = (scannedValue) => {
    const dummyData = {
      name: "Arjun (Scanned)",
      phone: "63534363464",
      email: "arjun@ifaceh.com",
      referralCode: scannedValue,
      customerId: 29,
      shopName: shopName || "testShopkeeper",
      shopID: shopId || 8,
      availableBalance: 10.0,
    };

    setCode(scannedValue);
    setScannedResult(dummyData);
    setShowScanner(false);
  };

  const handleSendInvite = async () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail.trim());
    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!shopId || !shopName) {
      alert("Shop details not found. Please login again.");
      return;
    }

    setSendingInvite(true);
    try {
      const response = await fetch(
        "https://loyalty-backend-java.onrender.com/api/dashboard/invite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: inviteEmail,
            shopId: shopId,
            shopName: shopName,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to send invite");

      alert("Invite sent successfully!");
      setInviteEmail("");
    } catch (err) {
      console.error(err);
      alert("Error sending invite.");
    } finally {
      setSendingInvite(false);
    }
  };

  return (
    <>
      {showScanner ? (
        <QrScanner onScan={handleScan} onClose={() => setShowScanner(false)} />
      ) : (
        <div className="p-6 md:p-10">
          <div className="flex justify-center">
            <div className="bg-blue-600 text-white rounded-xl p-4 md:p-6 mb-10 shadow-2xl">
              <h1 className="text-3xl md:text-5xl text-center font-black mb-2 tracking-tight">
                Shop Name : <span className="text-yellow-300">{shopName || "Shop Name"}</span>
              </h1>
              <p className="text-lg text-center font-medium opacity-90">
                Shop ID : <span className="font-mono bg-white/20 px-2 py-0.5 rounded-md">{shopId || 0}</span>
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-7xl mx-auto">
            {/* Referral Code (not connected) */}
            {/* <div className="rounded-2xl border border-fuchsia-100 bg-white p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-black-500 mb-3">🔖 Search by Code</h2>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Referral or Coupon Code"
                className="w-full px-4 py-2 border border-fuchsia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400 mb-4"
              />
              <button
                onClick={() => alert("Code search not implemented")}
                disabled={!code.trim()}
                className="w-full py-2 rounded-lg text-white font-medium bg-fuchsia-300 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div> */}

            {/* QR Scanner */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-lg text-center">
              <QrCode className="text-blue-600 mx-auto mb-3" size={36} />
              <h2 className="text-lg font-semibold mb-2 text-black-500">⚡ Quick Scan</h2>
              <p className="text-sm text-gray-600 mb-4">Use your camera to instantly identify a customer.</p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                onClick={() => setShowScanner(true)}
              >
                Open Scanner
              </button>
            </div>

            {/* Phone */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-black-500 mb-3">📞 Phone Number</h2>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-3"
              />
              <button
                onClick={() => handleSearch("phone")}
                disabled={!phone.trim() || loading.phone}
                className={`w-full py-2 rounded-lg text-white font-medium ${
                  loading.phone ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading.phone ? "Searching..." : "Search"}
              </button>
              <p className="text-xs text-gray-500 mt-2">Must be a valid 10-13 digit number.</p>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-black-500 mb-3">📧 Email Address</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 mb-3"
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
              <p className="text-xs text-gray-500 mt-2">Search by their registered email address.</p>
            </div>

            {/* Refer by Email */}
            <div className="rounded-2xl border border-violet-100 bg-violet-50 p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-black-500 mb-3">📨 Refer a New Customer</h2>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Customer's email address"
                className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 mb-4"
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
              <p className="text-xs text-gray-500 mt-2">
                A welcome email will be sent with signup instructions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Customer Modal */}
      {scannedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl w-full shadow-2xl max-w-sm transition-all duration-300 border-t-8 border-blue-600">
            <nav className="p-6 pb-2">
              <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600" />
                Customer Verified
              </h2>
            </nav>
            <div className="p-6">
              <p className="text-3xl font-extrabold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                {scannedResult.name || "Customer Name"}
              </p>

              {/* Customer Details Section */}
              <div className="space-y-3 text-gray-700 text-base leading-relaxed border-b border-gray-100 pb-4">
                <h3 className="text-sm font-semibold text-blue-500 uppercase">Customer Details:</h3>
                <p className="text-sm"><span className="font-semibold text-blue-700">ID:</span> CUST-{scannedResult.customerId}</p>
                <p className="text-sm"><span className="font-semibold text-blue-700">Phone:</span> {scannedResult.phone || 'N/A'}</p>
                <p className="text-sm"><span className="font-semibold text-blue-700">Email:</span> {scannedResult.email || 'N/A'}</p>
                <p className="text-sm"><span className="font-semibold text-blue-700">Shop:</span> {scannedResult.shopName || 'N/A'}</p>
              </div>

              {/* Highlighted Balance (Focus Area) */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-gray-600">Available Reward Balance</p>
                <p className="text-4xl font-extrabold text-blue-800 mt-1">
                  ₹ {scannedResult.availableBalance.toFixed(2)}
                </p>
              </div>

              <button
                className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-lg shadow-blue-200/50 transition-all duration-200 text-lg"
                onClick={() => setScannedResult(null)}
              >
                Continue Transaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Not Found Modal */}
      {showNotFound && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full shadow-2xl max-w-sm border-t-8 border-red-600 p-6 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-center text-red-700 flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600" />
              Customer Not Found!
            </h2>
            <div className="space-y-3 text-gray-700 text-base leading-relaxed text-center">
              <p className="font-semibold">The customer was not found in the system.</p>
              <p>Please check the number/email, or use the **Invite** option to sign them up now.</p>
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
    </>
  );
};

export default CustomerLookup;