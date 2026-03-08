import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET = "Bash.";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
const SPIN_INTERVAL = 50;
const LOCK_DELAY = 180; // ms between each letter locking

const SplashScreen = ({
  onComplete,
}: {
  onComplete: () => void;
  variant?: string;
}) => {
  const [display, setDisplay] = useState<string[]>(Array(TARGET.length).fill(""));
  const [locked, setLocked] = useState<boolean[]>(Array(TARGET.length).fill(false));
  const [phase, setPhase] = useState<"spin" | "exit">("spin");

  // Spin random characters
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay((prev) =>
        prev.map((_, i) =>
          locked[i] ? TARGET[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
      );
    }, SPIN_INTERVAL);
    return () => clearInterval(interval);
  }, [locked]);

  // Lock letters one by one
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    TARGET.split("").forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setLocked((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
          setDisplay((prev) => {
            const next = [...prev];
            next[i] = TARGET[i];
            return next;
          });
        }, 400 + i * LOCK_DELAY)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Exit after all locked
  useEffect(() => {
    if (locked.every(Boolean)) {
      const t = setTimeout(() => {
        setPhase("exit");
        setTimeout(onComplete, 500);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [locked, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-[2px]">
            {display.map((char, i) => (
              <motion.span
                key={i}
                className={`text-5xl sm:text-7xl font-bold inline-block w-[1.2ch] text-center ${
                  locked[i] ? "text-foreground" : "text-muted-foreground/40"
                }`}
                animate={
                  locked[i]
                    ? { scale: [1.2, 1], opacity: 1 }
                    : { opacity: [0.4, 0.7, 0.4] }
                }
                transition={
                  locked[i]
                    ? { duration: 0.2, ease: "easeOut" }
                    : { duration: 0.15, repeat: Infinity }
                }
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
