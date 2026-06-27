// import React, { useState, useEffect } from "react";
// import { FiTrash2, FiX, FiEdit3, FiSave, FiPlus, FiLoader, FiSettings } from "react-icons/fi";
// import { useTranslation } from "react-i18next"; 
// import { API_BASE_URL } from '../../apiConfig';
// import { getCurrencySymbol } from "../../utils/currency";
// import { fetchWithAuth } from "../../auth/fetchWithAuth";

// const inputStyle =
//   "w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm sm:text-base";

// const SectionWrapper = ({ title, children, isEditMode }) => (
//   <div className={`p-6 sm:p-8 rounded-xl border-2 ${isEditMode ? 'border-blue-100 bg-white' : 'border-gray-100 bg-gray-50 shadow-inner'} space-y-3 sm:space-y-4 transition-colors duration-300`}>
//     <h3 className="text-lg sm:text-xl font-bold text-slate-900 pb-2">{title}</h3>
//     {children}
//   </div>
// );

// const ShopkeeperSetting = () => {
//   const { t } = useTranslation();

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
//   const country = localStorage.getItem("country");
//   const currencySymbol = getCurrencySymbol(country);

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
//         const response = await fetchWithAuth(
//           `${API_BASE_URL}/api/shop/get-setting/${shopId}`, {
//             credentials: "include",
//           });
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
//         alert(t("shopSettings.validation.integer"));
//         return false;
//       }
//     }

//     if (formData.rewardMinAmount !== "" && (isNaN(parseFloat(formData.rewardMinAmount)) || parseFloat(formData.rewardMinAmount) < 0)) {
//       alert(t("shopSettings.validation.minAmount"));
//       return false;
//     }

