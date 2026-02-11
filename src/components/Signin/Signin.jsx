// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Confetti from "react-confetti";
// import {
//   Eye,
//   EyeOff,
//   Lock,
//   Mail,
//   RefreshCw,
//   BarChart,
//   Users,
//   Star,
//   CheckCircle,
//   AlertCircle,
//   Puzzle,
//   ShieldCheck,
//   User,
//   Store,
//   Users as UsersIcon,
// } from "lucide-react";

// function FloatingInput({
//   label,
//   name,
//   value,
//   onChange,
//   type = "text",
//   Icon,
//   ToggleIcon,
//   onToggle,
// }) {
//   return (
//     <div className="relative pt-6">
//       <label
//         htmlFor={name}
//         className={`absolute left-0 text-sm font-medium transition-all duration-300 pointer-events-none 
//           ${value ? "text-xs top-1 text-emerald-600" : "text-base top-4 text-gray-500"} `}
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
//   <div className="flex items-start space-x-4 p-4 rounded-md bg-white/10 backdrop-blur-sm border border-white/20">
//     <div className="flex-shrink-0 p-3 bg-emerald-400 rounded-full text-white shadow-lg">
//       <Icon className="w-6 h-6" />
//     </div>
//     <div>
//       <h4 className="text-xl font-bold text-white">{title}</h4>
//       <p className="text-gray-100 mt-1 text-sm">{description}</p>
//     </div>
//   </div>
// );

// const RoleCard = ({ role, displayName, onClick, disabled }) => {
//   const icons = {
//     USER: User,
//     SHOPKEEPER: Store,
//     EMPLOYEE: UsersIcon,
//   };
//   const Icon = icons[role] || ShieldCheck;

//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`w-full p-5 rounded-md border-2 transition-all duration-200 text-left
//         ${disabled
//           ? "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60"
//           : "bg-emerald-50 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-500 hover:shadow-lg"
//         }`}
//     >
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="p-2 bg-emerald-500 rounded-full text-white">
//             <Icon className="w-5 h-5" />
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-900">
//               {role === "USER"
//                 ? "Customer"
//                 : role === "SHOPKEEPER"
//                 ? "Shop Owner"
//                 : "Shop Employee"}
//             </h3>
//             <p className="text-sm text-gray-600">{displayName}</p>
//           </div>
//         </div>
//         {!disabled && <div className="text-emerald-600">Select</div>}
//       </div>
//     </button>
//   );
// };

// const Signin = () => {
//   const navigate = useNavigate();
//   const canvasRef = useRef(null);

//   const [step, setStep] = useState("password");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [captchaInput, setCaptchaInput] = useState("");
//   const [captchaText, setCaptchaText] = useState("");
//   const [roles, setRoles] = useState([]);
//   const [error, setError] = useState("");
//   const [subscriptionMessage, setSubscriptionMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     if (subscriptionMessage) {
//       let sec = 5;
//       const el = document.getElementById("countdown");
//       const timer = setInterval(() => {
//         sec--;
//         if (el) el.textContent = sec.toString();
//         if (sec <= 0) clearInterval(timer);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [subscriptionMessage]);

//   useEffect(() => {
//     const timer = setTimeout(() => generateCaptcha(), 100);
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
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.clearRect(0, 0, 120, 40);
//     ctx.font = "bold 22px Arial";
//     ctx.fillStyle = "#059669";
//     ctx.save();
//     ctx.translate(10, 28);
//     ctx.rotate(-0.03 * Math.PI + Math.random() * 0.1 - 0.03);
//     ctx.fillText(text, 0, 0);
//     ctx.restore();

//     ctx.strokeStyle = "#34D399";
//     ctx.lineWidth = 1;
//     for (let i = 0; i < 3; i++) {
//       ctx.beginPath();
//       ctx.moveTo(Math.random() * 120, Math.random() * 40);
//       ctx.lineTo(Math.random() * 120, Math.random() * 40);
//       ctx.stroke();
//     }
//   };

