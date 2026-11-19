
import { apiRequest } from "./api";

// Provisional endpoints.
// Update these paths when Nada confirms the FastAPI routes.
const STUDENT_ENDPOINTS = {
  list: "/students",
  detail: (id) => `/students/${encodeURIComponent(id)}`,
  status: (id) =>
    `/students/${encodeURIComponent(id)}/status`
};

// Retrieve all students (administrator).
export async function getStudents() {
  return apiRequest(STUDENT_ENDPOINTS.list);
}

// Retrieve a student by ID.
export async function getStudentById(id) {
  return apiRequest(STUDENT_ENDPOINTS.detail(id));
}

// Register a student record (administrator).
export async function createStudent(studentData) {
  return apiRequest(STUDENT_ENDPOINTS.list, {
    method: "POST",
    body: JSON.stringify(studentData)
  });
}

// Update student information (administrator).
export async function updateStudent(id, studentData) {
  return apiRequest(STUDENT_ENDPOINTS.detail(id), {
    method: "PUT",
    body: JSON.stringify(studentData)
  });
}

// Change a student's account status (administrator).
export async function updateStudentStatus(id, active) {
  return apiRequest(STUDENT_ENDPOINTS.status(id), {
    method: "PATCH",
    body: JSON.stringify({ active })
  });
}
