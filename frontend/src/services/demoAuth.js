
const STORAGE_KEY = "booknest_demo_accounts";

// DEMO ONLY — not production authentication.
// Accounts exist only in this browser.
// Never use real passwords with this prototype.

function getAccounts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const accounts = saved ? JSON.parse(saved) : [];

    return Array.isArray(accounts) ? accounts : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(accounts)
  );
}

export function registerStudent({
  fullName,
  email,
  password,
}) {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getAccounts();

  if (
    accounts.some(
      (account) => account.email === normalizedEmail
    )
  ) {
    return {
      error: "An account with this email already exists.",
    };
  }

  if (password.length < 8) {
    return {
      error: "Password must contain at least 8 characters.",
    };
  }

  const newAccount = {
    id: crypto.randomUUID(),
    fullName: fullName.trim(),
    email: normalizedEmail,
    role: "student",
    // Deliberately no password stored in browser storage.
  };

  accounts.push(newAccount);
  saveAccounts(accounts);

  return { user: newAccount };
}

export function loginDemo({
  email,
  password,
  role,
}) {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getAccounts();

  const account = accounts.find(
    (item) => item.email === normalizedEmail
  );

  if (!account) {
    return {
      error: "Account not found. Please register first.",
    };
  }

  if (account.role !== role) {
    return {
      error:
        role === "admin"
          ? "This account does not have administrator access."
          : "This account is not registered as a student.",
    };
  }

  // Password verification requires a backend.
  // This demo checks only that a password was provided.
  if (!password) {
    return {
      error: "Please enter your password.",
    };
  }

  return { user: account };
}
// ----------------------------------
// DEMO SESSION MANAGEMENT
// ----------------------------------

// Demo-only browser session.
// Not a secure authentication mechanism.

const SESSION_KEY = "booknest_demo_session";

export function saveDemoSession(user) {
  if (!user || user.role !== "student") {
    return;
  }

  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    })
  );
}

export function getDemoSession() {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);

    if (!saved) return null;

    const session = JSON.parse(saved);

    if (!session || session.role !== "student") {
      return null;
    }

    // Ensure the account still exists in demo storage.
    const account = getAccounts().find(
      (item) =>
        item.id === session.id &&
        item.email === session.email &&
        item.role === "student"
    );

    return account || null;
  } catch {
    return null;
  }
}

export function clearDemoSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

// ----------------------------------
// DEMO STUDENT PROFILE UPDATES
// ----------------------------------

export function updateStudentProfile(studentId, changes) {
  const accounts = getAccounts();

  const index = accounts.findIndex(
    (account) =>
      account.id === studentId &&
      account.role === "student"
  );

  if (index === -1) {
    return { error: "Student account not found." };
  }

  const fullName = String(changes?.fullName ?? "").trim();
  const department = String(changes?.department ?? "").trim();

  if (fullName.length < 2 || fullName.length > 100) {
    return {
      error: "Full name must contain between 2 and 100 characters."
    };
  }

  if (department.length > 100) {
    return {
      error: "Department must not exceed 100 characters."
    };
  }

  const updatedAccount = {
    ...accounts[index],
    fullName,
    department
  };

  accounts[index] = updatedAccount;
  saveAccounts(accounts);

  saveDemoSession(updatedAccount);

  return { user: updatedAccount };
}
