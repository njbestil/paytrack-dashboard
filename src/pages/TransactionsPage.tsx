import { useMemo, useState } from "react";
import TransactionFilters, {
  type StatusFilter,
} from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";
import { mockTransactions } from "../data/mockTransactions";

function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredTransactions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return mockTransactions.filter((transaction) => {
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
      const matchesSearch =
        query.length === 0 ||
        transaction.id.toLowerCase().includes(query) ||
        transaction.merchantName.toLowerCase().includes(query) ||
        transaction.customerName.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, statusFilter]);

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Transactions</h2>
        <p className="mt-1 text-sm text-slate-500">
          Search, filter, and inspect mock payment records.
        </p>
      </div>

      <TransactionFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
      />
      <TransactionTable transactions={filteredTransactions} />
    </section>
  );
}

export default TransactionsPage;
