import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Confetti from "react-confetti";
import { Eye, EyeOff, Lock, Mail, RefreshCw } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      generateCaptcha();
    }, 100);
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
      ctx.fillStyle = "#059669"; // Emerald Green
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.captchaInput.trim() !== captchaText) {
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
      if (!res.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      const token = data.token;
      const decoded = jwtDecode(token);
      const role = decoded.role;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("role", role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("CompanyEmail", data.companyEmail);

      setSuccess(true);

      setTimeout(() => {
        if (role === "SHOPKEEPER") {
          navigate("/shopkeeper/dashboard");
        } else if (role === "USER") {
          navigate("/user/dashboard");
        } else {
          setError("Unrecognized role.");
        }
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0001_1px,transparent_1px),linear-gradient(to_bottom,#0001_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {success && <Confetti recycle={false} numberOfPieces={250} />}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/70 border border-green-200 shadow-2xl p-10 rounded-3xl animate-fade-in">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6">
          Sign In
        </h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm mb-4 text-center animate-bounce">
            ✅ Signed in successfully!
          </p>
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

          {/* Captcha box */}
          <div className="flex items-center justify-between border border-emerald-200 rounded-lg p-2 bg-white shadow-sm">
            <canvas
              ref={canvasRef}
              width={110}
              height={40}
              className="border border-gray-200 rounded-md"
            />
            <button
              type="button"
              onClick={generateCaptcha}
              className="flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md hover:bg-blue-100 transition"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>

          <FloatingInput
            label="Enter Captcha"
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
          />

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-sky-600 hover:underline hover:text-sky-700"
            >
              Forgot Password?
            </button>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-2 text-lg rounded-xl shadow-lg transition duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:from-emerald-700 hover:to-blue-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-yellow-400"
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

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

function FloatingInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
  return (
    <div className="relative border border-emerald-300 rounded-xl px-3 pt-4 pb-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 transition hover:shadow-md">
      <label
        htmlFor={name}
        className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-emerald-600"
      >
        {label}
      </label>
      {Icon && <Icon className="absolute left-3 top-3.5 h-5 w-5 text-emerald-400" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="w-full h-5 px-8 py-2 text-base text-gray-800 bg-transparent focus:outline-none"
        required
      />
      {ToggleIcon && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-3 text-gray-600 hover:text-emerald-600"
        >
          <ToggleIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export default Signin;
