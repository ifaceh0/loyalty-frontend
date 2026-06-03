// import React, { useState, useEffect, useRef } from "react";
// import Confetti from "react-confetti";
// import { Eye, EyeOff, Lock, Mail, RefreshCw, User, Smartphone, Puzzle, Globe } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useTranslation } from 'react-i18next'; 
// import { motion } from "framer-motion";
// import { API_BASE_URL } from '../../apiConfig';

// // Animation variants
// const formVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
// };

// const buttonVariants = {
//   hover: { scale: 1.03, y: -2 },
//   tap: { scale: 0.97 }
// };

// function UnderlineInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
//   return (
//     <div className="group relative w-full transition-all duration-300">
//       {/* Container with soft background and organic rounding */}
//       <div className="flex items-center w-full px-4 py-1 bg-slate-50/50 border border-slate-200 rounded-lg transition-all duration-500 
//                     shadow-[0_2px_4px_rgba(0,0,0,0.02)] 
//                     focus-within:bg-white focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:shadow-xl focus-within:shadow-indigo-500/5">
        
//         {/* Leading Icon */}
//         {Icon && (
//           <div className="flex-shrink-0 mr-3 text-slate-400 transition-colors duration-300 group-focus-within:text-indigo-500">
//             <Icon className="h-5 w-5 stroke-[1.5]" />
//           </div>
//         )}
        
//         {/* Input Field */}
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={label} 
//           className="w-full h-full text-base sm:text-[17px] text-slate-800 bg-transparent py-2 outline-none 
//                     placeholder:text-slate-400 placeholder:font-medium tracking-tight"
//           required
//         />
        
//         {/* Trailing Toggle Action */}
//         {ToggleIcon && (
//           <button 
//             type="button" 
//             onClick={onToggle} 
//             className="flex-shrink-0 ml-2 p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 active:scale-90"
//           >
//             <ToggleIcon className="h-5 w-5 stroke-[1.5]" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// function PhoneInputField({ label, value, onChange }) {
//   const { t } = useTranslation();
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     let input = e.target.value;
//     input = input.replace(/\D/g, "");
//     if (input.length > 10) input = input.slice(0, 10);

//     if (input && input.length !== 10) {
//       setError(t("userSignup.error.phone10Digits"));
//     } else {
//       setError("");
//     }

//     onChange(input);
//   };

//   return (
//     <div className="relative flex items-center w-full">
//       <div className={`flex items-center w-full px-4 py-1 bg-slate-50/50 border border-slate-200 rounded-lg transition-all duration-500 
//                     shadow-[0_2px_4px_rgba(0,0,0,0.02)] 
//                     focus-within:bg-white focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:shadow-xl focus-within:shadow-indigo-500/5 ${
//         error ? "border-red-500" : "border-gray-300 focus-within:border-blue-600"
//       }`}>
//         <Smartphone className={`flex-shrink-0 mr-3 text-slate-400 transition-colors duration-300 group-focus-within:text-indigo-500 ${
//           error ? "text-red-500" : "text-gray-500 focus-within:text-blue-600"
//         }`} />

//         <input
//           type="text"
//           value={value}
//           onChange={handleChange}
//           placeholder={label}
//           maxLength={10}
//           inputMode="numeric"
//           className="w-full h-full text-base sm:text-lg text-gray-900 bg-transparent py-2 outline-none placeholder:text-gray-500"
//           required
//         />
//       </div>
//       {error && <p className="absolute -bottom-6 left-0 text-xs text-red-500">{error}</p>}
//       {value.length === 10 && !error && (
//         <p className="absolute -bottom-6 left-0 text-xs text-green-600">{t("userSignup.validPhone")}</p>
//       )}
//     </div>
//   );
// }

// function CountrySelect({ value, onChange }) {
//   const { t } = useTranslation();

