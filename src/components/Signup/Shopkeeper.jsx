// import { useState, useEffect, useRef } from "react";
// import Confetti from "react-confetti";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { useNavigate } from "react-router-dom";
// import { FaInfoCircle } from "react-icons/fa";
// import {
//   Mail, Lock, Eye, EyeOff, Building2, MapPin, Store,
//   RefreshCw, CheckCircle,
// } from "lucide-react";

// function Shopkeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     shopName: "", companyName: "", companyEmail: "", companyAddress: "",
//     companyPhone: "", email: "", phone: "", password: "",
//     confirmPassword: "", captchaInput: "", city: "", country: ""
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [step, setStep] = useState(1);
//   const [dialCode, setDialCode] = useState("1");
//   const [companyDialCode, setCompanyDialCode] = useState("1");
//   const [phoneError, setPhoneError] = useState(false);
//   const [companyPhoneError, setCompanyPhoneError] = useState(false);
//   const [missingFields, setMissingFields] = useState([]);
//   const [captchaText, setCaptchaText] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const audioRef = useRef(null);
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);

//   useEffect(() => { if (step === 3) generateCaptcha(); }, [step]);

//   const generateCaptcha = () => {
//     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//     const text = Array.from({ length: 6 }, () =>
//       chars[Math.floor(Math.random() * chars.length)]).join("");
//     setCaptchaText(text);
//   };

//   const validateEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const hasLeadingZeroAfterCountryCode = (phone, dialCode) => {
//     const digitsOnly = phone.replace(/\D/g, "");
//     const afterCountryCode = digitsOnly.slice(dialCode.length);
//     return afterCountryCode.startsWith("0");
//   };

//   const verifyEmail = async () => {
//     if (!validateEmail(formData.companyEmail)) {
//       setError("Please enter a valid company email."); return;
//     }
//     setIsVerifying(true); setError("");
//     const fetchWithBackoff = async (url, options, retries = 3, delay = 1000) => {
//       for (let i = 0; i < retries; i++) {
//         try {
//           const response = await fetch(url, options);
//           if (response.status === 429) {
//             const retryAfter = response.headers.get("Retry-After") || (delay * Math.pow(2, i));
//             await new Promise((res) => setTimeout(res, +retryAfter * 1000));
//             continue;
//           }
//           if (!response.ok) throw new Error(await response.text());
//           return response;
//         } catch (err) {
//           if (i === retries - 1) throw err;
//           await new Promise((res) => setTimeout(res, delay * Math.pow(2, i)));
//         }
//       }
//     };
//     try {
//       const response = await fetchWithBackoff(
//         "https://subscription-backend-e8gq.onrender.com/api/subscription/verifyShopSubscriptionEmail",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email: formData.companyEmail }),
//         }
//       );
//       const data = await response.json();
//       if (data.success) { setIsEmailVerified(true); setError(""); }
//       else { setIsEmailVerified(false); setError(data.message || "Email verification failed."); }
//     } catch (err) {
//       setIsEmailVerified(false);
//       setError("you don't have a subscription. Please use a different email.");
//     } finally { setIsVerifying(false); }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (name === "companyEmail") setIsEmailVerified(false);
//     if (missingFields.includes(name) && value.trim() !== "")
//       setMissingFields((prev) => prev.filter((f) => f !== name));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword)
//       return setError("Passwords do not match!");
//     if (formData.captchaInput.trim().toUpperCase() !== captchaText.toUpperCase())
//       return setError("Invalid CAPTCHA");
//     if (hasLeadingZeroAfterCountryCode(formData.phone, dialCode))
//       return setError("Phone number area code should not start with 0.");

//     setLoading(true); setError(""); setSuccess(false);
//     try {
//       const res = await fetch("https://loyalty-backend-java.onrender.com/api/auth/registerShopkeeper", {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });
//       const contentType = res.headers.get("content-type");
//       if (res.ok) {
//         setFormData({
//           shopName: "", companyName: "", companyEmail: "", companyAddress: "",
//           companyPhone: "", email: "", phone: "", password: "",
//           confirmPassword: "", captchaInput: "", city: "", country: ""
//         });
//         setIsEmailVerified(false);
//         generateCaptcha();
//         setSuccess(true);
//         if (audioRef.current) audioRef.current.play();
//         setTimeout(() => navigate("/signin"), 2000);
//       } else {
//         const msg = contentType && contentType.includes("application/json")
//           ? (await res.json()).message : await res.text();
//         setError(msg || "Signup failed!");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally { setLoading(false); }
//   };

