// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from 'framer-motion';
// import { Loader2, Download, ShoppingBag, DollarSign, Target, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
// import { FiLoader } from "react-icons/fi";
// import * as XLSX from "xlsx";

// const API_BASE_URL = "https://loyalty-backend-java.onrender.com/api";

// const UserTransactions = () => {
//   const userId = localStorage.getItem("id");

//   const [transactionsByShop, setTransactionsByShop] = useState({});
//   const [selectedShop, setSelectedShop] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/userDashboard/transactions/${userId}`);
//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Failed to fetch transactions");
//         }

//         const shopNames = Object.keys(data);
//         shopNames.forEach((shop) => {
//           data[shop].transactions.sort(
//             (a, b) => new Date(b.date) - new Date(a.date)
//           );
//         });

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
//   };

//   const currentShopData = transactionsByShop[selectedShop] || { transactions: [], availablePoints: 0 };

//   const totalAmountSpent = currentShopData.transactions.reduce(
//     (sum, txn) => sum + (txn.transactionAmount || 0), 0
//   ).toFixed(2);

//   const totalRedeemedAmount = currentShopData.transactions.reduce(
//     (sum, txn) => sum + (txn.redeemAmount || 0), 0
//   ).toFixed(2);

//   const downloadExcel = () => {
//     if (!selectedShop || !currentShopData.transactions?.length) return;

//     const data = currentShopData.transactions.map((txn, index) => ({
//       "S.No": index + 1,
//       Date: new Date(txn.date).toLocaleDateString(),
//       "Transaction Amount ($)": txn.transactionAmount,
//       "Points Earned": txn.pointsReceived,
//       "Redeem Points": txn.redeemPoint || 0,
//       "Redeem Amount ($)": txn.redeemAmount || 0,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, selectedShop);

//     XLSX.writeFile(workbook, `${selectedShop.replace(/\s+/g, "_")}_Transactions.xlsx`);
//   };

//   const shopNames = Object.keys(transactionsByShop).sort();

//   return (
//     <div className="min-h-screen bg-gray-50/50">
//       <div className="p-3 sm:p-4 md:p-6 max-w-8xl mx-auto">
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
//               <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
//                 <FiLoader className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin" />
//                 <p className="text-sm sm:text-base text-blue-600 font-medium text-center">
//                   Fetching your transaction data...
//                 </p>
//               </div>
//             </motion.div>
//           ) : error ? (
//             <motion.div
//               key="error"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.4 }}
//               className="bg-red-100 border border-red-400 text-red-700 p-4 sm:p-6 rounded-md text-center shadow-lg"
//             >
//               <p className="font-semibold text-base sm:text-lg">Error Loading Data</p>
//               <p className="mt-1 text-sm sm:text-base">{error}</p>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="content"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               {/* Header */}
//               <header className="bg-white rounded-md mb-6 shadow-lg border border-gray-100">
//                 <div className="px-4 sm:px-6 py-4 sm:py-5">
//                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2 sm:gap-3">
//                     <Target className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
//                     Loyalty Transaction History
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-500 mt-1">
//                     Review your spending and points earned at each merchant.
//                   </p>
//                 </div>
//               </header>

//               {/* Controls and Stats Panel */}
//               <div className="bg-white rounded-md shadow-xl p-4 sm:p-6 mb-6 border border-gray-100">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 items-start">
                  
//                   {/* Shop Selection */}
//                   <div className="sm:col-span-1">
//                     <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
//                       Select Merchant
//                     </label>
//                     <div className="relative">
//                       <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 pointer-events-none" />
//                       <select
//                         value={selectedShop}
//                         onChange={handleShopChange}
//                         className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-indigo-200 rounded-sm text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 appearance-none"
//                       >
//                         {shopNames.map((shop) => (
//                           <option key={shop} value={shop}>
//                             {shop}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   {/* Total Points Card */}
//                   <StatCard 
//                     title="Available Points"
//                     value={`${currentShopData.availablePoints || 0} pts`}
//                     icon={<Target className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />}
//                     color="indigo"
//                   />
                  
//                   {/* Total Amount Spent */}
//                   <StatCard 
//                     title="Amount Spent"
//                     value={`$${totalAmountSpent}`}
//                     icon={<DollarSign className="w-6 h-6 text-green-500" />}
//                     color="green"
//                   />

//                   <StatCard 
//                     title="Redeem Amount"
//                     value={`$${totalRedeemedAmount}`}
//                     icon={<ArrowDownCircle className="w-6 h-6 text-red-500" />}
//                     color="red"
//                   />

