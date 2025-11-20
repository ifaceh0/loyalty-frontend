// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
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
// import { X, Menu } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChartBar, faUser, faCog, faUsers, faCreditCard, faUserTie, faFileInvoiceDollar, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

// const Shopdashboard = () => {
//   const navigate = useNavigate();
//   const { sidebarOpen, setSidebarOpen } = useSidebar();
//   const [activeTab, setActiveTab] = useState("user_stats");
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

//   const [totalUsers, setTotalUsers] = useState(0);
//   const [topVisitedUsers, setTopVisitedUsers] = useState([]);
//   const [topSpendingUsers, setTopSpendingUsers] = useState([]);
//   const [monthlySalesData, setMonthlySalesData] = useState([]);
//   const [customerComparisonData, setCustomerComparisonData] = useState([]);

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
//       const res = await fetch(`https://loyalty-backend-java.onrender.com/api/dashboard/dashboardChat/${shopId}`, {
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
//       const res = await fetch(`https://loyalty-backend-java.onrender.com/api/dashboard/monthlySales/${shopId}`, {
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
//       const res = await fetch(`https://loyalty-backend-java.onrender.com/api/dashboard/customerCount/${shopId}`, {
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
//     { title: "ID", dataIndex: "userId", key: "id" },
//     { title: "First Name", dataIndex: "firstName", key: "firstName" },
//     { title: "Last Name", dataIndex: "lastName", key: "lastName" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Phone", dataIndex: "phone", key: "phone" },
//     { title: "Visits", dataIndex: "visitCount", key: "visits" },
//   ];

//   const topRevenueColumns = [
//     { title: "ID", dataIndex: "userId", key: "id" },
//     { title: "First Name", dataIndex: "firstName", key: "firstName" },
//     { title: "Last Name", dataIndex: "lastName", key: "lastName" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Phone", dataIndex: "phone", key: "phone" },
//     {
//       title: "Revenue",
//       dataIndex: "totalSpent",
//       key: "revenue",
//       render: (amount) => `$${amount}`,
//     },
//   ];

//   const currentYear = new Date().getFullYear();

//   const toggleSidebarExpansion = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };

//   return (
//     <div className="flex h-[calc(100vh-64px)] bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`fixed h-screen top-0 bg-gradient-to-b from-[#dbeafe] to-[#bfdbfe] text-slate-800 p-3 sm:p-4 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } ${isSidebarExpanded ? "w-56 sm:w-64" : "w-14 sm:w-16"} rounded-r-lg`}
//       >
//         <div className="flex justify-between items-center mb-4 sm:mb-6">
//           {isSidebarExpanded && (
//             <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 truncate pr-2">Shop Panel</h2>
//           )}
//           <div className="flex items-center">
//             {!sidebarOpen && (
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="p-1.5 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center absolute left-3 sm:left-4 top-3 sm:top-4"
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
//                   className="p-1.5 sm:p-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center"
//                   aria-label="Close sidebar"
//                 >
//                   <X className="w-5 h-5 sm:w-5 sm:h-5" />
//                 </button>
//                 <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                   Close
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//         <nav className="space-y-1.5 sm:space-y-2">
//           {[
//             { tab: "user_stats", icon: faChartBar, label: "Dashboard" },
//             { tab: "shopkeeper", icon: faUser, label: "Shopkeeper Profile" },
//             { tab: "shopkeeper_setting", icon: faCog, label: "Shop Settings" },
//             { tab: "interactions", icon: faUsers, label: "Interactions" },
//             { tab: "subscription", icon: faCreditCard, label: "Subscription" },
//             { tab: "employee_management", icon: faUserTie, label: "Employee Manage" },
//             { tab: "daily_transaction_report", icon: faFileInvoiceDollar, label: "Daily Transaction" },
//           ].map(({ tab, icon, label }) => (
//             <div key={tab} className="relative group">
//               <button
//                 key={tab}
//                 onClick={() => {
//                   setActiveTab(tab);
//                   setSidebarOpen(true);
//                   toggleSidebarExpansion();
//                 }}
//                 className={`flex items-center w-full text-left px-3 sm:px-4 py-2 rounded-full transition text-xs sm:text-sm md:text-base ${
//                   activeTab === tab
//                     ? "bg-blue-600 text-white font-semibold"
//                     : "hover:bg-blue-200 hover:text-blue-800"
//                 } ${isSidebarExpanded ? "justify-start" : "justify-center"}`}
//               >
//                 <FontAwesomeIcon icon={icon} className={`${isSidebarExpanded ? "mr-2 sm:mr-3" : ""} ${activeTab === tab ? "text-white" : "text-blue-600"} text-sm sm:text-base`} />
//                 {isSidebarExpanded && <span className="truncate">{label}</span>}
//               </button>
//               {!isSidebarExpanded && (
//                 <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
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
//         className={`flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 transition-all duration-300 ease-in-out ${
//           sidebarOpen && isSidebarExpanded ? "ml-56 sm:ml-64" : sidebarOpen ? "ml-14 sm:ml-16" : "ml-0"
//         }`}
//       >
//         {activeTab === "user_stats" && (
//           <>
//             {/* <div>
//               <h1 className="mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl font-bold flex items-center">
//                 Dashboard Data
//               </h1>
//             </div> */}
//             <UserPurchaseChart />

