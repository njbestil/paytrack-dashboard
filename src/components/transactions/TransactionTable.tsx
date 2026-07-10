import { Link } from "react-router-dom";
import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/formatCurrency";
import TransactionStatusBadge from "./TransactionStatusBadge";

interface TransactionTableProps {
  transactions: Transaction[];
}

function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Merchant</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Method</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-950">{transaction.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{transaction.merchantName}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{transaction.customerName}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-950">{formatCurrency(transaction.amount)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm capitalize text-slate-700">{transaction.paymentMethod}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <TransactionStatusBadge status={transaction.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{transaction.date}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <Link className="font-semibold text-blue-600 hover:text-blue-800" to={`/transactions/${transaction.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-slate-500">No transactions found.</p>
      ) : null}
    </>
  );
}

export default TransactionTable;
