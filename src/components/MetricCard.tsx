import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

type MetricCardProps = {
  title: string;
  value: number;
  change: number;
  changeType: "increase" | "decrease";
  icon: LucideIcon;
};

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}: MetricCardProps) {
  const changeColor =
    changeType === "increase" ? "text-green-600" : "text-red-600";

  const changePrefix = changeType === "increase" ? "+" : "";

  return (
    <Card variant="elevated" hover>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {value.toLocaleString()}
          </p>
          <p className={`text-sm font-medium ${changeColor}`}>
            {changePrefix}
            {change}%
          </p>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-primary-50 rounded-lg">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
      </div>
    </Card>
  );
}