//             <section className="mb-4 sm:mb-6">
//               <div className="bg-white shadow-md rounded-sm p-3 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 gap-2">
//                   <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
//                     Monthly Sales (Last 12 Months) - {currentYear}
//                   </h3>
//                   <span className="text-xs sm:text-sm text-gray-500">Sales Overview</span>
//                 </div>

//                 <div className="h-[220px] sm:h-[280px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart
//                       data={monthlySalesData}
//                       margin={{ top: 30, right: 20, left: 0, bottom: 0 }}
//                     >
//                       <XAxis
//                         dataKey="month"
//                         tick={{ fill: "#6b7280", fontSize: 11 }}
//                       />
//                       <YAxis
//                         tickFormatter={(val) => `₹${val}`}
//                         tick={{ fill: "#6b7280", fontSize: 11 }}
//                       />
//                       <Tooltip
//                         formatter={(value) => [`₹${value}`, "Sales"]}
//                         contentStyle={{
//                           backgroundColor: "white",
//                           borderRadius: "10px",
//                           border: "1px solid #e5e7eb",
//                         }}
//                       />
//                       <Legend />
//                       <Line
//                         type="monotone"
//                         dataKey="sales"
//                         stroke="#EC4899"
//                         strokeWidth={2}
//                         dot={{ r: 4, fill: "#881337" }}
//                         activeDot={{ r: 6, fill: "#EC4899" }}
//                         name="Sales ₹"
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </section>

//             <section className="mb-4 sm:mb-6">
//               <div className="bg-white shadow-md rounded-sm p-3 sm:p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 gap-2">
//                   <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
//                     Customer Count Comparison ({currentYear})
//                   </h3>
//                   <span className="text-xs sm:text-sm text-gray-500">Yearly Overview</span>
//                 </div>

