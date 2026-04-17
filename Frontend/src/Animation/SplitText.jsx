import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SplitText({ children, delay = 0 }) {
  const text = String(children);
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className="inline-block overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={isInView ? { y: "0%" } : {}}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.5,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}