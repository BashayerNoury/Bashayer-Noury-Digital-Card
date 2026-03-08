import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*.";

const SlotSpin = ({ interval }: { interval: number }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % CHARS.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <motion.span
      key={current}
      initial={{ y: -12, opacity: 0.3 }}
      animate={{ y: 0, opacity: 0.6 }}
      exit={{ y: 12, opacity: 0 }}
      transition={{ duration: 0.04 }}
      className="inline-block"
    >
      {CHARS[current]}
    </motion.span>
  );
};

const SlotLetter = ({ letter, delay }: { letter: string; delay: number }) => {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSettled(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className="relative inline-block w-[0.6em] overflow-hidden">
      <AnimatePresence mode="wait">
        {!settled ? (
          <SlotSpin key="spin" interval={50} />
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

const LETTERS = ["B", "a", "s", "h", "."];

const SlotText = ({ startDelay = 0 }: { startDelay?: number }) => {
  return (
    <span className="text-muted-foreground/80">
      {LETTERS.map((letter, i) => (
        <SlotLetter key={i} letter={letter} delay={startDelay + 200 + i * 180} />
      ))}
    </span>
  );
};

export default SlotText;
