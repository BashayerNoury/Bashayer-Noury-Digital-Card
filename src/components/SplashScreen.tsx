import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "enter" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
            <div className="relative">
              <motion.h1
                className="text-5xl sm:text-6xl text-foreground italic font-medium"
                style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1.15, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  Bash ECard
                </motion.span>
              </motion.h1>

              <motion.div
                className="absolute -bottom-1 left-0 h-px bg-foreground/50"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.15, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />

              <motion.div
                className="absolute -bottom-[5px] left-0 size-2 rounded-full bg-foreground/70"
                initial={{ x: "0%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.15, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <motion.p
              className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 1.1 }}
            >
              Loading
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
