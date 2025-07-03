import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

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

  // ✅ PDF Download: ALL Transactions of Selected Shop
  const downloadPDF = () => {
    if (!selectedShop || !transactionsByShop[selectedShop]?.length) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Transaction History - ${selectedShop}`, 14, 20);

    const rows = transactionsByShop[selectedShop].map((txn) => [
      new Date(txn.date).toLocaleDateString(),
      `$${txn.transactionAmount}`,
      txn.pointsReceived,
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["Date", "Transaction Amount ($)", "Points Received"]],
      body: rows,
      styles: { fontSize: 10 },
    });

    doc.save(`${selectedShop.replace(/\s+/g, "_")}_Transactions.pdf`);
  };

  const shopNames = Object.keys(transactionsByShop).sort();

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">🧾 Transaction History</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* 🔽 Shop Dropdown */}
          <div className="mb-4 w-full max-w-xs">
            <label className="block text-sm p-2 font-medium text-gray-700 mb-1">Select Shop:</label>
            <select
              value={selectedShop}
              onChange={handleShopChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {shopNames.map((shop) => (
                <option key={shop} value={shop}>
                  {shop}
                </option>
              ))}
            </select>
          </div>

          {/* 💳 Total Points Card */}
          <div className="bg-gradient-to-r w-full max-w-xs from-purple-100 to-blue-100 border border-purple-300 rounded-xl shadow-md p-4 mb-6 text-center">
            <p className="text-gray-700 text-sm mb-1">
              Total Points from <span className="font-semibold">{selectedShop}</span>
            </p>
            <p className="text-3xl font-bold text-purple-700">{totalPoints} pts</p>
          </div>

          {/* ⬇️ Download PDF Button */}
          <div className="mb-4 flex gap-4">
            <button
              onClick={downloadPDF}
              disabled={!transactionsByShop[selectedShop]?.length}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow disabled:opacity-50"
            >
              📄 Download PDF
            </button>
          </div>
        </div>

          {/* 🧾 Transactions Table */}
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-purple-100 text-purple-800">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Transaction Amount ($)</th>
                <th className="px-4 py-2 text-left">Points Received</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((txn, index) => (
                  <tr key={index} className="border-b hover:bg-purple-50">
                    <td className="px-4 py-2">{new Date(txn.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">${txn.transactionAmount}</td>
                    <td className="px-4 py-2 text-purple-700 font-semibold">{txn.pointsReceived}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No transactions for this shop.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center items-center gap-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded disabled:opacity-50"
              >
                ⬅ Prev
              </button>
              <span className="text-sm text-gray-700">
                Page <strong>{currentPage}</strong> of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded disabled:opacity-50"
              >
                Next ➡
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserTransactions;
