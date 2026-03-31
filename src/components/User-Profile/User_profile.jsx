// import React, { useState, useEffect } from "react";
// import { FiEdit3, FiSave, FiX, FiUser, FiMail, FiPhone, FiCheckCircle, FiLoader } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import { Loader2 } from 'lucide-react';
// import { useTranslation } from "react-i18next";
// import { API_BASE_URL } from '../../apiConfig';
// import { fetchWithAuth } from "../../auth/fetchWithAuth";

// const ProfileInputField = ({ label, name, value, onChange, disabled, type = 'text', icon: Icon }) => (
//   <div className="mb-6 sm:mb-5">
//     <label htmlFor={name} className="block text-base sm:text-sm font-semibold text-slate-700 mb-2.5">
//       {label}
//     </label>
//     <div className="relative">
//       {Icon && (
//         <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-5 sm:h-5 ${disabled ? 'text-gray-400' : 'text-blue-500'}`} />
//       )}
//       <input
//         type={type}
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={`w-full border ${
//           disabled
//             ? 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'
//             : 'border-slate-200 bg-white text-slate-900 focus:ring-blue-400 focus:border-blue-500 shadow-sm'
//         } rounded-lg py-2 px-5 sm:px-4 pl-12 sm:pl-11 text-base transition-all duration-200 ease-in-out placeholder-slate-400 focus:outline-none focus:ring-2`}
//         placeholder={label}
//         disabled={disabled}
//         required
//       />
//     </div>
//   </div>
// );

// const PhoneInputField = ({ label, name, value, onChange, disabled, icon: Icon = FiPhone }) => {
//   const { t } = useTranslation();
//   const [error, setError] = useState("");

//   const validatePhone = (val) => {
//     const digitsOnly = val.replace(/\D/g, "");
//     if (val && !/^\d{0,10}$/.test(val)) {
//       setError(t('profile.phone.onlyDigits'));
//     } else if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
//       setError(t('profile.phone.mustBe10'));
//     } else {
//       setError("");
//     }
//     return digitsOnly;
//   };

//   const handleChange = (e) => {
//     let inputValue = e.target.value;
//     if (!/^\d*$/.test(inputValue)) return;
//     if (inputValue.length > 10) inputValue = inputValue.slice(0, 10);
//     const formatted = validatePhone(inputValue);
//     onChange({ target: { name, value: formatted } });
//   };

//   return (
//     <div className="mb-6 sm:mb-5">
//       <label htmlFor={name} className="block text-base sm:text-sm font-semibold text-slate-700 mb-2.5">
//         {label}
//       </label>
//       <div className="relative">
//         {Icon && (
//           <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-5 sm:h-5 ${disabled ? 'text-gray-400' : error ? 'text-red-500' : 'text-blue-500'}`} />
//         )}
//         <input
//           type="text"
//           id={name}
//           name={name}
//           value={value || ""}
//           onChange={handleChange}
//           disabled={disabled}
//           placeholder={t('profile.phone.placeholder')}
//           maxLength={10}
//           inputMode="numeric"
//           className={`w-full border ${
//             disabled
//               ? 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'
//               : error
//                 ? 'border-red-400 bg-white text-slate-900 focus:ring-red-500 focus:border-red-500'
//                 : 'border-slate-200 bg-white text-slate-900 focus:ring-blue-400 focus:border-blue-500 shadow-sm'
//           } rounded-lg py-2 px-5 sm:px-4 pl-12 sm:pl-11 text-base transition-all duration-200 ease-in-out placeholder-slate-400 focus:outline-none focus:ring-2`}
//         />
//       </div>
//       {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
//       {value && value.length === 10 && !error && (
//         <p className="mt-2 text-sm text-green-600">{t('profile.phone.valid')}</p>
//       )}
//     </div>
//   );
// };

// const UserProfile = () => {
//   const { t } = useTranslation();

