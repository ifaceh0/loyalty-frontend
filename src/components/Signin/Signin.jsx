import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  RefreshCw,
  BarChart,
  Users,
  Star,
  CheckCircle,
  Check,
  AlertCircle,
  Puzzle,
  ShieldCheck,
  User,
  Store,
  Users as UsersIcon,
  ArrowLeft,
  LogIn,
} from "lucide-react";
import { API_BASE_URL } from '../../apiConfig';

function FloatingInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  Icon,
  ToggleIcon,
  onToggle,
}) {
  return (
    <div className="relative pt-6">
      <label
        htmlFor={name}
        className={`absolute left-0 text-sm font-medium transition-all duration-300 pointer-events-none 
          ${value ? "text-xs top-1 text-emerald-600" : "text-base top-4 text-gray-500"} `}
      >
        {label}
      </label>
      {Icon && <Icon className="absolute left-0 top-8 h-5 w-5 text-emerald-500" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-10 pl-7 text-base text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none focus:border-emerald-600 transition duration-200"
        required
      />
      {ToggleIcon && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-0 top-8 text-gray-400 hover:text-emerald-600 transition"
        >
          <ToggleIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

const DemoFeature = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center space-x-5 p-2 rounded-[0.5rem] bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] transition-all duration-300 group"
  >
    <div className="flex-shrink-0 p-2 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-md border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
    </div>
    <div>
      <h4 className="text-md font-semibold text-white tracking-wide">{title}</h4>
      <p className="text-slate-400 mt-0.5 text-sm font-light leading-snug">{description}</p>
    </div>
  </motion.div>
);

const RoleCard = ({ roleInfo, onClick, disabled, isSelected }) => {
  const { t } = useTranslation();
  const { role, displayName } = roleInfo;

  const icons = {
    USER: User,
    SHOPKEEPER: Store,
    EMPLOYEE: UsersIcon,
  };
  const Icon = icons[role] || ShieldCheck;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full max-auto p-2 rounded-lg transition-all duration-300 text-left relative
        border-1 flex items-center justify-between group
        ${disabled
          ? "bg-slate-50 border-slate-100 cursor-not-allowed opacity-50"
          : isSelected
          ? "bg-white border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/20 scale-[1.02]"
          : "bg-white border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-slate-200/50"
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Soft Icon Container */}
        <div className={`
          p-2 rounded-full 
          ${isSelected ? "bg-emerald-500 text-white" : "bg-slate-50 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600"}
        `}>
          <Icon className="w-5 h-5" strokeWidth={isSelected ? 2.5 : 2} />
        </div>

        <div className="flex flex-col">
          <span className={`
            font-bold tracking-tight transition-colors duration-300
            ${isSelected ? "text-slate-900" : "text-slate-700"}
          `}>
            {role === "USER"
              ? t("signin.roles.customer")
              : role === "SHOPKEEPER"
              ? t("signin.roles.shopOwner")
              : t("signin.roles.employee")}
          </span>
          <span className="text-sm text-slate-400 font-medium tracking-wide">
            {displayName}
          </span>
        </div>
      </div>

      {/* Modern Check Indicator */}
      <div className="relative flex items-center justify-center">
        <div className={`
          w-5 h-5 rounded-full border-1 flex items-center justify-center
          ${isSelected 
            ? "bg-emerald-500 border-emerald-500 scale-110" 
            : "border-slate-200 bg-transparent group-hover:border-emerald-300"
          }
        `}>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Subtle Glow Effect for Selection */}
      {isSelected && (
        <div className="absolute inset-0 rounded-lg bg-emerald-500/5 -z-10 animate-pulse" />
      )}
    </button>
  );
};

