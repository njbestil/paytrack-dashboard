import { NavLink } from "react-router-dom";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Transactions", to: "/transactions" },
];

function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-200 bg-white px-4 py-4 shadow-sm md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="mb-6">
        <p className="text-xl font-bold text-slate-950">PayTrack</p>
        <p className="text-sm text-slate-500">POS Dashboard</p>
      </div>

      <nav className="flex gap-2 md:flex-col">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
