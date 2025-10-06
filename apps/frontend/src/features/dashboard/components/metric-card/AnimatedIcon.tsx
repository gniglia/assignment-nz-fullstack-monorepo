import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type AnimatedIconProps = {
  icon: LucideIcon;
  className?: string;
};

export function AnimatedIcon({ icon: Icon, className }: AnimatedIconProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        rotate: 5,
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
    >
      <Icon className="h-6 w-6 text-primary-600" />
    </motion.div>
  );
}
