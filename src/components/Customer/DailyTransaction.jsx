import React, { useState, useEffect } from 'react';
import { Search, Calendar, X, Gift, DollarSign, ShoppingBag, TrendingUp, Loader2, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const DailyTransaction = () => {
  const [activeTab, setActiveTab] = useState('search');
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

  const searchUser = async () => {
    if (!userId.trim()) return;
    setIsLoadingUser(true);
    setUserData(null);
    setUserError('');

    try {
      const response = await fetch(`https://loyalty-backend-java.onrender.com/api/dashboard/transactions/${userId}/${shopId}`, {
        method: 'GET',
        credentials: 'include', 
      });
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();
      setUserData(data);
      setShowUserPopup(true);
    } catch (error) {
      console.error("User search failed:", error);
      setUserError('User not found. Please check the ID and try again.');
    } finally {
      setIsLoadingUser(false);
    }
  };

  const fetchDailyTransactions = async (date) => {
    setIsLoadingDaily(true);
    setDailyData(null);
    setDailyError('');

    try {
      const response = await fetch(`https://loyalty-backend-java.onrender.com/api/dashboard/date_transactions/${shopId}/${date}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No transactions found for this date');
        }
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setDailyData(data);
    } catch (error) {
      console.error("Daily fetch failed:", error);
      setDailyError(error.message || 'Failed to load transactions');
    } finally {
      setIsLoadingDaily(false);
    }
  };

  const renderDailyData = () => {
    fetchDailyTransactions(selectedDate);
    setShowDailyPopup(true);
  };

  useEffect(() => {
    if (activeTab === 'daily') {
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
  }, [activeTab]);

  useEffect(() => {
    if (showDailyPopup && !dailyData && !dailyError) {
      fetchDailyTransactions(selectedDate);
    }
  }, [showDailyPopup, selectedDate]);

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), 'EEE, MMM d, h:mm a');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-800 p-4 md:p-16">
        <header className="mb-14">
          <div className="flex justify-center">
            <div className="flex bg-white p-1 rounded-full shadow-2xl border border-gray-200">
              <button
                onClick={() => setActiveTab('search')}
                className={`flex items-center px-6 py-3 rounded-full font-semibold text-base md:text-lg transition-all ${
                  activeTab === 'search'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Search className="w-5 h-5 mr-2" />
                Search User
              </button>
              <button
                onClick={() => setActiveTab('daily')}
                className={`flex items-center px-6 py-3 rounded-full font-semibold text-base md:text-lg transition-all ${
                  activeTab === 'daily'
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Daily Transactions
              </button>
            </div>
          </div>
        </header>

        <main className="flex justify-center mt-10">
          {activeTab === 'search' && (
            <div className="bg-white rounded-lg p-8 md:p-12 shadow-2xl w-full max-w-xl border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-indigo-700">
                User History Lookup
              </h2>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="flex-1 px-6 py-4 bg-gray-50 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
                />
                <button
                  onClick={searchUser}
                  disabled={isLoadingUser}
                  className={`px-8 py-4 rounded-lg font-bold text-white shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed 
                            ${isLoadingUser 
                                ? 'bg-gray-400 cursor-wait' 
                                : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:shadow-blue-500/50'
                            }`}
                >
                  <div className="flex items-center justify-center">
                    {isLoadingUser ? (
                      <Loader2 className="animate-spin w-5 h-5 mr-2" />
                    ) : (
                      <Search className="w-5 h-5 mr-2" />
                    )}
                    {isLoadingUser ? 'Searching...' : 'Search'}
                  </div>
                </button>
              </div>
              <p className="text-gray-500 text-center text-sm">
                Retrieve transaction history, loyalty points, and rewards information.
              </p>
            </div>
          )}

          {activeTab === 'daily' && (
            <div className="bg-white rounded-lg p-8 md:p-12 shadow-2xl w-full max-w-xl border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-teal-700">
                Daily Sales Overview
              </h2>
              <p className="text-gray-500 text-center mb-8">
                Select a date to view all transactions processed on that day.
              </p>
              <div className="flex flex-col gap-6 items-center">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-6 py-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all w-full max-w-xs"
                />
                <button
                  onClick={renderDailyData}
                  disabled={isLoadingDaily}
                  className={`px-12 py-5 rounded-lg font-bold text-lg text-white shadow-xl transform hover:scale-[1.02] transition-all min-w-64 flex items-center justify-center
                            ${isLoadingDaily 
                                ? 'bg-gray-400 cursor-wait' 
                                : 'bg-gradient-to-r from-teal-600 to-cyan-500 hover:shadow-teal-500/50'
                            }`}
                >
                  {isLoadingDaily ? (
                    <>
                      <Loader2 className="animate-spin w-6 h-6 mr-3" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-6 h-6 mr-3" />
                      View Day's Report
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </main>

        {showUserPopup && (
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col">
              <div className="bg-gradient-to-r from-indigo-700 to-blue-600 p-6 md:p-8 rounded-t-lg flex justify-between items-center shrink-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  User Profile
                </h2>
                <button
                  onClick={() => {
                    setShowUserPopup(false);
                    setUserError('');
                    setUserId('');
                    setUserData(null);
                  }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {userError ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                    <p className="text-xl font-semibold text-gray-700">{userError}</p>
                    <p className="text-gray-500 mt-2">Please try a different User ID.</p>
                  </div>
                ) : userData ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                      <Card icon={Gift} color="text-indigo-600" title="Available Points" value={userData.availablePoints} unit="pts" />
                      <Card icon={DollarSign} color="text-emerald-600" title="Total Spend" value={`₹${userData.totalSpend?.toFixed(2) || 0}`} />
                      <Card icon={ShoppingBag} color="text-rose-500" title="Total Visits" value={userData.totalVisits} />
                      <Card icon={TrendingUp} color="text-amber-500" title="Total Redeemed" value={`₹${userData.totalRedeemedAmount?.toFixed(2) || 0}`} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">Transaction History</h3>
                      <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-4 gap-4 p-5 bg-indigo-50 font-bold text-indigo-800 text-sm uppercase tracking-wider">
                          <span>Amount</span>
                          <span>Points Earned</span>
                          <span>Redeemed</span>
                          <span>Date & Time</span>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {userData.transactions?.length > 0 ? (
                            userData.transactions.map((tx, index) => (
                              <div key={index} className="grid grid-cols-4 gap-4 p-5 border-b border-gray-100 hover:bg-indigo-50 transition-colors">
                                <span className="font-extrabold text-gray-900">₹{tx.transactionAmount}</span>
                                <span className="text-indigo-600 font-semibold">{tx.pointsEarned} pts</span>
                                <span className="text-emerald-600 font-semibold">₹{(tx.redeemAmount ?? 0).toFixed(2)}</span>
                                <span className="text-gray-600 text-sm">{formatDateTime(tx.purchaseDate)}</span>
                              </div>
                            ))
                          ) : (
                            <div className="p-10 text-center text-gray-500">
                              No transaction history available.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {showDailyPopup && (
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col">
              <div className="bg-gradient-to-r from-teal-700 to-cyan-600 p-6 md:p-8 rounded-t-lg flex justify-between items-center shrink-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Daily Transactions - {format(new Date(selectedDate), 'MMMM d, yyyy')}
                </h2>
                <button
                  onClick={() => {
                    setShowDailyPopup(false);
                    setDailyError('');
                    setSelectedDate(new Date().toISOString().split('T')[0]);
                    setDailyData(null);
                  }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {dailyError ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <AlertCircle className="w-16 h-16 text-orange-500 mb-4" />
                    <p className="text-xl font-semibold text-gray-700">{dailyError}</p>
                    <p className="text-gray-500 mt-2">Try selecting a different date.</p>
                  </div>
                ) : isLoadingDaily ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-12 h-12 animate-spin text-teal-600 mb-4" />
                    <p className="text-lg text-gray-600">Loading transactions...</p>
                  </div>
                ) : dailyData && dailyData.transactions?.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                      {/* <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 text-center border border-gray-200">
                        <p className="text-sm text-gray-600 uppercase tracking-wider">Shop ID</p>
                        <p className="text-2xl font-bold text-gray-800">#{dailyData.shopId}</p>
                      </div> */}
                      <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-5 text-center border border-teal-200">
                        <p className="text-sm text-teal-700 uppercase tracking-wider">Total Sales</p>
                        <p className="text-2xl font-bold text-teal-800">₹{dailyData.totalSales?.toFixed(2)}</p>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-5 text-center border border-emerald-200">
                        <p className="text-sm text-emerald-700 uppercase tracking-wider">Total Redeemed</p>
                        <p className="text-2xl font-bold text-emerald-800">₹{dailyData.totalRedeemed?.toFixed(2)}</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 text-center border border-blue-200">
                        <p className="text-sm text-blue-700 uppercase tracking-wider">Transactions</p>
                        <p className="text-2xl font-bold text-blue-800">{dailyData.transactions.length}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">All Transactions</h3>
                      <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-6 gap-4 p-5 bg-teal-50 font-bold text-teal-800 text-xs uppercase tracking-wider">
                          <span>User ID</span>
                          <span>Name</span>
                          <span>Amount</span>
                          <span>Points</span>
                          <span>Redeem</span>
                          <span>Time</span>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {dailyData.transactions.map((tx, idx) => (
                            <div key={idx} className="grid grid-cols-6 gap-4 p-5 border-b border-gray-100 hover:bg-teal-50 transition-colors text-sm">
                              <span className="font-mono text-gray-600">#{tx.userId}</span>
                              <span className="font-medium text-gray-800">{tx.name}</span>
                              <span className="font-bold text-teal-700">₹{(tx.transactionAmount).toFixed(2)}</span>
                              <span className="text-indigo-600 font-semibold">{tx.pointsEarned} pts</span>
                              <span className="text-emerald-600 font-medium">₹{(tx.redeemAmount ?? 0).toFixed(2)}</span>
                              <span className="text-gray-600 flex items-center">
                                <Clock className="w-3 h-3 mr-1 text-gray-500" />
                                {format(new Date(`2000-01-01 ${tx.time}`), 'h:mm a')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-teal-600 to-cyan-500 rounded-lg p-6 text-center shadow-xl">
                      <h3 className="text-2xl font-bold text-white">
                        Total Sales Today: 
                        <span className="text-4xl ml-4 font-extrabold">₹{dailyData.totalSales?.toFixed(2)}</span>
                      </h3>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-xl font-semibold text-gray-700">No transactions found</p>
                    <p className="text-gray-500 mt-2">There were no sales on this date.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const Card = ({ icon: Icon, color, title, value, unit }) => (
  <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
    <div className={`p-3 rounded-full inline-block mb-4 ${color.replace('text', 'bg')}/10`}>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
    <p className="text-3xl font-extrabold text-gray-900 leading-none">{value}</p>
    <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">{title} {unit && `(${unit})`}</p>
  </div>
);

export default DailyTransaction;