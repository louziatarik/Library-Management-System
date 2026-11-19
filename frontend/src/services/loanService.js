
import { apiRequest } from "./api";

// Provisional endpoints.
// Update these paths when Nada confirms the FastAPI routes.
const LOAN_ENDPOINTS = {
  list: "/loans",
  detail: (id) => `/loans/${encodeURIComponent(id)}`,
  myLoans: "/loans/my",
  borrow: "/loans",
  returnBook: (id) =>
    `/loans/${encodeURIComponent(id)}/return`
};

// Retrieve all loan records (administrator).
export async function getLoans() {
  return apiRequest(LOAN_ENDPOINTS.list);
}

// Retrieve one loan by ID.
export async function getLoanById(id) {
  return apiRequest(LOAN_ENDPOINTS.detail(id));
}

// Retrieve loans belonging to the logged-in student.
export async function getMyLoans() {
  return apiRequest(LOAN_ENDPOINTS.myLoans);
}

// Borrow a book.
export async function borrowBook(loanData) {
  return apiRequest(LOAN_ENDPOINTS.borrow, {
    method: "POST",
    body: JSON.stringify(loanData)
  });
}

// Mark a loan as returned.
// The backend must verify permissions and update book availability.
export async function returnBook(loanId) {
  return apiRequest(LOAN_ENDPOINTS.returnBook(loanId), {
    method: "POST"
  });
}
