interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

function SummaryCard({ title, value, subtitle }: SummaryCardProps) {
  return (
    <article className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
      {subtitle ? <p className="mt-2 text-sm text-slate-500">{subtitle}</p> : null}
    </article>
  );
}

export default SummaryCard;
