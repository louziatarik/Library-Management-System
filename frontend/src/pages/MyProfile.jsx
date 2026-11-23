
import { useState } from "react";

import {
  UserRound,
  Mail,
  IdCard,
  GraduationCap,
  BookMarked,
  CheckCircle2,
  History,
  ShieldCheck,
  Settings,
  LockKeyhole,
  Info,
  CalendarDays
} from "lucide-react";

const demoStudent = {
  name: "Student Account",
  studentId: "STU-2026-001",
  email: "student@example.com",
  role: "Student",
  membership: "Active",
  joinedDate: "2026-09-01",
  department: "Computer Science"
};

const demoStats = [
  {
    title: "Active Loans",
    value: 3,
    icon: BookMarked,
    background: "#D8EDE8"
  },
  {
    title: "Returned Books",
    value: 2,
    icon: CheckCircle2,
    background: "#F6D7D1"
  },
  {
    title: "Total Loans",
    value: 5,
    icon: History,
    background: "#F9E8B5"
  }
];

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  );
}

export default function MyProfile({
  student: loggedInStudent,
  loans = [],
  onUpdateProfile
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDepartment, setEditDepartment] = useState("");
  const [profileMessage, setProfileMessage] = useState(null);

  const student = {
    ...demoStudent,
    ...loggedInStudent,
    name: loggedInStudent?.fullName || loggedInStudent?.name || demoStudent.name,
    email: loggedInStudent?.email || demoStudent.email,
    studentId:
      loggedInStudent?.studentId ||
      loggedInStudent?.id ||
      demoStudent.studentId,
    role: "Student"
  };

  // ----------------------------------
  // PROFILE EDITING
  // ----------------------------------
  const startEditing = () => {
    setEditName(student.name);
    setEditDepartment(
      loggedInStudent?.department || ""
    );
    setProfileMessage(null);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setProfileMessage(null);
  };

  const saveProfile = (event) => {
    event.preventDefault();

    if (typeof onUpdateProfile !== "function") {
      setProfileMessage({
        type: "error",
        text: "Profile editing is currently unavailable."
      });
      return;
    }

    const result = onUpdateProfile({
      fullName: editName,
      department: editDepartment
    });

    if (result?.error) {
      setProfileMessage({
        type: "error",
        text: result.error
      });
      return;
    }

    setIsEditing(false);
    setProfileMessage({
      type: "success",
      text: "Your profile has been updated successfully."
    });
  };

  const activeLoans = loans.filter(
    (loan) => loan.status === "Active"
  ).length;

  const returnedBooks = loans.filter(
    (loan) => loan.status === "Returned"
  ).length;

  const stats = demoStats.map((stat) => {
    switch (stat.title) {
      case "Active Loans":
        return { ...stat, value: activeLoans };
      case "Returned Books":
        return { ...stat, value: returnedBooks };
      case "Total Loans":
        return { ...stat, value: loans.length };
      default:
        return stat;
    }
  });

  return (
    <div className="space-y-8">

      {/* PAGE HEADER */}
      <header>
        <p className="text-[#A29A90] text-sm font-medium">
          Student Library / Account
        </p>

        <h1 className="text-3xl font-bold text-[#292929] mt-1">
          My Profile
        </h1>

        <p className="text-[#85817B] text-sm mt-2">
          View your library membership and account information.
        </p>
      </header>

      {/* PROFILE CARD */}
      <section className="bg-white border border-[#EEEAE4] rounded-[28px] overflow-hidden">

        {/* DECORATIVE BANNER */}
        <div className="h-32 bg-[#F5C96A] relative overflow-hidden">
          <div className="absolute -right-12 -top-20 w-64 h-64 rounded-full bg-white/25" />
          <div className="absolute right-28 -bottom-20 w-48 h-48 rounded-full bg-[#E8A6A1]/60" />
        </div>

        <div className="px-6 md:px-9 pb-8">

          {/* PROFILE IDENTITY */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-10 relative">
            <div className="w-24 h-24 bg-[#E8A6A1] rounded-[24px] border-[5px] border-white flex items-center justify-center shrink-0">
              <UserRound size={43} className="text-[#6D3433]" />
            </div>

            <div className="flex-1 sm:pb-2">
              <h2 className="text-2xl font-extrabold text-[#292929]">
                {student.name}
              </h2>

              <p className="text-[#85817B] text-sm mt-1">
                {student.department}
              </p>
            </div>

            <span className="inline-flex items-center gap-2 bg-[#E9F4F0] text-[#27816B] rounded-full px-4 py-2 text-xs font-bold self-start sm:mb-3">
              <CheckCircle2 size={16} />
              Active Membership
            </span>
          </div>

          <div className="border-t border-[#EEEAE4] my-8" />

          {/* PERSONAL INFORMATION */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#292929]">
                  Personal Information
                </h3>

                <p className="text-sm text-[#85817B] mt-1">
                  Your registered library account details.
                </p>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={startEditing}
                  className="rounded-xl bg-[#292929] px-5 py-3 text-sm font-semibold text-white hover:bg-[#454545] transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {profileMessage && (
              <div
                role="status"
                className={`mt-5 rounded-xl px-4 py-3 text-sm font-medium ${
                  profileMessage.type === "success"
                    ? "bg-[#E9F4F0] text-[#27816B]"
                    : "bg-[#FCE8E6] text-[#A33A32]"
                }`}
              >
                {profileMessage.text}
              </div>
            )}

            {isEditing && (
              <form
                onSubmit={saveProfile}
                className="mt-6 rounded-2xl border border-[#EEEAE4] bg-[#FCFBF8] p-5 space-y-5"
              >
                <div>
                  <label
                    htmlFor="profile-full-name"
                    className="block text-sm font-semibold text-[#292929] mb-2"
                  >
                    Full Name
                  </label>

                  <input
                    id="profile-full-name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={editName}
                    onChange={(event) =>
                      setEditName(event.target.value)
                    }
                    className="w-full rounded-xl border border-[#E5E0D8] bg-white px-4 py-3 text-sm text-[#292929] focus:border-[#D3A843] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="profile-department"
                    className="block text-sm font-semibold text-[#292929] mb-2"
                  >
                    Department
                  </label>

                  <input
                    id="profile-department"
                    type="text"
                    maxLength={100}
                    value={editDepartment}
                    onChange={(event) =>
                      setEditDepartment(event.target.value)
                    }
                    placeholder="e.g. Computer Science"
                    className="w-full rounded-xl border border-[#E5E0D8] bg-white px-4 py-3 text-sm text-[#292929] focus:border-[#D3A843] focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="rounded-xl bg-[#292929] px-5 py-3 text-sm font-semibold text-white hover:bg-[#454545]"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="rounded-xl border border-[#E5E0D8] bg-white px-5 py-3 text-sm font-semibold text-[#625B55] hover:bg-[#F7F5F0]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

              <InfoField
                icon={UserRound}
                label="Full Name"
                value={student.name}
              />

              <InfoField
                icon={IdCard}
                label="Student ID"
                value={student.studentId}
              />

              <InfoField
                icon={Mail}
                label="Email Address"
                value={student.email}
              />

              <InfoField
                icon={GraduationCap}
                label="Department"
                value={student.department}
              />

              <InfoField
                icon={ShieldCheck}
                label="Account Role"
                value={student.role}
              />

              <InfoField
                icon={CalendarDays}
                label="Member Since"
                value={formatDate(student.joinedDate)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ACCOUNT STATISTICS */}
      <section>
        <h2 className="text-xl font-bold text-[#292929] mb-5">
          My Library Activity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                style={{ backgroundColor: stat.background }}
                className="rounded-[24px] p-6 min-h-40 flex flex-col justify-between"
              >
                <div className="w-11 h-11 rounded-xl bg-white/50 flex items-center justify-center">
                  <Icon size={23} className="text-[#292929]" />
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

      {/* ACCOUNT SETTINGS */}
      <section className="bg-white border border-[#EEEAE4] rounded-[28px] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#F9E8B5] flex items-center justify-center">
            <Settings size={22} className="text-[#87651F]" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#292929]">
              Account Settings
            </h2>

            <p className="text-sm text-[#85817B] mt-1">
              Manage your account preferences and security.
            </p>
          </div>
        </div>

        <div className="border border-[#EEEAE4] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-11 h-11 bg-[#F7F5F0] rounded-xl flex items-center justify-center shrink-0">
            <LockKeyhole size={21} className="text-[#625B55]" />
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-[#292929] text-sm">
              Change Password
            </h3>

            <p className="text-xs text-[#85817B] mt-1">
              Password management will be available after authentication is implemented.
            </p>
          </div>

          <button
            disabled
            title="Password management is not available in this prototype"
            className="bg-[#F2F0EA] text-[#9B978F] px-5 py-3 rounded-xl text-xs font-semibold cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </section>

      {/* PROTOTYPE NOTICE */}
      <div className="bg-[#E9F4F0] rounded-[20px] p-5 flex items-start gap-3">
        <Info
          size={20}
          className="text-[#276C64] shrink-0 mt-0.5"
        />

        <div>
          <h3 className="text-sm font-bold text-[#292929]">
            Prototype Account
          </h3>

          <p className="text-sm text-[#55736C] mt-1 leading-relaxed">
            The profile information and statistics shown here are
            demonstration data. Real student information will be
            retrieved securely from the backend after login
            functionality is implemented.
          </p>
        </div>
      </div>
    </div>
  );
}

// Reusable profile information field
function InfoField({ icon: Icon, label, value }) {
  return (
    <div className="bg-[#F7F5F0] rounded-2xl p-4 flex items-start gap-3">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
        <Icon size={19} className="text-[#625B55]" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-[#85817B]">
          {label}
        </p>

        <p className="text-sm font-bold text-[#292929] mt-1 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}
