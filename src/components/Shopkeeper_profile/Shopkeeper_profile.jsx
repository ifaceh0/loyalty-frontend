// import React, { useEffect, useState } from "react";
// import { 
//     FiTrash2, 
//     FiEdit3, 
//     FiSave, 
//     FiX, 
//     FiUploadCloud, 
//     FiLoader, 
//     FiAlertCircle,
//     FiUser,
//     FiBriefcase
// } from "react-icons/fi";

// // --- Custom Components & Styles ---
// const inputStyle = (isEditing) => 
//   `w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md outline-none transition duration-200 shadow-sm text-gray-800 text-sm sm:text-base ${
//     isEditing ? "border-blue-400 focus:ring-2 focus:ring-blue-500/50" : "border-gray-200 bg-gray-100 cursor-default"
//   }`;

// const SectionWrapper = ({ title, children, icon, className = "" }) => (
//   <div className={`bg-white p-4 sm:p-6 rounded-md border border-gray-200 shadow-lg ${className}`}>
//     <h3 className="text-lg sm:text-xl font-bold text-blue-700 border-b pb-2 sm:pb-3 mb-3 sm:mb-4 flex items-center gap-2">
//       {icon} {title}
//     </h3>
//     <div className="space-y-4">
//       {children}
//     </div>
//   </div>
// );

// const InputField = ({ label, name, value, onChange, type = "text", disabled = false, required = false, pattern }) => (
//   <div>
//     <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">{label}{required && <span className="text-red-500"> *</span>}</label>
//     <input
//       type={type}
//       name={name}
//       value={value || ""}
//       onChange={onChange}
//       disabled={disabled}
//       required={required}
//       pattern={pattern}
//       placeholder={label}
//       className={inputStyle(!disabled)}
//     />
//   </div>
// );

// // --- NEW: Phone Input with 10-digit Validation ---
// const PhoneInputField = ({ label, name, value, onChange, disabled = false, required = false }) => {
//   const [error, setError] = useState("");

//   const validatePhone = (val) => {
//     const digitsOnly = val.replace(/\D/g, "");
//     if (val && !/^\d{0,10}$/.test(val)) {
//       setError("Only digits allowed (0-9)");
//     } else if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
//       setError("Phone must be exactly 10 digits");
//     } else {
//       setError("");
//     }
//     return digitsOnly;
//   };

//   const handleInputChange = (e) => {
//     let inputValue = e.target.value;
//     if (!/^\d*$/.test(inputValue)) return;
//     if (inputValue.length > 10) inputValue = inputValue.slice(0, 10);
//     const formatted = validatePhone(inputValue);
//     onChange({ target: { name, value: formatted } });
//   };

//   return (
//     <div>
//       <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
//         {label}{required && <span className="text-red-500"> *</span>}
//       </label>
//       <input
//         type="text"
//         inputMode="numeric"
//         name={name}
//         value={value || ""}
//         onChange={handleInputChange}
//         disabled={disabled}
//         required={required}
//         placeholder="Enter 10-digit mobile number"
//         maxLength={10}
//         className={`${inputStyle(!disabled)} ${
//           error ? "border-red-400 focus:ring-2 focus:ring-red-500/50" : ""
//         }`}
//       />
//       {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
//       {value && value.length === 10 && !error && (
//         <p className="mt-1 text-xs text-green-600">Valid 10-digit number</p>
//       )}
//     </div>
//   );
// };

// // --- Main Component ---
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
//     logoImage: null, 
//   });

//   const [originalData, setOriginalData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isRemoving, setIsRemoving] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- Data Fetching ---
//   const fetchProfile = async () => {
//     const storedId = localStorage.getItem("id");
//     if (!storedId) {
//       alert("Warning: Shop ID not found. Please log in again.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`https://loyalty-backend-java.onrender.com/api/shop/get-profile?shopId=${storedId}`);
//       if (!res.ok) throw new Error("Failed to fetch profile");
      
//       const data = await res.json();
//       const dataWithDefaults = { ...data, companyEmail: data.companyEmail || data.email };

//       setFormData(dataWithDefaults);
//       setOriginalData(dataWithDefaults);
//     } catch (err) {
//       console.error("Error loading profile", err);
//       alert("Warning: Failed to load profile. Please try refreshing.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   // --- Handlers ---
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
//         alert("Logo updated successfully!");
//         fetchProfile(); 
//         setSelectedFile(null);
//       } else {
//         alert("Failed: " + (data.message || "Failed to upload logo"));
//       }
//     } catch (err) {
//       console.error("Upload error", err);
//       alert("Warning: Network error during image upload or reduce the image size.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const removeImage = async () => {
//     const storedId = localStorage.getItem("id");
//     if (!storedId || !window.confirm("Are you sure you want to remove the shop logo?")) return;

