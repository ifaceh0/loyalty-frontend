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

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
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
            <div className="grid gap-5 animate-fade-in">
              <FloatingInput label="Shop Name" name="shopName" value={formData.shopName} onChange={handleChange} Icon={Store} />
              <FloatingInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} Icon={Building2} />
              <FloatingInput label="Company Email" name="companyEmail" type="email" value={formData.companyEmail} onChange={handleChange} Icon={Mail} />
              <div className="flex justify-between gap-4">
                <NextButton onClick={nextStep} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5 animate-fade-in">
              <FloatingInput label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} Icon={MapPin} />
              <FloatingInput label="Company Phone" name="companyPhone" type="tel" value={formData.companyPhone} onChange={handleChange} Icon={Phone} />
              <FloatingInput label="Personal Email" name="email" type="email" value={formData.email} onChange={handleChange} Icon={Mail} />
              <FloatingInput label="Personal Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} Icon={Phone} />
              <div className="flex justify-between gap-4">
                <button type="button" onClick={prevStep} className="w-1/2 py-3 bg-gray-300 text-gray-800 font-semibold rounded-xl transition">Back</button>
                <NextButton onClick={nextStep} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-5 animate-fade-in">
              <FloatingInput label="Password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} Icon={Lock} ToggleIcon={showPassword ? EyeOff : Eye} onToggle={() => setShowPassword(!showPassword)} />
              <FloatingInput label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} Icon={Lock} ToggleIcon={showConfirmPassword ? EyeOff : Eye} onToggle={() => setShowConfirmPassword(!showConfirmPassword)} />
              <div className="flex items-center gap-4">
                <canvas ref={canvasRef} width={100} height={40} className="border border-gray-300 rounded-md" />
                <button type="button" onClick={generateCaptcha} className="text-sm text-blue-500 hover:underline">Refresh</button>
              </div>
              <FloatingInput label="Enter Captcha" name="captchaInput" value={formData.captchaInput} onChange={handleChange} />
              <div className="flex justify-between gap-4">
                <button type="button" onClick={prevStep} className="w-1/2 py-3 bg-gray-300 text-gray-800 font-semibold rounded-xl transition">Back</button>
                <button type="submit" disabled={loading} className={`w-1/2 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl transition-all hover:opacity-90 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}>{loading ? "Signing up..." : "Sign Up"}</button>
              </div>
            </div>
          )}
        </form>

        <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
      </div>

      <style>{`
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
