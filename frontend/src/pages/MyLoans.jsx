
import { useState } from "react";
import {
  BookOpen,
  BookMarked,
  Clock3,
  CheckCircle2,
  CalendarDays,
  History,
  Info,
} from "lucide-react";

import { books } from "../data/books";

// ----------------------------------
// TEMPORARY DEMO LOANS
// ----------------------------------
// Used only when no loans prop is provided.
// App.jsx currently passes shared loan state.

const demoLoans = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    borrowedDate: "2026-11-10",
    dueDate: "2026-11-30",
    returnedDate: null,
    status: "Active",
    color: "#E7B7A4",
  },
  {
    id: 2,
    title: "Python Crash Course",
    author: "Eric Matthes",
    borrowedDate: "2026-11-12",
    dueDate: "2026-11-22",
    returnedDate: null,
    status: "Active",
    color: "#A9D7D0",
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    borrowedDate: "2026-11-08",
    dueDate: "2026-12-02",
    returnedDate: null,
    status: "Active",
    color: "#D8C5EA",
  },
  {
    id: 4,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    borrowedDate: "2026-10-15",
    dueDate: "2026-11-01",
    returnedDate: "2026-10-29",
    status: "Returned",
    color: "#F5C96A",
  },
  {
    id: 5,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    borrowedDate: "2026-10-10",
    dueDate: "2026-10-25",
    returnedDate: "2026-10-23",
    status: "Returned",
    color: "#C5D8B8",
  },
];

// ----------------------------------
// REAL BOOK COVER COMPONENT
// ----------------------------------

