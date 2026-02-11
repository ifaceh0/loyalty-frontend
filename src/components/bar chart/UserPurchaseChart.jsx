// import React, { useState, useEffect } from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const UserPurchaseChart = () => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const fetchChartData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const shopId = localStorage.getItem("id");

//         const response = await fetch(
//           `https://loyalty-backend-java.onrender.com/api/dashboard/monthly?shopId=${shopId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) throw new Error("Failed to fetch data");

//         const data = await response.json();
//         setChartData(data);
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     };

//     fetchChartData();
//   }, []);

//   return (
//     <section className="mb-4 sm:mb-6">
//       <div className="bg-white shadow-md rounded-sm p-3 sm:p-3 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 gap-2">
//           <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
//             Monthly Registered vs Purchase Users
//           </h3>
//           <span className="text-xs sm:text-sm text-gray-500">User Engagement</span>
//         </div>

//         <div className="h-[220px] sm:h-[280px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={chartData}
//               margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
//             >
//               <XAxis
//                 dataKey="month"
//                 tick={{ fill: "#6b7280", fontSize: 11 }}
//               />
//               <YAxis
//                 allowDecimals={false}
//                 tick={{ fill: "#6b7280", fontSize: 11 }}
//               />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "white",
//                   borderRadius: "10px",
//                   border: "1px solid #e5e7eb",
//                   fontSize: "12px"
//                 }}
//               />
//               <Legend wrapperStyle={{ fontSize: "11px" }} />
//               <Bar
//                 dataKey="registeredUsers"
//                 fill="#2563eb"
//                 name="Registered Users"
//                 radius={[6, 6, 0, 0]}
//                 barSize={30}
//               />
//               <Bar
//                 dataKey="visitedUsers"
//                 fill="#f97316"
//                 name="Purchase Users"
//                 radius={[6, 6, 0, 0]}
//                 barSize={30}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UserPurchaseChart;










//translated version
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next"; 
import { API_BASE_URL } from '../../apiConfig';

const UserPurchaseChart = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const shopId = localStorage.getItem("id");

        const response = await fetch(
          `${API_BASE_URL}/api/dashboard/monthly?shopId=${shopId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        const currentMonth = new Date().toLocaleString("default", {
          month: "long",
        });

        const currentIndex = data.findIndex(
          (item) => item.month === currentMonth
        );

        const rotatedData = [
          ...data.slice(currentIndex + 1),
          ...data.slice(0, currentIndex + 1),
        ];

        setChartData(rotatedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <section className="mb-4 sm:mb-6">
      <div className="bg-white shadow-md rounded-xl p-3 sm:p-3 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 gap-2">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            {t("userPurchaseChart.title")}
          </h3>
          <span className="text-xs sm:text-sm text-gray-500">
            {t("userPurchaseChart.subtitle")}
          </span>
        </div>

        <div className="h-[260px] sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="month"
                tick={{ fill: "#6b7280", fontSize: 11 }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#6b7280", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px"
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar
                dataKey="registeredUsers"
                fill="#2563eb"
                name={t("userPurchaseChart.registeredUsers")}
                radius={[6, 6, 0, 0]}
                barSize={30}
              />
              <Bar
                dataKey="visitedUsers"
                fill="#f97316"
                name={t("userPurchaseChart.purchaseUsers")}
                radius={[6, 6, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default UserPurchaseChart;