
import { useMemo, useState } from "react";
import {
  BookOpen,
  BookMarked,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Search,
  RotateCcw,
  Info
} from "lucide-react";

const initialLoans = [
  {
    id: 1,
    book: "Clean Code",
    student: "Student 001",
    studentId: "STU-001",
    borrowedAt: "2026-11-10",
    dueAt: "2026-12-02",
    returnedAt: null
  },
  {
    id: 2,
    book: "Python Crash Course",
    student: "Student 002",
    studentId: "STU-002",
    borrowedAt: "2026-11-05",
    dueAt: "2026-11-16",
    returnedAt: "2026-11-14"
  },
  {
    id: 3,
    book: "Introduction to Algorithms",
    student: "Student 003",
    studentId: "STU-003",
    borrowedAt: "2026-10-28",
    dueAt: "2026-11-12",
    returnedAt: null
  },
  {
    id: 4,
    book: "The Pragmatic Programmer",
    student: "Student 004",
    studentId: "STU-004",
    borrowedAt: "2026-11-11",
    dueAt: "2026-12-05",
    returnedAt: null
  },
  {
    id: 5,
    book: "Don't Make Me Think",
    student: "Student 005",
    studentId: "STU-005",
    borrowedAt: "2026-10-30",
    dueAt: "2026-11-13",
    returnedAt: "2026-11-12"
  }
];

function parseDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function todayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(value) {
  if (!value) return "—";

  return parseDate(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function getLoanStatus(loan, today) {
  if (loan.returnedAt) return "Returned";
  if (loan.dueAt < today) return "Overdue";
  return "Active";
}

const statusStyles = {
  Active: "bg-[#E9F4F0] text-[#27816B]",
  Overdue: "bg-[#FFF0ED] text-[#B45C53]",
  Returned: "bg-[#F0EEF7] text-[#74638F]"
};

export default function ManageLoans() {
  const [loans, setLoans] = useState(initialLoans);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [today, setToday] = useState(todayString);

  const loansWithStatus = useMemo(
    () =>
      loans.map((loan) => ({
        ...loan,
        status: getLoanStatus(loan, today)
      })),
    [loans, today]
  );

  const stats = {
    total: loansWithStatus.length,
    active: loansWithStatus.filter(
      (loan) => loan.status === "Active"
    ).length,
    overdue: loansWithStatus.filter(
      (loan) => loan.status === "Overdue"
    ).length,
    returned: loansWithStatus.filter(
      (loan) => loan.status === "Returned"
    ).length
  };

  const filteredLoans = loansWithStatus.filter((loan) => {
    const query = search.trim().toLowerCase();

    const matchesSearch = [
      loan.book,
      loan.student,
      loan.studentId
    ].some((value) => value.toLowerCase().includes(query));

    const matchesStatus =
      statusFilter === "All" || loan.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const markAsReturned = (loan) => {
    if (loan.returnedAt) return;

    const confirmed = window.confirm(
      `Mark "${loan.book}" as returned by ${loan.student}?`
    );

    if (!confirmed) return;

    const returnedAt = todayString();

    setToday(returnedAt);

    setLoans((current) =>
      current.map((item) =>
        item.id === loan.id
          ? { ...item, returnedAt }
          : item
      )
    );
  };

  const summaryCards = [
    {
      title: "Total Loans",
      value: stats.total,
      icon: BookMarked,
      background: "#D8EDE8"
    },
    {
      title: "Active Loans",
      value: stats.active,
      icon: Clock3,
      background: "#F9E8B5"
    },
    {
      title: "Overdue Loans",
      value: stats.overdue,
      icon: AlertCircle,
      background: "#F6D7D1"
    },
    {
      title: "Returned Loans",
      value: stats.returned,
      icon: CheckCircle2,
      background: "#D8C5EA"
    }
  ];

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-[#A29A90]">
            Administration / Loans
          </p>

          <h1 className="text-3xl font-bold text-[#292929] mt-1">
            Manage Loans
          </h1>

          <p className="text-sm text-[#85817B] mt-2">
            Track borrowed books, due dates, and returns.
          </p>
        </div>

        <div className="w-14 h-14 bg-[#F5C96A] rounded-2xl flex items-center justify-center">
          <BookMarked size={27} className="text-[#292929]" />
        </div>
      </header>

      {/* STATISTICS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              style={{ backgroundColor: card.background }}
              className="rounded-[24px] p-6 min-h-40 flex flex-col justify-between"
            >
              <div className="w-11 h-11 bg-white/50 rounded-xl flex items-center justify-center">
                <Icon size={23} className="text-[#292929]" />
              </div>

              <div className="mt-5">
                <h2 className="text-3xl font-extrabold text-[#292929]">
                  {card.value}
                </h2>

                <p className="text-sm text-[#625B55] mt-1">
                  {card.title}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="bg-white border border-[#EEEAE4] rounded-[24px] p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#85817B]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search books or students..."
              aria-label="Search loans"
              className="w-full pl-11 pr-4 py-3 bg-[#F7F5F0] rounded-xl outline-none focus:ring-2 focus:ring-[#F5C96A] text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter loans by status"
            className="px-4 py-3 bg-[#F7F5F0] rounded-xl outline-none focus:ring-2 focus:ring-[#F5C96A] text-sm"
          >
            <option value="All">All Loans</option>
            <option value="Active">Active</option>
            <option value="Overdue">Overdue</option>
            <option value="Returned">Returned</option>
          </select>
        </div>
      </section>

      {/* LOAN TABLE */}
      <section className="bg-white border border-[#EEEAE4] rounded-[28px] overflow-hidden">
        <div className="p-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#292929]">
            Borrowing Records
          </h2>

          <span className="text-sm text-[#85817B]">
            {filteredLoans.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F7F5F0]">
              <tr className="text-xs uppercase tracking-wide text-[#85817B]">
                <th className="px-5 py-4">Book</th>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Borrowed</th>
                <th className="px-5 py-4">Due Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredLoans.map((loan) => (
                <tr
                  key={loan.id}
                  className="border-t border-[#EEEAE4] hover:bg-[#FCFBF8]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 min-w-44">
                      <div className="w-11 h-12 bg-[#F9E8B5] rounded-xl flex items-center justify-center shrink-0">
                        <BookOpen size={21} className="text-[#292929]" />
                      </div>

                      <span className="text-sm font-semibold text-[#292929]">
                        {loan.book}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-[#292929]">
                      {loan.student}
                    </p>

                    <p className="text-xs text-[#85817B] mt-1">
                      {loan.studentId}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#625B55] whitespace-nowrap">
                    {formatDate(loan.borrowedAt)}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#625B55] whitespace-nowrap">
                    {formatDate(loan.dueAt)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${
                        statusStyles[loan.status]
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    {loan.status === "Returned" ? (
                      <span className="inline-flex items-center gap-1 text-xs text-[#85817B]">
                        <CheckCircle2 size={15} />
                        Completed
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => markAsReturned(loan)}
                        className="inline-flex items-center gap-2 bg-[#E9F4F0] text-[#27816B] px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#D8EDE8] whitespace-nowrap"
                      >
                        <RotateCcw size={15} />
                        Mark Returned
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {filteredLoans.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-[#85817B]"
                  >
                    No loan records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* INFORMATION */}
      <div className="bg-[#E9F4F0] rounded-[20px] p-5 flex items-start gap-3">
        <Info
          size={20}
          className="text-[#276C64] shrink-0 mt-0.5"
        />

        <p className="text-sm text-[#55736C] leading-relaxed">
          Demo mode: loan records are fictional. Marking a book
          as returned updates this page temporarily, but does
          not update the database or book availability.
          Changes reset when the page reloads.
        </p>
      </div>
    </div>
  );
}
