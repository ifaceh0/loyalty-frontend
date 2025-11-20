// import React, { useState, useEffect, useRef } from 'react';
// import { Search, Calendar, X, Gift, DollarSign, ArrowUpCircle, ArrowDownCircle, ShoppingBag, TrendingUp, Loader2, Clock, AlertCircle, Download, Printer } from 'lucide-react';
// import { format } from 'date-fns';

// const DailyTransaction = () => {
//   const [popupTitle, setPopupTitle] = useState('User Profile');
//   const [showUserPopup, setShowUserPopup] = useState(false);
//   const [showDailyPopup, setShowDailyPopup] = useState(false);
//   const [userId, setUserId] = useState('');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [userData, setUserData] = useState(null);
//   const [dailyData, setDailyData] = useState(null);
//   const [isLoadingUser, setIsLoadingUser] = useState(false);
//   const [isLoadingDaily, setIsLoadingDaily] = useState(false);
//   const [userError, setUserError] = useState('');
//   const [dailyError, setDailyError] = useState('');

//   const shopId = localStorage.getItem('id');
//   const printRef = useRef();

//   const searchUser = async () => {
//     if (!userId.trim()) return;
//     setIsLoadingUser(true);
//     setUserData(null);
//     setUserError('');

//     try {
//       const response = await fetch(
//         `https://loyalty-backend-java.onrender.com/api/dashboard/transactions/${userId}/${shopId}`,
//         { method: 'GET', credentials: 'include' }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setPopupTitle('Error');
//         setUserError(data.error || data.message || 'Something went wrong');
//         setShowUserPopup(true);
//         return;
//       }

//       if (!data.transactions || data.transactions.length === 0) {
//         setPopupTitle('User Profile');
//         setUserError('No transactions found for this user.');
//         setShowUserPopup(true);
//         return;
//       }

//       setPopupTitle('User Profile');
//       setUserData(data);
//       setShowUserPopup(true);
//     } catch (error) {
//       setPopupTitle('Error');
//       setUserError('Network error – please try again later.');
//       setShowUserPopup(true);
//     } finally {
//       setIsLoadingUser(false);
//     }
//   };

//   const fetchDailyTransactions = async (date) => {
//     setIsLoadingDaily(true);
//     setDailyData(null);
//     setDailyError('');

//     try {
//       const response = await fetch(
//         `https://loyalty-backend-java.onrender.com/api/dashboard/date_transactions/${shopId}/${date}`,
//         { method: 'GET', credentials: 'include' }
//       );

//       if (!response.ok) {
//         if (response.status === 404) {
//           throw new Error('No transactions found for this date');
//         }
//         throw new Error('Failed to fetch data');
//       }

//       const data = await response.json();
//       setDailyData(data);
//     } catch (error) {
//       console.error("Daily fetch failed:", error);
//       setDailyError(error.message || 'Failed to load transactions');
//     } finally {
//       setIsLoadingDaily(false);
//     }
//   };

//   const renderDailyData = () => {
//     const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
//     if (!selectedDate || !dateRegex.test(selectedDate)) {
//       setDailyError("Invalid date format. Please use YYYY-MM-DD.");
//       setShowDailyPopup(true);
//       return;
//     }

//     const parsedDate = new Date(selectedDate);
//     if (isNaN(parsedDate.getTime())) {
//       setDailyError("Invalid date entered. Please select a valid date.");
//       setShowDailyPopup(true);
//       return;
//     }

//     fetchDailyTransactions(selectedDate);
//     setShowDailyPopup(true);
//   };

//   const formatDateTime = (dateTime) => {
//     return format(new Date(dateTime), 'EEE, MMM d, h:mm a');
//   };

//   // Export to CSV
//   const exportToCSV = () => {
//     if (!dailyData || !dailyData.transactions) return;

//     const headers = ['User ID', 'Name', 'Amount', 'Points Earned', 'Redeem Points', 'Redeemed Amount', 'Time'];
//     const rows = dailyData.transactions.map(tx => [
//       tx.userId,
//       tx.name,
//       tx.transactionAmount.toFixed(2),
//       tx.pointsEarned,
//       tx.redeemPoints || 0,
//       (tx.redeemAmount ?? 0).toFixed(2),
//       tx.time
//     ]);

//     const csvContent = [
//       headers.join(','),
//       ...rows.map(row => row.join(','))
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.setAttribute('href', url);
//     link.setAttribute('download', `daily_transactions_${selectedDate}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Print
//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <>
//       {/* MAIN PAGE */}
//       <div className="min-h-screen md:p-14">
//         <header className="mb-6">
//           <div className="flex justify-center">
//             <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
//               <Calendar className="w-10 h-10 mr-3 text-orange-600" />
//               DAILY TRANSACTIONS
//             </h1>
//           </div>
//         </header>

//         <main className="flex justify-center">
//           <div className="bg-white rounded-md shadow-xl p-8 md:p-12 w-full max-w-7xl border border-blue-200">
//             <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-800">
//               Daily Sales Overview
//             </h2>
//             <p className="text-slate-600 text-center mb-4">
//               Track daily sales, redemptions, and customer activity.
//             </p>
//             <p className="text-slate-500 text-center mb-8 text-sm">
//               Use this report to analyze trends and optimize your business strategies.
//             </p>

//             <div className="flex flex-col gap-6 items-center">
//               <div className="relative w-full max-w-xs">
//                 <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="w-full pl-12 pr-4 py-2 bg-slate-50 border-2 border-blue-300 rounded-sm text-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all text-lg font-medium"
//                 />
//               </div>

//               <button
//                 onClick={renderDailyData}
//                 disabled={isLoadingDaily}
//                 className={`w-full max-w-xs px-12 py-2 rounded-sm font-bold text-lg text-white shadow-lg transform hover:scale-105 transition-all flex items-center justify-center
//                   ${isLoadingDaily 
//                     ? 'bg-slate-400 cursor-wait' 
//                     : 'bg-gradient-to-r from-blue-600 to-orange-600 hover:shadow-orange-500/50'
//                   }`}
//               >
//                 {isLoadingDaily ? (
//                   <>
//                     <Loader2 className="animate-spin w-6 h-6 mr-3" />
//                     Loading Data...
//                   </>
//                 ) : (
//                   <>
//                     <Calendar className="w-6 h-6 mr-3" />
//                     View Day's Report
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </main>

