import type { PaymentStatus } from "../../types/transaction";

export type StatusFilter = PaymentStatus | "all";

interface TransactionFiltersProps {
  searchTerm: string;
  statusFilter: StatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
}

function TransactionFilters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: TransactionFiltersProps) {
  return (
    <div className="grid gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200 md:grid-cols-[1fr_220px]">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">Search</span>
        <input
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by transaction, merchant, or customer"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">Status</span>
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="all">All statuses</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </label>
    </div>
  );
}

export default TransactionFilters;
