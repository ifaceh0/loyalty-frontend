// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faHome, faStore, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
// import User_profile from "../User-Profile/User_profile";
// import { X, Menu } from "lucide-react";
// import ExploreShops from "../ShopList/ExploreShops";
// import UserShopList from "../ShopList/UserShopList";
// import UserTransactions from "../bar chart/UserTransactions";
// import { useSidebar } from "../../context/SidebarContext";

// const Userdashboard = () => {
//   const navigate = useNavigate();
//   const { sidebarOpen, setSidebarOpen } = useSidebar();
//   const [activeTab, setActiveTab] = useState("user-stats");
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     const userId = localStorage.getItem("id");

//     if (!isLoggedIn || !userId) {
//       navigate("/signin");
//     }
//   }, [navigate]);

//   const toggleSidebarExpansion = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };

//   return (
//     <div className="flex h-[calc(100vh-64px)] bg-slate-100 overflow-hidden">
//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 h-full bg-gradient-to-b from-[#dbeafe] to-[#bfdbfe] text-slate-800 p-3 sm:p-4 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } ${isSidebarExpanded ? "w-56 sm:w-64" : "w-14 sm:w-16"} rounded-r-lg flex flex-col`}
//       >
//         <div className="flex justify-between items-center mb-4 sm:mb-6">
//           {isSidebarExpanded && (
//             <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 truncate pr-2">
//               User Panel
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
//                   Close
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* <nav className="space-y-1 sm:space-y-2 flex-1 overflow-y-auto"> */}
//         <nav className="space-y-1.5 sm:space-y-2">
//           {[
//             { tab: "user-stats", icon: faHome, label: "Dashboard" },
//             { tab: "user_profile", icon: faUser, label: "Profile" },
//             { tab: "transactions", icon: faExchangeAlt, label: "Transactions" },
//             { tab: "shop", icon: faStore, label: "Visited Shops" },
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
//           <a
//             href="#"
//             className={`w-full text-center py-1 text-xs sm:text-sm hover:underline transition block ${
//               isSidebarExpanded ? "" : "flex items-center justify-center"
//             }`}
//           >
//             <span className={`${!isSidebarExpanded && "hidden"}`}>Need Help?</span>
//           </a>
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
//         {activeTab === "user-stats" && <ExploreShops />}
//         {activeTab === "user_profile" && <User_profile />}
//         {activeTab === "shop" && <UserShopList />}
//         {activeTab === "transactions" && <UserTransactions />}
//       </main>
//     </div>
//   );
// };

// export default Userdashboard;








// //translated
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faHome, faStore, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
// import User_profile from "../User-Profile/User_profile";
// import { Mail, X, Menu } from "lucide-react";
// import ExploreShops from "../ShopList/ExploreShops";
// import UserShopList from "../ShopList/UserShopList";
// import UserTransactions from "../bar chart/UserTransactions";
// import { useSidebar } from "../../context/SidebarContext";
// import { useTranslation } from "react-i18next";

// const Userdashboard = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { sidebarOpen, setSidebarOpen } = useSidebar();
//   const [activeTab, setActiveTab] = useState("user-stats");
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     const userId = localStorage.getItem("id");

//     if (!isLoggedIn || !userId) {
//       navigate("/signin");
//     }
//   }, [navigate]);

//   const toggleSidebarExpansion = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };

//   return (
//     <div className="flex h-[calc(100vh-64px)] bg-slate-100 overflow-hidden">
//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 h-full bg-gradient-to-b from-[#dbeafe] to-[#bfdbfe] text-slate-800 p-3 sm:p-4 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } ${isSidebarExpanded ? "w-56 sm:w-64" : "w-14 sm:w-16"} rounded-r-lg flex flex-col`}
//       >
//         <div className="flex justify-between items-center mb-4 sm:mb-6">
//           {isSidebarExpanded && (
//             <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 truncate pr-2">
//               {t("userDashboard.sidebar.title")}
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
//                   {t("userDashboard.sidebar.close")}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* <nav className="space-y-1 sm:space-y-2 flex-1 overflow-y-auto"> */}
//         <nav className="space-y-1.5 sm:space-y-2">
//           {[
//             { tab: "user-stats", icon: faHome, label: t("userDashboard.sidebar.dashboard") },
//             { tab: "user_profile", icon: faUser, label: t("userDashboard.sidebar.profile") },
//             { tab: "transactions", icon: faExchangeAlt, label: t("userDashboard.sidebar.transactions") },
//             { tab: "shop", icon: faStore, label: t("userDashboard.sidebar.RegisteredShops") },
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
//               {t("userDashboard.sidebar.contactUs") || "Contact Us"}
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
//         {activeTab === "user-stats" && <ExploreShops />}
//         {activeTab === "user_profile" && <User_profile />}
//         {activeTab === "shop" && <UserShopList />}
//         {activeTab === "transactions" && <UserTransactions />}
//       </main>
//     </div>
//   );
// };

// export default Userdashboard;








// // mobile view
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faHome, faStore, faEnvelope, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
// import User_profile from "../User-Profile/User_profile";
// import { Mail, X, Menu } from "lucide-react";
// import ExploreShops from "../ShopList/ExploreShops";
// import UserShopList from "../ShopList/UserShopList";
// import UserTransactions from "../bar chart/UserTransactions";
// import { useSidebar } from "../../context/SidebarContext";
// import { useTranslation } from "react-i18next";
// import ContactUs from "../Contact/Contact";

