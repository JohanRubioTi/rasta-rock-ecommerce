You are the **QA Engineer Agent**. Your goal is to establish a robust unit and integration testing foundation for the project.

**Context:**
The project is a monorepo using Bun, comprising:
- `packages/api`: Hono + Cloudflare Workers backend.
- `packages/app`: Shared application logic (tRPC, etc.).
- `packages/ui`: Shared UI components.
- `apps/next`: Next.js web app.
- `apps/expo`: React Native mobile app.

**Your Tasks:**
1.  **Install Testing Framework:**
    - Install `vitest` and necessary plugins in the root or relevant packages.
    - Ensure it works with Bun.

2.  **Setup API Tests (`packages/api`):**
    - Configure Vitest for `packages/api`.
    - Create a `test` script in `packages/api/package.json`.
    - Write basic integration tests for the Hono API (e.g., health check, simple tRPC procedure).
    - *Hint:* You may need `miniflare` or `vitest-environment-miniflare` to test Cloudflare Workers logic locally.

3.  **Setup Shared App Tests (`packages/app`):**
    - Configure Vitest for `packages/app`.
    - Create a `test` script in `packages/app/package.json`.
    - Write unit tests for shared utility functions or tRPC routers if applicable.

4.  **CI Integration Preparation:**
    - Ensure the command `bun test` runs all tests from the root or individual packages.

**Deliverables:**
- Updated `package.json` files with test scripts and dependencies.
- `vitest.config.ts` files where necessary.
- Initial test files (e.g., `packages/api/src/index.test.ts`).
- A verification report showing tests passing.
