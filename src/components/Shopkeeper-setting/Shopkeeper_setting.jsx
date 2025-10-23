// import React, { useState, useEffect } from "react";
// import { FiTrash2, FiX } from "react-icons/fi";

// const inputStyle =
//   "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:outline-none transition duration-200";

// const ShopkeeperSetting = () => {
//   const [formData, setFormData] = useState({
//     signUpBonusPoints: "",
//     purchaseRewards: [{ threshold: "", points: "" }],
//     milestoneRewards: [{ threshold: "", amount: "" }],
//     specialBonuses: [{ name: "", dollartoPointsMapping: "", startDate: "", endDate: "" }],
//     dollarToPointsMapping: "",
//   });

//   const [isEditMode, setIsEditMode] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const shopId = localStorage.getItem("id");

//   useEffect(() => {
//     const fetchSetting = async () => {
//       try {
//         const response = await fetch(
//           `https://loyalty-backend-java.onrender.com/api/shop/get-setting/${shopId}`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setFormData({
//             signUpBonusPoints: data.sign_upBonuspoints ? Math.floor(data.sign_upBonuspoints).toString() : "",
//             purchaseRewards: data.purchaseRewards?.map((r) => ({
//               threshold: r.threshold ? Math.floor(r.threshold).toString() : "",
//               points: r.points ? Math.floor(r.points).toString() : "",
//             })) || [{ threshold: "", points: "" }],
//             milestoneRewards: data.milestoneRewards?.map((m) => ({
//               threshold: m.threshold ? Math.floor(m.threshold).toString() : "",
//               amount: m.amount ? Math.floor(m.amount).toString() : "",
//             })) || [{ threshold: "", amount: "" }],
//             specialBonuses: data.specialBonuses?.map((b) => ({
//               name: b.name || "",
//               dollartoPointsMapping: b.dollartoPointsMapping ? Math.floor(b.dollartoPointsMapping).toString() : "",
//               startDate: b.startDate || "",
//               endDate: b.endDate || "",
//             })) || [{ name: "", dollartoPointsMapping: "", startDate: "", endDate: "" }],
//             dollarToPointsMapping: data.dollarToPointsMapping ? Math.floor(data.dollarToPointsMapping).toString() : "",
//           });
//         } else if (response.status === 404) {
//           setIsEditMode(true);
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSetting();
//   }, [shopId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.toLowerCase().includes("points") || name === "dollarToPointsMapping") {
//       if (value === "" || (parseInt(value) >= 0 && Number.isInteger(parseFloat(value)))) {
//         setFormData((prev) => ({ ...prev, [name]: value }));
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleDynamicChange = (type, index, field, value) => {
//     if (field === "dollartoPointsMapping" || field === "threshold" || field === "amount") {
//       if (value === "" || (parseInt(value) >= 0 && Number.isInteger(parseFloat(value)))) {
//         const updated = [...formData[type]];
//         updated[index][field] = value;
//         setFormData((prev) => ({ ...prev, [type]: updated }));
//       }
//     } else {
//       const updated = [...formData[type]];
//       updated[index][field] = value;
//       setFormData((prev) => ({ ...prev, [type]: updated }));
//     }
//   };

//   const addField = (type, emptyObj) => {
//     setFormData((prev) => ({ ...prev, [type]: [...prev[type], emptyObj] }));
//   };

//   const removeField = (type, index) => {
//     const updated = formData[type].filter((_, i) => i !== index);
//     setFormData((prev) => ({ ...prev, [type]: updated }));
//   };

//   const isValid = () => {
//     const hasInvalidNumber = [
//       formData.signUpBonusPoints,
//       formData.dollarToPointsMapping,
//       ...formData.purchaseRewards.map((r) => [r.threshold, r.points]),
//       ...formData.milestoneRewards.map((m) => [m.threshold, m.amount]),
//       ...formData.specialBonuses.map((b) => [b.dollartoPointsMapping]),
//     ].flat().some((val) => val !== "" && (isNaN(parseInt(val)) || parseInt(val) < 0));

//     if (hasInvalidNumber) {
//       alert("❌ Numeric fields must be non-negative integers.");
//       return false;
//     }

//     const hasInvalidDates = [
//       ...formData.specialBonuses.map((b) => [b.startDate, b.endDate]),
//     ].flat().some((date) => date && isNaN(Date.parse(date)));

//     if (hasInvalidDates) {
//       alert("❌ Invalid date format detected.");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isValid()) return;
//     setIsSaving(true);

//     const payload = {
//       shopId: parseInt(shopId),
//       sign_upBonuspoints: parseInt(formData.signUpBonusPoints) || 0,
//       purchaseRewards: formData.purchaseRewards.map((r) => ({
//         threshold: parseInt(r.threshold) || 0,
//         points: parseInt(r.points) || 0,
//       })),
//       milestoneRewards: formData.milestoneRewards.map((m) => ({
//         threshold: parseInt(m.threshold) || 0,
//         amount: parseInt(m.amount) || 0,
//       })),
//       specialBonuses: formData.specialBonuses.map((b) => ({
//         name: b.name,
//         dollartoPointsMapping: parseInt(b.dollartoPointsMapping) || 0,
//         startDate: b.startDate || null,
//         endDate: b.endDate || null,
//       })),
//       dollarToPointsMapping: parseInt(formData.dollarToPointsMapping) || 0,
//     };

//     try {
//       const response = await fetch(
//         `https://loyalty-backend-java.onrender.com/api/shop/update-setting`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (response.ok) {
//         alert("✅ Settings saved successfully!");
//         setIsEditMode(false);
//       } else {
//         alert("❌ Error saving settings.");
//       }
//     } catch (err) {
//       console.error("Save error:", err);
//       alert("⚠️ Server error");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCloseEdit = () => {
//     setIsEditMode(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="w-10 h-10 border-4 border-purple-600 border-dashed rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
//       <nav className="bg-purple-700 text-white px-6 py-3 flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Shopkeeper Settings</h2>
//         <div className="flex items-center gap-4">
//           {!isEditMode ? (
//             <button
//               onClick={() => setIsEditMode(true)}
//               className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
//             >
//               <span>✏️ Edit</span>
//             </button>
//           ) : (
//             <button
//               onClick={handleCloseEdit}
//               className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
//             >
//               <FiX className="w-5 h-5" />
//             </button>
//           )}
//         </div>
//       </nav>

//       <div className="p-8">
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Signup Bonus */}
//           <div>
//             <label className="block text-sm font-medium mb-1 text-purple-700">Sign-up Bonus Points</label>
//             <input
//               type="number"
//               name="signUpBonusPoints"
//               value={formData.signUpBonusPoints}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               className={inputStyle}
//               min="0"
//               step="1"
//             />
//           </div>

