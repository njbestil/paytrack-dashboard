# PayTrack Dashboard — Frontend Specification

## Project Overview

PayTrack Dashboard is a simple portfolio-ready POS transaction dashboard built with ReactJS, TypeScript, and Tailwind CSS.

The goal of this first milestone is to build the frontend UI only. Backend, database, authentication logic, and real API integration will be added later.

This project should look clean, professional, and suitable for a junior full-stack developer portfolio.

---

## Tech Stack

Use the following stack:

- ReactJS
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Mock data for now

Do not add a backend yet.

Do not add complex state management libraries like Redux or Zustand for this stage.

---

## Main Goal

Build a responsive dashboard UI that includes:

1. Login page
2. Dashboard summary cards
3. Transaction list page
4. Search transactions
5. Filter transactions by payment status
6. Transaction details page
7. Add test transaction page
8. Basic role display: admin, merchant, support

---

## Development Rules

Follow these rules strictly:

- Keep the project simple and beginner-friendly.
- Use small reusable components.
- Use TypeScript interfaces for data types.
- Use Tailwind CSS for styling.
- Use mock data stored in a separate file.
- Use React Router for page navigation.
- Do not use external UI libraries unless necessary.
- Do not overengineer the folder structure.
- Use clean, readable code.
- Add comments only where helpful.
- Make sure the app runs without backend dependencies.
- Use professional naming for files, folders, and components.

---

## Recommended Folder Structure

Create this structure inside the `src` folder:

```txt
src/
├── assets/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── AppLayout.tsx
│   ├── dashboard/
│   │   └── SummaryCard.tsx
│   ├── transactions/
│   │   ├── TransactionTable.tsx
│   │   ├── TransactionStatusBadge.tsx
│   │   └── TransactionFilters.tsx
│   └── common/
│       └── Button.tsx
├── data/
│   └── mockTransactions.ts
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── TransactionsPage.tsx
│   ├── TransactionDetailsPage.tsx
│   └── AddTransactionPage.tsx
├── routes/
│   └── AppRoutes.tsx
├── types/
│   └── transaction.ts
├── utils/
│   └── formatCurrency.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## Page Requirements

### 1. Login Page

File:

```txt
src/pages/LoginPage.tsx
```

Requirements:

- Display app name: PayTrack Dashboard
- Email input
- Password input
- Login button
- Simple demo credentials note
- No real authentication yet
- On login button click, navigate to `/dashboard`

Suggested demo credentials:

```txt
Email: admin@paytrack.com
Password: password123
```

---

### 2. Dashboard Page

File:

```txt
src/pages/DashboardPage.tsx
```

Requirements:

Show dashboard summary cards for:

- Total transactions
- Successful payments
- Pending payments
- Failed payments
- Total transaction amount

Use mock transaction data to calculate these values.

Use this component:

```txt
src/components/dashboard/SummaryCard.tsx
```

---

### 3. Transactions Page

File:

```txt
src/pages/TransactionsPage.tsx
```

Requirements:

- Display a list/table of transactions
- Include search input
- Include payment status filter
- Allow filtering by:
  - all
  - success
  - pending
  - failed
- Each transaction row should show:
  - Transaction ID
  - Merchant name
  - Customer name
  - Amount
  - Payment method
  - Status
  - Date
  - View details link/button

Use these components:

```txt
src/components/transactions/TransactionTable.tsx
src/components/transactions/TransactionFilters.tsx
src/components/transactions/TransactionStatusBadge.tsx
```

---

### 4. Transaction Details Page

File:

```txt
src/pages/TransactionDetailsPage.tsx
```

Route:

```txt
/transactions/:id
```

Requirements:

- Find transaction by ID from mock data
- Display transaction details:
  - Transaction ID
  - Merchant name
  - Customer name
  - Amount
  - Payment method
  - Status
  - Date
  - Reference number
  - User role
- Show fallback message if transaction is not found
- Add back button to transactions page

---

### 5. Add Transaction Page

File:

```txt
src/pages/AddTransactionPage.tsx
```

Requirements:

- Create a simple form UI only
- Fields:
  - Merchant name
  - Customer name
  - Amount
  - Payment method
  - Status
- On submit, show a simple alert or console log
- No database saving yet

---

## Layout Requirements

### App Layout

File:

```txt
src/components/layout/AppLayout.tsx
```

Requirements:

- Used for authenticated dashboard pages
- Includes Sidebar and Header
- Main content area should render child pages

---

### Sidebar

File:

```txt
src/components/layout/Sidebar.tsx
```

Navigation links:

- Dashboard → `/dashboard`
- Transactions → `/transactions`
- Add Transaction → `/transactions/add`

---

### Header

File:

```txt
src/components/layout/Header.tsx
```

Requirements:

- Show page title or app title
- Show mock logged-in user:
  - Name: Admin User
  - Role: admin

---

## Routing Requirements

File:

```txt
src/routes/AppRoutes.tsx
```

Use React Router DOM.

Required routes:

```txt
/                     → LoginPage
/dashboard            → DashboardPage
/transactions         → TransactionsPage
/transactions/add     → AddTransactionPage
/transactions/:id     → TransactionDetailsPage
```

Dashboard pages should use `AppLayout`.

---

## Data Model

Create this TypeScript type:

File:

```txt
src/types/transaction.ts
```

```ts
export type PaymentStatus = "success" | "pending" | "failed";

