import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Download, ShoppingBag, DollarSign, Target } from 'lucide-react';
import { FiLoader } from "react-icons/fi";
import * as XLSX from "xlsx";

const API_BASE_URL = "https://loyalty-backend-java.onrender.com/api";

const UserTransactions = () => {
  const userId = localStorage.getItem("id");

  const [transactionsByShop, setTransactionsByShop] = useState({});
  const [selectedShop, setSelectedShop] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/userDashboard/transactions/${userId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch transactions");
        }

        const shopNames = Object.keys(data);
        // Sort each shop's transactions by date (descending)
        shopNames.forEach((shop) => {
          data[shop].transactions.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
        });

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
  };

  const currentShopData = transactionsByShop[selectedShop] || { transactions: [], availablePoints: 0 };

  const downloadExcel = () => {
    if (!selectedShop || !currentShopData.transactions?.length) return;

    const data = currentShopData.transactions.map((txn, index) => ({
      "S.No": index + 1,
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

  const totalAmountSpent = currentShopData.transactions.reduce(
    (sum, txn) => sum + (txn.transactionAmount || 0), 0
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="p-2 max-w-8xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center h-64"
            >
              <div className="flex justify-center items-center h-64">
                <FiLoader className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="ml-4 text-blue-600 font-medium">Fetching your transaction data...</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-red-100 border border-red-400 text-red-700 p-6 rounded-md text-center shadow-lg"
            >
              <p className="font-semibold text-lg">Error Loading Data</p>
              <p className="mt-1">{error}</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <header className="bg-white rounded-md mb-8 top-0 shadow-lg border border-gray-100">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                    <Target className="w-8 h-8 text-indigo-600" />
                    Loyalty Transaction History
                  </h1>
                  <p className="text-md text-gray-500 mt-1">
                    Review your spending and points earned at each merchant.
                  </p>
                </div>
              </header>
              
              {/* Controls and Stats Panel */}
              <div className="bg-white rounded-md shadow-xl p-6 mb-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  
                  {/* Shop Selection */}
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Select Merchant
                    </label>
                    <div className="relative">
                      <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 pointer-events-none" />
                      <select
                        value={selectedShop}
                        onChange={handleShopChange}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-indigo-200 rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 appearance-none"
                      >
                        {shopNames.map((shop) => (
                          <option key={shop} value={shop}>
                            {shop}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Total Points Card */}
                  <StatCard 
                    title="Total Points Earned"
                    value={`${currentShopData.availablePoints || 0} pts`}
                    icon={<Target className="w-6 h-6 text-indigo-500" />}
                    color="indigo"
                  />
                  
                  {/* Total Amount Spent */}
                  <StatCard 
                    title="Total Amount Spent"
                    value={`$${totalAmountSpent}`}
                    icon={<DollarSign className="w-6 h-6 text-green-500" />}
                    color="green"
                  />

                  {/* Download Button */}
                  <div className="md:col-span-1 flex justify-start md:justify-end h-full pt-6 md:pt-0">
                    <button
                      onClick={downloadExcel}
                      disabled={!currentShopData.transactions?.length}
                      className="flex items-center justify-center w-full md:w-auto gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm font-semibold shadow-md transition duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="w-5 h-5" />
                      Export to Excel
                    </button>
                  </div>
                </div>
              </div>

              {/* Scrollable Transactions Table */}
              <div className="bg-white rounded-md shadow-2xl overflow-hidden border border-gray-100">
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Transactions for <span className="text-indigo-600">{selectedShop}</span>
                  </h3>
                </div>

                {/* Scrollable area */}
                <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
                  <table className="w-full table-auto text-gray-800">
                    <thead className="bg-indigo-50/50 sticky top-0 z-10">
                      <tr className="text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left font-bold">#</th>
                        <th className="py-3 px-6 text-left font-bold">Date</th>
                        <th className="py-3 px-6 text-left font-bold">Amount ($)</th>
                        <th className="py-3 px-6 text-left font-bold">Points Earned</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-light">
                      {currentShopData.transactions.length > 0 ? (
                        <AnimatePresence initial={false}>
                          {currentShopData.transactions.map((txn, index) => (
                            <motion.tr
                              key={txn.date + index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="border-b border-gray-100 hover:bg-indigo-50 transition duration-200"
                            >
                              <td className="py-3 px-6 whitespace-nowrap text-gray-600 font-medium">{index + 1}</td>
                              <td className="py-3 px-6 text-gray-700">{new Date(txn.date).toLocaleDateString()}</td>
                              <td className="py-3 px-6 text-gray-700 font-semibold">${txn.transactionAmount}</td>
                              <td className="py-3 px-6 text-green-600 font-bold">{txn.pointsReceived} pts</td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-10 text-gray-500 bg-gray-50">
                            <p className="text-lg font-medium">No transactions found for this merchant.</p>
                            <p className="text-sm mt-1">Make a purchase to start earning points!</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper component for stat cards
const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-md shadow-lg p-5 flex items-center border-l-4 border-${color}-400 transition-all duration-300 hover:shadow-xl`}>
    <div className={`p-3 rounded-full bg-${color}-100 mr-4`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase">
        {title}
      </p>
      <p className="text-2xl font-bold text-gray-900 mt-1">
        {value}
      </p>
    </div>
  </div>
);

export default UserTransactions;