//   const nextStep = () => {
//     let currentFields = [];
//     if (step === 1) currentFields = [
//       "shopName", "email", "phone", "city", "country"
//     ];
//     if (step === 2) currentFields = [
//       "companyName", "companyEmail", "companyPhone", "companyAddress"
//     ];
//     const miss = currentFields.filter((field) =>
//       !String(formData[field] || "").trim());
//     if (miss.length > 0) {
//       setMissingFields(miss);
//       setError("Please fill all required fields.");
//       return;
//     }
//     if ((step === 1 && !validateEmail(formData.email)) ||
//       (step === 2 && !validateEmail(formData.companyEmail)))
//       return setError("Please enter a valid email address.");
//     if ((step === 1 && formData.phone.length < 10) ||
//       (step === 2 && formData.companyPhone.length < 10))
//       return setError("Please enter a valid phone number.");
//     if (step === 1 && hasLeadingZeroAfterCountryCode(formData.phone, dialCode))
//       return setError("Phone number should not start with 0 after the country code.");
//     if (step === 2 && hasLeadingZeroAfterCountryCode(formData.companyPhone, companyDialCode))
//       return setError("Phone number should not start with 0 after the country code.");
//     if (step === 2 && !isEmailVerified)
//       return setError("Please verify the company email before proceeding.");
//     setStep((prev) => prev + 1);
//     setMissingFields([]); setError("");
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4"
//       style={{
//         /* subtle gradient + grid background */
//         backgroundImage: `
//           linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
//           linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
//           linear-gradient(135deg, #d0f4de, #a9def9)
//         `,
//         backgroundSize: "40px 40px, 40px 40px, 100% 100%",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       {success && <Confetti recycle={false} numberOfPieces={300} />}
//       <div className="w-full max-w-lg bg-white/60 backdrop-blur-lg border border-[#bdefff] rounded-3xl p-10 shadow-[0_30px_50px_rgba(0,0,0,0.15)]">
//         <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Shopkeeper Sign Up</h2>
//         <p className="text-center text-gray-600 mb-4">Step {step} of 3</p>
//         <div className="w-full h-2 bg-gray-300 rounded-full mb-6">
//           <div
//             className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
//             style={{ width: `${(step / 3) * 100}%` }}
//           ></div>
//         </div>
//         {error && <p className="text-red-500 text-sm text-center mb-4 animate-pulse">⚠️ {error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {step === 1 && (
//             <>
//               <FloatingInput label="Shop Name" name="shopName" value={formData.shopName} onChange={handleChange} Icon={Store} />
//               <FloatingInput label="Personal Email" name="email" type="email" value={formData.email} onChange={handleChange} Icon={Mail} />
//               <div className="group relative border border-blue-300 rounded-xl px-3 pt-4 pb-2 bg-white/90 shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 hover:border-blue-400 hover:shadow-md">
//                 <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-blue-600">
//                   Personal Phone
//                 </label>
//                 <PhoneInput
//                   country={"us"}
//                   enableSearch
//                   value={formData.phone}
//                   onChange={(phone,data)=>{
//                     const newPhone = `+${phone.replace('+','')}`;
//                     const code=data.dialCode;
//                     if(hasLeadingZeroAfterCountryCode(newPhone,code)){
//                       setError("Personal phone number area code cannot start with 0.");
//                       setPhoneError(true);
//                     }else{
//                       setError(""); setPhoneError(false);
//                       setFormData(prev=>({...prev,phone:newPhone}));
//                     }
//                     setDialCode(code);
//                   }}
//                   inputProps={{ name:"phone", required:true }}
//                   inputClass="!w-full !h-5 !pl-16 !pr-4 !bg-transparent !text-gray-900 !focus:outline-none !border-none"
//                   buttonClass="!h-5 !rounded-l-sm"
//                   containerClass="!w-full"
//                 />
//               </div>
//               <FloatingInput label="City" name="city" value={formData.city} onChange={handleChange} Icon={MapPin} />
//               <FloatingInput label="Country" name="country" value={formData.country} onChange={handleChange} Icon={MapPin} />
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <FloatingInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} Icon={Building2} />
//               <div className="relative">
//                 <FloatingInput label="Company Email" name="companyEmail" type="email" value={formData.companyEmail} onChange={handleChange} Icon={Mail} />
//                 <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 group">
//                   <FaInfoCircle className="text-gray-500 cursor-pointer" />
//                   <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-60 text-sm text-white bg-black/80 px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
//                     This email is used to verify the subscription. Make sure it’s linked with a valid subscription.
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={verifyEmail}
//                   disabled={isVerifying || !formData.companyEmail || !validateEmail(formData.companyEmail)}
//                   className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 rounded-md text-sm font-medium transition
//                     ${isEmailVerified ? "bg-green-100 text-green-700" : "bg-blue-600 text-white hover:bg-blue-700"}
//                     ${(isVerifying || !formData.companyEmail || !validateEmail(formData.companyEmail)) && "opacity-50 cursor-not-allowed"}`}
//                 >
//                   {isVerifying ? "Verifying..." : isEmailVerified ? "Verified" : "Verify"}
//                   {isEmailVerified && <CheckCircle className="inline ml-1 h-4 w-4" />}
//                 </button>
//               </div>
//               <div className="group relative border border-blue-300 rounded-xl px-3 pt-4 pb-2 bg-white/90 shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 hover:border-blue-400 hover:shadow-md">
//                 <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-blue-600">
//                   Company Phone
//                 </label>
//                 <PhoneInput
//                   country={"us"}
//                   enableSearch
//                   value={formData.companyPhone}
//                   onChange={(phone,data)=>{
//                     const newPhone=`+${phone.replace('+','')}`;
//                     const code=data.dialCode;
//                     if(hasLeadingZeroAfterCountryCode(newPhone,code)){
//                       setError("Company phone number area code cannot start with 0.");
//                       setCompanyPhoneError(true);
//                     }else{
//                       setError(""); setCompanyPhoneError(false);
//                       setFormData(prev=>({...prev,companyPhone:newPhone}));
//                     }
//                     setCompanyDialCode(code);
//                   }}
//                   inputProps={{ name:"companyPhone", required:true }}
//                   inputClass="!w-full !h-5 !pl-16 !pr-4 !bg-transparent !text-gray-900 !focus:outline-none !border-none"
//                   buttonClass="!h-5 !rounded-l-sm"
//                   containerClass="!w-full"
//                 />
//               </div>
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
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-200
//                 ${loading ? "opacity-50 cursor-not-allowed" : "hover:from-green-600 hover:to-blue-700 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"}`}
//               >
//                 {loading ? "Signing up..." : "Submit"}
//               </button>
//             </>
//           )}
//         </form>

