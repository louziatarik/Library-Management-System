import { useState } from "react";
import { ArrowLeft, BookOpen, Mail } from "lucide-react";

export default function ForgotPassword({ onSubmit, onBack }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await onSubmit(email.trim().toLowerCase());
      if (result?.error) {
        setError(result.error);
      } else {
        setSent(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
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
          Back to login
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
              <p className="text-xs text-[#898989]">Your digital library</p>
            </div>
          </div>

          {sent ? (
            <div className="py-4">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E7F2EC] text-[#123D30]">
                <Mail size={27} />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-[#123D30]">
                Check your email
              </h2>
              <p className="mb-6 text-sm leading-6 text-[#626262]">
                If an account exists with that email address, password reset instructions have been sent. Please check your inbox.
              </p>
              <button
                type="button"
                onClick={onBack}
                className="w-full rounded-xl bg-[#123D30] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B5543]"
              >
                Back to login
              </button>
            </div>
          ) : (
            <>
              <h2 className="mb-2 text-2xl font-bold text-[#123D30]">
                Forgot your password?
              </h2>
              <p className="mb-7 text-sm leading-6 text-[#777777]">
                Enter the email address linked to your BookNest account. We will send you instructions to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#292929]">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#898989]" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setError("");
                      }}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-[#E7E5DF] bg-[#FAF9F6] py-3.5 pl-12 pr-4 text-sm text-[#292929] outline-none transition-all focus:border-[#123D30] focus:ring-2 focus:ring-[#A9D7D0]/40"
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-[#123D30] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B5543] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send reset instructions"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
