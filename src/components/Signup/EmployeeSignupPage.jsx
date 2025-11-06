import { useState, useEffect, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Confetti from "react-confetti";
import { Eye, EyeOff, Lock, Mail, RefreshCw, User, Smartphone, Puzzle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_BASE = 'https://loyalty-backend-java.onrender.com/api';

function UnderlineInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
  return (
    <div className="relative flex items-center w-full">
      <div className="flex items-center w-full h-12 border-b-2 border-gray-300 transition-all duration-300 focus-within:border-blue-600">
        {Icon && <Icon className="flex-shrink-0 ml-1 mr-3 h-5 w-5 text-gray-500 transition-colors duration-300 focus-within:text-blue-600" />}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          className="w-full h-full text-base text-gray-900 bg-transparent py-2 outline-none placeholder:text-gray-500"
          required
        />
        {ToggleIcon && (
          <button type="button" onClick={onToggle} className="flex-shrink-0 mr-1 text-gray-500 hover:text-blue-600 transition-colors duration-300">
            <ToggleIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function PhoneInputField({ label, value, onChange }) {
  const [error, setError] = useState("");
  const handleChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 10) input = input.slice(0, 10);
    if (input && input.length !== 10) {
      setError("Phone must be exactly 10 digits");
    } else {
      setError("");
    }
    onChange(input);
  };

  return (
    <div className="relative flex items-center w-full">
      <div className={`flex items-center w-full h-12 border-b-2 transition-all duration-300 ${error ? "border-red-500" : "border-gray-300 focus-within:border-blue-600"}`}>
        <Smartphone className={`flex-shrink-0 ml-1 mr-3 h-5 w-5 transition-colors duration-300 ${error ? "text-red-500" : "text-gray-500 focus-within:text-blue-600"}`} />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={label}
          maxLength={10}
          inputMode="numeric"
          className="w-full h-full text-base text-gray-900 bg-transparent py-2 outline-none placeholder:text-gray-500"
          required
        />
      </div>
      {error && <p className="absolute -bottom-6 mb-1 left-0 text-xs text-red-500">{error}</p>}
      {value.length === 10 && !error && (
        <p className="absolute -bottom-6 mb-1 left-0 text-xs text-green-600">Valid 10-digit number</p>
      )}
    </div>
  );
}

export default function EmployeeSignupPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phone: "", email: "", password: "", confirmPassword: "", captchaInput: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing invitation link.");
      return;
    }
    if (step === 3) generateCaptcha();
  }, [step, token]);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 5; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 100, 40);
      ctx.font = "bold 22px Arial";
      ctx.fillStyle = "#2563EB";
      ctx.save();
      ctx.translate(5, 30);
      ctx.rotate(-0.03 * Math.PI + Math.random() * 0.1 - 0.03);
      ctx.fillText(text, 0, 0);
      ctx.restore();
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 120, Math.random() * 40);
        ctx.lineTo(Math.random() * 120, Math.random() * 40);
        ctx.stroke();
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (formData.captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
      setError("Invalid CAPTCHA");
      generateCaptcha();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        token,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const res = await fetch(`${API_BASE}/employee/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = null;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        const msg = data?.message || "Signup failed";
        throw new Error(msg);
      }

      setSuccess(true);
      if (audioRef.current) audioRef.current.play();
      setTimeout(() => navigate("/signin"), 3000);

    } catch (err) {
      setError(err.message || "Something went wrong");
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.firstName.trim() || !formData.lastName.trim())) {
      setError("Please fill both names.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (step === 2) {
      if (!formData.phone.trim() || !formData.email.trim()) {
        setError("Phone and email required.");
        setTimeout(() => setError(""), 3000);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError("Invalid email.");
        setTimeout(() => setError(""), 3000);
        return;
      }
      if (formData.phone.replace(/\D/g, "").length !== 10) {
        setError("Phone must be 10 digits.");
        setTimeout(() => setError(""), 3000);
        return;
      }
    }
    setError("");
    setStep(prev => prev + 1);
  };

  const getProgress = () => (step / 3) * 100;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
          <h2 className="text-2xl font-bold text-red-700 mb-3">Invalid Link</h2>
          <p className="text-gray-600 mb-6">Contact your manager for a new invitation.</p>
          <button onClick={() => navigate("/")} className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px, 40px 40px",
        backgroundAttachment: "fixed",
      }}
    >
      {success && <Confetti recycle={false} numberOfPieces={300} />}

      <div className="w-full max-w-lg bg-white rounded-lg p-10 shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-emerald-600 text-center mb-3">
          Employee Signup
        </h2>
        <p className="text-center text-gray-500 mb-6">Step {step} of 3</p>

        <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
          <div className="h-full bg-gradient-to-r from-green-500 to-blue-600 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${getProgress()}%` }}></div>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4 animate-pulse border border-red-200 bg-red-50 p-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <div className="space-y-8">
              <UnderlineInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} Icon={User} />
              <UnderlineInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} Icon={User} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="relative">
                <PhoneInputField label="Phone Number (10 digits)" value={formData.phone} onChange={handlePhoneChange} />
              </div>
              <div className="relative">
                <UnderlineInput
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  Icon={Mail}
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2 group cursor-pointer">
                  <FaInfoCircle className="text-gray-500 cursor-pointer" />
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg z-50">
                      <p>This email should match the invitation sent by</p>
                      <p>the shopkeeper for employee registration.</p>
                    </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <UnderlineInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                Icon={Lock}
                ToggleIcon={showPassword ? EyeOff : Eye}
                onToggle={() => setShowPassword(!showPassword)}
              />
              <UnderlineInput
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                Icon={Lock}
                ToggleIcon={showConfirmPassword ? EyeOff : Eye}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              <div className="flex items-end space-x-4 pt-2">
                <div className="flex-grow">
                  <UnderlineInput label="Enter Captcha" name="captchaInput" value={formData.captchaInput} onChange={handleChange} Icon={Puzzle} />
                </div>
                <div className="flex-shrink-0 w-24 h-10 bg-gray-100 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center">
                  <canvas ref={canvasRef} width={100} height={40} className="w-full h-full" />
                </div>
                <button type="button" onClick={generateCaptcha}
                  className="flex-shrink-0 w-10 h-10 text-gray-500 hover:text-blue-600 transition-colors duration-200 border border-gray-300 rounded-md flex items-center justify-center">
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 text-lg
                  ${loading ? "opacity-60 cursor-not-allowed" : "hover:from-green-600 hover:to-blue-700 active:scale-[0.99]"}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : "Complete Signup"}
              </button>
            </div>
          )}
        </form>

        <div className="mt-8 space-y-3">
          {step < 3 && (
            <button type="button" onClick={nextStep}
              className="w-full py-3 font-bold rounded-lg shadow-lg transition-all duration-300 text-lg bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:from-emerald-600 hover:to-blue-700 active:scale-[0.99]">
              Next
            </button>
          )}
          {step > 1 && step < 4 && (
            <button type="button" onClick={() => setStep(prev => prev - 1)}
              className="w-full py-3 bg-gray-200 hover:bg-gray-300 active:scale-[0.99] text-gray-700 font-semibold rounded-lg transition-all duration-300">
              Back
            </button>
          )}
        </div>

        <div className="text-center mt-8 text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <button onClick={() => navigate("/signin")} className="text-blue-600 hover:text-blue-700 font-bold hover:underline">
            Login
          </button>
        </div>

        <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />
      </div>
    </div>
  );
}