import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import User_profile from "../User-Profile/User_profile";
import ShopkeeperProfile from "../Shopkeeper_profile/Shopkeeper_profile";
import User from "../User/User";
import Shopkeeper_setting from "../Shopkeeper-setting/Shopkeeper_setting";
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
          <button
            onClick={() => setActiveTab('user_profile')}
            className={`block w-full text-left px-4 py-2 rounded-lg ${activeTab === 'user_profile' ? 'bg-fuchsia-600 text-white' : 'hover:bg-gray-200'
              }`}
          >
            User Profile
          </button>
          {/* <button
            onClick={() => setActiveTab('shopkeeper')}
            className={`block w-full text-left px-4 py-2 rounded-lg ${activeTab === 'shopkeeper' ? 'bg-fuchsia-600 text-white' : 'hover:bg-gray-200'
              }`}
          >
            Shopkeeper Profile
          </button> */}

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

          {/* <button
            onClick={() => setActiveTab('shopkeeper_setting')}
            className={`block w-full text-left px-4 py-2 rounded-lg ${activeTab === 'shopkeeper_setting' ? 'bg-fuchsia-600 text-white' : 'hover:bg-gray-200'
              }`}
          >
            Shopkeeper Setting
          </button> */}


          {/* <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 mt-8"
          >
            Logout
          </button> */}

        </nav>
      </aside>

      <main className="flex-1 p-6">

        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'user_profile' && <User_profile />}
        {/* {activeTab === 'shopkeeper' && <ShopkeeperProfile />} */}
        {activeTab === 'user' && <User />}
        {/* {activeTab === 'shopkeeper_setting' && <Shopkeeper_setting />} */}
        {/* Render ExploreShops when activeTab is 'shop' */}
        {activeTab === 'shop' && <ExploreShops />}

      </main>

    </div>





  );
};

export default Userdashboard;

