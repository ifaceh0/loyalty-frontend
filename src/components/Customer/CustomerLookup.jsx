// import React, { useState, useEffect } from "react";
// import { Phone, Mail, QrCode } from "lucide-react";
// import QrScanner from "./QrScanner";

// const CustomerLookup = () => {
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [inviteEmail, setInviteEmail] = useState(""); // ✅ ADDED
//   const [sendingInvite, setSendingInvite] = useState(false); // ✅ ADDED
//   const [showScanner, setShowScanner] = useState(false);
//   const [scannedResult, setScannedResult] = useState(null);
//   const [shopId, setShopId] = useState(null); // ✅ ADDED
//   const [shopName, setShopName] = useState(""); // ✅ ADDED

//   const [loading, setLoading] = useState({
//     phone: false,
//     email: false,
//     code: false,
//   });

//   // ✅ HINT: Fetch shop info from localStorage
//   useEffect(() => {
//     const id = localStorage.getItem("id");
//     const name = localStorage.getItem("name");
//     if (id) setShopId(Number(id));
//     if (name) setShopName(name);
//   }, []);

//   const handleSearch = (type) => {
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

//     if (type === "code" && !code.trim()) {
//       alert("Please enter a valid code");
//       return;
//     }

//     setLoading((prev) => ({ ...prev, [type]: true }));
//     console.log(`${type} search started...`);

//     setTimeout(() => {
//       // Integrate backend  here
//       const dummyData = {
//         name: "Arjun",
//         phone: phone || "63534363464",
//         email: email || "arjun@ifaceh.com",
//         referralCode: code || "R000839210537",
//         customerId: 29,
//         shopName: shopName || "testShopkeeper", 
//         shopID: shopId || 8,
//         availableBalance: 10.0,
//       };

//       console.log(`${type} searched with value:`, { phone, email, code }[type]);
//       setScannedResult(dummyData);
//       setLoading((prev) => ({ ...prev, [type]: false }));

//       // Reset inputs
//       setPhone("");
//       setEmail("");
//       setCode("");
//     }, 1500);
//   };

//   const handleScan = (scannedValue) => {
//     // TODO: Integrate backend here using scannedValue
//     const dummyData = {
//       name: "Arjun (Scanned)",
//       phone: "63534363464",
//       email: "arjun@ifaceh.com",
//       referralCode: scannedValue,
//       customerId: 29,
//       shopName: shopName || "testShopkeeper", // ✅ dynamic
//       shopID: shopId || 8, // ✅ dynamic
//       availableBalance: 10.0,
//     };

//     setCode(scannedValue);
//     setScannedResult(dummyData);
//     setShowScanner(false);
//   };

//   // ✅ ADDED: Refer via Email Handler
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

//       if (!response.ok) {
//         throw new Error("Failed to send invite");
//       }

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
//           <h1 className="text-3xl font-bold text-center text-black-700 mb-1">{shopName || "Shop Name"}</h1>
//           <p className="text-center text-gray-500 mb-8">Shop ID: {shopId || 0}</p>

//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-7xl mx-auto">
//             {/* Referral Code */}
//             <div className="rounded-2xl border border-fuchsia-100 bg-white p-6 shadow-lg">
//               <h2 className="text-lg font-semibold text-black-500 mb-3">🔖 Search by Code</h2>
//               <input
//                 type="text"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 placeholder="Referral or Coupon Code"
//                 className="w-full px-4 py-2 border border-fuchsia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400 mb-4"
//               />
//               <button
//                 onClick={() => handleSearch("code")}
//                 disabled={!code.trim() || loading.code}
//                 className={`w-full py-2 rounded-lg text-white font-medium ${
//                   loading.code ? "bg-fuchsia-300" : "bg-fuchsia-600 hover:bg-fuchsia-700"
//                 }`}
//               >
//                 {loading.code ? "Searching..." : "Search"}
//               </button>
//             </div>

