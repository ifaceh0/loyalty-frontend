// import React, { useState, useEffect } from "react";
// import { FiTrash2 } from "react-icons/fi";

// const inputStyle =
//   "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:outline-none";

// const Shopkeeper_setting = () => {
//   const [formData, setFormData] = useState({
//     signUpBonusPoints: "",
//     purchaseRewards: [{ threshold: "", points: "" }],
//     milestoneRewards: [{ threshold: "", amount: "" }],
//     specialBonuses: [{ name: "", points: "", startDate: "", endDate: "" }],
//     bonusDescription: "",
//     beginDate: "",
//     endDate: "",
//     amountOff: "",
//   });

//   const [isEditMode, setIsEditMode] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
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
//             signUpBonusPoints: data.sign_upBonuspoints?.toString() || "",
//             purchaseRewards: data.purchaseRewards || [{ threshold: "", points: "" }],
//             milestoneRewards: data.milestoneRewards || [{ threshold: "", amount: "" }],
//             specialBonuses: data.specialBonuses?.map((b) => ({
//               name: b.name,
//               points: b.points.toString(),
//               startDate: b.startDate,
//               endDate: b.endDate,
//             })) || [{ name: "", points: "", startDate: "", endDate: "" }],
//             bonusDescription: data.bonusdescription || "",
//             beginDate: data.beginDate || "",
//             endDate: data.endDate || "",
//             amountOff: data.amountOff?.toString() || "",
//           });
//         } else if (response.status === 404) {
//           setIsEditMode(true); // first-time setup
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
//     if (name.toLowerCase().includes("points") && parseFloat(value) < 0) return;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDynamicChange = (type, index, field, value) => {
//     const updated = [...formData[type]];
//     updated[index][field] = value;
//     setFormData((prev) => ({ ...prev, [type]: updated }));
//   };

//   const addField = (type, emptyObj) => {
//     setFormData((prev) => ({ ...prev, [type]: [...prev[type], emptyObj] }));
//   };

//   const removeField = (type, index) => {
//     const updated = formData[type].filter((_, i) => i !== index);
//     setFormData((prev) => ({ ...prev, [type]: updated }));
//   };

//   const isValid = () => {
//     // const today = new Date().toISOString().split("T")[0];
//     // if (formData.endDate && formData.endDate < today) {
//     //   alert("❌ End date should not be in the past.");
//     //   return false;
//     // }

//     const hasNegative = [...formData.purchaseRewards, ...formData.milestoneRewards, ...formData.specialBonuses]
//       .some((item) => parseFloat(item.points || item.amount || item.threshold) < 0);

//     if (hasNegative) {
//       alert("❌ Points, thresholds or amounts cannot be negative.");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isValid()) return;

//     const payload = {
//       shopId: parseInt(shopId),
//       sign_upBonuspoints: parseFloat(formData.signUpBonusPoints) || 0,
//       purchaseRewards: formData.purchaseRewards.map((r) => ({
//         threshold: parseFloat(r.threshold) || 0,
//         points: parseFloat(r.points) || 0,
//       })),
//       milestoneRewards: formData.milestoneRewards.map((m) => ({
//         threshold: parseFloat(m.threshold) || 0,
//         amount: parseFloat(m.amount) || 0,
//       })),
//       specialBonuses: formData.specialBonuses.map((b) => ({
//         name: b.name,
//         points: parseFloat(b.points) || 0,
//         startDate: b.startDate,
//         endDate: b.endDate,
//       })),
//       bonusdescription: formData.bonusDescription,
//       beginDate: formData.beginDate,
//       endDate: formData.endDate,
//       amountOff: parseFloat(formData.amountOff) || 0,
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
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="w-10 h-10 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-xl">
//       <div className="flex justify-between mb-6">
//         <h2 className="text-3xl font-bold text-purple-700">Shopkeeper Settings</h2>
//         {!isEditMode && (
//           <button
//             onClick={() => setIsEditMode(true)}
//             className="bg-purple-600 text-white px-6 py-2 rounded-lg"
//           >
//             ✏️ Edit
//           </button>
//         )}
//       </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Signup Bonus */}
//         <div>
//           <label className="block font-medium mb-1 text-purple-600">Sign-up Bonus Points</label>
//           <input
//             type="number"
//             name="signUpBonusPoints"
//             value={formData.signUpBonusPoints}
//             onChange={handleChange}
//             disabled={!isEditMode}
//             className={inputStyle}
//             min="0"
//           />
//         </div>