//         {/* DAILY POPUP */}
//         {showDailyPopup && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 print:hidden">
//             <div className="bg-white rounded-md shadow-2xl w-full max-w-7xl h-[92vh] flex flex-col overflow-hidden border border-blue-200">
//               {/* HEADER */}
//               <div className="bg-gradient-to-r from-blue-600 to-orange-600 p-6 md:p-2 rounded-t-md flex justify-between items-center shrink-0">
//                 <div>
//                   <h2 className="text-2xl md:text-3xl font-black text-white">
//                     Daily Transactions - {format(new Date(selectedDate), 'MMMM d, yyyy')}
//                   </h2>
//                   <p className="text-blue-100 text-md mt-1">Sales & Redemption Summary</p>
//                 </div>
//                 <button
//                   onClick={() => {
//                     setShowDailyPopup(false);
//                     setDailyError('');
//                     setSelectedDate(new Date().toISOString().split('T')[0]);
//                     setDailyData(null);
//                     setUserId('');
//                   }}
//                   className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
//                 >
//                   <X className="w-6 h-6 text-white" />
//                 </button>
//               </div>

//               {/* USER SEARCH BAR */}
//               <div className="p-2 bg-blue-50 border-b-2 border-blue-200">
//                 <div className="flex gap-3 max-w-2xl mx-auto">
//                   <div className="relative flex-1">
//                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
//                     <input
//                       type="text"
//                       placeholder="Search user by ID..."
//                       value={userId}
//                       onChange={(e) => setUserId(e.target.value)}
//                       className="w-full pl-12 pr-4 py-2 bg-white border-2 border-blue-300 rounded-sm text-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all font-medium"
//                     />
//                   </div>
//                   <button
//                     onClick={searchUser}
//                     disabled={isLoadingUser}
//                     className={`px-6 py-2 rounded-sm font-bold text-white shadow-md transition-all flex items-center
//                       ${isLoadingUser
//                         ? 'bg-slate-400 cursor-wait'
//                         : 'bg-gradient-to-r from-blue-600 to-orange-600 hover:shadow-orange-500/50'
//                       }`}
//                   >
//                     {isLoadingUser ? (
//                       <>
//                         <Loader2 className="inline animate-spin w-5 h-5 mr-2" />
//                         Searching...
//                       </>
//                     ) : (
//                       <>
//                         <Search className="inline w-5 h-5 mr-2" />
//                         Search
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="flex justify-end gap-3 p-2 bg-blue-50 border-b-2 border-blue-200">
//                 <button
//                   onClick={exportToCSV}
//                   className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-semibold"
//                 >
//                   <Download className="w-5 h-5" />
//                   Export CSV
//                 </button>
//                 <button
//                   onClick={handlePrint}
//                   className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-sm hover:from-orange-700 hover:to-orange-800 transition-all shadow-lg font-semibold"
//                 >
//                   <Printer className="w-5 h-5" />
//                   Print
//                 </button>
//               </div>

//               {/* PRINTABLE CONTENT */}
//               <div ref={printRef} className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-white to-blue-50">
//                 {dailyError ? (
//                   <div className="flex flex-col items-center justify-center py-24 text-center">
//                     <AlertCircle className="w-20 h-20 text-orange-500 mb-6" />
//                     <p className="text-2xl font-bold text-slate-700">{dailyError}</p>
//                     <p className="text-slate-500 mt-3 text-lg">Try selecting a different date.</p>
//                   </div>
//                 ) : isLoadingDaily ? (
//                   <div className="flex flex-col items-center justify-center py-24">
//                     <Loader2 className="w-14 h-14 animate-spin text-blue-600 mb-6" />
//                     <p className="text-xl font-semibold text-slate-700">Loading transactions...</p>
//                   </div>
//                 ) : dailyData && dailyData.transactions?.length > 0 ? (
//                   <>
//                     {/* SUMMARY CARDS */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//                       <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-md p-6 text-center border-2 border-blue-200 shadow-md">
//                         <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-3" />
//                         <p className="text-sm font-bold text-blue-700 uppercase tracking-wider">Total Sales Today</p>
//                         <p className="text-4xl font-black text-blue-800 mt-2">${dailyData.totalSales?.toFixed(2)}</p>
//                       </div>
//                       <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-md p-6 text-center border-2 border-orange-200 shadow-md">
//                         <Gift className="w-12 h-12 text-orange-600 mx-auto mb-3" />
//                         <p className="text-sm font-bold text-orange-700 uppercase tracking-wider">Total Redeemed</p>
//                         <p className="text-4xl font-black text-orange-800 mt-2">${dailyData.totalRedeemed?.toFixed(2)}</p>
//                       </div>
//                       <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-md p-6 text-center border-2 border-indigo-200 shadow-md">
//                         <ShoppingBag className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
//                         <p className="text-sm font-bold text-indigo-700 uppercase tracking-wider">Total Transactions</p>
//                         <p className="text-4xl font-black text-indigo-800 mt-2">{dailyData.transactions.length}</p>
//                       </div>
//                     </div>

//                     {/* TABLE */}
//                         <div className="p-4 md:p-6">
//                         {/* Title */}
//                         <h3 className="text-2xl font-black text-slate-800 mb-5 text-center md:text-left">
//                           All Transactions
//                         </h3>

//                         {/* ---------- Desktop / Laptop View ---------- */}
//                         <div className="hidden md:block bg-white rounded-md shadow-xl border border-blue-200 overflow-hidden">
//                           {/* Table Header */}
//                           <div className="bg-gradient-to-r from-blue-600 to-orange-600 p-4">
//                             <div className="grid grid-cols-[60px_1fr_1fr_1fr_1.5fr_1fr_1fr] gap-4 text-white font-semibold text-sm uppercase tracking-wide">
//                               <span>S.No</span>
//                               <span>User ID</span>
//                               <span>Name</span>
//                               <span>Amount</span>
//                               <span>Points</span>
//                               <span>Redeemed</span>
//                               <span>Time</span>
//                             </div>
//                           </div>

