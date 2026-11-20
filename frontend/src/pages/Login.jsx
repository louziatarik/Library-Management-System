
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

export default function Login({ onLogin, onRegister, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
  event.preventDefault();
  setError("");

  if (!email.trim() || !password) {
    setError("Please enter your email and password.");
    return;
  }

  if (typeof onLogin === "function") {
    try {
      const result = await onLogin({
        email: email.trim().toLowerCase(),
        password,
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch {
      setError("Login failed. Please try again.");
    }
  }
};
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-5 py-12 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F5C96A]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#A9D7D0]/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#626262] hover:text-[#123D30] mb-7 transition-colors"
        >
          <ArrowLeft size={17} />
          Back to home
        </button>

        <div className="bg-white rounded-[28px] border border-[#EEEAE4] shadow-xl shadow-[#123D30]/5 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-9">
            <div className="w-12 h-12 rounded-2xl bg-[#123D30] flex items-center justify-center">
              <BookOpen className="text-[#F5C96A]" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-[#123D30]">
                BOOKNEST
              </h1>
              <p className="text-xs text-[#898989]">
                Your digital library
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#292929]">
            Welcome back
          </h2>
          <p className="text-[#777777] mt-2 mb-8 text-sm">
            Sign in to continue your reading journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-semibold text-[#292929] mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#929292]"
                />
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-[#E7E5DF] bg-[#FAF9F6] py-3.5 pl-12 pr-4 text-sm text-[#292929] outline-none focus:border-[#123D30] focus:ring-2 focus:ring-[#A9D7D0]/40 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-semibold text-[#292929] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#929292]"
                />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-[#E7E5DF] bg-[#FAF9F6] py-3.5 pl-12 pr-12 text-sm text-[#292929] outline-none focus:border-[#123D30] focus:ring-2 focus:ring-[#A9D7D0]/40 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#929292] hover:text-[#123D30]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#123D30] text-white font-semibold py-3.5 hover:bg-[#1C5846] transition-colors shadow-lg shadow-[#123D30]/10"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center gap-4 my-7">
            <div className="h-px bg-[#EEEAE4] flex-1" />
            <span className="text-xs text-[#A0A0A0]">
              NEW TO BOOKNEST?
            </span>
            <div className="h-px bg-[#EEEAE4] flex-1" />
          </div>

          <button
            type="button"
            onClick={onRegister}
            className="w-full rounded-xl border border-[#E7E5DF] bg-[#F7F5F0] text-[#123D30] font-semibold py-3.5 hover:bg-[#F5C96A] transition-colors"
          >
            Create an account
          </button>
        </div>

        <p className="text-center text-xs text-[#929292] mt-6">
          BookNest Library Management System
        </p>
      </div>
    </div>
  );
}