// const Userdashboard = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { sidebarOpen, setSidebarOpen } = useSidebar();
//   const [activeTab, setActiveTab] = useState("user-stats");
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     const userId = localStorage.getItem("id");

//     if (!isLoggedIn || !userId) {
//       navigate("/signin");
//     }
//   }, [navigate]);

//   const toggleSidebarExpansion = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };

//   return (
//     <div className="flex min-h-screen overflow-hidden">
//       {/* Sidebar */}
//       <aside
//               className={`fixed h-screen top-0 bg-gradient-to-b from-[#dbeafe] to-[#bfdbfe] text-slate-800 p-3 sm:p-4 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
//                 sidebarOpen ? "translate-x-0" : "-translate-x-full"
//               } ${isSidebarExpanded ? "w-64" : "w-16"} rounded-r-xl`}
//             >
//               <div className="flex justify-between items-center mb-5 sm:mb-6">
//                 {isSidebarExpanded && (
//                   <h2 className="text-xl sm:text-2xl font-bold text-blue-700 truncate pr-2">
//                     {t("userDashboard.sidebar.title")}
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
//                   { tab: "user-stats", icon: faHome, label: t("userDashboard.sidebar.dashboard") },
//                   { tab: "user_profile", icon: faUser, label: t("userDashboard.sidebar.profile") },
//                   { tab: "transactions", icon: faExchangeAlt, label: t("userDashboard.sidebar.transactions") },
//                   { tab: "shop", icon: faStore, label: t("userDashboard.sidebar.RegisteredShops") },
//                   { tab: "contact_support", icon: faEnvelope, label: t("userDashboard.sidebar.contactUs") },
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
//             ? "ml-64 sm:ml-72"
//             : sidebarOpen
//             ? "ml-16 sm:ml-20"
//             : "ml-0"
//         } p-4 sm:p-6 lg:p-8`}
//       >
//         {activeTab === "user-stats" && <ExploreShops />}
//         {activeTab === "user_profile" && <User_profile />}
//         {activeTab === "shop" && <UserShopList />}
//         {activeTab === "transactions" && <UserTransactions />}
//         {activeTab === "contact_support" && <ContactUs />}
//       </main>
//     </div>
//   );
// };

// export default Userdashboard;








import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faStore, faEnvelope, faExchangeAlt, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { X, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSidebar } from "../../context/SidebarContext";
import User_profile from "../User-Profile/User_profile";
import ExploreShops from "../ShopList/ExploreShops";
import UserShopList from "../ShopList/UserShopList";
import UserTransactions from "../bar chart/UserTransactions";
import ContactUs from "../Contact/Contact";

const Userdashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("user-stats");
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { tab: "user-stats", icon: faHome, label: t("userDashboard.sidebar.dashboard") },
    { tab: "user_profile", icon: faUser, label: t("userDashboard.sidebar.profile") },
    { tab: "transactions", icon: faExchangeAlt, label: t("userDashboard.sidebar.transactions") },
    { tab: "shop", icon: faStore, label: t("userDashboard.sidebar.RegisteredShops") },
    { tab: "contact_support", icon: faEnvelope, label: t("userDashboard.sidebar.contactUs") },
  ];

  return (
    <div className="flex min-h-screen font-sans text-slate-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white rounded-r-[1.5rem] border-r border-slate-100 shadow-sm transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0 w-[85%] max-w-xs" : "-translate-x-full lg:translate-x-0"} 
          ${isExpanded ? "lg:w-64" : "lg:w-18"}
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header Area */}
          <div className={`flex items-center mb-8 h-10 ${isExpanded || sidebarOpen ? "justify-between" : "justify-center"}`}>
            {(isExpanded || sidebarOpen) && (
              <span className="font-bold text-xl text-blue-600 ml-2 tracking-tight">{t("userDashboard.sidebar.title")}</span>
            )}
            
            {/* Desktop Toggle Button (Hidden on Mobile) */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`hidden lg:flex items-center justify-center w-8 h-8 shadow-inner rounded-full bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-600 transition-all border border-slate-100
                ${!isExpanded && !sidebarOpen ? "" : "ml-auto"} 
              `}
            >
              <FontAwesomeIcon icon={isExpanded ? faChevronLeft : faChevronRight} />
            </button>

            {/* Mobile Close Button (Hidden on Desktop) */}
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-slate-500">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-5 sm:space-y-3 mt-4">
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
                  className={`flex items-center w-full p-3 hover:p-3 hover:shadow-inner hover:rounded-full transition-all group relative
                    ${isActive 
                      ? "bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"}
                    ${!showText ? "justify-center" : "justify-start"}
                  `}
                >
                  <FontAwesomeIcon icon={icon} className={`text-lg ${showText ? "mr-4" : ""}`} />
                  
                  {showText && <span className="font-medium whitespace-nowrap">{label}</span>}

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
          <div>
            {activeTab === "user-stats" && <ExploreShops />}
            {activeTab === "user_profile" && <User_profile />}
            {activeTab === "shop" && <UserShopList />}
            {activeTab === "transactions" && <UserTransactions />}
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

export default Userdashboard;