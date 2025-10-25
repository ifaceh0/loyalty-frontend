// import { useState, useEffect, useRef } from "react"; 
// import Confetti from "react-confetti";
// import { Eye, EyeOff, Lock, Mail, RefreshCw, User } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

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

// function UserSignup() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     captchaInput: "",
//   });

//   const [referralShopId, setReferralShopId] = useState(null);
//   const [error, setError] = useState("");
//   const [phoneError, setPhoneError] = useState(false);
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

//   const hasLeadingZeroAfterCountryCode = (phone, dialCode) => {
//     const numberWithoutPlus = phone.replace("+", "");
//     return numberWithoutPlus.startsWith(dialCode + "0");
//   };

//   const generateCaptcha = () => {
//     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//     let text = "";
//     for (let i = 0; i < 5; i++) {
//       text += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setCaptchaText(text);
//     if (canvasRef.current) {
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.clearRect(0, 0, 100, 40);
//       ctx.font = "28px Arial";
//       ctx.fillStyle = "#2563EB"; // blue-600
//       ctx.fillText(text, 10, 30);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
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
//     if (phoneError) {
//       setError("Please correct your phone number.");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     setSuccess(false);

//     try {
//       const response = await fetch("https://loyalty-backend-java.onrender.com/api/auth/registerUser", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           phone: formData.phoneNumber,
//           email: formData.email,
//           password: formData.password,
//           referralShopId: referralShopId,
//         }),
//       });

//       const contentType = response.headers.get("content-type");

