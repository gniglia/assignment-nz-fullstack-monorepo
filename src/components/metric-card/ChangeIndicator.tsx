import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

type ChangeIndicatorProps = {
  change: number;
  changeType: "increase" | "decrease";
};

export function ChangeIndicator({ change, changeType }: ChangeIndicatorProps) {
  const changeColor =
    changeType === "increase" ? "text-green-600" : "text-red-600";
  const changePrefix = changeType === "increase" ? "+" : "";
  const ArrowIcon = changeType === "increase" ? TrendingUp : TrendingDown;

  return (
    <motion.div
      className={`flex items-center gap-1 text-sm font-medium ${changeColor}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <ArrowIcon className="w-3 h-3" />
      <span>
        {changePrefix}
        {change}%
      </span>
    </motion.div>
  );
}
