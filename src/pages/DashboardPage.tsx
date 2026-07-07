import SummaryCard from "../components/dashboard/SummaryCard";
import { mockTransactions } from "../data/mockTransactions";
import { formatCurrency } from "../utils/formatCurrency";

function DashboardPage() {
  const totalTransactions = mockTransactions.length;
  const successfulPayments = mockTransactions.filter((item) => item.status === "success").length;
  const pendingPayments = mockTransactions.filter((item) => item.status === "pending").length;
  const failedPayments = mockTransactions.filter((item) => item.status === "failed").length;
  const totalAmount = mockTransactions.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Dashboard Summary</h2>
        <p className="mt-1 text-sm text-slate-500">
          Current payment activity calculated from mock POS transactions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <SummaryCard title="Total Transactions" value={totalTransactions} />
        <SummaryCard title="Successful Payments" value={successfulPayments} subtitle="Completed payments" />
        <SummaryCard title="Pending Payments" value={pendingPayments} subtitle="Awaiting confirmation" />
        <SummaryCard title="Failed Payments" value={failedPayments} subtitle="Needs review" />
        <SummaryCard title="Total Amount" value={formatCurrency(totalAmount)} subtitle="Across all statuses" />
      </div>
    </section>
  );
}

export default DashboardPage;
