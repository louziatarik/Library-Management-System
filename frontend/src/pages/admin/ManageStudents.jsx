
import { useMemo, useState } from "react";
import {
  Users,
  UserRound,
  UserRoundPlus,
  UserCheck,
  UserX,
  Search,
  Pencil,
  X,
  Check,
  ShieldCheck,
  Info
} from "lucide-react";

const initialStudents = [
  {
    id: "STU-001",
    name: "Student 001",
    email: "student001@example.com",
    department: "Computer Science",
    joinedAt: "2026-09-01",
    active: true
  },
  {
    id: "STU-002",
    name: "Student 002",
    email: "student002@example.com",
    department: "Software Engineering",
    joinedAt: "2026-09-03",
    active: true
  },
  {
    id: "STU-003",
    name: "Student 003",
    email: "student003@example.com",
    department: "Computer Science",
    joinedAt: "2026-09-05",
    active: false
  },
  {
    id: "STU-004",
    name: "Student 004",
    email: "student004@example.com",
    department: "Information Technology",
    joinedAt: "2026-09-08",
    active: true
  },
  {
    id: "STU-005",
    name: "Student 005",
    email: "student005@example.com",
    department: "UI/UX Design",
    joinedAt: "2026-09-12",
    active: true
  }
];

const emptyForm = {
  id: "",
  name: "",
  email: "",
  department: "",
  active: true
};

function formatDate(value) {
  if (!value) return "—";

  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  );
}

