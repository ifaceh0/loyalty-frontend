import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlanChangeCard from './PlanchangeCard';
import { Loader2, AlertCircle, User, Briefcase, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PlanChange = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { availablePlans = [] } = location.state || {}; // CHANGED: Receive availablePlans from SubscriptionDashboard
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "https://subscription-backend-e8gq.onrender.com";
  // CHANGED: Get current application type from localStorage
//   const currentAppType = localStorage.getItem('appType')?.toLowerCase() || '';
const currentAppType = 'loyalty';


  // CHANGED: Fetch plans from backend if not provided via location.state
  useEffect(() => {
    const fetchPlans = async () => {
      if (availablePlans.length > 0) {
        setPricingData(availablePlans);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/subscription/plans`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data = await response.json();
        console.log('Backend Response:', data);
        setPricingData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPlans();
  }, [availablePlans]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-8 max-w-md w-full text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
            <span className="text-xl font-semibold text-gray-800">Loading Plans...</span>
          </div>
          <p className="text-gray-600">Please wait while we fetch the subscription details.</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-8 max-w-md w-full text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <p className="text-xl font-semibold text-red-600">Error</p>
          </div>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  // CHANGED: Filter plans based on current application type
  const mergedPricing = {
    Basic: { monthly: 0, quarterly: 0, yearly: 0, discount: { monthly: 0, quarterly: 0, yearly: 0 }, planIds: { monthly: null, quarterly: null, yearly: null } },
    Pro: { monthly: 0, quarterly: 0, yearly: 0, discount: { monthly: 0, quarterly: 0, yearly: 0 }, planIds: { monthly: null, quarterly: null, yearly: null } },
    Enterprise: { monthly: 0, quarterly: 0, yearly: 0, discount: { monthly: 0, quarterly: 0, yearly: 0 }, planIds: { monthly: null, quarterly: null, yearly: null } },
  };

  ['Basic', 'Pro', 'Enterprise'].forEach((tier) => {
    pricingData.forEach((plan) => {
      const applicationNamesLower = plan.applicationNames.map((name) => name.toLowerCase());
      // CHANGED: Match plans with the current application type
      if (
        plan.planName.toLowerCase() === tier.toLowerCase() &&
        applicationNamesLower.includes(currentAppType) &&
        applicationNamesLower.length === 1
      ) {
        const interval = plan.interval.toLowerCase();
        mergedPricing[tier][interval] = plan.discountedPrice || 0;
        mergedPricing[tier].discount[interval] = plan.discountPercent || 0;
        mergedPricing[tier].planIds[interval] = plan.planId;
      }
    });
  });

  console.log('Merged Pricing:', mergedPricing);

  const formatPrice = (price, interval) => {
    if (interval === 'monthly') {
      return `$${parseFloat(price || 0).toFixed(2)} /month`;
    } else if (interval === 'quarterly') {
      return `$${parseFloat(price || 0).toFixed(2)} /quarter`;
    } else {
      return `$${parseFloat(price || 0).toFixed(2)} /year`;
    }
  };

  // CHANGED: Include plans with non-zero prices
  const plans = ['Basic', 'Pro', 'Enterprise']
    .map((tier) => ({
      title: tier,
      price: {
        monthly: formatPrice(mergedPricing[tier].monthly, 'monthly'),
        quarterly: formatPrice(mergedPricing[tier].quarterly, 'quarterly'),
        yearly: formatPrice(mergedPricing[tier].yearly, 'yearly'),
      },
      discountPercent: mergedPricing[tier].discount,
      planIds: mergedPricing[tier].planIds,
      features:
        tier === 'Basic'
          ? ['Up to 5 users', '5GB storage', 'Basic support', 'Access to core features']
          : tier === 'Pro'
          ? ['Up to 20 users', '50GB storage', 'Priority support', 'Advanced analytics', 'Custom integrations']
          : [
              'Unlimited users',
              'Unlimited storage',
              '24/7 dedicated support',
              'Advanced security features',
              'Custom development',
              'On-premise deployment option',
            ],
      buttonText: `Select ${tier} Plan`,
      color:
        tier === 'Basic'
          ? 'bg-purple-500'
          : tier === 'Pro'
          ? 'bg-gradient-to-r from-orange-400 to-yellow-400'
          : 'bg-blue-600',
      icon: tier === 'Basic' ? User : tier === 'Pro' ? Briefcase : Building2,
    }))
    .filter((plan) =>
      Object.values(mergedPricing[plan.title]).some(
        (value) => typeof value === 'number' && value > 0
      )
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 to-white px-6 py-8">
      <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
        Choose Subscription Plan You Want To Change
      </h1>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white rounded-full p-1 shadow-md">
          {['monthly', 'quarterly', 'yearly'].map((cycle) => (
            <div key={cycle} className="relative mx-1">
              <button
                onClick={() => setBillingCycle(cycle)}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 w-[100px] text-center ${
                  billingCycle === cycle
                    ? 'bg-purple-600 text-white'
                    : 'text-purple-700 bg-transparent'
                }`}
              >
                {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto">
        {plans.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={billingCycle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-8 px-2"
            >
              {plans.map((plan, index) => (
                <div key={index} className="w-full sm:w-[48%] lg:w-[32%] xl:w-[30%] flex">
                  <PlanChangeCard
                    title={plan.title}
                    price={plan.price}
                    discountPercent={plan.discountPercent}
                    planIds={plan.planIds}
                    features={plan.features}
                    buttonText={plan.buttonText}
                    color={plan.color}
                    billingCycle={billingCycle}
                    icon={plan.icon}
                    // CHANGED: Pass currentAppType instead of selectedTypes
                    currentAppType={currentAppType}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="no-plan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center items-center h-full min-h-[200px] text-center"
            >
              <p className="text-purple-600 font-medium text-lg">
                No plans available for the current application.
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default PlanChange;