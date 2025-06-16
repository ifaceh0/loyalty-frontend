import React, { useState } from "react";
import { Phone, Mail, QrCode } from "lucide-react";
import QrScanner from "./QrScanner";

const CustomerLookup = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);

  const [loading, setLoading] = useState({
    phone: false,
    email: false,
    code: false,
  });

  const handleSearch = (type) => {
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

    if (type === "code" && !code.trim()) {
      alert("Please enter a valid code");
      return;
    }

    setLoading((prev) => ({ ...prev, [type]: true }));
    console.log(`${type} search started...`);

    setTimeout(() => {
      // Integrate backend  here
      const dummyData = {
        name: "Arjun",
        phone: phone || "63534363464",
        email: email || "arjun@ifaceh.com",
        referralCode: code || "R000839210537",
        customerId: 29,
        shopName: "testShopkeeper",
        shopID: 8,
        availableBalance: 10.0,
      };

      console.log(`${type} searched with value:`, { phone, email, code }[type]);
      setScannedResult(dummyData);
      setLoading((prev) => ({ ...prev, [type]: false }));

      // Reset inputs
      setPhone("");
      setEmail("");
      setCode("");
    }, 1500);
  };

  const handleScan = (scannedValue) => {
    // TODO: Integrate backend here using scannedValue
    const dummyData = {
      name: "Arjun (Scanned)",
      phone: "63534363464",
      email: "arjun@ifaceh.com",
      referralCode: scannedValue,
      customerId: 29,
      shopName: "testShopkeeper",
      shopID: 8,
      availableBalance: 10.0,
    };

    setCode(scannedValue);
    setScannedResult(dummyData);
    setShowScanner(false);
  };

  return (
    <>
      {showScanner ? (
        <QrScanner onScan={handleScan} onClose={() => setShowScanner(false)} />
      ) : (
        <div className="p-6 md:p-10">
          <h1 className="text-3xl font-bold text-center mb-2">testShopkeeper</h1>
          <p className="text-center text-gray-600 mb-8">Shop ID: 8</p>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 justify-center max-w-7xl mx-auto">
            {/* Referral Code */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Search Code</h2>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Referral or Coupon Code"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300 mb-4"
              />
              <button
                onClick={() => handleSearch("code")}
                disabled={!code.trim() || loading.code}
                className={`w-full py-2 rounded text-white ${
                  loading.code ? "bg-green-400" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {loading.code ? "Searching..." : "Search"}
              </button>
            </div>

            {/* Phone Number */}
            <div className="rounded-lg border bg-purple-50 p-6 shadow-sm">
              <div className="flex items-center text-purple-600 mb-2">
                <Phone className="mr-2" />
                <h2 className="text-lg font-semibold">Phone Number</h2>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300 mb-3"
              />
              <button
                onClick={() => handleSearch("phone")}
                disabled={!phone.trim() || loading.phone}
                className={`w-full py-2 rounded text-white ${
                  loading.phone ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {loading.phone ? "Searching..." : "Search"}
              </button>
              <p className="text-sm text-gray-600 mt-2">
                We'll use this to verify your identity
              </p>
            </div>

            {/* Email Address */}
            <div className="rounded-lg border bg-blue-50 p-6 shadow-sm">
              <div className="flex items-center text-blue-600 mb-2">
                <Mail className="mr-2" />
                <h2 className="text-lg font-semibold">Email Address</h2>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 mb-3"
              />
              <button
                onClick={() => handleSearch("email")}
                disabled={!email.trim() || loading.email}
                className={`w-full py-2 rounded text-white ${
                  loading.email ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading.email ? "Searching..." : "Search"}
              </button>
              <p className="text-sm text-gray-600 mt-2">
                We'll send verification to this email
              </p>
            </div>

            {/* QR Scanner */}
            <div className="rounded-lg border bg-blue-100 p-6 shadow-sm text-center">
              <QrCode className="text-blue-600 mx-auto mb-2" size={32} />
              <h2 className="text-lg font-semibold mb-1">Scan Code</h2>
              <p className="text-sm text-gray-600 mb-4">
                Scan QR codes or barcodes with your camera
              </p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setShowScanner(true)}
              >
                Open Scanner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shared Result Modal */}
      {scannedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-green-700">Customer Found</h2>
            <div className="space-y-1 text-gray-700 text-sm">
              <p><strong>Name:</strong> {scannedResult.name}</p>
              <p><strong>Phone:</strong> {scannedResult.phone}</p>
              <p><strong>Email:</strong> {scannedResult.email}</p>
              <p><strong>Referral Code:</strong> {scannedResult.referralCode}</p>
              <p><strong>Customer ID:</strong> {scannedResult.customerId}</p>
              <p><strong>Shop:</strong> {scannedResult.shopName} (ID: {scannedResult.shopID})</p>
              <p><strong>Balance:</strong> ₹{scannedResult.availableBalance}</p>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
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
