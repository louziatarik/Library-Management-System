
import {
  BookOpen,
  LayoutDashboard,
  Library,
  Tags,
  BookMarked,
  Users,
  ShieldCheck,
  ChevronRight,
  LogOut
} from "lucide-react";

const menuItems = [
  { name: "Admin Dashboard", icon: LayoutDashboard },
  { name: "Manage Books", icon: Library },
  { name: "Manage Categories", icon: Tags },
  { name: "Manage Loans", icon: BookMarked },
  { name: "Manage Students", icon: Users }
];

export default function AdminSidebar({
  activePage,
  setActivePage
}) {
  return (
    <aside className="w-64 shrink-0 min-h-screen bg-white border-r border-[#EEEAE4] flex flex-col">

      {/* LOGO */}
      <div className="px-6 pt-8 pb-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#F5C96A] rounded-2xl flex items-center justify-center">
            <BookOpen size={25} className="text-[#292929]" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-[#292929] tracking-tight">
              BookNest
              <span className="text-[#E8A6A1]">.</span>
            </h1>

            <p className="text-[10px] uppercase tracking-[2px] text-[#9B978F] font-bold">
              Administration
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="px-4 flex-1">
        <p className="px-4 mb-4 text-[11px] font-bold tracking-[2px] text-[#AAA59D] uppercase">
          Admin Menu
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

      {/* ADMIN INFO */}
      <div className="px-4 pb-5">
        <div className="bg-[#E9F4F0] rounded-2xl p-4 mb-6">
          <div className="w-10 h-10 bg-[#A9D7D0] rounded-xl flex items-center justify-center mb-3">
            <ShieldCheck size={22} className="text-[#276C64]" />
          </div>

          <h3 className="text-sm font-bold text-[#292929]">
            Library Management
          </h3>

          <p className="text-xs text-[#777D78] mt-2 leading-relaxed">
            Manage books, borrowing activity,
            and library members.
          </p>
        </div>

        {/* ACCOUNT */}
        <div className="border-t border-[#EEEAE4] pt-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8A6A1] flex items-center justify-center">
              <ShieldCheck size={20} className="text-[#6D3433]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#292929]">
                Admin Account
              </p>

              <p className="text-xs text-[#AAA59D]">
                Library Administrator
              </p>
            </div>

            <button
              disabled
              title="Logout will be available after authentication is implemented"
              className="text-[#B5B0AA] cursor-not-allowed"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
