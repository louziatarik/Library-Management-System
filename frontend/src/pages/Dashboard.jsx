
import { useState } from "react";
import {
  BookOpen,
  BookMarked,
  Clock3,
  Layers3,
  ArrowUpRight,
  ArrowRight,
  Bell,
  Search,
  Sparkles,
} from "lucide-react";

import { books } from "../data/books";

// ----------------------------------
// DASHBOARD STATISTICS
// ----------------------------------



// ----------------------------------
// BOOK BACKGROUND COLORS
// ----------------------------------

const bookColors = [
  "#E7B7A4",
  "#A9D7D0",
  "#D8C5EA",
  "#F5C96A",
  "#C5D8B8",
  "#F2C8D8",
];

// ----------------------------------
// FEATURED BOOK COVER
// ----------------------------------

function FeaturedBookCover({ book }) {
  const [imageFailed, setImageFailed] = useState(false);

  const coverUrl =
    book.cover ||
    (book.isbn
      ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`
      : null);

  return (
    <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
      {coverUrl && !imageFailed ? (
        <img
          src={coverUrl}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="max-h-40 max-w-[85%] rounded-sm object-contain shadow-xl transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-36 w-28 flex-col items-center justify-center rounded-lg bg-white/80 p-3 text-center shadow-xl transition-transform duration-300 group-hover:scale-105">
          <BookOpen
            size={27}
            className="mb-3 text-[#292929]"
          />

          <span className="text-[11px] font-extrabold leading-tight text-[#292929]">
            {book.title}
          </span>
        </div>
      )}
    </div>
  );
}

// ----------------------------------
// STUDENT DASHBOARD
// ----------------------------------

export default function Dashboard({
  setActivePage,
  books: catalogueBooks = [],
  loans = [],
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const featuredBooks = catalogueBooks.slice(0, 4);
  const activeLoans = loans.filter(
  (loan) => loan.status === "Active"
);

const today = new Date();
today.setHours(0, 0, 0, 0);

const dueSoonLoans = activeLoans.filter((loan) => {
  if (!loan.dueDate) return false;

  const [year, month, day] = loan.dueDate
    .split("-")
    .map(Number);

  const dueDate = new Date(year, month - 1, day);
  const daysRemaining = Math.round(
    (dueDate - today) / (1000 * 60 * 60 * 24)
  );

  return daysRemaining >= 0 && daysRemaining <= 5;
});
// ----------------------------------
// DUE-DATE NOTIFICATIONS
// ----------------------------------

const notifications = activeLoans
  .filter((loan) => loan.dueDate)
  .map((loan) => {
    const [year, month, day] = loan.dueDate
      .split("-")
      .map(Number);

    const dueDate = new Date(year, month - 1, day);

    const daysRemaining = Math.round(
      (dueDate - today) / (1000 * 60 * 60 * 24)
    );

    if (!Number.isFinite(daysRemaining)) return null;

    if (daysRemaining < 0) {
      return {
        id: loan.id,
        title: loan.title || loan.bookTitle || "Borrowed book",
        message: `${Math.abs(daysRemaining)} day(s) overdue`,
        type: "overdue",
        daysRemaining,
      };
    }

    if (daysRemaining <= 5) {
      return {
        id: loan.id,
        title: loan.title || loan.bookTitle || "Borrowed book",
        message:
          daysRemaining === 0
            ? "Due today"
            : `Due in ${daysRemaining} day(s)`,
        type: "due-soon",
        daysRemaining,
      };
    }

    return null;
  })
  .filter(Boolean)
  .sort((a, b) => a.daysRemaining - b.daysRemaining);

const notificationCount = notifications.length;
const availableBooks = catalogueBooks.filter(
  
  (book) => book.available
).length;

const categories = new Set(
  catalogueBooks
    .map((book) => book.category)
    .filter(Boolean)
);

const stats = [
  {
    title: "Available Books",
    value: availableBooks,
    icon: BookOpen,
    background: "#D8EDE8",
  },
  {
    title: "My Borrowed Books",
    value: activeLoans.length,
    icon: BookMarked,
    background: "#F6D7D1",
  },
  {
    title: "Due Soon",
    value: dueSoonLoans.length,
    icon: Clock3,
    background: "#F9E8B5",
  },
  {
    title: "Categories",
    value: categories.size,
    icon: Layers3,
    background: "#DDD4F1",
  },
];
  return (
    <div className="space-y-8">
      {/* TOP HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#A29A90]">
            Student Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#292929]">
            Hello, Reader! 👋
          </h1>

          <p className="mt-2 text-sm text-[#85817B]">
            Welcome back to your personal library space.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActivePage("Book Catalogue")}
            aria-label="Open book catalogue"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#EEEAE4] bg-white transition hover:bg-[#F5C96A]"
          >
            <Search
              size={20}
              className="text-[#292929]"
            />
          </button>

          <div className="relative">
  <button
    type="button"
    onClick={() => setNotificationsOpen((previous) => !previous)}
    aria-label={`Notifications: ${notificationCount} alerts`}
    aria-expanded={notificationsOpen}
    className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#EEEAE4] bg-white transition hover:bg-[#F5C96A]"
  >
    <Bell size={20} className="text-[#292929]" />

    {notificationCount > 0 && (
      <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D9534F] px-1 text-[10px] font-bold text-white">
        {notificationCount > 9 ? "9+" : notificationCount}
      </span>
    )}
  </button>

  {notificationsOpen && (
    <div className="absolute right-0 top-14 z-50 w-[340px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[#EEEAE4] bg-white shadow-[0_18px_50px_rgba(18,61,48,0.16)]">
      <div className="flex items-center justify-between border-b border-[#EEEAE4] px-5 py-4">
        <div>
          <h3 className="text-base font-bold text-[#123D30]">
            Notifications
          </h3>
          <p className="mt-1 text-xs text-[#85817B]">
            {notificationCount === 0
              ? "You're all caught up!"
              : `${notificationCount} loan alert${notificationCount === 1 ? "" : "s"}`}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setNotificationsOpen(false)}
          aria-label="Close notifications"
          className="rounded-lg px-2 py-1 text-lg text-[#85817B] hover:bg-[#F7F5F0]"
        >
          ?
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <Bell size={30} className="mx-auto mb-3 text-[#27816B]" />
            <p className="font-semibold text-[#123D30]">
              All caught up!
            </p>
            <p className="mt-2 text-xs text-[#85817B]">
              No overdue books or upcoming return deadlines.
            </p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={`${notification.id}-${index}`}
              className="flex gap-3 border-b border-[#F1EEE8] px-5 py-4 last:border-b-0"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  notification.type === "overdue"
                    ? "bg-[#FCE8E6] text-[#D9534F]"
                    : "bg-[#FFF2D4] text-[#B7791F]"
                }`}
              >
                <Clock3 size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#292929]">
                  {notification.type === "overdue"
                    ? "Overdue Book"
                    : "Book Due Soon"}
                </p>
                <p className="mt-1 break-words text-sm text-[#555]">
                  {notification.title}
                </p>
                <p
                  className={`mt-1 text-xs font-semibold ${
                    notification.type === "overdue"
                      ? "text-[#D9534F]"
                      : "text-[#B7791F]"
                  }`}
                >
                  {notification.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          setNotificationsOpen(false);
          setActivePage("My Loans");
        }}
        className="flex w-full items-center justify-center gap-2 border-t border-[#EEEAE4] px-5 py-4 text-sm font-bold text-[#123D30] transition hover:bg-[#F7F5F0]"
      >
        View My Loans
        <ArrowRight size={16} />
      </button>
    </div>
  )}
