import { FormEvent, MouseEvent, useEffect, useRef } from "react";
import Button from "../common/Button";

interface AddTransactionModalProps {
  onClose: () => void;
}

function AddTransactionModal({ onClose }: AddTransactionModalProps) {
  const merchantInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    merchantInputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
    alert("Test transaction submitted. Check the console for form values.");
    event.currentTarget.reset();
    onClose();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-transaction-title"
      onClick={handleBackdropClick}
    >
      <div className="max-h-full w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div>
            <h2 id="add-transaction-title" className="text-xl font-bold text-slate-950">
              Add Test Transaction
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create a sample transaction UI entry without saving to a database.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-xl leading-none text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Close add transaction modal"
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 px-6 py-5">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Merchant name</span>
            <input
              ref={merchantInputRef}
              name="merchantName"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Customer name</span>
            <input
              name="customerName"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Amount</span>
            <input
              name="amount"
              type="number"
              min="0"
              step="0.01"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Payment method</span>
            <select
              name="paymentMethod"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="card">Card</option>
              <option value="cash">Cash</option>
              <option value="wallet">Wallet</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Status</span>
            <select
              name="status"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <Button type="submit">Submit test transaction</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;
