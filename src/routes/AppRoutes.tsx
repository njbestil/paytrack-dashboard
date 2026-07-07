import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import AddTransactionPage from "../pages/AddTransactionPage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import TransactionDetailsPage from "../pages/TransactionDetailsPage";
import TransactionsPage from "../pages/TransactionsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
      />
      <Route
        path="/transactions"
        element={
          <AppLayout>
            <TransactionsPage />
          </AppLayout>
        }
      />
      <Route
        path="/transactions/add"
        element={
          <AppLayout>
            <AddTransactionPage />
          </AppLayout>
        }
      />
      <Route
        path="/transactions/:id"
        element={
          <AppLayout>
            <TransactionDetailsPage />
          </AppLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