export type PaymentMethod = "card" | "cash" | "wallet";

export type UserRole = "admin" | "merchant" | "support";

export interface Transaction {
  id: string;
  merchantName: string;
  customerName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  date: string;
  referenceNumber: string;
  userRole: UserRole;
}
```

---

## Mock Data

File:

```txt
src/data/mockTransactions.ts
```

Create at least 10 sample transactions.

Use realistic POS-related data.

Example:

```ts
import type { Transaction } from "../types/transaction";

export const mockTransactions: Transaction[] = [
  {
    id: "TXN-1001",
    merchantName: "Dubai Coffee Hub",
    customerName: "Ahmed Khan",
    amount: 45.5,
    paymentMethod: "card",
    status: "success",
    date: "2026-07-01",
    referenceNumber: "REF-784512",
    userRole: "admin",
  },
];
```

---

## Styling Guidelines

Use Tailwind CSS.

Style direction:

- Clean admin dashboard look
- Light background
- White cards
- Soft shadows
- Rounded corners
- Simple sidebar
- Professional spacing

Suggested colors:

- Background: `bg-slate-100`
- Cards: `bg-white`
- Primary buttons: `bg-blue-600 text-white`
- Success status: green
- Pending status: yellow
- Failed status: red

---

## Component Requirements

### SummaryCard

File:

```txt
src/components/dashboard/SummaryCard.tsx
```

Props:

```ts
interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}
```

---

### TransactionStatusBadge

File:

```txt
src/components/transactions/TransactionStatusBadge.tsx
```

Requirements:

- Accept status as prop
- Display colored badge:
  - success = green
  - pending = yellow
  - failed = red

---

### TransactionFilters

File:

```txt
src/components/transactions/TransactionFilters.tsx
```

Requirements:

- Search input
- Status dropdown
- Accept values and change handlers as props

---

### TransactionTable

File:

```txt
src/components/transactions/TransactionTable.tsx
```

Requirements:

- Accept transactions as prop
- Render table rows
- Include link to transaction details page

---

### Button

File:

```txt
src/components/common/Button.tsx
```

Requirements:

- Simple reusable button component
- Accept children, type, and onClick props
- Keep styling simple

---

## Utility Function

File:

```txt
src/utils/formatCurrency.ts
```

Create a helper function:

```ts
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
  }).format(amount);
}
```

Use this for all amount displays.

---

## Expected User Flow

1. User opens app at `/`
2. User sees login page
3. User clicks login
4. User is redirected to dashboard
5. User sees payment summary cards
6. User opens transactions page
7. User searches or filters transactions
8. User views a transaction details page
9. User opens add transaction page
10. User submits a test transaction form

---

## Acceptance Criteria

The frontend milestone is complete when:

- App runs successfully using `npm run dev`
- Tailwind CSS styling works
- All required pages exist
- All required routes work
- Sidebar navigation works
- Dashboard summary values are calculated from mock data
- Transaction table displays mock data
- Search works
- Status filter works
- Transaction details route works
- Add transaction form UI exists
- Code is organized using the required folder structure
- No backend is required to run the app

---

## Commands

Use these commands to create and run the project:

```bash
npm create vite@latest paytrack-dashboard -- --template react-ts
cd paytrack-dashboard
npm install
npm install react-router-dom
npm install -D tailwindcss @tailwindcss/vite
npm run dev
```

---

## Tailwind Setup Note

Use the current Tailwind CSS setup for Vite.

Configure Tailwind according to the installed version.

Make sure Tailwind styles are imported in:

```txt
src/index.css
```

---

## First Implementation Order

Build in this order:

1. Install React + TypeScript + Tailwind
2. Create folder structure
3. Add transaction types
4. Add mock transaction data
5. Set up routes
6. Create layout components
7. Create login page
8. Create dashboard page
9. Create transaction list page
10. Create transaction details page
11. Create add transaction page
12. Polish styling

---

## Git Commit Suggestions

Use these commit messages by milestone:

```bash
git add .
git commit -m "Initialize React TypeScript project"

git add .
git commit -m "Set up Tailwind CSS and app structure"

git add .
git commit -m "Add mock transaction data and types"

git add .
git commit -m "Create dashboard layout and routes"

git add .
git commit -m "Build login and dashboard pages"

git add .
git commit -m "Build transaction list and filters"

git add .
git commit -m "Add transaction details page"

git add .
git commit -m "Add test transaction form"

git add .
git commit -m "Polish PayTrack dashboard UI"
```

---

## Important Notes for Codex

When generating code:

- Do not skip files from the required folder structure.
- Do not replace React Router with another routing library.
- Do not add backend logic yet.
- Do not add database logic yet.
- Do not add real JWT authentication yet.
- Do not install unnecessary packages.
- Keep each component small and understandable.
- Prioritize working code over complex architecture.
- Use TypeScript correctly.
- Make sure imports use the correct relative paths.
- Avoid huge components.
- Keep styling consistent across pages.
