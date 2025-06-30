import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { Eye, EyeOff, Lock, Mail, Phone } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


function FloatingInput({ label, name, value, onChange, type = "text", Icon, ToggleIcon, onToggle }) {
  return (
    <div className="relative border border-purple-400 rounded-sm px-2 pt-2 mb-4 w-full group focus-within:border-2 focus-within:border-purple-600">
      <label
        htmlFor={name}
        className="absolute -top-2 left-2 bg-white px-1 text-sm text-purple-600 group-focus-within:text-purple-800 transition-all"
      >
        {label}
      </label>
      {Icon && <Icon className="absolute left-3 top-3 h-5 w-5 text-purple-400" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="w-full px-10 py-3 text-lg text-gray-900 bg-transparent focus:outline-none"
        required
      />
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

function User() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    captchaInput: "",
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
  if (step === 3) {
    generateCaptcha(); // No need for canvasRef check or timeout
  }
}, [step]);

  const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
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
      const response = await fetch("https://loyalty-backend-java.onrender.com/api/auth/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phoneNumber,
          email: formData.email,
          password: formData.password,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      {success && <Confetti recycle={false} numberOfPieces={300} />}

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">User Sign Up</h2>
        <p className="text-center text-gray-600 mb-4">Step {step} of 3</p>
        <div className="w-full h-2 bg-gray-300 rounded-full mb-6">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>
        {error && <p className="text-red-500 text-sm text-center mb-4 animate-pulse">⚠️ {error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <>
              <FloatingInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} Icon={Mail} />
              <FloatingInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} Icon={Mail} />
              <NextButton onClick={nextStep} />
            </>
          )}

          {step === 2 && (
            <>
              <div className="relative border border-purple-400 rounded-sm px-2 pt-2 mb-4 w-full group focus-within:border-2 focus-within:border-purple-600">
  <label className="absolute -top-2 left-2 bg-white px-1 text-sm text-purple-600 group-focus-within:text-purple-800 transition-all">
    Phone Number
  </label>

  <PhoneInput
    country={"in"}
    enableSearch
    value={formData.phoneNumber}
    onChange={(phone) =>
      setFormData((prev) => ({ ...prev, phoneNumber: phone }))
    }
    inputProps={{
      name: "phoneNumber",
      required: true,
    }}
    inputClass="!w-full !h-10 !pl-16 !pr-4 !bg-transparent !text-gray-900 !focus:outline-none !border-none"
    buttonClass="!h-10 !rounded-l-sm"
    containerClass="!w-full"
  />
</div>

              <FloatingInput label="Email" name="email" value={formData.email} onChange={handleChange} Icon={Mail} />
              <NextButton onClick={nextStep} />
            </>
          )}

          {step === 3 && (
            <>
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
              <div className="flex items-center justify-between bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg">
                <span className="text-lg font-semibold tracking-widest text-gray-600 select-none">{captchaText}</span>
                <button type="button" onClick={generateCaptcha} className="text-sm text-blue-500 hover:underline">
                  Refresh Captcha
                </button>
              </div>
              <FloatingInput label="Enter Captcha" name="captchaInput" value={formData.captchaInput} onChange={handleChange} />
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center bg-purple-600 text-white py-3 text-lg rounded-xl transition duration-200 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"}`}
              >
                {loading ? "Signing up..." : "Submit"}
              </button>
            </>
          )}
        </form>

        {step > 1 && step < 4 && (
          <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            className="w-full mt-2 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl transition"
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
      className="w-full py-3 mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
    >
      Next
    </button>
  );
}

export default User;
