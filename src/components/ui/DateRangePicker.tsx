import React, { useState, useCallback } from "react";
import { Download } from "lucide-react";
import { Button } from "./Button";
import { Card } from "./Card";

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
    endDate: "2024-12-31",
  });

  const handleDateChange = useCallback(
    (field: keyof DateRange, value: string) => {
      const newDateRange = { ...dateRange, [field]: value };

      // Validate date range
      if (newDateRange.startDate && newDateRange.endDate) {
        const startDate = new Date(newDateRange.startDate);
        const endDate = new Date(newDateRange.endDate);

        // If start date is after end date, adjust the other date
        if (startDate > endDate) {
          if (field === "startDate") {
            // If start date is after end date, set end date to start date
            newDateRange.endDate = newDateRange.startDate;
          } else {
            // If end date is before start date, set start date to end date
            newDateRange.startDate = newDateRange.endDate;
          }
        }
      }

      setDateRange(newDateRange);
      onDateRangeChange(newDateRange);
    },
    [dateRange, onDateRangeChange],
  );

  const handleStartDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleDateChange("startDate", e.target.value);
    },
    [handleDateChange],
  );

  const handleEndDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleDateChange("endDate", e.target.value);
    },
    [handleDateChange],
  );

  const handleExportCSV = useCallback(() => {
    onExport("csv");
  }, [onExport]);

  const handleExportJSON = useCallback(() => {
    onExport("json");
  }, [onExport]);

  return (
    <Card variant="elevated" className="p-4 sm:p-6 mb-8">
      <div className="date-range-picker flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Date Range:
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col">
              <label
                htmlFor="start-date"
                className="text-xs text-muted-foreground mb-1"
              >
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                value={dateRange.startDate}
                onChange={handleStartDateChange}
                max={dateRange.endDate}
                onKeyDown={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                className="px-3 py-2 border border-input rounded-md text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="end-date"
                className="text-xs text-muted-foreground mb-1"
              >
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                value={dateRange.endDate}
                onChange={handleEndDateChange}
                min={dateRange.startDate}
                onKeyDown={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                className="px-3 py-2 border border-input rounded-md text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportJSON}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
        </div>
      </div>
    </Card>
  );
}
