// import React, { useState, useEffect } from 'react';
// import { FiEdit3, FiSave, FiX, FiUser, FiMail, FiPhone } from 'react-icons/fi'; 
// import { motion, AnimatePresence } from 'framer-motion';
// import { Loader2 } from 'lucide-react';

// const UserProfile = () => {
//   const [userData, setUserData] = useState({
//     userId: null,
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // --- Data Fetching Logic (Unchanged) ---
//   useEffect(() => {
//     const userId = localStorage.getItem('id');
//     if (userId) {
//       fetchUserDetails(userId);
//     } else {
//       setError('No user ID found. Please log in.');
//     }
//   }, []);

//   const fetchUserDetails = async (userId) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `https://loyalty-backend-java.onrender.com/api/user/get-profile?userId=${userId}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.ok) {
//         const user = await response.json();
//         setUserData({
//           userId: user.userId || null,
//           firstName: user.firstName || '',
//           lastName: user.lastName || '',
//           phone: user.phone || '',
//           email: user.email || '',
//         });
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Failed to fetch user details');
//       }
//     } catch (error) {
//       setError('Error fetching user details');
//       console.error('Fetch error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- Handler Logic (Unchanged) ---
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^\d{10}$/;
//     if (!userData.firstName.trim()) return 'First name is required';
//     if (!userData.lastName.trim()) return 'Last name is required';
//     if (!phoneRegex.test(userData.phone)) return 'Phone number must be 10 digits';
//     if (!emailRegex.test(userData.email)) return 'Invalid email format';
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const userId = parseInt(localStorage.getItem('id'), 10);
//       if (isNaN(userId)) {
//         throw new Error('Invalid user ID');
//       }

//       const payload = {
//         userId,
//         firstName: userData.firstName.trim(),
//         lastName: userData.lastName.trim(),
//         phone: userData.phone.trim(),
//         email: userData.email.trim(),
//       };

