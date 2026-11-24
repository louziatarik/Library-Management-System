
import {
  BookOpen,
  BookMarked,
  Users,
  AlertCircle,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  Library,
  Info
} from "lucide-react";

const stats = [
  {
    title: "Total Books",
    value: 248,
    icon: BookOpen,
    background: "#D8EDE8"
  },
  {
    title: "Active Loans",
    value: 32,
    icon: BookMarked,
    background: "#F9E8B5"
  },
  {
    title: "Registered Students",
    value: 124,
    icon: Users,
    background: "#DDD4F1"
  },
  {
    title: "Overdue Loans",
    value: 4,
    icon: AlertCircle,
    background: "#F6D7D1"
  }
];

const recentActivity = [
  {
    id: 1,
    book: "Clean Code",
    student: "Student 001",
    date: "2026-11-18",
    status: "Borrowed"
  },
  {
    id: 2,
    book: "Python Crash Course",
    student: "Student 002",
    date: "2026-11-17",
    status: "Returned"
  },
  {
    id: 3,
    book: "The Pragmatic Programmer",
    student: "Student 003",
    date: "2026-11-16",
    status: "Borrowed"
  },
  {
    id: 4,
    book: "Introduction to Algorithms",
    student: "Student 004",
    date: "2026-11-15",
    status: "Returned"
  }
];

const categories = [
  { name: "Programming", count: 78, color: "#A9D7D0" },
  { name: "Computer Science", count: 65, color: "#F5C96A" },
  { name: "Software Engineering", count: 58, color: "#E8A6A1" },
  { name: "Other Categories", count: 47, color: "#D8C5EA" }
];

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric"
    }
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[#A29A90] text-sm font-medium">
            Administration / Overview
          </p>

          <h1 className="text-3xl font-bold text-[#292929] mt-1">
            Admin Dashboard
          </h1>

          <p className="text-[#85817B] text-sm mt-2">
            Monitor library activity and manage your collection.
          </p>
        </div>

        <div className="w-14 h-14 bg-[#F5C96A] rounded-2xl flex items-center justify-center">
          <ShieldCheck size={27} className="text-[#292929]" />
        </div>
      </header>

      {/* WELCOME BANNER */}
      <section className="bg-[#F5C96A] rounded-[28px] p-7 md:p-9 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center gap-2 bg-white/40 rounded-full px-3 py-1.5 text-xs font-bold text-[#594A2C]">
            <ShieldCheck size={15} />
            LIBRARY ADMINISTRATION
          </span>

          <h2 className="text-3xl font-extrabold text-[#292929] mt-5 leading-tight">
            Your library,
            <br />
            all in one place.
          </h2>

          <p className="text-[#594A2C] text-sm mt-4 leading-relaxed">
            Review book inventory, borrowing activity,
            and student membership information.
          </p>
        </div>

        <div className="absolute -right-12 -top-20 w-72 h-72 rounded-full bg-white/25" />
        <div className="absolute right-16 -bottom-24 w-56 h-56 rounded-full bg-[#E8A6A1]/60" />
      </section>

      {/* STATISTICS */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#292929]">
            Library Overview
          </h2>

          <span className="text-xs text-[#A29A90]">
            Demo statistics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                style={{ backgroundColor: stat.background }}
                className="rounded-[24px] p-6 min-h-44 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 bg-white/50 rounded-xl flex items-center justify-center">
                    <Icon size={23} className="text-[#292929]" />
                  </div>

                  <ArrowUpRight size={19} className="text-[#625B55]" />
                </div>

                <div className="mt-5">
                  <h3 className="text-3xl font-extrabold text-[#292929]">
                    {stat.value}
                  </h3>

                  <p className="text-sm text-[#625B55] mt-1">
                    {stat.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ACTIVITY & CATEGORIES */}
      <section className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-6">

        {/* RECENT ACTIVITY */}
        <div className="bg-white border border-[#EEEAE4] rounded-[28px] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-[#E9F4F0] rounded-xl flex items-center justify-center">
              <Clock3 size={22} className="text-[#276C64]" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#292929]">
                Recent Loan Activity
              </h2>

              <p className="text-xs text-[#85817B] mt-1">
                Latest borrowing and return records
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-wrap sm:flex-nowrap items-center gap-4 border-b border-[#EEEAE4] pb-4 last:border-0 last:pb-0"
              >
                <div className="w-12 h-14 bg-[#F7F5F0] rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen size={23} className="text-[#625B55]" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#292929]">
                    {activity.book}
                  </h3>

                  <p className="text-xs text-[#85817B] mt-1">
                    {activity.student} · {formatDate(activity.date)}
                  </p>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold ${
                    activity.status === "Returned"
                      ? "bg-[#E9F4F0] text-[#27816B]"
                      : "bg-[#FFF1D8] text-[#A46A20]"
                  }`}
                >
                  {activity.status === "Returned" ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <BookMarked size={14} />
                  )}

                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY OVERVIEW */}
        <div className="bg-white border border-[#EEEAE4] rounded-[28px] p-6">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 bg-[#F9E8B5] rounded-xl flex items-center justify-center">
              <Library size={22} className="text-[#87651F]" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#292929]">
                Book Categories
              </h2>

              <p className="text-xs text-[#85817B] mt-1">
                Collection distribution
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-[#625B55]">
                    {category.name}
                  </span>

                  <span className="text-sm font-bold text-[#292929]">
                    {category.count}
                  </span>
                </div>

                <div className="h-2.5 bg-[#F2F0EA] rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${(category.count / 248) * 100}%`,
                      backgroundColor: category.color
                    }}
                    className="h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <h2 className="text-xl font-bold text-[#292929] mb-5">
          Administration Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "Manage Books",
              description: "Add, edit, and organize the library collection.",
              icon: BookOpen,
              color: "#D8EDE8"
            },
            {
              title: "Manage Loans",
              description: "Review borrowing records and book returns.",
              icon: BookMarked,
              color: "#F9E8B5"
            },
            {
              title: "Manage Students",
              description: "View registered library members.",
              icon: Users,
              color: "#F6D7D1"
            }
          ].map((module) => {
            const Icon = module.icon;

            return (
              <div
                key={module.title}
                className="bg-white border border-[#EEEAE4] rounded-[24px] p-6"
              >
                <div
                  style={{ backgroundColor: module.color }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                >
                  <Icon size={23} className="text-[#292929]" />
                </div>

                <h3 className="text-lg font-bold text-[#292929] mt-5">
                  {module.title}
                </h3>

                <p className="text-sm text-[#85817B] mt-2 leading-relaxed">
                  {module.description}
                </p>

                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#A29A90] mt-5">
                  Coming Soon
                  <ArrowRight size={15} />
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROTOTYPE NOTICE */}
      <div className="bg-[#E9F4F0] rounded-[20px] p-5 flex items-start gap-3">
        <Info size={20} className="text-[#276C64] shrink-0 mt-0.5" />

        <p className="text-sm text-[#55736C] leading-relaxed">
          This administration dashboard currently uses demonstration
          data. Real library statistics and management features will
          be connected to the backend after authentication and
          administrator permissions are implemented.
        </p>
      </div>
    </div>
  );
}
