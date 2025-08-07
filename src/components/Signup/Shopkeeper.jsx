// import { useState, useEffect, useRef } from "react";
// import Confetti from "react-confetti";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { useNavigate } from "react-router-dom";
// import {
//   Mail,
//   Phone,
//   Lock,
//   Eye,
//   EyeOff,
//   Building2,
//   MapPin,
//   Store,
//   RefreshCw,
// } from "lucide-react";

// function Shopkeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     shopName: "",
//     companyName: "",
//     companyEmail: "",
//     companyAddress: "",
//     companyPhone: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     captchaInput: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [step, setStep] = useState(1);
//   const [dialCode, setDialCode] = useState("1"); // default to US
//   const [companyDialCode, setCompanyDialCode] = useState("1"); // default for US
//   const [phoneError, setPhoneError] = useState(false);
//   const [companyPhoneError, setCompanyPhoneError] = useState(false);
//   const [missingFields, setMissingFields] = useState([]);
//   const [captchaText, setCaptchaText] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const canvasRef = useRef(null);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (step === 3) generateCaptcha();
//   }, [step]);

//   const generateCaptcha = () => {
//     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//     const text = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
//     setCaptchaText(text);

//     if (canvasRef.current) {
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.clearRect(0, 0, 100, 40);
//       ctx.font = "22px Arial";
//       ctx.fillStyle = "#4A90E2";
//       ctx.fillText(text, 10, 28);
//     }
//   };

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const hasLeadingZeroAfterCountryCode = (phone, dialCode) => {
//   const digitsOnly = phone.replace(/\D/g, ""); // Remove non-digits
//   const countryCodeLength = dialCode.length;

//   const afterCountryCode = digitsOnly.slice(countryCodeLength);
//   return afterCountryCode.startsWith("0");
// };



//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (missingFields.includes(name) && value.trim() !== "") {
//       setMissingFields((prev) => prev.filter((field) => field !== name));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     if (formData.captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
//       setError("Invalid CAPTCHA");
//       return;
//     }

//     if (hasLeadingZeroAfterCountryCode(formData.phone, dialCode)) {
//         setError("Phone number area code should not start with 0.");
//         return;
//       }
//     setLoading(true);
//     setError("");
//     setSuccess(false);

//     try {
//       const response = await fetch("https://loyalty-backend-java.onrender.com/api/auth/registerShopkeeper", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const contentType = response.headers.get("content-type");

//       if (response.ok) {
//         setFormData({
//           shopName: "",
//           companyName: "",
//           companyEmail: "",
//           companyAddress: "",
//           companyPhone: "",
//           email: "",
//           phone: "",
//           password: "",
//           confirmPassword: "",
//           captchaInput: "",
//         });
//         generateCaptcha();
//         setSuccess(true);
//         setShowModal(true);
//         if (audioRef.current) audioRef.current.play();
//         setTimeout(() => {navigate("/signin");}, 2000);
//       } else {
//         const errorMessage = contentType && contentType.includes("application/json")
//           ? (await response.json()).message
//           : await response.text();
//         setError(errorMessage || "Signup failed!");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     let currentFields = [];
//     if (step === 1) currentFields = ["shopName", "email", "phone"];
//     if (step === 2) currentFields = ["companyName", "companyEmail", "companyPhone", "companyAddress"];

//     const missing = currentFields.filter(field => {
//       const value = String(formData[field] ?? "").trim();
//       return value === "";
//     });

//     if (missing.length > 0) {
//       setMissingFields(missing);
//       setError("Please fill all required fields.");
//       setTimeout(() => setError(""), 3000);
//       const firstMissingField = document.querySelector(`input[name="${missing[0]}"]`);
//       firstMissingField?.focus();
//       return;
//     }

//     if ((step === 1 && !validateEmail(formData.email)) || (step === 2 && !validateEmail(formData.companyEmail))) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if ((step === 1 && formData.phone.length < 10) || (step === 2 && formData.companyPhone.length < 10)) {
//       setError("Please enter a valid phone number.");
//       return;
//     }

//     if (step === 1 && hasLeadingZeroAfterCountryCode(formData.phone, dialCode)) {
//       setError("Phone number should not start with 0 after the country code.");
//       return;
//     }

//     if (step === 2 && hasLeadingZeroAfterCountryCode(formData.companyPhone, companyDialCode)) {
//       setError("Phone number should not start with 0 after the country code."); 
//       return;
//     }

//     setMissingFields([]);
//     setStep(prev => prev + 1);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
//       {success && <Confetti recycle={false} numberOfPieces={300} />}
//       <div className="w-full max-w-md bg-white/60 backdrop-blur-lg border border-purple-200 rounded-3xl p-10 shadow-2xl">
//         <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">Shopkeeper Sign Up</h2>
//         <p className="text-center text-gray-600 mb-4">Step {step} of 3</p>
//         <div className="w-full h-2 bg-gray-300 rounded-full mb-6">
//           <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: `${(step / 3) * 100}%` }}></div>
//         </div>
//         {error && <p className="text-red-500 text-sm text-center mb-4 animate-pulse">⚠️ {error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {step === 1 && (
//             <>
//              <FloatingInput label="Shop Name" name="shopName" value={formData.shopName} onChange={handleChange} Icon={Store} />
//              <FloatingInput label="Personal Email" name="email" type="email" value={formData.email} onChange={handleChange} Icon={Mail} />
//              <div className="relative border border-purple-400 rounded-xl px-3 pt-4 pb-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition">
//                 <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-purple-600">
//                   Personal Phone
//                 </label>
//                 <PhoneInput
//                   country={"us"}
//                   enableSearch
//                   value={formData.phone}
//                   onChange={(phone, data) => {
//                     const newPhone = `+${phone.replace('+', '')}`;
//                     const currentDialCode = data.dialCode;

//                     // Validate
//                     if (hasLeadingZeroAfterCountryCode(newPhone, currentDialCode)) {
//                     setError("Personal phone number area code cannot start with 0.");
//                     setPhoneError(true);
//                   } else {
//                     setError("");
//                     setPhoneError(false);
//                     setFormData((prev) => ({ ...prev, phone: newPhone }));
//                   }

//                   setDialCode(currentDialCode);
//                   }}

//                   inputProps={{
//                     name: "phone",
//                     required: true,
//                   }}
//                   inputClass="!w-full !h-5 !pl-16 !pr-4 !bg-transparent !text-gray-900 !focus:outline-none !border-none"
//                   buttonClass="!h-5 !rounded-l-sm"
//                   containerClass="!w-full"
//                 />
//               </div>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <FloatingInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} Icon={Building2} />
//               <FloatingInput label="Company Email" name="companyEmail" type="email" value={formData.companyEmail} onChange={handleChange} Icon={Mail} />
//               <PhoneInputField
//                 country={"us"}
//                 enableSearch
//                 label="Company Phone"
//                 name="companyPhone"
//                 value={formData.companyPhone}
//                 onChange={(phone, data) => {
//                   const newPhone = `+${String(phone || "").replace("+", "")}`;
//                   const currentDialCode = data?.dialCode;

//                   // Guard for missing dialCode
//                   if (!currentDialCode) {
//                     setFormData((prev) => ({
//                       ...prev,
//                       companyPhone: newPhone,
//                     }));
//                     return;
//                   }

//                   if (hasLeadingZeroAfterCountryCode(newPhone, currentDialCode)) {
//                     setCompanyPhoneError(true);
//                     setError("Company phone number area code cannot start with 0.");
//                   } else {
//                     setCompanyPhoneError(false);
//                     setError("");
//                     setFormData((prev) => ({
//                       ...prev,
//                       companyPhone: newPhone,
//                       }));
//                     }

//                     if (onDialCodeChange && currentDialCode) {
//                       onDialCodeChange(currentDialCode);
//                     }
//                   }}
//                 />
//               <FloatingInput label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} Icon={MapPin} />
//             </>
//           )}

//           {step === 3 && (
//             <>
//               <FloatingInput label="Password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} Icon={Lock} ToggleIcon={showPassword ? EyeOff : Eye} onToggle={() => setShowPassword(!showPassword)} />
//               <FloatingInput label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} Icon={Lock} ToggleIcon={showConfirmPassword ? EyeOff : Eye} onToggle={() => setShowConfirmPassword(!showConfirmPassword)} />
//               <div className="flex items-center justify-between bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg">
//                 <span className="text-lg font-semibold tracking-widest text-gray-600 select-none">{captchaText}</span>
//                 <button type="button" onClick={generateCaptcha} className="text-sm text-blue-500 hover:underline flex items-center gap-1">
//                   <RefreshCw className="h-4 w-4" /> Refresh
//                 </button>
//               </div>
//               <FloatingInput label="Enter Captcha" name="captchaInput" value={formData.captchaInput} onChange={handleChange} />
//               <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition">
//                 {loading ? "Signing up..." : "Submit"}
//               </button>
//             </>
//           )}
//         </form>

//         {step < 3 && <NextButton onClick={nextStep} />}
//         {step > 1 && step < 4 && (
//           <button
//             type="button"
//             onClick={() => setStep((prev) => prev - 1)}
//             className="w-full mt-2 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl transition"
//           >
//             Back
//           </button>
//         )}

//         <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
//       </div>
//     </div>
//   );
// }

// function FloatingInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
//   return (
//     <div className="relative border border-purple-400 rounded-xl px-3 pt-4 pb-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition">
//       <label
//         htmlFor={name}
//         className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-purple-600">
//         {label}
//       </label>
//       {Icon && <Icon className="absolute left-3 top-3 h-5 w-5 text-purple-400" />}
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder=" "
//         className="w-full h-5 px-8 py-2 text-gray-900 bg-transparent focus:outline-none"
//         required
//       />
//       {ToggleIcon && (
//         <button
//           type="button"
//           onClick={onToggle}
//           className="absolute right-3 top-2.5 text-gray-600 hover:text-purple-600"
//         >
//           <ToggleIcon className="h-5 w-5" />
//         </button>
//       )}
//     </div>
//   );
// }


// function PhoneInputField({ label, name, value, onChange, onDialCodeChange }) {
//   return (
//     <div className="relative border border-purple-400 rounded-xl px-3 pt-4 pb-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition">
//       <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-purple-600">
//         {label}
//       </label>
//       <PhoneInput
//         country={"us"}
//         enableSearch
//         value={value.replace('+', '')}
//         onChange={(phone, data) => {
//           onChange({
//             target: {
//               name,
//               value: `+${phone}`,
//             },
//           });
//           if (onDialCodeChange) onDialCodeChange(data.dialCode); // 💡 pass dialCode
//         }}
//         inputProps={{
//           name,
//           required: true,
//           autoComplete: "tel",
//           placeholder: "",
//         }}
//         inputClass="!w-full !h-5 !pl-16 !pr-4 !bg-transparent !text-gray-900 !focus:outline-none !border-none"
//         buttonClass="!h-5 !square-l-xl"
//         containerClass="!w-full !relative z-20"
//         dropdownClass="!z-50"
//       />
//     </div>
//   );
// }


// function NextButton({ onClick }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="w-full py-3 mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
//     >
//       Next
//     </button>
//   );
// }
// export default Shopkeeper;












import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import {
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Building2,
  MapPin,
  Store,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

function Shopkeeper() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: "",
    companyName: "",
    companyEmail: "",
    companyAddress: "",
    companyPhone: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    captchaInput: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [dialCode, setDialCode] = useState("1"); // default to US
  const [companyDialCode, setCompanyDialCode] = useState("1"); // default for US
  const [phoneError, setPhoneError] = useState(false);
  const [companyPhoneError, setCompanyPhoneError] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [captchaText, setCaptchaText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  // CHANGE: Added state for email verification
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (step === 3) generateCaptcha();
  }, [step]);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const text = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    setCaptchaText(text);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 100, 40);
      ctx.font = "22px Arial";
      ctx.fillStyle = "#4A90E2";
      ctx.fillText(text, 10, 28);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const hasLeadingZeroAfterCountryCode = (phone, dialCode) => {
    const digitsOnly = phone.replace(/\D/g, "");
    const countryCodeLength = dialCode.length;
    const afterCountryCode = digitsOnly.slice(countryCodeLength);
    return afterCountryCode.startsWith("0");
  };

  // CHANGE: Added email verification function
  const verifyEmail = async () => {
    if (!validateEmail(formData.companyEmail)) {
      setError("Please enter a valid company email.");
      return;
    }

    setIsVerifying(true);
    setError("");

    const fetchWithBackoff = async (url, options, retries = 3, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, options);
          if (response.status === 429) {
            const retryAfter = response.headers.get("Retry-After") || delay * Math.pow(2, i);
            await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
            continue;
          }
          if (!response.ok) {
            throw new Error(await response.text());
          }
          return response;
        } catch (err) {
          if (i === retries - 1) throw err;
          await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
        }
      }
    };

    try {
      const response = await fetchWithBackoff(
        "https://subscription-backend-e8gq.onrender.com/api/subscription/verifyShopSubscriptionEmail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.companyEmail }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setIsEmailVerified(true);
        setError("");
      } else {
        setIsEmailVerified(false);
        setError(data.message || "Email verification failed.");
      }
    } catch (err) {
      setIsEmailVerified(false);
      setError("you don't have a subscription. Please use a different email.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "companyEmail") {
      setIsEmailVerified(false); // Reset verification on email change
    }

    if (missingFields.includes(name) && value.trim() !== "") {
      setMissingFields((prev) => prev.filter((field) => field !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
      setError("Invalid CAPTCHA");
      return;
    }

    if (hasLeadingZeroAfterCountryCode(formData.phone, dialCode)) {
      setError("Phone number area code should not start with 0.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("https://loyalty-backend-java.onrender.com/api/auth/registerShopkeeper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      if (response.ok) {
        setFormData({
          shopName: "",
          companyName: "",
          companyEmail: "",
          companyAddress: "",
          companyPhone: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          captchaInput: "",
        });
        setIsEmailVerified(false); // CHANGE: Reset verification on submit
        generateCaptcha();
        setSuccess(true);
        setShowModal(true);
        if (audioRef.current) audioRef.current.play();
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        const errorMessage = contentType && contentType.includes("application/json")
          ? (await response.json()).message
          : await response.text();
        setError(errorMessage || "Signup failed!");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    let currentFields = [];
    if (step === 1) currentFields = ["shopName", "email", "phone"];
    if (step === 2) currentFields = ["companyName", "companyEmail", "companyPhone", "companyAddress"];

    const missing = currentFields.filter((field) => {
      const value = String(formData[field] ?? "").trim();
      return value === "";
    });

    if (missing.length > 0) {
      setMissingFields(missing);
      setError("Please fill all required fields.");
      setTimeout(() => setError(""), 3000);
      const firstMissingField = document.querySelector(`input[name="${missing[0]}"]`);
      firstMissingField?.focus();
      return;
    }

    if ((step === 1 && !validateEmail(formData.email)) || (step === 2 && !validateEmail(formData.companyEmail))) {
      setError("Please enter a valid email address.");
      return;
    }

    if ((step === 1 && formData.phone.length < 10) || (step === 2 && formData.companyPhone.length < 10)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (step === 1 && hasLeadingZeroAfterCountryCode(formData.phone, dialCode)) {
      setError("Phone number should not start with 0 after the country code.");
      return;
    }

    if (step === 2 && hasLeadingZeroAfterCountryCode(formData.companyPhone, companyDialCode)) {
      setError("Phone number should not start with 0 after the country code.");
      return;
    }

    // CHANGE: Require email verification in Step 2
    if (step === 2 && !isEmailVerified) {
      setError("Please verify the company email before proceeding.");
      return;
    }

    setMissingFields([]);
    setStep((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      {success && <Confetti recycle={false} numberOfPieces={300} />}
      <div className="w-full max-w-md bg-white/60 backdrop-blur-lg border border-purple-200 rounded-3xl p-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">Shopkeeper Sign Up</h2>
        <p className="text-center text-gray-600 mb-4">Step {step} of 3</p>
        <div className="w-full h-2 bg-gray-300 rounded-full mb-6">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        {error && <p className="text-red-500 text-sm text-center mb-4 animate-pulse">⚠️ {error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <>
              <FloatingInput label="Shop Name" name="shopName" value={formData.shopName} onChange={handleChange} Icon={Store} />
              <FloatingInput label="Personal Email" name="email" type="email" value={formData.email} onChange={handleChange} Icon={Mail} />
              <div className="relative border border-purple-400 rounded-xl px-3 pt-4 pb-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-purple-600">
                  Personal Phone
                </label>
                <PhoneInput
                  country={"us"}
                  enableSearch
                  value={formData.phone}
                  onChange={(phone, data) => {
                    const newPhone = `+${phone.replace('+', '')}`;
                    const currentDialCode = data.dialCode;

                    if (hasLeadingZeroAfterCountryCode(newPhone, currentDialCode)) {
                      setError("Personal phone number area code cannot start with 0.");
                      setPhoneError(true);
                    } else {
                      setError("");
                      setPhoneError(false);
                      setFormData((prev) => ({ ...prev, phone: newPhone }));
                    }

                    setDialCode(currentDialCode);
                  }}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  inputClass="!w-full !h-5 !pl-16 !pr-4 !bg-transparent !text-gray-900 !focus:outline-none !border-none"
                  buttonClass="!h-5 !rounded-l-sm"
                  containerClass="!w-full"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <FloatingInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} Icon={Building2} />
              {/* CHANGE: Added Verify button for companyEmail */}
              <div className="relative">
                <FloatingInput
                  label="Company Email"
                  name="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  Icon={Mail}
                />
                {/* Info button */}
                <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 group">
                  <FaInfoCircle className="text-gray-500 cursor-pointer" />
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-60 text-sm text-white bg-black px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    This email is used to verify the subscription. Make sure it’s linked with a valid subscription.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={verifyEmail}
                  disabled={isVerifying || !formData.companyEmail || !validateEmail(formData.companyEmail)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 rounded-md text-sm font-medium transition
                    ${isEmailVerified ? "bg-green-100 text-green-700" : "bg-purple-600 text-white hover:bg-purple-700"}
                    ${isVerifying || !formData.companyEmail || !validateEmail(formData.companyEmail) ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isVerifying ? "Verifying..." : isEmailVerified ? "Verified" : "Verify"}
                  {isEmailVerified && <CheckCircle className="inline ml-1 h-4 w-4" />}
                </button>
              </div>
              <div className="relative border border-purple-400 rounded-xl px-3 pt-4 pb-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-purple-600">
                  Company Phone
                </label>
                <PhoneInput
                  country={"us"}
                  enableSearch
                  value={formData.companyPhone}
                  onChange={(phone, data) => {
                    const newPhone = `+${phone.replace('+', '')}`;
                    const currentDialCode = data.dialCode;

                    if (hasLeadingZeroAfterCountryCode(newPhone, currentDialCode)) {
                      setError("Company phone number area code cannot start with 0.");
                      setCompanyPhoneError(true);
                    } else {
                      setError("");
                      setCompanyPhoneError(false);
                      setFormData((prev) => ({ ...prev, companyPhone: newPhone }));
                    }

                    setCompanyDialCode(currentDialCode);
                  }}
                  inputProps={{
                    name: "companyPhone",
                    required: true,
                  }}
                  inputClass="!w-full !h-5 !pl-16 !pr-4 !bg-transparent !text-gray-900 !focus:outline-none !border-none"
                  buttonClass="!h-5 !rounded-l-sm"
                  containerClass="!w-full"
                />
              </div>
              <FloatingInput label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} Icon={MapPin} />
            </>
          )}

          {step === 3 && (
            <>
              <FloatingInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                Icon={Lock}
                ToggleIcon={showPassword ? EyeOff : Eye}
                onToggle={() => setShowPassword(!showPassword)}
              />
              <FloatingInput
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                Icon={Lock}
                ToggleIcon={showConfirmPassword ? EyeOff : Eye}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              <div className="flex items-center justify-between bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg">
                <span className="text-lg font-semibold tracking-widest text-gray-600 select-none">{captchaText}</span>
                <button type="button" onClick={generateCaptcha} className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" /> Refresh
                </button>
              </div>
              <FloatingInput label="Enter Captcha" name="captchaInput" value={formData.captchaInput} onChange={handleChange} />
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-purple-600 text-white font-semibold py-3 rounded-xl transition
                  ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"}`}
              >
                {loading ? "Signing up..." : "Submit"}
              </button>
            </>
          )}
        </form>

        {step < 3 && (
          <button
            type="button"
            onClick={nextStep}
            disabled={step === 2 && !isEmailVerified} // CHANGE: Disable Next button until email verified
            className={`w-full py-3 mt-4 bg-purple-600 text-white font-semibold rounded-xl transition
              ${step === 2 && !isEmailVerified ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"}`}
          >
            Next
          </button>
        )}
        {step > 1 && step < 4 && (
          <button
            type="button"
            onClick={() => {
              setStep((prev) => prev - 1);
              if (step === 2) setIsEmailVerified(false); // CHANGE: Reset verification on back
            }}
            className="w-full mt-2 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl transition"
          >
            Back
          </button>
        )}

        <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
      </div>
    </div>
  );
}

function FloatingInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
  return (
    <div className="relative border border-purple-400 rounded-xl px-3 pt-4 pb-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition">
      <label
        htmlFor={name}
        className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-purple-600"
      >
        {label}
      </label>
      {Icon && <Icon className="absolute left-3 top-3 h-5 w-5 text-purple-400" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="w-full h-5 px-8 py-2 text-gray-900 bg-transparent focus:outline-none"
        required
      />
      {ToggleIcon && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-2.5 text-gray-600 hover:text-purple-600"
        >
          <ToggleIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export default Shopkeeper;