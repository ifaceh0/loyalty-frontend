import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, RefreshCw } from "lucide-react";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    const queryEmail = searchParams.get("email");
    const queryToken = searchParams.get("token");

    if (queryEmail && queryToken) {
      setEmail(queryEmail);
      setToken(queryToken);
    } else {
      setError("Invalid or missing reset link parameters.");
    }

    generateCaptcha();
  }, [searchParams]);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const text = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    setCaptchaText(text);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 100, 40);
      ctx.font = "22px Arial";
      ctx.fillStyle = "#4A90E2";
      ctx.fillText(text, 10, 28);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
      setError("Invalid CAPTCHA. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword, resetToken: token }),
      });

      const data = await res.text();

      if (!res.ok) throw new Error(data || "Password reset failed");

      setMessage("✅ Password reset successful! Redirecting to sign in...");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-purple-200 rounded-3xl p-10 shadow-2xl animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Reset Your Password
        </h2>
        {/* <p className="text-center text-gray-600 mb-4">Enter your new password below</p> */}

        {error && <p className="text-red-500 text-sm text-center mb-4 animate-pulse">⚠️ {error}</p>}
        {message && <p className="text-green-600 text-sm text-center mb-4 animate-fade-in">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div className="relative border border-purple-300 rounded-xl px-3 pt-4 pb-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-purple-600">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-5 px-2 py-2 text-base text-gray-800 bg-transparent focus:outline-none"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-600 hover:text-purple-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative border border-purple-300 rounded-xl px-3 pt-4 pb-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-purple-600">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-5 px-2 py-2 text-base text-gray-800 bg-transparent focus:outline-none"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-600 hover:text-purple-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* CAPTCHA */}
          <div className="flex items-center justify-between bg-gray-100 border border-gray-300 px-4 py-1 rounded-xl">
            <canvas ref={canvasRef} width={100} height={40} className="select-none" />
            <button
              type="button"
              onClick={generateCaptcha}
              className="text-sm text-blue-500 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter CAPTCHA"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="w-full px-4 py-3 border border-purple-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-purple-300 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 11-8 8z" />
              </svg>
            )}
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