//   // Step 1 – email + password + captcha
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubscriptionMessage(null);

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (captchaInput.trim().toUpperCase() !== captchaText) {
//       setError("Invalid CAPTCHA");
//       generateCaptcha();
//       setCaptchaInput("");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(
//         "https://loyalty-backend-java.onrender.com/api/auth/signIn/step1",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//           credentials: "include",
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         if (
//           data.error?.includes("subscription") &&
//           data.error?.includes("Loyalty")
//         ) {
//           setSubscriptionMessage(
//             "Your subscription does not include the Loyalty app. Redirecting..."
//           );
//           setTimeout(() => {
//             window.location.href =
//               "https://subscription-frontend-psi.vercel.app/subscription";
//           }, 5000);
//           return;
//         }
//         throw new Error(data.message || data.error || "Invalid credentials");
//       }

//       // Single role or complete response → auto-login
//       if (data.role || (data.roles && data.roles.length === 1)) {
//         finishLogin(data);
//         return;
//       }

//       // Multiple roles → show selector
//       if (data.roles && data.roles.length > 1) {
//         setRoles(data.roles);
//         setStep("role");
//       } else {
//         setError("No valid roles found");
//       }
//     } catch (err) {
//       setError(err.message);
//       generateCaptcha();
//       setCaptchaInput("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2 – user picks a role
//   const handleRoleSelect = async (role) => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch(
//         "https://loyalty-backend-java.onrender.com/api/auth/signIn/step2",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password, role }),
//           credentials: "include",
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Login failed");

//       finishLogin(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Final login – store data & redirect
//   const finishLogin = (data) => {
//     // Extract fields, handle single-role case
//     const loginRole = data.role || (data.roles && data.roles.length === 1 ? data.roles[0].role : null);
//     const loginId = data.id || (data.roles && data.roles.length === 1 ? data.roles[0].refId : null);
//     const loginName = data.name || (data.roles && data.roles.length === 1 ? data.roles[0].displayName : null);

//     if (!loginRole) {
//       setError("No valid role provided");
//       return;
//     }

//     localStorage.setItem("isLoggedIn", "true");
//     localStorage.setItem("id", String(loginId || ""));
//     localStorage.setItem("name", loginName || "");
//     localStorage.setItem("companyEmail", data.companyEmail || "");
//     localStorage.setItem("role", loginRole || "");

//     setSuccess(true);

//     setTimeout(() => {
//       if (loginRole === "SHOPKEEPER") {
//         navigate("/shopkeeper/dashboard");
//       } else if (loginRole === "USER") {
//         navigate("/user/dashboard");
//       } else if (loginRole === "EMPLOYEE") {
//         navigate("/shopkeeper/customer-lookup");
//       } else {
//         setError("Unknown role: " + loginRole);
//       }
//     }, 1500);
//   };

//   return (
//     // <div 
//     //   className="min-h-screen flex items-center p-8 justify-center px-4 bg-gray-200"
//       // style={{
//       //   backgroundImage:
//       //     "linear-gradient(0deg, rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)",
//       //   backgroundSize: "20px 20px",
//       // }}
//     // >
//     <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
//       <div className="w-full max-w-5xl flex bg-white shadow-xl border border-gray-200 rounded-md overflow-hidden animate-fade-in-up">
//         {/* left side */}
//         <div className="hidden lg:flex w-6/12 bg-gradient-to-br from-emerald-500 to-sky-600 p-8 flex-col justify-center relative space-y-6">
//           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff3_1px,transparent_1px),linear-gradient(to_bottom,#fff3_1px,transparent_1px)] bg-[size:30px_30px]"></div>

//           <h1 className="text-4xl font-extrabold text-white leading-tight">
//             Fuel Loyalty. Drive Growth.
//           </h1>
//           <p className="text-emerald-100 text-lg">
//             The simplest way for small businesses to launch, manage, and scale
//             their customer reward programs.
//           </p>

//           <div className="space-y-6">
//             <DemoFeature
//               icon={BarChart}
//               title="Track Your Success"
//               description="Get clear metrics on customer engagement."
//             />
//             <DemoFeature
//               icon={Users}
//               title="Engage Every Customer"
//               description="Seamless experience for all users."
//             />
//             <DemoFeature
//               icon={Star}
//               title="Reward Loyalty Easily"
//               description="Simple point system designed to bring customers back, time and again."
//             />
//           </div>
//         </div>

//         {/* right Side - Form */}
//         <div className="w-full lg:w-6/12 p-8 md:p-12 flex flex-col justify-center">
//           <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Sign In</h2>
//           <p className="text-gray-500 mb-6">
//             Enter your credentials to access the platform.
//           </p>

//           {error && (
//             <p className="text-red-600 text-sm mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-center">
//               {error}
//             </p>
//           )}

//           {subscriptionMessage && (
//             <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-600 rounded-r text-center">
//               <AlertCircle className="inline w-4 h-4 mr-2 text-amber-700" />
//               <span className="text-amber-800 font-medium">{subscriptionMessage}</span>
//               <div className="mt-2 text-xs text-amber-600">
//                 Redirecting to subscription page in <span id="countdown">5</span> s…
//               </div>
//             </div>
//           )}

//           {success && (
//             <div className="mb-4 text-emerald-600 text-sm p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r text-center">
//               <CheckCircle className="inline w-4 h-4 mr-2" /> Signed in Successfully!
//               <Confetti
//                 recycle={false}
//                 numberOfPieces={100}
//                 width={450}
//                 height={500}
//                 className="absolute top-0 left-1/2 transform -translate-x-1/2"
//               />
//             </div>
//           )}

//           {/* ---- STEP 1: PASSWORD ---- */}
//           {step === "password" && (
//             <form onSubmit={handlePasswordSubmit} className="space-y-6">
//               <FloatingInput
//                 label="Email Address"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//                 Icon={Mail}
//               />
//               <FloatingInput
//                 label="Password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 Icon={Lock}
//                 ToggleIcon={showPassword ? EyeOff : Eye}
//                 onToggle={() => setShowPassword(!showPassword)}
//               />

//               <div className="space-y-4 pt-3">
//                 <div className="flex items-center justify-between p-1 bg-gray-200 rounded-md">
//                   <canvas
//                     ref={canvasRef}
//                     width={120}
//                     height={40}
//                     className="border border-emerald-300 rounded-md bg-white"
//                   />
//                   <button
//                     type="button"
//                     onClick={generateCaptcha}
//                     className="flex items-center gap-2 text-sm bg-blue-500 text-white px-2 py-2 rounded-full hover:bg-blue-600 transition duration-150 shadow-md"
//                     aria-label="Refresh CAPTCHA"
//                   >
//                     <RefreshCw className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <FloatingInput
//                   label="Enter CAPTCHA"
//                   name="captcha"
//                   value={captchaInput}
//                   onChange={(e) => setCaptchaInput(e.target.value)}
//                   Icon={Puzzle}
//                 />
//               </div>

//             <div className="flex justify-end pt-2">
//               <button
//                 type="button"
//                 onClick={() => navigate("/forgot-password")}
//                 className="text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline transition"
//               >
//                 Forgot Password?
//               </button>
//             </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full bg-gradient-to-r from-emerald-500 to-sky-600 text-white py-2 text-lg font-semibold rounded-md shadow-lg transition ${
//                   loading ? "opacity-70" : "hover:from-emerald-600 hover:to-sky-700"
//                 }`}
//               >
//                 {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg
//                     className="animate-spin h-4 w-4 text-white"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
//                     ></path>
//                   </svg>
//                   Logging in...
//                 </span>
//               ) : (
//                 "Sign In"
//               )}
//               </button>
//             </form>
//           )}

//           {/* ---- STEP 2: ROLE SELECTOR ---- */}
//           {step === "role" && (
//             <div className="mt-6 space-y-4">
//               <h3 className="text-lg font-semibold text-center text-gray-800">
//                 Choose how you want to sign in:
//               </h3>
//               <div className="space-y-3">
//                 {roles.map((r) => (
//                   <RoleCard
//                     key={r.role}
//                     role={r.role}
//                     displayName={r.displayName}
//                     onClick={() => handleRoleSelect(r.role)}
//                     disabled={loading}
//                   />
//                 ))}
//               </div>
//               <button
//                 onClick={() => setStep("password")}
//                 className="w-full text-sm text-gray-600 hover:text-gray-800 underline"
//               >
//                 Back to password
//               </button>
//             </div>
//           )}
//         </div>

//       </div>

//       <style>{`
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
//       `}</style>
//     </div>
//   );
// };

// export default Signin;












// //translate
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Confetti from "react-confetti";
// import { useTranslation } from 'react-i18next'; // ← ONLY ADDED
// import {
//   Eye,
//   EyeOff,
//   Lock,
//   Mail,
//   RefreshCw,
//   BarChart,
//   Users,
//   Star,
//   CheckCircle,
//   AlertCircle,
//   Puzzle,
//   ShieldCheck,
//   User,
//   Store,
//   Users as UsersIcon,
// } from "lucide-react";

// function FloatingInput({
//   label,
//   name,
//   value,
//   onChange,
//   type = "text",
//   Icon,
//   ToggleIcon,
//   onToggle,
// }) {
//   return (
//     <div className="relative pt-6">
//       <label
//         htmlFor={name}
//         className={`absolute left-0 text-sm font-medium transition-all duration-300 pointer-events-none 
//           ${value ? "text-xs top-1 text-emerald-600" : "text-base top-4 text-gray-500"} `}
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
//   <div className="flex items-start space-x-4 p-4 rounded bg-white/10 backdrop-blur-sm border border-white/20">
//     <div className="flex-shrink-0 p-3 bg-emerald-400 rounded-full text-white shadow-lg">
//       <Icon className="w-6 h-6" />
//     </div>
//     <div>
//       <h4 className="text-xl font-bold text-white">{title}</h4>
//       <p className="text-gray-100 mt-1 text-sm">{description}</p>
//     </div>
//   </div>
// );

// const RoleCard = ({ role, displayName, onClick, disabled }) => {
//   const { t } = useTranslation();
//   const icons = {
//     USER: User,
//     SHOPKEEPER: Store,
//     EMPLOYEE: UsersIcon,
//   };
//   const Icon = icons[role] || ShieldCheck;

//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`w-full p-5 rounded border-2 transition-all duration-200 text-left
//         ${disabled
//           ? "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60"
//           : "bg-emerald-50 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-500 hover:shadow-lg"
//         }`}
//     >
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="p-2 bg-emerald-500 rounded-full text-white">
//             <Icon className="w-5 w-5" />
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-900">
//               {role === "USER"
//                 ? t("signin.roles.customer")
//                 : role === "SHOPKEEPER"
//                 ? t("signin.roles.shopOwner")
//                 : t("signin.roles.employee")}
//             </h3>
//             <p className="text-sm text-gray-600">{displayName}</p>
//           </div>
//         </div>
//         {!disabled && <div className="text-emerald-600">{t("signin.select")}</div>}
//       </div>
//     </button>
//   );
// };

// const Signin = () => {
//   const { t } = useTranslation(); // ← ONLY THIS LINE ADDED
//   const navigate = useNavigate();
//   const canvasRef = useRef(null);

//   const [step, setStep] = useState("password");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [captchaInput, setCaptchaInput] = useState("");
//   const [captchaText, setCaptchaText] = useState("");
//   const [roles, setRoles] = useState([]);
//   const [error, setError] = useState("");
//   const [subscriptionMessage, setSubscriptionMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     if (subscriptionMessage) {
//       let sec = 5;
//       const el = document.getElementById("countdown");
//       const timer = setInterval(() => {
//         sec--;
//         if (el) el.textContent = sec.toString();
//         if (sec <= 0) clearInterval(timer);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [subscriptionMessage]);

//   useEffect(() => {
//     const timer = setTimeout(() => generateCaptcha(), 100);
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
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.clearRect(0, 0, 120, 40);
//     ctx.font = "bold 22px Arial";
//     ctx.fillStyle = "#059669";
//     ctx.save();
//     ctx.translate(10, 28);
//     ctx.rotate(-0.03 * Math.PI + Math.random() * 0.1 - 0.03);
//     ctx.fillText(text, 0, 0);
//     ctx.restore();

//     ctx.strokeStyle = "#34D399";
//     ctx.lineWidth = 1;
//     for (let i = 0; i < 3; i++) {
//       ctx.beginPath();
//       ctx.moveTo(Math.random() * 120, Math.random() * 40);
//       ctx.lineTo(Math.random() * 120, Math.random() * 40);
//       ctx.stroke();
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubscriptionMessage(null);

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError(t("signin.error.invalidEmail"));
//       return;
//     }

//     if (captchaInput.trim().toUpperCase() !== captchaText) {
//       setError(t("signin.error.invalidCaptcha"));
//       generateCaptcha();
//       setCaptchaInput("");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(
//         "https://loyalty-backend-java.onrender.com/api/auth/signIn/step1",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//           credentials: "include",
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         if (
//           data.error?.includes("subscription") &&
//           data.error?.includes("Loyalty")
//         ) {
//           setSubscriptionMessage(t("signin.subscriptionMessage"));
//           setTimeout(() => {
//             window.location.href =
//               "https://subscription-frontend-psi.vercel.app/subscription";
//           }, 5000);
//           return;
//         }
//         throw new Error(data.message || data.error || t("signin.error.invalidCredentials"));
//       }

//       if (data.role || (data.roles && data.roles.length === 1)) {
//         finishLogin(data);
//         return;
//       }

//       if (data.roles && data.roles.length > 1) {
//         setRoles(data.roles);
//         setStep("role");
//       } else {
//         setError(t("signin.error.noRoles"));
//       }
//     } catch (err) {
//       setError(err.message);
//       generateCaptcha();
//       setCaptchaInput("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRoleSelect = async (role) => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch(
//         "https://loyalty-backend-java.onrender.com/api/auth/signIn/step2",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password, role }),
//           credentials: "include",
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || t("signin.error.loginFailed"));

//       finishLogin(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const finishLogin = (data) => {
//     const loginRole = data.role || (data.roles && data.roles.length === 1 ? data.roles[0].role : null);
//     const loginId = data.id || (data.roles && data.roles.length === 1 ? data.roles[0].refId : null);
//     const loginName = data.name || (data.roles && data.roles.length === 1 ? data.roles[0].displayName : null);

//     if (!loginRole) {
//       setError(t("signin.error.noRoleProvided"));
//       return;
//     }

//     localStorage.setItem("isLoggedIn", "true");
//     localStorage.setItem("id", String(loginId || ""));
//     localStorage.setItem("name", loginName || "");
//     localStorage.setItem("companyEmail", data.companyEmail || "");
//     localStorage.setItem("role", loginRole || "");

//     setSuccess(true);

//     setTimeout(() => {
//       if (loginRole === "SHOPKEEPER") {
//         navigate("/shopkeeper/dashboard");
//       } else if (loginRole === "USER") {
//         navigate("/user/dashboard");
//       } else if (loginRole === "EMPLOYEE") {
//         navigate("/shopkeeper/customer-lookup");
//       } else {
//         setError(t("signin.error.unknownRole", { role: loginRole }));
//       }
//     }, 1500);
//   };

//   return (
//     // <div 
//     //   className="min-h-screen flex items-center p-8 justify-center px-4 bg-gray-200"
//     //   style={{
//     //     backgroundImage:
//     //       "linear-gradient(0deg, rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)",
//     //     backgroundSize: "20px 20px",
//     //   }}
//     // >
//     <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
//       <div className="w-full max-w-5xl flex bg-white shadow-xl border border-gray-200 rounded overflow-hidden animate-fade-in-up">
//         {/* left side */}
//         <div className="hidden lg:flex w-6/12 bg-gradient-to-br from-emerald-500 to-sky-600 p-8 flex-col justify-center relative space-y-6">
//           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff3_1px,transparent_1px),linear-gradient(to_bottom,#fff3_1px,transparent_1px)] bg-[size:30px_30px]"></div>

//           <h1 className="text-4xl font-extrabold text-white leading-tight">
//             {t("signin.hero.title")}
//           </h1>
//           <p className="text-emerald-100 text-lg">
//             {t("signin.hero.subtitle")}
//           </p>

//           <div className="space-y-6">
//             <DemoFeature
//               icon={BarChart}
//               title={t("signin.features.track")}
//               description={t("signin.features.trackDesc")}
//             />
//             <DemoFeature
//               icon={Users}
//               title={t("signin.features.engage")}
//               description={t("signin.features.engageDesc")}
//             />
//             <DemoFeature
//               icon={Star}
//               title={t("signin.features.reward")}
//               description={t("signin.features.rewardDesc")}
//             />
//           </div>
//         </div>

//         {/* right Side - Form */}
//         <div className="w-full lg:w-6/12 p-8 md:p-12 flex flex-col justify-center">
//           <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{t("signin.title")}</h2>
//           <p className="text-gray-500 mb-6">
//             {t("signin.subtitle")}
//           </p>

//           {error && (
//             <p className="text-red-600 text-sm mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-center">
//               {error}
//             </p>
//           )}

//           {subscriptionMessage && (
//             <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-600 rounded-r text-center">
//               <AlertCircle className="inline w-4 h-4 mr-2 text-amber-700" />
//               <span className="text-amber-800 font-medium">{subscriptionMessage}</span>
//               <div className="mt-2 text-xs text-amber-600">
//                 {t("signin.redirecting")} <span id="countdown">5</span> s…
//               </div>
//             </div>
//           )}

//           {success && (
//             <div className="mb-4 text-emerald-600 text-sm p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r text-center">
//               <CheckCircle className="inline w-4 h-4 mr-2" /> {t("signin.success")}
//               <Confetti
//                 recycle={false}
//                 numberOfPieces={100}
//                 width={450}
//                 height={500}
//                 className="absolute top-0 left-1/2 transform -translate-x-1/2"
//               />
//             </div>
//           )}

//           {/* ---- STEP 1: PASSWORD ---- */}
//           {step === "password" && (
//             <form onSubmit={handlePasswordSubmit} className="space-y-6">
//               <FloatingInput
//                 label={t("signin.emailLabel")}
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//                 Icon={Mail}
//               />
//               <FloatingInput
//                 label={t("signin.passwordLabel")}
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 Icon={Lock}
//                 ToggleIcon={showPassword ? EyeOff : Eye}
//                 onToggle={() => setShowPassword(!showPassword)}
//               />

//               <div className="space-y-4 pt-3">
//                 <div className="flex items-center justify-between p-1 bg-gray-200 rounded">
//                   <canvas
//                     ref={canvasRef}
//                     width={120}
//                     height={40}
//                     className="border border-emerald-300 rounded bg-white"
//                   />
//                   <button
//                     type="button"
//                     onClick={generateCaptcha}
//                     className="flex items-center gap-2 text-sm bg-blue-500 text-white px-2 py-2 rounded-full hover:bg-blue-600 transition duration-150 shadow-md"
//                     aria-label={t("signin.refreshCaptcha")}
//                   >
//                     <RefreshCw className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <FloatingInput
//                   label={t("signin.captchaLabel")}
//                   name="captcha"
//                   value={captchaInput}
//                   onChange={(e) => setCaptchaInput(e.target.value)}
//                   Icon={Puzzle}
//                 />
//               </div>

//               <div className="flex justify-end pt-2">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/forgot-password")}
//                   className="text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline transition"
//                 >
//                   {t("signin.forgotPassword")}
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full bg-gradient-to-r from-emerald-500 to-sky-600 text-white py-2 text-lg font-semibold rounded shadow-lg transition ${
//                   loading ? "opacity-70" : "hover:from-emerald-600 hover:to-sky-700"
//                 }`}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg

//                       className="animate-spin h-4 w-4 text-white"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
//                       ></path>
//                     </svg>
//                     {t("signin.loggingIn")}
//                   </span>
//                 ) : (
//                   t("signin.signInButton")
//                 )}
//               </button>
//             </form>
//           )}

//           {/* ---- STEP 2: ROLE SELECTOR ---- */}
//           {step === "role" && (
//             <div className="mt-6 space-y-4">
//               <h3 className="text-lg font-semibold text-center text-gray-800">
//                 {t("signin.chooseRole")}
//               </h3>
//               <div className="space-y-3">
//                 {roles.map((r) => (
//                   <RoleCard
//                     key={r.role}
//                     role={r.role}
//                     displayName={r.displayName}
//                     onClick={() => handleRoleSelect(r.role)}
//                     disabled={loading}
//                   />
//                 ))}
//               </div>
//               <button
//                 onClick={() => setStep("password")}
//                 className="w-full text-sm text-gray-600 hover:text-gray-800 underline"
//               >
//                 {t("signin.backToPassword")}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <style>{`
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
//       `}</style>
//     </div>
//   );
// };

// export default Signin;















import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useTranslation } from 'react-i18next';
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
  ShieldCheck,
  User,
  Store,
  Users as UsersIcon,
  ArrowLeft,
  LogIn,
} from "lucide-react";
import { API_BASE_URL } from '../../apiConfig';

function FloatingInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  Icon,
  ToggleIcon,
  onToggle,
}) {
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
  <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
    <div className="flex-shrink-0 p-3 bg-emerald-400 rounded-full text-white shadow-lg">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="text-xl font-bold text-white">{title}</h4>
      <p className="text-gray-100 mt-1 text-sm">{description}</p>
    </div>
  </div>
);