</div>
        </div>
      </header>

      {/* WELCOME BANNER */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#F5C96A] p-7 md:p-9">
        <div className="relative z-10 max-w-lg">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/40 px-3 py-1.5 text-xs font-bold text-[#594A2C]">
            <Sparkles size={15} />
            YOUR READING JOURNEY
          </div>

          <h2 className="text-3xl font-extrabold leading-tight text-[#292929] md:text-4xl">
            A world of knowledge
            <br />
            is waiting for you.
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-[#594A2C]">
            Explore our collection, discover new ideas,
            and find your next favorite book.
          </p>

          <button
            type="button"
            onClick={() => setActivePage("Book Catalogue")}
            className="mt-6 flex items-center gap-2 rounded-xl bg-[#292929] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#48413B]"
          >
            Explore Books
            <ArrowRight size={18} />
          </button>
        </div>

        {/* DECORATIVE CIRCLES */}
        <div className="pointer-events-none absolute -right-12 -top-20 h-72 w-72 rounded-full bg-white/25" />

        <div className="pointer-events-none absolute bottom-[-110px] right-20 h-64 w-64 rounded-full bg-[#E8A6A1]/60" />

        <div className="pointer-events-none absolute right-10 top-24 h-24 w-24 rounded-full bg-[#A9D7D0]/80" />
      </section>

      {/* STATISTICS */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#292929]">
            Library Overview
          </h2>

          <span className="text-xs text-[#A29A90]">
  Current library overview
</span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                style={{
                  backgroundColor: stat.background,
                }}
                className="flex min-h-44 flex-col justify-between rounded-[24px] p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/50">
                    <Icon
                      size={23}
                      className="text-[#292929]"
                    />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-[#6B625B]"
                  />
                </div>

                <div className="mt-5">
                  <h3 className="text-3xl font-extrabold text-[#292929]">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-sm text-[#625B55]">
                    {stat.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section className="rounded-[28px] border border-[#EEEAE4] bg-white p-6 md:p-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#292929]">
              Discover Books
            </h2>

            <p className="mt-1 text-sm text-[#85817B]">
              Find something interesting to read today.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActivePage("Book Catalogue")}
            className="flex items-center gap-2 text-sm font-bold text-[#292929] hover:text-[#A67C28]"
          >
            View All
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredBooks.map((book, index) => (
            <div
              key={book.id}
              className="group"
            >
              {/* BOOK COVER AREA */}
              <div
                style={{
                  backgroundColor:
                    bookColors[
                      index % bookColors.length
                    ],
                }}
                className="relative flex h-48 items-center justify-center overflow-hidden rounded-[20px]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20" />

                <FeaturedBookCover
                  key={`${book.id}-${book.cover || book.isbn}`}
                  book={book}
                />
              </div>

              {/* BOOK INFORMATION */}
              <div className="mt-4">
                <h3 className="line-clamp-2 text-sm font-bold text-[#292929]">
                  {book.title}
                </h3>

                <p className="mt-1 text-xs text-[#85817B]">
                  {book.author}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-xs text-[#A29A90]">
                    {book.category}
                  </span>

                  <span
                    className={`text-[11px] font-semibold ${
                      book.available
                        ? "text-[#27816B]"
                        : "text-[#C17742]"
                    }`}
                  >
                    {book.available
                      ? "Available"
                      : "Borrowed"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* READING ACTIVITY */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-[24px] bg-[#E9F4F0] p-7">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A9D7D0]">
            <BookMarked
              size={24}
              className="text-[#276C64]"
            />
          </div>

          <h3 className="text-xl font-bold text-[#292929]">
            Your Reading Activity
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-[#777D78]">
            Keep track of your borrowed books and
            upcoming return dates in one place.
          </p>

          <button
            type="button"
            onClick={() => setActivePage("My Loans")}
            className="mt-5 flex items-center gap-2 text-sm font-bold text-[#276C64]"
          >
            View My Loans
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="rounded-[24px] bg-[#F9E8D9] p-7">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8A6A1]">
            <Clock3
              size={24}
              className="text-[#873E3B]"
            />
          </div>

          <h3 className="text-xl font-bold text-[#292929]">
            Never Miss a Return
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-[#8A7067]">
            Stay organized by checking your book
            return deadlines regularly.
          </p>

          <button
            type="button"
            onClick={() => setActivePage("My Loans")}
            className="mt-5 flex items-center gap-2 text-sm font-bold text-[#873E3B]"
          >
            Check Due Dates
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <p className="text-xs text-[#A29A90]">
  Book information is loaded from the library API when
  available. Student borrowing activity is currently
  stored locally for demonstration purposes.
</p>
    </div>
  );
}
