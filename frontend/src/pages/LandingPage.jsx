
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  LibraryBig,
  Sparkles,
  LogIn,
  UserPlus,
  CheckCircle2,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { books } from "../data/books";

// ----------------------------------
// FEATURES
// ----------------------------------

const features = [
  {
    icon: BookOpen,
    title: "Discover your next read",
    description:
      "Explore a thoughtfully organized collection of books and ideas.",
    color: "#A9D7D0",
  },
  {
    icon: LibraryBig,
    title: "Everything in one place",
    description:
      "Browse the catalogue, manage loans, and stay organized.",
    color: "#F5C96A",
  },
  {
    icon: Sparkles,
    title: "Made for curious minds",
    description:
      "A calmer, more beautiful way to experience your library.",
    color: "#E8A6A1",
  },
];

// ----------------------------------
// BOOK COVER COMPONENT
// ----------------------------------

function CarouselBook({ book, active }) {
  const [failedUrl, setFailedUrl] = useState(null);

  const coverUrl =
    book.cover ||
    (book.isbn
      ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`
      : null);

  const imageFailed = !coverUrl || failedUrl === coverUrl;

  return (
    <div
      className={`booknest-carousel-float relative h-full w-full ${
        active ? "booknest-carousel-float-active" : ""
      }`}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[7px] bg-[#F7F5F0]"
        style={{
          boxShadow:
            "8px 15px 28px rgba(18,61,48,0.22), inset 6px 0 10px rgba(0,0,0,0.12)",
        }}
      >
        {!imageFailed ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            onError={() => setFailedUrl(coverUrl)}
            className="block h-full w-full object-fill"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-[#F7F5F0] p-4 text-center">
            <BookOpen
              size={36}
              className="mb-5 text-[#123D30]"
            />

            <span className="text-sm font-extrabold leading-tight text-[#123D30]">
              {book.title}
            </span>

            <span className="mt-3 text-xs text-[#85817B]">
              {book.author}
            </span>
          </div>
        )}

        {/* SPINE SHADOW */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[12px] bg-gradient-to-r from-black/30 to-transparent" />

        {/* LIGHT REFLECTION */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
      </div>
    </div>
  );
}

// ----------------------------------
// FEATURED BOOKS CAROUSEL
// ----------------------------------

function FeaturedBooksCarousel({ onExplore }) {
  const featuredBooks = books.slice(0, 6);

  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const total = featuredBooks.length;
  const activeBook = featuredBooks[activeIndex];

  // AUTOPLAY
  useEffect(() => {
    if (!autoPlay || total <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % total);
    }, 4500);

    return () => clearInterval(interval);
  }, [autoPlay, total]);

  // NAVIGATION
  const goNext = () => {
    setActiveIndex((previous) => (previous + 1) % total);
  };

  const goPrevious = () => {
    setActiveIndex(
      (previous) => (previous - 1 + total) % total
    );
  };

  const selectBook = (index) => {
    setActiveIndex(index);
  };

  // POSITION CALCULATION
  const getPosition = (index) => {
    let offset = index - activeIndex;

    if (offset > total / 2) {
      offset -= total;
    }

    if (offset < -total / 2) {
      offset += total;
    }

    return offset;
  };

  if (!activeBook) return null;

  return (
    <section
      className="relative overflow-hidden border-t border-[#EAE5DB] bg-[#FFFDF8] px-4 py-20 sm:px-6 md:px-10"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
      onFocusCapture={() => setAutoPlay(false)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setAutoPlay(true);
        }
      }}
      aria-label="Featured books carousel"
    >
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADER */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.24em] text-[#267458]">
              Handpicked for curious minds
            </p>

            <h2 className="text-3xl font-black uppercase leading-tight tracking-tight text-[#123D30] sm:text-4xl lg:text-5xl">
              Books you can't
              <br />
              miss this month.
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="text-sm leading-7 text-[#737770]">
              Discover the books shaping curious minds.
              Explore programming, technology, design,
              and more through our growing collection.
            </p>

            <button
              type="button"
              onClick={onExplore}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#123D30] px-5 py-3 text-sm font-bold text-[#123D30] transition hover:bg-[#123D30] hover:text-white"
            >
              View All Books
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        {/* CAROUSEL STAGE */}
        <div className="relative overflow-hidden rounded-[32px] bg-[#F3EFE5]">

          {/* GRID BACKGROUND */}
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                "linear-gradient(#C9C4B8 1px, transparent 1px), linear-gradient(90deg, #C9C4B8 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* BACKGROUND CIRCLES */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D7CCB7]" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D7CCB7]" />

          {/* TOP LABEL */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-7 sm:px-9">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#55736C]">
              The BookNest Collection
            </span>

            <span className="rounded-full border border-[#CFC8B8] bg-white/70 px-4 py-2 text-xs font-bold text-[#123D30]">
              {String(activeIndex + 1).padStart(2, "0")}
              {" / "}
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* 3D CAROUSEL */}
          <div
            className="relative mx-auto h-[380px] max-w-5xl sm:h-[470px] md:h-[530px]"
            style={{ perspective: "1200px" }}
          >
            {/* GROUND SHADOW */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-7 left-1/2 h-10 w-[65%] -translate-x-1/2 rounded-full bg-[#123D30]/15 blur-2xl"
            />

            {featuredBooks.map((book, index) => {
              const offset = getPosition(index);
              const distance = Math.abs(offset);
              const hidden = distance > 2;

              const translateX = offset * 72;
              const translateY = distance * 14;
              const rotateY = offset * -14;
              const rotateZ = offset * -4;
              const scale = 1 - distance * 0.14;

              return (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => selectBook(index)}
                  aria-label={`Select ${book.title}`}
                  aria-pressed={index === activeIndex}
                  tabIndex={hidden ? -1 : 0}
                  className="absolute left-1/2 top-1/2 h-[205px] w-[145px] origin-center cursor-pointer border-0 bg-transparent p-0 transition-[transform,opacity] duration-700 ease-in-out sm:h-[270px] sm:w-[190px] md:h-[320px] md:w-[225px]"
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      translateX(${translateX}%)
                      translateY(${translateY}px)
                      rotateY(${rotateY}deg)
                      rotateZ(${rotateZ}deg)
                      scale(${scale})
                    `,
                    zIndex: 20 - distance,
                    opacity: hidden ? 0 : 1,
                    pointerEvents: hidden ? "none" : "auto",
                  }}
                >
                  <CarouselBook
                    book={book}
                    active={index === activeIndex}
                  />
                </button>
              );
            })}
          </div>

          {/* ACTIVE BOOK DETAILS */}
          <div className="relative z-10 mx-auto max-w-2xl px-6 pb-9 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#267458]">
              {activeBook.category}
            </p>

            <h3 className="mt-3 text-2xl font-black text-[#123D30] sm:text-3xl">
              {activeBook.title}
            </h3>

            <p className="mt-2 text-sm text-[#85817B]">
              by {activeBook.author}
            </p>

            <div className="mt-4 flex items-center justify-center gap-2">
              {activeBook.available ? (
                <>
                  <CheckCircle2
                    size={16}
                    className="text-[#27816B]"
                  />
                  <span className="text-sm font-semibold text-[#27816B]">
                    Available to borrow
                  </span>
                </>
              ) : (
                <>
                  <Clock3
                    size={16}
                    className="text-[#C17742]"
                  />
                  <span className="text-sm font-semibold text-[#C17742]">
                    Currently unavailable
                  </span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={onExplore}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#123D30] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#1C5846]"
            >
              Explore This Book
              <ArrowRight size={17} />
            </button>

            {/* CAROUSEL CONTROLS */}
            <div className="mt-7 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={goPrevious}
                aria-label="Previous book"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CFC8B8] bg-white text-[#123D30] transition hover:bg-[#123D30] hover:text-white"
              >
                <ChevronLeft size={22} />
              </button>

              <div className="flex items-center gap-2">
                {featuredBooks.map((book, index) => (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => selectBook(index)}
                    aria-label={`Go to ${book.title}`}
                    aria-current={
                      index === activeIndex ? "true" : undefined
                    }
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-[#123D30]"
                        : "w-2.5 bg-[#B9B6AA] hover:bg-[#55736C]"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next book"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CFC8B8] bg-white text-[#123D30] transition hover:bg-[#123D30] hover:text-white"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* COLLECTION FOOTER */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#85817B]">
            A curated selection from our library.
          </p>

          <button
            type="button"
            onClick={onExplore}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#123D30] transition hover:text-[#27816B]"
          >
            Browse Full Collection
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------
// LANDING PAGE
// ----------------------------------

export default function LandingPage({
  onExplore,
  onLogin,
  onRegister,
  user,
  onDashboard,
}) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F7F5F0] text-[#292929]">
      <style>{`
        @keyframes bookFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes softGlow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.08);
          }
        }

        @keyframes carouselFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes carouselFloatActive {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }

        .booknest-floating {
          animation: bookFloat 6s ease-in-out infinite;
        }

        .booknest-glow {
          animation: softGlow 7s ease-in-out infinite;
        }

        .booknest-carousel-float {
          animation: carouselFloat 5s ease-in-out infinite;
        }

        .booknest-carousel-float-active {
          animation: carouselFloatActive 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .booknest-floating,
          .booknest-glow,
          .booknest-carousel-float,
          .booknest-carousel-float-active {
            animation: none !important;
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="relative z-20 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123D30] text-[#F5C96A]">
            <BookOpen size={23} />
          </div>

          <span className="text-xl font-extrabold tracking-[0.08em]">
            BOOKNEST
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {user ? (
            <>
              <span className="rounded-full bg-[#E8F1ED] px-4 py-3 text-sm font-semibold text-[#123D30]">
                Welcome, {user.name || "Student"}!
              </span>
              <button
                type="button"
                onClick={onDashboard}
                className="inline-flex items-center gap-2 rounded-full bg-[#123D30] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1B5946]"
              >
                <BookOpen size={17} />
                My Dashboard
                <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onLogin}
            className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-[#123D30] transition hover:bg-[#E9E7DF]"
          >
            <LogIn size={17} />
            Sign In
          </button>

          <button
            type="button"
            onClick={onRegister}
            className="inline-flex items-center gap-2 rounded-full border border-[#123D30] px-5 py-3 text-sm font-bold text-[#123D30] transition hover:bg-[#123D30] hover:text-white"
          >
            <UserPlus size={17} />
            Create Account
          </button>
            </>
          )}

          <button
            type="button"
            onClick={onExplore}
            className="rounded-full bg-[#F5C96A] px-5 py-3 text-sm font-bold transition hover:bg-[#E9BA50]"
          >
            Enter Library
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-16 pt-8 text-center md:px-10">

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-140px] top-16 h-80 w-80 rounded-full bg-[#A9D7D0]/35 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-120px] top-32 h-80 w-80 rounded-full bg-[#F5C96A]/30 blur-3xl"
          />

          <div className="relative z-10 mb-8 rounded-full border border-[#DCCB9C] bg-white/70 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#325B48]">
            A new chapter in discovery
          </div>

          <h1 className="relative z-10 text-[clamp(4rem,12vw,10rem)] font-black leading-[0.95] tracking-[-0.08em] text-[#123D30]">
            BOOKNEST
          </h1>

          <p className="relative z-10 mt-7 max-w-2xl text-base leading-8 text-[#5F625C] sm:text-lg">
            A universe of stories, knowledge, and inspiration.
            Discover books, follow your curiosity, and make every
            chapter count.
          </p>

          {/* HERO IMAGE */}
          <div className="relative my-4 flex w-full max-w-3xl items-center justify-center py-2 sm:my-5">
            <div
              aria-hidden="true"
              className="booknest-glow pointer-events-none absolute h-48 w-[75%] rounded-full bg-[#F5C96A]/35 blur-[65px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-8 top-1/4 h-40 w-40 rounded-full bg-[#A9D7D0]/30 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute bottom-3 h-8 w-[65%] rounded-full bg-[#123D30]/15 blur-2xl"
            />

            <img
              src="/booknest-hero.png"
              alt="Realistic open book with emerald-green cover and golden details"
              className="booknest-floating relative z-10 h-auto w-full max-w-[740px] object-contain drop-shadow-[0_22px_25px_rgba(35,48,38,0.16)]"
              loading="eager"
            />
          </div>

          <button
            type="button"
            onClick={onExplore}
            className="group relative z-10 inline-flex items-center gap-3 rounded-full bg-[#F5C96A] px-9 py-4 text-base font-bold text-[#292929] shadow-[0_12px_30px_rgba(200,155,60,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-[#E9BA50]"
          >
            Explore Library
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <span className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#7D8279]">
            Your next discovery awaits
          </span>
        </section>

        {/* FEATURED BOOKS */}
        <FeaturedBooksCarousel onExplore={onExplore} />

        {/* FEATURES SECTION */}
        <section className="border-t border-[#EAE5DB] bg-white/60 px-6 py-20 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#267458]">
                Beyond the bookshelf
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[#292929] sm:text-4xl">
                A better way to explore.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map(
                ({ icon: Icon, title, description, color }) => (
                  <div
                    key={title}
                    className="rounded-[28px] border border-[#EEEAE4] bg-white p-8 shadow-[0_12px_35px_rgba(35,48,38,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: color }}
                    >
                      <Icon
                        size={25}
                        className="text-[#292929]"
                      />
                    </div>

                    <h3 className="mb-3 text-xl font-bold">
                      {title}
                    </h3>

                    <p className="text-sm leading-7 text-[#737770]">
                      {description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#123D30] px-6 py-8 text-center text-xs tracking-[0.15em] text-[#F7F5F0]">
        © {new Date().getFullYear()} BOOKNEST — MADE FOR DISCOVERY
      </footer>
    </div>
  );
}