//                   {/* Download Button */}
//                   <div className="sm:col-span-1 flex justify-start sm:justify-end pt-4 sm:pt-0">
//                     <button
//                       onClick={downloadExcel}
//                       disabled={!currentShopData.transactions?.length}
//                       className="flex items-center justify-center w-full sm:w-auto gap-2 px-4 sm:px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm font-medium sm:font-semibold text-sm shadow-md transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <Download className="w-4 h-4 sm:w-5 sm:h-5" />
//                       Export to Excel
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Transactions Table */}
//               <div className="bg-white rounded-md shadow-2xl overflow-hidden border border-gray-100">
//                 <div className="p-3 sm:p-4 bg-gray-50 border-b border-gray-100">
//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
//                     Transactions for <span className="text-indigo-600">{selectedShop}</span>
//                   </h3>
//                 </div>

//                 {/* Scrollable Table */}
//                 <div className="overflow-x-auto">
//                   <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
//                     <table className="w-full min-w-[700px] table-auto text-gray-800">
//                       <thead className="bg-indigo-200/100 sticky top-0 z-10">
//                         <tr className="text-gray-600 uppercase text-xs sm:text-sm leading-normal">
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">#</th>
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">Date</th>
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">Amount ($)</th>
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">Points</th>
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">Redeem Amount ($)</th>
//                         </tr>
//                       </thead>
//                       <tbody className="text-xs sm:text-sm font-light">
//                         {currentShopData.transactions.length > 0 ? (
//                           <AnimatePresence initial={false}>
//                             {currentShopData.transactions.map((txn, index) => (
//                               <motion.tr
//                                 key={txn.date + index}
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -10 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="border-b border-gray-100 hover:bg-indigo-50 transition duration-200"
//                               >
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6 whitespace-nowrap text-gray-600 font-medium">{index + 1}</td>
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6 text-gray-700">{new Date(txn.date).toLocaleDateString()}</td>
//                                 <td className="py-2 sm:py-3 chụp-3 px-3 sm:px-6 text-gray-700 font-semibold">${txn.transactionAmount}</td>
                                
//                                 {/* Points: +X / -Y style */}
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6">
//                                   <span className="flex items-center gap-2 font-semibold">
//                                     <span className="flex items-center gap-1 text-emerald-600">
//                                       <ArrowUpCircle className="w-4 h-4" /> +{txn.pointsReceived} pts
//                                     </span>
//                                     {txn.redeemPoint > 0 && (
//                                       <span className="flex items-center gap-1 text-rose-600">
//                                         <ArrowDownCircle className="w-4 h-4" /> -{txn.redeemPoint} pts
//                                       </span>
//                                     )}
//                                   </span>
//                                 </td>

//                                 {/* Redeem Amount */}
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6">
//                                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
//                                     (txn.redeemAmount ?? 0) === 0 
//                                       ? 'bg-blue-100 text-blue-700' 
//                                       : 'bg-orange-100 text-orange-700'
//                                   }`}>
//                                     ${Number(txn.redeemAmount || 0).toFixed(2)}
//                                   </span>
//                                 </td>
//                               </motion.tr>
//                             ))}
//                           </AnimatePresence>
//                         ) : (
//                           <tr>
//                             <td colSpan="5" className="text-center py-8 sm:py-10 text-gray-500 bg-gray-50">
//                               <p className="text-base sm:text-lg font-medium">No transactions found for this merchant.</p>
//                               <p className="text-xs sm:text-sm mt-1">Make a purchase to start earning points!</p>
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// // Helper component for stat cards
// const StatCard = ({ title, value, icon, color }) => (
//   <div className={`bg-white rounded-md shadow-lg p-4 sm:p-5 flex items-center border-l-4 border-${color}-400 transition-all duration-300 hover:shadow-xl`}>
//     <div className={`p-2.5 sm:p-3 rounded-full bg-${color}-100 mr-3 sm:mr-4`}>
//       {icon}
//     </div>
//     <div>
//       <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase">
//         {title}
//       </p>
//       <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">
//         {value}
//       </p>
//     </div>
//   </div>
// );

// export default UserTransactions;









// //translated code
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from 'framer-motion';
// import { Loader2, Download, ShoppingBag, DollarSign, Target, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
// import { FiLoader } from "react-icons/fi";
// import * as XLSX from "xlsx";
// import { useTranslation } from 'react-i18next';
// import { API_BASE_URL } from '../../apiConfig';

// // const API_BASE_URL = "https://loyalty-backend-java.onrender.com/api";

// const UserTransactions = () => {
//   const { t } = useTranslation();
//   const userId = localStorage.getItem("id");

//   const [transactionsByShop, setTransactionsByShop] = useState({});
//   const [selectedShop, setSelectedShop] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/userDashboard/transactions/${userId}`);
//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || t('transactions.errors.fetchFailed'));
//         }

//         const shopNames = Object.keys(data);
//         shopNames.forEach((shop) => {
//           data[shop].transactions.sort(
//             (a, b) => new Date(b.date) - new Date(a.date)
//           );
//         });

