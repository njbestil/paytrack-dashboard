import type { PaymentStatus } from "../../types/transaction";

interface TransactionStatusBadgeProps {
  status: PaymentStatus;
}

const statusStyles: Record<PaymentStatus, string> = {
  success: "bg-green-100 text-green-700 ring-green-200",
  pending: "bg-yellow-100 text-yellow-800 ring-yellow-200",
  failed: "bg-red-100 text-red-700 ring-red-200",
};

function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default TransactionStatusBadge;