//       const response = await fetch(
//         'https://loyalty-backend-java.onrender.com/api/user/update-profile',
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (response.ok) {
//         alert('Profile updated successfully! 🎉');
//         setIsEditing(false);
//         fetchUserDetails(userId); // Refresh data
//       } else {
//         const errorData = await response.json();
//         console.error('Update error response:', errorData);
//         setError(errorData.message || 'Error updating profile');
//       }
//     } catch (error) {
//       setError('Submission error: ' + error.message);
//       console.error('Submission error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//     setError(null);
//   };
  
//   const ProfileInputField = ({ label, name, value, onChange, disabled, type = 'text', icon: Icon, placeholder, required = true }) => (
//     <div className="mb-6">
//       <label htmlFor={name} className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
//         {label}
//       </label>
//       <div className="relative">
//         {Icon && (
//             <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${disabled ? 'text-gray-400' : 'text-indigo-500'}`} />
//         )}
//         <input
//           type={type}
//           id={name}
//           name={name}
//           value={value}
//           onChange={onChange}
//           className={`w-full border ${
//             disabled ? 'border-gray-200 bg-gray-50 text-gray-600' : 'border-indigo-300 bg-white text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 shadow-md'
//           } rounded-xl p-3 pl-12 text-base transition-all duration-300 ease-in-out placeholder-gray-400 focus:outline-none focus:ring-2`}
//           placeholder={placeholder}
//           disabled={disabled}
//           required={required}
//         />
//       </div>
//     </div>
//   );

//   if (isLoading && !userData.userId) { 
//     return (
//       <div className="flex flex-col items-center justify-center h-[60vh]">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
//             <span className="text-xl font-bold text-gray-800">Loading Profile</span>
//           </div>
//           <p className="text-gray-500">Retrieving your personal details securely.</p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-start justify-center min-h-screen bg-indigo-50 p-4 sm:p-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
//       >
        
//         {/* Header with Background Image/Gradient */}
//         <header className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white px-8 py-10 relative">
//           <h2 className="text-3xl font-extrabold tracking-tight relative z-10">
//             Welcome Back, {userData.firstName || 'User'}!
//           </h2>
//           <p className="text-indigo-200 text-sm mt-1 relative z-10">Manage and update your personal information here.</p>
//           <div className="absolute inset-0 opacity-10 bg-black/30"></div>
//         </header>

//         <div className="p-6 sm:p-8">
          
//           <div className="flex justify-end mb-6">
//             <button
//               onClick={handleEditToggle}
//               className={`px-6 py-3 rounded-full font-bold transition duration-300 ease-in-out flex items-center gap-2 shadow-lg border-2
//                 ${isEditing 
//                   ? 'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600' 
//                   : 'bg-indigo-500 text-white border-indigo-400 hover:bg-indigo-600'
//                 }
//               `}
//               aria-label={isEditing ? "Cancel Editing" : "Edit Profile"}
//             >
//               {isEditing ? <FiX size={20} /> : <FiEdit3 size={18} />}
//               <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
//             </button>
//           </div>

//           <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-xl mb-6 text-base overflow-hidden"
//               role="alert"
//             >
//               <p className="font-bold flex items-center gap-2">⚠️ Validation Alert:</p>
//               <p className="mt-1">{error}</p>
//             </motion.div>
//           )}
//           </AnimatePresence>

//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            
//             {/* First Name */}
//             <ProfileInputField
//               label="First Name"
//               name="firstName"
//               value={userData.firstName}
//               onChange={handleChange}
//               disabled={!isEditing}
//               icon={FiUser}
//               placeholder="Your first name"
//             />
            
//             {/* Last Name */}
//             <ProfileInputField
//               label="Last Name"
//               name="lastName"
//               value={userData.lastName}
//               onChange={handleChange}
//               disabled={!isEditing}
//               icon={FiUser}
//               placeholder="Your last name"
//             />

//             {/* Phone Number */}
//             <ProfileInputField
//               label="Phone Number"
//               name="phone"
//               value={userData.phone}
//               onChange={handleChange}
//               disabled={!isEditing}
//               type="tel"
//               icon={FiPhone}
//               placeholder="10-digit phone number"
//             />

//             {/* Email Address */}
//             <ProfileInputField
//               label="Email Address"
//               name="email"
//               value={userData.email}
//               onChange={handleChange}
//               disabled={!isEditing}
//               type="email"
//               icon={FiMail}
//               placeholder="your.email@example.com"
//             />
            
//             {isEditing && (
//               <motion.div 
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//                 className="md:col-span-2 pt-4"
//               >
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-extrabold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.005] transition duration-300 ease-in-out flex items-center justify-center gap-3 ${
//                     isLoading ? 'opacity-70 cursor-wait' : ''
//                   }`}
//                   aria-label="Save Changes"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="animate-spin" size={20} />
//                       <span>Saving Changes...</span>
//                     </>
//                   ) : (
//                     <>
//                       <FiSave size={20} />
//                       <span>Save Changes</span>
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











import React, { useState, useEffect } from 'react';
import { FiEdit3, FiSave, FiX, FiUser, FiMail, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// --- Original Input Field ---
const ProfileInputField = ({ label, name, value, onChange, disabled, type = 'text', icon: Icon }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${disabled ? 'text-gray-400' : 'text-emerald-500'}`} />
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange} 
        className={`w-full border ${
          disabled 
            ? 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed' 
            : 'border-gray-300 bg-white text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm'
        } rounded-lg py-3 px-4 pl-10 text-base transition-all duration-200 ease-in-out placeholder-gray-400 focus:outline-none focus:ring-1`}
        placeholder={label}
        disabled={disabled}
        required
      />
    </div>
  </div>
);

// --- NEW: Phone Input with 10-digit Validation ---
const PhoneInputField = ({ label, name, value, onChange, disabled, icon: Icon = FiPhone }) => {
  const [error, setError] = useState("");

  const validatePhone = (val) => {
    const digitsOnly = val.replace(/\D/g, ""); // Remove non-digits
    if (val && !/^\d{0,10}$/.test(val)) {
      setError("Only digits allowed (0-9)");
    } else if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
      setError("Phone must be exactly 10 digits");
    } else {
      setError("");
    }
    return digitsOnly;
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;

    // Allow only digits
    if (!/^\d*$/.test(inputValue)) return;

    // Limit to 10 digits
    if (inputValue.length > 10) inputValue = inputValue.slice(0, 10);

    const formatted = validatePhone(inputValue);
    onChange({ target: { name, value: formatted } });
  };

  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${disabled ? 'text-gray-400' : error ? 'text-red-500' : 'text-emerald-500'}`} />
        )}
        <input
          type="text"
          id={name}
          name={name}
          value={value || ""}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Enter 10-digit mobile number"
          maxLength={10}
          inputMode="numeric"
          className={`w-full border ${
            disabled 
              ? 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed' 
              : error 
                ? 'border-red-400 bg-white text-gray-900 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 bg-white text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm'
          } rounded-lg py-3 px-4 pl-10 text-base transition-all duration-200 ease-in-out placeholder-gray-400 focus:outline-none focus:ring-1`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {value && value.length === 10 && !error && (
        <p className="mt-1 text-xs text-green-600">Valid 10-digit number</p>
      )}
    </div>
  );
};

