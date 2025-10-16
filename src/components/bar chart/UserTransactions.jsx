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

//   const paginatedTransactions = transactionsByShop[selectedShop]?.transactions?.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   ) || [];

//   const totalPages = Math.ceil(
//     (transactionsByShop[selectedShop]?.transactions?.length || 0) / ITEMS_PER_PAGE
//   );

//   const downloadExcel = () => {
//     if (!selectedShop || !transactionsByShop[selectedShop]?.transactions?.length) return;

//     const data = transactionsByShop[selectedShop].transactions.map((txn, index) => ({
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
//                   <p className="text-4xl font-extrabold text-indigo-700">{transactionsByShop[selectedShop]?.availablePoints || 0} pts</p>
//                 </div>

//                 {/* Download Button */}
//                 <div className="flex items-center justify-center">
//                   <button
//                     onClick={downloadExcel}
//                     disabled={!transactionsByShop[selectedShop]?.transactions?.length}
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
















// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from 'framer-motion';
// import { Loader2, Download, ShoppingBag, DollarSign, Target } from 'lucide-react';
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

//   const currentShopData = transactionsByShop[selectedShop] || { transactions: [], availablePoints: 0 };

//   const paginatedTransactions = currentShopData.transactions?.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   ) || [];

//   const totalPages = Math.ceil(
//     (currentShopData.transactions?.length || 0) / ITEMS_PER_PAGE
//   );

//   const downloadExcel = () => {
//     if (!selectedShop || !currentShopData.transactions?.length) return;

//     const data = currentShopData.transactions.map((txn, index) => ({
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

//   const totalAmountSpent = currentShopData.transactions.reduce(
//     (sum, txn) => sum + (txn.transactionAmount || 0), 0
//   ).toFixed(2);

//   return (
//     <div className="min-h-screen bg-gray-50/50"> {/* Softer background */}
//       <header className="bg-white sticky top-0 z-10 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
//           <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
//             <Target className="w-8 h-8 text-indigo-600" />
//             Loyalty Transaction History
//           </h1>
//           <p className="text-md text-gray-500 mt-1">Review your spending and points earned at each merchant.</p>
//         </div>
//       </header>
//       <div className="p-6 max-w-7xl mx-auto">
//         <AnimatePresence mode="wait">
//           {loading ? (
//             <motion.div
//               key="loading"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.4 }}
//               className="flex flex-col items-center justify-center h-64"
//             >
//               <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center gap-4">
//                 <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
//                 <p className="text-lg font-medium text-gray-700">Fetching your transaction data...</p>
//               </div>
//             </motion.div>
//           ) : error ? (
//             <motion.div
//               key="error"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.4 }}
//               className="bg-red-100 border border-red-400 text-red-700 p-6 rounded-xl text-center shadow-lg"
//             >
//               <p className="font-semibold text-lg">Error Loading Data</p>
//               <p className="mt-1">{error}</p>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="content"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               {/* Controls and Stats Panel */}
//               <div className="bg-white rounded-xl shadow-2xl p-6 mb-8 border border-gray-100">
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  
//                   {/* Shop Selection */}
//                   <div className="md:col-span-1">
//                     <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
//                       Select Merchant
//                     </label>
//                     <div className="relative">
//                       <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 pointer-events-none" />
//                       <select
//                         value={selectedShop}
//                         onChange={handleShopChange}
//                         className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-indigo-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 appearance-none"
//                       >
//                         {shopNames.map((shop) => (
//                           <option key={shop} value={shop}>
//                             {shop}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   {/* Total Points Card (New Design) */}
//                   <StatCard 
//                     title="Total Points Earned"
//                     value={`${currentShopData.availablePoints || 0} pts`}
//                     icon={<Target className="w-6 h-6 text-indigo-500" />}
//                     color="indigo"
//                   />
                  
//                   {/* Total Amount Spent Card (New Metric) */}
//                   <StatCard 
//                     title="Total Amount Spent"
//                     value={`$${totalAmountSpent}`}
//                     icon={<DollarSign className="w-6 h-6 text-green-500" />}
//                     color="green"
//                   />

