import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, RefreshCw } from "lucide-react";

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captcha: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captchaText, setCaptchaText] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const text = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    setCaptchaText(text);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.captcha.trim().toUpperCase() !== captchaText.toUpperCase()) {
      setError("Invalid captcha. Please try again.");
      setLoading(false);
      return;
    }

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

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("userType", data.userType || "");
      localStorage.setItem("role", data.role || "");

      if (data.userType === "shopkeeper") {
        navigate("/shopkeeper/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-blue-200 flex items-center justify-center px-4 font-['Inter']">
      <div className="backdrop-blur-xl bg-white/70 shadow-2xl p-8 rounded-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">Sign In</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Welcome back! Please enter your credentials.</p>
        {error && <p className="text-red-500 text-sm text-center mb-4 animate-pulse">⚠️ {error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <FloatingInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} Icon={Mail} />
          <FloatingInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} Icon={Lock} />

          <div className="flex items-center justify-between bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg">
            <span className="text-lg font-semibold tracking-widest text-gray-600 select-none">{captchaText}</span>
            <button type="button" onClick={generateCaptcha} className="text-sm text-blue-500 hover:underline flex items-center gap-1">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
          </div>

          <FloatingInput label="Enter Captcha" name="captcha" value={formData.captcha} onChange={handleChange} />

          <div className="text-right">
            <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center bg-purple-600 text-white py-2 rounded-lg transition duration-200 hover:bg-purple-700 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

function FloatingInput({ label, name, value, onChange, type = "text", Icon }) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder=" "
        className="peer w-full px-10 py-3 bg-white/60 backdrop-blur-md border border-gray-300 rounded-md text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <label
        htmlFor={name}
        className="absolute left-10 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-purple-600 bg-white/70 px-1"
      >
        {label}
      </label>
    </div>
  );
}

export default Signin;