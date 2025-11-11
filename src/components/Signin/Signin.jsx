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
//   ShieldCheck
// } from "lucide-react";

// function FloatingInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
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
//   const [subscriptionMessage, setSubscriptionMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // Countdown for subscription redirect
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
//       ctx.font = "bold 22px Arial";
//       ctx.fillStyle = "#059669";

//       ctx.save();
//       ctx.translate(10, 28);
//       ctx.rotate(-0.03 * Math.PI + Math.random() * 0.1 - 0.03);
//       ctx.fillText(text, 0, 0);
//       ctx.restore();

//       ctx.strokeStyle = "#34D399";
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
//     setSubscriptionMessage(null);
//     setSuccess(false);

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
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (data.error && data.error.includes("subscription") && data.error.includes("Loyalty")) {
//         localStorage.clear();
//         sessionStorage.clear();

//         setSubscriptionMessage(
//           "Your subscription does not include the Loyalty application. Please upgrade to continue."
//         );

//         setTimeout(() => {
//           window.location.href = "https://subscription-frontend-psi.vercel.app/subscription";
//         }, 5000);
//         return;
//       }

//       if (!res.ok) {
//         throw new Error(data.message || data.error || "Login failed. Please check your credentials.");
//       }

//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("id", String(data.id));
//       localStorage.setItem("name", data.name ?? "");
//       localStorage.setItem("CompanyEmail", data.companyEmail ?? "");
//       localStorage.setItem("role", data.role ?? "");

//       setSuccess(true);

//       setTimeout(() => {
//         if (data.role === "SHOPKEEPER") {
//           navigate("/shopkeeper/dashboard");
//         } else if (data.role === "USER") {
//           navigate("/user/dashboard");
//         } else if (data.role === "EMPLOYEE") {
//           navigate("/shopkeeper/customer-lookup");
//         } else {
//           setError("Unrecognized role");
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
//     <div 
//       className="min-h-screen flex items-center p-8 justify-center px-4 bg-gray-50"
//       style={{
//         backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)',
//         backgroundSize: '20px 20px',
//       }}
//     >

//     {/* // <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8"> */}
//       <div className="relative z-10 w-full max-w-5xl flex bg-white shadow-xl rounded-lg overflow-hidden animate-fade-in-up">
//         <div className="w-full lg:w-6/12 p-8 md:p-12 flex flex-col justify-center">
//           <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
//             Sign In to Your Account
//           </h2>
//           <p className="text-gray-500 mb-8">
//             Enter your credentials to access the loyalty platform.
//           </p>

//           {error && (
//             <p className="text-red-600 text-sm mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-center">
//               {error}
//             </p>
//           )}

//           {subscriptionMessage && (
//             <div className="relative mb-4 p-3 bg-amber-50 border-l-4 border-amber-600 rounded-r text-center animate-pulse">
//               <AlertCircle className="inline w-4 h-4 mr-2 text-amber-700" />
//               <span className="text-amber-800 font-medium">{subscriptionMessage}</span>
//               <div className="mt-2 text-xs text-amber-600">
//                 Redirecting to subscription page in <span id="countdown">5</span> s…
//               </div>
//             </div>
//           )}

//           {success && (
//             <div className="relative mb-4">
//               <p className="text-emerald-600 text-sm p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r text-center animate-pulse">
//                 <CheckCircle className="inline w-4 h-4 mr-2" /> Signed in successfully!
//               </p>
//               <Confetti
//                 recycle={false}
//                 numberOfPieces={100}
//                 width={450}
//                 height={500}
//                 className="absolute top-0 left-1/2 transform -translate-x-1/2"
//               />
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
//                 Icon={Puzzle}
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
//                 loading
//                   ? "opacity-70 cursor-not-allowed"
//                   : "hover:from-emerald-700 hover:to-blue-700 shadow-emerald-500/50"
//               }`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
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
  ShieldCheck,
  User,
  Store,
  Users as UsersIcon,
} from "lucide-react";

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
  <div className="flex items-start space-x-4 p-4 rounded-md bg-white/10 backdrop-blur-sm border border-white/20">
    <div className="flex-shrink-0 p-3 bg-emerald-400 rounded-full text-white shadow-lg">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="text-xl font-bold text-white">{title}</h4>
      <p className="text-gray-100 mt-1 text-sm">{description}</p>
    </div>
  </div>
);

const RoleCard = ({ role, displayName, onClick, disabled }) => {
  const icons = {
    USER: User,
    SHOPKEEPER: Store,
    EMPLOYEE: UsersIcon,
  };
  const Icon = icons[role] || ShieldCheck;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-5 rounded-md border-2 transition-all duration-200 text-left
        ${disabled
          ? "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60"
          : "bg-emerald-50 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-500 hover:shadow-lg"
        }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500 rounded-full text-white">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {role === "USER"
                ? "Customer"
                : role === "SHOPKEEPER"
                ? "Shop Owner"
                : "Shop Employee"}
            </h3>
            <p className="text-sm text-gray-600">{displayName}</p>
          </div>
        </div>
        {!disabled && <div className="text-emerald-600">Select</div>}
      </div>
    </button>
  );
};

