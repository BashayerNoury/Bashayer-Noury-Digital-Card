import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/dancing-script/700.css";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

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
          {/* Smoke burst */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(0 0% 60% / 0.25) 0%, transparent 70%)",
              filter: "blur(70px)",
            }}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 0.5 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Signature text with SVG path reveal */}
            <div className="relative">
              <motion.h1
                className="text-5xl sm:text-7xl text-foreground"
                style={{ fontFamily: "'Dancing Script', cursive" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  Bash ECard
                </motion.span>
              </motion.h1>
            </div>

            {/* Underline stroke */}
            <motion.div
              className="mt-3 h-[1.5px] bg-gradient-to-r from-transparent via-foreground/50 to-transparent"
              initial={{ scaleX: 0, width: "180px" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
