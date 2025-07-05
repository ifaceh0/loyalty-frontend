import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

const inputStyle =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:outline-none";

const Shopkeeper_setting = () => {
  const [formData, setFormData] = useState({
    signUpBonusPoints: "",
    purchaseRanges: [{ min: "", max: "", points: "" }],
    milestoneRewards: [{ threshold: "", amount: "" }],
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
        const response = await fetch(
          `https://loyalty-backend-java.onrender.com/api/shop/get-setting/${shopId}`
        );
        if (response.ok) {
          const data = await response.json();
          setFormData({
            signUpBonusPoints: data.sign_upBonuspoints?.toString() || "",
            purchaseRanges: data.purchaseRanges || [{ min: "", max: "", points: "" }],
            milestoneRewards: data.milestoneRewards || [{ threshold: "", amount: "" }],
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDynamicChange = (type, index, field, value) => {
    const updated = [...formData[type]];
    updated[index][field] = value;
    setFormData({ ...formData, [type]: updated });
  };

  const addField = (type, emptyObj) => {
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], emptyObj] }));
  };

  const removeField = (type, index) => {
    const updated = formData[type].filter((_, i) => i !== index);
    setFormData({ ...formData, [type]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      shopId: parseInt(shopId),
      sign_upBonuspoints: parseFloat(formData.signUpBonusPoints),
      purchaseRanges: formData.purchaseRanges.map((p) => ({
        min: parseFloat(p.min),
        max: parseFloat(p.max),
        points: parseFloat(p.points),
      })),
      milestoneRewards: formData.milestoneRewards.map((m) => ({
        threshold: parseFloat(m.threshold),
        amount: parseFloat(m.amount),
      })),
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
        alert("Settings saved successfully!");
        setIsEditMode(false);
      } else {
        alert("Error saving settings.");
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-xl">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold text-purple-700">Shopkeeper Settings</h2>
        {!isEditMode && (
          <button onClick={() => setIsEditMode(true)} className="bg-purple-600 text-white px-6 py-2 rounded-lg">
            Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium">Sign-up Bonus Points</label>
          <input
            type="number"
            name="signUpBonusPoints"
            value={formData.signUpBonusPoints}
            onChange={handleChange}
            disabled={!isEditMode}
            className={inputStyle}
          />
        </div>

        {/* Purchase Ranges */}
        <div>
          <label className="block font-medium mb-1">Purchase Ranges</label>
          {formData.purchaseRanges.map((r, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <input type="number" placeholder="Min $" value={r.min} disabled={!isEditMode} onChange={(e) => handleDynamicChange("purchaseRanges", i, "min", e.target.value)} className={inputStyle + " w-1/4"} />
              <input type="number" placeholder="Max $" value={r.max} disabled={!isEditMode} onChange={(e) => handleDynamicChange("purchaseRanges", i, "max", e.target.value)} className={inputStyle + " w-1/4"} />
              <input type="number" placeholder="Points" value={r.points} disabled={!isEditMode} onChange={(e) => handleDynamicChange("purchaseRanges", i, "points", e.target.value)} className={inputStyle + " w-1/4"} />
              {isEditMode && <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => removeField("purchaseRanges", i)} />}
            </div>
          ))}
          {isEditMode && <button type="button" onClick={() => addField("purchaseRanges", { min: "", max: "", points: "" })} className="text-blue-500 text-sm mt-2">+ Add Range</button>}
        </div>

        {/* Milestone Rewards */}
        <div>
          <label className="block font-medium mb-1">Milestone Rewards</label>
          {formData.milestoneRewards.map((m, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <input type="number" placeholder="Point Threshold" value={m.threshold} disabled={!isEditMode} onChange={(e) => handleDynamicChange("milestoneRewards", i, "threshold", e.target.value)} className={inputStyle + " w-1/2"} />
              <input type="number" placeholder="$ Amount" value={m.amount} disabled={!isEditMode} onChange={(e) => handleDynamicChange("milestoneRewards", i, "amount", e.target.value)} className={inputStyle + " w-1/2"} />
              {isEditMode && <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => removeField("milestoneRewards", i)} />}
            </div>
          ))}
          {isEditMode && <button type="button" onClick={() => addField("milestoneRewards", { threshold: "", amount: "" })} className="text-blue-500 text-sm mt-2">+ Add Milestone</button>}
        </div>

        {/* Bonus Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="specialBonusName" value={formData.specialBonusName} onChange={handleChange} disabled={!isEditMode} placeholder="Special Bonus Name" className={inputStyle} />
          <input type="number" name="specialBonusPoints" value={formData.specialBonusPoints} onChange={handleChange} disabled={!isEditMode} placeholder="Special Bonus Points" className={inputStyle} />
          <input type="date" name="specialBonusStartDate" value={formData.specialBonusStartDate} onChange={handleChange} disabled={!isEditMode} className={inputStyle} />
          <input type="date" name="specialBonusEndDate" value={formData.specialBonusEndDate} onChange={handleChange} disabled={!isEditMode} className={inputStyle} />
        </div>

        <textarea name="bonusDescription" rows="3" placeholder="Bonus Description" value={formData.bonusDescription} onChange={handleChange} disabled={!isEditMode} className={inputStyle} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="date" name="beginDate" value={formData.beginDate} onChange={handleChange} disabled={!isEditMode} className={inputStyle} />
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} disabled={!isEditMode} className={inputStyle} />
        </div>

        <input type="number" name="amountOff" value={formData.amountOff} onChange={handleChange} disabled={!isEditMode} placeholder="Amount Off ($)" className={inputStyle} />

        {isEditMode && (
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg font-bold mt-6">
            Save Settings
          </button>
        )}
      </form>
    </div>
  );
};

export default Shopkeeper_setting;
