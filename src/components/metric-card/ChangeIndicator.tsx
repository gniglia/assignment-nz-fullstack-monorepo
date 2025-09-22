import { motion } from "framer-motion";

type ChangeIndicatorProps = {
  change: number;
  changeType: "increase" | "decrease";
};

export function ChangeIndicator({ change, changeType }: ChangeIndicatorProps) {
  const changeColor =
    changeType === "increase" ? "text-success" : "text-destructive";
  const changePrefix = changeType === "increase" ? "+" : "";

  return (
    <motion.p
      className={`text-sm font-medium ${changeColor}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {changePrefix}
      {change}%
    </motion.p>
  );
}
