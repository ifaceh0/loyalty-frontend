import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // CHANGED: Added for modal animations

const PlanChangeCard = ({ title, price, features, buttonText, color, icon: Icon, billingCycle, currentAppType, discountPercent, planIds }) => {
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState('');
  const [isChangingPlan, setIsChangingPlan] = useState(false);

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

  const changePlan = async () => {
    const email = localStorage.getItem("CompanyEmail");
    const newPlanId = planIds[billingCycle];
    if (!email) {
      setError("No email found. Please sign in again.");
      return;
    }
    if (!newPlanId) {
      setError("Please select a valid plan.");
      return;
    }

    setIsChangingPlan(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://subscription-backend-e8gq.onrender.com";
      const response = await fetchWithBackoff(
        `${API_URL}/api/subscription/change-plan`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPlanId }),
        }
      );
      const data = await response.json();
      if (data.message) {
        try {
          const detailsResponse = await fetch(`${API_URL}/api/subscription/details?email=${encodeURIComponent(email)}`, {
            headers: { "Content-Type": "application/json" },
          });
          if (detailsResponse.ok) {
            const updatedData = await detailsResponse.json();
            const subscriptionData = updatedData.subscription || updatedData;
            localStorage.setItem("subscriptionDetails", JSON.stringify(subscriptionData));
            setShowConfirmationModal(true);
          } else {
            throw new Error(await detailsResponse.text());
          }
        } catch (err) {
          console.error("Failed to refresh subscription details:", err);
          setError(`Failed to refresh subscription details: ${err.message}`);
        }
      } else {
        setError(data.error || "Failed to change plan.");
      }
    } catch (err) {
      setError(`Failed to change plan: ${err.message}`);
    } finally {
      setIsChangingPlan(false);
    }
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    navigate("/shopkeeper/dashboard", { state: { successMessage: "Plan changed successfully!" } });
  };

  const closeErrorModal = () => {
    setError('');
  };

  const calculateOriginalPrice = (discountedPrice, discountPercent) => {
    if (!discountedPrice || discountPercent === 0) return discountedPrice || 0;
    return (discountedPrice / (1 - discountPercent / 100)).toFixed(2);
  };

  return (
    <>
      {/* CHANGED: Moved modals outside the card's DOM hierarchy */}
      <AnimatePresence>
        {showConfirmationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
              tabIndex={-1} // CHANGED: Added for accessibility
              onKeyDown={(e) => e.key === 'Enter' && closeConfirmationModal()}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Plan Changed Successfully</h3>
              <p className="text-gray-600 mb-4">
                Your subscription has been updated to the <span className="font-semibold">{title} Plan</span> ({billingCycle}).
                You will receive a confirmation email soon.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={closeConfirmationModal}
                  className="bg-purple-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-800 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
              tabIndex={-1} // CHANGED: Added for accessibility
              onKeyDown={(e) => e.key === 'Enter' && closeErrorModal()}
            >
              <h3 className="text-xl font-semibold text-red-600 mb-4">Error</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <div className="flex justify-end">
                <button
                  onClick={closeErrorModal}
                  className="bg-purple-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-800 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Content */}
      <div className={`relative rounded-2xl overflow-hidden shadow-lg w-full max-w-sm bg-white flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-xl ${title === 'Pro' ? 'ring-4 ring-yellow-300' : ''}`}>
        {/* Popular Badge */}
        {title === 'Pro' && (
          <div className="absolute top-2 right-2 bg-yellow-300 text-yellow-900 px-2 py-1 text-xs font-semibold rounded">
            Most Popular
          </div>
        )}

        {/* Header */}
        <div className={`px-6 py-4 flex justify-center text-center ${color}`}>
          <div>
            {Icon && (
              <div className="mb-2 flex justify-center">
                <Icon className="h-8 w-8 text-white" />
              </div>
            )}
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-white text-sm">
              {title === 'Basic'
                ? 'Perfect for individuals and small teams'
                : title === 'Pro'
                ? 'Ideal for growing businesses'
                : 'For large organizations with complex needs'}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="px-6 py-4 text-left">
          {discountPercent[billingCycle] > 0 && (
            <p className="text-sm text-green-600 font-medium mb-1">
              Save {discountPercent[billingCycle]}% compared to monthly
            </p>
          )}
          <div className="space-y-1">
            {discountPercent[billingCycle] > 0 && (
              <div className="text-sm text-gray-400 line-through">
                Original: ${calculateOriginalPrice(
                  parseFloat(price[billingCycle]?.replace(/[^0-9.]/g, '') || 0),
                  discountPercent[billingCycle]
                )}
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">
                {price[billingCycle]?.split(' ')[0] || '$0.00'}
              </span>
              <span className="text-gray-500 text-base font-medium">
                {price[billingCycle]?.split(' ')[1] || '/month'}
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <ul className="px-6 pb-4 space-y-2 text-left">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center text-gray-700">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              {feat}
            </li>
          ))}
        </ul>

        {/* Select Plan Button */}
        <div className="px-6 pb-6">
          <button
            onClick={changePlan}
            disabled={isChangingPlan}
            className={`w-full py-2 rounded-lg font-semibold text-white transition-all duration-200 ${
              isChangingPlan
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:brightness-110 hover:-translate-y-1'
            } ${
              title === 'Basic'
                ? 'bg-purple-600 hover:bg-purple-700'
                : title === 'Pro'
                ? 'bg-orange-500 hover:bg-orange-600'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isChangingPlan ? 'Changing Plan...' : buttonText || 'Select Plan'}
          </button>
        </div>
      </div>
    </>
  );
};

export default PlanChangeCard;