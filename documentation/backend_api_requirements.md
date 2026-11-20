
# BookNest — Backend API Requirements

## 1. Project Overview

BookNest is a Library Management System developed with:

- Frontend: React, Vite, Tailwind CSS
- Backend: Python, FastAPI
- Database: SQLite
- Authentication: JWT (planned)

The backend will provide REST API endpoints for students
and administrators.

All endpoints below are proposed contracts and must be
confirmed by the frontend and backend developers.

## 2. User Roles

### Student
- Register an account
- Log in
- Browse books
- Borrow available books
- Return borrowed books
- View personal loan history
- Manage personal profile

### Administrator
- Log in with an existing administrator account
- Manage books and categories
- View and manage student records
- Monitor library loans

Public registration must create Student accounts only.
Administrator accounts must be provisioned separately.

## 3. Authentication Endpoints

### POST /auth/register

Request:
{
  "full_name": "Example Student",
  "email": "student@example.com",
  "password": "example-password"
}

Response:
{
  "id": 1,
  "full_name": "Example Student",
  "email": "student@example.com",
  "role": "student"
}

### POST /auth/login

Request:
{
  "email": "student@example.com",
  "password": "example-password"
}

Response:
{
  "access_token": "JWT_TOKEN",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "full_name": "Example Student",
    "email": "student@example.com",
    "role": "student"
  }
}

The backend must validate credentials and determine
the account role. The frontend's selected login role
must not grant administrator permissions.

### GET /auth/me

Requires Bearer token.

Returns the authenticated user's profile.

## 4. Book Endpoints

GET /books
GET /books/{book_id}
GET /categories

Administrator only:

POST /books
PUT /books/{book_id}
DELETE /books/{book_id}

Suggested book fields:

{
  "id": 1,
  "title": "Example Book",
  "author": "Example Author",
  "isbn": "9780000000000",
  "category": "Technology",
  "description": "Book description",
  "available": true
}

## 5. Loan Endpoints

Student:

GET /loans/me
POST /loans
POST /loans/{loan_id}/return

Administrator:

GET /loans
GET /loans/{loan_id}

Borrow request:

{
  "book_id": 1
}

Suggested loan response:

{
  "id": 1,
  "book_id": 1,
  "student_id": 1,
  "borrowed_date": "2026-11-20",
  "due_date": "2026-12-04",
  "returned_date": null,
  "status": "active"
}

The backend must:
- Determine student identity from the token
- Prevent borrowing unavailable books
- Prevent duplicate active loans for the same book
- Update availability when books are borrowed or returned
- Prevent students from returning other students' loans

## 6. Security Requirements

- Hash passwords securely using a suitable password-hashing library.
- Never store plaintext passwords.
- Validate JWT access tokens on protected endpoints.
- Enforce Student and Admin roles on the server.
- Restrict administrator endpoints to authorized accounts.
- Validate request data using Pydantic.
- Configure CORS for the React development origin.
- Return appropriate HTTP error codes.

## 7. Frontend Integration

Development frontend:
http://localhost:5173

Proposed backend:
http://127.0.0.1:8000

Frontend environment variable:

VITE_API_URL=http://127.0.0.1:8000

The frontend currently uses demo data and demo
authentication. Real API integration will begin
once the backend endpoints are implemented.

## 8. Team Coordination

Before implementation, confirm:
- Endpoint names and HTTP methods
- Request and response formats
- Authentication token handling
- Database models and relationships
- Book availability and borrowing rules
- Error response formats
- Student and administrator permissions
