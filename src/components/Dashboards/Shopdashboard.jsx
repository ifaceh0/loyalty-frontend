// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Table, Card, Col, Row } from "antd";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   LabelList
// } from "recharts";
// import ShopkeeperProfile from "../Shopkeeper_profile/Shopkeeper_profile";
// import Shopkeeper_setting from "../Shopkeeper-setting/Shopkeeper_setting";
// import CustomerLookup from "../Customer/CustomerLookup";
// import SubscriptionDashboard from "../Subscription/SubscriptionDashboard";
// import DailyTransactionReport from "../Customer/DailyTransaction";
// import InviteEmployeePage from "../Employee/InviteEmployeePage";
// import UserPurchaseChart from "../bar chart/UserPurchaseChart";
// import { useSidebar } from "../../context/SidebarContext";
// import { Mail, X, Menu } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChartBar, faUser, faCog, faUsers, faEnvelope, faCreditCard, faUserTie, faFileInvoiceDollar, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
// import { useTranslation } from "react-i18next";
// import { API_BASE_URL } from '../../apiConfig';
// import { getCurrencySymbol } from "../../utils/currency";
// import ContactUs from "../Contact/Contact";

// const Shopdashboard = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { sidebarOpen, setSidebarOpen } = useSidebar();
//   const [activeTab, setActiveTab] = useState("user_stats");
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

//   const [totalUsers, setTotalUsers] = useState(0);
//   const [topVisitedUsers, setTopVisitedUsers] = useState([]);
//   const [topSpendingUsers, setTopSpendingUsers] = useState([]);
//   const [monthlySalesData, setMonthlySalesData] = useState([]);
//   const [customerComparisonData, setCustomerComparisonData] = useState([]);

//   const country = localStorage.getItem("country");
//   const currencySymbol = getCurrencySymbol(country);

//   useEffect(() => {
//     const shopId = localStorage.getItem("id");
//     const isLoggedIn = localStorage.getItem("isLoggedIn");

//     if (!isLoggedIn || !shopId) {
//       navigate("/signin");
//       return;
//     }

//     const loadData = async () => {
//       await Promise.all([
//         fetchDashboardData(shopId),
//         fetchMonthlySales(shopId),
//         fetchCustomerComparison(shopId),
//       ]);
//     };

//     loadData();
//   }, [navigate]);

//   const fetchDashboardData = async (shopId) => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/dashboard/dashboardChat/${shopId}`, {
//         credentials: "include",
//       });
//       if (!res.ok) throw new Error("Unauthorized");
//       const data = await res.json();
//       setTotalUsers(data.totalUsers || 0);
//       setTopVisitedUsers(data.topVisitedUsers || []);
//       setTopSpendingUsers(data.topSpendingUsers || []);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const fetchMonthlySales = async (shopId) => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/dashboard/monthlySales/${shopId}`, {
//         credentials: "include",
//       });
//       if (!res.ok) throw new Error("Unauthorized");
//       const data = await res.json();
//       const sortedData = rotateMonthsToEndWithCurrent(data);
//       const withGrowth = sortedData.map((d, i, arr) => ({
//         ...d,
//         growth: i === 0 ? 0 : d.sales - arr[i - 1].sales
//       }));
//       setMonthlySalesData(withGrowth);
//     } catch (error) {
//       console.error("Error fetching monthly sales data:", error);
//     }
//   };

//   const fetchCustomerComparison = async (shopId) => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/dashboard/customerCount/${shopId}`, {
//         credentials: "include",
//       });
//       if (!res.ok) throw new Error("Unauthorized");
//       const data = await res.json();
//       const formatted = Object.entries(data).map(([key, value], i, arr) => {
//         const prev = i > 0 ? arr[i - 1][1] : value;
//         const growth = prev !== 0 ? ((value - prev) / prev) * 100 : 0;
//         return { name: key, customers: value, growth };
//       });
//       setCustomerComparisonData(formatted);
//     } catch (error) {
//       console.error("Error fetching customer comparison data:", error);
//     }
//   };

//   const rotateMonthsToEndWithCurrent = (rawData) => {
//     const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const currentMonth = new Date().toLocaleString("default", { month: "short" });
//     const currentIndex = monthOrder.indexOf(currentMonth);
//     const rotated = [...monthOrder.slice(currentIndex + 1), ...monthOrder.slice(0, currentIndex + 1)];
//     return rotated.map((month) => ({ month, sales: rawData[month] || 0 }));
//   };

