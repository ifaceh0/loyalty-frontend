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



import React, { useState, useEffect } from "react";
import { Phone, Mail, QrCode } from "lucide-react";
import QrScanner from "./QrScanner";

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
      alert("User not found or an error occurred.");
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
          <h1 className="text-3xl font-bold text-center text-black-700 mb-1">
            {shopName || "Shop Name"}
          </h1>
          <p className="text-center text-gray-500 mb-8">Shop ID: {shopId || 0}</p>

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
              <h2 className="text-lg font-semibold mb-2 text-black-500">📷 Scan Code</h2>
              <p className="text-sm text-gray-600 mb-4">Scan QR or barcode to lookup</p>
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
              <p className="text-xs text-gray-500 mt-2">Used for identity verification</p>
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
              <p className="text-xs text-gray-500 mt-2">Used for identity verification</p>
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
                An email will be sent to your email address.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Customer Modal */}
      {scannedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-100 to-blue-50 rounded-3xl shadow-xl w-[90%] max-w-md border border-blue-200 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">🎉 Customer Matched</h2>
            <div className="space-y-3 text-gray-800 text-[15px] leading-relaxed">
              <p><span className="font-medium text-purple-600">Name :</span> {scannedResult.name}</p>
              <p><span className="font-medium text-purple-600">Phone :</span> {scannedResult.phone}</p>
              <p><span className="font-medium text-purple-600">Email :</span> {scannedResult.email}</p>
              {/* <p><span className="font-medium text-purple-600">Referral Code:</span> {scannedResult.referralCode}</p> */}
              <p><span className="font-medium text-purple-600">Customer Id :</span> CUST - {scannedResult.customerId}</p>
              <p><span className="font-medium text-purple-600">Shop Id :</span> {scannedResult.shopName} (ID: {scannedResult.shopID})</p>
              <p><span className="font-medium text-purple-600">Available Balance :</span> ₹{scannedResult.availableBalance}</p>
            </div>

            <button
              className="mt-6 w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-md hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
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