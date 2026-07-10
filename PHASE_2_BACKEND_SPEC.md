# PayTrack Dashboard - Phase 2 Backend Specification

## Objective

Add a real backend for PayTrack Dashboard so the frontend can move from mock transaction data to persistent API-backed records.

Phase 2 should keep the current frontend experience intact while replacing mock-only behavior with authentication, REST API endpoints, database storage, and predictable loading and error states.

## Recommended Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT authentication
- bcrypt for password hashing
- Zod or a similar validation library for request validation

## Backend Folder Direction

Use a simple `server/` folder in the same repository:

```txt
server/
|-- prisma/
|   |-- schema.prisma
|   `-- seed.ts
|-- src/
|   |-- controllers/
|   |-- middleware/
|   |-- routes/
|   |-- services/
|   |-- utils/
|   |-- app.ts
|   `-- server.ts
|-- .env.example
|-- package.json
`-- tsconfig.json
```

## Database Models

### User

- `id`
- `name`
- `email`
- `passwordHash`
- `role`: `admin`, `merchant`, or `support`
- `createdAt`
- `updatedAt`

### Transaction

- `id`
- `merchantName`
- `customerName`
- `amount`
- `paymentMethod`: `card`, `cash`, or `wallet`
- `status`: `success`, `pending`, or `failed`
- `date`
- `referenceNumber`
- `userRole`
- `createdAt`
- `updatedAt`

## Authentication Requirements

- Add login endpoint.
- Verify email and password against stored users.
- Hash stored passwords with bcrypt.
- Return a JWT after successful login.
- Protect dashboard and transaction API endpoints.
- Keep frontend logout behavior, but clear the stored token/session.

Recommended initial demo user:

```txt
Email: admin@paytrack.com
Password: password123
Role: admin
```

## REST API Requirements

### Auth

```txt
POST /api/auth/login
GET  /api/auth/me
```

### Transactions

```txt
GET    /api/transactions
GET    /api/transactions/:id
POST   /api/transactions
```

Optional later endpoints:

```txt
PATCH  /api/transactions/:id
DELETE /api/transactions/:id
```

## Transaction Query Support

`GET /api/transactions` should support:

- `search`
- `status`
- `page`
- `limit`
- `year`
- `month`

Response should include:

- `data`
- `page`
- `limit`
- `total`
- `totalPages`

## Dashboard API Requirements

The dashboard may either reuse the transactions endpoint or add summary endpoints.

Recommended endpoint:

```txt
GET /api/dashboard/summary
```

Response should include:

- Total transactions
- Successful payments
- Pending payments
- Failed payments
- Total amount
- Status breakdown
- Transaction trend data for selected year/month filters

## Frontend Integration Requirements

- Replace `mockTransactions` reads with API calls.
- Add loading states for dashboard, transactions, transaction details, and add transaction submit.
- Add user-friendly error states.
- Keep the existing chart and table layouts.
- Keep pagination and rows-per-page behavior.
- Submit new transactions through `POST /api/transactions`.
- Refresh the table after a successful create.
- Preserve the modal UX from Phase 1.

## Validation Requirements

Validate create-transaction input:

- Merchant name is required.
- Customer name is required.
- Amount must be greater than zero.
- Payment method must be one of `card`, `cash`, or `wallet`.
- Status must be one of `success`, `pending`, or `failed`.

## Seed Data

Seed the database with:

- One admin demo user
- At least 12 transactions
- All payment statuses
- All payment methods
- Multiple dates, months, and years where possible

## Acceptance Criteria

- Backend starts successfully in development mode.
- Database migrations run successfully.
- Seed data can be loaded.
- Login returns a valid token.
- Protected endpoints reject unauthenticated requests.
- Transactions can be listed, searched, filtered, and paginated from the API.
- Transaction details are loaded from the API.
- Add transaction persists to the database.
- Dashboard cards and charts load from API-backed data.
- Frontend build and lint still pass.