//       if (response.ok) {
//         setFormData({
//           firstName: "",
//           lastName: "",
//           phoneNumber: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//           captchaInput: "",
//         });
//         generateCaptcha();
//         setSuccess(true);
//         if (audioRef.current) audioRef.current.play();
//         setTimeout(() => navigate("/signin"), 2000);
//       } else {
//         const errorMessage = contentType && contentType.includes("application/json")
//           ? (await response.json()).message
//           : await response.text();
//         setError(errorMessage || "Signup failed!");
//       }
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (step === 1 && (!formData.firstName.trim() || !formData.lastName.trim())) {
//       setError("Please fill up the fields.");
//       setTimeout(() => setError(""), 3000);
//       return;
//     }
//     if (step === 2) {
//       if (!formData.phoneNumber.trim() || !formData.email.trim()) {
//         setError("Please fill up the fields.");
//         setTimeout(() => setError(""), 3000);
//         return;
//       }
//       if (!validateEmail(formData.email)) {
//         setError("Please enter a valid email address.");
//         setTimeout(() => setError(""), 3000);
//         return;
//       }
//     }
//     if (step === 3 && (!formData.password.trim() || !formData.confirmPassword.trim())) {
//       setError("Please fill up the fields.");
//       setTimeout(() => setError(""), 3000);
//       return;
//     }
//     setError("");
//     setStep((prev) => prev + 1);
//   };

//   const getProgress = () => (step / 3) * 100;

//   return (
//     // <div className="min-h-screen flex items-center justify-center px-6 
//     //   bg-[linear-gradient(135deg,#d0f4de,#a9def9)] 
//     //   [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] 
//     //   [background-size:40px_40px] bg-blend-overlay">
//     <div
//       className="min-h-screen flex items-center justify-center px-4"
//       style={{
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
//         <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">User Sign Up</h2>
//         <p className="text-center text-gray-600 mb-4">Step {step} of 3</p>
//         <div className="w-full h-2 bg-gray-300 rounded-full mb-8">
//           <div className="h-full bg-gradient-to-r from-green-500 to-blue-600 rounded-full" style={{ width: `${getProgress()}%` }}></div>
//         </div>
//         {error && <p className="text-red-500 text-sm text-center mb-4 animate-pulse">⚠️ {error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {step === 1 && (
//             // <div className="grid grid-cols-2 gap-6">
//             <>
//               <FloatingInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} Icon={User} />
//               <FloatingInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} Icon={User} />
//               <div className="col-span-2">
//                 <NextButton onClick={nextStep} />
//               </div>
//               </>
//             // </div>
//           )}

//           {step === 2 && (
//             <>
//               <div className="group relative border border-blue-300 rounded-xl px-3 pt-4 pb-2 bg-white/90 shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 hover:border-blue-400 hover:shadow-md">
//                 <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-blue-600">Phone Number</label>
//                 <PhoneInput
//                   country={"us"}
//                   enableSearch
//                   value={formData.phoneNumber}
//                   onChange={(phone, data) => {
//                     const newPhone = `+${String(phone || "").replace("+", "")}`;
//                     const currentDialCode = data?.dialCode;
//                     if (!currentDialCode) {
//                       setFormData((prev) => ({ ...prev, phoneNumber: newPhone }));
//                       return;
//                     }
//                     if (hasLeadingZeroAfterCountryCode(newPhone, currentDialCode)) {
//                       setPhoneError(true);
//                       setError("Phone number area code cannot start with 0.");
//                     } else {
//                       setPhoneError(false);
//                       setError("");
//                       setFormData((prev) => ({ ...prev, phoneNumber: newPhone }));
//                     }
//                   }}
//                   inputClass="!w-full !h-5 !pl-16 !pr-4 !bg-transparent !text-gray-900 !focus:outline-none !border-none"
//                   buttonClass="!h-5 !rounded-l-sm"
//                   containerClass="!w-full"
//                 />
//               </div>
//               {phoneError && (
//                 <p className="text-red-500 text-sm mt-1 ml-1">⚠️ Invalid phone number format.</p>
//               )}
//               <FloatingInput label="Email" name="email" value={formData.email} onChange={handleChange} Icon={Mail} />
//               <NextButton onClick={nextStep} />
//             </>
//           )}

//           {step === 3 && (
//             <>
//               <FloatingInput
//                 label="Password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={handleChange}
//                 Icon={Lock}
//                 ToggleIcon={showPassword ? EyeOff : Eye}
//                 onToggle={() => setShowPassword(!showPassword)}
//               />
//               <FloatingInput
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 Icon={Lock}
//                 ToggleIcon={showConfirmPassword ? EyeOff : Eye}
//                 onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
//               />
//               <div className="flex items-center justify-between bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg">
//                 <span className="text-lg font-semibold tracking-widest text-gray-600 select-none">{captchaText}</span>
//                 <button type="button" onClick={generateCaptcha} className="text-sm text-blue-500 hover:underline flex items-center gap-1">
//                   <RefreshCw className="w-4 h-4" /> Refresh
//                 </button>
//               </div>
//               <FloatingInput label="Enter Captcha" name="captchaInput" value={formData.captchaInput} onChange={handleChange} />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-200
//                   ${loading ? "opacity-50 cursor-not-allowed" : "hover:from-green-600 hover:to-blue-700 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"}`}
//               >
//                 {loading ? "Signing up..." : "Submit"}
//               </button>
//             </>
//           )}
//         </form>

//         {step > 1 && step < 4 && (
//           <button
//             type="button"
//             onClick={() => setStep((prev) => prev - 1)}
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

// function NextButton({ onClick }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="w-full py-3 mt-4 font-semibold rounded-xl shadow-md transition 
//         bg-gradient-to-r from-green-500 to-blue-600 text-white hover:scale-[1.02] hover:shadow-xl"
//     >
//       Next
//     </button>
//   );
// }

// export default UserSignup;











import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { Eye, EyeOff, Lock, Mail, RefreshCw, User, Smartphone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function UnderlineInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
  return (
    <div className="relative flex items-center w-full">
      <div className="flex items-center w-full h-12 border-b-2 border-gray-300 transition-all duration-300 focus-within:border-blue-600">
        
        {Icon && <Icon className="flex-shrink-0 ml-1 mr-3 h-5 w-5 text-gray-500 transition-colors duration-300 focus-within:text-blue-600" />}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label} 
          className="w-full h-full text-base text-gray-900 bg-transparent py-2 outline-none placeholder:text-gray-500"
          required
        />
        
        {ToggleIcon && (
          <button 
            type="button" 
            onClick={onToggle} 
            className="flex-shrink-0 mr-1 text-gray-500 hover:text-blue-600 transition-colors duration-300"
          >
            <ToggleIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function UserSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    captchaInput: "",
  });

  const [referralShopId, setReferralShopId] = useState(null);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const shopId = queryParams.get("referralShopId"); 
    if (shopId) {
      setReferralShopId(shopId);
    }
    if (step === 3) generateCaptcha();
  }, [step, location.search]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const hasLeadingZeroAfterCountryCode = (phone, dialCode) => {
    const digitsOnly = String(phone).replace(/\D/g, "");
    const afterCountryCode = digitsOnly.slice(String(dialCode).length);
    return afterCountryCode.startsWith("0");
  };

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
        ctx.font = "bold 24px Arial";
        ctx.fillStyle = "#2563EB";
        
        ctx.save();
        ctx.translate(5, 30);
        ctx.rotate(-0.05 * Math.PI + Math.random() * 0.1 - 0.05);
        ctx.fillText(text, 0, 0);
        ctx.restore();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (phoneError) {
      setError("Please correct your phone number.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("https://loyalty-backend-java.onrender.com/api/auth/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phoneNumber,
          email: formData.email,
          password: formData.password,
          referralShopId: referralShopId,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (response.ok) {
        setFormData({
          firstName: "", lastName: "", phoneNumber: "", email: "",
          password: "", confirmPassword: "", captchaInput: "",
        });
        generateCaptcha();
        setSuccess(true);
        if (audioRef.current) audioRef.current.play();
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        const errorMessage = contentType && contentType.includes("application/json")
          ? (await response.json()).message
          : await response.text();
        setError(errorMessage || "Signup failed!");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.firstName.trim() || !formData.lastName.trim())) {
      setError("Please fill up the fields.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (step === 2) {
      if (!formData.phoneNumber.trim() || !formData.email.trim()) {
        setError("Please fill up the fields.");
        setTimeout(() => setError(""), 3000);
        return;
      }
      if (!validateEmail(formData.email)) {
        setError("Please enter a valid email address.");
        setTimeout(() => setError(""), 3000);
        return;
      }
      if (phoneError) {
        setError("Please correct your phone number before proceeding.");
        setTimeout(() => setError(""), 3000);
        return;
      }
    }
    if (step === 3 && (!formData.password.trim() || !formData.confirmPassword.trim())) {
      setError("Please fill up the fields.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setError("");
    setStep((prev) => prev + 1);
  };

  const getProgress = () => (step / 3) * 100;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-gray-50"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px, 40px 40px",
        backgroundAttachment: "fixed",
      }}
    >
      {success && <Confetti recycle={false} numberOfPieces={300} />}
      
      <div className="w-full max-w-lg bg-white rounded-xl p-10 shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-emerald-600 text-center mb-3">
            Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">Step {step} of 3</p>
        
        <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-blue-600 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>

        {error && (
            <p className="text-red-500 text-sm text-center mb-4 animate-pulse border border-red-200 bg-red-50 p-2 rounded-lg">
                {error}
            </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <div className="space-y-8">
              <UnderlineInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} Icon={User} />
              <UnderlineInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} Icon={User} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="relative flex flex-col w-full">
                <div className="flex items-center w-full h-12 border-b-2 border-gray-300 transition-all duration-300 focus-within:border-blue-600">
                    <Smartphone className="flex-shrink-0 ml-1 mr-3 h-5 w-5 text-gray-500" />
                    <PhoneInput
                        country={"us"}
                        enableSearch
                        value={formData.phoneNumber}
                        onChange={(phone, data) => {
                            const newPhone = `+${String(phone || "").replace("+", "")}`;
                            const currentDialCode = data?.dialCode;
                            if (!currentDialCode) {
                                setFormData((prev) => ({ ...prev, phoneNumber: newPhone }));
                                return;
                            }
                            if (hasLeadingZeroAfterCountryCode(newPhone, currentDialCode)) {
                                setPhoneError(true);
                                setError("Phone number area code cannot start with 0.");
                            } else {
                                setPhoneError(false);
                                setError("");
                                setFormData((prev) => ({ ...prev, phoneNumber: newPhone }));
                            }
                        }}
                        inputStyle={{ width: '100%', height: '100%', paddingLeft: '3rem', border: 'none', background: 'transparent' }}
                        buttonClass="!h-full !bg-transparent !border-none !rounded-none !p-0 !pr-2 !pl-0"
                        containerClass="!w-full !h-full"
                        placeholder="Phone Number"
                    />
                </div>
              </div>

              <UnderlineInput label="Email" name="email" value={formData.email} onChange={handleChange} Icon={Mail} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <UnderlineInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                Icon={Lock}
                ToggleIcon={showPassword ? EyeOff : Eye}
                onToggle={() => setShowPassword(!showPassword)}
              />
              <UnderlineInput
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                Icon={Lock}
                ToggleIcon={showConfirmPassword ? EyeOff : Eye}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />              
              
              <div className="flex items-end space-x-4 pt-2">
                <div className="flex-grow">
                    <UnderlineInput label="Enter Captcha" name="captchaInput" value={formData.captchaInput} onChange={handleChange} />
                </div>
                <div className="flex-shrink-0 w-24 h-10 bg-gray-100 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center">
                    <canvas ref={canvasRef} width={100} height={40} className="w-full h-full" />
                </div>
                <button 
                  type="button" 
                  onClick={generateCaptcha} 
                  className="flex-shrink-0 w-10 h-10 text-gray-500 hover:text-blue-600 transition-colors duration-200 border border-gray-300 rounded-md flex items-center justify-center"
                  aria-label="Refresh CAPTCHA"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 text-lg
                ${loading ? "opacity-60 cursor-not-allowed" : "hover:from-green-600 hover:to-blue-700 active:scale-[0.99]"}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"></path>
                    </svg>
                    Signing up...
                  </span>
                ) : "Complete Sign Up"}
              </button>
            </div>
          )}
        </form>

        <div className="mt-8 space-y-3">
          {step < 3 && (
            <NextButton onClick={nextStep} />
          )}

          {step > 1 && step < 4 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="w-full py-3 bg-gray-200 hover:bg-gray-300 active:scale-[0.99] text-gray-700 font-semibold rounded-lg transition-all duration-300"
            >
              Back
            </button>
          )}
        </div>
        
        <div className="text-center mt-8 text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <button onClick={() => navigate("/signin")} className="text-blue-600 hover:text-blue-700 font-bold hover:underline">
                Sign In
            </button>
        </div>

        <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
      </div>
    </div>
  );
}

function NextButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3 font-bold rounded-lg shadow-lg transition-all duration-300 text-lg
        bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:from-emerald-600 hover:to-blue-700 active:scale-[0.99]"
    >
      Next
    </button>
  );
}

export default UserSignup;