//         setTransactionsByShop(data);
//         setSelectedShop(shopNames[0] || "");
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError(t('transactions.errors.loadFailed'));
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, [userId, t]);

//   const handleShopChange = (e) => {
//     setSelectedShop(e.target.value);
//   };

//   const currentShopData = transactionsByShop[selectedShop] || { transactions: [], availablePoints: 0 };

//   const totalAmountSpent = currentShopData.transactions.reduce(
//     (sum, txn) => sum + (txn.transactionAmount || 0), 0
//   ).toFixed(2);

//   const totalRedeemedAmount = currentShopData.transactions.reduce(
//     (sum, txn) => sum + (txn.redeemAmount || 0), 0
//   ).toFixed(2);

//   const downloadExcel = () => {
//     if (!selectedShop || !currentShopData.transactions?.length) return;

//     const data = currentShopData.transactions.map((txn, index) => ({
//       "S.No": index + 1,
//       [t('transactions.table.date')]: new Date(txn.date).toLocaleDateString(),
//       [t('transactions.table.amount')]: txn.transactionAmount,
//       [t('transactions.table.pointsEarned')]: txn.pointsReceived,
//       [t('transactions.table.redeemPoints')]: txn.redeemPoint || 0,
//       [t('transactions.table.redeemAmount')]: txn.redeemAmount || 0,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, selectedShop);

//     XLSX.writeFile(workbook, `${selectedShop.replace(/\s+/g, "_")}_Transactions.xlsx`);
//   };

//   const shopNames = Object.keys(transactionsByShop).sort();

//   return (
//     <div className="min-h-screen bg-gray-50/50">
//       <div className="p-3 sm:p-4 md:p-2 max-w-8xl mx-auto">
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
//               <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
//                 <FiLoader className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin" />
//                 <p className="text-sm sm:text-base text-blue-600 font-medium text-center">
//                   {t('transactions.loading')}
//                 </p>
//               </div>
//             </motion.div>
//           ) : error ? (
//             <motion.div
//               key="error"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.4 }}
//               className="bg-red-100 border border-red-400 text-red-700 p-4 sm:p-6 rounded text-center shadow-lg"
//             >
//               <p className="font-semibold text-base sm:text-lg">{t('transactions.errors.title')}</p>
//               <p className="mt-1 text-sm sm:text-base">{error}</p>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="content"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               {/* Header */}
//               <header className="bg-white rounded mb-6 shadow-lg border border-gray-100">
//                 <div className="px-4 sm:px-6 py-4 sm:py-5">
//                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2 sm:gap-3">
//                     <Target className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
//                     {t('transactions.title')}
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-500 mt-1">
//                     {t('transactions.subtitle')}
//                   </p>
//                 </div>
//               </header>

//               {/* Controls and Stats Panel */}
//               <div className="bg-white rounded shadow-xl p-4 sm:p-6 mb-6 border border-gray-100">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 items-start">
                  
//                   {/* Shop Selection */}
//                   <div className="sm:col-span-1">
//                     <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
//                       {t('transactions.selectMerchant')}
//                     </label>
//                     <div className="relative">
//                       <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 pointer-events-none" />
//                       <select
//                         value={selectedShop}
//                         onChange={handleShopChange}
//                         className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-indigo-200 rounded text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 appearance-none"
//                       >
//                         {shopNames.map((shop) => (
//                           <option key={shop} value={shop}>
//                             {shop}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   {/* Total Points Card */}
//                   <StatCard 
//                     title={t('transactions.stats.availablePoints')}
//                     value={`${currentShopData.availablePoints || 0} pts`}
//                     icon={<Target className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />}
//                     color="indigo"
//                   />
                  
//                   {/* Total Amount Spent */}
//                   <StatCard 
//                     title={t('transactions.stats.amountSpent')}
//                     value={`$${totalAmountSpent}`}
//                     icon={<DollarSign className="w-6 h-6 text-green-500" />}
//                     color="green"
//                   />

//                   <StatCard 
//                     title={t('transactions.stats.redeemAmount')}
//                     value={`$${totalRedeemedAmount}`}
//                     icon={<ArrowDownCircle className="w-6 h-6 text-red-500" />}
//                     color="red"
//                   />

//                   {/* Download Button */}
//                   <div className="sm:col-span-1 flex justify-start sm:justify-end pt-4 sm:pt-0">
//                     <button
//                       onClick={downloadExcel}
//                       disabled={!currentShopData.transactions?.length}
//                       className="flex items-center justify-center w-full sm:w-auto gap-2 px-4 sm:px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium sm:font-semibold text-sm shadow-md transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <Download className="w-4 h-4 sm:w-5 sm:h-5" />
//                       {t('transactions.exportButton')}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Transactions Table */}
//               <div className="bg-white rounded shadow-2xl overflow-hidden border border-gray-100">
//                 <div className="p-3 sm:p-4 bg-gray-50 border-b border-gray-100">
//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
//                     {t('transactions.table.title')} <span className="text-indigo-600">{selectedShop}</span>
//                   </h3>
//                 </div>

