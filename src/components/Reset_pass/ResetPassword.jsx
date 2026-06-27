import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, RefreshCw, Lock, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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
      ctx.fillStyle = '#f4f4f5'; 
      ctx.fillRect(0, 0, 140, 42);
      
      ctx.font = "bold 22px monospace";
      ctx.fillStyle = "#18181b";
      ctx.textAlign = 'center';
      
      for(let i=0; i<4; i++) {
        ctx.strokeStyle = `rgba(161, 161, 170, 0.5)`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * 140, Math.random() * 42);
        ctx.lineTo(Math.random() * 140, Math.random() * 42);
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
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Structural Minimal Background Blur Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Presentation Form Card */}
      <div className="w-full max-w-md bg-white rounded-xl p-6 sm:p-10 border border-zinc-200 shadow-sm relative z-10">
        
        {/* Module Header Area */}
        <div className="text-center mb-8">
          <div className="w-11 h-11 bg-zinc-50 rounded-md flex items-center justify-center text-zinc-800 border border-zinc-200/80 mx-auto mb-4 shadow-inner">
            <Lock className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
            {t("resetPassword.title")}
          </h2>
          <p className="text-zinc-500 text-xs font-medium mt-1.5 max-w-xs mx-auto leading-relaxed">
            {t("resetPassword.subtitle")}
          </p>
          {email && (
            <span className="inline-block font-mono text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-md mt-3 max-w-full truncate">
              {t("resetPassword.account")}: {email}
            </span>
          )}
        </div>

        {/* Dynamic Context Notification Panels */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-800 p-3.5 rounded-md text-xs font-bold flex items-start gap-2.5 mb-6 shadow-sm">
            <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="block uppercase tracking-wider text-[10px] text-rose-400">Security Warning</span>
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        )}
        
        {message && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3.5 rounded-md text-xs font-bold flex items-start gap-2.5 mb-6 shadow-sm">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="block uppercase tracking-wider text-[10px] text-emerald-400">Pipeline Success</span>
              <p className="font-semibold">{message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* New Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-wider text-zinc-400">
              {t("resetPassword.placeholder.newPassword")}
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-md outline-none text-sm font-medium transition-all text-zinc-900 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 shadow-sm placeholder:text-zinc-400 disabled:opacity-50"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-zinc-400 hover:text-zinc-700 transition"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-wider text-zinc-400">
              {t("resetPassword.placeholder.confirmPassword")}
            </label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-md outline-none text-sm font-medium transition-all text-zinc-900 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 shadow-sm placeholder:text-zinc-400 disabled:opacity-50"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 text-zinc-400 hover:text-zinc-700 transition"
                disabled={loading}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* CAPTCHA Core Segment */}
          <div className="p-4 bg-zinc-50/50 border border-zinc-200/60 rounded-md flex flex-col gap-3.5 shadow-inner">
            <div className="flex items-center justify-between w-full gap-4">
              <div className="relative select-none">
                <canvas 
                  ref={canvasRef} 
                  width={140} 
                  height={42} 
                  className="rounded-md border border-zinc-200 bg-white" 
                />
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-2 rounded-full transition-colors disabled:opacity-50"
                disabled={loading}
              >
                <RefreshCw className="h-3.5 w-3.5" /> 
                <span>{t("resetPassword.captcha.refresh")}</span>
              </button>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                placeholder={t("resetPassword.placeholder.captcha")}
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-md outline-none font-bold text-sm tracking-wide text-zinc-900 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 shadow-sm placeholder:text-zinc-400"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Operational Button Trigger */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !!message}
              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2 font-bold text-sm text-white rounded-full transition-all shadow-sm active:scale-98
                ${loading || !!message
                  ? "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                  : "bg-zinc-900 hover:bg-zinc-800"
                }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span>{t("resetPassword.button.updating")}</span>
                </>
              ) : (
                <span>{t("resetPassword.button.reset")}</span>
              )}
            </button>
          </div>
        </form>
        
        {/* Global Footer Return Navigation Link */}
        <div className="text-center mt-6 pt-5 border-t border-zinc-100">
          <button 
            onClick={() => navigate("/signin")} 
            className="inline-flex items-center justify-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 font-bold transition-colors"
          >
            <ArrowLeft size={14} className="text-zinc-400" />
            <span>{t("resetPassword.footer.returnToSignIn")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;