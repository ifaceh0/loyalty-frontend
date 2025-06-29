import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { Mail, Phone, Lock, Eye, EyeOff, Building2, MapPin, Store, RefreshCw } from "lucide-react";

function Shopkeeper() {
  const [formData, setFormData] = useState({
    shopName: "",
    companyName: "",
    companyEmail: "",
    companyAddress: "",
    companyPhone: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    captchaInput: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [missingFields, setMissingFields] = useState([]);
  const [captchaText, setCaptchaText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (step === 3) generateCaptcha();
  }, [step]);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const text = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    setCaptchaText(text);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 100, 40);
      ctx.font = "22px Arial";
      ctx.fillStyle = "#4A90E2";
      ctx.fillText(text, 10, 28);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (missingFields.includes(name) && value.trim() !== "") {
      setMissingFields((prev) => prev.filter((field) => field !== name));
    }
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

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("https://loyalty-backend-java.onrender.com/api/auth/registerShopkeeper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      if (response.ok) {
        setFormData({
          shopName: "",
          companyName: "",
          companyEmail: "",
          companyAddress: "",
          companyPhone: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          captchaInput: "",
        });
        generateCaptcha();
        setSuccess(true);
        setShowModal(true);
        if (audioRef.current) audioRef.current.play();
      } else {
        const errorMessage = contentType && contentType.includes("application/json")
          ? (await response.json()).message
          : await response.text();
        setError(errorMessage || "Signup failed!");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    let currentFields = [];
    if (step === 1) currentFields = ["shopName", "email", "phone"];
    if (step === 2) currentFields = ["companyName", "companyEmail", "companyPhone", "companyAddress"];

    const missing = currentFields.filter(field => !formData[field].trim());
    if (missing.length > 0) {
      setMissingFields(missing);
      setError("Please fill all required fields.");
      setTimeout(() => setError(""), 3000);
      const firstMissingField = document.querySelector(`input[name="${missing[0]}"]`);
      firstMissingField?.focus();
      return;
    }

    setMissingFields([]);
    setStep(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-blue-200 flex items-center justify-center px-4 font-['Inter']">
      {success && <Confetti recycle={false} numberOfPieces={300} />}
      <div className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">Shopkeeper Sign Up</h2>
        <p className="text-center text-gray-600 mb-4">Step {step} of 3</p>
        <div className="w-full h-2 bg-gray-300 rounded-full mb-6">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        {error && <p className="text-red-500 text-sm text-center mb-4 animate-pulse">⚠️ {error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <>
              <FloatingInput label="Shop Name" name="shopName" value={formData.shopName} onChange={handleChange} Icon={Store} />
              <FloatingInput label="Personal Email" name="email" type="email" value={formData.email} onChange={handleChange} Icon={Mail} />
              <FloatingInput label="Personal Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} Icon={Phone} />
            </>
          )}

          {step === 2 && (
            <>
              <FloatingInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} Icon={Building2} />
              <FloatingInput label="Company Email" name="companyEmail" type="email" value={formData.companyEmail} onChange={handleChange} Icon={Mail} />
              <FloatingInput label="Company Phone" name="companyPhone" type="tel" value={formData.companyPhone} onChange={handleChange} Icon={Phone} />
              <FloatingInput label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} Icon={MapPin} />
            </>
          )}

          {step === 3 && (
            <>
              <FloatingInput label="Password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} Icon={Lock} ToggleIcon={showPassword ? EyeOff : Eye} onToggle={() => setShowPassword(!showPassword)} />
              <FloatingInput label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} Icon={Lock} ToggleIcon={showConfirmPassword ? EyeOff : Eye} onToggle={() => setShowConfirmPassword(!showConfirmPassword)} />
              <div className="flex items-center justify-between bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg">
                <span className="text-lg font-semibold tracking-widest text-gray-600 select-none">{captchaText}</span>
                <button type="button" onClick={generateCaptcha} className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" /> Refresh
                </button>
              </div>
              <FloatingInput label="Enter Captcha" name="captchaInput" value={formData.captchaInput} onChange={handleChange} />
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition">
                {loading ? "Signing up..." : "Submit"}
              </button>
            </>
          )}
        </form>

        {step < 3 && <NextButton onClick={nextStep} />}

        <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
      </div>
    </div>
  );
}

function FloatingInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
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

function NextButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3 mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
    >
      Next
    </button>
  );
}

export default Shopkeeper;