//                 {/* Scrollable Table */}
//                 <div className="overflow-x-auto">
//                   <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
//                     <table className="w-full min-w-[700px] table-auto text-gray-800">
//                       <thead className="bg-indigo-200/100 sticky top-0 z-10">
//                         <tr className="text-gray-600 uppercase text-xs sm:text-sm leading-normal">
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">#</th>
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">{t('transactions.table.date')}</th>
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">{t('transactions.table.amount')}</th>
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">{t('transactions.table.points')}</th>
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">{t('transactions.table.redeemAmount')}</th>
//                         </tr>
//                       </thead>
//                       <tbody className="text-xs sm:text-sm font-light">
//                         {currentShopData.transactions.length > 0 ? (
//                           <AnimatePresence initial={false}>
//                             {currentShopData.transactions.map((txn, index) => (
//                               <motion.tr
//                                 key={txn.date + index}
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -10 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="border-b border-gray-100 hover:bg-indigo-50 transition duration-200"
//                               >
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6 whitespace-nowrap text-gray-600 font-medium">{index + 1}</td>
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6 text-gray-700">{new Date(txn.date).toLocaleDateString()}</td>
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6 text-gray-700 font-semibold">${txn.transactionAmount}</td>
                                
//                                 {/* Points: +X / -Y style */}
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6">
//                                   <span className="flex items-center gap-2 font-semibold">
//                                     <span className="flex items-center gap-1 text-emerald-600">
//                                       <ArrowUpCircle className="w-4 h-4" /> +{txn.pointsReceived} pts
//                                     </span>
//                                     {txn.redeemPoint > 0 && (
//                                       <span className="flex items-center gap-1 text-rose-600">
//                                         <ArrowDownCircle className="w-4 h-4" /> -{txn.redeemPoint} pts
//                                       </span>
//                                     )}
//                                   </span>
//                                 </td>

//                                 {/* Redeem Amount */}
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6">
//                                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
//                                     (txn.redeemAmount ?? 0) === 0 
//                                       ? 'bg-blue-100 text-blue-700' 
//                                       : 'bg-orange-100 text-orange-700'
//                                   }`}>
//                                     ${Number(txn.redeemAmount || 0).toFixed(2)}
//                                   </span>
//                                 </td>
//                               </motion.tr>
//                             ))}
//                           </AnimatePresence>
//                         ) : (
//                           <tr>
//                             <td colSpan="5" className="text-center py-8 sm:py-10 text-gray-500 bg-gray-50">
//                               <p className="text-base sm:text-lg font-medium">{t('transactions.noTransactions.title')}</p>
//                               <p className="text-xs sm:text-sm mt-1">{t('transactions.noTransactions.subtitle')}</p>
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// // Helper component for stat cards
// const StatCard = ({ title, value, icon, color }) => (
//   <div className={`bg-white rounded shadow-lg p-4 sm:p-5 flex items-center border-l-4 border-${color}-400 transition-all duration-300 hover:shadow-xl`}>
//     <div className={`p-2.5 sm:p-3 rounded-full bg-${color}-100 mr-3 sm:mr-4`}>
//       {icon}
//     </div>
//     <div>
//       <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase">
//         {title}
//       </p>
//       <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">
//         {value}
//       </p>
//     </div>
//   </div>
// );

// export default UserTransactions;












// Updated UserTransactions.jsx (full component with pagination and date range)

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from 'framer-motion';
// import { Loader2, Download, ShoppingBag, Banknote, Target, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
// import { FiLoader } from "react-icons/fi";
// import * as XLSX from "xlsx";
// import { useTranslation } from 'react-i18next';
// import { API_BASE_URL } from '../../apiConfig';
// import { getCurrencySymbol } from "../../utils/currency";
// import { fetchWithAuth } from "../../auth/fetchWithAuth";

// const UserTransactions = () => {
//   const { t } = useTranslation();
//   const userId = localStorage.getItem("id");

//   const [transactionsByShop, setTransactionsByShop] = useState({});
//   const [selectedShop, setSelectedShop] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [appliedDateRange, setAppliedDateRange] = useState({ from: "", to: "" });
//   const [pendingDateRange, setPendingDateRange] = useState({ from: "", to: "" });
//   const size = 20; 

//   const country = localStorage.getItem("country");
//   const currencySymbol = getCurrencySymbol(country);

//   useEffect(() => {
//     fetchTransactions();
//   }, [page, appliedDateRange.from, appliedDateRange.to]);