//         {/* Purchase Rewards */}
//         <div>
//           <label className="block font-medium mb-2 text-purple-600">Purchase-Based Rewards</label>
//           {formData.purchaseRewards.map((r, i) => (
//             <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-1 items-center mb-1">
//               <label className="col-span-1 text-sm font-medium">Threshold ($)</label>
//               <label className="col-span-1 text-sm font-medium">Points</label>
//               <label className="col-span-1"></label>
//               <input
//                 type="number"
//                 placeholder="Threshold"
//                 value={r.threshold}
//                 disabled={!isEditMode}
//                 onChange={(e) => handleDynamicChange("purchaseRewards", i, "threshold", e.target.value)}
//                 className={inputStyle}
//                 min="0"
//               />
//               <input
//                 type="number"
//                 placeholder="Points"
//                 value={r.points}
//                 disabled={!isEditMode}
//                 onChange={(e) => handleDynamicChange("purchaseRewards", i, "points", e.target.value)}
//                 className={inputStyle}
//                 min="0"
//               />
//               {isEditMode && (
//                 <FiTrash2
//                   className="text-red-500 cursor-pointer mt-2"
//                   onClick={() => removeField("purchaseRewards", i)}
//                 />
//               )}
//             </div>
//           ))}
//           {isEditMode && (
//             <button
//               type="button"
//               onClick={() => addField("purchaseRewards", { threshold: "", points: "" })}
//               className="text-blue-500 text-sm mt-2"
//             >
//               + Add Purchase Reward
//             </button>
//           )}
//         </div>

//         {/* Milestone Rewards */}
//         <div>
//           <label className="block font-medium mb-2 text-purple-600">Milestone Rewards</label>
//           {formData.milestoneRewards.map((m, i) => (
//             // <div key={i} className="flex gap-2 items-center mb-2">
//             <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-1 items-center mb-1">
//               <label className="col-span-1 text-sm font-medium">Points</label>
//               <label className="col-span-1 text-sm font-medium">Dollar ($)</label>
//               <label className="col-span-1"></label>
//               <input
//                 type="number"
//                 placeholder="Point Threshold"
//                 value={m.threshold}
//                 disabled={!isEditMode}
//                 onChange={(e) => handleDynamicChange("milestoneRewards", i, "threshold", e.target.value)}
//                 className={inputStyle + " w-1/2"}
//                 min="0"
//               />
//               <input
//                 type="number"
//                 placeholder="$ Amount"
//                 value={m.amount}
//                 disabled={!isEditMode}
//                 onChange={(e) => handleDynamicChange("milestoneRewards", i, "amount", e.target.value)}
//                 className={inputStyle + " w-1/2"}
//                 min="0"
//               />
//               {isEditMode && (
//                 <FiTrash2
//                   className="text-red-500 cursor-pointer"
//                   onClick={() => removeField("milestoneRewards", i)}
//                 />
//               )}
//             </div>
//           ))}
//           {isEditMode && (
//             <button
//               type="button"
//               onClick={() => addField("milestoneRewards", { threshold: "", amount: "" })}
//               className="text-blue-500 text-sm mt-2"
//             >
//               + Add Milestone
//             </button>
//           )}
//         </div>

//         {/* Special Bonuses */}
//         <div>
//           <label className="block font-medium mb-2 text-purple-600">Special Bonuses</label>
//           {formData.specialBonuses.map((b, i) => (
//             // <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-2">
//             <div key={i} className="grid grid-cols-2 md:grid-cols-2 gap-1 items-center mb-1">
//               <label className="col-span-1 text-sm font-medium">Bonus name</label>
//               <label className="col-span-1 text-sm font-medium">Points</label>
              
//               {/* <label className="col-span-1"></label> */}
//               <input
//                 type="text"
//                 placeholder="Bonus Name"
//                 value={b.name}
//                 disabled={!isEditMode}
//                 onChange={(e) => handleDynamicChange("specialBonuses", i, "name", e.target.value)}
//                 className={inputStyle}
//               />
//               <input
//                 type="number"
//                 placeholder="Points"
//                 value={b.points}
//                 disabled={!isEditMode}
//                 onChange={(e) => handleDynamicChange("specialBonuses", i, "points", e.target.value)}
//                 className={inputStyle}
//                 min="0"
//               />
//               <label className="col-span-1 text-sm font-medium">Begin Date</label>
//               <label className="col-span-1 text-sm font-medium">End Date</label>
//               <input
//                 type="date"
//                 value={b.startDate}
//                 disabled={!isEditMode}
//                 onChange={(e) => handleDynamicChange("specialBonuses", i, "startDate", e.target.value)}
//                 className={inputStyle}
//                 min={new Date().toISOString().split("T")[0]} // today
//               />
//               <input
//                 type="date"
//                 value={b.endDate}
//                 disabled={!isEditMode}
//                 onChange={(e) => handleDynamicChange("specialBonuses", i, "endDate", e.target.value)}
//                 className={inputStyle}
//                 min={b.startDate || new Date().toISOString().split("T")[0]} // endDate ≥ beginDate
//               />
//               {isEditMode && (
//                 <FiTrash2
//                   className="text-red-500 cursor-pointer ml-2"
//                   onClick={() => removeField("specialBonuses", i)}
//                 />
//               )}
//             </div>
//           ))}
//           {isEditMode && (
//             <button
//               type="button"
//               onClick={() =>
//                 addField("specialBonuses", {
//                   name: "",
//                   points: "",
//                   startDate: "",
//                   endDate: "",
//                 })
//               }
//               className="text-blue-500 text-sm mt-2"
//             >
//               + Add Special Bonus
//             </button>
//           )}
//         </div>

