import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import TransactionStatusBadge from "../components/transactions/TransactionStatusBadge";
import { mockTransactions } from "../data/mockTransactions";
import { formatCurrency } from "../utils/formatCurrency";

function TransactionDetailsPage() {
  const { id } = useParams();
  const transaction = mockTransactions.find((item) => item.id === id);

  if (!transaction) {
    return (
      <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-bold text-slate-950">Transaction not found</h2>
        <p className="mt-2 text-sm text-slate-500">
          The transaction ID does not match any mock record.
        </p>
        <Link to="/transactions" className="mt-5 inline-block">
          <Button type="button">Back to transactions</Button>
        </Link>
      </section>
    );
  }

  const detailItems = [
    ["Transaction ID", transaction.id],
    ["Merchant name", transaction.merchantName],
    ["Customer name", transaction.customerName],
    ["Amount", formatCurrency(transaction.amount)],
    ["Payment method", transaction.paymentMethod],
    ["Date", transaction.date],
    ["Reference number", transaction.referenceNumber],
    ["User role", transaction.userRole],
  ];

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Transaction Details</h2>
          <p className="mt-1 text-sm text-slate-500">Review a single POS payment record.</p>
        </div>
        <Link to="/transactions">
          <Button type="button" className="w-full sm:w-auto">
            Back to transactions
          </Button>
        </Link>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm text-slate-500">Status</p>
            <TransactionStatusBadge status={transaction.status} />
          </div>
          <p className="text-sm font-semibold text-slate-500">{transaction.referenceNumber}</p>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          {detailItems.map(([label, value]) => (
            <div key={label} className="rounded-md bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase text-slate-500">{label}</dt>
              <dd className="mt-1 text-sm font-semibold capitalize text-slate-950">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default TransactionDetailsPage;
