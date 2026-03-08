import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET = "Bash.";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
const SPIN_INTERVAL = 50;
const LOCK_DELAY = 400; // ms between each letter locking

const SplashScreen = ({
  onComplete,
  variant = "home",
}: {
  onComplete: () => void;
  variant?: string;
}) => {
  const [phase, setPhase] = useState<"loading" | "exit">("loading");
  const [displayChars, setDisplayChars] = useState<string[]>(
    Array(TARGET.length).fill(" ")
  );
  const [lockedCount, setLockedCount] = useState(0);

  // Spin unlocked characters randomly
  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => {
      setDisplayChars((prev) =>
        prev.map((ch, i) =>
          i < lockedCount
            ? TARGET[i]
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
      );
    }, SPIN_INTERVAL);
    return () => clearInterval(interval);
  }, [phase, lockedCount]);

  // Lock letters one by one
  useEffect(() => {
    if (phase !== "loading") return;
    if (lockedCount >= TARGET.length) {
      // All locked — hold briefly then exit
      const exitTimer = setTimeout(() => {
        setPhase("exit");
        setTimeout(onComplete, 500);
      }, 600);
      return () => clearTimeout(exitTimer);
    }
    const lockTimer = setTimeout(() => {
      setLockedCount((c) => c + 1);
    }, LOCK_DELAY + (lockedCount === 0 ? 300 : 0)); // extra initial delay
    return () => clearTimeout(lockTimer);
  }, [phase, lockedCount, onComplete]);

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex items-center">
            {displayChars.map((char, i) => (
              <motion.span
                key={i}
                className={`text-4xl sm:text-5xl font-bold font-mono ${
                  i < lockedCount
                    ? "text-foreground"
                    : "text-muted-foreground/40"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                style={{ width: "1.2ch", textAlign: "center", display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