//   return (
//     <div className="relative flex items-center w-full">
//       <Globe
//         size={18}
//         className="absolute left-4 text-gray-500 pointer-events-none"
//       />
//       <div className="flex items-center w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg transition-all duration-500 
//                     shadow-[0_2px_4px_rgba(0,0,0,0.02)] 
//                     focus-within:bg-white focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:shadow-xl focus-within:shadow-indigo-500/5">
//         <select
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-full h-full bg-transparent text-gray-900 outline-none pl-8 text-base sm:text-lg"
//           required
//         >
//           <option value="">{t("userSignup.selectCountry")}</option>
//           <option value="IN">IN</option>
//           <option value="US">US</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// function UserSignup() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     country: "",
//     password: "",
//     confirmPassword: "",
//     captchaInput: "",
//   });

//   const [referralShopId, setReferralShopId] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [captchaText, setCaptchaText] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [step, setStep] = useState(1);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const canvasRef = useRef(null);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const shopId = queryParams.get("referralShopId"); 
//     if (shopId) {
//       setReferralShopId(shopId);
//     }
//     if (step === 3) generateCaptcha();
//   }, [step, location.search]);

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const generateCaptcha = () => {
//     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//     let text = "";
//     for (let i = 0; i < 5; i++) {
//       text += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setCaptchaText(text);
//     const canvas = canvasRef.current;
//     if (canvas) {
//         const ctx = canvas.getContext("2d");
//         ctx.clearRect(0, 0, 100, 40);
//         ctx.font = "bold 22px Arial";
//         ctx.fillStyle = "#2563EB";
        
//         ctx.save();
//         ctx.translate(5, 30);
//         ctx.rotate(-0.03 * Math.PI + Math.random() * 0.1 - 0.03);
//         ctx.fillText(text, 0, 0);
//         ctx.restore();

//         ctx.strokeStyle = '#2563EB'; 
//         ctx.lineWidth = 1;
//         for (let i = 0; i < 3; i++) {
//           ctx.beginPath();
//           ctx.moveTo(Math.random() * 120, Math.random() * 40);
//           ctx.lineTo(Math.random() * 120, Math.random() * 40);
//           ctx.stroke();
//         }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePhoneChange = (value) => {
//     setFormData((prev) => ({ ...prev, phoneNumber: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const phoneDigits = formData.phoneNumber.replace(/\D/g, "");
//     if (phoneDigits.length !== 10) {
//       setError(t("userSignup.error.phone10Digits"));
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError(t("userSignup.error.passwordMismatch"));
//       return;
//     }
//     if (formData.captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
//       setError(t("userSignup.error.invalidCaptcha"));
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSuccess(false);

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/auth/registerUser`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           phone: formData.phoneNumber, 
//           email: formData.email,
//           country: formData.country.toLowerCase(),
//           password: formData.password,
//           referralShopId: referralShopId,
//         }),
//       });

//       const contentType = response.headers.get("content-type");

//       if (response.ok) {
//         setFormData({
//           firstName: "", lastName: "", phoneNumber: "", email: "",
//           password: "", confirmPassword: "", captchaInput: "",
//         });
//         generateCaptcha();
//         setSuccess(true);
//         if (audioRef.current) audioRef.current.play();
//         setTimeout(() => navigate("/signin"), 7000);
//       } else {
//         const errorMessage = contentType && contentType.includes("application/json")
//           ? (await response.json()).message
//           : await response.text();
//         setError(errorMessage || t("userSignup.error.signupFailed"));
//       }
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError(t("userSignup.error.networkError"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (step === 1 && (!formData.firstName.trim() || !formData.lastName.trim())) {
//       setError(t("userSignup.error.fillAllFields"));
//       setTimeout(() => setError(""), 3000);
//       return;
//     }
//     if (step === 2) {
//       if (!formData.phoneNumber.trim() || !formData.email.trim()) {
//         setError(t("userSignup.error.fillAllFields"));
//         setTimeout(() => setError(""), 3000);
//         return;
//       }
//       if (!validateEmail(formData.email)) {
//         setError(t("userSignup.error.invalidEmail"));
//         setTimeout(() => setError(""), 3000);
//         return;
//       }
//       const phoneDigits = formData.phoneNumber.replace(/\D/g, "");
//       if (phoneDigits.length !== 10) {
//         setError(t("userSignup.error.phone10Digits"));
//         setTimeout(() => setError(""), 3000);
//         return;
//       }
//       if (!formData.country) {
//         setError(t("userSignup.error.selectCountry"));
//         setTimeout(() => setError(""), 3000);
//         return;
//       }
//     }
//     if (step === 3 && (!formData.password.trim() || !formData.confirmPassword.trim())) {
//       setError(t("userSignup.error.fillAllFields"));
//       setTimeout(() => setError(""), 3000);
//       return;
//     }
//     setError("");
//     setStep((prev) => prev + 1);
//   };

//   const getProgress = () => (step / 3) * 100;

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
//       {success && <Confetti recycle={false} numberOfPieces={300} />}

//       <motion.div
//         variants={formVariants}
//         initial="hidden"
//         animate="visible"
//         className="w-full max-w-md sm:max-w-lg bg-white rounded-xl p-8 shadow-sm border border-slate-200"
//       >
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-2 sm:mb-3">
//           {t("userSignup.title")}
//         </h2>
//         <p className="text-center text-gray-500 text-sm sm:text-base mb-5 sm:mb-6">
//           {t("userSignup.step")} {step} {t("userSignup.of")} 3
//         </p>
        
//         <div className="w-full h-2 bg-gray-200 rounded-full mb-6 sm:mb-8 overflow-hidden">
//           <motion.div
//             className="h-full bg-gradient-to-r from-white to-green-600 rounded-full"
//             initial={{ width: 0 }}
//             animate={{ width: `${getProgress()}%` }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           />
//         </div>

//         {error && (
//           <p className="text-red-500 text-sm sm:text-base text-center mb-5 sm:mb-6 animate-pulse border border-red-200 bg-red-50 p-2.5 sm:p-3 rounded">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
//           {step === 1 && (
//             <div className="space-y-6 sm:space-y-8">
//               <UnderlineInput label={t("userSignup.firstName")} name="firstName" value={formData.firstName} onChange={handleChange} Icon={User} />
//               <UnderlineInput label={t("userSignup.lastName")} name="lastName" value={formData.lastName} onChange={handleChange} Icon={User} />
//             </div>
//           )}

//           {step === 2 && (
//             <div className="space-y-8">
//               <PhoneInputField
//                 label={t("userSignup.phoneNumber")}
//                 value={formData.phoneNumber}
//                 onChange={handlePhoneChange}
//               />

//               <UnderlineInput label={t("userSignup.email")} name="email" value={formData.email} onChange={handleChange} Icon={Mail} />
              
//               <CountrySelect
//                 value={formData.country}
//                 onChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
//               />
//             </div>
//           )}

//           {step === 3 && (
//             <div className="space-y-6 sm:space-y-8">
//               <UnderlineInput
//                 label={t("userSignup.password")}
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={handleChange}
//                 Icon={Lock}
//                 ToggleIcon={showPassword ? EyeOff : Eye}
//                 onToggle={() => setShowPassword(!showPassword)}
//               />
//               <UnderlineInput
//                 label={t("userSignup.confirmPassword")}
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 Icon={Lock}
//                 ToggleIcon={showConfirmPassword ? EyeOff : Eye}
//                 onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
//               />              

//               <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-4 pt-1 sm:pt-2">
//                 <div className="w-full sm:flex-grow">
//                   <UnderlineInput 
//                     label={t("userSignup.enterCaptcha")} 
//                     name="captchaInput" 
//                     value={formData.captchaInput} 
//                     onChange={handleChange} 
//                     Icon={Puzzle} 
//                   />
//                 </div>
//                 <div className="flex items-center gap-3 w-full sm:w-auto">
//                   <div className="flex-shrink-0 w-24 h-10 bg-gray-100 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center">
//                     <canvas ref={canvasRef} width={100} height={40} className="w-full h-full" />
//                   </div>
//                   <button 
//                     type="button" 
//                     onClick={generateCaptcha} 
//                     className="flex-shrink-0 w-10 h-10 text-gray-500 hover:text-blue-600 transition-colors duration-200 border border-slate-200 rounded-full flex items-center justify-center shadow-sm"
//                     aria-label="Refresh CAPTCHA"
//                   >
//                     <RefreshCw className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>

//               <motion.button
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full bg-slate-900 text-white shadow-md text-white font-bold py-2 rounded-full transition-all duration-300 text-md
//                   ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-600"}`}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z" />
//                     </svg>
//                     {t("userSignup.signingUp")}
//                   </span>
//                 ) : t("userSignup.completeSignup")}
//               </motion.button>
//             </div>
//           )}
//         </form>

