import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#&*?.";
const SPIN_INTERVAL = 40;
const LOCK_DELAY = 350;

interface SlotTextProps {
  text: string;
  className?: string;
  startDelay?: number;
}

const SlotText = ({ text, className = "", startDelay = 0 }: SlotTextProps) => {
  const [displayChars, setDisplayChars] = useState<string[]>(
    Array(text.length).fill(" ")
  );
  const [lockedCount, setLockedCount] = useState(0);
  const [started, setStarted] = useState(startDelay === 0);

  // Handle start delay
  useEffect(() => {
    if (startDelay > 0) {
      const t = setTimeout(() => setStarted(true), startDelay);
      return () => clearTimeout(t);
    }
  }, [startDelay]);

  // Spin unlocked characters
  useEffect(() => {
    if (!started) return;
    if (lockedCount >= text.length) {
      setDisplayChars(text.split(""));
      return;
    }
    const interval = setInterval(() => {
      setDisplayChars((prev) =>
        prev.map((_, i) =>
          i < lockedCount
            ? text[i]
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
      );
    }, SPIN_INTERVAL);
    return () => clearInterval(interval);
  }, [started, lockedCount, text]);

  // Lock letters one by one
  useEffect(() => {
    if (!started || lockedCount >= text.length) return;
    const t = setTimeout(
      () => setLockedCount((c) => c + 1),
      LOCK_DELAY + (lockedCount === 0 ? 200 : 0)
    );
    return () => clearTimeout(t);
  }, [started, lockedCount, text]);

  return (
    <span className={className}>
      {displayChars.map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: char === "." ? undefined : "0.6em",
            textAlign: "center",
            opacity: !started ? 0 : i < lockedCount ? 1 : 0.4,
            transition: "opacity 0.2s ease",
          }}
        >
          {started ? char : text[i]}
        </span>
      ))}
    </span>
  );
};

export default SlotText;
