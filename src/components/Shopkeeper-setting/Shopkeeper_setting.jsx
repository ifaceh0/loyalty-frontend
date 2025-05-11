import React, { useState } from "react";

const Shopkeeper_setting = () => {
  const [formData, setFormData] = useState({
    shopId: "",
    conversionRate: "",        // $ spent per 1 point
    rewardRule: "",            // e.g., 100 points = $10 off
    promoDiscount: "",         // e.g., $50 off on $5000+
    newUserBonus: "",          // e.g., 100 bonus points
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Settings saved successfully");
        setFormData({
          shopId: "",
          conversionRate: "",
          rewardRule: "",
          promoDiscount: "",
          newUserBonus: "",
        });
      } else {
        alert("Error saving settings");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow rounded-lg space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Shopkeeper Settings</h2>

      <input
        type="text"
        name="shopId"
        placeholder="Shop ID"
        value={formData.shopId}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
        required
      />

      <input
        type="text"
        name="conversionRate"
        placeholder="Purchase $ per 1 point (e.g. 1)"
        value={formData.conversionRate}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
        required
      />

      <input
        type="text"
        name="rewardRule"
        placeholder="Reward Rule (e.g. 100 points = $10 off)"
        value={formData.rewardRule}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <input
        type="text"
        name="promoDiscount"
        placeholder="Promotional Discount/Coupon (e.g. $50 off after $5000)"
        value={formData.promoDiscount}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <input
        type="text"
        name="newUserBonus"
        placeholder="New User Bonus Points (e.g. 100)"
        value={formData.newUserBonus}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Save Settings
      </button>
    </form>
  );
};

export default Shopkeeper_setting;
