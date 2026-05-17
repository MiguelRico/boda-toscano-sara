import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {
          opacity: 0,
          y: 40,
          scale: 1.015,
          filter: "blur(14px)",
        },

        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",

          transition: {
            duration: 1.4,

            ease: [0.16, 1, 0.3, 1],

            when: "beforeChildren",

            delayChildren: 0.15,

            staggerChildren: 0.12,
          },
        },

        exit: {
          opacity: 0,
          y: -20,
          scale: 0.995,
          filter: "blur(10px)",

          transition: {
            duration: 0.45,
            ease: [0.7, 0, 0.84, 0],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