//         {step < 3 && (
//           <button
//             type="button"
//             onClick={nextStep}
//             disabled={step === 2 && !isEmailVerified}
//             className={`w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-xl transition-all duration-200
//             ${(step === 2 && !isEmailVerified) ? "opacity-50 cursor-not-allowed" : "hover:from-green-600 hover:to-blue-700 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"}`}
//           >
//             Next
//           </button>
//         )}

//         {step > 1 && step < 4 && (
//           <button
//             type="button"
//             onClick={() => { setStep((p) => p - 1); if (step === 2) setIsEmailVerified(false); }}
//             className="w-full mt-2 py-3 bg-gray-300 hover:bg-gray-400 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] text-gray-800 font-semibold rounded-xl transition-all duration-200"
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
//     <div className="group relative border border-blue-300 rounded-xl px-3 pt-4 pb-2 bg-white/90 shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 hover:border-blue-400 hover:shadow-md">
//       <label htmlFor={name} className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-blue-600">
//         {label}
//       </label>
//       {Icon && <Icon className="absolute left-3 top-3 h-5 w-5 text-blue-400 group-hover:text-blue-500 transition-colors duration-200" />}
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder=" "
//         className="w-full h-5 px-8 py-2 text-gray-900 bg-transparent outline-none transition-colors duration-200"
//         required
//       />
//       {ToggleIcon && (
//         <button type="button" onClick={onToggle} className="absolute right-3 top-2.5 text-gray-600 hover:text-blue-600 transition-colors duration-200">
//           <ToggleIcon className="h-5 w-5" />
//         </button>
//       )}
//     </div>
//   );
// }

