import React, { useState } from "react";

const Signin= () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captcha: "",
  });

  const [error, setError] = useState("");
  const [captchaText] = useState(() => {
    // Simple captcha string generator (for demo purposes)
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.captcha !== captchaText) {
      setError("Invalid captcha. Please try again.");
      return;
    }

    setError("");
    console.log("Sign in data:", formData);
    // Perform sign-in logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign In
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />

          {/* Captcha Display */}
          <div className="flex items-center justify-between bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg">
            <span className="text-lg font-semibold tracking-widest text-gray-600 select-none">
              {captchaText}
            </span>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="text-sm text-blue-500 hover:underline"
            >
              Refresh
            </button>
          </div>

          {/* Captcha Input */}
          <input
            type="text"
            name="captcha"
            placeholder="Enter Captcha"
            value={formData.captcha}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>




  );
};

export default Signin;