const UserProfile = () => {
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
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [successMessage]);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (userId) {
      fetchUserDetails(userId);
    } else {
      setError('No user ID found. Please log in.');
    }
  }, []);

  const fetchUserDetails = async (userId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://loyalty-backend-java.onrender.com/api/user/get-profile?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

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
        setError(errorData.message || 'Failed to fetch user details');
      }
    } catch (error) {
      setError('Error fetching user details');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- UPDATED: validateForm with 10-digit phone check ---
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = (userData.phone || "").replace(/\D/g, "");

    if (!userData.firstName.trim()) return 'First name is required';
    if (!userData.lastName.trim()) return 'Last name is required';
    if (userData.phone && phoneDigits.length !== 10) {
      return 'Phone number must be exactly 10 digits';
    }
    if (!emailRegex.test(userData.email)) return 'Invalid email format';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const userId = parseInt(localStorage.getItem('id'), 10);
      if (isNaN(userId)) {
        throw new Error('Invalid user ID');
      }

      const payload = {
        userId,
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        phone: userData.phone.trim(),
        email: userData.email.trim(),
      };

      const response = await fetch(
        'https://loyalty-backend-java.onrender.com/api/user/update-profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setSuccessMessage('Profile updated successfully!');
        setIsEditing(false);
        setInitialData(userData); 
      } else {
        const errorData = await response.json();
        console.error('Update error response:', errorData);
        setError(errorData.message || 'Error updating profile');
      }
    } catch (error) {
      setError('Submission error: ' + error.message);
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
        setUserData(initialData);
    }
    setIsEditing(!isEditing);
    setError(null);
    setSuccessMessage(null); 
  };

  if (isLoading && !userData.userId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
            <span className="text-xl font-bold text-gray-800">Loading Profile</span>
          </div>
          <p className="text-gray-500">Retrieving your personal details securely.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="max-w-xl w-full bg-white rounded-xl shadow-2xl border border-gray-100"
      >
        
        <header className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-t-lg px-8 py-10 relative">
          <h2 className="text-3xl font-extrabold tracking-tight relative z-10">
            Welcome Back, {userData.firstName || 'User'}!
          </h2>
          <p className="text-teal-200 text-sm mt-1 relative z-10">Manage and update your personal information here.</p>
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dot-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-pattern)" />
          </svg>
        </header>

        <div className="p-6 sm:p-8">
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
                Personal Details
            </h3>
            <button
              onClick={handleEditToggle}
              className={`px-4 py-2 rounded-lg font-medium transition duration-200 ease-in-out flex items-center gap-2 text-sm shadow-md 
                ${isEditing 
                  ? 'bg-white text-red-600 border border-red-600 hover:bg-red-50' 
                  : 'bg-gradient-to-br from-teal-600 to-cyan-700 text-white hover:from-teal-700 hover:to-cyan-800'
                }
              `}
              aria-label={isEditing ? "Cancel Editing" : "Edit Profile"}
            >
              {isEditing ? <FiX size={18} /> : <FiEdit3 size={16} />}
              <span>{isEditing ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          <AnimatePresence>
            
            {successMessage && (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-50 border border-green-300 text-green-700 p-4 rounded-lg mb-6 text-base"
                    role="alert"
                >
                    <p className="font-semibold flex items-center gap-2">
                        <FiCheckCircle className="w-5 h-5" /> {successMessage}
                    </p>
                </motion.div>
            )}
            
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg mb-6 text-base overflow-hidden"
                role="alert"
              >
                <p className="font-semibold flex items-center gap-2">Warning: Error:</p>
                <p className="mt-1">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <ProfileInputField
              label="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              icon={FiUser}
            />
            
            <ProfileInputField
              label="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              icon={FiUser}
            />

            {/* CHANGED: Replaced with PhoneInputField */}
            <PhoneInputField
              label="Phone Number"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <ProfileInputField
              label="Email Address"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={!isEditing}
              type="email"
              icon={FiMail}
            />
            
            {isEditing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="sm:col-span-2 pt-4"
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-br from-teal-600 to-cyan-700 text-white py-3 rounded-lg font-bold text-base shadow-lg hover:bg-emerald-600 transition duration-300 ease-in-out flex items-center justify-center gap-3 ${
                    isLoading ? 'opacity-70 cursor-wait' : ''
                  }`}
                  aria-label="Save Changes"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiSave size={20} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;