//                           {/* Table Body */}
//                           <div className="max-h-[28rem] overflow-y-auto">
//                             {dailyData.transactions.map((tx, idx) => (
//                               <div
//                                 key={idx}
//                                 className="grid grid-cols-[60px_1fr_1fr_1fr_1.5fr_1fr_1fr] gap-4 p-4 border-b border-blue-100 hover:bg-orange-50 transition-colors text-sm items-center"
//                               >
//                                 <span className="font-mono text-slate-600">{idx + 1}</span>
//                                 <span className="font-mono text-blue-700">{tx.userId}</span>
//                                 <span className="font-semibold text-slate-800 truncate">{tx.name}</span>
//                                 <span className="font-bold text-orange-700">₹{tx.transactionAmount.toFixed(2)}</span>

//                                 {/* Points Column */}
//                                 <span className="flex items-center gap-2 font-semibold">
//                                   <span className="flex items-center gap-1 text-emerald-600">
//                                     <ArrowUpCircle size={16} /> +{tx.pointsEarned} pts
//                                   </span>
//                                   {tx.redeemPoints > 0 && (
//                                     <span className="flex items-center gap-1 text-rose-600">
//                                       <ArrowDownCircle size={16} /> -{tx.redeemPoints} pts
//                                     </span>
//                                   )}
//                                 </span>

//                                 {/* Redeemed Amount */}
//                                 <span
//                                   className={`font-semibold px-3 py-1 rounded-full text-xs text-center ${
//                                     (tx.redeemAmount ?? 0) === 0
//                                       ? "bg-blue-100 text-blue-700"
//                                       : "bg-orange-100 text-orange-700"
//                                   }`}
//                                 >
//                                   ₹{(tx.redeemAmount ?? 0).toFixed(2)}
//                                 </span>

//                                 {/* Time */}
//                                 <span className="text-slate-600 flex items-center whitespace-nowrap">
//                                   <Clock className="w-4 h-4 mr-1 text-blue-400" />
//                                   {format(new Date(`2000-01-01 ${tx.time}`), "h:mm a")}
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* ---------- Mobile View ---------- */}
//                         <div className="block md:hidden space-y-4 max-h-[30rem] overflow-y-auto">
//                           {dailyData.transactions.map((tx, idx) => (
//                             <div
//                               key={idx}
//                               className="p-4 bg-white rounded-md shadow-md border border-blue-100 hover:bg-orange-50 transition-all"
//                             >
//                               {/* Top Row */}
//                               <div className="flex justify-between items-center mb-2">
//                                 <span className="text-xs font-semibold text-slate-500">#{idx + 1}</span>
//                                 <span className="text-blue-700 text-sm font-semibold">CUST - {tx.userId}</span>
//                               </div>

//                               {/* Name */}
//                               <div className="mb-1">
//                                 <span className="font-bold text-slate-800">Name : {tx.name}</span>
//                               </div>

//                               {/* Amount */}
//                               <div className="flex justify-between items-center mb-2">
//                                 <span className="text-slate-600 font-semibold">Amount:</span>
//                                 <span className="font-bold text-orange-700">
//                                   ₹{tx.transactionAmount.toFixed(2)}
//                                 </span>
//                               </div>

//                               {/* Points */}
//                               <div className="flex justify-between items-center mb-2">
//                                 <span className="text-slate-600 font-semibold">Points:</span>
//                                 <span className="flex items-center gap-2 font-semibold">
//                                   <span className="flex items-center gap-1 text-emerald-600">
//                                     <ArrowUpCircle size={16} /> +{tx.pointsEarned} pts
//                                   </span>
//                                   {tx.redeemPoints > 0 && (
//                                     <span className="flex items-center gap-1 text-rose-600">
//                                       <ArrowDownCircle size={16} /> -{tx.redeemPoints} pts
//                                     </span>
//                                   )}
//                                 </span>
//                               </div>

//                               {/* Redeemed */}
//                               <div className="flex justify-between items-center mb-2">
//                                 <span className="text-slate-600 font-semibold">Redeemed:</span>
//                                 <span
//                                   className={`px-3 py-1 rounded-full text-xs font-bold ${
//                                     (tx.redeemAmount ?? 0) === 0
//                                       ? "bg-blue-100 text-blue-700"
//                                       : "bg-orange-100 text-orange-700"
//                                   }`}
//                                 >
//                                   ₹{(tx.redeemAmount ?? 0).toFixed(2)}
//                                 </span>
//                               </div>

//                               {/* Time */}
//                               <div className="flex justify-between items-center">
//                                 <span className="text-slate-600 font-semibold">Time:</span>
//                                 <span className="flex items-center text-slate-700 text-sm">
//                                   <Clock className="w-4 h-4 mr-1 text-blue-400" />
//                                   {format(new Date(`2000-01-01 ${tx.time}`), "h:mm a")}
//                                 </span>
//                               </div>
//                             </div>
//                           ))}
//                         </div>

