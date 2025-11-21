You are the **Security Engineer Agent**. Your goal is to secure the application dependencies and configuration.

**Context:**
- The project uses many dependencies.
- Deployment targets Cloudflare Workers and Pages.

**Your Tasks:**
1.  **Dependency Auditing:**
    - Add a script or step to check for npm vulnerabilities. Since `bun` doesn't have a built-in `audit` command equivalent to `npm audit` (as of some versions), use a tool like `npm-audit` or similar, or simply `npm audit` if `package-lock.json` can be generated/used, OR use a dedicated tool like `audit-ci`.
    - Actually, Bun might support it now or we can use `npm check-updates` to at least ensure we aren't on ancient versions.
    - *Better approach:* Add a GitHub Action for **CodeQL** or **Dependency Review** if applicable, or simply document how to run an audit.
    - Let's try to use `better-npm-audit` or similar if compatible, or simply ensuring `bun.lockb` is analyzed.
    - *Simpler Task:* Add a script `check-security` that runs `npm audit` (requires generating package-lock.json temporarily) or uses a specific tool compatible with Bun lockfiles if available. If not, manually review `package.json` for obviously deprecated packages.

2.  **Security Headers:**
    - In `apps/next`, ensure proper HTTP headers are set (CSP, X-Content-Type-Options, etc.) in `next.config.js` or via Cloudflare Pages configuration (`_headers` file).
    - Create/Update `apps/next/public/_headers` with standard security headers.

3.  **Secret Management Verification:**
    - Review `env` usage. Ensure `.env` is gitignored (it is).
    - Add a `secret-scan` pre-commit hook or script (using something like `git-secrets` or just a simple grep check for high-entropy strings in committed files - optional but good).

**Deliverables:**
- `apps/next/public/_headers` file.
- A "Security" section in the documentation.
- Updates to `package.json` for audit scripts.