//   const [userData, setUserData] = useState({
//     userId: null,
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//   });
//   const [initialData, setInitialData] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(null);

//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   useEffect(() => {
//     const userId = localStorage.getItem('id');
//     if (userId) {
//       fetchUserDetails(userId);
//     } else {
//       setError(t('profile.errors.noUserId'));
//     }
//   }, [t]);

//   const fetchUserDetails = async (userId) => {
//     setIsLoading(true);
//     try {
//       const response = await fetchWithAuth(
//         `${API_BASE_URL}/api/user/get-profile?userId=${userId}`, {
//           credentials: "include",
//           method: 'GET', 
//           headers: { 'Content-Type': 'application/json' } 
//         });

//       if (response.ok) {
//         const user = await response.json();
//         const data = {
//           userId: user.userId || null,
//           firstName: user.firstName || '',
//           lastName: user.lastName || '',
//           phone: user.phone || '',
//           email: user.email || '',
//         };
//         setUserData(data);
//         setInitialData(data);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || t('profile.errors.fetchFailed'));
//       }
//     } catch (error) {
//       setError(t('profile.errors.networkError'));
//       console.error('Fetch error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData(prev => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneDigits = (userData.phone || "").replace(/\D/g, "");

//     if (!userData.firstName.trim()) return t('profile.validation.firstName');
//     if (!userData.lastName.trim()) return t('profile.validation.lastName');
//     if (userData.phone && phoneDigits.length !== 10) return t('profile.validation.phone10');
//     if (!emailRegex.test(userData.email)) return t('profile.validation.email');
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     setSuccessMessage(null);

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const userId = parseInt(localStorage.getItem('id'), 10);
//       if (isNaN(userId)) throw new Error('Invalid user ID');

//       const payload = {
//         userId,
//         firstName: userData.firstName.trim(),
//         lastName: userData.lastName.trim(),
//         phone: userData.phone.trim(),
//         email: userData.email.trim(),
//       };

