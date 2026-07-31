# Implementation Plan: MVP Completion
Date: 2026-07-31

## Overview
This plan details the steps to implement Phases 3 through 7 of the AgentClinic roadmap to reach MVP status.

## Task List

### Step 1: Data Foundation
- [ ] Create migration for `therapies` table.
- [ ] Create migration for `ailment_therapies` join table.
- [ ] Create migration for `appointments` table.
- [ ] Seed database with initial therapy data and ailment-therapy mappings.

### Step 2: Phase 3 — Therapies Catalog
- [ ] Implement `/therapies` list route.
- [ ] Implement therapy detail views.
- [ ] Update ailment detail pages to list recommended therapies.
- [ ] Verify with Vitest.

### Step 3: Phase 4 — Appointment Booking
- [ ] Add "Book Appointment" form to agent profile pages.
- [ ] Implement POST route for appointment creation.
- [ ] Implement appointment confirmation page.
- [ ] Verify booking flow and DB persistence with Vitest.

### Step 4: Phase 5 — Staff Dashboard
- [ ] Create `/dashboard` route.
- [ ] Implement summary statistics (Agent count, Appointment count, Ailment count).
- [ ] Implement appointment management table.
- [ ] Implement status update functionality for appointments.
- [ ] Verify dashboard accuracy with Vitest.

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