//   const mostVisitorsColumns = [
//     { title: t("shopdashboard.table.id"), dataIndex: "userId", key: "id" },
//     { title: t("shopdashboard.table.firstName"), dataIndex: "firstName", key: "firstName" },
//     { title: t("shopdashboard.table.lastName"), dataIndex: "lastName", key: "lastName" },
//     { title: t("shopdashboard.table.email"), dataIndex: "email", key: "email" },
//     { title: t("shopdashboard.table.phone"), dataIndex: "phone", key: "phone" },
//     { title: t("shopdashboard.table.visits"), dataIndex: "visitCount", key: "visits" },
//   ];

//   const topRevenueColumns = [
//     { title: t("shopdashboard.table.id"), dataIndex: "userId", key: "id" },
//     { title: t("shopdashboard.table.firstName"), dataIndex: "firstName", key: "firstName" },
//     { title: t("shopdashboard.table.lastName"), dataIndex: "lastName", key: "lastName" },
//     { title: t("shopdashboard.table.email"), dataIndex: "email", key: "email" },
//     { title: t("shopdashboard.table.phone"), dataIndex: "phone", key: "phone" },
//     {
//       title: t("shopdashboard.table.revenue"),
//       dataIndex: "totalSpent",
//       key: "revenue",
//       render: (amount) => `${currencySymbol}${amount}`,
//     },
//   ];

//   const currentYear = new Date().getFullYear();

//   const toggleSidebarExpansion = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };

//   return (
//     <div className="flex h-[calc(100vh-64px)]">
//       {/* Sidebar */}
//       <aside
//         className={`fixed h-screen top-0 bg-gradient-to-b from-[#dbeafe] to-[#bfdbfe] text-slate-800 p-3 sm:p-4 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } ${isSidebarExpanded ? "w-64" : "w-16"} rounded-r-xl`}
//       >
//         <div className="flex justify-between items-center mb-5 sm:mb-6">
//           {isSidebarExpanded && (
//             <h2 className="text-xl sm:text-2xl font-bold text-blue-700 truncate pr-2">
//               {t("shopdashboard.sidebar.title")}
//             </h2>
//           )}
//           <div className="flex items-center">
//             {!sidebarOpen && (
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center absolute left-2 sm:left-4 top-3 sm:top-4"
//                 aria-label="Open sidebar"
//               >
//                 <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
//               </button>
//             )}
//             {sidebarOpen && (
//               <button
//                 onClick={() => {
//                   setSidebarOpen(false);
//                   setIsSidebarExpanded(false);
//                 }}
//                 className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center"
//                 aria-label="Close sidebar"
//               >
//                 <X className="w-6 h-6 sm:w-5 sm:h-5" />
//               </button>
//             )}
//           </div>
//         </div>

//         <nav className="space-y-5 sm:space-y-2 mt-10">
//           {[
//             { tab: "user_stats", icon: faChartBar, label: t("shopdashboard.sidebar.dashboard") },
//             { tab: "shopkeeper", icon: faUser, label: t("shopdashboard.sidebar.profile") },
//             { tab: "shopkeeper_setting", icon: faCog, label: t("shopdashboard.sidebar.settings") },
//             { tab: "interactions", icon: faUsers, label: t("shopdashboard.sidebar.interactions") },
//             { tab: "subscription", icon: faCreditCard, label: t("shopdashboard.sidebar.subscription") },
//             { tab: "employee_management", icon: faUserTie, label: t("shopdashboard.sidebar.employees") },
//             { tab: "daily_transaction_report", icon: faFileInvoiceDollar, label: t("shopdashboard.sidebar.transactions") },
//             { tab: "contact_support", icon: faEnvelope, label: t("shopdashboard.sidebar.contactUs") },
//           ].map(({ tab, icon, label }) => (
//             <div key={tab} className="relative group">
//               <button
//                 onClick={() => {
//                   setActiveTab(tab);
//                   if (!isSidebarExpanded) toggleSidebarExpansion();
//                 }}
//                 className={`flex items-center w-full text-left px-3 py-3 sm:py-2 rounded-full transition text-base ${
//                   activeTab === tab
//                     ? "bg-blue-600 text-white font-semibold shadow-md"
//                     : "hover:bg-blue-200 hover:text-blue-800 text-slate-700"
//                 } ${isSidebarExpanded ? "justify-start" : "justify-center"}`}
//               >
//                 <FontAwesomeIcon
//                   icon={icon}
//                   className={`${isSidebarExpanded ? "mr-3 sm:mr-4" : ""} ${
//                     activeTab === tab ? "text-white" : "text-blue-600"
//                   } text-lg`}
//                 />
//                 {isSidebarExpanded && <span className="truncate">{label}</span>}
//               </button>
//               {!isSidebarExpanded && (
//                 <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-blue-900 text-white text-sm rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md">
//                   {label}
//                 </span>
//               )}
//             </div>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main
//         className={`flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 transition-all duration-300 ease-in-out ${
//           sidebarOpen && isSidebarExpanded ? "ml-56 sm:ml-64" : sidebarOpen ? "ml-14 sm:ml-16" : "ml-0"
//         }`}
//       >
//         {activeTab === "user_stats" && (
//           <>
//             <UserPurchaseChart />

