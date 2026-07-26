# Plan: Hello Hono

This plan implements Phase 1 of the roadmap: establishing the base server and development environment.

## Group 1: Project Initialization
1. Run `npm init -y` to create a basic `package.json`.
2. Install core dependencies: `npm install hono @hono/node-server`.
3. Install development dependencies: `npm install -D typescript @types/node tsx`.
4. Configure `package.json` scripts:
   - `"dev": "tsx watch src/index.ts"`

## Group 2: TypeScript Configuration
5. Create `tsconfig.json` with settings optimized for Node.js and Hono (e.g., `target: ESNext`, `module: ESNext`, `moduleResolution: Node`).

## Group 3: Core Server Implementation
6. Create `src/index.ts`.
7. Import `Hono` and `serve` from `@hono/node-server`.
8. Initialize the Hono app: `const app = new Hono()`.
9. Start the server on port 3000:
   ```typescript
   serve({ fetch: app.fetch, port: 3000 })
   ```

## Group 4: Minimal Home Page Implementation
10. Import the `html` helper from `hono/html`.
11. Define the root route using `c.html()`:
    ```typescript
    app.get('/', (c) => c.html(html`<h1>AgentClinic</h1><p>Open for business</p>`))
    ```

## Group 6: Layout and Styling
15. Create a static directory for assets: `src/static/`.
16. Create `src/static/style.css` with basic layout styles.
17. Implement layout sub-components in `src/components/`:
    - `Header.ts`: Top navigation/branding.
    - `Footer.ts`: Copyright and links.
    - `Main.ts`: Primary content area.
18. Create a `Layout.ts` component that imports and wraps `Header`, `Main`, and `Footer`.
19. Configure the Hono app to serve static files from `src/static/`.
20. Use the `Layout` component in the root route and link the CSS file in the HTML head.

## Group 7: Final Verification
21. Execute `npm run dev`.
22. Verify the server is running and responding correctly via a browser or `curl`.
23. Verify that `tsc` (or the IDE) reports no type errors.
