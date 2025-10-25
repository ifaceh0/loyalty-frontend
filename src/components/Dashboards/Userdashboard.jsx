import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faStore, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import User_profile from "../User-Profile/User_profile";
import { X, Menu } from "lucide-react";
import ExploreShops from "../ShopList/ExploreShops";
import UserShopList from "../ShopList/UserShopList";
import UserTransactions from "../bar chart/UserTransactions";
import { useSidebar } from "../../context/SidebarContext";

const Userdashboard = () => {
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("user-stats");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("id");

    if (!isLoggedIn || !userId) {
      navigate("/signin");
    }
  }, [navigate]);

  const toggleSidebarExpansion = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-100">
      {/* Sidebar */}
      <aside
        className={`fixed h-screen top-0 bg-blue-800 text-white p-4 sm:p-4 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isSidebarExpanded ? "w-64" : "w-16"} rounded-r-xl`}
      >
        <div className="flex justify-between items-center mb-6">
          {isSidebarExpanded && (
            <h2 className="text-xl sm:text-2xl font-bold text-teal-300">User Panel</h2>
          )}
          <div className="flex items-center">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-full bg-blue-700 hover:bg-blue-900 text-white transition flex items-center justify-center absolute left-4 top-4"
                aria-label="Open sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            {sidebarOpen && (
              <div className="relative group">
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    setIsSidebarExpanded(false);
                  }}
                  className="p-1 rounded-full bg-blue-700 hover:bg-blue-900 text-white transition flex items-center justify-center"
                  aria-label="Close sidebar"
                >
                  <X className="w-6 h-6" />
                </button>
                <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Close
                </span>
              </div>
            )}
          </div>
        </div>
        <nav className="space-y-2">
          {[
            { tab: "user-stats", icon: faHome, label: "Dashboard" },
            { tab: "user_profile", icon: faUser, label: "Profile" },
            { tab: "transactions", icon: faExchangeAlt, label: "Transactions" },
            { tab: "shop", icon: faStore, label: "Visited Shops" },
          ].map(({ tab, icon: Icon, label }) => (
            <div key={tab} className="relative group">
              <button
                onClick={() => {
                  setActiveTab(tab);
                  setSidebarOpen(true);
                  toggleSidebarExpansion();
                }}
                className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition text-sm sm:text-base ${
                  activeTab === tab
                    ? "bg-teal-200 text-blue-900 font-semibold"
                    : "hover:bg-blue-600"
                } ${isSidebarExpanded ? "" : "justify-center"}`}
              >
                <FontAwesomeIcon icon={Icon} className={`${isSidebarExpanded ? "mr-2" : ""}`} />
                {isSidebarExpanded && <span>{label}</span>}
              </button>
              {!isSidebarExpanded && (
                <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto p-4 sm:p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen && isSidebarExpanded ? "ml-64" : sidebarOpen ? "ml-16" : "ml-0"
        }`}
      >
        {activeTab === "user-stats" && <ExploreShops />}
        {activeTab === "user_profile" && <User_profile />}
        {activeTab === "shop" && <UserShopList />}
        {activeTab === "transactions" && <UserTransactions />}
      </main>
    </div>
  );
};

export default Userdashboard;