//         <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
//           {step < 3 && (
//             <NextButton onClick={nextStep} />
//           )}

//           {step > 1 && step < 4 && (
//             <button
//               type="button"
//               onClick={() => setStep((prev) => prev - 1)}
//               className="w-full py-2 bg-gray-200 hover:bg-gray-300 active:scale-[0.99] text-gray-700 font-semibold rounded-full transition-all duration-300 text-md"
//             >
//               {t("userSignup.back")}
//             </button>
//           )}
//         </div>
        
//         <div className="text-center mt-6 sm:mt-8 text-sm sm:text-base">
//           <span className="text-gray-500">{t("userSignup.alreadyHaveAccount")} </span>
//           <button 
//             onClick={() => navigate("/signin")} 
//             className="text-blue-600 hover:text-blue-700 font-bold hover:underline"
//           >
//             {t("userSignup.signIn")}
//           </button>
//         </div>

//         <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
//       </motion.div>
//     </div>
//   );
// }

// function NextButton({ onClick }) {
//   const { t } = useTranslation();
//   return (
//     <motion.button
//       variants={buttonVariants}
//       whileHover="hover"
//       whileTap="tap"
//       type="button"
//       onClick={onClick}
//       className="w-full py-2 font-bold rounded-full transition-all duration-300 text-md
//         bg-slate-900 text-white hover:bg-blue-600 shadow-md"
//     >
//       {t("userSignup.next")}
//     </motion.button>
//   );
// }