const RoleCard = ({ roleInfo, onClick, disabled, isSelected }) => {
  const { t } = useTranslation();
  const { role, displayName } = roleInfo;

  const icons = {
    USER: User,
    SHOPKEEPER: Store,
    EMPLOYEE: UsersIcon,
  };
  const Icon = icons[role] || ShieldCheck;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left relative
        ${disabled
          ? "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60"
          : isSelected
          ? "bg-emerald-100 border-emerald-500 shadow-lg ring-2 ring-emerald-400"
          : "bg-emerald-50 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-500 hover:shadow-lg"
        }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-emerald-500 rounded-full text-white">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {role === "USER"
                ? t("signin.roles.customer")
                : role === "SHOPKEEPER"
                ? t("signin.roles.shopOwner")
                : t("signin.roles.employee")}
            </h3>
            <p className="text-sm text-gray-600">{displayName}</p>
          </div>
        </div>
        {isSelected && <CheckCircle className="w-6 h-6 text-emerald-600" />}
      </div>
    </button>
  );
};

const Signin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [step, setStep] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [roles, setRoles] = useState([]);
  const [employeeShops, setEmployeeShops] = useState([]);
  const [showShopSelection, setShowShopSelection] = useState(false);
  const [selectedRoleInfo, setSelectedRoleInfo] = useState(null);
  const [error, setError] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    const timer = setTimeout(() => generateCaptcha(), 100);
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
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 120, 40);
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
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubscriptionMessage(null);
    setShowShopSelection(false);
    setEmployeeShops([]);
    setSelectedRoleInfo(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t("signin.error.invalidEmail"));
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaText) {
      setError(t("signin.error.invalidCaptcha"));
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/auth/signIn/step1`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.includes("subscription") && data.error?.includes("Loyalty")) {
          setSubscriptionMessage(t("signin.subscriptionMessage"));
          setTimeout(() => {
            window.location.href = "https://subscription-frontend-psi.vercel.app/subscription";
          }, 5000);
          return;
        }
        throw new Error(data.message || data.error || t("signin.error.invalidCredentials"));
      }

      // Single role → auto login
      if (data.role || (data.roles && data.roles.length === 1)) {
        finishLogin(data);
        return;
      }

      // Multiple roles → group EMPLOYEE shops
      if (data.roles && data.roles.length > 1) {
        const groupedRoles = [];
        const employeeRoles = [];

        data.roles.forEach(r => {
          if (r.role === "EMPLOYEE") {
            employeeRoles.push(r);
          } else {
            groupedRoles.push(r);
          }
        });

        if (employeeRoles.length > 0) {
          groupedRoles.push({
            role: "EMPLOYEE",
            displayName: employeeRoles.length === 1 
              ? employeeRoles[0].displayName 
              : `${employeeRoles.length} Shops`,
            _shops: employeeRoles
          });
        }

        setRoles(groupedRoles);
        setStep("role");
      } else {
        setError(t("signin.error.noRoles"));
      }
    } catch (err) {
      setError(err.message);
      generateCaptcha();
      setCaptchaInput("");
    } finally {
      setLoading(false);
    }
  };

  // Select a role/shop (just highlight, no login yet)
  const handleRoleSelect = (roleInfo) => {
    if (roleInfo.role !== "EMPLOYEE") {
      setSelectedRoleInfo(roleInfo);
      return;
    }

    const shops = roleInfo._shops || [roleInfo];
    if (shops.length === 1) {
      setSelectedRoleInfo(shops[0]);
    } else {
      setEmployeeShops(shops);
      setShowShopSelection(true);
    }
  };

  // Final login when user clicks the "Sign In" button
  const performLogin = async () => {
    if (!selectedRoleInfo) {
      setError("Please select a role/shop first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        email,
        password,
        role: selectedRoleInfo.role,
        contextId: selectedRoleInfo.refId
      };

      const res = await fetch(
        `${API_BASE_URL}/api/auth/signIn/step2`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || data.message || "Login failed");

      finishLogin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const finishLogin = (data) => {
    let loginRole = data.role;   
    let loginId = data.id;        
    let loginName = data.name;

    // Handle single role auto-login (when backend sends direct response)
    if (data.roles && data.roles.length === 1) {
      const single = data.roles[0];
      loginRole = single.role;
      loginId = single.refId;
      loginName = single.displayName;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("id", String(loginId || ""));
    localStorage.setItem("name", loginName || "");
    localStorage.setItem("companyEmail", data.companyEmail || "");
    localStorage.setItem("role", loginRole || "");
    localStorage.setItem("email", data.email || "");

    if (loginRole === "EMPLOYEE" && data.userId) {
      localStorage.setItem("employeeUserId", data.userId);
    }

    setSuccess(true);

    setTimeout(() => {
      if (loginRole === "SHOPKEEPER") {
        navigate("/shopkeeper/dashboard");
      } else if (loginRole === "USER") {
        navigate("/user/dashboard");
      } else if (loginRole === "EMPLOYEE") {
        navigate("/employee/dashboard");
      } else {
        setError(t("signin.error.unknownRole", { role: loginRole }));
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-xl md:max-w-2xl lg:max-w-5xl flex bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden animate-fade-in-up">
      {/* <div className="w-full max-w-md md:max-w-xl lg:max-w-5xl bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden animate-fade-in-up"> */}
        {/* left side */}
        <div className="hidden lg:flex w-6/12 bg-gradient-to-br from-emerald-500 to-sky-600 p-8 flex-col justify-center relative space-y-6">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff3_1px,transparent_1px),linear-gradient(to_bottom,#fff3_1px,transparent_1px)] bg-[size:30px_30px]"></div>

          <h1 className="text-4xl font-extrabold text-white leading-tight">
            {t("signin.hero.title")}
          </h1>
          <p className="text-emerald-100 text-lg">
            {t("signin.hero.subtitle")}
          </p>

          <div className="space-y-6">
            <DemoFeature icon={BarChart} title={t("signin.features.track")} description={t("signin.features.trackDesc")} />
            <DemoFeature icon={Users} title={t("signin.features.engage")} description={t("signin.features.engageDesc")} />
            <DemoFeature icon={Star} title={t("signin.features.reward")} description={t("signin.features.rewardDesc")} />
          </div>
        </div>

        {/* right Side - Form */}
        <div className="w-full lg:w-6/12 p-8 md:p-12 flex flex-col justify-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{t("signin.title")}</h2>
        <p className="text-gray-500 mb-6">{t("signin.subtitle")}</p>
        {/* <div className="flex flex-col lg:flex-row min-h-[80vh] lg:min-h-[620px]"> */}
            {/* <div className="hidden lg:flex lg:w-5/12 xl:w-6/12 bg-gradient-to-br from-emerald-500 to-sky-600 p-6 lg:p-10 xl:p-12 flex-col justify-center relative space-y-6">
              <h1 className="text-4xl font-extrabold text-white leading-tight">
                {t("signin.hero.title")}
              </h1>
              <p className="text-emerald-100 text-lg">
                {t("signin.hero.subtitle")}
              </p>
              <div className="space-y-6">
                <DemoFeature icon={BarChart} title={t("signin.features.track")} description={t("signin.features.trackDesc")} />
                <DemoFeature icon={Users} title={t("signin.features.engage")} description={t("signin.features.engageDesc")} />
                <DemoFeature icon={Star} title={t("signin.features.reward")} description={t("signin.features.rewardDesc")} />
              </div>
            </div>

            <div className="w-full lg:w-7/12 xl:w-6/12 px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-10 md:py-12 lg:py-16 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{t("signin.title")}</h2>
            <p className="text-gray-500 mb-6">{t("signin.subtitle")}</p> */}

            {error && (
              <p className="text-red-600 text-sm mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-center">
                {error}
              </p>
            )}

            {subscriptionMessage && (
              <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-600 rounded-r text-center">
                <AlertCircle className="inline w-4 h-4 mr-2 text-amber-700" />
                <span className="text-amber-800 font-medium">{subscriptionMessage}</span>
                <div className="mt-2 text-xs text-amber-600">
                  {t("signin.redirecting")} <span id="countdown">5</span> s…
                </div>
              </div>
            )}

            {success && (
              <div className="mb-4 text-emerald-600 text-sm p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r text-center">
                <CheckCircle className="inline w-4 h-4 mr-2" /> {t("signin.success")}
                <Confetti
                  recycle={false}
                  numberOfPieces={100}
                  width={450}
                  height={500}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2"
                />
              </div>
            )}

            {/* STEP 1: Password */}
            {step === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <FloatingInput label={t("signin.emailLabel")} name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" Icon={Mail} />
                <FloatingInput
                  label={t("signin.passwordLabel")}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  Icon={Lock}
                  ToggleIcon={showPassword ? EyeOff : Eye}
                  onToggle={() => setShowPassword(!showPassword)}
                />

                <div className="space-y-4 pt-3">
                  <div className="flex items-center justify-between p-1 bg-gray-200 rounded-lg">
                    <canvas ref={canvasRef} width={120} height={40} className="border border-emerald-300 rounded-lg bg-white" />
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="flex items-center gap-2 text-sm bg-blue-500 text-white px-2 py-2 rounded-full hover:bg-blue-600 transition duration-150 shadow-md"
                      aria-label={t("signin.refreshCaptcha")}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <FloatingInput label={t("signin.captchaLabel")} name="captcha" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} Icon={Puzzle} />
                </div>

                <div className="flex justify-end pt-2">
                  <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline transition">
                    {t("signin.forgotPassword")}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-emerald-500 to-sky-600 text-white py-2 text-lg font-semibold rounded-full shadow-lg transition ${loading ? "opacity-70" : "hover:from-emerald-600 hover:to-sky-700"}`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"></path>
                      </svg>
                      {t("signin.loggingIn")}
                    </span>
                  ) : (
                    t("signin.signInButton")
                  )}
                </button>
              </form>
            )}

            {/* STEP 2: Role Selection */}
            {step === "role" && !showShopSelection && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-center text-gray-800">
                  {t("signin.chooseRole")}
                </h3>
                <div className="space-y-5">
                  {roles.map((r, idx) => (
                    <RoleCard
                      key={`${r.role}-${idx}`}
                      roleInfo={r}
                      onClick={() => handleRoleSelect(r)}
                      disabled={loading}
                      isSelected={selectedRoleInfo && selectedRoleInfo.role === r.role && 
                                  (!r._shops || selectedRoleInfo.refId === r.refId)}
                    />
                  ))}
                </div>

                {/* Sign In Button */}
                <button
                  onClick={performLogin}
                  disabled={!selectedRoleInfo || loading}
                  className={`w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-sky-600 text-white py-2 text-lg font-semibold rounded-full shadow-lg transition
                    ${!selectedRoleInfo || loading ? "opacity-70 cursor-not-allowed" : "hover:from-emerald-600 hover:to-sky-700"}
                  `}
                >
                  <LogIn className="w-5 h-5" />
                  {loading ? t("signin.loggingIn") : t("signin.signInButton")}
                </button>

                <button
                  onClick={() => setStep("password")}
                  className="w-full text-sm text-gray-600 hover:text-gray-800 underline flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("signin.backToPassword")}
                </button>
              </div>
            )}

            {showShopSelection && (
              <div className="mt-4 space-y-6"> 
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  {t("signin.chooseShop") || "Select Your Shop"}
                </h3>

                {/* Responsive Grid Layout (Max 3 columns, good width) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center max-w-xl mx-auto">
                  {employeeShops.map((shop) => (
                    <div
                      key={shop.refId}
                      onClick={() => handleRoleSelect(shop)}
                      className={`
                        bg-white border border-gray-300 rounded-lg shadow-lg relative cursor-pointer
                        overflow-hidden // Crucial for the colored top bar
                        transition-all duration-300 ease-in-out w-full

                        ${loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-xl hover:border-emerald-500"}
                        
                        ${selectedRoleInfo && selectedRoleInfo.refId === shop.refId
                          ? "ring-2 ring-emerald-500 border-emerald-500 shadow-2xl" 
                          : ""
                        }
                      `}
                    >

                      <div className="flex flex-col items-center justify-center p-2">
                          
                          {/* Shop Logo Container (Large focus: w-16 h-16) */}
                          <div className="w-20 h-16 flex items-center justify-center bg-white rounded-lg shadow-md">
                            {shop.shopLogoBase64 ? (
                              <img
                                src={`data:image/png;base64,${shop.shopLogoBase64}`}
                                alt={`${shop.displayName} logo`}
                                className="w-full h-full object-contain rounded-lg"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-full h-full rounded-lg bg-emerald-100 flex items-center justify-center">
                                <Store className="w-8 h-8 text-emerald-600" />
                              </div>
                            )}
                          </div>

                          {/* Shop Name (Large, clear, and allowed to wrap) */}
                          <h4 className="text-md font-bold text-gray-800 text-center leading-snug break-words mt-1"> 
                              {shop.displayName}
                          </h4>
                      </div>
                      
                      {/* Selected Checkmark (Prominent on the main card body) */}
                      {selectedRoleInfo && selectedRoleInfo.refId === shop.refId && (
                        <div className="absolute top-1 right-1 bg-emerald-600 rounded-full p-1 shadow-xl border-1 border-white">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Sign In Button */}
                <button
                  onClick={performLogin}
                  disabled={!selectedRoleInfo || loading}
                  className={`w-full max-w-sm mx-auto flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-sky-600 text-white py-2 text-xl font-bold rounded-full shadow-xl transition
                    ${!selectedRoleInfo || loading 
                      ? "opacity-70 cursor-not-allowed" 
                      : "hover:from-emerald-600 hover:to-sky-700 hover:shadow-2xl transform hover:-translate-y-0.5"
                    }`}
                >
                  <LogIn className="w-5 h-5" />
                  {loading ? t("signin.loggingIn") : t("signin.signInButton")}
                </button>

                {/* Back Button */}
                <button
                  onClick={() => {
                    setShowShopSelection(false);
                    setEmployeeShops([]);
                    setSelectedRoleInfo(null);
                  }}
                  className="w-full max-w-sm mx-auto text-center text-gray-600 hover:text-gray-800 underline flex items-center justify-center gap-2 mt-4"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t("signin.back") || "Back to Roles"}
                </button>
              </div>
            )}
          {/* </div> */}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Signin;