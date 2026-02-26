# NeuroForge AI

NeuroForge AI is a production-ready AI SaaS platform that generates interactive 3D websites, cinematic videos, and full launch kits with downloadable assets.

## Features

- Prompt-based AI generation for websites and videos
- Three.js scene rendering from structured AI JSON
- Full launch kit endpoint combining web + video output
- JWT authentication and free-tier generation limits
- Stripe billing placeholder for upgrade flow
- Dashboard history per authenticated user
- Dark futuristic UI with glassmorphism and neon gradients

## Tech Stack

- Next.js (Pages Router)
- Tailwind CSS
- Three.js
- JWT auth with API middleware
- JSZip for downloadable website bundles

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Start development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## API Endpoints

- `POST /api/auth/login`
- `POST /api/generate-website`
- `POST /api/generate-video`
- `POST /api/generate-launchkit`
- `GET /api/history`
- `GET /api/stripe/checkout`

## Deployment

Deploy directly to Vercel.

- Set all environment variables from `.env.example`.
- Ensure JWT secret and Stripe keys are configured.