//     for (const b of formData.specialBonuses) {
//       if (b.startDate && b.endDate) {
//         const start = Date.parse(b.startDate);
//         const end = Date.parse(b.endDate);
//         if (start > end) {
//           alert(t("shopSettings.validation.dateOrder", { name: b.name || t("shopSettings.validation.untitled") }));
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
//       const response = await fetchWithAuth(
//         `${API_BASE_URL}/api/shop/update-setting`,
//         {
//           credentials: "include",
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (response.ok) {
//         alert(t("shopSettings.alerts.success"));
//         setFetchKey(prev => prev + 1); 
//       } else {
//         alert(t("shopSettings.alerts.error"));
//       }
//     } catch (err) {
//       console.error("Save error:", err);
//       alert(t("shopSettings.alerts.network"));
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
//         {/* <p className="mt-3 text-sm sm:text-base text-blue-600 font-medium">
//           {t("shopSettings.loading")}
//         </p> */}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-8xl mx-auto rounded-xl shadow-md border border-slate-200 overflow-hidden my-2 p-3 sm:p-0">
//       {/* Header */}
//       <nav className="bg-white text-slate-900 rounded-t-xl border-b border-slate-200 px-4 sm:px-6 py-4 flex flex-row sm:flex-row justify-between items-start sm:items-center gap-3">
//         <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
//           {/* <FiSettings className="w-5 h-5 sm:w-6 sm:h-6"/> */}
//           {t("shopSettings.header.title")}
//         </h2>
        
//         <div className="flex flex-row items-center gap-2">
//           {isEditMode && (
//              <button
//                 onClick={handleCancelEdit}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1.5 rounded-full transition duration-200 flex items-center gap-1 font-medium sm:font-semibold text-sm"
//                 disabled={isSaving}
//             >
//                 {/* <FiX className="w-4 h-4 sm:w-5 sm:h-5" /> */}
//                 <span>{t("shopSettings.buttons.cancel")}</span>
//             </button>
//           )}

//           <button
//             onClick={handleSubmit}
//             disabled={isSaving}
//             className={`text-white px-4 sm:px-5 py-1.5 rounded-full transition duration-200 flex items-center gap-1.5 sm:gap-2 font-medium sm:font-semibold text-sm ${
//               isEditMode
//                 ? (isSaving ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600')
//                 : 'bg-slate-900 hover:bg-blue-600'
//             }`}
//           >
//             {isSaving ? (
//               <>
//                 <FiLoader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
//                 <span>{t("shopSettings.buttons.saving")}</span>
//               </>
//             ) : isEditMode ? (
//               <>
//                 {/* <FiSave className="w-4 h-4 sm:w-5 sm:h-5" /> */}
//                 <span>{t("shopSettings.buttons.save")}</span>
//               </>
//             ) : (
//               <>
//                 {/* <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5" /> */}
//                 <span>{t("shopSettings.buttons.edit")}</span>
//               </>
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="bg-white p-2 sm:p-4 space-y-6 sm:space-y-8">
//         <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
//           {/* Section 1: Basic Point Mechanics */}
//           <SectionWrapper title={t("shopSettings.sections.basic")} isEditMode={isEditMode}>
//             <div className="grid grid-cols-1 gap-4 sm:gap-6">
//               {/* Sign-up Bonus */}
//               <div>
//                 <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
//                   {t("shopSettings.basic.signupBonus.label")}
//                 </label>
//                 <input
//                   type="number"
//                   name="signUpBonusPoints"
//                   value={formData.signUpBonusPoints}
//                   onChange={handleChange}
//                   disabled={!isEditMode}
//                   className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                   min="0"
//                   step="1"
//                   placeholder={t("shopSettings.basic.signupBonus.placeholder")}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">{t("shopSettings.basic.signupBonus.desc")}</p>
//               </div>

//               {/* Dollar to Point Mapping */}
//               <div className="border p-3 sm:p-4 rounded-xl bg-white shadow-inner">
//                 <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
//                   {t("shopSettings.basic.pointsPerDollar.label")}
//                 </label>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
//                   <span className="text-lg sm:text-xl font-bold text-gray-500">{currencySymbol}1 =</span>
//                   <input
//                     type="number"
//                     name="dollarToPointsMapping"
//                     value={formData.dollarToPointsMapping}
//                     onChange={handleChange}
//                     disabled={!isEditMode}
//                     className={inputStyle + " flex-grow" + (isEditMode ? '' : ' bg-gray-100/70')}
//                     min="0"
//                     step="1"
//                     placeholder={t("shopSettings.basic.pointsPerDollar.placeholder")}
//                   />
//                   <span className="text-lg sm:text-xl font-bold text-gray-500">{t("shopSettings.basic.pointsPerDollar.points")}</span>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">{t("shopSettings.basic.pointsPerDollar.desc", { currency: currencySymbol })}</p>
//               </div>
//             </div>

//             <div className="mt-4 sm:mt-6 border-t pt-4">
//               <div className="border p-3 sm:p-4 rounded-xl bg-white shadow-inner">
//                 <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
//                   {t("shopSettings.basic.minAmount.label", { currency: currencySymbol })}
//                 </label>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
//                   <span className="text-lg sm:text-xl font-bold text-gray-500">{t("shopSettings.basic.minAmount.prefix")}</span>
//                   <input
//                     type="number"
//                     name="rewardMinAmount"
//                     value={formData.rewardMinAmount}
//                     onChange={handleChange}
//                     disabled={!isEditMode}
//                     className={inputStyle + " flex-grow" + (isEditMode ? '' : ' bg-gray-100/70')}
//                     min="0"
//                     step="0.01"
//                     placeholder={t("shopSettings.basic.minAmount.placeholder")}
//                   />
//                   <span className="text-lg sm:text-xl font-bold text-gray-500">{t("shopSettings.basic.minAmount.suffix")}</span>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">{t("shopSettings.basic.minAmount.desc")}</p>
//               </div>
//             </div>
//           </SectionWrapper>
          
//           {/* Section 2: Purchase and Milestone Rewards */}
//           <SectionWrapper title={t("shopSettings.sections.advanced")} isEditMode={isEditMode}>
//             <div className="grid grid-cols-1 gap-6 sm:gap-8">
//                 {/* Purchase Rewards */}
//                 <div>
//                     <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-gray-800">
//                       {t("shopSettings.advanced.purchase.title")}
//                     </h4>
//                     <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{t("shopSettings.advanced.purchase.desc")}</p>
//                     {formData.purchaseRewards.map((r, i) => (
//                     <div key={i} className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-3 p-3 border-l-4 border-yellow-500 bg-white shadow-md mb-3 rounded-xl">
//                         <span className="font-medium text-base sm:text-lg text-yellow-700 w-6 flex-shrink-0">{i + 1}.</span>
                        
//                         <div className="flex-1 w-full">
//                             <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.advanced.purchase.threshold", { currency: currencySymbol })}</label>
//                             <input
//                                 type="number"
//                                 value={r.threshold}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("purchaseRewards", i, "threshold", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 min="0"
//                                 step="1"
//                                 placeholder={t("shopSettings.advanced.purchase.thresholdPlaceholder")}
//                             />
//                         </div>
//                         <div className="flex-1 w-full">
//                             <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.advanced.purchase.points")}</label>
//                             <input
//                                 type="number"
//                                 value={r.points}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("purchaseRewards", i, "points", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 min="0"
//                                 step="1"
//                                 placeholder={t("shopSettings.advanced.purchase.pointsPlaceholder")}
//                             />
//                         </div>
//                         {isEditMode && (
//                             <FiTrash2
//                                 className="text-red-500 hover:text-red-600 cursor-pointer w-6 h-6 sm:w-7 sm:h-7 p-1 flex-shrink-0"
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
//                         <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t("shopSettings.advanced.purchase.add")}
//                     </button>
//                     )}
//                 </div>

//                 {/* Milestone Rewards */}
//                 <div>
//                     <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-gray-800">
//                       {t("shopSettings.advanced.milestone.title")}
//                     </h4>
//                     <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{t("shopSettings.advanced.milestone.desc", { currency: currencySymbol })}</p>
//                     {formData.milestoneRewards.map((m, i) => (
//                     <div key={i} className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-3 p-3 border-l-4 border-green-500 bg-white shadow-md mb-3 rounded-xl">
//                         <span className="font-medium text-base sm:text-lg text-green-700 w-6 flex-shrink-0">{i + 1}.</span>
                        
//                         <div className="flex-1 w-full">
//                             <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.advanced.milestone.threshold")}</label>
//                             <input
//                                 type="number"
//                                 value={m.threshold}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("milestoneRewards", i, "threshold", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 min="0"
//                                 step="1"
//                                 placeholder={t("shopSettings.advanced.milestone.thresholdPlaceholder")}
//                             />
//                         </div>
//                         <div className="flex-1 w-full">
//                             <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.advanced.milestone.amount", { currency: currencySymbol })}</label>
//                             <input
//                                 type="number"
//                                 value={m.amount}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("milestoneRewards", i, "amount", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 min="0"
//                                 step="1"
//                                 placeholder={t("shopSettings.advanced.milestone.amountPlaceholder", { currency: currencySymbol })}
//                             />
//                         </div>
//                         {isEditMode && (
//                             <FiTrash2
//                                 className="text-red-500 hover:text-red-600 cursor-pointer w-6 h-6 sm:w-7 sm:h-7 p-1 flex-shrink-0"
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
//                         <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t("shopSettings.advanced.milestone.add")}
//                     </button>
//                     )}
//                 </div>
//             </div>
//           </SectionWrapper>

//           {/* Section 3: Special Bonuses */}
//           <SectionWrapper title={t("shopSettings.sections.campaigns")} isEditMode={isEditMode}>
//             <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{t("shopSettings.campaigns.desc", { currency: currencySymbol })}</p>
//             <div className="space-y-4 sm:space-y-6">
//                 {formData.specialBonuses.map((b, i) => (
//                 <div key={i} className="p-3 sm:p-4 border-l-4 border-purple-500 bg-white shadow-lg rounded-xl space-y-3">
//                     <div className="flex justify-between items-start">
//                         <h5 className="font-medium text-purple-700 text-sm sm:text-base">
//                           {t("shopSettings.campaigns.campaign", { number: i + 1 })}
//                         </h5>
//                         {isEditMode && (
//                             <FiTrash2
//                                 className="text-red-500 hover:text-red-600 cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
//                                 onClick={() => removeField("specialBonuses", i)}
//                             />
//                         )}
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                         {/* Name */}
//                         <div>
//                             <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.campaigns.name")}</label>
//                             <input
//                                 type="text"
//                                 value={b.name}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("specialBonuses", i, "name", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 placeholder={t("shopSettings.campaigns.namePlaceholder")}
//                             />
//                         </div>
//                         {/* Points per Dollar */}
//                         <div>
//                             <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.campaigns.points")}</label>
//                             <input
//                                 type="number"
//                                 value={b.dollartoPointsMapping}
//                                 disabled={!isEditMode}
//                                 onChange={(e) => handleDynamicChange("specialBonuses", i, "dollartoPointsMapping", e.target.value)}
//                                 className={inputStyle + (isEditMode ? '' : ' bg-gray-100/70')}
//                                 min="0"
//                                 step="1"
//                                 placeholder={t("shopSettings.campaigns.pointsPlaceholder", { currency: currencySymbol })}
//                             />
//                         </div>
//                         {/* Start Date */}
//                         <div>
//                             <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.campaigns.startDate")}</label>
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
//                             <label className="block text-xs font-medium mb-1 text-gray-600">{t("shopSettings.campaigns.endDate")}</label>
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
//                 <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t("shopSettings.campaigns.add")}
//                 </button>
//             )}
//           </SectionWrapper>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ShopkeeperSetting;








import React, { useState, useEffect } from "react";
import { FiTrash2, FiX, FiEdit3, FiSave, FiPlus, FiLoader, FiSettings, FiAward, FiTarget, FiZap, FiCalendar } from "react-icons/fi";
import { useTranslation } from "react-i18next"; 
import { API_BASE_URL } from '../../apiConfig';
import { getCurrencySymbol } from "../../utils/currency";
import { fetchWithAuth } from "../../auth/fetchWithAuth";

// Core context-aware theme text input style mapping
const getInputStyle = (isEditMode) =>
  `w-full px-4 py-2 border rounded-md outline-none transition-all duration-200 text-sm font-medium ${
    isEditMode 
      ? "border-zinc-200 bg-white text-zinc-900 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 shadow-sm" 
      : "border-zinc-200/60 bg-zinc-50/80 text-zinc-500 cursor-default"
  }`;

const SectionWrapper = ({ title, children, isEditMode, icon }) => (
  <div className={`p-6 sm:p-8 rounded-md border transition-all duration-300 shadow-sm ${
    isEditMode ? 'border-zinc-200 bg-white' : 'border-zinc-200/60 bg-white'
  }`}>
    <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-4 mb-6">
      <div className="w-9 h-9 bg-zinc-100 rounded-md flex items-center justify-center text-zinc-700 border border-zinc-100">
        {icon}
      </div>
      <h3 className="text-base font-bold text-zinc-800 tracking-tight">{title}</h3>
    </div>
    <div className="space-y-5">
      {children}
    </div>
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
  const country = localStorage.getItem("country");
  const currencySymbol = getCurrencySymbol(country);

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
        const response = await fetchWithAuth(
          `${API_BASE_URL}/api/shop/get-setting/${shopId}`, {
            credentials: "include",
          });
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
      const response = await fetchWithAuth(
        `${API_BASE_URL}/api/shop/update-setting`,
        {
          credentials: "include",
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
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <FiLoader className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
        <p className="text-zinc-500 text-sm font-medium tracking-wide">Syncing Config Parameters...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto text-zinc-950 antialiased px-2 sm:px-0 py-6">
      
      {/* Top Profile Header Component Block */}
      <nav className="flex flex-row sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-200/80">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-0.5">
            <span>System Configuration</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-zinc-900 tracking-tight">
            {t("shopSettings.header.title")}
          </h2>
        </div>
        
        {/* Dynamic Navigation Action Controllers */}
        <div className="flex items-center gap-3">
          {isEditMode && (
            <button
              onClick={handleCancelEdit}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 text-zinc-700 font-semibold text-sm transition-all shadow-sm hover:border-zinc-300 disabled:opacity-50"
            >
              {/* <FiX className="w-4 h-4 text-zinc-400" /> */}
              <span>{t("shopSettings.buttons.cancel")}</span>
            </button>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className={`inline-flex items-center justify-center gap-2 px-5 py-1.5 rounded-full font-bold text-sm text-white shadow-sm transition-all ${
              isEditMode
                ? (isSaving ? 'bg-zinc-300 cursor-not-allowed' : 'bg-zinc-900 hover:bg-zinc-800')
                : 'bg-zinc-900 hover:bg-zinc-800'
            }`}
          >
            {isSaving ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                <span>{t("shopSettings.buttons.saving")}</span>
              </>
            ) : isEditMode ? (
              <>
                {/* <FiSave className="w-4 h-4" /> */}
                <span>{t("shopSettings.buttons.save")}</span>
              </>
            ) : (
              <>
                {/* <FiEdit3 className="w-4 h-4" /> */}
                <span>{t("shopSettings.buttons.edit")}</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Main Structural Data Grid Layer */}
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Basic Loyalty Mechanics Configuration */}
          <SectionWrapper title={t("shopSettings.sections.basic")} isEditMode={isEditMode} icon={<FiSettings className="w-4 h-4"/>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Sign-up Bonus Card */}
              <div className="flex flex-col gap-1.5 bg-zinc-50/50 border border-zinc-200/60 rounded-md p-4 shadow-inner">
                <label className="text-xs font-bold tracking-wider text-zinc-400">
                  {t("shopSettings.basic.signupBonus.label")}
                </label>
                <input
                  type="number"
                  name="signUpBonusPoints"
                  value={formData.signUpBonusPoints}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={getInputStyle(isEditMode)}
                  min="0"
                  step="1"
                  placeholder={t("shopSettings.basic.signupBonus.placeholder")}
                />
                <p className="text-[11px] font-medium text-zinc-400 mt-1">{t("shopSettings.basic.signupBonus.desc")}</p>
              </div>

              {/* Points Conversion Token Custom Row */}
              <div className="flex flex-col gap-1.5 bg-zinc-50/50 border border-zinc-200/60 rounded-md p-4 shadow-inner">
                <label className="text-xs font-bold tracking-wider text-zinc-400">
                  {t("shopSettings.basic.pointsPerDollar.label")}
                </label>
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-zinc-500 bg-white border border-zinc-200 rounded-md px-3 py-2">{currencySymbol}1 =</span>
                  <input
                    type="number"
                    name="dollarToPointsMapping"
                    value={formData.dollarToPointsMapping}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={getInputStyle(isEditMode) + " flex-1"}
                    min="0"
                    step="1"
                    placeholder={t("shopSettings.basic.pointsPerDollar.placeholder")}
                  />
                  <span className="text-xs font-bold text-zinc-400 tracking-wider">{t("shopSettings.basic.pointsPerDollar.points")}</span>
                </div>
                <p className="text-[11px] font-medium text-zinc-400 mt-1">{t("shopSettings.basic.pointsPerDollar.desc", { currency: currencySymbol })}</p>
              </div>

              {/* Minimum Value Trigger Input Card */}
              <div className="flex flex-col gap-1.5 bg-zinc-50/50 border border-zinc-200/60 rounded-md p-4 shadow-inner md:col-span-2 lg:col-span-1">
                <label className="text-xs font-bold tracking-wider text-zinc-400">
                  {t("shopSettings.basic.minAmount.label", { currency: currencySymbol })}
                </label>
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-zinc-500 bg-white border border-zinc-200 rounded-md px-3 py-2">{currencySymbol}</span>
                  <input
                    type="number"
                    name="rewardMinAmount"
                    value={formData.rewardMinAmount}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={getInputStyle(isEditMode) + " flex-1"}
                    min="0"
                    step="0.01"
                    placeholder={t("shopSettings.basic.minAmount.placeholder")}
                  />
                  <span className="text-xs font-bold text-zinc-400 tracking-wider">{t("shopSettings.basic.minAmount.suffix")}</span>
                </div>
                <p className="text-[11px] font-medium text-zinc-400 mt-1">{t("shopSettings.basic.minAmount.desc")}</p>
              </div>
            </div>
          </SectionWrapper>
          
          {/* Section 2: Advanced Dynamic Array Multipliers Tiering */}
          <SectionWrapper title={t("shopSettings.sections.advanced")} isEditMode={isEditMode} icon={<FiAward className="w-4 h-4"/>}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Purchase Tiers Ledger */}
              <div className="space-y-4">
                <div className="border-b border-zinc-100 pb-2">
                  <h4 className="font-bold text-sm text-zinc-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-amber-500 rounded-full"></span>
                    {t("shopSettings.advanced.purchase.title")}
                  </h4>
                  <p className="text-xs font-medium text-zinc-400 mt-0.5">{t("shopSettings.advanced.purchase.desc")}</p>
                </div>
                
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {formData.purchaseRewards.map((r, i) => (
                    <div key={i} className="flex items-center gap-3 bg-zinc-50/50 border border-zinc-200/80 p-2 sm:p-3.5 rounded-md">
                      <span className="font-mono text-xs font-bold text-zinc-400">#{String(i + 1).padStart(2, '0')}</span>
                      
                      <div className="grid grid-cols-2 gap-3 flex-1">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-zinc-400 tracking-wider">{t("shopSettings.advanced.purchase.threshold", { currency: currencySymbol })}</span>
                          <input
                            type="number"
                            value={r.threshold}
                            disabled={!isEditMode}
                            onChange={(e) => handleDynamicChange("purchaseRewards", i, "threshold", e.target.value)}
                            className={getInputStyle(isEditMode) + " py-1.5 px-3"}
                            min="0"
                            step="1"
                            placeholder="Amt"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-zinc-400 tracking-wider">{t("shopSettings.advanced.purchase.points")}</span>
                          <input
                            type="number"
                            value={r.points}
                            disabled={!isEditMode}
                            onChange={(e) => handleDynamicChange("purchaseRewards", i, "points", e.target.value)}
                            className={getInputStyle(isEditMode) + " py-1.5 px-3"}
                            min="0"
                            step="1"
                            placeholder="Multiplier"
                          />
                        </div>
                      </div>

                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => removeField("purchaseRewards", i)}
                          className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-md transition mt-4 self-end border border-rose-100"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => addField("purchaseRewards", { threshold: "", points: "" })}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <FiPlus className="w-3.5 h-3.5" /> {t("shopSettings.advanced.purchase.add")}
                  </button>
                )}
              </div>

              {/* Milestone Milestones Matrix Card */}
              <div className="space-y-4">
                <div className="border-b border-zinc-100 pb-2">
                  <h4 className="font-bold text-sm text-zinc-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full"></span>
                    {t("shopSettings.advanced.milestone.title")}
                  </h4>
                  <p className="text-xs font-medium text-zinc-400 mt-0.5">{t("shopSettings.advanced.milestone.desc", { currency: currencySymbol })}</p>
                </div>
                
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {formData.milestoneRewards.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 bg-zinc-50/50 border border-zinc-200/80 p-2 sm:p-3.5 rounded-md">
                      <span className="font-mono text-xs font-bold text-zinc-400">#{String(i + 1).padStart(2, '0')}</span>
                      
                      <div className="grid grid-cols-2 gap-3 flex-1">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-zinc-400 tracking-wider">{t("shopSettings.advanced.milestone.threshold")}</span>
                          <input
                            type="number"
                            value={m.threshold}
                            disabled={!isEditMode}
                            onChange={(e) => handleDynamicChange("milestoneRewards", i, "threshold", e.target.value)}
                            className={getInputStyle(isEditMode) + " py-1.5 px-3"}
                            min="0"
                            step="1"
                            placeholder="Points target"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-zinc-400 tracking-wider">{t("shopSettings.advanced.milestone.amount", { currency: currencySymbol })}</span>
                          <input
                            type="number"
                            value={m.amount}
                            disabled={!isEditMode}
                            onChange={(e) => handleDynamicChange("milestoneRewards", i, "amount", e.target.value)}
                            className={getInputStyle(isEditMode) + " py-1.5 px-3"}
                            min="0"
                            step="1"
                            placeholder="Cashback val"
                          />
                        </div>
                      </div>

                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => removeField("milestoneRewards", i)}
                          className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-md transition mt-4 self-end border border-rose-100"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => addField("milestoneRewards", { threshold: "", amount: "" })}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <FiPlus className="w-3.5 h-3.5" /> {t("shopSettings.advanced.milestone.add")}
                  </button>
                )}
              </div>
            </div>
          </SectionWrapper>

          {/* Section 3: Promotional Campaigns & Specific Scheduling Parameters */}
          <SectionWrapper title={t("shopSettings.sections.campaigns")} isEditMode={isEditMode} icon={<FiZap className="w-4 h-4"/>}>
            <p className="text-xs font-medium text-zinc-400 mb-2">{t("shopSettings.campaigns.desc", { currency: currencySymbol })}</p>
            
            <div className="space-y-4">
              {formData.specialBonuses.map((b, i) => (
                <div key={i} className="p-5 border border-zinc-200/80 bg-zinc-50/30 rounded-md space-y-4 relative">
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                    <h5 className="text-xs font-bold text-indigo-600 tracking-wide flex items-center gap-1.5">
                      <FiTarget className="w-3.5 h-3.5" />
                      {t("shopSettings.campaigns.campaign", { number: i + 1 })}
                    </h5>
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => removeField("specialBonuses", i)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-600 border border-rose-100 hover:border-rose-200 rounded-md transition"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Operational Campaign Input Matrix row configuration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-zinc-400 tracking-wider">{t("shopSettings.campaigns.name")}</label>
                      <input
                        type="text"
                        value={b.name}
                        disabled={!isEditMode}
                        onChange={(e) => handleDynamicChange("specialBonuses", i, "name", e.target.value)}
                        className={getInputStyle(isEditMode) + " py-2 px-3"}
                        placeholder={t("shopSettings.campaigns.namePlaceholder")}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-zinc-400 tracking-wider">{t("shopSettings.campaigns.points")}</label>
                      <input
                        type="number"
                        value={b.dollartoPointsMapping}
                        disabled={!isEditMode}
                        onChange={(e) => handleDynamicChange("specialBonuses", i, "dollartoPointsMapping", e.target.value)}
                        className={getInputStyle(isEditMode) + " py-2 px-3"}
                        min="0"
                        step="1"
                        placeholder={t("shopSettings.campaigns.pointsPlaceholder", { currency: currencySymbol })}
                      />
                    </div>

                    <div className="flex flex-col gap-1 relative">
                      <label className="text-[10px] font-bold text-zinc-400 tracking-wider">{t("shopSettings.campaigns.startDate")}</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={b.startDate}
                          disabled={!isEditMode}
                          onChange={(e) => handleDynamicChange("specialBonuses", i, "startDate", e.target.value)}
                          className={getInputStyle(isEditMode) + " py-2 pl-3 pr-8"}
                          min={new Date().toISOString().split("T")[0]}
                        />
                        <FiCalendar className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 relative">
                      <label className="text-[10px] font-bold text-zinc-400 tracking-wider">{t("shopSettings.campaigns.endDate")}</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={b.endDate}
                          disabled={!isEditMode}
                          onChange={(e) => handleDynamicChange("specialBonuses", i, "endDate", e.target.value)}
                          className={getInputStyle(isEditMode) + " py-2 pl-3 pr-8"}
                          min={b.startDate || new Date().toISOString().split("T")[0]}
                        />
                        <FiCalendar className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
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
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-1.5 rounded-full transition-colors mt-2"
              >
                <FiPlus className="w-3.5 h-3.5" /> {t("shopSettings.campaigns.add")}
              </button>
            )}
          </SectionWrapper>
        </form>
      </div>
    </div>
  );
};

export default ShopkeeperSetting;