//     setIsRemoving(true);
//     try {
//       const res = await fetch(`https://loyalty-backend-java.onrender.com/api/shop/remove-image?shopId=${storedId}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();

//       if (res.ok && data.status === "success") {
//         alert("Logo removed!");
//         fetchProfile(); 
//       } else {
//         alert("Failed: " + (data.message || "Failed to remove logo"));
//       }
//     } catch (err) {
//       console.error("Remove error", err);
//       alert("Warning: Network error during logo removal");
//     } finally {
//       setIsRemoving(false);
//     }
//   };

//   // --- UPDATED: handleSubmit with 10-digit phone validation ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate Personal Phone (required)
//     const phoneDigits = (formData.phone || "").replace(/\D/g, "");
//     if (formData.phone && phoneDigits.length !== 10) {
//       alert("Error: Personal phone must be exactly 10 digits.");
//       return;
//     }

//     // Validate Company Phone (optional, but if entered → must be 10 digits)
//     const companyPhoneDigits = (formData.companyPhone || "").replace(/\D/g, "");
//     if (formData.companyPhone && companyPhoneDigits.length > 0 && companyPhoneDigits.length !== 10) {
//       alert("Error: Company phone must be exactly 10 digits.");
//       return;
//     }

//     setIsSubmitting(true);
    
//     const { logoImage, ...submitData } = formData;
    
//     try {
//       const res = await fetch("https://loyalty-backend-java.onrender.com/api/shop/update-profile", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(submitData),
//       });

//       if (res.ok) {
//         alert("Profile updated successfully!");
//         setOriginalData(formData);
//         setIsEditing(false);
//       } else {
//         alert("Failed: Failed to update profile. Check server logs.");
//       }
//     } catch (err) {
//       console.error("Submit error", err);
//       alert("Warning: Network error: Could not connect to server.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     setFormData(originalData);
//     setIsEditing(false);
//     setSelectedFile(null); 
//   };

//   // --- Loading State ---
//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64 p-4">
//         <FiLoader className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin" />
//         <p className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-600 font-medium">Loading Shopkeeper Profile...</p>
//       </div>
//     );
//   }

//   // --- Render ---
//   return (
//     <div className="max-w-full mx-auto bg-gray-50 rounded-md shadow-2xl overflow-hidden mt-2 p-3 sm:p-0">
//       {/* Header/Navigation */}
//       <nav className="bg-blue-600 text-white px-4 sm:px-8 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//         <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
//           <FiUser className="w-5 h-5 sm:w-6 sm:h-6"/> Shop Profile & Branding
//         </h2>
//         <div className="flex flex-wrap items-center gap-2">
//             {isEditing && (
//                 <button
//                 type="button"
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-sm transition duration-200 flex items-center gap-1.5 sm:gap-2 font-semibold shadow-md text-sm"
//                 onClick={handleCancel}
//                 disabled={isSubmitting}
//                 >
//                 <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
//                 <span>Cancel</span>
//                 </button>
//             )}

//             {isEditing && (
//                 <button
//                 type="submit"
//                 form="profile-form"
//                 className={`text-white px-4 sm:px-5 py-2 rounded-sm transition duration-200 flex items-center gap-1.5 sm:gap-2 font-semibold shadow-md text-sm ${
//                     isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
//                 }`}
//                 disabled={isSubmitting}
//                 >
//                 {isSubmitting ? (
//                     <>
//                     <FiLoader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
//                     <span>Saving...</span>
//                     </>
//                 ) : (
//                     <>
//                     <FiSave className="w-4 h-4 sm:w-5 sm:h-5" />
//                     <span>Save Profile</span>
//                     </>
//                 )}
//                 </button>
//             )}
            
//             {!isEditing && (
//                 <button
//                 type="button"
//                 className="bg-blue-700 hover:bg-blue-800 text-white px-4 sm:px-5 py-2 rounded-sm transition duration-200 flex items-center gap-1.5 sm:gap-2 font-semibold shadow-md text-sm"
//                 onClick={() => setIsEditing(true)}
//                 >
//                 <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5" />
//                 <span>Edit</span>
//                 </button>
//             )}
//         </div>
//       </nav>

//       {/* Main Content Area */}
//       <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
//         <form onSubmit={handleSubmit} id="profile-form" className="space-y-6 sm:space-y-8">
          