//         {/* Coupon Promo Section */}
//         <div>
//           <label className="block font-medium mb-2 text-purple-600">Special Bonus Coupon Promotion</label>
//           <label className="text-sm font-medium">Description</label>
//           <textarea
//             name="bonusDescription"
//             rows="3"
//             placeholder="Bonus Description"
//             value={formData.bonusDescription}
//             onChange={handleChange}
//             disabled={!isEditMode}
//             className={inputStyle}
//           />
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
//             <div>
//               <label className="text-sm font-medium">Begin Date</label>
//               <input
//                 type="date"
//                 name="beginDate"
//                 value={formData.beginDate}
//                 onChange={handleChange}
//                 disabled={!isEditMode}
//                 className={inputStyle}
//                 min={new Date().toISOString().split("T")[0]} // today
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium">End Date</label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 disabled={!isEditMode}
//                 className={inputStyle}
//                 min={formData.beginDate || new Date().toISOString().split("T")[0]} // endDate ≥ beginDate
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Amount Off ($)</label>
//               <input
//                 type="number"
//                 name="amountOff"
//                 value={formData.amountOff}
//                 onChange={handleChange}
//                 disabled={!isEditMode}
//                 className={inputStyle}
//                 min="0"
//               />
//             </div>
//           </div>
//         </div>

//         {/* {isEditMode && (
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg font-bold mt-6"
//           >
//             Save Settings
//           </button>
//         )} */}
//       </form>
//       {/* Save Button */}
//       {isEditMode && (
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           className="w-full bg-purple-600 text-white py-2 rounded-lg font-bold mt-6"
//         >
//           💾 Save Settings
//         </button>
//       )}
//     </div>
//   );
// };

// export default Shopkeeper_setting;






import React, { useState, useEffect } from "react";
import { FiTrash2, FiX } from "react-icons/fi";

const inputStyle =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:outline-none transition duration-200";