//             {/* Phone */}
//             <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-lg">
//               <div className="flex items-center text-black-500 mb-3">
//                 {/* <Phone className="mr-2" /> */}
//                 <h2 className="text-lg font-semibold">📞 Phone Number</h2>
//               </div>
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
//               <div className="flex items-center text-black-500 mb-3">
//                 {/* <Mail className="mr-2" /> */}
//                 <h2 className="text-lg font-semibold">📧 Email Address</h2>
//               </div>
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
//               <p className="text-xs text-gray-500 mt-2">Verification link will be sent</p>
//             </div>

//             {/* QR Scanner */}
//             <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-lg text-center">
//               <QrCode className="text-blue-600 mx-auto mb-3" size={36} />
//               <h2 className="text-lg font-semibold mb-2 text-black-500">📷 Scan Code</h2>
//               <p className="text-sm text-gray-600 mb-4">Scan QR or barcode to lookup</p>
//               <button
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
//                 onClick={() => setShowScanner(true)}
//               >
//                 Open Scanner
//               </button>
//             </div>

//             {/* ✅ ADDED: Refer via Email */}
//             <div className="rounded-2xl border border-violet-100 bg-violet-50 p-6 shadow-lg">
//               <h2 className="text-lg font-semibold text-black-500 mb-3">
//                 📨 Refer a New Customer
//               </h2>
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
//                   sendingInvite
//                     ? "bg-violet-300"
//                     : "bg-violet-600 hover:bg-violet-700"
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

//       {/* Modal Result */}
//       {scannedResult && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="bg-white rounded-2xl p-6 shadow-2xl w-[90%] max-w-md border border-green-100">
//             <h2 className="text-xl font-semibold mb-4 text-center text-green-700">✅ Customer Found</h2>
//             <div className="space-y-2 text-gray-700 text-sm">
//               <p><strong>Name:</strong> {scannedResult.name}</p>
//               <p><strong>Phone:</strong> {scannedResult.phone}</p>
//               <p><strong>Email:</strong> {scannedResult.email}</p>
//               <p><strong>Referral Code:</strong> {scannedResult.referralCode}</p>
//               <p><strong>Customer ID:</strong> {scannedResult.customerId}</p>
//               <p><strong>Shop:</strong> {scannedResult.shopName} (ID: {scannedResult.shopID})</p>
//               <p><strong>Balance:</strong> ₹{scannedResult.availableBalance}</p>
//             </div>
//             <button
//               className="mt-5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg w-full font-medium"
//               onClick={() => setScannedResult(null)}
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




// import React, { useState, useEffect } from "react";
// import { QrCode } from "lucide-react";
// import QrScanner from "./QrScanner";

// const BACKEND_BASE_URL = "https://loyalty-backend-java.onrender.com/api/shop";

// const CustomerLookup = () => {
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [inviteEmail, setInviteEmail] = useState("");
//   const [sendingInvite, setSendingInvite] = useState(false);
//   const [showScanner, setShowScanner] = useState(false);
//   const [scannedResult, setScannedResult] = useState(null);
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

//     setLoading((prev) => ({ ...prev, [type]: true }));

//     try {
//       const url =
//         type === "email"
//           ? `${BACKEND_BASE_URL}/email?email=${email.trim()}`
//           : `${BACKEND_BASE_URL}/phonenumber?phone=${phone.trim()}`;

//       const res = await fetch(url);
//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "User not found");
//       }

//       const formatted = {
//         name: data.firstName + " " + data.lastName,
//         phone: data.phoneNumber,
//         email: data.email,
//         referralCode: code || "N/A",
//         customerId: data.userId,
//         shopName: shopName || "Your Shop",
//         shopID: shopId || 0,
//         availableBalance: data.availablePoints,
//       };

//       setScannedResult(formatted);
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Something went wrong");
//     } finally {
//       setLoading((prev) => ({ ...prev, [type]: false }));
//       setPhone("");
//       setEmail("");
//       setCode("");
//     }
//   };

