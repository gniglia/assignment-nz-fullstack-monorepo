import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { AnimatedValue } from "./AnimatedValue";
import { AnimatedIcon } from "./AnimatedIcon";
import { ChangeIndicator } from "./ChangeIndicator";

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
  icon,
}: MetricCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group h-full"
    >
      <Card variant="elevated" hover className="h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <p className="text-2xl font-bold text-foreground">
                <AnimatedValue value={value} />
              </p>
            </div>
            <ChangeIndicator change={change} changeType={changeType} />
          </div>
          <AnimatedIcon
            icon={icon}
            className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg flex-shrink-0"
          />
        </div>
      </Card>
    </motion.div>
  );
}
