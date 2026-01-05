// import React, { useState } from "react";
// import { Mail, Lock } from "lucide-react";
// import { useNavigate } from "react-router-dom"; 

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setLoading(true);

//     try {
//       const res = await fetch("https://loyalty-backend-java.onrender.com/api/auth/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const text = await res.text();
//       if (!res.ok) {
//         try {
//             const errorJson = JSON.parse(text);
//             throw new Error(errorJson.message || "Something went wrong.");
//         } catch (jsonErr) {
//             throw new Error(text || "Something went wrong.");
//         }
//       }
//       setMessage("Success! Check your inbox for the reset link.");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div 
//       className="min-h-screen flex items-center justify-center px-4 bg-gray-50"
//       style={{
//         backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)',
//         backgroundSize: '20px 20px',
//       }}
//     >
//       {/* Card: Clean white, sharply rounded, strong shadow */}
//       <div className="w-full max-w-md bg-white rounded p-6 shadow-2xl border border-gray-200">
        
//         <div className="text-center mb-8">
//             <Lock className="h-10 w-10 text-purple-700 mx-auto mb-2 transform rotate-45" />
//             <h2 className="text-3xl font-extrabold text-gray-800">
//                 Trouble Logging In?
//             </h2>
//             <p className="text-gray-500 mt-2 text-base">
//                 Enter your email and we'll send you a recovery link.
//             </p>
//         </div>

//         {/* Status Messages - Clean, bordered alerts matching ResetPassword */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm mb-6 font-medium shadow-sm">
//             ⚠️ {error}
//           </div>
//         )}
        
//         {message && (
//           <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-3 rounded text-sm mb-6 font-medium shadow-sm">
//             ✅ {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
          
//           {/* Email Input: Defined input with purple focus ring */}
//           <div className="relative">
//             <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full h-12 px-4 py-2 text-base text-gray-900 bg-gray-100 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 placeholder:text-gray-500"
//                 required
//                 disabled={loading || !!message}
//             />
//             <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
//           </div>

//           {/* Submit Button (Deep Plum Accent) */}
//           <button
//             type="submit"
//             disabled={loading || !!message}
//             className={`w-full flex justify-center items-center gap-3 py-2 text-lg rounded font-bold text-white transition-all duration-300 shadow-md ${
//               loading || !!message
//                 ? "bg-purple-400 cursor-not-allowed opacity-80"
//                 : "bg-purple-700 hover:bg-purple-800 shadow-purple-500/50 active:scale-[0.99] transform"
//             }`}
//           >
//             {loading ? (
//               <>
//                 <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" >
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 11-8 8z"></path>
//                 </svg>
//                 Sending Request...
//               </>
//             ) : (
//               "Send Reset Link"
//             )}
//           </button>
//         </form>
        
//         {/* Footer Link */}
//         <div className="text-center mt-6 text-sm">
//             <button onClick={() => navigate("/signin")} className="text-purple-600 hover:text-purple-700 font-semibold transition duration-200 hover:underline">
//                 Return to Sign In
//             </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;






//translated code
import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";   // Import this!

const ForgotPassword = () => {
  const { t } = useTranslation();                     // This gives you the t() function
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const text = await res.text();
      if (!res.ok) {
        try {
          const errorJson = JSON.parse(text);
          throw new Error(errorJson.message || t("forgotPassword.error.somethingWentWrong"));
        } catch (jsonErr) {
          throw new Error(text || t("forgotPassword.error.somethingWentWrong"));
        }
      }
      setMessage(t("forgotPassword.success.checkInbox"));
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-gray-50"
      style={{
        backgroundImage:
          'linear-gradient(0deg, rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)',
        backgroundSize: "20px 20px",
      }}
    >
      {/* Card: Clean white, sharply rounded, strong shadow */}
      <div className="w-full max-w-lg bg-white rounded p-6 shadow-2xl border border-gray-200">
        <div className="text-center mb-8">
          <Lock className="h-10 w-10 text-purple-700 mx-auto mb-2 transform rotate-45" />
          <h2 className="text-3xl font-extrabold text-gray-800">
            {t("forgotPassword.title")}
          </h2>
          <p className="text-gray-500 mt-2 text-base">{t("forgotPassword.subtitle")}</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm mb-6 font-medium shadow-sm">
            Warning: {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-3 rounded text-sm mb-6 font-medium shadow-sm">
            Success: {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder={t("forgotPassword.placeholder.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 py-2 text-base text-gray-900 bg-gray-100 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 placeholder:text-gray-500"
              required
              disabled={loading || !!message}
            />
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !!message}
            className={`w-full flex justify-center items-center gap-3 py-2 text-lg rounded font-bold text-white transition-all duration-300 shadow-md ${
              loading || !!message
                ? "bg-purple-400 cursor-not-allowed opacity-80"
                : "bg-purple-700 hover:bg-purple-800 shadow-purple-500/50 active:scale-[0.99] transform"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 11-8 8z"></path>
                </svg>
                {t("forgotPassword.button.sending")}
              </>
            ) : (
              t("forgotPassword.button.sendLink")
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 text-sm">
          <button
            onClick={() => navigate("/signin")}
            className="text-purple-600 hover:text-purple-700 font-semibold transition duration-200 hover:underline"
          >
            {t("forgotPassword.footer.returnToSignIn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;