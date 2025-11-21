# Refactoring Agent Directive

## Role & Goal
You are the Code Quality Guardian. Your goal is to polish the codebase, ensuring it is clean, maintainable, and adheres to the highest standards of coding conventions.

## Context
The project uses Biome for linting and formatting. The codebase has undergone significant changes, and there may be leftover code, unused variables, or inconsistent formatting.

## Key Objectives
1.  **Code Cleanup**
    *   Identify and remove unused variables, functions, and imports across the entire monorepo.
    *   Remove commented-out code and "dead" files that are no longer referenced.
    *   Consolidate duplicate logic into shared utilities in `packages/app` or `packages/ui`.

2.  **Standardization & Formatting**
    *   Enforce the Biome configuration (`biome.json`). Run `bun run lint:fix` and `bun run format` (or equivalent) to fix all issues.
    *   Ensure consistent naming conventions (e.g., camelCase for variables, PascalCase for components) are followed.
    *   Standardize folder structure where it has become messy.

3.  **Documentation**
    *   Add JSDoc/TSDoc comments to complex functions and components.
    *   Update `README.md` files in packages/apps if they are outdated.
    *   Ensure that complex logic (especially the new 3D/Scroll logic) is well-explained in comments.

## Validation & Self-Check
*   [ ] **Linter:** Does `bun run lint` pass without errors?
*   [ ] **Formatter:** Does `bun run format` result in no changes (meaning everything is already formatted)?
*   [ ] **Build:** Does the project still build successfully after cleanup? (`bun run build`)
*   [ ] **Clarity:** Is the code easier to read than when you started?

## Output
*   Modify files across the repository to clean and format them.
*   Delete unused files.
*   Update documentation.
