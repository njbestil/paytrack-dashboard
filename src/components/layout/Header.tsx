function Header() {
  return (
    <header className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
          PayTrack Dashboard
        </p>
        <h1 className="text-2xl font-bold text-slate-950">Transactions Overview</h1>
      </div>

      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
        <p className="text-sm font-semibold text-slate-950">Admin User</p>
        <p className="text-xs uppercase text-slate-500">admin</p>
      </div>
    </header>
  );
}

export default Header;