// export default UserSignup;
















import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { Eye, EyeOff, Lock, Mail, RefreshCw, User, Smartphone, Puzzle, Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next'; 
import { motion } from "framer-motion";
import { API_BASE_URL } from '../../apiConfig';

// Animation variants
const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const buttonVariants = {
  hover: { scale: 1.03, y: -2 },
  tap: { scale: 0.97 }
};

function UnderlineInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
  return (
    <div className="group relative w-full transition-all duration-300">
      {/* Container with soft background and organic rounding */}
      <div className="flex items-center w-full px-4 py-1 bg-slate-50/50 border border-slate-200 rounded transition-all duration-500 
                    shadow-[0_2px_4px_rgba(0,0,0,0.02)] 
                    focus-within:bg-white focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:shadow-xl focus-within:shadow-indigo-500/5">
        
        {/* Leading Icon */}
        {Icon && (
          <div className="flex-shrink-0 mr-3 text-slate-400 transition-colors duration-300 group-focus-within:text-indigo-500">
            <Icon className="h-5 w-5 stroke-[1.5]" />
          </div>
        )}
        
        {/* Input Field */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label} 
          className="w-full h-full text-base sm:text-[17px] text-slate-800 bg-transparent py-1.5 outline-none 
                    placeholder:text-slate-400 placeholder:font-medium tracking-tight"
          required
        />
        
        {/* Trailing Toggle Action */}
        {ToggleIcon && (
          <button 
            type="button" 
            onClick={onToggle} 
            className="flex-shrink-0 ml-2 p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 active:scale-90"
          >
            <ToggleIcon className="h-5 w-5 stroke-[1.5]" />
          </button>
        )}
      </div>
    </div>
  );
}

