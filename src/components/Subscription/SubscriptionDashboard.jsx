import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, DollarSign, RefreshCw, User, Package } from "lucide-react";

const SubscriptionDashboard = () => {
  const navigate = useNavigate();
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [isCanceling, setIsCanceling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "https://subscription-backend-e8gq.onrender.com";

  useEffect(() => {
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("CompanyEmail");

    if (role !== "SHOPKEEPER") {
      setError("Access denied. Please sign in as a shopkeeper.");
      setTimeout(() => navigate("/signin"), 2000);
      return;
    }

    if (name) {
      setUserName(name);
    }

    if (email) {
      const fetchSubscriptionDetails = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${API_URL}/api/subscription/details?email=${encodeURIComponent(email)}`, {
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
            throw new Error(await response.text());
          }
          const data = await response.json();
          setSubscriptionDetails(data);
          localStorage.setItem("subscriptionDetails", JSON.stringify(data));
        } catch (err) {
          setError("Failed to load subscription details.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchSubscriptionDetails();
    } else {
      setError("No email found. Please sign in again.");
      setTimeout(() => navigate("/signin"), 2000);
    }
  }, [navigate]);

  useEffect(() => {
    if (error && error !== "Access denied. Please sign in as a shopkeeper." && error !== "No email found. Please sign in again.") {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    if (price == null) return "N/A";
    return `$${price.toFixed(2)}`;
  };

  const formatApplications = (applications) => {
    if (!applications || applications.length === 0) return "None";
    return applications.join(", ");
  };

  const cancelSubscription = async () => {
    if (!subscriptionDetails?.stripeSubscriptionId) {
      setError("No subscription ID available.");
      return;
    }

    setIsCanceling(true);
    setError("");

    const fetchWithBackoff = async (url, options, retries = 3, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, options);
          if (response.status === 429) {
            const retryAfter = response.headers.get("Retry-After") || delay * Math.pow(2, i);
            await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
            continue;
          }
          if (!response.ok) {
            throw new Error(await response.text());
          }
          return response;
        } catch (err) {
          if (i === retries - 1) throw err;
          await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
        }
      }
    };

    try {
      const response = await fetchWithBackoff(
        `${API_URL}/api/subscription/cancel`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subscriptionId: subscriptionDetails.stripeSubscriptionId }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setSubscriptionDetails({
          ...subscriptionDetails,
          cancelAtPeriodEnd: true,
        });
        localStorage.setItem(
          "subscriptionDetails",
          JSON.stringify({ ...subscriptionDetails, cancelAtPeriodEnd: true })
        );
        setError("Subscription scheduled for cancellation.");
      } else {
        setError(data.message || "Failed to cancel subscription.");
      }
    } catch (err) {
      setError("Failed to cancel subscription. Please try again.");
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
        <div className="bg-purple-700 text-white p-4 rounded-t-lg">
          <h2 className="text-2xl font-bold">Subscription Details</h2>
        </div>
        <div className="p-8">
          {isLoading ? (
            <p className="text-center text-gray-600 text-lg">Loading...</p>
          ) : subscriptionDetails ? (
            <>
              <div className="mb-8 flex items-center space-x-2">
                <div className="text-gray-600 font-bold text-2xl">Status :</div>
                <div className="bg-green-200 text-green-800 px-4 py-1 shadow-sm">
                  {subscriptionDetails.status || "N/A"}
                </div>
              </div>
              {error && (
                <p className="text-red-600 text-sm mb-6 text-center bg-red-50 p-3 rounded-md">{error}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Plan</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {subscriptionDetails.planName} ({subscriptionDetails.interval})
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Price</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatPrice(subscriptionDetails.price)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <Package className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Applications</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatApplications(subscriptionDetails.applications)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Auto Renew</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {subscriptionDetails.autoRenew ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Start Date</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatDate(subscriptionDetails.startDate)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">End Date</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatDate(subscriptionDetails.endDate)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <User className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Customer ID</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {subscriptionDetails.stripeCustomerId || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <User className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Subscription ID</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {subscriptionDetails.stripeSubscriptionId || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                {subscriptionDetails.nextPlanName && (
                  <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Next Plan</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {subscriptionDetails.nextPlanName} ({subscriptionDetails.nextInterval})
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cancel at Period End</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {subscriptionDetails.cancelAtPeriodEnd ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  // onClick={() => navigate("/change-plan")}
                  className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition"
                >
                  Change Plan
                </button>
                <button
                  onClick={cancelSubscription}
                  disabled={isCanceling || subscriptionDetails?.cancelAtPeriodEnd}
                  className={`bg-red-500 text-white font-semibold py-2 px-4 rounded-md transition
                    ${isCanceling || subscriptionDetails?.cancelAtPeriodEnd ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}`}
                >
                  {isCanceling ? "Canceling..." : "Cancel Subscription"}
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-center text-lg">
              No subscription details available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDashboard;