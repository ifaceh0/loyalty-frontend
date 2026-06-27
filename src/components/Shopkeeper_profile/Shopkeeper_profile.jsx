// import Select from "react-select";
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
// import { useTranslation } from "react-i18next";
// import { API_BASE_URL } from '../../apiConfig';
// import { fetchWithAuth } from "../../auth/fetchWithAuth";

// const inputStyle = (isEditing) => 
//   `w-full px-3 sm:px-4 py-1.5 border rounded outline-none transition duration-200 shadow-sm text-gray-800 text-sm sm:text-base ${
//     isEditing ? "border-gray-300 focus:ring-2 focus:ring-gray-500/50" : "border-gray-200 bg-gray-50 cursor-default"
//   }`;

// const SectionWrapper = ({ title, children, icon, className = "" }) => (
//   <div className={`bg-white p-6 sm:p-8 rounded-xl border border-slate-100 ${className}`}>
//     <h3 className="text-lg sm:text-xl font-bold text-slate-900 pb-2 sm:pb-3 mb-3 sm:mb-4 flex items-center gap-2">
//       {icon} {title}
//     </h3>
//     <div className="space-y-4">
//       {children}
//     </div>
//   </div>
// );

// const InputField = ({ label, name, value, onChange, type = "text", disabled = false, required = false, pattern }) => (
//   <div>
//     <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
//       {label}{required && <span className="text-red-500"> *</span>}
//     </label>
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

// const PhoneInputField = ({ label, name, value, onChange, disabled = false, required = false }) => {
//   const { t } = useTranslation();
//   const [error, setError] = useState("");

//   const validatePhone = (val) => {
//     const digitsOnly = val.replace(/\D/g, "");
//     if (val && !/^\d{0,10}$/.test(val)) {
//       setError(t("shopProfile.phone.onlyDigits"));
//     } else if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
//       setError(t("shopProfile.phone.mustBe10"));
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
//         placeholder={t("shopProfile.phone.placeholder")}
//         maxLength={10}
//         className={`${inputStyle(!disabled)} ${
//           error ? "border-red-400 focus:ring-2 focus:ring-red-500/50" : ""
//         }`}
//       />
//       {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
//       {value && value.length === 10 && !error && (
//         <p className="mt-1 text-xs text-green-600">{t("shopProfile.phone.valid")}</p>
//       )}
//     </div>
//   );
// };

// const ShopkeeperProfile = () => {
//   const { t } = useTranslation();

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
//     state: "",
//     zipcode: "",
//     logoImage: null, 
//   });

//   const [originalData, setOriginalData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isRemoving, setIsRemoving] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [zipcodes, setZipcodes] = useState([]);

//   useEffect(() => {

//     fetch(`${API_BASE_URL}/api/location/countries`)
//       .then(res => res.json())
//       .then(data => {

//         const formatted = data.map(country => ({
//           value: country,
//           label: country
//         }));

//         setCountries(formatted);
//       });

//   }, []);

//   const loadStates = async (country) => {

//     const response = await fetch(
//       `${API_BASE_URL}/api/location/states?country=${country}`
//     );

//     const data = await response.json();

//     const formatted = data.map(state => ({
//       value: state,
//       label: state
//     }));

//     setStates(formatted);
//   };

//   const loadCities = async (country, state) => {

//     const response = await fetch(
//       `${API_BASE_URL}/api/location/cities?country=${country}&state=${state}`
//     );

//     const data = await response.json();

//     const formatted = data.map(city => ({
//       value: city,
//       label: city
//     }));

//     setCities(formatted);
//   };

//   const loadZipcodes = async (country, state, city) => {

//     const response = await fetch(
//       `${API_BASE_URL}/api/location/zipcodes?country=${country}&state=${state}&city=${city}`
//     );

//     const data = await response.json();

//     const formatted = data.map(zip => ({
//       value: zip,
//       label: zip
//     }));

//     setZipcodes(formatted);
//   };

//   const fetchProfile = async () => {
//     const storedId = localStorage.getItem("id");
//     if (!storedId) {
//       alert(t("shopProfile.alerts.noId"));
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetchWithAuth(`${API_BASE_URL}/api/shop/get-profile?shopId=${storedId}`, {
//         credentials: "include"
//       });
//       if (!res.ok) throw new Error("Failed to fetch profile");
      
//       const data = await res.json();
//       const dataWithDefaults = { ...data, companyEmail: data.companyEmail || data.email };

//       setFormData(dataWithDefaults);
//       if (data.country) {
//         await loadStates(data.country);
//       }

//       if (data.country && data.state) {
//         await loadCities(data.country, data.state);
//       }

//       if (data.country && data.state && data.city) {
//         await loadZipcodes(
//           data.country,
//           data.state,
//           data.city
//         );
//       }
//       setOriginalData(dataWithDefaults);
//     } catch (err) {
//       console.error("Error loading profile", err);
//       alert(t("shopProfile.alerts.loadFailed"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

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
//       const res = await fetchWithAuth(`${API_BASE_URL}/api/shop/upload-image`, {
//         credentials: "include",
//         method: "POST",
//         body: formDataUpload,
//       });
//       const data = await res.json();

//       if (res.ok && data.status === "success") {
//         alert(t("shopProfile.alerts.logoSuccess"));
//         fetchProfile(); 
//         setSelectedFile(null);
//       } else {
//         alert(t("shopProfile.alerts.logoFailed") + (data.message || ""));
//       }
//     } catch (err) {
//       console.error("Upload error", err);
//       alert(t("shopProfile.alerts.uploadError"));
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const removeImage = async () => {
//     const storedId = localStorage.getItem("id");
//     if (!storedId || !window.confirm(t("shopProfile.confirm.removeLogo"))) return;

//     setIsRemoving(true);
//     try {
//       const res = await fetchWithAuth(`${API_BASE_URL}/api/shop/remove-image?shopId=${storedId}`, {
//         credentials: "include",
//         method: "DELETE",
//       });
//       const data = await res.json();

//       if (res.ok && data.status === "success") {
//         alert(t("shopProfile.alerts.logoRemoved"));
//         fetchProfile(); 
//       } else {
//         alert(t("shopProfile.alerts.removeFailed") + (data.message || ""));
//       }
//     } catch (err) {
//       console.error("Remove error", err);
//       alert(t("shopProfile.alerts.removeError"));
//     } finally {
//       setIsRemoving(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const phoneDigits = (formData.phone || "").replace(/\D/g, "");
//     if (formData.phone && phoneDigits.length !== 10) {
//       alert(t("shopProfile.validation.personalPhone"));
//       return;
//     }

//     const companyPhoneDigits = (formData.companyPhone || "").replace(/\D/g, "");
//     if (formData.companyPhone && companyPhoneDigits.length > 0 && companyPhoneDigits.length !== 10) {
//       alert(t("shopProfile.validation.companyPhone"));
//       return;
//     }

//     setIsSubmitting(true);
    
//     const { logoImage, ...submitData } = formData;
    
//     try {
//       const res = await fetchWithAuth(`${API_BASE_URL}/api/shop/update-profile`, {
//         credentials: "include",
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(submitData),
//       });

//       if (res.ok) {
//         alert(t("shopProfile.alerts.profileSuccess"));
//         setOriginalData(formData);
//         setIsEditing(false);
//       } else {
//         alert(t("shopProfile.alerts.profileFailed"));
//       }
//     } catch (err) {
//       console.error("Submit error", err);
//       alert(t("shopProfile.alerts.networkError"));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     setFormData(originalData);
//     setIsEditing(false);
//     setSelectedFile(null); 
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64 p-4">
//         <FiLoader className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin" />
//         {/* <p className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-600 font-medium">
//           {t("shopProfile.loading")}
//         </p> */}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-8xl mx-auto rounded-xl shadow-md border border-slate-200 overflow-hidden mt-2 p-3 sm:p-0">
//       {/* Header/Navigation */}
//       <nav className="bg-white text-slate-900 px-4 sm:px-8 py-4 flex flex-row border-b border-slate-200 justify-between items-start gap-3">
//         <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
//           {/* <FiUser className="w-5 h-5 sm:w-6 sm:h-6"/> */}
//            {t("shopProfile.header.title")}
//         </h2>
//         <div className="flex flex-row items-center gap-2">
//             {isEditing && (
//                 <button
//                 type="button"
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1.5 rounded-full transition duration-200 flex items-center gap-1.5 sm:gap-2 font-semibold text-sm"
//                 onClick={handleCancel}
//                 disabled={isSubmitting}
//                 >
//                 {/* <FiX className="w-4 h-4 sm:w-5 sm:h-5" /> */}
//                 <span>{t("shopProfile.buttons.cancel")}</span>
//                 </button>
//             )}

//             {isEditing && (
//                 <button
//                 type="submit"
//                 form="profile-form"
//                 className={`text-white px-4 sm:px-5 py-1.5 rounded-full transition duration-200 flex items-center gap-1.5 sm:gap-2 font-semibold text-sm ${
//                     isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
//                 }`}
//                 disabled={isSubmitting}
//                 >
//                 {isSubmitting ? (
//                     <>
//                     <FiLoader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
//                     <span>{t("shopProfile.buttons.saving")}</span>
//                     </>
//                 ) : (
//                     <>
//                     {/* <FiSave className="w-4 h-4 sm:w-5 sm:h-5" /> */}
//                     <span>{t("shopProfile.buttons.save")}</span>
//                     </>
//                 )}
//                 </button>
//             )}
            
//             {!isEditing && (
//                 <button
//                 type="button"
//                 className="bg-slate-900 hover:bg-blue-600 text-white px-4 sm:px-5 py-1.5 rounded-full transition duration-200 flex items-center gap-1.5 sm:gap-2 font-semibold text-sm"
//                 onClick={() => setIsEditing(true)}
//                 >
//                 {/* <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5" /> */}
//                 <span>{t("shopProfile.buttons.edit")}</span>
//                 </button>
//             )}
//         </div>
//       </nav>

//       {/* Main Content Area */}
//       <div className="bg-white p-2 sm:p-4 space-y-6 sm:space-y-8">
//         <form onSubmit={handleSubmit} id="profile-form" className="space-y-6 sm:space-y-8">
          
//           {/* Section 1: Logo and Shop Name */}
//           <SectionWrapper 
//             title={t("shopProfile.sections.branding")} 
//             icon={<FiUploadCloud className="w-5 h-5 sm:w-6 sm:h-6"/>}
//           >
//             {/* Logo Management */}
//             <div className="mb-4 sm:mb-0 bg-gray-100 p-3 sm:p-4 rounded-xl border-2 border-dashed border-gray-300">
//                 <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-blue-700">
//                   {t("shopProfile.logo.label")}
//                 </label>
                
//                 <div className="flex items-center gap-3 mb-3">
//                     {formData.logoImage ? (
//                     <img
//                         src={`data:image/jpeg;base64,${formData.logoImage}`}
//                         alt="Shop Logo"
//                         className="w-20 h-20 sm:w-24 sm:h-24 object-contain bg-white rounded-full border-2 border-gray-300"
//                     />
//                     ) : (
//                     <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex flex-col items-center justify-center text-gray-500 text-xs border border-gray-400 p-2">
//                         <FiAlertCircle className="w-5 h-5 sm:w-6 sm:h-6 mb-1"/>
//                         <span>{t("shopProfile.logo.noLogo")}</span>
//                     </div>
//                     )}
//                 </div>

//                 {isEditing && (
//                     <div className="space-y-2 sm:space-y-3">
//                         <input
//                             type="file"
//                             accept="image/jpeg,image/png"
//                             onChange={handleFileChange}
//                             className="w-full text-xs sm:text-sm file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-1.5 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                         />
                        
//                         <div className="flex flex-col sm:flex-row gap-2">
//                             {selectedFile && (
//                                 <button
//                                     type="button"
//                                     onClick={uploadImage}
//                                     disabled={isUploading}
//                                     className={`flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full flex items-center justify-center gap-1 text-xs sm:text-sm transition ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
//                                 >
//                                     {isUploading ? t("shopProfile.logo.uploading") : t("shopProfile.logo.upload")}
//                                 </button>
//                             )}
//                             {formData.logoImage && (
//                                 <button
//                                     type="button"
//                                     onClick={removeImage}
//                                     disabled={isRemoving}
//                                     className={`bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full flex items-center justify-center gap-1 text-xs sm:text-sm transition ${isRemoving ? "opacity-50 cursor-not-allowed" : ""}`}
//                                 >
//                                     <FiTrash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                                     {isRemoving ? t("shopProfile.logo.removing") : t("shopProfile.logo.remove")}
//                                 </button>
//                             )}
//                         </div>
//                         {selectedFile && <p className="text-xs text-gray-600">{t("shopProfile.logo.fileReady")}: <strong>{selectedFile.name}</strong></p>}
//                     </div>
//                 )}
//             </div>

//             {/* Shop Details */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
//                 <InputField
//                   label={t("shopProfile.fields.shopName")}
//                   name="shopName"
//                   value={formData.shopName}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   required
//                 />

//                 <PhoneInputField
//                   label={t("shopProfile.fields.personalPhone")}
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   required
//                 />

//                 <InputField
//                   label={t("shopProfile.fields.email")}
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
//           <SectionWrapper 
//             title={t("shopProfile.sections.business")} 
//             icon={<FiBriefcase className="w-5 h-5 sm:w-6 sm:h-6"/>}
//           >
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
//                 <InputField
//                   label={t("shopProfile.fields.companyName")}
//                   name="companyName"
//                   value={formData.companyName}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />

//                 <PhoneInputField
//                   label={t("shopProfile.fields.companyPhone")}
//                   name="companyPhone"
//                   value={formData.companyPhone}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />

//                 <InputField
//                   label={t("shopProfile.fields.companyEmail")}
//                   name="companyEmail"
//                   value={formData.companyEmail}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   type="email"
//                 />
//                 <div>
//                   <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
//                     {t("shopProfile.fields.country")}
//                     {/* Country */}
//                   </label>

//                   <Select
//                     options={countries}

//                     value={countries.find(
//                       c => c.value === formData.country
//                     )}

//                     onChange={(selected) => {

//                       setFormData(prev => ({
//                         ...prev,
//                         country: selected.value,
//                         state: "",
//                         city: "",
//                         zipcode: ""
//                       }));

//                       setStates([]);
//                       setCities([]);
//                       setZipcodes([]);

//                       loadStates(selected.value);
//                     }}

//                     isDisabled={!isEditing}
//                     isSearchable
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
//                     {t("shopProfile.fields.state")}
//                     {/* State */}
//                   </label>

//                   <Select
//                     options={states}

//                     value={states.find(
//                       s => s.value === formData.state
//                     )}

//                     onChange={(selected) => {

//                       setFormData(prev => ({
//                         ...prev,
//                         state: selected.value,
//                         city: "",
//                         zipcode: ""
//                       }));

//                       setCities([]);
//                       setZipcodes([]);

//                       loadCities(
//                         formData.country,
//                         selected.value
//                       );
//                     }}

//                     isDisabled={!isEditing || !formData.country}
//                     isSearchable
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
//                     {t("shopProfile.fields.city")}
//                     {/* City */}
//                   </label>

//                   <Select
//                     options={cities}

//                     value={cities.find(
//                       c => c.value === formData.city
//                     )}

//                     onChange={(selected) => {

//                       setFormData(prev => ({
//                         ...prev,
//                         city: selected.value
//                       }));

//                       loadZipcodes(
//                         formData.country,
//                         formData.state,
//                         selected.value
//                       );
//                     }}

//                     isDisabled={!isEditing || !formData.state}
//                     isSearchable
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
//                     {t("shopProfile.fields.zipcode")}
//                     {/* Zipcode */}
//                   </label>

//                   <Select
//                     options={zipcodes}

//                     value={zipcodes.find(
//                       z => z.value === formData.zipcode
//                     )}

//                     onChange={(selected) => {

//                       setFormData(prev => ({
//                         ...prev,
//                         zipcode: selected.value
//                       }));
//                     }}

//                     isDisabled={!isEditing || !formData.city}
//                     isSearchable
//                   />
//                 </div>
//                 <div>
//                     <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
//                       {t("shopProfile.fields.address")}
//                     </label>
//                     <textarea
//                     name="companyAddress"
//                     value={formData.companyAddress}
//                     onChange={handleChange}
//                     disabled={!isEditing}
//                     placeholder={t("shopProfile.fields.addressPlaceholder")}
//                     rows={2}
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






import Select from "react-select";
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
    FiBriefcase,
    FiMapPin,
    FiGlobe
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from '../../apiConfig';
import { fetchWithAuth } from "../../auth/fetchWithAuth";

// Modern input styling matching premium dashboard guidelines
const inputStyle = (isEditing, hasError = false) => 
  `w-full px-4 py-2.5 border rounded-md outline-none transition-all duration-200 text-sm font-medium ${
    hasError 
      ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 bg-white text-zinc-900"
      : isEditing 
        ? "border-zinc-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 bg-white text-zinc-900 shadow-sm" 
        : "border-zinc-200/60 bg-zinc-50/80 text-zinc-500 cursor-default"
  }`;

// Premium Custom React-Select Styling Object
const customSelectStyles = (isEditing) => ({
  control: (base, state) => ({
    ...base,
    padding: '2px 4px',
    borderRadius: '6px',
    borderWidth: '1px',
    borderColor: state.isFocused ? '#4f46e5' : '#e4e4e7',
    backgroundColor: isEditing ? '#ffffff' : '#f4f4f5',
    boxShadow: state.isFocused ? '0 0 0 4px rgba(79, 70, 229, 0.05)' : 'none',
    opacity: isEditing ? 1 : 0.8,
    cursor: isEditing ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    fontSize: '0.875rem',
    fontWeight: '500',
  }),
  singleValue: (base) => ({
    ...base,
    color: isEditing ? '#18181b' : '#71717a',
  }),
});

const SectionWrapper = ({ title, children, icon, className = "" }) => (
  <div className={`bg-white p-6 sm:p-8 rounded-md border border-zinc-200/80 shadow-sm ${className}`}>
    <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-4 mb-6">
      <div className="w-9 h-9 bg-zinc-100 rounded-md flex items-center justify-center text-zinc-700 border border-zinc-100">
        {icon}
      </div>
      <h3 className="text-base font-bold text-zinc-800 tracking-tight">
        {title}
      </h3>
    </div>
    <div className="space-y-5">
      {children}
    </div>
  </div>
);

const InputField = ({ label, name, value, onChange, type = "text", disabled = false, required = false, pattern }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold tracking-wider text-zinc-400">
      {label}{required && <span className="text-rose-500"> *</span>}
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

const PhoneInputField = ({ label, name, value, onChange, disabled = false, required = false }) => {
  const { t } = useTranslation();
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
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold tracking-wider text-zinc-400">
        {label}{required && <span className="text-rose-500"> *</span>}
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
        className={inputStyle(!disabled, !!error)}
      />
      {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
      {value && value.length === 10 && !error && (
        <p className="text-xs font-medium text-emerald-600">{t("shopProfile.phone.valid")}</p>
      )}
    </div>
  );
};

const ShopkeeperProfile = () => {
  const { t } = useTranslation();

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
    state: "",
    zipcode: "",
    logoImage: null, 
  });

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [zipcodes, setZipcodes] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/location/countries`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(country => ({
          value: country,
          label: country
        }));
        setCountries(formatted);
      });
  }, []);

  const loadStates = async (country) => {
    const response = await fetch(`${API_BASE_URL}/api/location/states?country=${country}`);
    const data = await response.json();
    const formatted = data.map(state => ({ value: state, label: state }));
    setStates(formatted);
  };

  const loadCities = async (country, state) => {
    const response = await fetch(`${API_BASE_URL}/api/location/cities?country=${country}&state=${state}`);
    const data = await response.json();
    const formatted = data.map(city => ({ value: city, label: city }));
    setCities(formatted);
  };

  const loadZipcodes = async (country, state, city) => {
    const response = await fetch(`${API_BASE_URL}/api/location/zipcodes?country=${country}&state=${state}&city=${city}`);
    const data = await response.json();
    const formatted = data.map(zip => ({ value: zip, label: zip }));
    setZipcodes(formatted);
  };

  const fetchProfile = async () => {
    const storedId = localStorage.getItem("id");
    if (!storedId) {
      alert(t("shopProfile.alerts.noId"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/shop/get-profile?shopId=${storedId}`, {
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      
      const data = await res.json();
      const dataWithDefaults = { ...data, companyEmail: data.companyEmail || data.email };

      setFormData(dataWithDefaults);
      if (data.country) await loadStates(data.country);
      if (data.country && data.state) await loadCities(data.country, data.state);
      if (data.country && data.state && data.city) await loadZipcodes(data.country, data.state, data.city);
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
      const res = await fetchWithAuth(`${API_BASE_URL}/api/shop/upload-image`, {
        credentials: "include",
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
      const res = await fetchWithAuth(`${API_BASE_URL}/api/shop/remove-image?shopId=${storedId}`, {
        credentials: "include",
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
      const res = await fetchWithAuth(`${API_BASE_URL}/api/shop/update-profile`, {
        credentials: "include",
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <FiLoader className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
        <p className="text-zinc-500 text-sm font-medium tracking-wide">Syncing Vendor Credentials...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto text-zinc-950 antialiased px-2 sm:px-0 py-6">
      
      {/* Top Profile Header Component Block */}
      <nav className="flex flex-row sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-200/80">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-0.5">
            <span>Identity Governance</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-zinc-900 tracking-tight">
            {t("shopProfile.header.title")}
          </h2>
        </div>
        
        {/* Dynamic Contextual Top Action Controllers */}
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 text-zinc-700 font-semibold text-sm transition-all shadow-sm hover:border-zinc-300 disabled:opacity-50"
              >
                {/* <FiX className="w-4 h-4 text-zinc-400" /> */}
                <span>{t("shopProfile.buttons.cancel")}</span>
              </button>
              
              <button
                type="submit"
                form="profile-form"
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center gap-2 px-5 py-1.5 rounded-full font-bold text-sm text-white shadow-sm transition-all ${
                  isSubmitting ? 'bg-zinc-300 cursor-not-allowed' : 'bg-zinc-900 hover:bg-zinc-800'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="w-4 h-4 animate-spin" />
                    <span>{t("shopProfile.buttons.saving")}</span>
                  </>
                ) : (
                  <>
                    {/* <FiSave className="w-4 h-4" /> */}
                    <span>{t("shopProfile.buttons.save")}</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm rounded-full transition-all shadow-sm"
            >
              {/* <FiEdit3 className="w-4 h-4" /> */}
              <span>{t("shopProfile.buttons.edit")}</span>
            </button>
          )}
        </div>
      </nav>

      {/* Main Structural Data Grid Layer */}
      <div className="space-y-6">
        <form onSubmit={handleSubmit} id="profile-form" className="space-y-6">
          
          {/* Section 1: Brand Assets & Ownership Essentials */}
          <SectionWrapper 
            title={t("shopProfile.sections.branding")} 
            icon={<FiUser className="w-4 h-4"/>}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Dynamic Image Avatar Sandbox container */}
              <div className="lg:col-span-4 bg-zinc-50 border border-zinc-200 rounded-md p-5 text-center flex flex-col items-center justify-center">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 block">
                  {t("shopProfile.logo.label")}
                </label>
                
                <div className="relative group mb-4">
                  {formData.logoImage ? (
                    <img
                      src={`data:image/jpeg;base64,${formData.logoImage}`}
                      alt="Shop Logo"
                      className="w-24 h-24 sm:w-28 sm:h-28 object-contain bg-white rounded-2xl border border-zinc-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-zinc-200/50 rounded-2xl flex flex-col items-center justify-center text-zinc-400 border border-zinc-300 border-dashed p-3">
                      <FiAlertCircle className="w-5 h-5 mb-1 text-zinc-300"/>
                      <span className="text-[10px] font-semibold tracking-tight">{t("shopProfile.logo.noLogo")}</span>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="w-full space-y-3">
                    <input
                      type="file"
                      id="logo-upload-input"
                      accept="image/jpeg,image/png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label 
                      htmlFor="logo-upload-input"
                      className="inline-flex w-full items-center justify-center px-4 py-2 bg-white border border-zinc-200 rounded-full text-xs font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 cursor-pointer transition-colors"
                    >
                      Choose Visual Asset File
                    </label>
                    
                    {selectedFile && (
                      <div className="p-2 bg-zinc-100 rounded-lg text-left">
                        <p className="text-[11px] font-medium text-zinc-500 truncate">Ready: {selectedFile.name}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {selectedFile && (
                        <button
                          type="button"
                          onClick={uploadImage}
                          disabled={isUploading}
                          className="flex-1 inline-flex items-center justify-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold transition disabled:opacity-50"
                        >
                          {isUploading ? t("shopProfile.logo.uploading") : t("shopProfile.logo.upload")}
                        </button>
                      )}
                      {formData.logoImage && (
                        <button
                          type="button"
                          onClick={removeImage}
                          disabled={isRemoving}
                          className="inline-flex items-center justify-center p-2 bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 rounded-md text-xs font-bold transition disabled:opacity-50"
                          title={t("shopProfile.logo.remove")}
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Fundamental Text Input Field Array grids */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="sm:col-span-2">
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
              </div>

            </div>
          </SectionWrapper>

          {/* Section 2: Enterprise Legalities & Core Geolocation Details */}
          <SectionWrapper 
            title={t("shopProfile.sections.business")} 
            icon={<FiBriefcase className="w-4 h-4"/>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

              {/* Location Select Grid Items */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-wider text-zinc-400">
                  {t("shopProfile.fields.country")}
                </label>
                <Select
                  options={countries}
                  value={countries.find(c => c.value === formData.country)}
                  styles={customSelectStyles(isEditing)}
                  onChange={(selected) => {
                    setFormData(prev => ({
                      ...prev,
                      country: selected.value,
                      state: "",
                      city: "",
                      zipcode: ""
                    }));
                    setStates([]);
                    setCities([]);
                    setZipcodes([]);
                    loadStates(selected.value);
                  }}
                  isDisabled={!isEditing}
                  isSearchable
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-wider text-zinc-400">
                  {t("shopProfile.fields.state")}
                </label>
                <Select
                  options={states}
                  value={states.find(s => s.value === formData.state)}
                  styles={customSelectStyles(isEditing)}
                  onChange={(selected) => {
                    setFormData(prev => ({
                      ...prev,
                      state: selected.value,
                      city: "",
                      zipcode: ""
                    }));
                    setCities([]);
                    setZipcodes([]);
                    loadCities(formData.country, selected.value);
                  }}
                  isDisabled={!isEditing || !formData.country}
                  isSearchable
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-wider text-zinc-400">
                  {t("shopProfile.fields.city")}
                </label>
                <Select
                  options={cities}
                  value={cities.find(c => c.value === formData.city)}
                  styles={customSelectStyles(isEditing)}
                  onChange={(selected) => {
                    setFormData(prev => ({ ...prev, city: selected.value }));
                    loadZipcodes(formData.country, formData.state, selected.value);
                  }}
                  isDisabled={!isEditing || !formData.state}
                  isSearchable
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-wider text-zinc-400">
                  {t("shopProfile.fields.zipcode")}
                </label>
                <Select
                  options={zipcodes}
                  value={zipcodes.find(z => z.value === formData.zipcode)}
                  styles={customSelectStyles(isEditing)}
                  onChange={(selected) => {
                    setFormData(prev => ({ ...prev, zipcode: selected.value }));
                  }}
                  isDisabled={!isEditing || !formData.city}
                  isSearchable
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold tracking-wider text-zinc-400">
                  {t("shopProfile.fields.address")}
                </label>
                <textarea
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder={t("shopProfile.fields.addressPlaceholder")}
                  rows={1}
                  className={inputStyle(isEditing) + " resize-none min-h-[46px] h-[46px]"}
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