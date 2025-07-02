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
import UserPurchaseChart from "../bar chart/UserPurchaseChart";
import { useSidebar } from "../../context/SidebarContext";
import { X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faUser, faCog, faUsers } from "@fortawesome/free-solid-svg-icons";

const Shopdashboard = () => {
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("user_stats");

  const [totalUsers, setTotalUsers] = useState(0);
  const [topVisitedUsers, setTopVisitedUsers] = useState([]);
  const [topSpendingUsers, setTopSpendingUsers] = useState([]);
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [customerComparisonData, setCustomerComparisonData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const shopId = localStorage.getItem("id");

    if (!token || !shopId) {
      navigate("/signin");
    } else {
      fetchDashboardData(token, shopId);
      fetchMonthlySales(token, shopId);
      fetchCustomerComparison(token, shopId);
    }
  }, [navigate]);

  const fetchDashboardData = async (token, shopId) => {
    try {
      const res = await fetch(`https://loyalty-backend-java.onrender.com/api/dashboard/dashboardChat/${shopId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTotalUsers(data.totalUsers || 0);
      setTopVisitedUsers(data.topVisitedUsers || []);
      setTopSpendingUsers(data.topSpendingUsers || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchMonthlySales = async (token, shopId) => {
    try {
      const res = await fetch(`https://loyalty-backend-java.onrender.com/api/dashboard/monthlySales/${shopId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  const fetchCustomerComparison = async (token, shopId) => {
    try {
      const res = await fetch(`https://loyalty-backend-java.onrender.com/api/dashboard/customerCount/${shopId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      {/* Toggleable Sidebar */}
      {sidebarOpen && (
        <aside className="absolute h-[calc(100vh-64px)] left-0 w-64 bg-purple-600 text-white p-6 shadow-lg z-40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Shopkeeper Panel</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded hover:bg-purple-700 hover:text-white transition flex items-center justify-center"
            >
              <X className="w-5 h-5 align-middle" />
            </button>
          </div>

          <nav className="space-y-2">
            <button onClick={() => { setActiveTab("user_stats"); setSidebarOpen(false); }}
              className={`block w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "user_stats" ? "bg-purple-100 text-purple-800 font-semibold" : "hover:bg-purple-500"}`}>
              <FontAwesomeIcon icon={faChartBar} className="mr-2" /> Dashboard
            </button>
            <button onClick={() => { setActiveTab("shopkeeper"); setSidebarOpen(false); }}
              className={`block w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "shopkeeper" ? "bg-purple-100 text-purple-800 font-semibold" : "hover:bg-purple-500"}`}>
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Shopkeeper Profile
            </button>
            <button onClick={() => { setActiveTab("shopkeeper_setting"); setSidebarOpen(false); }}
              className={`block w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "shopkeeper_setting" ? "bg-purple-100 text-purple-800 font-semibold" : "hover:bg-purple-500"}`}>
              <FontAwesomeIcon icon={faCog} className="mr-2" /> Shop Settings
            </button>
            <button onClick={() => { setActiveTab("interactions"); setSidebarOpen(false); }}
              className={`block w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "interactions" ? "bg-purple-100 text-purple-800 font-semibold" : "hover:bg-purple-500"}`}>
              <FontAwesomeIcon icon={faUsers} className="mr-2" /> Interactions
            </button>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === "user_stats" && (
          <>
          <div >
            <h1 className="mb-6 text-2xl font-bold text-gray-800 flex items-center">Shopkeeper Dashboard</h1>
          </div>
            <UserPurchaseChart />
            <section className="mb-6">
              <h3 className="text-2x font-semibold text-gray-800 mb-4">
                Monthly Sales (Last 12 Months) - ({currentYear})
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={monthlySalesData} margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tickFormatter={(val) => `₹${val}`} tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`₹${value}`, "Sales"]} />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Sales ₹" />
                </LineChart>
              </ResponsiveContainer>
            </section>

            <section className="mb-6">
              <h3 className="text-2x font-semibold text-gray-800 mb-4">Customer Count Comparison ({currentYear})</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerComparisonData} margin={{ top: 40, right: 30, left: 0, bottom: 10 }}>
                  <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
                  <YAxis tick={{ fill: "#6b7280" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="customers" fill="#0284c7" barSize={40} radius={[10, 10, 0, 0]}>
                    <LabelList dataKey="growth" position="top" formatter={(val) => `${val >= 0 ? "+" : ""}${val.toFixed(1)}%`} fill="#0284c7" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </section>

            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="👥 Most Visitors" bordered={false}>
                  <Table columns={mostVisitorsColumns} dataSource={topVisitedUsers} pagination={{ pageSize: 5 }} rowKey="userId" size="small" scroll={{ x: "max-content" }} />
                </Card>
              </Col>
              <Col span={24}>
                <Card title="💰 Top Revenue Generators" bordered={false}>
                  <Table columns={topRevenueColumns} dataSource={topSpendingUsers} pagination={false} rowKey="userId" size="small" scroll={{ y: 250 }} />
                </Card>
              </Col>
            </Row>
          </>
        )}
        {activeTab === "shopkeeper" && <ShopkeeperProfile />}
        {activeTab === "shopkeeper_setting" && <Shopkeeper_setting />}
        {activeTab === "interactions" && <CustomerLookup />}
      </main>
    </div>
  );
};

export default Shopdashboard;