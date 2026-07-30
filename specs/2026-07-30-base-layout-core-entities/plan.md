# Implementation Plan: Phase 2 — Base Layout and Core Entities

## Group 1: Database Foundation
- [ ] Install `better-sqlite3` and `@types/better-sqlite3`.
- [ ] Implement a simple database connection utility.
- [ ] Create migration files for `agents`, `ailments`, and `agent_ailments` tables.
- [ ] Implement the migration runner to apply SQL files on startup.

## Group 2: Core Data Access
- [ ] Implement query functions for fetching all agents.
- [ ] Implement query functions for fetching a single agent by ID.
- [ ] Implement query functions for fetching all ailments.

## Group 3: Routing and UI
- [ ] Create the `/agents` route to display the agent list.
- [ ] Create the `/agents/:id` route to display the agent detail page.
- [ ] Create the `/ailments` route to display the ailment list.
- [ ] Integrate these routes into the `Layout` component.

## Group 4: Seeding and Finalization
- [ ] Create a seed script to populate the database with fictional agents and whimsical ailments.
- [ ] Verify that all routes are reachable and displaying seed data.
