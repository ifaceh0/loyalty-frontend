import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

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
    city: "",
    country: "",
    logoImage: null, // Base64 string for display
  });

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    const storedId = localStorage.getItem("id");
    if (!storedId) {
      alert("⚠️ Shop ID not found in localStorage.");
      return;
    }

    setLoading(true);
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
        alert("⚠️ Failed to load profile");
      });
  };

  const handleChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    const storedId = localStorage.getItem("id");
    if (!storedId || !selectedFile) return;

    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("shopId", storedId);
    formDataUpload.append("file", selectedFile);

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/shop/upload-image", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();

      if (res.ok && data.status === "success") {
        alert("✅ " + data.message);
        fetchProfile(); // Refetch to update display
        setSelectedFile(null);
      } else {
        alert("❌ " + (data.message || "Failed to upload image"));
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("⚠️ Network error during image upload");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = async () => {
    const storedId = localStorage.getItem("id");
    if (!storedId) return;

    setIsRemoving(true);
    try {
      const res = await fetch(`https://loyalty-backend-java.onrender.com/api/shop/remove-image?shopId=${storedId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.status === "success") {
        alert("✅ " + data.message);
        fetchProfile(); // Refetch to update display
      } else {
        alert("❌ " + (data.message || "Failed to remove image"));
      }
    } catch (err) {
      console.error("Remove error", err);
      alert("⚠️ Network error during image removal");
    } finally {
      setIsRemoving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Exclude logoImage from the body to avoid sending large base64
    const { logoImage, ...submitData } = formData;

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/shop/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
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
    setSelectedFile(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-purple-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden mt-10">
      <nav className="bg-purple-700 text-white px-8 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">🧾 Shopkeeper Profile</h2>
        <div className="flex items-center gap-4">
          {!isEditing ? (
            <button
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
              onClick={() => setIsEditing(true)}
            >
              <span>✏️ Edit</span>
            </button>
          ) : (
            <button
              type="button"
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
              onClick={handleCancel}
            >
              <span>Close</span>
            </button>
          )}
        </div>
      </nav>

      <div className="p-8">
        <form onSubmit={handleSubmit} id="profile-form" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Logo Display and Upload */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium mb-1 text-purple-700">Shop Logo</label>
              {formData.logoImage ? (
                <div className="relative flex items-center gap-4">
                  <img
                    src={`data:image/jpeg;base64,${formData.logoImage}`}
                    alt="Shop Logo"
                    className="w-24 h-24 object-contain rounded-lg border border-purple-300 shadow-sm"
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={removeImage}
                      disabled={isRemoving}
                      className={`bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition duration-200 ${
                        isRemoving ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <FiTrash2 className="w-4 h-4" />
                      {isRemoving ? "Removing..." : "Delete"}
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm border border-gray-300">
                  <span>No Logo</span>
                </div>
              )}
              {isEditing && (
                <div className="mt-2 flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                    className="text-sm"
                  />
                  {selectedFile && (
                    <button
                      type="button"
                      onClick={uploadImage}
                      disabled={isUploading}
                      className={`bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition duration-200 ${
                        isUploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isUploading ? "Updating..." : "Save Logo"}
                    </button>
                  )}
                </div>
              )}
            </div>

            <Input
              label="Shop Name"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
            <Input
              label="Personal Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              required
              type="email"
            />
            <Input
              label="Personal Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              required
              pattern="[0-9]{10}"
            />
            <Input
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Company Phone"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1 text-purple-700">Company Address</label>
              <textarea
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Company Address"
                rows={3}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg resize-none outline-none transition duration-200 ${
                  isEditing ? "focus:ring-2 focus:ring-purple-400" : "bg-gray-100"
                }`}
              />
            </div>
          </div>
          {isEditing && (
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition duration-200 mt-6"
            >
              💾 Save Profile
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = "text", disabled = false, required = false, pattern }) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-purple-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      pattern={pattern}
      placeholder={label}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition duration-200 ${
        disabled ? "bg-gray-100" : "focus:ring-2 focus:ring-purple-400"
      }`}
    />
  </div>
);

export default ShopkeeperProfile;