//                 <div className="h-[220px] sm:h-[280px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart
//                       data={customerComparisonData}
//                       margin={{ top: 30, right: 15, left: 0, bottom: 10 }}
//                     >
//                       <XAxis 
//                         dataKey="name" 
//                         tick={{ fill: "#6b7280", fontSize: 11 }} 
//                         angle={-45}
//                         textAnchor="end"
//                         height={60}
//                       />
//                       <YAxis 
//                         tick={{ fill: "#6b7280", fontSize: 11 }} 
//                         allowDecimals={false}
//                       />
//                       <Tooltip
//                         contentStyle={{
//                           backgroundColor: "white",
//                           borderRadius: "10px",
//                           border: "1px solid #e5e7eb",
//                           fontSize: "12px"
//                         }}
//                       />
//                       <Legend 
//                         wrapperStyle={{ fontSize: "11px" }} 
//                         verticalAlign="top" 
//                         height={36}
//                       />
//                       <Bar
//                         dataKey="customers"
//                         fill="#3B82F6"
//                         barSize={30}
//                         radius={[6, 6, 0, 0]}
//                       >
//                         <LabelList
//                           dataKey="growth"
//                           position="top"
//                           formatter={(val) =>
//                             `${val >= 0 ? "+" : ""}${val.toFixed(1)}%`
//                           }
//                           fill="#1E40AF"
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
//                 <Card 
//                   title="Most Visitors" 
//                   bordered={false} 
//                   headStyle={{ 
//                     background: "linear-gradient(to bottom right, #1e40af, #7c3aed)", 
//                     color: "#FFFFFF" 
//                   }}
//                 >
//                   <div className="overflow-x-auto">
//                     <Table 
//                       columns={mostVisitorsColumns} 
//                       dataSource={topVisitedUsers} 
//                       pagination={{ pageSize: 5 }} 
//                       rowKey="userId" 
//                       size="small" 
//                       scroll={{ x: 600 }} 
//                     />
//                   </div>
//                 </Card>
//               </Col>
//               <Col xs={24}>
//                 <Card 
//                   title="Top Revenue Generators" 
//                   bordered={false} 
//                   headStyle={{ 
//                     background: "linear-gradient(to bottom right, #7c3aed, #1e40af)", 
//                     color: "#FFFFFF" 
//                   }}
//                 >
//                   <div className="overflow-x-auto">
//                     <Table 
//                       columns={topRevenueColumns} 
//                       dataSource={topSpendingUsers} 
//                       pagination={false} 
//                       rowKey="userId" 
//                       size="small" 
//                       scroll={{ x: 600, y: 200 }} 
//                     />
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
//       </main>
//     </div>
//   );
// };

// export default Shopdashboard;













//translated
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
import ShopkeeperProfile from "../Shopkeeper_profile/Shopkeeper_profile";
import Shopkeeper_setting from "../Shopkeeper-setting/Shopkeeper_setting";
import CustomerLookup from "../Customer/CustomerLookup";
import SubscriptionDashboard from "../Subscription/SubscriptionDashboard";
import DailyTransactionReport from "../Customer/DailyTransaction";
import InviteEmployeePage from "../Employee/InviteEmployeePage";
import UserPurchaseChart from "../bar chart/UserPurchaseChart";
import { useSidebar } from "../../context/SidebarContext";
import { X, Menu } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faUser, faCog, faUsers, faCreditCard, faUserTie, faFileInvoiceDollar, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next"; // ← AÑADIDO

