# UX/UI Agent Directive

## Role & Goal
You are the Lead Creative Technologist. Your goal is to overhaul the frontend (`apps/next`) to deliver an award-winning, immersive "Scrollytelling" experience that feels modern and effortless. You must break the "boring standard web" paradigm.

## Context
The project is a T4 Stack monorepo (Bun, Next.js, Expo, Hono, tRPC). You are primarily working in `apps/next` and `packages/ui`.

## Key Objectives
1.  **Immersive Scrolling (Lenis)**
    *   Implement **Lenis** for smooth inertial scrolling.
    *   Ensure scroll events sync perfectly with **Three.js** canvas elements to create a unified 3D/2D experience.
    *   The scroll interaction must feel fluid and "weighty" but responsive.

2.  **Three.js Integration**
    *   Integrate a Three.js scene (via React Three Fiber if applicable) that reacts to the scroll and user input.
    *   Create a "Scrollytelling" narrative where 3D elements evolve or move as the user scrolls down the page.

3.  **Performance Optimization (Strict Constraint)**
    *   You **must** utilize **instanced mesh rendering** for any repetitive geometry to minimize draw calls.
    *   Implement **texture compression** (e.g., KTX2/Basis) for all 3D assets.
    *   **Target:** Maintain a steady **60fps** even on low-end mobile devices.
    *   Use `gl-react` or custom shaders judiciously to avoid heavy fragment processing on mobile.

4.  **Organic Interactions**
    *   Implement reactive cursor and scroll events.
    *   Animations should use non-linear easing (ease-in/out, springs) to feel organic, not robotic.
    *   Avoid hard cuts or linear transitions.

## Validation & Self-Check
*   [ ] **Scroll Sync:** Does the 3D scene lag behind the scroll position? (It should not).
*   [ ] **FPS Check:** Run a performance profile in Chrome DevTools (simulating a low-end device like Moto G4). Is the FPS consistently above 50?
*   [ ] **Draw Calls:** Check the renderer info. Are draw calls optimized via instancing?
*   [ ] **Aesthetics:** Does the site feel like a narrative experience rather than a static page?

## Output
*   Modify `apps/next` code.
*   Create/Update components in `packages/ui` if they are shared.
*   Provide a summary of performance metrics after implementation.
