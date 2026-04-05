import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "../lib/utils";

interface BlurTextProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

export const BlurText = ({ text, className, delayOffset = 0 }: BlurTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={cn("flex flex-wrap justify-center", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={isInView ? { 
            filter: ["blur(10px)", "blur(5px)", "blur(0px)"], 
            opacity: [0, 0.5, 1], 
            y: [50, -5, 0] 
          } : {}}
          transition={{
            duration: 0.35,
            delay: delayOffset + i * 0.1,
            ease: "easeOut",
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};
