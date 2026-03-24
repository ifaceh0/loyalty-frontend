import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import {
  Mail, Lock, Eye, EyeOff, Building2, MapPin, Store,
  RefreshCw, CheckCircle, Smartphone, Globe, User, Puzzle
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { API_BASE_URL } from '../../apiConfig';

// Animation variants
const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const buttonVariants = {
  hover: { scale: 1.03, y: -2 },
  tap: { scale: 0.97 }
};

function FlatInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm sm:text-base font-semibold text-gray-700 ml-1">
        {label}
      </label>
      
      <div className="flex items-center w-full h-11 bg-white border border-slate-200 rounded-lg transition-all duration-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
        {Icon && <Icon className="flex-shrink-0 ml-3 sm:ml-4 h-5 w-5 text-gray-400 transition-colors duration-200 focus-within:text-teal-600" />}

        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="w-full h-full text-base sm:text-lg text-gray-900 bg-transparent px-3 outline-none"
          required
        />
        
        {ToggleIcon && (
          <button 
            type="button" 
            onClick={onToggle} 
            className="flex-shrink-0 mr-3 sm:mr-4 text-gray-500 hover:text-teal-600 transition-colors duration-200"
          >
            <ToggleIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function CountrySelect({ label, name, value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm sm:text-base font-semibold text-gray-700 ml-1">
        {label}
      </label>

      <div className="flex items-center w-full h-11 bg-white border border-slate-200 rounded-lg transition-all duration-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
        <Globe className="flex-shrink-0 ml-3 sm:ml-4 h-5 w-5 text-gray-400" />

        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full text-base sm:text-lg text-gray-900 bg-transparent px-3 outline-none"
          required
        >
          <option value="" disabled>
            {t("userSignup.selectCountry")}
          </option>
          <option value="INDIA">🇮🇳 India</option>
          <option value="USA">🇺🇸 USA</option>
        </select>
      </div>
    </div>
  );
}

function Shopkeeper() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: "", companyName: "", companyEmail: "", companyAddress: "",
    companyPhone: "", email: "", phone: "", password: "",
    confirmPassword: "", captchaInput: "", city: "", country: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [missingFields, setMissingFields] = useState([]);
  const [captchaText, setCaptchaText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const audioRef = useRef(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const captchaCanvasRef = useRef(null);

  useEffect(() => { if (step === 3) generateCaptcha(); }, [step]);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const text = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]).join("");
    setCaptchaText(text);

    const canvas = captchaCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold 22px Arial";
      ctx.fillStyle = "#767779"; 
 
      ctx.save();
      ctx.translate(10, 28);
      ctx.rotate(-0.03 * Math.PI + Math.random() * 0.1 - 0.03);
      ctx.fillText(text, 0, 0);
      ctx.restore();
      
      ctx.strokeStyle = '#767779'; 
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 120, Math.random() * 40);
        ctx.lineTo(Math.random() * 120, Math.random() * 40);
        ctx.stroke();
      }
    }
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const verifyEmail = async () => {
    if (!validateEmail(formData.companyEmail)) {
      setError(t("shopkeeper.error.invalidEmail")); return;
    }
    setIsVerifying(true); setError("");
    const fetchWithBackoff = async (url, options, retries = 3, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, options);
          if (response.status === 429) {
            const retryAfter = response.headers.get("Retry-After") || (delay * Math.pow(2, i));
            await new Promise((res) => setTimeout(res, +retryAfter * 1000));
            continue;
          }
          if (!response.ok) throw new Error(await response.text());
          return response;
        } catch (err) {
          if (i === retries - 1) throw err;
          await new Promise((res) => setTimeout(res, delay * Math.pow(2, i)));
        }
      }
    };
    try {
      const response = await fetchWithBackoff(
        `${API_BASE_URL}/api/auth/verifyShopSubscriptionEmail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.companyEmail }),
        }
      );
      const data = await response.json();
      if (data.message && data.message.includes("successfully")) {
        setIsEmailVerified(true); 
        setError(""); 
      }
      else { 
        setIsEmailVerified(false); 
        setError(data.message || t("shopkeeper.error.verificationFailed")); 
      }
    } catch (err) {
      setIsEmailVerified(false);
      setError(t("shopkeeper.error.noSubscription"));
    } finally { setIsVerifying(false); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "companyEmail") setIsEmailVerified(false);
    if (missingFields.includes(name) && value.trim() !== "")
      setMissingFields((prev) => prev.filter((f) => f !== name));
  };

  const handlePhoneChange = (field) => (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 10) val = val.slice(0, 10);
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword)
      return setError(t("shopkeeper.error.passwordMismatch"));
    if (formData.captchaInput.trim().toUpperCase() !== captchaText.toUpperCase())
      return setError(t("shopkeeper.error.invalidCaptcha"));
    if (formData.phone.length !== 10)
      return setError(t("shopkeeper.error.phone10Digits"));

    setLoading(true); setError(""); setSuccess(false);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/registerShopkeeper`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const contentType = res.headers.get("content-type");
      if (res.ok) {
        setFormData({
          shopName: "", companyName: "", companyEmail: "", companyAddress: "",
          companyPhone: "", email: "", phone: "", password: "",
          confirmPassword: "", captchaInput: "", city: "", country: ""
        });
        setIsEmailVerified(false);
        generateCaptcha();
        setSuccess(true);
        if (audioRef.current) audioRef.current.play();
        setTimeout(() => navigate("/signin"), 7000);
      } else {
        const msg = contentType && contentType.includes("application/json")
          ? (await res.json()).message : await res.text();
        setError(msg || t("shopkeeper.error.signupFailed"));
      }
    } catch (err) {
      setError(t("shopkeeper.error.networkError"));
    } finally { setLoading(false); }
  };

  const nextStep = () => {
    let currentFields = [];
    if (step === 1) currentFields = [
      "shopName", "email", "phone", "city", "country"
    ];
    if (step === 2) currentFields = [
      "companyName", "companyEmail", "companyPhone", "companyAddress"
    ];
    const miss = currentFields.filter((field) =>
      !String(formData[field] || "").trim());
    if (miss.length > 0) {
      setMissingFields(miss);
      setError(t("shopkeeper.error.fillAllFields"));
      return;
    }
    if ((step === 1 && !validateEmail(formData.email)) ||
      (step === 2 && !validateEmail(formData.companyEmail)))
      return setError(t("shopkeeper.error.invalidEmail"));
    if ((step === 1 && formData.phone.length !== 10) ||
        (step === 2 && formData.companyPhone.length !== 10))
      return setError(t("shopkeeper.error.phone10Digits"));
    if (step === 2 && !isEmailVerified)
      return setError(t("shopkeeper.error.verifyEmailFirst"));
    setStep((prev) => prev + 1);
    setMissingFields([]); setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      {success && <Confetti recycle={false} numberOfPieces={300} />}

      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md sm:max-w-lg bg-white shadow-sm border border-slate-200 rounded-xl sm:rounded-xl p-8"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-1 sm:mb-2">
          {t("shopkeeper.title")}
        </h2>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-5 sm:mb-6">
          {t("shopkeeper.step")} {step} {t("shopkeeper.of")} 3
        </p>
        
        <div className="w-full h-2 bg-gray-200 rounded-full mb-6 sm:mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-white to-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        
        {error && (
          <div className="flex items-center p-3 mb-5 sm:mb-6 text-sm sm:text-base text-red-800 rounded bg-red-50 border border-red-200" role="alert">
            <FaInfoCircle className="flex-shrink-0 inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {step === 1 && (
            <>
              <FlatInput label={t("shopkeeper.shopName")} name="shopName" value={formData.shopName} onChange={handleChange} Icon={Store} />
              <FlatInput label={t("shopkeeper.personalEmail")} name="email" type="email" value={formData.email} onChange={handleChange} Icon={Mail} />
              
              <div className="flex flex-col space-y-1">
                <label className="text-sm sm:text-base font-semibold text-gray-700 ml-1">{t("shopkeeper.personalPhone")}</label>
                <div className="relative">
                  <div className={`flex items-center w-full h-11 bg-white border rounded-lg transition-all duration-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 ${
                    formData.phone && formData.phone.length !== 10 ? 'border-red-300' : 'border-slate-200'
                  }`}>
                    <Smartphone className="flex-shrink-0 ml-3 sm:ml-4 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={handlePhoneChange('phone')}
                      placeholder={t("shopkeeper.phonePlaceholder")}
                      maxLength={10}
                      className="w-full h-full text-base sm:text-lg text-gray-900 bg-transparent px-3 outline-none"
                      required
                    />
                  </div>
                  {formData.phone && formData.phone.length !== 10 && (
                    <p className="absolute -bottom-7 sm:-bottom-8 left-0 text-xs text-red-600">{t("shopkeeper.error.exactly10Digits")}</p>
                  )}
                </div>
              </div>

              <FlatInput label={t("shopkeeper.city")} name="city" value={formData.city} onChange={handleChange} Icon={MapPin} />
              
              {/* <CountrySelect
                label={t("shopkeeper.country")}
                name="country"
                value={formData.country}
                onChange={handleChange}
              /> */}
              <CountrySelect
                label={t("shopkeeper.country")}
                name="country"
                value={formData.country}
                onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              />
            </>
          )}

          {step === 2 && (
            <>
              <FlatInput label={t("shopkeeper.companyName")} name="companyName" value={formData.companyName} onChange={handleChange} Icon={Building2} />
              
              <div className="flex flex-col space-y-1">
                <label htmlFor="companyEmail" className="text-sm sm:text-base font-semibold text-gray-700 ml-1">
                  {t("shopkeeper.companyEmail")}
                </label>
                <div className="relative">
                  <div className="flex items-center w-full h-11 bg-white border border-slate-200 rounded-lg transition-all duration-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                    <Mail className="flex-shrink-0 ml-3 sm:ml-4 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="companyEmail"
                      id="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleChange}
                      className="w-full h-full text-base sm:text-lg text-gray-900 bg-transparent px-3 outline-none pr-28 sm:pr-32"
                      required
                    />
                  </div>
                  <div className="absolute right-1 sm:right-1 top-1/2 -translate-y-1/2 group">
                    <FaInfoCircle className="text-gray-500 cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
                    <div className="absolute right-0 top-full mb-1 w-60 sm:w-70 text-xs sm:text-sm text-white bg-black/80 px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
                      {t("shopkeeper.companyEmailTooltip")}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={verifyEmail}
                    disabled={isVerifying || !formData.companyEmail || !validateEmail(formData.companyEmail) || isEmailVerified}
                    className={`absolute right-6 sm:right-7 top-1/2 -translate-y-1/2 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition z-10
                      ${isEmailVerified 
                          ? "bg-green-600 text-white" 
                          : "bg-slate-900 text-white hover:bg-emerald-600"}
                      ${(isVerifying || !formData.companyEmail || !validateEmail(formData.companyEmail) || isEmailVerified) && "opacity-60 cursor-not-allowed"}`}
                  >
                    {isVerifying ? t("shopkeeper.verifying") : isEmailVerified ? <><CheckCircle className="inline mr-1 h-3 w-3 sm:h-4 sm:w-4" /> {t("shopkeeper.verified")}</> : t("shopkeeper.verify")}
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm sm:text-base font-semibold text-gray-700 ml-1">{t("shopkeeper.companyPhone")}</label>
                <div className="relative">
                  <div className={`flex items-center w-full h-11 bg-white border rounded-lg transition-all duration-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 ${
                    formData.companyPhone && formData.companyPhone.length !== 10 ? 'border-red-300' : 'border-slate-200'
                  }`}>
                    <Smartphone className="flex-shrink-0 ml-3 sm:ml-4 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.companyPhone}
                      onChange={handlePhoneChange('companyPhone')}
                      placeholder={t("shopkeeper.phonePlaceholder")}
                      maxLength={10}
                      className="w-full h-full text-base sm:text-lg text-gray-900 bg-transparent px-3 outline-none"
                      required
                    />
                  </div>
                  {formData.companyPhone && formData.companyPhone.length !== 10 && (
                    <p className="absolute -bottom-7 sm:-bottom-8 left-0 text-xs text-red-600">{t("shopkeeper.error.exactly10Digits")}</p>
                  )}
                </div>
              </div>

              <FlatInput label={t("shopkeeper.companyAddress")} name="companyAddress" value={formData.companyAddress} onChange={handleChange} Icon={MapPin} />
            </>
          )}

          {step === 3 && (
            <>
              <FlatInput 
                label={t("shopkeeper.password")} 
                name="password" 
                type={showPassword ? "text" : "password"} 
                value={formData.password} 
                onChange={handleChange} 
                Icon={Lock} 
                ToggleIcon={showPassword ? EyeOff : Eye} 
                onToggle={() => setShowPassword(!showPassword)} 
              />
              <FlatInput 
                label={t("shopkeeper.confirmPassword")} 
                name="confirmPassword" 
                type={showConfirmPassword ? "text" : "password"} 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                Icon={Lock} 
                ToggleIcon={showConfirmPassword ? EyeOff : Eye} 
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)} 
              />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-5 pt-1 sm:pt-2">
                <div className="w-full sm:flex-grow">
                  <FlatInput label={t("shopkeeper.enterCaptcha")} name="captchaInput" value={formData.captchaInput} onChange={handleChange} Icon={Puzzle} />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
                  <div className="flex-shrink-0 w-28 sm:w-32 h-10 bg-gray-100 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center">
                    <canvas ref={captchaCanvasRef} width={120} height={40} className="w-full h-full" />
                  </div>
                  <button 
                    type="button" 
                    onClick={generateCaptcha} 
                    className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors flex items-center justify-center shadow-sm"
                    aria-label="Refresh CAPTCHA"
                  >
                    <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>
              </div>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                type="submit"
                disabled={loading}
                className={`w-full bg-slate-900 text-white font-bold py-2 rounded-full shadow-sm transition-all duration-300 text-md
                ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-600 active:scale-[0.99]"}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"></path>
                    </svg>
                    {t("shopkeeper.signingUp")}
                  </span>
                ) : t("shopkeeper.completeRegistration")}
              </motion.button>
            </>
          )}
        </form>

        {/* Navigation Buttons */}
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          {step < 3 && (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="button"
              onClick={nextStep}
              disabled={step === 2 && !isEmailVerified}
              className={`w-full py-2 bg-slate-900 text-white font-semibold rounded-full shadow-sm transition-all duration-300 text-base
              ${(step === 2 && !isEmailVerified) ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-600 active:scale-[0.99]"}
              `}
            >
              {t("shopkeeper.nextStep")} ({step + 1}/3)
            </motion.button>
          )}

          {step > 1 && (
            <button
              type="button"
              onClick={() => { setStep((p) => p - 1); if (step === 2) setIsEmailVerified(false); }}
              className="w-full py-2 bg-gray-200 hover:bg-gray-300 active:scale-[0.99] text-gray-700 font-semibold rounded-full transition-all duration-300 text-base"
            >
              {t("shopkeeper.back")}
            </button>
          )}
        </div>
        
        <div className="text-center mt-6 sm:mt-8 text-sm sm:text-base">
          <span className="text-gray-500">{t("shopkeeper.alreadyHaveAccount")} </span>
          <button 
            onClick={() => navigate("/signin")} 
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            {t("shopkeeper.signIn")}
          </button>
        </div>

        <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
      </motion.div>
    </div>
  );
}

export default Shopkeeper;