
import {
  BookOpen,
  BookMarked,
  Clock3,
  Layers3,
  ArrowUpRight,
  ArrowRight,
  Bell,
  Search,
  Sparkles
} from "lucide-react";

import { books } from "../data/books";

const stats = [
  {
    title: "Available Books",
    value: "248",
    icon: BookOpen,
    background: "#D8EDE8"
  },
  {
    title: "My Borrowed Books",
    value: "03",
    icon: BookMarked,
    background: "#F6D7D1"
  },
  {
    title: "Due Soon",
    value: "01",
    icon: Clock3,
    background: "#F9E8B5"
  },
  {
    title: "Categories",
    value: "12",
    icon: Layers3,
    background: "#DDD4F1"
  }
];

const bookColors = [
  "#E7B7A4",
  "#A9D7D0",
  "#D8C5EA",
  "#F5C96A",
  "#C5D8B8",
  "#F2C8D8"
];

export default function Dashboard({ setActivePage }) {
  const featuredBooks = books.slice(0, 4);

  return (
    <div className="space-y-8">

      {/* TOP HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[#A29A90] text-sm font-medium">
            Student Dashboard
          </p>

          <h1 className="text-3xl font-bold text-[#292929] mt-1">
            Hello, Reader! 👋
          </h1>

          <p className="text-[#85817B] text-sm mt-2">
            Welcome back to your personal library space.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage("Book Catalogue")}
            aria-label="Open book catalogue"
            className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center border border-[#EEEAE4] hover:bg-[#F5C96A] transition"
          >
            <Search size={20} className="text-[#292929]" />
          </button>

          <div
            title="Notifications coming soon"
            className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center border border-[#EEEAE4]"
          >
            <Bell size={20} className="text-[#292929]" />
          </div>
        </div>
      </header>

      {/* WELCOME BANNER */}
      <section className="bg-[#F5C96A] rounded-[28px] p-7 md:p-9 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-white/40 px-3 py-1.5 rounded-full text-xs font-bold text-[#594A2C] mb-5">
            <Sparkles size={15} />
            YOUR READING JOURNEY
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#292929] leading-tight">
            A world of knowledge
            <br />
            is waiting for you.
          </h2>

          <p className="text-[#594A2C] mt-4 text-sm leading-relaxed">
            Explore our collection, discover new ideas,
            and find your next favorite book.
          </p>

          <button
            onClick={() => setActivePage("Book Catalogue")}
            className="mt-6 bg-[#292929] text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-[#48413B] transition"
          >
            Explore Books
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Decorative circles */}
        <div className="absolute -right-12 -top-20 w-72 h-72 rounded-full bg-white/25" />
        <div className="absolute right-20 bottom-[-110px] w-64 h-64 rounded-full bg-[#E8A6A1]/60" />
        <div className="absolute right-10 top-24 w-24 h-24 rounded-full bg-[#A9D7D0]/80" />
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
                  <div className="w-11 h-11 rounded-xl bg-white/50 flex items-center justify-center">
                    <Icon size={23} className="text-[#292929]" />
                  </div>

                  <ArrowUpRight size={19} className="text-[#6B625B]" />
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

      {/* FEATURED BOOKS */}
      <section className="bg-white rounded-[28px] p-6 md:p-8 border border-[#EEEAE4]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
          <div>
            <h2 className="text-xl font-bold text-[#292929]">
              Discover Books
            </h2>

            <p className="text-sm text-[#85817B] mt-1">
              Find something interesting to read today.
            </p>
          </div>

          <button
            onClick={() => setActivePage("Book Catalogue")}
            className="flex items-center gap-2 text-sm font-bold text-[#292929] hover:text-[#A67C28]"
          >
            View All
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {featuredBooks.map((book, index) => (
            <div key={book.id} className="group">
              <div
                style={{ backgroundColor: bookColors[index % bookColors.length] }}
                className="h-48 rounded-[20px] flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/20" />

                <div className="w-28 h-36 bg-white/70 rounded-lg shadow-xl flex flex-col justify-center items-center p-3 text-center rotate-[-5deg] group-hover:rotate-0 transition-transform">
                  <BookOpen size={27} className="text-[#292929] mb-3" />

                  <span className="text-[11px] font-extrabold text-[#292929] leading-tight">
                    {book.title}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-bold text-[#292929] text-sm line-clamp-2">
                  {book.title}
                </h3>

                <p className="text-[#85817B] text-xs mt-1">
                  {book.author}
                </p>

                <div className="flex items-center justify-between mt-3">
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
                    {book.available ? "Available" : "Borrowed"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* READING ACTIVITY */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-[#E9F4F0] rounded-[24px] p-7">
          <div className="w-12 h-12 bg-[#A9D7D0] rounded-2xl flex items-center justify-center mb-5">
            <BookMarked size={24} className="text-[#276C64]" />
          </div>

          <h3 className="text-xl font-bold text-[#292929]">
            Your Reading Activity
          </h3>

          <p className="text-sm text-[#777D78] mt-2 leading-relaxed">
            Keep track of your borrowed books and
            upcoming return dates in one place.
          </p>

          <button
            onClick={() => setActivePage("My Loans")}
            className="mt-5 flex items-center gap-2 font-bold text-sm text-[#276C64]"
          >
            View My Loans
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="bg-[#F9E8D9] rounded-[24px] p-7">
          <div className="w-12 h-12 bg-[#E8A6A1] rounded-2xl flex items-center justify-center mb-5">
            <Clock3 size={24} className="text-[#873E3B]" />
          </div>

          <h3 className="text-xl font-bold text-[#292929]">
            Never Miss a Return
          </h3>

          <p className="text-sm text-[#8A7067] mt-2 leading-relaxed">
            Stay organized by checking your book
            return deadlines regularly.
          </p>

          <button
            onClick={() => setActivePage("My Loans")}
            className="mt-5 flex items-center gap-2 font-bold text-sm text-[#873E3B]"
          >
            Check Due Dates
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <p className="text-xs text-[#A29A90]">
        Prototype dashboard — statistics and book records are sample data.
        Live information will be connected to the backend later.
      </p>
    </div>
  );
}
