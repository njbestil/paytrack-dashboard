import { useMemo, useState } from "react";
import Button from "../components/common/Button";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import TransactionFilters, {
  type StatusFilter,
} from "../components/transactions/TransactionFilters";
import TransactionPagination from "../components/transactions/TransactionPagination";
import TransactionTable from "../components/transactions/TransactionTable";
import { mockTransactions } from "../data/mockTransactions";

const PAGE_SIZE_OPTIONS = [5, 10, 20];
const DEFAULT_PAGE_SIZE = 5;

function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
  const normalizedPage = Math.min(currentPage, totalPages);
  const paginatedTransactions = filteredTransactions.slice(
    (normalizedPage - 1) * pageSize,
    normalizedPage * pageSize,
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  function handleStatusChange(value: StatusFilter) {
    setStatusFilter(value);
    setCurrentPage(1);
  }

  function handlePageSizeChange(value: number) {
    setPageSize(value);
    setCurrentPage(1);
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Transactions</h2>
          <p className="mt-1 text-sm text-slate-500">
            Search, filter, and inspect mock payment records.
          </p>
        </div>

        <Button type="button" onClick={() => setIsAddModalOpen(true)}>
          Add transaction
        </Button>
      </div>

      <TransactionFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />
      <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <TransactionTable transactions={paginatedTransactions} />
        <TransactionPagination
          currentPage={normalizedPage}
          pageSize={pageSize}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          totalItems={filteredTransactions.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      {isAddModalOpen && (
        <AddTransactionModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </section>
  );
}

export default TransactionsPage;
