import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import * as XLSX from "xlsx";

const API_BASE_URL = "https://loyalty-backend-java.onrender.com/api";
const ITEMS_PER_PAGE = 5;

const UserTransactions = () => {
  const userId = localStorage.getItem("id");

  const [transactionsByShop, setTransactionsByShop] = useState({});
  const [selectedShop, setSelectedShop] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/userDashboard/transactions/${userId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch transactions");
        }

        const shopNames = Object.keys(data);
        setTransactionsByShop(data);
        setSelectedShop(shopNames[0] || "");
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load transaction data.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  const handleShopChange = (e) => {
    setSelectedShop(e.target.value);
    setCurrentPage(1);
  };

  const totalPoints = transactionsByShop[selectedShop]?.reduce(
    (sum, txn) => sum + txn.pointsReceived,
    0
  );

  const paginatedTransactions = transactionsByShop[selectedShop]?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ) || [];

  const totalPages = Math.ceil(
    (transactionsByShop[selectedShop]?.length || 0) / ITEMS_PER_PAGE
  );

  // All Transactions of Selected Shop
  const downloadExcel = () => {
    if (!selectedShop || !transactionsByShop[selectedShop]?.length) return;

    const data = transactionsByShop[selectedShop].map((txn) => ({
      Date: new Date(txn.date).toLocaleDateString(),
      "Transaction Amount ($)": txn.transactionAmount,
      "Points Received": txn.pointsReceived,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, selectedShop);

    XLSX.writeFile(workbook, `${selectedShop.replace(/\s+/g, "_")}_Transactions.xlsx`);
  };

  const shopNames = Object.keys(transactionsByShop).sort();

  return (
    <div className="bg-white min-h-screen">
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <h2 className="text-2xl font-bold text-center">🧾 Transaction History</h2>
      </nav>

      <div className="p-6 max-w-5xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-8 max-w-md w-full text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="text-xl font-semibold text-gray-800">Loading transactions...</span>
              </div>
              <p className="text-gray-600">Please wait while we fetch the transaction details.</p>
            </motion.div>
          </div>
        ) : error ? (
          <p className="text-red-500 bg-red-50 py-3 px-4 rounded-lg text-center">{error}</p>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              {/* 🔽 Shop Dropdown */}
              <div className="w-full max-w-xs bg-blue-50 h-36 border border-blue-200 rounded-xl p-4 shadow-sm">
                <label className="block text-sm font-semibold text-blue-800 mb-6">Select Shop</label>
                <select
                  value={selectedShop}
                  onChange={handleShopChange}
                  className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 transition duration-200"
                >
                  {shopNames.map((shop) => (
                    <option key={shop} value={shop}>
                      {shop}
                    </option>
                  ))}
                </select>
              </div>

              {/* 💳 Total Points Card */}
              <div className="w-full max-w-xs bg-blue-50 h-24 border border-blue-200 rounded-xl p-4 text-center shadow-sm">
                <p className="text-gray-700 text-sm mb-2">
                  Total Points from <span className="font-semibold">{selectedShop}</span>
                </p>
                <p className="text-3xl font-bold text-blue-700">{totalPoints} pts</p>
              </div>

              {/* ⬇️ Download Excel Button */}
              <div className="flex justify-center">
                <button
                  onClick={downloadExcel}
                  disabled={!transactionsByShop[selectedShop]?.length}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition duration-200 disabled:opacity-50 flex items-center gap-2"
                >
                  📥 Download Excel
                </button>
              </div>
            </div>

            {/* 🧾 Transactions Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full table-auto text-sm text-gray-800">
                <thead>
                  <tr className="bg-blue-100 text-blue-800">
                    <th className="px-6 py-3 text-center font-semibold">Date</th>
                    <th className="px-6 py-3 text-center font-semibold">Transaction Amount ($)</th>
                    <th className="px-6 py-3 text-center font-semibold">Points Received</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((txn, index) => (
                      <tr key={index} className="border-b hover:bg-blue-50 transition duration-150">
                        <td className="px-6 py-3 text-center">{new Date(txn.date).toLocaleDateString()}</td>
                        <td className="px-6 py-3 text-center">{txn.transactionAmount} $</td>
                        <td className="px-6 py-3 text-blue-700 text-center font-semibold">{txn.pointsReceived}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-6 text-gray-500">
                        No transactions available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center gap-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-medium transition duration-200 disabled:opacity-50"
                >
                  ⬅ Prev
                </button>
                <span className="text-sm text-gray-700 font-medium">
                  Page <strong>{currentPage}</strong> of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-medium transition duration-200 disabled:opacity-50"
                >
                  Next ➡
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserTransactions;