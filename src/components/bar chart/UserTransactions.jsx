// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from 'framer-motion';
// import { Loader2, Download } from 'lucide-react';
// import * as XLSX from "xlsx";

// const API_BASE_URL = "https://loyalty-backend-java.onrender.com/api";
// const ITEMS_PER_PAGE = 5;

// const UserTransactions = () => {
//   const userId = localStorage.getItem("id");

//   const [transactionsByShop, setTransactionsByShop] = useState({});
//   const [selectedShop, setSelectedShop] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/userDashboard/transactions/${userId}`);
//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Failed to fetch transactions");
//         }

//         const shopNames = Object.keys(data);
//         setTransactionsByShop(data);
//         setSelectedShop(shopNames[0] || "");
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load transaction data.");
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, [userId]);

//   const handleShopChange = (e) => {
//     setSelectedShop(e.target.value);
//     setCurrentPage(1);
//   };

//   const totalPoints = transactionsByShop[selectedShop]?.reduce(
//     (sum, txn) => sum + txn.pointsReceived,
//     0
//   );

//   const paginatedTransactions = transactionsByShop[selectedShop]?.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   ) || [];

//   const totalPages = Math.ceil(
//     (transactionsByShop[selectedShop]?.length || 0) / ITEMS_PER_PAGE
//   );

//   const downloadExcel = () => {
//     if (!selectedShop || !transactionsByShop[selectedShop]?.length) return;

//     const data = transactionsByShop[selectedShop].map((txn, index) => ({
//       "S.No": index + 1,
//       Date: new Date(txn.date).toLocaleDateString(),
//       "Transaction Amount ($)": txn.transactionAmount,
//       "Points Received": txn.pointsReceived,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, selectedShop);

//     XLSX.writeFile(workbook, `${selectedShop.replace(/\s+/g, "_")}_Transactions.xlsx`);
//   };

//   const shopNames = Object.keys(transactionsByShop).sort();

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-5 shadow-lg">
//         <h2 className="text-3xl font-extrabold text-center tracking-tight">
//           📜 Transaction History
//         </h2>
//       </nav>

//       <div className="p-6 max-w-6xl mx-auto">
//         <AnimatePresence>
//           {loading ? (
//             <motion.div
//               key="loading"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.4 }}
//               className="flex flex-col items-center justify-center h-64"
//             >
//               <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4">
//                 <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
//                 <p className="text-lg font-medium text-gray-700">Fetching your transactions...</p>
//               </div>
//             </motion.div>
//           ) : error ? (
//             <motion.div
//               key="error"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.4 }}
//               className="bg-red-50 text-red-600 p-4 rounded-xl text-center shadow-md"
//             >
//               {error}
//             </motion.div>
//           ) : (
//             <motion.div
//               key="content"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 {/* Shop Selection Card */}
//                 <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
//                   <label className="block text-sm font-semibold text-indigo-900 mb-3">
//                     Select Shop
//                   </label>
//                   <select
//                     value={selectedShop}
//                     onChange={handleShopChange}
//                     className="w-full px-4 py-3 bg-gray-50 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 text-lg transition duration-200"
//                   >
//                     {shopNames.map((shop) => (
//                       <option key={shop} value={shop} className="py-2">
//                         {shop}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Total Points Card */}
//                 <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-xl p-6 text-center flex flex-col justify-center transition-all duration-300 hover:shadow-2xl">
//                   <p className="text-gray-600 text-sm font-medium mb-2">
//                     Total Points from <span className="font-semibold text-indigo-900">{selectedShop}</span>
//                   </p>
//                   <p className="text-4xl font-extrabold text-indigo-700">{totalPoints || 0} pts</p>
//                 </div>

//                 {/* Download Button */}
//                 <div className="flex items-center justify-center">
//                   <button
//                     onClick={downloadExcel}
//                     disabled={!transactionsByShop[selectedShop]?.length}
//                     className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <Download className="w-5 h-5" />
//                     Download Excel
//                   </button>
//                 </div>
//               </div>

