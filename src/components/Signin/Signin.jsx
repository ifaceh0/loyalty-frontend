// // import { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { jwtDecode } from "jwt-decode";
// // import Confetti from "react-confetti";
// // import { Eye, EyeOff, Lock, Mail, RefreshCw } from "lucide-react";

// // const Signin = () => {
// //   const navigate = useNavigate();
// //   const canvasRef = useRef(null);
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //     captchaInput: "",
// //   });

// //   const [captchaText, setCaptchaText] = useState("");
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [success, setSuccess] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);

// //   useEffect(() => {
// //     setTimeout(() => {
// //       generateCaptcha();
// //     }, 100);
// //   }, []);

// //   const generateCaptcha = () => {
// //     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
// //     let text = "";
// //     for (let i = 0; i < 6; i++) {
// //       text += chars.charAt(Math.floor(Math.random() * chars.length));
// //     }
// //     setCaptchaText(text);

// //     const canvas = canvasRef.current;
// //     if (canvas) {
// //       const ctx = canvas.getContext("2d");
// //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// //       ctx.font = "22px Arial";
// //       ctx.fillStyle = "#059669"; // Emerald Green
// //       ctx.fillText(text, 10, 28);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(formData.email)) {
// //       setError("Please enter a valid email address.");
// //       return;
// //     }