const Signin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [step, setStep] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [roles, setRoles] = useState([]);
  const [employeeShops, setEmployeeShops] = useState([]);
  const [showShopSelection, setShowShopSelection] = useState(false);
  const [selectedRoleInfo, setSelectedRoleInfo] = useState(null);
  const [error, setError] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (subscriptionMessage) {
      let sec = 5;
      const el = document.getElementById("countdown");
      const timer = setInterval(() => {
        sec--;
        if (el) el.textContent = sec.toString();
        if (sec <= 0) clearInterval(timer);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [subscriptionMessage]);

  useEffect(() => {
    const timer = setTimeout(() => generateCaptcha(), 100);
    return () => clearTimeout(timer);
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 120, 40);
    ctx.font = "bold 22px Arial";
    ctx.fillStyle = "#059669";
    ctx.save();
    ctx.translate(10, 28);
    ctx.rotate(-0.03 * Math.PI + Math.random() * 0.1 - 0.03);
    ctx.fillText(text, 0, 0);
    ctx.restore();

    ctx.strokeStyle = "#34D399";
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 120, Math.random() * 40);
      ctx.lineTo(Math.random() * 120, Math.random() * 40);
      ctx.stroke();
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubscriptionMessage(null);
    setShowShopSelection(false);
    setEmployeeShops([]);
    setSelectedRoleInfo(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t("signin.error.invalidEmail"));
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaText) {
      setError(t("signin.error.invalidCaptcha"));
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/auth/signIn/step1`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.includes("subscription") && data.error?.includes("Loyalty")) {
          setSubscriptionMessage(t("signin.subscriptionMessage"));
          setTimeout(() => {
            window.location.href = "https://subscription-frontend-psi.vercel.app/subscription";
          }, 5000);
          return;
        }
        throw new Error(data.message || data.error || t("signin.error.invalidCredentials"));
      }

      // Single role → auto login
      if (data.role || (data.roles && data.roles.length === 1)) {
        finishLogin(data);
        return;
      }

      // Multiple roles → group EMPLOYEE shops
      if (data.roles && data.roles.length > 1) {
        const groupedRoles = [];
        const employeeRoles = [];

        data.roles.forEach(r => {
          if (r.role === "EMPLOYEE") {
            employeeRoles.push(r);
          } else {
            groupedRoles.push(r);
          }
        });

        if (employeeRoles.length > 0) {
          groupedRoles.push({
            role: "EMPLOYEE",
            displayName: employeeRoles.length === 1 
              ? employeeRoles[0].displayName 
              : `${employeeRoles.length} Shops`,
            _shops: employeeRoles
          });
        }

        setRoles(groupedRoles);
        setStep("role");
      } else {
        setError(t("signin.error.noRoles"));
      }
    } catch (err) {
      setError(err.message);
      generateCaptcha();
      setCaptchaInput("");
    } finally {
      setLoading(false);
    }
  };

  // Select a role/shop (just highlight, no login yet)
  const handleRoleSelect = (roleInfo) => {
    if (roleInfo.role !== "EMPLOYEE") {
      setSelectedRoleInfo(roleInfo);
      return;
    }

    const shops = roleInfo._shops || [roleInfo];
    if (shops.length === 1) {
      setSelectedRoleInfo(shops[0]);
    } else {
      setEmployeeShops(shops);
      setShowShopSelection(true);
    }
  };

  // Final login when user clicks the "Sign In" button
  const performLogin = async () => {
    if (!selectedRoleInfo) {
      setError("Please select a role/shop first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        email,
        password,
        role: selectedRoleInfo.role,
        contextId: selectedRoleInfo.refId
      };

      const res = await fetch(
        `${API_BASE_URL}/api/auth/signIn/step2`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || data.message || "Login failed");

      finishLogin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const finishLogin = (data) => {
    let loginRole = data.role;   
    let loginId = data.id;        
    let loginName = data.name;

    // Handle single role auto-login (when backend sends direct response)
    if (data.roles && data.roles.length === 1) {
      const single = data.roles[0];
      loginRole = single.role;
      loginId = single.refId;
      loginName = single.displayName;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("id", String(loginId || ""));
    localStorage.setItem("name", loginName || "");
    localStorage.setItem("companyEmail", data.companyEmail || "");
    localStorage.setItem("role", loginRole || "");
    localStorage.setItem("email", data.email || "");
    localStorage.setItem("country", data.country || "");

    if (loginRole === "EMPLOYEE" && data.userId) {
      localStorage.setItem("employeeUserId", data.userId);
    }

    setSuccess(true);

    setTimeout(() => {
      if (loginRole === "SHOPKEEPER") {
        navigate("/shopkeeper/dashboard");
      } else if (loginRole === "USER") {
        navigate("/user/dashboard");
      } else if (loginRole === "EMPLOYEE") {
        navigate("/employee/dashboard");
      } else {
        setError(t("signin.error.unknownRole", { role: loginRole }));
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-5xl flex bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden animate-fade-in-up">
      
        {/* left side */}
        <div className="hidden lg:flex w-6/12 bg-slate-900 p-10 flex-col justify-center relative overflow-hidden">
          {/* Modern Atmospheric Background */}
          <div className="absolute top-0 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 -right-20 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px]" />
          
          {/* Subtle Grid - Softened */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100" />
          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          <div className="relative z-10 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                {t("signin.hero.tagline")}
              </span>
              <h1 className="text-4xl font-semibold text-white leading-[1.1] tracking-tight">
                {t("signin.hero.title")}
              </h1>
              <p className="text-slate-400 text-lg max-w-md font-light leading-relaxed">
                {t("signin.hero.subtitle")}
              </p>
            </motion.div>

            <div className="space-y-4">
              <DemoFeature icon={BarChart} title={t("signin.features.track")} description={t("signin.features.trackDesc")} delay={0.1} />
              <DemoFeature icon={Users} title={t("signin.features.engage")} description={t("signin.features.engageDesc")} delay={0.2} />
              <DemoFeature icon={Star} title={t("signin.features.reward")} description={t("signin.features.rewardDesc")} delay={0.3} />
            </div>
          </div>
        </div>

        {/* right Side - Form */}
        <div className="w-full lg:w-6/12 p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{t("signin.title")}</h2>
            <p className="text-gray-500 mb-6">{t("signin.subtitle")}</p>
        
            {error && (
              <p className="text-red-600 text-sm mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-center">
                {error}
              </p>
            )}

            {subscriptionMessage && (
              <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-600 rounded-r text-center">
                <AlertCircle className="inline w-4 h-4 mr-2 text-amber-700" />
                <span className="text-amber-800 font-medium">{subscriptionMessage}</span>
                <div className="mt-2 text-xs text-amber-600">
                  {t("signin.redirecting")} <span id="countdown">5</span> s…
                </div>
              </div>
            )}

            {success && (
              <div className="mb-4 text-emerald-600 text-sm p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r text-center">
                <CheckCircle className="inline w-4 h-4 mr-2" /> {t("signin.success")}
                <Confetti
                  recycle={false}
                  numberOfPieces={100}
                  width={450}
                  height={500}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2"
                />
              </div>
            )}

            {/* STEP 1: Password */}
            {step === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <FloatingInput label={t("signin.emailLabel")} name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" Icon={Mail} />
                <FloatingInput
                  label={t("signin.passwordLabel")}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  Icon={Lock}
                  ToggleIcon={showPassword ? EyeOff : Eye}
                  onToggle={() => setShowPassword(!showPassword)}
                />

                <div className="space-y-4 pt-3">
                  <div className="flex items-center justify-left">
                    <canvas ref={canvasRef} width={120} height={40} className="border border-slate-300 shadow-sm rounded bg-white mr-4" />
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="flex items-center gap-2 text-sm bg-slate-900 text-white px-2 py-2 rounded-full hover:bg-emerald-600 transition duration-150 shadow-md"
                      aria-label={t("signin.refreshCaptcha")}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <FloatingInput label={t("signin.captchaLabel")} name="captcha" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} Icon={Puzzle} />
                </div>

                <div className="flex justify-end pt-2">
                  <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition">
                    {t("signin.forgotPassword")}
                  </button>
                </div>

                <motion.button
                  whileHover={!loading ? { scale: 1.01, y: -2 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  type="submit"
                  disabled={loading}
                  className={`
                    w-full relative py-2 px-6 rounded-full text-md font-bold tracking-wide
                    transition-all duration-300 overflow-hidden
                    ${loading 
                      ? "bg-slate-100 text-slate-400 cursor-wait" 
                      : "bg-slate-900 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/10 active:shadow-inner"
                    }
                  `}
                >
                  <span className="flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        {/* Modern Minimal Spinner */}
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <div className="absolute inset-0 border-2 border-slate-300 rounded-full opacity-20"></div>
                          <div className="absolute inset-0 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <span className="text-slate-500 font-medium tracking-normal">
                          {t("signin.loggingIn")}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="translate-y-[0.5px]">{t("signin.signInButton")}</span>
                      </>
                    )}
                  </span>

                  {/* Soft Shine Effect on Hover (Optional Overlay) */}
                  {!loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite] transition-transform pointer-events-none" />
                  )}
                </motion.button>
              </form>
            )}

            {/* STEP 2: Role Selection */}
            {step === "role" && !showShopSelection && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-6"
              >
                {/* Header Section */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 tracking-tight">
                    {t("signin.chooseRole")}
                  </h3>
                </div>

                {/* Role Cards Container */}
                <div className="space-y-3 max-h-[340px]">
                  {roles.map((r, idx) => (
                    <RoleCard
                      key={`${r.role}-${idx}`}
                      roleInfo={r}
                      onClick={() => handleRoleSelect(r)}
                      disabled={loading}
                      isSelected={
                        selectedRoleInfo && 
                        selectedRoleInfo.role === r.role && 
                        (!r._shops || selectedRoleInfo.refId === r.refId)
                      }
                    />
                  ))}
                </div>

                {/* Actions Section */}
                <div className="space-y-4 pt-2">
                  <button
                    onClick={performLogin}
                    disabled={!selectedRoleInfo || loading}
                    className={`
                      w-full flex items-center justify-center gap-3 py-2 px-6 
                      rounded-full text-base font-bold transition-all duration-300
                      shadow-sm hover:shadow-md active:scale-[0.98]
                      ${!selectedRoleInfo || loading 
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                        : "bg-slate-900 text-white hover:bg-emerald-600 shadow-emerald-200"
                      }
                    `}
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <LogIn className="w-5 h-5 opacity-90" />
                    )}
                    <span>{loading ? t("signin.loggingIn") : t("signin.signInButton")}</span>
                  </button>

                  <button
                    onClick={() => setStep("password")}
                    className="group w-full py-2 text-sm text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="font-medium tracking-wide">{t("signin.backToPassword")}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {showShopSelection && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-8"
              > 
                {/* Section Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-semibold text-slate-800 tracking-tight">
                    {t("signin.chooseShop") || "Select Your Shop"}
                  </h3>
                </div>

                {/* Modern Responsive Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 max-w-2xl mx-auto px-2">
                  {employeeShops.map((shop) => {
                    const isSelected = selectedRoleInfo && selectedRoleInfo.refId === shop.refId;
                    
                    return (
                      <motion.div
                        key={shop.refId}
                        whileHover={!loading ? { y: -4, scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        onClick={() => !loading && handleRoleSelect(shop)}
                        className={`
                          relative flex flex-col items-center p-2 rounded-[0.5rem] cursor-pointer
                          transition-all duration-300 border-2 text-center
                          ${loading ? "opacity-50 cursor-not-allowed" : ""}
                          ${isSelected 
                            ? "bg-emerald-50/50 border-emerald-500 shadow-xl shadow-emerald-500/10" 
                            : "bg-white border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-slate-200/50"
                          }
                        `}
                      >
                        {/* Shop Logo Container */}
                        <div className={`
                          w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center 
                          bg-white shadow-sm border border-slate-50 overflow-hidden mb-4
                          ${isSelected ? "ring-2 ring-emerald-100" : ""}
                        `}>
                          {shop.shopLogoBase64 ? (
                            <img
                              src={`data:image/png;base64,${shop.shopLogoBase64}`}
                              alt={shop.displayName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                              <Store className="w-8 h-8 text-slate-500" />
                            </div>
                          )}
                        </div>

                        {/* Shop Name */}
                        <h4 className={`text-sm font-bold leading-tight transition-colors duration-300
                          ${isSelected ? "text-emerald-700" : "text-slate-700"}
                        `}> 
                          {shop.displayName}
                        </h4>
                        
                        {/* Subtle Selection Badge */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div 
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute top-1 right-3 bg-emerald-500 rounded-full p-1 shadow-md border-2 border-white"
                            >
                              <Check className="w-3 h-3 text-white" strokeWidth={4} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Action Footer */}
                <div className="flex flex-col items-center gap-4 pt-4">
                  <button
                    onClick={performLogin}
                    disabled={!selectedRoleInfo || loading}
                    className={`
                      w-full max-w-sm flex items-center justify-center gap-3 py-2 px-8 
                      rounded-full text-md font-bold transition-all duration-300
                      ${!selectedRoleInfo || loading 
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                        : "bg-slate-900 text-white hover:bg-emerald-600 shadow-sm active:scale-95"
                      }
                    `}
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <LogIn className="w-5 h-5" />
                    )}
                    <span>{loading ? t("signin.loggingIn") : t("signin.signInButton")}</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowShopSelection(false);
                      setEmployeeShops([]);
                      setSelectedRoleInfo(null);
                    }}
                    className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    {t("signin.back") || "Back to Roles"}
                  </button>
                </div>
              </motion.div>
            )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Signin;