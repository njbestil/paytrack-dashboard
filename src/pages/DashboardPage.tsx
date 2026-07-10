import { useState } from "react";
import SummaryCard from "../components/dashboard/SummaryCard";
import StatusBreakdownChart from "../components/dashboard/StatusBreakdownChart";
import TransactionTrendChart from "../components/dashboard/TransactionTrendChart";
import { mockTransactions } from "../data/mockTransactions";
import {
  getAvailableTransactionYears,
  getDefaultTransactionYear,
  getTransactionTrendSummary,
  getTrendXAxisTitle,
  MONTH_OPTIONS,
} from "../utils/dashboardCharts";
import { formatCurrency } from "../utils/formatCurrency";

function DashboardPage() {
  const availableYears = getAvailableTransactionYears(mockTransactions);
  const [selectedYear, setSelectedYear] = useState(getDefaultTransactionYear(mockTransactions));
  const [selectedMonth, setSelectedMonth] = useState("all");
  const totalTransactions = mockTransactions.length;
  const successfulPayments = mockTransactions.filter((item) => item.status === "success").length;
  const pendingPayments = mockTransactions.filter((item) => item.status === "pending").length;
  const failedPayments = mockTransactions.filter((item) => item.status === "failed").length;
  const totalAmount = mockTransactions.reduce((sum, item) => sum + item.amount, 0);
  const transactionTrend = getTransactionTrendSummary(
    mockTransactions,
    selectedYear,
    selectedMonth,
  );
  const trendXAxisTitle = getTrendXAxisTitle(selectedYear, selectedMonth);
  const statusBreakdown = [
    { label: "Successful", status: "success" as const, value: successfulPayments },
    { label: "Pending", status: "pending" as const, value: pendingPayments },
    { label: "Failed", status: "failed" as const, value: failedPayments },
  ];

  function handleYearChange(value: string) {
    setSelectedYear(value);

    if (value === "all") {
      setSelectedMonth("all");
    }
  }

  return (
    <section className="max-w-full space-y-6 overflow-x-hidden">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Dashboard Summary</h2>
        <p className="mt-1 text-sm text-slate-500">
          Current payment activity calculated from mock POS transactions.
        </p>
      </div>

      <div className="grid max-w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        <SummaryCard title="Total Transactions" value={totalTransactions} />
        <SummaryCard title="Successful Payments" value={successfulPayments} subtitle="Completed payments" />
        <SummaryCard title="Pending Payments" value={pendingPayments} subtitle="Awaiting confirmation" />
        <SummaryCard title="Failed Payments" value={failedPayments} subtitle="Needs review" />
        <SummaryCard title="Total Amount" value={formatCurrency(totalAmount)} subtitle="Across all statuses" />
      </div>

      <div className="grid max-w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,4fr)_minmax(260px,1fr)]">
        <TransactionTrendChart
          data={transactionTrend}
          xAxisTitle={trendXAxisTitle}
          controls={
            <>
              <label className="block text-sm font-medium text-slate-700">
                Year
                <select
                  value={selectedYear}
                  onChange={(event) => handleYearChange(event.target.value)}
                  className="ml-1.5 mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-40"
                >
                  <option value="all">All Years</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Month
                <select
                  value={selectedMonth}
                  onChange={(event) => setSelectedMonth(event.target.value)}
                  disabled={selectedYear === "all"}
                  className="ml-1.5 mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 sm:w-44"
                >
                  <option value="all">All Months</option>
                  {MONTH_OPTIONS.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </label>
            </>
          }
        />
        <StatusBreakdownChart data={statusBreakdown} />
      </div>
    </section>
  );
}

export default DashboardPage;
