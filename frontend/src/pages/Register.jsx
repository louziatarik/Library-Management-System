
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function Register({
  role = "student",
  onRegister,
  onLogin,
  onBack,
}) {
  const isAdmin = role === "admin";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const accent = isAdmin ? "#B7791F" : "#123D30";
  const accentHover = isAdmin ? "#925F18" : "#1C5846";

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please complete all fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (typeof onRegister !== "function") {
      setError("Registration is currently unavailable.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await onRegister({
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: isAdmin ? "admin" : "student",
      });

      if (result?.error) {
        setError(result.error);
      } else if (isAdmin) {
        // The backend must save this as PENDING,
        // not as an active administrator account.
        setSubmitted(true);
      }
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#E7E5DF] bg-[#FAF9F6] py-3.5 pl-12 pr-4 text-sm text-[#292929] outline-none transition-all focus:border-[#B7791F] focus:ring-2 focus:ring-[#F5C96A]/30";

  if (submitted && isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5F0] px-5">
        <div className="w-full max-w-md rounded-[28px] border border-[#EEEAE4] bg-white p-10 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF3D6]">
            <Clock3 size={30} className="text-[#B7791F]" />
          </div>

          <h1 className="text-2xl font-bold text-[#292929]">
            Registration Submitted
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#777777]">
            Your administrator registration request has been submitted.
            Your account will require approval from an authorized
            administrator before you can access the admin dashboard.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-8 w-full rounded-xl bg-[#B7791F] py-3.5 font-semibold text-white hover:bg-[#925F18]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F5F0] px-5 py-12">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#F5C96A]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#A9D7D0]/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <button
          type="button"
          onClick={onBack}
          className="mb-7 flex items-center gap-2 text-sm text-[#626262] hover:text-[#123D30]"
        >
          <ArrowLeft size={17} />
          Back to home
        </button>

        <div className="rounded-[28px] border border-[#EEEAE4] bg-white p-8 shadow-xl shadow-[#123D30]/5 sm:p-10">
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
              <UserRound size={15} />
            )}
            {isAdmin ? "Administrator" : "Student"}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#292929]">
            {isAdmin
              ? "Administrator Registration"
              : "Create your account"}
          </h2>

          <p className="mb-8 mt-2 text-sm text-[#777777]">
            {isAdmin
              ? "Request an administrator account for BookNest."
              : "Join BookNest and start exploring your library."}
          </p>

          {isAdmin && (
            <div className="mb-7 flex gap-3 rounded-xl border border-[#F5DFA8] bg-[#FFF9E9] p-4">
              <Clock3
                size={19}
                className="mt-0.5 shrink-0 text-[#B7791F]"
              />
              <div>
                <p className="text-sm font-semibold text-[#925F18]">
                  Approval Required
                </p>
                <p className="mt-1 text-xs leading-5 text-[#866B3D]">
                  Administrator registration requests must be
                  approved before admin access is granted.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="register-name"
                className="mb-2 block text-sm font-semibold text-[#292929]"
              >
                Full name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#929292]"
                />
                <input
                  id="register-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-email"
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
                  id="register-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@university.edu"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-password"
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
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#929292]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="register-confirm-password"
                className="mb-2 block text-sm font-semibold text-[#292929]"
              >
                Confirm password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#929292]"
                />
                <input
                  id="register-confirm-password"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  required
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={(event) =>
                    updateField(
                      "confirmPassword",
                      event.target.value
                    )
                  }
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((value) => !value)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmation password"
                      : "Show confirmation password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#929292]"
                >
                  {showConfirmPassword ? (
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
              style={{
                backgroundColor: accent,
              }}
              className="w-full rounded-xl py-3.5 font-semibold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Submitting..."
                : isAdmin
                ? "Request Administrator Account"
                : "Create Account"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#777777]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onLogin}
              style={{ color: accent }}
              className="font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-[#929292]">
          BookNest Library Management System
        </p>
      </div>
    </div>
  );
}
