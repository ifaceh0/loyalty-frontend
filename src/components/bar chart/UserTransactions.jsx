import React from "react";

const UserTransactions = () => {
  const demoTransactions = [
    {
      date: "2025-07-01",
      transactionAmount: 120,
      pointsReceived: 24,
    },
    {
      date: "2025-06-28",
      transactionAmount: 80,
      pointsReceived: 16,
    },
    {
      date: "2025-06-20",
      transactionAmount: 150,
      pointsReceived: 30,
    },
    {
      date: "2025-06-12",
      transactionAmount: 60,
      pointsReceived: 12,
    },
  ];

  return (
    <div>
      <h2 className="text-2x font-semibold mb-4">
        🧾 Transaction History
      </h2>

      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="bg-fuchsia-100 text-fuchsia-800">
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Transaction Amount ($)</th>
            <th className="px-4 py-2 text-left">Points Received</th>
          </tr>
        </thead>
        <tbody>
          {demoTransactions.map((txn, index) => (
            <tr key={index} className="border-b hover:bg-fuchsia-50">
              <td className="px-4 py-2">
                {new Date(txn.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">${txn.transactionAmount}</td>
              <td className="px-4 py-2 text-fuchsia-700 font-semibold">
                {txn.pointsReceived}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTransactions;