// //     if (formData.captchaInput.trim() !== captchaText) {
// //       setError("Invalid CAPTCHA");
// //       generateCaptcha();
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const res = await fetch("https://loyalty-backend-java.onrender.com/api/auth/signIn", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           email: formData.email,
// //           password: formData.password,
// //         }),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) {
// //         throw new Error(data.message || "Login failed. Please try again.");
// //       }

// //       const token = data.token;
// //       const decoded = jwtDecode(token);
// //       const role = decoded.role;

// //       localStorage.setItem("isLoggedIn", "true");
// //       localStorage.setItem("token", token);
// //       localStorage.setItem("id", data.id);
// //       localStorage.setItem("role", role);
// //       localStorage.setItem("name", data.name);
// //       localStorage.setItem("CompanyEmail", data.companyEmail);

// //       setSuccess(true);

// //       setTimeout(() => {
// //         if (role === "SHOPKEEPER") {
// //           navigate("/shopkeeper/dashboard");
// //         } else if (role === "USER") {
// //           navigate("/user/dashboard");
// //         } else {
// //           setError("Unrecognized role.");
// //         }
// //       }, 1500);
// //     } catch (err) {
// //       console.error("Login error:", err);
// //       setError(err.message || "An unexpected error occurred. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center px-4 relative overflow-hidden">
// //       {/* Decorative subtle grid pattern */}
// //       <div className="absolute inset-0 bg-[linear-gradient(to_right,#0001_1px,transparent_1px),linear-gradient(to_bottom,#0001_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

// //       {success && <Confetti recycle={false} numberOfPieces={250} />}
// //       <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/70 border border-green-200 shadow-2xl p-10 rounded-3xl animate-fade-in">
// //         <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6">
// //           Sign In
// //         </h2>
// //         {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
// //         {success && (
// //           <p className="text-green-600 text-sm mb-4 text-center animate-bounce">
// //             ✅ Signed in successfully!
// //           </p>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <FloatingInput
// //             label="Email Address"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             type="email"
// //             Icon={Mail}
// //           />

// //           <FloatingInput
// //             label="Password"
// //             name="password"
// //             type={showPassword ? "text" : "password"}
// //             value={formData.password}
// //             onChange={handleChange}
// //             Icon={Lock}
// //             ToggleIcon={showPassword ? EyeOff : Eye}
// //             onToggle={() => setShowPassword(!showPassword)}
// //           />

// //           {/* Captcha box */}
// //           <div className="flex items-center justify-between border border-emerald-200 rounded-lg p-2 bg-white shadow-sm">
// //             <canvas
// //               ref={canvasRef}
// //               width={110}
// //               height={40}
// //               className="border border-gray-200 rounded-md"
// //             />
// //             <button
// //               type="button"
// //               onClick={generateCaptcha}
// //               className="flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md hover:bg-blue-100 transition"
// //             >
// //               <RefreshCw className="w-4 h-4" /> Refresh
// //             </button>
// //           </div>

// //           <FloatingInput
// //             label="Enter Captcha"
// //             name="captchaInput"
// //             value={formData.captchaInput}
// //             onChange={handleChange}
// //           />

// //           <div className="text-right">
// //             <button
// //               type="button"
// //               onClick={() => navigate("/forgot-password")}
// //               className="text-sm text-sky-600 hover:underline hover:text-sky-700"
// //             >
// //               Forgot Password?
// //             </button>
// //           </div>

// //           {/* CTA Button */}
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className={`w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-2 text-lg rounded-xl shadow-lg transition duration-200 ${
// //               loading ? "opacity-70 cursor-not-allowed" : "hover:from-emerald-700 hover:to-blue-700"
// //             }`}
// //           >
// //             {loading ? (
// //               <span className="flex items-center justify-center gap-2">
// //                 <svg
// //                   className="animate-spin h-5 w-5 text-yellow-400"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                 >
// //                   <circle
// //                     className="opacity-25"
// //                     cx="12"
// //                     cy="12"
// //                     r="10"
// //                     stroke="currentColor"
// //                     strokeWidth="4"
// //                   ></circle>
// //                   <path
// //                     className="opacity-75"
// //                     fill="currentColor"
// //                     d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
// //                   ></path>
// //                 </svg>
// //                 Signing in...
// //               </span>
// //             ) : (
// //               "Sign In"
// //             )}
// //           </button>
// //         </form>
// //       </div>

// //       <style>{`
// //         @keyframes fade-in {
// //           from { opacity: 0; transform: translateY(10px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         .animate-fade-in {
// //           animation: fade-in 0.6s ease-in-out;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // function FloatingInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
// //   return (
// //     <div className="relative border border-emerald-300 rounded-xl px-3 pt-4 pb-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 transition hover:shadow-md">
// //       <label
// //         htmlFor={name}
// //         className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-emerald-600"
// //       >
// //         {label}
// //       </label>
// //       {Icon && <Icon className="absolute left-3 top-3.5 h-5 w-5 text-emerald-400" />}
// //       <input
// //         type={type}
// //         name={name}
// //         value={value}
// //         onChange={onChange}
// //         placeholder=" "
// //         className="w-full h-5 px-8 py-2 text-base text-gray-800 bg-transparent focus:outline-none"
// //         required
// //       />
// //       {ToggleIcon && (
// //         <button
// //           type="button"
// //           onClick={onToggle}
// //           className="absolute right-3 top-3 text-gray-600 hover:text-emerald-600"
// //         >
// //           <ToggleIcon className="h-5 w-5" />
// //         </button>
// //       )}
// //     </div>
// //   );
// // }

// // export default Signin;














// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import Confetti from "react-confetti";
// import { Eye, EyeOff, Lock, Mail, RefreshCw, BarChart, Users, Star, CheckCircle } from "lucide-react";

// function FloatingInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
//   return (
//     <div className="relative pt-6">
//       <label
//         htmlFor={name}
//         className={`absolute left-0 top-0 text-sm font-medium transition-all duration-300 pointer-events-none 
//           ${value ? 'text-xs top-2 text-emerald-600' : 'text-base top-6 text-gray-500'} `}
//       >
//         {label}
//       </label>
//       {Icon && <Icon className="absolute left-0 top-8 h-5 w-5 text-emerald-500" />}
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full h-10 pl-7 text-base text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none focus:border-emerald-600 transition duration-200"
//         required
//       />
//       {ToggleIcon && (
//         <button
//           type="button"
//           onClick={onToggle}
//           className="absolute right-0 top-8 text-gray-400 hover:text-emerald-600 transition"
//         >
//           <ToggleIcon className="h-5 w-5" />
//         </button>
//       )}
//     </div>
//   );
// }

// const DemoFeature = ({ icon: Icon, title, description }) => (
//   <div className="flex items-start space-x-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
//     <div className="flex-shrink-0 p-3 bg-emerald-400 rounded-full text-white shadow-lg">
//       <Icon className="w-6 h-6" />
//     </div>
//     <div>
//       <h4 className="text-xl font-bold text-white">{title}</h4>
//       <p className="text-gray-100 mt-1 text-sm">{description}</p>
//     </div>
//   </div>
// );

// const Signin = () => {
//   const navigate = useNavigate();
//   const canvasRef = useRef(null);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     captchaInput: "",
//   });

//   const [captchaText, setCaptchaText] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       generateCaptcha();
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   const generateCaptcha = () => {
//     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//     let text = "";
//     for (let i = 0; i < 6; i++) {
//       text += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setCaptchaText(text);

//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.font = "bold 24px Arial";
//       ctx.fillStyle = "#059669"; 
      
//       ctx.save();
//       ctx.translate(10, 28);
//       ctx.rotate(-0.05 * Math.PI + Math.random() * 0.1 - 0.05);
//       ctx.fillText(text, 0, 0);
//       ctx.restore();
      
//       ctx.strokeStyle = '#34D399'; 
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
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (formData.captchaInput.trim().toUpperCase() !== captchaText) {
//       setError("Invalid CAPTCHA");
//       generateCaptcha();
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("https://loyalty-backend-java.onrender.com/api/auth/signIn", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.message || "Login failed. Please check your credentials.");
//       }

//       const token = data.token;
//       const decoded = jwtDecode(token);
//       const role = decoded.role;

//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("token", token);
//       localStorage.setItem("id", data.id);
//       localStorage.setItem("role", role);
//       localStorage.setItem("name", data.name);
//       localStorage.setItem("CompanyEmail", data.companyEmail);

//       setSuccess(true);

//       setTimeout(() => {
//         if (role === "SHOPKEEPER") {
//           navigate("/shopkeeper/dashboard");
//         } else if (role === "USER") {
//           navigate("/user/dashboard");
//         } else {
//           setError("Login successful, but unrecognized role. Please contact support.");
//         }
//       }, 1500);
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "An unexpected error occurred. Please try again.");
//       generateCaptcha();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
//       <div className="relative z-10 w-full max-w-5xl flex bg-white shadow-xl rounded-lg overflow-hidden animate-fade-in-up">
//         <div className="w-full lg:w-6/12 p-8 md:p-12 flex flex-col justify-center">
          
//           <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
//             Sign In to Your Account
//           </h2>
//           <p className="text-gray-500 mb-8">
//             Enter your credentials to access the loyalty platform.
//           </p>

//           {error && <p className="text-red-600 text-sm mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-center">{error}</p>}
//           {success && (
//             <div className="relative mb-4">
//               <p className="text-emerald-600 text-sm p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r text-center animate-pulse">
//                 <CheckCircle className="inline w-4 h-4 mr-2" /> Signed in successfully!
//               </p>
//               <Confetti recycle={false} numberOfPieces={100} width={450} height={500} className="absolute top-0 left-1/2 transform -translate-x-1/2" />
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <FloatingInput
//               label="Email Address"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               type="email"
//               Icon={Mail}
//             />

//             <FloatingInput
//               label="Password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               value={formData.password}
//               onChange={handleChange}
//               Icon={Lock}
//               ToggleIcon={showPassword ? EyeOff : Eye}
//               onToggle={() => setShowPassword(!showPassword)}
//             />
//             <div className="space-y-4 pt-6">
//               <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
//                 <canvas
//                   ref={canvasRef}
//                   width={120}
//                   height={40}
//                   className="border border-emerald-300 rounded-md bg-white"
//                 />
//                 <button
//                   type="button"
//                   onClick={generateCaptcha}
//                   className="flex items-center gap-2 text-sm bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-150 shadow-md"
//                   aria-label="Refresh CAPTCHA"
//                 >
//                   <RefreshCw className="w-4 h-4" /> 
//                 </button>
//               </div>
//               <FloatingInput
//                 label="Enter CAPTCHA Code"
//                 name="captchaInput"
//                 value={formData.captchaInput}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex justify-end pt-2">
//               <button
//                 type="button"
//                 onClick={() => navigate("/forgot-password")}
//                 className="text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline transition"
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg transition duration-300 ${
//                 loading ? "opacity-70 cursor-not-allowed" : "hover:from-emerald-700 hover:to-blue-700 shadow-emerald-500/50"
//               }`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" >
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"></path>
//                   </svg>
//                   Signing in...
//                 </span>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>

//         </div>

//         <div className="hidden lg:flex w-6/12 bg-gradient-to-br from-emerald-500 to-sky-600 p-12 flex-col justify-center space-y-8 relative">
//           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff3_1px,transparent_1px),linear-gradient(to_bottom,#fff3_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
          
//           <h1 className="text-4xl font-extrabold text-white leading-tight relative">
//             Fuel Loyalty. Drive Growth.
//           </h1>
//           <p className="text-emerald-100 text-lg relative">
//             The simplest way for small businesses to launch, manage, and scale their customer reward programs.
//           </p>

//           <div className="space-y-4 relative">
//             <DemoFeature
//               icon={BarChart}
//               title="Track Your Success"
//               description="Get clear metrics on customer engagement and lifetime value."
//             />
//             <DemoFeature
//               icon={Users}
//               title="Engage Every Customer"
//               description="Seamless experience for both your shopkeepers and loyal users."
//             />
//             <DemoFeature
//               icon={Star}
//               title="Reward Loyalty Easily"
//               description="Simple point system designed to bring customers back, time and again."
//             />
//           </div>

//         </div>
//       </div>
  
//       <style>{`
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Signin;












import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  RefreshCw,
  BarChart,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Puzzle,
  ShieldCheck
} from "lucide-react";

function FloatingInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
  return (
    <div className="relative pt-6">
      <label
        htmlFor={name}
        className={`absolute left-0 text-sm font-medium transition-all duration-300 pointer-events-none 
          ${value ? "text-xs top-1 text-emerald-600" : "text-base top-4 text-gray-500"} `}
      >
        {label}
      </label>
      {Icon && <Icon className="absolute left-0 top-8 h-5 w-5 text-emerald-500" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-10 pl-7 text-base text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none focus:border-emerald-600 transition duration-200"
        required
      />
      {ToggleIcon && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-0 top-8 text-gray-400 hover:text-emerald-600 transition"
        >
          <ToggleIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

const DemoFeature = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
    <div className="flex-shrink-0 p-3 bg-emerald-400 rounded-full text-white shadow-lg">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="text-xl font-bold text-white">{title}</h4>
      <p className="text-gray-100 mt-1 text-sm">{description}</p>
    </div>
  </div>
);

const Signin = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captchaInput: "",
  });

  const [captchaText, setCaptchaText] = useState("");
  const [error, setError] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Countdown for subscription redirect
  useEffect(() => {
    if (subscriptionMessage) {
      let sec = 5;
      const el = document.getElementById("countdown");
      const timer = setInterval(() => {
        sec--;
        if (el) el.textContent = sec.toString();
        if (sec <= 0) clearInterval(timer);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [subscriptionMessage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      generateCaptcha();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold 22px Arial";
      ctx.fillStyle = "#059669";

      ctx.save();
      ctx.translate(10, 28);
      ctx.rotate(-0.03 * Math.PI + Math.random() * 0.1 - 0.03);
      ctx.fillText(text, 0, 0);
      ctx.restore();

      ctx.strokeStyle = "#34D399";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubscriptionMessage(null);
    setSuccess(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.captchaInput.trim().toUpperCase() !== captchaText) {
      setError("Invalid CAPTCHA");
      generateCaptcha();
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.error && data.error.includes("subscription") && data.error.includes("Loyalty")) {
        localStorage.clear();
        sessionStorage.clear();

        setSubscriptionMessage(
          "Your subscription does not include the Loyalty application. Please upgrade to continue."
        );

        setTimeout(() => {
          window.location.href = "https://subscription-frontend-psi.vercel.app/subscription";
        }, 5000);
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || data.error || "Login failed. Please check your credentials.");
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("id", String(data.id));
      localStorage.setItem("name", data.name ?? "");
      localStorage.setItem("CompanyEmail", data.companyEmail ?? "");

      setSuccess(true);

      setTimeout(() => {
        if (data.role === "SHOPKEEPER") {
          navigate("/shopkeeper/dashboard");
        } else if (data.role === "USER") {
          navigate("/user/dashboard");
        } else {
          setError("Unrecognized role");
        }
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center p-8 justify-center px-4 bg-gray-50"
      style={{
        backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >

    {/* // <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8"> */}
      <div className="relative z-10 w-full max-w-5xl flex bg-white shadow-xl rounded-lg overflow-hidden animate-fade-in-up">
        <div className="w-full lg:w-6/12 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Sign In to Your Account
          </h2>
          <p className="text-gray-500 mb-8">
            Enter your credentials to access the loyalty platform.
          </p>

          {error && (
            <p className="text-red-600 text-sm mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-center">
              {error}
            </p>
          )}

          {subscriptionMessage && (
            <div className="relative mb-4 p-3 bg-amber-50 border-l-4 border-amber-600 rounded-r text-center animate-pulse">
              <AlertCircle className="inline w-4 h-4 mr-2 text-amber-700" />
              <span className="text-amber-800 font-medium">{subscriptionMessage}</span>
              <div className="mt-2 text-xs text-amber-600">
                Redirecting to subscription page in <span id="countdown">5</span> s…
              </div>
            </div>
          )}

          {success && (
            <div className="relative mb-4">
              <p className="text-emerald-600 text-sm p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r text-center animate-pulse">
                <CheckCircle className="inline w-4 h-4 mr-2" /> Signed in successfully!
              </p>
              <Confetti
                recycle={false}
                numberOfPieces={100}
                width={450}
                height={500}
                className="absolute top-0 left-1/2 transform -translate-x-1/2"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FloatingInput
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              Icon={Mail}
            />

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

            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <canvas
                  ref={canvasRef}
                  width={120}
                  height={40}
                  className="border border-emerald-300 rounded-md bg-white"
                />
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="flex items-center gap-2 text-sm bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-150 shadow-md"
                  aria-label="Refresh CAPTCHA"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <FloatingInput
                label="Enter CAPTCHA Code"
                name="captchaInput"
                value={formData.captchaInput}
                onChange={handleChange}
                Icon={Puzzle}
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline transition"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg transition duration-300 ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-emerald-700 hover:to-blue-700 shadow-emerald-500/50"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <div className="hidden lg:flex w-6/12 bg-gradient-to-br from-emerald-500 to-sky-600 p-12 flex-col justify-center space-y-8 relative">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff3_1px,transparent_1px),linear-gradient(to_bottom,#fff3_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

          <h1 className="text-4xl font-extrabold text-white leading-tight relative">
            Fuel Loyalty. Drive Growth.
          </h1>
          <p className="text-emerald-100 text-lg relative">
            The simplest way for small businesses to launch, manage, and scale their customer reward programs.
          </p>

          <div className="space-y-4 relative">
            <DemoFeature
              icon={BarChart}
              title="Track Your Success"
              description="Get clear metrics on customer engagement and lifetime value."
            />
            <DemoFeature
              icon={Users}
              title="Engage Every Customer"
              description="Seamless experience for both your shopkeepers and loyal users."
            />
            <DemoFeature
              icon={Star}
              title="Reward Loyalty Easily"
              description="Simple point system designed to bring customers back, time and again."
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Signin;