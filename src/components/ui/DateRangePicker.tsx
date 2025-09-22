import { useState } from "react";
import { Calendar, Download } from "lucide-react";
import { Button } from "./Button";

type DateRange = {
  startDate: string;
  endDate: string;
};

type DateRangePickerProps = {
  // eslint-disable-next-line no-unused-vars
  onDateRangeChange: (dateRange: DateRange) => void;
  // eslint-disable-next-line no-unused-vars
  onExport: (format: "csv" | "json") => void;
  isLoading?: boolean;
};

export function DateRangePicker({
  onDateRangeChange,
  onExport,
  isLoading = false,
}: DateRangePickerProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "2024-01-01",
    endDate: "2024-06-30",
  });

  const handleDateChange = (field: keyof DateRange, value: string) => {
    const newDateRange = { ...dateRange, [field]: value };
    setDateRange(newDateRange);
    onDateRangeChange(newDateRange);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Date Range:
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col">
              <label
                htmlFor="start-date"
                className="text-xs text-gray-500 mb-1"
              >
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                value={dateRange.startDate}
                onChange={(e) => handleDateChange("startDate", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="end-date" className="text-xs text-gray-500 mb-1">
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                value={dateRange.endDate}
                onChange={(e) => handleDateChange("endDate", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport("csv")}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport("json")}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
        </div>
      </div>
    </div>
  );
}
