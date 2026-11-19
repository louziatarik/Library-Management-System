
import { useState } from "react";
import {
  BookOpen,
  BookMarked,
  Clock3,
  CheckCircle2,
  CalendarDays,
  History,
  ArrowRight,
  Info
} from "lucide-react";

// Demo records until the backend is connected
const demoLoans = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    borrowedDate: "2026-11-10",
    dueDate: "2026-11-30",
    returnedDate: null,
    status: "Active",
    color: "#E7B7A4"
  },
  {
    id: 2,
    title: "Python Crash Course",
    author: "Eric Matthes",
    borrowedDate: "2026-11-12",
    dueDate: "2026-11-22",
    returnedDate: null,
    status: "Active",
    color: "#A9D7D0"
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    borrowedDate: "2026-11-08",
    dueDate: "2026-12-02",
    returnedDate: null,
    status: "Active",
    color: "#D8C5EA"
  },
  {
    id: 4,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    borrowedDate: "2026-10-15",
    dueDate: "2026-11-01",
    returnedDate: "2026-10-29",
    status: "Returned",
    color: "#F5C96A"
  },
  {
    id: 5,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    borrowedDate: "2026-10-10",
    dueDate: "2026-10-25",
    returnedDate: "2026-10-23",
    status: "Returned",
    color: "#C5D8B8"
  }
];

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function daysUntil(dateString) {
  const today = new Date();
  const todayUTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const [year, month, day] = dateString.split("-").map(Number);
  const dueUTC = Date.UTC(year, month - 1, day);

  return Math.round((dueUTC - todayUTC) / MS_PER_DAY);
}

function formatDate(dateString) {
  if (!dateString) return "—";

  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  );
}

function getLoanStatus(loan) {
  if (loan.status === "Returned") {
    return {
      label: "Returned",
      color: "#27816B",
      background: "#E9F4F0"
    };
  }

  const days = daysUntil(loan.dueDate);

  if (days < 0) {
    return {
      label: "Overdue",
      color: "#B94B45",
      background: "#FCE8E6"
    };
  }

  if (days <= 5) {
    return {
      label: "Due Soon",
      color: "#A46A20",
      background: "#FFF1D8"
    };
  }

  return {
    label: "Active",
    color: "#27816B",
    background: "#E9F4F0"
  };
}