function todayString() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function ManageStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const activeCount = students.filter(
    (student) => student.active
  ).length;

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch = [
        student.name,
        student.id,
        student.email,
        student.department
      ].some((value) =>
        value.toLowerCase().includes(query)
      );

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active"
          ? student.active
          : !student.active);

      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
    setShowForm(true);
  };

  const openEditForm = (student) => {
    setEditingId(student.id);

    setForm({
      id: student.id,
      name: student.name,
      email: student.email,
      department: student.department,
      active: student.active
    });

    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleaned = {
      id: form.id.trim().toUpperCase(),
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      department: form.department.trim(),
      active: form.active
    };

    if (
      !cleaned.id ||
      !cleaned.name ||
      !cleaned.email ||
      !cleaned.department
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const duplicateId = students.some(
      (student) =>
        student.id.toLowerCase() === cleaned.id.toLowerCase() &&
        student.id !== editingId
    );

    if (duplicateId) {
      setError("This student ID already exists.");
      return;
    }

    const duplicateEmail = students.some(
      (student) =>
        student.email.toLowerCase() === cleaned.email &&
        student.id !== editingId
    );

    if (duplicateEmail) {
      setError("This email address is already registered.");
      return;
    }

    if (editingId !== null) {
      setStudents((current) =>
        current.map((student) =>
          student.id === editingId
            ? {
                ...student,
                ...cleaned,
                id: editingId
              }
            : student
        )
      );
    } else {
      setStudents((current) => [
        ...current,
        {
          ...cleaned,
          joinedAt: todayString()
        }
      ]);
    }

    closeForm();
  };

  const toggleStudentStatus = (student) => {
    const action = student.active ? "deactivate" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${student.name}?`
    );

    if (!confirmed) return;

    setStudents((current) =>
      current.map((item) =>
        item.id === student.id
          ? { ...item, active: !item.active }
          : item
      )
    );
  };

  const summaryCards = [
    {
      title: "Total Students",
      value: students.length,
      icon: Users,
      background: "#D8EDE8"
    },
    {
      title: "Active Students",
      value: activeCount,
      icon: UserCheck,
      background: "#F9E8B5"
    },
    {
      title: "Inactive Students",
      value: students.length - activeCount,
      icon: UserX,
      background: "#F6D7D1"
    }
  ];

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-[#A29A90]">
            Administration / Students
          </p>

          <h1 className="text-3xl font-bold text-[#292929] mt-1">
            Manage Students
          </h1>

          <p className="text-sm text-[#85817B] mt-2">
            View and manage registered library members.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center gap-2 bg-[#F5C96A] px-5 py-3 rounded-2xl font-semibold text-[#292929] hover:bg-[#E9BA50] transition-colors"
        >
          <UserRoundPlus size={19} />
          Add Student
        </button>
      </header>

      {/* STATISTICS */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              style={{ backgroundColor: card.background }}
              className="rounded-[24px] p-6 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-[#625B55]">
                  {card.title}
                </p>

                <h2 className="text-3xl font-extrabold text-[#292929] mt-2">
                  {card.value}
                </h2>
              </div>

              <div className="bg-white/50 p-3 rounded-xl">
                <Icon size={25} className="text-[#292929]" />
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
              placeholder="Search name, student ID, email..."
              aria-label="Search students"
              className="w-full pl-11 pr-4 py-3 bg-[#F7F5F0] rounded-xl outline-none focus:ring-2 focus:ring-[#F5C96A] text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter students by status"
            className="px-4 py-3 bg-[#F7F5F0] rounded-xl outline-none focus:ring-2 focus:ring-[#F5C96A] text-sm"
          >
            <option value="All">All Students</option>
            <option value="Active">Active Students</option>
            <option value="Inactive">Inactive Students</option>
          </select>
        </div>
      </section>

      {/* STUDENT TABLE */}
      <section className="bg-white border border-[#EEEAE4] rounded-[28px] overflow-hidden">
        <div className="p-6 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#292929]">
            Registered Students
          </h2>

          <span className="text-sm text-[#85817B]">
            {filteredStudents.length} students
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F7F5F0]">
              <tr className="text-xs uppercase tracking-wide text-[#85817B]">
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Department</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-[#EEEAE4] hover:bg-[#FCFBF8]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 min-w-56">
                      <div className="w-11 h-11 rounded-full bg-[#D8EDE8] flex items-center justify-center shrink-0">
                        <UserRound size={21} className="text-[#276C64]" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#292929]">
                          {student.name}
                        </p>

                        <p className="text-xs text-[#85817B] mt-1">
                          {student.id}
                        </p>

                        <p className="text-xs text-[#85817B] mt-1">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#625B55]">
                    {student.department}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#625B55] whitespace-nowrap">
                    {formatDate(student.joinedAt)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${
                        student.active
                          ? "bg-[#E9F4F0] text-[#27816B]"
                          : "bg-[#FFF0ED] text-[#B45C53]"
                      }`}
                    >
                      {student.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditForm(student)}
                        aria-label={`Edit ${student.name}`}
                        title="Edit student"
                        className="p-2 bg-[#F7F5F0] rounded-lg hover:bg-[#F5C96A]"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleStudentStatus(student)}
                        aria-label={`${student.active ? "Deactivate" : "Activate"} ${student.name}`}
                        title={student.active ? "Deactivate student" : "Activate student"}
                        className={`p-2 rounded-lg ${
                          student.active
                            ? "bg-[#FFF0ED] text-[#B45C53] hover:bg-[#F6D7D1]"
                            : "bg-[#E9F4F0] text-[#27816B] hover:bg-[#D8EDE8]"
                        }`}
                      >
                        {student.active ? (
                          <UserX size={17} />
                        ) : (
                          <UserCheck size={17} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-12 text-[#85817B]"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* INFORMATION */}
      <div className="bg-[#E9F4F0] rounded-[20px] p-5 flex items-start gap-3">
        <Info size={20} className="text-[#276C64] shrink-0 mt-0.5" />

        <p className="text-sm text-[#55736C] leading-relaxed">
          Demo mode: these are fictional student records.
          Changes are temporary and reset when the page reloads.
          Real student account management will require backend
          authentication, administrator permissions, and secure
          account handling.
        </p>
      </div>

      {/* ADD / EDIT STUDENT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-form-title"
            className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[28px] p-6 md:p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2
                id="student-form-title"
                className="text-2xl font-bold text-[#292929]"
              >
                {editingId !== null ? "Edit Student" : "Add Student"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
                className="p-2 rounded-lg hover:bg-[#F7F5F0]"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "id", label: "Student ID", type: "text" },
                { name: "name", label: "Full Name", type: "text" },
                { name: "email", label: "Email Address", type: "email" },
                { name: "department", label: "Department", type: "text" }
              ].map((field) => (
                <label
                  key={field.name}
                  className="block text-sm font-semibold text-[#292929]"
                >
                  {field.label}

                  <input
                    type={field.type}
                    required
                    disabled={editingId !== null && field.name === "id"}
                    value={form[field.name]}
                    onChange={(event) => {
                      setError("");

                      setForm((current) => ({
                        ...current,
                        [field.name]: event.target.value
                      }));
                    }}
                    className="mt-2 w-full px-4 py-3 bg-[#F7F5F0] rounded-xl outline-none focus:ring-2 focus:ring-[#F5C96A] font-normal disabled:opacity-60"
                  />
                </label>
              ))}

              <label className="flex items-center gap-3 text-sm font-semibold text-[#292929]">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      active: event.target.checked
                    }))
                  }
                  className="w-4 h-4 accent-[#D8A53B]"
                />

                Active membership
              </label>

              {error && (
                <p
                  role="alert"
                  className="bg-[#FFF0ED] text-[#B45C53] rounded-xl p-3 text-sm"
                >
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-3 bg-[#F7F5F0] rounded-xl text-sm font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-3 bg-[#F5C96A] rounded-xl text-sm font-semibold hover:bg-[#E9BA50]"
                >
                  <Check size={18} />
                  {editingId !== null ? "Save Changes" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
