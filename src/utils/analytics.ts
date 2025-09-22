import type { AnalyticsChartData } from "@/types/api";

type DateRange = {
  startDate: string;
  endDate: string;
};

// Filter analytics data by date range
export function filterDataByDateRange(
  data: AnalyticsChartData,
  dateRange: DateRange,
): AnalyticsChartData {
  const startDate = new Date(dateRange.startDate);
  const endDate = new Date(dateRange.endDate);

  return data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });
}

// Export data as CSV
export function exportToCSV(
  data: AnalyticsChartData,
  filename: string = "analytics-data",
) {
  if (data.length === 0) return;

  const headers = ["Month", "Value", "Date"];
  const csvContent = [
    headers.join(","),
    ...data.map((item) => [item.label, item.value, item.date].join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Export data as JSON
export function exportToJSON(
  data: AnalyticsChartData,
  filename: string = "analytics-data",
) {
  if (data.length === 0) return;

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], {
    type: "application/json;charset=utf-8;",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.json`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Get default date range (covers all available data)
export function getDefaultDateRange(): DateRange {
  return {
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  };
}
