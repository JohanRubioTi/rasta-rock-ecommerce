# Production Readiness Plan

This folder contains the detailed tasks for 5 specific agents to bring the `create-t4-app` project to a production-ready state.

## Agents & Responsibilities

1.  **[QA Engineer](./01_qa_engineer.md)**
    - **Focus:** Unit & Integration Testing.
    - **Target:** `packages/api`, `packages/app`.
    - **Tools:** Vitest.

2.  **[E2E Automation Engineer](./02_e2e_engineer.md)**
    - **Focus:** End-to-End Testing.
    - **Target:** `apps/next` (Web), `apps/expo` (Mobile).
    - **Tools:** Playwright, Maestro.

3.  **[DevOps Engineer](./03_devops_engineer.md)**
    - **Focus:** CI/CD Pipelines.
    - **Target:** GitHub Actions (`.github/workflows`).
    - **Goal:** Automate testing, linting, and safe deployments.

4.  **[Security Engineer](./04_security_engineer.md)**
    - **Focus:** Security Posture.
    - **Target:** Dependency auditing, Security Headers (`apps/next`), Secret management.

5.  **[Documentation Specialist](./05_docs_specialist.md)**
    - **Focus:** Knowledge Transfer.
    - **Target:** `DEPLOY.md`, `CONTRIBUTING.md`, `README.md`.

## Execution Order

While agents can work in parallel, it is recommended to start with **QA Engineer** and **E2E Engineer** so that the **DevOps Engineer** has tests to integrate into the pipeline. **Security** and **Docs** can be done at any time.