// export default Shopkeeper;














import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import {
  Mail, Lock, Eye, EyeOff, Building2, MapPin, Store,
  RefreshCw, CheckCircle, Smartphone, Globe, User, Puzzle
} from "lucide-react";

function FlatInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
  return (
    <div className="flex flex-col space-y-1">
      
      <label htmlFor={name} className="text-sm font-semibold text-gray-700 ml-1">
        {label}
      </label>
      
      <div className="flex items-center w-full h-12 bg-white border border-gray-300 rounded-sm transition-all duration-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200">
        
        {Icon && <Icon className="flex-shrink-0 ml-4 h-5 w-5 text-gray-400 transition-colors duration-200 focus-within:text-teal-600" />}

        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="w-full h-full text-base text-gray-900 bg-transparent px-3 outline-none"
          required
        />
        
        {ToggleIcon && (
          <button 
            type="button" 
            onClick={onToggle} 
            className="flex-shrink-0 mr-4 text-gray-500 hover:text-teal-600 transition-colors duration-200"
          >
            <ToggleIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function Shopkeeper() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: "", companyName: "", companyEmail: "", companyAddress: "",
    companyPhone: "", email: "", phone: "", password: "",
    confirmPassword: "", captchaInput: "", city: "", country: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [missingFields, setMissingFields] = useState([]);
  const [captchaText, setCaptchaText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const audioRef = useRef(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const captchaCanvasRef = useRef(null);

  useEffect(() => { if (step === 3) generateCaptcha(); }, [step]);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const text = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]).join("");
    setCaptchaText(text);

    const canvas = captchaCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold 22px Arial";
      ctx.fillStyle = "#0D9488"; 
 
      ctx.save();
      ctx.translate(10, 28);
      ctx.rotate(-0.03 * Math.PI + Math.random() * 0.1 - 0.03);
      ctx.fillText(text, 0, 0);
      ctx.restore();
      
      ctx.strokeStyle = '#34D399'; 
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 120, Math.random() * 40);
        ctx.lineTo(Math.random() * 120, Math.random() * 40);
        ctx.stroke();
      }
    }
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const verifyEmail = async () => {
    if (!validateEmail(formData.companyEmail)) {
      setError("Please enter a valid company email."); return;
    }
    setIsVerifying(true); setError("");
    const fetchWithBackoff = async (url, options, retries = 3, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, options);
          if (response.status === 429) {
            const retryAfter = response.headers.get("Retry-After") || (delay * Math.pow(2, i));
            await new Promise((res) => setTimeout(res, +retryAfter * 1000));
            continue;
          }
          if (!response.ok) throw new Error(await response.text());
          return response;
        } catch (err) {
          if (i === retries - 1) throw err;
          await new Promise((res) => setTimeout(res, delay * Math.pow(2, i)));
        }
      }
    };
    try {
      const response = await fetchWithBackoff(
        "https://loyalty-backend-java.onrender.com/api/shop/verifyShopSubscriptionEmail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.companyEmail }),
        }
      );
      const data = await response.json();
      if (data.message && data.message.includes("successfully")) {
        setIsEmailVerified(true); 
        setError(""); 
      }
      else { 
        setIsEmailVerified(false); 
        setError(data.message || "Email verification failed."); 
      }
    } catch (err) {
      setIsEmailVerified(false);
      setError("you don't have a subscription. Please use a different email.");
    } finally { setIsVerifying(false); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "companyEmail") setIsEmailVerified(false);
    if (missingFields.includes(name) && value.trim() !== "")
      setMissingFields((prev) => prev.filter((f) => f !== name));
  };

  const handlePhoneChange = (field) => (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 10) val = val.slice(0, 10);
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match!");
    if (formData.captchaInput.trim().toUpperCase() !== captchaText.toUpperCase())
      return setError("Invalid CAPTCHA");
    if (formData.phone.length !== 10)
      return setError("Personal phone must be exactly 10 digits");

    setLoading(true); setError(""); setSuccess(false);
    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/auth/registerShopkeeper", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const contentType = res.headers.get("content-type");
      if (res.ok) {
        setFormData({
          shopName: "", companyName: "", companyEmail: "", companyAddress: "",
          companyPhone: "", email: "", phone: "", password: "",
          confirmPassword: "", captchaInput: "", city: "", country: ""
        });
        setIsEmailVerified(false);
        generateCaptcha();
        setSuccess(true);
        if (audioRef.current) audioRef.current.play();
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        const msg = contentType && contentType.includes("application/json")
          ? (await res.json()).message : await res.text();
        setError(msg || "Signup failed!");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  const nextStep = () => {
    let currentFields = [];
    if (step === 1) currentFields = [
      "shopName", "email", "phone", "city", "country"
    ];
    if (step === 2) currentFields = [
      "companyName", "companyEmail", "companyPhone", "companyAddress"
    ];
    const miss = currentFields.filter((field) =>
      !String(formData[field] || "").trim());
    if (miss.length > 0) {
      setMissingFields(miss);
      setError("Please fill all required fields.");
      return;
    }
    if ((step === 1 && !validateEmail(formData.email)) ||
      (step === 2 && !validateEmail(formData.companyEmail)))
      return setError("Please enter a valid email address.");
    if ((step === 1 && formData.phone.length !== 10) ||
        (step === 2 && formData.companyPhone.length !== 10))
      return setError("Phone number must be exactly 10 digits");
    if (step === 2 && !isEmailVerified)
      return setError("Please verify the company email before proceeding.");
    setStep((prev) => prev + 1);
    setMissingFields([]); setError("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-gray-200"
      // style={{
      //   backgroundImage: `
      //     linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
      //     linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
      //   `,
      //   backgroundSize: "40px 40px, 40px 40px",
      //   backgroundAttachment: "fixed",
      // }}
    >
      {success && <Confetti recycle={false} numberOfPieces={300} />}
      
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-md p-6 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-teal-700 text-center mb-1">
          Shopkeeper Registration
        </h2>
        <p className="text-center text-gray-500 mb-6">Step {step} of 3</p>
        
        <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
        
        {error && (
            <div className="flex items-center p-3 mb-5 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200" role="alert">
                <FaInfoCircle className="flex-shrink-0 inline w-4 h-4 mr-2" />
                <span className="font-medium">{error}</span>
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <FlatInput label="Shop Name" name="shopName" value={formData.shopName} onChange={handleChange} Icon={Store} />
              <FlatInput label="Your Personal Email" name="email" type="email" value={formData.email} onChange={handleChange} Icon={Mail} />
              
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Personal Phone</label>
                <div className="relative">
                  <div className={`flex items-center w-full h-12 bg-white border rounded-sm transition-all duration-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200 ${
                    formData.phone && formData.phone.length !== 10 ? 'border-red-400' : 'border-gray-300'
                  }`}>
                    <Smartphone className="flex-shrink-0 ml-4 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={handlePhoneChange('phone')}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full h-full text-base text-gray-900 bg-transparent px-3 outline-none"
                      required
                    />
                  </div>
                  {formData.phone && formData.phone.length !== 10 && (
                    <p className="absolute -bottom-6 mb-1 left-0 text-xs text-red-600">Exactly 10 digits required</p>
                  )}
                </div>
              </div>

              <FlatInput label="City" name="city" value={formData.city} onChange={handleChange} Icon={MapPin} />
              <FlatInput label="Country" name="country" value={formData.country} onChange={handleChange} Icon={Globe} />
            </>
          )}

          {step === 2 && (
            <>
              <FlatInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} Icon={Building2} />
              
              <div className="flex flex-col space-y-1">
                <label htmlFor="companyEmail" className="text-sm font-semibold text-gray-700 ml-1">Company Email</label>
                <div className="relative">
                    <div className="flex items-center w-full h-12 bg-white border border-gray-300 rounded-sm transition-all duration-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200">
                        <Mail className="flex-shrink-0 ml-4 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            name="companyEmail"
                            id="companyEmail"
                            value={formData.companyEmail}
                            onChange={handleChange}
                            className="w-full h-full text-base text-gray-900 bg-transparent px-3 outline-none pr-32"
                            required
                        />
                    </div>
                    <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 group">
                      <FaInfoCircle className="text-gray-500 cursor-pointer" />
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-60 text-sm text-white bg-black/80 px-3 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        This email is required to verify your active subscription. It must be linked to a valid subscription.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={verifyEmail}
                      disabled={isVerifying || !formData.companyEmail || !validateEmail(formData.companyEmail) || isEmailVerified}
                      className={`absolute right-1 top-1/2 -translate-y-1/2 mr-1 px-3 py-1.5 rounded-sm text-xs font-bold transition z-10
                        ${isEmailVerified 
                            ? "bg-green-600 text-white" 
                            : "bg-teal-500 text-white hover:bg-teal-600"}
                        ${(isVerifying || !formData.companyEmail || !validateEmail(formData.companyEmail) || isEmailVerified) && "opacity-60 cursor-not-allowed"}`}
                    >
                      {isVerifying ? "Verifying..." : isEmailVerified ? <><CheckCircle className="inline mr-1 h-3 w-3" /> Verified</> : "Verify"}
                    </button>
                  </div> 
              </div>
              
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Company Phone</label>
                <div className="relative">
                  <div className={`flex items-center w-full h-12 bg-white border rounded-lg transition-all duration-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200 ${
                    formData.companyPhone && formData.companyPhone.length !== 10 ? 'border-red-400' : 'border-gray-300'
                  }`}>
                    <Smartphone className="flex-shrink-0 ml-4 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.companyPhone}
                      onChange={handlePhoneChange('companyPhone')}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full h-full text-base text-gray-900 bg-transparent px-3 outline-none"
                      required
                    />
                  </div>
                  {formData.companyPhone && formData.companyPhone.length !== 10 && (
                    <p className="absolute -bottom-6 mb-1 left-0 text-xs text-red-600">Exactly 10 digits required</p>
                  )}
                </div>
              </div>

              <FlatInput label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} Icon={MapPin} />
            </>
          )}

          {step === 3 && (
            <>
              <FlatInput label="Password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} Icon={Lock} ToggleIcon={showPassword ? EyeOff : Eye} onToggle={() => setShowPassword(!showPassword)} />
              <FlatInput label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} Icon={Lock} ToggleIcon={showConfirmPassword ? EyeOff : Eye} onToggle={() => setShowConfirmPassword(!showConfirmPassword)} />
              
              <div className="flex space-x-4 items-end">
                <div className="flex-grow">
                  <FlatInput label="Enter CAPTCHA Code" name="captchaInput" value={formData.captchaInput} onChange={handleChange} Icon={Puzzle} />
                </div>
                <div className="flex-shrink-0 w-32 h-12 bg-gray-100 border border-gray-300 rounded-sm overflow-hidden flex items-center justify-center">
                  <canvas ref={captchaCanvasRef} width={120} height={40} className="w-full h-full" />
                </div>
                <button 
                  type="button" 
                  onClick={generateCaptcha} 
                  className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors flex items-center justify-center shadow-sm"
                  aria-label="Refresh CAPTCHA"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-teal-500 text-white font-bold py-3 rounded-sm shadow-lg transition-all duration-300 text-lg
                ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-teal-600 active:scale-[0.99]"}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"></path>
                    </svg>
                    Signing up...
                  </span>
                ) : "Complete Registration"}
              </button>
            </>
          )}
        </form>

        {/* Navigation Buttons */}
        <div className="mt-8 space-y-3">
          {step < 3 && (
            <button
              type="button"
              onClick={nextStep}
              disabled={step === 2 && !isEmailVerified}
              className={`w-full py-3 bg-teal-500 text-white font-semibold rounded-sm shadow-lg transition-all duration-300 text-lg
              ${(step === 2 && !isEmailVerified) ? "opacity-60 cursor-not-allowed" : "hover:bg-teal-600 active:scale-[0.99]"}
              `}
            >
              Next Step ({step + 1}/3)
            </button>
          )}

          {step > 1 && (
            <button
              type="button"
              onClick={() => { setStep((p) => p - 1); if (step === 2) setIsEmailVerified(false); }}
              className="w-full py-3 bg-gray-200 hover:bg-gray-300 active:scale-[0.99] text-gray-700 font-semibold rounded-sm transition-all duration-300"
            >
              Back
            </button>
          )}
        </div>
        
        <div className="text-center mt-8 text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <button onClick={() => navigate("/signin")} className="text-teal-600 hover:text-teal-700 font-medium hover:underline">
                Sign In
            </button>
        </div>

        <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
      </div>
    </div>
  );
}

export default Shopkeeper;