export default function MyLoans() {
  const [filter, setFilter] = useState("All Loans");

  const activeLoans = demoLoans.filter(
    (loan) => loan.status === "Active"
  );

  const returnedLoans = demoLoans.filter(
    (loan) => loan.status === "Returned"
  );

  const dueSoonLoans = activeLoans.filter((loan) => {
    const days = daysUntil(loan.dueDate);
    return days >= 0 && days <= 5;
  });

  const overdueLoans = activeLoans.filter(
    (loan) => daysUntil(loan.dueDate) < 0
  );

  const filteredLoans = demoLoans.filter((loan) => {
    if (filter === "Active") return loan.status === "Active";
    if (filter === "Returned") return loan.status === "Returned";
    return true;
  });

  const stats = [
    {
      label: "Active Loans",
      value: activeLoans.length,
      icon: BookMarked,
      color: "#D8EDE8"
    },
    {
      label: "Due Soon",
      value: dueSoonLoans.length,
      icon: Clock3,
      color: "#F9E8B5"
    },
    {
      label: "Returned Books",
      value: returnedLoans.length,
      icon: CheckCircle2,
      color: "#F6D7D1"
    }
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <header>
        <p className="text-[#A29A90] text-sm font-medium">
          Student Library / Borrowing
        </p>

        <h1 className="text-3xl font-bold text-[#292929] mt-1">
          My Loans
        </h1>

        <p className="text-[#85817B] text-sm mt-2">
          Track your borrowed books, due dates, and reading history.
        </p>
      </header>

      {/* SUMMARY CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              style={{ backgroundColor: stat.color }}
              className="rounded-[24px] p-6 min-h-40 flex flex-col justify-between"
            >
              <div className="w-11 h-11 bg-white/50 rounded-xl flex items-center justify-center">
                <Icon size={22} className="text-[#292929]" />
              </div>

              <div className="mt-5">
                <h2 className="text-3xl font-extrabold text-[#292929]">
                  {stat.value}
                </h2>

                <p className="text-sm text-[#625B55] mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* LOAN ALERTS */}
      {(dueSoonLoans.length > 0 || overdueLoans.length > 0) && (
        <section className="bg-[#FFF1D8] rounded-[24px] p-5 flex items-start gap-4">
          <div className="w-11 h-11 bg-white/60 rounded-xl flex items-center justify-center shrink-0">
            <Clock3 size={22} className="text-[#A46A20]" />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#292929]">
              Return Date Reminder
            </h2>

            <p className="text-sm text-[#8A7048] mt-1 leading-relaxed">
              {overdueLoans.length > 0
                ? `You have ${overdueLoans.length} overdue book(s). Please check their return dates.`
                : `You have ${dueSoonLoans.length} book(s) due within the next 5 days.`}
            </p>
          </div>
        </section>
      )}

      {/* LOAN HISTORY */}
      <section className="bg-white border border-[#EEEAE4] rounded-[28px] p-5 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <div>
            <div className="flex items-center gap-2">
              <History size={22} className="text-[#292929]" />

              <h2 className="text-xl font-bold text-[#292929]">
                Borrowing History
              </h2>
            </div>

            <p className="text-sm text-[#85817B] mt-2">
              View your current and previous book loans.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All Loans", "Active", "Returned"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  filter === item
                    ? "bg-[#F5C96A] text-[#292929]"
                    : "bg-[#F7F5F0] text-[#85817B] hover:text-[#292929]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* LOAN CARDS */}
        <div className="space-y-4">
          {filteredLoans.map((loan) => {
            const status = getLoanStatus(loan);

            return (
              <article
                key={loan.id}
                className="border border-[#EEEAE4] rounded-[20px] p-4 md:p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-5">

                  {/* COVER */}
                  <div
                    style={{ backgroundColor: loan.color }}
                    className="w-20 h-24 rounded-xl flex items-center justify-center shrink-0"
                  >
                    <BookOpen size={32} className="text-[#292929]" />
                  </div>

                  {/* BOOK INFO */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#292929] text-base">
                      {loan.title}
                    </h3>

                    <p className="text-sm text-[#85817B] mt-1">
                      {loan.author}
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                      <span className="flex items-center gap-2 text-xs text-[#777D78]">
                        <CalendarDays size={15} />
                        Borrowed: {formatDate(loan.borrowedDate)}
                      </span>

                      <span className="flex items-center gap-2 text-xs text-[#777D78]">
                        <Clock3 size={15} />
                        Due: {formatDate(loan.dueDate)}
                      </span>

                      {loan.returnedDate && (
                        <span className="flex items-center gap-2 text-xs text-[#27816B]">
                          <CheckCircle2 size={15} />
                          Returned: {formatDate(loan.returnedDate)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="md:self-start">
                    <span
                      style={{
                        backgroundColor: status.background,
                        color: status.color
                      }}
                      className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold"
                    >
                      {status.label}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredLoans.length === 0 && (
          <div className="py-14 text-center">
            <BookOpen
              size={36}
              className="mx-auto text-[#AAA59D]"
            />

            <h3 className="font-bold text-[#292929] mt-4">
              No loans found
            </h3>

            <p className="text-sm text-[#85817B] mt-2">
              There are no records for this filter.
            </p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <div className="bg-[#E9F4F0] rounded-[20px] p-5 flex items-start gap-3">
        <Info size={20} className="text-[#276C64] shrink-0 mt-0.5" />

        <p className="text-sm text-[#55736C] leading-relaxed">
          This page currently displays demonstration loan records.
          Real borrowing history, return actions, and live due dates
          will be connected to the backend later.
        </p>
      </div>
    </div>
  );
}
