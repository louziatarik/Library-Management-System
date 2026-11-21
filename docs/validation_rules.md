# Validation Rules - Library Management System

## User Rules
- Email must be unique.
- Password must be hashed (bcrypt) before saving.
- Only admins can change user status (active/inactive).

## Book Rules
- `available_copies` must be >= 0 and <= `total_copies`.
- A book that has active loans cannot be deleted (must be deactivated instead).

## Loan Rules
- Cannot create a loan if `available_copies = 0`.
- Cannot create a loan if user status is not 'active'.
- `due_date` must be after `borrow_date`.
- On loan creation: `available_copies = available_copies - 1`.
- On return: `return_date = today`, status = 'returned', `available_copies = available_copies + 1`.
- Loan becomes 'overdue' automatically if `due_date < today` and status = 'borrowed'.