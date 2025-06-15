import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import User_profile from "../User-Profile/User_profile";
import ShopkeeperProfile from "../Shopkeeper_profile/Shopkeeper_profile";
import User from "../User/User";
import Shopkeeper_setting from "../Shopkeeper-setting/Shopkeeper_setting";


const Shopdashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(null);
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
            fetchSummaryData(token);
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
                        onClick={() => setActiveTab('shopkeeper')}
                        className={`block w-full text-left px-4 py-2 rounded-lg ${activeTab === 'shopkeeper' ? 'bg-fuchsia-600 text-white' : 'hover:bg-gray-200'
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
                        onClick={() => setActiveTab('shopkeeper_setting')}
                        className={`block w-full text-left px-4 py-2 rounded-lg ${activeTab === 'shopkeeper_setting' ? 'bg-fuchsia-600 text-white' : 'hover:bg-gray-200'
                            }`}
                    >
                        Shopkeeper Setting
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
                            data={graphData}
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




                {activeTab === 'dashboard' && <Dashboard />}
                {/* {activeTab === 'user_profile' && <User_profile />} */}
                {activeTab === 'shopkeeper' && <ShopkeeperProfile />}
                {/* {activeTab === 'user' && <User />} */}
                {activeTab === 'shopkeeper_setting' && <Shopkeeper_setting />}
            </main>

        </div>





    );
};

export default Shopdashboard;


