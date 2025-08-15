import { useNavigate } from "react-router-dom";
import { Star, Package, RefreshCw } from "lucide-react";

const SubscriptionDashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Star className="h-10 w-10 text-yellow-500" />,
      title: "Exclusive Access",
      description: "Unlock premium tools and features with your subscription.",
    },
    {
      icon: <Package className="h-10 w-10 text-purple-600" />,
      title: "Multiple Applications",
      description: "Manage multiple applications seamlessly.",
    },
    {
      icon: <RefreshCw className="h-10 w-10 text-green-500" />,
      title: "Auto Updates",
      description: "Stay up-to-date with automatic renewals and updates.",
    },
  ];

  // Retrieve company email from local storage
  const companyEmail = localStorage.getItem("CompanyEmail") || "";

  // Construct the subscription URL with the company email as a query parameter
  const subscriptionUrl = `https://subscription-frontend-psi.vercel.app/subscription-dashboard?email=${encodeURIComponent(companyEmail)}`;
  console.log(subscriptionUrl);
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl text-center">
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Your Subscription Hub
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore the power of your subscription and unlock exclusive features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <a
            href={subscriptionUrl}
            className="bg-indigo-600 text-white font-semibold text-lg py-4 px-10 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg"
        >Access My Subscription</a>
      </div>
    </div>
  );
};

export default SubscriptionDashboard;