//   const fetchTransactions = async () => {
//     setLoading(true);
//     try {
//       let url = `${API_BASE_URL}/api/userDashboard/transactions/${userId}?page=${page}&size=${size}`;
//       if (appliedDateRange.from) url += `&fromDate=${appliedDateRange.from}`;
//       if (appliedDateRange.to)   url += `&toDate=${appliedDateRange.to}`;

//       const response = await fetchWithAuth(url, {
//         credentials: "include",
//       });
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || t('transactions.errors.fetchFailed'));
//       }

//       const alreadyGrouped = data.content || {};
//       setTransactionsByShop(alreadyGrouped);
//       setTotalPages(data.totalPages || 1);

//       const shopNames = Object.keys(alreadyGrouped);
//       if (!selectedShop && shopNames.length > 0) {
//         setSelectedShop(shopNames[0]);
//       }

//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError(t('transactions.errors.loadFailed'));
//       setLoading(false);
//     }
//   };

//   const handleApplyFilter = () => {
//     setAppliedDateRange(pendingDateRange);
//     setPage(0);
//   };

//   const handleShopChange = (e) => {
//     setSelectedShop(e.target.value);
//   };

//   const currentShopData = transactionsByShop[selectedShop] || { transactions: [], availablePoints: 0 };

//   const totalAmountSpent = currentShopData.transactions.reduce(
//     (sum, txn) => sum + (txn.transactionAmount || 0), 0
//   ).toFixed(2);

//   const totalRedeemedAmount = currentShopData.transactions.reduce(
//     (sum, txn) => sum + (txn.redeemAmount || 0), 0
//   ).toFixed(2);

//   const downloadExcel = () => {
//     if (!selectedShop || !currentShopData.transactions?.length) return;

//     const data = currentShopData.transactions.map((txn, index) => ({
//       "S.No": index + 1,
//       [t('transactions.table.date')]: new Date(txn.date).toLocaleDateString(),
//       [t('transactions.table.amount')]: txn.transactionAmount,
//       [t('transactions.table.pointsEarned')]: txn.pointsReceived,
//       [t('transactions.table.redeemPoints')]: txn.redeemPoint || 0,
//       [t('transactions.table.redeemAmount')]: txn.redeemAmount || 0,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, selectedShop);

//     XLSX.writeFile(workbook, `${selectedShop.replace(/\s+/g, "_")}_Transactions.xlsx`);
//   };

//   const shopNames = Object.keys(transactionsByShop).sort();

//   return (
//     <div className="min-h-screen">
//       <div className="p-3 sm:p-4 md:p-2 max-w-8xl mx-auto">
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
//               <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
//                 <FiLoader className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin" />
//                 <p className="text-sm sm:text-base text-blue-600 font-medium text-center">
//                   {t('transactions.loading')}
//                 </p>
//               </div>
//             </motion.div>
//           ) : error ? (
//             <motion.div
//               key="error"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.4 }}
//               className="bg-red-100 border border-red-400 text-red-700 p-4 sm:p-6 rounded-lg text-center shadow-lg"
//             >
//               <p className="font-semibold text-base sm:text-lg">{t('transactions.errors.title')}</p>
//               <p className="mt-1 text-sm sm:text-base">{error}</p>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="content"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               {/* Header */}
//               <header className="bg-white rounded-xl mb-6 border border-gray-200">
//                 <div className="px-4 sm:px-6 py-4 sm:py-5">
//                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2 sm:gap-3">
//                     <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
//                     {t('transactions.title')}
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-500 mt-1">
//                     {t('transactions.subtitle')}
//                   </p>
//                 </div>
//               </header>

//               {/* Date Range Picker */}
//               <div className="mb-6 bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
//                 <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
//                   <div>
//                     <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
//                       From Date
//                     </label>
//                     <input
//                       type="date"
//                       value={pendingDateRange.from}
//                       onChange={(e) =>
//                         setPendingDateRange((prev) => ({ ...prev, from: e.target.value }))
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
//                       To Date
//                     </label>
//                     <input
//                       type="date"
//                       value={pendingDateRange.to}
//                       onChange={(e) =>
//                         setPendingDateRange((prev) => ({ ...prev, to: e.target.value }))
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>

//                   {/* Apply Button */}
//                   <div className="flex items-end">
//                     <button
//                       onClick={handleApplyFilter}
//                       className="sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow transition duration-200"
//                     >
//                       {/* {t('common.apply') || 'Apply Filter'} */}
//                       Apply Filter
//                     </button>
//                   </div>

//                   {/* Optional: small hint or reset button */}
//                   <div className="col-span-1 lg:col-span-2 text-right text-sm text-gray-500">
//                     Click Apply to update transactions
//                   </div>
//                 </div>
//               </div>

//               {/* Controls and Stats Panel */}
//               <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 border border-gray-200">
//                 <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 items-start">
                  
