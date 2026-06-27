import React, { useState } from "react";
import { Mail, Lock, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from '../../apiConfig';

const ForgotPassword = () => {
  const { t } = useTranslation();                    
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
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
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
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t("forgotPassword.title")}
          </h2>
          <p className="text-zinc-500 text-xs font-medium mt-1.5 max-w-xs mx-auto leading-relaxed">
            {t("forgotPassword.subtitle")}
          </p>
        </div>

        {/* Dynamic Context Notification Panels */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-800 p-3.5 rounded-xl text-xs font-bold flex items-start gap-2.5 mb-6 shadow-sm">
            <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="block uppercase tracking-wider text-[10px] text-rose-400">Security Warning</span>
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        )}

        {message && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3.5 rounded-xl text-xs font-bold flex items-start gap-2.5 mb-6 shadow-sm">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="block uppercase tracking-wider text-[10px] text-emerald-400">Pipeline Success</span>
              <p className="font-semibold">{message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Structural Input Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-wider text-zinc-400">
              {t("forgotPassword.placeholder.email")}
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4 w-4 text-zinc-400 pointer-events-none" />
              <input
                type="email"
                name="email"
                placeholder="identity@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-md outline-none text-sm font-medium transition-all text-zinc-900 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 shadow-sm placeholder:text-zinc-400 disabled:opacity-50"
                required
                disabled={loading || !!message}
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
                  <span>{t("forgotPassword.button.sending")}</span>
                </>
              ) : (
                <span>{t("forgotPassword.button.sendLink")}</span>
              )}
            </button>
          </div>
        </form>

        {/* Global Footer Return Navigation Links */}
        <div className="text-center mt-6 pt-5 border-t border-zinc-100">
          <button
            onClick={() => navigate("/signin")}
            className="inline-flex items-center justify-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 font-bold transition-colors"
          >
            <ArrowLeft size={14} className="text-zinc-400" />
            <span>{t("forgotPassword.footer.returnToSignIn")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;