//           {/* Section 1: Logo and Shop Name */}
//           <SectionWrapper 
//             title="Branding & Visual Identity" 
//             icon={<FiUploadCloud className="w-5 h-5 sm:w-6 sm:h-6"/>}
//           >
//             {/* Logo Management */}
//             <div className="mb-4 sm:mb-0 bg-gray-100 p-3 sm:p-4 rounded-md border-2 border-dashed border-gray-300">
//                 <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-blue-700">Shop Logo / Icon</label>
                
//                 <div className="flex items-center gap-3 mb-3">
//                     {formData.logoImage ? (
//                     <img
//                         src={`data:image/jpeg;base64,${formData.logoImage}`}
//                         alt="Shop Logo"
//                         className="w-20 h-20 sm:w-24 sm:h-24 object-contain p-1 bg-white rounded-md border-2 border-gray-300 shadow-md"
//                     />
//                     ) : (
//                     <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-md flex flex-col items-center justify-center text-gray-500 text-xs border border-gray-400 p-2">
//                         <FiAlertCircle className="w-5 h-5 sm:w-6 sm:h-6 mb-1"/>
//                         <span>No Logo Set</span>
//                     </div>
//                     )}
//                 </div>

//                 {isEditing && (
//                     <div className="space-y-2 sm:space-y-3">
//                         <input
//                             type="file"
//                             accept="image/jpeg,image/png"
//                             onChange={handleFileChange}
//                             className="w-full text-xs sm:text-sm file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-sm file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                         />
                        
//                         <div className="flex flex-col sm:flex-row gap-2">
//                             {selectedFile && (
//                                 <button
//                                     type="button"
//                                     onClick={uploadImage}
//                                     disabled={isUploading}
//                                     className={`flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-sm flex items-center justify-center gap-1 text-xs sm:text-sm transition ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
//                                 >
//                                     {isUploading ? "Uploading..." : "Upload New Logo"}
//                                 </button>
//                             )}
//                             {formData.logoImage && (
//                                 <button
//                                     type="button"
//                                     onClick={removeImage}
//                                     disabled={isRemoving}
//                                     className={`bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-sm flex items-center justify-center gap-1 text-xs sm:text-sm transition ${isRemoving ? "opacity-50 cursor-not-allowed" : ""}`}
//                                 >
//                                     <FiTrash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                                     {isRemoving ? "Removing..." : "Remove"}
//                                 </button>
//                             )}
//                         </div>
//                         {selectedFile && <p className="text-xs text-gray-600">File ready: <strong>{selectedFile.name}</strong></p>}
//                     </div>
//                 )}
//             </div>

//             {/* Shop Details */}
//             <div className="grid grid-cols-1 gap-3 sm:gap-4">
//                 <InputField
//                   label="Shop Display Name"
//                   name="shopName"
//                   value={formData.shopName}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   required
//                 />

//                 {/* CHANGED: Personal Phone → PhoneInputField */}
//                 <PhoneInputField
//                   label="Personal Contact Phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   required
//                 />

//                 <InputField
//                   label="Personal Login Email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   required
//                   type="email"
//                 />
//             </div>
//           </SectionWrapper>

//           {/* Section 2: Company/Legal Information */}
//           <SectionWrapper title="Business & Address Details" icon={<FiBriefcase className="w-5 h-5 sm:w-6 sm:h-6"/>}>
//             <div className="grid grid-cols-1 gap-3 sm:gap-4">
//                 <InputField
//                   label="Legal Company Name"
//                   name="companyName"
//                   value={formData.companyName}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />

//                 {/* CHANGED: Company Phone → PhoneInputField */}
//                 <PhoneInputField
//                   label="Company Contact Phone"
//                   name="companyPhone"
//                   value={formData.companyPhone}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />

//                 <InputField
//                   label="Company Email (for receipts/invoices)"
//                   name="companyEmail"
//                   value={formData.companyEmail}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   type="email"
//                 />
//                 <InputField
//                   label="City"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />
//                 <InputField
//                   label="Country"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />
//                 <div>
//                     <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">Full Business Address</label>
//                     <textarea
//                     name="companyAddress"
//                     value={formData.companyAddress}
//                     onChange={handleChange}
//                     disabled={!isEditing}
//                     placeholder="Street Address, P.O. Box, etc."
//                     rows={3}
//                     className={inputStyle(isEditing) + " resize-none"}
//                     />
//                 </div>
//             </div>
//           </SectionWrapper>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ShopkeeperProfile;
















//translated code
import React, { useEffect, useState } from "react";
import { 
    FiTrash2, 
    FiEdit3, 
    FiSave, 
    FiX, 
    FiUploadCloud, 
    FiLoader, 
    FiAlertCircle,
    FiUser,
    FiBriefcase
} from "react-icons/fi";
import { useTranslation } from "react-i18next"; // ← AÑADIDO

