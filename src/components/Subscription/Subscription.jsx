import { useState } from 'react';
import SubscriptionCard from './SubscriptionCard';
import { User, Briefcase, Building2 } from 'lucide-react';

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');// Default to monthly billing cycle

  const plans = [
    {
      // Basic
      title: 'Basic',
      description: 'Perfect for individuals and small teams',
      price: {
        monthly: '$9.99 /month',
        quarterly: '$23.99 /quarter',
        yearly: '$83.99 /year',
      },
      features: ['Up to 5 users', '5GB storage', 'Basic support', 'Access to core features'],
      buttonText: 'Select Basic Plan',
      color: 'bg-purple-500',
      icon: User,
    },
    {
      // Pro
      title: 'Pro',
      description: 'Ideal for growing businesses',
      price: {
        monthly: '$19.99 /month',
        quarterly: '$53.99 /quarter',
        yearly: '$179.99 /year',
      },
      features: ['Up to 20 users', '50GB storage', 'Priority support', 'Advanced analytics', 'Custom integrations'],
      buttonText: 'Select Pro Plan',
      color: 'bg-gradient-to-r from-orange-400 to-yellow-400',
      icon: Briefcase,
    },
    {
      // Enterprise
      title: 'Enterprise',
      description: 'For large organizations with complex needs',
      price: {
        monthly: '$49.99 /month',
        quarterly: '$129.99 /quarter',
        yearly: '$419.99 /year',
      },
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
    // Subscription
    <div className="min-h-screen bg-gradient-to-b from-violet-100 to-white px-4 py-10 text-center">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        Choose Your Subscription Plan 
      </h1>

      <div className="inline-flex bg-white rounded-full p-1 mb-8 shadow-md">
        {['monthly', 'quarterly', 'yearly'].map((cycle) => (
          // Billing Cycle Buttons
          <button
            key={cycle}
            onClick={() => setBillingCycle(cycle)}
            className={`relative px-5 py-2 rounded-full font-semibold transition-all duration-200
              ${billingCycle === cycle ? 'bg-purple-600 text-white' : 'text-purple-700'}`}
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

      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 px-4 sm:px-6 lg:px-8">
        {plans.map((plan, index) => (
          // Subscription Card
          <div key={index} className="w-full sm:w-[48%] lg:w-[30%] flex">
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
      </div>
    </div>
  );
};

export default Subscription;
