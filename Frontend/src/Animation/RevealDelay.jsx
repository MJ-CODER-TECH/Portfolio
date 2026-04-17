import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function RevealDelay({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="overflow-hidden inline-block">
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: "0%" } : {}}
        transition={{
          delay: 0.2, // 👈 instant start
          duration: 0.5,
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}