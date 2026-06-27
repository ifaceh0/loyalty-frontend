// import { useState, useEffect, useRef } from "react";
// import Confetti from "react-confetti";
// import { FaInfoCircle } from "react-icons/fa";
// import {
//   Mail, Lock, Eye, EyeOff, RefreshCw, User, Smartphone, Puzzle
// } from "lucide-react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useTranslation } from 'react-i18next';
// import { motion } from "framer-motion";
// import { API_BASE_URL } from '../../apiConfig';

// const API_BASE = `${API_BASE_URL}/api`;

// // Animation variants
// const formVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
// };

// const buttonVariants = {
//   hover: { scale: 1.03, y: -2 },
//   tap: { scale: 0.97 }
// };

// function UnderlineInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
//   return (
//     <div className="relative flex items-center w-full">
//       <div className="flex items-center w-full px-4 py-1 bg-slate-50/50 border border-slate-200 rounded-lg transition-all duration-500 
//                     shadow-[0_2px_4px_rgba(0,0,0,0.02)] 
//                     focus-within:bg-white focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:shadow-xl focus-within:shadow-indigo-500/5">
//         {Icon && (
//           <div className="flex-shrink-0 mr-3 text-slate-400 transition-colors duration-300 group-focus-within:text-indigo-500">
//             <Icon className="h-5 w-5 stroke-[1.5]" />
//           </div>
//         )}
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
//     let input = e.target.value.replace(/\D/g, "");
//     if (input.length > 10) input = input.slice(0, 10);
//     if (input && input.length !== 10) {
//       setError(t("employeeSignup.error.phone10Digits"));
//     } else {
//       setError("");
//     }
//     onChange(input);
//   };

//   return (
//     <div className="relative flex items-center w-full">
//       <div className={`flex items-center w-full px-4 py-1 bg-slate-50/50 border border-slate-200 rounded-lg transition-all duration-500 
//                     shadow-[0_2px_4px_rgba(0,0,0,0.02)] 
//                     focus-within:bg-white focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:shadow-xl focus-within:shadow-indigo-500/5
//         ${error ? "border-red-500" : "border-gray-300 focus-within:border-blue-600"}`}>
//         <Smartphone className={`flex-shrink-0 mr-3 text-slate-400 transition-colors duration-300 group-focus-within:text-indigo-500
//            ${error ? "text-red-500" : "text-gray-500 focus-within:text-blue-600"}`} />
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
//         <p className="absolute -bottom-6 left-0 text-xs text-green-600">{t("employeeSignup.validPhone")}</p>
//       )}
//     </div>
//   );
// }

