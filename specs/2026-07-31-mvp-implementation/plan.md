# Implementation Plan: MVP Completion

Date: 2026-07-31

## Overview

This plan details the steps to implement Phases 3 through 7 of the AgentClinic roadmap to reach MVP status.

## Task List

### Step 1: Data Foundation

- [x] Create migration for `therapies` table.
- [x] Create migration for `ailment_therapies` join table.
- [x] Create migration for `appointments` table.
- [x] Seed database with initial therapy data and ailment-therapy mappings.

### Step 2: Phase 3 — Therapies Catalog

- [x] Implement `/therapies` list route.
- [x] Implement therapy detail views.
- [x] Update ailment detail pages to list recommended therapies.
- [x] Verify with Vitest.

### Step 3: Phase 4 — Appointment Booking

- [x] Add "Book Appointment" form to agent profile pages.
- [x] Implement POST route for appointment creation.
- [x] Implement appointment confirmation page.
- [x] Verify booking flow and DB persistence with Vitest.

### Step 4: Phase 5 — Staff Dashboard

- [x] Create `/dashboard` route.
- [x] Implement summary statistics (Agent count, Appointment count, Ailment count).
- [x] Implement appointment management table.
- [x] Implement status update functionality for appointments.
- [x] Verify dashboard accuracy with Vitest.

### Step 5: Phase 6 — Polish & Accessibility

- [ ] Audit all templates for semantic HTML usage.
- [ ] Implement global focus styles and keyboard navigation.
- [ ] Test responsiveness across mobile and desktop viewports.

### Step 6: Phase 7 — Hardening

- [ ] Implement custom 404 and 500 error handlers in Hono.
- [ ] Add input sanitization middleware/utilities for all form inputs.
- [ ] Integrate basic request/error logging middleware.

### Step 7: Final Validation

- [ ] Perform full end-to-end walkthrough of the agent-to-therapy-to-dashboard flow.
- [ ] Run full test suite.
- [ ] Final sign-off.
