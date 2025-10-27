// import React, { useEffect, useState } from "react";
// import { FiTrash2 } from "react-icons/fi";

// const ShopkeeperProfile = () => {
//   const [formData, setFormData] = useState({
//     shopId: "",
//     shopName: "",
//     email: "",
//     phone: "",
//     companyName: "",
//     companyAddress: "",
//     companyEmail: "",
//     companyPhone: "",
//     city: "",
//     country: "",
//     logoImage: null, // Base64 string for display
//   });

//   const [originalData, setOriginalData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isRemoving, setIsRemoving] = useState(false);

//   // Fetch profile on mount
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = () => {
//     const storedId = localStorage.getItem("id");
//     if (!storedId) {
//       alert("⚠️ Shop ID not found in localStorage.");
//       return;
//     }

//     setLoading(true);
//     fetch(`https://loyalty-backend-java.onrender.com/api/shop/get-profile?shopId=${storedId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setFormData(data);
//         setOriginalData(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error loading profile", err);
//         setLoading(false);
//         alert("⚠️ Failed to load profile");
//       });
//   };

//   const handleChange = (e) => {
//     if (!isEditing) return;
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const uploadImage = async () => {
//     const storedId = localStorage.getItem("id");
//     if (!storedId || !selectedFile) return;

//     setIsUploading(true);
//     const formDataUpload = new FormData();
//     formDataUpload.append("shopId", storedId);
//     formDataUpload.append("file", selectedFile);

//     try {
//       const res = await fetch("https://loyalty-backend-java.onrender.com/api/shop/upload-image", {
//         method: "POST",
//         body: formDataUpload,
//       });
//       const data = await res.json();

//       if (res.ok && data.status === "success") {
//         alert("✅ " + data.message);
//         fetchProfile(); // Refetch to update display
//         setSelectedFile(null);
//       } else {
//         alert("❌ " + (data.message || "Failed to upload image"));
//       }
//     } catch (err) {
//       console.error("Upload error", err);
//       alert("⚠️ Network error during image upload");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const removeImage = async () => {
//     const storedId = localStorage.getItem("id");
//     if (!storedId) return;

//     setIsRemoving(true);
//     try {
//       const res = await fetch(`https://loyalty-backend-java.onrender.com/api/shop/remove-image?shopId=${storedId}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();

//       if (res.ok && data.status === "success") {
//         alert("✅ " + data.message);
//         fetchProfile(); // Refetch to update display
//       } else {
//         alert("❌ " + (data.message || "Failed to remove image"));
//       }
//     } catch (err) {
//       console.error("Remove error", err);
//       alert("⚠️ Network error during image removal");
//     } finally {
//       setIsRemoving(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Exclude logoImage from the body to avoid sending large base64
//     const { logoImage, ...submitData } = formData;

//     try {
//       const res = await fetch("https://loyalty-backend-java.onrender.com/api/shop/update-profile", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(submitData),
//       });

//       if (res.ok) {
//         alert("✅ Profile updated successfully!");
//         setOriginalData(formData);
//         setIsEditing(false);
//       } else {
//         alert("❌ Failed to update profile");
//       }
//     } catch (err) {
//       console.error("Submit error", err);
//       alert("⚠️ Network error");
//     }
//   };

//   const handleCancel = () => {
//     setFormData(originalData);
//     setIsEditing(false);
//     setSelectedFile(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="w-10 h-10 border-4 border-purple-600 border-dashed rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden mt-10">
//       <nav className="bg-purple-700 text-white px-8 py-4 flex justify-between items-center">
//         <h2 className="text-2xl font-bold">🧾 Shopkeeper Profile</h2>
//         <div className="flex items-center gap-4">
//           {!isEditing ? (
//             <button
//               className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
//               onClick={() => setIsEditing(true)}
//             >
//               <span>✏️ Edit</span>
//             </button>
//           ) : (
//             <button
//               type="button"
//               className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
//               onClick={handleCancel}
//             >
//               <span>Close</span>
//             </button>
//           )}
//         </div>
//       </nav>

//       <div className="p-8">
//         <form onSubmit={handleSubmit} id="profile-form" className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {/* Logo Display and Upload */}
//             <div className="sm:col-span-1">
//               <label className="block text-sm font-medium mb-1 text-purple-700">Shop Logo</label>
//               {formData.logoImage ? (
//                 <div className="relative flex items-center gap-4">
//                   <img
//                     src={`data:image/jpeg;base64,${formData.logoImage}`}
//                     alt="Shop Logo"
//                     className="w-24 h-24 object-contain rounded-lg border border-purple-300 shadow-sm"
//                   />
//                   {isEditing && (
//                     <button
//                       type="button"
//                       onClick={removeImage}
//                       disabled={isRemoving}
//                       className={`bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition duration-200 ${
//                         isRemoving ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                     >
//                       <FiTrash2 className="w-4 h-4" />
//                       {isRemoving ? "Removing..." : "Delete"}
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm border border-gray-300">
//                   <span>No Logo</span>
//                 </div>
//               )}
//               {isEditing && (
//                 <div className="mt-2 flex items-center gap-4">
//                   <input
//                     type="file"
//                     accept="image/jpeg,image/png"
//                     onChange={handleFileChange}
//                     className="text-sm"
//                   />
//                   {selectedFile && (
//                     <button
//                       type="button"
//                       onClick={uploadImage}
//                       disabled={isUploading}
//                       className={`bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition duration-200 ${
//                         isUploading ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                     >
//                       {isUploading ? "Updating..." : "Save Logo"}
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>

//             <Input
//               label="Shop Name"
//               name="shopName"
//               value={formData.shopName}
//               onChange={handleChange}
//               disabled={!isEditing}
//               required
//             />
//             <Input
//               label="Personal Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               disabled={!isEditing}
//               required
//               type="email"
//             />
//             <Input
//               label="Personal Phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               disabled={!isEditing}
//               required
//               pattern="[0-9]{10}"
//             />
//             <Input
//               label="Company Name"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               disabled={!isEditing}
//             />
//             <Input
//               label="Company Phone"
//               name="companyPhone"
//               value={formData.companyPhone}
//               onChange={handleChange}
//               disabled={!isEditing}
//             />
//             <Input
//               label="City"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               disabled={!isEditing}
//             />
//             <Input
//               label="Country"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               disabled={!isEditing}
//             />
//             <div className="sm:col-span-2">
//               <label className="block text-sm font-medium mb-1 text-purple-700">Company Address</label>
//               <textarea
//                 name="companyAddress"
//                 value={formData.companyAddress}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 placeholder="Company Address"
//                 rows={3}
//                 className={`w-full px-4 py-2 border border-gray-300 rounded-lg resize-none outline-none transition duration-200 ${
//                   isEditing ? "focus:ring-2 focus:ring-purple-400" : "bg-gray-100"
//                 }`}
//               />
//             </div>
//           </div>
//           {isEditing && (
//             <button
//               type="submit"
//               className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition duration-200 mt-6"
//             >
//               💾 Save Profile
//             </button>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// const Input = ({ label, name, value, onChange, type = "text", disabled = false, required = false, pattern }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1 text-purple-700">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       disabled={disabled}
//       required={required}
//       pattern={pattern}
//       placeholder={label}
//       className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition duration-200 ${
//         disabled ? "bg-gray-100" : "focus:ring-2 focus:ring-purple-400"
//       }`}
//     />
//   </div>
// );

// export default ShopkeeperProfile;









import React, { useEffect, useState } from "react";
import { 
    FiTrash2, 
    FiEdit3, 
    FiSave, 
    FiX, 
    FiUploadCloud, 
    FiRefreshCw, 
    FiAlertCircle,
    FiUser,
    FiBriefcase
} from "react-icons/fi";

// --- Custom Components & Styles ---
const inputStyle = (isEditing) => 
  `w-full px-4 py-3 border rounded-xl outline-none transition duration-200 shadow-sm text-gray-800 ${
    isEditing ? "border-blue-400 focus:ring-2 focus:ring-blue-500/50" : "border-gray-200 bg-gray-100 cursor-default"
  }`;

const SectionWrapper = ({ title, children, icon, className = "" }) => (
  <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-lg ${className}`}>
    <h3 className="text-xl font-bold text-blue-700 border-b pb-3 mb-4 flex items-center gap-2">
      {icon} {title}
    </h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InputField = ({ label, name, value, onChange, type = "text", disabled = false, required = false, pattern }) => (
  <div>
    <label className="block text-sm font-semibold mb-1 text-gray-700">{label}{required && <span className="text-red-500"> *</span>}</label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      required={required}
      pattern={pattern}
      placeholder={label}
      className={inputStyle(!disabled)}
    />
  </div>
);

// --- NEW: Phone Input with 10-digit Validation ---
const PhoneInputField = ({ label, name, value, onChange, disabled = false, required = false }) => {
  const [error, setError] = useState("");

  const validatePhone = (val) => {
    const digitsOnly = val.replace(/\D/g, "");
    if (val && !/^\d{0,10}$/.test(val)) {
      setError("Only digits allowed (0-9)");
    } else if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
      setError("Phone must be exactly 10 digits");
    } else {
      setError("");
    }
    return digitsOnly;
  };

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    if (!/^\d*$/.test(inputValue)) return;
    if (inputValue.length > 10) inputValue = inputValue.slice(0, 10);
    const formatted = validatePhone(inputValue);
    onChange({ target: { name, value: formatted } });
  };

  return (
    <div>
      <label className="block text-sm font-semibold mb-1 text-gray-700">
        {label}{required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type="text"
        inputMode="numeric"
        name={name}
        value={value || ""}
        onChange={handleInputChange}
        disabled={disabled}
        required={required}
        placeholder="Enter 10-digit mobile number"
        maxLength={10}
        className={`${inputStyle(!disabled)} ${
          error ? "border-red-400 focus:ring-2 focus:ring-red-500/50" : ""
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {value && value.length === 10 && !error && (
        <p className="mt-1 text-xs text-green-600">Valid 10-digit number</p>
      )}
    </div>
  );
};

// --- Main Component ---
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
    logoImage: null, 
  });

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Data Fetching ---
  const fetchProfile = async () => {
    const storedId = localStorage.getItem("id");
    if (!storedId) {
      alert("Warning: Shop ID not found. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://loyalty-backend-java.onrender.com/api/shop/get-profile?shopId=${storedId}`);
      if (!res.ok) throw new Error("Failed to fetch profile");
      
      const data = await res.json();
      const dataWithDefaults = { ...data, companyEmail: data.companyEmail || data.email };

      setFormData(dataWithDefaults);
      setOriginalData(dataWithDefaults);
    } catch (err) {
      console.error("Error loading profile", err);
      alert("Warning: Failed to load profile. Please try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // --- Handlers ---
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
        alert("Logo updated successfully!");
        fetchProfile(); 
        setSelectedFile(null);
      } else {
        alert("Failed: " + (data.message || "Failed to upload logo"));
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("Warning: Network error during image upload or reduce the image size.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = async () => {
    const storedId = localStorage.getItem("id");
    if (!storedId || !window.confirm("Are you sure you want to remove the shop logo?")) return;

    setIsRemoving(true);
    try {
      const res = await fetch(`https://loyalty-backend-java.onrender.com/api/shop/remove-image?shopId=${storedId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.status === "success") {
        alert("Logo removed!");
        fetchProfile(); 
      } else {
        alert("Failed: " + (data.message || "Failed to remove logo"));
      }
    } catch (err) {
      console.error("Remove error", err);
      alert("Warning: Network error during logo removal");
    } finally {
      setIsRemoving(false);
    }
  };

  // --- UPDATED: handleSubmit with 10-digit phone validation ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Personal Phone (required)
    const phoneDigits = (formData.phone || "").replace(/\D/g, "");
    if (formData.phone && phoneDigits.length !== 10) {
      alert("Error: Personal phone must be exactly 10 digits.");
      return;
    }

    // Validate Company Phone (optional, but if entered → must be 10 digits)
    const companyPhoneDigits = (formData.companyPhone || "").replace(/\D/g, "");
    if (formData.companyPhone && companyPhoneDigits.length > 0 && companyPhoneDigits.length !== 10) {
      alert("Error: Company phone must be exactly 10 digits.");
      return;
    }

    setIsSubmitting(true);
    
    const { logoImage, ...submitData } = formData;
    
    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/shop/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        alert("Profile updated successfully!");
        setOriginalData(formData);
        setIsEditing(false);
      } else {
        alert("Failed: Failed to update profile. Check server logs.");
      }
    } catch (err) {
      console.error("Submit error", err);
      alert("Warning: Network error: Could not connect to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    setSelectedFile(null); 
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiRefreshCw className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="ml-4 text-blue-600 font-medium">Loading Shop Profile...</p>
      </div>
    );
  }

  // --- Render ---
  return (
    <div className="max-w-5xl mx-auto bg-gray-50 rounded-xl shadow-2xl overflow-hidden mt-10">
      {/* Header/Navigation */}
      <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-extrabold flex items-center gap-3">
          <FiUser className="w-6 h-6"/> Shop Profile & Branding
        </h2>
        <div className="flex items-center gap-3">
            {isEditing && (
                <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2 font-semibold shadow-md"
                onClick={handleCancel}
                disabled={isSubmitting}
                >
                <FiX className="w-5 h-5" />
                <span>Cancel</span>
                </button>
            )}

            {isEditing && (
                <button
                type="submit"
                form="profile-form"
                className={`text-white px-5 py-2 rounded-lg transition duration-200 flex items-center gap-2 font-semibold shadow-md ${
                    isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                }`}
                disabled={isSubmitting}
                >
                {isSubmitting ? (
                    <>
                    <FiRefreshCw className="w-5 h-5 animate-spin" />
                    <span>Saving...</span>
                    </>
                ) : (
                    <>
                    <FiSave className="w-5 h-5" />
                    <span>Save Profile</span>
                    </>
                )}
                </button>
            )}
            
            {!isEditing && (
                <button
                type="button"
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg transition duration-200 flex items-center gap-2 font-semibold shadow-md"
                onClick={() => setIsEditing(true)}
                >
                <FiEdit3 className="w-5 h-5" />
                <span>Edit Profile</span>
                </button>
            )}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="p-8 space-y-8">
        <form onSubmit={handleSubmit} id="profile-form" className="space-y-8">
          
          {/* Section 1: Logo and Shop Name */}
          <SectionWrapper 
            title="Branding & Visual Identity" 
            icon={<FiUploadCloud className="w-6 h-6"/>}
            // className="grid md:grid-cols-3 gap-6"
          >
            {/* Logo Management */}
            <div className="md:col-span-1 bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300">
                <label className="block text-sm font-bold mb-3 text-blue-700">Shop Logo / Icon</label>
                
                <div className="flex items-center gap-4 mb-3">
                    {formData.logoImage ? (
                    <img
                        src={`data:image/jpeg;base64,${formData.logoImage}`}
                        alt="Shop Logo"
                        className="w-24 h-24 object-contain p-1 bg-white rounded-lg border-2 border-gray-300 shadow-md"
                    />
                    ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-500 text-xs border border-gray-400">
                        <FiAlertCircle className="w-6 h-6 mb-1"/>
                        <span>No Logo Set</span>
                    </div>
                    )}
                </div>

                {isEditing && (
                    <div className="space-y-3">
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleFileChange}
                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        
                        <div className="flex gap-2">
                            {selectedFile && (
                                <button
                                    type="button"
                                    onClick={uploadImage}
                                    disabled={isUploading}
                                    className={`flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 text-sm transition ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {isUploading ? "Uploading..." : "Upload New Logo"}
                                </button>
                            )}
                            {formData.logoImage && (
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    disabled={isRemoving}
                                    className={`bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 text-sm transition ${isRemoving ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                    {isRemoving ? "Removing..." : "Remove"}
                                </button>
                            )}
                        </div>
                        {selectedFile && <p className="text-xs text-gray-600">File ready: **{selectedFile.name}**</p>}
                    </div>
                )}
            </div>

            {/* Shop Details */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Shop Display Name"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />

                {/* CHANGED: Personal Phone → PhoneInputField */}
                <PhoneInputField
                  label="Personal Contact Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />

                <InputField
                  label="Personal Login Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  type="email"
                />
            </div>
          </SectionWrapper>

          {/* Section 2: Company/Legal Information */}
          <SectionWrapper title="Business & Address Details" icon={<FiBriefcase className="w-6 h-6"/>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Legal Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                {/* CHANGED: Company Phone → PhoneInputField */}
                <PhoneInputField
                  label="Company Contact Phone"
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <InputField
                  label="Company Email (for receipts/invoices)"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  disabled={!isEditing}
                  type="email"
                />
                <InputField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <InputField
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold mb-1 text-gray-700">Full Business Address</label>
                    <textarea
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Street Address, P.O. Box, etc."
                    rows={3}
                    className={inputStyle(isEditing) + " resize-none"}
                    />
                </div>
            </div>
          </SectionWrapper>
        </form>
      </div>
    </div>
  );
};

export default ShopkeeperProfile;