import type { PaymentStatus } from "../../types/transaction";

interface StatusBreakdownItem {
  label: string;
  status: PaymentStatus;
  value: number;
}

interface StatusBreakdownChartProps {
  data: StatusBreakdownItem[];
}

const statusStyles: Record<PaymentStatus, string> = {
  success: "bg-green-500",
  pending: "bg-yellow-400",
  failed: "bg-red-500",
};

function StatusBreakdownChart({ data }: StatusBreakdownChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <section className="min-w-0 max-w-full rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-950">Status Breakdown</h3>
        <p className="mt-1 text-sm text-slate-500">Successful, pending, and failed payment types.</p>
      </div>

      <div className="space-y-4">
        {data.map((item) => {
          const percentage = total === 0 ? 0 : Math.round((item.value / total) * 100);
          const barWidth = Math.max((item.value / maxValue) * 100, item.value === 0 ? 0 : 8);

          return (
            <div key={item.status}>
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                <span className="text-sm text-slate-500">
                  {item.value} ({percentage}%)
                </span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div
                  className={`h-3 rounded-full ${statusStyles[item.status]}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default StatusBreakdownChart;