//             <section className="mb-4 sm:mb-6">
//               <div className="bg-white shadow-md rounded-xl p-3 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 gap-2">
//                   <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
//                     {t("shopdashboard.monthlySales.title")} ({currentYear})
//                   </h3>
//                   <span className="text-xs sm:text-sm text-gray-500">{t("shopdashboard.monthlySales.subtitle")}</span>
//                 </div>

//                 <div className="h-[260px] sm:h-[320px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart
//                       data={monthlySalesData}
//                       margin={{ top: 30, right: 20, left: 0, bottom: 0 }}
//                     >
//                       <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} />
//                       <YAxis tickFormatter={(val) => `${currencySymbol}${val}`} tick={{ fill: "#6b7280", fontSize: 11 }} />
//                       <Tooltip formatter={(value) => [`${currencySymbol}${value}`, `${t("shopdashboard.monthlySales.sales")} ${currencySymbol}`]} contentStyle={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid #e5e7eb" }} />
//                       <Legend />
//                       <Line
//                         type="monotone"
//                         dataKey="sales"
//                         stroke="#F97316"
//                         strokeWidth={2}
//                         // dot={{ r: 4, fill: "#ffffffff" }}
//                         activeDot={{ r: 6, fill: "#F97316" }}
//                         name={`${t("shopdashboard.monthlySales.sales")} ${currencySymbol}`}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </section>

//             <section className="mb-4 sm:mb-6">
//               <div className="bg-white shadow-md rounded-xl p-3 sm:p-3 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 gap-2">
//                   <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
//                     {t("shopdashboard.customerComparison.title")} ({currentYear})
//                   </h3>
//                   <span className="text-xs sm:text-sm text-gray-500">{t("shopdashboard.customerComparison.subtitle")}</span>
//                 </div>

//                 <div className="h-[260px] sm:h-[320px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={customerComparisonData} margin={{ top: 30, right: 15, left: 0, bottom: 10 }}>
//                       <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 11 }} angle={-45} textAnchor="end" height={60} />
//                       <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} allowDecimals={false} />
//                       <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
//                       <Legend wrapperStyle={{ fontSize: "11px" }} verticalAlign="top" height={36} />
//                       <Bar dataKey="customers" name={t("shopdashboard.customerComparison.customers")} fill="#2563eb" barSize={30} radius={[0, 4, 0, 0]}>
//                         <LabelList
//                           dataKey="growth"
//                           position="top"
//                           formatter={(val) => `${val >= 0 ? "+" : ""}${val.toFixed(1)}%`}
//                           fill="#2563eb"
//                           fontSize={10}
//                         />
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </section>

