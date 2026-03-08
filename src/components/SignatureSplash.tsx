import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SignatureSplash = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 800);
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const name = "Bashayer Noury";
  const letters = name.split("");

  return (
    <AnimatePresence>
      {phase === "enter" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Subtle smoke */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(0 0% 60% / 0.2) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.5 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Typewriter signature */}
            <div className="flex overflow-hidden">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-4xl sm:text-5xl font-bold text-foreground italic"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.15,
                    delay: 0.5 + i * 0.1,
                    ease: "easeOut",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
              {/* Blinking cursor */}
              <motion.span
                className="text-4xl sm:text-5xl font-bold text-foreground/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              >
                |
              </motion.span>
            </div>

            {/* Underline */}
            <motion.div
              className="mt-4 h-px bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 + letters.length * 0.1 + 0.2 }}
              style={{ width: "200px" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignatureSplash;
