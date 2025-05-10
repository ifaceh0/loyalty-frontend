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

    // If needed, you can auto-calculate totalPoints here
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
        alert(' submitting transaction!');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">User Transaction Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Purchase Points ($)</label>
          <input
            type="number"
            name="purchasePoints"
            value={formData.purchasePoints}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Transaction Date</label>
          <input
            type="date"
            name="transactionDate"
            value={formData.transactionDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Total Points</label>
          <input
            type="number"
            name="totalPoints"
            value={formData.totalPoints}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default User_profile
;