//       const response = await fetchWithAuth(
//         `${API_BASE_URL}/api/user/update-profile`,
//         {
//           credentials: "include",
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (response.ok) {
//         setSuccessMessage(t('profile.success.updated'));
//         setIsEditing(false);
//         setInitialData(userData);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || t('profile.errors.updateFailed'));
//       }
//     } catch (error) {
//       setError(t('profile.errors.submitError') + error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEditToggle = () => {
//     if (isEditing) setUserData(initialData);
//     setIsEditing(!isEditing);
//     setError(null);
//     setSuccessMessage(null);
//   };

//   if (isLoading && !userData.userId) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.4 }}
//         className="flex flex-col items-center justify-center min-h-[60vh]"
//       >
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
//           {/* <span className="text-lg sm:text-lg font-bold text-blue-600">{t('profile.loading.title')}</span> */}
//           {/* <p className="text-base sm:text-base text-blue-600 font-medium text-center max-w-xs">
//             {t('profile.loading.message')}
//           </p> */}
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen py-6 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//         className="w-full max-w-4xl rounded-xl border-2 border-slate-100 shadow-sm overflow-hidden"
//       >
//         {/* Header */}
//         <header className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-slate-200 px-6 py-6 sm:px-8 sm:py-8">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-800 tracking-tight text-center sm:text-left">
//             {t('profile.header.welcome', {})} {userData.firstName || t('profile.header.user')}!
//           </h2>
//           <p className="text-sm sm:text-base text-gray-600 mt-2 text-center sm:text-left">
//             {t('profile.header.subtitle')}
//           </p>
//         </header>

//         <div className="p-6 sm:p-8 lg:p-10">
//           {/* Section Title + Edit Button */}
//           <div className="flex flex-row sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
//             <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
//               {t('profile.section.title')}
//             </h3>
//             <button
//               onClick={handleEditToggle}
//               className={`px-4 sm:px-8 py-2 rounded-full font-medium transition duration-200 ease-in-out flex items-center justify-center gap-2 text-base sm:w-auto
//                 ${isEditing
//                   ? 'bg-white text-red-600 border-2 border-red-500 hover:bg-red-50'
//                   : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//             >
//               <span>{isEditing ? t('profile.buttons.cancel') : t('profile.buttons.edit')}</span>
//             </button>
//           </div>

//           {/* Messages */}
//           <AnimatePresence>
//             {successMessage && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="bg-green-50 border border-green-300 text-green-700 p-3 rounded-xl mb-6 text-base flex items-center gap-3"
//               >
//                 <FiCheckCircle className="w-6 h-6 flex-shrink-0" />
//                 <p className="font-semibold">{successMessage}</p>
//               </motion.div>
//             )}
//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-xl mb-6 text-base"
//               >
//                 <p className="font-semibold">{t('profile.errors.title')}</p>
//                 <p className="mt-1">{error}</p>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
//               <ProfileInputField
//                 label={t('profile.fields.firstName')}
//                 name="firstName"
//                 value={userData.firstName}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 icon={FiUser}
//               />
//               <ProfileInputField
//                 label={t('profile.fields.lastName')}
//                 name="lastName"
//                 value={userData.lastName}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 icon={FiUser}
//               />
//             </div>

//             <PhoneInputField
//               label={t('profile.fields.phone')}
//               name="phone"
//               value={userData.phone}
//               onChange={handleChange}
//               disabled={!isEditing}
//             />

//             <ProfileInputField
//               label={t('profile.fields.email')}
//               name="email"
//               value={userData.email}
//               onChange={handleChange}
//               disabled={!isEditing}
//               type="email"
//               icon={FiMail}
//             />

//             {isEditing && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="mt-4"
//               >
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`px-8 bg-green-500 text-white py-2 rounded-full font-bold text-base hover:bg-green-600 transition duration-300 flex items-center justify-center gap-3
//                     ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
//                 >
//                   {isLoading ? (
//                     <>
//                       <FiLoader className="animate-spin" size={22} />
//                       <span>{t('profile.buttons.saving')}</span>
//                     </>
//                   ) : (
//                     <>
//                       {/* <FiSave size={22} /> */}
//                       <span>{t('profile.buttons.save')}</span>
//                     </>
//                   )}
//                 </button>
//               </motion.div>
//             )}
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default UserProfile;








import React, { useState, useEffect } from "react";
import { FiEdit3, FiSave, FiX, FiUser, FiMail, FiPhone, FiCheckCircle, FiInfo } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from '../../apiConfig';
import { fetchWithAuth } from "../../auth/fetchWithAuth";

const ProfileInputField = ({ label, name, value, onChange, disabled, type = 'text' }) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full transition-all duration-200 text-sm rounded-lg py-2.5 px-4 outline-none border ${
        disabled
          ? 'bg-slate-50 border-slate-100 text-slate-600 cursor-not-allowed select-none'
          : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm'
      }`}
      placeholder={label}
      disabled={disabled}
      required
    />
  </div>
);

