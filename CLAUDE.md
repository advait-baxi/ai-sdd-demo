# AgentClinic

AI Agent Wellness Clinic; Node.js, Hono, SQLite (`better-sqlite3`), TypeScript, Pico CSS.

## Commands
```bash
npm run dev  # Start server with watch mode
npm test     # Run Vitest tests
```

## Architecture
- **Routing & UI**: Co-located in `src/index.ts` using `hono/html`.
- **Data Access**: All SQL queries reside in `src/db/queries.ts`.
- **Database**: SQLite schema managed via `migrations/*.sql` files, applied on startup.
- **UI Components**: Shared layout fragments in `src/components/`.
- **Documentation**: Requirements and roadmaps in `specs/`.

## Conventions
- Keep `src/index.ts` focused on routing; move business/data logic to `src/db/queries.ts`.
- Use `better-sqlite3` for DB interactions; cast results to `any` or specific types in the query layer.
- Follow Pico CSS for styling (semantic HTML).

## Critical Warnings
- Database migrations are additive. To modify existing tables, create a new `.sql` file in `migrations/` using the table-recreation pattern (temporary table → copy data → drop old → rename).
