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
import UserPurchaseChart from "../bar chart/UserPurchaseChart";
import { useSidebar } from "../../context/SidebarContext";
import { X, Menu } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faUser, faCog, faUsers, faCreditCard } from "@fortawesome/free-solid-svg-icons";

const Shopdashboard = () => {
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
      navigate("/signin");
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
    { title: "ID", dataIndex: "userId", key: "id" },
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Visits", dataIndex: "visitCount", key: "visits" },
  ];

  const topRevenueColumns = [
    { title: "ID", dataIndex: "userId", key: "id" },
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Revenue",
      dataIndex: "totalSpent",
      key: "revenue",
      render: (amount) => `₹${amount}`,
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
        className={`fixed h-screen top-0 bg-gradient-to-b from-[#4F46E5] to-[#7C3AED] text-white p-4 sm:p-4 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isSidebarExpanded ? "w-64" : "w-16"} rounded-r-xl`}
      >
        <div className="flex justify-between items-center mb-6">
          {isSidebarExpanded && (
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-300">Shopkeeper Panel</h2>
          )}
          <div className="flex items-center">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 transition flex items-center justify-center absolute left-4 top-4"
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
                  className="p-1 rounded-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 transition flex items-center justify-center"
                  aria-label="Close sidebar"
                >
                  <X className="w-6 h-6" />
                </button>
                <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-purple-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Close
                </span>
              </div>
            )}
          </div>
        </div>
        <nav className="space-y-2">
          {[
            { tab: "user_stats", icon: faChartBar, label: "Dashboard" },
            { tab: "shopkeeper", icon: faUser, label: "Shopkeeper Profile" },
            { tab: "shopkeeper_setting", icon: faCog, label: "Shop Settings" },
            { tab: "interactions", icon: faUsers, label: "Interactions" },
            { tab: "subscription", icon: faCreditCard, label: "Subscription" },
          ].map(({ tab, icon, label }) => (
            <div key={tab} className="relative group">
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSidebarOpen(true);
                toggleSidebarExpansion();
              }}
              className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition text-sm sm:text-base ${
                activeTab === tab
                  ? "bg-yellow-300 text-purple-900 font-semibold"
                  : "hover:bg-yellow-200 hover:text-purple-900"
              } ${isSidebarExpanded ? "" : "justify-center"}`}
            >
              <FontAwesomeIcon icon={icon} className={`${isSidebarExpanded ? "mr-2" : ""}`} />
              {isSidebarExpanded && <span>{label}</span>}
            </button>
            {!isSidebarExpanded && (
                <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-purple-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
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
      {/* {activeTab === "user_stats" && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-center text-sm">
          Not a subscriber yet?{" "}
          <a
            href="https://subscription-frontend-psi.vercel.app/subscription"
            className="text-purple-800 font-semibold underline hover:text-purple-900"
          >
            Click here to subscribe
          </a>
        </div>
      )} */}

        {activeTab === "user_stats" && (
          <>
            <div>
              <h1 className="mb-6 text-xl sm:text-2xl font-bold text-purple-800 flex items-center">
                Shopkeeper Dashboard
              </h1>
            </div>
            <UserPurchaseChart />
            <section className="mb-6">
              <h3 className="text-2x font-semibold text-purple-800 mb-4">
                Monthly Sales (Last 12 Months) - {currentYear}
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={monthlySalesData} margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tickFormatter={(val) => `₹${val}`} tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`₹${value}`, "Sales"]} />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#FACC15" strokeWidth={2} dot={{ r: 4, fill: "#7C3AED" }} activeDot={{ r: 6, fill: "#FACC15" }} name="Sales ₹" />
                </LineChart>
              </ResponsiveContainer>
            </section>

            <section className="mb-6">
              <h3 className="text-2x font-semibold text-purple-800 mb-4">
                Customer Count Comparison ({currentYear})
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerComparisonData} margin={{ top: 40, right: 30, left: 0, bottom: 10 }}>
                  <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
                  <YAxis tick={{ fill: "#6b7280" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="customers" fill="#7C3AED" barSize={40} radius={[10, 10, 0, 0]}>
                    <LabelList dataKey="growth" position="top" formatter={(val) => `${val >= 0 ? "+" : ""}${val.toFixed(1)}%`} fill="#FACC15" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </section>

            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="👥 Most Visitors" bordered={false} headStyle={{ backgroundColor: "#FACC15", color: "#4F46E5" }}>
                  <Table columns={mostVisitorsColumns} dataSource={topVisitedUsers} pagination={{ pageSize: 5 }} rowKey="userId" size="small" scroll={{ x: "max-content" }} />
                </Card>
              </Col>
              <Col span={24}>
                <Card title="💰 Top Revenue Generators" bordered={false} headStyle={{ backgroundColor: "#FACC15", color: "#4F46E5" }}>
                  <Table columns={topRevenueColumns} dataSource={topSpendingUsers} pagination={false} rowKey="userId" size="small" scroll={{ y: 250 }} />
                </Card>
              </Col>
            </Row>
          </>
        )}
        {activeTab === "shopkeeper" && <ShopkeeperProfile />}
        {activeTab === "shopkeeper_setting" && <Shopkeeper_setting />}
        {activeTab === "interactions" && <CustomerLookup />}
        {activeTab === "subscription" && <SubscriptionDashboard />}
      </main>
    </div>
  );
};

export default Shopdashboard;
