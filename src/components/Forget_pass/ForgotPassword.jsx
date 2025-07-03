import React, { useState } from "react";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("https://loyalty-backend-java.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text || "Something went wrong");
      setMessage(text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-100 to-blue-100 flex items-center justify-center px-4 font-['Inter']">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-lg border border-purple-200 rounded-3xl p-8 shadow-2xl animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-6">Enter your registered email to receive a reset link.</p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4 animate-pulse">
            ⚠️ {error}
          </p>
        )}
        {message && (
          <p className="text-green-600 text-sm text-center mb-4">
            ✅ {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative border border-purple-400 rounded-lg px-3 pt-4 pb-2 bg-white shadow-sm group focus-within:ring-2 focus-within:ring-purple-500 transition">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-purple-600">
              Email
            </label>
            <Mail className="absolute left-3 top-4 h-5 w-5 text-purple-400" />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-5 pl-10 pr-4 py-2 text-gray-900 bg-transparent focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 py-2 text-lg rounded-xl font-semibold text-white transition shadow ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 11-8 8z"
                ></path>
              </svg>
            )}
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