// --- Custom Components & Styles ---
const inputStyle = (isEditing) => 
  `w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md outline-none transition duration-200 shadow-sm text-gray-800 text-sm sm:text-base ${
    isEditing ? "border-blue-400 focus:ring-2 focus:ring-blue-500/50" : "border-gray-200 bg-gray-100 cursor-default"
  }`;

const SectionWrapper = ({ title, children, icon, className = "" }) => (
  <div className={`bg-white p-4 sm:p-6 rounded-md border border-gray-200 shadow-lg ${className}`}>
    <h3 className="text-lg sm:text-xl font-bold text-blue-700 border-b pb-2 sm:pb-3 mb-3 sm:mb-4 flex items-center gap-2">
      {icon} {title}
    </h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InputField = ({ label, name, value, onChange, type = "text", disabled = false, required = false, pattern }) => (
  <div>
    <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
      {label}{required && <span className="text-red-500"> *</span>}
    </label>
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
  const { t } = useTranslation(); // ← AÑADIDO
  const [error, setError] = useState("");

  const validatePhone = (val) => {
    const digitsOnly = val.replace(/\D/g, "");
    if (val && !/^\d{0,10}$/.test(val)) {
      setError(t("shopProfile.phone.onlyDigits"));
    } else if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
      setError(t("shopProfile.phone.mustBe10"));
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
      <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
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
        placeholder={t("shopProfile.phone.placeholder")}
        maxLength={10}
        className={`${inputStyle(!disabled)} ${
          error ? "border-red-400 focus:ring-2 focus:ring-red-500/50" : ""
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {value && value.length === 10 && !error && (
        <p className="mt-1 text-xs text-green-600">{t("shopProfile.phone.valid")}</p>
      )}
    </div>
  );
};

// --- Main Component ---
const ShopkeeperProfile = () => {
  const { t } = useTranslation(); // ← AÑADIDO

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
      alert(t("shopProfile.alerts.noId"));
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
      alert(t("shopProfile.alerts.loadFailed"));
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
        alert(t("shopProfile.alerts.logoSuccess"));
        fetchProfile(); 
        setSelectedFile(null);
      } else {
        alert(t("shopProfile.alerts.logoFailed") + (data.message || ""));
      }
    } catch (err) {
      console.error("Upload error", err);
      alert(t("shopProfile.alerts.uploadError"));
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = async () => {
    const storedId = localStorage.getItem("id");
    if (!storedId || !window.confirm(t("shopProfile.confirm.removeLogo"))) return;

    setIsRemoving(true);
    try {
      const res = await fetch(`https://loyalty-backend-java.onrender.com/api/shop/remove-image?shopId=${storedId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.status === "success") {
        alert(t("shopProfile.alerts.logoRemoved"));
        fetchProfile(); 
      } else {
        alert(t("shopProfile.alerts.removeFailed") + (data.message || ""));
      }
    } catch (err) {
      console.error("Remove error", err);
      alert(t("shopProfile.alerts.removeError"));
    } finally {
      setIsRemoving(false);
    }
  };

  // --- UPDATED: handleSubmit with 10-digit phone validation ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneDigits = (formData.phone || "").replace(/\D/g, "");
    if (formData.phone && phoneDigits.length !== 10) {
      alert(t("shopProfile.validation.personalPhone"));
      return;
    }

    const companyPhoneDigits = (formData.companyPhone || "").replace(/\D/g, "");
    if (formData.companyPhone && companyPhoneDigits.length > 0 && companyPhoneDigits.length !== 10) {
      alert(t("shopProfile.validation.companyPhone"));
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
        alert(t("shopProfile.alerts.profileSuccess"));
        setOriginalData(formData);
        setIsEditing(false);
      } else {
        alert(t("shopProfile.alerts.profileFailed"));
      }
    } catch (err) {
      console.error("Submit error", err);
      alert(t("shopProfile.alerts.networkError"));
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
      <div className="flex flex-col items-center justify-center h-64 p-4">
        <FiLoader className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin" />
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-600 font-medium">
          {t("shopProfile.loading")}
        </p>
      </div>
    );
  }

  // --- Render ---
  return (
    <div className="max-w-full mx-auto bg-gray-50 rounded-md shadow-2xl overflow-hidden mt-2 p-3 sm:p-0">
      {/* Header/Navigation */}
      <nav className="bg-blue-600 text-white px-4 sm:px-8 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
          <FiUser className="w-5 h-5 sm:w-6 sm:h-6"/> {t("shopProfile.header.title")}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
            {isEditing && (
                <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-sm transition duration-200 flex items-center gap-1.5 sm:gap-2 font-semibold shadow-md text-sm"
                onClick={handleCancel}
                disabled={isSubmitting}
                >
                <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t("shopProfile.buttons.cancel")}</span>
                </button>
            )}

            {isEditing && (
                <button
                type="submit"
                form="profile-form"
                className={`text-white px-4 sm:px-5 py-2 rounded-sm transition duration-200 flex items-center gap-1.5 sm:gap-2 font-semibold shadow-md text-sm ${
                    isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                }`}
                disabled={isSubmitting}
                >
                {isSubmitting ? (
                    <>
                    <FiLoader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>{t("shopProfile.buttons.saving")}</span>
                    </>
                ) : (
                    <>
                    <FiSave className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{t("shopProfile.buttons.save")}</span>
                    </>
                )}
                </button>
            )}
            
            {!isEditing && (
                <button
                type="button"
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 sm:px-5 py-2 rounded-sm transition duration-200 flex items-center gap-1.5 sm:gap-2 font-semibold shadow-md text-sm"
                onClick={() => setIsEditing(true)}
                >
                <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t("shopProfile.buttons.edit")}</span>
                </button>
            )}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
        <form onSubmit={handleSubmit} id="profile-form" className="space-y-6 sm:space-y-8">
          
          {/* Section 1: Logo and Shop Name */}
          <SectionWrapper 
            title={t("shopProfile.sections.branding")} 
            icon={<FiUploadCloud className="w-5 h-5 sm:w-6 sm:h-6"/>}
          >
            {/* Logo Management */}
            <div className="mb-4 sm:mb-0 bg-gray-100 p-3 sm:p-4 rounded-md border-2 border-dashed border-gray-300">
                <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-blue-700">
                  {t("shopProfile.logo.label")}
                </label>
                
                <div className="flex items-center gap-3 mb-3">
                    {formData.logoImage ? (
                    <img
                        src={`data:image/jpeg;base64,${formData.logoImage}`}
                        alt="Shop Logo"
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain p-1 bg-white rounded-md border-2 border-gray-300 shadow-md"
                    />
                    ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-md flex flex-col items-center justify-center text-gray-500 text-xs border border-gray-400 p-2">
                        <FiAlertCircle className="w-5 h-5 sm:w-6 sm:h-6 mb-1"/>
                        <span>{t("shopProfile.logo.noLogo")}</span>
                    </div>
                    )}
                </div>

                {isEditing && (
                    <div className="space-y-2 sm:space-y-3">
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleFileChange}
                            className="w-full text-xs sm:text-sm file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-sm file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                            {selectedFile && (
                                <button
                                    type="button"
                                    onClick={uploadImage}
                                    disabled={isUploading}
                                    className={`flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-sm flex items-center justify-center gap-1 text-xs sm:text-sm transition ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {isUploading ? t("shopProfile.logo.uploading") : t("shopProfile.logo.upload")}
                                </button>
                            )}
                            {formData.logoImage && (
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    disabled={isRemoving}
                                    className={`bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-sm flex items-center justify-center gap-1 text-xs sm:text-sm transition ${isRemoving ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    <FiTrash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    {isRemoving ? t("shopProfile.logo.removing") : t("shopProfile.logo.remove")}
                                </button>
                            )}
                        </div>
                        {selectedFile && <p className="text-xs text-gray-600">{t("shopProfile.logo.fileReady")}: <strong>{selectedFile.name}</strong></p>}
                    </div>
                )}
            </div>

            {/* Shop Details */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <InputField
                  label={t("shopProfile.fields.shopName")}
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />

                <PhoneInputField
                  label={t("shopProfile.fields.personalPhone")}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />

                <InputField
                  label={t("shopProfile.fields.email")}
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
          <SectionWrapper 
            title={t("shopProfile.sections.business")} 
            icon={<FiBriefcase className="w-5 h-5 sm:w-6 sm:h-6"/>}
          >
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <InputField
                  label={t("shopProfile.fields.companyName")}
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <PhoneInputField
                  label={t("shopProfile.fields.companyPhone")}
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <InputField
                  label={t("shopProfile.fields.companyEmail")}
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  disabled={!isEditing}
                  type="email"
                />
                <InputField
                  label={t("shopProfile.fields.city")}
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <InputField
                  label={t("shopProfile.fields.country")}
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
                      {t("shopProfile.fields.address")}
                    </label>
                    <textarea
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder={t("shopProfile.fields.addressPlaceholder")}
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