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
          {/* Animated smoke burst */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(0 0% 60% / 0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.6 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[200px] rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(0 0% 80% / 0.25), transparent)",
              filter: "blur(50px)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1.8, opacity: 0.8 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          />

          {/* Name text */}
          <motion.div className="relative z-10 text-center">
            <motion.p
              className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Hi there {greeting.emoji}
            </motion.p>
            <motion.h1
              className="text-5xl sm:text-7xl font-bold text-foreground"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              {greeting.text}
            </motion.h1>
            <motion.div
              className="mt-6 h-px bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              style={{ width: "200px", margin: "0 auto" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