//             <Row gutter={[12, 12]}>
//               <Col xs={24}>
//                 <Card title={t("shopdashboard.cards.mostVisitors")} bordered={false}
//                   headStyle={{
//                     background: "linear-gradient(to bottom right, #6D28D9, #6D28D9)",
//                     color: "#FFFFFF"
//                   }}
//                 >
//                   <div className="overflow-x-auto">
//                     <Table columns={mostVisitorsColumns} dataSource={topVisitedUsers} pagination={{ pageSize: 5 }} rowKey="userId" size="small" scroll={{ x: 600 }} />
//                   </div>
//                 </Card>
//               </Col>
//               <Col xs={24}>
//                 <Card title={t("shopdashboard.cards.topRevenue")} bordered={false} 
//                   headStyle={{
//                     background: "linear-gradient(to bottom right, #2563eb, #2563eb)",
//                     color: "#FFFFFF"
//                   }}
//                 >
//                   <div className="overflow-x-auto">
//                     <Table columns={topRevenueColumns} dataSource={topSpendingUsers} pagination={false} rowKey="userId" size="small" scroll={{ x: 600, y: 200 }} />
//                   </div>
//                 </Card>
//               </Col>
//             </Row>
//           </>
//         )}
//         {activeTab === "shopkeeper" && <ShopkeeperProfile />}
//         {activeTab === "shopkeeper_setting" && <Shopkeeper_setting />}
//         {activeTab === "interactions" && <CustomerLookup />}
//         {activeTab === "subscription" && <SubscriptionDashboard />}
//         {activeTab === "employee_management" && <InviteEmployeePage />}
//         {activeTab === "daily_transaction_report" && <DailyTransactionReport />}
//         {activeTab === "contact_support" && <ContactUs />}
//       </main>
//     </div>
//   );
// };

// export default Shopdashboard;







