import React, { useState } from 'react';

const User_profile = () => {
  const [formData, setFormData] = useState({
    userId: '',
    purchasePoints: '',
    transactionDate: '',
    totalPoints: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://your-backend-api.com/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Transaction submitted successfully!');
        setFormData({
          userId: '',
          purchasePoints: '',
          transactionDate: '',
          totalPoints: '',
        });
      } else {
        alert('Error submitting transaction!');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 rounded-2xl shadow-xl bg-gradient-to-br from-fuchsia-100 to-purple-50 border border-fuchsia-200">
      <h2 className="text-2xl font-bold text-fuchsia-700 mb-6 text-center">🎁 Loyalty Transaction Form</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div>
          <label className="block mb-1 font-semibold text-fuchsia-700">User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full border border-fuchsia-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-fuchsia-700">Purchase Points ($)</label>
          <input
            type="number"
            name="purchasePoints"
            value={formData.purchasePoints}
            onChange={handleChange}
            className="w-full border border-fuchsia-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-fuchsia-700">Transaction Date</label>
          <input
            type="date"
            name="transactionDate"
            value={formData.transactionDate}
            onChange={handleChange}
            className="w-full border border-fuchsia-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-fuchsia-700">Total Points</label>
          <input
            type="number"
            name="totalPoints"
            value={formData.totalPoints}
            onChange={handleChange}
            className="w-full border border-fuchsia-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-fuchsia-600 text-white py-3 rounded-xl font-semibold hover:bg-fuchsia-700 transition duration-300 shadow-md"
        >
          🚀 Submit Transaction
        </button>
      </form>
    </div>
  );
};

export default User_profile;
