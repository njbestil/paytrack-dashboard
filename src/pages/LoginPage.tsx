import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function LoginPage() {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
            POS Transactions
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">PayTrack Dashboard</h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in with the demo account to view the dashboard.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              defaultValue="admin@paytrack.com"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              defaultValue="password123"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-5 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
          Demo credentials: admin@paytrack.com / password123
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