//           {/* Dollar to Point Mapping */}
//           <div>
//             <label className="block text-sm font-medium mb-1 text-purple-700">Dollar to Points Conversion</label>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-blue-700">Dollars</label>
//                 <input
//                   type="number"
//                   value="1"
//                   disabled
//                   className={inputStyle + " bg-gray-100"}
//                   min="0"
//                   step="1"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-blue-700">Points per Dollar</label>
//                 <input
//                   type="number"
//                   name="dollarToPointsMapping"
//                   value={formData.dollarToPointsMapping}
//                   onChange={handleChange}
//                   disabled={!isEditMode}
//                   className={inputStyle}
//                   min="0"
//                   step="1"
//                   placeholder="Points per $1"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Purchase Rewards */}
//           <div>
//             <label className="block font-medium mb-2 text-purple-700">Purchase-Based Rewards</label>
//             {formData.purchaseRewards.map((r, i) => (
//               <div key={i} className="flex items-center gap-2 mb-3">
//                 <span className="w-6 text-sm font-medium text-blue-700">{i + 1} .</span>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium mb-1 text-blue-700">Purchase Threshold ($)</label>
//                   <input
//                     type="number"
//                     value={r.threshold}
//                     disabled={!isEditMode}
//                     onChange={(e) => handleDynamicChange("purchaseRewards", i, "threshold", e.target.value)}
//                     className={inputStyle}
//                     min="0"
//                     step="1"
//                     placeholder="Threshold ($)"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium mb-1 text-blue-700">Bonus Reward Points</label>
//                   <input
//                     type="number"
//                     value={r.points}
//                     disabled={!isEditMode}
//                     onChange={(e) => handleDynamicChange("purchaseRewards", i, "points", e.target.value)}
//                     className={inputStyle}
//                     min="0"
//                     step="1"
//                     placeholder="Points"
//                   />
//                 </div>
//                 {isEditMode && (
//                   <FiTrash2
//                     className="text-red-500 hover:text-red-600 cursor-pointer w-5 h-5"
//                     onClick={() => removeField("purchaseRewards", i)}
//                   />
//                 )}
//               </div>
//             ))}
//             {isEditMode && (
//               <button
//                 type="button"
//                 onClick={() => addField("purchaseRewards", { threshold: "", points: "" })}
//                 className="text-purple-600 hover:text-blue-700 text-sm mt-2 font-medium"
//               >
//                 + Add Purchase Reward
//               </button>
//             )}
//           </div>

