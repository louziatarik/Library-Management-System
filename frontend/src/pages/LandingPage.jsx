
import { ArrowRight, BookOpen, LibraryBig, Sparkles } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Discover your next read",
    description: "Explore a thoughtfully organized collection of books and ideas.",
    color: "#A9D7D0",
  },
  {
    icon: LibraryBig,
    title: "Everything in one place",
    description: "Browse the catalogue, manage loans, and stay organized.",
    color: "#F5C96A",
  },
  {
    icon: Sparkles,
    title: "Made for curious minds",
    description: "A calmer, more beautiful way to experience your library.",
    color: "#E8A6A1",
  },
];

export default function LandingPage({ onExplore }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F7F5F0] text-[#292929]">
      <style>{`
        @keyframes bookFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes softGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }

        .booknest-floating {
          animation: bookFloat 6s ease-in-out infinite;
        }

        .booknest-glow {
          animation: softGlow 7s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .booknest-floating,
          .booknest-glow {
            animation: none;
          }
        }
      `}</style>

      {/* Navigation */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123D30] text-[#F5C96A]">
            <BookOpen size={23} />
          </div>
          <span className="text-xl font-extrabold tracking-[0.08em]">
            BOOKNEST
          </span>
        </div>

        <button
          type="button"
          onClick={onExplore}
          className="rounded-full bg-[#F5C96A] px-5 py-3 text-sm font-bold transition hover:bg-[#E9BA50]"
        >
          Enter Library
        </button>
      </header>

      {/* Hero */}
      <main>
        <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-16 pt-8 text-center md:px-10">
          {/* Background decorations */}
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

          {/* Floating open-book illustration */}
          
{/* Realistic floating book */}
<div className="relative my-4 flex w-full max-w-3xl items-center justify-center py-2 sm:my-5">
  {/* Warm golden glow */}
  <div
    aria-hidden="true"
    className="booknest-glow pointer-events-none absolute h-48 w-[75%] rounded-full bg-[#F5C96A]/35 blur-[65px]"
  />

  {/* Mint ambient lighting */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -left-8 top-1/4 h-40 w-40 rounded-full bg-[#A9D7D0]/30 blur-3xl"
  />

  {/* Shadow beneath the book */}
  <div
    aria-hidden="true"
    className="absolute bottom-3 h-8 w-[65%] rounded-full bg-[#123D30]/15 blur-2xl"
  />

  {/* Floating image */}
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

        {/* Features */}
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
              {features.map(({ icon: Icon, title, description, color }) => (
                <div
                  key={title}
                  className="rounded-[28px] border border-[#EEEAE4] bg-white p-8 shadow-[0_12px_35px_rgba(35,48,38,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={25} className="text-[#292929]" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold">{title}</h3>
                  <p className="text-sm leading-7 text-[#737770]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#123D30] px-6 py-8 text-center text-xs tracking-[0.15em] text-[#F7F5F0]">
        © {new Date().getFullYear()} BOOKNEST — MADE FOR DISCOVERY
      </footer>
    </div>
  );
}
