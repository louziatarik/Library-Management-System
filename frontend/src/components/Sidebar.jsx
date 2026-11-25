
import {
  BookOpen,
  LayoutDashboard,
  Library,
  History,
  Heart,
  UserRound,
  LogOut,
  GraduationCap,
  ChevronRight
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Book Catalogue", icon: Library },
  { name: "My Wishlist", icon: Heart },
  { name: "My Loans", icon: History },
  { name: "My Profile", icon: UserRound }
];

export default function Sidebar({
  activePage,
  setActivePage,
  onGoHome,
  onLogout,
}) {
  return (
    <aside className="w-64 shrink-0 min-h-screen bg-white border-r border-[#EEEAE4] flex flex-col">

      {/* LOGO */}
<div className="px-6 pt-8 pb-10">
  <button
    type="button"
    onClick={onGoHome}
    aria-label="Return to BookNest landing page"
    className="flex w-full items-center gap-3 text-left rounded-2xl transition-opacity duration-200 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#276C64]"
  >
          <div className="w-12 h-12 bg-[#F5C96A] rounded-2xl flex items-center justify-center">
            <BookOpen size={25} className="text-[#292929]" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-[#292929] tracking-tight">
              BookNest<span className="text-[#E8A6A1]">.</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[2px] text-[#9B978F] font-bold">
              Digital Library
            </p>
               </div>
      </button>
    </div>

      {/* NAVIGATION */}
      <div className="px-4 flex-1">
        <p className="px-4 mb-4 text-[11px] font-bold tracking-[2px] text-[#AAA59D] uppercase">
          Main Menu
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#F5C96A] text-[#292929] shadow-sm"
                    : "text-[#85817B] hover:bg-[#F7F5F0] hover:text-[#292929]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} strokeWidth={2} />
                  <span className="text-sm font-semibold">
                    {item.name}
                  </span>
                </div>

                {isActive && <ChevronRight size={17} />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM CARD */}
      <div className="px-4 pb-5">
        <div className="bg-[#E9F4F0] rounded-2xl p-4 mb-6">
          <div className="w-10 h-10 bg-[#A9D7D0] rounded-xl flex items-center justify-center mb-3">
            <GraduationCap size={22} className="text-[#276C64]" />
          </div>

          <h3 className="text-sm font-bold text-[#292929]">
            Keep Learning!
          </h3>

          <p className="text-xs text-[#777D78] mt-2 leading-relaxed">
            Explore new books and expand your knowledge.
          </p>

          <button
            onClick={() => setActivePage("Book Catalogue")}
            className="mt-4 text-xs font-bold text-[#276C64] flex items-center gap-1 hover:gap-2 transition-all"
          >
            Browse Books <ChevronRight size={15} />
          </button>
        </div>

        {/* PROFILE */}
        <div className="border-t border-[#EEEAE4] pt-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8A6A1] flex items-center justify-center">
              <UserRound size={20} className="text-[#6D3433]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#292929]">
                Student Account
              </p>
              <p className="text-xs text-[#AAA59D]">
                Library Member
              </p>
            </div>

            <button type="button" onClick={onLogout} title="Log out" aria-label="Log out" className="text-[#85817B] hover:text-red-600 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
