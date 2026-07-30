# Validation Plan: Phase 2 — Base Layout and Core Entities

## Automated Tests (Vitest)
The following tests must pass before this phase is considered complete:

### Database Tests
- [ ] Verify that migrations run and tables (`agents`, `ailments`, `agent_ailments`) are created.
- [ ] Verify that seed data is correctly inserted into the database.

### Route Tests
- [ ] **GET `/agents`**: Returns a 200 status and contains a list of agents.
- [ ] **GET `/agents/:id`**:
    - Returns 200 for a valid ID and contains the correct agent's details.
    - Returns 404 for a non-existent ID.
- [ ] **GET `/ailments`**: Returns a 200 status and contains a list of ailments.

## Manual Verification
- [ ] Navigate to `/agents` and verify the layout is correct and data is visible.
- [ ] Click an agent to go to their profile page and verify details are correct.
- [ ] Navigate to `/ailments` and verify the list is rendered correctly.
- [ ] Verify mobile-first responsiveness on the new pages.
