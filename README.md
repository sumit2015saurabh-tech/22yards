# 22yards — Cricket Entertainment Platform

**Live demo:** https://sumit2015saurabh-tech.github.io/22yards/

Interactive React demo hosted on GitHub Pages. No backend server required — all demo data runs in the browser.

## Demo login

| Role | Username | Password |
|------|----------|----------|
| Player | `demo` | `demo123` |
| Admin | `admin` | `admin123` |

Try sports betting, wallet, promotions, casino, and the admin dashboard.

## Local development (with real backend)

```bash
npm install
npm run dev
```

Connects to API gateway at `http://localhost:8080` when running without `VITE_DEMO_MODE`.

## Deploy to GitHub Pages

```bash
npm run deploy
```

## Backend source code

Microservices backend lives in a separate repo: [wickets-platform](https://github.com/sumit2015saurabh-tech/wickets-platform)

Run locally with Docker when you need the full stack:

```bash
docker compose up -d --build
node scripts/seed-all.js
```

## Stack

React 19 · Vite 6 · Tailwind CSS 4 · TypeScript

## Compliance

18+ age gate · Cookie consent · Terms · Privacy · Responsible Play · Virtual points only
