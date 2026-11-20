
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
