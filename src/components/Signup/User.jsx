import { useState, useEffect, useRef } from "react"; 
import Confetti from "react-confetti";
import { Eye, EyeOff, Lock, Mail, RefreshCw, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function FloatingInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
  return (
    <div className="relative border border-blue-300 rounded-2xl px-4 pt-5 pb-3 bg-white/70 shadow-md backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-500 transition hover:shadow-lg">
      <label htmlFor={name} className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold text-blue-600">
        {label}
      </label>
      {Icon && <Icon className="absolute left-4 top-4.5 h-6 w-6 text-blue-400" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="w-full h-12 px-12 text-lg text-gray-800 bg-transparent focus:outline-none"
        required
      />
      {ToggleIcon && (
        <button type="button" onClick={onToggle} className="absolute right-4 top-4 text-gray-600 hover:text-blue-600">
          <ToggleIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

function UserSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    captchaInput: "",
  });

  const [referralShopId, setReferralShopId] = useState(null);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const shopId = queryParams.get("referralShopId"); 
    if (shopId) {
      setReferralShopId(shopId);
    }
    if (step === 3) generateCaptcha();
  }, [step, location.search]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const hasLeadingZeroAfterCountryCode = (phone, dialCode) => {
    const numberWithoutPlus = phone.replace("+", "");
    return numberWithoutPlus.startsWith(dialCode + "0");
  };

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 5; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 100, 40);
      ctx.font = "28px Arial";
      ctx.fillStyle = "#2563EB"; // blue-600
      ctx.fillText(text, 10, 30);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (formData.captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
      setError("Invalid CAPTCHA");
      return;
    }
    if (phoneError) {
      setError("Please correct your phone number.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("https://loyalty-backend-java.onrender.com/api/auth/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phoneNumber,
          email: formData.email,
          password: formData.password,
          referralShopId: referralShopId,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (response.ok) {
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
          captchaInput: "",
        });
        generateCaptcha();
        setSuccess(true);
        if (audioRef.current) audioRef.current.play();
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        const errorMessage = contentType && contentType.includes("application/json")
          ? (await response.json()).message
          : await response.text();
        setError(errorMessage || "Signup failed!");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.firstName.trim() || !formData.lastName.trim())) {
      setError("Please fill up the fields.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (step === 2) {
      if (!formData.phoneNumber.trim() || !formData.email.trim()) {
        setError("Please fill up the fields.");
        setTimeout(() => setError(""), 3000);
        return;
      }
      if (!validateEmail(formData.email)) {
        setError("Please enter a valid email address.");
        setTimeout(() => setError(""), 3000);
        return;
      }
    }
    if (step === 3 && (!formData.password.trim() || !formData.confirmPassword.trim())) {
      setError("Please fill up the fields.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setError("");
    setStep((prev) => prev + 1);
  };

  const getProgress = () => (step / 3) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 
      bg-[linear-gradient(135deg,#d0f4de,#a9def9)] 
      [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] 
      [background-size:40px_40px] bg-blend-overlay">
      {success && <Confetti recycle={false} numberOfPieces={300} />}
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-xl border border-blue-200 rounded-3xl p-14 shadow-2xl animate-fade-in">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-4">User Sign Up</h2>
        <p className="text-center text-gray-600 mb-6 text-lg">Step {step} of 3</p>
        <div className="w-full h-3 bg-gray-300 rounded-full mb-8">
          <div className="h-full bg-gradient-to-r from-green-500 to-blue-600 rounded-full" style={{ width: `${getProgress()}%` }}></div>
        </div>
        {error && <p className="text-red-500 text-lg text-center mb-4 animate-pulse">⚠️ {error}</p>}
        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <div className="grid grid-cols-2 gap-6">
              <FloatingInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} Icon={User} />
              <FloatingInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} Icon={User} />
              <div className="col-span-2">
                <NextButton onClick={nextStep} />
              </div>
            </div>
          )}

          {step === 2 && (
            <>
              <div className="relative border border-blue-300 rounded-2xl px-4 pt-5 pb-3 bg-white/70 shadow-md backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-500 transition hover:shadow-lg">
                <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold text-blue-600">Phone Number</label>
                <PhoneInput
                  country={"us"}
                  enableSearch
                  value={formData.phoneNumber}
                  onChange={(phone, data) => {
                    const newPhone = `+${String(phone || "").replace("+", "")}`;
                    const currentDialCode = data?.dialCode;
                    if (!currentDialCode) {
                      setFormData((prev) => ({ ...prev, phoneNumber: newPhone }));
                      return;
                    }
                    if (hasLeadingZeroAfterCountryCode(newPhone, currentDialCode)) {
                      setPhoneError(true);
                      setError("Phone number area code cannot start with 0.");
                    } else {
                      setPhoneError(false);
                      setError("");
                      setFormData((prev) => ({ ...prev, phoneNumber: newPhone }));
                    }
                  }}
                  inputClass="!w-full !h-12 !pl-16 !pr-4 !bg-transparent !text-lg !text-gray-900 !focus:outline-none !border-none"
                  buttonClass="!h-12"
                  containerClass="!w-full"
                />
              </div>
              {phoneError && (
                <p className="text-red-500 text-sm mt-1 ml-1">⚠️ Invalid phone number format.</p>
              )}
              <FloatingInput label="Email" name="email" value={formData.email} onChange={handleChange} Icon={Mail} />
              <NextButton onClick={nextStep} />
            </>
          )}

          {step === 3 && (
            <div className="grid grid-cols-2 gap-6">
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
              <FloatingInput
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                Icon={Lock}
                ToggleIcon={showConfirmPassword ? EyeOff : Eye}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              <div className="col-span-2 flex items-center justify-between border border-blue-300 bg-white/70 px-6 py-4 rounded-2xl shadow-md backdrop-blur-sm hover:shadow-lg">
                <span className="text-xl font-mono tracking-widest text-gray-700 select-none">{captchaText}</span>
                <button type="button" onClick={generateCaptcha} className="flex items-center text-base text-blue-500 hover:text-blue-600">
                  <RefreshCw className="w-5 h-5 mr-1" /> Refresh
                </button>
              </div>
              <FloatingInput label="Enter Captcha" name="captchaInput" value={formData.captchaInput} onChange={handleChange} />
              <button
                type="submit"
                disabled={loading}
                className={`col-span-2 w-full py-4 text-xl font-semibold rounded-2xl shadow-md transition duration-200 
                  ${loading 
                    ? "opacity-70 cursor-not-allowed bg-gradient-to-r from-green-400 to-blue-400" 
                    : "bg-gradient-to-r from-green-500 to-blue-600 text-white hover:scale-[1.02] hover:shadow-xl"}`}
              >
                {loading ? "Signing up..." : "Submit"}
              </button>
            </div>
          )}
        </form>

        {step > 1 && step < 4 && (
          <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            className="w-full mt-4 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-2xl transition"
          >
            Back
          </button>
        )}
        <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
      </div>
    </div>
  );
}

function NextButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-4 font-semibold text-lg rounded-2xl shadow-md transition 
        bg-gradient-to-r from-green-500 to-blue-600 text-white hover:scale-[1.02] hover:shadow-xl"
    >
      Next
    </button>
  );
}

export default UserSignup;