//                   {/* Shop Selection */}
//                   <div className="sm:col-span-1">
//                     <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
//                       {t('transactions.selectMerchant')}
//                     </label>
//                     <div className="relative">
//                       <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 pointer-events-none" />
//                       <select
//                         value={selectedShop}
//                         onChange={handleShopChange}
//                         className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-blue-200 rounded-full text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none"
//                       >
//                         {shopNames.map((shop) => (
//                           <option key={shop} value={shop}>
//                             {shop}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   {/* Total Points Card */}
//                   <StatCard 
//                     title={t('transactions.stats.availablePoints')}
//                     value={`${currentShopData.availablePoints || 0} pts`}
//                     icon={<Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />}
//                     color="blue"
//                   />
                  
//                   {/* Total Amount Spent */}
//                   <StatCard 
//                     title={t('transactions.stats.amountSpent')}
//                     value={`${currencySymbol}${totalAmountSpent}`}
//                     icon={<Banknote className="w-6 h-6 text-green-500" />}
//                     color="green"
//                   />

//                   <StatCard 
//                     title={t('transactions.stats.redeemAmount')}
//                     value={`${currencySymbol}${totalRedeemedAmount}`}
//                     icon={<ArrowDownCircle className="w-6 h-6 text-red-500" />}
//                     color="red"
//                   />

//                   {/* Download Button */}
//                   <div className="sm:col-span-1 flex justify-start sm:justify-end pt-4 sm:pt-0">
//                     <button
//                       onClick={downloadExcel}
//                       disabled={!currentShopData.transactions?.length}
//                       className="flex items-center justify-center sm:w-auto gap-2 px-4 sm:px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium sm:font-semibold text-sm shadow-md transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <Download className="w-4 h-4 sm:w-5 sm:h-5" />
//                       {t('transactions.exportButton')}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Transactions Table */}
//               <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
//                 <div className="p-3 sm:p-3 bg-blue-600">
//                   <h3 className="text-lg sm:text-xl font-semibold text-black">
//                     {t('transactions.table.title')} <span className="text-white">{selectedShop}</span>
//                   </h3>
//                 </div>

//                 {/* Scrollable Table */}
//                 <div className="overflow-x-auto">
//                   <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
//                     <table className="w-full min-w-[700px] table-auto text-gray-800">
//                       <thead className="bg-blue-600 sticky top-0 z-10">
//                         <tr className="text-black uppercase text-xs sm:text-sm leading-normal">
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">#</th>
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">{t('transactions.table.date')}</th>
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">{t('transactions.table.amount')} ({currencySymbol})</th>
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">{t('transactions.table.points')}</th>
//                           <th className="py-2 sm:py-3 px-3 sm:px-6 text-left font-bold">{t('transactions.table.redeemAmount')} ({currencySymbol})</th>
//                         </tr>
//                       </thead>
//                       <tbody className="text-xs sm:text-sm font-light">
//                         {currentShopData.transactions.length > 0 ? (
//                           <AnimatePresence initial={false}>
//                             {currentShopData.transactions.map((txn, index) => (
//                               <motion.tr
//                                 key={txn.date + index}
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -10 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="border-b border-gray-100 hover:bg-blue-50 transition duration-200"
//                               >
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6 whitespace-nowrap text-gray-600 font-medium">{index + 1}</td>
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6 text-gray-700">{new Date(txn.date).toLocaleDateString()}</td>
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6 text-gray-700 font-semibold">{currencySymbol}{txn.transactionAmount}</td>
                                
//                                 {/* Points: +X / -Y style */}
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6">
//                                   <span className="flex items-center gap-2 font-semibold">
//                                     <span className="flex items-center gap-1 text-emerald-600">
//                                       <ArrowUpCircle className="w-4 h-4" /> +{txn.pointsReceived} pts
//                                     </span>
//                                     {txn.redeemPoint > 0 && (
//                                       <span className="flex items-center gap-1 text-rose-600">
//                                         <ArrowDownCircle className="w-4 h-4" /> -{txn.redeemPoint} pts
//                                       </span>
//                                     )}
//                                   </span>
//                                 </td>

//                                 {/* Redeem Amount */}
//                                 <td className="py-2 sm:py-3 px-3 sm:px-6">
//                                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
//                                     (txn.redeemAmount ?? 0) === 0 
//                                       ? 'bg-blue-100 text-blue-700' 
//                                       : 'bg-orange-100 text-orange-700'
//                                   }`}>
//                                     {currencySymbol}{Number(txn.redeemAmount || 0).toFixed(2)}
//                                   </span>
//                                 </td>
//                               </motion.tr>
//                             ))}
//                           </AnimatePresence>
//                         ) : (
//                           <tr>
//                             <td colSpan="5" className="text-center py-8 sm:py-10 text-gray-500 bg-gray-50">
//                               <p className="text-base sm:text-lg font-medium">{t('transactions.noTransactions.title')}</p>
//                               <p className="text-xs sm:text-sm mt-1">{t('transactions.noTransactions.subtitle')}</p>
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>

