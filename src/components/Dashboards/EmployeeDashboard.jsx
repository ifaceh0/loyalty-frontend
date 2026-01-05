import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartBar, 
  faUser, 
  faStore, 
  faSignOutAlt 
} from "@fortawesome/free-solid-svg-icons";
import { X, Menu } from "lucide-react";
import CustomerLookup from "../Customer/CustomerLookup"; 
import InactiveShopsPage from "../Employee/InactiveShopsPage";
import { useSidebar } from "../../context/SidebarContext";
import { useTranslation } from "react-i18next";

const EmployeeDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const [activeTab, setActiveTab] = useState("customer-lookup");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");

    if (!isLoggedIn || role !== "EMPLOYEE") {
      navigate("/signin");
    }
  }, [navigate]);

  const toggleSidebarExpansion = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-100 overflow-hidden">
      <aside
        className={`fixed inset-y-0 left-0 h-full bg-gradient-to-b from-[#dbeafe] to-[#bfdbfe] text-slate-800 p-3 sm:p-4 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isSidebarExpanded ? "w-56 sm:w-64" : "w-14 sm:w-16"} rounded-r-lg flex flex-col`}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          {isSidebarExpanded && (
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 truncate pr-2">
              {t("employeeDashboard.sidebar.title") || "Employee Panel"}
            </h2>
          )}
          <div className="flex items-center">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 sm:p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center fixed left-2 top-2 z-50"
                aria-label="Open sidebar"
              >
                
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
            {sidebarOpen && (
              <div className="relative group">
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    setIsSidebarExpanded(false);
                  }}
                  className="p-1.5 sm:p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5 sm:w-5 sm:h-5" />
                </button>
                <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-blue-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {t("employeeDashboard.sidebar.close") || "Close"}
                </span>
              </div>
            )}
          </div>
        </div>

        <nav className="space-y-1.5 sm:space-y-2 flex-1">
          {[
            {
              tab: "customer-lookup",
              icon: faChartBar,
              label: t("employeeDashboard.sidebar.dashboard") || "Customer Lookup"
            },
            {
              tab: "inactive-shops",
              icon: faStore,
              label: t("employeeDashboard.sidebar.inactiveShops") || "Inactive Shops"
            },
          ].map(({ tab, icon: Icon, label }) => (
            <div key={tab} className="relative group">
              <button
                onClick={() => {
                  setActiveTab(tab);
                  setSidebarOpen(true);
                  toggleSidebarExpansion();
                }}
                className={`flex items-center w-full text-left px-2 sm:px-3 py-2 rounded-full transition text-xs sm:text-sm md:text-base ${
                  activeTab === tab
                    ? "bg-blue-600 text-white font-semibold shadow-md"
                    : "hover:bg-blue-200 hover:text-blue-800"
                } ${isSidebarExpanded ? "justify-start" : "justify-center"}`}
              >
                <FontAwesomeIcon
                  icon={Icon}
                  className={`${
                    isSidebarExpanded ? "mr-2 sm:mr-3" : ""
                  } text-base sm:text-lg ${
                    activeTab === tab ? "text-white" : "text-blue-600"
                  }`}
                />
                {isSidebarExpanded && <span className="truncate">{label}</span>}
              </button>

              {!isSidebarExpanded && (
                <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-blue-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {label}
                </span>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-3 sm:px-4">
          <a
            href="#"
            className={`w-full text-center py-1 text-xs sm:text-sm hover:underline transition block ${
              isSidebarExpanded ? "" : "flex items-center justify-center"
            }`}
          >
            <span className={`${!isSidebarExpanded && "hidden"}`}>
              {t("employeeDashboard.sidebar.help") || "Help & Support"}
            </span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
          sidebarOpen && isSidebarExpanded
            ? "ml-56 sm:ml-64"
            : sidebarOpen
            ? "ml-14 sm:ml-16"
            : "ml-0"
        } p-3 sm:p-4 md:p-6`}
      >
        {activeTab === "customer-lookup" && <CustomerLookup />}
        {activeTab === "inactive-shops" && <InactiveShopsPage />}
      </main>
    </div>
  );
};

export default EmployeeDashboard;