//   const handleScan = (scannedValue) => {
//     const dummyData = {
//       name: "Scanned User",
//       phone: "0000000000",
//       email: "scanned@example.com",
//       referralCode: scannedValue,
//       customerId: 0,
//       shopName: shopName,
//       shopID: shopId,
//       availableBalance: 0,
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
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: inviteEmail,
//             shopId,
//             shopName,
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
//           <h1 className="text-3xl font-bold text-center text-black-700 mb-1">
//             {shopName || "Shop Name"}
//           </h1>
//           <p className="text-center text-gray-500 mb-8">Shop ID: {shopId || 0}</p>

//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-7xl mx-auto">
//             {/* Code Search */}
//             <div className="rounded-2xl border border-fuchsia-100 bg-white p-6 shadow-lg">
//               <h2 className="text-lg font-semibold text-black-500 mb-3">🔖 Search by Code</h2>
//               <input
//                 type="text"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 placeholder="Referral or Coupon Code"
//                 className="w-full px-4 py-2 border border-fuchsia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400 mb-4"
//               />
//               <button
//                 onClick={() => handleSearch("code")}
//                 disabled={!code.trim()}
//                 className="w-full py-2 rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-700 font-medium"
//               >
//                 Search
//               </button>
//             </div>

//             {/* Phone Search */}
//             <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-lg">
//               <h2 className="text-lg font-semibold mb-3 text-black-500">📞 Phone Number</h2>
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

//             {/* Email Search */}
//             <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6 shadow-lg">
//               <h2 className="text-lg font-semibold mb-3 text-black-500">📧 Email Address</h2>
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
//               <p className="text-xs text-gray-500 mt-2">Verification link will be sent</p>
//             </div>

//             {/* QR Scanner */}
//             <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-lg text-center">
//               <QrCode className="text-blue-600 mx-auto mb-3" size={36} />
//               <h2 className="text-lg font-semibold mb-2 text-black-500">📷 Scan Code</h2>
//               <p className="text-sm text-gray-600 mb-4">Scan QR or barcode to lookup</p>
//               <button
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
//                 onClick={() => setShowScanner(true)}
//               >
//                 Open Scanner
//               </button>
//             </div>

//             {/* Refer via Email */}
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
//               <p className="text-xs text-gray-500 mt-2">An invite email will be sent to this address.</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Result Modal */}
//       {scannedResult && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="bg-white rounded-2xl p-6 shadow-2xl w-[90%] max-w-md border border-green-100">
//             <h2 className="text-xl font-semibold mb-4 text-center text-green-700">✅ Customer Found</h2>
//             <div className="space-y-2 text-gray-700 text-sm">
//               <p><strong>Name : </strong> {scannedResult.name}</p>
//               <p><strong>Phone : </strong> {scannedResult.phone}</p>
//               <p><strong>Email : </strong> {scannedResult.email}</p>
//               {/* <p><strong>Referral Code:</strong> {scannedResult.referralCode}</p> */}
//               <p><strong>Customer ID : </strong>CUST-{scannedResult.customerId}</p>
//               <p><strong>Shop Name : </strong> {scannedResult.shopName}</p>
//               <p><strong>Available Balance : </strong> ₹{scannedResult.availableBalance}</p>
//             </div>
//             <button
//               className="mt-5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg w-full font-medium"
//               onClick={() => setScannedResult(null)}
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
import { QrCode } from "lucide-react";
import QrScanner from "./QrScanner";

const BACKEND_BASE_URL = "https://loyalty-backend-java.onrender.com/api/shop";

