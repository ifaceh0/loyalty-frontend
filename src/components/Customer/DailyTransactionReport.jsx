import React, { useState, useMemo } from 'react';

// --- 1. Expanded Demo Data (Spanning Multiple Days) ---
// Dates are in 'YYYY-MM-DD' format for easy comparison
const allTransactions = [
  // --- Oct 31, 2025 ---
  { id: 'T001', userId: 'U101', userName: 'Alex Johnson', amount: 45.50, date: '2025-10-31', time: '09:30 AM', paymentMethod: 'Card' },
  { id: 'T002', userId: 'U102', userName: 'Maria Garcia', amount: 12.00, date: '2025-10-31', time: '10:15 AM', paymentMethod: 'Cash' },
  { id: 'T003', userId: 'U101', userName: 'Alex Johnson', amount: 8.75, date: '2025-10-31', time: '11:00 AM', paymentMethod: 'Card' },
  { id: 'T006', userId: 'U102', userName: 'Maria Garcia', amount: 5.25, date: '2025-10-31', time: '02:00 PM', paymentMethod: 'Card' },
  
  // --- Oct 30, 2025 ---
  { id: 'T004', userId: 'U103', userName: 'John Doe', amount: 150.00, date: '2025-10-30', time: '12:45 PM', paymentMethod: 'Online' }, 
  { id: 'T005', userId: 'U104', userName: 'Sarah Lee', amount: 22.90, date: '2025-10-30', time: '01:30 PM', paymentMethod: 'Cash' },
  { id: 'T008', userId: 'U106', userName: 'Ben Smith', amount: 10.50, date: '2025-10-30', time: '04:00 PM', paymentMethod: 'Cash' },
  
  // --- Oct 29, 2025 ---
  { id: 'T007', userId: 'U105', userName: 'David Chen', amount: 77.00, date: '2025-10-29', time: '03:10 PM', paymentMethod: 'Card' },
  { id: 'T009', userId: 'U107', userName: 'Lisa Wong', amount: 33.30, date: '2025-10-29', time: '05:30 PM', paymentMethod: 'Online' },
  
  // --- Oct 28, 2025 ---
  { id: 'T010', userId: 'U108', userName: 'Tom Hardy', amount: 99.99, date: '2025-10-28', time: '08:00 AM', paymentMethod: 'Card' },
];

// --- 2. Main Component with Date Range Search ---
const DailyTransactionReport = ({ shopName = "The Local Shop" }) => {
  const [searchUserId, setSearchUserId] = useState('');
  
  // State for date range: Default to a 3-day window
  const [startDate, setStartDate] = useState('2025-10-29'); 
  const [endDate, setEndDate] = useState('2025-10-31'); 

  // --- Inline Styles ---
  const styles = {
    container: { fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' },
    filterCard: { border: '1px solid #007bff', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#e9f7ff' },
    input: { padding: '8px', width: '200px', margin: '10px 10px 10px 0', borderRadius: '4px', border: '1px solid #ccc' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '15px' },
    th: { border: '1px solid #ddd', padding: '12px', textAlign: 'left', backgroundColor: '#007bff', color: 'white' },
    td: { border: '1px solid #ddd', padding: '10px', textAlign: 'left' },
    revenueAmount: { fontSize: '1.5em', fontWeight: 'bold', color: '#007bff' },
    dateControl: { display: 'flex', gap: '20px', marginBottom: '10px' },
    label: { fontWeight: 'bold', minWidth: '100px', display: 'inline-block' }
  };

  // Combined Filtering Logic
  const filteredTransactions = useMemo(() => {
    // 1. Filter by Date Range (applies first)
    let transactionsByDate = allTransactions.filter(
      (t) => t.date >= startDate && t.date <= endDate
    );

    // 2. Filter by User ID (applies second)
    if (searchUserId) {
      const searchIdLower = searchUserId.toLowerCase().trim();
      transactionsByDate = transactionsByDate.filter(
        (transaction) => transaction.userId.toLowerCase().includes(searchIdLower)
      );
    }
    
    return transactionsByDate;
  }, [startDate, endDate, searchUserId]); 

  const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div style={styles.container}>
      <h2>🛍️ Transaction Report for {shopName}</h2>
      
      <hr />

      {/* --- Combined Filter Card --- */}
      <div style={styles.filterCard}>
        <h3>🔍 Filter Transactions</h3>
        
        {/* Date Range Inputs */}
        <div style={styles.dateControl}>
            <div>
                <label style={styles.label}>Start Date: </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={styles.input}
                />
            </div>
            <div>
                <label style={styles.label}>End Date: </label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={styles.input}
                />
            </div>
        </div>
        
        {/* User ID Search Input */}
        <div>
          <label style={styles.label}>Search by User ID: </label>
          <input
            type="text"
            placeholder="Enter User ID (e.g., U101)"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            style={styles.input}
          />
        </div>

        <p style={{marginTop: '15px'}}>
          **Currently viewing: {startDate} to {endDate}**
          {searchUserId && ` (Filtered by User ID: ${searchUserId})`}
        </p>
      </div>

      <hr />

      {/* --- Transactions Table/List --- */}
      <div>
        <h3>Transaction Details ({filteredTransactions.length} found)</h3>
        
        {filteredTransactions.length === 0 ? (
          <p>No transactions found for the selected date range and/or User ID.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>User ID</th>
                <th style={styles.th}>User Name</th>
                <th style={styles.th}>Amount ($)</th>
                <th style={styles.th}>Time</th>
                <th style={styles.th}>Method</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr key={t.id}>
                  <td style={styles.td}>{t.date}</td>
                  <td style={styles.td}>{t.id}</td>
                  <td style={styles.td}>**{t.userId}**</td>
                  <td style={styles.td}>{t.userName}</td>
                  <td style={{...styles.td, fontWeight: 'bold'}}>${t.amount.toFixed(2)}</td>
                  <td style={styles.td}>{t.time}</td>
                  <td style={styles.td}>{t.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <hr />

      {/* --- Summary Card --- */}
      <div style={styles.filterCard}>
        <h3>Total Revenue for Period: {startDate} to {endDate}</h3>
        <p style={styles.revenueAmount}>**${totalRevenue.toFixed(2)}**</p>
      </div>
    </div>
  );
};

export default DailyTransactionReport;