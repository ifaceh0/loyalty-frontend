import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faStore } from "@fortawesome/free-solid-svg-icons";
import User_profile from "../User-Profile/User_profile";
import { X } from "lucide-react";
import ExploreShops from "../ShopList/ExploreShops";
import UserTransactions from "../bar chart/UserTransactions";
import { useSidebar } from "../../context/SidebarContext";

const Userdashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user-stats");
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
      <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="absolute md:relative h-full w-64 bg-fuchsia-600 text-white p-6 shadow-lg z-40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">User Panel</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded hover:bg-purple-700 hover:text-white transition flex items-center justify-center"
            >
              <X className="w-5 h-5 align-middle" />
            </button>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => { setActiveTab("user-stats"); setSidebarOpen(false); }}
              className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "user-stats" ? "bg-white text-fuchsia-700 font-semibold" : "hover:bg-fuchsia-500"}`}
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" /> Dashboard
            </button>
            <button
              onClick={() => { setActiveTab("user_profile"); setSidebarOpen(false); }}
              className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "user_profile" ? "bg-white text-fuchsia-700 font-semibold" : "hover:bg-fuchsia-500"}`}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
            </button>
            <button
              onClick={() => { setActiveTab("shop"); setSidebarOpen(false); }}
              className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "shop" ? "bg-white text-fuchsia-700 font-semibold" : "hover:bg-fuchsia-500"}`}
            >
              <FontAwesomeIcon icon={faStore} className="mr-2" /> Explore Shops
            </button>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === "user-stats" && (
          <>
            <div >
              <h1 className="mb-6 text-2xl font-bold text-gray-800 flex items-center">User Dashboard</h1>
            </div>
            <UserTransactions/>
          </>
        )}
        {activeTab === "user_profile" && <User_profile />}
        {activeTab === "shop" && <ExploreShops />}
      </main>
    </div>
  );
};

export default Userdashboard;
