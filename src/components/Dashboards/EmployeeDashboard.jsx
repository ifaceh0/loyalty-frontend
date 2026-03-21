// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//   faChartBar, 
//   faUser, 
//   faStore, 
//   faSignOutAlt 
// } from "@fortawesome/free-solid-svg-icons";
// import { Mail, X, Menu } from "lucide-react";
// import CustomerLookup from "../Customer/CustomerLookup"; 
// import InactiveShopsPage from "../Employee/InactiveShopsPage";
// import { useSidebar } from "../../context/SidebarContext";
// import { useTranslation } from "react-i18next";

// const EmployeeDashboard = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { sidebarOpen, setSidebarOpen } = useSidebar();

//   const [activeTab, setActiveTab] = useState("customer-lookup");
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//     const role = localStorage.getItem("role");

//     if (!isLoggedIn || role !== "EMPLOYEE") {
//       navigate("/signin");
//     }
//   }, [navigate]);

//   const toggleSidebarExpansion = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/signin");
//   };

//   return (
//     <div className="flex h-[calc(100vh-64px)] bg-slate-100 overflow-hidden">
//       <aside
//         className={`fixed inset-y-0 left-0 h-full bg-gradient-to-b from-[#dbeafe] to-[#bfdbfe] text-slate-800 p-3 sm:p-4 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } ${isSidebarExpanded ? "w-56 sm:w-64" : "w-14 sm:w-16"} rounded-r-lg flex flex-col`}
//       >
//         <div className="flex justify-between items-center mb-4 sm:mb-6">
//           {isSidebarExpanded && (
//             <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 truncate pr-2">
//               {t("employeeDashboard.sidebar.title") || "Employee Panel"}
//             </h2>
//           )}
//           <div className="flex items-center">
//             {!sidebarOpen && (
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="p-1.5 sm:p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center fixed left-2 top-2 z-50"
//                 aria-label="Open sidebar"
//               >
                
//                 <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
//               </button>
//             )}
//             {sidebarOpen && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setSidebarOpen(false);
//                     setIsSidebarExpanded(false);
//                   }}
//                   className="p-1.5 sm:p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center"
//                   aria-label="Close sidebar"
//                 >
//                   <X className="w-5 h-5 sm:w-5 sm:h-5" />
//                 </button>
//                 <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-blue-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                   {t("employeeDashboard.sidebar.close") || "Close"}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         <nav className="space-y-1.5 sm:space-y-2 flex-1">
//           {[
//             {
//               tab: "customer-lookup",
//               icon: faChartBar,
//               label: t("employeeDashboard.sidebar.dashboard") || "Customer Lookup"
//             },
//             {
//               tab: "inactive-shops",
//               icon: faStore,
//               label: t("employeeDashboard.sidebar.inactiveShops") || "Inactive Shops"
//             },
//           ].map(({ tab, icon: Icon, label }) => (
//             <div key={tab} className="relative group">
//               <button
//                 onClick={() => {
//                   setActiveTab(tab);
//                   setSidebarOpen(true);
//                   toggleSidebarExpansion();
//                 }}
//                 className={`flex items-center w-full text-left px-2 sm:px-3 py-2 rounded-full transition text-xs sm:text-sm md:text-base ${
//                   activeTab === tab
//                     ? "bg-blue-600 text-white font-semibold shadow-md"
//                     : "hover:bg-blue-200 hover:text-blue-800"
//                 } ${isSidebarExpanded ? "justify-start" : "justify-center"}`}
//               >
//                 <FontAwesomeIcon
//                   icon={Icon}
//                   className={`${
//                     isSidebarExpanded ? "mr-2 sm:mr-3" : ""
//                   } text-base sm:text-lg ${
//                     activeTab === tab ? "text-white" : "text-blue-600"
//                   }`}
//                 />
//                 {isSidebarExpanded && <span className="truncate">{label}</span>}
//               </button>

//               {!isSidebarExpanded && (
//                 <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-blue-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                   {label}
//                 </span>
//               )}
//             </div>
//           ))}
//         </nav>

