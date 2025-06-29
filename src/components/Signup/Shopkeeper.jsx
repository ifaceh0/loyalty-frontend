<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
</style>

import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { Mail, Phone, Lock, Eye, EyeOff, Building2, MapPin, Store } from "lucide-react";

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
    if (step === 3) {
      const timer = setTimeout(() => {
        if (canvasRef.current) {
          generateCaptcha();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [step]);

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
      ctx.font = "22px Arial";
      ctx.fillStyle = "#4A90E2";
      ctx.fillText(text, 10, 28);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If the field was previously marked missing and now has a value, remove it from missingFields
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
        body: JSON.stringify({
          shopName: formData.shopName,
          companyName: formData.companyName,
          companyEmail: formData.companyEmail,
          companyAddress: formData.companyAddress,
          companyPhone: formData.companyPhone,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
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
      console.error("Error submitting shopkeeper form:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const nextStep = () => setStep((prev) => prev + 1);
  const nextStep = () => {
    let currentFields = [];
    if (step === 1) currentFields = ["shopName", "email", "phone"];
    if (step === 2) currentFields = ["companyName", "companyEmail", "companyPhone", "companyAddress"];

    const missing = currentFields.filter(field => !formData[field].trim());
    if (missing.length > 0) {
      setMissingFields(missing);
      setError("Please fill up all required fields.");
      setTimeout(() => setError(""), 3000);
      const firstMissingField = document.querySelector(`input[name="${missing[0]}"]`);
      firstMissingField?.focus();
      return;
    }

    setMissingFields([]);
    setStep(prev => prev + 1);
  };

  const getProgress = () => (step / 3) * 100;

  const stepLabel = ["Company Info", "Contact Info", "Security"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-blue-200 flex items-center justify-center px-4 relative">
      {success && <Confetti recycle={false} numberOfPieces={300} />}
      {showModal && <ConfirmationModal onClose={() => setShowModal(false)} />}
      <div className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-xl rounded-3xl p-10 w-full max-w-xl animate-fade-in transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">Shopkeeper Sign Up</h2>
        <p className="text-center text-gray-700 mb-6 text-sm">Step {step} of 3 – {stepLabel[step - 1]}</p>

        <div className="w-full h-2 bg-gray-300 rounded-full mb-6">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500" style={{ width: `${getProgress()}%` }}></div>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4 animate-pulse">⚠️ {error}</p>}
        {success && <p className="text-green-600 text-sm text-center mb-4 animate-bounce">✅ Signup successful!</p>}

        <form onSubmit={handleSubmit} className="space-y-5 text-base">
          {step === 1 && (
            <div className="grid grid-cols-1 gap-4 animate-fade-in">
              <div className="relative">
                <input name="shopName" value={formData.shopName} onChange={handleChange} className={`input peer w-full h-10 transition duration-150 ease-in-out ${missingFields.includes("shopName") ? "ring-2 ring-red-500 shadow-md" : "border border-gray-300"}`} required />
                <label className="floating-label">Shop Name</label>
              </div>
              <div className="relative">
                <input name="email" type="email" value={formData.email} onChange={handleChange} className={`input peer w-full h-10 transition duration-150 ease-in-out ${missingFields.includes("email") ? "ring-2 ring-red-500 shadow-md" : "border border-gray-300"}`} required />
                <label className="floating-label">Personal Email</label>
              </div>
              <div className="relative">
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className={`input peer w-full h-10 transition duration-150 ease-in-out ${missingFields.includes("phone") ? "ring-2 ring-red-500 shadow-md" : "border border-gray-300"}`} required />
                <label className="floating-label">Personal Phone</label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 gap-4 animate-fade-in">
              <div className="relative">
                <input name="companyName" value={formData.companyName} onChange={handleChange} className={`input peer w-full h-10 transition duration-150 ease-in-out ${missingFields.includes("companyName") ? "ring-2 ring-red-500 shadow-md" : "border border-gray-300"}`} required />
                <label className="floating-label">Company Name</label>
              </div>
              <div className="relative">
                <input name="companyEmail" type="email" value={formData.companyEmail} onChange={handleChange} className={`input peer w-full h-10 transition duration-150 ease-in-out ${missingFields.includes("companyEmail") ? "ring-2 ring-red-500 shadow-md" : "border border-gray-300"}`} required />
                <label className="floating-label">Company Email</label>
              </div>
              <div className="relative">
                <input name="companyPhone" type="tel" value={formData.companyPhone} onChange={handleChange} className={`input peer w-full h-10 transition duration-150 ease-in-out ${missingFields.includes("companyPhone") ? "ring-2 ring-red-500 shadow-md" : "border border-gray-300"}`} required />
                <label className="floating-label">Company Phone</label>
              </div>
              <div className="relative">
                <input name="companyAddress" value={formData.companyAddress} onChange={handleChange} className={`input peer w-full h-10 transition duration-150 ease-in-out ${missingFields.includes("companyAddress") ? "ring-2 ring-red-500 shadow-md" : "border border-gray-300"}`} required />
                <label className="floating-label">Company Address</label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 gap-4 animate-fade-in">
              <div className="relative">
                <input name="password" type="password" value={formData.password} onChange={handleChange} className="input peer w-full h-10 border border-gray-300" required />
                <label className="floating-label">Password</label>
              </div>
              <div className="relative">
                <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="input peer w-full h-10 border border-gray-300" required />
                <label className="floating-label">Confirm Password</label>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <canvas ref={canvasRef} width={100} height={40} className="border border-gray-300 rounded" />
                <button type="button" onClick={generateCaptcha} className="text-sm text-blue-500 hover:underline">Refresh Captcha</button>
              </div>
              <div className="relative">
                <input type="text" name="captchaInput" value={formData.captchaInput} onChange={handleChange} className="input peer w-full h-10 border border-gray-300" required />
                <label className="floating-label">Enter Captcha</label>
              </div>
            </div>
          )}
        </form>

        <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
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
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
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
        className={`peer w-full px-10 py-3 bg-white/60 backdrop-blur-md border border-gray-300 rounded-md text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-400`}
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
      className="w-1/2 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
    >
      Next
    </button>
  );
}

export default Shopkeeper;