const ShopkeeperSetting = () => {
  const [formData, setFormData] = useState({
    signUpBonusPoints: "",
    purchaseRewards: [{ threshold: "", points: "" }],
    milestoneRewards: [{ threshold: "", amount: "" }],
    specialBonuses: [{ name: "", points: "", startDate: "", endDate: "" }],
    bonusDescription: "",
    beginDate: "",
    endDate: "",
    amountOff: "",
    dollarToPointMapping: { dollar: 1, points: "" },
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const shopId = localStorage.getItem("id");

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const response = await fetch(
          `https://loyalty-backend-java.onrender.com/api/shop/get-setting/${shopId}`
        );
        if (response.ok) {
          const data = await response.json();
          setFormData({
            signUpBonusPoints: data.sign_upBonuspoints?.toString() || "",
            purchaseRewards: data.purchaseRewards || [{ threshold: "", points: "" }],
            milestoneRewards: data.milestoneRewards || [{ threshold: "", amount: "" }],
            specialBonuses: data.specialBonuses?.map((b) => ({
              name: b.name,
              points: b.points.toString(),
              startDate: b.startDate,
              endDate: b.endDate,
            })) || [{ name: "", points: "", startDate: "", endDate: "" }],
            bonusDescription: data.bonusdescription || "",
            beginDate: data.beginDate || "",
            endDate: data.endDate || "",
            amountOff: data.amountOff?.toString() || "",
            dollarToPointMapping: {
              dollar: 1,
              points: data.dollarToPointMapping?.points?.toString() || "",
            },
          });
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
  }, [shopId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.toLowerCase().includes("points") && parseFloat(value) < 0) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDollarToPointChange = (e) => {
    const { value } = e.target;
    if (parseFloat(value) < 0) return;
    setFormData((prev) => ({
      ...prev,
      dollarToPointMapping: { ...prev.dollarToPointMapping, points: value },
    }));
  };

  const handleDynamicChange = (type, index, field, value) => {
    const updated = [...formData[type]];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, [type]: updated }));
  };

  const addField = (type, emptyObj) => {
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], emptyObj] }));
  };

  const removeField = (type, index) => {
    const updated = formData[type].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [type]: updated }));
  };

  const isValid = () => {
    const hasNegative = [
      ...formData.purchaseRewards,
      ...formData.milestoneRewards,
      ...formData.specialBonuses,
    ].some((item) => parseFloat(item.points || item.amount || item.threshold) < 0);

    if (hasNegative) {
      alert("❌ Points, thresholds, or amounts cannot be negative.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    const payload = {
      shopId: parseInt(shopId),
      sign_upBonuspoints: parseFloat(formData.signUpBonusPoints) || 0,
      purchaseRewards: formData.purchaseRewards.map((r) => ({
        threshold: parseFloat(r.threshold) || 0,
        points: parseFloat(r.points) || 0,
      })),
      milestoneRewards: formData.milestoneRewards.map((m) => ({
        threshold: parseFloat(m.threshold) || 0,
        amount: parseFloat(m.amount) || 0,
      })),
      specialBonuses: formData.specialBonuses.map((b) => ({
        name: b.name,
        points: parseFloat(b.points) || 0,
        startDate: b.startDate,
        endDate: b.endDate,
      })),
      bonusdescription: formData.bonusDescription,
      beginDate: formData.beginDate,
      endDate: formData.endDate,
      amountOff: parseFloat(formData.amountOff) || 0,
      dollarToPointMapping: {
        dollar: 1,
        points: parseFloat(formData.dollarToPointMapping.points) || 0,
      },
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
        setIsEditMode(false);
      } else {
        alert("❌ Error saving settings.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("⚠️ Server error");
    }
  };

  const handleCloseEdit = () => {
    setIsEditMode(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-purple-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      <nav className="bg-purple-700 text-white px-8 py-3 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Shopkeeper Settings</h2>
        <div className="flex items-center gap-4">
          {!isEditMode ? (
            <button
              onClick={() => setIsEditMode(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
            >
              <span>✏️ Edit</span>
            </button>
          ) : (
            <button
              onClick={handleCloseEdit}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
            >
              {/* <FiX className="w-5 h-5" /> */}
              <span>Close</span>
            </button>
          )}
        </div>
      </nav>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Signup Bonus */}
          <div>
            <label className="block font-medium mb-2 text-purple-700">Sign-up Bonus Points</label>
            <input
              type="number"
              name="signUpBonusPoints"
              value={formData.signUpBonusPoints}
              onChange={handleChange}
              disabled={!isEditMode}
              className={inputStyle}
              min="0"
            />
          </div>

          {/* Dollar to Point Mapping */}
          <div>
            <label className="block font-medium mb-2 text-purple-700">Dollar to Point Mapping</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={formData.dollarToPointMapping.dollar}
                disabled
                className={inputStyle + " bg-gray-100"}
                min="0"
              />
              <input
                type="number"
                placeholder="Points per $1"
                value={formData.dollarToPointMapping.points}
                onChange={handleDollarToPointChange}
                disabled={!isEditMode}
                className={inputStyle}
                min="0"
              />
            </div>
          </div>

          {/* Purchase Rewards */}
          <div>
            <label className="block font-medium mb-2 text-purple-700">Purchase-Based Rewards</label>
            {formData.purchaseRewards.map((r, i) => (
              <div key={i} className="flex items-center gap-2 mb-3">
                <span className="w-6 text-sm font-medium text-purple-700">{i + 1}.</span>
                <input
                  type="number"
                  placeholder="Threshold ($)"
                  value={r.threshold}
                  disabled={!isEditMode}
                  onChange={(e) => handleDynamicChange("purchaseRewards", i, "threshold", e.target.value)}
                  className={inputStyle}
                  min="0"
                />
                <input
                  type="number"
                  placeholder="Points"
                  value={r.points}
                  disabled={!isEditMode}
                  onChange={(e) => handleDynamicChange("purchaseRewards", i, "points", e.target.value)}
                  className={inputStyle}
                  min="0"
                />
                {isEditMode && (
                  <FiTrash2
                    className="text-red-500 hover:text-red-600 cursor-pointer w-8 h-10"
                    onClick={() => removeField("purchaseRewards", i)}
                  />
                )}
              </div>
            ))}
            {isEditMode && (
              <button
                type="button"
                onClick={() => addField("purchaseRewards", { threshold: "", points: "" })}
                className="text-purple-600 hover:text-blue-700 text-sm mt-2 font-medium"
              >
                + Add Purchase Reward
              </button>
            )}
          </div>

          {/* Milestone Rewards */}
          <div>
            <label className="block font-medium mb-2 text-purple-700">Milestone Rewards</label>
            {formData.milestoneRewards.map((m, i) => (
              <div key={i} className="flex items-center gap-2 mb-3">
                <span className="w-6 text-sm font-medium text-purple-700">{i + 1}.</span>
                <input
                  type="number"
                  placeholder="Point Threshold"
                  value={m.threshold}
                  disabled={!isEditMode}
                  onChange={(e) => handleDynamicChange("milestoneRewards", i, "threshold", e.target.value)}
                  className={inputStyle}
                  min="0"
                />
                <input
                  type="number"
                  placeholder="$ Amount"
                  value={m.amount}
                  disabled={!isEditMode}
                  onChange={(e) => handleDynamicChange("milestoneRewards", i, "amount", e.target.value)}
                  className={inputStyle}
                  min="0"
                />
                {isEditMode && (
                  <FiTrash2
                    className="text-red-500 hover:text-red-600 cursor-pointer w-8 h-10"
                    onClick={() => removeField("milestoneRewards", i)}
                  />
                )}
              </div>
            ))}
            {isEditMode && (
              <button
                type="button"
                onClick={() => addField("milestoneRewards", { threshold: "", amount: "" })}
                className="text-purple-600 hover:text-blue-700 text-sm mt-2 font-medium"
              >
                + Add Milestone
              </button>
            )}
          </div>

          {/* Special Bonuses */}
          <div>
            <label className="block font-medium mb-2 text-purple-700">Special Bonuses</label>
            {formData.specialBonuses.map((b, i) => (
              <div key={i} className="flex items-center gap-2 mb-3">
                <span className="w-6 text-sm font-medium text-purple-700">{i + 1}.</span>
                <input
                  type="text"
                  placeholder="Bonus Name"
                  value={b.name}
                  disabled={!isEditMode}
                  onChange={(e) => handleDynamicChange("specialBonuses", i, "name", e.target.value)}
                  className={inputStyle}
                />
                <input
                  type="number"
                  placeholder="Points"
                  value={b.points}
                  disabled={!isEditMode}
                  onChange={(e) => handleDynamicChange("specialBonuses", i, "points", e.target.value)}
                  className={inputStyle}
                  min="0"
                />
                <input
                  type="date"
                  value={b.startDate}
                  disabled={!isEditMode}
                  onChange={(e) => handleDynamicChange("specialBonuses", i, "startDate", e.target.value)}
                  className={inputStyle}
                  min={new Date().toISOString().split("T")[0]}
                />
                <input
                  type="date"
                  value={b.endDate}
                  disabled={!isEditMode}
                  onChange={(e) => handleDynamicChange("specialBonuses", i, "endDate", e.target.value)}
                  className={inputStyle}
                  min={b.startDate || new Date().toISOString().split("T")[0]}
                />
                {isEditMode && (
                  <FiTrash2
                    className="text-red-500 hover:text-red-600 cursor-pointer w-20 h-24"
                    onClick={() => removeField("specialBonuses", i)}
                  />
                )}
              </div>
            ))}
            {isEditMode && (
              <button
                type="button"
                onClick={() =>
                  addField("specialBonuses", {
                    name: "",
                    points: "",
                    startDate: "",
                    endDate: "",
                  })
                }
                className="text-purple-600 hover:text-blue-700 text-sm mt-2 font-medium"
              >
                + Add Special Bonus
              </button>
            )}
          </div>

          {/* Coupon Promo Section */}
          <div>
            <label className="block font-medium mb-2 text-purple-700">Special Bonus Coupon Promotion</label>
            <label className="block text-sm font-medium mb-1 text-purple-700">Description</label>
            <textarea
              name="bonusDescription"
              rows="3"
              placeholder="Bonus Description"
              value={formData.bonusDescription}
              onChange={handleChange}
              disabled={!isEditMode}
              className={inputStyle}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-purple-700">Begin Date</label>
                <input
                  type="date"
                  name="beginDate"
                  value={formData.beginDate}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={inputStyle}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-purple-700">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={inputStyle}
                  min={formData.beginDate || new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-purple-700">Amount Off ($)</label>
                <input
                  type="number"
                  name="amountOff"
                  value={formData.amountOff}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={inputStyle}
                  min="0"
                />
              </div>
            </div>
          </div>

          {isEditMode && (
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              💾 Save Settings
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ShopkeeperSetting;