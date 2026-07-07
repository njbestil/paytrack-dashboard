import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
  }

  return (
    <header className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
          PayTrack Dashboard
        </p>
        <h1 className="text-2xl font-bold text-slate-950">Transactions Overview</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-sm font-semibold text-slate-950">Admin User</p>
          <p className="text-xs uppercase text-slate-500">admin</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
