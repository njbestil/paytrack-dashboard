import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