const CustomerLookup = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [sendingInvite, setSendingInvite] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
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
        window.alert("Please enter a valid phone number");
        return;
      }
    }

    if (type === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!isValidEmail) {
        window.alert("Please enter a valid email address");
        return;
      }
    }

    setLoading((prev) => ({ ...prev, [type]: true }));

    try {
      let url = "";

      if (type === "email") {
        url = `${BACKEND_BASE_URL}/email?email=${email.trim()}`;
      } else if (type === "phone") {
        url = `${BACKEND_BASE_URL}/userinfo-by-phone?phone=${phone.trim()}`;
      } else if (type === "code") {
        // For now, dummy match
        const dummyData = {
          name: "User via Code",
          phone: "0000000000",
          email: "code@example.com",
          referralCode: code,
          customerId: 0,
          shopName,
          shopID: shopId,
          availableBalance: 0,
        };
        setScannedResult(dummyData);
        return;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "User not found");

      const formatted = {
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phoneNumber,
        email: data.email,
        referralCode: code || "N/A",
        customerId: data.userId,
        shopName: shopName || "Your Shop",
        shopID: shopId || 0,
        availableBalance: data.availablePoints,
      };

      setScannedResult(formatted);
    } catch (err) {
      console.error(err);
      window.alert(err.message || "Something went wrong");
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
      setPhone("");
      setEmail("");
      setCode("");
    }
  };

  const handleScan = (scannedValue) => {
    const dummyData = {
      name: "Scanned User",
      phone: "0000000000",
      email: "scanned@example.com",
      referralCode: scannedValue,
      customerId: 0,
      shopName,
      shopID: shopId,
      availableBalance: 0,
    };
    setCode(scannedValue);
    setScannedResult(dummyData);
    setShowScanner(false);
  };

  const handleSendInvite = async () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail.trim());
    if (!isValidEmail) {
      window.alert("Please enter a valid email address.");
      return;
    }

    if (!shopId || !shopName) {
      window.alert("Shop details not found. Please login again.");
      return;
    }

    setSendingInvite(true);
    try {
      const response = await fetch(
        "https://loyalty-backend-java.onrender.com/api/dashboard/invite",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: inviteEmail,
            shopId,
            shopName,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to send invite");

      window.alert("Invite sent successfully!");
      setInviteEmail("");
    } catch (err) {
      console.error(err);
      window.alert("Error sending invite.");
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
          <h1 className="text-3xl font-bold text-center text-black-700 mb-1">
            {shopName || "Shop Name"}
          </h1>
          <p className="text-center text-gray-500 mb-8">Shop ID: {shopId || 0}</p>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-7xl mx-auto">
            {/* Code Search */}
            <div className="rounded-2xl border border-fuchsia-100 bg-white p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-black-500 mb-3">🔖 Search by Code</h2>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Referral or Coupon Code"
                className="w-full px-4 py-2 border border-fuchsia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400 mb-4"
              />
              <button
                onClick={() => handleSearch("code")}
                disabled={!code.trim()}
                className="w-full py-2 rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-700 font-medium"
              >
                Search
              </button>
            </div>

            {/* Phone Search */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-3 text-black-500">📞 Phone Number</h2>
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
              <p className="text-xs text-gray-500 mt-2">Used for identity verification</p>
            </div>

            {/* Email Search */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-3 text-black-500">📧 Email Address</h2>
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
              <p className="text-xs text-gray-500 mt-2">Verification link will be sent</p>
            </div>

            {/* QR Scanner */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-lg text-center">
              <QrCode className="text-blue-600 mx-auto mb-3" size={36} />
              <h2 className="text-lg font-semibold mb-2 text-black-500">📷 Scan Code</h2>
              <p className="text-sm text-gray-600 mb-4">Scan QR or barcode to lookup</p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                onClick={() => setShowScanner(true)}
              >
                Open Scanner
              </button>
            </div>

            {/* Refer via Email */}
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
              <p className="text-xs text-gray-500 mt-2">An invite email will be sent to this address.</p>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {scannedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 shadow-2xl w-[90%] max-w-md border border-green-100">
            <h2 className="text-xl font-semibold mb-4 text-center text-green-700">✅ Customer Found</h2>
            <div className="space-y-2 text-gray-700 text-sm">
              <p><strong>Name:</strong> {scannedResult.name}</p>
              <p><strong>Phone:</strong> {scannedResult.phone}</p>
              <p><strong>Email:</strong> {scannedResult.email}</p>
              <p><strong>Customer ID:</strong> CUST-{scannedResult.customerId}</p>
              <p><strong>Shop Name:</strong> {scannedResult.shopName}</p>
              <p><strong>Available Balance:</strong> ₹{scannedResult.availableBalance}</p>
            </div>
            <button
              className="mt-5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg w-full font-medium"
              onClick={() => setScannedResult(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerLookup;
