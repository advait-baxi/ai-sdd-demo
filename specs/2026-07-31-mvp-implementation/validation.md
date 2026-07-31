# Validation Plan: MVP Implementation
Date: 2026-07-31

## 1. Success Criteria
The implementation is considered successful when all following criteria are met and verified.

## 2. Feature Validation

### 2.1 Therapies Catalog (Phase 3)
- [ ] **List Page**: Navigating to `/therapies` renders a list of all seeded therapies.
- [ ] **Details**: Clicking a therapy shows its specific description and category.
- [ ] **Matching**: Viewing an agent's ailment shows the correctly mapped recommended therapies.

### 2.2 Appointment Booking (Phase 4)
- [ ] **Form Availability**: Every agent profile has a visible and accessible booking form.
- [ ] **Data Persistence**: Submitting the form creates a record in the `appointments` table.
- [ ] **UX Flow**: User is redirected to a confirmation page after a successful booking.
- [ ] **Validation**: Attempting to book a date in the past results in a validation error.

### 2.3 Staff Dashboard (Phase 5)
- [ ] **Metrics**: The `/dashboard` correctly reflects the current count of agents, appointments, and ailments.
- [ ] **Management**: Staff can see a list of all appointments and change their status (e.g., Pending $\rightarrow$ Completed).
- [ ] **Data Accuracy**: Dashboard counts update immediately after a new appointment is booked.

### 2.4 Polish & Accessibility (Phase 6)
- [ ] **Semantics**: HTML inspector confirms use of `<main>`, `<nav>`, and heading hierarchies.
- [ ] **Keyboard**: User can navigate the entire app and submit forms using only the Tab and Enter keys.
- [ ] **Responsiveness**: Application remains usable and visually consistent on screens from 320px to 1920px width.

### 2.5 Hardening (Phase 7)
- [ ] **Error Pages**: Navigating to a non-existent route renders the custom 404 page.
- [ ] **Sanitization**: Inputting `<script>alert(1)</script>` into a form does not execute JavaScript on the page.
- [ ] **Logging**: Server logs show incoming requests and detailed error stacks for 500 errors.

## 3. Regression Testing
- [ ] All existing tests for Phase 1 and 2 pass.
- [ ] New functional tests for Phases 3-7 pass in Vitest.
