import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const UserPurchaseChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const shopId = localStorage.getItem("id");

        const response = await fetch(
          `https://loyalty-backend-java.onrender.com/api/dashboard/monthly?shopId=${shopId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    // <div className="bg-white p-6 rounded-2xl shadow-xl mb-6">
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Monthly Registered vs Purchase Users
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="registeredUsers" fill="#2563eb" name="Registered Users" />
          <Bar dataKey="visitedUsers" fill="#f97316" name="Purchase Users" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserPurchaseChart;
