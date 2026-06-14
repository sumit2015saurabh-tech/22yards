# 22yards — Cricket Entertainment Frontend

React + Vite + Tailwind frontend for the **22yards** cricket entertainment platform.

Connects to the microservices API gateway at `localhost:8080` when running locally. On GitHub Pages, demo cricket fixtures and promotions load automatically when the backend is offline.

## Dev

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). API calls proxy to `http://localhost:8080/api`.

## Deploy to GitHub Pages

```bash
npm run deploy
```

Live site: **https://sumit2015saurabh-tech.github.io/22yards/**

## Compliance features

- 18+ age verification gate
- Cookie consent banner
- Terms of Service, Privacy Policy, Responsible Play pages
- Self-exclusion tools in profile
- Clear disclaimers that points are virtual credits — not real money
- No payment gateway in the UI

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- React Router 7
- Lucide icons