//               {/* Transactions Table */}
//               <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                 <table className="w-full table-auto text-gray-800">
//                   <thead>
//                     <tr className="bg-indigo-50 text-indigo-900">
//                       <th className="px-6 py-4 text-left font-semibold">S.No</th>
//                       <th className="px-6 py-4 text-left font-semibold">Date</th>
//                       <th className="px-6 py-4 text-left font-semibold">Amount ($)</th>
//                       <th className="px-6 py-4 text-left font-semibold">Points</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedTransactions.length > 0 ? (
//                       paginatedTransactions.map((txn, index) => (
//                         <tr
//                           key={index}
//                           className="border-b border-gray-100 hover:bg-indigo-50 transition duration-200"
//                         >
//                           <td className="px-6 py-4 text-gray-700">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
//                           <td className="px-6 py-4 text-gray-700">{new Date(txn.date).toLocaleDateString()}</td>
//                           <td className="px-6 py-4 text-gray-700">{txn.transactionAmount}</td>
//                           <td className="px-6 py-4 text-indigo-700 font-semibold">{txn.pointsReceived}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center py-8 text-gray-500">
//                           No transactions available for this shop.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="mt-6 flex justify-center items-center gap-4">
//                   <button
//                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="px-5 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-xl font-medium transition duration-300 disabled:opacity-50"
//                   >
//                     ← Prev
//                   </button>
//                   <span className="text-md text-gray-700 font-medium">
//                     Page <strong className="text-indigo-800">{currentPage}</strong> of {totalPages}
//                   </span>
//                   <button
//                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="px-5 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-xl font-medium transition duration-300 disabled:opacity-50"
//                   >
//                     Next →
//                   </button>
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default UserTransactions;










import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Download } from 'lucide-react';
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

  const paginatedTransactions = transactionsByShop[selectedShop]?.transactions?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ) || [];

  const totalPages = Math.ceil(
    (transactionsByShop[selectedShop]?.transactions?.length || 0) / ITEMS_PER_PAGE
  );

  const downloadExcel = () => {
    if (!selectedShop || !transactionsByShop[selectedShop]?.transactions?.length) return;

    const data = transactionsByShop[selectedShop].transactions.map((txn, index) => ({
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-5 shadow-lg">
        <h2 className="text-3xl font-extrabold text-center tracking-tight">
          📜 Transaction History
        </h2>
      </nav>

      <div className="p-6 max-w-6xl mx-auto">
        <AnimatePresence>
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center h-64"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <p className="text-lg font-medium text-gray-700">Fetching your transactions...</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-red-50 text-red-600 p-4 rounded-xl text-center shadow-md"
            >
              {error}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Shop Selection Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
                  <label className="block text-sm font-semibold text-indigo-900 mb-3">
                    Select Shop
                  </label>
                  <select
                    value={selectedShop}
                    onChange={handleShopChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 text-lg transition duration-200"
                  >
                    {shopNames.map((shop) => (
                      <option key={shop} value={shop} className="py-2">
                        {shop}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total Points Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-xl p-6 text-center flex flex-col justify-center transition-all duration-300 hover:shadow-2xl">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    Total Points from <span className="font-semibold text-indigo-900">{selectedShop}</span>
                  </p>
                  <p className="text-4xl font-extrabold text-indigo-700">{transactionsByShop[selectedShop]?.availablePoints || 0} pts</p>
                </div>

                {/* Download Button */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={downloadExcel}
                    disabled={!transactionsByShop[selectedShop]?.transactions?.length}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-5 h-5" />
                    Download Excel
                  </button>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <table className="w-full table-auto text-gray-800">
                  <thead>
                    <tr className="bg-indigo-50 text-indigo-900">
                      <th className="px-6 py-4 text-left font-semibold">S.No</th>
                      <th className="px-6 py-4 text-left font-semibold">Date</th>
                      <th className="px-6 py-4 text-left font-semibold">Amount ($)</th>
                      <th className="px-6 py-4 text-left font-semibold">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.length > 0 ? (
                      paginatedTransactions.map((txn, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-indigo-50 transition duration-200"
                        >
                          <td className="px-6 py-4 text-gray-700">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                          <td className="px-6 py-4 text-gray-700">{new Date(txn.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-gray-700">{txn.transactionAmount}</td>
                          <td className="px-6 py-4 text-indigo-700 font-semibold">{txn.pointsReceived}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-8 text-gray-500">
                          No transactions available for this shop.
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
                    className="px-5 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-xl font-medium transition duration-300 disabled:opacity-50"
                  >
                    ← Prev
                  </button>
                  <span className="text-md text-gray-700 font-medium">
                    Page <strong className="text-indigo-800">{currentPage}</strong> of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-5 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-xl font-medium transition duration-300 disabled:opacity-50"
                  >
                    Next →
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserTransactions;