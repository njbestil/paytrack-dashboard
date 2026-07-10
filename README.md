# PayTrack Dashboard

PayTrack Dashboard is a portfolio POS transaction dashboard built with React, TypeScript, Vite, Tailwind CSS, React Router DOM, and mock transaction data.

The current milestone focuses on a polished frontend experience. Backend API, database persistence, and real authentication are planned for Phase 2.

## Features

- Mock login flow
- Responsive dashboard layout
- Dashboard summary cards
- Transaction trend chart with year and month filters
- Status breakdown for successful, pending, and failed payments
- Transactions table
- Search and status filtering
- Pagination with rows-per-page control
- Transaction details page
- Add transaction modal inside the Transactions page
- Mock logout action

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM

### Planned Backend

- Node.js
- Express.js
- REST API
- JWT authentication
- PostgreSQL with Prisma

## Project Goal

The goal is to build a clean full-stack POS transaction dashboard that demonstrates practical frontend dashboard development, REST API integration, authentication, database-backed records, and a professional project structure.

## Pages

- Login
- Dashboard
- Transactions
- Transaction details

The add transaction experience is a modal launched from the Transactions page, not a separate navigation tab.

## Folder Structure

```txt
src/
|-- components/
|   |-- common/
|   |-- dashboard/
|   |-- layout/
|   `-- transactions/
|-- data/
|-- pages/
|-- routes/
|-- types/
|-- utils/
|-- App.tsx
|-- index.css
`-- main.tsx
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Run lint checks

```bash
npm run lint
```

## Development Status

```txt
Phase 1: Frontend UI - ready for handoff
Phase 2: Backend API, database, and authentication - next
```

## Phase 2 Direction

See `PHASE_2_BACKEND_SPEC.md` for the backend implementation plan.

## Author

Neil Joseph Bestil

## License

This project is for portfolio and learning purposes.