//                         {/* ---------- Footer ---------- */}
//                         <div className="mt-10 bg-gradient-to-r from-blue-600 to-orange-600 rounded-md p-4 text-center shadow-xl">
//                           <h3 className="text-2xl md:text-3xl font-black text-white">
//                             Total Sales Today:
//                             <span className="ml-3 font-extrabold">
//                               ₹{dailyData.totalSales?.toFixed(2)}
//                             </span>
//                           </h3>
//                         </div>
//                       </div>
//                   </>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center py-24 text-center">
//                     <AlertCircle className="w-20 h-20 text-blue-300 mb-6" />
//                     <p className="text-2xl font-bold text-slate-700">No transactions found</p>
//                     <p className="text-slate-500 mt-2 text-lg">There were no sales on this date.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* USER POPUP */}
//         {showUserPopup && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 print:hidden">
//             <div className="bg-white rounded-md shadow-2xl w-full max-w-7xl h-[92vh] flex flex-col overflow-hidden border-2 border-orange-200">
//               <div className="bg-gradient-to-r from-blue-600 to-orange-600 p-6 md:p-2 rounded-t-md flex justify-between items-center">
//                 <div>
//                   <h2 className="text-2xl md:text-3xl font-black text-white">
//                     {popupTitle === 'Error' 
//                       ? 'Error' 
//                       : userData 
//                         ? `${userData.firstName || ''} ${userData.lastName || ''}'s Profile`.trim() || 'User Profile'
//                         : 'User Profile'
//                     }
//                   </h2>
//                   {userData && (
//                     <p className="text-blue-100 text-md mt-1">Profile ID: {userData.userId || userId}</p>
//                   )}
//                 </div>
//                 <button
//                   onClick={() => {
//                     setShowUserPopup(false);
//                     setUserError('');
//                     setUserId('');
//                     setUserData(null);
//                     setPopupTitle('User Profile');
//                   }}
//                   className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
//                 >
//                   <X className="w-6 h-6 text-white" />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-white to-blue-50">
//                 {userError ? (
//                   <div className="flex flex-col items-center justify-center py-24 text-center">
//                     <AlertCircle className="w-20 h-20 text-orange-500 mb-6" />
//                     <p className="text-2xl font-bold text-slate-700">{userError}</p>
//                   </div>
//                 ) : userData ? (
//                   <>
//                     {userData.transactions && userData.transactions.length > 0 ? (
//                       <>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//                           <Card 
//                             icon={Gift} 
//                             color="text-blue-600" 
//                             bg="from-blue-50 to-blue-100"
//                             title="Available Points" 
//                             value={userData.availablePoints} 
//                             unit="pts" 
//                           />
//                           <Card 
//                             icon={DollarSign} 
//                             color="text-orange-600" 
//                             bg="from-orange-50 to-orange-100"
//                             title="Total Spend" 
//                             value={`$${userData.totalSpend?.toFixed(2) || 0}`} 
//                           />
//                           <Card 
//                             icon={ShoppingBag} 
//                             color="text-indigo-600" 
//                             bg="from-indigo-50 to-indigo-100"
//                             title="Total Visits" 
//                             value={userData.totalVisits} 
//                           />
//                           <Card 
//                             icon={TrendingUp} 
//                             color="text-amber-600" 
//                             bg="from-amber-50 to-amber-100"
//                             title="Total Redeemed" 
//                             value={`$${userData.totalRedeemedAmount?.toFixed(2) || 0}`} 
//                           />
//                         </div>

//                         <div className="p-4 md:p-6">
//                           <h3 className="text-2xl font-black text-slate-800 mb-5 text-center md:text-left">
//                             Transaction History
//                           </h3>

//                           <div className="bg-white rounded-md shadow-xl border border-blue-200 overflow-hidden">
//                             {/* ---------- Desktop / Laptop View ---------- */}
//                             <div className="hidden md:grid grid-cols-[60px_1.5fr_1fr_1.5fr_1fr] bg-gradient-to-r from-blue-600 to-orange-600 p-4 text-white font-semibold text-sm uppercase tracking-wide">
//                               <span>S.No</span>
//                               <span>Date & Time</span>
//                               <span>Amount</span>
//                               <span>Points</span>
//                               <span>Redeemed</span>
//                             </div>

//                             <div className="hidden md:block max-h-[28rem] overflow-y-auto">
//                               {userData.transactions.map((tx, index) => (
//                                 <div
//                                   key={index}
//                                   className="grid grid-cols-[60px_1.5fr_1fr_1.5fr_1fr] items-center gap-4 p-4 border-b border-blue-100 hover:bg-orange-50 transition-colors text-sm"
//                                 >
//                                   <span className="text-slate-700 font-medium">{index + 1}</span>
//                                   <span className="text-blue-700">{formatDateTime(tx.purchaseDate)}</span>
//                                   <span className="font-bold text-orange-700">
//                                     ${(tx.transactionAmount ?? 0).toFixed(2)}
//                                   </span>
//                                   <span className="flex items-center gap-2 font-semibold">
//                                     <span className="flex items-center gap-1 text-emerald-600">
//                                       <ArrowUpCircle size={16} /> +{tx.pointsEarned} pts
//                                     </span>
//                                     {tx.redeemPoints > 0 && (
//                                       <span className="flex items-center gap-1 text-rose-600">
//                                         <ArrowDownCircle size={16} /> -{tx.redeemPoints} pts
//                                       </span>
//                                     )}
//                                   </span>
//                                   <span
//                                     className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${
//                                       (tx.redeemAmount ?? 0) === 0
//                                         ? "bg-blue-100 text-blue-700"
//                                         : "bg-orange-100 text-orange-700"
//                                     }`}
//                                   >
//                                     ${(tx.redeemAmount ?? 0).toFixed(2)}
//                                   </span>
//                                 </div>
//                               ))}
//                             </div>

//                             {/* ---------- Mobile View ---------- */}
//                             <div className="block md:hidden max-h-[30rem] overflow-y-auto divide-y divide-blue-100">
//                               {userData.transactions.map((tx, index) => (
//                                 <div
//                                   key={index}
//                                   className="p-4 bg-white hover:bg-orange-50 transition-colors rounded-md"
//                                 >
//                                   <div className="flex justify-between items-center mb-2">
//                                     <span className="text-xs font-semibold text-slate-500">#{index + 1}</span>
//                                     <span className="text-sm text-blue-700 font-medium">
//                                       {formatDateTime(tx.purchaseDate)}
//                                     </span>
//                                   </div>

//                                   <div className="flex justify-between items-center mb-2">
//                                     <span className="text-slate-600 font-semibold">Amount:</span>
//                                     <span className="text-orange-700 font-bold">
//                                       ${(tx.transactionAmount ?? 0).toFixed(2)}
//                                     </span>
//                                   </div>

