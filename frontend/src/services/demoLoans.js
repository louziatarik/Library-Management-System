
const STORAGE_KEY = "booknest_demo_loans";

// DEMO ONLY — browser storage, not a real loan database.
// Never use this for production borrowing or authorization.

function readAllLoans() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const data = saved ? JSON.parse(saved) : {};

    return data &&
      typeof data === "object" &&
      !Array.isArray(data)
      ? data
      : {};
  } catch {
    return {};
  }
}

export function getStudentLoans(studentId) {
  if (!studentId) return [];

  const allLoans = readAllLoans();
  const loans = allLoans[String(studentId)];

  return Array.isArray(loans) ? loans : [];
}

export function saveStudentLoans(studentId, loans) {
  if (!studentId || !Array.isArray(loans)) return;

  const allLoans = readAllLoans();

  allLoans[String(studentId)] = loans;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(allLoans)
  );
}
