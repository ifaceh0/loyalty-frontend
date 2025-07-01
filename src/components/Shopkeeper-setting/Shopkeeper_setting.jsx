// import React, { useState } from "react";

// const Shopkeeper_setting = () => {
//   const [formData, setFormData] = useState({
//     shopId: "",
//     conversionRate: "",        // $ spent per 1 point
//     rewardRule: "",            // e.g., 100 points = $10 off
//     promoDiscount: "",         // e.g., $50 off on $5000+
//     newUserBonus: "",          // e.g., 100 bonus points
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch("", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert("Settings saved successfully");
//         setFormData({
//           shopId: "",
//           conversionRate: "",
//           rewardRule: "",
//           promoDiscount: "",
//           newUserBonus: "",
//         });
//       } else {
//         alert("Error saving settings");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow rounded-lg space-y-4">
//       <h2 className="text-xl font-semibold text-gray-700">Shopkeeper setting</h2>

//       <input
//         type="text"
//         name="shopId"
//         placeholder="Shop ID"
//         value={formData.shopId}
//         onChange={handleChange}
//         className="w-full px-4 py-2 border rounded-lg"
//         required
//       />

//       <input
//         type="text"
//         name="conversionRate"
//         placeholder="Purchase $ per 1 point (e.g. 1)"
//         value={formData.conversionRate}
//         onChange={handleChange}
//         className="w-full px-4 py-2 border rounded-lg"
//         required
//       />

//       <input
//         type="text"
//         name="rewardRule"
//         placeholder="Reward Rule (e.g. 100 points = $10 off)"
//         value={formData.rewardRule}
//         onChange={handleChange}
//         className="w-full px-4 py-2 border rounded-lg"
//       />

//       <input
//         type="text"
//         name="promoDiscount"
//         placeholder="Promotional Discount/Coupon (e.g. $50 off after $5000)"
//         value={formData.promoDiscount}
//         onChange={handleChange}
//         className="w-full px-4 py-2 border rounded-lg"
//       />

//       <input
//         type="text"
//         name="newUserBonus"
//         placeholder="New User Bonus Points (e.g. 100)"
//         value={formData.newUserBonus}
//         onChange={handleChange}
//         className="w-full px-4 py-2 border rounded-lg"
//       />

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//       >
//         Save Settings
//       </button>
//     </form>
//   );
// };

// export default Shopkeeper_setting;



import React, { useState, useEffect } from "react";

const Shopkeeper_setting = () => {
  const [formData, setFormData] = useState({
    dollarAmount: "1",
    pointsAmount: "",
    signUpBonusPoints: "",
    milestoneBonusAmount: "",
    specialBonusName: "",
    specialBonusPoints: "",
    specialBonusStartDate: "",
    specialBonusEndDate: "",
    bonusDescription: "",
    beginDate: "",
    endDate: "",
    amountOff: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const shopId = localStorage.getItem("id");

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const response = await fetch(`https://loyalty-backend-java.onrender.com/api/shop/get-setting/${shopId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            dollarAmount: "1",
            pointsAmount: data.dollarToPointMapping?.toString() || "",
            signUpBonusPoints: data.sign_upBonuspoints?.toString() || "",
            milestoneBonusAmount: data.milestoneBonusAmount?.toString() || "",
            specialBonusName: data.specialBonusName || "",
            specialBonusPoints: data.specialBonusPoints?.toString() || "",
            specialBonusStartDate: data.specialBonusStartDate || "",
            specialBonusEndDate: data.specialBonusEndDate || "",
            bonusDescription: data.bonusdescription || "",
            beginDate: data.beginDate || "",
            endDate: data.endDate || "",
            amountOff: data.amountOff?.toString() || "",
          });
        } else if (response.status === 404) {
          setIsEditMode(true);
        } else {
          console.error("Failed to load settings");
        }
      } catch (error) {
        console.error("Error fetching shop setting:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSetting();
  }, [shopId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dollarToPointMapping = parseFloat(formData.pointsAmount) / parseFloat(formData.dollarAmount);

    const payload = {
      shopId: parseInt(shopId),
      dollarToPointMapping,
      sign_upBonuspoints: parseFloat(formData.signUpBonusPoints),
      milestoneBonusAmount: parseFloat(formData.milestoneBonusAmount),
      specialBonusName: formData.specialBonusName,
      specialBonusPoints: parseFloat(formData.specialBonusPoints),
      specialBonusStartDate: formData.specialBonusStartDate,
      specialBonusEndDate: formData.specialBonusEndDate,
      bonusdescription: formData.bonusDescription,
      beginDate: formData.beginDate,
      endDate: formData.endDate,
      amountOff: parseFloat(formData.amountOff),
    };

    try {
      const response = await fetch(`https://loyalty-backend-java.onrender.com/api/shop/update-setting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Settings saved successfully");
        setIsEditMode(false);
      } else {
        alert("Error saving settings");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // if (isLoading) return <div>Loading...</div>;
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <svg
          className="animate-spin h-10 w-10 text-blue-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <p className="text-blue-700 font-semibold text-lg animate-pulse">
          Loading Shopkeeper Settings...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl space-y-6 border border-fuchsia-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-fuchsia-700">⚙️ Shopkeeper Settings</h2>
        {!isEditMode && (
          <button
            type="button"
            onClick={() => setIsEditMode(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow transition"
          >
            Edit
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sign-up Bonus Points</label>
        <input
          type="number"
          name="signUpBonusPoints"
          value={formData.signUpBonusPoints}
          onChange={handleChange}
          disabled={!isEditMode}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-fuchsia-400 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">$ Amount (Fixed)</label>
          <input
            type="number"
            name="dollarAmount"
            value={formData.dollarAmount}
            disabled
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
          <input
            type="number"
            name="pointsAmount"
            value={formData.pointsAmount}
            onChange={handleChange}
            disabled={!isEditMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Milestone Bonus Amount ($)</label>
        <input
          type="number"
          name="milestoneBonusAmount"
          value={formData.milestoneBonusAmount}
          onChange={handleChange}
          disabled={!isEditMode}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Bonus Name</label>
          <input
            type="text"
            name="specialBonusName"
            value={formData.specialBonusName}
            onChange={handleChange}
            disabled={!isEditMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Bonus Points</label>
          <input
            type="number"
            name="specialBonusPoints"
            value={formData.specialBonusPoints}
            onChange={handleChange}
            disabled={!isEditMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Bonus Start Date</label>
          <input
            type="date"
            name="specialBonusStartDate"
            value={formData.specialBonusStartDate}
            onChange={handleChange}
            disabled={!isEditMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Bonus End Date</label>
          <input
            type="date"
            name="specialBonusEndDate"
            value={formData.specialBonusEndDate}
            onChange={handleChange}
            disabled={!isEditMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Description</label>
        <textarea
          name="bonusDescription"
          value={formData.bonusDescription}
          onChange={handleChange}
          disabled={!isEditMode}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Begin Date</label>
          <input
            type="date"
            name="beginDate"
            value={formData.beginDate}
            onChange={handleChange}
            disabled={!isEditMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            disabled={!isEditMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount Off ($)</label>
        <input
          type="number"
          name="amountOff"
          value={formData.amountOff}
          onChange={handleChange}
          disabled={!isEditMode}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {isEditMode && (
        <button
          type="submit"
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold py-2 rounded-lg shadow transition"
        >
          Save Settings
        </button>
      )}
    </form>
  );
};

export default Shopkeeper_setting;
