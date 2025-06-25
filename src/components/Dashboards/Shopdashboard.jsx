import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import User_profile from "../User-Profile/User_profile";
import ShopkeeperProfile from "../Shopkeeper_profile/Shopkeeper_profile";
import User from "../User/User";
import Shopkeeper_setting from "../Shopkeeper-setting/Shopkeeper_setting";
import CustomerLookup from "../Customer/CustomerLookup";

const demoGraphData = [
  { date: "2025-06-01", users: 10, points: 200 },
  { date: "2025-06-02", users: 15, points: 300 },
  { date: "2025-06-03", users: 20, points: 400 },
  { date: "2025-06-04", users: 25, points: 350 },
  { date: "2025-06-05", users: 30, points: 500 },
  { date: "2025-06-06", users: 35, points: 600 },
];

const Shopdashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user_stats"); // Default to 'shopkeeper'
  const [summary, setSummary] = useState({ totalUsers: 0, totalPoints: 0 });
  const [graphData, setGraphData] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      // fetchSummaryData(token);
      fetchGraphData(token); // 🆕 Fetch graph data too
    }
  }, [navigate]);

  const fetchGraphData = async (token) => {
    try {
      const res = await fetch("https://your-backend.com/api/shopkeeper/graphdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setGraphData(data || []);
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  };

  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
    //   <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard!</h1>
    //   {/* <button
    //     onClick={handleLogout}
    //     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    //   >
    //     Logout
    //   </button> */}
    // </div>

    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow">
        <h2 className="text-xl font-bold text-fuchsia-600 mb-6">Dashboard</h2>
        <nav className="space-y-2">
          {/* <button
            onClick={() => setActiveTab('user_profile')}
            className={`block w-full text-left px-4 py-2 rounded-lg ${activeTab === 'user_profile' ? 'bg-fuchsia-600 text-white' : 'hover:bg-gray-200'
              }`}
          >
            User Profile
          </button> */}
          <button
            onClick={() => setActiveTab("user_stats")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "user_stats" ? "bg-fuchsia-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            User Stats
          </button>

          <button
            onClick={() => setActiveTab("shopkeeper")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "shopkeeper" ? "bg-fuchsia-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            Shopkeeper Profile
          </button>

          {/* <button
            onClick={() => setActiveTab('user')}
            className={`block w-full text-left px-4 py-2 rounded-lg ${activeTab === 'user' ? 'bg-fuchsia-600 text-white' : 'hover:bg-gray-200'
              }`}
          >
            User
          </button> */}

          <button
            onClick={() => setActiveTab("shopkeeper_setting")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "shopkeeper_setting" ? "bg-fuchsia-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            Shopkeeper Setting
          </button>

          <button
            onClick={() => setActiveTab("interactions")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "interactions" ? "bg-fuchsia-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            Interactions Pannel
          </button>

          {/* <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 mt-8"
          >
            Logout
          </button> */}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {activeTab === "user_stats" && (
            <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-fuchsia-600 mb-4">User Statistics</h2>
            <p className="text-lg mb-2">
            Total Registered Users: <span className="font-bold">123</span>
            </p>

            {/* 🔧 Backend Integration Point for Total Stats */}

            {/* 📊 Most Visitors Table */}
            <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Most Visitors</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg shadow-sm">
                <thead className="bg-fuchsia-100 text-fuchsia-800 font-semibold">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">First Name</th>
                    <th className="px-4 py-2 border">Last Name</th>
                    <th className="px-4 py-2 border">E-mail</th>
                    <th className="px-4 py-2 border">Phone Number</th>
                    <th className="px-4 py-2 border">No. of Visiting</th>
                    </tr>
                </thead>
                <tbody>
                {/* 🔧 TODO: Backend integration for Most Visitors Table */}
                <tr className="text-center">
                    <td className="px-4 py-2 border">1</td>
                    <td className="px-4 py-2 border">x</td>
                    <td className="px-4 py-2 border">y</td>
                    <td className="px-4 py-2 border">xy@mail.com</td>
                    <td className="px-4 py-2 border">7894561233</td>
                    <td className="px-4 py-2 border">12</td>
                </tr>
                <tr className="text-center">
                    <td className="px-4 py-2 border">2</td>
                    <td className="px-4 py-2 border">a</td>
                    <td className="px-4 py-2 border">b</td>
                    <td className="px-4 py-2 border">ab@mail.com</td>
                    <td className="px-4 py-2 border">1123555745</td>
                    <td className="px-4 py-2 border">10</td>
                </tr>
                </tbody>
            </table>
        </div>
        </div>

        {/* 💰 Most Revenue Table */}
        <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Most Revenue</h3>
            <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg shadow-sm">
            <thead className="bg-green-100 text-green-800 font-semibold">
                <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">First Name</th>
                    <th className="px-4 py-2 border">Last Name</th>
                    <th className="px-4 py-2 border">E-mail</th>
                    <th className="px-4 py-2 border">Phone Number</th>
                    <th className="px-4 py-2 border">Most Revenue</th>
                </tr>
            </thead>
            <tbody>
            {/* 🔧 TODO: Backend integration for Most Revenue Table */}
            <tr className="text-center">
              <td className="px-4 py-2 border">1</td>
              <td className="px-4 py-2 border">p</td>
              <td className="px-4 py-2 border">q</td>
              <td className="px-4 py-2 border">pq@mail.com</td>
              <td className="px-4 py-2 border">1234567890</td>
              <td className="px-4 py-2 border">$15,000</td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2 border">2</td>
              <td className="px-4 py-2 border">r</td>
              <td className="px-4 py-2 border">s</td>
              <td className="px-4 py-2 border">rs@mail.com</td>
              <td className="px-4 py-2 border">9876543210</td>
              <td className="px-4 py-2 border">$12,300</td>
            </tr>
          </tbody>
        </table>
        </div>
     </div>
    </div>
    )}


        {activeTab !== "user_stats" && (
          <>
            {/* ✅ Summary Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                <p className="text-3xl font-bold text-fuchsia-600">{summary.totalUsers}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">Loyalty Points Generated</h3>
                <p className="text-3xl font-bold text-green-600">{summary.totalPoints}</p>
              </div>
            </div>

            {/* 📈 Graph Section */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-xl font-bold text-gray-700 mb-4">User Growth & Loyalty Points</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={demoGraphData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" name="Users" />
                  <Line type="monotone" dataKey="points" stroke="#82ca9d" name="Loyalty Points" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === "dashboard" && <Dashboard />}
        {/* {activeTab === 'user_profile' && <User_profile />} */}
        {activeTab === "shopkeeper" && <ShopkeeperProfile />}
        {/* {activeTab === 'user' && <User />} */}
        {activeTab === "shopkeeper_setting" && <Shopkeeper_setting />}
        {activeTab === "interactions" && <CustomerLookup />}
      </main>
    </div>
  );
};

export default Shopdashboard;
