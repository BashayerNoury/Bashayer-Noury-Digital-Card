import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 600);
    }, 1600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "enter" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="relative flex items-center justify-center">
            {/* Outer ring */}
            <motion.div
              className="absolute w-12 h-12 rounded-full border border-foreground/10"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Spinning arc */}
            <motion.svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              className="absolute"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{
                opacity: { duration: 0.3, delay: 0.1 },
                rotate: { duration: 1.2, ease: "linear", repeat: Infinity },
              }}
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="34 104"
              />
            </motion.svg>

            {/* Center dot */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-foreground"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