//         <div className="absolute bottom-4 left-0 w-full px-3 sm:px-4">
//           <Link
//             to="/contact"
//             className={`w-full text-center py-5 text-sm sm:text-md hover:underline transition block ${
//               isSidebarExpanded ? "hover:text-blue-600" : "flex items-center justify-center"
//             }`}
//             onClick={() => setSidebarOpen(false)}
//           >
//             <span className={`${!isSidebarExpanded && "hidden"}`}>
//               {t("employeeDashboard.sidebar.contactUs") || "Contact Us"}
//             </span>
//             {!isSidebarExpanded && <Mail className="w-5 h-5 text-blue-600" />}
//           </Link>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main
//         className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
//           sidebarOpen && isSidebarExpanded
//             ? "ml-56 sm:ml-64"
//             : sidebarOpen
//             ? "ml-14 sm:ml-16"
//             : "ml-0"
//         } p-3 sm:p-4 md:p-6`}
//       >
//         {activeTab === "customer-lookup" && <CustomerLookup />}
//         {activeTab === "inactive-shops" && <InactiveShopsPage />}
//       </main>
//     </div>
//   );
// };

// export default EmployeeDashboard;










// // mobile view
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//   faChartBar, 
//   faEnvelope, 
//   faStore, 
//   faSignOutAlt 
// } from "@fortawesome/free-solid-svg-icons";
// import { Mail, X, Menu } from "lucide-react";
// import CustomerLookup from "../Customer/CustomerLookup"; 
// import InactiveShopsPage from "../Employee/InactiveShopsPage";
// import { useSidebar } from "../../context/SidebarContext";
// import { useTranslation } from "react-i18next";
// import ContactUs from "../Contact/Contact";

// const EmployeeDashboard = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { sidebarOpen, setSidebarOpen } = useSidebar();

//   const [activeTab, setActiveTab] = useState("customer-lookup");
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//     const role = localStorage.getItem("role");

//     if (!isLoggedIn || role !== "EMPLOYEE") {
//       navigate("/signin");
//     }
//   }, [navigate]);

//   const toggleSidebarExpansion = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/signin");
//   };

//   return (
//     <div className="flex h-[calc(100vh-64px)] overflow-hidden">
//       <aside
//               className={`fixed h-screen top-0 bg-gradient-to-b from-[#dbeafe] to-[#bfdbfe] text-slate-800 p-3 sm:p-4 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
//                 sidebarOpen ? "translate-x-0" : "-translate-x-full"
//               } ${isSidebarExpanded ? "w-64" : "w-16"} rounded-r-xl`}
//             >
//               <div className="flex justify-between items-center mb-5 sm:mb-6">
//                 {isSidebarExpanded && (
//                   <h2 className="text-xl sm:text-2xl font-bold text-blue-700 truncate pr-2">
//                     {t("employeeDashboard.sidebar.title") || "Employee Panel"}
//                   </h2>
//                 )}
//                 <div className="flex items-center">
//                   {!sidebarOpen && (
//                     <button
//                       onClick={() => setSidebarOpen(true)}
//                       className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center absolute left-2 sm:left-4 top-3 sm:top-4"
//                       aria-label="Open sidebar"
//                     >
//                       <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
//                     </button>
//                   )}
//                   {sidebarOpen && (
//                     <button
//                       onClick={() => {
//                         setSidebarOpen(false);
//                         setIsSidebarExpanded(false);
//                       }}
//                       className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center"
//                       aria-label="Close sidebar"
//                     >
//                       <X className="w-6 h-6 sm:w-5 sm:h-5" />
//                     </button>
//                   )}
//                 </div>
//               </div>
      
//               <nav className="space-y-5 sm:space-y-2 mt-10">
//                 {[
//                   {
//                     tab: "customer-lookup",
//                     icon: faChartBar,
//                     label: t("employeeDashboard.sidebar.dashboard") || "Customer Lookup"
//                   },
//                   {
//                     tab: "inactive-shops",
//                     icon: faStore,
//                     label: t("employeeDashboard.sidebar.inactiveShops") || "Inactive Shops"
//                   },
//                   {
//                     tab: "contact_support",
//                     icon: faEnvelope,
//                     label: t("employeeDashboard.sidebar.contactUs") || "Contact Us"
//                   }
//                 ].map(({ tab, icon: Icon, label }) => (
//                   <div key={tab} className="relative group">
//                     <button
//                       onClick={() => {
//                         setActiveTab(tab);
//                         if (!isSidebarExpanded) toggleSidebarExpansion();
//                       }}
//                       className={`flex items-center w-full text-left px-3 py-3 sm:py-2 rounded-full transition text-base ${
//                         activeTab === tab
//                           ? "bg-blue-600 text-white font-semibold shadow-md"
//                           : "hover:bg-blue-200 hover:text-blue-800 text-slate-700"
//                       } ${isSidebarExpanded ? "justify-start" : "justify-center"}`}
//                     >
//                       <FontAwesomeIcon
//                         icon={Icon}
//                         className={`${isSidebarExpanded ? "mr-3 sm:mr-4" : ""} ${
//                           activeTab === tab ? "text-white" : "text-blue-600"
//                         } text-lg`}
//                       />
//                       {isSidebarExpanded && <span className="truncate">{label}</span>}
//                     </button>
//                     {!isSidebarExpanded && (
//                       <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-blue-900 text-white text-sm rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md">
//                         {label}
//                       </span>
//                     )}
//                   </div>
//                 ))}
//               </nav>
//             </aside>