//                                   <div className="flex justify-between items-center mb-2">
//                                     <span className="text-slate-600 font-semibold">Points:</span>
//                                     <span className="flex items-center gap-2 font-semibold">
//                                       <span className="flex items-center gap-1 text-emerald-600">
//                                         <ArrowUpCircle size={16} /> +{tx.pointsEarned} pts
//                                       </span>
//                                       {tx.redeemPoints > 0 && (
//                                         <span className="flex items-center gap-1 text-rose-600">
//                                           <ArrowDownCircle size={16} /> -{tx.redeemPoints} pts
//                                         </span>
//                                       )}
//                                     </span>
//                                   </div>

//                                   <div className="flex justify-between items-center">
//                                     <span className="text-slate-600 font-semibold">Redeemed:</span>
//                                     <span
//                                       className={`px-3 py-1 rounded-full text-xs font-bold ${
//                                         (tx.redeemAmount ?? 0) === 0
//                                           ? "bg-blue-100 text-blue-700"
//                                           : "bg-orange-100 text-orange-700"
//                                       }`}
//                                     >
//                                       ${(tx.redeemAmount ?? 0).toFixed(2)}
//                                     </span>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </> 
//                     ) : (
//                       <div className="flex flex-col items-center justify-center h-full text-center py-24">
//                         <AlertCircle className="w-20 h-20 text-blue-300 mb-6" />
//                         <p className="text-2xl font-bold text-slate-700">
//                           No transaction history available for this user.
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* PRINT STYLES */}
//       <style jsx>{`
//         @media print {
//           body * {
//             visibility: hidden;
//           }
//           .print-content, .print-content * {
//             visibility: visible;
//           }
//           .print-content {
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 100%;
//           }
//           .print\\:hidden {
//             display: none !important;
//           }
//           @page {
//             margin: 0.5cm;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// const Card = ({ icon: Icon, color, bg, title, value, unit }) => (
//   <div className={`bg-gradient-to-br ${bg} rounded-md p-6 shadow-lg border-2 border-white/50`}>
//     <div className={`p-3 rounded-full inline-block mb-4 bg-white/70 shadow-md`}>
//       <Icon className={`w-8 h-8 ${color}`} />
//     </div>
//     <p className="text-3xl font-black text-slate-800 leading-none">{value}</p>
//     <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mt-2">{title} {unit && `(${unit})`}</p>
//   </div>
// );

// export default DailyTransaction;












//translated code
import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, X, Gift, DollarSign, ArrowUpCircle, ArrowDownCircle, ShoppingBag, TrendingUp, Loader2, Clock, AlertCircle, Download, Printer } from 'lucide-react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next'; // ← AÑADIDO (i18n)

