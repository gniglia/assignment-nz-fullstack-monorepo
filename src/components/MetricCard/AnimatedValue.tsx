import { useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

type AnimatedValueProps = {
  value: number;
  className?: string;
};

export function AnimatedValue({ value, className }: AnimatedValueProps) {
  const animatedValue = useMotionValue(0);
  const springValue = useSpring(animatedValue, {
    damping: 30,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    animatedValue.set(value);

    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return unsubscribe;
  }, [value, animatedValue, springValue]);

  return <span className={className}>{displayValue.toLocaleString()}</span>;
}