//       {/* Main Content */}
//       <main
//         className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
//           sidebarOpen && isSidebarExpanded
//             ? "ml-56 sm:ml-64"
//             : sidebarOpen
//             ? "ml-14 sm:ml-16"
//             : "ml-0"
//         } p-3 sm:p-4 md:p-6`}
//       >
//         {activeTab === "customer-lookup" && <CustomerLookup />}
//         {activeTab === "inactive-shops" && <InactiveShopsPage />}
//         {activeTab === "contact_support" && <ContactUs />}
//       </main>
//     </div>
//   );
// };

// export default EmployeeDashboard;









import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartBar, 
  faEnvelope, 
  faStore, 
  faChevronRight, 
  faChevronLeft 
} from "@fortawesome/free-solid-svg-icons";
import { X } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import { useTranslation } from "react-i18next";
import CustomerLookup from "../Customer/CustomerLookup"; 
import InactiveShopsPage from "../Employee/InactiveShopsPage";
import ContactUs from "../Contact/Contact";

const EmployeeDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const [activeTab, setActiveTab] = useState("customer-lookup");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");

    if (!isLoggedIn || role !== "EMPLOYEE") {
      navigate("/signin");
    }
  }, [navigate]);

  const menuItems = [
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
    {
      tab: "contact_support",
      icon: faEnvelope,
      label: t("employeeDashboard.sidebar.contactUs") || "Contact Us"
    }
  ];

  return (
    <div className="flex min-h-screen font-sans text-slate-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 shadow-sm transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"} 
          ${isExpanded ? "lg:w-64" : "lg:w-18"}
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header Area */}
          <div className={`flex items-center mb-8 h-10 ${isExpanded || sidebarOpen ? "justify-between" : "justify-center"}`}>
            {(isExpanded || sidebarOpen) && (
              <span className="font-bold text-xl text-blue-600 ml-2 tracking-tight">
                {t("employeeDashboard.sidebar.title") || "Employee Panel"}
              </span>
            )}
            
            {/* Desktop Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`hidden lg:flex items-center justify-center w-8 h-8 shadow-inner rounded-full bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-600 transition-all border border-slate-100
                ${!isExpanded && !sidebarOpen ? "" : "ml-auto"} 
              `}
            >
              <FontAwesomeIcon icon={isExpanded ? faChevronLeft : faChevronRight} />
            </button>

            {/* Mobile Close Button */}
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-slate-500">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-5 sm:space-y-3">
            {menuItems.map(({ tab, icon, label }) => {
              const isActive = activeTab === tab;
              const showText = isExpanded || sidebarOpen;
              
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    if (sidebarOpen) setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full p-3 hover:shadow-inner hover:rounded-full transition-all group relative
                    ${isActive 
                      ? "bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"}
                    ${!showText ? "justify-center" : "justify-start"}
                  `}
                >
                  <FontAwesomeIcon icon={icon} className={`text-lg ${showText ? "mr-4" : ""}`} />
                  
                  {showText && <span className="font-medium whitespace-nowrap text-sm">{label}</span>}

                  {/* Tooltip for collapsed state */}
                  {!showText && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[60]">
                      {label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 overflow-x-hidden
        ${isExpanded ? "lg:ml-64" : "lg:ml-20"}
      `}>
        <main className="p-4 sm:p-6 overflow-x-hidden w-full">
          <div className="min-h-[80vh]">
            {activeTab === "customer-lookup" && <CustomerLookup />}
            {activeTab === "inactive-shops" && <InactiveShopsPage />}
            {activeTab === "contact_support" && <ContactUs />}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;