
import {
  BookOpen,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function RoleSelection({
  onStudent,
  onAdmin,
  onBack,
}) {
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col">
      {/* HEADER */}
      <header className="px-6 py-5 md:px-12">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-3 text-[#292929]"
        >
          <div className="w-11 h-11 bg-[#F5C96A] rounded-xl flex items-center justify-center">
            <BookOpen size={23} />
          </div>

          <span className="text-xl font-extrabold">
            BookNest
          </span>
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#FFF0C4] text-[#9B7528] px-4 py-2 rounded-full text-xs font-bold">
              WELCOME TO BOOKNEST
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold text-[#292929] mt-5">
              How would you like to sign in?
            </h1>

            <p className="text-[#85817B] mt-4">
              Select your account type to continue.
            </p>
          </div>

          {/* ROLE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* STUDENT */}
            <button
              type="button"
              onClick={onStudent}
              className="group bg-white border-2 border-[#EEEAE4] rounded-[28px] p-8 text-left hover:border-[#F5C96A] hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FFF0C4] rounded-2xl flex items-center justify-center mb-7">
                <GraduationCap
                  size={32}
                  className="text-[#A67C28]"
                />
              </div>

              <h2 className="text-2xl font-extrabold text-[#292929]">
                Student
              </h2>

              <p className="text-[#85817B] mt-3 leading-relaxed">
                Explore books, borrow from the library,
                track your loans, and manage your profile.
              </p>

              <div className="flex items-center justify-between mt-10">
                <span className="font-bold text-[#A67C28]">
                  Continue as Student
                </span>

                <ArrowRight
                  size={22}
                  className="text-[#A67C28] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </button>

            {/* ADMIN */}
            <button
              type="button"
              onClick={onAdmin}
              className="group bg-white border-2 border-[#EEEAE4] rounded-[28px] p-8 text-left hover:border-[#A9D7D0] hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#D8EDE8] rounded-2xl flex items-center justify-center mb-7">
                <ShieldCheck
                  size={32}
                  className="text-[#276C64]"
                />
              </div>

              <h2 className="text-2xl font-extrabold text-[#292929]">
                Administrator
              </h2>

              <p className="text-[#85817B] mt-3 leading-relaxed">
                Manage the library collection, categories,
                student records, and borrowing activity.
              </p>

              <div className="flex items-center justify-between mt-10">
                <span className="font-bold text-[#276C64]">
                  Continue as Admin
                </span>

                <ArrowRight
                  size={22}
                  className="text-[#276C64] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </button>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 mx-auto mt-10 text-sm font-semibold text-[#85817B] hover:text-[#292929]"
          >
            <ArrowLeft size={17} />
            Back to Home
          </button>
        </div>
      </main>

      <footer className="text-center text-xs text-[#A29A90] py-6">
        BookNest — Your Digital Library
      </footer>
    </div>
  );
}
