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
import { Search, Calendar, X, Gift, Banknote, ArrowUpCircle, ArrowDownCircle, ShoppingBag, TrendingUp, Loader2, Clock, AlertCircle, Download, Printer,CheckCircle2, 
  BarChart3, 
  Zap, 
  Info,
  ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next'; 
import { API_BASE_URL } from '../../apiConfig';
import { getCurrencySymbol } from "../../utils/currency";
import { fetchWithAuth } from "../../auth/fetchWithAuth";

const DailyTransaction = () => {
  const { t } = useTranslation();

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

  const country = localStorage.getItem("country");
  const currencySymbol = getCurrencySymbol(country);

  const shopId = localStorage.getItem('id');
  const printRef = useRef();

  const searchUser = async () => {
    if (!userId.trim()) return;
    setIsLoadingUser(true);
    setUserData(null);
    setUserError('');

    try {
      const response = await fetchWithAuth(
        `${API_BASE_URL}/api/dashboard/transactions/${userId}/${shopId}`,
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
      const response = await fetchWithAuth(
        `${API_BASE_URL}/api/dashboard/date_transactions/${shopId}/${date}`,
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
      {/* <div className="min-h-screen py-20 sm:py-16 px-4 sm:px-6 lg:px-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex justify-center">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <Calendar className="w-9 h-9 sm:w-10 sm:h-10 text-blue-600" />
              {t('daily.page.title')}
            </h1>
          </div>
        </header>

        <main className="flex justify-center">
          <div className="p-8 md:p-12 w-full max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-700">
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
                  className="w-full pl-12 pr-4 py-2 bg-slate-50 border-2 border-blue-300 rounded-full text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all text-lg font-medium"
                />
              </div>

              <button
                onClick={renderDailyData}
                disabled={isLoadingDaily}
                className={`w-full max-w-xs px-12 py-2 rounded-full font-bold text-lg text-white shadow-lg transform hover:scale-105 transition-all flex items-center justify-center
                  ${isLoadingDaily 
                    ? 'bg-slate-400 cursor-wait' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-blue-500/50'
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
        </main> */}
        <div className="min-h-screen bg-slate-50/50 selection:bg-blue-100 selection:text-blue-700">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[grid-slate-200/[0.04]] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          
          {/* --- Header Section --- */}
          <header className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
              <div>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
                  <Calendar className="w-4 h-4" />
                  {t('daily.page.title')}
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                  {t('daily.page.subtitle')}
                </h1>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-slate-500 text-sm font-medium">
                  {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* --- Left Column: Action Card --- */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
                <div className="p-8 md:p-12">
                  <div className="max-w-xl mx-auto text-center lg:text-left">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">
                      {t('daily.page.description')}
                    </h2>
                    <p className="text-slate-500 mb-10 leading-relaxed">
                      {t('daily.page.hint')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                      {/* Date Input Wrapper */}
                      <div className="relative w-full sm:max-w-xs group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full pl-12 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all font-semibold"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={renderDailyData}
                        disabled={isLoadingDaily}
                        className={`w-full sm:w-auto px-10 py-2 rounded-full font-bold text-white shadow-lg shadow-blue-500/20 transform hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center whitespace-nowrap
                          ${isLoadingDaily 
                            ? 'bg-slate-400 cursor-wait' 
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                          }`}
                      >
                        {isLoadingDaily ? (
                          <>
                            <Loader2 className="animate-spin w-5 h-5 mr-3" />
                            {t('daily.buttons.loading')}
                          </>
                        ) : (
                          <>
                            {t('daily.buttons.viewReport')}
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Lower Illustration/Preview Placeholder */}
                <div className="bg-slate-50 border-t border-slate-200 p-8">
                  <div className="grid grid-cols-3 gap-4 opacity-40">
                    <div className="h-20 bg-slate-200 rounded-xl animate-pulse" />
                    <div className="h-20 bg-slate-200 rounded-xl animate-pulse delay-75" />
                    <div className="h-20 bg-slate-200 rounded-xl animate-pulse delay-150" />
                  </div>
                  <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-tighter mt-4">
                    {t('daily.report.previewPlaceholder')}
                  </p>
                </div>
              </div>
            </div>

            {/* --- Right Column: Info Panel --- */}
            <aside className="lg:col-span-5 xl:col-span-4 space-y-6">
              
              {/* Info Card 1: What it does */}
              <div className="bg-indigo-600 rounded-xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
                <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-indigo-500/50 rotate-12 group-hover:scale-110 transition-transform duration-500" />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    {t('daily.dailyInsights.title')}
                  </h3>
                  <ul className="space-y-4 text-indigo-100 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0" />
                      <span>{t('daily.dailyInsights.points.tracking')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0" />
                      <span>{t('daily.dailyInsights.points.metrics')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0" />
                      <span>{t('daily.dailyInsights.points.security')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Info Card 2: Quick Tips */}
              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  {t('daily.dailyReports.title')}
                </h3>
                <div className="space-y-6">
                  <div className="group">
                    <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{t('daily.dailyReports.tips.compare.title')}</p>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{t('daily.dailyReports.tips.compare.desc')}</p>
                  </div>
                  <div className="group">
                    <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{t('daily.dailyReports.tips.export.title')}</p>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{t('daily.dailyReports.tips.export.desc')}</p>
                  </div>
                </div>
              </div>

            </aside>
          </main>
        </div>

        {/* DAILY POPUP */}
        {/* {showDailyPopup && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 print:hidden">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden border border-blue-200">
              
              <div className="bg-blue-600 p-6 md:p-2 rounded-t-xl flex justify-between items-center shrink-0">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                    {t('daily.popup.dailyTitle', { date: format(new Date(selectedDate), 'MMMM d, yyyy') })}
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base mt-1">{t('daily.popup.dailySubtitle')}</p>
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

              <div className="p-2 bg-blue-50 border-b-2 border-blue-200">
                <div className="flex gap-3 max-w-2xl mx-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={t('daily.search.placeholder')}
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full pl-12 pr-4 py-1.5 bg-white border-2 border-blue-300 rounded-full text-slate-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <button
                    onClick={searchUser}
                    disabled={isLoadingUser}
                    className={`px-4 py-1.5 rounded-full font-bold text-white shadow-md transition-all flex items-center
                      ${isLoadingUser
                        ? 'bg-slate-400 cursor-wait'
                        : 'bg-blue-600 hover:shadow-violet-500/50'
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

              <div className="flex justify-end gap-3 p-2 bg-blue-50 border-b-2 border-blue-200 print:hidden">
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-semibold"
                >
                  <Download className="w-5 h-5" />
                  {t('daily.buttons.exportCSV')}
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-5 py-2 bg-violet-600 text-white rounded-full hover:from-violet-700 hover:to-violet-800 transition-all shadow-lg font-semibold"
                >
                  <Printer className="w-5 h-5" />
                  {t('daily.buttons.print')}
                </button>
              </div>

              <div ref={printRef} className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-white to-blue-50 print-content">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 mb-10">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border-2 border-blue-200 shadow-md">
                        <Banknote className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                        <p className="text-sm font-bold text-blue-700 uppercase tracking-wider">{t('daily.summary.totalSales')}</p>
                        <p className="text-4xl font-black text-blue-800 mt-2">{currencySymbol}{dailyData.totalSales?.toFixed(2)}</p>
                      </div>
                      <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-6 text-center border-2 border-violet-200 shadow-md">
                        <Gift className="w-12 h-12 text-violet-600 mx-auto mb-3" />
                        <p className="text-sm font-bold text-violet-700 uppercase tracking-wider">{t('daily.summary.totalRedeemed')}</p>
                        <p className="text-4xl font-black text-violet-800 mt-2">{currencySymbol}{dailyData.totalRedeemed?.toFixed(2)}</p>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 text-center border-2 border-indigo-200 shadow-md">
                        <ShoppingBag className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                        <p className="text-sm font-bold text-indigo-700 uppercase tracking-wider">{t('daily.summary.totalTransactions')}</p>
                        <p className="text-4xl font-black text-indigo-800 mt-2">{dailyData.transactions.length}</p>
                      </div>
                    </div>

                    <div className="p-4 md:p-6">
                      <h3 className="text-2xl font-black text-slate-800 mb-5 text-center md:text-left">
                        {t('daily.table.title')}
                      </h3>

                      <div className="hidden md:block bg-white rounded-xl shadow-xl border border-blue-200 overflow-hidden">
                        
                        <div className="bg-blue-600 p-4">
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

                        <div className="max-h-[28rem] overflow-y-auto">
                          {dailyData.transactions.map((tx, idx) => (
                            <div
                              key={idx}
                              className="grid grid-cols-[60px_1fr_1fr_1fr_1.5fr_1fr_1fr] gap-4 p-4 border-b border-blue-100 hover:bg-blue-50 transition-colors text-sm items-center"
                            >
                              <span className="font-mono text-slate-600">{idx + 1}</span>
                              <span className="font-mono text-blue-700">{tx.userId}</span>
                              <span className="font-semibold text-slate-800 truncate">{tx.name}</span>
                              <span className="font-bold text-violet-700">{currencySymbol}{tx.transactionAmount.toFixed(2)}</span>

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
                                className={`font-semibold px-3 py-1 rounded-full text-xs text-center ${
                                  (tx.redeemAmount ?? 0) === 0
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-teal-100 text-teal-700"
                                }`}
                              >
                                {currencySymbol}{(tx.redeemAmount ?? 0).toFixed(2)}
                              </span>

                              <span className="text-slate-600 flex items-center whitespace-nowrap">
                                <Clock className="w-4 h-4 mr-1 text-blue-400" />
                                {format(new Date(`2000-01-01 ${tx.time}`), "h:mm a")}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="block md:hidden space-y-4 max-h-[30rem] overflow-y-auto">
                        {dailyData.transactions.map((tx, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-white rounded-xl border border-blue-100 hover:bg-blue-50 transition-all"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-semibold text-slate-500">#{idx + 1}</span>
                              <span className="text-blue-700 text-sm font-semibold">Cust Id - {tx.userId}</span>
                            </div>

                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-slate-800">{t('daily.table.name')}:</span>
                              <span className="font-bold">
                                 {tx.name}
                              </span>
                            </div>

                            <div className="flex justify-between items-center mb-2">
                              <span className="text-slate-600 font-semibold">{t('daily.table.amount')}:</span>
                              <span className="font-bold text-violet-700">
                                {currencySymbol}{tx.transactionAmount.toFixed(2)}
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

                            <div className="flex justify-between items-center mb-2">
                              <span className="text-slate-600 font-semibold">{t('daily.table.redeemed')}:</span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  (tx.redeemAmount ?? 0) === 0
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-teal-100 text-teal-700"
                                }`}
                              >
                                {currencySymbol}{(tx.redeemAmount ?? 0).toFixed(2)}
                              </span>
                            </div>

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

                      <div className="mt-10 bg-blue-600 rounded-xl p-4 text-center shadow-xl">
                        <h3 className="text-2xl md:text-3xl font-black text-white">
                          {t('daily.summary.totalSalesToday')}:
                          <span className="ml-3 font-extrabold">
                            {currencySymbol}{dailyData.totalSales?.toFixed(2)}
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
        )} */}


        {showDailyPopup && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 lg:p-12 print:hidden animate-in fade-in duration-300">
            <div className="bg-white rounded-[1rem] shadow-2xl w-full max-w-7xl h-[94vh] flex flex-col overflow-hidden border border-slate-200">
              
              {/* MODAL HEADER - Minimal & Clean */}
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center shrink-0">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    {t('daily.popup.dailyTitle', { date: format(new Date(selectedDate), 'MMMM d, yyyy') })}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium mt-0.5">{t('daily.popup.dailySubtitle')}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDailyPopup(false);
                    setDailyError('');
                    setSelectedDate(new Date().toISOString().split('T')[0]);
                    setDailyData(null);
                    setUserId('');
                  }}
                  className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center hover:bg-slate-100 hover:text-rose-600 transition-all active:scale-95 group"
                >
                  <X className="w-6 h-6 text-slate-400 group-hover:text-inherit transition-colors" />
                </button>
              </div>

              {/* TOOLBAR - Search & Actions Integrated */}
              <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search Section */}
                <div className="flex gap-2 w-full max-w-md group">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-4 h-4" />
                    <input
                      type="text"
                      placeholder={t('daily.search.placeholder')}
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full pl-11 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <button
                    onClick={searchUser}
                    disabled={isLoadingUser}
                    className={`px-6 py-1.5 rounded-full font-bold text-sm text-white shadow-sm transition-all flex items-center shrink-0 active:scale-95
                      ${isLoadingUser ? 'bg-slate-400 cursor-wait' : 'bg-slate-900 hover:bg-slate-800'}`}
                  >
                    {isLoadingUser ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      t('daily.search.button')
                    )}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 w-full lg:w-auto">
                  <button
                    onClick={exportToCSV}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full hover:bg-slate-50 transition-all font-bold text-sm active:scale-95"
                  >
                    <Download className="w-4 h-4 text-blue-600" />
                    {t('daily.buttons.exportCSV')}
                  </button>
                  {/* <button
                    onClick={handlePrint}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full hover:bg-slate-50 transition-all font-bold text-sm active:scale-95"
                  >
                    <Printer className="w-4 h-4 text-indigo-600" />
                    {t('daily.buttons.print')}
                  </button> */}
                </div>
              </div>

              {/* CONTENT AREA */}
              <div ref={printRef} className="flex-1 overflow-y-auto p-8 bg-white print-content scrollbar-thin scrollbar-thumb-slate-200">
                {dailyError ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center mb-6">
                      <AlertCircle className="w-10 h-10" />
                    </div>
                    <p className="text-2xl font-black text-slate-900 tracking-tight">{dailyError}</p>
                    <p className="text-slate-500 mt-2 font-medium">{t('daily.errors.tryAnotherDate')}</p>
                  </div>
                ) : isLoadingDaily ? (
                  <div className="flex flex-col items-center justify-center py-24">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                      <Loader2 className="absolute inset-0 m-auto w-6 h-6 text-blue-600 animate-pulse" />
                    </div>
                    <p className="mt-6 text-slate-500 font-bold tracking-wide uppercase text-xs">{t('daily.loading.transactions')}</p>
                  </div>
                ) : dailyData && dailyData.transactions?.length > 0 ? (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    
                    {/* SUMMARY CARDS - Modern & Balanced */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                      <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 group hover:border-blue-200 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                            <Banknote className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">{t('daily.summary.totalSales')}</p>
                            <p className="text-2xl font-black text-slate-900 leading-tight">{currencySymbol}{dailyData.totalSales?.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 group hover:border-indigo-200 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                            <Gift className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">{t('daily.summary.totalRedeemed')}</p>
                            <p className="text-2xl font-black text-slate-900 leading-tight">{currencySymbol}{dailyData.totalRedeemed?.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900 rounded-xl p-6 shadow-xl shadow-slate-200 group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white">
                            <ShoppingBag className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">{t('daily.summary.totalTransactions')}</p>
                            <p className="text-2xl font-black text-white leading-tight">{dailyData.transactions.length}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TABLE SECTION */}
                    <div className="relative">
                      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                        {t('daily.table.title')}
                      </h3>

                      {/* DESKTOP TABLE */}
                      <div className="hidden md:block">
                        <table className="w-full border-separate border-spacing-0">
                          <thead className="sticky top-0 z-10 bg-white">
                            <tr className="text-left">
                              <th className="pb-4 pt-0 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">{t('daily.table.sno')}</th>
                              <th className="pb-4 pt-0 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">{t('daily.table.userId')}</th>
                              <th className="pb-4 pt-0 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">{t('daily.table.name')}</th>
                              <th className="pb-4 pt-0 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">{t('daily.table.amount')}</th>
                              <th className="pb-4 pt-0 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">{t('daily.table.points')}</th>
                              <th className="pb-4 pt-0 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">{t('daily.table.redeemed')}</th>
                              <th className="pb-4 pt-0 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">{t('daily.table.time')}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {dailyData.transactions.map((tx, idx) => (
                              <tr key={idx} className="group hover:bg-slate-50/80 transition-all">
                                <td className="py-4 px-4 font-mono text-xs text-slate-400">{(idx + 1).toString().padStart(2, '0')}</td>
                                <td className="py-4 px-4 font-mono text-xs font-bold text-blue-600">{tx.userId}</td>
                                <td className="py-4 px-4 font-bold text-slate-800 text-sm">{tx.name}</td>
                                <td className="py-4 px-4 font-black text-slate-900 text-sm">{currencySymbol}{tx.transactionAmount.toFixed(2)}</td>
                                <td className="py-4 px-4">
                                  <div className="flex flex-col gap-1">
                                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                                      <ArrowUpCircle size={14} className="stroke-[3px]" /> {tx.pointsEarned}
                                    </span>
                                    {tx.redeemPoints > 0 && (
                                      <span className="flex items-center gap-1 text-[11px] font-bold text-rose-500">
                                        <ArrowDownCircle size={14} className="stroke-[3px]" /> {tx.redeemPoints}
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                                    ${(tx.redeemAmount ?? 0) === 0 ? "bg-slate-100 text-slate-500" : "bg-teal-50 text-teal-600 border border-teal-100"}`}>
                                    {currencySymbol}{(tx.redeemAmount ?? 0).toFixed(2)}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-xs font-bold text-slate-500">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-slate-300" />
                                    {format(new Date(`2000-01-01 ${tx.time}`), "h:mm a")}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* MOBILE TABLE REPLACEMENT */}
                      <div className="md:hidden space-y-4">
                        {dailyData.transactions.map((tx, idx) => (
                          <div key={idx} className="p-5 bg-slate-50 rounded-[1rem] border border-slate-100">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('daily.table.userId')}</p>
                                <p className="text-sm font-bold text-blue-600 font-mono">{tx.userId}</p>
                              </div>
                              <span className="text-xs font-black text-slate-300">#{idx + 1}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('daily.table.name')}</p>
                                <p className="text-sm font-bold text-slate-800 truncate">{tx.name}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('daily.table.amount')}</p>
                                <p className="text-sm font-black text-slate-900">{currencySymbol}{tx.transactionAmount.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('daily.table.points')}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-emerald-600">+{tx.pointsEarned}</span>
                                  {tx.redeemPoints > 0 && <span className="text-xs font-bold text-rose-500">-{tx.redeemPoints}</span>}
                                </div>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('daily.table.time')}</p>
                                <p className="text-xs font-bold text-slate-600">{format(new Date(`2000-01-01 ${tx.time}`), "h:mm a")}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BOTTOM GRAND TOTAL */}
                    <div className="mt-12 p-6 bg-slate-900 rounded-[1rem] flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl shadow-blue-900/10">
                      <div className="text-center md:text-left">
                        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">{t('daily.summary.totalSalesToday')}</p>
                        <p className="text-2xl font-black text-white mt-1 leading-none">{currencySymbol}{dailyData.totalSales?.toFixed(2)}</p>
                      </div>
                      <div className="px-6 py-2 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">End of Report</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-xl flex items-center justify-center mb-6">
                      <AlertCircle className="w-10 h-10" />
                    </div>
                    <p className="text-2xl font-black text-slate-900 tracking-tight">{t('daily.errors.noTransactions')}</p>
                    <p className="text-slate-500 mt-2 font-medium">{t('daily.errors.noSalesToday')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* USER POPUP */}
          {/* {showUserPopup && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 print:hidden">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden border-2 border-orange-200">
              <div className="bg-blue-600 p-6 md:p-2 rounded-t-xl flex justify-between items-center">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white truncate">
                    {popupTitle === t('daily.popup.error') 
                      ? t('daily.popup.error') 
                      : userData 
                        ? `${userData.firstName || ''} ${userData.lastName || ''}'s Profile`.trim() || t('daily.popup.userProfile')
                        : t('daily.popup.userProfile')
                    }
                  </h2>
                  {userData && (
                    <p className="text-blue-100 text-sm sm:text-base mt-1">
                      {t('daily.popup.profileId')}: {userData.userId || userId}
                    </p>
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
                            icon={Banknote} 
                            color="text-orange-600" 
                            bg="from-orange-50 to-orange-100"
                            title={t('daily.user.totalSpend')} 
                            value={`${currencySymbol}${userData.totalSpend?.toFixed(2) || 0}`} 
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
                            value={`${currencySymbol}${userData.totalRedeemedAmount?.toFixed(2) || 0}`} 
                          />
                        </div>

                        <div className="p-4 md:p-6">
                          <h3 className="text-2xl font-black text-slate-800 mb-5 text-center md:text-left">
                            {t('daily.user.transactionHistory')}
                          </h3>

                          <div className="bg-white rounded-xl shadow-xl border border-blue-200 overflow-hidden">
                            
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
                                    {currencySymbol}{(tx.transactionAmount ?? 0).toFixed(2)}
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
                                    {currencySymbol}{(tx.redeemAmount ?? 0).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="block md:hidden max-h-[30rem] overflow-y-auto divide-y divide-blue-100">
                              {userData.transactions.map((tx, index) => (
                                <div
                                  key={index}
                                  className="p-4 bg-white hover:bg-orange-50 transition-colors rounded"
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
                                      {currencySymbol}{(tx.transactionAmount ?? 0).toFixed(2)}
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
                                      {currencySymbol}{(tx.redeemAmount ?? 0).toFixed(2)}
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
        )} */}

        {showUserPopup && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 print:hidden">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[92vh] flex flex-col overflow-hidden border border-slate-200">
              {/* --- Modal Header --- */}
              <div className="bg-white px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                    {popupTitle === t('daily.popup.error') 
                      ? t('daily.popup.error') 
                      : userData 
                        ? `${userData.firstName || ''} ${userData.lastName || ''}'s Profile`.trim() || t('daily.popup.userProfile')
                        : t('daily.popup.userProfile')
                    }
                  </h2>
                  {userData && (
                    <p className="text-slate-500 text-sm font-medium mt-0.5 flex items-center gap-2">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 text-xs">
                        {t('daily.popup.profileId')}: {userData.userId || userId}
                      </span>
                    </p>
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
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
                {userError ? (
                  <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                      <AlertCircle className="w-10 h-10 text-rose-500" />
                    </div>
                    <p className="text-xl font-semibold text-slate-800">{userError}</p>
                  </div>
                ) : userData ? (
                  <div className="p-6 md:p-8">
                    {userData.transactions && userData.transactions.length > 0 ? (
                      <>
                        {/* --- Summary Cards Section --- */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-10">
                          <Card 
                            icon={Gift} 
                            color="text-indigo-600" 
                            bg="bg-white"
                            title={t('daily.user.availablePoints')} 
                            value={userData.availablePoints} 
                            unit="pts" 
                          />
                          <Card 
                            icon={Banknote} 
                            color="text-emerald-600" 
                            bg="bg-white"
                            title={t('daily.user.totalSpend')} 
                            value={`${currencySymbol}${userData.totalSpend?.toFixed(2) || 0}`} 
                          />
                          <Card 
                            icon={ShoppingBag} 
                            color="text-blue-600" 
                            bg="bg-white"
                            title={t('daily.user.totalVisits')} 
                            value={userData.totalVisits} 
                          />
                          <Card 
                            icon={TrendingUp} 
                            color="text-amber-600" 
                            bg="bg-white"
                            title={t('daily.user.totalRedeemed')} 
                            value={`${currencySymbol}${userData.totalRedeemedAmount?.toFixed(2) || 0}`} 
                          />
                        </div>

                        {/* --- Transaction History --- */}
                        <div className="space-y-6">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider">
                              {t('daily.user.transactionHistory')}
                            </h3>
                          </div>

                          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                            {/* ---------- Desktop Table ---------- */}
                            <div className="hidden md:block overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50/80 sticky top-0 backdrop-blur-sm">
                                  <tr className="border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-20">{t('daily.table.sno')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('daily.table.dateTime')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('daily.table.amount')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('daily.table.points')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('daily.table.redeemed')}</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {userData.transactions.map((tx, index) => (
                                    <tr key={index} className="group hover:bg-slate-50/80 transition-colors">
                                      <td className="px-6 py-4 text-sm font-medium text-slate-400">{index + 1}</td>
                                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {formatDateTime(tx.purchaseDate)}
                                      </td>
                                      <td className="px-6 py-4 text-sm font-bold text-slate-900">
                                        {currencySymbol}{(tx.transactionAmount ?? 0).toFixed(2)}
                                      </td>
                                      <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                          <span className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm">
                                            <ArrowUpCircle size={14} className="opacity-80" /> +{tx.pointsEarned} pts
                                          </span>
                                          {tx.redeemPoints > 0 && (
                                            <span className="flex items-center gap-1.5 text-rose-500 font-semibold text-xs">
                                              <ArrowDownCircle size={14} className="opacity-80" /> -{tx.redeemPoints} pts
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-tight ${
                                          (tx.redeemAmount ?? 0) === 0
                                            ? "bg-slate-100 text-slate-600"
                                            : "bg-indigo-50 text-indigo-700"
                                        }`}>
                                          {currencySymbol}{(tx.redeemAmount ?? 0).toFixed(2)}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {/* ---------- Mobile View ---------- */}
                            <div className="block md:hidden divide-y divide-slate-100">
                              {userData.transactions.map((tx, index) => (
                                <div key={index} className="p-5 active:bg-slate-50 transition-colors">
                                  <div className="flex justify-between items-start mb-4">
                                    <div>
                                      <p className="text-xs font-bold text-slate-400 uppercase">Transaction #{index + 1}</p>
                                      <p className="text-sm font-semibold text-slate-700 mt-1">{formatDateTime(tx.purchaseDate)}</p>
                                    </div>
                                    <span className="text-md font-black text-slate-900">
                                      {currencySymbol}{(tx.transactionAmount ?? 0).toFixed(2)}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center justify-between gap-4 pt-2">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="flex items-center gap-1 text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded-lg">
                                          <ArrowUpCircle size={14} /> {tx.pointsEarned} pts
                                        </span>
                                        {tx.redeemPoints > 0 && (
                                          <span className="flex items-center gap-1 text-rose-600 font-bold text-sm bg-rose-50 px-2 py-1 rounded-lg">
                                            <ArrowDownCircle size={14} /> {tx.redeemPoints} pts
                                          </span>
                                        )}
                                    </div>
                                    <div className="text-right">
                                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{t('daily.table.redeemed')}</p>
                                      <span className="font-bold text-slate-900">{currencySymbol}{(tx.redeemAmount ?? 0).toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </> 
                    ) : (
                      <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                          <AlertCircle className="w-10 h-10 text-slate-300" />
                        </div>
                        <p className="text-xl font-semibold text-slate-500">
                          {t('daily.errors.noHistory')}
                        </p>
                      </div>
                    )}
                  </div>
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
            background: white !important;
            padding: 20px;
          }

          /* Hide the modal overlay/backdrop */
          .fixed.inset-0 {
            display: none !important;
          }

          /* Hide action buttons (Export/Print) during print */
          .print\\:hidden {
            display: none !important;
          }

          /* Avoid extra blank pages */
          @page {
            margin: 1cm;
            size: A4 portrait;
          }

          /* Prevent bad page breaks in tables */
          table, tr, td, th {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </>
  );
};

// const Card = ({ icon: Icon, color, bg, title, value, unit }) => (
//   <div className={`bg-gradient-to-br ${bg} rounded-xl p-6 shadow-lg border-2 border-white/50`}>
//     <div className={`p-3 rounded-full inline-block mb-4 bg-white/70 shadow-md`}>
//       <Icon className={`w-8 h-8 ${color}`} />
//     </div>
//     <p className="text-3xl font-black text-slate-800 leading-none">{value}</p>
//     <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mt-2">{title} {unit && `(${unit})`}</p>
//   </div>
// );

{/* --- Refined Card Component --- */}
const Card = ({ icon: Icon, color, bg, title, value, unit }) => (
  <div className={`${bg} border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300`}>
    <div className="flex items-start justify-between">
      <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4">
      <p className="text-2xl font-bold text-slate-900 tracking-tight">
        {value} <span className="text-sm font-medium text-slate-400">{unit}</span>
      </p>
      <p className="text-xs text-slate-700 uppercase tracking-widest mt-1">
        {title}
      </p>
    </div>
  </div>
);

export default DailyTransaction;