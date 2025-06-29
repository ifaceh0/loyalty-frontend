import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import User_profile from "../User-Profile/User_profile";
import User from "../User/User";
import ExploreShops from '../ShopList/ExploreShops';


const Userdashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/signin");
  }
}, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow">
        <h2 className="text-xl font-bold text-fuchsia-600 mb-6">User Dashboard</h2>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('user_profile')}
            className={`block w-full text-left px-4 py-2 rounded-lg ${activeTab === 'user_profile' ? 'bg-fuchsia-600 text-white' : 'hover:bg-gray-200'
              }`}
          >
            User Profile
          </button>
        
          <button
            onClick={() => setActiveTab('user')}
            className={`block w-full text-left px-4 py-2 rounded-lg ${activeTab === 'user' ? 'bg-fuchsia-600 text-white' : 'hover:bg-gray-200'
              }`}
          >
            User
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className={`block w-full text-left px-4 py-2 rounded-lg ${activeTab === 'shop' ? 'bg-fuchsia-600 text-white' : 'hover:bg-gray-200'
              }`}
          >
            Shop
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {/* {activeTab === 'dashboard' && <Dashboard />} */}
        {activeTab === 'user_profile' && <User_profile />}
        {activeTab === 'user' && <User />}
        {activeTab === 'shop' && <ExploreShops />}
      </main>
    </div>
  );
};
export default Userdashboard;

