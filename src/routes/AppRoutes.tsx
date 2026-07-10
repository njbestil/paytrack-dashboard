import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import { isDemoUserLoggedIn } from "../auth/demoAuth";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import TransactionDetailsPage from "../pages/TransactionDetailsPage";
import TransactionsPage from "../pages/TransactionsPage";

interface ProtectedPageProps {
  children: ReactNode;
}

function ProtectedPage({ children }: ProtectedPageProps) {
  if (!isDemoUserLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedPage>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedPage>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedPage>
            <AppLayout>
              <TransactionsPage />
            </AppLayout>
          </ProtectedPage>
        }
      />
      <Route path="/transactions/add" element={<Navigate to="/transactions" replace />} />
      <Route
        path="/transactions/:id"
        element={
          <ProtectedPage>
            <AppLayout>
              <TransactionDetailsPage />
            </AppLayout>
          </ProtectedPage>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