//                   {/* Download Button */}
//                   <div className="md:col-span-1 flex justify-start md:justify-end h-full pt-6 md:pt-0">
//                     <button
//                       onClick={downloadExcel}
//                       disabled={!currentShopData.transactions?.length}
//                       className="flex items-center justify-center w-full md:w-auto gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <Download className="w-5 h-5" />
//                       Export to Excel
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Transactions Table */}
//               <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
//                 <div className="p-4 bg-gray-50 border-b border-gray-100">
//                     <h3 className="text-xl font-semibold text-gray-700">Transactions for <span className="text-indigo-600">{selectedShop}</span></h3>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="w-full table-auto text-gray-800">
//                         <thead className="bg-indigo-50/50">
//                             <tr className="text-gray-600 uppercase text-sm leading-normal">
//                                 <th className="py-3 px-6 text-left font-bold">#</th>
//                                 <th className="py-3 px-6 text-left font-bold">Date</th>
//                                 <th className="py-3 px-6 text-left font-bold">Amount ($)</th>
//                                 <th className="py-3 px-6 text-left font-bold">Points Earned</th>
//                             </tr>
//                         </thead>
//                         <tbody className="text-sm font-light">
//                             {paginatedTransactions.length > 0 ? (
//                                 <AnimatePresence initial={false}>
//                                     {paginatedTransactions.map((txn, index) => (
//                                         <motion.tr
//                                             key={txn.date + index} // Use a unique key
//                                             initial={{ opacity: 0, y: 10 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             exit={{ opacity: 0, y: -10 }}
//                                             transition={{ duration: 0.3 }}
//                                             className="border-b border-gray-100 hover:bg-indigo-50 transition duration-200"
//                                         >
//                                             <td className="py-3 px-6 whitespace-nowrap text-gray-600 font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
//                                             <td className="py-3 px-6 text-gray-600">{new Date(txn.date).toLocaleDateString()}</td>
//                                             <td className="py-3 px-6 text-gray-700 font-semibold">${txn.transactionAmount}</td>
//                                             <td className="py-3 px-6 text-green-600 font-bold">{txn.pointsReceived} pts</td>
//                                         </motion.tr>
//                                     ))}
//                                 </AnimatePresence>
//                             ) : (
//                                 <tr>
//                                     <td colSpan="4" className="text-center py-10 text-gray-500 bg-gray-50">
//                                         <p className="text-lg font-medium">No transactions found for this merchant.</p>
//                                         <p className="text-sm mt-1">Make a purchase to start earning points!</p>
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="mt-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-lg border border-gray-100">
//                   <button
//                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition duration-300 disabled:opacity-50"
//                   >
//                     ← Previous
//                   </button>
//                   <span className="text-md text-gray-700 font-medium">
//                     Page <strong className="text-indigo-600">{currentPage}</strong> of {totalPages}
//                   </span>
//                   <button
//                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition duration-300 disabled:opacity-50"
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

// // Helper component for stat cards
// const StatCard = ({ title, value, icon, color }) => (
//   <div className={`bg-white rounded-xl shadow-lg p-5 flex items-center border-l-4 border-${color}-400 transition-all duration-300 hover:shadow-xl`}>
//     <div className={`p-3 rounded-full bg-${color}-100 mr-4`}>
//       {icon}
//     </div>
//     <div>
//       <p className="text-sm font-medium text-gray-500 uppercase">
//         {title}
//       </p>
//       <p className="text-2xl font-bold text-gray-900 mt-1">
//         {value}
//       </p>
//     </div>
//   </div>
// );

// export default UserTransactions;

















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
      <div className="p-6 max-w-7xl mx-auto">
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
              {/* <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <span className="text-lg font-medium text-gray-700">Fetching your transaction data...</span>
              </div> */}
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
              className="bg-red-100 border border-red-400 text-red-700 p-6 rounded-xl text-center shadow-lg"
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
              <header className="bg-white rounded-xl mb-8 top-0 shadow-lg border border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
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
              <div className="bg-white rounded-xl shadow-2xl p-6 mb-8 border border-gray-100">
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
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-indigo-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 appearance-none"
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
                      className="flex items-center justify-center w-full md:w-auto gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="w-5 h-5" />
                      Export to Excel
                    </button>
                  </div>
                </div>
              </div>

              {/* Scrollable Transactions Table */}
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
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
                              <td className="py-3 px-6 text-gray-600">{new Date(txn.date).toLocaleDateString()}</td>
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
  <div className={`bg-white rounded-xl shadow-lg p-5 flex items-center border-l-4 border-${color}-400 transition-all duration-300 hover:shadow-xl`}>
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