//               {/* Pagination Controls */}
//               <div className="flex justify-center items-center gap-4 mt-6">
//                 <button 
//                   disabled={page === 0}
//                   onClick={() => setPage(p => Math.max(0, p - 1))}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
//                 >
//                   Previous
//                 </button>
                
//                 <span className="text-sm">Page {page + 1} of {totalPages}</span>
                
//                 <button 
//                   disabled={page >= totalPages - 1}
//                   onClick={() => setPage(p => p + 1)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ title, value, icon, color }) => (
//   <div className={`bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-center border-l-4 border-${color}-400 transition-all duration-300 hover:shadow-xl`}>
//     <div className={`p-2.5 sm:p-3 rounded-full bg-${color}-100 mr-3 sm:mr-4`}>
//       {icon}
//     </div>
//     <div>
//       <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase">
//         {title}
//       </p>
//       <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">
//         {value}
//       </p>
//     </div>
//   </div>
// );

// export default UserTransactions;








import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, ShoppingBag, Banknote, Target, 
  ArrowUpCircle, ArrowDownCircle, Calendar, 
  ChevronLeft, ChevronRight, Filter
} from 'lucide-react';
import { FiLoader } from "react-icons/fi";
import * as XLSX from "xlsx";
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../apiConfig';
import { getCurrencySymbol } from "../../utils/currency";
import { fetchWithAuth } from "../../auth/fetchWithAuth";

