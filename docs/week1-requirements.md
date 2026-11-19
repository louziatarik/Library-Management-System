# Week 1 Requirements Review

Group 3 — Library Management System  
Prepared by Abiaoui Aymane (239J78)

## Student requirements

- Students can browse the catalogue and search by title, author, or category.
- Students can view book details and check whether a copy is available.
- Signed-in students can view their own current and past loans, including due dates and loan status.

## Administrator requirements

- Administrators can add, edit, and deactivate book records and manage categories and user accounts.
- Administrators can record checkouts and returns and search loan records.
- Checkout requires an active student account and an available copy. A successful checkout creates a loan with a due date and reduces the available-copy count by one.
- Recording a return closes the loan and increases the available-copy count by one. Recording the same return again must leave the count unchanged.

## Decisions for the group to confirm

1. Borrowing — Should students ask for books at the library desk or submit requests through the website? Proposed for the first version: students check availability online, ask at the desk, and an administrator records checkout.
2. Registration — The requirements table lists student registration. Confirm whether students create their own accounts or administrators create them.