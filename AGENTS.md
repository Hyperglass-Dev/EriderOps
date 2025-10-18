# AGENTS.md - E-RiderOps Development Guide

## Commands
- **Dev**: `npm run dev` (starts on port 9002 with Turbopack)
- **Build**: `npm run build` (production build)
- **Lint**: `npm run lint` (ESLint)
- **Typecheck**: `npm run typecheck` (TypeScript check without emit)
- **No test framework configured** - check before adding tests

## Environment Variables Required
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key (for maps, directions, weather, air quality)
- `OPENAI_API_KEY` - OpenAI API key for AI Assistant
- `OPENAI_ASSISTANT_ID` - OpenAI Assistant ID (e.g., asst_DzHrX9485AZuZTzbMFt6PKbT)

## Architecture
- **Framework**: Next.js 15.3 with App Router, React 18, TypeScript
- **AI Integration**: OpenAI Assistant API for ride analysis and suggestions
- **UI**: shadcn/ui components with Radix UI primitives (`src/components/ui/`)
- **Styling**: Tailwind CSS with CSS variables, `cn()` utility for class merging
- **Maps**: Google Maps via `@vis.gl/react-google-maps` with Places, Routes, and Weather APIs
- **Forms**: React Hook Form with Zod validation
- **Sensors**: Device Motion API for crash detection, Geolocation API for position tracking
- **Deployment**: Firebase App Hosting (apphosting.yaml)

## Code Style
- **Imports**: Use `@/` alias for src imports (e.g., `@/components`, `@/lib`, `@/hooks`)
- **Components**: Client components need `'use client'` directive; prefer functional components
- **Naming**: PascalCase for components, camelCase for functions/variables, kebab-case for files
- **Styling**: Use `cn()` utility from `@/lib/utils` for conditional classes
- **Types**: TypeScript strict mode enabled; note: build ignores TS/ESLint errors (see next.config.ts)