import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Card, Col, Row } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList
} from "recharts";
import { X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartBar, 
  faUser, 
  faCog, 
  faUsers, 
  faEnvelope, 
  faCreditCard, 
  faUserTie, 
  faFileInvoiceDollar,
  faChevronRight,
  faChevronLeft 
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

// Context & Config
import { useSidebar } from "../../context/SidebarContext";
import { API_BASE_URL } from '../../apiConfig';
import { getCurrencySymbol } from "../../utils/currency";
import { fetchWithAuth } from "../../auth/fetchWithAuth";

// Tab Components
import ShopkeeperProfile from "../Shopkeeper_profile/Shopkeeper_profile";
import Shopkeeper_setting from "../Shopkeeper-setting/Shopkeeper_setting";
import CustomerLookup from "../Customer/CustomerLookup";
import SubscriptionDashboard from "../Subscription/SubscriptionDashboard";
import DailyTransactionReport from "../Customer/DailyTransaction";
import InviteEmployeePage from "../Employee/InviteEmployeePage";
import UserPurchaseChart from "../bar chart/UserPurchaseChart";
import ContactUs from "../Contact/Contact";

const Shopdashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  
  // Sidebar & Tab State
  const [activeTab, setActiveTab] = useState("user_stats");
  const [isExpanded, setIsExpanded] = useState(false);

  // Data States
  const [totalUsers, setTotalUsers] = useState(0);
  const [topVisitedUsers, setTopVisitedUsers] = useState([]);
  const [topSpendingUsers, setTopSpendingUsers] = useState([]);
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [customerComparisonData, setCustomerComparisonData] = useState([]);

  const country = localStorage.getItem("country");
  const currencySymbol = getCurrencySymbol(country);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const shopId = localStorage.getItem("id");

    const loadData = async () => {
      await Promise.all([
        fetchDashboardData(shopId),
        fetchMonthlySales(shopId),
        fetchCustomerComparison(shopId),
      ]);
    };

    loadData();
  }, [navigate]);

  // --- DATA FETCHING FUNCTIONS ---
  const fetchDashboardData = async (shopId) => {
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/dashboard/dashboardChat/${shopId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setTotalUsers(data.totalUsers || 0);
      setTopVisitedUsers(data.topVisitedUsers || []);
      setTopSpendingUsers(data.topSpendingUsers || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchMonthlySales = async (shopId) => {
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/dashboard/monthlySales/${shopId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      const sortedData = rotateMonthsToEndWithCurrent(data);
      const withGrowth = sortedData.map((d, i, arr) => ({
        ...d,
        growth: i === 0 ? 0 : d.sales - arr[i - 1].sales
      }));
      setMonthlySalesData(withGrowth);
    } catch (error) {
      console.error("Error fetching monthly sales data:", error);
    }
  };

  const fetchCustomerComparison = async (shopId) => {
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/dashboard/customerCount/${shopId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      const formatted = Object.entries(data).map(([key, value], i, arr) => {
        const prev = i > 0 ? arr[i - 1][1] : value;
        const growth = prev !== 0 ? ((value - prev) / prev) * 100 : 0;
        return { name: key, customers: value, growth };
      });
      setCustomerComparisonData(formatted);
    } catch (error) {
      console.error("Error fetching customer comparison data:", error);
    }
  };

  const rotateMonthsToEndWithCurrent = (rawData) => {
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().toLocaleString("default", { month: "short" });
    const currentIndex = monthOrder.indexOf(currentMonth);
    const rotated = [...monthOrder.slice(currentIndex + 1), ...monthOrder.slice(0, currentIndex + 1)];
    return rotated.map((month) => ({ month, sales: rawData[month] || 0 }));
  };

  // --- TABLE COLUMNS ---
  const mostVisitorsColumns = [
    // { title: t("shopdashboard.table.id"), dataIndex: "userId", key: "id" },
    { title: t("shopdashboard.table.firstName"), dataIndex: "firstName", key: "firstName" },
    { title: t("shopdashboard.table.lastName"), dataIndex: "lastName", key: "lastName" },
    { title: t("shopdashboard.table.email"), dataIndex: "email", key: "email" },
    { title: t("shopdashboard.table.phone"), dataIndex: "phone", key: "phone" },
    { title: t("shopdashboard.table.visits"), dataIndex: "visitCount", key: "visits" },
  ];

  const topRevenueColumns = [
    // { title: t("shopdashboard.table.id"), dataIndex: "userId", key: "id" },
    { title: t("shopdashboard.table.firstName"), dataIndex: "firstName", key: "firstName" },
    { title: t("shopdashboard.table.lastName"), dataIndex: "lastName", key: "lastName" },
    { title: t("shopdashboard.table.email"), dataIndex: "email", key: "email" },
    { title: t("shopdashboard.table.phone"), dataIndex: "phone", key: "phone" },
    {
      title: t("shopdashboard.table.revenue"),
      dataIndex: "totalSpent",
      key: "revenue",
      render: (amount) => `${currencySymbol}${amount}`,
    },
  ];

  const menuItems = [
    { tab: "user_stats", icon: faChartBar, label: t("shopdashboard.sidebar.dashboard") },
    { tab: "shopkeeper", icon: faUser, label: t("shopdashboard.sidebar.profile") },
    { tab: "shopkeeper_setting", icon: faCog, label: t("shopdashboard.sidebar.settings") },
    { tab: "interactions", icon: faUsers, label: t("shopdashboard.sidebar.interactions") },
    { tab: "subscription", icon: faCreditCard, label: t("shopdashboard.sidebar.subscription") },
    { tab: "employee_management", icon: faUserTie, label: t("shopdashboard.sidebar.employees") },
    { tab: "daily_transaction_report", icon: faFileInvoiceDollar, label: t("shopdashboard.sidebar.transactions") },
    { tab: "contact_support", icon: faEnvelope, label: t("shopdashboard.sidebar.contactUs") },
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
              <span className="font-bold text-xl text-blue-600 ml-2 tracking-tight">
                {t("shopdashboard.sidebar.title")}
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

          {/* Navigation Items */}
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
                  className={`flex items-center w-full p-3 hover:shadow-inner hover:rounded-full transition-all group relative
                    ${isActive 
                      ? "bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"}
                    ${!showText ? "justify-center" : "justify-start"}
                  `}
                >
                  <FontAwesomeIcon icon={icon} className={`text-lg ${showText ? "mr-4 w-5" : ""}`} />
                  
                  {showText && <span className="font-small whitespace-nowrap text-sm">{label}</span>}

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
          {activeTab === "user_stats" ? (
            <div className="space-y-10">
                {/* Top Chart Section */}
                <UserPurchaseChart />

                {/* Sales Trend Section */}
                <section className="mb-8">
                  <div className="bg-white rounded-xl p-6 border border-gray-50 shadow-sm transition-all duration-300 hover:shadow-md">
                    {/* Header Section */}
                    <div className="flex flex-col mb-8">
                      <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                        {t("shopdashboard.monthlySales.title")} ({currentYear})
                      </h3>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-1">
                        {t("shopdashboard.monthlySales.subtitle")}
                      </p>
                    </div>

                    {/* Chart Area */}
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={monthlySalesData}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          {/* Subtle horizontal grid lines only */}
                          {/* <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /> */}
                          
                          <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 500 }}
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(val) => `${currencySymbol}${val}`} 
                            tick={{ fill: "#9ca3af", fontSize: 11 }}
                          />
                          
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "#ffffff", 
                              borderRadius: "12px", 
                              border: "none", 
                              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                              padding: "12px"
                            }} 
                            formatter={(value) => [`${currencySymbol}${value}`, t("shopdashboard.monthlySales.sales")]}
                          />
                          
                          <Legend 
                            verticalAlign="top" 
                            align="right" 
                            iconType="circle"
                            wrapperStyle={{ paddingBottom: "25px", fontSize: "12px", fontWeight: 500, color: "#6b7280" }}
                          />
                          
                          <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#f97316"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }}
                            name={`${t("shopdashboard.monthlySales.sales")} (${currencySymbol})`}
                            animationDuration={1500}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </section>

              <section className="mb-8">
                <div className="bg-white rounded-xl p-6 border border-gray-50 shadow-sm transition-all duration-300 hover:shadow-md">
                  {/* Header Section */}
                  <div className="flex flex-col mb-8">
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                      {t("shopdashboard.customerComparison.title")} ({currentYear})
                    </h3>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-1">
                      {t("shopdashboard.customerComparison.subtitle")}
                    </p>
                  </div>

                  {/* Chart Area */}
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={customerComparisonData} 
                        margin={{ top: 20, right: 10, left: -25, bottom: 0 }}
                      >
                        {/* Light horizontal rules only for a modern feel */}
                        {/* <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /> */}
                        
                        <XAxis 
                          dataKey="name" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 500 }}
                          height={40}
                          // Removed the -45 angle for a cleaner horizontal look if names are short, 
                          // but kept a slight angle if needed for responsiveness
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#9ca3af", fontSize: 11 }}
                          allowDecimals={false} 
                        />
                        
                        <Tooltip 
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ 
                            backgroundColor: "#ffffff", 
                            borderRadius: "12px", 
                            border: "none", 
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                            padding: "12px"
                          }} 
                        />
                        
                        <Legend 
                          verticalAlign="top" 
                          align="right" 
                          iconType="circle"
                          wrapperStyle={{ paddingBottom: "25px", fontSize: "12px", fontWeight: 500, color: "#6b7280" }}
                        />
                        
                        <Bar 
                          dataKey="customers" 
                          name={t("shopdashboard.customerComparison.customers")} 
                          fill="#3b82f6" 
                          barSize={24} 
                          radius={[6, 6, 0, 0]} // Fully rounded top
                        >
                          <LabelList
                            dataKey="growth"
                            position="top"
                            offset={10}
                            formatter={(val) => `${val >= 0 ? "↑" : "↓"} ${Math.abs(val).toFixed(1)}%`}
                            fill="#94a3b8"
                            fontSize={10}
                            fontWeight={600}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>
              {/* Tables Section */}
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 h-full overflow-x-auto">
                    <h4 className="text-lg font-bold text-slate-800 mb-6">{t("shopdashboard.cards.mostVisitors")}</h4>
                    <Table 
                      columns={mostVisitorsColumns} 
                      dataSource={topVisitedUsers} 
                      pagination={{ pageSize: 5 }} 
                      rowKey="userId" 
                      size="small" 
                      className="custom-ant-table"
                    />
                  </div>
                </Col>
                <Col xs={24} lg={12}>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 h-full overflow-x-auto">
                    <h4 className="text-lg font-bold text-slate-800 mb-6">{t("shopdashboard.cards.topRevenue")}</h4>
                    <Table 
                      columns={topRevenueColumns} 
                      dataSource={topSpendingUsers} 
                      pagination={false} 
                      rowKey="userId" 
                      size="small" 
                      scroll={{ y: 240 }}
                      className="custom-ant-table"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            /* Render Active Tab Components */
            <div className="w-full">
              {activeTab === "shopkeeper" && <ShopkeeperProfile />}
              {activeTab === "shopkeeper_setting" && <Shopkeeper_setting />}
              {activeTab === "interactions" && <CustomerLookup />}
              {activeTab === "subscription" && <SubscriptionDashboard />}
              {activeTab === "employee_management" && <InviteEmployeePage />}
              {activeTab === "daily_transaction_report" && <DailyTransactionReport />}
              {activeTab === "contact_support" && <ContactUs />}
            </div>
          )}
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

export default Shopdashboard;