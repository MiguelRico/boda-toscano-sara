import { motion } from "framer-motion";

export function RevealItem({ children, delay = 0, amount = 0.4 }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 1.01,
        filter: "blur(12px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: amount,
      }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