const UserTransactions = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("id");

  const [transactionsByShop, setTransactionsByShop] = useState({});
  const [selectedShop, setSelectedShop] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [appliedDateRange, setAppliedDateRange] = useState({ from: "", to: "" });
  const [pendingDateRange, setPendingDateRange] = useState({ from: "", to: "" });
  const size = 20; 

  const country = localStorage.getItem("country");
  const currencySymbol = getCurrencySymbol(country);

  useEffect(() => {
    fetchTransactions();
  }, [page, appliedDateRange.from, appliedDateRange.to]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/api/userDashboard/transactions/${userId}?page=${page}&size=${size}`;
      if (appliedDateRange.from) url += `&fromDate=${appliedDateRange.from}`;
      if (appliedDateRange.to)   url += `&toDate=${appliedDateRange.to}`;

      const response = await fetchWithAuth(url, { credentials: "include" });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || t('transactions.errors.fetchFailed'));

      const alreadyGrouped = data.content || {};
      setTransactionsByShop(alreadyGrouped);
      setTotalPages(data.totalPages || 1);

      const shopNames = Object.keys(alreadyGrouped);
      if (!selectedShop && shopNames.length > 0) setSelectedShop(shopNames[0]);

      setLoading(false);
    } catch (err) {
      setError(t('transactions.errors.loadFailed'));
      setLoading(false);
    }
  };

  const handleApplyFilter = () => {
    setAppliedDateRange(pendingDateRange);
    setPage(0);
  };

  const handleShopChange = (e) => {
    setSelectedShop(e.target.value);
  };

  const currentShopData = transactionsByShop[selectedShop] || { transactions: [], availablePoints: 0 };
  const totalAmountSpent = currentShopData.transactions.reduce((sum, txn) => sum + (txn.transactionAmount || 0), 0).toFixed(2);
  const totalRedeemedAmount = currentShopData.transactions.reduce((sum, txn) => sum + (txn.redeemAmount || 0), 0).toFixed(2);

  const downloadExcel = () => {
    if (!selectedShop || !currentShopData.transactions?.length) return;
    const data = currentShopData.transactions.map((txn, index) => ({
      "S.No": index + 1,
      [t('transactions.table.date')]: new Date(txn.date).toLocaleDateString(),
      [t('transactions.table.amount')]: txn.transactionAmount,
      [t('transactions.table.pointsEarned')]: txn.pointsReceived,
      [t('transactions.table.redeemPoints')]: txn.redeemPoint || 0,
      [t('transactions.table.redeemAmount')]: txn.redeemAmount || 0,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, selectedShop);
    XLSX.writeFile(workbook, `${selectedShop}_Txn.xlsx`);
  };

  const shopNames = Object.keys(transactionsByShop).sort();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
              {t('transactions.title')}
            </h1>
            <p className="text-slate-500 mt-1 font-medium">{t('transactions.subtitle')}</p>
          </div>
          <button
            onClick={downloadExcel}
            disabled={!currentShopData.transactions?.length}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-white border border-slate-200 text-slate-700 rounded-full font-semibold text-sm shadow-sm hover:bg-slate-50 transition-all disabled:opacity-40"
          >
            <Download className="w-4 h-4" />
            {t('transactions.exportButton')}
          </button>
        </div>

        {/* Filters & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Filters Panel */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4 text-slate-400">
              <Filter className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">{t('transactions.filters.title')}</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('transactions.filters.merchant')}</label>
                <select
                  value={selectedShop}
                  onChange={handleShopChange}
                  className="w-full bg-slate-50 border-none rounded py-2 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {Object.keys(transactionsByShop).sort().map(shop => (
                    <option key={shop} value={shop}>{shop}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('transactions.filters.from')}</label>
                  <input
                    type="date"
                    value={pendingDateRange.from}
                    onChange={(e) => setPendingDateRange(p => ({ ...p, from: e.target.value }))}
                    className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('transactions.filters.to')}</label>
                  <input
                    type="date"
                    value={pendingDateRange.to}
                    onChange={(e) => setPendingDateRange(p => ({ ...p, to: e.target.value }))}
                    className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                onClick={handleApplyFilter}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-md shadow-indigo-100 transition-all active:scale-95"
              >
                {t('transactions.filters.apply')}
              </button>
            </div>
          </div>

          {/* Stats Display */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard 
              title={t('transactions.stats.availablePoints')}
              value={`${currentShopData.availablePoints || 0} pts`}
              icon={<Target className="w-5 h-5" />}
              theme="bg-indigo-50 text-indigo-600"
            />
            <StatCard 
              title={t('transactions.stats.amountSpent')}
              value={`${currencySymbol}${totalAmountSpent}`}
              icon={<Banknote className="w-5 h-5" />}
              theme="bg-emerald-50 text-emerald-600"
            />
            <StatCard 
              title={t('transactions.stats.redeemAmount')}
              value={`${currencySymbol}${totalRedeemedAmount}`}
              icon={<ArrowDownCircle className="w-5 h-5" />}
              theme="bg-rose-50 text-rose-600"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingState key="loading" text={t('transactions.loading')} />
            ) : error ? (
              <ErrorState key="error" message={error} />
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="overflow-x-auto"
              >
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t('transactions.table.date')}</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t('transactions.table.amount')}</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t('transactions.table.activity')}</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t('transactions.table.benefit')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {currentShopData.transactions.length > 0 ? (
                      currentShopData.transactions.map((txn, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                            {new Date(txn.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-bold text-slate-800">{currencySymbol}{txn.transactionAmount}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                                <ArrowUpCircle className="w-3 h-3" /> {txn.pointsReceived}
                              </span>
                              {txn.redeemPoint > 0 && (
                                <span className="flex items-center gap-1 text-rose-600 text-xs font-bold bg-rose-50 px-2 py-1 rounded-lg">
                                  <ArrowDownCircle className="w-3 h-3" /> {txn.redeemPoint}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              (txn.redeemAmount ?? 0) === 0 ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {t('transactions.table.saved')} {currencySymbol}{Number(txn.redeemAmount || 0).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <EmptyState colSpan={4} />
                    )}
                  </tbody>
                </table>

                {/* Modern Pagination */}
                <div className="px-6 py-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                  <span className="text-xs font-bold text-slate-400 uppercase">
                    {t('transactions.pagination.page')} {page + 1} {t('transactions.pagination.of')} {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <PaginationButton 
                      disabled={page === 0} 
                      onClick={() => setPage(p => p - 1)}
                      icon={<ChevronLeft className="w-4 h-4" />}
                    />
                    <PaginationButton 
                      disabled={page >= totalPages - 1} 
                      onClick={() => setPage(p => p + 1)}
                      icon={<ChevronRight className="w-4 h-4" />}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* Sub-Components for Cleanliness */

const StatCard = ({ title, value, icon, theme }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${theme}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-900 tracking-tight mt-1">{value}</p>
    </div>
  </div>
);

const PaginationButton = ({ disabled, onClick, icon }) => (
  <button 
    disabled={disabled}
    onClick={onClick}
    className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition-all"
  >
    {icon}
  </button>
);

const LoadingState = ({ text }) => (
  <div className="flex flex-col items-center justify-center py-24">
    <FiLoader className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
    <p className="text-slate-500 font-medium">{text}</p>
  </div>
);

const ErrorState = ({ message }) => {
  const { t } = useTranslation();

  return (
    <div className="p-12 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-500 mb-4">
        !
      </div>
      <p className="text-slate-800 font-bold">{t('transactions.errors.title')}</p>
      <p className="text-slate-500 text-sm mt-1">{message}</p>
    </div>
  );
};

const EmptyState = ({ colSpan }) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td colSpan={colSpan} className="py-20 text-center">
        <div className="flex flex-col items-center opacity-40">
          <ShoppingBag className="w-12 h-12 mb-3" />
          <p className="text-lg font-bold">{t('transactions.noTransactions.title')}</p>
          <p className="text-sm">{t('transactions.noTransactions.subtitle')}</p>
        </div>
      </td>
    </tr>
  );
};
export default UserTransactions;