import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = ["B", "a", "s", "h", "."];

const SlotLetter = ({ letter, delay }: { letter: string; delay: number }) => {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSettled(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Random characters to cycle through
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*.";

  return (
    <span className="relative inline-block w-[0.65em] overflow-hidden">
      <AnimatePresence mode="wait">
        {!settled ? (
          <SlotSpin key="spin" chars={chars} interval={50} />
        ) : (
          <motion.span
            key="final"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

const SlotSpin = ({ chars, interval }: { chars: string; interval: number }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % chars.length);
    }, interval);
    return () => clearInterval(timer);
  }, [chars, interval]);

  return (
    <motion.span
      key={current}
      initial={{ y: -12, opacity: 0.3 }}
      animate={{ y: 0, opacity: 0.6 }}
      exit={{ y: 12, opacity: 0 }}
      transition={{ duration: 0.04 }}
      className="inline-block text-muted-foreground"
    >
      {chars[current]}
    </motion.span>
  );
};

const SplashScreen = ({
  onComplete,
}: {
  onComplete: () => void;
  variant?: string;
}) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    // Total time: last letter settles at 200 + 4*180 = 920ms, then wait 400ms, then exit
    const timer = setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 500);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "enter" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="text-5xl sm:text-7xl font-bold text-primary tracking-tight">
            {LETTERS.map((letter, i) => (
              <SlotLetter key={i} letter={letter} delay={200 + i * 180} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
