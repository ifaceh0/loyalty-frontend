// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signin = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     captcha: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [captchaText] = useState(() => {
//     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//     return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     // Validate captcha
//     if (formData.captcha !== captchaText) {
//       setError("Invalid captcha. Please try again.");
//       setLoading(false);
//       return;
//     }

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
//         throw new Error(data.message || "Login failed");
//       }

//       // Save login status
//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("id", data.id);     
//       localStorage.setItem("userType", data.userType || "");
//       localStorage.setItem("role", data.role || "");

//       // Redirect based on userType
//       if (data.userType === "shopkeeper") {
//         navigate("/shopkeeper/dashboard");
//       } else {
//         navigate("/user/dashboard");
//       }

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign In</h2>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
//             required
//           />

//           {/* Captcha Display */}
//           <div className="flex items-center justify-between bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg">
//             <span className="text-lg font-semibold tracking-widest text-gray-600 select-none">
//               {captchaText}
//             </span>
//             <button
//               type="button"
//               onClick={() => window.location.reload()}
//               className="text-sm text-blue-500 hover:underline"
//             >
//               Refresh
//             </button>
//           </div>

//           {/* Captcha Input */}
//           <input
//             type="text"
//             name="captcha"
//             placeholder="Enter Captcha"
//             value={formData.captcha}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
//             required
//           />

//           <div className="text-right">
//             <button
//               type="button"
//               onClick={() => navigate("/forgot-password")}
//               className="text-sm text-blue-500 hover:underline"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex justify-center items-center bg-blue-500 text-white py-2 rounded-lg transition duration-200 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600"}`}
//           >
//             {loading ? (
//               <span className="flex items-center gap-2">
//                 <svg
//                   className="animate-spin h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
//                   ></path>
//                 </svg>
//                 Logging in...
//               </span>
//             ) : (
//               "Sign In"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signin;


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    generateCaptcha();
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
      ctx.font = "22px Arial";
      ctx.fillStyle = "#4A90E2";
      ctx.fillText(text, 10, 28);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
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
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("userType", data.userType || "");
      localStorage.setItem("role", data.role || "");

      setSuccess(true);

      setTimeout(() => {
        if (data.userType === "shopkeeper") {
          navigate("/shopkeeper/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4 relative">
      {success && <Confetti recycle={false} numberOfPieces={250} />}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center animate-pulse">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center animate-bounce">✅ Sign in successful!</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input peer w-80" required />
            <label className="floating-label">Email Address</label>
          </div>

          <div className="relative">
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input peer w-80" required />
            <label className="floating-label">Password</label>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <canvas ref={canvasRef} width={100} height={40} className="border border-gray-300 rounded" />
            <button type="button" onClick={generateCaptcha} className="text-sm text-blue-500 hover:underline">Refresh Captcha</button>
          </div>

          <div className="relative">
            <input type="text" name="captchaInput" value={formData.captchaInput} onChange={handleChange} className="input peer" required />
            <label className="floating-label">Enter Captcha</label>
          </div>

          <div className="text-right">
            <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center bg-purple-600 text-white py-2 rounded-lg transition duration-200 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"></path></svg>
                Signing in...
              </span>
            ) : "Sign In"}
          </button>
        </form>
      </div>

      <style>{`
        .input {
          @apply w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-300;
        }
        .floating-label {
          position: absolute;
          left: 16px;
          top: 10px;
          color: #999;
          pointer-events: none;
          transform: translateY(0);
          transition: all 0.2s ease;
        }
        .peer:focus ~ .floating-label,
        .peer:not(:placeholder-shown) ~ .floating-label {
          top: -10px;
          left: 12px;
          font-size: 0.75rem;
          color: #6B46C1;
          background: white;
          padding: 0 4px;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Signin;