const Shopdashboard = () => {
  const { t } = useTranslation(); // ← AÑADIDO
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("user_stats");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const [totalUsers, setTotalUsers] = useState(0);
  const [topVisitedUsers, setTopVisitedUsers] = useState([]);
  const [topSpendingUsers, setTopSpendingUsers] = useState([]);
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [customerComparisonData, setCustomerComparisonData] = useState([]);

  useEffect(() => {
    const shopId = localStorage.getItem("id");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn || !shopId) {
      navigate("/signin");
      return;
    }

    const loadData = async () => {
      await Promise.all([
        fetchDashboardData(shopId),
        fetchMonthlySales(shopId),
        fetchCustomerComparison(shopId),
      ]);
    };

    loadData();
  }, [navigate]);

  const fetchDashboardData = async (shopId) => {
    try {
      const res = await fetch(`https://loyalty-backend-java.onrender.com/api/dashboard/dashboardChat/${shopId}`, {
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
      const res = await fetch(`https://loyalty-backend-java.onrender.com/api/dashboard/monthlySales/${shopId}`, {
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
      const res = await fetch(`https://loyalty-backend-java.onrender.com/api/dashboard/customerCount/${shopId}`, {
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

  const mostVisitorsColumns = [
    { title: t("shopdashboard.table.id"), dataIndex: "userId", key: "id" },
    { title: t("shopdashboard.table.firstName"), dataIndex: "firstName", key: "firstName" },
    { title: t("shopdashboard.table.lastName"), dataIndex: "lastName", key: "lastName" },
    { title: t("shopdashboard.table.email"), dataIndex: "email", key: "email" },
    { title: t("shopdashboard.table.phone"), dataIndex: "phone", key: "phone" },
    { title: t("shopdashboard.table.visits"), dataIndex: "visitCount", key: "visits" },
  ];

  const topRevenueColumns = [
    { title: t("shopdashboard.table.id"), dataIndex: "userId", key: "id" },
    { title: t("shopdashboard.table.firstName"), dataIndex: "firstName", key: "firstName" },
    { title: t("shopdashboard.table.lastName"), dataIndex: "lastName", key: "lastName" },
    { title: t("shopdashboard.table.email"), dataIndex: "email", key: "email" },
    { title: t("shopdashboard.table.phone"), dataIndex: "phone", key: "phone" },
    {
      title: t("shopdashboard.table.revenue"),
      dataIndex: "totalSpent",
      key: "revenue",
      render: (amount) => `$${amount}`,
    },
  ];

  const currentYear = new Date().getFullYear();

  const toggleSidebarExpansion = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed h-screen top-0 bg-gradient-to-b from-[#dbeafe] to-[#bfdbfe] text-slate-800 p-3 sm:p-4 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isSidebarExpanded ? "w-56 sm:w-64" : "w-14 sm:w-16"} rounded-r-lg`}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          {isSidebarExpanded && (
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 truncate pr-2">
              {t("shopdashboard.sidebar.title")}
            </h2>
          )}
          <div className="flex items-center">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center absolute left-3 sm:left-4 top-3 sm:top-4"
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
                  className="p-1.5 sm:p-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5 sm:w-5 sm:h-5" />
                </button>
                <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {t("shopdashboard.sidebar.close")}
                </span>
              </div>
            )}
          </div>
        </div>
        <nav className="space-y-1.5 sm:space-y-2">
          {[
            { tab: "user_stats", icon: faChartBar, label: t("shopdashboard.sidebar.dashboard") },
            { tab: "shopkeeper", icon: faUser, label: t("shopdashboard.sidebar.profile") },
            { tab: "shopkeeper_setting", icon: faCog, label: t("shopdashboard.sidebar.settings") },
            { tab: "interactions", icon: faUsers, label: t("shopdashboard.sidebar.interactions") },
            { tab: "subscription", icon: faCreditCard, label: t("shopdashboard.sidebar.subscription") },
            { tab: "employee_management", icon: faUserTie, label: t("shopdashboard.sidebar.employees") },
            { tab: "daily_transaction_report", icon: faFileInvoiceDollar, label: t("shopdashboard.sidebar.transactions") },
          ].map(({ tab, icon, label }) => (
            <div key={tab} className="relative group">
              <button
                onClick={() => {
                  setActiveTab(tab);
                  setSidebarOpen(true);
                  toggleSidebarExpansion();
                }}
                className={`flex items-center w-full text-left px-3 sm:px-4 py-2 rounded-full transition text-xs sm:text-sm md:text-base ${
                  activeTab === tab
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-blue-200 hover:text-blue-800"
                } ${isSidebarExpanded ? "justify-start" : "justify-center"}`}
              >
                <FontAwesomeIcon icon={icon} className={`${isSidebarExpanded ? "mr-2 sm:mr-3" : ""} ${activeTab === tab ? "text-white" : "text-blue-600"} text-sm sm:text-base`} />
                {isSidebarExpanded && <span className="truncate">{label}</span>}
              </button>
              {!isSidebarExpanded && (
                <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
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
            <span className={`${!isSidebarExpanded && "hidden"}`}>{t("shopdashboard.sidebar.help")}</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen && isSidebarExpanded ? "ml-56 sm:ml-64" : sidebarOpen ? "ml-14 sm:ml-16" : "ml-0"
        }`}
      >
        {activeTab === "user_stats" && (
          <>
            <UserPurchaseChart />

            <section className="mb-4 sm:mb-6">
              <div className="bg-white shadow-md rounded-sm p-3 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                    {t("shopdashboard.monthlySales.title")} ({currentYear})
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-500">{t("shopdashboard.monthlySales.subtitle")}</span>
                </div>

                <div className="h-[220px] sm:h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlySalesData}
                      margin={{ top: 30, right: 20, left: 0, bottom: 0 }}
                    >
                      <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} />
                      <YAxis tickFormatter={(val) => `₹${val}`} tick={{ fill: "#6b7280", fontSize: 11 }} />
                      <Tooltip formatter={(value) => [`₹${value}`, t("shopdashboard.monthlySales.sales")]} contentStyle={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid #e5e7eb" }} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#EC4899"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#881337" }}
                        activeDot={{ r: 6, fill: "#EC4899" }}
                        name={t("shopdashboard.monthlySales.sales")}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            <section className="mb-4 sm:mb-6">
              <div className="bg-white shadow-md rounded-sm p-3 sm:p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                    {t("shopdashboard.customerComparison.title")} ({currentYear})
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-500">{t("shopdashboard.customerComparison.subtitle")}</span>
                </div>

                <div className="h-[220px] sm:h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={customerComparisonData} margin={{ top: 30, right: 15, left: 0, bottom: 10 }}>
                      <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 11 }} angle={-45} textAnchor="end" height={60} />
                      <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
                      <Legend wrapperStyle={{ fontSize: "11px" }} verticalAlign="top" height={36} />
                      <Bar dataKey="customers" name={t("shopdashboard.customerComparison.customers")} fill="#3B82F6" barSize={30} radius={[6, 6, 0, 0]}>
                        <LabelList
                          dataKey="growth"
                          position="top"
                          formatter={(val) => `${val >= 0 ? "+" : ""}${val.toFixed(1)}%`}
                          fill="#1E40AF"
                          fontSize={10}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            <Row gutter={[12, 12]}>
              <Col xs={24}>
                <Card title={t("shopdashboard.cards.mostVisitors")} bordered={false} headStyle={{ background: "linear-gradient(to bottom right, #1e40af, #7c3aed)", color: "#FFFFFF" }}>
                  <div className="overflow-x-auto">
                    <Table columns={mostVisitorsColumns} dataSource={topVisitedUsers} pagination={{ pageSize: 5 }} rowKey="userId" size="small" scroll={{ x: 600 }} />
                  </div>
                </Card>
              </Col>
              <Col xs={24}>
                <Card title={t("shopdashboard.cards.topRevenue")} bordered={false} headStyle={{ background: "linear-gradient(to bottom right, #7c3aed, #1e40af)", color: "#FFFFFF" }}>
                  <div className="overflow-x-auto">
                    <Table columns={topRevenueColumns} dataSource={topSpendingUsers} pagination={false} rowKey="userId" size="small" scroll={{ x: 600, y: 200 }} />
                  </div>
                </Card>
              </Col>
            </Row>
          </>
        )}
        {activeTab === "shopkeeper" && <ShopkeeperProfile />}
        {activeTab === "shopkeeper_setting" && <Shopkeeper_setting />}
        {activeTab === "interactions" && <CustomerLookup />}
        {activeTab === "subscription" && <SubscriptionDashboard />}
        {activeTab === "employee_management" && <InviteEmployeePage />}
        {activeTab === "daily_transaction_report" && <DailyTransactionReport />}
      </main>
    </div>
  );
};

export default Shopdashboard;