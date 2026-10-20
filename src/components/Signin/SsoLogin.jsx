import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../../apiConfig";

function SsoLogin() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    const doSsoLogin = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/sso-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ transferToken: token }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || err.error || "SSO login failed");
        }

        const data = await res.json();

        // Store the same things you store after normal login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("id", String(data.id || ""));
        localStorage.setItem("name", data.name || "");
        localStorage.setItem("companyEmail", data.companyEmail || "");
        localStorage.setItem("role", data.role || "SHOPKEEPER");
        localStorage.setItem("email", data.email || "");
        localStorage.setItem("country", data.country || "");

        if (data.allowedApplications) {
          localStorage.setItem("allowedApplications", JSON.stringify(data.allowedApplications));
        }

        navigate("/shopkeeper/dashboard");
      } catch (err) {
        console.error(err);
        alert(err.message || "SSO failed. Please login normally.");
        navigate("/signin");
      }
    };

    doSsoLogin();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Logo / Brand */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl max-w-md w-full mx-auto">
          {/* Spinner */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-400 border-r-blue-400 animate-spin"></div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
            Signing you in
          </h1>
          <p className="text-indigo-200 text-sm mb-1">
            Securely transferring your session
          </p>
          <p className="text-indigo-300/70 text-xs">
            This will only take a moment...
          </p>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mt-8">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-8 text-indigo-300/50 text-xs">
          Powered by Interface Hub secure single sign-on
        </p>
      </div>
    </div>
  );
}

export default SsoLogin;