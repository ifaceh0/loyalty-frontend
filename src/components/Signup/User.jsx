import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";

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
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
  if (step === 3) {
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        generateCaptcha();
      }
    }, 100); // slight delay ensures canvas is rendered

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
      const response = await fetch("https://loyalty-backend-java.onrender.com/api/login/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
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
    setStep((prev) => prev + 1);
  };

  const getProgress = () => {
    return (step / 3) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4 relative">
      {success && <Confetti recycle={false} numberOfPieces={300} />}

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">User Sign Up</h2>
        <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
          <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${getProgress()}%` }}></div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4 text-center animate-pulse">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center animate-bounce">✅ Sign up as user successful!</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              <div className="relative">
                <input name="firstName" value={formData.firstName} onChange={handleChange} className="input peer" required />
                <label className="floating-label">First Name</label>
              </div>
              <div className="relative">
                <input name="lastName" value={formData.lastName} onChange={handleChange} className="input peer" required />
                <label className="floating-label">Last Name</label>
              </div>
              <button type="button" onClick={nextStep} className="col-span-2 bg-blue-500 text-white rounded py-2 hover:bg-blue-600">Next</button>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 gap-4 animate-fade-in">
              <div className="relative">
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="input peer" required />
                <label className="floating-label">Phone Number</label>
              </div>
              <div className="relative">
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input peer" required />
                <label className="floating-label">Email</label>
              </div>
              <button type="button" onClick={nextStep} className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600">Next</button>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 gap-4 animate-fade-in">
              <div className="relative">
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="input peer" required />
                <label className="floating-label">Password</label>
              </div>
              <div className="relative">
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input peer" required />
                <label className="floating-label">Confirm Password</label>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <canvas ref={canvasRef} width={100} height={40} className="border border-gray-300 rounded" />
                <button type="button" onClick={generateCaptcha} className="text-sm text-blue-500 hover:underline">Refresh Captcha</button>
              </div>
              <div className="relative">
                <input type="text" name="captchaInput" value={formData.captchaInput} onChange={handleChange} className="input peer" required />
                <label className="floating-label">Enter Captcha</label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center bg-purple-600 text-white py-2 rounded-lg transition duration-200 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"}`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"></path></svg>
                    Signing in...
                  </span>
                ) : "Sign Up"}
              </button>
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
          font-size: 0.75rem;
          color: #6B46C1;
          background: white;
          padding: 0 4px;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default User;
