import type { ReactNode } from "react";
import type { ChartXAxisTitle, TransactionTrendSummary } from "../../utils/dashboardCharts";
import { formatCurrency } from "../../utils/formatCurrency";

interface TransactionTrendChartProps {
  data: TransactionTrendSummary[];
  xAxisTitle: ChartXAxisTitle;
  controls?: ReactNode;
}

function TransactionTrendChart({ data, xAxisTitle, controls }: TransactionTrendChartProps) {
  const maxCount = Math.max(...data.map((item) => item.count), 1);
  const chartWidth = Math.max((data.length - 1) * 64 + 160, 560);
  const chartHeight = 280;
  const tooltipWidth = 224;
  const padding = {
    top: 44,
    right: 24,
    bottom: 56,
    left: 84,
  };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  function getX(index: number) {
    return padding.left + (index / Math.max(data.length - 1, 1)) * plotWidth;
  }

  function getY(value: number) {
    return padding.top + (1 - value / maxCount) * plotHeight;
  }

  const countPoints = data.map((item, index) => ({
    x: getX(index),
    y: getY(item.count),
    item,
  }));
  const countLine = countPoints.map((point) => `${point.x},${point.y}`).join(" ");
  const tickSteps = Math.min(maxCount, 4);
  const yAxisTicks = Array.from({ length: tickSteps + 1 }, (_, index) =>
    Math.round((maxCount / tickSteps) * index),
  ).filter((value, index, ticks) => index === 0 || value !== ticks[index - 1]);
  const maxVisibleXAxisLabels = Math.max(2, Math.floor(plotWidth / 92));
  const xAxisLabelInterval = Math.max(1, Math.ceil(data.length / maxVisibleXAxisLabels));

  function getTooltipPosition(x: number, y: number) {
    const left = Math.min(
      Math.max(x - tooltipWidth / 2, 8),
      chartWidth - tooltipWidth - 8,
    );
    const top = y > chartHeight - padding.bottom - 88 ? y - 92 : y + 18;

    return { left, top };
  }

  return (
    <section className="min-w-0 max-w-full rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-950">Transactions Over Time</h3>
          <p className="mt-1 text-sm text-slate-500">Daily transaction volume from mock data.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end lg:justify-end">
          {controls}
        </div>
      </div>

      {data.length === 0 ? (
        <p className="rounded-md bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          No transaction records match the selected filters.
        </p>
      ) : (
      <div className="max-w-full overflow-x-auto">
        <div className="relative w-full min-w-[560px]" style={{ height: chartHeight }}>
          <svg
            className="absolute inset-0"
            width="100%"
            height={chartHeight}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
            role="img"
            aria-label="Line graph showing total transactions by date"
          >
            {yAxisTicks.map((tick) => {
              const y = getY(tick);

              return (
                <g key={tick}>
                  <line
                    x1={padding.left}
                    x2={chartWidth - padding.right}
                    y1={y}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-slate-500 text-xs"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            <line
              x1={padding.left}
              x2={padding.left}
              y1={padding.top}
              y2={chartHeight - padding.bottom}
              stroke="#cbd5e1"
            />
            <line
              x1={padding.left}
              x2={chartWidth - padding.right}
              y1={chartHeight - padding.bottom}
              y2={chartHeight - padding.bottom}
              stroke="#cbd5e1"
            />

            <text
              x={padding.left + plotWidth / 2}
              y={chartHeight - 8}
              textAnchor="middle"
              className="fill-slate-700 text-xs font-semibold"
            >
              {xAxisTitle}
            </text>
            <text
              x={16}
              y={padding.top + plotHeight / 2}
              textAnchor="middle"
              transform={`rotate(-90 16 ${padding.top + plotHeight / 2})`}
              className="fill-slate-700 text-xs font-semibold"
            >
              Total Transactions
            </text>

            <polyline
              points={countLine}
              fill="none"
              stroke="#2563eb"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />

            {data.map((item, index) =>
              index % xAxisLabelInterval === 0 || index === data.length - 1 ? (
                <g key={item.periodKey}>
                  <text
                    x={getX(index)}
                    y={chartHeight - padding.bottom + 22}
                    textAnchor="middle"
                    className="fill-slate-500 text-xs"
                  >
                    {item.periodLabel}
                  </text>
                </g>
              ) : null,
            )}

            {countPoints.map((point) => (
              <circle
                key={point.item.periodKey}
                cx={point.x}
                cy={point.y}
                r="5"
                className="fill-blue-600"
              />
            ))}
          </svg>

          {countPoints.map((point) => {
            const tooltipPosition = getTooltipPosition(point.x, point.y);

            return (
              <button
                key={point.item.periodKey}
                type="button"
                className="group absolute z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none ring-blue-500 focus:ring-2"
                style={{ left: `${(point.x / chartWidth) * 100}%`, top: point.y }}
                aria-label={`Date: ${point.item.tooltipLabel}, Total Transactions: ${point.item.count}, Total Amount: ${formatCurrency(point.item.amount)}`}
              >
                <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-blue-600 opacity-0 transition group-hover:scale-110 group-hover:opacity-100 group-focus:scale-110 group-focus:opacity-100" />
                <span
                  className="pointer-events-none absolute z-20 hidden w-56 rounded-md bg-slate-950 px-3 py-2 text-left text-xs font-medium text-white shadow-lg group-hover:block group-focus:block"
                  style={{
                    left: tooltipPosition.left - point.x + 16,
                    top: tooltipPosition.top - point.y + 16,
                  }}
                >
                  <span className="block">Date: {point.item.tooltipLabel}</span>
                  <span className="block">Total Transactions: {point.item.count}</span>
                  <span className="block">Total Amount: {formatCurrency(point.item.amount)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      )}
    </section>
  );
}

export default TransactionTrendChart;
