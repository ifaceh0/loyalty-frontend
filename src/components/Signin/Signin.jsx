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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

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

      const token = data.token;
      const decoded = jwtDecode(token);
      const role = decoded.role;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("role", role);

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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      {success && <Confetti recycle={false} numberOfPieces={250} />}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/60 border border-purple-200 shadow-2xl p-10 rounded-3xl animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center animate-bounce">✅ Signed in successfully!</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingInput label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" Icon={Mail} />

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

          <div className="flex items-center gap-4">
            <canvas ref={canvasRef} width={110} height={40} className="border border-gray-300 rounded-md shadow-sm" />
            <button
              type="button"
              onClick={generateCaptcha}
              className="flex items-center gap-2 text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md hover:bg-blue-200 transition"
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
              className="text-sm text-blue-500 hover:underline hover:text-blue-600"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-600 text-white py-2 text-lg rounded-xl shadow-lg transition duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"></path>
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
    <div className="relative border border-purple-300 rounded-xl px-3 pt-4 pb-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition">
      <label
        htmlFor={name}
        className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-purple-600"
      >
        {label}
      </label>
      {Icon && <Icon className="absolute left-3 top-3.5 h-5 w-5 text-purple-400" />}
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
          className="absolute right-3 top-3 text-gray-600 hover:text-purple-600"
        >
          <ToggleIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export default Signin;
