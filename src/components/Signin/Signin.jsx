
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Confetti from "react-confetti";
import { Fullscreen } from "lucide-react";

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

      const token = data.token;
      const decoded = jwtDecode(token);
      const role = decoded.role;

      // Save to localStorage
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4 relative">
      {success && <Confetti recycle={false} numberOfPieces={250} />}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center animate-pulse">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center animate-bounce">✅ Sign in successful!</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input peer w-full h-10 border border-gray-300"
              required
              placeholder=" "
            />
            <label className="floating-label">Email Address</label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input peer w-full h-10 border border-gray-300"
              required
              placeholder=" "
            />
            <label className="floating-label">Password</label>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <canvas ref={canvasRef} width={110} height={40} className="border border-gray-300 rounded" />
            <button type="button" onClick={generateCaptcha} className="text-sm text-blue-500 hover:underline">Refresh Captcha</button>
          </div>

          <div className="relative">
            <input
              type="text"
              name="captchaInput"
              value={formData.captchaInput}
              onChange={handleChange}
              className="input peer w-full h-10 border border-gray-300"
              required
              placeholder=" "
            />
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
          font-size: 1rem;
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
      {/* <style>{`
        .input {
          @apply w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-300;
        }

        .floating-label {
          position: absolute;
          left: 16px;
          top: -10px;
          font-size: 0.875rem;
          color: #6B46C1;
          background: white;
          padding: 0 4px;
          pointer-events: none;
        }    
      `}</style> */}
      
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