//           {/* Milestone Rewards */}
//           <div>
//             <label className="block font-medium mb-2 text-purple-700">Milestone Rewards</label>
//             {formData.milestoneRewards.map((m, i) => (
//               <div key={i} className="flex items-center gap-2 mb-3">
//                 <span className="w-6 text-sm font-medium text-blue-700">{i + 1} .</span>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium mb-1 text-blue-700">Point Threshold</label>
//                   <input
//                     type="number"
//                     value={m.threshold}
//                     disabled={!isEditMode}
//                     onChange={(e) => handleDynamicChange("milestoneRewards", i, "threshold", e.target.value)}
//                     className={inputStyle}
//                     min="0"
//                     step="1"
//                     placeholder="Point Threshold"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium mb-1 text-blue-700">Reward Amount ($)</label>
//                   <input
//                     type="number"
//                     value={m.amount}
//                     disabled={!isEditMode}
//                     onChange={(e) => handleDynamicChange("milestoneRewards", i, "amount", e.target.value)}
//                     className={inputStyle}
//                     min="0"
//                     step="1"
//                     placeholder="$ Amount"
//                   />
//                 </div>
//                 {isEditMode && (
//                   <FiTrash2
//                     className="text-red-500 hover:text-red-600 cursor-pointer w-5 h-5"
//                     onClick={() => removeField("milestoneRewards", i)}
//                   />
//                 )}
//               </div>
//             ))}
//             {isEditMode && (
//               <button
//                 type="button"
//                 onClick={() => addField("milestoneRewards", { threshold: "", amount: "" })}
//                 className="text-purple-600 hover:text-blue-700 text-sm mt-2 font-medium"
//               >
//                 + Add Milestone
//               </button>
//             )}
//           </div>

//           {/* Special Bonuses */}
//           <div>
//             <label className="block font-medium mb-2 text-purple-700">Special Bonuses</label>
//             {formData.specialBonuses.map((b, i) => (
//               <div key={i} className="flex items-center gap-2 mb-3">
//                 <span className="w-6 text-sm font-medium text-blue-700">{i + 1} .</span>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium mb-1 text-blue-700">Bonus Name</label>
//                   <input
//                     type="text"
//                     value={b.name}
//                     disabled={!isEditMode}
//                     onChange={(e) => handleDynamicChange("specialBonuses", i, "name", e.target.value)}
//                     className={inputStyle}
//                     placeholder="Bonus Name"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium mb-1 text-blue-700">Points per Dollar</label>
//                   <input
//                     type="number"
//                     value={b.dollartoPointsMapping}
//                     disabled={!isEditMode}
//                     onChange={(e) => handleDynamicChange("specialBonuses", i, "dollartoPointsMapping", e.target.value)}
//                     className={inputStyle}
//                     min="0"
//                     step="1"
//                     placeholder="Points"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium mb-1 text-blue-700">Start Date</label>
//                   <input
//                     type="date"
//                     value={b.startDate}
//                     disabled={!isEditMode}
//                     onChange={(e) => handleDynamicChange("specialBonuses", i, "startDate", e.target.value)}
//                     className={inputStyle}
//                     min={new Date().toISOString().split("T")[0]}
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium mb-1 text-blue-700">End Date</label>
//                   <input
//                     type="date"
//                     value={b.endDate}
//                     disabled={!isEditMode}
//                     onChange={(e) => handleDynamicChange("specialBonuses", i, "endDate", e.target.value)}
//                     className={inputStyle}
//                     min={b.startDate || new Date().toISOString().split("T")[0]}
//                   />
//                 </div>
//                 {isEditMode && (
//                   <FiTrash2
//                     className="text-red-500 hover:text-red-600 cursor-pointer w-5 h-5"
//                     onClick={() => removeField("specialBonuses", i)}
//                   />
//                 )}
//               </div>
//             ))}
//             {isEditMode && (
//               <button
//                 type="button"
//                 onClick={() =>
//                   addField("specialBonuses", {
//                     name: "",
//                     dollartoPointsMapping: "",
//                     startDate: "",
//                     endDate: "",
//                   })
//                 }
//                 className="text-purple-600 hover:text-blue-700 text-sm mt-2 font-medium"
//               >
//                 + Add Special Bonus
//               </button>
//             )}
//           </div>