const DailyTransaction = () => {
  const { t } = useTranslation(); // ← AÑADIDO

  const [popupTitle, setPopupTitle] = useState(t('daily.popup.userProfile'));
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showDailyPopup, setShowDailyPopup] = useState(false);
  const [userId, setUserId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [userData, setUserData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingDaily, setIsLoadingDaily] = useState(false);
  const [userError, setUserError] = useState('');
  const [dailyError, setDailyError] = useState('');

  const shopId = localStorage.getItem('id');
  const printRef = useRef();

  const searchUser = async () => {
    if (!userId.trim()) return;
    setIsLoadingUser(true);
    setUserData(null);
    setUserError('');

    try {
      const response = await fetch(
        `https://loyalty-backend-java.onrender.com/api/dashboard/transactions/${userId}/${shopId}`,
        { method: 'GET', credentials: 'include' }
      );

      const data = await response.json();

      if (!response.ok) {
        setPopupTitle(t('daily.popup.error'));
        setUserError(data.error || data.message || t('daily.errors.unknown'));
        setShowUserPopup(true);
        return;
      }

      if (!data.transactions || data.transactions.length === 0) {
        setPopupTitle(t('daily.popup.userProfile'));
        setUserError(t('daily.errors.noTransactionsUser'));
        setShowUserPopup(true);
        return;
      }

      setPopupTitle(t('daily.popup.userProfile'));
      setUserData(data);
      setShowUserPopup(true);
    } catch (error) {
      setPopupTitle(t('daily.popup.error'));
      setUserError(t('daily.errors.network'));
      setShowUserPopup(true);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const fetchDailyTransactions = async (date) => {
    setIsLoadingDaily(true);
    setDailyData(null);
    setDailyError('');

    try {
      const response = await fetch(
        `https://loyalty-backend-java.onrender.com/api/dashboard/date_transactions/${shopId}/${date}`,
        { method: 'GET', credentials: 'include' }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(t('daily.errors.noTransactionsDate'));
        }
        throw new Error(t('daily.errors.fetchFailed'));
      }

      const data = await response.json();
      setDailyData(data);
    } catch (error) {
      console.error("Daily fetch failed:", error);
      setDailyError(error.message || t('daily.errors.loadFailed'));
    } finally {
      setIsLoadingDaily(false);
    }
  };

  const renderDailyData = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!selectedDate || !dateRegex.test(selectedDate)) {
      setDailyError(t('daily.errors.invalidDateFormat'));
      setShowDailyPopup(true);
      return;
    }

    const parsedDate = new Date(selectedDate);
    if (isNaN(parsedDate.getTime())) {
      setDailyError(t('daily.errors.invalidDate'));
      setShowDailyPopup(true);
      return;
    }

    fetchDailyTransactions(selectedDate);
    setShowDailyPopup(true);
  };

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), 'EEE, MMM d, h:mm a');
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!dailyData || !dailyData.transactions) return;

    const headers = [t('daily.csv.userId'), t('daily.csv.name'), t('daily.csv.amount'), t('daily.csv.pointsEarned'), t('daily.csv.redeemPoints'), t('daily.csv.redeemedAmount'), t('daily.csv.time')];
    const rows = dailyData.transactions.map(tx => [
      tx.userId,
      tx.name,
      tx.transactionAmount.toFixed(2),
      tx.pointsEarned,
      tx.redeemPoints || 0,
      (tx.redeemAmount ?? 0).toFixed(2),
      tx.time
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `daily_transactions_${selectedDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* MAIN PAGE */}
      <div className="min-h-screen md:p-14 p-14">
        <header className="mb-6">
          <div className="flex justify-center">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
              <Calendar className="w-10 h-10 mr-3 text-orange-600" />
              {t('daily.page.title')}
            </h1>
          </div>
        </header>

        <main className="flex justify-center">
          <div className="bg-white rounded-md shadow-xl p-8 md:p-12 w-full max-w-5xl border border-blue-200">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-800">
              {t('daily.page.subtitle')}
            </h2>
            <p className="text-slate-600 text-center mb-4">
              {t('daily.page.description')}
            </p>
            <p className="text-slate-500 text-center mb-8 text-sm">
              {t('daily.page.hint')}
            </p>

            <div className="flex flex-col gap-6 items-center">
              <div className="relative w-full max-w-xs">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 bg-slate-50 border-2 border-blue-300 rounded-sm text-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all text-lg font-medium"
                />
              </div>

              <button
                onClick={renderDailyData}
                disabled={isLoadingDaily}
                className={`w-full max-w-xs px-12 py-2 rounded-sm font-bold text-lg text-white shadow-lg transform hover:scale-105 transition-all flex items-center justify-center
                  ${isLoadingDaily 
                    ? 'bg-slate-400 cursor-wait' 
                    : 'bg-gradient-to-r from-blue-600 to-orange-600 hover:shadow-orange-500/50'
                  }`}
              >
                {isLoadingDaily ? (
                  <>
                    <Loader2 className="animate-spin w-6 h-6 mr-3" />
                    {t('daily.buttons.loading')}
                  </>
                ) : (
                  <>
                    <Calendar className="w-6 h-6 mr-3" />
                    {t('daily.buttons.viewReport')}
                  </>
                )}
              </button>
            </div>
          </div>
        </main>

        {/* DAILY POPUP */}
        {showDailyPopup && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 print:hidden">
            <div className="bg-white rounded-md shadow-2xl w-full max-w-7xl h-[92vh] flex flex-col overflow-hidden border border-blue-200">
              {/* HEADER */}
              <div className="bg-gradient-to-r from-blue-600 to-orange-600 p-6 md:p-2 rounded-t-md flex justify-between items-center shrink-0">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white">
                    {t('daily.popup.dailyTitle', { date: format(new Date(selectedDate), 'MMMM d, yyyy') })}
                  </h2>
                  <p className="text-blue-100 text-md mt-1">{t('daily.popup.dailySubtitle')}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDailyPopup(false);
                    setDailyError('');
                    setSelectedDate(new Date().toISOString().split('T')[0]);
                    setDailyData(null);
                    setUserId('');
                  }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* USER SEARCH BAR */}
              <div className="p-2 bg-blue-50 border-b-2 border-blue-200">
                <div className="flex gap-3 max-w-2xl mx-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={t('daily.search.placeholder')}
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full pl-12 pr-4 py-2 bg-white border-2 border-blue-300 rounded-sm text-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <button
                    onClick={searchUser}
                    disabled={isLoadingUser}
                    className={`px-4 py-2 rounded-sm font-bold text-white shadow-md transition-all flex items-center
                      ${isLoadingUser
                        ? 'bg-slate-400 cursor-wait'
                        : 'bg-gradient-to-r from-blue-600 to-orange-600 hover:shadow-orange-500/50'
                      }`}
                  >
                    {isLoadingUser ? (
                      <>
                        <Loader2 className="inline animate-spin w-5 h-5 mr-2" />
                        {t('daily.search.searching')}
                      </>
                    ) : (
                      <>
                        <Search className="inline w-5 h-5 mr-2" />
                        {t('daily.search.button')}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 p-2 bg-blue-50 border-b-2 border-blue-200">
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-semibold"
                >
                  <Download className="w-5 h-5" />
                  {t('daily.buttons.exportCSV')}
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-sm hover:from-orange-700 hover:to-orange-800 transition-all shadow-lg font-semibold"
                >
                  <Printer className="w-5 h-5" />
                  {t('daily.buttons.print')}
                </button>
              </div>

              {/* PRINTABLE CONTENT */}
              <div ref={printRef} className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-white to-blue-50">
                {dailyError ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <AlertCircle className="w-20 h-20 text-orange-500 mb-6" />
                    <p className="text-2xl font-bold text-slate-700">{dailyError}</p>
                    <p className="text-slate-500 mt-3 text-lg">{t('daily.errors.tryAnotherDate')}</p>
                  </div>
                ) : isLoadingDaily ? (
                  <div className="flex flex-col items-center justify-center py-24">
                    <Loader2 className="w-14 h-14 animate-spin text-blue-600 mb-6" />
                    <p className="text-xl font-semibold text-slate-700">{t('daily.loading.transactions')}</p>
                  </div>
                ) : dailyData && dailyData.transactions?.length > 0 ? (
                  <>
                    {/* SUMMARY CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-md p-6 text-center border-2 border-blue-200 shadow-md">
                        <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                        <p className="text-sm font-bold text-blue-700 uppercase tracking-wider">{t('daily.summary.totalSales')}</p>
                        <p className="text-4xl font-black text-blue-800 mt-2">${dailyData.totalSales?.toFixed(2)}</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-md p-6 text-center border-2 border-orange-200 shadow-md">
                        <Gift className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                        <p className="text-sm font-bold text-orange-700 uppercase tracking-wider">{t('daily.summary.totalRedeemed')}</p>
                        <p className="text-4xl font-black text-orange-800 mt-2">${dailyData.totalRedeemed?.toFixed(2)}</p>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-md p-6 text-center border-2 border-indigo-200 shadow-md">
                        <ShoppingBag className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                        <p className="text-sm font-bold text-indigo-700 uppercase tracking-wider">{t('daily.summary.totalTransactions')}</p>
                        <p className="text-4xl font-black text-indigo-800 mt-2">{dailyData.transactions.length}</p>
                      </div>
                    </div>

                    {/* TABLE */}
                    <div className="p-4 md:p-6">
                      <h3 className="text-2xl font-black text-slate-800 mb-5 text-center md:text-left">
                        {t('daily.table.title')}
                      </h3>

                      {/* ---------- Desktop / Laptop View ---------- */}
                      <div className="hidden md:block bg-white rounded-md shadow-xl border border-blue-200 overflow-hidden">
                        {/* Table Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-orange-600 p-4">
                          <div className="grid grid-cols-[60px_1fr_1fr_1fr_1.5fr_1fr_1fr] gap-4 text-white font-semibold text-sm uppercase tracking-wide">
                            <span>{t('daily.table.sno')}</span>
                            <span>{t('daily.table.userId')}</span>
                            <span>{t('daily.table.name')}</span>
                            <span>{t('daily.table.amount')}</span>
                            <span>{t('daily.table.points')}</span>
                            <span>{t('daily.table.redeemed')}</span>
                            <span>{t('daily.table.time')}</span>
                          </div>
                        </div>

                        {/* Table Body */}
                        <div className="max-h-[28rem] overflow-y-auto">
                          {dailyData.transactions.map((tx, idx) => (
                            <div
                              key={idx}
                              className="grid grid-cols-[60px_1fr_1fr_1fr_1.5fr_1fr_1fr] gap-4 p-4 border-b border-blue-100 hover:bg-orange-50 transition-colors text-sm items-center"
                            >
                              <span className="font-mono text-slate-600">{idx + 1}</span>
                              <span className="font-mono text-blue-700">{tx.userId}</span>
                              <span className="font-semibold text-slate-800 truncate">{tx.name}</span>
                              <span className="font-bold text-orange-700">${tx.transactionAmount.toFixed(2)}</span>

                              {/* Points Column */}
                              <span className="flex items-center gap-2 font-semibold">
                                <span className="flex items-center gap-1 text-emerald-600">
                                  <ArrowUpCircle size={16} /> +{tx.pointsEarned} pts
                                </span>
                                {tx.redeemPoints > 0 && (
                                  <span className="flex items-center gap-1 text-rose-600">
                                    <ArrowDownCircle size={16} /> -{tx.redeemPoints} pts
                                  </span>
                                )}
                              </span>

                              {/* Redeemed Amount */}
                              <span
                                className={`font-semibold px-3 py-1 rounded-full text-xs text-center ${
                                  (tx.redeemAmount ?? 0) === 0
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                ${(tx.redeemAmount ?? 0).toFixed(2)}
                              </span>

                              {/* Time */}
                              <span className="text-slate-600 flex items-center whitespace-nowrap">
                                <Clock className="w-4 h-4 mr-1 text-blue-400" />
                                {format(new Date(`2000-01-01 ${tx.time}`), "h:mm a")}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ---------- Mobile View ---------- */}
                      <div className="block md:hidden space-y-4 max-h-[30rem] overflow-y-auto">
                        {dailyData.transactions.map((tx, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-white rounded-md shadow-md border border-blue-100 hover:bg-orange-50 transition-all"
                          >
                            {/* Top Row */}
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-semibold text-slate-500">#{idx + 1}</span>
                              <span className="text-blue-700 text-sm font-semibold">Cust Id - {tx.userId}</span>
                            </div>

                            {/* Name */}
                            <div className="mb-1">
                              <span className="font-bold text-slate-800">{t('daily.table.name')}: {tx.name}</span>
                            </div>

                            {/* Amount */}
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-slate-600 font-semibold">{t('daily.table.amount')}:</span>
                              <span className="font-bold text-orange-700">
                                ${tx.transactionAmount.toFixed(2)}
                              </span>
                            </div>

                            {/* Points */}
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-slate-600 font-semibold">{t('daily.table.points')}:</span>
                              <span className="flex items-center gap-2 font-semibold">
                                <span className="flex items-center gap-1 text-emerald-600">
                                  <ArrowUpCircle size={16} /> +{tx.pointsEarned} pts
                                </span>
                                {tx.redeemPoints > 0 && (
                                  <span className="flex items-center gap-1 text-rose-600">
                                    <ArrowDownCircle size={16} /> -{tx.redeemPoints} pts
                                  </span>
                                )}
                              </span>
                            </div>

                            {/* Redeemed */}
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-slate-600 font-semibold">{t('daily.table.redeemed')}:</span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  (tx.redeemAmount ?? 0) === 0
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                ${(tx.redeemAmount ?? 0).toFixed(2)}
                              </span>
                            </div>

                            {/* Time */}
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600 font-semibold">{t('daily.table.time')}:</span>
                              <span className="flex items-center text-slate-700 text-sm">
                                <Clock className="w-4 h-4 mr-1 text-blue-400" />
                                {format(new Date(`2000-01-01 ${tx.time}`), "h:mm a")}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* ---------- Footer ---------- */}
                      <div className="mt-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-md p-4 text-center shadow-xl">
                        <h3 className="text-2xl md:text-3xl font-black text-white">
                          {t('daily.summary.totalSalesToday')}:
                          <span className="ml-3 font-extrabold">
                            ${dailyData.totalSales?.toFixed(2)}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <AlertCircle className="w-20 h-20 text-blue-300 mb-6" />
                    <p className="text-2xl font-bold text-slate-700">{t('daily.errors.noTransactions')}</p>
                    <p className="text-slate-500 mt-2 text-lg">{t('daily.errors.noSalesToday')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* USER POPUP */}
        {showUserPopup && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 print:hidden">
            <div className="bg-white rounded-md shadow-2xl w-full max-w-7xl h-[92vh] flex flex-col overflow-hidden border-2 border-orange-200">
              <div className="bg-gradient-to-r from-blue-600 to-orange-600 p-6 md:p-2 rounded-t-md flex justify-between items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white">
                    {popupTitle === t('daily.popup.error') 
                      ? t('daily.popup.error') 
                      : userData 
                        ? `${userData.firstName || ''} ${userData.lastName || ''}'s Profile`.trim() || t('daily.popup.userProfile')
                        : t('daily.popup.userProfile')
                    }
                  </h2>
                  {userData && (
                    <p className="text-blue-100 text-md mt-1">{t('daily.popup.profileId')}: {userData.userId || userId}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowUserPopup(false);
                    setUserError('');
                    setUserId('');
                    setUserData(null);
                    setPopupTitle(t('daily.popup.userProfile'));
                  }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-white to-blue-50">
                {userError ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <AlertCircle className="w-20 h-20 text-orange-500 mb-6" />
                    <p className="text-2xl font-bold text-slate-700">{userError}</p>
                  </div>
                ) : userData ? (
                  <>
                    {userData.transactions && userData.transactions.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                          <Card 
                            icon={Gift} 
                            color="text-blue-600" 
                            bg="from-blue-50 to-blue-100"
                            title={t('daily.user.availablePoints')} 
                            value={userData.availablePoints} 
                            unit="pts" 
                          />
                          <Card 
                            icon={DollarSign} 
                            color="text-orange-600" 
                            bg="from-orange-50 to-orange-100"
                            title={t('daily.user.totalSpend')} 
                            value={`$${userData.totalSpend?.toFixed(2) || 0}`} 
                          />
                          <Card 
                            icon={ShoppingBag} 
                            color="text-indigo-600" 
                            bg="from-indigo-50 to-indigo-100"
                            title={t('daily.user.totalVisits')} 
                            value={userData.totalVisits} 
                          />
                          <Card 
                            icon={TrendingUp} 
                            color="text-amber-600" 
                            bg="from-amber-50 to-amber-100"
                            title={t('daily.user.totalRedeemed')} 
                            value={`$${userData.totalRedeemedAmount?.toFixed(2) || 0}`} 
                          />
                        </div>

                        <div className="p-4 md:p-6">
                          <h3 className="text-2xl font-black text-slate-800 mb-5 text-center md:text-left">
                            {t('daily.user.transactionHistory')}
                          </h3>

                          <div className="bg-white rounded-md shadow-xl border border-blue-200 overflow-hidden">
                            {/* ---------- Desktop / Laptop View ---------- */}
                            <div className="hidden md:grid grid-cols-[60px_1.5fr_1fr_1.5fr_1fr] bg-gradient-to-r from-blue-600 to-orange-600 p-4 text-white font-semibold text-sm uppercase tracking-wide">
                              <span>{t('daily.table.sno')}</span>
                              <span>{t('daily.table.dateTime')}</span>
                              <span>{t('daily.table.amount')}</span>
                              <span>{t('daily.table.points')}</span>
                              <span>{t('daily.table.redeemed')}</span>
                            </div>

                            <div className="hidden md:block max-h-[28rem] overflow-y-auto">
                              {userData.transactions.map((tx, index) => (
                                <div
                                  key={index}
                                  className="grid grid-cols-[60px_1.5fr_1fr_1.5fr_1fr] items-center gap-4 p-4 border-b border-blue-100 hover:bg-orange-50 transition-colors text-sm"
                                >
                                  <span className="text-slate-700 font-medium">{index + 1}</span>
                                  <span className="text-blue-700">{formatDateTime(tx.purchaseDate)}</span>
                                  <span className="font-bold text-orange-700">
                                    ${(tx.transactionAmount ?? 0).toFixed(2)}
                                  </span>
                                  <span className="flex items-center gap-2 font-semibold">
                                    <span className="flex items-center gap-1 text-emerald-600">
                                      <ArrowUpCircle size={16} /> +{tx.pointsEarned} pts
                                    </span>
                                    {tx.redeemPoints > 0 && (
                                      <span className="flex items-center gap-1 text-rose-600">
                                        <ArrowDownCircle size={16} /> -{tx.redeemPoints} pts
                                      </span>
                                    )}
                                  </span>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${
                                      (tx.redeemAmount ?? 0) === 0
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-orange-100 text-orange-700"
                                    }`}
                                  >
                                    ${(tx.redeemAmount ?? 0).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* ---------- Mobile View ---------- */}
                            <div className="block md:hidden max-h-[30rem] overflow-y-auto divide-y divide-blue-100">
                              {userData.transactions.map((tx, index) => (
                                <div
                                  key={index}
                                  className="p-4 bg-white hover:bg-orange-50 transition-colors rounded-md"
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs  font-semibold text-slate-500">#{index + 1}</span>
                                    <span className="text-sm text-blue-700 font-medium">
                                      {formatDateTime(tx.purchaseDate)}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-600 font-semibold">{t('daily.table.amount')}:</span>
                                    <span className="text-orange-700 font-bold">
                                      ${(tx.transactionAmount ?? 0).toFixed(2)}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-600 font-semibold">{t('daily.table.points')}:</span>
                                    <span className="flex items-center gap-2 font-semibold">
                                      <span className="flex items-center gap-1 text-emerald-600">
                                        <ArrowUpCircle size={16} /> +{tx.pointsEarned} pts
                                      </span>
                                      {tx.redeemPoints > 0 && (
                                        <span className="flex items-center gap-1 text-rose-600">
                                          <ArrowDownCircle size={16} /> -{tx.redeemPoints} pts
                                        </span>
                                      )}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-slate-600 font-semibold">{t('daily.table.redeemed')}:</span>
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        (tx.redeemAmount ?? 0) === 0
                                          ? "bg-blue-100 text-blue-700"
                                          : "bg-orange-100 text-orange-700"
                                      }`}
                                    >
                                      ${(tx.redeemAmount ?? 0).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </> 
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center py-24">
                        <AlertCircle className="w-20 h-20 text-blue-300 mb-6" />
                        <p className="text-2xl font-bold text-slate-700">
                          {t('daily.errors.noHistory')}
                        </p>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PRINT STYLES */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content, .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            margin: 0.5cm;
          }
        }
      `}</style>
    </>
  );
};

const Card = ({ icon: Icon, color, bg, title, value, unit }) => (
  <div className={`bg-gradient-to-br ${bg} rounded-md p-6 shadow-lg border-2 border-white/50`}>
    <div className={`p-3 rounded-full inline-block mb-4 bg-white/70 shadow-md`}>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
    <p className="text-3xl font-black text-slate-800 leading-none">{value}</p>
    <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mt-2">{title} {unit && `(${unit})`}</p>
  </div>
);

export default DailyTransaction;