function PhoneInputField({ label, value, onChange }) {
  const { t } = useTranslation();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let input = e.target.value;
    input = input.replace(/\D/g, "");
    if (input.length > 10) input = input.slice(0, 10);

    if (input && input.length !== 10) {
      setError(t("userSignup.error.phone10Digits"));
    } else {
      setError("");
    }

    onChange(input);
  };

  return (
    <div className="relative flex items-center w-full">
      <div className={`flex items-center w-full px-4 py-1 bg-slate-50/50 border border-slate-200 rounded transition-all duration-500 
                    shadow-[0_2px_4px_rgba(0,0,0,0.02)] 
                    focus-within:bg-white focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:shadow-xl focus-within:shadow-indigo-500/5 ${
        error ? "border-red-500" : "border-gray-300 focus-within:border-blue-600"
      }`}>
        <Smartphone className={`flex-shrink-0 mr-3 text-slate-400 transition-colors duration-300 group-focus-within:text-indigo-500 ${
          error ? "text-red-500" : "text-gray-500 focus-within:text-blue-600"
        }`} />

        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={label}
          maxLength={10}
          inputMode="numeric"
          className="w-full h-full text-base sm:text-lg text-gray-900 bg-transparent py-1.5 outline-none placeholder:text-gray-500"
          required
        />
      </div>
      {error && <p className="absolute -bottom-6 left-0 text-xs text-red-500">{error}</p>}
      {value.length === 10 && !error && (
        <p className="absolute -bottom-5 left-0 text-xs text-green-600">{t("userSignup.validPhone")}</p>
      )}
    </div>
  );
}

function CountrySelect({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="relative flex items-center w-full">
      <Globe
        size={18}
        className="absolute left-4 text-gray-500 pointer-events-none"
      />
      <div className="flex items-center w-full px-4 py-2 bg-slate-50/50 border border-slate-200 rounded transition-all duration-500 
                    shadow-[0_2px_4px_rgba(0,0,0,0.02)] 
                    focus-within:bg-white focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:shadow-xl focus-within:shadow-indigo-500/5">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full bg-transparent text-gray-900 outline-none pl-8 text-base sm:text-lg"
          required
        >
          <option value="">{t("userSignup.selectCountry")}</option>
          <option value="IN">IN</option>
          <option value="US">US</option>
        </select>
      </div>
    </div>
  );
}

