// import React, { useState, useEffect } from "react";
// import { FiTrash2, FiX, FiEdit3, FiSave, FiPlus, FiLoader } from "react-icons/fi";

// const inputStyle =
//   "w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm text-sm sm:text-base";

// const SectionWrapper = ({ title, children, isEditMode }) => (
//   <div className={`p-4 sm:p-6 rounded-md border-2 ${isEditMode ? 'border-blue-200 bg-white shadow-lg' : 'border-gray-100 bg-gray-50 shadow-inner'} space-y-3 sm:space-y-4 transition-colors duration-300`}>
//     <h3 className="text-lg sm:text-xl font-bold text-blue-700 border-b pb-2">{title}</h3>
//     {children}
//   </div>
// );

// const ShopkeeperSetting = () => {
//   const [formData, setFormData] = useState({
//     signUpBonusPoints: "",
//     rewardMinAmount: "", 
//     purchaseRewards: [{ threshold: "", points: "" }],
//     milestoneRewards: [{ threshold: "", amount: "" }],
//     specialBonuses: [{ name: "", dollartoPointsMapping: "", startDate: "", endDate: "" }],
//     dollarToPointsMapping: "",
//   });

//   const [initialData, setInitialData] = useState(null); 
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [fetchKey, setFetchKey] = useState(0);
//   const shopId = localStorage.getItem("id");

//   const parseFetchedData = (data) => ({
//     signUpBonusPoints: data.sign_upBonuspoints ? Math.floor(data.sign_upBonuspoints).toString() : "",
//     rewardMinAmount: data.reward_min_amount ? data.reward_min_amount.toString() : "", 
//     purchaseRewards: data.purchaseRewards?.map((r) => ({
//       threshold: r.threshold ? Math.floor(r.threshold).toString() : "",
//       points: r.points ? Math.floor(r.points).toString() : "",
//     })) || [{ threshold: "", points: "" }],
//     milestoneRewards: data.milestoneRewards?.map((m) => ({
//       threshold: m.threshold ? Math.floor(m.threshold).toString() : "",
//       amount: m.amount ? Math.floor(m.amount).toString() : "",
//     })) || [{ threshold: "", amount: "" }],
//     specialBonuses: data.specialBonuses?.map((b) => ({
//       name: b.name || "",
//       dollartoPointsMapping: b.dollartoPointsMapping ? Math.floor(b.dollartoPointsMapping).toString() : "",
//       startDate: b.startDate || "",
//       endDate: b.endDate || "",
//     })) || [{ name: "", dollartoPointsMapping: "", startDate: "", endDate: "" }],
//     dollarToPointsMapping: data.dollarToPointsMapping ? Math.floor(data.dollarToPointsMapping).toString() : "",
//   });
  
//   useEffect(() => {
//     const fetchSetting = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `https://loyalty-backend-java.onrender.com/api/shop/get-setting/${shopId}`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           const parsedData = parseFetchedData(data);
//           setFormData(parsedData);
//           setInitialData(parsedData); 
//           setIsEditMode(false); 
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
//   }, [shopId, fetchKey]); 

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const isNumberField = name.toLowerCase().includes("points") || name === "dollarToPointsMapping" || name.toLowerCase().includes("threshold") || name.toLowerCase().includes("amount");
//     const isDecimalField = name === "rewardMinAmount"; 

