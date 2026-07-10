import type { Transaction } from "../types/transaction";

export interface TransactionTrendSummary {
  periodKey: string;
  periodLabel: string;
  tooltipLabel: string;
  count: number;
  amount: number;
}

export type ChartXAxisTitle = "Year" | "Month" | "Day";

export const MONTH_OPTIONS = [
  { value: "1", label: "January", shortLabel: "Jan" },
  { value: "2", label: "February", shortLabel: "Feb" },
  { value: "3", label: "March", shortLabel: "Mar" },
  { value: "4", label: "April", shortLabel: "Apr" },
  { value: "5", label: "May", shortLabel: "May" },
  { value: "6", label: "June", shortLabel: "Jun" },
  { value: "7", label: "July", shortLabel: "Jul" },
  { value: "8", label: "August", shortLabel: "Aug" },
  { value: "9", label: "September", shortLabel: "Sep" },
  { value: "10", label: "October", shortLabel: "Oct" },
  { value: "11", label: "November", shortLabel: "Nov" },
  { value: "12", label: "December", shortLabel: "Dec" },
];

const tooltipDayFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function parseTransactionDate(date: string) {
  return new Date(`${date}T00:00:00`);
}

function createSummary(periodKey: string, periodLabel: string, tooltipLabel: string) {
  return {
    periodKey,
    periodLabel,
    tooltipLabel,
    count: 0,
    amount: 0,
  };
}

function getMonthOption(month: number) {
  return MONTH_OPTIONS[month - 1];
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function getAvailableTransactionYears(transactions: Transaction[]) {
  return Array.from(
    new Set(transactions.map((transaction) => parseTransactionDate(transaction.date).getFullYear())),
  ).sort((first, second) => second - first);
}

export function getDefaultTransactionYear(transactions: Transaction[]) {
  return String(getAvailableTransactionYears(transactions)[0] ?? "all");
}

export function getTransactionTrendSummary(
  transactions: Transaction[],
  selectedYear: string,
  selectedMonth: string,
) {
  if (selectedYear === "all") {
    return getYearlySummary(transactions);
  }

  if (selectedMonth === "all") {
    return getMonthlySummary(transactions, Number(selectedYear));
  }

  return getDailySummary(transactions, Number(selectedYear), Number(selectedMonth));
}

export function getTrendXAxisTitle(selectedYear: string, selectedMonth: string): ChartXAxisTitle {
  if (selectedYear === "all") {
    return "Year";
  }

  if (selectedMonth === "all") {
    return "Month";
  }

  return "Day";
}

function getYearlySummary(transactions: Transaction[]) {
  const years = getAvailableTransactionYears(transactions).sort((first, second) => first - second);
  const summaries = years.reduce<Record<string, TransactionTrendSummary>>((summary, year) => {
    summary[String(year)] = createSummary(String(year), String(year), String(year));
    return summary;
  }, {});

  transactions.forEach((transaction) => {
    const year = String(parseTransactionDate(transaction.date).getFullYear());
    const current = summaries[year] ?? createSummary(year, year, year);
    summaries[year] = {
      ...current,
      count: current.count + 1,
      amount: current.amount + transaction.amount,
    };
  });

  return years.map((year) => summaries[String(year)]);
}

function getMonthlySummary(transactions: Transaction[], year: number) {
  const summaries = MONTH_OPTIONS.reduce<Record<string, TransactionTrendSummary>>(
    (summary, month) => {
      const periodKey = `${year}-${month.value.padStart(2, "0")}`;
      const tooltipLabel = `${month.label} ${year}`;
      summary[periodKey] = createSummary(periodKey, month.shortLabel, tooltipLabel);
      return summary;
    },
    {},
  );

  transactions.forEach((transaction) => {
    const date = parseTransactionDate(transaction.date);

    if (date.getFullYear() !== year) {
      return;
    }

    const month = date.getMonth() + 1;
    const monthOption = getMonthOption(month);
    const periodKey = `${year}-${String(month).padStart(2, "0")}`;
    const current =
      summaries[periodKey] ?? createSummary(periodKey, monthOption.shortLabel, `${monthOption.label} ${year}`);

    summaries[periodKey] = {
      ...current,
      count: current.count + 1,
      amount: current.amount + transaction.amount,
    };
  });

  return Object.values(summaries);
}

function getDailySummary(transactions: Transaction[], year: number, month: number) {
  const daysInMonth = getDaysInMonth(year, month);
  const monthOption = getMonthOption(month);
  const summaries = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const periodKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const tooltipLabel = tooltipDayFormatter.format(new Date(year, month - 1, day));

    return createSummary(periodKey, String(day), tooltipLabel);
  });
  const summariesByKey = summaries.reduce<Record<string, TransactionTrendSummary>>(
    (summary, item) => {
      summary[item.periodKey] = item;
      return summary;
    },
    {},
  );

  transactions.forEach((transaction) => {
    const date = parseTransactionDate(transaction.date);

    if (date.getFullYear() !== year || date.getMonth() + 1 !== month) {
      return;
    }

    const periodKey = transaction.date;
    const current =
      summariesByKey[periodKey] ??
      createSummary(periodKey, String(date.getDate()), `${monthOption.label} ${date.getDate()}, ${year}`);

    summariesByKey[periodKey] = {
      ...current,
      count: current.count + 1,
      amount: current.amount + transaction.amount,
    };
  });

  return summaries;
}
