import React, { useEffect, useState } from "react";

const ShopkeeperProfile = () => {
  const [formData, setFormData] = useState({
    shopId: "",
    shopName: "",
    email: "",
    phone: "",
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    companyPhone: "",
  });

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch profile on mount
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (!storedId) {
      alert("⚠️ Shop ID not found in localStorage.");
      return;
    }

    fetch(`https://loyalty-backend-java.onrender.com/api/shop/get-profile?shopId=${storedId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setOriginalData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading profile", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/shop/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Profile updated successfully!");
        setOriginalData(formData);
        setIsEditing(false);
      } else {
        alert("❌ Failed to update profile");
      }
    } catch (err) {
      console.error("Submit error", err);
      alert("⚠️ Network error");
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-fuchsia-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-fuchsia-100 mt-10">
      <h2 className="text-3xl font-bold text-fuchsia-700 mb-6 text-center">🧾 Shopkeeper Profile</h2>

      <div className="text-right mb-4">
        {!isEditing ? (
          <button
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit
          </button>
        ) : (
          <div className="space-x-3">
            <button
              form="profile-form"
              type="submit"
              className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              💾 Save
            </button>
            <button
              type="button"
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              onClick={handleCancel}
            >
              ❌
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} id="profile-form" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input label="Shop Name" name="shopName" value={formData.shopName} onChange={handleChange} disabled={!isEditing} required />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} required type="email" />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} required pattern="[0-9]{10}" />
          <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} disabled={!isEditing} />
          <Input label="Company Email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} disabled={!isEditing} type="email" />
          <Input label="Company Phone" name="companyPhone" value={formData.companyPhone} onChange={handleChange} disabled={!isEditing} />
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Company Address</label>
            <textarea
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Company Address"
              rows={3}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg resize-none outline-none ${
                isEditing ? "focus:ring-2 focus:ring-fuchsia-400" : "bg-gray-100"
              }`}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = "text", disabled = false, required = false, pattern }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      pattern={pattern}
      placeholder={label}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none ${
        disabled ? "bg-gray-100" : "focus:ring-2 focus:ring-fuchsia-400"
      }`}
    />
  </div>
);

export default ShopkeeperProfile;