const PhoneInputField = ({ label, name, value, onChange, disabled }) => {
  const { t } = useTranslation();
  const [error, setError] = useState("");

  const validatePhone = (val) => {
    const digitsOnly = val.replace(/\D/g, "");
    if (val && !/^\d{0,10}$/.test(val)) {
      setError(t('profile.phone.onlyDigits'));
    } else if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
      setError(t('profile.phone.mustBe10'));
    } else {
      setError("");
    }
    return digitsOnly;
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;
    if (!/^\d*$/.test(inputValue)) return;
    if (inputValue.length > 10) inputValue = inputValue.slice(0, 10);
    const formatted = validatePhone(inputValue);
    onChange({ target: { name, value: formatted } });
  };

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value || ""}
        onChange={handleChange}
        disabled={disabled}
        placeholder={t('profile.phone.placeholder')}
        maxLength={10}
        inputMode="numeric"
        className={`w-full transition-all duration-200 text-sm rounded-lg py-2.5 px-4 outline-none border ${
          disabled
            ? 'bg-slate-50 border-slate-100 text-slate-600 cursor-not-allowed'
            : error
              ? 'border-red-300 bg-red-50/30 text-slate-900 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
              : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm'
        }`}
      />
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-[11px] font-medium text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const UserProfile = () => {
  const { t } = useTranslation();

  const [userData, setUserData] = useState({
    userId: null,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [initialData, setInitialData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (userId) {
      fetchUserDetails(userId);
    } else {
      setError(t('profile.errors.noUserId'));
    }
  }, [t]);

  const fetchUserDetails = async (userId) => {
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(
        `${API_BASE_URL}/api/user/get-profile?userId=${userId}`, {
          credentials: "include",
          method: 'GET', 
          headers: { 'Content-Type': 'application/json' } 
        });

      if (response.ok) {
        const user = await response.json();
        const data = {
          userId: user.userId || null,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phone: user.phone || '',
          email: user.email || '',
        };
        setUserData(data);
        setInitialData(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || t('profile.errors.fetchFailed'));
      }
    } catch (error) {
      setError(t('profile.errors.networkError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = (userData.phone || "").replace(/\D/g, "");
    if (!userData.firstName.trim()) return t('profile.validation.firstName');
    if (!userData.lastName.trim()) return t('profile.validation.lastName');
    if (userData.phone && phoneDigits.length !== 10) return t('profile.validation.phone10');
    if (!emailRegex.test(userData.email)) return t('profile.validation.email');
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const userId = parseInt(localStorage.getItem('id'), 10);
      const payload = {
        userId,
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        phone: userData.phone.trim(),
        email: userData.email.trim(),
      };

      const response = await fetchWithAuth(
        `${API_BASE_URL}/api/user/update-profile`,
        {
          credentials: "include",
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setSuccessMessage(t('profile.success.updated'));
        setIsEditing(false);
        setInitialData(userData);
      } else {
        const errorData = await response.json();
        setError(errorData.message || t('profile.errors.updateFailed'));
      }
    } catch (err) {
      setError(t('profile.errors.submitError') + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) setUserData(initialData);
    setIsEditing(!isEditing);
    setError(null);
  };

  if (isLoading && !userData.userId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {t('profile.section.title')}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {t('profile.header.subtitle')}
            </p>
          </div>
          <button
            onClick={handleEditToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              isEditing 
                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200'
            }`}
          >
            {isEditing ? <><FiX /> {t('profile.buttons.cancel')}</> : <><FiEdit3 /> {t('profile.buttons.edit')}</>}
          </button>
        </div>

        {/* Feedback Messages */}
        <AnimatePresence mode="wait">
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-3 rounded-xl flex items-center gap-3 text-sm font-medium"
            >
              <FiCheckCircle className="shrink-0" /> {successMessage}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 border border-red-100 text-red-700 p-3 rounded-xl flex items-start gap-3 text-sm"
            >
              <FiInfo className="mt-0.5 shrink-0" />
              <div>
                <p className="font-bold">{t('profile.errors.title')}</p>
                <p className="opacity-90">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Card */}
        <motion.div
          layout
          className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileInputField
                label={t('profile.fields.firstName')}
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <ProfileInputField
                label={t('profile.fields.lastName')}
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <div className="sm:col-span-2">
                 <ProfileInputField
                  label={t('profile.fields.email')}
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  type="email"
                />
              </div>
              <div className="sm:col-span-2">
                <PhoneInputField
                  label={t('profile.fields.phone')}
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Form Footer Action */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="pt-6 border-t border-slate-100 flex justify-end"
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <FiSave className="w-4 h-4" />
                    )}
                    {isLoading ? t('profile.buttons.saving') : t('profile.buttons.save')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;