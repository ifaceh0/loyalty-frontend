import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Download, Printer, Loader2, AlertCircle, Banknote, Gift, 
  ShoppingBag, Clock, ArrowUpRight, ArrowDownLeft, Search, Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../apiConfig';
import { getCurrencySymbol } from "../../utils/currency";
import { fetchWithAuth } from "../../auth/fetchWithAuth";

const DailyTransactionsPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [dailyData, setDailyData] = useState(null);
  const [isLoadingDaily, setIsLoadingDaily] = useState(true);
  const [dailyError, setDailyError] = useState('');

  // User Search States
  const [userId, setUserId] = useState('');
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const country = localStorage.getItem("country");
  const currencySymbol = getCurrencySymbol(country);
  const shopId = localStorage.getItem('id');

  const fetchDailyTransactions = async (selectedDate) => {
    setIsLoadingDaily(true);
    setDailyError('');
    setDailyData(null);

    try {
      const response = await fetchWithAuth(
        `${API_BASE_URL}/api/dashboard/date_transactions/${shopId}/${selectedDate}`,
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

  useEffect(() => {
    if (date) fetchDailyTransactions(date);
  }, [date]);

  const searchUser = async () => {
    if (!userId.trim()) return;
    setIsLoadingUser(true);

    try {
      const response = await fetchWithAuth(
        `${API_BASE_URL}/api/dashboard/transactions/${userId}/${shopId}`,
        { method: 'GET', credentials: 'include' }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || data.message || t('daily.errors.unknown'));
        return;
      }

      if (!data.transactions || data.transactions.length === 0) {
        alert(t('daily.errors.noTransactionsUser'));
        return;
      }

      navigate(`/shopkeeper/dashboard/user-profile/${userId}`);
    } catch (error) {
      console.error("User search failed:", error);
      alert(t('daily.errors.network'));
    } finally {
      setIsLoadingUser(false);
    }
  };

  const exportToCSV = () => {
    if (!dailyData || !dailyData.transactions) return;

    const headers = [
      t('daily.csv.userId'), t('daily.csv.name'), t('daily.csv.amount'),
      t('daily.csv.pointsEarned'), t('daily.csv.redeemPoints'),
      t('daily.csv.redeemedAmount'), t('daily.csv.time')
    ];

    const rows = dailyData.transactions.map(tx => [
      tx.userId, tx.name, tx.transactionAmount.toFixed(2),
      tx.pointsEarned, tx.redeemPoints || 0,
      (tx.redeemAmount ?? 0).toFixed(2), tx.time
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `daily_transactions_${date}.csv`;
    link.click();
  };

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased print:bg-white print:p-0">
      <div className="max-w-8xl mx-auto px-6 lg:px-24 py-10 lg:py-12">
        
        {/* Top Header/Action Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-zinc-200/80">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center justify-center p-2 bg-white border border-zinc-200 rounded-full hover:border-zinc-300 hover:bg-zinc-50 text-zinc-600 transition-all active:scale-95 shadow-sm"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('daily.popup.dailySubtitle')}</span>
              </div>
              <h1 className="text-xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
                {t('daily.popup.dailyTitle', { date: date ? format(new Date(date), 'MMMM d, yyyy') : '' })}
              </h1>
            </div>
          </div>

          {/* Export & Action Utility Buttons */}
          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={exportToCSV}
              disabled={!dailyData}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 text-zinc-700 font-semibold text-sm transition-all shadow-sm hover:border-zinc-300 disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-zinc-500" />
              {t('daily.buttons.exportCSV')}
            </button>
            <button
              onClick={handlePrint}
              disabled={!dailyData}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 text-zinc-700 font-semibold text-sm transition-all shadow-sm hover:border-zinc-300 disabled:opacity-50"
            >
              <Printer className="w-4 h-4 text-zinc-500" />
              {t('daily.buttons.print')}
            </button>
          </div>
        </div>

        {/* Global Toolbar Panel */}
        <div className="bg-white border border-zinc-200/80 rounded-md p-4 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
          <div className="w-full md:max-w-md relative flex items-center">
            <Search className="absolute left-4 text-zinc-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              placeholder={t('daily.search.placeholder')}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchUser()}
              className="w-full pl-11 pr-24 py-2.5 bg-zinc-50/50 border border-zinc-200 rounded-md text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 focus:outline-none transition-all font-medium text-sm"
            />
            <button
              onClick={searchUser}
              disabled={isLoadingUser || !userId.trim()}
              className="absolute right-1.5 px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-300 text-white font-semibold text-xs rounded-full transition-all flex items-center justify-center min-w-[70px]"
            >
              {isLoadingUser ? <Loader2 className="animate-spin w-3.5 h-3.5" /> : t('daily.search.button')}
            </button>
          </div>
          <div className="text-xs text-zinc-500 font-medium text-center md:text-right">
            Filtered by active vendor profile session parameters.
          </div>
        </div>

        {/* Dynamic App Shell States */}
        {dailyError ? (
          <div className="bg-white border border-zinc-200 rounded-lg flex flex-col items-center justify-center py-20 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">Retrieval Error</h3>
            <p className="text-zinc-500 text-sm max-w-sm px-4">{dailyError}</p>
          </div>
        ) : isLoadingDaily ? (
          <div className="bg-white border border-zinc-200 rounded-lg flex flex-col items-center justify-center py-28 text-center shadow-sm">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
            <p className="text-zinc-500 text-sm font-medium tracking-wide">{t('daily.loading.transactions')}</p>
          </div>
        ) : dailyData && dailyData.transactions?.length > 0 ? (
          <>
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              <div className="bg-white border border-zinc-200 rounded-md p-5 flex items-center gap-4 shadow-sm">
                <div className="w-11 h-11 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/60">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t('daily.summary.totalSales')}</p>
                  <p className="text-2xl font-extrabold text-zinc-900 tracking-tight mt-0.5">
                    {currencySymbol}{dailyData.totalSales?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-md p-5 flex items-center gap-4 shadow-sm">
                <div className="w-11 h-11 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100/60">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t('daily.summary.totalRedeemed')}</p>
                  <p className="text-2xl font-extrabold text-zinc-900 tracking-tight mt-0.5">
                    {currencySymbol}{dailyData.totalRedeemed?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-md p-5 flex items-center gap-4 shadow-sm sm:col-span-2 lg:col-span-1">
                <div className="w-11 h-11 rounded-md bg-zinc-900 text-white flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t('daily.summary.totalTransactions')}</p>
                  <p className="text-2xl font-extrabold text-zinc-900 tracking-tight mt-0.5">
                    {dailyData.transactions.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop / Core Data Table View */}
            <div className="bg-white border border-zinc-200 rounded-md shadow-sm overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                <h3 className="text-sm font-bold text-zinc-800 tracking-tight">
                  {t('daily.table.title')}
                </h3>
                <span className="text-xs font-medium text-zinc-500 bg-zinc-200/60 px-2.5 py-0.5 rounded-full">
                  Live Sync
                </span>
              </div>

              {/* Desktop Render Context */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white text-zinc-400 text-[11px] font-bold uppercase tracking-wider border-b border-zinc-100">
                      <th className="py-3 px-6 text-center w-16">{t('daily.table.sno')}</th>
                      <th className="py-3 px-6">{t('daily.table.userId')}</th>
                      <th className="py-3 px-6">{t('daily.table.name')}</th>
                      <th className="py-3 px-6 text-right">{t('daily.table.amount')}</th>
                      <th className="py-3 px-6 text-center">{t('daily.table.points')}</th>
                      <th className="py-3 px-6 text-right">{t('daily.table.redeemed')}</th>
                      <th className="py-3 px-6 text-right">{t('daily.table.time')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-sm font-medium text-zinc-700">
                    {dailyData.transactions.map((tx, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/70 transition-colors">
                        <td className="py-3.5 px-6 text-center text-zinc-400 font-mono text-xs">
                          {(idx + 1).toString().padStart(2, '0')}
                        </td>
                        <td className="py-3.5 px-6 font-mono text-xs text-indigo-600 font-semibold">
                          {tx.userId}
                        </td>
                        <td className="py-3.5 px-6 text-zinc-900 font-semibold">
                          {tx.name}
                        </td>
                        <td className="py-3.5 px-6 text-right font-bold text-zinc-900">
                          {currencySymbol}{tx.transactionAmount.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-6">
                          <div className="flex items-center justify-center gap-3 text-xs font-bold">
                            <span className="inline-flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                              <ArrowUpRight className="w-3 h-3" /> {tx.pointsEarned}
                            </span>
                            {tx.redeemPoints > 0 && (
                              <span className="inline-flex items-center gap-0.5 text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                                <ArrowDownLeft className="w-3 h-3" /> {tx.redeemPoints}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md ${
                            (tx.redeemAmount ?? 0) === 0 ? 'bg-zinc-100 text-zinc-400' : 'bg-amber-50 text-amber-700 border border-amber-100/50'
                          }`}>
                            {currencySymbol}{(tx.redeemAmount ?? 0).toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 text-right text-zinc-500 text-xs">
                          <div className="inline-flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-zinc-400" />
                            {format(new Date(`2000-01-01 ${tx.time}`), "h:mm a")}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Enhanced Native Mobile Card List */}
              <div className="md:hidden divide-y divide-zinc-100">
                {dailyData.transactions.map((tx, idx) => (
                  <div key={idx} className="p-5 hover:bg-zinc-50/40 transition-all">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded font-bold">
                            #{String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="font-mono text-xs text-indigo-600 font-bold">{tx.userId}</span>
                        </div>
                        <h4 className="font-bold text-zinc-900">{tx.name}</h4>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-base text-zinc-900">
                          {currencySymbol}{tx.transactionAmount.toFixed(2)}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 font-medium mt-0.5">
                          <Clock className="w-3 h-3" />
                          {format(new Date(`2000-01-01 ${tx.time}`), "h:mm a")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 bg-zinc-50/80 rounded-xl p-2.5 border border-zinc-100 text-xs mt-1">
                      <div>
                        <span className="text-[10px] text-zinc-400 block font-semibold uppercase tracking-wider mb-1">{t('daily.table.points')}</span>
                        <div className="flex items-center gap-2 font-bold text-[11px]">
                          <span className="inline-flex items-center gap-0.5 text-emerald-600">
                            +{tx.pointsEarned}
                          </span>
                          {tx.redeemPoints > 0 && (
                            <span className="inline-flex items-center gap-0.5 text-rose-500">
                              -{tx.redeemPoints}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-400 block font-semibold uppercase tracking-wider mb-1">{t('daily.table.redeemed')}</span>
                        <p className={`font-bold text-xs ${tx.redeemAmount > 0 ? 'text-amber-700' : 'text-zinc-500'}`}>
                          {currencySymbol}{(tx.redeemAmount ?? 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Terminal Report Summary Bar */}
            <div className="bg-zinc-900 rounded-md p-6 text-white shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4 border border-zinc-800">
              <div>
                <p className="uppercase text-[10px] tracking-widest font-bold text-zinc-400">{t('daily.summary.totalSalesToday')}</p>
                <p className="text-3xl font-black mt-1 tracking-tight text-white">
                  {currencySymbol}{dailyData.totalSales?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="text-xs font-semibold px-4 py-2 bg-white/10 rounded-full border border-white/5 backdrop-blur-md text-zinc-300">
                End of Report • {date ? format(new Date(date), 'LLL d, yyyy') : ''}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white border border-zinc-200 rounded-lg flex flex-col items-center justify-center py-24 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-zinc-400" />
            </div>
            <h3 className="text-base font-bold text-zinc-800">{t('daily.errors.noTransactions')}</h3>
            <p className="text-xs text-zinc-400 mt-1">There are no structural logs recorded for this endpoint date window.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyTransactionsPage;