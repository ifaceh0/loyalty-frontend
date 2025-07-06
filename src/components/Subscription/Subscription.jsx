import { useState } from 'react';
import SubscriptionCard from './SubscriptionCard';
import { User, Briefcase, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedTypes, setSelectedTypes] = useState(['loyalty']); // default

  const handleCheckboxChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const pricingData = {
    loyalty: {
      Basic: { monthly: 9.99, quarterly: 26.99, yearly: 89.99 },
      Pro: { monthly: 19.99, quarterly: 54.99, yearly: 184.99 },
      Enterprise: { monthly: 49.99, quarterly: 139.99, yearly: 429.99 },
    },
    referral: {
      Basic: { monthly: 5.99, quarterly: 15.99, yearly: 55.99 },
      Pro: { monthly: 14.99, quarterly: 39.99, yearly: 144.99 },
      Enterprise: { monthly: 39.99, quarterly: 104.99, yearly: 379.99 },
    },
  };

  const mergedPricing = {
    Basic: { monthly: 0, quarterly: 0, yearly: 0 },
    Pro: { monthly: 0, quarterly: 0, yearly: 0 },
    Enterprise: { monthly: 0, quarterly: 0, yearly: 0 },
  };

  selectedTypes.forEach((type) => {
    ['Basic', 'Pro', 'Enterprise'].forEach((tier) => {
      mergedPricing[tier].monthly += pricingData[type][tier].monthly;
      mergedPricing[tier].quarterly += pricingData[type][tier].quarterly;
      mergedPricing[tier].yearly += pricingData[type][tier].yearly;
    });
  });

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  const plans = ['Basic', 'Pro', 'Enterprise'].map((tier) => ({
    title: tier,
    price: {
      monthly: `${formatPrice(mergedPricing[tier].monthly)} /month`,
      quarterly: `${formatPrice(mergedPricing[tier].quarterly)} /quarter`,
      yearly: `${formatPrice(mergedPricing[tier].yearly)} /year`,
    },
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
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 to-white px-6 py-8">
      <h1 className="text-5xl font-extrabold text-purple-700 mb-6 text-center">
        Choose Your Subscription Plan
      </h1>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white rounded-full p-1 shadow-md scale-110">
          {['monthly', 'quarterly', 'yearly'].map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={`relative px-5 py-2 rounded-full font-semibold transition-all duration-200 ${
                billingCycle === cycle ? 'bg-purple-600 text-white' : 'text-purple-700'
              }`}
            >
              {cycle === 'quarterly' && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                  20% OFF
                </span>
              )}
              {cycle === 'yearly' && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                  30% OFF
                </span>
              )}
              {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Layout: Sidebar + Cards */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left Sidebar (Checkboxes) */}
        <div className="flex lg:flex-col justify-center items-start gap-4 w-full lg:w-[20%]">
          {['loyalty', 'referral'].map((type) => (
            <label
              key={type}
              className="inline-flex items-center gap-3 text-purple-800 text-lg font-medium cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleCheckboxChange(type)}
                className="accent-purple-600 w-5 h-5"
              />
              {type === 'loyalty' ? 'Loyalty' : 'Referral'}
            </label>
          ))}
        </div>

        {/* Right Side Cards */}
        <div className="flex-1">
          {selectedTypes.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTypes.join('-') + billingCycle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap justify-center gap-8 px-2"
              >
                {plans.map((plan, index) => (
                  <div key={index} className="w-full sm:w-[48%] lg:w-[32%] xl:w-[30%] flex">
                    <SubscriptionCard
                      title={plan.title}
                      price={plan.price}
                      features={plan.features}
                      buttonText={plan.buttonText}
                      color={plan.color}
                      billingCycle={billingCycle}
                      icon={plan.icon}
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
                  Please select at least one plan type to view pricing.
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
