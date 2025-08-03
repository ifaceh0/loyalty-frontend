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
      <aside
        className={`fixed h-full w-3/4 sm:w-64 bg-indigo-800 text-white p-4 sm:p-6 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">User Panel</h2>
          {/* Close Button (visible in all views) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-full bg-indigo-900 hover:bg-indigo-700 text-white transition flex items-center justify-center"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="space-y-2">
          <button
            onClick={() => {
              setActiveTab("user-stats");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition text-sm sm:text-base ${
              activeTab === "user-stats"
                ? "bg-indigo-100 text-indigo-900 font-semibold"
                : "hover:bg-indigo-700"
            }`}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Dashboard
          </button>
          <button
            onClick={() => {
              setActiveTab("user_profile");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition text-sm sm:text-base ${
              activeTab === "user_profile"
                ? "bg-indigo-100 text-indigo-900 font-semibold"
                : "hover:bg-indigo-700"
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
          </button>
          <button
            onClick={() => {
              setActiveTab("shop");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition text-sm sm:text-base ${
              activeTab === "shop"
                ? "bg-indigo-100 text-indigo-900 font-semibold"
                : "hover:bg-indigo-700"
            }`}
          >
            <FontAwesomeIcon icon={faStore} className="mr-2" /> Explore Shops
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto p-4 sm:p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-0 sm:ml-64" : "ml-0"
        }`}
      >
        {activeTab === "user-stats" && (
          <>
            <div>
              <h1 className="mb-6 text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                User Dashboard
              </h1>
            </div>
            <UserTransactions />
          </>
        )}
        {activeTab === "user_profile" && <User_profile />}
        {activeTab === "shop" && <ExploreShops />}
      </main>
    </div>
  );
};

export default Userdashboard;