//           {isEditMode && (
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               disabled={isSaving}
//               className={`w-full bg-purple-600 text-white py-3 rounded-lg font-semibold transition duration-200 ${
//                 isSaving ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
//               }`}
//             >
//               {isSaving ? "Saving..." : "💾 Save Settings"}
//             </button>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ShopkeeperSetting;

















import React, { useState, useEffect } from "react";
import { FiTrash2, FiX, FiEdit3, FiSave, FiPlus, FiLoader } from "react-icons/fi"; // Added FiLoader

const inputStyle =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm";

const SectionWrapper = ({ title, children, isEditMode }) => (
  <div className={`p-6 rounded-xl border-2 ${isEditMode ? 'border-blue-200 bg-white shadow-lg' : 'border-gray-100 bg-gray-50 shadow-inner'} space-y-4 transition-colors duration-300`}>
    <h3 className="text-xl font-bold text-blue-700 border-b pb-2">{title}</h3>
    {children}
  </div>
);

const ShopkeeperSetting = () => {
  const [formData, setFormData] = useState({
    signUpBonusPoints: "",
    rewardMinAmount: "", 
    purchaseRewards: [{ threshold: "", points: "" }],
    milestoneRewards: [{ threshold: "", amount: "" }],
    specialBonuses: [{ name: "", dollartoPointsMapping: "", startDate: "", endDate: "" }],
    dollarToPointsMapping: "",
  });

  const [initialData, setInitialData] = useState(null); 
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [fetchKey, setFetchKey] = useState(0);
  const shopId = localStorage.getItem("id");

  const parseFetchedData = (data) => ({
    signUpBonusPoints: data.sign_upBonuspoints ? Math.floor(data.sign_upBonuspoints).toString() : "",
    rewardMinAmount: data.reward_min_amount ? data.reward_min_amount.toString() : "", 
    purchaseRewards: data.purchaseRewards?.map((r) => ({
      threshold: r.threshold ? Math.floor(r.threshold).toString() : "",
      points: r.points ? Math.floor(r.points).toString() : "",
    })) || [{ threshold: "", points: "" }],
    milestoneRewards: data.milestoneRewards?.map((m) => ({
      threshold: m.threshold ? Math.floor(m.threshold).toString() : "",
      amount: m.amount ? Math.floor(m.amount).toString() : "",
    })) || [{ threshold: "", amount: "" }],
    specialBonuses: data.specialBonuses?.map((b) => ({
      name: b.name || "",
      dollartoPointsMapping: b.dollartoPointsMapping ? Math.floor(b.dollartoPointsMapping).toString() : "",
      startDate: b.startDate || "",
      endDate: b.endDate || "",
    })) || [{ name: "", dollartoPointsMapping: "", startDate: "", endDate: "" }],
    dollarToPointsMapping: data.dollarToPointsMapping ? Math.floor(data.dollarToPointsMapping).toString() : "",
  });
  
  useEffect(() => {
    const fetchSetting = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://loyalty-backend-java.onrender.com/api/shop/get-setting/${shopId}`
        );
        if (response.ok) {
          const data = await response.json();
          const parsedData = parseFetchedData(data);
          setFormData(parsedData);
          setInitialData(parsedData); 
          setIsEditMode(false); 
        } else if (response.status === 404) {
          setIsEditMode(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSetting();
  }, [shopId, fetchKey]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumberField = name.toLowerCase().includes("points") || name === "dollarToPointsMapping" || name.toLowerCase().includes("threshold") || name.toLowerCase().includes("amount");
    const isDecimalField = name === "rewardMinAmount"; 

    if (isNumberField || isDecimalField) {
      if (value === "" || (parseFloat(value) >= 0 && !isNaN(parseFloat(value)))) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDynamicChange = (type, index, field, value) => {
    const isNumberField = field === "dollartoPointsMapping" || field === "threshold" || field === "amount" || field === "points";

    if (isNumberField) {
      if (value === "" || (parseInt(value) >= 0 && Number.isInteger(parseFloat(value)))) {
        const updated = [...formData[type]];
        updated[index][field] = value;
        setFormData((prev) => ({ ...prev, [type]: updated }));
      }
    } else {
      const updated = [...formData[type]];
      updated[index][field] = value;
      setFormData((prev) => ({ ...prev, [type]: updated }));
    }
  };

  const addField = (type, emptyObj) => {
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], emptyObj] }));
  };

  const removeField = (type, index) => {
    const updated = formData[type].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [type]: updated }));
  };
  
  const isValid = () => {
    const numberFields = [
      formData.signUpBonusPoints,
      formData.dollarToPointsMapping,
      ...formData.purchaseRewards.map((r) => [r.threshold, r.points]),
      ...formData.milestoneRewards.map((m) => [m.threshold, m.amount]),
      ...formData.specialBonuses.map((b) => [b.dollartoPointsMapping]),
    ].flat();

    for (const val of numberFields) {
      if (val !== "" && (isNaN(parseInt(val)) || parseInt(val) < 0 || !Number.isInteger(parseFloat(val)))) {
        alert("❌ All point, dollar, and threshold values must be non-negative whole numbers (integers).");
        return false;
      }
    }

    if (formData.rewardMinAmount !== "" && (isNaN(parseFloat(formData.rewardMinAmount)) || parseFloat(formData.rewardMinAmount) < 0)) {
      alert("❌ Minimum reward amount must be a non-negative number (decimals allowed).");
      return false;
    }

    for (const b of formData.specialBonuses) {
      if (b.startDate && b.endDate) {
        const start = Date.parse(b.startDate);
        const end = Date.parse(b.endDate);
        if (start > end) {
          alert(`❌ Special Bonus "${b.name || 'Untitled Bonus'}" has an End Date before its Start Date. Please correct the dates.`);
          return false;
        }
      }
    }

    return true;
  };
  
  const filterAndMapRewards = (rewards) => {
    const filtered = rewards.filter(r => 
      Object.values(r).some(val => val !== "" && (typeof val === 'string' ? val.trim() !== "" : true))
    );
    
    return filtered.map((r) => ({
      name: r.name || "",
      threshold: parseInt(r.threshold) || 0,
      points: parseInt(r.points) || 0,
      amount: parseInt(r.amount) || 0,
      dollartoPointsMapping: parseInt(r.dollartoPointsMapping) || 0,
      startDate: r.startDate || null,
      endDate: r.endDate || null,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditMode) {
      setIsEditMode(true);
      return;
    }

    if (!isValid()) return;
    setIsSaving(true);

    const payload = {
      shopId: parseInt(shopId),
      sign_upBonuspoints: parseInt(formData.signUpBonusPoints) || 0,
      dollarToPointsMapping: parseInt(formData.dollarToPointsMapping) || 0,
      reward_min_amount: parseFloat(formData.rewardMinAmount) || 0,

      purchaseRewards: filterAndMapRewards(formData.purchaseRewards),
      milestoneRewards: filterAndMapRewards(formData.milestoneRewards),
      specialBonuses: filterAndMapRewards(formData.specialBonuses),
    };
    

    try {
      const response = await fetch(
        `https://loyalty-backend-java.onrender.com/api/shop/update-setting`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("✅ Settings saved successfully!");
       
        setFetchKey(prev => prev + 1); 
       
      } else {
        alert("❌ Error saving settings. Please check your data and try again.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("⚠️ Network or Server error. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (initialData) {
      setFormData(initialData);
    }
    setIsEditMode(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="ml-4 text-blue-600 font-medium">Loading Loyalty Settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden my-8">
      {/* Header */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-extrabold tracking-tight">Loyalty Program Settings</h2>
        
        <div className="flex items-center gap-3">
          {isEditMode && (
             <button
                onClick={handleCancelEdit}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition duration-200 flex items-center gap-1 font-semibold shadow-md"
                disabled={isSaving}
            >
                <FiX className="w-5 h-5" />
                <span>Cancel</span>
            </button>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className={`text-white px-5 py-2 rounded-xl transition duration-200 flex items-center gap-2 font-semibold shadow-md ${
              isEditMode
                ? (isSaving ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600')
                : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            {isSaving ? (
              <>
                <FiLoader className="w-5 h-5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : isEditMode ? (
              <>
                <FiSave className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <FiEdit3 className="w-5 h-5" />
                <span>Edit Settings</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Point Mechanics */}
          <SectionWrapper title="Basic Point Mechanics" isEditMode={isEditMode}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sign-up Bonus */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">New Customer Sign-up Bonus (Points)</label>
                <input
                  type="number"
                  name="signUpBonusPoints"
                  value={formData.signUpBonusPoints}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                  min="0"
                  step="1"
                  placeholder="e.g., 50 points for signing up"
                />
                <p className="text-xs text-gray-500 mt-1">Points a customer receives immediately upon signing up for the loyalty program.</p>
              </div>

              {/* Dollar to Point Mapping */}
              <div className="border p-4 rounded-lg bg-white shadow-inner">
                <label className="block text-sm font-semibold mb-1 text-gray-700">Points per Dollar Spent</label>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-500">$1 =</span>
                  <input
                    type="number"
                    name="dollarToPointsMapping"
                    value={formData.dollarToPointsMapping}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputStyle + " flex-grow" + (isEditMode ? '' : ' bg-gray-100/70')}
                    min="0"
                    step="1"
                    placeholder="e.g., 5 points"
                  />
                  <span className="text-xl font-bold text-gray-500">Points</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">The base rate for earning points (e.g., 5 points for every $1 spent).</p>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="border p-4 rounded-lg bg-white shadow-inner">
                <label className="block text-sm font-semibold mb-1 text-gray-700">Minimum Purchase Amount for Rewards ($)</label>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-500">Min. Spend:</span>
                  <input
                    type="number"
                    name="rewardMinAmount"
                    value={formData.rewardMinAmount}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputStyle + " flex-grow" + (isEditMode ? '' : ' bg-gray-100/70')}
                    min="0"
                    step="0.01"
                    placeholder="e.g., 10.00"
                  />
                  <span className="text-xl font-bold text-gray-500">to Qualify</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">The minimum spend required for any rewards (points or discounts) to be applied to a purchase.</p>
              </div>
            </div>
          </SectionWrapper>
          
          {/* Section 2: Purchase and Milestone Rewards */}
          <SectionWrapper title="Advanced Earning & Rewards" isEditMode={isEditMode}>
            {/* ... (Content for Advanced Earning & Rewards) ... */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Purchase Rewards */}
                <div>
                    <h4 className="font-semibold text-lg mb-3 text-gray-800">1. Purchase-Based Bonus Points</h4>
                    <p className="text-sm text-gray-500 mb-4">Award **extra points** when a customer spends above a certain amount in a **single purchase**.</p>
                    {formData.purchaseRewards.map((r, i) => (
                    <div key={i} className="flex items-end gap-3 p-3 border-l-4 border-yellow-500 bg-white shadow-md mb-3 rounded-lg">
                        <span className="font-medium text-lg text-yellow-700 w-6 flex-shrink-0">{i + 1}.</span>
                        
                        <div className="flex-1">
                            <label className="block text-xs font-medium mb-1 text-gray-600">Purchase Threshold ($)</label>
                            <input
                                type="number"
                                value={r.threshold}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("purchaseRewards", i, "threshold", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                min="0"
                                step="1"
                                placeholder="Min. purchase amount"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-medium mb-1 text-gray-600">Bonus Points Awarded</label>
                            <input
                                type="number"
                                value={r.points}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("purchaseRewards", i, "points", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                min="0"
                                step="1"
                                placeholder="Bonus points"
                            />
                        </div>
                        {isEditMode && (
                            <FiTrash2
                                className="text-red-500 hover:text-red-600 cursor-pointer w-6 h-6 p-1 flex-shrink-0"
                                onClick={() => removeField("purchaseRewards", i)}
                            />
                        )}
                    </div>
                    ))}
                    {isEditMode && (
                    <button
                        type="button"
                        onClick={() => addField("purchaseRewards", { threshold: "", points: "" })}
                        className="text-blue-600 hover:text-blue-700 text-sm mt-3 font-medium flex items-center gap-1"
                    >
                        <FiPlus className="w-4 h-4" /> Add Bonus Purchase Level
                    </button>
                    )}
                </div>

                {/* Milestone Rewards */}
                <div>
                    <h4 className="font-semibold text-lg mb-3 text-gray-800">2. Loyalty Milestone Rewards</h4>
                    <p className="text-sm text-gray-500 mb-4">Award a **$ discount** when a customer's **total accumulated points** hits a milestone.</p>
                    {formData.milestoneRewards.map((m, i) => (
                    <div key={i} className="flex items-end gap-3 p-3 border-l-4 border-green-500 bg-white shadow-md mb-3 rounded-lg">
                        <span className="font-medium text-lg text-green-700 w-6 flex-shrink-0">{i + 1}.</span>
                        
                        <div className="flex-1">
                            <label className="block text-xs font-medium mb-1 text-gray-600">Point Threshold</label>
                            <input
                                type="number"
                                value={m.threshold}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("milestoneRewards", i, "threshold", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                min="0"
                                step="1"
                                placeholder="Min. total points"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-medium mb-1 text-gray-600">Reward Discount ($)</label>
                            <input
                                type="number"
                                value={m.amount}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("milestoneRewards", i, "amount", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                min="0"
                                step="1"
                                placeholder="Discount in dollars"
                            />
                        </div>
                        {isEditMode && (
                            <FiTrash2
                                className="text-red-500 hover:text-red-600 cursor-pointer w-6 h-6 p-1 flex-shrink-0"
                                onClick={() => removeField("milestoneRewards", i)}
                            />
                        )}
                    </div>
                    ))}
                    {isEditMode && (
                    <button
                        type="button"
                        onClick={() => addField("milestoneRewards", { threshold: "", amount: "" })}
                        className="text-blue-600 hover:text-blue-700 text-sm mt-3 font-medium flex items-center gap-1"
                    >
                        <FiPlus className="w-4 h-4" /> Add Milestone Reward Level
                    </button>
                    )}
                </div>
            </div>
          </SectionWrapper>

          {/* Section 3: Special Bonuses (Temporary/Events) */}
          <SectionWrapper title="Event & Temporary Bonus Campaigns" isEditMode={isEditMode}>
            {/* ... (Content for Event & Temporary Bonus Campaigns) ... */}
            <p className="text-sm text-gray-500 mb-4">Set up a **limited-time** bonus to offer more points per dollar during a special event or promotion.</p>
            <div className="space-y-6">
                {formData.specialBonuses.map((b, i) => (
                <div key={i} className="p-4 border-l-4 border-purple-500 bg-white shadow-lg rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                        <h5 className="font-medium text-purple-700">Bonus Campaign #{i + 1}</h5>
                        {isEditMode && (
                            <FiTrash2
                                className="text-red-500 hover:text-red-600 cursor-pointer w-5 h-5"
                                onClick={() => removeField("specialBonuses", i)}
                            />
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Name */}
                        <div className="md:col-span-1">
                            <label className="block text-xs font-medium mb-1 text-gray-600">Campaign Name</label>
                            <input
                                type="text"
                                value={b.name}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("specialBonuses", i, "name", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                placeholder="e.g., Summer Sale Double Points"
                            />
                        </div>
                        {/* Points per Dollar */}
                        <div className="md:col-span-1">
                            <label className="block text-xs font-medium mb-1 text-gray-600">Points per Dollar</label>
                            <input
                                type="number"
                                value={b.dollartoPointsMapping}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("specialBonuses", i, "dollartoPointsMapping", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                min="0"
                                step="1"
                                placeholder="e.g., 10 points per $1"
                            />
                        </div>
                        {/* Start Date */}
                        <div className="md:col-span-1">
                            <label className="block text-xs font-medium mb-1 text-gray-600">Start Date</label>
                            <input
                                type="date"
                                value={b.startDate}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("specialBonuses", i, "startDate", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>
                        {/* End Date */}
                        <div className="md:col-span-1">
                            <label className="block text-xs font-medium mb-1 text-gray-600">End Date</label>
                            <input
                                type="date"
                                value={b.endDate}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("specialBonuses", i, "endDate", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                min={b.startDate || new Date().toISOString().split("T")[0]}
                            />
                        </div>
                    </div>
                </div>
                ))}
            </div>
            {isEditMode && (
                <button
                type="button"
                onClick={() => addField("specialBonuses", {
                    name: "",
                    dollartoPointsMapping: "",
                    startDate: "",
                    endDate: "",
                })}
                className="text-blue-600 hover:text-blue-700 text-sm mt-3 font-medium flex items-center gap-1"
                >
                <FiPlus className="w-4 h-4" /> Add New Bonus Campaign
                </button>
            )}
          </SectionWrapper>
        </form>
      </div>
    </div>
  );
};

export default ShopkeeperSetting;