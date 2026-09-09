# YumYuck Mobile Webapp Implementation Plan

We will build YumYuck as a high-fidelity, premium mobile webapp optimized for iOS touch interaction, utilizing Next.js, React, Framer Motion, and IndexedDB. This app will serve as both a food discovery product and a controlled CompInt experiment.

## Architecture & Technology Stack

*   **Framework:** Next.js (Pages or App Router) with React, TypeScript, and Vanilla CSS for maximum styling control and premium aesthetics (warm cream theme, soft elevations).
*   **Gestures & Animation:** `framer-motion` for fluid 60fps drag physics, tilt/rotation, elastic snap-back, "Lift" states, reaction stamps, and circular sheet morphs.
*   **Database & Storage:** Neon (Postgres) for structured app data, Vercel Blobs for meal images, and client-side **IndexedDB** for local persistence of the raw research event ledger and session offline caches.
*   **AI Integration:** Gemini API (using the key in `.env.local`) via serverless Next.js API routes, with deterministic schema/allergen verification in the backend.

---

## User Review Required

> [!IMPORTANT]
> **Web Components vs. React + Framer Motion:** The prompt mentions both `webcomponents` and `framer-motion`. Since Framer Motion is a React-specific library built for declarative gesture mapping, we will implement this as a Next.js React application. Custom React components will be structured with clean, encapsulated APIs that mirror the encapsulation of custom Web Components.
>
> **On-Device AI vs. Cloud Gemini API:** We will leverage the client-side Web/WASM LLM wrappers (such as WebLLM or similar transformers if available) for on-device inference when feasible. However, to guarantee fast generation speed, we will prioritize the serverless Gemini API with strict JSON formatting schemas.

---

## Proposed Changes

### [NEW] `/Users/zachshallbetter/Projects/YumYuck` Project Initialization

We will create a Next.js app in the directory. The folder structure will look like:

```text
/Users/zachshallbetter/Projects/YumYuck
├── package.json
├── tsconfig.json
├── next.config.js
├── public/
│   └── assets/            # Seed images & paper texture
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── page.tsx       # Main Experiment View (8-card loop)
│   │   ├── api/
│   │   │   ├── gemini/    # Background concept generator endpoint
│   │   │   └── log/       # Server ledger sync endpoint
│   ├── components/
│   │   ├── CardStack.tsx  # Handles gesture mapping, tilt, and spring physics
│   │   ├── MealCard.tsx   # Displays meal image, description overlays, and "Lift" details
│   │   ├── Indicator.tsx  # Tiny capsule progress bar
│   │   └── SummarySheet.tsx # Summary corrections & multi-dimensional percentages
│   ├── db/
│   │   ├── indexedDb.ts   # Local IndexedDB database & event queue
│   │   └── schema.ts      # Client schema definitions (Zod/TypeScript)
│   ├── styles/
│   │   └── globals.css    # Core typography, warm cream themes, paper texture
```

---

## Verification Plan

### Automated Tests
*   Run `npm run lint` and `npm run build` to verify compilation and TypeScript safety.
*   Verify API routes locally using curl.

### Manual Verification
*   Deploy locally and test touch swipe interactions (Nope, Yum, Maybe, drag stamps, and 300ms hold to Lift) using responsive Chrome/Safari Developer Tools in Mobile Emulation mode.
