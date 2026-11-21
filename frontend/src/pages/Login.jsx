
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

export default function Login({
  role = "student",
  onLogin,
  onRegister,
  onBack,
}) {
  const isAdmin = role === "admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const accent = isAdmin ? "#B7791F" : "#123D30";

  const inputClass = `w-full rounded-xl border border-[#E7E5DF] bg-[#FAF9F6]
    py-3.5 pl-12 pr-4 text-sm text-[#292929] outline-none
    transition-all ${
      isAdmin
        ? "focus:border-[#B7791F] focus:ring-2 focus:ring-[#F5C96A]/30"
        : "focus:border-[#123D30] focus:ring-2 focus:ring-[#A9D7D0]/40"
    }`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (typeof onLogin !== "function") {
      setError("Sign in is currently unavailable.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await onLogin({
        email: email.trim().toLowerCase(),
        password,
        role: isAdmin ? "admin" : "student",
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F5F0] px-5 py-12">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#F5C96A]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#A9D7D0]/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <button
          type="button"
          onClick={onBack}
          className="mb-7 flex items-center gap-2 text-sm text-[#626262] transition-colors hover:text-[#123D30]"
        >
          <ArrowLeft size={17} />
          Back to account selection
        </button>

        <div className="rounded-[28px] border border-[#EEEAE4] bg-white p-8 shadow-xl shadow-[#123D30]/5 sm:p-10">
          {/* LOGO */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123D30]">
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

          {/* ACCOUNT TYPE */}
          <div
            className={`mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
              isAdmin
                ? "bg-[#FFF3D6] text-[#925F18]"
                : "bg-[#E7F2EC] text-[#123D30]"
            }`}
          >
            {isAdmin ? (
              <ShieldCheck size={15} />
            ) : (
              <GraduationCap size={15} />
            )}

            {isAdmin ? "Administrator Account" : "Student Account"}
          </div>

          {/* HEADING */}
          <h2 className="text-3xl font-bold tracking-tight text-[#292929]">
            {isAdmin ? "Administrator Sign In" : "Student Sign In"}
          </h2>

          <p className="mb-8 mt-2 text-sm leading-6 text-[#777777]">
            {isAdmin
              ? "Welcome back! Sign in to manage books, students, loans, and library operations."
              : "Welcome back! Sign in to explore books, manage your loans, and access your library dashboard."}
          </p>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-semibold text-[#292929]"
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
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-semibold text-[#292929]"
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
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#929292] hover:text-[#123D30]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
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
              disabled={submitting}
              style={{ backgroundColor: accent }}
              className="w-full rounded-xl py-3.5 font-semibold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Signing In..."
                : isAdmin
                  ? "Sign In as Administrator"
                  : "Sign In as Student"}
            </button>
          </form>

          {/* REGISTRATION */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#EEEAE4]" />
            <span className="text-xs text-[#A0A0A0]">
              NEW TO BOOKNEST?
            </span>
            <div className="h-px flex-1 bg-[#EEEAE4]" />
          </div>

          <button
            type="button"
            onClick={onRegister}
            className={`w-full rounded-xl border border-[#E7E5DF] bg-[#F7F5F0] py-3.5 font-semibold transition-colors ${
              isAdmin
                ? "text-[#925F18] hover:bg-[#FFF3D6]"
                : "text-[#123D30] hover:bg-[#E7F2EC]"
            }`}
          >
            Create an account
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-[#929292]">
          BookNest Library Management System
        </p>
      </div>
    </div>
  );
}
