import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, X, Loader2, AlertCircle, Gift, Banknote, 
  ShoppingBag, TrendingUp, ArrowUpRight, ArrowDownLeft, Clock, Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../apiConfig';
import { getCurrencySymbol } from "../../utils/currency";
import { fetchWithAuth } from "../../auth/fetchWithAuth";

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const country = localStorage.getItem("country");
  const currencySymbol = getCurrencySymbol(country);
  const shopId = localStorage.getItem('id');

  const ITEMS_PER_PAGE = 10;

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetchWithAuth(
        `${API_BASE_URL}/api/dashboard/transactions/${userId}/${shopId}`,
        { method: 'GET', credentials: 'include' }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || data.message || t('daily.errors.fetchFailed'));
      }

      const data = await response.json();
      setUserData(data);
      setCurrentPage(1);
    } catch (err) {
      console.error("User profile fetch failed:", err);
      setError(err.message || t('daily.errors.loadFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), 'EEE, MMM d, h:mm a');
  };

  const totalTransactions = userData?.transactions?.length || 0;

    const totalPages = Math.ceil(totalTransactions / ITEMS_PER_PAGE);

    const paginatedTransactions =
    userData?.transactions?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    ) || [];

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased">
      <div className="max-w-8xl mx-auto px-6 lg:px-24 py-10 lg:py-12">
        
        {/* Dynamic Top Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-zinc-200/80">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center justify-center p-2 bg-white border border-zinc-200 rounded-full hover:border-zinc-300 hover:bg-zinc-50 text-zinc-600 transition-all active:scale-95 shadow-sm"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-0.5">
                <span>Account Profile Ledger</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
                {userData 
                  ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || t('daily.popup.userProfile')
                  : t('daily.popup.userProfile')
                }
              </h1>
              {userData && (
                <p className="text-zinc-500 text-xs font-medium mt-0.5">
                  Internal ID Reference: <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded ml-1">{userId}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic State Boundary Containers */}
        {error ? (
          <div className="bg-white border border-zinc-200 rounded-lg flex flex-col items-center justify-center py-20 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">Data Pipeline Error</h3>
            <p className="text-zinc-500 text-sm max-w-sm px-4">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="bg-white border border-zinc-200 rounded-lg flex flex-col items-center justify-center py-28 text-center shadow-sm">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
            <p className="text-zinc-500 text-sm font-medium tracking-wide">Syncing Customer Profiles...</p>
          </div>
        ) : userData ? (
          <div className="space-y-8">
            
            {/* Core Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-zinc-200 rounded-md p-5 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t('daily.user.availablePoints')}</p>
                  <p className="text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">{userData.availablePoints || 0}</p>
                  <span className="text-[11px] font-medium text-zinc-400">active rewards pool</span>
                </div>
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-md flex items-center justify-center border border-indigo-100/60 shadow-sm">
                  <Gift className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-md p-5 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t('daily.user.totalSpend')}</p>
                  <p className="text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
                    {currencySymbol}{(userData.totalSpend || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <span className="text-[11px] font-medium text-zinc-400">cumulative valuation</span>
                </div>
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-md flex items-center justify-center border border-emerald-100/60 shadow-sm">
                  <Banknote className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-md p-5 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t('daily.user.totalVisits')}</p>
                  <p className="text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">{userData.totalVisits || 0}</p>
                  <span className="text-[11px] font-medium text-zinc-400">session counters</span>
                </div>
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-md flex items-center justify-center shadow-sm">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-md p-5 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t('daily.user.totalRedeemed')}</p>
                  <p className="text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
                    {currencySymbol}{(userData.totalRedeemedAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <span className="text-[11px] font-medium text-zinc-400">redeemed write-offs</span>
                </div>
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-md flex items-center justify-center border border-amber-100/60 shadow-sm">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Historical Audit Ledger Frame */}
            <div className="bg-white border border-zinc-200 rounded-md shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                <h3 className="text-sm font-bold text-zinc-800 tracking-tight">
                  {t('daily.user.transactionHistory')}
                </h3>
                <span className="text-xs font-semibold text-zinc-500 bg-zinc-200/60 px-2.5 py-0.5 rounded-full">
                  Transactional Sync
                </span>
              </div>

              {userData.transactions && userData.transactions.length > 0 ? (
                <>
                  {/* Desktop Presentation View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white text-zinc-400 text-[11px] font-bold uppercase tracking-wider border-b border-zinc-100">
                          <th className="py-3.5 px-6 text-center w-20">Index</th>
                          <th className="py-3.5 px-6">{t('daily.table.time')} & Date</th>
                          <th className="py-3.5 px-6 text-right">{t('daily.table.amount')}</th>
                          <th className="py-3.5 px-6 text-center">{t('daily.table.points')} Delta</th>
                          <th className="py-3.5 px-6 text-right">{t('daily.table.redeemed')} Val</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 text-sm font-medium text-zinc-700">
                        {paginatedTransactions.map((tx, index) => (
                          <tr key={index} className="hover:bg-zinc-50/70 transition-colors">
                            <td className="py-4 px-6 text-center text-zinc-400 font-mono text-xs">
                                {(
                                    (currentPage - 1) * ITEMS_PER_PAGE +
                                    index +
                                    1
                                ).toString().padStart(2, "0")}
                            </td>
                            <td className="py-4 px-6 text-zinc-900 font-semibold">
                              <div className="inline-flex items-center gap-1.5 text-zinc-700">
                                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                                {formatDateTime(tx.purchaseDate)}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-right font-bold text-zinc-900">
                              {currencySymbol}{(tx.transactionAmount ?? 0).toFixed(2)}
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center gap-3 text-xs font-bold">
                                <span className="inline-flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                  <ArrowUpRight className="w-3 h-3" /> +{tx.pointsEarned}
                                </span>
                                {tx.redeemPoints > 0 && (
                                  <span className="inline-flex items-center gap-0.5 text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                                    <ArrowDownLeft className="w-3 h-3" /> -{tx.redeemPoints}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md ${
                                (tx.redeemAmount ?? 0) === 0 
                                  ? 'bg-zinc-100 text-zinc-400' 
                                  : 'bg-indigo-50 text-indigo-700 border border-indigo-100/50'
                              }`}>
                                {currencySymbol}{(tx.redeemAmount ?? 0).toFixed(2)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Fully Synced Mobile View (Ensures identical desktop metrics show) */}
                  <div className="md:hidden divide-y divide-zinc-100">
                    {paginatedTransactions.map((tx, index) => (
                      <div key={index} className="p-5 hover:bg-zinc-50/40 transition-all">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded font-bold">
                                Index Line #
                                {String(
                                (currentPage - 1) * ITEMS_PER_PAGE + index + 1
                                ).padStart(2, "0")}
                              </span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                              <span>{formatDateTime(tx.purchaseDate)}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-zinc-400 block font-semibold uppercase tracking-wider">{t('daily.table.amount')}</span>
                            <p className="font-extrabold text-base text-zinc-900 mt-0.5">
                              {currencySymbol}{(tx.transactionAmount ?? 0).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Points and Redeemed Values Container */}
                        <div className="grid grid-cols-2 gap-4 bg-zinc-50/80 rounded-xl p-3 border border-zinc-100 text-xs mt-3">
                          <div>
                            <span className="text-[10px] text-zinc-400 block font-semibold uppercase tracking-wider mb-1.5">Points Delta</span>
                            <div className="flex items-center gap-2 font-bold text-[11px]">
                              <span className="inline-flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                <ArrowUpRight className="w-2.5 h-2.5" /> +{tx.pointsEarned}
                              </span>
                              {tx.redeemPoints > 0 && (
                                <span className="inline-flex items-center gap-0.5 text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                                  <ArrowDownLeft className="w-2.5 h-2.5" /> -{tx.redeemPoints}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-zinc-400 block font-semibold uppercase tracking-wider mb-1.5">Redeemed Value</span>
                            <p className={`inline-block font-bold text-xs px-2 py-0.5 rounded-md ${
                              (tx.redeemAmount ?? 0) === 0 ? 'bg-zinc-200/50 text-zinc-400' : 'bg-indigo-50 text-indigo-700 border border-indigo-100/50'
                            }`}>
                              {currencySymbol}{(tx.redeemAmount ?? 0).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-white border border-zinc-200 rounded-2xl flex flex-col items-center justify-center py-20 text-center shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6 text-zinc-400" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-800">{t('daily.errors.noHistory')}</h3>
                  <p className="text-xs text-zinc-400 mt-1">There are no verification historical logs recorded for this account instance.</p>
                </div>
              )}
            </div>
          </div>
        ) : null}
        {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200 bg-white">
                <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50"
                >
                Previous
                </button>

                <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-md ${
                        currentPage === i + 1
                        ? "bg-indigo-600 text-white"
                        : "border hover:bg-zinc-50"
                    }`}
                    >
                    {i + 1}
                    </button>
                ))}
                </div>

                <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50"
                >
                Next
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;