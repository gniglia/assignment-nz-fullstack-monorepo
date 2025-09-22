import React, { useState, useCallback, useRef } from "react";
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
    endDate: "2024-12-31",
  });

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const handleDateChange = useCallback(
    (field: keyof DateRange, value: string) => {
      const newDateRange = { ...dateRange, [field]: value };
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

  const handleStartDateIconClick = useCallback(() => {
    if (startDateRef.current && !isLoading) {
      startDateRef.current.showPicker();
    }
  }, [isLoading]);

  const handleEndDateIconClick = useCallback(() => {
    if (endDateRef.current && !isLoading) {
      endDateRef.current.showPicker();
    }
  }, [isLoading]);

  const handleInputClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      // Prevent the default click behavior that opens the date picker
      e.preventDefault();
    },
    [],
  );

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-900 flex-shrink-0" />
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
              <div className="relative">
                <input
                  ref={startDateRef}
                  id="start-date"
                  type="date"
                  value={dateRange.startDate}
                  onChange={handleStartDateChange}
                  onClick={handleInputClick}
                  className="px-3 py-2 pr-4 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={handleStartDateIconClick}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-gray-50 rounded-r-md transition-colors"
                >
                  <Calendar className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="end-date" className="text-xs text-gray-500 mb-1">
                End Date
              </label>
              <div className="relative">
                <input
                  ref={endDateRef}
                  id="end-date"
                  type="date"
                  value={dateRange.endDate}
                  onChange={handleEndDateChange}
                  onClick={handleInputClick}
                  className="px-3 py-2 pr-4 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={handleEndDateIconClick}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-gray-50 rounded-r-md transition-colors"
                >
                  <Calendar className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
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
    </div>
  );
}