function LoanBookCover({ loan }) {
  const [imageFailed, setImageFailed] = useState(false);

  // Find the matching book using ID or title.
  const matchingBook = books.find(
    (book) =>
      (loan.bookId != null &&
        String(book.id) === String(loan.bookId)) ||
      book.title.trim().toLowerCase() ===
        String(loan.title || "").trim().toLowerCase()
  );

  const isbn = loan.isbn || matchingBook?.isbn;

  const coverUrl =
    loan.cover ||
    matchingBook?.cover ||
    (isbn
      ? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`
      : null);

  return (
    <div
      style={{
        backgroundColor: loan.color || "#A9D7D0",
      }}
      className="flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl p-2"
    >
      {coverUrl && !imageFailed ? (
        <img
          src={coverUrl}
          alt={`Cover of ${loan.title}`}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="max-h-full max-w-full object-contain rounded-sm shadow-md"
        />
      ) : (
        <BookOpen
          size={32}
          className="text-[#292929]"
        />
      )}
    </div>
  );
}

// ----------------------------------
// DATE HELPERS
// ----------------------------------

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function daysUntil(dateString) {
  if (!dateString) return 0;

  const today = new Date();

  const todayUTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  const dueUTC = Date.UTC(
    year,
    month - 1,
    day
  );

  return Math.round(
    (dueUTC - todayUTC) / MS_PER_DAY
  );
}

function formatDate(dateString) {
  if (!dateString) return "—";

  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  return new Date(
    year,
    month - 1,
    day
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ----------------------------------
// LOAN STATUS
// ----------------------------------

function getLoanStatus(loan) {
  if (loan.status === "Returned") {
    return {
      label: "Returned",
      color: "#27816B",
      background: "#E9F4F0",
    };
  }

  const days = daysUntil(loan.dueDate);

  if (days < 0) {
    return {
      label: "Overdue",
      color: "#B94B45",
      background: "#FCE8E6",
    };
  }

  if (days <= 5) {
    return {
      label: "Due Soon",
      color: "#A46A20",
      background: "#FFF1D8",
    };
  }

  return {
    label: "Active",
    color: "#27816B",
    background: "#E9F4F0",
  };
}

// ----------------------------------
// MY LOANS PAGE
// ----------------------------------

export default function MyLoans({
  loans = demoLoans,
  onReturn,
}) {
  const [filter, setFilter] = useState("All Loans");

  // ----------------------------------
  // LOAN STATISTICS
  // ----------------------------------

  const activeLoans = loans.filter(
    (loan) => loan.status === "Active"
  );

  const returnedLoans = loans.filter(
    (loan) => loan.status === "Returned"
  );

  const dueSoonLoans = activeLoans.filter(
    (loan) => {
      const days = daysUntil(loan.dueDate);
      return days >= 0 && days <= 5;
    }
  );

  const overdueLoans = activeLoans.filter(
    (loan) => daysUntil(loan.dueDate) < 0
  );

  // ----------------------------------
  // FILTER LOANS
  // ----------------------------------

  const filteredLoans = loans.filter((loan) => {
    if (filter === "Active") {
      return loan.status === "Active";
    }

    if (filter === "Returned") {
      return loan.status === "Returned";
    }

    return true;
  });

  const stats = [
    {
      label: "Active Loans",
      value: activeLoans.length,
      icon: BookMarked,
      color: "#D8EDE8",
    },
    {
      label: "Due Soon",
      value: dueSoonLoans.length,
      icon: Clock3,
      color: "#F9E8B5",
    },
    {
      label: "Returned Books",
      value: returnedLoans.length,
      icon: CheckCircle2,
      color: "#F6D7D1",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <header>
        <p className="text-sm font-medium text-[#A29A90]">
          Student Library / Borrowing
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#292929]">
          My Loans
        </h1>

        <p className="mt-2 text-sm text-[#85817B]">
          Track your borrowed books, due dates,
          and reading history.
        </p>
      </header>

      {/* SUMMARY CARDS */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              style={{
                backgroundColor: stat.color,
              }}
              className="flex min-h-40 flex-col justify-between rounded-[24px] p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/50">
                <Icon
                  size={22}
                  className="text-[#292929]"
                />
              </div>

              <div className="mt-5">
                <h2 className="text-3xl font-extrabold text-[#292929]">
                  {stat.value}
                </h2>

                <p className="mt-1 text-sm text-[#625B55]">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* LOAN ALERTS */}
      {(dueSoonLoans.length > 0 ||
        overdueLoans.length > 0) && (
        <section className="flex items-start gap-4 rounded-[24px] bg-[#FFF1D8] p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/60">
            <Clock3
              size={22}
              className="text-[#A46A20]"
            />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#292929]">
              Return Date Reminder
            </h2>

            <p className="mt-1 text-sm leading-relaxed text-[#8A7048]">
              {overdueLoans.length > 0
                ? `You have ${overdueLoans.length} overdue book(s). Please check their return dates.`
                : `You have ${dueSoonLoans.length} book(s) due within the next 5 days.`}
            </p>
          </div>
        </section>
      )}

      {/* LOAN HISTORY */}
      <section className="rounded-[28px] border border-[#EEEAE4] bg-white p-5 md:p-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <History
                size={22}
                className="text-[#292929]"
              />

              <h2 className="text-xl font-bold text-[#292929]">
                Borrowing History
              </h2>
            </div>

            <p className="mt-2 text-sm text-[#85817B]">
              View your current and previous book loans.
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-2">
            {[
              "All Loans",
              "Active",
              "Returned",
            ].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
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
                className="rounded-[20px] border border-[#EEEAE4] p-4 md:p-5"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                  {/* REAL BOOK COVER */}
                  <LoanBookCover
                    key={`${loan.id}-${loan.cover || loan.isbn || loan.bookId || loan.title}`}
                    loan={loan}
                  />

                  {/* BOOK INFORMATION */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-[#292929]">
                      {loan.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#85817B]">
                      {loan.author}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      <span className="flex items-center gap-2 text-xs text-[#777D78]">
                        <CalendarDays size={15} />
                        Borrowed:{" "}
                        {formatDate(
                          loan.borrowedDate
                        )}
                      </span>

                      <span className="flex items-center gap-2 text-xs text-[#777D78]">
                        <Clock3 size={15} />
                        Due:{" "}
                        {formatDate(
                          loan.dueDate
                        )}
                      </span>

                      {loan.returnedDate && (
                        <span className="flex items-center gap-2 text-xs text-[#27816B]">
                          <CheckCircle2 size={15} />
                          Returned:{" "}
                          {formatDate(
                            loan.returnedDate
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* STATUS AND RETURN ACTION */}
                  <div className="flex flex-col items-start gap-3 md:items-end md:self-start">
                    <span
                      style={{
                        backgroundColor:
                          status.background,
                        color: status.color,
                      }}
                      className="inline-flex items-center rounded-full px-4 py-2 text-xs font-bold"
                    >
                      {status.label}
                    </span>

                    {loan.status === "Active" &&
                      typeof onReturn ===
                        "function" && (
                        <button
                          type="button"
                          onClick={() =>
                            onReturn(loan.id)
                          }
                          className="rounded-xl bg-[#123D30] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1C5846]"
                        >
                          Return Book
                        </button>
                      )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filteredLoans.length === 0 && (
          <div className="py-14 text-center">
            <BookOpen
              size={36}
              className="mx-auto text-[#AAA59D]"
            />

            <h3 className="mt-4 font-bold text-[#292929]">
              No loans found
            </h3>

            <p className="mt-2 text-sm text-[#85817B]">
              There are no records for this filter.
            </p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <div className="flex items-start gap-3 rounded-[20px] bg-[#E9F4F0] p-5">
        <Info
          size={20}
          className="mt-0.5 shrink-0 text-[#276C64]"
        />

        <p className="text-sm leading-relaxed text-[#55736C]">
          This is a frontend demonstration of the
          library borrowing system. Borrowing and
          returning will use real database records
          after backend integration.
        </p>
      </div>
    </div>
  );
}
