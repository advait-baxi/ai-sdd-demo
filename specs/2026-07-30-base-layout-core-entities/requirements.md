# Requirements: Phase 2 — Base Layout and Core Entities

## Scope
The goal of this phase is to transition AgentClinic from a static layout to a data-driven application by introducing a database and the first set of core entities.

### Database
- Integrate SQLite via `better-sqlite3`.
- Implement a basic migration system using SQL files.
- Create the following tables:
    - `agents`: id, name, model_type, status, description.
    - `ailments`: id, name, description.
    - `agent_ailments`: link table between agents and ailments.

### Features
- **Agent Directory**:
    - `/agents`: List all agents from the database.
    - `/agents/:id`: Detailed profile for a specific agent.
- **Ailment Catalog**:
    - `/ailments`: List all known AI ailments.
- **Shared Layout**: Ensure all these pages are rendered within the existing `Layout` component.

## Decisions
- **Storage**: SQLite for simplicity and zero-config deployment.
- **Templating**: Continue using Hono JSX for server-side rendering.
- **Data Access**: Plain SQL queries via `better-sqlite3` (no ORM).
- **Styling**: Use PicoCSS for a minimal, classless CSS framework that ensures a professional look with zero configuration.

## Context
This phase builds on the base layout already implemented. It introduces the primary data models that will be used by later phases (Therapies, Booking, Dashboard).