const Signin = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [step, setStep] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [roles, setRoles] = useState([]);
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

  // Step 1 – email + password + captcha
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubscriptionMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaText) {
      setError("Invalid CAPTCHA");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://loyalty-backend-java.onrender.com/api/auth/signIn/step1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (
          data.error?.includes("subscription") &&
          data.error?.includes("Loyalty")
        ) {
          setSubscriptionMessage(
            "Your subscription does not include the Loyalty app. Redirecting..."
          );
          setTimeout(() => {
            window.location.href =
              "https://subscription-frontend-psi.vercel.app/subscription";
          }, 5000);
          return;
        }
        throw new Error(data.message || data.error || "Invalid credentials");
      }

      // Single role or complete response → auto-login
      if (data.role || (data.roles && data.roles.length === 1)) {
        finishLogin(data);
        return;
      }

      // Multiple roles → show selector
      if (data.roles && data.roles.length > 1) {
        setRoles(data.roles);
        setStep("role");
      } else {
        setError("No valid roles found");
      }
    } catch (err) {
      setError(err.message);
      generateCaptcha();
      setCaptchaInput("");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 – user picks a role
  const handleRoleSelect = async (role) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://loyalty-backend-java.onrender.com/api/auth/signIn/step2",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      finishLogin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Final login – store data & redirect
  const finishLogin = (data) => {
    // Extract fields, handle single-role case
    const loginRole = data.role || (data.roles && data.roles.length === 1 ? data.roles[0].role : null);
    const loginId = data.id || (data.roles && data.roles.length === 1 ? data.roles[0].refId : null);
    const loginName = data.name || (data.roles && data.roles.length === 1 ? data.roles[0].displayName : null);

    if (!loginRole) {
      setError("No valid role provided");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("id", String(loginId || ""));
    localStorage.setItem("name", loginName || "");
    localStorage.setItem("companyEmail", data.companyEmail || "");
    localStorage.setItem("role", loginRole || "");

    setSuccess(true);

    setTimeout(() => {
      if (loginRole === "SHOPKEEPER") {
        navigate("/shopkeeper/dashboard");
      } else if (loginRole === "USER") {
        navigate("/user/dashboard");
      } else if (loginRole === "EMPLOYEE") {
        navigate("/shopkeeper/customer-lookup");
      } else {
        setError("Unknown role: " + loginRole);
      }
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex items-center p-8 justify-center px-4 bg-gray-200"
      // style={{
      //   backgroundImage:
      //     "linear-gradient(0deg, rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)",
      //   backgroundSize: "20px 20px",
      // }}
    >
      <div className="w-full max-w-5xl flex bg-white shadow-xl border border-gray-200 rounded-md overflow-hidden animate-fade-in-up">
        {/* left side */}
        <div className="hidden lg:flex w-6/12 bg-gradient-to-br from-emerald-500 to-sky-600 p-8 flex-col justify-center relative">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff3_1px,transparent_1px),linear-gradient(to_bottom,#fff3_1px,transparent_1px)] bg-[size:30px_30px]"></div>

          <h1 className="text-4xl font-extrabold text-white leading-tight">
            Fuel Loyalty. Drive Growth.
          </h1>
          <p className="text-emerald-100 text-lg">
            The simplest way for small businesses to launch, manage, and scale
            their customer reward programs.
          </p>

          <div className="space-y-3">
            <DemoFeature
              icon={BarChart}
              title="Track Your Success"
              description="Get clear metrics on customer engagement."
            />
            <DemoFeature
              icon={Users}
              title="Engage Every Customer"
              description="Seamless experience for all users."
            />
            <DemoFeature
              icon={Star}
              title="Reward Loyalty Easily"
              description="Simple point system designed to bring customers back, time and again."
            />
          </div>
        </div>

        {/* right Side - Form */}
        <div className="w-full lg:w-6/12 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Sign In</h2>
          <p className="text-gray-500 mb-6">
            Enter your credentials to access the platform.
          </p>

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
                Redirecting to subscription page in <span id="countdown">5</span> s…
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 text-emerald-600 text-sm p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r text-center">
              <CheckCircle className="inline w-4 h-4 mr-2" /> Signed in Successfully!
              <Confetti
                recycle={false}
                numberOfPieces={100}
                width={450}
                height={500}
                className="absolute top-0 left-1/2 transform -translate-x-1/2"
              />
            </div>
          )}

          {/* ---- STEP 1: PASSWORD ---- */}
          {step === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <FloatingInput
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                Icon={Mail}
              />
              <FloatingInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                Icon={Lock}
                ToggleIcon={showPassword ? EyeOff : Eye}
                onToggle={() => setShowPassword(!showPassword)}
              />

              <div className="space-y-4 pt-3">
                <div className="flex items-center justify-between p-1 bg-gray-200 rounded-md">
                  <canvas
                    ref={canvasRef}
                    width={120}
                    height={40}
                    className="border border-emerald-300 rounded-md bg-white"
                  />
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="flex items-center gap-2 text-sm bg-blue-500 text-white px-2 py-2 rounded-full hover:bg-blue-600 transition duration-150 shadow-md"
                    aria-label="Refresh CAPTCHA"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <FloatingInput
                  label="Enter CAPTCHA"
                  name="captcha"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
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
                className={`w-full bg-gradient-to-r from-emerald-500 to-sky-600 text-white py-2 text-lg font-semibold rounded-md shadow-lg transition ${
                  loading ? "opacity-70" : "hover:from-emerald-600 hover:to-sky-700"
                }`}
              >
                {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                  Logging in...
                </span>
              ) : (
                "Sign In"
              )}
              </button>
            </form>
          )}

          {/* ---- STEP 2: ROLE SELECTOR ---- */}
          {step === "role" && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">
                Choose how you want to sign in:
              </h3>
              <div className="space-y-3">
                {roles.map((r) => (
                  <RoleCard
                    key={r.role}
                    role={r.role}
                    displayName={r.displayName}
                    onClick={() => handleRoleSelect(r.role)}
                    disabled={loading}
                  />
                ))}
              </div>
              <button
                onClick={() => setStep("password")}
                className="w-full text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Back to password
              </button>
            </div>
          )}
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