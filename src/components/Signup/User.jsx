<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
</style>

import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import {
  User as UserIcon,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2
} from "lucide-react";

const stepLabel = ["Basic Info", "Contact Info", "Security"];

function ConfirmationModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
        <CheckCircle2 className="text-green-500 w-12 h-12 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Signup Successful!</h2>
        <p className="text-gray-600 mb-4">You're now registered as a user. Welcome aboard!</p>
        <button
          onClick={onClose}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold"
        >
          Close
        </button>
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

function UserSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    captchaInput: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
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
      const response = await fetch(
        "https://loyalty-backend-java.onrender.com/api/auth/registerUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phoneNumber,
            email: formData.email,
            password: formData.password
          })
        }
      );

      const contentType = response.headers.get("content-type");

      if (response.ok) {
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
          captchaInput: ""
        });
        generateCaptcha();
        setSuccess(true);
        setShowModal(true);
        if (audioRef.current) audioRef.current.play();
      } else {
        const errorMessage =
          contentType && contentType.includes("application/json")
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

  const getProgress = () => (step / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-blue-200 flex items-center justify-center px-4 font-['Inter'] relative">
      {success && <Confetti recycle={false} numberOfPieces={300} />} 
      {showModal && <ConfirmationModal onClose={() => setShowModal(false)} />} 

      <div className="backdrop-blur-xl bg-white/70 shadow-2xl p-8 rounded-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">User Sign Up</h2>
        <p className="text-center text-sm text-gray-600 mb-4">Step {step} of 3 – {stepLabel[step - 1]}</p>
        <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
          <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${getProgress()}%` }}></div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4 text-center animate-pulse">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div className="grid gap-4 animate-fade-in">
              <FloatingInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} Icon={UserIcon} />
              <FloatingInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} Icon={UserIcon} />
              <div className="flex justify-end">
                <button type="button" onClick={() => setStep(2)} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">Next</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 animate-fade-in">
              <FloatingInput label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} Icon={Phone} />
              <FloatingInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} Icon={Mail} />
              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg">Back</button>
                <button type="button" onClick={() => setStep(3)} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4 animate-fade-in">
              <FloatingInput label="Password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} Icon={Lock} ToggleIcon={showPassword ? EyeOff : Eye} onToggle={() => setShowPassword(!showPassword)} />
              <FloatingInput label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} Icon={Lock} ToggleIcon={showConfirmPassword ? EyeOff : Eye} onToggle={() => setShowConfirmPassword(!showConfirmPassword)} />
              <div className="flex items-center gap-4">
                <canvas ref={canvasRef} width={100} height={40} className="border border-gray-300 rounded-md" />
                <button type="button" onClick={generateCaptcha} className="text-sm text-blue-500 hover:underline">Refresh</button>
              </div>
              <FloatingInput label="Enter Captcha" name="captchaInput" value={formData.captchaInput} onChange={handleChange} />
              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(2)} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg">Back</button>
                <button type="submit" disabled={loading} className={`bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}>{loading ? "Signing up..." : "Sign Up"}</button>
              </div>
            </div>
          )}
        </form>

        <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default UserSignup;
