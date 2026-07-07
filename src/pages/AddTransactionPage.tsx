import { FormEvent } from "react";
import Button from "../components/common/Button";

function AddTransactionPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
    alert("Test transaction submitted. Check the console for form values.");
    event.currentTarget.reset();
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Add Test Transaction</h2>
        <p className="mt-1 text-sm text-slate-500">
          Create a sample transaction UI entry without saving to a database.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid max-w-2xl gap-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200"
      >
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Merchant name</span>
          <input name="merchantName" required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Customer name</span>
          <input name="customerName" required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Amount</span>
          <input name="amount" type="number" min="0" step="0.01" required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Payment method</span>
          <select name="paymentMethod" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="card">Card</option>
            <option value="cash">Cash</option>
            <option value="wallet">Wallet</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Status</span>
          <select name="status" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </label>

        <div>
          <Button type="submit">Submit test transaction</Button>
        </div>
      </form>
    </section>
  );
}

export default AddTransactionPage;