// export default function EmployeeSignupPage() {
//   const { t } = useTranslation(); 
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get('token');
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "", lastName: "", phone: "", email: "", password: "", confirmPassword: "", captchaInput: ""
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [captchaText, setCaptchaText] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const canvasRef = useRef(null);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (!token) {
//       setError(t("employeeSignup.error.invalidLink"));
//       return;
//     }

//     generateCaptcha();
//   }, [token, t]);

//   const generateCaptcha = () => {
//     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//     let text = "";
//     for (let i = 0; i < 5; i++) {
//       text += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setCaptchaText(text);
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       ctx.clearRect(0, 0, 100, 40);
//       ctx.font = "bold 22px Arial";
//       ctx.fillStyle = "#2563EB";
//       ctx.save();
//       ctx.translate(5, 30);
//       ctx.rotate(-0.03 * Math.PI + Math.random() * 0.1 - 0.03);
//       ctx.fillText(text, 0, 0);
//       ctx.restore();
//       ctx.strokeStyle = '#2563EB';
//       ctx.lineWidth = 1;
//       for (let i = 0; i < 3; i++) {
//         ctx.beginPath();
//         ctx.moveTo(Math.random() * 120, Math.random() * 40);
//         ctx.lineTo(Math.random() * 120, Math.random() * 40);
//         ctx.stroke();
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setError("");
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePhoneChange = (value) => {
//     setError("");
//     setFormData(prev => ({ ...prev, phone: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.firstName.trim() || !formData.lastName.trim()) {
//         setError(t("employeeSignup.error.fillNames"));
//         return;
//     }
//     const phoneDigits = formData.phone.replace(/\D/g, "");
//     if (phoneDigits.length !== 10) {
//       setError(t("employeeSignup.error.phone10Digits"));
//       return;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setError(t("employeeSignup.error.invalidEmail"));
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError(t("employeeSignup.error.passwordMismatch"));
//       return;
//     }
//     if (!formData.password.trim()) {
//       setError(t("password required"));
//       return;
//     }
//     if (formData.captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
//       setError(t("employeeSignup.error.invalidCaptcha"));
//       generateCaptcha();
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const payload = {
//         token,
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//       };

//       const res = await fetch(`${API_BASE}/employee/signup`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       let data = null;
//       const contentType = res.headers.get("content-type");
//       if (contentType && contentType.includes("application/json")) {
//         data = await res.json();
//       }

//       if (!res.ok) {
//         const msg = data?.message || t("employeeSignup.error.signupFailed");
//         throw new Error(msg);
//       }

//       setSuccess(true);
//       if (audioRef.current) audioRef.current.play();
//       setTimeout(() => navigate("/signin"), 7000);

//     } catch (err) {
//       setError(err.message || t("employeeSignup.error.networkError"));
//       generateCaptcha();
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!token) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-6">
//         <div className="p-14 rounded-xl border border-red-200 text-center max-w-sm w-full">
//           <h2 className="text-xl sm:text-2xl font-bold text-red-700 mb-3">{t("employeeSignup.invalidLinkTitle")}</h2>
//           <p className="text-gray-600 mb-6 text-sm sm:text-base">{t("employeeSignup.invalidLinkMessage")}</p>
//           <button onClick={() => navigate("/")} className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 text-md">
//             {t("employeeSignup.goHome")}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//       {success && <Confetti recycle={false} numberOfPieces={300} />}

//       <motion.div
//         variants={formVariants}
//         initial="hidden"
//         animate="visible"
//         className="w-full max-w-md sm:max-w-lg bg-white rounded-xl p-8 shadow-sm border border-slate-200"
//       >
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-2 sm:mb-3">
//           {t("employeeSignup.title")}
//         </h2>

//         {error && (
//           <p className="text-red-500 text-sm sm:text-base text-center mb-5 sm:mb-6 animate-pulse border border-red-200 bg-red-50 p-2.5 sm:p-3 rounded-lg">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">

//           <UnderlineInput
//             label={t("employeeSignup.firstName")}
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             Icon={User}
//           />

//           <UnderlineInput
//             label={t("employeeSignup.lastName")}
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             Icon={User}
//           />

//           <PhoneInputField
//             label={t("employeeSignup.phoneNumber")}
//             value={formData.phone}
//             onChange={handlePhoneChange}
//           />

//           <div className="relative">
//             <UnderlineInput
//               label={t("employeeSignup.email")}
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               Icon={Mail}
//             />

//             <div className="absolute top-1/2 right-3 -translate-y-1/2 group cursor-pointer">
//               <FaInfoCircle className="text-gray-500 w-5 h-5" />
//               <div className="absolute right-0 top-full mt-2 w-64 text-sm text-white bg-black/80 px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-50">
//                 <p>{t("employeeSignup.emailTooltip.line1")}</p>
//                 <p>{t("employeeSignup.emailTooltip.line2")}</p>
//               </div>
//             </div>
//           </div>

//           <UnderlineInput
//             label={t("employeeSignup.password")}
//             name="password"
//             type={showPassword ? "text" : "password"}
//             value={formData.password}
//             onChange={handleChange}
//             Icon={Lock}
//             ToggleIcon={showPassword ? EyeOff : Eye}
//             onToggle={() => setShowPassword(!showPassword)}
//           />

//           <UnderlineInput
//             label={t("employeeSignup.confirmPassword")}
//             name="confirmPassword"
//             type={showConfirmPassword ? "text" : "password"}
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             Icon={Lock}
//             ToggleIcon={showConfirmPassword ? EyeOff : Eye}
//             onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
//           />

//           <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
//             <div className="flex-grow">
//               <UnderlineInput
//                 label={t("employeeSignup.enterCaptcha")}
//                 name="captchaInput"
//                 value={formData.captchaInput}
//                 onChange={handleChange}
//                 Icon={Puzzle}
//               />
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-24 h-10 bg-gray-100 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center">
//                 <canvas
//                   ref={canvasRef}
//                   width={100}
//                   height={40}
//                   className="w-full h-full"
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={generateCaptcha}
//                 className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center"
//               >
//                 <RefreshCw className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           <motion.button
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-slate-900 text-white font-bold py-2 rounded-full ${
//               loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-600"
//             }`}
//           >
//             {loading ? t("employeeSignup.creatingAccount") : t("employeeSignup.completeSignup")}
//           </motion.button>

//         </form>

//         <div className="text-center mt-6 sm:mt-8 text-sm sm:text-base">
//           <span className="text-gray-500">{t("employeeSignup.alreadyHaveAccount")} </span>
//           <button onClick={() => navigate("/signin")} className="text-blue-600 hover:text-blue-700 font-bold hover:underline">
//             {t("employeeSignup.login")}
//           </button>
//         </div>

//         <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
//       </motion.div>
//     </div>
//   );
// }







import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { FaInfoCircle } from "react-icons/fa";
import {
  Mail, Lock, Eye, EyeOff, RefreshCw, User, Smartphone, Puzzle, ArrowLeft, Loader2, AlertCircle
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { API_BASE_URL } from '../../apiConfig';

const API_BASE = `${API_BASE_URL}/api`;

const formVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

function UnderlineInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle, disabled }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold tracking-wider text-zinc-400">
        {label}
      </label>
      <div className="relative flex items-center w-full">
        <div className="flex items-center w-full px-4 py-1 bg-white border border-zinc-200 rounded-md transition-all duration-200 shadow-sm
                      focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/5">
          {Icon && (
            <div className="flex-shrink-0 mr-3 text-zinc-400">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={`Enter ${label.toLowerCase()}`}
            disabled={disabled}
            className="w-full text-sm font-medium text-zinc-900 bg-transparent py-2 outline-none placeholder:text-zinc-400"
            required
          />
          {ToggleIcon && (
            <button 
              type="button" 
              onClick={onToggle} 
              className="flex-shrink-0 ml-2 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 transition"
            >
              <ToggleIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PhoneInputField({ label, value, onChange, disabled }) {
  const { t } = useTranslation();
  const [error, setError] = useState("");
  
  const handleChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 10) input = input.slice(0, 10);
    if (input && input.length !== 10) {
      setError(t("employeeSignup.error.phone10Digits"));
    } else {
      setError("");
    }
    onChange(input);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      <label className="text-xs font-bold tracking-wider text-zinc-400">
        {label}
      </label>
      <div className="relative flex items-center w-full">
        <div className={`flex items-center w-full px-4 py-1 bg-white border rounded-md transition-all duration-200 shadow-sm
          focus-within:ring-4 focus-within:ring-indigo-600/5 ${
            error ? "border-rose-300 focus-within:border-rose-500 focus-within:ring-rose-500/5" : "border-zinc-200 focus-within:border-indigo-600"
          }`}>
          <Smartphone className="flex-shrink-0 mr-3 text-zinc-400 h-4 w-4" />
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="0000000000"
            maxLength={10}
            inputMode="numeric"
            disabled={disabled}
            className="w-full text-sm font-medium text-zinc-900 bg-transparent py-2 outline-none placeholder:text-zinc-400"
            required
          />
        </div>
      </div>
      {error && <p className="text-xs font-medium text-rose-600 mt-1">{error}</p>}
      {value.length === 10 && !error && (
        <p className="text-xs font-medium text-emerald-600 mt-1">{t("employeeSignup.validPhone")}</p>
      )}
    </div>
  );
}

export default function EmployeeSignupPage() {
  const { t } = useTranslation(); 
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phone: "", email: "", password: "", confirmPassword: "", captchaInput: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!token) {
      setError(t("employeeSignup.error.invalidLink"));
      return;
    }
    generateCaptcha();
  }, [token, t]);

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
      ctx.clearRect(0, 0, 100, 42);
      ctx.fillStyle = "#f4f4f5";
      ctx.fillRect(0, 0, 100, 42);
      
      ctx.font = "bold 20px monospace";
      ctx.fillStyle = "#18181b";
      ctx.save();
      ctx.translate(12, 28);
      ctx.fillText(text, 0, 0);
      ctx.restore();
      
      ctx.strokeStyle = 'rgba(161, 161, 170, 0.4)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 100, Math.random() * 42);
        ctx.lineTo(Math.random() * 100, Math.random() * 42);
        ctx.stroke();
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setError("");
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setError(t("employeeSignup.error.fillNames"));
        return;
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      setError(t("employeeSignup.error.phone10Digits"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError(t("employeeSignup.error.invalidEmail"));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t("employeeSignup.error.passwordMismatch"));
      return;
    }
    if (!formData.password.trim()) {
      setError(t("password required"));
      return;
    }
    if (formData.captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
      setError(t("employeeSignup.error.invalidCaptcha"));
      generateCaptcha();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        token,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const res = await fetch(`${API_BASE}/employee/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = null;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        const msg = data?.message || t("employeeSignup.error.signupFailed");
        throw new Error(msg);
      }

      setSuccess(true);
      if (audioRef.current) audioRef.current.play();
      setTimeout(() => navigate("/signin"), 7000);

    } catch (err) {
      setError(err.message || t("employeeSignup.error.networkError"));
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-zinc-50/60 flex items-center justify-center px-4 py-12">
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 text-center max-w-sm w-full shadow-sm">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4 mx-auto border border-rose-100/60">
            <AlertCircle className="w-6 h-6 text-rose-600" />
          </div>
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight mb-1">{t("employeeSignup.invalidLinkTitle")}</h2>
          <p className="text-zinc-500 text-xs font-medium mb-6 leading-relaxed">{t("employeeSignup.invalidLinkMessage")}</p>
          <button 
            onClick={() => navigate("/")} 
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm rounded-full transition shadow-sm"
          >
            {t("employeeSignup.goHome")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {success && <Confetti recycle={false} numberOfPieces={300} />}
      
      {/* Structural Minimal Background Blur Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl bg-white rounded-xl p-6 sm:p-10 border border-zinc-200 shadow-sm relative z-10"
      >
        {/* Module Header Area */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-600 tracking-tight">
            {t("employeeSignup.title")}
          </h2>
          {/* <p className="text-zinc-500 text-xs font-medium mt-1">
            Complete your registration details below to attach to your vendor terminal ecosystem.
          </p> */}
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-800 p-3.5 rounded-md text-xs font-bold flex items-center gap-2.5 mb-6 shadow-sm">
            <AlertCircle size={16} className="text-rose-600 shrink-0" />
            <p className="font-semibold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UnderlineInput
              label={t("employeeSignup.firstName")}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              Icon={User}
              disabled={loading}
            />

            <UnderlineInput
              label={t("employeeSignup.lastName")}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              Icon={User}
              disabled={loading}
            />
          </div>

          <PhoneInputField
            label={t("employeeSignup.phoneNumber")}
            value={formData.phone}
            onChange={handlePhoneChange}
            disabled={loading}
          />

          <div className="flex flex-col gap-1.5 relative w-full">
            <label className="text-xs font-bold tracking-wider text-zinc-400 flex items-center gap-2">
              {t("employeeSignup.email")}
              <div className="relative group cursor-pointer inline-flex">
                <FaInfoCircle className="text-zinc-400 w-3.5 h-3.5 hover:text-zinc-600 transition" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 text-[10px] font-bold uppercase tracking-wide text-white bg-zinc-900 px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-50">
                  <p>{t("employeeSignup.emailTooltip.line1")}</p>
                  <p className="mt-0.5">{t("employeeSignup.emailTooltip.line2")}</p>
                </div>
              </div>
            </label>
            <div className="relative flex items-center w-full">
              <div className="flex items-center w-full px-4 py-1 bg-white border border-zinc-200 rounded-md shadow-sm focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/5">
                <Mail className="flex-shrink-0 mr-3 text-zinc-400 h-4 w-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="identity@business.com"
                  disabled={loading}
                  className="w-full text-sm font-medium text-zinc-900 bg-transparent py-2 outline-none placeholder:text-zinc-400"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UnderlineInput
              label={t("employeeSignup.password")}
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              Icon={Lock}
              ToggleIcon={showPassword ? EyeOff : Eye}
              onToggle={() => setShowPassword(!showPassword)}
              disabled={loading}
            />

            <UnderlineInput
              label={t("employeeSignup.confirmPassword")}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              Icon={Lock}
              ToggleIcon={showConfirmPassword ? EyeOff : Eye}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={loading}
            />
          </div>

          {/* CAPTCHA Element Framework */}
          <div className="p-4 bg-zinc-50/50 border border-zinc-200/60 rounded-md flex flex-row sm:flex-row items-end gap-4 shadow-inner">
            <div className="flex-1">
              <UnderlineInput
                label={t("employeeSignup.enterCaptcha")}
                name="captchaInput"
                value={formData.captchaInput}
                onChange={handleChange}
                Icon={Puzzle}
                disabled={loading}
              />
            </div>

            <div className="flex items-center gap-2.5 sm:mb-0.5 shrink-0">
              <div className="w-28 h-[40px] border border-zinc-200 bg-white rounded-md overflow-hidden flex items-center justify-center select-none shadow-sm">
                <canvas
                  ref={canvasRef}
                  width={100}
                  height={42}
                  className="w-full h-full"
                />
              </div>

              <button
                type="button"
                onClick={generateCaptcha}
                disabled={loading}
                className="w-9 h-9 border border-zinc-200 bg-white rounded-md flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:border-zinc-300 transition-all shadow-sm disabled:opacity-50"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2 font-bold text-sm text-white rounded-full transition-all shadow-sm active:scale-98 ${
                loading ? "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none" : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span>{t("employeeSignup.creatingAccount")}</span>
                </>
              ) : (
                <span>{t("employeeSignup.completeSignup")}</span>
              )}
            </button>
          </div>
        </form>

        {/* Global Footer System Navigation Links */}
        <div className="text-center mt-6 pt-5 border-t border-zinc-100 text-xs font-semibold">
          <span className="text-zinc-400">{t("employeeSignup.alreadyHaveAccount")} </span>
          <button 
            onClick={() => navigate("/signin")} 
            className="text-indigo-600 hover:text-indigo-700 font-bold transition ml-1"
          >
            {t("employeeSignup.login")}
          </button>
        </div>

        <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
      </motion.div>
    </div>
  );
}