
import { BookOpen, ArrowLeft, LogIn, UserPlus } from "lucide-react";
import BookCatalogue from "./BookCatalogue";

export default function PublicLibrary({
  books = [],
  onHome,
  onLogin,
  onRegister,
  onViewDetails,
}) {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* PUBLIC NAVIGATION */}
      <header className="bg-white border-b border-[#EEEAE4]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onHome}
            className="flex items-center gap-3 text-[#292929]"
          >
            <div className="w-11 h-11 bg-[#F5C96A] rounded-xl flex items-center justify-center">
              <BookOpen size={23} />
            </div>

            <div className="text-left">
              <h1 className="text-xl font-extrabold">
                BookNest
              </h1>
              <p className="text-xs text-[#85817B]">
                Your Digital Library
              </p>
            </div>
          </button>

          <nav className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onHome}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#625B55] hover:text-[#292929]"
            >
              <ArrowLeft size={17} />
              Home
            </button>

            <button
              type="button"
              onClick={onLogin}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#EEEAE4] text-sm font-semibold text-[#292929] hover:bg-[#F7F5F0]"
            >
              <LogIn size={17} />
              Login
            </button>

            <button
              type="button"
              onClick={onRegister}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5C96A] text-sm font-semibold text-[#292929] hover:bg-[#E9B950]"
            >
              <UserPlus size={17} />
              Register
            </button>
          </nav>
        </div>
      </header>

      {/* VISITOR INFORMATION */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-8">
        <div className="bg-[#FFF4D6] border border-[#F3E1AE] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-[#292929]">
              Welcome to BookNest!
            </p>

            <p className="text-sm text-[#76694D] mt-1">
              Browse our library freely. Log in or create an
              account to borrow books and manage your loans.
            </p>
          </div>

          <button
            type="button"
            onClick={onLogin}
            className="shrink-0 bg-[#292929] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#444444] transition"
          >
            Sign In to Borrow
          </button>
        </div>
      </div>

      {/* REUSE EXISTING CATALOGUE */}
      <main className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        <BookCatalogue
          books={books}
          onViewDetails={onViewDetails}
        />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#EEEAE4] bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-[#292929]">
            BookNest
          </p>

          <p className="text-xs text-[#85817B]">
            Discover. Learn. Grow.
          </p>
        </div>
      </footer>
    </div>
  );
}

