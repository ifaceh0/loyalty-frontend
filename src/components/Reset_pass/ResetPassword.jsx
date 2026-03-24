import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, RefreshCw, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from '../../apiConfig';

const ResetPassword = () => {
  const { t } = useTranslation();
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
      setError(t("resetPassword.error.invalidLink"));
    }

    generateCaptcha();
  }, [searchParams, t]);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const text = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    setCaptchaText(text);
    setCaptchaInput("");

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.fillStyle = '#f9fafb'; 
      ctx.fillRect(0, 0, 140, 40);
      
      ctx.font = "bold 24px 'Inter', sans-serif";
      ctx.fillStyle = "#747275";
      ctx.textAlign = 'center';
      
      for(let i=0; i<3; i++) {
        ctx.strokeStyle = `rgba(150, 149, 149, 0.6)`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * 140, Math.random() * 40);
        ctx.lineTo(Math.random() * 140, Math.random() * 40);
        ctx.stroke();
      }
      
      ctx.fillText(text, 70, 28);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword.length < 8) {
      setError(t("resetPassword.error.passwordTooShort"));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("resetPassword.error.passwordsDontMatch"));
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
      setError(t("resetPassword.error.invalidCaptcha"));
      generateCaptcha();
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword, resetToken: token }),
      });

      const data = await res.text();
      
      if (!res.ok) {
        try {
            const errorJson = JSON.parse(data);
            throw new Error(errorJson.message || t("resetPassword.error.resetFailed"));
        } catch (jsonErr) {
            throw new Error(data || t("resetPassword.error.resetFailed"));
        }
      }

      setMessage(t("resetPassword.success.message"));
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.message);
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Card: Clean white, sharply rounded, strong shadow */}
      <div className="w-full max-w-md sm:max-w-md bg-white rounded-xl p-8 shadow-sm border border-slate-200">
        
        <div className="text-center mb-8">
            <Lock className="h-10 w-10 text-blue-700 mx-auto mb-2" />
            <h2 className="text-3xl font-extrabold text-gray-800">
                {t("resetPassword.title")}
            </h2>
            <p className="text-gray-500 mt-2 text-base">
                {t("resetPassword.subtitle")}
            </p>
            {email && (
                <p className="text-xs text-gray-400 mt-2 truncate">
                    {t("resetPassword.account")}: {email}
                </p>
            )}
        </div>

        {/* Status Messages - Clean, bordered alerts */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-lg text-sm mb-6 font-medium shadow-sm">
            {error}
          </div>
        )}
        
        {message && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-3 rounded-lg text-sm mb-6 font-medium shadow-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* New Password Input */}
          <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder={t("resetPassword.placeholder.newPassword")}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-12 px-4 py-2 text-base text-gray-900 bg-gray-100 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 placeholder:text-gray-500"
                required
                disabled={loading}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
                disabled={loading}
            >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("resetPassword.placeholder.confirmPassword")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 py-2 text-base text-gray-900 bg-gray-100 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 placeholder:text-gray-500"
                required
                disabled={loading}
            />
            <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
                disabled={loading}
            >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* CAPTCHA Section */}
          <div className="flex flex-col items-start w-full pt-2">
            <label className="text-sm font-medium text-gray-700 mb-2">{t("resetPassword.captcha.label")}</label>
            <div className="flex items-center justify-between w-full gap-4">
                <canvas 
                    ref={canvasRef} 
                    width={140} 
                    height={40} 
                    className="select-none rounded-lg border border-gray-300 shadow-inner bg-gray-50" 
                />
                <button
                    type="button"
                    onClick={generateCaptcha}
                    className="flex-shrink-0 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors disabled:opacity-50"
                    disabled={loading}
                >
                    <RefreshCw className="h-4 w-4" /> {t("resetPassword.captcha.refresh")}
                </button>
            </div>
          </div>
          
          {/* CAPTCHA Input */}
          <div className="relative">
            <input
                type="text"
                placeholder={t("resetPassword.placeholder.captcha")}
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="w-full h-12 px-4 py-2 text-base text-gray-900 bg-gray-100 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 placeholder:text-gray-500"
                required
                disabled={loading}
            />
          </div>

          {/* Submit Button (Deep Plum Accent) */}
          <button
            type="submit"
            disabled={loading || !!message}
            className={`w-full flex justify-center items-center gap-3 py-2 text-md rounded-full font-bold text-white transition-all duration-300 shadow-md ${
              loading || !!message
                ? "bg-blue-400 cursor-not-allowed opacity-80"
                : "bg-blue-700 hover:bg-blue-800 active:scale-[0.99] transform"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 11-8 8z"></path>
                </svg>
                {t("resetPassword.button.updating")}
              </>
            ) : (
              t("resetPassword.button.reset")
            )}
          </button>
        </form>
        
        {/* Return Link */}
        <div className="text-center mt-6 text-sm">
            <button onClick={() => navigate("/signin")} className="text-blue-600 hover:text-blue-700 font-semibold transition duration-200 hover:underline">
                {t("resetPassword.footer.returnToSignIn")}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;