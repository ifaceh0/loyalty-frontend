import { useState } from 'react';
import SubscriptionCard from './SubscriptionCard';
import { User, Briefcase, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [planType, setPlanType] = useState('loyalty');

  const pricingData = {
    loyalty: {
      Basic: {
        monthly: '$9.99 /month',
        quarterly: '$26.99 /quarter',
        yearly: '$89.99 /year',
      },
      Pro: {
        monthly: '$19.99 /month',
        quarterly: '$54.99 /quarter',
        yearly: '$184.99 /year',
      },
      Enterprise: {
        monthly: '$49.99 /month',
        quarterly: '$139.99 /quarter',
        yearly: '$429.99 /year',
      },
    },
    referral: {
      Basic: {
        monthly: '$5.99 /month',
        quarterly: '$15.99 /quarter',
        yearly: '$55.99 /year',
      },
      Pro: {
        monthly: '$14.99 /month',
        quarterly: '$39.99 /quarter',
        yearly: '$144.99 /year',
      },
      Enterprise: {
        monthly: '$39.99 /month',
        quarterly: '$104.99 /quarter',
        yearly: '$379.99 /year',
      },
    },
    both: {
      Basic: {
        monthly: '$13.99 /month',
        quarterly: '$36.99 /quarter',
        yearly: '$119.99 /year',
      },
      Pro: {
        monthly: '$24.99 /month',
        quarterly: '$69.99 /quarter',
        yearly: '$239.99 /year',
      },
      Enterprise: {
        monthly: '$59.99 /month',
        quarterly: '$159.99 /quarter',
        yearly: '$499.99 /year',
      },
    },
  };

  const plans = [
    {
      title: 'Basic',
      description: 'Perfect for individuals and small teams',
      price: pricingData[planType].Basic,
      features: ['Up to 5 users', '5GB storage', 'Basic support', 'Access to core features'],
      buttonText: 'Select Basic Plan',
      color: 'bg-purple-500',
      icon: User,
    },
    {
      title: 'Pro',
      description: 'Ideal for growing businesses',
      price: pricingData[planType].Pro,
      features: ['Up to 20 users', '50GB storage', 'Priority support', 'Advanced analytics', 'Custom integrations'],
      buttonText: 'Select Pro Plan',
      color: 'bg-gradient-to-r from-orange-400 to-yellow-400',
      icon: Briefcase,
    },
    {
      title: 'Enterprise',
      description: 'For large organizations with complex needs',
      price: pricingData[planType].Enterprise,
      features: [
        'Unlimited users',
        'Unlimited storage',
        '24/7 dedicated support',
        'Advanced security features',
        'Custom development',
        'On-premise deployment option',
      ],
      buttonText: 'Contact Sales',
      color: 'bg-blue-600',
      icon: Building2,
    },
  ];

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
        {/* Left Sidebar */}
        <div className="flex lg:flex-col justify-center items-center gap-4 w-full lg:w-[20%]">
          {['loyalty', 'referral', 'both'].map((type) => (
            <button
              key={type}
              onClick={() => setPlanType(type)}
              className={`w-full px-5 py-3 text-lg rounded-full font-semibold transition-all duration-200 text-center ${
                planType === type
                  ? 'bg-purple-700 text-white'
                  : 'bg-white text-purple-700 border border-purple-300'
              }`}
            >
              {type === 'loyalty' ? 'Loyalty' : type === 'referral' ? 'Referral' : 'Loyalty + Referral'}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={planType + billingCycle}
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
        </div>
      </div>
    </div>
  );
};

export default Subscription;