function UserSignup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
    captchaInput: "",
  });

  const [referralShopId, setReferralShopId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const shopId = queryParams.get("referralShopId"); 
    if (shopId) {
      setReferralShopId(shopId);
    }
    if (step === 2) generateCaptcha();
  }, [step, location.search]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 5; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 100, 40);
        ctx.font = "bold 22px Arial";
        ctx.fillStyle = "#2563EB";
        
        ctx.save();
        ctx.translate(5, 30);
        ctx.rotate(-0.03 * Math.PI + Math.random() * 0.1 - 0.03);
        ctx.fillText(text, 0, 0);
        ctx.restore();

        ctx.strokeStyle = '#2563EB'; 
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(Math.random() * 120, Math.random() * 40);
          ctx.lineTo(Math.random() * 120, Math.random() * 40);
          ctx.stroke();
        }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneDigits = formData.phoneNumber.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      setError(t("userSignup.error.phone10Digits"));
      return;
    }

    if (!validateEmail(formData.email)) {
      setError(t("userSignup.error.invalidEmail"));
      return;
    }

    if (!formData.password.trim()) {
      setError(t("userSignup.error.fillAllFields"));
      return;
    }

    if (!formData.confirmPassword.trim()) {
      setError(t("userSignup.error.fillAllFields"));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("userSignup.error.passwordMismatch"));
      return;
    }
    if (formData.captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
      setError(t("userSignup.error.invalidCaptcha"));
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/registerUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phoneNumber, 
          email: formData.email,
          country: formData.country,
          password: formData.password,
          referralShopId: referralShopId,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (response.ok) {
        setFormData({
          firstName: "", lastName: "", phoneNumber: "", email: "", country: "",
          password: "", confirmPassword: "", captchaInput: "",
        });
        generateCaptcha();

        const data = await response.json();

        setSuccessMessage(data.message);
        setSuccess(true);
        // setSuccess(true);
        if (audioRef.current) audioRef.current.play();
        setTimeout(() => navigate("/signin"), 7000);
      } else {
        const errorMessage = contentType && contentType.includes("application/json")
          ? (await response.json()).message
          : await response.text();
        setError(errorMessage || t("userSignup.error.signupFailed"));
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(t("userSignup.error.networkError"));
    } finally {
      setLoading(false);
    }
  };

  // const nextStep = () => {
  //   if (step === 1 && (!formData.firstName.trim() || !formData.lastName.trim())) {
  //     setError(t("userSignup.error.fillAllFields"));
  //     setTimeout(() => setError(""), 3000);
  //     return;
  //   }
  //   if (step === 2) {
  //     if (!formData.phoneNumber.trim() || !formData.email.trim()) {
  //       setError(t("userSignup.error.fillAllFields"));
  //       setTimeout(() => setError(""), 3000);
  //       return;
  //     }
  //     if (!validateEmail(formData.email)) {
  //       setError(t("userSignup.error.invalidEmail"));
  //       setTimeout(() => setError(""), 3000);
  //       return;
  //     }
  //     const phoneDigits = formData.phoneNumber.replace(/\D/g, "");
  //     if (phoneDigits.length !== 10) {
  //       setError(t("userSignup.error.phone10Digits"));
  //       setTimeout(() => setError(""), 3000);
  //       return;
  //     }
  //     if (!formData.country) {
  //       setError(t("userSignup.error.selectCountry"));
  //       setTimeout(() => setError(""), 3000);
  //       return;
  //     }
  //   }
  //   if (step === 3 && (!formData.password.trim() || !formData.confirmPassword.trim())) {
  //     setError(t("userSignup.error.fillAllFields"));
  //     setTimeout(() => setError(""), 3000);
  //     return;
  //   }
  //   setError("");
  //   setStep((prev) => prev + 1);
  // };
  const nextStep = () => {
    if (step === 1) {
      if (
        !formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !formData.phoneNumber.trim() ||
        // !formData.email.trim() ||
        !formData.country
      ) {
        setError(t("userSignup.error.fillAllFields"));
        return;
      }

      // if (!validateEmail(formData.email)) {
      //   setError(t("userSignup.error.invalidEmail"));
      //   return;
      // }

      const phoneDigits = formData.phoneNumber.replace(/\D/g, "");

      if (phoneDigits.length !== 10) {
        setError(t("userSignup.error.phone10Digits"));
        return;
      }
    }

    setError("");
    setStep(2);
  };

  const getProgress = () => (step / 2) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      {/* {success && <Confetti recycle={false} numberOfPieces={300} />} */}

      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md sm:max-w-lg bg-white rounded-xl p-8 shadow-sm border border-slate-200"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-2 sm:mb-3">
          {t("userSignup.title")}
        </h2>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-5 sm:mb-6">
          {t("userSignup.step")} {step} {t("userSignup.of")} 2
        </p>
        
        <div className="w-full h-2 bg-gray-200 rounded-full mb-6 sm:mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-white to-green-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getProgress()}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm sm:text-base text-center mb-5 sm:mb-6 animate-pulse border border-red-200 bg-red-50 p-2.5 sm:p-3 rounded">
            {error}
          </p>
        )}

        {successMessage && (
          <p className="text-green-700 text-sm sm:text-base text-center mb-5 sm:mb-6 border border-green-300 bg-green-50 p-3 rounded">
            🎉 {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* {step === 1 && (
            <div className="space-y-6 sm:space-y-8">
              <UnderlineInput label={t("userSignup.firstName")} name="firstName" value={formData.firstName} onChange={handleChange} Icon={User} />
              <UnderlineInput label={t("userSignup.lastName")} name="lastName" value={formData.lastName} onChange={handleChange} Icon={User} />
            </div>
          )} */}
          {step === 1 && (
            <div className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UnderlineInput
                  label={t("userSignup.firstName")}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  // Icon={User}
                />

                <UnderlineInput
                  label={t("userSignup.lastName")}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  // Icon={User}
                />
              </div>

              <PhoneInputField
                label={t("userSignup.phoneNumber")}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
              />

              <CountrySelect
                value={formData.country}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    country: value,
                  }))
                }
              />
            </div>
          )}

          {/* {step === 2 && (
            <div className="space-y-8">
              <PhoneInputField
                label={t("userSignup.phoneNumber")}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
              />

              <UnderlineInput label={t("userSignup.email")} name="email" value={formData.email} onChange={handleChange} Icon={Mail} />
              
              <CountrySelect
                value={formData.country}
                onChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
              />
            </div>
          )} */}

          {step === 2 && (
            <div className="space-y-6 sm:space-y-8">
              <UnderlineInput
                label={t("userSignup.email")}
                name="email"
                value={formData.email}
                onChange={handleChange}
                Icon={Mail}
              />

              <UnderlineInput
                label={t("userSignup.password")}
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                Icon={Lock}
                ToggleIcon={showPassword ? EyeOff : Eye}
                onToggle={() => setShowPassword(!showPassword)}
              />
              <UnderlineInput
                label={t("userSignup.confirmPassword")}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                Icon={Lock}
                ToggleIcon={showConfirmPassword ? EyeOff : Eye}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />              

              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-4 pt-1 sm:pt-2">
                <div className="w-full sm:flex-grow">
                  <UnderlineInput 
                    label={t("userSignup.enterCaptcha")} 
                    name="captchaInput" 
                    value={formData.captchaInput} 
                    onChange={handleChange} 
                    Icon={Puzzle} 
                  />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex-shrink-0 w-24 h-10 bg-gray-100 border border-slate-200 rounded overflow-hidden flex items-center justify-center">
                    <canvas ref={canvasRef} width={100} height={40} className="w-full h-full" />
                  </div>
                  <button 
                    type="button" 
                    onClick={generateCaptcha} 
                    className="flex-shrink-0 w-10 h-10 text-gray-500 hover:text-blue-600 transition-colors duration-200 border border-slate-200 rounded-full flex items-center justify-center shadow-sm"
                    aria-label="Refresh CAPTCHA"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                type="submit"
                disabled={loading}
                className={`w-full bg-slate-900 text-white shadow-md text-white font-bold py-2 rounded-full transition-all duration-300 text-md
                  ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-600"}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z" />
                    </svg>
                    {t("userSignup.signingUp")}
                  </span>
                ) : t("userSignup.completeSignup")}
              </motion.button>
            </div>
          )}
        </form>

        <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
          {step < 2 && (
            <NextButton onClick={nextStep} />
          )}

          {/* {step > 1 && step < 4 && ( */}
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="w-full py-2 bg-gray-200 hover:bg-gray-300 active:scale-[0.99] text-gray-700 font-semibold rounded-full transition-all duration-300 text-md"
            >
              {t("userSignup.back")}
            </button>
          )}
        </div>
        
        <div className="text-center mt-6 sm:mt-8 text-sm sm:text-base">
          <span className="text-gray-500">{t("userSignup.alreadyHaveAccount")} </span>
          <button 
            onClick={() => navigate("/signin")} 
            className="text-blue-600 hover:text-blue-700 font-bold hover:underline"
          >
            {t("userSignup.signIn")}
          </button>
        </div>

        <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
      </motion.div>
    </div>
  );
}

function NextButton({ onClick }) {
  const { t } = useTranslation();
  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      type="button"
      onClick={onClick}
      className="w-full py-2 font-bold rounded-full transition-all duration-300 text-md
        bg-slate-900 text-white hover:bg-blue-600 shadow-md"
    >
      {t("userSignup.next")}
    </motion.button>
  );
}

export default UserSignup;