//     if (isNumberField || isDecimalField) {
//       if (value === "" || (parseFloat(value) >= 0 && !isNaN(parseFloat(value)))) {
//         setFormData((prev) => ({ ...prev, [name]: value }));
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleDynamicChange = (type, index, field, value) => {
//     const isNumberField = field === "dollartoPointsMapping" || field === "threshold" || field === "amount" || field === "points";

//     if (isNumberField) {
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
//     const numberFields = [
//       formData.signUpBonusPoints,
//       formData.dollarToPointsMapping,
//       ...formData.purchaseRewards.map((r) => [r.threshold, r.points]),
//       ...formData.milestoneRewards.map((m) => [m.threshold, m.amount]),
//       ...formData.specialBonuses.map((b) => [b.dollartoPointsMapping]),
//     ].flat();

//     for (const val of numberFields) {
//       if (val !== "" && (isNaN(parseInt(val)) || parseInt(val) < 0 || !Number.isInteger(parseFloat(val)))) {
//         alert("All point, dollar, and threshold values must be non-negative whole numbers (integers).");
//         return false;
//       }
//     }

//     if (formData.rewardMinAmount !== "" && (isNaN(parseFloat(formData.rewardMinAmount)) || parseFloat(formData.rewardMinAmount) < 0)) {
//       alert("Minimum reward amount must be a non-negative number (decimals allowed).");
//       return false;
//     }

//     for (const b of formData.specialBonuses) {
//       if (b.startDate && b.endDate) {
//         const start = Date.parse(b.startDate);
//         const end = Date.parse(b.endDate);
//         if (start > end) {
//           alert(`Special Bonus "${b.name || 'Untitled Bonus'}" has an End Date before its Start Date. Please correct the dates.`);
//           return false;
//         }
//       }
//     }

//     return true;
//   };
  
//   const filterAndMapRewards = (rewards) => {
//     const filtered = rewards.filter(r => 
//       Object.values(r).some(val => val !== "" && (typeof val === 'string' ? val.trim() !== "" : true))
//     );
    
//     return filtered.map((r) => ({
//       name: r.name || "",
//       threshold: parseInt(r.threshold) || 0,
//       points: parseInt(r.points) || 0,
//       amount: parseInt(r.amount) || 0,
//       dollartoPointsMapping: parseInt(r.dollartoPointsMapping) || 0,
//       startDate: r.startDate || null,
//       endDate: r.endDate || null,
//     }));
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isEditMode) {
//       setIsEditMode(true);
//       return;
//     }

//     if (!isValid()) return;
//     setIsSaving(true);

//     const payload = {
//       shopId: parseInt(shopId),
//       sign_upBonuspoints: parseInt(formData.signUpBonusPoints) || 0,
//       dollarToPointsMapping: parseInt(formData.dollarToPointsMapping) || 0,
//       reward_min_amount: parseFloat(formData.rewardMinAmount) || 0,

//       purchaseRewards: filterAndMapRewards(formData.purchaseRewards),
//       milestoneRewards: filterAndMapRewards(formData.milestoneRewards),
//       specialBonuses: filterAndMapRewards(formData.specialBonuses),
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
//         alert("Settings saved successfully!");
//         setFetchKey(prev => prev + 1); 
//       } else {
//         alert("Error saving settings. Please check your data and try again.");
//       }
//     } catch (err) {
//       console.error("Save error:", err);
//       alert("Network or Server error. Please check your connection.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelEdit = () => {
//     if (initialData) {
//       setFormData(initialData);
//     }
//     setIsEditMode(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64 p-4">
//         <FiLoader className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin" />
//         <p className="mt-3 text-sm sm:text-base text-blue-600 font-medium">Loading Loyalty Settings...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-full mx-auto bg-white rounded-md shadow-2xl overflow-hidden my-2 p-3 sm:p-0">
//       {/* Header */}
//       <nav className="bg-blue-600 text-white px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//         <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Loyalty Program Settings</h2>
        
//         <div className="flex flex-wrap items-center gap-2">
//           {isEditMode && (
//              <button
//                 onClick={handleCancelEdit}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-sm transition duration-200 flex items-center gap-1 font-medium sm:font-semibold shadow-md text-sm"
//                 disabled={isSaving}
//             >
//                 <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
//                 <span>Cancel</span>
//             </button>
//           )}

//           <button
//             onClick={handleSubmit}
//             disabled={isSaving}
//             className={`text-white px-4 sm:px-5 py-2 rounded-sm transition duration-200 flex items-center gap-1.5 sm:gap-2 font-medium sm:font-semibold shadow-md text-sm ${
//               isEditMode
//                 ? (isSaving ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600')
//                 : 'bg-blue-700 hover:bg-blue-800'
//             }`}
//           >
//             {isSaving ? (
//               <>
//                 <FiLoader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
//                 <span>Saving...</span>
//               </>
//             ) : isEditMode ? (
//               <>
//                 <FiSave className="w-4 h-4 sm:w-5 sm:h-5" />
//                 <span>Save Changes</span>
//               </>
//             ) : (
//               <>
//                 <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5" />
//                 <span>Edit</span>
//               </>
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
//         <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
//           {/* Section 1: Basic Point Mechanics */}
//           <SectionWrapper title="Basic Point Mechanics" isEditMode={isEditMode}>
//             <div className="grid grid-cols-1 gap-4 sm:gap-6">
//               {/* Sign-up Bonus */}
//               <div>
//                 <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">New Customer Sign-up Bonus (Points)</label>
//                 <input
//                   type="number"
//                   name="signUpBonusPoints"
//                   value={formData.signUpBonusPoints}
//                   onChange={handleChange}
//                   disabled={!isEditMode}
//                   className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                   min="0"
//                   step="1"
//                   placeholder="e.g., 50 points for signing up"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Points a customer receives immediately upon signing up for the loyalty program.</p>
//               </div>

//               {/* Dollar to Point Mapping */}
//               <div className="border p-3 sm:p-4 rounded-md bg-white shadow-inner">
//                 <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">Points per Dollar Spent</label>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
//                   <span className="text-lg sm:text-xl font-bold text-gray-500">$1 =</span>
//                   <input
//                     type="number"
//                     name="dollarToPointsMapping"
//                     value={formData.dollarToPointsMapping}
//                     onChange={handleChange}
//                     disabled={!isEditMode}
//                     className={inputStyle + " flex-grow" + (isEditMode ? '' : ' bg-gray-100/70')}
//                     min="0"
//                     step="1"
//                     placeholder="e.g., 5 points"
//                   />
//                   <span className="text-lg sm:text-xl font-bold text-gray-500">Points</span>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">The base rate for earning points (e.g., 5 points for every $1 spent).</p>
//               </div>
//             </div>

//             <div className="mt-4 sm:mt-6 border-t pt-4">
//               <div className="border p-3 sm:p-4 rounded-md bg-white shadow-inner">
//                 <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">Minimum Purchase Amount for Rewards ($)</label>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
//                   <span className="text-lg sm:text-xl font-bold text-gray-500">Min. Spend:</span>
//                   <input
//                     type="number"
//                     name="rewardMinAmount"
//                     value={formData.rewardMinAmount}
//                     onChange={handleChange}
//                     disabled={!isEditMode}
//                     className={inputStyle + " flex-grow" + (isEditMode ? '' : ' bg-gray-100/70')}
//                     min="0"
//                     step="0.01"
//                     placeholder="e.g., 10.00"
//                   />
//                   <span className="text-lg sm:text-xl font-bold text-gray-500">to Qualify</span>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">The minimum spend required for any rewards (points or discounts) to be applied to a purchase.</p>
//               </div>
//             </div>
//           </SectionWrapper>
          
//           {/* Section 2: Purchase and Milestone Rewards */}
//           <SectionWrapper title="Advanced Earning & Rewards" isEditMode={isEditMode}>
//             <div className="grid grid-cols-1 gap-6 sm:gap-8">
//                 {/* Purchase Rewards */}
//                 <div>
//                     <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-gray-800">1. Purchase-Based Bonus Points</h4>
//                     <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Award **extra points** when a customer spends above a certain amount in a **single purchase**.</p>
//                     {formData.purchaseRewards.map((r, i) => (
//                     <div key={i} className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-3 p-3 border-l-4 border-yellow-500 bg-white shadow-md mb-3 rounded-md">
//                         <span className="font-medium text-base sm:text-lg text-yellow-700 w-6 flex-shrink-0">{i + 1}.</span>
                        
//                         <div className="flex-1 w-full">
//                             <label className="block text-xs font-medium mb-1 text-gray-600">Purchase Threshold ($)</label>
//                             <input
//                                 type="number"
//                                 value={r.threshold}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("purchaseRewards", i, "threshold", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 min="0"
//                                 step="1"
//                                 placeholder="Min. purchase amount"
//                             />
//                         </div>
//                         <div className="flex-1 w-full">
//                             <label className="block text-xs font-medium mb-1 text-gray-600">Bonus Points Awarded</label>
//                             <input
//                                 type="number"
//                                 value={r.points}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("purchaseRewards", i, "points", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 min="0"
//                                 step="1"
//                                 placeholder="Bonus points"
//                             />
//                         </div>
//                         {isEditMode && (
//                             <FiTrash2
//                                 className="text-red-500 hover:text-red-600 cursor-pointer w-5 h-5 sm:w-6 sm:h-6 p-1 flex-shrink-0"
//                                 onClick={() => removeField("purchaseRewards", i)}
//                             />
//                         )}
//                     </div>
//                     ))}
//                     {isEditMode && (
//                     <button
//                         type="button"
//                         onClick={() => addField("purchaseRewards", { threshold: "", points: "" })}
//                         className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm mt-2 sm:mt-3 font-medium flex items-center gap-1"
//                     >
//                         <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add Bonus Purchase Level
//                     </button>
//                     )}
//                 </div>

//                 {/* Milestone Rewards */}
//                 <div>
//                     <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-gray-800">2. Loyalty Milestone Rewards</h4>
//                     <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Award a **$ discount** when a customer's **total accumulated points** hits a milestone.</p>
//                     {formData.milestoneRewards.map((m, i) => (
//                     <div key={i} className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-3 p-3 border-l-4 border-green-500 bg-white shadow-md mb-3 rounded-md">
//                         <span className="font-medium text-base sm:text-lg text-green-700 w-6 flex-shrink-0">{i + 1}.</span>
                        
//                         <div className="flex-1 w-full">
//                             <label className="block text-xs font-medium mb-1 text-gray-600">Point Threshold</label>
//                             <input
//                                 type="number"
//                                 value={m.threshold}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("milestoneRewards", i, "threshold", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 min="0"
//                                 step="1"
//                                 placeholder="Min. total points"
//                             />
//                         </div>
//                         <div className="flex-1 w-full">
//                             <label className="block text-xs font-medium mb-1 text-gray-600">Reward Discount ($)</label>
//                             <input
//                                 type="number"
//                                 value={m.amount}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("milestoneRewards", i, "amount", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 min="0"
//                                 step="1"
//                                 placeholder="Discount in dollars"
//                             />
//                         </div>
//                         {isEditMode && (
//                             <FiTrash2
//                                 className="text-red-500 hover:text-red-600 cursor-pointer w-5 h-5 sm:w-6 sm:h-6 p-1 flex-shrink-0"
//                                 onClick={() => removeField("milestoneRewards", i)}
//                             />
//                         )}
//                     </div>
//                     ))}
//                     {isEditMode && (
//                     <button
//                         type="button"
//                         onClick={() => addField("milestoneRewards", { threshold: "", amount: "" })}
//                         className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm mt-2 sm:mt-3 font-medium flex items-center gap-1"
//                     >
//                         <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add Milestone Reward Level
//                     </button>
//                     )}
//                 </div>
//             </div>
//           </SectionWrapper>

//           {/* Section 3: Special Bonuses */}
//           <SectionWrapper title="Event & Temporary Bonus Campaigns" isEditMode={isEditMode}>
//             <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Set up a **limited-time** bonus to offer more points per dollar during a special event or promotion.</p>
//             <div className="space-y-4 sm:space-y-6">
//                 {formData.specialBonuses.map((b, i) => (
//                 <div key={i} className="p-3 sm:p-4 border-l-4 border-purple-500 bg-white shadow-lg rounded-md space-y-3">
//                     <div className="flex justify-between items-start">
//                         <h5 className="font-medium text-purple-700 text-sm sm:text-base">Bonus Campaign #{i + 1}</h5>
//                         {isEditMode && (
//                             <FiTrash2
//                                 className="text-red-500 hover:text-red-600 cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
//                                 onClick={() => removeField("specialBonuses", i)}
//                             />
//                         )}
//                     </div>
//                     <div className="grid grid-cols-1 gap-3 sm:gap-4">
//                         {/* Name */}
//                         <div>
//                             <label className="block text-xs font-medium mb-1 text-gray-600">Campaign Name</label>
//                             <input
//                                 type="text"
//                                 value={b.name}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("specialBonuses", i, "name", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 placeholder="e.g., Summer Sale Double Points"
//                             />
//                         </div>
//                         {/* Points per Dollar */}
//                         <div>
//                             <label className="block text-xs font-medium mb-1 text-gray-600">Points per Dollar</label>
//                             <input
//                                 type="number"
//                                 value={b.dollartoPointsMapping}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("specialBonuses", i, "dollartoPointsMapping", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 min="0"
//                                 step="1"
//                                 placeholder="e.g., 10 points per $1"
//                             />
//                         </div>
//                         {/* Start Date */}
//                         <div>
//                             <label className="block text-xs font-medium mb-1 text-gray-600">Start Date</label>
//                             <input
//                                 type="date"
//                                 value={b.startDate}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("specialBonuses", i, "startDate", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 min={new Date().toISOString().split("T")[0]}
//                             />
//                         </div>
//                         {/* End Date */}
//                         <div>
//                             <label className="block text-xs font-medium mb-1 text-gray-600">End Date</label>
//                             <input
//                                 type="date"
//                                 value={b.endDate}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("specialBonuses", i, "endDate", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 min={b.startDate || new Date().toISOString().split("T")[0]}
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 ))}
//             </div>
//             {isEditMode && (
//                 <button
//                 type="button"
//                 onClick={() => addField("specialBonuses", {
//                     name: "",
//                     dollartoPointsMapping: "",
//                     startDate: "",
//                     endDate: "",
//                 })}
//                 className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm mt-2 sm:mt-3 font-medium flex items-center gap-1"
//                 >
//                 <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add New Bonus Campaign
//                 </button>
//             )}
//           </SectionWrapper>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ShopkeeperSetting;














