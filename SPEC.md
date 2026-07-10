# PayTrack Dashboard - Frontend Specification

## Project Overview

PayTrack Dashboard is a portfolio-ready POS transaction dashboard built with React, TypeScript, Vite, Tailwind CSS, React Router DOM, and mock data.

The first milestone is frontend UI only. Backend, database, real authentication, JWT logic, and API integration are planned for later.

The UI should feel clean, professional, responsive, and appropriate for a junior full-stack developer portfolio.

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Mock transaction data

Do not add a backend yet.
Do not add complex state management libraries such as Redux or Zustand for this stage.

---

## Main Goal

Build a responsive dashboard UI that includes:

1. Login page
2. Dashboard summary cards
3. Dashboard charts for transaction volume, amount, and payment statuses
4. Transaction list page
5. Search transactions
6. Filter transactions by payment status
7. Transaction details page
8. Add test transaction modal inside the Transactions page
9. Paginated transaction table
10. Basic role display: admin, merchant, support
11. Mock logout action

---

## Development Rules

- Keep the project simple and beginner-friendly.
- Use small reusable components.
- Use TypeScript interfaces and types for data shapes.
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

## Current Folder Structure

```txt
src/
|-- assets/
|-- components/
|   |-- common/
|   |   `-- Button.tsx
|   |-- dashboard/
|   |   |-- StatusBreakdownChart.tsx
|   |   |-- SummaryCard.tsx
|   |   `-- TransactionTrendChart.tsx
|   |-- layout/
|   |   |-- AppLayout.tsx
|   |   |-- Header.tsx
|   |   `-- Sidebar.tsx
|   `-- transactions/
|       |-- AddTransactionModal.tsx
|       |-- TransactionFilters.tsx
|       |-- TransactionPagination.tsx
|       |-- TransactionStatusBadge.tsx
|       `-- TransactionTable.tsx
|-- data/
|   `-- mockTransactions.ts
|-- pages/
|   |-- DashboardPage.tsx
|   |-- LoginPage.tsx
|   |-- TransactionDetailsPage.tsx
|   `-- TransactionsPage.tsx
|-- routes/
|   `-- AppRoutes.tsx
|-- types/
|   `-- transaction.ts
|-- utils/
|   |-- dashboardCharts.ts
|   `-- formatCurrency.ts
|-- App.tsx
|-- index.css
`-- main.tsx
```

---

## Page Requirements

### Login Page

File: `src/pages/LoginPage.tsx`

Requirements:

- Display app name: PayTrack Dashboard.
- Include email input.
- Include password input.
- Include login button.
- Show demo credentials note.
- No real authentication yet.
- On login form submit, navigate to `/dashboard`.

Demo credentials:

```txt
Email: admin@paytrack.com
Password: password123
```

### Dashboard Page

File: `src/pages/DashboardPage.tsx`

Requirements:

- Show summary cards for:
  - Total transactions
  - Successful payments
  - Pending payments
  - Failed payments
  - Total transaction amount
- Calculate values from `mockTransactions`.
- Use `src/components/dashboard/SummaryCard.tsx`.
- Show one line graph for total transactions by date.
- Add Year and Month filters near the transactions chart title.
- Generate Year options dynamically from transaction data, sorted newest to oldest.
- Include `All Years` in the Year filter.
- Include `All Months` and January through December in the Month filter.
- Default the Year filter to the latest available transaction year and Month to `All Months`.
- Disable Month when `All Years` is selected.
- Reset Month to `All Months` when Year changes to `All Years`.
- Aggregate chart data based on filters:
  - `All Years`: group by year
  - Specific year and `All Months`: group by month, including zero-value months
  - Specific year and specific month: group by day, including zero-value days
- Update the X-axis title based on filters:
  - `All Years`: Year
  - Specific year: Month
  - Specific month: Day
- Format X-axis labels based on grouping and skip labels when needed to avoid overlap.
- Keep all chart points hoverable even when some X-axis labels are skipped.
- Show total transaction amount only in the data point tooltip.
- Keep only one visible line named `Transactions`.
- Keep the `Transactions` legend at the bottom/right area of the chart header.
- Keep the chart card within its dashboard grid column and prevent page-level horizontal overflow.
- Show a status breakdown for successful, pending, and failed transactions.

### Transactions Page

File: `src/pages/TransactionsPage.tsx`

Requirements:

- Display a transaction table.
- Include search input.
- Include payment status filter.
- Include pagination controls for the table.
- Include a rows-per-page control for the table.
- Allow filtering by:
  - all
  - success
  - pending
  - failed
- Show an `Add transaction` button aligned with the Transactions page header.
- Open the add transaction form in a modal.
- Keep the user on the Transactions page while adding a test transaction.

Each transaction row should show:

- Transaction ID
- Merchant name
- Customer name
- Amount
- Payment method
- Status
- Date
- View details link/button

Components:

- `src/components/transactions/TransactionTable.tsx`
- `src/components/transactions/TransactionFilters.tsx`
- `src/components/transactions/TransactionStatusBadge.tsx`
- `src/components/transactions/AddTransactionModal.tsx`

### Transaction Details Page

File: `src/pages/TransactionDetailsPage.tsx`

Route: `/transactions/:id`

Requirements:

- Find transaction by ID from mock data.
- Display:
  - Transaction ID
  - Merchant name
  - Customer name
  - Amount
  - Payment method
  - Status
  - Date
  - Reference number
  - User role
- Show fallback message if transaction is not found.
- Include a back button to the Transactions page.

### Add Transaction Modal

File: `src/components/transactions/AddTransactionModal.tsx`

Requirements:

- Open from the Transactions page `Add transaction` button.
- Show a form with:
  - Merchant name
  - Customer name
  - Amount
  - Payment method
  - Status
- On submit, show an alert or console log.
- Do not save to a database yet.
- Close after submit.
- Close when the user clicks Cancel, the close button, the backdrop, or presses Escape.
- Focus the first field when opened.

---

## Layout Requirements

### App Layout

File: `src/components/layout/AppLayout.tsx`

Requirements:

- Used for dashboard pages.
- Includes Sidebar and Header.
- Renders child page content in the main area.

### Sidebar

File: `src/components/layout/Sidebar.tsx`

Navigation links:

- Dashboard -> `/dashboard`
- Transactions -> `/transactions`

The Add Transaction action is not a sidebar tab. It is a button inside the Transactions page header.

### Header

File: `src/components/layout/Header.tsx`

Requirements:

- Show app title.
- Show mock logged-in user:
  - Name: Admin User
  - Role: admin
- Include a logout button.
- Logout navigates back to `/`.

---

## Routing Requirements

File: `src/routes/AppRoutes.tsx`

Required routes:

```txt
/                  -> LoginPage
/dashboard         -> DashboardPage inside AppLayout
/transactions      -> TransactionsPage inside AppLayout
/transactions/add  -> Redirect to /transactions
/transactions/:id  -> TransactionDetailsPage inside AppLayout
*                  -> Redirect to /
```

---

## Data Model

File: `src/types/transaction.ts`

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

File: `src/data/mockTransactions.ts`

Requirements:

- Include at least 10 sample transactions.
- Use realistic POS-related data.
- Include all three roles across the dataset:
  - admin
  - merchant
  - support

---

## Styling Guidelines

- Use Tailwind CSS.
- Use a clean admin dashboard look.
- Use light page backgrounds.
- Use white content cards.
- Use soft shadows and subtle borders.
- Use rounded corners consistently.
- Keep the sidebar simple.
- Keep spacing professional and readable.
- Use responsive grids that allow cards to wrap to new rows.
- Dashboard cards and chart cards must stay within the visible page width.
- Chart overflow, if needed for dense daily data, should be contained inside the chart area only.
- Use `bg-blue-600 text-white` for primary buttons.
- Use green for success, yellow for pending, and red for failed statuses.

---

## Utility Function

File: `src/utils/formatCurrency.ts`

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

1. User opens app at `/`.
2. User sees login page.
3. User clicks Login.
4. User is redirected to Dashboard.
5. User sees payment summary cards.
6. User opens Transactions page.
7. User searches or filters transactions.
8. User views a transaction details page.
9. User goes back to Transactions.
10. User clicks Add transaction.
11. User submits a test transaction from the modal.
12. User can logout from the header.

---

## Acceptance Criteria

The frontend milestone is complete when:

- App runs successfully using `npm run dev`.
- App builds successfully using `npm run build`.
- App lints successfully using `npm run lint`.
- Tailwind CSS styling works.
- Login page works with mock navigation.
- Dashboard summary values are calculated from mock data.
- Dashboard charts show transaction count, transaction amount in tooltips, status breakdowns, and year/month filtering.
- Dashboard transaction chart shows only one `Transactions` line.
- Dashboard transaction chart changes grouping and X-axis title correctly for yearly, monthly, and daily views.
- Dashboard cards and chart cards do not cause page-level horizontal overflow on desktop, tablet, or mobile.
- Sidebar navigation works.
- Transaction table displays mock data.
- Search works.
- Status filter works.
- Pagination works after search, status filters, and rows-per-page changes are applied.
- Transaction details route works.
- Missing transaction fallback works.
- Add transaction modal opens from the Transactions page.
- Add transaction modal submits with alert or console log.
- Add transaction modal can close through Cancel, close button, backdrop click, and Escape.
- Logout navigates back to `/`.
- Code is organized using the current folder structure.
- No backend is required to run the app.

---

## Future Improvements

- Connect frontend to a real Express API.
- Add real authentication using JWT.
- Store users and transactions in a database.
- Add role-based access control.
- Add create-transaction persistence.
- Improve modal focus trapping for accessibility.
- Deploy frontend and backend online.

Phase 2 backend planning is tracked in `PHASE_2_BACKEND_SPEC.md`.
