import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { text: "Good Morning", emoji: "☀️" };
  if (hour >= 12 && hour < 17) return { text: "Good Afternoon", emoji: "🌤️" };
  if (hour >= 17 && hour < 21) return { text: "Good Evening", emoji: "🌅" };
  return { text: "Good Night", emoji: "🌙" };
};

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const greeting = useMemo(() => getGreeting(), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 800);
    }, 2400);
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
          {/* Orbiting rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-muted-foreground/10"
              style={{
                width: 160 + i * 100,
                height: 160 + i * 100,
              }}
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{
                opacity: [0, 0.4, 0.2],
                scale: 1,
                rotate: i % 2 === 0 ? 360 : -360,
              }}
              transition={{
                opacity: { duration: 1, delay: i * 0.15 },
                scale: { duration: 1.2, delay: i * 0.15, ease: "easeOut" },
                rotate: { duration: 12 + i * 4, repeat: Infinity, ease: "linear" },
              }}
            />
          ))}

          {/* Center dot pulse */}
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-foreground/20"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 0.3] }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Horizontal accent lines */}
          <motion.div
            className="absolute h-px w-40 bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ top: "calc(50% - 50px)" }}
          />
          <motion.div
            className="absolute h-px w-40 bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ top: "calc(50% + 50px)" }}
          />

          {/* Main content */}
          <motion.div className="relative z-10 text-center">
            <motion.p
              className="text-3xl mb-3"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {greeting.emoji}
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {greeting.text}
            </motion.h1>
            <motion.p
              className="text-xs tracking-[0.5em] uppercase text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Loading experience
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="mt-4 mx-auto h-px bg-muted-foreground/20 overflow-hidden"
              style={{ width: 120 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="h-full bg-foreground/40"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, delay: 1, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