//translated version
import React, { useState, useEffect } from "react";
import { FiTrash2, FiX, FiEdit3, FiSave, FiPlus, FiLoader, FiSettings } from "react-icons/fi";
import { useTranslation } from "react-i18next"; 
import { API_BASE_URL } from '../../apiConfig';

const inputStyle =
  "w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm text-sm sm:text-base";

const SectionWrapper = ({ title, children, isEditMode }) => (
  <div className={`p-4 sm:p-6 rounded border-2 ${isEditMode ? 'border-blue-200 bg-white shadow-lg' : 'border-gray-100 bg-gray-50 shadow-inner'} space-y-3 sm:space-y-4 transition-colors duration-300`}>
    <h3 className="text-lg sm:text-xl font-bold text-blue-700 border-b pb-2">{title}</h3>
    {children}
  </div>
);

const ShopkeeperSetting = () => {
  const { t } = useTranslation();

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
          `${API_BASE_URL}/api/shop/get-setting/${shopId}`
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
        alert(t("shopSettings.validation.integer"));
        return false;
      }
    }

    if (formData.rewardMinAmount !== "" && (isNaN(parseFloat(formData.rewardMinAmount)) || parseFloat(formData.rewardMinAmount) < 0)) {
      alert(t("shopSettings.validation.minAmount"));
      return false;
    }

    for (const b of formData.specialBonuses) {
      if (b.startDate && b.endDate) {
        const start = Date.parse(b.startDate);
        const end = Date.parse(b.endDate);
        if (start > end) {
          alert(t("shopSettings.validation.dateOrder", { name: b.name || t("shopSettings.validation.untitled") }));
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
        `${API_BASE_URL}/api/shop/update-setting`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert(t("shopSettings.alerts.success"));
        setFetchKey(prev => prev + 1); 
      } else {
        alert(t("shopSettings.alerts.error"));
      }
    } catch (err) {
      console.error("Save error:", err);
      alert(t("shopSettings.alerts.network"));
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
      <div className="flex flex-col items-center justify-center h-64 p-4">
        <FiLoader className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin" />
        <p className="mt-3 text-sm sm:text-base text-blue-600 font-medium">
          {t("shopSettings.loading")}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded shadow-2xl overflow-hidden my-2 p-3 sm:p-0">
      {/* Header */}
      <nav className="bg-white text-violet-700 border-b border-gray-300 px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
          {/* <FiSettings className="w-5 h-5 sm:w-6 sm:h-6"/> */}
          {t("shopSettings.header.title")}
        </h2>
        
        <div className="flex flex-wrap items-center gap-2">
          {isEditMode && (
             <button
                onClick={handleCancelEdit}
                className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded transition duration-200 flex items-center gap-1 font-medium sm:font-semibold shadow-md text-sm"
                disabled={isSaving}
            >
                {/* <FiX className="w-4 h-4 sm:w-5 sm:h-5" /> */}
                <span>{t("shopSettings.buttons.cancel")}</span>
            </button>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className={`text-white px-4 sm:px-5 py-2 rounded transition duration-200 flex items-center gap-1.5 sm:gap-2 font-medium sm:font-semibold shadow-md text-sm ${
              isEditMode
                ? (isSaving ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600')
                : 'bg-violet-700 hover:bg-violet-800'
            }`}
          >
            {isSaving ? (
              <>
                <FiLoader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>{t("shopSettings.buttons.saving")}</span>
              </>
            ) : isEditMode ? (
              <>
                {/* <FiSave className="w-4 h-4 sm:w-5 sm:h-5" /> */}
                <span>{t("shopSettings.buttons.save")}</span>
              </>
            ) : (
              <>
                {/* <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5" /> */}
                <span>{t("shopSettings.buttons.edit")}</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-2 sm:p-4 space-y-6 sm:space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Section 1: Basic Point Mechanics */}
          <SectionWrapper title={t("shopSettings.sections.basic")} isEditMode={isEditMode}>
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {/* Sign-up Bonus */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
                  {t("shopSettings.basic.signupBonus.label")}
                </label>
                <input
                  type="number"
                  name="signUpBonusPoints"
                  value={formData.signUpBonusPoints}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                  min="0"
                  step="1"
                  placeholder={t("shopSettings.basic.signupBonus.placeholder")}
                />
                <p className="text-xs text-gray-500 mt-1">{t("shopSettings.basic.signupBonus.desc")}</p>
              </div>

              {/* Dollar to Point Mapping */}
              <div className="border p-3 sm:p-4 rounded bg-white shadow-inner">
                <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
                  {t("shopSettings.basic.pointsPerDollar.label")}
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold text-gray-500">$1 =</span>
                  <input
                    type="number"
                    name="dollarToPointsMapping"
                    value={formData.dollarToPointsMapping}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputStyle + " flex-grow" + (isEditMode ? '' : ' bg-gray-100/70')}
                    min="0"
                    step="1"
                    placeholder={t("shopSettings.basic.pointsPerDollar.placeholder")}
                  />
                  <span className="text-lg sm:text-xl font-bold text-gray-500">{t("shopSettings.basic.pointsPerDollar.points")}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{t("shopSettings.basic.pointsPerDollar.desc")}</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 border-t pt-4">
              <div className="border p-3 sm:p-4 rounded bg-white shadow-inner">
                <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
                  {t("shopSettings.basic.minAmount.label")}
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold text-gray-500">{t("shopSettings.basic.minAmount.prefix")}</span>
                  <input
                    type="number"
                    name="rewardMinAmount"
                    value={formData.rewardMinAmount}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputStyle + " flex-grow" + (isEditMode ? '' : ' bg-gray-100/70')}
                    min="0"
                    step="0.01"
                    placeholder={t("shopSettings.basic.minAmount.placeholder")}
                  />
                  <span className="text-lg sm:text-xl font-bold text-gray-500">{t("shopSettings.basic.minAmount.suffix")}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{t("shopSettings.basic.minAmount.desc")}</p>
              </div>
            </div>
          </SectionWrapper>
          
          {/* Section 2: Purchase and Milestone Rewards */}
          <SectionWrapper title={t("shopSettings.sections.advanced")} isEditMode={isEditMode}>
            <div className="grid grid-cols-1 gap-6 sm:gap-8">
                {/* Purchase Rewards */}
                <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-gray-800">
                      {t("shopSettings.advanced.purchase.title")}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{t("shopSettings.advanced.purchase.desc")}</p>
                    {formData.purchaseRewards.map((r, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-3 p-3 border-l-4 border-yellow-500 bg-white shadow-md mb-3 rounded">
                        <span className="font-medium text-base sm:text-lg text-yellow-700 w-6 flex-shrink-0">{i + 1}.</span>
                        
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.advanced.purchase.threshold")}</label>
                            <input
                                type="number"
                                value={r.threshold}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("purchaseRewards", i, "threshold", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                min="0"
                                step="1"
                                placeholder={t("shopSettings.advanced.purchase.thresholdPlaceholder")}
                            />
                        </div>
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.advanced.purchase.points")}</label>
                            <input
                                type="number"
                                value={r.points}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("purchaseRewards", i, "points", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                min="0"
                                step="1"
                                placeholder={t("shopSettings.advanced.purchase.pointsPlaceholder")}
                            />
                        </div>
                        {isEditMode && (
                            <FiTrash2
                                className="text-red-500 hover:text-red-600 cursor-pointer w-5 h-5 sm:w-6 sm:h-6 p-1 flex-shrink-0"
                                onClick={() => removeField("purchaseRewards", i)}
                            />
                        )}
                    </div>
                    ))}
                    {isEditMode && (
                    <button
                        type="button"
                        onClick={() => addField("purchaseRewards", { threshold: "", points: "" })}
                        className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm mt-2 sm:mt-3 font-medium flex items-center gap-1"
                    >
                        <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t("shopSettings.advanced.purchase.add")}
                    </button>
                    )}
                </div>

                {/* Milestone Rewards */}
                <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-gray-800">
                      {t("shopSettings.advanced.milestone.title")}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{t("shopSettings.advanced.milestone.desc")}</p>
                    {formData.milestoneRewards.map((m, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-3 p-3 border-l-4 border-green-500 bg-white shadow-md mb-3 rounded">
                        <span className="font-medium text-base sm:text-lg text-green-700 w-6 flex-shrink-0">{i + 1}.</span>
                        
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.advanced.milestone.threshold")}</label>
                            <input
                                type="number"
                                value={m.threshold}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("milestoneRewards", i, "threshold", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                min="0"
                                step="1"
                                placeholder={t("shopSettings.advanced.milestone.thresholdPlaceholder")}
                            />
                        </div>
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.advanced.milestone.amount")}</label>
                            <input
                                type="number"
                                value={m.amount}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("milestoneRewards", i, "amount", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                min="0"
                                step="1"
                                placeholder={t("shopSettings.advanced.milestone.amountPlaceholder")}
                            />
                        </div>
                        {isEditMode && (
                            <FiTrash2
                                className="text-red-500 hover:text-red-600 cursor-pointer w-5 h-5 sm:w-6 sm:h-6 p-1 flex-shrink-0"
                                onClick={() => removeField("milestoneRewards", i)}
                            />
                        )}
                    </div>
                    ))}
                    {isEditMode && (
                    <button
                        type="button"
                        onClick={() => addField("milestoneRewards", { threshold: "", amount: "" })}
                        className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm mt-2 sm:mt-3 font-medium flex items-center gap-1"
                    >
                        <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t("shopSettings.advanced.milestone.add")}
                    </button>
                    )}
                </div>
            </div>
          </SectionWrapper>

          {/* Section 3: Special Bonuses */}
          <SectionWrapper title={t("shopSettings.sections.campaigns")} isEditMode={isEditMode}>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{t("shopSettings.campaigns.desc")}</p>
            <div className="space-y-4 sm:space-y-6">
                {formData.specialBonuses.map((b, i) => (
                <div key={i} className="p-3 sm:p-4 border-l-4 border-purple-500 bg-white shadow-lg rounded space-y-3">
                    <div className="flex justify-between items-start">
                        <h5 className="font-medium text-purple-700 text-sm sm:text-base">
                          {t("shopSettings.campaigns.campaign", { number: i + 1 })}
                        </h5>
                        {isEditMode && (
                            <FiTrash2
                                className="text-red-500 hover:text-red-600 cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
                                onClick={() => removeField("specialBonuses", i)}
                            />
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        {/* Name */}
                        <div>
                            <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.campaigns.name")}</label>
                            <input
                                type="text"
                                value={b.name}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("specialBonuses", i, "name", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                placeholder={t("shopSettings.campaigns.namePlaceholder")}
                            />
                        </div>
                        {/* Points per Dollar */}
                        <div>
                            <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.campaigns.points")}</label>
                            <input
                                type="number"
                                value={b.dollartoPointsMapping}
                                disabled={!isEditMode}
                                onChange={(e) => handleDynamicChange("specialBonuses", i, "dollartoPointsMapping", e.target.value)}
                                className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
                                min="0"
                                step="1"
                                placeholder={t("shopSettings.campaigns.pointsPlaceholder")}
                            />
                        </div>
                        {/* Start Date */}
                        <div>
                            <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.campaigns.startDate")}</label>
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
                        <div>
                            <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.campaigns.endDate")}</label>
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
                className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm mt-2 sm:mt-3 font-medium flex items-center gap-1"
                >
                <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t("shopSettings.campaigns.add")}
                </button>
            )}
          </SectionWrapper>
        </form>
      </div>
    </div>
  );
};

export default ShopkeeperSetting;